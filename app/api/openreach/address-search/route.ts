import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import fs from 'fs';
import path from 'path';

const OPENREACH_URL = 'https://www.ws.openreach.co.uk:9443/emp/4400/AddressMatching';
const DUNS_ID = '218578231';

function buildAddressSearchXML(postcode: string): string {
  const now = new Date().toISOString().split('.')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <SOAP-ENV:Body>
    <open:addressSearch xmlns:open="http://www.openuri.org/">
      <gen:GenericCPWSHubService xmlns:gen="http://www.bt.com/eai/hub/or/GenericCPWSHubService">
        <AddAddressSearchQuery xmlns="urn:com.openreach.AddressSearchv44-0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <Query>
            <RequestersID>1</RequestersID>
            <IssueDateTime>${now}</IssueDateTime>
            <RequesterParty>
              <Party>
                <PartyIdentification>
                  <ID identificationSchemeAgencyName="DUNS">${DUNS_ID}</ID>
                </PartyIdentification>
              </Party>
            </RequesterParty>
            <ResponderParty>
              <Party>
                <PartyIdentification>
                  <ID identificationSchemeName="DUNS">${DUNS_ID}</ID>
                </PartyIdentification>
              </Party>
            </ResponderParty>
            <QueryLine>
              <QueryLineItem>
                <RequestersID>1</RequestersID>
                <Features>
                  <AddressFeatureSet>
                    <InputFeatures>
                      <Site>
                        <SearchUPRN>
                          <RefNum>null</RefNum>
                        </SearchUPRN>
                        <SiteSearchCode>null</SiteSearchCode>
                        <Address>
                          <BritishAddress>
                            <OrganisationName>null</OrganisationName>
                            <POBox>null</POBox>
                            <SubPremises>null</SubPremises>
                            <PremisesName>null</PremisesName>
                            <ThoroughfareNumber>null</ThoroughfareNumber>
                            <DependentThoroughfareName>null</DependentThoroughfareName>
                            <ThoroughfareName>null</ThoroughfareName>
                            <DoubleDependentLocality>null</DoubleDependentLocality>
                            <Locality>null</Locality>
                            <PostTown>null</PostTown>
                            <County>null</County>
                            <PostCode>${postcode}</PostCode>
                            <Country>null</Country>
                          </BritishAddress>
                        </Address>
                        <Coordinates>
                          <Coordinate>
                            <Easting>null</Easting>
                            <Northing>null</Northing>
                          </Coordinate>
                          <Coordinate>
                            <Latitude>null</Latitude>
                            <Longitude>null</Longitude>
                          </Coordinate>
                        </Coordinates>
                      </Site>
                      <Radius>10</Radius>
                      <UnresolvedNonPostalAddress>null</UnresolvedNonPostalAddress>
                      <BTExchangeAddress>null</BTExchangeAddress>
                    </InputFeatures>
                  </AddressFeatureSet>
                </Features>
              </QueryLineItem>
            </QueryLine>
          </Query>
        </AddAddressSearchQuery>
      </gen:GenericCPWSHubService>
    </open:addressSearch>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
}

interface OpenreachAddress {
  thoroughfareNumber: string;
  thoroughfareName: string;
  subPremisesName: string;
  premisesName: string;
  postTown: string;
  postCode: string;
  country: string;
  districtCode: string;
  refNum: string;
}

function parseAddressResponse(xml: string): OpenreachAddress[] {
  const addresses: OpenreachAddress[] = [];

  // Parse AddressSearchResultLine entries
  const lineRegex = /<AddressSearchResultLine[^>]*>([\s\S]*?)<\/AddressSearchResultLine>/g;
  let lineMatch;

  while ((lineMatch = lineRegex.exec(xml)) !== null) {
    const lineContent = lineMatch[1];

    const getTagValue = (content: string, tag: string): string => {
      const regex = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i');
      const match = content.match(regex);
      return match ? match[1].trim() : '';
    };

    // Get BritishAddress content
    const britishAddressMatch = lineContent.match(/<BritishAddress[^>]*>([\s\S]*?)<\/BritishAddress>/i);
    const addressContent = britishAddressMatch ? britishAddressMatch[1] : lineContent;

    // Get RefNum and DistrictCode from UPRN
    const uprnMatch = lineContent.match(/<UPRN[^>]*>([\s\S]*?)<\/UPRN>/i);
    const uprnContent = uprnMatch ? uprnMatch[1] : '';

    const address: OpenreachAddress = {
      thoroughfareNumber: getTagValue(addressContent, 'ThoroughfareNumber'),
      thoroughfareName: getTagValue(addressContent, 'ThoroughfareName'),
      subPremisesName: getTagValue(addressContent, 'SubPremises'),
      premisesName: getTagValue(addressContent, 'PremisesName'),
      postTown: getTagValue(addressContent, 'PostTown'),
      postCode: getTagValue(addressContent, 'PostCode'),
      country: getTagValue(addressContent, 'Country'),
      districtCode: getTagValue(uprnContent, 'DistrictCode'),
      refNum: getTagValue(uprnContent, 'RefNum'),
    };

    // Only add if we have a valid address
    if (address.refNum || address.thoroughfareName || address.postCode) {
      addresses.push(address);
    }
  }

  return addresses;
}

async function makeOpenreachRequest(xmlData: string): Promise<string> {
  const certPath = path.join(process.cwd(), 'certs', 'api.crt.pem');
  const keyPath = path.join(process.cwd(), 'certs', 'api.key.pem');
  const caPath = path.join(process.cwd(), 'certs', 'cacert.pem');

  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);
  const ca = fs.readFileSync(caPath);

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
  const postcode = searchParams.get('postcode');

  if (!postcode) {
    return NextResponse.json({ error: 'Postcode is required' }, { status: 400 });
  }

  try {
    const xmlRequest = buildAddressSearchXML(postcode.replace(/\s/g, ''));
    const xmlResponse = await makeOpenreachRequest(xmlRequest);
    const addresses = parseAddressResponse(xmlResponse);

    return NextResponse.json({
      success: true,
      postcode: postcode,
      addresses: addresses,
      count: addresses.length,
    });
  } catch (error) {
    console.error('Openreach API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Unable to connect to Openreach. Please check your network connection.',
      details: error instanceof Error ? error.message : 'Connection failed',
    }, { status: 503 });
  }
}
