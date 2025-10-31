'use client';

import { Zap, Package, TrendingUp, Leaf, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const scenarios = [
  {
    id: 1,
    title: 'Quoting a Laser Cutting Job',
    description: 'You need to provide an accurate quote for cutting stainless steel parts for a client',
    icon: <Zap className="h-8 w-8" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    recommended: [
      {
        name: 'Laser Cutting Calculator',
        href: '/calculators/laser-cutting',
        reason: 'Get detailed cost breakdown including material, energy, labor, and gas costs',
        primary: true
      },
      {
        name: 'Material Utilization Calculator',
        href: '/calculators/material-utilization',
        reason: 'Optimize sheet layout to reduce material waste and improve pricing',
        primary: false
      }
    ],
    tips: [
      'Add 15-20% margin for business risk',
      'Consider setup time for small batches',
      'Account for material price fluctuations'
    ]
  },
  {
    id: 2,
    title: 'Evaluating Equipment Purchase',
    description: 'Your shop is considering buying a new laser cutter or CNC machine and needs to justify the investment',
    icon: <TrendingUp className="h-8 w-8" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    recommended: [
      {
        name: 'Equipment ROI Calculator',
        href: '/calculators/roi',
        reason: 'Calculate payback period, NPV, and 5-year profit projections',
        primary: true
      },
      {
        name: 'Energy Cost Calculator',
        href: '/calculators/energy',
        reason: 'Factor in monthly power consumption costs for accurate operating expense estimates',
        primary: false
      }
    ],
    tips: [
      'Include financing costs if applicable',
      'Consider maintenance and consumables',
      'Plan for utilization ramp-up period'
    ]
  },
  {
    id: 3,
    title: 'CNC Machining Project Costing',
    description: 'Need to estimate costs for a multi-part CNC machining project with various operations',
    icon: <Package className="h-8 w-8" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    recommended: [
      {
        name: 'CNC Machining Calculator',
        href: '/calculators/cnc-machining',
        reason: 'Calculate costs for milling, turning, and multi-axis operations with tooling expenses',
        primary: true
      },
      {
        name: 'Hourly Rate Builder',
        href: '/calculators/cost-center/hourly-rate',
        reason: 'Establish accurate machine hour rates including all overhead costs',
        primary: false
      }
    ],
    tips: [
      'Batch multiple parts to reduce setup costs',
      'Factor in tool wear and replacement',
      'Consider secondary operations (deburring, finishing)'
    ]
  },
  {
    id: 4,
    title: 'Reducing Operating Costs',
    description: 'Management wants to identify opportunities to cut manufacturing costs and improve efficiency',
    icon: <Leaf className="h-8 w-8" />,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    recommended: [
      {
        name: 'Energy Cost Calculator',
        href: '/calculators/energy',
        reason: 'Identify power consumption patterns and potential savings from equipment upgrades',
        primary: true
      },
      {
        name: 'Material Utilization Calculator',
        href: '/calculators/material-utilization',
        reason: 'Find material waste reduction opportunities through better nesting',
        primary: false
      },
      {
        name: 'Overhead Allocator',
        href: '/calculators/cost-center/overhead-allocator',
        reason: 'Understand and optimize indirect cost allocation',
        primary: false
      }
    ],
    tips: [
      'Track costs over time to identify trends',
      'Benchmark against industry standards',
      'Prioritize high-impact opportunities'
    ]
  },
  {
    id: 5,
    title: 'Complex Part with Multiple Processes',
    description: 'A part requires laser cutting, welding, and finishing - need complete cost analysis',
    icon: <BarChart3 className="h-8 w-8" />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    recommended: [
      {
        name: 'Laser Cutting Calculator',
        href: '/calculators/laser-cutting',
        reason: 'Calculate cutting operation costs',
        primary: true
      },
      {
        name: 'Welding Calculator',
        href: '/calculators/welding',
        reason: 'Estimate welding time and costs for assemblies',
        primary: false
      },
      {
        name: 'Finishing Time Guide',
        href: '/calculators/cost-center/finishing-guide',
        reason: 'Account for grinding, painting, and quality control',
        primary: false
      }
    ],
    tips: [
      'Use multiple calculators and sum results',
      'Add 10-15% for coordination overhead',
      'Consider inspection and rework costs'
    ]
  },
  {
    id: 6,
    title: 'Setting Up Shop Hourly Rates',
    description: 'New shop needs to establish competitive yet profitable machine hour rates',
    icon: <BarChart3 className="h-8 w-8" />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    recommended: [
      {
        name: 'Hourly Rate Builder',
        href: '/calculators/cost-center/hourly-rate',
        reason: 'Calculate true cost per machine hour including all expenses',
        primary: true
      },
      {
        name: 'Overhead Allocator',
        href: '/calculators/cost-center/overhead-allocator',
        reason: 'Properly distribute facility, admin, and indirect costs',
        primary: false
      }
    ],
    tips: [
      'Review and adjust rates quarterly',
      'Compare with market rates in your region',
      'Account for target profit margin'
    ]
  }
];

export function ScenarioRecommendations() {
  return (
    <div className="space-y-8">
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6 flex items-start gap-4">
              <div className={`flex-shrink-0 rounded-xl ${scenario.iconBg} p-3 ${scenario.iconColor}`}>
                {scenario.icon}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {scenario.title}
                </h3>
                <p className="text-gray-600">
                  {scenario.description}
                </p>
              </div>
            </div>

            {/* Recommended Calculators */}
            <div className="mb-6">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Recommended Tools
              </h4>
              <div className="space-y-3">
                {scenario.recommended.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border ${
                      rec.primary
                        ? 'border-primary-200 bg-primary-50'
                        : 'border-gray-200 bg-gray-50'
                    } p-4`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={rec.href}
                          className={`font-semibold ${
                            rec.primary ? 'text-primary-700' : 'text-gray-900'
                          } hover:underline`}
                        >
                          {rec.name}
                        </Link>
                        {rec.primary && (
                          <span className="ml-2 inline-block rounded-full bg-primary-600 px-2 py-0.5 text-xs font-semibold text-white">
                            Primary
                          </span>
                        )}
                      </div>
                      <Link
                        href={rec.href}
                        className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                          rec.primary
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-white text-primary-600 hover:bg-primary-50 border border-primary-600'
                        }`}
                      >
                        Use Tool
                      </Link>
                    </div>
                    <p className="text-sm text-gray-700">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Pro Tips
              </h4>
              <ul className="space-y-2">
                {scenario.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary-600 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

