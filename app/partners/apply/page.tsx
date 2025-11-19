import Link from 'next/link';
import { Handshake, ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import { PartnerApplicationForm } from './PartnerApplicationForm';

export const metadata = generateMetadata({
  title: 'Apply to the LaserCalc Pro Partner Program',
  description: 'Submit your application to embed LaserCalc Pro calculators, connect via API, or co-market manufacturing cost tools.',
  keywords: ['LaserCalc Pro partner application', 'manufacturing calculator integration', 'laser cutting API partner'],
  alternates: { canonical: '/partners/apply' },
  robots: { index: false, follow: false },
});

const partnerApplySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Partner Application',
  url: 'https://www.lasercalcpro.com/partners/apply',
  description: 'Application form for manufacturers, software providers, and service partners integrating LaserCalc Pro.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'LaserCalc Pro',
    url: 'https://www.lasercalcpro.com',
  },
};

export default function PartnerApplyPage() {
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={partnerApplySchema} />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs />
            <Link
              href="/partners"
              className="mt-6 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Partners
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <Handshake className="h-10 w-10 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-900">Partner Application</h1>
            </div>
            <p className="mt-2 max-w-2xl text-gray-600">
              Share details about your organization, integration goals, and preferred partnership model. We reply to every
              submission.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <PartnerApplicationForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
