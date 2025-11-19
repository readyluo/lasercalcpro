import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Info } from 'lucide-react';

export const metadata = {
  title: 'Already Confirmed - LaserCalc Pro',
  description: 'Your subscription is already confirmed.',
  robots: 'noindex, nofollow',
};

const alreadyConfirmedSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Subscription Already Confirmed',
  url: 'https://www.lasercalcpro.com/subscribe/already-confirmed',
  description: 'Notification page for subscribers who have already confirmed their email.',
};

export default function AlreadyConfirmedPage() {
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={alreadyConfirmedSchema} />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Info className="h-12 w-12 text-blue-600" />
            </div>

            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Already Confirmed
            </h1>

            <p className="mb-8 text-xl text-gray-600">
              Your email address has already been confirmed. You&apos;re all set!
            </p>

            <Link
              href="/"
              className="btn-primary btn-lg inline-block rounded-lg px-8 py-4"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}







