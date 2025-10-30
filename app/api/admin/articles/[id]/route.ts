// Admin Single Article API Routes
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, AuthenticatedRequest } from '@/lib/auth/middleware';
import {
  getArticleById,
  updateArticle,
  deleteArticle,
  ArticleInput,
} from '@/lib/db/articles';
import { z } from 'zod';

// Validation schema for updates (all fields optional)
const updateArticleSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1).optional(),
  category: z.enum(['tutorials', 'industry', 'case-studies', 'news']).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  featured_image: z.string().url().optional().or(z.literal('')),
  meta_title: z.string().max(100).optional(),
  meta_description: z.string().max(200).optional(),
  meta_keywords: z.string().max(200).optional(),
});

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET - Get single article by ID
 */
async function handleGet(
  _request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const article = await getArticleById(id);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error('Get article error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update article
 */
async function handlePut(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Check if article exists
    const existingArticle = await getArticleById(id);
    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate input
    const validation = updateArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const article = await updateArticle(id, validation.data as Partial<ArticleInput>);

    if (!article) {
      return NextResponse.json(
        { error: 'Failed to update article' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      article,
      message: 'Article updated successfully',
    });
  } catch (error: any) {
    console.error('Update article error:', error);
    
    if (error.message === 'Slug already exists') {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete article
 */
async function handleDelete(
  _request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Check if article exists
    const existingArticle = await getArticleById(id);
    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const success = await deleteArticle(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete article' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}

// Wrap handlers to pass params correctly
export const GET = (request: NextRequest, context: RouteParams) => 
  requireAuth((req) => handleGet(req, context))(request);

export const PUT = (request: NextRequest, context: RouteParams) => 
  requireAuth((req) => handlePut(req, context))(request);

export const DELETE = (request: NextRequest, context: RouteParams) => 
  requireAuth((req) => handleDelete(req, context))(request);

