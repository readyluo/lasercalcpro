import type { Metadata } from 'next';
import CookiePreferencesCenter from '@/components/cookie/CookiePreferencesCenter';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Settings | LaserCalc Pro',
  description: 'Manage your cookie preferences and control how we use cookies on LaserCalc Pro.',
  robots: 'noindex, nofollow',
};

export default function CookieSettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CookiePreferencesCenter />

        {/* Additional Information */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Cookie Management
          </h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <p>
              <strong>Browser-Level Control:</strong> You can also manage cookies directly in your browser settings. 
              However, please note that disabling certain cookies may impact your experience on our website.
            </p>
            <p>
              <strong>Updates:</strong> Your preferences will be saved in your browser and will persist across sessions. 
              You can return to this page at any time to update your preferences.
            </p>
            <p>
              <strong>Questions?</strong> If you have any questions about how we use cookies, please visit our{' '}
              <a href="/cookie-policy" className="text-primary-600 hover:text-primary-700 font-medium">
                Cookie Policy
              </a>
              {' '}or{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                contact us
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

