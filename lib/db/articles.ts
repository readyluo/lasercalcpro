import { executeQuery, executeWrite } from './client';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: 'tutorials' | 'industry' | 'case-studies' | 'news';
  tags?: string; // JSON array of strings
  author_id?: number;
  status: 'draft' | 'published' | 'archived';
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  views: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: Article['category'];
  tags?: string[];
  author_id?: number;
  status?: Article['status'];
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  published_at?: string;
}

export interface ArticleFilters {
  status?: Article['status'];
  category?: Article['category'];
  author_id?: number;
  search?: string; // Search in title, excerpt, content
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: 'created_at' | 'updated_at' | 'published_at' | 'views' | 'title';
  orderDir?: 'ASC' | 'DESC';
}

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Generate unique slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .substring(0, 100); // Limit length
}

/**
 * Check if slug exists
 */
export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  let query = 'SELECT COUNT(*) as count FROM articles WHERE slug = ?';
  const params: any[] = [slug];

  if (excludeId) {
    query += ' AND id != ?';
    params.push(excludeId);
  }

  const result = await executeQuery<{ count: number }>(query, params);
  return (result[0]?.count || 0) > 0;
}

/**
 * Create a new article
 */
export async function createArticle(data: ArticleInput): Promise<Article | null> {
  try {
    // Ensure unique slug
    let slug = data.slug || generateSlug(data.title);
    let counter = 1;
    while (await slugExists(slug)) {
      slug = `${data.slug || generateSlug(data.title)}-${counter}`;
      counter++;
    }

    const query = `
      INSERT INTO articles (
        title, slug, excerpt, content, category, tags, author_id,
        status, featured_image, meta_title, meta_description, meta_keywords,
        published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.title,
      slug,
      data.excerpt || null,
      data.content,
      data.category || null,
      data.tags ? JSON.stringify(data.tags) : null,
      data.author_id || null,
      data.status || 'draft',
      data.featured_image || null,
      data.meta_title || data.title,
      data.meta_description || data.excerpt || null,
      data.meta_keywords || null,
      data.status === 'published' && !data.published_at ? new Date().toISOString() : (data.published_at || null),
    ];

    const success = await executeWrite(query, params);
    
    if (success) {
      const lastId = await executeQuery<{ id: number }>(
        'SELECT last_insert_rowid() as id'
      );
      const id = lastId[0]?.id;
      
      if (id) {
        return getArticleById(id);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
}

/**
 * Get article by ID
 */
export async function getArticleById(id: number): Promise<Article | null> {
  const query = 'SELECT * FROM articles WHERE id = ?';
  const results = await executeQuery<Article>(query, [id]);
  return results[0] || null;
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const query = 'SELECT * FROM articles WHERE slug = ?';
  const results = await executeQuery<Article>(query, [slug]);
  return results[0] || null;
}

/**
 * Update article
 */
export async function updateArticle(
  id: number,
  data: Partial<ArticleInput>
): Promise<Article | null> {
  try {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.title !== undefined) {
      fields.push('title = ?');
      values.push(data.title);
    }
    if (data.slug !== undefined) {
      // Check slug uniqueness
      if (await slugExists(data.slug, id)) {
        throw new Error('Slug already exists');
      }
      fields.push('slug = ?');
      values.push(data.slug);
    }
    if (data.excerpt !== undefined) {
      fields.push('excerpt = ?');
      values.push(data.excerpt);
    }
    if (data.content !== undefined) {
      fields.push('content = ?');
      values.push(data.content);
    }
    if (data.category !== undefined) {
      fields.push('category = ?');
      values.push(data.category);
    }
    if (data.tags !== undefined) {
      fields.push('tags = ?');
      values.push(JSON.stringify(data.tags));
    }
    if (data.author_id !== undefined) {
      fields.push('author_id = ?');
      values.push(data.author_id);
    }
    if (data.status !== undefined) {
      fields.push('status = ?');
      values.push(data.status);
      
      // Set published_at when status changes to published
      if (data.status === 'published' && !data.published_at) {
        fields.push('published_at = ?');
        values.push(new Date().toISOString());
      }
    }
    if (data.featured_image !== undefined) {
      fields.push('featured_image = ?');
      values.push(data.featured_image);
    }
    if (data.meta_title !== undefined) {
      fields.push('meta_title = ?');
      values.push(data.meta_title);
    }
    if (data.meta_description !== undefined) {
      fields.push('meta_description = ?');
      values.push(data.meta_description);
    }
    if (data.meta_keywords !== undefined) {
      fields.push('meta_keywords = ?');
      values.push(data.meta_keywords);
    }
    if (data.published_at !== undefined) {
      fields.push('published_at = ?');
      values.push(data.published_at);
    }

    if (fields.length === 0) {
      return getArticleById(id);
    }

    values.push(id);

    const success = await executeWrite(
      `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    if (success) {
      return getArticleById(id);
    }

    return null;
  } catch (error) {
    console.error('Error updating article:', error);
    return null;
  }
}

/**
 * Delete article
 */
export async function deleteArticle(id: number): Promise<boolean> {
  try {
    const result = await executeWrite('DELETE FROM articles WHERE id = ?', [id]);
    return result !== null && result !== undefined;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
}

/**
 * Get articles with pagination and filters
 */
export async function getArticles(
  filters: ArticleFilters = {},
  pagination: PaginationParams = {}
): Promise<PaginatedArticles> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 20;
  const offset = (page - 1) * limit;
  const orderBy = pagination.orderBy || 'created_at';
  const orderDir = pagination.orderDir || 'DESC';

  // Build WHERE clause
  const whereClauses: string[] = [];
  const params: any[] = [];

  if (filters.status) {
    whereClauses.push('status = ?');
    params.push(filters.status);
  }

  if (filters.category) {
    whereClauses.push('category = ?');
    params.push(filters.category);
  }

  if (filters.author_id) {
    whereClauses.push('author_id = ?');
    params.push(filters.author_id);
  }

  if (filters.search) {
    whereClauses.push('(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)');
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // Get total count
  const countQuery = `SELECT COUNT(*) as count FROM articles ${whereClause}`;
  const countResult = await executeQuery<{ count: number }>(countQuery, params);
  const total = countResult[0]?.count || 0;

  // Get articles
  const articlesQuery = `
    SELECT * FROM articles 
    ${whereClause}
    ORDER BY ${orderBy} ${orderDir}
    LIMIT ? OFFSET ?
  `;

  const articles = await executeQuery<Article>(articlesQuery, [...params, limit, offset]);

  return {
    articles,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get published articles only
 */
export async function getPublishedArticles(
  pagination: PaginationParams = {}
): Promise<PaginatedArticles> {
  return getArticles({ status: 'published' }, pagination);
}

/**
 * Increment article views
 */
export async function incrementArticleViews(id: number): Promise<boolean> {
  try {
    const result = await executeWrite('UPDATE articles SET views = views + 1 WHERE id = ?', [id]);
    return result !== null && result !== undefined;
  } catch (error) {
    console.error('Error incrementing views:', error);
    return false;
  }
}

/**
 * Get article statistics
 */
export async function getArticleStats(): Promise<{
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
  byCategory: Record<string, number>;
}> {
  // Total articles
  const totalResult = await executeQuery<{ count: number }>(
    'SELECT COUNT(*) as count FROM articles'
  );
  const total = totalResult[0]?.count || 0;

  // By status
  const publishedResult = await executeQuery<{ count: number }>(
    "SELECT COUNT(*) as count FROM articles WHERE status = 'published'"
  );
  const published = publishedResult[0]?.count || 0;

  const draftResult = await executeQuery<{ count: number }>(
    "SELECT COUNT(*) as count FROM articles WHERE status = 'draft'"
  );
  const draft = draftResult[0]?.count || 0;

  const archivedResult = await executeQuery<{ count: number }>(
    "SELECT COUNT(*) as count FROM articles WHERE status = 'archived'"
  );
  const archived = archivedResult[0]?.count || 0;

  // Total views
  const viewsResult = await executeQuery<{ total: number }>(
    'SELECT SUM(views) as total FROM articles'
  );
  const totalViews = viewsResult[0]?.total || 0;

  // By category
  const categoryResult = await executeQuery<{ category: string; count: number }>(
    'SELECT category, COUNT(*) as count FROM articles WHERE category IS NOT NULL GROUP BY category'
  );
  const byCategory: Record<string, number> = {};
  categoryResult.forEach(row => {
    byCategory[row.category] = row.count;
  });

  return {
    total,
    published,
    draft,
    archived,
    totalViews,
    byCategory,
  };
}

/**
 * Get recent articles
 */
export async function getRecentArticles(limit: number = 5): Promise<Article[]> {
  const query = `
    SELECT * FROM articles 
    WHERE status = 'published'
    ORDER BY published_at DESC 
    LIMIT ?
  `;
  return executeQuery<Article>(query, [limit]);
}

/**
 * Get popular articles
 */
export async function getPopularArticles(limit: number = 5): Promise<Article[]> {
  const query = `
    SELECT * FROM articles 
    WHERE status = 'published'
    ORDER BY views DESC 
    LIMIT ?
  `;
  return executeQuery<Article>(query, [limit]);
}

