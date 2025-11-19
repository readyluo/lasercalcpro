import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveCalculation, getRecentCalculations } from '@/lib/db/calculations';
import { CALCULATION_TOOL_TYPES } from '@/lib/types/calculations';

export const runtime = 'edge';

const calculationPayloadSchema = z.object({
  tool_type: z.enum(CALCULATION_TOOL_TYPES),
  input_params: z.record(z.any()),
  result: z.record(z.any()),
});

type CalculationPayload = z.infer<typeof calculationPayloadSchema>;

function normalizePayload(body: unknown): CalculationPayload | null {
  if (typeof body !== 'object' || body === null) {
    return null;
  }

  const candidate = {
    tool_type: (body as any).tool_type ?? (body as any).toolType,
    input_params:
      (body as any).input_params ??
      (body as any).params ??
      (body as any).parameters,
    result: (body as any).result,
  };

  const parsed = calculationPayloadSchema.safeParse(candidate);
  return parsed.success ? parsed.data : null;
}

/**
 * POST /api/calculations - Save a new calculation
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json().catch(() => null);
    const payload = normalizePayload(rawBody);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid payload: tool_type, input_params, and result are required' },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get('x-real-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const country = request.headers.get('cf-ipcountry') || undefined;
    const city = request.headers.get('cf-ipcity') || undefined;

    const existingSession = request.cookies.get('session_id')?.value;
    const sessionId = existingSession || crypto.randomUUID();

    const calculationId = await saveCalculation({
      ...payload,
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

    if (!existingSession) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
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
    const limit = Math.min(
      Math.max(parseInt(searchParams.get('limit') || '10', 10), 1),
      100
    );
    const toolTypeParam = searchParams.get('tool_type');
    const toolType = toolTypeParam && CALCULATION_TOOL_TYPES.includes(toolTypeParam as any)
      ? (toolTypeParam as (typeof CALCULATION_TOOL_TYPES)[number])
      : undefined;

    const calculations = await getRecentCalculations(limit, toolType);

    return NextResponse.json({
      success: true,
      calculations: calculations.map(calc => ({
        id: calc.id,
        tool_type: calc.tool_type,
        created_at: calc.created_at,
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








