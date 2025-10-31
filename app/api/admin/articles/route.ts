// Admin Articles API Routes
import { NextResponse } from 'next/server';
import { requireAuth, AuthenticatedRequest } from '@/lib/auth/middleware';
import {
  getArticles,
  createArticle,
  getArticleStats,
  ArticleInput,
  ArticleFilters,
  PaginationParams,
} from '@/lib/db/articles';
import { z } from 'zod';

// Validation schema
const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  slug: z.string().optional(),
  excerpt: z.string().max(500, 'Excerpt is too long').optional(),
  content: z.string().min(1, 'Content is required'),
  category: z.enum(['tutorials', 'industry', 'case-studies', 'news']).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  featured_image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  meta_title: z.string().max(100).optional(),
  meta_description: z.string().max(200).optional(),
  meta_keywords: z.string().max(200).optional(),
});

/**
 * GET - List articles with pagination and filters
 */
async function handleGet(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse filters
    const filters: ArticleFilters = {};
    const status = searchParams.get('status');
    if (status) filters.status = status as any;

    const category = searchParams.get('category');
    if (category) filters.category = category as any;

    const authorId = searchParams.get('author_id');
    if (authorId) filters.author_id = parseInt(authorId);

    const search = searchParams.get('search');
    if (search) filters.search = search;

    // Parse pagination
    const pagination: PaginationParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      orderBy: (searchParams.get('orderBy') as any) || 'created_at',
      orderDir: (searchParams.get('orderDir') as any) || 'DESC',
    };

    // Get stats flag
    const includeStats = searchParams.get('stats') === 'true';

    const result = await getArticles(filters, pagination);

    const response: any = {
      success: true,
      ...result,
    };

    if (includeStats) {
      response.stats = await getArticleStats();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Get articles error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create new article
 */
async function handlePost(request: AuthenticatedRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = articleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const data: ArticleInput = {
      ...validation.data,
      slug: validation.data.slug || '', // Ensure slug is defined
      author_id: request.admin!.id,
    };

    const article = await createArticle(data);

    if (!article) {
      return NextResponse.json(
        { error: 'Failed to create article' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        article,
        message: 'Article created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGet);
export const POST = requireAuth(handlePost);

