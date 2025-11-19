import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import CookiePreferencesCenter from '@/components/cookie/CookiePreferencesCenter';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Cookie Settings | LaserCalc Pro',
  description: 'Manage consent for analytics, functional, and advertising cookies used across LaserCalc Pro calculators.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/cookie-settings' },
});

const cookieSettingsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Cookie Settings',
  url: 'https://www.lasercalcpro.com/cookie-settings',
  description: 'User preference center for cookies and trackers used by LaserCalc Pro.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'LaserCalc Pro',
    url: 'https://www.lasercalcpro.com',
  },
};

export default function CookieSettingsPage() {
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={cookieSettingsSchema} />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <Breadcrumbs />
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <CookiePreferencesCenter />

          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">About Cookie Management</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Browser-Level Control:</strong> You can also manage cookies directly in your browser settings. However,
                disabling essential cookies may impact your experience on our calculators.
              </p>
              <p>
                <strong>Updates:</strong> Your preferences save in this browser and persist across sessions. Return here anytime to
                update consent.
              </p>
              <p>
                <strong>Questions?</strong> Review the{' '}
                <a href="/cookie-policy" className="font-medium text-primary-600 hover:text-primary-700">
                  Cookie Policy
                </a>{' '}
                or{' '}
                <a href="/contact" className="font-medium text-primary-600 hover:text-primary-700">
                  contact us
                </a>{' '}
                for additional support.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
