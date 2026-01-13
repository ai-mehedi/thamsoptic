import { db } from './index';
import { admins, packages, orders, contactRequests } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // Clear existing data (order matters due to foreign keys)
  console.log('Clearing existing data...');
  await db.delete(orders);
  await db.delete(contactRequests);
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

  console.log('Seed completed!');
  console.log('\nAdmin login:');
  console.log('Email: admin@abstation.co.uk');
  console.log('Password: admin123');
}

seed().catch(console.error);
