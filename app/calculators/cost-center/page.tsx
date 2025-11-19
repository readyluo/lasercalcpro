import { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Calculator, TrendingUp, Settings, Clock, Zap, FileText, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Laser Cutting Cost Center - Professional Shop Rate & Overhead Tools | LaserCalcPro',
  description: 'Comprehensive cost center tools for laser cutting shops. Estimate shop rates, explore overhead allocation, and analyze setup time, piercing, finishing, kerf width, and quotation margins based on your own inputs.',
  keywords: 'laser cutting cost center, shop hourly rate calculator, overhead allocation, setup time estimator, piercing cost, finishing time, kerf width reference, quotation margin',
  openGraph: {
    title: 'Laser Cutting Cost Center - Cost Management Tools for Laser Shops',
    description: 'Cost management tools for laser cutting operations. Help structure shop rate estimates, overhead allocation, and pricing analysis using your own cost assumptions.',
    type: 'website',
  },
};

const tools = [
  {
    href: '/calculators/cost-center/hourly-rate',
    icon: DollarSign,
    title: 'Shop Hourly Rate Builder',
    description:
      'Calculate a complete hourly shop rate including depreciation, labor, energy, maintenance, facility, and overhead. This is the foundation for time-based pricing and is best for shops that want a defensible, documented internal rate rather than a guess.',
    color: 'blue',
    complexity: 'Essential',
  },
  {
    href: '/calculators/cost-center/overhead-allocator',
    icon: TrendingUp,
    title: 'Overhead Allocator',
    description:
      'Distribute facility, management, and indirect costs across jobs fairly. Without proper allocation, you may undercharge high-overhead jobs or overcharge simple ones. Essential for multi-machine shops and service bureaus.',
    color: 'green',
    complexity: 'Essential',
  },
  {
    href: '/calculators/cost-center/setup-estimator',
    icon: Clock,
    title: 'Setup Time Estimator',
    description:
      'Estimate setup and changeover time based on programming, loading, machine preparation, inspection, and batch size. Highlights when setup dominates small-batch work and is best for high-mix or changeover-heavy environments.',
    color: 'orange',
    complexity: 'Important',
  },
  {
    href: '/calculators/cost-center/pierce-estimator',
    icon: Zap,
    title: 'Piercing Time & Cost Estimator',
    description:
      'Calculate piercing time and cost by material, thickness, hole count, and strategy so you can see when holes become the bottleneck. Most useful for perforated parts, thick sections, and jobs where pierce quality matters.',
    color: 'purple',
    complexity: 'Specialized',
  },
  {
    href: '/calculators/cost-center/kerf-reference',
    icon: Settings,
    title: 'Kerf Width Reference',
    description:
      'Quick reference for kerf width by material, thickness, and nozzle diameter to support path compensation and material planning. Best used when programming new materials or checking whether nesting assumptions match reality.',
    color: 'indigo',
    complexity: 'Reference',
  },
  {
    href: '/calculators/cost-center/finishing-guide',
    icon: FileText,
    title: 'Edge Finishing Time Guide',
    description:
      'Estimate deburring, chamfering, and finishing time by material, edge length, method, and quality level. Shows when edge work rivals or exceeds cutting time, especially on thin-gauge or cosmetic parts.',
    color: 'pink',
    complexity: 'Specialized',
  },
  {
    href: '/calculators/cost-center/quotation-margin',
    icon: Calculator,
    title: 'Quotation Margin Simulator',
    description:
      'Simulate pricing scenarios with target margins, payment terms, risk factors, and volume discounts. Best used after you know your true costs and want to test different price and margin strategies before sending quotes.',
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
              Cost management tools for laser cutting operations. Estimate shop rates, allocate overhead, examine hidden cost drivers, 
              and explore pricing scenarios using your own assumptions.
            </p>
          </div>

          {/* New to Cost Centers? */}
          <div className="mb-12 card bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-500">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="rounded-full bg-green-100 p-3 md:mt-1">
                <FileText className="h-7 w-7 text-green-700" />
              </div>
              <div className="flex-1">
                <h2 className="mb-3 text-2xl font-bold text-gray-900">New to cost center analysis?</h2>
                <p className="mb-4 text-sm text-gray-700">
                  Cost Center tools help you understand the <strong>true cost</strong> of running your shop and pricing jobs
                  accurately. Many shops unknowingly lose margin by missing setup time, piercing overhead, finishing work,
                  and proper overhead allocation.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-4">
                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Start here (about 15 minutes)</h3>
                    <ol className="space-y-1 text-xs text-gray-700">
                      <li>
                        1. Use{' '}
                        <Link
                          href="/calculators/cost-center/hourly-rate"
                          className="font-semibold text-primary-600 hover:underline"
                        >
                          Hourly Rate Builder
                        </Link>{' '}
                        to calculate your true shop rate.
                      </li>
                      <li>2. Pick one representative job and estimate all time components (setup, pierce, cut, finish).</li>
                      <li>3. Compare your estimate against actual time and cost for that job.</li>
                      <li>4. Identify the biggest gap and decide what to measure or refine next.</li>
                    </ol>
                  </div>
                  <div className="rounded-lg bg-white p-4">
                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Common "aha" moments</h3>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Setup time is 25–35% of small-batch costs.</li>
                      <li>• Perforated parts have 2× the pierce time originally assumed.</li>
                      <li>• Overhead rate was far below what fixed costs actually require.</li>
                      <li>• Deburring on thin parts can take longer than cutting.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
                  For perforated parts and small batches, modeled piercing, setup, and finishing time can become a large share of total processing time.
                  Use these tools to quantify how much these contributors matter in your own jobs instead of treating them as generic overhead.
                </p>
              </div>
              
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Process Optimization</h3>
                <p className="text-gray-700">
                  Identify where your shop&apos;s costs are highest and find opportunities for improvement. Should you 
                  invest in automated deburring? Is nitrogen generation cost-effective? When should you batch orders?
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Real-world impact (typical ranges)</h3>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-3xl font-bold text-blue-600">15–25%</p>
                  <p className="text-gray-700">
                    Margin improvement many shops see after explicitly modeling setup, piercing, and finishing time on
                    small-batch perforated parts.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-3xl font-bold text-green-600">$8–15/hr</p>
                  <p className="text-gray-700">
                    Common "missing overhead" discovered when shops build their first full hourly rate instead of relying
                    on legacy shop rates.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-3xl font-bold text-purple-600">30–40%</p>
                  <p className="text-gray-700">
                    Typical reduction in quote preparation time once costs are systematized with a consistent cost-center
                    workflow.
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-600">
                These ranges are illustrative and depend on your starting baseline and implementation effort; use them as a
                sense-check, not as promised results.
              </p>
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
                    and Finishing Guide for edge work. These  hidden  times often exceed cutting time.
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

          {/* Typical Cost Center Workflow */}
          <div className="card mb-16 bg-gradient-to-br from-blue-50 to-purple-50">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Typical Cost Center Workflow</h2>
            <p className="mb-6 text-sm text-gray-700">
              These tools work together to build a complete picture of job costs. Use this workflow as a guide and adapt it
              to your own quoting and scheduling process.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">Calculate base shop and overhead rates</h3>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <Link
                      href="/calculators/cost-center/hourly-rate"
                      className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Hourly Rate Builder
                    </Link>
                    <span className="text-gray-500">→</span>
                    <Link
                      href="/calculators/cost-center/overhead-allocator"
                      className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700 hover:bg-green-200"
                    >
                      Overhead Allocator
                    </Link>
                  </div>
                  <p className="text-xs text-gray-700">
                    Establish your true shop hourly rate and overhead allocation method. Update when major costs change
                    (rent, wages, energy, or equipment fleet).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">Estimate job time components</h3>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <Link
                      href="/calculators/cost-center/setup-estimator"
                      className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-700 hover:bg-orange-200"
                    >
                      Setup Time
                    </Link>
                    <span className="text-gray-500">+</span>
                    <Link
                      href="/calculators/cost-center/pierce-estimator"
                      className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-700 hover:bg-purple-200"
                    >
                      Pierce Time
                    </Link>
                    <span className="text-gray-500">+</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">Cutting Time</span>
                    <span className="text-gray-500">+</span>
                    <Link
                      href="/calculators/cost-center/finishing-guide"
                      className="rounded-full bg-pink-100 px-3 py-1 font-medium text-pink-700 hover:bg-pink-200"
                    >
                      Finishing Time
                    </Link>
                  </div>
                  <p className="text-xs text-gray-700">
                    Calculate all time components for the specific job. Multiply each by your hourly rate from step 1 to
                    arrive at a complete cost picture instead of focusing only on cutting time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg bg-white p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">Set price and margin</h3>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                      Total cost from steps 1–2
                    </span>
                    <span className="text-gray-500">→</span>
                    <Link
                      href="/calculators/cost-center/quotation-margin"
                      className="rounded-full bg-teal-100 px-3 py-1 font-medium text-teal-700 hover:bg-teal-200"
                    >
                      Quotation Margin Simulator
                    </Link>
                  </div>
                  <p className="text-xs text-gray-700">
                    Apply appropriate margins considering risk, customer type, payment terms, and volume. Compare a few
                    scenarios before finalizing the quote.
                  </p>
                </div>
              </div>

              <div className="mt-2 border-t border-purple-200 pt-3 text-xs text-gray-600">
                Reference tools such as the Kerf Width Reference can be used at any stage to support path compensation and
                material planning.
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
                  Record actual times and costs for jobs, then compare them to your estimates. Refine your inputs over time 
                  so the modeled results better reflect how your shop actually runs. The goal is alignment with your own data, not any specific accuracy percentage.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Update Costs Quarterly</h3>
                <p className="text-sm text-gray-700">
                  Material prices, gas costs, and labor rates change. Review and update your cost inputs regularly (for example, every few months) 
                  and whenever there are major changes such as new equipment, wage increases, or facility moves.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Do not Forget Hidden Costs</h3>
                <p className="text-sm text-gray-700">
                  Setup time, piercing, finishing, scrap, rework, and material handling can significantly increase total time beyond direct cutting. 
                  Use the calculators to make these contributions explicit in your costing instead of treating them as undifferentiated overhead.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Use Consistent Allocation Methods</h3>
                <p className="text-sm text-gray-700">
                  Overhead includes costs that are not tied to a single job (rent, office staff, insurance, supervision,
                  etc.). Allocation is how you spread those costs across jobs—commonly by machine hours, labor hours, or
                  material cost. Choose one primary allocation method that matches your biggest cost driver and apply it
                  consistently. Consistency is more important than perfection; review annually to confirm it still reflects
                  how your shop actually runs.
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

