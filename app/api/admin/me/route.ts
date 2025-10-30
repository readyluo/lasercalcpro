// Get Current Admin Info
import { NextResponse } from 'next/server';
import { requireAuth, AuthenticatedRequest } from '@/lib/auth/middleware';
import { getAdminById } from '@/lib/auth/admin';

async function handler(request: AuthenticatedRequest) {
  try {
    const admin = request.admin!;
    
    // Get fresh admin data from database
    const adminData = await getAdminById(admin.id);
    
    if (!adminData) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: adminData,
    });
  } catch (error) {
    console.error('Get admin info error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handler);

