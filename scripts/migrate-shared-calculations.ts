#!/usr/bin/env tsx

/**
 * Database Migration Script: Add shared_calculations table
 * 
 * This script creates the shared_calculations table for storing
 * shareable links to calculation results.
 * 
 * Run: npm run tsx scripts/migrate-shared-calculations.ts
 */

import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function migrate() {
  const dbUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!dbUrl || !authToken) {
    console.error('❌ Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN');
    console.error('Please set these in your .env.local file');
    process.exit(1);
  }

  const client = createClient({
    url: dbUrl,
    authToken,
  });

  console.log('📦 Starting database migration...\n');

  try {
    // Create shared_calculations table
    console.log('Creating shared_calculations table...');
    await client.execute(`
      CREATE TABLE IF NOT EXISTS shared_calculations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        short_code TEXT UNIQUE NOT NULL,
        tool_type TEXT NOT NULL,
        calculation_data TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        views INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ shared_calculations table created');

    // Create index on short_code for fast lookups
    console.log('Creating index on short_code...');
    await client.execute(`
      CREATE INDEX IF NOT EXISTS idx_shared_calculations_short_code 
      ON shared_calculations(short_code)
    `);
    console.log('✅ Index created');

    // Create index on expires_at for cleanup jobs
    console.log('Creating index on expires_at...');
    await client.execute(`
      CREATE INDEX IF NOT EXISTS idx_shared_calculations_expires_at 
      ON shared_calculations(expires_at)
    `);
    console.log('✅ Index created');

    console.log('\n🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();

