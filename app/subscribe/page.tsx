import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscribe to Newsletter | LaserCalc Pro',
  description:
    'Subscribe to our newsletter for exclusive manufacturing insights, calculator updates, and industry tips.',
};

export default function SubscribePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600">Subscribe</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Subscribe to Our Newsletter
        </h1>
        <p className="text-xl text-gray-600">
          Get exclusive manufacturing insights, calculator updates, and industry
          tips delivered to your inbox
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 text-3xl">📊</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Industry Insights
          </h3>
          <p className="text-gray-600">
            Expert analysis of manufacturing trends, cost optimization
            strategies, and best practices
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 text-3xl">🔧</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Calculator Updates
          </h3>
          <p className="text-gray-600">
            Be first to know about new calculators, features, and improvements
            to our tools
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 text-3xl">💡</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Exclusive Tips
          </h3>
          <p className="text-gray-600">
            Practical tips for reducing costs, improving efficiency, and
            maximizing profitability
          </p>
        </div>
      </div>

      {/* Subscribe Form */}
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <form
          action="/api/subscribe"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
              I agree to receive newsletters and accept the{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Subscribe Now
          </button>

          <p className="text-center text-sm text-gray-500">
            You can unsubscribe at any time
          </p>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center text-sm text-gray-600">
        <p className="mb-4">
          Join 1,000+ manufacturing professionals who get our newsletter
        </p>
        <p>
          <strong>Frequency:</strong> Weekly • <strong>No spam:</strong> Only
          valuable content • <strong>Easy unsubscribe:</strong> One click
        </p>
      </div>

      {/* FAQ */}
      <div className="mt-12 border-t border-gray-200 pt-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold text-gray-900">
              How often will I receive emails?
            </h3>
            <p className="text-gray-600">
              We send one newsletter per week with curated content. We respect
              your inbox and never spam.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">
              Can I unsubscribe?
            </h3>
            <p className="text-gray-600">
              Absolutely! Every email includes an unsubscribe link. You can
              opt-out at any time with one click.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">
              What kind of content will I receive?
            </h3>
            <p className="text-gray-600">
              Industry insights, cost optimization tips, calculator tutorials,
              case studies, and manufacturing best practices.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">
              Is my email safe?
            </h3>
            <p className="text-gray-600">
              Yes! We never sell or share your email address. Read our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{' '}
              for details.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-lg bg-blue-50 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Not ready to subscribe?
        </h2>
        <p className="mb-6 text-gray-600">
          Explore our free calculators and resources
        </p>
        <a
          href="/calculators"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Try Our Calculators
        </a>
      </div>
    </main>
  );
}




