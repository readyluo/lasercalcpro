import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { SubscriptionPreferencesForm } from '@/components/subscribe/SubscriptionPreferencesForm';
import { getSubscriberByToken } from '@/lib/db/subscribers';
import { Settings, Mail, Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Email Preferences - LaserCalc Pro',
  description: 'Manage your email subscription preferences',
  robots: 'noindex, nofollow',
};

const preferencesSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Email Preferences',
  url: 'https://www.lasercalcpro.com/subscribe/preferences',
  description: 'Manage the newsletters and alerts you receive from LaserCalc Pro.',
};

interface PreferencesPageProps {
  searchParams: {
    token?: string;
  };
}

export default async function SubscriptionPreferencesPage({ searchParams }: PreferencesPageProps) {
  const { token } = searchParams;

  if (!token) {
    redirect('/subscribe?error=missing_token');
  }

  // Verify token and get subscriber
  const subscriber = await getSubscriberByToken(token);

  if (!subscriber) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <SchemaMarkup schema={preferencesSchema} />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs />
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                <Settings className="h-8 w-8 text-primary-600" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                Email Preferences
              </h1>
              <p className="text-lg text-gray-600">
                Manage your subscription settings for {subscriber.email}
              </p>
            </div>

            {/* Info Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-blue-700">
                  <Mail className="h-5 w-5" />
                  <span className="font-semibold">Subscribed</span>
                </div>
                <p className="text-sm text-blue-600">
                  You&apos;re receiving updates from LaserCalc Pro
                </p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-green-700">
                  <Bell className="h-5 w-5" />
                  <span className="font-semibold">Customizable</span>
                </div>
                <p className="text-sm text-green-600">
                  Choose what types of emails you want to receive
                </p>
              </div>
            </div>

            {/* Preferences Form */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <SubscriptionPreferencesForm
                subscriber={subscriber}
                token={token}
              />
            </div>

            {/* Help Text */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">
                About Your Subscription
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>Your preferences are saved instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>You can change these settings anytime using the link in our emails</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>Unsubscribing will stop all emails from LaserCalc Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>We never share your email address with third parties</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
