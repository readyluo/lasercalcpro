import { executeQuery, executeWrite } from './client';

export interface Calculation {
  id: number;
  tool_type: 'laser-cutting' | 'cnc-machining' | 'roi' | 'energy' | 'material-utilization';
  input_params: string; // JSON
  result: string; // JSON
  user_ip?: string;
  user_agent?: string;
  user_country?: string;
  user_city?: string;
  session_id?: string;
  created_at: string;
}

export interface CalculationInput {
  tool_type: Calculation['tool_type'];
  input_params: Record<string, any>;
  result: Record<string, any>;
  user_ip?: string;
  user_agent?: string;
  user_country?: string;
  user_city?: string;
  session_id?: string;
}

/**
 * Save a calculation to the database
 */
export async function saveCalculation(data: CalculationInput): Promise<number | null> {
  const query = `
    INSERT INTO calculations (
      tool_type, input_params, result, user_ip, user_agent,
      user_country, user_city, session_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data.tool_type,
    JSON.stringify(data.input_params),
    JSON.stringify(data.result),
    data.user_ip || null,
    data.user_agent || null,
    data.user_country || null,
    data.user_city || null,
    data.session_id || null,
  ];

  try {
    const success = await executeWrite(query, params);
    if (success) {
      // Get the last inserted ID
      const lastId = await executeQuery<{ id: number }>(
        'SELECT last_insert_rowid() as id'
      );
      return lastId[0]?.id || null;
    }
    return null;
  } catch (error) {
    console.error('Error saving calculation:', error);
    return null;
  }
}

/**
 * Get calculation by ID
 */
export async function getCalculationById(id: number): Promise<Calculation | null> {
  const query = 'SELECT * FROM calculations WHERE id = ?';
  const results = await executeQuery<Calculation>(query, [id]);
  return results[0] || null;
}

/**
 * Get recent calculations
 */
export async function getRecentCalculations(
  limit: number = 10,
  toolType?: Calculation['tool_type']
): Promise<Calculation[]> {
  let query = 'SELECT * FROM calculations';
  const params: unknown[] = [];

  if (toolType) {
    query += ' WHERE tool_type = ?';
    params.push(toolType);
  }

  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(limit);

  return executeQuery<Calculation>(query, params);
}

/**
 * Get calculation statistics
 */
export async function getCalculationStats(): Promise<{
  total: number;
  byTool: Record<string, number>;
  today: number;
  thisWeek: number;
  thisMonth: number;
}> {
  // Total calculations
  const totalResult = await executeQuery<{ count: number }>(
    'SELECT COUNT(*) as count FROM calculations'
  );
  const total = totalResult[0]?.count || 0;

  // By tool type
  const byToolResult = await executeQuery<{ tool_type: string; count: number }>(
    'SELECT tool_type, COUNT(*) as count FROM calculations GROUP BY tool_type'
  );
  const byTool: Record<string, number> = {};
  byToolResult.forEach(row => {
    byTool[row.tool_type] = row.count;
  });

  // Today
  const todayResult = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM calculations 
     WHERE DATE(created_at) = DATE('now')`
  );
  const today = todayResult[0]?.count || 0;

  // This week
  const weekResult = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM calculations 
     WHERE DATE(created_at) >= DATE('now', '-7 days')`
  );
  const thisWeek = weekResult[0]?.count || 0;

  // This month
  const monthResult = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM calculations 
     WHERE DATE(created_at) >= DATE('now', 'start of month')`
  );
  const thisMonth = monthResult[0]?.count || 0;

  return {
    total,
    byTool,
    today,
    thisWeek,
    thisMonth,
  };
}

/**
 * Delete old calculations (data retention)
 */
export async function deleteOldCalculations(daysToKeep: number = 365): Promise<number> {
  const query = `
    DELETE FROM calculations 
    WHERE DATE(created_at) < DATE('now', '-' || ? || ' days')
  `;

  try {
    const success = await executeWrite(query, [daysToKeep]);
    if (success) {
      const deletedResult = await executeQuery<{ changes: number }>(
        'SELECT changes() as changes'
      );
      return deletedResult[0]?.changes || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error deleting old calculations:', error);
    return 0;
  }
}


