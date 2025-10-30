// Admin Authentication Logic
import bcrypt from 'bcryptjs';
import { executeQuery, executeWrite } from '@/lib/db/client';

export interface Admin {
  id: number;
  username: string;
  email: string;
  display_name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
  last_login_ip: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Authenticate admin user
 */
export async function authenticateAdmin(
  credentials: LoginCredentials
): Promise<Admin | null> {
  try {
    const result = await executeQuery(
      'SELECT * FROM admins WHERE username = ? AND is_active = TRUE',
      [credentials.username]
    );

    if (!result || result.length === 0) {
      return null;
    }

    const admin = result[0] as Admin & { password: string };
    
    // Verify password
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      admin.password
    );

    if (!isValidPassword) {
      return null;
    }

    // Remove password from return object
    const { password, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  } catch (error) {
    console.error('Admin authentication error:', error);
    return null;
  }
}

/**
 * Update last login info
 */
export async function updateLastLogin(
  adminId: number,
  ipAddress: string
): Promise<void> {
  try {
    await executeWrite(
      'UPDATE admins SET last_login = CURRENT_TIMESTAMP, last_login_ip = ? WHERE id = ?',
      [ipAddress, adminId]
    );
  } catch (error) {
    console.error('Failed to update last login:', error);
  }
}

/**
 * Get admin by ID
 */
export async function getAdminById(id: number): Promise<Admin | null> {
  try {
    const result = await executeQuery(
      'SELECT id, username, email, display_name, role, is_active, created_at, last_login, last_login_ip FROM admins WHERE id = ?',
      [id]
    );

    if (!result || result.length === 0) {
      return null;
    }

    return result[0] as Admin;
  } catch (error) {
    console.error('Failed to get admin:', error);
    return null;
  }
}

/**
 * Get all admins
 */
export async function getAllAdmins(): Promise<Admin[]> {
  try {
    const result = await executeQuery(
      'SELECT id, username, email, display_name, role, is_active, created_at, last_login, last_login_ip FROM admins ORDER BY created_at DESC'
    );

    return (result || []) as Admin[];
  } catch (error) {
    console.error('Failed to get admins:', error);
    return [];
  }
}

/**
 * Create new admin
 */
export async function createAdmin(data: {
  username: string;
  email: string;
  password: string;
  display_name?: string;
  role?: string;
}): Promise<Admin | null> {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    await executeWrite(
      `INSERT INTO admins (username, email, password, display_name, role) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.username,
        data.email,
        hashedPassword,
        data.display_name || null,
        data.role || 'admin'
      ]
    );

    // Fetch the created admin
    const result = await executeQuery(
      'SELECT id, username, email, display_name, role, is_active, created_at FROM admins WHERE username = ?',
      [data.username]
    );

    if (!result || result.length === 0) {
      return null;
    }

    return result[0] as Admin;
  } catch (error) {
    console.error('Failed to create admin:', error);
    return null;
  }
}

/**
 * Update admin
 */
export async function updateAdmin(
  id: number,
  data: Partial<{
    email: string;
    display_name: string;
    role: string;
    is_active: boolean;
  }>
): Promise<boolean> {
  try {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.email !== undefined) {
      fields.push('email = ?');
      values.push(data.email);
    }
    if (data.display_name !== undefined) {
      fields.push('display_name = ?');
      values.push(data.display_name);
    }
    if (data.role !== undefined) {
      fields.push('role = ?');
      values.push(data.role);
    }
    if (data.is_active !== undefined) {
      fields.push('is_active = ?');
      values.push(data.is_active);
    }

    if (fields.length === 0) {
      return false;
    }

    values.push(id);

    await executeWrite(
      `UPDATE admins SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return true;
  } catch (error) {
    console.error('Failed to update admin:', error);
    return false;
  }
}

/**
 * Change admin password
 */
export async function changeAdminPassword(
  id: number,
  newPassword: string
): Promise<boolean> {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await executeWrite(
      'UPDATE admins SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );

    return true;
  } catch (error) {
    console.error('Failed to change password:', error);
    return false;
  }
}

/**
 * Delete admin
 */
export async function deleteAdmin(id: number): Promise<boolean> {
  try {
    await executeWrite('DELETE FROM admins WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Failed to delete admin:', error);
    return false;
  }
}

