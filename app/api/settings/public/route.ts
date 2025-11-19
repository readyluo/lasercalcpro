import { NextResponse } from 'next/server';
import { getSetting } from '@/lib/db/settings';

export const runtime = 'nodejs';

const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
};

function buildResponse(body: {
  ga4MeasurementId: string;
  adsenseClientId: string;
  adsenseEnabled: boolean;
}) {
  return NextResponse.json(body, {
    status: 200,
    headers: CACHE_HEADERS,
  });
}

/**
 * GET /api/settings/public
 * Returns publicly accessible settings (GA4, AdSense, etc.)
 */
export async function GET() {
  try {
    const [ga4Id, adsenseId, adsenseEnabled] = await Promise.all([
      getSetting('ga4_measurement_id'),
      getSetting('adsense_client_id'),
      getSetting('adsense_enabled'),
    ]);

    return buildResponse({
      ga4MeasurementId: ga4Id || process.env.NEXT_PUBLIC_GA_ID || '',
      adsenseClientId: adsenseId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
      adsenseEnabled: adsenseEnabled === 'true',
    });
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return buildResponse({
      ga4MeasurementId: process.env.NEXT_PUBLIC_GA_ID || '',
      adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
      adsenseEnabled: true,
    });
  }
}
