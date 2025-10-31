import { executeQuery, executeWrite } from './client';

// 使用 Web Crypto API 替代 Node.js crypto（兼容 Edge Runtime）
function generateToken(): string {
  // 生成随机token
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export interface Subscriber {
  id: number;
  email: string;
  source_tool?: string;
  source_page?: string;
  is_confirmed: boolean;
  confirmation_token?: string;
  ip_address?: string;
  user_agent?: string;
  subscribed_at: string;
  confirmed_at?: string;
  unsubscribed_at?: string;
  preferences?: {
    weeklyUpdates?: boolean;
    tutorials?: boolean;
    productNews?: boolean;
    promotions?: boolean;
  };
  frequency?: string;
  unsubscribe_reason?: string;
}

export interface SubscriberInput {
  email: string;
  source_tool?: string;
  source_page?: string;
  ip_address?: string;
  user_agent?: string;
}

// generateToken() 函数已在文件开头定义

/**
 * Create a new subscriber
 */
export async function createSubscriber(data: SubscriberInput): Promise<{
  id: number | null;
  token: string | null;
  error?: string;
}> {
  // Check if email already exists
  const existing = await executeQuery<Subscriber>(
    'SELECT * FROM subscribers WHERE email = ?',
    [data.email]
  );

  if (existing.length > 0) {
    return {
      id: null,
      token: null,
      error: 'Email already subscribed',
    };
  }

  const token = generateToken();

  const query = `
    INSERT INTO subscribers (
      email, source_tool, source_page, confirmation_token,
      ip_address, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data.email,
    data.source_tool || null,
    data.source_page || null,
    token,
    data.ip_address || null,
    data.user_agent || null,
  ];

  try {
    const success = await executeWrite(query, params);
    if (success) {
      const lastId = await executeQuery<{ id: number }>(
        'SELECT last_insert_rowid() as id'
      );
      return {
        id: lastId[0]?.id || null,
        token,
      };
    }
    return { id: null, token: null, error: 'Failed to save subscription' };
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return { id: null, token: null, error: 'Database error' };
  }
}

/**
 * Confirm a subscription
 */
export async function confirmSubscription(token: string): Promise<boolean> {
  const query = `
    UPDATE subscribers 
    SET is_confirmed = TRUE, confirmed_at = CURRENT_TIMESTAMP
    WHERE confirmation_token = ? AND is_confirmed = FALSE
  `;

  return executeWrite(query, [token]);
}

/**
 * Get subscriber by email
 */
export async function getSubscriberByEmail(email: string): Promise<Subscriber | null> {
  const results = await executeQuery<Subscriber>(
    'SELECT * FROM subscribers WHERE email = ?',
    [email]
  );
  return results[0] || null;
}

/**
 * Get subscriber by token
 */
export async function getSubscriberByToken(token: string): Promise<Subscriber | null> {
  const results = await executeQuery<Subscriber>(
    'SELECT * FROM subscribers WHERE confirmation_token = ?',
    [token]
  );
  return results[0] || null;
}

/**
 * Get all subscribers
 */
export async function getAllSubscribers(
  confirmedOnly: boolean = false
): Promise<Subscriber[]> {
  let query = 'SELECT * FROM subscribers WHERE unsubscribed_at IS NULL';

  if (confirmedOnly) {
    query += ' AND is_confirmed = TRUE';
  }

  query += ' ORDER BY subscribed_at DESC';

  return executeQuery<Subscriber>(query);
}

/**
 * Get subscriber statistics
 */
export async function getSubscriberStats(): Promise<{
  total: number;
  confirmed: number;
  unconfirmed: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}> {
  // Total active subscribers
  const totalResult = await executeQuery<{ count: number }>(
    'SELECT COUNT(*) as count FROM subscribers WHERE unsubscribed_at IS NULL'
  );
  const total = totalResult[0]?.count || 0;

  // Confirmed
  const confirmedResult = await executeQuery<{ count: number }>(
    'SELECT COUNT(*) as count FROM subscribers WHERE is_confirmed = TRUE AND unsubscribed_at IS NULL'
  );
  const confirmed = confirmedResult[0]?.count || 0;

  // Unconfirmed
  const unconfirmed = total - confirmed;

  // Today
  const todayResult = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM subscribers 
     WHERE DATE(subscribed_at) = DATE('now') AND unsubscribed_at IS NULL`
  );
  const today = todayResult[0]?.count || 0;

  // This week
  const weekResult = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM subscribers 
     WHERE DATE(subscribed_at) >= DATE('now', '-7 days') AND unsubscribed_at IS NULL`
  );
  const thisWeek = weekResult[0]?.count || 0;

  // This month
  const monthResult = await executeQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM subscribers 
     WHERE DATE(subscribed_at) >= DATE('now', 'start of month') AND unsubscribed_at IS NULL`
  );
  const thisMonth = monthResult[0]?.count || 0;

  return {
    total,
    confirmed,
    unconfirmed,
    today,
    thisWeek,
    thisMonth,
  };
}

/**
 * Unsubscribe
 */
export async function unsubscribe(email: string): Promise<boolean> {
  const query = `
    UPDATE subscribers 
    SET unsubscribed_at = CURRENT_TIMESTAMP
    WHERE email = ? AND unsubscribed_at IS NULL
  `;

  return executeWrite(query, [email]);
}

/**
 * Delete subscriber permanently
 */
export async function deleteSubscriber(email: string): Promise<boolean> {
  const query = 'DELETE FROM subscribers WHERE email = ?';
  return executeWrite(query, [email]);
}

/**
 * Update subscriber preferences
 */
export async function updateSubscriberPreferences(
  token: string,
  preferences: Record<string, boolean>,
  frequency: string
): Promise<boolean> {
  const query = `
    UPDATE subscribers 
    SET preferences = ?, frequency = ?
    WHERE confirmation_token = ?
  `;

  return executeWrite(query, [JSON.stringify(preferences), frequency, token]);
}

/**
 * Unsubscribe user with reason
 */
export async function unsubscribeUser(token: string, reason: string): Promise<boolean> {
  const query = `
    UPDATE subscribers 
    SET unsubscribed_at = CURRENT_TIMESTAMP, unsubscribe_reason = ?
    WHERE confirmation_token = ? AND unsubscribed_at IS NULL
  `;

  return executeWrite(query, [reason, token]);
}

