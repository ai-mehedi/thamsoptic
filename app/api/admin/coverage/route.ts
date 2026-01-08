import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { coverageAreas, coveragePackages, packages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'thamesoptic-secret-key';

function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch {
    return null;
  }
}

// GET all coverage areas
export async function GET(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const areas = await db.query.coverageAreas.findMany({
      orderBy: (coverageAreas, { asc }) => [asc(coverageAreas.postcodePrefix)],
    });

    // Get all packages for reference
    const allPackages = await db.query.packages.findMany({
      orderBy: (packages, { asc }) => [asc(packages.sortOrder)],
    });

    const packageMap = new Map(allPackages.map(p => [p.id, { id: p.id, name: p.name, speed: p.speed, price: p.price }]));

    // Get package links for each area
    const areasWithPackages = await Promise.all(
      areas.map(async (area) => {
        const links = await db
          .select({ packageId: coveragePackages.packageId })
          .from(coveragePackages)
          .where(eq(coveragePackages.coverageAreaId, area.id));

        const areaPackages = links
          .map(l => packageMap.get(l.packageId))
          .filter(Boolean);

        return {
          ...area,
          packages: areaPackages,
        };
      })
    );

    return NextResponse.json({
      coverageAreas: areasWithPackages,
    });
  } catch (error) {
    console.error('Error fetching coverage areas:', error);
    return NextResponse.json({ error: 'Failed to fetch coverage areas' }, { status: 500 });
  }
}

// POST create new coverage area
export async function POST(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { postcodePrefix, areaName, packageIds, isActive } = body;

    if (!postcodePrefix) {
      return NextResponse.json({ error: 'Postcode prefix is required' }, { status: 400 });
    }

    // Create coverage area
    const [newArea] = await db.insert(coverageAreas).values({
      postcodePrefix: postcodePrefix.toUpperCase(),
      areaName: areaName || '',
      isActive: isActive !== false,
    }).returning();

    // Link packages
    if (packageIds && packageIds.length > 0) {
      const links = packageIds.map((packageId: string) => ({
        coverageAreaId: newArea.id,
        packageId,
      }));
      await db.insert(coveragePackages).values(links);
    }

    return NextResponse.json({ success: true, coverageArea: newArea });
  } catch (error) {
    console.error('Error creating coverage area:', error);
    return NextResponse.json({ error: 'Failed to create coverage area' }, { status: 500 });
  }
}

// PUT update coverage area
export async function PUT(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, postcodePrefix, areaName, packageIds, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'Coverage area ID is required' }, { status: 400 });
    }

    // Update coverage area
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (postcodePrefix !== undefined) updateData.postcodePrefix = postcodePrefix.toUpperCase();
    if (areaName !== undefined) updateData.areaName = areaName;
    if (isActive !== undefined) updateData.isActive = isActive;

    const [updated] = await db.update(coverageAreas)
      .set(updateData)
      .where(eq(coverageAreas.id, id))
      .returning();

    // Update package links
    if (packageIds !== undefined) {
      // Remove existing links
      await db.delete(coveragePackages).where(eq(coveragePackages.coverageAreaId, id));

      // Add new links
      if (packageIds.length > 0) {
        const links = packageIds.map((packageId: string) => ({
          coverageAreaId: id,
          packageId,
        }));
        await db.insert(coveragePackages).values(links);
      }
    }

    return NextResponse.json({ success: true, coverageArea: updated });
  } catch (error) {
    console.error('Error updating coverage area:', error);
    return NextResponse.json({ error: 'Failed to update coverage area' }, { status: 500 });
  }
}

// DELETE coverage area
export async function DELETE(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Coverage area ID is required' }, { status: 400 });
    }

    // Delete package links first
    await db.delete(coveragePackages).where(eq(coveragePackages.coverageAreaId, id));

    // Delete coverage area
    await db.delete(coverageAreas).where(eq(coverageAreas.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting coverage area:', error);
    return NextResponse.json({ error: 'Failed to delete coverage area' }, { status: 500 });
  }
}
