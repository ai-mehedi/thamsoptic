import { db } from './index';
import { admins, packages, orders, contactRequests, coveragePackages } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  // Clear existing data (order matters due to foreign keys)
  console.log('Clearing existing data...');
  await db.delete(coveragePackages); // Must delete junction table first
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

  // Create packages - Broadband Anywhere packages
  const packageData: {
    name: string;
    speed: string;
    price: number;
    description: string;
    features: string;
    technology: 'FTTP' | 'FTTC' | 'SOGEA' | 'Copper';
    isPopular: boolean;
    sortOrder: number;
  }[] = [
    {
      name: 'Broadband Anywhere Ultra',
      speed: '500 Mbit/s',
      price: 50.00,
      description: 'Perfect for offices, UHD streaming & heavy usage',
      features: JSON.stringify([
        '500 Mbps download',
        'Unlimited data',
        'Free router',
        'Static IP available',
      ]),
      technology: 'FTTP',
      isPopular: true,
      sortOrder: 1,
    },
    {
      name: 'Broadband Anywhere Plus',
      speed: '68.36 Mbit/s',
      price: 34.99,
      description: 'Great for higher usage & heavier users',
      features: JSON.stringify([
        '68 Mbps download',
        'Unlimited data',
        'Free router',
      ]),
      technology: 'FTTC',
      isPopular: false,
      sortOrder: 2,
    },
    {
      name: 'Broadband Anywhere Essential',
      speed: '37 Mbit/s',
      price: 31.99,
      description: 'Perfect for low users & occasional usage',
      features: JSON.stringify([
        '37 Mbps download',
        'Unlimited data',
        'Free router',
      ]),
      technology: 'FTTC',
      isPopular: false,
      sortOrder: 3,
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
