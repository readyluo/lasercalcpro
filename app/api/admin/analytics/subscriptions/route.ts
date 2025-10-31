import { NextResponse } from 'next/server';
import { getKeyMetrics, getSourceBreakdown, getWeeklyTrend, getFunnel } from '@/lib/analytics/subscriptions';

export const runtime = 'edge';

export async function GET() {
  try {
    const [metrics, sources, trend, funnel] = await Promise.all([
      getKeyMetrics(),
      getSourceBreakdown(),
      getWeeklyTrend(12),
      getFunnel(),
    ]);
    return NextResponse.json({ metrics, sources, trend, funnel });
  } catch (error) {
    console.error('Subscriptions analytics error:', error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}
