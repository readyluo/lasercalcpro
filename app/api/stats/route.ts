import { NextRequest, NextResponse } from 'next/server';
import { getCalculationStats } from '@/lib/db/calculations';
import { getSubscriberStats } from '@/lib/db/subscribers';
import { getArticleStats } from '@/lib/db/articles';

export const runtime = 'edge';

/**
 * GET /api/stats - Get general statistics (public)
 */
export async function GET(request: NextRequest) {
  try {
    const [calculationStats, subscriberStats, articleStats] = await Promise.all([
      getCalculationStats(),
      getSubscriberStats(),
      getArticleStats(),
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
      articles: {
        total: articleStats.total,
        published: articleStats.published,
        draft: articleStats.draft,
        total_views: articleStats.totalViews,
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









