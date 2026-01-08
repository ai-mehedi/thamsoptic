import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { packages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'thamesoptic-secret-key';

// Middleware to verify admin token
function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch {
    return null;
  }
}

// GET all packages
export async function GET(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allPackages = await db.query.packages.findMany({
      orderBy: (packages, { asc }) => [asc(packages.sortOrder)],
    });

    return NextResponse.json({
      packages: allPackages.map(pkg => ({
        ...pkg,
        features: JSON.parse(pkg.features),
      })),
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

// POST create new package
export async function POST(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, speed, price, description, features, isPopular, isActive, sortOrder } = body;

    if (!name || !speed || !price || !description || !features) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [newPackage] = await db.insert(packages).values({
      name,
      speed,
      price: parseFloat(price),
      description,
      features: JSON.stringify(features),
      isPopular: isPopular || false,
      isActive: isActive !== false,
      sortOrder: sortOrder || 0,
    }).returning();

    return NextResponse.json({
      success: true,
      package: {
        ...newPackage,
        features: JSON.parse(newPackage.features),
      },
    });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}

// PUT update package
export async function PUT(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, speed, price, description, features, isPopular, isActive, sortOrder } = body;

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    const [updated] = await db.update(packages)
      .set({
        name,
        speed,
        price: parseFloat(price),
        description,
        features: JSON.stringify(features),
        isPopular,
        isActive,
        sortOrder,
        updatedAt: new Date(),
      })
      .where(eq(packages.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      package: {
        ...updated,
        features: JSON.parse(updated.features),
      },
    });
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

// DELETE package
export async function DELETE(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    await db.delete(packages).where(eq(packages.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
