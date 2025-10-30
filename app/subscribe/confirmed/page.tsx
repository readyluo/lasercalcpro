import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, Mail } from 'lucide-react';

export default function SubscribeConfirmedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Subscription Confirmed!
            </h1>

            <p className="mb-8 text-xl text-gray-600">
              Thank you for confirming your email address. You're now subscribed to LaserCalc Pro updates.
            </p>

            <div className="card mb-8 text-left">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-8 w-8 text-primary-600" />
                <h2 className="text-xl font-semibold">What's Next?</h2>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>You'll receive our monthly newsletter with manufacturing tips and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Get notified about new calculators and features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Access exclusive guides and cost optimization strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Stay updated on industry trends and best practices</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/calculators/laser-cutting"
                className="btn-primary btn-lg rounded-lg px-8 py-4"
              >
                Start Using Calculators
              </Link>
              <Link
                href="/blog"
                className="btn-outline btn-lg rounded-lg px-8 py-4"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

