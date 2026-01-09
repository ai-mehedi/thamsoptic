import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import fs from 'fs';
import path from 'path';

const OPENREACH_URL = 'https://www.ws.openreach.co.uk:9443/emp/5100/EnhancedManageLineCharacteristics';
const DUNS_ID = '218578231';

// Special pricing codes
const SPECIAL_PRICING_CODES = ['BAAGNV', 'BAAFBJ'];

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
  isSpecialPricing: boolean;
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
    isSpecialPricing: false,
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

  // Extract L2SId codes for special pricing
  const l2sIdRegex = /<L2SId>([^<]+)<\/L2SId>/g;
  let match;
  while ((match = l2sIdRegex.exec(xml)) !== null) {
    result.l2sIds.push(match[1]);
    if (SPECIAL_PRICING_CODES.includes(match[1])) {
      result.isSpecialPricing = true;
    }
  }

  return result;
}

async function makeOpenreachRequest(xmlData: string): Promise<string> {
  const certPath = path.join(process.cwd(), 'certs', 'api.crt.pem');
  const keyPath = path.join(process.cwd(), 'certs', 'api.key.pem');

  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);

  const url = new URL(OPENREACH_URL);

  const options: https.RequestOptions = {
    hostname: url.hostname,
    port: url.port || 9443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xmlData),
    },
    cert: cert,
    key: key,
    rejectUnauthorized: false,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });

    req.on('error', (error) => reject(error));
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

    // Determine available packages based on technology
    const packages = [];

    if (availability.fttpAvailable || availability.technologies.includes('PointToPointFibre')) {
      packages.push({
        id: 'ultra',
        name: 'Broadband Anywhere Ultra',
        speed: '500 Mbit/s',
        price: availability.isSpecialPricing ? 30.00 : 50.00,
        description: 'Perfect for offices, UHD streaming & heavy usage',
        features: ['500 Mbps download', 'Unlimited data', 'Free router', 'Static IP available'],
        isPopular: true,
        technology: 'FTTP',
      });
    }

    if (availability.fttcAvailable || availability.sogeaAvailable || availability.copperAvailable) {
      packages.push({
        id: 'plus',
        name: 'Broadband Anywhere Plus',
        speed: '68.36 Mbit/s',
        price: 34.99,
        description: 'Great for higher usage & heavier users',
        features: ['68 Mbps download', 'Unlimited data', 'Free router'],
        isPopular: false,
        technology: 'FTTC',
      });

      packages.push({
        id: 'essential',
        name: 'Broadband Anywhere Essential',
        speed: '37 Mbit/s',
        price: availability.isSpecialPricing ? 16.50 : 31.99,
        description: 'Perfect for low users & occasional usage',
        features: ['37 Mbps download', 'Unlimited data', 'Free router'],
        isPopular: false,
        technology: 'FTTC',
      });
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
