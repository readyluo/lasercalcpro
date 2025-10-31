'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Zap, DollarSign, Package, Settings, BookOpen, ArrowRight } from 'lucide-react';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';

export default function QuickReferencePage() {
  const referencePages = [
    {
      id: 'cutting-speeds',
      title: 'Cutting Speeds Reference',
      description: 'Comprehensive speed benchmarks for fiber laser cutting across common materials and thicknesses. Includes mild steel, stainless steel, and aluminum with power and gas recommendations.',
      icon: Zap,
      color: 'yellow',
      href: '/calculators/quick-reference/cutting-speeds',
      dataPoints: '50+ speed values',
      features: [
        'Mild steel 0.5-20mm',
        'Stainless steel 0.5-12mm',
        'Aluminum 0.5-10mm',
        'Power & gas recommendations'
      ],
      useCase: 'Production planning, time estimation, and feasibility checks',
    },
    {
      id: 'assist-gas',
      title: 'Assist Gas Costs Reference',
      description: 'Complete guide to assist gas selection and costs. Compare oxygen, nitrogen, and air for different materials and applications with cost optimization strategies.',
      icon: DollarSign,
      color: 'green',
      href: '/calculators/quick-reference/assist-gas',
      dataPoints: '3 gas types',
      features: [
        'Gas comparison by material',
        'Typical cost ranges',
        'Use case recommendations',
        'Optimization tips'
      ],
      useCase: 'Gas selection, cost reduction, and quality optimization',
    },
    {
      id: 'material-costs',
      title: 'Material Costs Reference',
      description: 'Current metal material prices and cost calculation guide. Includes steel, stainless steel, aluminum pricing with practical calculation examples and procurement tips.',
      icon: Package,
      color: 'blue',
      href: '/calculators/quick-reference/material-costs',
      dataPoints: '10+ materials',
      features: [
        'Current metal prices',
        'Cost calculation examples',
        'Material selection guide',
        'Procurement strategies'
      ],
      useCase: 'Material budgeting, quote verification, and vendor negotiation',
    },
    {
      id: 'power-consumption',
      title: 'Power Consumption Reference',
      description: 'Equipment power usage and electricity cost reference. Compare fiber vs CO2 lasers, calculate annual energy costs, and identify efficiency opportunities.',
      icon: Zap,
      color: 'yellow',
      href: '/calculators/quick-reference/power-consumption',
      dataPoints: '15+ equipment types',
      features: [
        'Fiber vs CO2 comparison',
        'Idle vs cutting power',
        'Annual cost estimates',
        'Energy efficiency tips'
      ],
      useCase: 'Operating cost analysis, equipment selection, and energy management',
    },
    {
      id: 'processing-parameters',
      title: 'Processing Parameters Reference',
      description: 'Comprehensive parameter tables for fiber laser cutting. Includes power, speed, focus, gas pressure, and nozzle settings for all common materials with troubleshooting guide.',
      icon: Settings,
      color: 'purple',
      href: '/calculators/quick-reference/processing-parameters',
      dataPoints: '100+ parameter sets',
      features: [
        'Power, speed, focus settings',
        'Gas pressure & nozzle size',
        'Material-specific parameters',
        'Troubleshooting guide'
      ],
      useCase: 'Machine setup, quality optimization, and problem solving',
    },
  ];

  const colorClasses = {
    yellow: 'border-yellow-500 bg-yellow-50 text-yellow-600',
    green: 'border-green-500 bg-green-50 text-green-600',
    blue: 'border-blue-500 bg-blue-50 text-blue-600',
    purple: 'border-purple-500 bg-purple-50 text-purple-600',
  };

  const borderClasses = {
    yellow: 'border-yellow-500',
    green: 'border-green-500',
    blue: 'border-blue-500',
    purple: 'border-purple-500',
  };

  const faqSchema = generateFAQSchema([
    {
      question: 'What are Quick Reference tables?',
      answer: 'Quick Reference tables are curated data tables and guides for common laser processing parameters, costs, and specifications. They provide instant lookup of values you need for planning, quoting, and optimization without running calculators.',
    },
    {
      question: 'How often are reference tables updated?',
      answer: 'Material costs are updated quarterly to reflect market prices. Processing parameters and technical data are updated annually or when significant technology changes occur. Equipment power consumption data is reviewed semi-annually.',
    },
    {
      question: 'Can I use these tables for any laser brand?',
      answer: 'Yes, our reference tables use industry-standard values that apply across most fiber laser brands (Trumpf, Bystronic, Mazak, Han\'s Laser, Bodor, etc.). Minor variations exist, but our data represents typical performance you can expect.',
    },
    {
      question: 'Are Quick Reference tables free?',
      answer: 'Yes, all Quick Reference tables are completely free with no registration required. They are designed to help you make informed decisions quickly and efficiently.',
    },
    {
      question: 'How do Quick Reference tables help with SEO?',
      answer: 'Quick Reference tables rank well for informational queries like "laser cutting speed steel" or "aluminum cutting parameters". They drive organic traffic and establish topical authority, supporting the overall site\'s search visibility.',
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
              <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-4">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Quick Reference Tables
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Curated data tables and guides for laser processing. Instant lookup of cutting speeds, 
              material costs, gas costs, power consumption, and processing parameters. 
              Essential reference for planning, quoting, and optimization.
            </p>
          </div>

          {/* Reference Pages Grid */}
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 mb-12">
            {referencePages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.id}
                  href={page.href}
                  className={`group card card-hover flex flex-col border-l-4 transition-all hover:shadow-xl ${borderClasses[page.color]}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-3 ${colorClasses[page.color]}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {page.title}
                      </h2>
                    </div>
                    <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {page.dataPoints}
                    </div>
                  </div>

                  <p className="mb-4 text-gray-600">
                    {page.description}
                  </p>

                  <div className="mb-4 space-y-2 flex-grow">
                    {page.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-1">BEST FOR:</p>
                    <p className="text-sm text-gray-700">{page.useCase}</p>
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-primary-600 group-hover:gap-4 transition-all">
                    <span>View Reference</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* How to Use Reference Tables */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              How to Use Reference Tables
            </h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">📋 Planning</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Estimate job durations</li>
                  <li>• Check material feasibility</li>
                  <li>• Plan production schedules</li>
                  <li>• Compare equipment options</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">💰 Quoting</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Quick cost lookups</li>
                  <li>• Material price verification</li>
                  <li>• Gas cost estimation</li>
                  <li>• Energy cost factoring</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">⚙️ Optimization</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Optimize parameters</li>
                  <li>• Reduce costs</li>
                  <li>• Improve quality</li>
                  <li>• Troubleshoot issues</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reference vs Calculators */}
          <div className="card bg-gradient-to-br from-purple-50 to-blue-50 mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center">
              Reference Tables vs Calculators
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Quick Reference Tables
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Instant data lookup, no input needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Industry benchmarks and standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Great for learning and reference</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Covers wide range of scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 font-bold">⚠</span>
                    <span>Generic values, not customized</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                  <Settings className="mr-2 h-6 w-6" />
                  Interactive Calculators
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Customized calculations for your setup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Precise cost breakdowns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Factor in all variables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">✓</span>
                    <span>Pricing recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 font-bold">⚠</span>
                    <span>Requires input time (2-5 minutes)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-700 font-medium">
                💡 Pro Tip: Use Reference Tables for quick lookups and feasibility checks, 
                then use Calculators for detailed quotes and proposals.
              </p>
            </div>
          </div>

          {/* Reference Data Quality */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Reference Data Quality & Sources
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Sources</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Major equipment manufacturers (Trumpf, Bystronic, Mazak)</li>
                  <li>• Industry associations and standards bodies</li>
                  <li>• Real-world production data from fabricators</li>
                  <li>• Material supplier published specifications</li>
                  <li>• Independent testing and verification</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Assurance</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Cross-referenced with multiple sources</li>
                  <li>• Verified against real production data</li>
                  <li>• Regular updates to reflect market changes</li>
                  <li>• Conservative estimates for reliability</li>
                  <li>• Clear indication of typical ranges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="card bg-gradient-to-br from-gray-50 to-purple-50">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Related Resources
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/calculators/quick"
                className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  Quick Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </h3>
                <p className="text-sm text-gray-600">
                  Fast calculators for price per meter, hourly rates, and pierce time
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
                  Full calculator suite for comprehensive cost analysis and ROI calculations
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

















