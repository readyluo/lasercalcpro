import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import { Calculator, TrendingUp, DollarSign, Zap, Wrench, Home, Users, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Laser Hourly Cost Structure: Complete Reference Guide 2025',
  description: 'Master laser cutting hourly cost calculation with our complete breakdown: equipment depreciation, labor, energy, maintenance, overhead allocation. Free calculator included.',
  keywords: ['laser cutting hourly rate', 'shop rate calculation', 'laser cost per hour', 'manufacturing overhead', 'equipment depreciation', 'laser operating cost'],
});

// Structured Data - HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Laser Cutting Hourly Shop Rate',
  description: 'Step-by-step guide to calculating accurate hourly rates for laser cutting operations',
  totalTime: 'PT15M',
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Hourly Rate Calculator',
    },
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Calculate Equipment Depreciation per Hour',
      text: 'Divide equipment purchase price by expected lifetime hours (typically 40,000-60,000 hours for fiber lasers)',
      url: 'https://lasercalcpro.com/guides/hourly-cost-structure#depreciation',
    },
    {
      '@type': 'HowToStep',
      name: 'Calculate Direct Labor Cost per Hour',
      text: 'Add operator wages, benefits, payroll taxes divided by productive hours per year',
      url: 'https://lasercalcpro.com/guides/hourly-cost-structure#labor',
    },
    {
      '@type': 'HowToStep',
      name: 'Calculate Energy Cost per Hour',
      text: 'Multiply laser power consumption (kW) by electricity rate, including cooling systems and auxiliaries',
      url: 'https://lasercalcpro.com/guides/hourly-cost-structure#energy',
    },
    {
      '@type': 'HowToStep',
      name: 'Calculate Maintenance and Consumables',
      text: 'Include scheduled maintenance, lens replacement, nozzles, assist gas, and spare parts amortized per hour',
      url: 'https://lasercalcpro.com/guides/hourly-cost-structure#maintenance',
    },
    {
      '@type': 'HowToStep',
      name: 'Allocate Facility and Overhead Costs',
      text: 'Add rent, insurance, utilities, management, and administration costs divided by machine hours',
      url: 'https://lasercalcpro.com/guides/hourly-cost-structure#overhead',
    },
    {
      '@type': 'HowToStep',
      name: 'Sum All Components for Total Hourly Rate',
      text: 'Add all cost categories to determine your shop hourly rate, then apply profit margin',
      url: 'https://lasercalcpro.com/guides/hourly-cost-structure#total',
    },
  ],
};

export default function HourlyCostStructurePage() {
  return (
    <>
      <Navigation />
      <SchemaMarkup schema={howToSchema} />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Laser Hourly Cost Structure: Complete Reference
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl">
              Master the fundamentals of hourly shop rate calculation for laser cutting operations. 
              This comprehensive guide breaks down every cost component with industry benchmarks, 
              formulas, and real-world examples.
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="card bg-gradient-to-br from-primary-50 to-blue-50 mb-12">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Quick Summary</h2>
                <p className="text-gray-700 mb-4">
                  <strong>Total Hourly Shop Rate = Equipment + Labor + Energy + Maintenance + Consumables + Facility + Overhead</strong>
                </p>
                <p className="text-gray-700">
                  Industry benchmarks: $45-85/hour for 1-3kW fiber lasers, $85-150/hour for 6-12kW systems. 
                  Actual rates depend on location, utilization, and business model.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Section 1: Equipment Depreciation */}
              <section id="depreciation" className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">1. Equipment Depreciation</h2>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What It Includes</h3>
                <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                  <li>Laser cutting machine purchase price</li>
                  <li>Installation and commissioning costs</li>
                  <li>Initial training and setup</li>
                  <li>Software licenses (CAD/CAM, nesting)</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculation Formula</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                  <strong>Depreciation per Hour = Total Equipment Cost ÷ Expected Lifetime Hours</strong>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Benchmarks</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Laser Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Purchase Price</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Lifetime Hours</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">$/Hour</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">1-3kW Fiber</td>
                        <td className="border border-gray-300 px-4 py-2">$120,000 - $180,000</td>
                        <td className="border border-gray-300 px-4 py-2">50,000 - 60,000</td>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">$2.00 - $3.60</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">4-6kW Fiber</td>
                        <td className="border border-gray-300 px-4 py-2">$200,000 - $300,000</td>
                        <td className="border border-gray-300 px-4 py-2">50,000 - 60,000</td>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">$3.33 - $6.00</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">8-12kW Fiber</td>
                        <td className="border border-gray-300 px-4 py-2">$350,000 - $500,000</td>
                        <td className="border border-gray-300 px-4 py-2">50,000 - 60,000</td>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">$5.83 - $10.00</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">CO2 4-6kW</td>
                        <td className="border border-gray-300 px-4 py-2">$250,000 - $350,000</td>
                        <td className="border border-gray-300 px-4 py-2">30,000 - 40,000</td>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">$6.25 - $11.67</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Pro Tip:</strong> Use conservative lifetime hour estimates. High-power lasers may 
                    require major resonator rebuilds at 30,000-40,000 hours. Factor this into depreciation.
                  </p>
                </div>
              </section>

              {/* Section 2: Direct Labor */}
              <section id="labor" className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">2. Direct Labor Cost</h2>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Components</h3>
                <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                  <li>Operator base wages</li>
                  <li>Health insurance and benefits (20-30% of wages)</li>
                  <li>Payroll taxes (7-10% of wages)</li>
                  <li>Paid time off, holidays, sick leave</li>
                  <li>Training and skill development</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculation Formula</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                  <strong>Labor per Hour = (Annual Compensation ÷ Productive Hours) × Labor Burden Multiplier</strong><br />
                  <span className="text-gray-600">Typical multiplier: 1.35-1.50 (includes benefits, taxes, overhead)</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Wage Benchmarks (USA, 2025)</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Entry-level Operator</span>
                    <span className="text-gray-700">$18-25/hour → <strong className="text-primary-600">$24-38/hr loaded</strong></span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Experienced Operator</span>
                    <span className="text-gray-700">$25-35/hour → <strong className="text-primary-600">$34-53/hr loaded</strong></span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Lead/Programmer</span>
                    <span className="text-gray-700">$35-50/hour → <strong className="text-primary-600">$47-75/hr loaded</strong></span>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Highly automated shops with lights-out operations may allocate 
                    only 0.2-0.5 operators per machine, significantly reducing per-hour labor cost.
                  </p>
                </div>
              </section>

              {/* Section 3: Energy */}
              <section id="energy" className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">3. Energy Cost</h2>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Power Consumption Components</h3>
                <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                  <li>Laser source power draw (wall plug efficiency: 25-45%)</li>
                  <li>Chiller/cooling system (2-5 kW continuous)</li>
                  <li>Dust collection and filtration (3-7 kW)</li>
                  <li>CNC controller, motors, auxiliaries (1-2 kW)</li>
                  <li>Facility HVAC allocated to machine space</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculation Formula</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                  <strong>Energy per Hour = Total Power (kW) × Load Factor × Electricity Rate ($/kWh)</strong><br />
                  <span className="text-gray-600">Load Factor typically 0.6-0.85 for active cutting</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Example Calculation</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>6kW Fiber Laser (12 kW wall power)</span>
                    <span className="font-mono">12.0 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chiller</span>
                    <span className="font-mono">3.5 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dust collector</span>
                    <span className="font-mono">5.0 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auxiliaries</span>
                    <span className="font-mono">1.5 kW</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-2 font-semibold">
                    <span>Total Power</span>
                    <span className="font-mono">22.0 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Load Factor</span>
                    <span className="font-mono">0.70</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Power Draw</span>
                    <span className="font-mono">15.4 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Electricity Rate</span>
                    <span className="font-mono">$0.12/kWh</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-2 font-bold text-base text-primary-600">
                    <span>Cost per Hour</span>
                    <span className="font-mono">$1.85/hr</span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Energy Efficiency:</strong> Modern fiber lasers are 3-5x more energy efficient 
                    than CO2 lasers per watt of output, resulting in 40-60% lower electricity costs.
                  </p>
                </div>
              </section>

              {/* Section 4: Maintenance & Consumables */}
              <section id="maintenance" className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">4. Maintenance & Consumables</h2>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Maintenance Items</h3>
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">Protective Lenses</span>
                      <span className="text-primary-600 font-semibold">$200-400/lens</span>
                    </div>
                    <p className="text-sm text-gray-600">Replace every 200-800 hours depending on material and cleanliness</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">Cutting Nozzles</span>
                      <span className="text-primary-600 font-semibold">$15-80/nozzle</span>
                    </div>
                    <p className="text-sm text-gray-600">Replace every 40-200 pierces (varies by material thickness)</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">Assist Gas (Nitrogen)</span>
                      <span className="text-primary-600 font-semibold">$0.50-2.00/m³</span>
                    </div>
                    <p className="text-sm text-gray-600">Consumption: 0.5-5 m³/hour depending on pressure and nozzle</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">Scheduled Maintenance</span>
                      <span className="text-primary-600 font-semibold">$5,000-15,000/year</span>
                    </div>
                    <p className="text-sm text-gray-600">PM service, alignment checks, calibration, spare parts</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimated Hourly Cost Range</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-gray-300 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Low-intensity use (thin materials, oxygen assist)</p>
                    <p className="text-2xl font-bold text-primary-600">$2-5/hour</p>
                  </div>
                  <div className="p-4 border-2 border-primary-600 rounded-lg bg-primary-50">
                    <p className="text-sm text-gray-600 mb-1">Heavy-duty use (thick steel, nitrogen assist)</p>
                    <p className="text-2xl font-bold text-primary-600">$8-20/hour</p>
                  </div>
                </div>
              </section>

              {/* Section 5: Facility & Overhead */}
              <section id="overhead" className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">5. Facility & Overhead Allocation</h2>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Overhead Categories</h3>
                <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                  <li><strong>Facility:</strong> Rent/mortgage, property tax, building insurance, utilities (HVAC, lighting)</li>
                  <li><strong>Administration:</strong> Management salaries, accounting, IT, office supplies</li>
                  <li><strong>Sales & Marketing:</strong> Salespeople, advertising, website, customer acquisition</li>
                  <li><strong>Quality & Logistics:</strong> Inspection equipment, forklifts, material handling, shipping</li>
                  <li><strong>Insurance:</strong> General liability, equipment insurance, workers compensation</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Allocation Methods</h3>
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium mb-1">Machine Hour Method (Most Common)</p>
                    <div className="text-sm text-gray-700 font-mono bg-white p-2 rounded">
                      Overhead Rate = Annual Overhead Costs ÷ Total Annual Machine Hours
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium mb-1">Floor Space Method</p>
                    <div className="text-sm text-gray-700 font-mono bg-white p-2 rounded">
                      Overhead Rate = (Facility Costs × Machine Footprint %) ÷ Annual Hours
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium mb-1">Percentage of Direct Labor</p>
                    <div className="text-sm text-gray-700 font-mono bg-white p-2 rounded">
                      Overhead = Direct Labor Cost × Overhead Rate (typically 100-200%)
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Typical Overhead Rates</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Small Shop (1-3 machines)</span>
                    <span className="text-primary-600 font-semibold">$8-18/hour per machine</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Medium Shop (4-10 machines)</span>
                    <span className="text-primary-600 font-semibold">$12-25/hour per machine</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Large Facility (10+ machines)</span>
                    <span className="text-primary-600 font-semibold">$15-35/hour per machine</span>
                  </div>
                </div>
              </section>

              {/* Section 6: Total Calculation */}
              <section id="total" className="card bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">6. Total Hourly Shop Rate Example</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  Complete example for a <strong>6kW fiber laser</strong> in a mid-sized shop:
                </p>

                <div className="bg-white rounded-lg p-5 space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Equipment Depreciation</span>
                    <span className="font-mono">$4.50/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Labor (0.5 operator allocation)</span>
                    <span className="font-mono">$20.00/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy (electricity)</span>
                    <span className="font-mono">$1.85/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance & Consumables</span>
                    <span className="font-mono">$6.00/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assist Gas (Nitrogen, moderate use)</span>
                    <span className="font-mono">$3.50/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Facility & Overhead Allocation</span>
                    <span className="font-mono">$18.00/hour</span>
                  </div>
                  <div className="flex justify-between border-t-2 border-gray-300 pt-2 mt-2 font-bold text-base">
                    <span>Total Shop Cost</span>
                    <span className="font-mono text-primary-600">$53.85/hour</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span>Profit Margin (30%)</span>
                    <span className="font-mono">$16.16/hour</span>
                  </div>
                  <div className="flex justify-between border-t-2 border-primary-600 pt-2 font-bold text-lg">
                    <span>Customer Rate</span>
                    <span className="font-mono text-primary-600">$70.00/hour</span>
                  </div>
                </div>

                <div className="p-4 bg-white border-l-4 border-primary-600 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Reality Check:</strong> Industry rates for 6kW fiber lasers typically range 
                    $60-95/hour depending on region, specialization, and competitive landscape. 
                    Ensure your calculated rate is market-competitive while covering all costs.
                  </p>
                </div>
              </section>

              {/* Best Practices */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Best Practices</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Review Rates Quarterly</h3>
                    <p className="text-gray-700">Energy costs, wages, and material prices fluctuate. Update your rate calculation every 3-6 months to maintain profitability.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Track Actual vs. Estimated</h3>
                    <p className="text-gray-700">Monitor real consumable usage, maintenance costs, and actual productive hours. Adjust estimates based on historical data.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Separate Setup from Run Time</h3>
                    <p className="text-gray-700">Charge setup time separately or amortize over batch quantity. Don&apos;t hide setup costs in the hourly rate.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Consider Utilization Rate</h3>
                    <p className="text-gray-700">Fixed costs (depreciation, facility) must be recovered over actual productive hours. A machine running 60% vs 90% capacity has different cost structures.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Benchmark Against Market</h3>
                    <p className="text-gray-700">Compare your rates to local competitors and industry surveys. Being too high loses business; too low leaves money on the table.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Calculator CTA */}
              <div className="card bg-gradient-to-br from-primary-600 to-blue-600 text-white">
                <h3 className="text-xl font-bold mb-3">Calculate Your Hourly Rate</h3>
                <p className="mb-4 text-primary-50">
                  Use our interactive calculator to determine your exact shop hourly rate with your own numbers.
                </p>
                <Link
                  href="/calculators/cost-center/hourly-rate"
                  className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 w-full justify-center font-semibold"
                >
                  <Calculator className="h-5 w-5" />
                  Open Calculator
                </Link>
              </div>

              {/* Related Tools */}
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Cost Tools</h3>
                <div className="space-y-3">
                  <Link
                    href="/calculators/cost-center/overhead-allocator"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Overhead Allocator</p>
                    <p className="text-sm text-gray-600">Distribute facility costs across machines</p>
                  </Link>
                  <Link
                    href="/calculators/cost-center/setup-estimator"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Setup Time Estimator</p>
                    <p className="text-sm text-gray-600">Calculate changeover costs</p>
                  </Link>
                  <Link
                    href="/calculators/energy"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Energy Cost Calculator</p>
                    <p className="text-sm text-gray-600">Detailed power consumption analysis</p>
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Jump to Section</h3>
                <nav className="space-y-2 text-sm">
                  <a href="#depreciation" className="block text-primary-600 hover:underline">→ Equipment Depreciation</a>
                  <a href="#labor" className="block text-primary-600 hover:underline">→ Direct Labor Cost</a>
                  <a href="#energy" className="block text-primary-600 hover:underline">→ Energy Cost</a>
                  <a href="#maintenance" className="block text-primary-600 hover:underline">→ Maintenance & Consumables</a>
                  <a href="#overhead" className="block text-primary-600 hover:underline">→ Facility & Overhead</a>
                  <a href="#total" className="block text-primary-600 hover:underline">→ Total Calculation Example</a>
                </nav>
              </div>

              {/* Additional Resources */}
              <div className="card bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">More Guides</h3>
                <div className="space-y-3 text-sm">
                  <Link href="/guides/piercing-strategy" className="block text-primary-600 hover:underline">
                    Piercing Strategy Guide →
                  </Link>
                  <Link href="/guides/kerf-width-reference" className="block text-primary-600 hover:underline">
                    Kerf Width Reference →
                  </Link>
                  <Link href="/guides/finishing-time-cheatsheet" className="block text-primary-600 hover:underline">
                    Finishing Time Cheat Sheet →
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom CTA */}
          <div className="card bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Costs?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore our complete suite of cost center tools and guides to master 
              laser cutting economics and maximize profitability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/calculators/cost-center"
                className="btn-primary bg-primary-600 hover:bg-primary-700"
              >
                View All Cost Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/guides"
                className="btn-secondary bg-white text-gray-900 hover:bg-gray-100"
              >
                Browse All Guides
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
