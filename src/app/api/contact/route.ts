import { NextRequest, NextResponse } from 'next/server';

// npm install resend
// Add RESEND_API_KEY to your .env.local (get one free at https://resend.com)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Sri Sanjana Website <onboarding@resend.dev>', // replace once your domain is verified
      to: 'hello@srisanjana.com', // replace with the inbox that should receive enquiries
      replyTo: email,
      subject: `New enquiry: ${service}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}