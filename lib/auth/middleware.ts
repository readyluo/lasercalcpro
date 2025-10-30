// Authentication Middleware for Admin Routes
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, AdminTokenPayload } from './jwt';

export interface AuthenticatedRequest extends NextRequest {
  admin?: AdminTokenPayload;
}

/**
 * Extract token from request
 */
function extractToken(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookie
  const cookieToken = request.cookies.get('admin_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

/**
 * Verify admin authentication
 */
export async function verifyAdminAuth(
  request: NextRequest
): Promise<AdminTokenPayload | null> {
  const token = extractToken(request);
  
  if (!token) {
    return null;
  }

  return await verifyToken(token);
}

/**
 * Middleware wrapper for protected admin routes
 */
export function requireAuth(
  handler: (request: AuthenticatedRequest) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    const admin = await verifyAdminAuth(request);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Please login to continue' },
        { status: 401 }
      );
    }

    // Attach admin info to request
    (request as AuthenticatedRequest).admin = admin;

    return handler(request as AuthenticatedRequest);
  };
}

/**
 * Role-based access control
 */
export function requireRole(
  roles: string[],
  handler: (request: AuthenticatedRequest) => Promise<Response>
) {
  return requireAuth(async (request: AuthenticatedRequest) => {
    const admin = request.admin;

    if (!admin || !roles.includes(admin.role)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(request);
  });
}

/**
 * Get client IP address
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

