import { NextRequest, NextResponse } from 'next/server';
import { saveCalculation } from '@/lib/db/calculations';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolType, params, result } = body;

    if (!toolType || !params || !result) {
      return NextResponse.json(
        { error: 'Missing required fields: toolType, params, result' },
        { status: 400 }
      );
    }

    // Save calculation to database for analytics
    await saveCalculation({
      toolType,
      params: JSON.stringify(params),
      result: JSON.stringify(result),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to save calculation:', error);
    // Don't fail the request if analytics saving fails
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 200 });
  }
}











