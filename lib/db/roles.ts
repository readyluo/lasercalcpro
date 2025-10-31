import { executeQuery, executeWrite } from './client';

export interface Role {
  id: number;
  name: string;
  slug: string;
  permissions: string; // JSON string
  created_at: string;
}

export type PermissionModule = 'articles' | 'users' | 'subscribers' | 'settings' | 'calculations' | 'analytics' | 'case_studies';
export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'publish' | 'export' | 'approve';

export async function listRoles(): Promise<Role[]> {
  return executeQuery<Role>('SELECT * FROM roles ORDER BY id ASC');
}

export async function getRoleById(id: number): Promise<Role | null> {
  const rows = await executeQuery<Role>('SELECT * FROM roles WHERE id = ?', [id]);
  return rows[0] || null;
}

export async function getRoleBySlug(slug: string): Promise<Role | null> {
  const rows = await executeQuery<Role>('SELECT * FROM roles WHERE slug = ?', [slug]);
  return rows[0] || null;
}

export async function createRole(name: string, slug: string, permissions: Record<string, PermissionAction[]>): Promise<boolean> {
  return executeWrite(
    `INSERT INTO roles (name, slug, permissions, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
    [name, slug, JSON.stringify(permissions)]
  );
}

export async function updateRole(id: number, data: { name?: string; slug?: string; permissions?: Record<string, PermissionAction[]> }): Promise<boolean> {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
  if (data.slug !== undefined) { fields.push('slug = ?'); values.push(data.slug); }
  if (data.permissions !== undefined) { fields.push('permissions = ?'); values.push(JSON.stringify(data.permissions)); }

  if (fields.length === 0) return true;

  values.push(id);
  return executeWrite(`UPDATE roles SET ${fields.join(', ')} WHERE id = ?`, values);
}

export async function deleteRole(id: number): Promise<boolean> {
  return executeWrite('DELETE FROM roles WHERE id = ?', [id]);
}
