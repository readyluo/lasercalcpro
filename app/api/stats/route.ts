import { NextRequest, NextResponse } from 'next/server';
import { getCalculationStats } from '@/lib/db/calculations';
import { getSubscriberStats } from '@/lib/db/subscribers';

export const runtime = 'edge';

/**
 * GET /api/stats - Get general statistics (public)
 */
export async function GET(request: NextRequest) {
  try {
    const [calculationStats, subscriberStats] = await Promise.all([
      getCalculationStats(),
      getSubscriberStats(),
    ]);

    return NextResponse.json({
      success: true,
      calculations: {
        total: calculationStats.total,
        today: calculationStats.today,
        this_week: calculationStats.thisWeek,
        this_month: calculationStats.thisMonth,
      },
      subscribers: {
        total: subscriberStats.total,
        confirmed: subscriberStats.confirmed,
      },
      popular_tools: Object.entries(calculationStats.byTool)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tool, count]) => ({
          tool,
          count,
        })),
    });
  } catch (error) {
    console.error('Error in GET /api/stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}









