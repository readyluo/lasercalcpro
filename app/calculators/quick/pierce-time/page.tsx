'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Timer, Zap, AlertCircle, Info } from 'lucide-react';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';

// Validation schema
const pierceTimeSchema = z.object({
  materialType: z.enum(['mild_steel', 'stainless_steel', 'aluminum', 'copper', 'brass']),
  thickness: z.number().min(0.5).max(50),
  laserPower: z.number().min(0.5).max(30),
  pierceCount: z.number().min(1).max(10000).default(100),
});

type PierceTimeInput = z.infer<typeof pierceTimeSchema>;

// Pierce time calculation based on material, thickness, and power
const PIERCE_BASE_TIME_MS: Record<string, (thickness: number, power: number) => number> = {
  mild_steel: (t, p) => {
    const baseTime = t <= 3 ? 50 : t <= 6 ? 150 : t <= 10 ? 400 : t <= 15 ? 800 : 1500;
    return baseTime * (6 / p) * 1000; // Convert to ms, adjust for power
  },
  stainless_steel: (t, p) => {
    const baseTime = t <= 3 ? 80 : t <= 6 ? 250 : t <= 10 ? 600 : t <= 15 ? 1200 : 2000;
    return baseTime * (6 / p) * 1000;
  },
  aluminum: (t, p) => {
    const baseTime = t <= 3 ? 60 : t <= 6 ? 180 : t <= 10 ? 500 : t <= 15 ? 1000 : 1800;
    return baseTime * (6 / p) * 1000;
  },
  brass: (t, p) => {
    const baseTime = t <= 3 ? 100 : t <= 6 ? 300 : t <= 10 ? 700 : t <= 15 ? 1400 : 2500;
    return baseTime * (6 / p) * 1000;
  },
  copper: (t, p) => {
    const baseTime = t <= 3 ? 120 : t <= 6 ? 350 : t <= 10 ? 850 : t <= 15 ? 1600 : 3000;
    return baseTime * (6 / p) * 1000;
  },
};

export default function PierceTimeCalculatorPage() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<PierceTimeInput>({
    resolver: zodResolver(pierceTimeSchema),
    defaultValues: {
      materialType: 'mild_steel',
      thickness: 3,
      laserPower: 6,
      pierceCount: 100,
    },
  });

  const [result, setResult] = React.useState<{
    pierceTimePerHole: number;
    totalPierceTime: number;
    pierceTimeMinutes: number;
    efficiency: string;
  } | null>(null);

  const watchedValues = watch();

  const howToSchema = generateCalculatorHowToSchema(
    'Pierce Time Estimator',
    'Calculate laser piercing time for accurate job costing',
    [
      { name: 'Select Material & Thickness', text: 'Choose material type and enter thickness' },
      { name: 'Enter Laser Power', text: 'Input your laser system power rating' },
      { name: 'Set Pierce Count', text: 'Enter number of holes to pierce in the job' },
      { name: 'Get Time Estimate', text: 'View per-hole and total piercing time' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'What is piercing in laser cutting?',
      answer: 'Piercing is the process of creating an initial hole through the material before cutting begins. The laser must burn through the full thickness at high power, which takes significantly longer than cutting along a line.',
    },
    {
      question: 'Why does piercing take so long on thick material?',
      answer: 'Thick materials require more energy to melt through completely. Piercing 10mm steel can take 0.4-0.8 seconds, while cutting at 1 m/min would traverse the same thickness in 0.6 seconds. For 100 holes, this adds 40-80 seconds of pure piercing time.',
    },
    {
      question: 'How can I reduce piercing time?',
      answer: 'Reduce pierce count by redesigning parts with fewer internal features, use common-line cutting where parts share edges, position small cutouts on part edges to eliminate piercing, and consider starting cuts from material edges when possible.',
    },
    {
      question: 'Does laser power affect pierce time?',
      answer: 'Yes, significantly. A 12kW laser pierces thick material 2x faster than a 6kW laser. However, piercing is often power-limited to prevent splatter damage, so the improvement may be less than 2x in practice.',
    },
  ]);

  const materialOptions = [
    { value: 'mild_steel', label: 'Mild Steel' },
    { value: 'stainless_steel', label: 'Stainless Steel' },
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'brass', label: 'Brass' },
    { value: 'copper', label: 'Copper' },
  ];

  const onSubmit = (data: PierceTimeInput) => {
    const pierceTimeMsPerHole = PIERCE_BASE_TIME_MS[data.materialType](data.thickness, data.laserPower);
    const totalPierceTimeMs = pierceTimeMsPerHole * data.pierceCount;
    const pierceTimeMinutes = totalPierceTimeMs / 60000;

    let efficiency = 'Good';
    if (pierceTimeMinutes > 5) efficiency = 'High pierce time - consider optimization';
    if (pierceTimeMinutes > 10) efficiency = 'Very high - redesign recommended';

    setResult({
      pierceTimePerHole: pierceTimeMsPerHole / 1000,
      totalPierceTime: totalPierceTimeMs / 1000,
      pierceTimeMinutes,
      efficiency,
    });
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Pierce Time Estimator
            </h1>
            <p className="text-xl text-gray-600">
              Calculate laser piercing time for accurate cost estimates and job planning
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div className="card sticky top-24 h-fit">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Job Parameters</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Select
                  {...register('materialType')}
                  label="Material Type"
                  options={materialOptions}
                  error={errors.materialType?.message}
                  required
                />

                <Input
                  {...register('thickness', { valueAsNumber: true })}
                  type="number"
                  step="0.1"
                  label="Material Thickness (mm)"
                  error={errors.thickness?.message}
                  leftIcon={<Zap className="h-4 w-4" />}
                  required
                />

                <Input
                  {...register('laserPower', { valueAsNumber: true })}
                  type="number"
                  step="0.5"
                  label="Laser Power (kW)"
                  error={errors.laserPower?.message}
                  leftIcon={<Zap className="h-4 w-4" />}
                  required
                />

                <Input
                  {...register('pierceCount', { valueAsNumber: true })}
                  type="number"
                  step="1"
                  label="Number of Holes to Pierce"
                  error={errors.pierceCount?.message}
                  leftIcon={<Timer className="h-4 w-4" />}
                  required
                />

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Calculate Pierce Time
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </form>

              {/* Quick Info */}
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div className="text-sm text-gray-700">
                    <p className="mb-2 font-semibold">Pierce Time Impact:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>Increases linearly with hole count</li>
                      <li>Can represent 20-40% of total job time</li>
                      <li>Often overlooked in manual quotes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div className="space-y-6">
                  {/* Main Results */}
                  <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Pierce Time Results</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <span className="text-gray-700">Pierce Time per Hole:</span>
                        <span className="text-2xl font-bold text-gray-900">
                          {result.pierceTimePerHole.toFixed(3)} sec
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <span className="text-gray-700">Total Pierce Time:</span>
                        <span className="text-2xl font-bold text-green-600">
                          {result.totalPierceTime.toFixed(1)} sec
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <span className="text-gray-700">Pierce Time (minutes):</span>
                        <span className="text-2xl font-bold text-gray-900">
                          {result.pierceTimeMinutes.toFixed(2)} min
                        </span>
                      </div>

                      <div className="rounded-lg bg-white p-4">
                        <div className="flex items-start gap-3">
                          {result.efficiency.includes('optimization') || result.efficiency.includes('redesign') ? (
                            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                          ) : (
                            <Timer className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">Efficiency Assessment:</p>
                            <p className="text-gray-700">{result.efficiency}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Impact */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Cost Impact</h3>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 font-semibold text-gray-900">At $50/hour labor rate:</p>
                        <p className="text-gray-700">
                          Pierce time adds <span className="font-bold">${(result.pierceTimeMinutes * 50 / 60).toFixed(2)}</span> to job cost
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 font-semibold text-gray-900">At $100/hour machine rate:</p>
                        <p className="text-gray-700">
                          Pierce time adds <span className="font-bold">${(result.pierceTimeMinutes * 100 / 60).toFixed(2)}</span> to job cost
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Optimization Tips */}
                  {result.pierceTimeMinutes > 3 && (
                    <div className="card border-l-4 border-orange-500 bg-orange-50">
                      <h3 className="mb-4 text-xl font-bold text-gray-900">Optimization Recommendations</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 text-orange-500">▸</span>
                          <span>Combine parts to reduce total pierce count</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 text-orange-500">▸</span>
                          <span>Move small holes to part edges (no piercing needed)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 text-orange-500">▸</span>
                          <span>Use common-line cutting for nested parts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 text-orange-500">▸</span>
                          <span>Consider higher-power laser for thick material production</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card flex h-64 items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Timer className="mx-auto mb-4 h-12 w-12" />
                    <p>Enter parameters to calculate pierce time</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reference Data */}
          <div className="card mt-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Pierce Time Reference (6kW Fiber Laser)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-3 text-left font-semibold">Material</th>
                    <th className="pb-3 text-right font-semibold">1mm</th>
                    <th className="pb-3 text-right font-semibold">3mm</th>
                    <th className="pb-3 text-right font-semibold">6mm</th>
                    <th className="pb-3 text-right font-semibold">10mm</th>
                    <th className="pb-3 text-right font-semibold">15mm</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium">Mild Steel</td>
                    <td className="py-3 text-right">0.05s</td>
                    <td className="py-3 text-right">0.15s</td>
                    <td className="py-3 text-right">0.4s</td>
                    <td className="py-3 text-right">0.8s</td>
                    <td className="py-3 text-right">1.5s</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium">Stainless Steel</td>
                    <td className="py-3 text-right">0.08s</td>
                    <td className="py-3 text-right">0.25s</td>
                    <td className="py-3 text-right">0.6s</td>
                    <td className="py-3 text-right">1.2s</td>
                    <td className="py-3 text-right">2.0s</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium">Aluminum</td>
                    <td className="py-3 text-right">0.06s</td>
                    <td className="py-3 text-right">0.18s</td>
                    <td className="py-3 text-right">0.5s</td>
                    <td className="py-3 text-right">1.0s</td>
                    <td className="py-3 text-right">1.8s</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-medium">Brass</td>
                    <td className="py-3 text-right">0.10s</td>
                    <td className="py-3 text-right">0.30s</td>
                    <td className="py-3 text-right">0.7s</td>
                    <td className="py-3 text-right">1.4s</td>
                    <td className="py-3 text-right">2.5s</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Copper</td>
                    <td className="py-3 text-right">0.12s</td>
                    <td className="py-3 text-right">0.35s</td>
                    <td className="py-3 text-right">0.85s</td>
                    <td className="py-3 text-right">1.6s</td>
                    <td className="py-3 text-right">3.0s</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              Pierce times are approximate and vary with laser power, gas pressure, nozzle condition, and material quality.
              Times scale inversely with power (12kW ≈ 0.5× these values).
            </p>
          </div>

          {/* Educational Content */}
          <div className="card mt-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Understanding Pierce Time</h2>
            
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold text-gray-900">What Is Piercing?</h3>
              <p className="text-gray-700">
                Piercing is the process of creating an initial hole through the material before the laser begins cutting a contour. 
                The laser must burn completely through the material at a single point, which requires significantly more time than 
                cutting along a line because there's no forward motion to distribute the heat.
              </p>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">Why Pierce Time Matters</h3>
              <p className="text-gray-700">
                Pierce time is often overlooked in manual quotes, but it can represent 20-40% of total job time for parts with many 
                small features. For example, a 100-hole part in 10mm steel requires 40-80 seconds of pure piercing time before any 
                cutting begins. At $100/hour machine rate, that's $1.10-2.20 just for piercing.
              </p>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">Pierce Time vs. Cutting Time</h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="mb-2 font-semibold text-gray-900">Example: 10mm Mild Steel with 6kW Fiber Laser</p>
                <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700">
                  <li>Pierce time: 0.8 seconds per hole</li>
                  <li>Cutting speed: 1 m/min = 16.7 mm/sec</li>
                  <li>Cutting 10mm would take: 0.6 seconds</li>
                  <li>Result: Piercing takes 33% longer than cutting the same thickness</li>
                </ul>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">Cost-Effective Pierce Reduction Strategies</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">1. Edge Starts</h4>
                  <p className="text-sm text-gray-700">
                    Position features on part edges to eliminate piercing. A slot that reaches the edge requires no pierce.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">2. Common-Line Cutting</h4>
                  <p className="text-sm text-gray-700">
                    Nest parts so they share cutting lines. Each shared line eliminates one pierce.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">3. Feature Consolidation</h4>
                  <p className="text-sm text-gray-700">
                    Replace multiple small holes with fewer larger features where functionally acceptable.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">4. Batch Processing</h4>
                  <p className="text-sm text-gray-700">
                    Group similar parts to amortize setup time and maximize material utilization, reducing pierce count per part.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card mt-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="What is piercing in laser cutting?"
                answer="Piercing is the process of creating an initial hole through the material before cutting begins. The laser must burn through the full thickness at high power, which takes significantly longer than cutting along a line."
              />
              <FAQItem
                question="Why does piercing take so long on thick material?"
                answer="Thick materials require more energy to melt through completely. Piercing 10mm steel can take 0.4-0.8 seconds, while cutting at 1 m/min would traverse the same thickness in 0.6 seconds. For 100 holes, this adds 40-80 seconds of pure piercing time."
              />
              <FAQItem
                question="How can I reduce piercing time?"
                answer="Reduce pierce count by redesigning parts with fewer internal features, use common-line cutting where parts share edges, position small cutouts on part edges to eliminate piercing, and consider starting cuts from material edges when possible."
              />
              <FAQItem
                question="Does laser power affect pierce time?"
                answer="Yes, significantly. A 12kW laser pierces thick material 2x faster than a 6kW laser. However, piercing is often power-limited to prevent splatter damage, so the improvement may be less than 2x in practice."
              />
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Calculators</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/calculators/quick/price-per-meter"
                className="card-hover group border-l-4 border-blue-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Price per Meter
                </h3>
                <p className="text-sm text-gray-600">
                  Quick cost estimate per meter of cutting
                </p>
              </Link>

              <Link
                href="/calculators/quick/hourly-rate"
                className="card-hover group border-l-4 border-green-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Laser Hourly Rate
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate true hourly operating cost
                </p>
              </Link>

              <Link
                href="/calculators/laser-cutting"
                className="card-hover group border-l-4 border-purple-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Full Laser Cutting Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Complete job costing with all parameters
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        className="flex w-full items-start justify-between gap-4 p-4 text-left hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className="flex-shrink-0 text-gray-400">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-3">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}




























