#!/usr/bin/env node
/**
 * Script to create an admin user
 * Usage: npm run create-admin
 */

import bcrypt from 'bcryptjs';
import { executeWrite, executeQuery } from '../lib/db/client';

async function createAdminUser() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const email = process.env.ADMIN_EMAIL || 'admin@lasercalcpro.com';
  const displayName = process.env.ADMIN_DISPLAY_NAME || 'System Administrator';

  console.log('🔧 Creating admin user...');
  console.log(`   Username: ${username}`);
  console.log(`   Email: ${email}`);
  console.log(`   Display Name: ${displayName}`);

  try {
    // Check if user already exists
    const existing = await executeQuery(
      'SELECT id FROM admins WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing && existing.length > 0) {
      console.log('⚠️  Admin user already exists');
      console.log('   Updating password...');
      
      // Update password
      const hashedPassword = await bcrypt.hash(password, 10);
      await executeWrite(
        'UPDATE admins SET password = ? WHERE username = ?',
        [hashedPassword, username]
      );
      
      console.log('✅ Admin password updated successfully');
      return;
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await executeWrite(
      `INSERT INTO admins (username, password, email, display_name, role, is_active) 
       VALUES (?, ?, ?, ?, 'admin', TRUE)`,
      [username, hashedPassword, email, displayName]
    );

    console.log('✅ Admin user created successfully');
    console.log('');
    console.log('🔐 Login Credentials:');
    console.log(`   URL: http://localhost:3000/admin/login`);
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log('');
    console.log('⚠️  IMPORTANT: Change the default password after first login!');
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
    process.exit(1);
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });




