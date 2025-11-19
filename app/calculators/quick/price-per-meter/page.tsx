'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pricePerMeterSchema, type PricePerMeterInput } from '@/lib/validations/quick';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { DollarSign, Ruler, Scissors, Info } from 'lucide-react';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateCalculatorHowToSchema, generateFAQSchema, generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import Link from 'next/link';

const MATERIAL_BASE_SPEED_M_PER_MIN: Record<string, (thickness: number) => number> = {
  mild_steel: (t) => (t <= 1 ? 18 : t <= 3 ? 5 : t <= 6 ? 2.2 : t <= 10 ? 1 : 0.6),
  stainless_steel: (t) => (t <= 1 ? 12 : t <= 3 ? 3.5 : t <= 6 ? 1.6 : t <= 10 ? 0.8 : 0.4),
  aluminum: (t) => (t <= 1 ? 14 : t <= 3 ? 4.5 : t <= 6 ? 2.0 : t <= 10 ? 1.0 : 0.5),
  brass: (t) => (t <= 1 ? 10 : t <= 3 ? 3.0 : t <= 6 ? 1.4 : t <= 10 ? 0.7 : 0.35),
  copper: (t) => (t <= 1 ? 8 : t <= 3 ? 2.5 : t <= 6 ? 1.1 : t <= 10 ? 0.55 : 0.3),
};

const POWER_EFFICIENCY_FACTOR = (kw: number) => Math.min(1.4, 0.7 + kw / 10);

type PricePerMeterResult = {
  costPerMeter: number;
  minutesPerMeter: number;
  speedMPerMin: number;
  electricityPerMeter: number;
  laborPerMeter: number;
  consumablesPerMeter: number;
};

export default function PricePerMeterMiniCalculatorPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<PricePerMeterInput>({
    resolver: zodResolver(pricePerMeterSchema),
    defaultValues: {
      materialType: 'mild_steel',
      thickness: 3,
      electricityRate: 0.12,
      laborRate: 25,
      laserPower: 6,
    },
  });

  const [result, setResult] = React.useState<PricePerMeterResult | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Laser Cutting Price per Meter Calculator',
    'Calculate approximate operating cost per meter for laser cutting',
    [
      { name: 'Select Material', text: 'Choose your material type and enter thickness' },
      { name: 'Enter Equipment Parameters', text: 'Input laser power and operating costs' },
      { name: 'Calculate', text: 'Get instant price per meter estimate' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'What does price per meter include?',
      answer: 'This calculator estimates operating costs including electricity and labor per meter of cutting. Material costs and assist gas are not included in this quick estimate.',
    },
    {
      question: 'How accurate is this quick calculator?',
      answer:
        'This provides a rough ballpark estimate based on internal cutting speed assumptions. Actual costs depend on your machine, parameters, and local rates, so always compare results against your own production data. For detailed quotes, use the full laser cutting calculator or your shop-specific cost models.',
    },
    {
      question: 'Why does thickness affect price so much?',
      answer: 'Thicker materials require slower cutting speeds, which increases the time (and thus labor and electricity cost) per meter of cut.',
    },
  ]);

  const softwareSchema = generateSoftwareApplicationSchema('Laser Cutting Price per Meter Calculator');

  const materialOptions = [
    { value: 'mild_steel', label: 'Mild Steel' },
    { value: 'stainless_steel', label: 'Stainless Steel' },
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'brass', label: 'Brass' },
    { value: 'copper', label: 'Copper' },
  ];

  function calculate(form: PricePerMeterInput): PricePerMeterResult {
    const baseSpeed = MATERIAL_BASE_SPEED_M_PER_MIN[form.materialType](form.thickness);
    const speed = baseSpeed * POWER_EFFICIENCY_FACTOR(form.laserPower);
    const minutesPerMeter = 1 / Math.max(0.1, speed);
    const equipmentKw = form.laserPower * 1.6; // approx system power (laser + chiller + exhaust)
    const electricityPerMinute = (equipmentKw * form.electricityRate) / 60;
    const laborPerMinute = form.laborRate / 60;
    const operatingCostPerMinute = electricityPerMinute + laborPerMinute + 0.05; // small consumables buffer
    const costPerMeter = operatingCostPerMinute * minutesPerMeter;
    return {
      costPerMeter: Number(costPerMeter.toFixed(2)),
      minutesPerMeter,
      speedMPerMin: speed,
      electricityPerMeter: Number((electricityPerMinute * minutesPerMeter).toFixed(2)),
      laborPerMeter: Number((laborPerMinute * minutesPerMeter).toFixed(2)),
      consumablesPerMeter: Number((0.05 * minutesPerMeter).toFixed(2)),
    };
  }

  const onSubmit = (data: PricePerMeterInput) => {
    const ppm = calculate(data);
    setResult(ppm);
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      <SchemaMarkup schema={softwareSchema} />
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Laser Cutting Price per Meter</h1>
            <p className="text-gray-600">Quick estimator to get an approximate operating cost per meter by material and thickness, based on simplified internal speed assumptions.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card sticky top-24">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Select
                    {...register('materialType')}
                    label="Material"
                    options={materialOptions}
                    error={errors.materialType?.message}
                  />
                  <Input
                    {...register('thickness', { valueAsNumber: true })}
                    type="number"
                    step="0.1"
                    label="Thickness (mm)"
                    error={errors.thickness?.message}
                    leftIcon={<Ruler className="h-4 w-4" />}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input
                    {...register('laserPower', { valueAsNumber: true })}
                    type="number"
                    step="0.5"
                    label="Laser Power (kW)"
                    error={errors.laserPower?.message}
                  />
                  <Input
                    {...register('electricityRate', { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    label="Electricity ($/kWh)"
                    error={errors.electricityRate?.message}
                    leftIcon={<DollarSign className="h-4 w-4" />}
                  />
                  <Input
                    {...register('laborRate', { valueAsNumber: true })}
                    type="number"
                    step="1"
                    label="Labor ($/hr)"
                    error={errors.laborRate?.message}
                    leftIcon={<DollarSign className="h-4 w-4" />}
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full" leftIcon={<Scissors className="h-4 w-4" />}>Calculate</Button>
              </form>
            </div>

            <div>
              {result === null ? (
                <div className="card flex min-h-[260px] flex-col items-center justify-center text-center">
                  <Scissors className="mb-3 h-12 w-12 text-gray-300" />
                  <p className="text-gray-600">Enter parameters and calculate to see price per meter.</p>
                </div>
              ) : (
                <div id="results" className="space-y-6">
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-2 text-xl font-bold">Estimated Price per Meter</h2>
                    <p className="text-4xl font-bold">${result.costPerMeter}</p>
                    <p className="mt-2 text-sm text-blue-100">Approximate operating cost only. Material cost and gas not included.</p>
                  </div>

                  <div className="card grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="mb-1 text-sm font-semibold text-gray-500">Assumptions</h3>
                      <p className="text-sm text-gray-700">Speed: {result.speedMPerMin.toFixed(2)} m/min</p>
                      <p className="text-sm text-gray-700">Minutes per meter: {result.minutesPerMeter.toFixed(2)} min</p>
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold text-gray-500">Cost Breakdown</h3>
                      <p className="text-sm text-gray-700">Electricity: ${result.electricityPerMeter}</p>
                      <p className="text-sm text-gray-700">Labor: ${result.laborPerMeter}</p>
                      <p className="text-sm text-gray-700">Consumables buffer: ${result.consumablesPerMeter}</p>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="mb-3 text-lg font-semibold">Tips</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      <li>Increase nesting efficiency to cut overall cost per meter.</li>
                      <li>Air cutting on thin mild steel can reduce assist gas costs.</li>
                      <li>Keep utilization high to amortize labor across more meters.</li>
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
                  <h2 className="text-2xl font-bold text-gray-900">How to Use This Quick Calculator</h2>
                  <p className="mt-2 text-gray-600">
                    This mini calculator provides fast estimates for operating costs per meter of cutting
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">What&apos;s Included</h3>
                  <p className="text-gray-600">
                    Electricity cost (laser + system power) and labor cost per meter based on typical cutting speeds. 
                    This gives you a baseline operating cost estimate.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">What&apos;s Not Included</h3>
                  <p className="text-gray-600">
                    Material costs, assist gas consumption, equipment depreciation, and overhead. For complete 
                    project quotes, use the <Link href="/calculators/laser-cutting" className="text-primary-600 hover:underline">full laser cutting calculator</Link>.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">When to Use This</h3>
                  <p className="text-gray-600">
                    Perfect for quick comparisons between materials, rough budgeting, or when you need a fast 
                    ballpark figure. Check our <Link href="/calculators/quick-reference/cutting-speeds" className="text-primary-600 hover:underline">cutting speeds reference</Link> for 
                    more detailed benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Workflow Integration</h2>
              <ol className="space-y-3 text-sm text-gray-700">
                <li>
                  <span className="font-semibold text-gray-900">1. Pull reference data.</span> Grab feed rates from the{' '}
                  <Link href="/calculators/quick-reference/cutting-speeds" className="text-primary-600 hover:underline">
                    cutting speeds reference
                  </Link>{' '}
                  and confirm gas assumptions in the{' '}
                  <Link href="/calculators/quick-reference/assist-gas" className="text-primary-600 hover:underline">
                    assist gas guide
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-semibold text-gray-900">2. Run the quick calculator.</span> Use this tool to
                  translate that speed into an operating cost target for phone quotes or early scoping.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">3. Promote to detailed tools.</span> Once the job is
                  serious, feed the same assumptions into the{' '}
                  <Link href="/calculators/laser-cutting" className="text-primary-600 hover:underline">
                    full laser cutting calculator
                  </Link>{' '}
                  or{' '}
                  <Link href="/calculators/quick/hourly-rate" className="text-primary-600 hover:underline">
                    hourly rate calculator
                  </Link>{' '}
                  so the final quote includes material, gas, depreciation, and markup.
                </li>
              </ol>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="What does price per meter include?"
                  answer="This calculator estimates operating costs including electricity and labor per meter of cutting. Material costs and assist gas are not included in this quick estimate."
                />
                <FAQItem
                  question="How accurate is this quick calculator?"
                  answer="This provides a rough ballpark estimate based on internal cutting speed assumptions. Actual costs depend on your machine, parameters, and local rates, so always compare results against your own production data. For detailed quotes, use the full laser cutting calculator or your shop-specific cost models."
                />
                <FAQItem
                  question="Why does thickness affect price so much?"
                  answer="Thicker materials require slower cutting speeds, which increases the time (and thus labor and electricity cost) per meter of cut."
                />
                <FAQItem
                  question="Should I use this for customer quotes?"
                  answer="This is best for internal estimates and quick comparisons. For customer quotes, use the comprehensive calculator that includes all cost factors, or add material and gas costs manually."
                />
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/calculators/laser-cutting" className="card-hover group border-l-4 border-blue-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Full Laser Cutting Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Complete cost breakdown including materials, gas, depreciation, and detailed reports
                </p>
              </Link>

              <Link href="/calculators/quick/hourly-rate" className="card-hover group border-l-4 border-indigo-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Laser Hourly Rate Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate your true hourly operating cost including all overhead
                </p>
              </Link>

              <Link href="/calculators/quick-reference/cutting-speeds" className="card-hover group border-l-4 border-yellow-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Cutting Speeds Reference
                </h3>
                <p className="text-sm text-gray-600">
                  Benchmark cutting speeds for various materials and thicknesses
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
