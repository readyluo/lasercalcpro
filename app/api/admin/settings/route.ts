// Admin - System Settings API
import { NextResponse } from 'next/server';
import { requireAuth, AuthenticatedRequest } from '@/lib/auth/middleware';
import { executeQuery, executeWrite } from '@/lib/db/client';

async function handleGET() {
  try {
    const settings = await executeQuery('SELECT * FROM settings ORDER BY setting_key');
    
    return NextResponse.json({
      success: true,
      data: settings || [],
    });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

async function handlePUT(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    const { setting_key, setting_value } = body;
    
    if (!setting_key) {
      return NextResponse.json(
        { error: 'Setting key is required' },
        { status: 400 }
      );
    }
    
    await executeWrite(
      'UPDATE settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?',
      [setting_value, setting_key]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Setting updated successfully',
    });
  } catch (error) {
    console.error('Update setting error:', error);
    return NextResponse.json(
      { error: 'Failed to update setting' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGET);
export const PUT = requireAuth(handlePUT);

