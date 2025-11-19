import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import { Cookie, Shield, Settings, FileText } from 'lucide-react';

const LAST_UPDATED_TEXT = 'February 12, 2024';
const LAST_UPDATED_ISO = '2024-02-12';

export const metadata = generateMetadata({
  title: 'Cookie Policy | LaserCalc Pro',
  description: 'Understand how LaserCalc Pro uses necessary, functional, and advertising cookies plus the options available to manage consent.',
  keywords: ['LaserCalc Pro cookies', 'manufacturing calculator cookies', 'cookie policy'],
  alternates: { canonical: '/cookie-policy' },
});

const cookieSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Cookie Policy',
  url: 'https://www.lasercalcpro.com/cookie-policy',
  datePublished: LAST_UPDATED_ISO,
  dateModified: LAST_UPDATED_ISO,
  description: 'Cookie categories, retention windows, and preference instructions for LaserCalc Pro.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'LaserCalc Pro',
    url: 'https://www.lasercalcpro.com',
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={cookieSchema} />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs />
            <div className="mt-6 flex items-center gap-3">
              <Cookie className="h-8 w-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-900">Cookie Policy</h1>
            </div>
            <p className="mt-3 text-lg text-gray-600">Last updated: {LAST_UPDATED_TEXT}</p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Quick Links */}
        <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Manage Your Preferences
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience.
          </p>
          <a
            href="/cookie-settings"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Cookie Settings
          </a>
        </div>

        {/* What Are Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary-600" />
            What Are Cookies?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Similar technologies include web beacons, pixels, and local storage, which serve similar purposes to cookies.
            </p>
          </div>
        </section>

        {/* Types of Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Types of Cookies We Use
          </h2>
          
          <div className="space-y-6">
            {/* Necessary Cookies */}
            <div className="p-6 bg-white rounded-lg border-2 border-green-200 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Strictly Necessary Cookies
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Always Active
                  </span>
                </div>
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-gray-700 mb-3">
                These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Examples:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li><code className="bg-gray-200 px-1 rounded">session_id</code> - Maintains your session state</li>
                  <li><code className="bg-gray-200 px-1 rounded">cookie_consent</code> - Stores your cookie preferences</li>
                  <li><code className="bg-gray-200 px-1 rounded">csrf_token</code> - Protects against security threats</li>
                </ul>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics and Performance Cookies
              </h3>
              <p className="text-gray-700 mb-3">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website&apos;s performance and user experience.
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Examples:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li><code className="bg-gray-200 px-1 rounded">_ga</code> - Google Analytics: Distinguishes unique users</li>
                  <li><code className="bg-gray-200 px-1 rounded">_gid</code> - Google Analytics: Distinguishes users</li>
                  <li><code className="bg-gray-200 px-1 rounded">_gat</code> - Google Analytics: Throttles request rate</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Retention:</strong> Up to 2 years
                </p>
              </div>
            </div>

            {/* Advertising Cookies */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Advertising Cookies
              </h3>
              <p className="text-gray-700 mb-3">
                These cookies are used to deliver advertisements that are relevant to you. They also help us measure the effectiveness of advertising campaigns.
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Examples:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li><code className="bg-gray-200 px-1 rounded">_gcl_au</code> - Google AdSense: Experiments with ad efficiency</li>
                  <li><code className="bg-gray-200 px-1 rounded">IDE</code> - Google DoubleClick: Serves targeted ads</li>
                  <li><code className="bg-gray-200 px-1 rounded">test_cookie</code> - Google DoubleClick: Checks if cookies are enabled</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Retention:</strong> Up to 1 year
                </p>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Functional Cookies
              </h3>
              <p className="text-gray-700 mb-3">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Examples:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li><code className="bg-gray-200 px-1 rounded">calc_history</code> - Stores your calculation history</li>
                  <li><code className="bg-gray-200 px-1 rounded">user_preferences</code> - Remembers your display preferences</li>
                  <li><code className="bg-gray-200 px-1 rounded">language</code> - Stores your language preference</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Retention:</strong> Up to 1 year
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Third-Party Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Third-Party Cookies
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements on and through the service.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Third-Party Services We Use:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Google Analytics:</strong>
                    <span className="text-gray-700"> Web analytics service to understand user behavior</span>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 ml-2 text-sm">
                      Privacy Policy →
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Google AdSense:</strong>
                    <span className="text-gray-700"> Advertising service to display relevant ads</span>
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 ml-2 text-sm">
                      Ad Policy →
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How to Manage Cookies
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              You have several options to manage or limit how cookies and similar technologies are used:
            </p>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Browser Settings
              </h3>
              <p className="text-gray-700 mb-4">
                Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience on our website.
              </p>
              <div className="grid gap-3">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
                  Google Chrome →
                </a>
                <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
                  Mozilla Firefox →
                </a>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
                  Safari →
                </a>
                <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
                  Microsoft Edge →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Opt-Out Options
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Google Analytics Opt-out:</strong>
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 ml-2">
                      Download Browser Add-on →
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Advertising Opt-out:</strong>
                    <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 ml-2">
                      NAI Opt-Out Tool →
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Rights Under GDPR
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA), you have certain data protection rights:
            </p>
            <div className="grid gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Right to Access</h4>
                <p className="text-gray-700 text-sm">You have the right to request copies of your personal data.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Right to Rectification</h4>
                <p className="text-gray-700 text-sm">You have the right to request correction of inaccurate data.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Right to Erasure</h4>
                <p className="text-gray-700 text-sm">You have the right to request deletion of your personal data.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Right to Restrict Processing</h4>
                <p className="text-gray-700 text-sm">You have the right to request restrictions on processing your data.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Right to Data Portability</h4>
                <p className="text-gray-700 text-sm">You have the right to request transfer of your data to another organization.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Right to Object</h4>
                <p className="text-gray-700 text-sm">You have the right to object to processing of your personal data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacy@lasercalcpro.com</p>
                  <p><strong>Address:</strong> LaserCalc Pro, 123 Manufacturing Street, Industrial Park, CA 94000, United States</p>
                </div>
          </div>
        </section>

        {/* Updates */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Changes to This Policy
          </h2>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the &quot;Last updated&quot; date at the top of this policy.
            </p>
          </div>
        </section>
      </div>
      </main>
      <Footer />
    </>
  );
}
