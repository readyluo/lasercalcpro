import { NextRequest, NextResponse } from 'next/server';
import { createSubscriber } from '@/lib/db/subscribers';
import { z } from 'zod';

// Use edge runtime for compatibility with Cloudflare
export const runtime = 'edge';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source_tool: z.string().optional(),
  source_page: z.string().optional(),
});

/**
 * POST /api/subscribe - Create a new subscription
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = subscribeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, source_tool, source_page } = validation.data;

    // Get client information
    const ip = request.headers.get('x-real-ip') || 
               request.headers.get('x-forwarded-for')?.split(',')[0] ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create subscriber
    const result = await createSubscriber({
      email,
      source_tool,
      source_page,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Note: Email sending is optional and should be configured via external service
    // For now, log the confirmation URL (in production, integrate with email service like SendGrid/Mailgun)
    if (result.token) {
      console.log('📧 Subscription created. Confirmation token:', result.token);
      
      // In development, log the full confirmation URL
      if (process.env.NODE_ENV === 'development') {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lasercalcpro.com';
        console.log('Confirmation URL:', `${siteUrl}/api/subscribe/confirm?token=${result.token}`);
      }
      
      // TODO: In production, trigger email via webhook to external email service
      // Example: Cloudflare Email Worker, SendGrid API, etc.
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription successful! Please check your email to confirm.',
      id: result.id,
    });
  } catch (error) {
    console.error('Error in POST /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

