import { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ComparisonTable } from '@/components/calculators/ComparisonTable';
import { ScenarioRecommendations } from '@/components/calculators/ScenarioRecommendations';
import { CalculatorQuiz } from '@/components/calculators/CalculatorQuiz';
import { generateMetadata } from '@/lib/seo/metadata';
import { CheckCircle, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'Calculator Comparison & Recommendation - Choose the Right Tool | LaserCalc Pro',
  description: 'Compare laser cutting, CNC machining, ROI, and energy calculators. Find the perfect tool for your manufacturing cost analysis needs with our interactive guide.',
  keywords: ['calculator comparison', 'cost estimator comparison', 'manufacturing calculator guide', 'which calculator to use', 'laser vs cnc calculator'],
  openGraph: {
    title: 'Calculator Comparison - Find Your Perfect Tool',
    description: 'Interactive comparison and recommendation guide for manufacturing cost calculators.',
  }
});

export default function CompareCalculatorsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Find Your Perfect Calculator
              </h1>
              <p className="mb-8 text-xl text-primary-100 md:text-2xl">
                Compare features, get recommendations, and choose the right tool for your needs
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#quiz"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all hover:bg-primary-50 hover:shadow-lg"
                >
                  <Zap className="h-5 w-5" />
                  Take the Quick Quiz
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  View Full Comparison
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="border-b border-gray-200 bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Save Time
                  </h3>
                  <p className="text-gray-600">
                    Find the right calculator in under 2 minutes
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Better Accuracy
                  </h3>
                  <p className="text-gray-600">
                    Use the most appropriate tool for your scenario
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Learn Features
                  </h3>
                  <p className="text-gray-600">
                    Discover capabilities you might have missed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quiz */}
        <section id="quiz" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Not Sure Which Calculator You Need?
                </h2>
                <p className="text-xl text-gray-600">
                  Answer a few quick questions and we'll recommend the perfect tool
                </p>
              </div>
              <CalculatorQuiz />
            </div>
          </div>
        </section>

        {/* Scenario Recommendations */}
        <section className="border-y border-gray-200 bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Common Scenarios & Recommendations
                </h2>
                <p className="text-xl text-gray-600">
                  See which calculators work best for specific situations
                </p>
              </div>
              <ScenarioRecommendations />
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section id="comparison" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Detailed Feature Comparison
                </h2>
                <p className="text-xl text-gray-600">
                  Compare all our calculators side-by-side
                </p>
              </div>
              <ComparisonTable />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-gray-200 bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Ready to Start Calculating?
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                All our calculators are free, fast, and require no registration
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/calculators"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
                >
                  View All Calculators
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-8 py-4 font-semibold text-primary-600 transition-all hover:bg-primary-50"
                >
                  Read Usage Guides
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid gap-8 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-3xl font-bold text-primary-600">8+</div>
                  <div className="text-sm text-gray-600">Calculators Available</div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-3xl font-bold text-primary-600">100%</div>
                  <div className="text-sm text-gray-600">Free to Use</div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-3xl font-bold text-primary-600">98%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

