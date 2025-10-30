// JWT Token Management for Admin Authentication
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'lasercalc-pro-admin-secret-change-in-production'
);

export interface AdminTokenPayload {
  id: number;
  username: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate JWT token for admin user
 */
export async function generateToken(payload: Omit<AdminTokenPayload, 'iat' | 'exp'>): Promise<string> {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token expires in 7 days
    .sign(JWT_SECRET);
  
  return token;
}

/**
 * Verify and decode JWT token
 */
export async function verifyToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Validate required fields
    if (!payload.id || !payload.username || !payload.email || !payload.role) {
      return null;
    }
    
    return {
      id: payload.id as number,
      username: payload.username as string,
      email: payload.email as string,
      role: payload.role as string,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Refresh token (generate new token with same payload)
 */
export async function refreshToken(oldToken: string): Promise<string | null> {
  const payload = await verifyToken(oldToken);
  if (!payload) return null;
  
  // Remove JWT specific fields
  const { iat, exp, ...tokenData } = payload;
  return generateToken(tokenData);
}

