/**
 * Cloudflare D1 Database Client
 * For local development, use Wrangler to initialize D1
 */

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: {
    duration: number;
    rows_read: number;
    rows_written: number;
  };
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

/**
 * Get D1 database instance
 * In Cloudflare Workers/Pages, DB is available via env.DB
 * For local development, mock or use Wrangler dev
 */
export function getDB(): D1Database | null {
  // This will be populated by Cloudflare Pages/Workers environment
  if (typeof (globalThis as any).DB !== 'undefined') {
    return (globalThis as any).DB;
  }

  // For local development without D1
  if (process.env.NODE_ENV === 'development') {
    console.warn('D1 database not available in development mode. Using mock data.');
    return null;
  }

  return null;
}

/**
 * Execute a query with error handling
 */
export async function executeQuery<T>(
  query: string,
  params: unknown[] = []
): Promise<T[]> {
  const db = getDB();

  if (!db) {
    console.error('Database not available');
    return [];
  }

  try {
    const stmt = db.prepare(query);
    const bound = params.length > 0 ? stmt.bind(...params) : stmt;
    const result = await bound.all<T>();

    return result.results;
  } catch (error) {
    console.error('Database query error:', error);
    return [];
  }
}

/**
 * Execute a write operation
 */
export async function executeWrite(
  query: string,
  params: unknown[] = []
): Promise<boolean> {
  const db = getDB();

  if (!db) {
    console.error('Database not available');
    return false;
  }

  try {
    const stmt = db.prepare(query);
    const bound = params.length > 0 ? stmt.bind(...params) : stmt;
    const result = await bound.run();

    return result.success;
  } catch (error) {
    console.error('Database write error:', error);
    return false;
  }
}

