'use client';

import { Check, X, Star } from 'lucide-react';
import Link from 'next/link';

const calculators = [
  {
    name: 'Laser Cutting',
    href: '/calculators/laser-cutting',
    popular: true,
    suitable: ['Sheet metal fabrication', 'Precision cutting', 'Complex geometries'],
    inputs: ['Material type & thickness', 'Cutting length', 'Pierce points', 'Machine power', 'Gas type'],
    outputs: ['Total cost per part', 'Cost breakdown', 'Time estimates', 'Material waste'],
    features: {
      batchPricing: true,
      pdfExport: true,
      materialDatabase: true,
      realTimeCalculation: true,
      saveHistory: true,
      costBreakdown: true,
      charts: true,
      mobile: true
    },
    accuracy: 'Estimates based on your laser cutting parameters and cost inputs; validate against your own jobs.',
    useCases: ['Job shops', 'Fabricators', 'Manufacturers'],
    difficulty: 'Easy'
  },
  {
    name: 'CNC Machining',
    href: '/calculators/cnc-machining',
    popular: true,
    suitable: ['Milling operations', 'Turning', 'Multi-axis machining'],
    inputs: ['Part dimensions', 'Material type', 'Machining time', 'Tool costs', 'Batch size'],
    outputs: ['Project cost', 'Per-part cost', 'Batch discounts', 'Tooling costs'],
    features: {
      batchPricing: true,
      pdfExport: true,
      materialDatabase: true,
      realTimeCalculation: true,
      saveHistory: true,
      costBreakdown: true,
      charts: true,
      mobile: true
    },
    accuracy: 'Estimates depend on your machining times, tooling costs, and rate assumptions; compare with shop data.',
    useCases: ['Machine shops', 'Prototyping', 'Production'],
    difficulty: 'Medium'
  },
  {
    name: 'Equipment ROI',
    href: '/calculators/roi',
    popular: false,
    suitable: ['Equipment purchasing', 'Capital investment', 'Financial planning'],
    inputs: ['Equipment cost', 'Monthly production', 'Operating costs', 'Financing rate'],
    outputs: ['Payback period', '5-year profit', 'NPV', 'IRR', 'Break-even analysis'],
    features: {
      batchPricing: false,
      pdfExport: true,
      materialDatabase: false,
      realTimeCalculation: true,
      saveHistory: true,
      costBreakdown: true,
      charts: true,
      mobile: true
    },
    accuracy: 'Investment projections are driven by your revenue, cost, and financing inputs; treat results as planning scenarios.',
    useCases: ['Management', 'Finance teams', 'Business owners'],
    difficulty: 'Medium'
  },
  {
    name: 'Energy Cost',
    href: '/calculators/energy',
    popular: false,
    suitable: ['Power consumption', 'Operational costs', 'Sustainability planning'],
    inputs: ['Machine power', 'Running hours', 'Electricity rate', 'Load factor'],
    outputs: ['Daily/monthly/yearly costs', 'Carbon footprint', 'Cost per part'],
    features: {
      batchPricing: false,
      pdfExport: true,
      materialDatabase: false,
      realTimeCalculation: true,
      saveHistory: true,
      costBreakdown: true,
      charts: true,
      mobile: true
    },
    accuracy: 'Energy and carbon estimates use your power, schedule, and tariff assumptions; reconcile with utility bills where possible.',
    useCases: ['Operations', 'Sustainability', 'Cost accounting'],
    difficulty: 'Easy'
  },
  {
    name: 'Material Utilization',
    href: '/calculators/material-utilization',
    popular: false,
    suitable: ['Material optimization', 'Waste reduction', 'Nesting analysis'],
    inputs: ['Sheet size', 'Part dimensions', 'Kerf width', 'Margins'],
    outputs: ['Utilization %', 'Waste cost', 'Parts per sheet', 'Optimization tips'],
    features: {
      batchPricing: false,
      pdfExport: true,
      materialDatabase: true,
      realTimeCalculation: true,
      saveHistory: true,
      costBreakdown: true,
      charts: false,
      mobile: true
    },
    accuracy: 'Utilization and waste results reflect the nesting model and your sheet/part inputs; confirm against real jobs as needed.',
    useCases: ['Production planning', 'Cost optimization', 'Engineers'],
    difficulty: 'Easy'
  }
];

const featureLabels: Record<string, string> = {
  batchPricing: 'Batch Pricing',
  pdfExport: 'PDF Export',
  materialDatabase: 'Material Database',
  realTimeCalculation: 'Real-time Updates',
  saveHistory: 'Save History',
  costBreakdown: 'Detailed Breakdown',
  charts: 'Visual Charts',
  mobile: 'Mobile Optimized'
};

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      {/* Mobile View - Cards */}
      <div className="block lg:hidden space-y-6">
        {calculators.map((calc, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{calc.name}</h3>
                <p className="text-sm text-gray-500">Difficulty: {calc.difficulty}</p>
              </div>
              {calc.popular && (
                <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  <Star className="h-3 w-3" />
                  Popular
                </span>
              )}
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">Best For:</h4>
              <ul className="space-y-1">
                {calc.suitable.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">Key Features:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(calc.features).map(([key, value]) => (
                  value && (
                    <span key={key} className="rounded-full bg-primary-50 px-3 py-1 text-xs text-primary-700">
                      {featureLabels[key]}
                    </span>
                  )
                ))}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Estimation:</span>
              <span className="font-semibold text-gray-900">{calc.accuracy}</span>
            </div>

            <Link
              href={calc.href}
              className="block w-full rounded-lg bg-primary-600 py-3 text-center font-semibold text-white transition-all hover:bg-primary-700"
            >
              Use Calculator
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                {calculators.map((calc, idx) => (
                  <th key={idx} className="px-6 py-4 text-center">
                    <div className="text-sm font-semibold text-gray-900">{calc.name}</div>
                    {calc.popular && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800">
                        <Star className="h-3 w-3" />
                        Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Difficulty */}
              <tr className="bg-white">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Difficulty Level
                </td>
                {calculators.map((calc, idx) => (
                  <td key={idx} className="px-6 py-4 text-center text-sm text-gray-700">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      calc.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      calc.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {calc.difficulty}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Estimation Notes */}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Estimation Notes
                </td>
                {calculators.map((calc, idx) => (
                  <td key={idx} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    {calc.accuracy}
                  </td>
                ))}
              </tr>

              {/* Features */}
              {Object.entries(featureLabels).map(([featureKey, featureLabel]) => (
                <tr key={featureKey} className={Object.keys(featureLabels).indexOf(featureKey) % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {featureLabel}
                  </td>
                  {calculators.map((calc, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {calc.features[featureKey as keyof typeof calc.features] ? (
                        <Check className="mx-auto h-5 w-5 text-green-600" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA Row */}
              <tr className="bg-primary-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  Try It Now
                </td>
                {calculators.map((calc, idx) => (
                  <td key={idx} className="px-6 py-4 text-center">
                    <Link
                      href={calc.href}
                      className="inline-block rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-700"
                    >
                      Use Calculator
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="h-4 w-4 text-gray-300" />
            <span>Not Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}

