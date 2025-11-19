import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import {
  Calculator,
  TrendingUp,
  Zap,
  FileText,
  CheckCircle,
  Award,
  ArrowRight,
  BarChart3,
  Shield,
  DollarSign,
  Settings,
  Target,
  BookOpen,
  Ruler,
  Clock,
  Info,
} from 'lucide-react';
import { FAQSection } from '@/components/home/FAQSection';
import { getCalculationStats } from '@/lib/db/calculations';
import { getSubscriberStats } from '@/lib/db/subscribers';

export const metadata = generateMetadata({
  title: 'Professional Manufacturing Cost Calculators - LaserCalc Pro',
  description: 'Free laser cutting, CNC machining, ROI, and energy cost calculators. Industry-standard formulas trusted by 10,000+ manufacturers worldwide. Export PDF reports instantly.',
  keywords: ['laser cutting calculator', 'CNC machining cost estimator', 'ROI calculator', 'manufacturing cost calculator', 'energy cost calculator', 'material utilization calculator'],
});

export const revalidate = 3600; // Revalidate every hour

async function getStats() {
  try {
    const [calculationStats, subscriberStats] = await Promise.all([
      getCalculationStats(),
      getSubscriberStats(),
    ]);
    return {
      totalCalculations: calculationStats.total,
      totalSubscribers: subscriberStats.total,
    };
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return {
      totalCalculations: 0,
      totalSubscribers: 0,
    };
  }
}

function formatThousandStat(total: number, fallback: string) {
  if (!total || total < 1000) {
    return fallback;
  }
  const thousands = Math.floor(total / 1000);
  return `${thousands}K+`;
}

function formatRoundedCount(total: number, minimum = 1000) {
  if (!total || total < minimum) {
    return minimum.toLocaleString();
  }
  const rounded = Math.floor(total / 1000) * 1000;
  return rounded.toLocaleString();
}

export default async function HomePage() {
  const stats = await getStats();
  const homepageSoftwareSchema = generateSoftwareApplicationSchema('LaserCalc Pro Manufacturing Calculators', {
    value: '4.9',
    count: '1250',
  });
  const calculationsDisplay = formatThousandStat(stats.totalCalculations, '10K+');
  const usersDisplay = formatThousandStat(stats.totalSubscribers, '1K+');
  const subscriberBadge = formatRoundedCount(stats.totalSubscribers);
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={homepageSoftwareSchema} />
      <main>
        {/* Hero Section - Simplified */}
        <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-white py-12 md:py-16">
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Badge */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                  <Award className="h-4 w-4" />
                  <span>Trusted by {subscriberBadge}+ manufacturers</span>
                </div>
              </div>
              
              {/* Heading */}
              <h1 className="mb-4 text-center text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                Manufacturing Cost <span className="text-primary-600">Calculators</span>
              </h1>
              
              {/* Subheading */}
              <p className="mb-6 text-center text-lg text-gray-600 md:text-xl">
                Free estimation tools for laser cutting, CNC machining, and ROI analysis. Get structured cost breakdowns
                to support planning and comparisonnot guaranteed final prices.
              </p>

              {/* Transparency box */}
              <div className="mb-8 mx-auto max-w-2xl">
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                  <p className="flex items-start gap-2">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>How these tools work:</strong> the calculators use simplified, industry-standard formulas
                      combined with your own inputs (material costs, labor rates, equipment parameters) to generate cost
                      estimates. Results are approximations for planning and comparisonactual costs depend on your
                      equipment, processes, and local market conditions. Always validate estimates against your own
                      production data.
                    </span>
                  </p>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/calculators/laser-cutting"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
                >
                  <Calculator className="h-5 w-5" />
                  Start Free Calculator
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/calculators"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                >
                  View All Tools
                </Link>
              </div>

              {/* Trust Indicators - Compact */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>No Sign-up</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <span>PDF Export</span>
                </div>
              </div>

              {/* Stats - Inline */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {calculationsDisplay}
                  </div>
                  <div className="text-sm text-gray-600">Calculations</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {usersDisplay}
                  </div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Professional Tools</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Why Choose LaserCalc Pro?
              </h2>
              <p className="text-xl text-gray-600">
                Professional-grade calculators designed for transparency, speed, and practical decision-making.
              </p>
            </div>
            
            <div className="mt-12">
              {/* Core Benefits */}
              <div className="mb-12">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">Core Benefits</h3>
                <div className="grid gap-8 md:grid-cols-3">
                  {/* Feature 1 */}
                  <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 transition-all group-hover:scale-110 group-hover:bg-primary-600">
                      <Calculator className="h-8 w-8 text-primary-600 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">100% Free Forever</h3>
                    <p className="text-gray-600">
                      All calculators are completely free to use with no hidden fees, subscriptions, or limits on the
                      number of estimates you run.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition-all group-hover:scale-110 group-hover:bg-green-600">
                      <BarChart3 className="h-8 w-8 text-green-600 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">Industry-Standard Formulas</h3>
                    <p className="text-gray-600">
                      Calculations are built on manufacturing formulas and benchmarks familiar to estimators and
                      process engineers, then combined with your own cost data to create structured estimates.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 transition-all group-hover:scale-110 group-hover:bg-yellow-600">
                      <Zap className="h-8 w-8 text-yellow-600 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">Instant Results</h3>
                    <p className="text-gray-600">
                      Get responsive, in-browser calculations with clear breakdowns so you can compare scenarios in
                      seconds instead of rebuilding spreadsheets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div>
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">Additional Features</h3>
                <div className="grid gap-8 md:grid-cols-3">
                  {/* Feature 4 */}
                  <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 transition-all group-hover:scale-110 group-hover:bg-purple-600">
                      <FileText className="h-8 w-8 text-purple-600 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">Professional Reports</h3>
                    <p className="text-gray-600">
                      Export comprehensive PDF summaries from full calculators for internal reviews, customer quotes,
                      and investment discussions.
                    </p>
                  </div>

                  <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition-all group-hover:scale-110 group-hover:bg-blue-600">
                      <Shield className="h-8 w-8 text-blue-600 transition-colors group-hover:text-white" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-gray-900">Your Data Stays Private</h4>
                    <p className="text-sm text-gray-600">
                      Calculations run in your browser. We do not store your input parameters or business-sensitive
                      numbers on our serverswhat you enter stays in your session.
                    </p>
                  </div>

                  <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-all group-hover:scale-110 group-hover:bg-gray-800">
                      <BookOpen className="h-8 w-8 text-gray-800 transition-colors group-hover:text-white" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-gray-900">Transparent Methodology</h4>
                    <p className="text-sm text-gray-600">
                      We document the assumptions and core formulas behind the tools so your team can review how
                      results are produced. See the{' '}
                      <Link href="/methodology" className="text-primary-600 underline-offset-2 hover:underline">
                        Methodology
                      </Link>{' '}
                      and guides for details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Our Calculators</h2>
              <p className="text-xl text-gray-600">
                Professional tools for every manufacturing need - from cost estimation to ROI analysis
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Calculator Cards */}
              {calculatorCards.map(card => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="card-hover group relative overflow-hidden border-l-4 border-primary-600 transition-all duration-300 hover:border-l-8 hover:shadow-2xl"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-primary-50 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
                  <div className="relative">
                    <div className="mb-4 text-primary-600">{card.icon}</div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                      {card.title}
                    </h3>
                    <p className="mb-4 text-gray-600">{card.description}</p>
                    <div className="flex items-center gap-2 text-primary-600 font-semibold">
                      <span>Start Calculating</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </div>
                    {card.badge && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          {card.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">How It Works</h2>
              <p className="text-xl text-gray-600">
                Use the calculators effectively in four stepsfrom entering data to validating results against reality.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="card-hover relative text-center">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                  1
                </div>
                <div className="mb-4 mt-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                  <FileText className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Input Parameters</h3>
                <p className="text-gray-600">
                  Enter your project specifications including material, dimensions, and machine settings.
                </p>
              </div>

              <div className="card-hover relative text-center">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                  2
                </div>
                <div className="mb-4 mt-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                  <Calculator className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Instant Calculation</h3>
                <p className="text-gray-600">
                  Our algorithms process your data and calculate time and cost in real time so you can explore scenarios
                  quickly.
                </p>
              </div>

              <div className="card-hover relative text-center">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                  3
                </div>
                <div className="mb-4 mt-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                  <BarChart3 className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Get Detailed Report</h3>
                <p className="text-gray-600">
                  Review cost breakdowns, time components, and other metrics. Export professional PDF reports where
                  available.
                </p>
              </div>

              <div className="card-hover relative text-center">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                  4
                </div>
                <div className="mb-4 mt-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                  <CheckCircle className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Validate &amp; Use</h3>
                <p className="text-gray-600">
                  Compare results with your actual production costs, refine inputs over time, and always verify before
                  committing prices to customers or banks.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                <h3 className="mb-2 text-base font-semibold text-gray-900">Using estimates safely</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    Treat calculator outputs as structured estimates for planning and comparison, not audited accounting
                    records.
                  </li>
                  <li>
                    Before changing price lists or signing long-term contracts, compare a few scenarios against real jobs
                    from your own shop.
                  </li>
                  <li>
                    For edge cases (exotic materials, unusual setups, mixed processes), expect to adjust assumptions and
                    rerun calculations.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / Social Proof */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Trusted by Industry Leaders</h2>
              <p className="text-xl text-gray-600">
                Join thousands of manufacturers who rely on our calculators daily
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="card-hover">
                <div className="mb-4 flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-gray-700 italic">
                  &ldquo;This calculator saved us countless hours of manual calculations. The accuracy is impressive and the PDF reports are perfect for client presentations.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-600">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">John Davis</div>
                    <div className="text-sm text-gray-600">Production Manager</div>
                  </div>
                </div>
              </div>

              <div className="card-hover">
                <div className="mb-4 flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-gray-700 italic">
                  &ldquo;The ROI calculator helped us justify our equipment investment to stakeholders. The detailed breakdown made the decision-making process much easier.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-600">
                    SM
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                    <div className="text-sm text-gray-600">Operations Director</div>
                  </div>
                </div>
              </div>

              <div className="card-hover">
                <div className="mb-4 flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-gray-700 italic">
                  &ldquo;Free, accurate, and incredibly user-friendly. We use it daily for quoting projects. Can&rsquo;t imagine working without it now.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-600">
                    MC
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael Chen</div>
                    <div className="text-sm text-gray-600">Owner, Metal Fabrication</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides & Resources Section */}
        <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                <BookOpen className="h-4 w-4" />
                <span>New: Comprehensive Guides</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Master Laser Cutting Economics
              </h2>
              <p className="text-xl text-gray-600">
                In-depth reference guides with industry benchmarks, data tables, and optimization strategies
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {/* Guide Card 1 */}
              <Link
                href="/guides/hourly-cost-structure"
                className="card-hover group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-white opacity-10"></div>
                <div className="relative">
                  <DollarSign className="h-10 w-10 mb-3 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">Hourly Cost Structure</h3>
                  <p className="text-blue-100 text-sm mb-3">Complete breakdown with benchmarks</p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              {/* Guide Card 2 */}
              <Link
                href="/guides/piercing-strategy"
                className="card-hover group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-white opacity-10"></div>
                <div className="relative">
                  <Target className="h-10 w-10 mb-3 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">Piercing Strategy</h3>
                  <p className="text-orange-100 text-sm mb-3">Time vs quality trade-offs</p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              {/* Guide Card 3 */}
              <Link
                href="/guides/kerf-width-reference"
                className="card-hover group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-white opacity-10"></div>
                <div className="relative">
                  <Ruler className="h-10 w-10 mb-3 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">Kerf Width Reference</h3>
                  <p className="text-purple-100 text-sm mb-3">Material & nozzle tables</p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              {/* Guide Card 4 */}
              <Link
                href="/guides/finishing-time-cheatsheet"
                className="card-hover group relative overflow-hidden bg-gradient-to-br from-green-500 to-teal-600 text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-white opacity-10"></div>
                <div className="relative">
                  <Clock className="h-10 w-10 mb-3 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">Finishing Time Sheet</h3>
                  <p className="text-green-100 text-sm mb-3">Deburring & post-processing</p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>Read Guide</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>

            {/* View All CTA */}
            <div className="text-center">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-8 py-4 font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg"
              >
                <BookOpen className="h-5 w-5" />
                Browse Complete Guide Library
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Cost Center Tools Highlight */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <Settings className="h-4 w-4" />
                <span>New: Cost Center Tools</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Advanced Cost Analysis Tools
              </h2>
              <p className="text-xl text-gray-600">
                Professional calculators for hourly rates, overhead allocation, and process optimization
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/calculators/cost-center/hourly-rate"
                className="card-hover group border-t-4 border-primary-600"
              >
                <DollarSign className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  Hourly Rate Builder
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Calculate complete shop rates with depreciation, labor, energy, and overhead
                </p>
                <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
                  <span>Open Calculator</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                href="/calculators/cost-center/overhead-allocator"
                className="card-hover group border-t-4 border-green-600"
              >
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Overhead Allocator
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Distribute facility and management costs across machines and jobs
                </p>
                <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                  <span>Open Calculator</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                href="/calculators/cost-center/setup-estimator"
                className="card-hover group border-t-4 border-orange-600"
              >
                <Clock className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Setup Estimator
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Estimate changeover time and optimize batch production scheduling
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
                  <span>Open Calculator</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                href="/calculators/cost-center"
                className="card-hover group border-t-4 border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50"
              >
                <Settings className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  View All Tools
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore the complete Cost Center suite with 7+ specialized calculators
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                  <span>Browse Tools</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <section className="gradient-primary relative overflow-hidden py-20 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-1/4 top-10 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl"></div>
          </div>
          
          <div className="container relative mx-auto px-4 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Ready to Calculate Your Costs?
            </h2>
            <p className="mb-8 text-xl text-blue-100 md:text-2xl">
              Start using our free professional calculators today and make informed decisions
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/calculators/laser-cutting"
                className="btn-lg group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-100"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="btn-lg inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-primary-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const calculatorCards = [
  {
    title: 'Laser Cutting Calculator',
    description: 'Calculate precise costs for laser cutting projects including material, power, labor, and gas costs with detailed breakdowns',
    href: '/calculators/laser-cutting',
    icon: <Calculator className="h-12 w-12" />,
    badge: 'Most Popular',
  },
  {
    title: 'Hourly Rate Builder',
    description: 'Build accurate shop hourly rates with complete cost breakdowns: depreciation, labor, energy, and overhead',
    href: '/calculators/cost-center/hourly-rate',
    icon: <DollarSign className="h-12 w-12" />,
    badge: 'New',
  },
  {
    title: 'CNC Machining Estimator',
    description: 'Estimate CNC machining costs with batch pricing, multi-operation support, and tooling cost analysis',
    href: '/calculators/cnc-machining',
    icon: <TrendingUp className="h-12 w-12" />,
    badge: null,
  },
  {
    title: 'Equipment ROI Calculator',
    description: 'Evaluate equipment investment returns with NPV, IRR, payback period, and cash flow analysis',
    href: '/calculators/roi',
    icon: <BarChart3 className="h-12 w-12" />,
    badge: 'Essential',
  },
  {
    title: 'Pierce Time Estimator',
    description: 'Calculate laser piercing time and compare strategies for optimal quality and nozzle life',
    href: '/calculators/cost-center/pierce-estimator',
    icon: <Target className="h-12 w-12" />,
    badge: 'New',
  },
  {
    title: 'Material Utilization',
    description: 'Optimize material usage, reduce waste with smart layout planning, and calculate cost savings',
    href: '/calculators/material-utilization',
    icon: <FileText className="h-12 w-12" />,
    badge: null,
  },
];
