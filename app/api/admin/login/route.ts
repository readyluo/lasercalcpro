// Admin Login API Route
import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, updateLastLogin } from '@/lib/auth/admin';
import { generateToken } from '@/lib/auth/jwt';
import { getClientIP } from '@/lib/auth/middleware';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { username, password } = validation.data;

    // Authenticate
    const admin = await authenticateAdmin({ username, password });
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Username or password is incorrect' },
        { status: 401 }
      );
    }

    // Update last login
    const clientIP = getClientIP(request);
    await updateLastLogin(admin.id, clientIP);

    // Generate JWT token
    const token = await generateToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });

    // Create response with cookie
    const response = NextResponse.json(
      {
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          display_name: admin.display_name,
          role: admin.role,
        },
        token,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

