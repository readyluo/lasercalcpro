import { NextRequest, NextResponse } from 'next/server';
import { createSubscriber } from '@/lib/db/subscribers';
import { z } from 'zod';

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

    // In production, send confirmation email here
    // For now, we'll return the token (in production, don't expose this)
    if (process.env.NODE_ENV === 'development' && result.token) {
      console.log('Confirmation token:', result.token);
      console.log('Confirmation URL:', `${process.env.NEXT_PUBLIC_SITE_URL}/api/subscribe/confirm?token=${result.token}`);
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

