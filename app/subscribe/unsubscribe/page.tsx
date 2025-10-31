import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { UnsubscribeForm } from '@/components/subscribe/UnsubscribeForm';
import { getSubscriberByToken } from '@/lib/db/subscribers';
import { Frown, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unsubscribe - LaserCalc Pro',
  description: 'Unsubscribe from LaserCalc Pro emails',
  robots: 'noindex, nofollow',
};

interface UnsubscribePageProps {
  searchParams: {
    token?: string;
  };
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const { token } = searchParams;

  if (!token) {
    redirect('/subscribe?error=missing_token');
  }

  // Verify token and get subscriber
  const subscriber = await getSubscriberByToken(token);

  if (!subscriber) {
    notFound();
  }

  // If already unsubscribed, show confirmation
  if (subscriber.unsubscribedAt) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <Frown className="h-10 w-10 text-gray-400" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                Already Unsubscribed
              </h1>
              <p className="mb-8 text-lg text-gray-600">
                You've already unsubscribed from our mailing list.
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-700"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Frown className="h-8 w-8 text-orange-600" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                We're Sorry to See You Go
              </h1>
              <p className="text-lg text-gray-600">
                You're about to unsubscribe from LaserCalc Pro emails
              </p>
            </div>

            {/* Alternative Options */}
            <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Before You Go...
                </h2>
              </div>
              <p className="mb-4 text-gray-700">
                Did you know you can customize what emails you receive instead of unsubscribing completely?
              </p>
              <Link
                href={`/subscribe/preferences?token=${token}`}
                className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700"
              >
                Manage Email Preferences
              </Link>
            </div>

            {/* Unsubscribe Form */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <UnsubscribeForm
                email={subscriber.email}
                token={token}
              />
            </div>

            {/* Contact Info */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                If you have questions, please{' '}
                <Link href="/contact" className="font-semibold text-primary-600 hover:text-primary-700">
                  contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

