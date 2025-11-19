import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import { Mail } from 'lucide-react';

export const metadata = generateMetadata({
  title: 'Subscribe to LaserCalc Pro Insights',
  description:
    'Join the LaserCalc Pro newsletter to receive manufacturing cost breakdowns, calculator launch notes, and quoting tactics every week.',
  keywords: ['LaserCalc Pro newsletter', 'manufacturing cost newsletter', 'laser cutting tips email'],
  alternates: { canonical: '/subscribe' },
});

const signupSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Newsletter Signup',
  url: 'https://www.lasercalcpro.com/subscribe',
  description:
    'Signup form for LaserCalc Pro manufacturing insights, including calculator updates and cost optimization tactics.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'LaserCalc Pro',
    url: 'https://www.lasercalcpro.com',
  },
};

export default function SubscribePage() {
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={signupSchema} />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs />

          <header className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <Mail className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Subscribe to Our Newsletter</h1>
            <p className="text-xl text-gray-600">
              Weekly manufacturing insights, calculator updates, and quoting tactics delivered straight to your inbox.
            </p>
          </header>

          <section className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '📊',
                title: 'Industry Insights',
                description: 'Benchmark data, quoting strategies, and process optimization tactics.',
              },
              {
                icon: '🔧',
                title: 'Calculator Notes',
                description: 'Be first to know about new calculators, feature updates, and API releases.',
              },
              {
                icon: '💡',
                title: 'Actionable Tips',
                description: 'Short playbooks for reducing costs, improving throughput, and winning quotes.',
              },
            ].map(benefit => (
              <div key={benefit.title} className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-4 text-3xl">{benefit.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </section>

          <section className="mx-auto max-w-lg rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <form action="/api/subscribe" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@company.com"
                  aria-describedby="email-description"
                />
                <p id="email-description" className="mt-1 text-xs text-gray-500">
                  We only use your email to deliver the newsletter.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your name"
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                I agree to receive newsletters and accept the{' '}
                <a href="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-primary-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Subscribe Now
              </button>

              <p className="text-center text-sm text-gray-500">You can unsubscribe at any time.</p>
            </form>
          </section>

          <section className="mt-12 text-center text-sm text-gray-600">
            <p className="mb-4">Trusted by 1,000+ manufacturing professionals.</p>
            <p>
              <strong>Frequency:</strong> Weekly • <strong>No spam:</strong> Only actionable content •{' '}
              <strong>Easy unsubscribe:</strong> One click
            </p>
          </section>

          <section className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: 'How often will I receive emails?',
                  answer: 'We send one newsletter per week with curated manufacturing insights.',
                },
                {
                  question: 'Can I unsubscribe?',
                  answer: 'Yes. Every email includes a one-click unsubscribe link and you can update preferences anytime.',
                },
                {
                  question: 'What type of content will I receive?',
                  answer: 'Industry benchmarks, cost optimization tips, calculator walkthroughs, and case studies.',
                },
                {
                  question: 'Is my email safe?',
                  answer:
                    'We never sell or share your email address. Review the Privacy Policy for full details on storage and usage.',
                },
              ].map(item => (
                <div key={item.question}>
                  <h3 className="mb-2 font-semibold text-gray-900">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
