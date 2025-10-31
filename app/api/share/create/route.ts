import { NextRequest, NextResponse } from 'next/server';
import { createSharedCalculation } from '@/lib/db/shared-calculations';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolType, calculationData } = body;

    if (!toolType || !calculationData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate short code (simple version, in production use nanoid)
    const shortCode = generateShortCode();

    // Calculate expiration (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Save to database
    await createSharedCalculation({
      shortCode,
      toolType,
      calculationData,
      expiresAt,
    });

    return NextResponse.json({
      success: true,
      shortCode,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Error creating shared calculation:', error);
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}

// Simple short code generator (replace with nanoid in production)
function generateShortCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

