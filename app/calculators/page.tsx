'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
// import { generateMetadata } from '@/lib/seo/metadata'; // Reserved for future dynamic metadata
import {
  Calculator,
  Zap,
  Package,
  TrendingUp,
  Scissors,
  DollarSign,
  Timer,
  Settings,
  Pen,
  Flame,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function CalculatorsPage() {
  const calculators = [
    {
      id: 'quick-price-per-meter',
      title: 'Price per Meter (Mini)',
      description: 'Ultra-fast estimate of operating price per meter by material and thickness.',
      icon: Scissors,
      color: 'blue',
      href: '/calculators/quick/price-per-meter',
      features: [
        'Material & thickness based speed',
        'Electricity + labor only',
        'Instant estimate'
      ]
    },
    {
      id: 'quick-hourly-rate',
      title: 'Laser Hourly Rate (Mini)',
      description: 'Compute true hourly cost including depreciation, power, labor, and overhead.',
      icon: DollarSign,
      color: 'indigo',
      href: '/calculators/quick/hourly-rate',
      features: [
        'Depreciation per hour',
        'Electricity cost per hour',
        'All-in hourly rate'
      ]
    },
    {
      id: 'quick-pierce-time',
      title: 'Pierce Time Estimator (Mini)',
      description: 'Calculate laser piercing time for accurate job costing and efficiency analysis.',
      icon: Timer,
      color: 'orange',
      href: '/calculators/quick/pierce-time',
      features: [
        'Material & thickness-based pierce time',
        'Total job pierce time calculation',
        'Cost impact analysis'
      ]
    },
    {
      id: 'qr-cutting-speeds',
      title: 'Cutting Speeds (Quick Ref)',
      description: 'Benchmark speeds for common materials and thicknesses (fiber laser).',
      icon: Zap,
      color: 'yellow',
      href: '/calculators/quick-reference/cutting-speeds',
      features: [
        'Steel, stainless, aluminum',
        'By thickness range',
        'Production planning'
      ]
    },
    {
      id: 'qr-assist-gas',
      title: 'Assist Gas Costs (Quick Ref)',
      description: 'Typical costs and use cases for oxygen, nitrogen, and air.',
      icon: DollarSign,
      color: 'green',
      href: '/calculators/quick-reference/assist-gas',
      features: [
        'Use case guidance',
        'Approximate costs',
        'Optimization tips'
      ]
    },
    {
      id: 'qr-material-costs',
      title: 'Material Costs (Quick Ref)',
      description: 'Current metal material prices and cost calculation guide.',
      icon: Package,
      color: 'blue',
      href: '/calculators/quick-reference/material-costs',
      features: [
        'Steel, stainless, aluminum prices',
        'Cost calculation examples',
        'Material selection tips'
      ]
    },
    {
      id: 'qr-power-consumption',
      title: 'Power Consumption (Quick Ref)',
      description: 'Equipment power usage and electricity cost reference.',
      icon: Zap,
      color: 'yellow',
      href: '/calculators/quick-reference/power-consumption',
      features: [
        'Fiber vs CO2 laser comparison',
        'Annual cost estimates',
        'Energy efficiency tips'
      ]
    },
    {
      id: 'qr-processing-parameters',
      title: 'Processing Parameters (Quick Ref)',
      description: 'Comprehensive parameter tables for fiber laser cutting across materials.',
      icon: Settings,
      color: 'purple',
      href: '/calculators/quick-reference/processing-parameters',
      features: [
        'Power, speed, focus settings',
        'Gas pressure & nozzle size',
        'Troubleshooting guide'
      ]
    },
    {
      id: 'laser-cutting',
      title: 'Laser Cutting Calculator',
      description: 'Calculate accurate laser cutting costs including material, power, labor, and gas costs for various materials and thicknesses.',
      icon: Scissors,
      color: 'blue',
      href: '/calculators/laser-cutting',
      features: [
        'Material cost analysis',
        'Energy consumption',
        'Labor cost estimation',
        'Gas consumption tracking'
      ]
    },
    {
      id: 'marking',
      title: 'Laser Marking & Engraving Calculator',
      description: 'Calculate precise costs for laser marking, engraving, and etching across all materials with time and profitability analysis.',
      icon: Pen,
      color: 'purple',
      href: '/calculators/marking',
      features: [
        'Annealing, engraving, etching',
        'Time & cost per piece',
        'Pricing recommendations',
        'Efficiency metrics'
      ]
    },
    {
      id: 'welding',
      title: 'Laser Welding Calculator',
      description: 'Professional laser welding cost calculator for all processes. Calculate accurate costs with gas, power, and labor analysis.',
      icon: Flame,
      color: 'orange',
      href: '/calculators/welding',
      features: [
        'Conduction, keyhole, seam, spot',
        'Shielding gas cost analysis',
        'Quality & batch optimization',
        'Comprehensive pricing guide'
      ]
    },
    {
      id: 'cnc-machining',
      title: 'CNC Machining Calculator',
      description: 'Estimate CNC machining costs per part including material, tooling, setup time, and batch production analysis.',
      icon: Calculator,
      color: 'purple',
      href: '/calculators/cnc-machining',
      features: [
        'Per-part cost breakdown',
        'Tooling cost analysis',
        'Batch optimization',
        'Volume pricing tiers'
      ]
    },
    {
      id: 'material-utilization',
      title: 'Material Utilization Calculator',
      description: 'Optimize material layout and nesting to reduce waste, calculate utilization rates, and maximize material efficiency.',
      icon: Package,
      color: 'green',
      href: '/calculators/material-utilization',
      features: [
        'Nesting optimization',
        'Waste reduction analysis',
        'Sheet layout planning',
        'Cost savings calculation'
      ]
    },
    {
      id: 'energy',
      title: 'Energy Cost Calculator',
      description: 'Calculate power consumption, electricity costs, and identify energy-saving opportunities for your manufacturing equipment.',
      icon: Zap,
      color: 'yellow',
      href: '/calculators/energy',
      features: [
        'Power consumption tracking',
        'Cost per hour analysis',
        'Energy efficiency rating',
        'Savings recommendations'
      ]
    },
    {
      id: 'roi',
      title: 'Equipment ROI Calculator',
      description: 'Analyze return on investment for equipment purchases with detailed financial projections, NPV, IRR, and payback period.',
      icon: TrendingUp,
      color: 'indigo',
      href: '/calculators/roi',
      features: [
        'Payback period analysis',
        'NPV & IRR calculation',
        'Cash flow projections',
        'Risk assessment'
      ]
    },
  ];

  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50 text-blue-600',
    purple: 'border-purple-500 bg-purple-50 text-purple-600',
    green: 'border-green-500 bg-green-50 text-green-600',
    yellow: 'border-yellow-500 bg-yellow-50 text-yellow-600',
    indigo: 'border-indigo-500 bg-indigo-50 text-indigo-600',
    orange: 'border-orange-500 bg-orange-50 text-orange-600',
  };

  const borderClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
    indigo: 'border-indigo-500',
    orange: 'border-orange-500',
  } as const;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary-100 p-4">
                <Calculator className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Manufacturing Calculators
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Professional cost estimation tools for laser cutting, CNC machining, material optimization, 
              energy analysis, and equipment ROI calculations. Free, accurate, and easy to use.
            </p>
          </div>

          {/* Category navigation */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="card border-l-4 border-blue-500">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-900">
                <Zap className="h-5 w-5 text-blue-600" />
                Quick Tools (Mini)
              </h3>
              <p className="mb-3 text-sm text-gray-700">
                Ultra-fast estimates with minimal inputs. Best for ballpark calculations, phone quotes, and exploring
                multiple options in under a minute.
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Use when:</span>
                {' '}
                you need a rough answer quickly, are comparing several scenarios, or want a starting point before
                building a full job.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                <span className="font-semibold">Inputs:</span>
                {' '}
                ~3–5 fields •
                {' '}
                <span className="font-semibold">Output:</span>
                {' '}
                single cost metric (e.g. $/m, $/hour) for quick decisions.
              </p>
            </div>

            <div className="card border-l-4 border-green-500">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-900">
                <Calculator className="h-5 w-5 text-green-600" />
                Full Calculators
              </h3>
              <p className="mb-3 text-sm text-gray-700">
                Comprehensive analysis with detailed breakdowns, optimization hints, and exportable reports. Best for
                formal quotes, process optimization, and investment reviews.
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Use when:</span>
                {' '}
                preparing customer proposals, analyzing profitability, or making equipment decisions where assumptions
                need to be documented.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                <span className="font-semibold">Inputs:</span>
                {' '}
                ~10–20 fields •
                {' '}
                <span className="font-semibold">Output:</span>
                {' '}
                multi-section result view with charts, metrics, and PDF export.
              </p>
            </div>

            <div className="card border-l-4 border-purple-500">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-900">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Quick References
              </h3>
              <p className="mb-3 text-sm text-gray-700">
                Industry benchmark tables and parameter guides. Best for choosing speeds, gas, and materials, or
                cross-checking assumptions from your own shop data.
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Use when:</span>
                {' '}
                setting up new processes, training operators, validating parameters, or sanity-checking numbers from
                suppliers and CAM.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                <span className="font-semibold">Inputs:</span>
                {' '}
                none (lookup only) •
                {' '}
                <span className="font-semibold">Output:</span>
                {' '}
                reference tables and ranges to feed into calculators.
              </p>
            </div>
          </div>

          {/* Calculator Sections */}
          <div className="space-y-12">
            {/* Quick Tools Section */}
            <div>
              <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Zap className="h-6 w-6 text-blue-600" />
                Quick Estimation Tools
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Fast calculations using a handful of high-impact inputs. Ideal when you need a directional answer in
                seconds and will refine in a full calculator later.
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {calculators
                  .filter((calc) => calc.id.startsWith('quick-'))
                  .map((calc) => {
                    const Icon = calc.icon;
                    return (
                      <Link
                        key={calc.id}
                        href={calc.href}
                        className={`group card card-hover flex flex-col border-l-4 transition-all hover:shadow-xl ${
                          borderClasses[calc.color as keyof typeof borderClasses]
                        }`}
                      >
                        <div className="mb-4 flex items-center gap-4">
                          <div
                            className={`rounded-lg p-3 ${
                              colorClasses[calc.color as keyof typeof colorClasses]
                            }`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                            {calc.title}
                          </h2>
                        </div>

                        <p className="mb-4 flex-grow text-gray-600">{calc.description}</p>

                        <div className="mb-4 space-y-2">
                          {calc.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-primary-600 transition-all group-hover:gap-4">
                          <span>Try Calculator</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Full Calculators Section */}
            <div>
              <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Calculator className="h-6 w-6 text-green-600" />
                Comprehensive Calculators
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Detailed analysis tools with complete cost breakdowns, efficiency metrics, and exportable reports. Use
                these when you are preparing quotes, optimizing processes, or evaluating investments.
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {calculators
                  .filter((calc) => !calc.id.startsWith('quick-') && !calc.id.startsWith('qr-'))
                  .map((calc) => {
                    const Icon = calc.icon;
                    return (
                      <Link
                        key={calc.id}
                        href={calc.href}
                        className={`group card card-hover flex flex-col border-l-4 transition-all hover:shadow-xl ${
                          borderClasses[calc.color as keyof typeof borderClasses]
                        }`}
                      >
                        <div className="mb-4 flex items-center gap-4">
                          <div
                            className={`rounded-lg p-3 ${
                              colorClasses[calc.color as keyof typeof colorClasses]
                            }`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                            {calc.title}
                          </h2>
                        </div>

                        <p className="mb-4 flex-grow text-gray-600">{calc.description}</p>

                        <div className="mb-4 space-y-2">
                          {calc.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-primary-600 transition-all group-hover:gap-4">
                          <span>Try Calculator</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Quick Reference Section */}
            <div>
              <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <BookOpen className="h-6 w-6 text-purple-600" />
                Quick Reference Guides
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Parameter and cost reference pages you can consult before or alongside calculators. Use these tables to
                seed your inputs and check whether numbers from your own shop are in a reasonable range.
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {calculators
                  .filter((calc) => calc.id.startsWith('qr-'))
                  .map((calc) => {
                    const Icon = calc.icon;
                    return (
                      <Link
                        key={calc.id}
                        href={calc.href}
                        className={`group card card-hover flex flex-col border-l-4 transition-all hover:shadow-xl ${
                          borderClasses[calc.color as keyof typeof borderClasses]
                        }`}
                      >
                        <div className="mb-4 flex items-center gap-4">
                          <div
                            className={`rounded-lg p-3 ${
                              colorClasses[calc.color as keyof typeof colorClasses]
                            }`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                            {calc.title}
                          </h2>
                        </div>

                        <p className="mb-4 flex-grow text-gray-600">{calc.description}</p>

                        <div className="mb-4 space-y-2">
                          {calc.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 font-semibold text-primary-600 transition-all group-hover:gap-4">
                          <span>Open Reference</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Why Use Our Calculators Section */}
          <div className="mt-16">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Why Use Our Calculators?
              </h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Structured Estimates</h3>
                  <p className="text-gray-600">
                    Industry-standard formulas combined with your own input data provide structured cost estimates. Use
                    them to understand cost drivers and compare scenarios, then validate the results against your own
                    production data.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Save Time & Money</h3>
                  <p className="text-gray-600">
                    Get instant cost estimates in seconds instead of hours of manual calculations. 
                    Optimize for maximum profitability.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Professional Reports</h3>
                  <p className="text-gray-600">
                    Export detailed PDF reports with complete breakdowns, charts, and recommendations 
                    for client presentations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50">
              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                How to Get the Most from These Tools
              </h2>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    1
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Match tool to your need</h3>
                  <p className="text-sm text-gray-600">
                    Use Quick Tools for rough estimates in under a minute, Full Calculators for detailed analysis in a few
                    minutes, and Reference pages for parameter lookup. The categories above summarize when to use each
                    type.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    2
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Enter realistic data</h3>
                  <p className="text-sm text-gray-600">
                    Use your own material prices, labor rates, energy tariffs, and machine specs whenever possible.
                    Generic inputs will only produce generic results—the closer your inputs are to reality, the more
                    useful the estimates.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    3
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Interpret results wisely</h3>
                  <p className="text-sm text-gray-600">
                    Treat outputs as structured estimates for planning and comparison, not guaranteed final costs. Use
                    breakdowns to see which drivers matter most and to compare Scenario A vs. B.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    4
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Validate and refine over time</h3>
                  <p className="text-sm text-gray-600">
                    Compare estimates with actual jobs, track variances, and update your inputs periodically. Export
                    reports from full calculators to document assumptions and support continuous improvement.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-primary-200 pt-6">
                <h3 className="mb-3 text-center text-lg font-semibold text-gray-900">
                  Input quality = output quality
                </h3>
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div className="rounded bg-white p-3">
                    <p className="mb-1 font-semibold text-red-700">❌ Generic inputs</p>
                    <p className="text-gray-600">"Default values", "industry average", or unknown actual costs.</p>
                    <p className="mt-2 text-xs text-gray-500">Leads to generic, unreliable estimates.</p>
                  </div>
                  <div className="rounded bg-white p-3">
                    <p className="mb-1 font-semibold text-yellow-700">⚠️ Rough estimates</p>
                    <p className="text-gray-600">"Roughly X", "about Y hours", or values copied from similar jobs.</p>
                    <p className="mt-2 text-xs text-gray-500">Gives approximate, directional estimates.</p>
                  </div>
                  <div className="rounded bg-white p-3">
                    <p className="mb-1 font-semibold text-green-700">✓ Actual shop data</p>
                    <p className="text-gray-600">Supplier quotes, measured runtimes, latest utility bills, and real
                      wage rates.</p>
                    <p className="mt-2 text-xs text-gray-500">Produces the most useful, actionable estimates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <DollarSign className="mx-auto mb-4 h-16 w-16" />
              <h2 className="mb-4 text-3xl font-bold">
                Start Calculating Costs Today
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-lg text-blue-100">
                All calculators are free to use with no registration required. 
                Get professional cost estimates in seconds.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/calculators/laser-cutting"
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-primary-600 transition-all hover:shadow-lg"
                >
                  Try Laser Cutting Calculator
                </Link>
                <Link
                  href="/calculators/roi"
                  className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-primary-600"
                >
                  Calculate Equipment ROI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

