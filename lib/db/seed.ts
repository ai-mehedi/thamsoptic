import { db } from './index';
import { admins, packages, coverageAreas, coveragePackages, orders, contactRequests } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // Clear existing data (order matters due to foreign keys)
  console.log('Clearing existing data...');
  await db.delete(orders);
  await db.delete(contactRequests);
  await db.delete(coveragePackages);
  await db.delete(coverageAreas);
  await db.delete(packages);
  await db.delete(admins);

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const [admin] = await db.insert(admins).values({
    email: 'admin@abstation.co.uk',
    password: hashedPassword,
    name: 'Admin User',
  }).returning();
  console.log('Created admin user:', admin.email);

  // Create packages
  const packageData = [
    {
      name: 'Essential Fibre',
      speed: '150 Mbps',
      price: 27.99,
      description: 'Perfect for browsing & streaming',
      features: JSON.stringify([
        '150 Mbps symmetric speed',
        'Fiber VoIP included',
        'No BT line required',
        'WiFi 6 router included',
        'No commitment',
      ]),
      isPopular: false,
      sortOrder: 1,
    },
    {
      name: 'Superfast Fibre',
      speed: '500 Mbps',
      price: 34.99,
      description: 'Great for families & WFH',
      features: JSON.stringify([
        '500 Mbps symmetric speed',
        'Fiber VoIP included',
        'No BT line required',
        'WiFi 6 router included',
        'No commitment',
        'Priority UK support',
      ]),
      isPopular: true,
      sortOrder: 2,
    },
    {
      name: 'Ultrafast Fibre',
      speed: '1 Gbps',
      price: 49.99,
      description: 'For power users & gamers',
      features: JSON.stringify([
        '1 Gbps symmetric speed',
        'Fiber VoIP included',
        'No BT line required',
        'WiFi 6 router included',
        'No commitment',
        'Priority UK support',
        'Static IP address',
      ]),
      isPopular: false,
      sortOrder: 3,
    },
    {
      name: 'Business 10G',
      speed: '10 Gbps',
      price: 199.99,
      description: 'Enterprise-grade connectivity',
      features: JSON.stringify([
        '10 Gbps symmetric speed',
        'Fiber VoIP included',
        'Dedicated line - no contention',
        'Custom network build available',
        'No BT line required',
        'Enterprise WiFi 6E router',
        'Static IP block included',
        '24/7 priority support',
        'SLA guaranteed',
      ]),
      isPopular: false,
      sortOrder: 4,
    },
  ];

  const insertedPackages = await db.insert(packages).values(packageData).returning();
  console.log('Created', insertedPackages.length, 'packages');

  // Create coverage areas (London postcodes with area names)
  const londonPostcodes: { prefix: string; name: string }[] = [
    { prefix: 'SW1', name: 'Westminster' }, { prefix: 'SW2', name: 'Brixton' }, { prefix: 'SW3', name: 'Chelsea' },
    { prefix: 'SW4', name: 'Clapham' }, { prefix: 'SW5', name: 'Earls Court' }, { prefix: 'SW6', name: 'Fulham' },
    { prefix: 'SW7', name: 'South Kensington' }, { prefix: 'SW8', name: 'South Lambeth' }, { prefix: 'SW9', name: 'Stockwell' },
    { prefix: 'SW10', name: 'West Brompton' },
    { prefix: 'SE1', name: 'Southwark' }, { prefix: 'SE2', name: 'Abbey Wood' }, { prefix: 'SE3', name: 'Blackheath' },
    { prefix: 'SE4', name: 'Brockley' }, { prefix: 'SE5', name: 'Camberwell' }, { prefix: 'SE6', name: 'Catford' },
    { prefix: 'SE7', name: 'Charlton' }, { prefix: 'SE8', name: 'Deptford' }, { prefix: 'SE9', name: 'Eltham' },
    { prefix: 'SE10', name: 'Greenwich' },
    { prefix: 'E1', name: 'Whitechapel' }, { prefix: 'E2', name: 'Bethnal Green' }, { prefix: 'E3', name: 'Bow' },
    { prefix: 'E4', name: 'Chingford' }, { prefix: 'E5', name: 'Clapton' }, { prefix: 'E6', name: 'East Ham' },
    { prefix: 'E7', name: 'Forest Gate' }, { prefix: 'E8', name: 'Hackney' }, { prefix: 'E9', name: 'Homerton' },
    { prefix: 'E10', name: 'Leyton' },
    { prefix: 'W1', name: 'West End' }, { prefix: 'W2', name: 'Paddington' }, { prefix: 'W3', name: 'Acton' },
    { prefix: 'W4', name: 'Chiswick' }, { prefix: 'W5', name: 'Ealing' }, { prefix: 'W6', name: 'Hammersmith' },
    { prefix: 'W7', name: 'Hanwell' }, { prefix: 'W8', name: 'Kensington' }, { prefix: 'W9', name: 'Maida Vale' },
    { prefix: 'W10', name: 'North Kensington' },
    { prefix: 'N1', name: 'Islington' }, { prefix: 'N2', name: 'East Finchley' }, { prefix: 'N3', name: 'Finchley' },
    { prefix: 'N4', name: 'Finsbury Park' }, { prefix: 'N5', name: 'Highbury' }, { prefix: 'N6', name: 'Highgate' },
    { prefix: 'N7', name: 'Holloway' }, { prefix: 'N8', name: 'Hornsey' }, { prefix: 'N9', name: 'Lower Edmonton' },
    { prefix: 'N10', name: 'Muswell Hill' },
    { prefix: 'NW1', name: 'Camden Town' }, { prefix: 'NW2', name: 'Cricklewood' }, { prefix: 'NW3', name: 'Hampstead' },
    { prefix: 'NW4', name: 'Hendon' }, { prefix: 'NW5', name: 'Kentish Town' }, { prefix: 'NW6', name: 'Kilburn' },
    { prefix: 'NW7', name: 'Mill Hill' }, { prefix: 'NW8', name: 'St Johns Wood' }, { prefix: 'NW9', name: 'Colindale' },
    { prefix: 'NW10', name: 'Willesden' },
    { prefix: 'EC1', name: 'Clerkenwell' }, { prefix: 'EC2', name: 'Moorgate' }, { prefix: 'EC3', name: 'Monument' },
    { prefix: 'EC4', name: 'Fleet Street' },
    { prefix: 'WC1', name: 'Bloomsbury' }, { prefix: 'WC2', name: 'Covent Garden' },
  ];

  const coverageData = londonPostcodes.map(item => ({
    postcodePrefix: item.prefix,
    areaName: item.name,
    isActive: true,
  }));

  const insertedCoverage = await db.insert(coverageAreas).values(coverageData).returning();
  console.log('Created', insertedCoverage.length, 'coverage areas');

  // Link all packages to all coverage areas
  const coveragePackageData: { coverageAreaId: string; packageId: string }[] = [];
  for (const coverage of insertedCoverage) {
    for (const pkg of insertedPackages) {
      coveragePackageData.push({
        coverageAreaId: coverage.id,
        packageId: pkg.id,
      });
    }
  }

  await db.insert(coveragePackages).values(coveragePackageData);
  console.log('Linked packages to coverage areas');

  console.log('Seed completed!');
  console.log('\nAdmin login:');
  console.log('Email: admin@abstation.co.uk');
  console.log('Password: admin123');
}

seed().catch(console.error);
