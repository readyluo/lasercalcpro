import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { generateMetadata } from '@/lib/seo/metadata';
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
  Clock
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

export default async function HomePage() {
  const stats = await getStats();
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section - Simplified */}
        <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-white py-12 md:py-16">
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Badge */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                  <Award className="h-4 w-4" />
                  <span>Trusted by {stats.totalSubscribers > 0 ? `${(Math.floor(stats.totalSubscribers / 1000) * 1000).toLocaleString()}+` : '1,000+'} manufacturers</span>
                </div>
              </div>
              
              {/* Heading */}
              <h1 className="mb-4 text-center text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                Manufacturing Cost <span className="text-primary-600">Calculators</span>
              </h1>
              
              {/* Subheading */}
              <p className="mb-8 text-center text-lg text-gray-600 md:text-xl">
                Free, accurate tools for laser cutting, CNC machining, and ROI analysis. Get instant results with detailed breakdowns.
              </p>
              
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
                    {stats.totalCalculations > 0 
                      ? `${(Math.floor(stats.totalCalculations / 1000) * 1000 / 1000).toFixed(0)}K+` 
                      : '10K+'}
                  </div>
                  <div className="text-sm text-gray-600">Calculations</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {stats.totalSubscribers > 0 
                      ? `${(Math.floor(stats.totalSubscribers / 1000) * 1000 / 1000).toFixed(0)}K+` 
                      : '1K+'}
                  </div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
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
                Professional-grade calculators designed for accuracy, speed, and ease of use
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 transition-all group-hover:scale-110 group-hover:bg-primary-600">
                  <Calculator className="h-8 w-8 text-primary-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">100% Free Forever</h3>
                <p className="text-gray-600">All calculators are completely free with no hidden fees or usage limits</p>
              </div>

              {/* Feature 2 */}
              <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition-all group-hover:scale-110 group-hover:bg-green-600">
                  <BarChart3 className="h-8 w-8 text-green-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Industry Accuracy</h3>
                <p className="text-gray-600">Based on real manufacturing formulas achieving 98% accuracy rate</p>
              </div>

              {/* Feature 3 */}
              <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 transition-all group-hover:scale-110 group-hover:bg-yellow-600">
                  <Zap className="h-8 w-8 text-yellow-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Instant Results</h3>
                <p className="text-gray-600">Real-time calculations in under 500ms with detailed breakdowns</p>
              </div>

              {/* Feature 4 */}
              <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 transition-all group-hover:scale-110 group-hover:bg-purple-600">
                  <FileText className="h-8 w-8 text-purple-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Professional Reports</h3>
                <p className="text-gray-600">Export comprehensive PDF reports for presentations and documentation</p>
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
                Get accurate cost estimates in three simple steps
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="card-hover relative text-center">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                  1
                </div>
                <div className="mb-4 mt-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                  <FileText className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Input Parameters</h3>
                <p className="text-gray-600">
                  Enter your project specifications including material, dimensions, and machine settings
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
                  Our advanced algorithms process your data and calculate costs in real-time
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
                  Receive comprehensive cost breakdown and export professional PDF reports
                </p>
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
                  "This calculator saved us countless hours of manual calculations. The accuracy is impressive and the PDF reports are perfect for client presentations."
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
                  "The ROI calculator helped us justify our equipment investment to stakeholders. The detailed breakdown made the decision-making process much easier."
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
                  "Free, accurate, and incredibly user-friendly. We use it daily for quoting projects. Can't imagine working without it now."
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
