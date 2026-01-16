import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactRequests } from '@/lib/db/schema';
import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  secure: true,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
});

// HTML email template
function getEmailTemplate(firstName: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thames Optic - Request Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Thames Optic</h1>
              <p style="margin: 10px 0 0; color: #bfdbfe; font-size: 14px;">Ultra-Fast Fibre Broadband</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 24px; font-weight: 600;">Thank You, ${firstName}!</h2>

              <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                We have received your request and are excited to have you interested in Thames Optic broadband services.
              </p>

              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #1e40af; font-size: 16px; font-weight: 500;">
                  🚀 Our service is coming soon to your area!
                </p>
              </div>

              <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                Our team is working hard to bring ultra-fast fibre broadband to your neighbourhood. We will contact you as soon as our service becomes available in your area.
              </p>

              <p style="margin: 0 0 30px; color: #475569; font-size: 16px; line-height: 1.6;">
                In the meantime, if you have any questions, feel free to reach out to us.
              </p>

              <!-- What to Expect -->
              <h3 style="margin: 0 0 15px; color: #1e293b; font-size: 18px; font-weight: 600;">What to Expect:</h3>
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #475569; font-size: 15px; line-height: 1.8;">
                <li>Lightning-fast speeds up to 1Gbps</li>
                <li>Reliable, unlimited data</li>
                <li>No hidden fees or price increases</li>
                <li>Local customer support</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px; color: #64748b; font-size: 14px;">
                Best regards,<br>
                <strong style="color: #1e293b;">The Thames Optic Team</strong>
              </p>
              <p style="margin: 20px 0 0; color: #94a3b8; font-size: 12px;">
                Thames Optic Ltd | Ultra-Fast Fibre Broadband
              </p>
              <p style="margin: 5px 0 0; color: #94a3b8; font-size: 12px;">
                <a href="mailto:info@thamesoptic.com" style="color: #3b82f6; text-decoration: none;">info@thamesoptic.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

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

    // Send confirmation email
    try {
      await transporter.sendMail({
        from: `"Thames Optic" <${process.env.SENDMAIL}>`,
        to: email,
        subject: 'We Received Your Request - Thames Optic',
        html: getEmailTemplate(firstName),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

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
