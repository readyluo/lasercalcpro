/**
 * Database Migration: Update Settings Table
 * Adds GA4 and GSC settings to the settings table
 */

import { getD1Database } from '../lib/db/client';

async function migrateSettings() {
  console.log('Starting settings migration...');

  try {
    const db = await getD1Database();

    // Add new settings if they don't exist
    const newSettings = [
      ['ga4_measurement_id', '', 'Google Analytics 4 Measurement ID', 'false'],
      ['gsc_property_url', '', 'Google Search Console Property URL', 'false'],
      ['adsense_enabled', 'true', 'Enable Google AdSense', 'false'],
      ['allow_registrations', 'true', 'Allow new user registrations', 'false'],
    ];

    for (const [key, value, description, isPublic] of newSettings) {
      await db
        .prepare(
          `INSERT INTO settings (setting_key, setting_value, description, is_public)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(setting_key) DO NOTHING`
        )
        .bind(key, value, description, isPublic === 'true')
        .run();

      console.log(`✅ Added/verified setting: ${key}`);
    }

    // Update old ga_tracking_id to ga4_measurement_id if it exists
    const oldGAResult = await db
      .prepare('SELECT setting_value FROM settings WHERE setting_key = ?')
      .bind('ga_tracking_id')
      .first();

    if (oldGAResult && oldGAResult.setting_value) {
      await db
        .prepare(
          `UPDATE settings 
           SET setting_value = ? 
           WHERE setting_key = ? AND setting_value = ''`
        )
        .bind(oldGAResult.setting_value, 'ga4_measurement_id')
        .run();

      console.log(`✅ Migrated ga_tracking_id to ga4_measurement_id`);
    }

    console.log('✅ Settings migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if executed directly
if (require.main === module) {
  migrateSettings()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { migrateSettings };

