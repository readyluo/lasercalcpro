import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth/admin';
import { createArticle, getArticleBySlug, updateArticle, Article } from '@/lib/db/articles';

export const runtime = 'nodejs';

interface ImportArticleData {
  title: string;
  slug: string;
  category?: 'tutorials' | 'industry' | 'case-studies' | 'news';
  excerpt?: string;
  content: string;
  tags?: string | string[];
  status?: 'draft' | 'published' | 'archived';
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  author_id?: number;
  published_at?: string;
}

interface ImportResponse {
  success: boolean;
  message: string;
  imported: number;
  updated: number;
  failed: number;
  details: {
    slug: string;
    action: 'imported' | 'updated' | 'failed';
    error?: string;
  }[];
}

/**
 * POST /api/admin/articles/import
 * Batch import articles
 * Body: { articles: ImportArticleData[] }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth(request);
    if (!authResult.authorized || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { articles } = body;

    if (!Array.isArray(articles) || articles.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: articles array is required' },
        { status: 400 }
      );
    }

    const response: ImportResponse = {
      success: true,
      message: '',
      imported: 0,
      updated: 0,
      failed: 0,
      details: []
    };

    // Process each article
    for (const articleData of articles) {
      try {
        // Validate required fields
        if (!articleData.title || !articleData.slug || !articleData.content) {
          response.failed++;
          response.details.push({
            slug: articleData.slug || 'unknown',
            action: 'failed',
            error: 'Missing required fields: title, slug, or content'
          });
          continue;
        }

        // Check if article exists
        const existingArticle = await getArticleBySlug(articleData.slug);

        // Prepare article data
        const tags = Array.isArray(articleData.tags)
          ? articleData.tags
          : typeof articleData.tags === 'string'
          ? JSON.parse(articleData.tags)
          : [];

        const articleInput = {
          title: articleData.title,
          slug: articleData.slug,
          excerpt: articleData.excerpt,
          content: articleData.content,
          category: articleData.category,
          tags: tags,
          status: articleData.status || 'published',
          featured_image: articleData.featured_image,
          meta_title: articleData.meta_title,
          meta_description: articleData.meta_description,
          meta_keywords: articleData.meta_keywords,
          author_id: articleData.author_id || authResult.user.id,
          published_at: articleData.published_at || (articleData.status === 'published' ? new Date().toISOString() : undefined)
        };

        if (existingArticle) {
          // Update existing article
          const updated = await updateArticle(existingArticle.id, articleInput);
          if (updated) {
            response.updated++;
            response.details.push({
              slug: articleData.slug,
              action: 'updated'
            });
          } else {
            response.failed++;
            response.details.push({
              slug: articleData.slug,
              action: 'failed',
              error: 'Failed to update article'
            });
          }
        } else {
          // Create new article
          const created = await createArticle(articleInput);
          if (created) {
            response.imported++;
            response.details.push({
              slug: articleData.slug,
              action: 'imported'
            });
          } else {
            response.failed++;
            response.details.push({
              slug: articleData.slug,
              action: 'failed',
              error: 'Failed to create article'
            });
          }
        }
      } catch (error) {
        console.error(`Error processing article ${articleData.slug}:`, error);
        response.failed++;
        response.details.push({
          slug: articleData.slug || 'unknown',
          action: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Generate summary message
    response.message = `Processed ${articles.length} articles: ${response.imported} imported, ${response.updated} updated, ${response.failed} failed`;
    response.success = response.failed === 0;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Article import error:', error);
    return NextResponse.json(
      { error: 'Failed to import articles' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/articles/import?action=verify
 * Verify import capability and return article count
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth(request);
    if (!authResult.authorized || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'verify') {
      return NextResponse.json({
        ready: true,
        message: 'Article import API is ready',
        endpoint: '/api/admin/articles/import'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Article import verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify import capability' },
      { status: 500 }
    );
  }
}












