import { NextRequest, NextResponse } from 'next/server';
import { saveCalculation, getRecentCalculations } from '@/lib/db/calculations';

export const runtime = 'edge';

/**
 * POST /api/calculations - Save a new calculation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { tool_type, input_params, result } = body;

    // Validate required fields
    if (!tool_type || !input_params || !result) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client information
    const ip = request.headers.get('x-real-ip') || 
               request.headers.get('x-forwarded-for')?.split(',')[0] ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Get geolocation from Cloudflare (if available)
    const country = request.headers.get('cf-ipcountry') || undefined;
    const city = request.headers.get('cf-ipcity') || undefined;

    // Generate or get session ID from cookie
    const sessionId = request.cookies.get('session_id')?.value || 
                     crypto.randomUUID();

    const calculationId = await saveCalculation({
      tool_type,
      input_params,
      result,
      user_ip: ip,
      user_agent: userAgent,
      user_country: country,
      user_city: city,
      session_id: sessionId,
    });

    if (!calculationId) {
      return NextResponse.json(
        { error: 'Failed to save calculation' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      id: calculationId,
    });

    // Set session cookie if new
    if (!request.cookies.get('session_id')) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  } catch (error) {
    console.error('Error in POST /api/calculations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/calculations - Get recent calculations
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const toolType = searchParams.get('tool_type') as any;

    const calculations = await getRecentCalculations(limit, toolType);

    return NextResponse.json({
      success: true,
      calculations: calculations.map(calc => ({
        id: calc.id,
        tool_type: calc.tool_type,
        created_at: calc.created_at,
        // Don't expose sensitive data in public API
      })),
    });
  } catch (error) {
    console.error('Error in GET /api/calculations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

