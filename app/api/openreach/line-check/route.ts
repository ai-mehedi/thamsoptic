import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { packages as packagesTable } from '@/lib/db/schema';
import { eq, inArray, and } from 'drizzle-orm';

const OPENREACH_URL = 'https://www.ws.openreach.co.uk:9443/emp/5100/EnhancedManageLineCharacteristics';
const DUNS_ID = '218578231';

// Available switch codes - ONLY these switches have service
// If L2S ID matches any of these codes, service is available
// Otherwise, redirect to contact form
const AVAILABLE_SWITCH_CODES = ['BAAGNV', 'BAAFBJ'];

function buildLineCharacteristicsXML(refNum: string, districtCode: string): string {
  const now = new Date().toISOString().split('.')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <SOAP-ENV:Body>
    <ns:DS_ManageLineCharacteristicsV2Request xmlns:ns="http://www.openuri.org/">
      <GenericCPWSHubService xmlns="http://www.bt.com/eai/hub/or/GenericCPWSHubService">
        <AddLineCharacteristicsRequest2 xmlns="urn:com.openreach.LineCharacteristics2v43-0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <Query>
            <RequestersID>50009999</RequestersID>
            <IssueDateTime>${now}</IssueDateTime>
            <RequesterParty>
              <Party>
                <PartyIdentification>
                  <ID identificationSchemeName="DUNS">${DUNS_ID}</ID>
                </PartyIdentification>
              </Party>
            </RequesterParty>
            <ResponderParty>
              <Party>
                <PartyIdentification>
                  <ID identificationSchemeName="DUNS">${DUNS_ID}1</ID>
                </PartyIdentification>
              </Party>
            </ResponderParty>
            <QueryLine>
              <QueryLineItem>
                <RequestersID>1</RequestersID>
                <Features>
                  <LineCharacteristicsFeatureSet>
                    <InputFeatures>
                      <RequiredServiceType>All</RequiredServiceType>
                      <Address>
                        <AddressReference>
                          <RefNum>${refNum}</RefNum>
                          <DistrictCode>${districtCode}</DistrictCode>
                        </AddressReference>
                      </Address>
                    </InputFeatures>
                  </LineCharacteristicsFeatureSet>
                </Features>
              </QueryLineItem>
            </QueryLine>
          </Query>
        </AddLineCharacteristicsRequest2>
      </GenericCPWSHubService>
    </ns:DS_ManageLineCharacteristicsV2Request>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
}

interface TechnologyAvailability {
  fttcAvailable: boolean;
  fttpAvailable: boolean;
  sogeaAvailable: boolean;
  copperAvailable: boolean;
  isServiceAvailable: boolean; // True ONLY if L2S ID matches available switch codes
  l2sIds: string[];
  technologies: string[];
  rawData?: string;
}

function parseLineCharacteristicsResponse(xml: string): TechnologyAvailability {
  const result: TechnologyAvailability = {
    fttcAvailable: false,
    fttpAvailable: false,
    sogeaAvailable: false,
    copperAvailable: false,
    isServiceAvailable: false, // Will be true only if L2S ID matches BAAGNV or BAAFBJ
    l2sIds: [],
    technologies: [],
  };

  // Check for FTTC availability
  if (xml.includes('FTTCG_fastAvailability') || xml.includes('FTTCVDSLAvailability')) {
    result.fttcAvailable = true;
    result.technologies.push('FTTC');
  }

  // Check for FTTP availability
  if (xml.includes('FTTPAvailability') || xml.includes('FTTPBrownfield') || xml.includes('FTTPGreenfield')) {
    result.fttpAvailable = true;
    result.technologies.push('FTTP');
  }

  // Check for SOGEA availability
  if (xml.includes('SOGEAG_fastAvailability') || xml.includes('SOGEAVDSLAvailability')) {
    result.sogeaAvailable = true;
    result.technologies.push('SOGEA');
  }

  // Check for PointToPointFibre
  if (xml.includes('PointToPointFibre')) {
    result.technologies.push('PointToPointFibre');
  }

  // Check for Copper
  if (xml.includes('Copper') || xml.includes('ADSL')) {
    result.copperAvailable = true;
    result.technologies.push('Copper');
  }

  // Extract L2SId codes and check if service is available
  // Service is ONLY available if L2S ID matches BAAGNV or BAAFBJ
  // Regex handles XML namespaces like <ns10_10:L2SId> or <L2SId>
  const l2sIdRegex = /<(?:[\w]+:)?L2SId>([^<]+)<\/(?:[\w]+:)?L2SId>/g;
  let match;
  while ((match = l2sIdRegex.exec(xml)) !== null) {
    result.l2sIds.push(match[1]);
    if (AVAILABLE_SWITCH_CODES.includes(match[1])) {
      result.isServiceAvailable = true;
    }
  }

  return result;
}

async function makeOpenreachRequest(xmlData: string): Promise<string> {
  // Use environment variable or fallback to process.cwd()
  const basePath = process.env.CERT_PATH || path.join(process.cwd(), 'certs');
  const certPath = path.join(basePath, 'api.crt.pem');
  const keyPath = path.join(basePath, 'api.key.pem');
  const caPath = path.join(basePath, 'cacert.pem');

  if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    throw new Error(`Certificates not found at ${basePath}. Set CERT_PATH environment variable.`);
  }

  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);
  const ca = fs.existsSync(caPath) ? fs.readFileSync(caPath) : undefined;

  const url = new URL(OPENREACH_URL);

  // Create an HTTPS agent with mTLS configuration
  const agent = new https.Agent({
    cert: cert,
    key: key,
    ca: ca,
    rejectUnauthorized: false, // Set to true in production if Openreach cert is trusted
    keepAlive: false,
  });

  const options: https.RequestOptions = {
    hostname: url.hostname,
    port: url.port || 9443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Content-Length': Buffer.byteLength(xmlData),
      'SOAPAction': '""',
    },
    agent: agent,
    timeout: 30000, // 30 second timeout
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        agent.destroy(); // Clean up the agent
        resolve(data);
      });
    });

    req.on('error', (error) => {
      agent.destroy();
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      agent.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(xmlData);
    req.end();
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const refNum = searchParams.get('refnum');
  const districtCode = searchParams.get('districtcode');

  if (!refNum || !districtCode) {
    return NextResponse.json({
      error: 'refnum and districtcode are required'
    }, { status: 400 });
  }

  try {
    const xmlRequest = buildLineCharacteristicsXML(refNum, districtCode);
    const xmlResponse = await makeOpenreachRequest(xmlRequest);
    const availability = parseLineCharacteristicsResponse(xmlResponse);

    // Service is ONLY available if L2S ID matches configured switch codes
    if (!availability.isServiceAvailable) {
      return NextResponse.json({
        success: true,
        availability: availability,
        packages: [],
        hasService: false,
        message: 'Service not available at this location. Please contact us for more information.',
      });
    }

    // Determine available technologies for filtering packages
    const availableTechnologies: ('FTTP' | 'FTTC' | 'SOGEA' | 'Copper')[] = [];

    if (availability.fttpAvailable || availability.technologies.includes('PointToPointFibre')) {
      availableTechnologies.push('FTTP');
    }

    if (availability.fttcAvailable || availability.sogeaAvailable) {
      availableTechnologies.push('FTTC');
      availableTechnologies.push('SOGEA');
    }

    if (availability.copperAvailable) {
      availableTechnologies.push('Copper');
      availableTechnologies.push('FTTC'); // FTTC packages also work on copper
    }

    // Fetch packages from database based on available technologies
    let packages: Array<{
      id: string;
      name: string;
      speed: string;
      price: number;
      description: string;
      features: string[];
      isPopular: boolean | null;
      technology: string;
    }> = [];

    if (availableTechnologies.length > 0) {
      const dbPackages = await db.query.packages.findMany({
        where: and(
          eq(packagesTable.isActive, true),
          inArray(packagesTable.technology, availableTechnologies)
        ),
        orderBy: (packages, { asc }) => [asc(packages.sortOrder)],
      });

      packages = dbPackages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        speed: pkg.speed,
        price: pkg.price,
        description: pkg.description,
        features: JSON.parse(pkg.features),
        isPopular: pkg.isPopular,
        technology: pkg.technology,
      }));
    }

    return NextResponse.json({
      success: true,
      availability: availability,
      packages: packages,
      hasService: packages.length > 0,
    });
  } catch (error) {
    console.error('Openreach Line Check error:', error);
    return NextResponse.json({
      success: false,
      error: 'Unable to check line availability. Please try again later.',
      details: error instanceof Error ? error.message : 'Connection failed',
    }, { status: 503 });
  }
}
