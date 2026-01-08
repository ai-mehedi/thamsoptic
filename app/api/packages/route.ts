import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { packages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allPackages = await db.query.packages.findMany({
      where: eq(packages.isActive, true),
      orderBy: (packages, { asc }) => [asc(packages.sortOrder)],
    });

    return NextResponse.json({
      packages: allPackages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        speed: pkg.speed,
        price: pkg.price,
        description: pkg.description,
        features: JSON.parse(pkg.features),
        isPopular: pkg.isPopular,
      })),
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
