import { NextRequest, NextResponse } from 'next/server';
import { sendCalculationEmail } from '@/lib/email/send-calculation';

export const runtime = 'nodejs'; // Changed from 'edge' - nodemailer requires Node.js runtime

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, title, calculationType, inputData, results } = body;

    if (!email || !title || !calculationType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Send email with calculation results
    await sendCalculationEmail({
      to: email,
      title,
      calculationType,
      inputData,
      results,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

