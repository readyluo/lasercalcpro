// Admin - Admin Users Management API
import { NextResponse } from 'next/server';
import { requireRole, AuthenticatedRequest } from '@/lib/auth/middleware';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  changeAdminPassword,
} from '@/lib/auth/admin';
import { z } from 'zod';

const createAdminSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  display_name: z.string().optional(),
  role: z.enum(['admin', 'editor']).optional(),
});

const updateAdminSchema = z.object({
  id: z.number(),
  email: z.string().email().optional(),
  display_name: z.string().optional(),
  role: z.enum(['admin', 'editor']).optional(),
  is_active: z.boolean().optional(),
});

const changePasswordSchema = z.object({
  id: z.number(),
  new_password: z.string().min(6),
});

async function handleGET() {
  try {
    const admins = await getAllAdmins();
    
    return NextResponse.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error('Get admins error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

async function handlePOST(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    
    const validation = createAdminSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    const admin = await createAdmin(validation.data);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Failed to create admin' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}

async function handlePUT(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    
    // Check if this is a password change
    if (body.new_password) {
      const validation = changePasswordSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { error: 'Validation failed', details: validation.error.errors },
          { status: 400 }
        );
      }

      const success = await changeAdminPassword(
        validation.data.id,
        validation.data.new_password
      );

      if (!success) {
        return NextResponse.json(
          { error: 'Failed to change password' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully',
      });
    }
    
    // Regular update
    const validation = updateAdminSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { id, ...updateData } = validation.data;
    const success = await updateAdmin(id, updateData);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update admin' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin updated successfully',
    });
  } catch (error) {
    console.error('Update admin error:', error);
    return NextResponse.json(
      { error: 'Failed to update admin' },
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
        { error: 'Admin ID is required' },
        { status: 400 }
      );
    }

    // Prevent deleting yourself
    if (parseInt(id) === request.admin?.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const success = await deleteAdmin(parseInt(id));
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete admin' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    return NextResponse.json(
      { error: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}

// Only admin role can manage users
export const GET = requireRole(['admin'], handleGET);
export const POST = requireRole(['admin'], handlePOST);
export const PUT = requireRole(['admin'], handlePUT);
export const DELETE = requireRole(['admin'], handleDELETE);

