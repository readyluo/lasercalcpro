import { executeQuery } from '@/lib/db/client';

export interface KeyMetrics {
  total: number;
  newThisMonth: number;
  unsubscribesThisMonth: number;
  netGrowthRate: number; // percentage
  avgRetentionDays: number | null;
}

export interface SourceBreakdownItem {
  source_tool: string | null;
  count: number;
}

export interface WeeklyTrendItem {
  weekStart: string; // ISO date of Monday
  total: number;
}

export interface Funnel {
  step1_pageViews: number;
  step2_formShown: number;
  step3_emailSubmitted: number;
  step4_confirmed: number;
}

export async function getKeyMetrics(): Promise<KeyMetrics> {
  const totalRow = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM subscribers WHERE unsubscribed_at IS NULL`
  );
  const newMonth = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM subscribers WHERE DATE(subscribed_at) >= DATE('now','start of month')`
  );
  const unsubMonth = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM subscribers WHERE DATE(unsubscribed_at) >= DATE('now','start of month')`
  );
  const retention = await executeQuery<{ days: number }>(
    `SELECT AVG(julianday(COALESCE(unsubscribed_at, CURRENT_TIMESTAMP)) - julianday(subscribed_at)) as days FROM subscribers`
  );

  const total = totalRow[0]?.count || 0;
  const newThisMonth = newMonth[0]?.count || 0;
  const unsubscribesThisMonth = unsubMonth[0]?.count || 0;
  const netGrowthRate = total === 0 ? 0 : ((newThisMonth - unsubscribesThisMonth) / Math.max(1, total)) * 100;
  const avgRetentionDays = retention[0]?.days || null;

  return { total, newThisMonth, unsubscribesThisMonth, netGrowthRate, avgRetentionDays };
}

export async function getSourceBreakdown(): Promise<SourceBreakdownItem[]> {
  const rows = await executeQuery<SourceBreakdownItem>(
    `SELECT source_tool, COUNT(*) as count FROM subscribers GROUP BY source_tool ORDER BY count DESC`
  );
  return rows;
}

export async function getWeeklyTrend(weeks = 12): Promise<WeeklyTrendItem[]> {
  const rows = await executeQuery<{ week: string; total: number }>(
    `SELECT strftime('%Y-%W', subscribed_at) as week, COUNT(*) as total
     FROM subscribers
     WHERE subscribed_at >= DATE('now', ?)
     GROUP BY strftime('%Y-%W', subscribed_at)
     ORDER BY week ASC`,
    [`-${weeks * 7} days`]
  );
  // Convert year-week to Monday ISO date
  const result: WeeklyTrendItem[] = rows.map((r) => {
    const [yearStr, weekStr] = r.week.split('-');
    const year = parseInt(yearStr, 10);
    const week = parseInt(weekStr, 10);
    const date = getDateOfISOWeek(week, year);
    return { weekStart: date.toISOString().slice(0, 10), total: r.total };
  });
  return result;
}

export async function getFunnel(): Promise<Funnel> {
  // Page views are proxied via audit logs analytics or set zero if unavailable
  const pageViewsRow = await executeQuery<{ total: number }>(
    `SELECT 0 as total`
  );
  const formShownRow = await executeQuery<{ total: number }>(
    `SELECT 0 as total`
  );
  const submittedRow = await executeQuery<{ total: number }>(
    `SELECT COUNT(*) as total FROM subscribers`
  );
  const confirmedRow = await executeQuery<{ total: number }>(
    `SELECT COUNT(*) as total FROM subscribers WHERE is_confirmed = TRUE`
  );

  return {
    step1_pageViews: pageViewsRow[0]?.total || 0,
    step2_formShown: formShownRow[0]?.total || 0,
    step3_emailSubmitted: submittedRow[0]?.total || 0,
    step4_confirmed: confirmedRow[0]?.total || 0,
  };
}

function getDateOfISOWeek(w: number, y: number): Date {
  const simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7));
  const dow = simple.getUTCDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  else ISOweekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  return ISOweekStart;
}
