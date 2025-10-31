'use client';

import { useState, useEffect } from 'react';
import { Cookie, Check, X, Settings, Shield } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

export default function CookiePreferencesCenter() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    advertising: false,
    functional: false,
  });
  const [consentDate, setConsentDate] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const consent = localStorage.getItem('cookie_consent');
    const date = localStorage.getItem('cookie_consent_date');
    
    if (consent) {
      try {
        setPreferences(JSON.parse(consent));
      } catch (e) {
        console.error('Failed to parse cookie preferences:', e);
      }
    }
    
    if (date) {
      setConsentDate(date);
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Apply Google Analytics
    if (prefs.analytics && typeof window !== 'undefined') {
      (window as any).gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    } else {
      (window as any).gtag?.('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    // Apply Google AdSense
    if (prefs.advertising && typeof window !== 'undefined') {
      (window as any).gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    } else {
      (window as any).gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  const handleSave = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setConsentDate(new Date().toISOString());
    applyCookiePreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie_consent', JSON.stringify(allAccepted));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setConsentDate(new Date().toISOString());
    applyCookiePreferences(allAccepted);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectAll = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      advertising: false,
      functional: false,
    };
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie_consent', JSON.stringify(necessaryOnly));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setConsentDate(new Date().toISOString());
    applyCookiePreferences(necessaryOnly);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div id="cookie-settings" className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Cookie className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Cookie Preferences Center</h2>
          </div>
          <p className="text-primary-100">
            Manage your cookie and tracking preferences
          </p>
        </div>

        {/* Status */}
        {consentDate && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>
                Your preferences were last updated on{' '}
                <strong className="text-gray-900">
                  {new Date(consentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </strong>
              </span>
            </div>
          </div>
        )}

        {/* Save Notification */}
        {saved && (
          <div className="px-6 py-4 bg-green-50 border-b border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <Check className="h-5 w-5" />
              <span className="font-medium">Your preferences have been saved successfully!</span>
            </div>
          </div>
        )}

        {/* Cookie Categories */}
        <div className="p-6 space-y-6">
          {/* Necessary Cookies */}
          <div className="pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Strictly Necessary Cookies
                  </h3>
                </div>
                <p className="text-gray-700 mb-2">
                  These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot disable these cookies.
                </p>
                <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">Examples:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Session management and authentication</li>
                    <li>• Security and fraud prevention</li>
                    <li>• Cookie consent preferences</li>
                  </ul>
                </div>
              </div>
              <div className="ml-6 flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Always Active
                </span>
              </div>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analytics and Performance Cookies
                </h3>
                <p className="text-gray-700 mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                </p>
                <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">What we collect:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Page views and navigation patterns</li>
                    <li>• Time spent on pages</li>
                    <li>• Calculator usage statistics</li>
                    <li>• Error reports and performance metrics</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Provider:</strong> Google Analytics
                  </p>
                </div>
              </div>
              <div className="ml-6 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Advertising Cookies */}
          <div className="pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Advertising Cookies
                </h3>
                <p className="text-gray-700 mb-2">
                  These cookies are used to deliver advertisements that are relevant to you and your interests. They also help us measure the effectiveness of advertising campaigns and limit the number of times you see an ad.
                </p>
                <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">What we do:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Display relevant advertisements</li>
                    <li>• Measure ad campaign effectiveness</li>
                    <li>• Prevent showing the same ad repeatedly</li>
                    <li>• Share data with advertising partners</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Provider:</strong> Google AdSense, DoubleClick
                  </p>
                </div>
              </div>
              <div className="ml-6 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Functional Cookies */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Functional Cookies
                </h3>
                <p className="text-gray-700 mb-2">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences, settings, and calculation history.
                </p>
                <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">Features enabled:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Save calculation history</li>
                    <li>• Remember display preferences</li>
                    <li>• Store language and regional settings</li>
                    <li>• Enable social media sharing features</li>
                  </ul>
                </div>
              </div>
              <div className="ml-6 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Check className="h-5 w-5" />
              Save My Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Accept All Cookies
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reject All (Necessary Only)
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            For more information, please read our{' '}
            <a href="/cookie-policy" className="text-primary-600 hover:text-primary-700 font-medium">
              Cookie Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

