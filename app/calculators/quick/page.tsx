'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Scissors, DollarSign, Timer, Zap, ArrowRight, ClipboardList, AlertTriangle, Settings as Cog } from 'lucide-react';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema, generateSoftwareApplicationSchema } from '@/lib/seo/schema';

type QuickToolColor = 'blue' | 'indigo' | 'orange';

type QuickToolConfig = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: QuickToolColor;
  href: string;
  features: string[];
  useCase: string;
};

export default function QuickToolsPage() {
  const quickTools: QuickToolConfig[] = [
    {
      id: 'price-per-meter',
      title: 'Price per Meter Calculator',
      description:
        'Ultra-fast estimate of operating cost per meter based on material type and thickness, using typical speeds and rates for ballpark pricing.',
      icon: Scissors,
      color: 'blue',
      href: '/calculators/quick/price-per-meter',
      features: [
        'Material/thickness speed lookup',
        'Electricity + labor calculation',
        'Instant per-meter pricing',
        'Production cost estimates'
      ],
      useCase:
        'Best for: straight or simple cutting paths on standard materials when you already have a reasonable hourly rate. Not ideal for complex nests, multi-process jobs, or high-value contracts—use the full laser cutting calculator instead.',
    },
    {
      id: 'hourly-rate',
      title: 'Laser Hourly Rate Calculator',
      description:
        'Estimate an all-in hourly operating cost including equipment, energy, labor, overhead, and maintenance—your baseline for any pricing discussion.',
      icon: DollarSign,
      color: 'indigo',
      href: '/calculators/quick/hourly-rate',
      features: [
        'Equipment depreciation per hour',
        'Total electricity cost',
        'Labor & overhead included',
        'All-in hourly rate'
      ],
      useCase:
        'Best for: establishing internal break-even and target rates before you quote. Not ideal as a standalone customer price—combine with part-level tools and your own accounting for formal proposals.',
    },
    {
      id: 'pierce-time',
      title: 'Pierce Time Estimator',
      description:
        'Estimate total piercing time from material, thickness, laser power, and number of pierces so you can see when holes dominate cycle time.',
      icon: Timer,
      color: 'orange',
      href: '/calculators/quick/pierce-time',
      features: [
        'Material-specific pierce time',
        'Thickness & power adjusted',
        'Total job pierce time',
        'Cost impact analysis'
      ],
      useCase:
        'Best for: parts with many holes where pierce time meaningfully affects cost. Not ideal for thick plate, unusual alloys, or heat-sensitive jobs—validate with your own parameter tables and full cutting calculators.',
    },
  ];

  const colorClasses: Record<QuickToolColor, string> = {
    blue: 'border-blue-500 bg-blue-50 text-blue-600',
    indigo: 'border-indigo-500 bg-indigo-50 text-indigo-600',
    orange: 'border-orange-500 bg-orange-50 text-orange-600',
  };

  const borderClasses: Record<QuickToolColor, string> = {
    blue: 'border-blue-500',
    indigo: 'border-indigo-500',
    orange: 'border-orange-500',
  };

  const faqSchema = generateFAQSchema([
    {
      question: 'What are Quick Tools calculators?',
      answer:
        'Quick Tools are simplified calculators built for rapid estimates. They combine a few key inputs that you provide with typical values from our reference tables to deliver instant price-per-meter, hourly rate, or pierce-time outputs—without entering every engineering detail.',
    },
    {
      question: 'When should I use Quick Tools vs full calculators?',
      answer: 'Use Quick Tools for fast quotes, initial estimates, and simple jobs. Use full calculators (like Laser Cutting Calculator) for comprehensive analysis, complex projects, detailed cost breakdowns, and when you need to factor in materials, gas, and multiple variables.',
    },
    {
      question: 'How accurate are Quick Tool calculators?',
      answer:
        'Quick Tools often land within roughly 10–20% of a fully detailed calculation for standard jobs once you calibrate them with your own material prices, hourly rates, and typical speeds. For precision quotes, unusual materials, or critical contracts, always re-run the job in the full calculators and compare against your historical jobs.',
    },
    {
      question: 'Can I use Quick Tools for professional quotes?',
      answer: 'Yes, Quick Tools are suitable for preliminary quotes, phone estimates, and standard jobs. For formal proposals or complex projects, verify with full calculators that include all cost factors like material waste, setup time, and quality requirements.',
    },
  ]);

  const softwareSchema = generateSoftwareApplicationSchema('Quick Tools Calculators');

  return (
    <>
      <SchemaMarkup schema={softwareSchema} />
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
              Quick Tools for Fast Manufacturing Estimates
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Mini calculators for price-per-meter, hourly rate, and pierce time. Ideal for quick quotes, phone calls,
              and early-stage planning when you do not have time to build a full job in the detailed calculators.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
              Quick Tools trade some detail for speed. Use them for ballpark estimates, then verify with the full
              calculators and your own historical jobs before sending formal quotes or signing long-term agreements.
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
                <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <ClipboardList className="h-5 w-5 text-green-600" />
                  <span>Best For</span>
                </div>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>- First conversations with new or existing customers</li>
                  <li>- Checking whether a job is roughly profitable before deep planning</li>
                  <li>- Standard, repeatable jobs where you already know typical parameters</li>
                  <li>- Rapid feasibility checks during scheduling or capacity planning</li>
                  <li>- Budget discussions and early-stage business cases</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span>Limitations</span>
                </div>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>- Not for long-term contracts or frame agreements with penalties</li>
                  <li>- Not for highly customized, multi-step or multi-process jobs</li>
                  <li>- Simplified assumptions for efficiency, waste, and setup time</li>
                  <li>- Material, nesting, and scrap handling are not modeled in detail</li>
                  <li>- Does not connect to your ERP or accounting system automatically</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Cog className="h-5 w-5 text-blue-600" />
                  <span>Upgrade To</span>
                </div>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>
                    -{' '}
                    <Link href="/calculators/laser-cutting" className="text-blue-600 hover:underline">
                      Full Laser Cutting Calculator
                    </Link>
                    {' '}
                    for part-level costing before formal quotes
                  </li>
                  <li>
                    -{' '}
                    <Link href="/calculators/marking" className="text-blue-600 hover:underline">
                      Marking Calculator
                    </Link>
                    {' '}and{' '}
                    <Link href="/calculators/welding" className="text-blue-600 hover:underline">
                      Welding Calculator
                    </Link>
                    {' '}for process-specific, detailed breakdowns
                  </li>
                  <li>
                    -{' '}
                    <Link href="/calculators/roi" className="text-blue-600 hover:underline">
                      ROI Calculator
                    </Link>
                    {' '}when you need to translate shop-level economics into investment decisions
                  </li>
                  <li>- Always upgrade to a full calculator before committing pricing for large or risky jobs.</li>
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
                    <td className="py-3 text-gray-700">
                      {'<'}60 seconds
                    </td>
                    <td className="py-3 text-gray-700">2-5 minutes</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Accuracy</td>
                    <td className="py-3 text-gray-700">Typically within ~10–20% once calibrated to your shop</td>
                    <td className="py-3 text-gray-700">Tighter alignment possible when you supply full detail and match to historical jobs</td>
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
                    <td className="py-3 text-gray-700">Assumes typical shop settings</td>
                    <td className="py-3 text-gray-700">Detailed calculation</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium text-gray-900">Waste Factor</td>
                    <td className="py-3 text-gray-700">Standard 10% waste assumption</td>
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

          {/* Workflow */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Workflow Integration</h2>
            <ol className="space-y-4 text-sm text-gray-800">
              <li>
                <span className="font-semibold text-gray-900">1. Capture reference inputs.</span> Use the{' '}
                <Link href="/calculators/quick-reference" className="text-primary-700 underline-offset-2 hover:underline">
                  quick reference tables
                </Link>{' '}
                for baseline speeds, gas, and material costs, then pick the matching quick tool.
              </li>
              <li>
                <span className="font-semibold text-gray-900">2. Run the fast calculators.</span> Use the{' '}
                <Link href="/calculators/quick/hourly-rate" className="text-primary-700 underline-offset-2 hover:underline">
                  hourly rate
                </Link>{' '}
                calculator first to establish a realistic baseline, then combine it with the Price per Meter and Pierce Time
                tools to get a dollarized target for the quote or phone call.
              </li>
              <li>
                <span className="font-semibold text-gray-900">3. Promote to full calculators.</span> When the job moves
                forward, transfer the same assumptions into the{' '}
                <Link href="/calculators/laser-cutting" className="text-primary-700 underline-offset-2 hover:underline">
                  laser cutting
                </Link>{' '}
                or{' '}
                <Link href="/calculators/roi" className="text-primary-700 underline-offset-2 hover:underline">
                  ROI calculator
                </Link>{' '}
                so your proposal, analytics, and production plans all share identical inputs.
              </li>
            </ol>
          </div>

          {/* How Quick Tools Work */}
          <div className="card mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">How Quick Tools Work</h2>
            <div className="grid gap-6 md:grid-cols-2 text-sm text-gray-800">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Inputs and processing</h3>
                <ul className="ml-4 space-y-1 list-disc">
                  <li>You provide a handful of high-impact parameters such as material, thickness, and basic shop rates.</li>
                  <li>
                    Quick Tools combine those inputs with typical values from the
                    {' '}
                    <Link
                      href="/calculators/quick-reference"
                      className="text-primary-700 underline-offset-2 hover:underline"
                    >
                      reference tables
                    </Link>
                    {' '}—cutting speeds, pierce times, and efficiency factors.
                  </li>
                  <li>Dozens of secondary inputs stay hidden here to keep things fast; they live in the full calculators.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Outputs and next steps</h3>
                <ul className="ml-4 space-y-1 list-disc">
                  <li>
                    The output is a structured ballpark number—price per meter, hourly rate, or total pierce time—that helps
                    you decide whether a job is worth pursuing.
                  </li>
                  <li>
                    For standard work, these numbers are often within 10–20% of a fully detailed calculation once you align
                    inputs with your own shop data.
                  </li>
                  <li>
                    When the job moves forward or the stakes are high, copy the same assumptions into the full calculators to
                    add material, gas, nesting, setup, and tax-aware ROI before sending a formal quote.
                  </li>
                </ul>
              </div>
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

            {/* Limitations & common misuses */}
            <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="text-sm font-semibold text-gray-900">Limitations & common misuses</h3>
              </div>
              <div className="space-y-1 text-xs text-gray-700">
                <p>
                  Quick Tools do not track your actual shop data automatically, do not model full nesting, scrap value, or
                  overhead in detail, and do not replace your accounting system.
                </p>
                <p>
                  Avoid using default example rates directly in customer quotes, treating Quick results as a guaranteed
                  margin, or relying on them for extreme thicknesses, exotic materials, or highly complex geometries.
                </p>
                <p>
                  Treat these tools as a fast first pass. For real money on the line, always upgrade to the detailed
                  calculators and compare the outputs against at least a few historical jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}























