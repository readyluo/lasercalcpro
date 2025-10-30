#!/usr/bin/env tsx
/**
 * Initialize Admin Database
 * Creates default admin account with secure password
 */

import bcrypt from 'bcryptjs';
import { executeWrite, executeQuery } from '../lib/db/client';

async function initAdminDatabase() {
  console.log('🚀 Initializing admin database...\n');

  try {
    // Check if admin table exists and has data
    const existingAdmins = await executeQuery('SELECT COUNT(*) as count FROM admins');
    const adminCount = existingAdmins?.[0]?.count || 0;

    if (adminCount > 0) {
      console.log('✅ Admin accounts already exist. Skipping initialization.');
      console.log(`   Found ${adminCount} admin(s) in database.\n`);
      return;
    }

    // Create default admin account
    console.log('📝 Creating default admin account...');
    
    const defaultPassword = 'admin123'; // Change this after first login!
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await executeWrite(
      `INSERT INTO admins (username, password, email, display_name, role) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        'admin',
        hashedPassword,
        'admin@lasercalcpro.com',
        'System Administrator',
        'admin'
      ]
    );

    console.log('✅ Default admin account created successfully!\n');
    console.log('=' .repeat(60));
    console.log('🔐 DEFAULT ADMIN CREDENTIALS');
    console.log('=' .repeat(60));
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   Email:    admin@lasercalcpro.com');
    console.log('=' .repeat(60));
    console.log('');
    console.log('⚠️  IMPORTANT SECURITY NOTICE:');
    console.log('   1. Login immediately and change the default password!');
    console.log('   2. Update the admin email to your actual email address.');
    console.log('   3. Consider creating additional admin accounts.');
    console.log('   4. Delete or disable this account after creating your own.');
    console.log('');

  } catch (error) {
    console.error('❌ Failed to initialize admin database:', error);
    throw error;
  }
}

// Run initialization
initAdminDatabase()
  .then(() => {
    console.log('✅ Admin database initialization completed!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Admin database initialization failed:', error);
    process.exit(1);
  });

