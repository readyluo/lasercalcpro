'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hourlyRateSchema, type HourlyRateInput } from '@/lib/validations/quick';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DollarSign, Timer, Zap, Info } from 'lucide-react';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';

function computeHourlyCost(i: HourlyRateInput) {
  const depreciationPerHour = i.equipmentCost / (i.lifespanYears * i.annualHours);
  const electricityPerHour = i.totalPowerKw * i.electricityRate;
  const total =
    depreciationPerHour +
    electricityPerHour +
    i.laborRate +
    i.consumablesPerHour +
    i.maintenanceReservePerHour +
    i.overheadPerHour;
  return {
    depreciationPerHour: Number(depreciationPerHour.toFixed(2)),
    electricityPerHour: Number(electricityPerHour.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

export default function LaserHourlyRateMiniCalculatorPage() {
  const howToSchema = generateCalculatorHowToSchema(
    'Laser Hourly Cost Calculator',
    'Calculate true hourly operating cost for laser equipment',
    [
      { name: 'Enter Equipment Details', text: 'Input equipment cost, lifespan, and annual operating hours' },
      { name: 'Add Operating Costs', text: 'Enter electricity, labor, consumables, and overhead costs' },
      { name: 'Calculate', text: 'Get comprehensive hourly cost breakdown' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'What costs are included in hourly rate?',
      answer: 'Equipment depreciation, electricity, labor, consumables (nozzles, lenses), maintenance reserve, and facility overhead. This gives you the true all-in cost per hour.',
    },
    {
      question: 'How is depreciation calculated?',
      answer: 'Depreciation per hour = Equipment Cost / (Lifespan Years × Annual Hours). For example, a $150k machine over 10 years at 2000 hrs/year = $7.50/hr.',
    },
    {
      question: 'Should I include idle time in annual hours?',
      answer: 'Use productive hours only (actual cutting/processing time). Typical job shops achieve 60-70% utilization, so 1200-1400 productive hours from 2000 available hours.',
    },
  ]);

  const { register, handleSubmit, formState: { errors } } = useForm<HourlyRateInput>({
    resolver: zodResolver(hourlyRateSchema),
    defaultValues: {
      equipmentCost: 150000,
      lifespanYears: 10,
      annualHours: 2000,
      electricityRate: 0.12,
      totalPowerKw: 10,
      laborRate: 25,
      consumablesPerHour: 2,
      maintenanceReservePerHour: 3,
      overheadPerHour: 8,
    },
  });

  const [result, setResult] = React.useState<{ depreciationPerHour: number; electricityPerHour: number; total: number } | null>(null);

  const onSubmit = (data: HourlyRateInput) => {
    setResult(computeHourlyCost(data));
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Laser Hourly Cost Estimator</h1>
            <p className="text-gray-600">Quickly estimate the true hourly cost of running your laser system.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card sticky top-24">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Input {...register('equipmentCost', { valueAsNumber: true })} type="number" step="1000" label="Equipment Cost ($)" error={errors.equipmentCost?.message} leftIcon={<DollarSign className="h-4 w-4" />} />
                  <Input {...register('lifespanYears', { valueAsNumber: true })} type="number" step="1" label="Lifespan (years)" error={errors.lifespanYears?.message} />
                  <Input {...register('annualHours', { valueAsNumber: true })} type="number" step="50" label="Annual Hours" error={errors.annualHours?.message} />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input {...register('totalPowerKw', { valueAsNumber: true })} type="number" step="0.5" label="Total Power (kW)" error={errors.totalPowerKw?.message} leftIcon={<Zap className="h-4 w-4" />} />
                  <Input {...register('electricityRate', { valueAsNumber: true })} type="number" step="0.01" label="Electricity ($/kWh)" error={errors.electricityRate?.message} leftIcon={<DollarSign className="h-4 w-4" />} />
                  <Input {...register('laborRate', { valueAsNumber: true })} type="number" step="1" label="Labor ($/hr)" error={errors.laborRate?.message} leftIcon={<DollarSign className="h-4 w-4" />} />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input {...register('consumablesPerHour', { valueAsNumber: true })} type="number" step="0.5" label="Consumables ($/hr)" error={errors.consumablesPerHour?.message} />
                  <Input {...register('maintenanceReservePerHour', { valueAsNumber: true })} type="number" step="0.5" label="Maintenance ($/hr)" error={errors.maintenanceReservePerHour?.message} />
                  <Input {...register('overheadPerHour', { valueAsNumber: true })} type="number" step="0.5" label="Overhead ($/hr)" error={errors.overheadPerHour?.message} />
                </div>
                <Button type="submit" variant="primary" className="w-full" leftIcon={<Timer className="h-4 w-4" />}>Calculate</Button>
              </form>
            </div>

            <div>
              {result === null ? (
                <div className="card flex min-h-[220px] flex-col items-center justify-center text-center">
                  <Timer className="mb-3 h-12 w-12 text-gray-300" />
                  <p className="text-gray-600">Enter inputs and calculate to see hourly cost.</p>
                </div>
              ) : (
                <div id="results" className="space-y-6">
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-2 text-xl font-bold">Estimated Hourly Cost</h2>
                    <p className="text-4xl font-bold">${result.total}</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div className="rounded bg-white/10 p-3">
                        <p className="text-xs text-blue-100">Depreciation</p>
                        <p className="text-lg font-semibold">${result.depreciationPerHour}</p>
                      </div>
                      <div className="rounded bg-white/10 p-3">
                        <p className="text-xs text-blue-100">Electricity</p>
                        <p className="text-lg font-semibold">${result.electricityPerHour}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="mb-3 text-lg font-semibold">Notes</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      <li>Does not include gas costs; add to consumables if needed.</li>
                      <li>Increase annual hours to reduce depreciation per hour.</li>
                      <li>Use actual facility overhead for your shop.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How to Use */}
          <div className="mt-12">
            <div className="card">
              <div className="mb-6 flex items-start gap-3">
                <div className="rounded-full bg-primary-100 p-2">
                  <Info className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Understanding True Hourly Cost</h2>
                  <p className="mt-2 text-gray-600">
                    Many shops underestimate their true operating costs. This calculator helps you understand all cost components.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Equipment Depreciation</h3>
                  <p className="text-gray-600">
                    Spread the equipment purchase cost over its useful life. A $150k laser over 10 years (20,000 total hours) 
                    costs $7.50/hour in depreciation. This is a real cost that must be recovered to replace equipment eventually.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Total Power Consumption</h3>
                  <p className="text-gray-600">
                    Include laser power + chiller + exhaust + control systems. A 6kW laser typically draws ~10kW total system power. 
                    At $0.12/kWh, that's $1.20/hour in electricity alone.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Consumables & Maintenance</h3>
                  <p className="text-gray-600">
                    Nozzles, lenses, protective windows, and regular maintenance add up. Budget $2-5/hour for consumables and 
                    $2-4/hour for maintenance reserve. Check our <Link href="/calculators/quick-reference/assist-gas" className="text-primary-600 hover:underline">assist gas reference</Link> for 
                    gas costs.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Overhead Allocation</h3>
                  <p className="text-gray-600">
                    Facility rent, insurance, utilities, management, and administrative costs. Typical shops allocate $5-15/hour 
                    depending on facility size and local costs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="What costs are included in hourly rate?"
                  answer="Equipment depreciation, electricity, labor, consumables (nozzles, lenses), maintenance reserve, and facility overhead. This gives you the true all-in cost per hour."
                />
                <FAQItem
                  question="How is depreciation calculated?"
                  answer="Depreciation per hour = Equipment Cost / (Lifespan Years × Annual Hours). For example, a $150k machine over 10 years at 2000 hrs/year = $7.50/hr."
                />
                <FAQItem
                  question="Should I include idle time in annual hours?"
                  answer="Use productive hours only (actual cutting/processing time). Typical job shops achieve 60-70% utilization, so 1200-1400 productive hours from 2000 available hours."
                />
                <FAQItem
                  question="How do I determine my overhead per hour?"
                  answer="Add monthly facility costs (rent, insurance, utilities, management salaries) and divide by total productive machine hours. For example, $15k/month overhead ÷ 160 machine hours = $93.75/hr, allocated across machines."
                />
                <FAQItem
                  question="Is this the rate I should charge customers?"
                  answer="No, this is your cost. Add profit margin (20-40% typical) and any project-specific costs (materials, special tooling). For example, $50/hr cost + 30% margin = $65/hr billing rate minimum."
                />
              </div>
            </div>
          </div>

          {/* Cost Breakdown Example */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Typical Cost Breakdown Example</h2>
              <p className="mb-6 text-gray-700">6kW Fiber Laser System - Job Shop Environment</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-3 text-sm font-semibold text-gray-600">DIRECT COSTS</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Equipment Depreciation</span>
                      <span className="font-semibold">$7.50/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Electricity (10kW @ $0.12)</span>
                      <span className="font-semibold">$1.20/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operator Labor</span>
                      <span className="font-semibold">$25.00/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consumables</span>
                      <span className="font-semibold">$2.50/hr</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold">
                      <span>Direct Subtotal</span>
                      <span>$36.20/hr</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-3 text-sm font-semibold text-gray-600">INDIRECT COSTS</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Maintenance Reserve</span>
                      <span className="font-semibold">$3.00/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Facility Overhead</span>
                      <span className="font-semibold">$8.00/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gas (not included above)</span>
                      <span className="font-semibold">$2-5/hr</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold">
                      <span>Total Operating Cost</span>
                      <span className="text-primary-600">$49-52/hr</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-primary-100 p-4">
                <p className="text-sm text-gray-800">
                  <strong>Recommended Billing Rate:</strong> Add 25-35% profit margin → <strong>$61-70/hr</strong> minimum. 
                  Adjust based on market rates, specialization, and service level.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/calculators/roi" className="card-hover group border-l-4 border-purple-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Equipment ROI Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Analyze payback period and return on investment for equipment purchases
                </p>
              </Link>

              <Link href="/calculators/quick/price-per-meter" className="card-hover group border-l-4 border-blue-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Price per Meter Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Quick operating cost estimate per meter of cutting
                </p>
              </Link>

              <Link href="/calculators/energy" className="card-hover group border-l-4 border-yellow-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Energy Cost Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Detailed power consumption and electricity cost analysis
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

// FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg border border-gray-200 transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900">{question}</h3>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-3">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}


