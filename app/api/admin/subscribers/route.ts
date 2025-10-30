// Admin - Subscribers Management API
import { NextResponse } from 'next/server';
import { requireAuth, AuthenticatedRequest } from '@/lib/auth/middleware';
import { executeQuery, executeWrite } from '@/lib/db/client';

async function handleGET(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;
    
    // Filters
    const is_confirmed = searchParams.get('is_confirmed');
    const search = searchParams.get('search');
    
    // Build query
    let whereClause = [];
    let params: any[] = [];
    
    if (is_confirmed !== null && is_confirmed !== undefined && is_confirmed !== '') {
      whereClause.push('is_confirmed = ?');
      params.push(is_confirmed === 'true' ? 1 : 0);
    }
    
    if (search) {
      whereClause.push('email LIKE ?');
      params.push(`%${search}%`);
    }
    
    const whereSQL = whereClause.length > 0 ? 'WHERE ' + whereClause.join(' AND ') : '';
    
    // Get total count
    const countResult = await executeQuery(
      `SELECT COUNT(*) as total FROM subscribers ${whereSQL}`,
      params
    );
    const total = countResult?.[0]?.total || 0;
    
    // Get subscribers
    const subscribers = await executeQuery(
      `SELECT * FROM subscribers ${whereSQL} ORDER BY subscribed_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    
    return NextResponse.json({
      success: true,
      data: subscribers || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

async function handleDELETE(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      );
    }
    
    await executeWrite('DELETE FROM subscribers WHERE id = ?', [parseInt(id)]);
    
    return NextResponse.json({
      success: true,
      message: 'Subscriber deleted successfully',
    });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}

async function handlePUT(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    const { id, is_confirmed } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      );
    }
    
    await executeWrite(
      'UPDATE subscribers SET is_confirmed = ? WHERE id = ?',
      [is_confirmed ? 1 : 0, id]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Subscriber updated successfully',
    });
  } catch (error) {
    console.error('Update subscriber error:', error);
    return NextResponse.json(
      { error: 'Failed to update subscriber' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGET);
export const DELETE = requireAuth(handleDELETE);
export const PUT = requireAuth(handlePUT);

