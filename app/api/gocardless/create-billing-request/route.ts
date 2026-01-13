import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';

// GoCardless API configuration
const GOCARDLESS_API_URL = 'https://api.gocardless.com/billing_request_templates';
const GOCARDLESS_VERSION = '2015-07-06';

// Use environment variable for access token (set in .env.local)
const GOCARDLESS_ACCESS_TOKEN = process.env.GOCARDLESS_ACCESS_TOKEN || '';

// Success redirect URL - where user goes after completing payment
const SUCCESS_REDIRECT_URL = process.env.NEXT_PUBLIC_GOCARDLESS_SUCCESS_URL || 'http://localhost:3000/checkout/success';

interface BillingRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  notes?: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  packageSpeed?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: BillingRequestData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.address || !data.postcode) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    if (!data.packageName || !data.packagePrice) {
      return NextResponse.json({
        success: false,
        error: 'Package information is required'
      }, { status: 400 });
    }

    if (!GOCARDLESS_ACCESS_TOKEN) {
      console.error('GoCardless access token not configured');
      return NextResponse.json({
        success: false,
        error: 'Payment system not configured'
      }, { status: 500 });
    }

    // Build payment description
    const paymentDescription = `${data.packageName} - ${data.packageSpeed || 'Broadband'} - Monthly subscription`;

    // Convert price to pence (GoCardless uses smallest currency unit)
    const amountInPence = Math.round(data.packagePrice * 100);

    // Create billing request template payload
    const billingRequestPayload = {
      billing_request_templates: {
        name: data.packageName,
        payment_request_description: paymentDescription,
        payment_request_currency: 'GBP',
        payment_request_amount: amountInPence,
        mandate_request_currency: 'GBP',
        redirect_uri: SUCCESS_REDIRECT_URL,
      }
    };

    // Call GoCardless API
    const gcResponse = await fetch(GOCARDLESS_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GOCARDLESS_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'GoCardless-Version': GOCARDLESS_VERSION,
      },
      body: JSON.stringify(billingRequestPayload),
    });

    if (!gcResponse.ok) {
      const errorData = await gcResponse.json();
      console.error('GoCardless API error:', errorData);
      return NextResponse.json({
        success: false,
        error: 'Failed to create payment request'
      }, { status: 500 });
    }

    const gcData = await gcResponse.json();
    const authorisationUrl = gcData.billing_request_templates?.authorisation_url;

    if (!authorisationUrl) {
      console.error('No authorisation URL returned:', gcData);
      return NextResponse.json({
        success: false,
        error: 'Failed to get payment URL'
      }, { status: 500 });
    }

    // Generate order number
    const orderNumber = `AB${Date.now().toString(36).toUpperCase()}`;

    // Save order to database with pending payment status
    try {
      await db.insert(orders).values({
        orderNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        postcode: data.postcode,
        notes: data.notes || '',
        packageId: data.packageId,
        packageName: data.packageName,
        packagePrice: data.packagePrice.toString(),
        status: 'pending_payment',
        paymentUrl: authorisationUrl,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue anyway - payment is more important
    }

    return NextResponse.json({
      success: true,
      authorisationUrl,
      orderNumber,
    });

  } catch (error) {
    console.error('Billing request error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process payment request'
    }, { status: 500 });
  }
}
