import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactRequests } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
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

// GET all contact requests
export async function GET(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const allRequests = await db.query.contactRequests.findMany({
      orderBy: [desc(contactRequests.createdAt)],
    });

    const filteredRequests = status
      ? allRequests.filter(r => r.status === status)
      : allRequests;

    return NextResponse.json({ contacts: filteredRequests });
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    return NextResponse.json({ error: 'Failed to fetch contact requests' }, { status: 500 });
  }
}

// PUT update contact request
export async function PUT(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Contact request ID is required' }, { status: 400 });
    }

    const validStatuses = ['NEW', 'CONTACTED', 'RESOLVED', 'ARCHIVED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const [updated] = await db.update(contactRequests)
      .set(updateData)
      .where(eq(contactRequests.id, id))
      .returning();

    return NextResponse.json({ success: true, contact: updated });
  } catch (error) {
    console.error('Error updating contact request:', error);
    return NextResponse.json({ error: 'Failed to update contact request' }, { status: 500 });
  }
}

// DELETE contact request
export async function DELETE(request: NextRequest) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Contact request ID is required' }, { status: 400 });
    }

    await db.delete(contactRequests).where(eq(contactRequests.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact request:', error);
    return NextResponse.json({ error: 'Failed to delete contact request' }, { status: 500 });
  }
}
