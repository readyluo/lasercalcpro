// Admin - Calculations Management API
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
    const tool_type = searchParams.get('tool_type');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const country = searchParams.get('country');
    
    // Build query
    let whereClause = [];
    let params: any[] = [];
    
    if (tool_type) {
      whereClause.push('tool_type = ?');
      params.push(tool_type);
    }
    
    if (start_date) {
      whereClause.push('created_at >= ?');
      params.push(start_date);
    }
    
    if (end_date) {
      whereClause.push('created_at <= ?');
      params.push(end_date);
    }
    
    if (country) {
      whereClause.push('user_country = ?');
      params.push(country);
    }
    
    const whereSQL = whereClause.length > 0 ? 'WHERE ' + whereClause.join(' AND ') : '';
    
    // Get total count
    const countResult = await executeQuery(
      `SELECT COUNT(*) as total FROM calculations ${whereSQL}`,
      params
    );
    const total = countResult?.[0]?.total || 0;
    
    // Get calculations
    const calculations = await executeQuery(
      `SELECT * FROM calculations ${whereSQL} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    
    return NextResponse.json({
      success: true,
      data: calculations || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get calculations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calculations' },
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
        { error: 'Calculation ID is required' },
        { status: 400 }
      );
    }
    
    await executeWrite('DELETE FROM calculations WHERE id = ?', [parseInt(id)]);
    
    return NextResponse.json({
      success: true,
      message: 'Calculation deleted successfully',
    });
  } catch (error) {
    console.error('Delete calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to delete calculation' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGET);
export const DELETE = requireAuth(handleDELETE);

