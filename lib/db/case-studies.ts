import { executeQuery, executeWrite } from './client';

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  industry?: string; // automotive, aerospace, construction, general
  company_size?: 'small' | 'medium' | 'large';
  tools_used?: string; // JSON string array
  hero_image?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  key_metrics?: string; // JSON object
  published_at?: string;
  created_at: string;
}

export interface CaseStudyFilters {
  industry?: string;
  tool?: string; // filter by tools_used contains
  size?: 'small' | 'medium' | 'large';
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: 'published_at' | 'created_at' | 'title';
  orderDir?: 'ASC' | 'DESC';
}

export interface PaginatedCaseStudies {
  items: CaseStudy[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const rows = await executeQuery<CaseStudy>(
    'SELECT * FROM case_studies WHERE slug = ? LIMIT 1',
    [slug]
  );
  return rows[0] || null;
}

export async function getCaseStudies(
  filters: CaseStudyFilters = {},
  pagination: PaginationParams = {}
): Promise<PaginatedCaseStudies> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 12;
  const offset = (page - 1) * limit;
  const orderBy = pagination.orderBy || 'published_at';
  const orderDir = pagination.orderDir || 'DESC';

  const where: string[] = [];
  const params: any[] = [];

  if (filters.industry) {
    where.push('industry = ?');
    params.push(filters.industry);
  }
  if (filters.size) {
    where.push('company_size = ?');
    params.push(filters.size);
  }
  if (filters.tool) {
    where.push('tools_used IS NOT NULL AND tools_used LIKE ?');
    params.push(`%"${filters.tool}"%`);
  }
  if (filters.search) {
    where.push('(title LIKE ? OR challenge LIKE ? OR solution LIKE ? OR results LIKE ?)');
    const q = `%${filters.search}%`;
    params.push(q, q, q, q);
  }

  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const countQuery = `SELECT COUNT(*) as count FROM case_studies ${whereClause}`;
  const countRows = await executeQuery<{ count: number }>(countQuery, params);
  const total = countRows[0]?.count || 0;

  const listQuery = `
    SELECT * FROM case_studies 
    ${whereClause}
    ORDER BY ${orderBy} ${orderDir}
    LIMIT ? OFFSET ?
  `;
  const items = await executeQuery<CaseStudy>(listQuery, [...params, limit, offset]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
