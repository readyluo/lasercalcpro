import { executeQuery } from './client';

export interface Author {
  id: number;
  name: string;
  slug: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  social_links?: string; // JSON
  created_at: string;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const rows = await executeQuery<Author>(
    'SELECT * FROM authors WHERE slug = ?',
    [slug]
  );
  return rows[0] || null;
}

export async function getAuthorArticles(slug: string): Promise<Array<{ id: number; title: string; slug: string; excerpt?: string; published_at?: string }>> {
  // Join authors -> articles via author_id
  const rows = await executeQuery<any>(
    `SELECT a.id, a.title, a.slug, a.excerpt, a.published_at
     FROM articles a
     JOIN authors au ON au.id = a.author_id
     WHERE au.slug = ? AND a.status = 'published'
     ORDER BY a.published_at DESC NULLS LAST, a.created_at DESC`,
    [slug]
  );
  return rows as any;
}
