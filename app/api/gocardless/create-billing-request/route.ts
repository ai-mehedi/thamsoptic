import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';

// GoCardless API configuration
// Use sandbox URL for testing, live URL for production
const GOCARDLESS_BASE_URL = process.env.GOCARDLESS_ENVIRONMENT === 'live'
  ? 'https://api.gocardless.com'
  : 'https://api-sandbox.gocardless.com';
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

async function goCardlessRequest(endpoint: string, body: object) {
  const response = await fetch(`${GOCARDLESS_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GOCARDLESS_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'GoCardless-Version': GOCARDLESS_VERSION,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(`GoCardless ${endpoint} error:`, data);
    throw new Error(data.error?.message || 'GoCardless API error');
  }
  return data;
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

    // Step 1: Create a billing request
    const billingRequestPayload = {
      billing_requests: {
        mandate_request: {
          scheme: 'bacs',
        },
        payment_request: {
          description: paymentDescription,
          amount: String(amountInPence),
          currency: 'GBP',
        },
        metadata: {
          customer_name: `${data.firstName} ${data.lastName}`,
          customer_email: data.email,
          package_name: data.packageName,
        },
      }
    };

    const billingRequestData = await goCardlessRequest('/billing_requests', billingRequestPayload);
    const billingRequestId = billingRequestData.billing_requests?.id;

    if (!billingRequestId) {
      console.error('No billing request ID returned:', billingRequestData);
      return NextResponse.json({
        success: false,
        error: 'Failed to create billing request'
      }, { status: 500 });
    }

    // Step 2: Create a billing request flow to get the authorization URL
    const flowPayload = {
      billing_request_flows: {
        redirect_uri: SUCCESS_REDIRECT_URL,
        exit_uri: SUCCESS_REDIRECT_URL,
        links: {
          billing_request: billingRequestId,
        },
      }
    };

    const flowData = await goCardlessRequest('/billing_request_flows', flowPayload);
    const authorisationUrl = flowData.billing_request_flows?.authorisation_url;

    if (!authorisationUrl) {
      console.error('No authorisation URL returned:', flowData);
      return NextResponse.json({
        success: false,
        error: 'Failed to get payment URL'
      }, { status: 500 });
    }

    // Generate order number
    const orderNumber = `TO${Date.now().toString(36).toUpperCase()}`;

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
        status: 'PENDING_PAYMENT',
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
