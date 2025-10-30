'use client';

import Link from 'next/link';
import { useEnglish } from '@/lib/i18n';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Calculator, TrendingUp, Zap, FileText } from 'lucide-react';

export default function HomePage() {
  const t = useEnglish();

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="gradient-primary py-20 text-white md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                {t.hero.title}
              </h1>
              <p className="mb-8 text-xl text-blue-100 md:text-2xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/calculators/laser-cutting"
                  className="btn-lg inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all hover:bg-gray-100 hover:shadow-lg"
                >
                  <Calculator className="h-5 w-5" />
                  {t.hero.cta.primary}
                </Link>
                <Link
                  href="/blog"
                  className="btn-lg inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-primary-600"
                >
                  {t.hero.cta.secondary}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-4xl font-bold">
              {t.features.title}
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="card-hover text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Calculator className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t.features.free.title}</h3>
                <p className="text-gray-600">{t.features.free.description}</p>
              </div>

              {/* Feature 2 */}
              <div className="card-hover text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <TrendingUp className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t.features.accurate.title}</h3>
                <p className="text-gray-600">{t.features.accurate.description}</p>
              </div>

              {/* Feature 3 */}
              <div className="card-hover text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Zap className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t.features.instant.title}</h3>
                <p className="text-gray-600">{t.features.instant.description}</p>
              </div>

              {/* Feature 4 */}
              <div className="card-hover text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <FileText className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t.features.professional.title}</h3>
                <p className="text-gray-600">{t.features.professional.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-4xl font-bold">Our Calculators</h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Professional tools for every manufacturing need
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Calculator Cards */}
              {calculatorCards.map(card => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="card-hover group"
                >
                  <div className="mb-4 text-primary-600">{card.icon}</div>
                  <h3 className="mb-2 text-2xl font-semibold group-hover:text-primary-600">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                  <div className="mt-4 flex items-center text-primary-600">
                    <span className="font-semibold">Start Calculating</span>
                    <svg
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="gradient-primary py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Ready to Calculate Your Costs?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Start using our free calculators today
            </p>
            <Link
              href="/calculators/laser-cutting"
              className="btn-lg inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all hover:bg-gray-100"
            >
              Get Started Now
            </Link>
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
    description: 'Calculate precise costs for laser cutting projects with detailed breakdowns',
    href: '/calculators/laser-cutting',
    icon: <Calculator className="h-12 w-12" />,
  },
  {
    title: 'CNC Machining Estimator',
    description: 'Estimate CNC machining costs with batch pricing and multi-operation support',
    href: '/calculators/cnc-machining',
    icon: <TrendingUp className="h-12 w-12" />,
  },
  {
    title: 'Equipment ROI Calculator',
    description: 'Evaluate investment returns with NPV, IRR, and payback period analysis',
    href: '/calculators/roi',
    icon: <Zap className="h-12 w-12" />,
  },
  {
    title: 'Energy Cost Calculator',
    description: 'Calculate power consumption and energy costs for laser equipment',
    href: '/calculators/energy',
    icon: <FileText className="h-12 w-12" />,
  },
  {
    title: 'Material Utilization',
    description: 'Optimize material usage and reduce waste with layout planning',
    href: '/calculators/material-utilization',
    icon: <Calculator className="h-12 w-12" />,
  },
];

