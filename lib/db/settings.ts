// Site Settings Database Access Object
import { executeQuery, executeWrite } from './client';

export interface Setting {
  id: number;
  setting_key: string;
  setting_value: string | null;
  description: string | null;
  is_public: boolean;
  updated_at: string;
}

export interface SiteSettings {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  ga4MeasurementId: string;
  gscPropertyUrl: string;
  adsenseClientId: string;
  adsenseEnabled: boolean;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
}

/**
 * Get a single setting by key
 */
export async function getSetting(key: string): Promise<string | null> {
  try {
    const result = await executeQuery(
      'SELECT setting_value FROM settings WHERE setting_key = ?',
      [key]
    );

    if (!result || result.length === 0) {
      return null;
    }

    return result[0].setting_value || null;
  } catch (error) {
    console.error(`Failed to get setting ${key}:`, error);
    return null;
  }
}

/**
 * Get multiple settings by keys
 */
export async function getSettings(keys: string[]): Promise<Record<string, string | null>> {
  try {
    const placeholders = keys.map(() => '?').join(',');
    const result = await executeQuery(
      `SELECT setting_key, setting_value FROM settings WHERE setting_key IN (${placeholders})`,
      keys
    );

    const settings: Record<string, string | null> = {};
    keys.forEach(key => {
      settings[key] = null;
    });

    if (result) {
      result.forEach((row: any) => {
        settings[row.setting_key] = row.setting_value;
      });
    }

    return settings;
  } catch (error) {
    console.error('Failed to get settings:', error);
    return keys.reduce((acc, key) => ({ ...acc, [key]: null }), {});
  }
}

/**
 * Get all site settings formatted for admin UI
 */
export async function getAllSiteSettings(): Promise<SiteSettings> {
  try {
    const keys = [
      'site_name',
      'site_url',
      'admin_email',
      'ga4_measurement_id',
      'gsc_property_url',
      'adsense_client_id',
      'adsense_enabled',
      'maintenance_mode',
      'allow_registrations',
    ];

    const settings = await getSettings(keys);

    return {
      siteName: settings['site_name'] || 'LaserCalc Pro',
      siteUrl: settings['site_url'] || 'https://lasercalcpro.com',
      contactEmail: settings['admin_email'] || 'contact@lasercalcpro.com',
      ga4MeasurementId: settings['ga4_measurement_id'] || '',
      gscPropertyUrl: settings['gsc_property_url'] || '',
      adsenseClientId: settings['adsense_client_id'] || '',
      adsenseEnabled: settings['adsense_enabled'] === 'true',
      maintenanceMode: settings['maintenance_mode'] === 'true',
      allowRegistrations: settings['allow_registrations'] !== 'false',
    };
  } catch (error) {
    console.error('Failed to get all site settings:', error);
    // Return defaults
    return {
      siteName: 'LaserCalc Pro',
      siteUrl: 'https://lasercalcpro.com',
      contactEmail: 'contact@lasercalcpro.com',
      ga4MeasurementId: '',
      gscPropertyUrl: '',
      adsenseClientId: '',
      adsenseEnabled: true,
      maintenanceMode: false,
      allowRegistrations: true,
    };
  }
}

/**
 * Update or create a setting
 */
export async function setSetting(key: string, value: string): Promise<boolean> {
  try {
    await executeWrite(
      `INSERT INTO settings (setting_key, setting_value, updated_at)
       VALUES (?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(setting_key) 
       DO UPDATE SET setting_value = excluded.setting_value, updated_at = CURRENT_TIMESTAMP`,
      [key, value]
    );
    return true;
  } catch (error) {
    console.error(`Failed to set setting ${key}:`, error);
    return false;
  }
}

/**
 * Update multiple settings at once
 */
export async function updateSiteSettings(settings: SiteSettings): Promise<boolean> {
  try {
    const updates = [
      ['site_name', settings.siteName],
      ['site_url', settings.siteUrl],
      ['admin_email', settings.contactEmail],
      ['ga4_measurement_id', settings.ga4MeasurementId],
      ['gsc_property_url', settings.gscPropertyUrl],
      ['adsense_client_id', settings.adsenseClientId],
      ['adsense_enabled', settings.adsenseEnabled ? 'true' : 'false'],
      ['maintenance_mode', settings.maintenanceMode ? 'true' : 'false'],
      ['allow_registrations', settings.allowRegistrations ? 'true' : 'false'],
    ];

    // Update each setting
    for (const [key, value] of updates) {
      await setSetting(key, value);
    }

    return true;
  } catch (error) {
    console.error('Failed to update site settings:', error);
    return false;
  }
}

/**
 * Get all settings (for debugging/admin purposes)
 */
export async function getAllSettings(): Promise<Setting[]> {
  try {
    const result = await executeQuery(
      'SELECT * FROM settings ORDER BY setting_key'
    );

    return (result || []) as Setting[];
  } catch (error) {
    console.error('Failed to get all settings:', error);
    return [];
  }
}

/**
 * Delete a setting
 */
export async function deleteSetting(key: string): Promise<boolean> {
  try {
    await executeWrite(
      'DELETE FROM settings WHERE setting_key = ?',
      [key]
    );
    return true;
  } catch (error) {
    console.error(`Failed to delete setting ${key}:`, error);
    return false;
  }
}

