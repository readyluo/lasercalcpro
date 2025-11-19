import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { Calculator, Target, Users, TrendingUp, HelpCircle } from 'lucide-react';

export const metadata = generateMetadata({
  title: 'About LaserCalc Pro | Manufacturing Cost Calculator Team',
  description: 'Meet the LaserCalc Pro team building reliable laser cutting, CNC machining, and ROI calculators for industrial manufacturers worldwide.',
  keywords: ['LaserCalc Pro team', 'manufacturing calculator company', 'about laser cutting calculators'],
});

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={organizationSchema} />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              About LaserCalc Pro
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Professional manufacturing cost calculators designed to help businesses make informed decisions.
            </p>
          </div>

          {/* Mission / Story Section */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                LaserCalc Pro was born from a simple frustration: manufacturing cost estimation was either too simple to
                trust, or too complex for busy teams to actually use.
              </p>
              <p>
                After years working with metal fabrication shops, our team saw the same patterns repeat across different
                countries and company sizes:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-base">
                <li>Quotes built on gut feel instead of clear cost structure.</li>
                <li>Jobs that looked profitable on paper but lost money due to hidden setup and overhead.</li>
                <li>Spreadsheets that only one person understood, prone to silent formula errors.</li>
                <li>Expensive software that sat on the shelf because it took weeks of training to use.</li>
              </ul>
              <p>
                We built LaserCalc Pro to tackle these real problems with a different approach: free, transparent, and
                instantly usable calculators based on industry-standard formulas, designed for everyday quoting,
                planning, and decision-making.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              What We Stand For (With Proof)
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Calculator className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Accuracy</h3>
                <p className="mb-3 text-gray-600">
                  Industry-standard formulas and validated calculations you can review and sanity-check.
                </p>
                <div className="rounded bg-gray-50 p-2 text-left text-xs text-gray-500">
                  <p className="mb-1 font-semibold text-gray-700">Evidence:</p>
                  <p>- Documented calculation logic and assumptions.</p>
                  <p>- Reference documentation for key formulas.</p>
                  <p>- Cross-checks against typical industry benchmarks.</p>
                </div>
              </div>

              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Simplicity</h3>
                <p className="mb-3 text-gray-600">
                  Complex cost structures turned into guided forms and plain-language outputs.
                </p>
                <div className="rounded bg-gray-50 p-2 text-left text-xs text-gray-500">
                  <p className="mb-1 font-semibold text-gray-700">Evidence:</p>
                  <p>- No registration required to start calculating.</p>
                  <p>- Most tools can be completed in under a few minutes.</p>
                  <p>- Explanations and helper text on key inputs.</p>
                </div>
              </div>

              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Transparency</h3>
                <p className="mb-3 text-gray-600">
                  Clear assumptions, visible limitations, and no black-box magic.
                </p>
                <div className="rounded bg-gray-50 p-2 text-left text-xs text-gray-500">
                  <p className="mb-1 font-semibold text-gray-700">Evidence:</p>
                  <p>- Disclaimers and usage notes on every calculator.</p>
                  <p>- "How it works" sections and methodology guides.</p>
                  <p>- No hidden markups or upsell-driven defaults.</p>
                </div>
              </div>

              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <TrendingUp className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                <p className="mb-3 text-gray-600">
                  Continuously improving the tools based on real-world feedback from shops and engineers.
                </p>
                <div className="rounded bg-gray-50 p-2 text-left text-xs text-gray-500">
                  <p className="mb-1 font-semibold text-gray-700">Evidence:</p>
                  <p>- New calculators and features released regularly.</p>
                  <p>- Changes informed by support conversations and audits.</p>
                  <p>- Focus on workflows that match how shops actually operate.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why Choose LaserCalc Pro?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Free Forever
                </h3>
                <p className="text-gray-700">
                  All calculators are completely free to use with no hidden charges or subscriptions.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ No Registration Required
                </h3>
                <p className="text-gray-700">
                  Start calculating immediately without creating an account or providing personal information.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Industry-Standard Formulas
                </h3>
                <p className="text-gray-700">
                  Based on proven manufacturing formulas used by professionals worldwide.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Detailed Reports
                </h3>
                <p className="text-gray-700">
                  Export comprehensive PDF reports with full cost breakdowns and recommendations.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Mobile Friendly
                </h3>
                <p className="text-gray-700">
                  Access all tools seamlessly from any device - desktop, tablet, or mobile.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Regular Updates
                </h3>
                <p className="text-gray-700">
                  Continuously updated with new features, calculators, and improvements.
                </p>
              </div>
            </div>
          </div>

          {/* Business model / why free */}
          <div className="card mb-12 border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-start gap-4">
              <HelpCircle className="mt-1 h-8 w-8 flex-shrink-0 text-blue-600" />
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Why is this free?</h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    We are often asked how a full suite of specialized calculators can be offered at no cost. The short
                    answer is that we believe better costing tools should be accessible to shops of all sizes, not only
                    those that can afford large software contracts.
                  </p>
                  <p>
                    <span className="font-semibold">Our mission:</span> make professional-grade estimation and cost
                    transparency part of everyday work on the shop floor and in the office so more manufacturers can
                    price jobs fairly and stay healthy.
                  </p>
                  <p>
                    <span className="font-semibold">How we support the platform:</span> over time we plan to sustain
                    development through optional premium features for heavy users, educational content, and selected
                    partnerships with equipment and software providers.
                  </p>
                  <p>
                    <span className="font-semibold">Our promise:</span> the core calculators you see today are intended
                    to remain free of usage limits, forced sign-ups, dark-pattern upgrades, and advertising.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Who We Serve</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Manufacturing Companies</h3>
                <p className="text-gray-700">
                  Estimate job costs, optimize pricing strategies, and improve profitability.
                </p>
                <div className="mt-2 rounded bg-blue-50 p-3 text-sm text-gray-700">
                  <p className="mb-1 font-semibold text-blue-900">Common use cases:</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Quote review before sending to customers.</li>
                    <li>Comparing in-house production vs. outsourcing.</li>
                    <li>Checking whether pricing on complex jobs still meets margin targets.</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Engineers &amp; Designers</h3>
                <p className="text-gray-700">
                  Quickly evaluate manufacturing costs during the design phase to optimize for cost efficiency.
                </p>
                <div className="mt-2 rounded bg-green-50 p-3 text-sm text-gray-700">
                  <p className="mb-1 font-semibold text-green-900">Common use cases:</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Design-for-manufacturing cost checks on new parts.</li>
                    <li>Comparing material choices based on total cost, not just price per kg.</li>
                    <li>Estimating the impact of tolerances, finishes, or nesting on cost.</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Procurement Professionals</h3>
                <p className="text-gray-700">
                  Validate supplier quotes and negotiate better pricing with data-driven insights.
                </p>
                <div className="mt-2 rounded bg-amber-50 p-3 text-sm text-gray-700">
                  <p className="mb-1 font-semibold text-amber-900">Common use cases:</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Cross-checking quotes against internally modeled costs.</li>
                    <li>Comparing offers from multiple suppliers on a consistent basis.</li>
                    <li>Understanding cost drivers before long-term contract negotiations.</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Business Owners</h3>
                <p className="text-gray-700">
                  Make informed equipment investment decisions with accurate ROI calculations.
                </p>
                <div className="mt-2 rounded bg-purple-50 p-3 text-sm text-gray-700">
                  <p className="mb-1 font-semibold text-purple-900">Common use cases:</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Testing ROI and payback for new laser, CNC, or automation projects.</li>
                    <li>Exploring different utilization and pricing scenarios before investing.</li>
                    <li>Explaining investment logic to partners, banks, or stakeholders.</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Students &amp; Educators</h3>
                <p className="text-gray-700">
                  Learn manufacturing cost principles with practical, real-world calculation tools.
                </p>
                <div className="mt-2 rounded bg-gray-50 p-3 text-sm text-gray-700">
                  <p className="mb-1 font-semibold text-gray-900">Common use cases:</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Classroom demonstrations of cost structure and ROI concepts.</li>
                    <li>Student projects comparing processes such as laser cutting vs. machining.</li>
                    <li>Self-study for engineers moving into estimating or operations roles.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="card bg-primary-50 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Have Questions or Feedback?
            </h2>
            <p className="mb-6 text-gray-700">
              We&apos;d love to hear from you. Get in touch with our team.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-block rounded-lg px-8 py-3"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}







