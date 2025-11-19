import { executeQuery, executeWrite } from './client';

export type AuditAction = 'create' | 'edit' | 'delete' | 'login' | 'logout' | 'export' | 'publish' | 'approve' | 'settings_update';
export type AuditModule = 'articles' | 'users' | 'settings' | 'subscribers' | 'calculations' | 'analytics' | 'roles' | 'case_studies';

export interface AuditLog {
  id: number;
  user_id: number | null;
  action: AuditAction;
  module: AuditModule;
  description: string;
  ip_address?: string | null;
  payload?: string | null; // JSON
  created_at: string;
}

export interface AuditFilters {
  from?: string; // ISO date
  to?: string;   // ISO date
  userId?: number;
  action?: AuditAction;
  module?: AuditModule;
  q?: string; // search description
}

export interface Pagination {
  page?: number;
  limit?: number;
}

export interface PaginatedAudit {
  items: AuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function recordAuditLog(entry: Omit<AuditLog, 'id' | 'created_at'>): Promise<boolean> {
  const result = await executeWrite(
    `INSERT INTO audit_logs (user_id, action, module, description, ip_address, payload, created_at)
     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [
      entry.user_id,
      entry.action,
      entry.module,
      entry.description || null,
      entry.ip_address || null,
      entry.payload || null,
    ]
  );
  return result.rowsAffected > 0;
}

export async function getAuditLogs(filters: AuditFilters = {}, pagination: Pagination = {}): Promise<PaginatedAudit> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 50;
  const offset = (page - 1) * limit;

  const where: string[] = [];
  const params: any[] = [];

  if (filters.from) { where.push('created_at >= ?'); params.push(filters.from); }
  if (filters.to) { where.push('created_at <= ?'); params.push(filters.to); }
  if (filters.userId) { where.push('user_id = ?'); params.push(filters.userId); }
  if (filters.action) { where.push('action = ?'); params.push(filters.action); }
  if (filters.module) { where.push('module = ?'); params.push(filters.module); }
  if (filters.q) { where.push('description LIKE ?'); params.push(`%${filters.q}%`); }

  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const countRows = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM audit_logs ${whereClause}`,
    params
  );
  const total = countRows[0]?.count || 0;

  const items = await executeQuery<AuditLog>(
    `SELECT * FROM audit_logs ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getAuditLogById(id: number): Promise<AuditLog | null> {
  const rows = await executeQuery<AuditLog>('SELECT * FROM audit_logs WHERE id = ?', [id]);
  return rows[0] || null;
}
