import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';

// Generate order number
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TO${year}${month}${day}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, address, postcode, packageId, notes } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address || !postcode || !packageId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate UK phone number (basic check)
    const phoneRegex = /^(\+44|0)[0-9]{10,11}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid UK phone number' },
        { status: 400 }
      );
    }

    // Verify package exists
    const pkg = await db.query.packages.findFirst({
      where: (packages, { eq }) => eq(packages.id, packageId),
    });

    if (!pkg) {
      return NextResponse.json(
        { error: 'Invalid package selected' },
        { status: 400 }
      );
    }

    // Create order
    const orderNumber = generateOrderNumber();
    const [newOrder] = await db.insert(orders).values({
      orderNumber,
      firstName,
      lastName,
      email,
      phone: cleanPhone,
      address,
      postcode: postcode.toUpperCase(),
      packageId,
      notes: notes || null,
      status: 'PENDING',
    }).returning();

    return NextResponse.json({
      success: true,
      orderNumber: newOrder.orderNumber,
      message: 'Your order has been submitted successfully. We will contact you shortly.',
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
