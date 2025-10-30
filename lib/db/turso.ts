// Turso Database Client Configuration
import { createClient, type Client } from '@libsql/client';

// Singleton instance
let tursoClient: Client | null = null;

/**
 * Get Turso database client (singleton)
 */
export function getTursoClient(): Client {
  if (!tursoClient) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      console.error('⚠️  TURSO_DATABASE_URL environment variable is not set');
      console.error('⚠️  Please configure environment variables in Vercel Dashboard:');
      console.error('⚠️  Settings → Environment Variables → Add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN');
      throw new Error('TURSO_DATABASE_URL environment variable is not set');
    }

    if (!authToken) {
      console.error('⚠️  TURSO_AUTH_TOKEN environment variable is not set');
      throw new Error('TURSO_AUTH_TOKEN environment variable is not set');
    }

    tursoClient = createClient({
      url,
      authToken,
    });

    console.log('✅ Turso client initialized successfully');
    console.log('✅ Database URL:', url.substring(0, 30) + '...');
  }

  return tursoClient;
}

/**
 * Execute a query with parameters
 */
export async function executeQuery<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  try {
    const client = getTursoClient();
    const result = await client.execute({
      sql,
      args: params,
    });

    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Execute a write operation (INSERT, UPDATE, DELETE)
 */
export async function executeWrite(
  sql: string,
  params: any[] = []
): Promise<{ rowsAffected: number; lastInsertRowid?: number }> {
  try {
    const client = getTursoClient();
    const result = await client.execute({
      sql,
      args: params,
    });

    return {
      rowsAffected: result.rowsAffected,
      lastInsertRowid: result.lastInsertRowid ? Number(result.lastInsertRowid) : undefined,
    };
  } catch (error) {
    console.error('Database write error:', error);
    throw error;
  }
}

/**
 * Execute multiple queries in a transaction
 */
export async function executeTransaction(
  queries: Array<{ sql: string; params?: any[] }>
): Promise<void> {
  const client = getTursoClient();

  try {
    await client.batch(
      queries.map(q => ({
        sql: q.sql,
        args: q.params || [],
      })),
      'write'
    );
  } catch (error) {
    console.error('Transaction error:', error);
    throw error;
  }
}

/**
 * Close database connection (for cleanup)
 */
export async function closeTursoClient(): Promise<void> {
  if (tursoClient) {
    await tursoClient.close();
    tursoClient = null;
    console.log('Turso client closed');
  }
}

