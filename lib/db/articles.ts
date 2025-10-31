import { D1Database } from '@cloudflare/workers-types';
import { executeQuery, executeWrite } from './client';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  tags?: string[];
  featured_image?: string;
  author_id?: number;
  status: 'draft' | 'published' | 'archived';
  views: number;
  reading_time?: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface ArticleFilters {
  status?: string;
  category?: string;
  tag?: string;
  search?: string;
  author_id?: number;
}

export interface ArticleStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
}

export interface ArchiveGroup {
  year: number;
  month: number;
  count: number;
  articles?: Article[];
}

// Create a new article
export async function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<number> {
  const query = `
    INSERT INTO articles (
      title, slug, excerpt, content, category, tags, featured_image,
      author_id, status, reading_time, meta_title, meta_description, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const tagsJson = article.tags ? JSON.stringify(article.tags) : null;
  const publishedAt = article.status === 'published' ? new Date().toISOString() : null;
  
  const result = await executeWrite(query, [
    article.title,
    article.slug,
    article.excerpt || null,
    article.content,
    article.category || null,
    tagsJson,
    article.featured_image || null,
    article.author_id || null,
    article.status,
    article.reading_time || null,
    article.meta_title || null,
    article.meta_description || null,
    publishedAt,
  ]);

  return result ? 1 : 0; // Return a dummy ID
}

// Get article by ID
export async function getArticleById(id: number): Promise<Article | null> {
  const query = `SELECT * FROM articles WHERE id = ?`;
  const result = await executeQuery<Article>(query, [id]);
  
  if (result && result.length > 0) {
    const article = result[0];
    if (article.tags && typeof article.tags === 'string') {
      article.tags = JSON.parse(article.tags);
    }
    return article;
  }
  
  return null;
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const query = `SELECT * FROM articles WHERE slug = ? AND status = 'published'`;
  const result = await executeQuery<Article>(query, [slug]);
  
  if (result && result.length > 0) {
    const article = result[0];
    if (article.tags && typeof article.tags === 'string') {
      article.tags = JSON.parse(article.tags);
    }
    return article;
  }
  
  return null;
}

// Get articles with filters and pagination
export async function getArticles(
  filters: ArticleFilters = {},
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number }> {
  const offset = (page - 1) * limit;
  const conditions: string[] = [];
  const params: any[] = [];

  if (filters.status) {
    conditions.push('status = ?');
    params.push(filters.status);
  }

  if (filters.category) {
    conditions.push('category = ?');
    params.push(filters.category);
  }

  if (filters.tag) {
    conditions.push('tags LIKE ?');
    params.push(`%"${filters.tag}"%`);
  }

  if (filters.search) {
    conditions.push('(title LIKE ? OR content LIKE ? OR excerpt LIKE ?)');
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (filters.author_id) {
    conditions.push('author_id = ?');
    params.push(filters.author_id);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count
  const countQuery = `SELECT COUNT(*) as count FROM articles ${whereClause}`;
  const countResult = await executeQuery<{ count: number }>(countQuery, params);
  const total = countResult && countResult.length > 0 ? countResult[0].count : 0;

  // Get articles
  const articlesQuery = `
    SELECT * FROM articles
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  const articles = await executeQuery<Article>(articlesQuery, [...params, limit, offset]);

  // Parse tags
  if (articles) {
    articles.forEach(article => {
      if (article.tags && typeof article.tags === 'string') {
        article.tags = JSON.parse(article.tags);
      }
    });
  }

  return {
    articles: articles || [],
    total,
  };
}

// Get published articles by category
export async function getPublishedArticlesByCategory(
  category: string,
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number }> {
  return getArticles({ status: 'published', category }, page, limit);
}

// Get published articles by tag
export async function getPublishedArticlesByTag(
  tag: string,
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number }> {
  return getArticles({ status: 'published', tag }, page, limit);
}

// Get articles by author
export async function getArticlesByAuthor(
  authorId: number,
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number }> {
  return getArticles({ status: 'published', author_id: authorId }, page, limit);
}

// Update article
export async function updateArticle(id: number, updates: Partial<Article>): Promise<boolean> {
  const fields: string[] = [];
  const params: any[] = [];

  Object.entries(updates).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'created_at' && value !== undefined) {
      fields.push(`${key} = ?`);
      if (key === 'tags' && Array.isArray(value)) {
        params.push(JSON.stringify(value));
      } else if (key === 'status' && value === 'published' && !updates.published_at) {
        // Auto-set published_at if changing to published
        fields.push('published_at = ?');
        params.push(value);
        params.push(new Date().toISOString());
      } else {
        params.push(value);
      }
    }
  });

  if (fields.length === 0) {
    return false;
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');

  const query = `
    UPDATE articles
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  params.push(id);
  return executeWrite(query, params);
}

// Delete article
export async function deleteArticle(id: number): Promise<boolean> {
  const query = `DELETE FROM articles WHERE id = ?`;
  return executeWrite(query, [id]);
}

// Increment article views
export async function incrementArticleViews(id: number): Promise<boolean> {
  const query = `UPDATE articles SET views = views + 1 WHERE id = ?`;
  return executeWrite(query, [id]);
}

// Get article statistics
export async function getArticleStats(): Promise<ArticleStats> {
  const query = `
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
      SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
      SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived,
      SUM(views) as totalViews
    FROM articles
  `;
  
  const result = await executeQuery<any>(query, []);
  
  if (result && result.length > 0) {
    return {
      total: result[0].total || 0,
      published: result[0].published || 0,
      draft: result[0].draft || 0,
      archived: result[0].archived || 0,
      totalViews: result[0].totalViews || 0,
    };
  }
  
  return {
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
    totalViews: 0,
  };
}

// Get related articles
export async function getRelatedArticles(articleId: number, category?: string, limit: number = 3): Promise<Article[]> {
  const query = `
    SELECT * FROM articles
    WHERE id != ? AND status = 'published' ${category ? 'AND category = ?' : ''}
    ORDER BY created_at DESC
    LIMIT ?
  `;
  
  const params = category ? [articleId, category, limit] : [articleId, limit];
  const articles = await executeQuery<Article>(query, params);
  
  if (articles) {
    articles.forEach(article => {
      if (article.tags && typeof article.tags === 'string') {
        article.tags = JSON.parse(article.tags);
      }
    });
  }
  
  return articles || [];
}

// Publish articles that are scheduled and due
export async function publishDueArticles(): Promise<number> {
  const query = `
    UPDATE articles
    SET status = 'published'
    WHERE status = 'draft'
      AND published_at IS NOT NULL
      AND published_at <= CURRENT_TIMESTAMP
  `;
  
  const result = await executeWrite(query, []);
  return result ? 1 : 0; // Return count of updated rows (simplified)
}

// Get archive groups (year/month with counts)
export async function getArchiveGroups(): Promise<ArchiveGroup[]> {
  const query = `
    SELECT 
      strftime('%Y', published_at) as year,
      strftime('%m', published_at) as month,
      COUNT(*) as count
    FROM articles
    WHERE status = 'published' AND published_at IS NOT NULL
    GROUP BY year, month
    ORDER BY year DESC, month DESC
  `;
  
  const result = await executeQuery<{ year: string; month: string; count: number }>(query, []);
  
  if (!result) return [];
  
  return result.map(row => ({
    year: parseInt(row.year, 10),
    month: parseInt(row.month, 10),
    count: row.count,
  }));
}

// Get articles by year and month
export async function getArticlesByYearMonth(
  year: number,
  month: number,
  page: number = 1,
  limit: number = 20
): Promise<{ articles: Article[]; total: number }> {
  const offset = (page - 1) * limit;
  
  const countQuery = `
    SELECT COUNT(*) as count
    FROM articles
    WHERE status = 'published'
      AND strftime('%Y', published_at) = ?
      AND strftime('%m', published_at) = ?
  `;
  
  const yearStr = year.toString();
  const monthStr = month.toString().padStart(2, '0');
  
  const countResult = await executeQuery<{ count: number }>(countQuery, [yearStr, monthStr]);
  const total = countResult && countResult.length > 0 ? countResult[0].count : 0;
  
  const articlesQuery = `
    SELECT * FROM articles
    WHERE status = 'published'
      AND strftime('%Y', published_at) = ?
      AND strftime('%m', published_at) = ?
    ORDER BY published_at DESC
    LIMIT ? OFFSET ?
  `;
  
  const articles = await executeQuery<Article>(articlesQuery, [yearStr, monthStr, limit, offset]);
  
  if (articles) {
    articles.forEach(article => {
      if (article.tags && typeof article.tags === 'string') {
        article.tags = JSON.parse(article.tags);
      }
    });
  }
  
  return {
    articles: articles || [],
    total,
  };
}
