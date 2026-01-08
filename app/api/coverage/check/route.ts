import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { coverageAreas, coveragePackages, packages } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postcode = searchParams.get('postcode');

    if (!postcode) {
      return NextResponse.json({ error: 'Postcode is required' }, { status: 400 });
    }

    // Extract postcode prefix (outward code) - e.g., "SW1A 1AA" -> "SW1"
    const cleanPostcode = postcode.toUpperCase().replace(/\s/g, '');

    // Try different prefix lengths to find a match
    const prefixes = [];
    if (cleanPostcode.length >= 2) prefixes.push(cleanPostcode.slice(0, 2));
    if (cleanPostcode.length >= 3) prefixes.push(cleanPostcode.slice(0, 3));
    if (cleanPostcode.length >= 4) prefixes.push(cleanPostcode.slice(0, 4));

    // Find matching coverage area
    let coverageArea = null;
    for (const prefix of prefixes.reverse()) { // Start with longest prefix
      const result = await db.query.coverageAreas.findFirst({
        where: and(
          eq(coverageAreas.postcodePrefix, prefix),
          eq(coverageAreas.isActive, true)
        ),
      });
      if (result) {
        coverageArea = result;
        break;
      }
    }

    if (!coverageArea) {
      return NextResponse.json({
        available: false,
        message: 'Service not available in your area yet',
        packages: [],
      });
    }

    // Get packages for this coverage area
    const coveragePackageLinks = await db
      .select({
        packageId: coveragePackages.packageId,
      })
      .from(coveragePackages)
      .where(eq(coveragePackages.coverageAreaId, coverageArea.id));

    const packageIds = coveragePackageLinks.map(cp => cp.packageId);

    if (packageIds.length === 0) {
      return NextResponse.json({
        available: false,
        message: 'No packages available in your area',
        packages: [],
      });
    }

    // Get package details
    const availablePackages = await db.query.packages.findMany({
      where: and(
        eq(packages.isActive, true),
      ),
      orderBy: (packages, { asc }) => [asc(packages.sortOrder)],
    });

    // Filter to only packages linked to this coverage area
    const filteredPackages = availablePackages.filter(pkg => packageIds.includes(pkg.id));

    return NextResponse.json({
      available: true,
      coverageArea: coverageArea.postcodePrefix,
      packages: filteredPackages.map(pkg => ({
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
    console.error('Coverage check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
