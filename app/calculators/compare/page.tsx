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
  description:
    'Compare laser cutting, CNC machining, ROI, and energy calculators. Use this guide to choose which calculator to start with for your manufacturing cost analysis.',
  keywords: ['calculator comparison', 'cost estimator comparison', 'manufacturing calculator guide', 'which calculator to use', 'laser vs cnc calculator'],
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
                Find the Right Calculator for Your Job
              </h1>
              <p className="mb-8 text-xl text-primary-100 md:text-2xl">
                Answer a few questions or browse a side-by-side comparison to see which calculators fit your current
                decisionwhether you are costing a job, buying a machine, or improving utilization.
              </p>
              <p className="mb-8 text-sm text-primary-100 md:text-base">
                Recommendations are guidance, not rules. Many real-world decisions use two or three calculators together.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#quiz"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all hover:bg-primary-50 hover:shadow-lg"
                >
                  <Zap className="h-5 w-5" />
                  <span>Take the Quick Quiz</span>
                  <span className="hidden text-xs text-primary-500 sm:inline">
                    (Best if you are not sure where to start)
                  </span>
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  <span>View Full Comparison</span>
                  <span className="hidden text-xs text-primary-100 sm:inline">
                    (Best if you already know roughly what you are looking for)
                  </span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How this page works */}
        <section className="border-b border-gray-200 bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-xl bg-gray-50 p-6">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">How this page helps you choose</h2>
              <p className="mb-3 text-sm text-gray-700">
                This page acts as a router between your situation and the calculators that usually help most. Use it to
                pick a path, then do the detailed work inside the calculators themselves.
              </p>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-semibold">1. Describe your situation.</span> Take the quiz or scan the common
                  scenarios to match your goal: quoting a job, evaluating equipment, reducing energy, or improving
                  utilization.
                </li>
                <li>
                  <span className="font-semibold">2. Review the suggested calculators.</span> We map your situation to a
                  small stack of tools (often two or three) that typically go together for that decision.
                </li>
                <li>
                  <span className="font-semibold">3. Deep-dive in the tools.</span> Open the recommended calculators,
                  enter your real shop data, and read each page's assumptions and disclaimers before acting on the
                  results.
                </li>
              </ol>
              <p className="mt-3 text-xs text-gray-600">
                For high-stakes decisions, such as major equipment purchases or long-term contracts, plan on using more
                than one calculator (for example, Laser Cutting + ROI + Energy) and comparing how sensitive your decision
                is to each cost driver.
              </p>
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
                    Quickly narrow down which calculator to start with
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Better Fit
                  </h3>
                  <p className="text-gray-600">
                    Use a calculator that aligns with your current scenario
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
                <p className="mb-2 text-xl text-gray-600">
                  Answer a few quick questions and we will suggest calculators that match common manufacturing decision
                  patterns.
                </p>
                <p className="text-sm text-gray-600">
                  The quiz groups your answers into themes (job costing, equipment selection, utilization, energy) and
                  then recommends one to three tools that usually help with that type of decision. It does not know your
                  exact shop layout or pricing strategy, so treat the results as a starting point, not a final verdict.
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  If none of the suggestions feel right, scroll down to the full comparison table or the calculators
                  overview page and choose manually; your situation may span multiple tools.
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
                  Each scenario below describes a real-world decision and suggests a small stack of calculators that work
                  well togethertypically a primary tool plus one or two supporting tools.
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
                  Use this table to compare calculators across decision dimensions: what they estimate (time, cost, ROI),
                  when they are usually used in a project, and how much input detail they expect.
                </p>
              </div>
              <ComparisonTable />
            </div>
          </div>
        </section>

        {/* Limitations & safe use */}
        <section className="border-t border-gray-200 bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-xl bg-gray-50 p-6">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Limitations & how to use recommendations safely</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  The quiz, scenarios, and comparison are based on common patterns from shops we have worked with. Your
                  mix of machines, staff, and customers may be different, so always sanity-check suggestions against your
                  own experience.
                </p>
                <p>
                  Some decisions, especially equipment purchases and multi-year contracts, span several calculators. Do
                  not expect a single tool to answer everything; plan to run two or three related calculators and see how
                  sensitive your decision is to each driver.
                </p>
                <p>
                  Before committing prices to customers or banks, always read the assumptions and disclaimers on each
                  calculator page, then compare results with at least a few historical jobs or quotes from your own shop.
                </p>
              </div>
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

              <p className="mt-4 text-sm text-gray-600">
                New to these tools? Start with the quiz above, then read our{' '}
                <Link href="/methodology" className="text-primary-600 underline-offset-2 hover:underline">
                  Methodology
                </Link>{' '}
                page to see how the calculations and assumptions work.
              </p>

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
                  <div className="text-3xl font-bold text-primary-600">Guided</div>
                  <div className="text-sm text-gray-600">Input-driven estimates based on your data</div>
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

