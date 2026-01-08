import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactRequests } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, postcode, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !postcode) {
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

    // Create contact request
    const [newRequest] = await db.insert(contactRequests).values({
      firstName,
      lastName,
      email,
      phone: cleanPhone,
      postcode: postcode.toUpperCase(),
      message: message || null,
      status: 'NEW',
    }).returning();

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! We will contact you when service becomes available in your area.',
      id: newRequest.id,
    });
  } catch (error) {
    console.error('Contact request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact request' },
      { status: 500 }
    );
  }
}
