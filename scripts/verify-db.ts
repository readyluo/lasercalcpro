#!/usr/bin/env node
/**
 * Script to verify database structure and content
 * Usage: npm run verify-db
 */

import { createClient } from '@libsql/client';

async function verifyDatabase() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('❌ TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set');
    process.exit(1);
  }

  console.log('🔍 Verifying database structure and content...\n');
  const client = createClient({ url, authToken });

  try {
    // Check tables
    console.log('📊 Checking tables...');
    const tables = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%' 
      ORDER BY name
    `);

    const expectedTables = [
      'admins',
      'articles',
      'audit_log',
      'calculations',
      'page_views',
      'rate_limits',
      'seo_keywords',
      'settings',
      'subscribers',
      'usage_stats'
    ];

    console.log(`\nFound ${tables.rows.length} tables:`);
    for (const row of tables.rows) {
      const tableName = (row as any).name;
      const isExpected = expectedTables.includes(tableName);
      console.log(`  ${isExpected ? '✓' : '⚠️'} ${tableName}`);
    }

    // Check for missing tables
    const foundTables = tables.rows.map((r: any) => r.name);
    const missingTables = expectedTables.filter(t => !foundTables.includes(t));
    if (missingTables.length > 0) {
      console.log('\n⚠️  Missing tables:', missingTables.join(', '));
    }

    // Check indexes
    console.log('\n📑 Checking indexes...');
    const indexes = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='index' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `);
    console.log(`Found ${indexes.rows.length} indexes`);

    // Check views
    console.log('\n👁️  Checking views...');
    const views = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='view'
      ORDER BY name
    `);
    console.log(`Found ${views.rows.length} views:`);
    for (const row of views.rows) {
      console.log(`  - ${(row as any).name}`);
    }

    // Check triggers
    console.log('\n⚡ Checking triggers...');
    const triggers = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='trigger'
      ORDER BY name
    `);
    console.log(`Found ${triggers.rows.length} triggers:`);
    for (const row of triggers.rows) {
      console.log(`  - ${(row as any).name}`);
    }

    // Check data
    console.log('\n📦 Checking data...');
    
    // Admins
    const admins = await client.execute('SELECT COUNT(*) as count FROM admins');
    const adminCount = (admins.rows[0] as any).count;
    console.log(`  ${adminCount > 0 ? '✓' : '✗'} Admins: ${adminCount} record(s)`);
    
    if (adminCount > 0) {
      const adminList = await client.execute('SELECT username, email, role FROM admins');
      for (const admin of adminList.rows) {
        const a = admin as any;
        console.log(`    - ${a.username} (${a.email}) - Role: ${a.role}`);
      }
    }

    // Settings
    const settings = await client.execute('SELECT COUNT(*) as count FROM settings');
    const settingsCount = (settings.rows[0] as any).count;
    console.log(`  ${settingsCount > 0 ? '✓' : '✗'} Settings: ${settingsCount} record(s)`);

    // Articles
    const articles = await client.execute('SELECT COUNT(*) as count FROM articles');
    const articlesCount = (articles.rows[0] as any).count;
    console.log(`  ${articlesCount > 0 ? '✓' : '✗'} Articles: ${articlesCount} record(s)`);
    
    if (articlesCount > 0) {
      const articleList = await client.execute('SELECT title, status, category FROM articles');
      for (const article of articleList.rows) {
        const a = article as any;
        console.log(`    - ${a.title} [${a.status}] (${a.category})`);
      }
    }

    // Subscribers
    const subscribers = await client.execute('SELECT COUNT(*) as count FROM subscribers');
    const subscribersCount = (subscribers.rows[0] as any).count;
    console.log(`  ℹ️  Subscribers: ${subscribersCount} record(s)`);

    // Calculations
    const calculations = await client.execute('SELECT COUNT(*) as count FROM calculations');
    const calculationsCount = (calculations.rows[0] as any).count;
    console.log(`  ℹ️  Calculations: ${calculationsCount} record(s)`);

    // Database info
    console.log('\n💾 Database information...');
    const dbSize = await client.execute('SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()');
    const sizeBytes = (dbSize.rows[0] as any).size;
    const sizeMB = (sizeBytes / 1024 / 1024).toFixed(2);
    console.log(`  Database size: ${sizeMB} MB`);

    await client.close();

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ Database Verification Summary');
    console.log('='.repeat(50));
    console.log(`Tables: ${tables.rows.length}/${expectedTables.length} expected`);
    console.log(`Indexes: ${indexes.rows.length}`);
    console.log(`Views: ${views.rows.length}`);
    console.log(`Triggers: ${triggers.rows.length}`);
    console.log(`Admins: ${adminCount}`);
    console.log(`Settings: ${settingsCount}`);
    console.log(`Articles: ${articlesCount}`);
    console.log(`Size: ${sizeMB} MB`);
    
    if (missingTables.length === 0 && adminCount > 0 && settingsCount > 0) {
      console.log('\n🎉 Database is properly configured and ready to use!');
      console.log('\n📝 Next steps:');
      console.log('  1. Start the development server: npm run dev');
      console.log('  2. Access admin panel: http://localhost:3000/admin/login');
      console.log('  3. Login with: admin / admin123');
      console.log('  4. ⚠️  IMPORTANT: Change default password after first login!');
    } else {
      console.log('\n⚠️  Database setup is incomplete. Please run:');
      console.log('  - npm run init-db (to create tables)');
      console.log('  - npm run create-admin (to create admin user)');
      console.log('  - npm run seed-data (to add initial data)');
    }

  } catch (error) {
    console.error('\n❌ Error verifying database:', error);
    await client.close();
    process.exit(1);
  }
}

// Run the script
verifyDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });


























