import { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, Home, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unsubscribed Successfully - LaserCalc Pro',
  description: 'You have been unsubscribed from LaserCalc Pro emails',
  robots: 'noindex, nofollow',
};

export default function UnsubscribeSuccessPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Heading */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              You've Been Unsubscribed
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              We've removed your email address from our mailing list.
            </p>

            {/* Confirmation Details */}
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                What This Means
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>You will no longer receive emails from LaserCalc Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Your feedback has been recorded and will help us improve</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>You can still use all our calculators without an email subscription</span>
                </li>
              </ul>
            </div>

            {/* Resubscribe Option */}
            <div className="mb-8 rounded-lg bg-primary-50 p-6">
              <div className="mb-3 flex items-center justify-center gap-2 text-primary-700">
                <Mail className="h-5 w-5" />
                <span className="font-semibold">Changed Your Mind?</span>
              </div>
              <p className="mb-4 text-sm text-gray-700">
                You can resubscribe anytime by entering your email on our homepage or any calculator page.
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white transition-all hover:bg-primary-700"
              >
                Return to Home
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50"
              >
                <Home className="h-5 w-5" />
                Browse Calculators
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                Contact Support
              </Link>
            </div>

            {/* Feedback Thanks */}
            <div className="mt-12 text-sm text-gray-500">
              <p>
                Thank you for using LaserCalc Pro. We appreciate your feedback and hope to serve you again in the future.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

