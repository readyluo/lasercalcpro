'use client';

import React from 'react';
import Link from 'next/link';
import { useEnglish } from '@/lib/i18n';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { 
  Calculator, 
  TrendingUp, 
  Zap, 
  FileText, 
  CheckCircle, 
  Users, 
  Globe,
  Award,
  ArrowRight,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const t = useEnglish();

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="gradient-primary relative overflow-hidden py-20 text-white md:py-32">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/4 top-20 h-64 w-64 animate-pulse rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-300 blur-3xl" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                <Award className="h-4 w-4" />
                <span>Trusted by 10,000+ Manufacturers Worldwide</span>
              </div>
              
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                {t.hero.title}
              </h1>
              <p className="mb-8 text-xl text-blue-100 md:text-2xl">
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/calculators/laser-cutting"
                  className="btn-lg group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-2xl"
                >
                  <Calculator className="h-5 w-5" />
                  {t.hero.cta.primary}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="btn-lg inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-primary-600"
                >
                  {t.hero.cta.secondary}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center gap-6 text-blue-100 md:gap-8">
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">100% Free</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">Instant Results</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">PDF Export</span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">10K+</div>
                  <div className="text-sm text-blue-100">Active Users</div>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">50K+</div>
                  <div className="text-sm text-blue-100">Calculations</div>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">98%</div>
                  <div className="text-sm text-blue-100">Accuracy</div>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold md:text-4xl">24/7</div>
                  <div className="text-sm text-blue-100">Available</div>
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
                {t.features.title}
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
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{t.features.free.title}</h3>
                <p className="text-gray-600">{t.features.free.description}</p>
              </div>

              {/* Feature 2 */}
              <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition-all group-hover:scale-110 group-hover:bg-green-600">
                  <BarChart3 className="h-8 w-8 text-green-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{t.features.accurate.title}</h3>
                <p className="text-gray-600">{t.features.accurate.description}</p>
              </div>

              {/* Feature 3 */}
              <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 transition-all group-hover:scale-110 group-hover:bg-yellow-600">
                  <Zap className="h-8 w-8 text-yellow-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{t.features.instant.title}</h3>
                <p className="text-gray-600">{t.features.instant.description}</p>
              </div>

              {/* Feature 4 */}
              <div className="card-hover group text-center transition-all duration-300 hover:shadow-xl">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 transition-all group-hover:scale-110 group-hover:bg-purple-600">
                  <FileText className="h-8 w-8 text-purple-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{t.features.professional.title}</h3>
                <p className="text-gray-600">{t.features.professional.description}</p>
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

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our calculators
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              <FAQItem
                question="Are the calculators really free to use?"
                answer="Yes, absolutely! All our calculators are 100% free with no hidden fees, no credit card required, and no usage limits. We believe in providing valuable tools to the manufacturing community."
              />
              <FAQItem
                question="How accurate are the cost calculations?"
                answer="Our calculators use industry-standard formulas and real manufacturing data, achieving 95-98% accuracy. However, actual costs may vary based on specific conditions, equipment, and local factors."
              />
              <FAQItem
                question="Can I export my calculation results?"
                answer="Yes! You can export detailed PDF reports with comprehensive cost breakdowns, charts, and recommendations. Perfect for presentations and documentation."
              />
              <FAQItem
                question="Do I need to create an account?"
                answer="No account necessary! You can start using our calculators immediately without any sign-up. However, creating a free account lets you save your calculations and access history."
              />
              <FAQItem
                question="What materials are supported?"
                answer="We support all common manufacturing materials including various grades of steel, aluminum, copper, brass, and plastics. Material properties are based on industry specifications."
              />
              <FAQItem
                question="Can I use these for commercial projects?"
                answer="Absolutely! Our calculators are designed for professional use. Many manufacturing companies, job shops, and fabricators use our tools daily for quotations and planning."
              />
            </div>
          </div>
        </section>

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

// FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        <svg
          className={`h-6 w-6 flex-shrink-0 text-primary-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-6 pb-6 pt-4">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
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
    title: 'Energy Cost Calculator',
    description: 'Calculate power consumption and energy costs for laser equipment with efficiency recommendations',
    href: '/calculators/energy',
    icon: <Zap className="h-12 w-12" />,
    badge: null,
  },
  {
    title: 'Material Utilization',
    description: 'Optimize material usage, reduce waste with smart layout planning, and calculate cost savings',
    href: '/calculators/material-utilization',
    icon: <FileText className="h-12 w-12" />,
    badge: null,
  },
];

