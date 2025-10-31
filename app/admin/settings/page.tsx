'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface SiteSettings {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  adsenseClientId: string;
  adsenseEnabled: boolean;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'LaserCalc Pro',
    siteUrl: 'https://lasercalcpro.com',
    contactEmail: 'contact@lasercalcpro.com',
    adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
    adsenseEnabled: true,
    maintenanceMode: false,
    allowRegistrations: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaveSuccess(false);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save settings');
      }
    } catch (err) {
      setError('An error occurred while saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        </div>
        <p className="text-gray-600">
          Manage global site configuration and integrations
        </p>
      </div>

      {/* Success/Error Messages */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <span className="text-green-800">Settings saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Settings Form */}
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site URL
              </label>
              <input
                type="url"
                name="siteUrl"
                value={settings.siteUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Tracking - Hardcoded */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics & Tracking</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Google Analytics 4</h3>
              <p className="text-sm text-blue-800">
                <strong>Measurement ID:</strong> G-Z1Q5K1N1WM
              </p>
              <p className="text-xs text-blue-600 mt-1">
                ✓ Configured in GoogleAnalytics component (hardcoded)
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Google Search Console</h3>
              <p className="text-sm text-green-800">
                <strong>Verification Code:</strong> aajlPnwI4brA3BjmsQ30KN3gj0wtVarRoJ_7KMPM65s
              </p>
              <p className="text-xs text-green-600 mt-1">
                ✓ Configured in root layout metadata (hardcoded)
              </p>
            </div>
            <p className="text-sm text-gray-500 italic">
              Note: Analytics IDs are hardcoded in the application for security and simplicity. 
              Contact the development team to update these values.
            </p>
          </div>
        </div>

        {/* Monetization */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Monetization</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google AdSense Client ID
              </label>
              <input
                type="text"
                name="adsenseClientId"
                value={settings.adsenseClientId}
                onChange={handleChange}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                Your Google AdSense publisher ID. Format: ca-pub-XXXXXXXXXXXXXXXX
              </p>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="adsenseEnabled"
                  checked={settings.adsenseEnabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable Google AdSense
                </span>
              </label>
              <p className="mt-1 ml-6 text-sm text-gray-500">
                Toggle AdSense ads on/off across the site without changing your client ID
              </p>
            </div>
          </div>
        </div>

        {/* Site Features */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Site Features</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Maintenance Mode
                </span>
              </label>
              <p className="mt-1 ml-6 text-sm text-gray-500">
                Show maintenance page to all visitors except admins
              </p>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="allowRegistrations"
                  checked={settings.allowRegistrations}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Allow User Registrations
                </span>
              </label>
              <p className="mt-1 ml-6 text-sm text-gray-500">
                Enable or disable new user account creation
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
