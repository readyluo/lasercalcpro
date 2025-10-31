import { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Calculator, TrendingUp, Settings, Clock, Zap, FileText, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Laser Cutting Cost Center - Professional Shop Rate & Overhead Tools | LaserCalcPro',
  description: 'Comprehensive cost center tools for laser cutting shops. Calculate hourly shop rates, allocate overhead, estimate setup times, piercing costs, finishing time, kerf width, and optimize quotation margins.',
  keywords: 'laser cutting cost center, shop hourly rate calculator, overhead allocation, setup time estimator, piercing cost, finishing time, kerf width reference, quotation margin',
  openGraph: {
    title: 'Laser Cutting Cost Center - Professional Shop Management Tools',
    description: 'Professional cost management tools for laser cutting operations. Calculate accurate shop rates, allocate overhead, and optimize pricing.',
    type: 'website',
  },
};

const tools = [
  {
    href: '/calculators/cost-center/hourly-rate',
    icon: DollarSign,
    title: 'Shop Hourly Rate Builder',
    description: 'Calculate complete hourly shop rate with depreciation, labor, energy, maintenance, facility, and overhead breakdown.',
    color: 'blue',
    complexity: 'Essential',
  },
  {
    href: '/calculators/cost-center/overhead-allocator',
    icon: TrendingUp,
    title: 'Overhead Allocator',
    description: 'Allocate overhead costs across multiple jobs using machine hours, labor hours, material cost, or other methods.',
    color: 'green',
    complexity: 'Essential',
  },
  {
    href: '/calculators/cost-center/setup-estimator',
    icon: Clock,
    title: 'Setup Time Estimator',
    description: 'Estimate setup and changeover time based on programming, loading, machine prep, inspection, and batch size.',
    color: 'orange',
    complexity: 'Important',
  },
  {
    href: '/calculators/cost-center/pierce-estimator',
    icon: Zap,
    title: 'Piercing Time & Cost Estimator',
    description: 'Calculate piercing time and cost by material, thickness, hole count, and strategy. Identify optimization opportunities.',
    color: 'purple',
    complexity: 'Specialized',
  },
  {
    href: '/calculators/cost-center/kerf-reference',
    icon: Settings,
    title: 'Kerf Width Reference',
    description: 'Quick reference for kerf width by material, thickness, and nozzle diameter. Essential for path compensation and material planning.',
    color: 'indigo',
    complexity: 'Reference',
  },
  {
    href: '/calculators/cost-center/finishing-guide',
    icon: FileText,
    title: 'Edge Finishing Time Guide',
    description: 'Estimate deburring, chamfering, and finishing time by material, edge length, method, and quality level.',
    color: 'pink',
    complexity: 'Specialized',
  },
  {
    href: '/calculators/cost-center/quotation-margin',
    icon: Calculator,
    title: 'Quotation Margin Simulator',
    description: 'Simulate pricing scenarios with target margins, payment terms, risk factors, and volume discounts.',
    color: 'teal',
    complexity: 'Important',
  },
];

const colorClasses: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'text-orange-600',
    badge: 'bg-orange-100 text-orange-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: 'text-indigo-600',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    icon: 'text-pink-600',
    badge: 'bg-pink-100 text-pink-700',
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    icon: 'text-teal-600',
    badge: 'bg-teal-100 text-teal-700',
  },
};

export default function CostCenterHubPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Laser Cutting Cost Center
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Professional cost management tools for laser cutting operations. Calculate accurate shop rates, 
              allocate overhead, estimate hidden costs, and optimize pricing strategies.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const colors = colorClasses[tool.color];
              
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group relative overflow-hidden rounded-lg border-2 ${colors.border} ${colors.bg} p-6 transition-all hover:shadow-lg hover:-translate-y-1`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`rounded-lg bg-white p-3 ${colors.icon} shadow-sm`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}>
                      {tool.complexity}
                    </span>
                  </div>
                  
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600">
                    {tool.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600">
                    {tool.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-sm font-semibold text-primary-600">
                    Open Calculator
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Why Use Cost Center Tools */}
          <div className="card mb-16">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why Use Cost Center Tools?</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Accurate Cost Allocation</h3>
                <p className="text-gray-700">
                  Many laser cutting shops underestimate true costs by overlooking setup time, piercing overhead, 
                  finishing requirements, and proper overhead allocation. These tools help you capture all cost 
                  components for accurate job costing.
                </p>
              </div>
              
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Data-Driven Pricing</h3>
                <p className="text-gray-700">
                  Move beyond gut-feel pricing to structured margin analysis. Understand your break-even points, 
                  optimal batch sizes, and how volume discounts impact profitability.
                </p>
              </div>
              
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Hidden Cost Discovery</h3>
                <p className="text-gray-700">
                  Piercing time can represent 30-50% of total job time for perforated parts. Setup costs can 
                  exceed cutting costs for small batches. Finishing can add 50-100% to processing time. 
                  Quantify these hidden costs.
                </p>
              </div>
              
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Process Optimization</h3>
                <p className="text-gray-700">
                  Identify where your shop's costs are highest and find opportunities for improvement. Should you 
                  invest in automated deburring? Is nitrogen generation cost-effective? When should you batch orders?
                </p>
              </div>
            </div>
          </div>

          {/* How to Use These Tools */}
          <div className="card mb-16 bg-gradient-to-br from-primary-50 to-blue-50">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">How to Use These Tools</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Start with Hourly Rate Builder</h3>
                  <p className="text-gray-700">
                    Calculate your true shop hourly rate including all cost components. This is the foundation 
                    for accurate job costing. Update quarterly or when major costs change.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Estimate All Time Components</h3>
                  <p className="text-gray-700">
                    Use Setup Estimator for job changeover time, Pierce Estimator for hole-intensive parts, 
                    and Finishing Guide for edge work. These "hidden" times often exceed cutting time.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Allocate Overhead Properly</h3>
                  <p className="text-gray-700">
                    Use Overhead Allocator to distribute facility, administrative, and indirect costs across jobs. 
                    Choose allocation method that reflects your actual cost drivers.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Set Pricing with Margin Simulator</h3>
                  <p className="text-gray-700">
                    Enter total costs and use Quotation Margin Simulator to model different scenarios. Factor in 
                    payment terms, risk, and volume discounts to arrive at optimal pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Center Best Practices */}
          <div className="card mb-16">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Cost Center Best Practices</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Track Actual vs. Estimated</h3>
                <p className="text-sm text-gray-700">
                  Record actual times and costs for jobs, then compare to estimates. Refine your inputs over time 
                  to improve accuracy. Most shops achieve 90%+ accuracy within 3-6 months of systematic tracking.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Update Costs Quarterly</h3>
                <p className="text-sm text-gray-700">
                  Material prices, gas costs, and labor rates change. Review and update your cost inputs every 3 months, 
                  or immediately after major changes (new equipment, wage increases, facility moves).
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Don't Forget Hidden Costs</h3>
                <p className="text-sm text-gray-700">
                  Setup time, piercing, finishing, scrap, rework, and material handling add 30-60% to direct cutting time. 
                  Build these into every quote rather than absorbing them as "overhead".
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Use Consistent Allocation Methods</h3>
                <p className="text-sm text-gray-700">
                  Choose one overhead allocation method (machine hours, labor hours, etc.) and stick with it. 
                  Consistency is more important than perfection. Review annually to ensure it still makes sense.
                </p>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="card">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Calculators & Resources</h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/calculators/laser-cutting"
                className="group rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-primary-600 hover:shadow-md"
              >
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-primary-600">
                  Laser Cutting Cost Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Complete end-to-end cutting cost calculation with material, power, labor, and gas costs
                </p>
              </Link>
              
              <Link
                href="/calculators/roi"
                className="group rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-primary-600 hover:shadow-md"
              >
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-primary-600">
                  Equipment ROI Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Evaluate payback period and return on investment for laser cutting equipment purchases
                </p>
              </Link>
              
              <Link
                href="/calculators/material-utilization"
                className="group rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-primary-600 hover:shadow-md"
              >
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-primary-600">
                  Material Utilization
                </h3>
                <p className="text-sm text-gray-600">
                  Optimize nesting and reduce material waste to lower per-part material costs
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

