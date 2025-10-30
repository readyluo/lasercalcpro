// Initialize Turso Database Schema
import { createClient } from '@libsql/client';
import * as fs from 'fs';
import * as path from 'path';

// Helper function to retry failed operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      if (attempt === maxRetries) {
        throw error;
      }
      if (error.message.includes('502') || error.message.includes('503')) {
        console.log(`    ⚠️  Server error, retrying (${attempt}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}

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

    // Remove single-line comments but keep the SQL
    const cleanedSchema = schema
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');

    // Split schema into individual statements (by semicolon)
    const statements = cleanedSchema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`📝 Found ${statements.length} SQL statements...`);

    // Group statements by type for proper execution order
    const createTableStatements = statements.filter(s => 
      s.toUpperCase().startsWith('CREATE TABLE')
    );
    const createIndexStatements = statements.filter(s => 
      s.toUpperCase().startsWith('CREATE INDEX') || 
      s.toUpperCase().startsWith('CREATE UNIQUE INDEX')
    );
    const createViewStatements = statements.filter(s => 
      s.toUpperCase().startsWith('CREATE VIEW')
    );
    const createTriggerStatements = statements.filter(s => 
      s.toUpperCase().startsWith('CREATE TRIGGER')
    );
    const insertStatements = statements.filter(s => 
      s.toUpperCase().startsWith('INSERT')
    );
    const otherStatements = statements.filter(s => 
      !s.toUpperCase().startsWith('CREATE') && 
      !s.toUpperCase().startsWith('INSERT')
    );

    console.log(`  - ${createTableStatements.length} CREATE TABLE statements`);
    console.log(`  - ${createIndexStatements.length} CREATE INDEX statements`);
    console.log(`  - ${createViewStatements.length} CREATE VIEW statements`);
    console.log(`  - ${createTriggerStatements.length} CREATE TRIGGER statements`);
    console.log(`  - ${insertStatements.length} INSERT statements`);
    console.log(`  - ${otherStatements.length} other statements`);

    // Execute CREATE TABLE statements first
    console.log('\n🔨 Creating tables...');
    for (let i = 0; i < createTableStatements.length; i++) {
      const stmt = createTableStatements[i];
      const tableName = stmt.match(/CREATE TABLE (?:IF NOT EXISTS )?(\w+)/i)?.[1] || 'unknown';
      console.log(`  [${i + 1}/${createTableStatements.length}] Creating table: ${tableName}`);
      
      try {
        await retryOperation(() => client.execute(stmt));
        console.log(`    ✓ Success`);
      } catch (error: any) {
        // Ignore "already exists" errors
        if (error.message.includes('already exists')) {
          console.log(`    ⚠️  Already exists, skipping...`);
        } else {
          console.error(`    ❌ Error: ${error.message}`);
          throw error;
        }
      }
    }

    // Execute CREATE INDEX statements
    console.log('\n📑 Creating indexes...');
    for (let i = 0; i < createIndexStatements.length; i++) {
      const stmt = createIndexStatements[i];
      const indexName = stmt.match(/CREATE (?:UNIQUE )?INDEX (?:IF NOT EXISTS )?(\w+)/i)?.[1] || 'unknown';
      console.log(`  [${i + 1}/${createIndexStatements.length}] Creating index: ${indexName}`);
      
      try {
        await retryOperation(() => client.execute(stmt));
        console.log(`    ✓ Success`);
      } catch (error: any) {
        // Ignore "already exists" errors
        if (error.message.includes('already exists')) {
          console.log(`    ⚠️  Already exists, skipping...`);
        } else {
          console.error(`    ❌ Error: ${error.message}`);
        }
      }
    }

    // Execute CREATE VIEW statements
    if (createViewStatements.length > 0) {
      console.log('\n👁️  Creating views...');
      for (let i = 0; i < createViewStatements.length; i++) {
        const stmt = createViewStatements[i];
        const viewName = stmt.match(/CREATE VIEW (?:IF NOT EXISTS )?(\w+)/i)?.[1] || 'unknown';
        console.log(`  [${i + 1}/${createViewStatements.length}] Creating view: ${viewName}`);
        
        try {
          await client.execute(stmt);
          console.log(`    ✓ Success`);
        } catch (error: any) {
          if (error.message.includes('already exists')) {
            console.log(`    ⚠️  Already exists, skipping...`);
          } else {
            console.error(`    ❌ Error: ${error.message}`);
          }
        }
      }
    }

    // Execute CREATE TRIGGER statements
    if (createTriggerStatements.length > 0) {
      console.log('\n⚡ Creating triggers...');
      for (let i = 0; i < createTriggerStatements.length; i++) {
        const stmt = createTriggerStatements[i];
        const triggerName = stmt.match(/CREATE TRIGGER (?:IF NOT EXISTS )?(\w+)/i)?.[1] || 'unknown';
        console.log(`  [${i + 1}/${createTriggerStatements.length}] Creating trigger: ${triggerName}`);
        
        try {
          await client.execute(stmt);
          console.log(`    ✓ Success`);
        } catch (error: any) {
          if (error.message.includes('already exists')) {
            console.log(`    ⚠️  Already exists, skipping...`);
          } else {
            console.error(`    ❌ Error: ${error.message}`);
          }
        }
      }
    }

    // Execute INSERT statements
    console.log('\n📥 Inserting initial data...');
    for (let i = 0; i < insertStatements.length; i++) {
      const stmt = insertStatements[i];
      console.log(`  [${i + 1}/${insertStatements.length}] Inserting...`);
      
      try {
        await client.execute(stmt);
      } catch (error: any) {
        // Ignore duplicate errors
        if (!error.message.includes('UNIQUE constraint') && 
            !error.message.includes('already exists')) {
          console.error(`  ❌ Error: ${error.message}`);
          throw error;
        }
        console.log(`  ⚠️  Data already exists, skipping...`);
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

