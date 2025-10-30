import { NextRequest, NextResponse } from 'next/server';
import { confirmSubscription, getSubscriberByToken } from '@/lib/db/subscribers';

// Use edge runtime for Cloudflare compatibility
export const runtime = 'edge';

/**
 * GET /api/subscribe/confirm?token=xxx - Confirm subscription
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Missing confirmation token' },
        { status: 400 }
      );
    }

    // Verify token exists
    const subscriber = await getSubscriberByToken(token);
    if (!subscriber) {
      return NextResponse.json(
        { error: 'Invalid confirmation token' },
        { status: 404 }
      );
    }

    // Check if already confirmed
    if (subscriber.is_confirmed) {
      return NextResponse.redirect(
        new URL('/subscribe/already-confirmed', request.url)
      );
    }

    // Confirm subscription
    const success = await confirmSubscription(token);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to confirm subscription' },
        { status: 500 }
      );
    }

    // Note: Welcome email should be sent via external service (SendGrid/Mailgun)
    // TODO: Trigger welcome email via webhook to email service
    console.log('✅ Subscription confirmed for:', subscriber.email);

    // Redirect to success page
    return NextResponse.redirect(
      new URL('/subscribe/confirmed', request.url)
    );
  } catch (error) {
    console.error('Error in GET /api/subscribe/confirm:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

