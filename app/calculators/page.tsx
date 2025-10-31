'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';
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
  ArrowRight 
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

          {/* Calculator Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className={`group card card-hover flex flex-col border-l-4 transition-all hover:shadow-xl ${borderClasses[calc.color]}`}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className={`rounded-lg p-3 ${colorClasses[calc.color]}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {calc.title}
                    </h2>
                  </div>

                  <p className="mb-4 flex-grow text-gray-600">
                    {calc.description}
                  </p>

                  <div className="mb-4 space-y-2">
                    {calc.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-primary-600 group-hover:gap-4 transition-all">
                    <span>Try Calculator</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Why Use Our Calculators Section */}
          <div className="mt-16">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Why Use Our Calculators?
              </h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Accurate Estimates</h3>
                  <p className="text-gray-600">
                    Industry-standard formulas based on real manufacturing data achieve 95-98% accuracy 
                    compared to actual costs.
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
                How It Works
              </h2>
              
              <div className="grid gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    1
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Choose Calculator</h3>
                  <p className="text-sm text-gray-600">
                    Select the calculator that matches your project type
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    2
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Input Parameters</h3>
                  <p className="text-sm text-gray-600">
                    Enter your material specs, dimensions, and cost factors
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    3
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Get Results</h3>
                  <p className="text-sm text-gray-600">
                    Instant detailed breakdown with charts and metrics
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                    4
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Export Report</h3>
                  <p className="text-sm text-gray-600">
                    Download professional PDF for quotes and proposals
                  </p>
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

