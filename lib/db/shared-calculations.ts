import { getClient } from './client';

export interface SharedCalculation {
  id?: number;
  shortCode: string;
  toolType: string;
  calculationData: any;
  expiresAt: Date;
  views?: number;
  createdAt?: Date;
}

/**
 * Create a new shared calculation
 */
export async function createSharedCalculation(data: {
  shortCode: string;
  toolType: string;
  calculationData: any;
  expiresAt: Date;
}): Promise<void> {
  const client = getClient();

  await client.execute({
    sql: `
      INSERT INTO shared_calculations (short_code, tool_type, calculation_data, expires_at, views, created_at)
      VALUES (?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
    `,
    args: [
      data.shortCode,
      data.toolType,
      JSON.stringify(data.calculationData),
      data.expiresAt.toISOString(),
    ],
  });
}

/**
 * Get shared calculation by short code
 */
export async function getSharedCalculation(shortCode: string): Promise<SharedCalculation | null> {
  const client = getClient();

  const result = await client.execute({
    sql: `
      SELECT id, short_code, tool_type, calculation_data, expires_at, views, created_at
      FROM shared_calculations
      WHERE short_code = ?
    `,
    args: [shortCode],
  });

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  // Check if expired
  const expiresAt = new Date(row.expires_at as string);
  if (expiresAt < new Date()) {
    return null;
  }

  return {
    id: row.id as number,
    shortCode: row.short_code as string,
    toolType: row.tool_type as string,
    calculationData: JSON.parse(row.calculation_data as string),
    expiresAt,
    views: row.views as number,
    createdAt: new Date(row.created_at as string),
  };
}

/**
 * Increment view count for a shared calculation
 */
export async function incrementSharedCalculationViews(shortCode: string): Promise<void> {
  const client = getClient();

  await client.execute({
    sql: `
      UPDATE shared_calculations
      SET views = views + 1
      WHERE short_code = ?
    `,
    args: [shortCode],
  });
}

/**
 * Delete expired shared calculations (cleanup job)
 */
export async function deleteExpiredSharedCalculations(): Promise<number> {
  const client = getClient();

  const result = await client.execute({
    sql: `
      DELETE FROM shared_calculations
      WHERE expires_at < CURRENT_TIMESTAMP
    `,
    args: [],
  });

  return result.rowsAffected;
}

