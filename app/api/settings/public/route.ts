import { NextRequest, NextResponse } from 'next/server';
import { getSetting } from '@/lib/db/settings';

export const runtime = 'nodejs';

/**
 * GET /api/settings/public
 * Returns publicly accessible settings (GA4, AdSense, etc.)
 */
export async function GET() {
  try {
    const ga4Id = await getSetting('ga4_measurement_id');
    const adsenseId = await getSetting('adsense_client_id');
    const adsenseEnabled = await getSetting('adsense_enabled');

    return NextResponse.json(
      {
        ga4MeasurementId: ga4Id || process.env.NEXT_PUBLIC_GA_ID || '',
        adsenseClientId: adsenseId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
        adsenseEnabled: adsenseEnabled === 'true',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching public settings:', error);
    // Fallback to environment variables
    return NextResponse.json(
      {
        ga4MeasurementId: process.env.NEXT_PUBLIC_GA_ID || '',
        adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
        adsenseEnabled: true,
      },
      { status: 200 }
    );
  }
}

