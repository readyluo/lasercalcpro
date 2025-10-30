// Database Client - Turso (LibSQL) Implementation
// This replaces the Cloudflare D1 client for Vercel deployment

import { getTursoClient, executeQuery, executeWrite, executeTransaction } from './turso';

export { executeQuery, executeWrite, executeTransaction };

// Re-export for convenience
export const getClient = getTursoClient;

// Health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await executeQuery('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}


