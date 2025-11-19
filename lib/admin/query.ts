interface ArticleQueryOptions {
  page: number;
  limit: number;
  includeStats?: boolean;
  status?: string;
  category?: string;
  search?: string;
}

interface SubscriberQueryOptions {
  page: number;
  limit: number;
  isConfirmed?: string;
  search?: string;
}

interface CalculationQueryOptions {
  page: number;
  limit: number;
  toolType?: string;
  startDate?: string;
  endDate?: string;
  country?: string;
}

interface AuditLogQueryOptions {
  page?: number;
  limit?: number;
  keyword?: string;
  action?: string;
  module?: string;
  from?: string;
  to?: string;
}

export function buildArticleQuery(params: ArticleQueryOptions): string {
  const sp = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  sp.set('stats', params.includeStats ? 'true' : 'false');

  if (params.status) sp.set('status', params.status);
  if (params.category) sp.set('category', params.category);
  if (params.search) sp.set('search', params.search);

  return sp.toString();
}

export function buildSubscriberQuery(params: SubscriberQueryOptions): string {
  const sp = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  if (params.isConfirmed) sp.set('is_confirmed', params.isConfirmed);
  if (params.search) sp.set('search', params.search);

  return sp.toString();
}

export function buildCalculationQuery(params: CalculationQueryOptions): string {
  const sp = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  if (params.toolType) sp.set('tool_type', params.toolType);
  if (params.startDate) sp.set('start_date', params.startDate);
  if (params.endDate) sp.set('end_date', params.endDate);
  if (params.country) sp.set('country', params.country);

  return sp.toString();
}

export function buildAuditLogQuery(params: AuditLogQueryOptions): string {
  const sp = new URLSearchParams();

  if (params.page) sp.set('page', params.page.toString());
  if (params.limit) sp.set('limit', params.limit.toString());
  if (params.keyword) sp.set('q', params.keyword);
  if (params.action) sp.set('action', params.action);
  if (params.module) sp.set('module', params.module);
  if (params.from) sp.set('from', params.from);
  if (params.to) sp.set('to', params.to);

  return sp.toString();
}
