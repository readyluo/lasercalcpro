'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Scissors, DollarSign, Timer, Zap, ArrowRight } from 'lucide-react';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';

export default function QuickToolsPage() {
  const quickTools = [
    {
      id: 'price-per-meter',
      title: 'Price per Meter Calculator',
      description: 'Ultra-fast estimate of operating cost per meter based on material type and thickness. Includes electricity and labor costs for instant quotes.',
      icon: Scissors,
      color: 'blue',
      href: '/calculators/quick/price-per-meter',
      features: [
        'Material & thickness speed lookup',
        'Electricity + labor calculation',
        'Instant per-meter pricing',
        'Production cost estimates'
      ],
      useCase: 'Quick quotes for cutting jobs by linear meter',
    },
    {
      id: 'hourly-rate',
      title: 'Laser Hourly Rate Calculator',
      description: 'Calculate true hourly operating cost including equipment depreciation, electricity, labor, overhead, and maintenance. Essential for pricing and profitability.',
      icon: DollarSign,
      color: 'indigo',
      href: '/calculators/quick/hourly-rate',
      features: [
        'Equipment depreciation per hour',
        'Total electricity cost',
        'Labor & overhead included',
        'All-in hourly rate'
      ],
      useCase: 'Determine break-even rates and profit margins',
    },
    {
      id: 'pierce-time',
      title: 'Pierce Time Estimator',
      description: 'Calculate laser piercing time for accurate job costing. Accounts for material, thickness, laser power, and number of pierces. Critical for complex parts.',
      icon: Timer,
      color: 'orange',
      href: '/calculators/quick/pierce-time',
      features: [
        'Material-specific pierce time',
        'Thickness & power adjusted',
        'Total job pierce time',
        'Cost impact analysis'
      ],
      useCase: 'Factor piercing into job quotes for parts with many holes',
    },
  ];

  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50 text-blue-600',
    indigo: 'border-indigo-500 bg-indigo-50 text-indigo-600',
    orange: 'border-orange-500 bg-orange-50 text-orange-600',
  };

  const borderClasses = {
    blue: 'border-blue-500',
    indigo: 'border-indigo-500',
    orange: 'border-orange-500',
  };

  const faqSchema = generateFAQSchema([
    {
      question: 'What are Quick Tools calculators?',
      answer: 'Quick Tools are simplified, focused calculators designed for rapid estimates and common scenarios. They provide instant results for specific calculations like price per meter, hourly rates, and pierce time without requiring extensive input.',
    },
    {
      question: 'When should I use Quick Tools vs full calculators?',
      answer: 'Use Quick Tools for fast quotes, initial estimates, and simple jobs. Use full calculators (like Laser Cutting Calculator) for comprehensive analysis, complex projects, detailed cost breakdowns, and when you need to factor in materials, gas, and multiple variables.',
    },
    {
      question: 'How accurate are Quick Tool calculators?',
      answer: 'Quick Tools provide accuracy within 5-10% for standard scenarios by using industry-standard formulas and typical values. For precise quotes on complex jobs, use the full calculators with your specific parameters.',
    },
    {
      question: 'Can I use Quick Tools for professional quotes?',
      answer: 'Yes, Quick Tools are suitable for preliminary quotes, phone estimates, and standard jobs. For formal proposals or complex projects, verify with full calculators that include all cost factors like material waste, setup time, and quality requirements.',
    },
  ]);

  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-4">
                <Zap className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Quick Tools
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Fast, focused calculators for instant estimates. Perfect for quick quotes, phone calls, 
              and common scenarios. Get results in seconds without extensive input.
            </p>
          </div>

          {/* Quick Tools Grid */}
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 mb-12">
            {quickTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className={`group card card-hover flex flex-col border-l-4 transition-all hover:shadow-xl ${borderClasses[tool.color]}`}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className={`rounded-lg p-3 ${colorClasses[tool.color]}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {tool.title}
                    </h2>
                  </div>

                  <p className="mb-4 text-gray-600">
                    {tool.description}
                  </p>

                  <div className="mb-4 space-y-2 flex-grow">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-1">USE CASE:</p>
                    <p className="text-sm text-gray-700">{tool.useCase}</p>
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-primary-600 group-hover:gap-4 transition-all">
                    <span>Use Calculator</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* When to Use Quick Tools */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              When to Use Quick Tools
            </h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">✓ Best For</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Quick phone quotes</li>
                  <li>• Initial cost estimates</li>
                  <li>• Standard job pricing</li>
                  <li>• Rapid feasibility checks</li>
                  <li>• Customer inquiries</li>
                  <li>• Budget planning</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">⚠ Limitations</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Simplified calculations</li>
                  <li>• Standard parameters only</li>
                  <li>• No material costs</li>
                  <li>• Limited customization</li>
                  <li>• Typical efficiency assumed</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">→ Upgrade To</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• <Link href="/calculators/laser-cutting" className="text-blue-600 hover:underline">Full Laser Cutting Calculator</Link></li>
                  <li>• <Link href="/calculators/marking" className="text-blue-600 hover:underline">Marking Calculator</Link></li>
                  <li>• <Link href="/calculators/welding" className="text-blue-600 hover:underline">Welding Calculator</Link></li>
                  <li>• <Link href="/calculators/roi" className="text-blue-600 hover:underline">ROI Calculator</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Tools vs Full Calculators */}
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center">
              Quick Tools vs Full Calculators
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-3 text-gray-900 font-semibold">Feature</th>
                    <th className="pb-3 text-blue-900 font-semibold">Quick Tools</th>
                    <th className="pb-3 text-indigo-900 font-semibold">Full Calculators</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Input Time</td>
                    <td className="py-3 text-gray-700">30 seconds</td>
                    <td className="py-3 text-gray-700">2-5 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Accuracy</td>
                    <td className="py-3 text-gray-700">±5-10%</td>
                    <td className="py-3 text-gray-700">±2-3%</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Parameters</td>
                    <td className="py-3 text-gray-700">3-8 inputs</td>
                    <td className="py-3 text-gray-700">15-30 inputs</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Material Costs</td>
                    <td className="py-3 text-gray-700">Not included</td>
                    <td className="py-3 text-gray-700">Fully included</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Gas Costs</td>
                    <td className="py-3 text-gray-700">Estimated average</td>
                    <td className="py-3 text-gray-700">Detailed calculation</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Waste Factor</td>
                    <td className="py-3 text-gray-700">Standard 10%</td>
                    <td className="py-3 text-gray-700">Customizable</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-gray-900">Best Use</td>
                    <td className="py-3 text-gray-700">Quick quotes</td>
                    <td className="py-3 text-gray-700">Formal proposals</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Related Resources */}
          <div className="card bg-gradient-to-br from-gray-50 to-blue-50">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Related Resources
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/calculators/quick-reference"
                className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  Quick Reference Tables
                  <ArrowRight className="ml-2 h-4 w-4" />
                </h3>
                <p className="text-sm text-gray-600">
                  Cutting speeds, material costs, gas costs, power consumption, and processing parameters
                </p>
              </Link>

              <Link
                href="/calculators"
                className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  All Calculators
                  <ArrowRight className="ml-2 h-4 w-4" />
                </h3>
                <p className="text-sm text-gray-600">
                  Full calculator suite including laser cutting, marking, welding, CNC, ROI, and more
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

