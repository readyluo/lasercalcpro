// Initialize Turso Database Schema
import { createClient } from '@libsql/client';
import * as fs from 'fs';
import * as path from 'path';

async function initializeDatabase() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('❌ TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set');
    process.exit(1);
  }

  console.log('🔄 Connecting to Turso database...');
  const client = createClient({ url, authToken });

  try {
    // Read schema file
    const schemaPath = path.join(__dirname, '../lib/db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Executing ${statements.length} SQL statements...`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      console.log(`  [${i + 1}/${statements.length}] Executing...`);
      
      try {
        await client.execute(stmt);
      } catch (error: any) {
        // Ignore "table already exists" errors
        if (!error.message.includes('already exists')) {
          throw error;
        }
        console.log(`  ⚠️  Table already exists, skipping...`);
      }
    }

    // Verify tables
    console.log('\n✅ Database initialized successfully!');
    console.log('\n📊 Verifying tables...');
    
    const tables = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%' 
      ORDER BY name
    `);

    console.log('\nCreated tables:');
    tables.rows.forEach((row: any) => {
      console.log(`  - ${row.name}`);
    });

    await client.close();
    console.log('\n🎉 All done!');
  } catch (error) {
    console.error('\n❌ Error initializing database:', error);
    await client.close();
    process.exit(1);
  }
}

initializeDatabase();

