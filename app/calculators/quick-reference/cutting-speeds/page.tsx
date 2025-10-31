'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Zap, Info } from 'lucide-react';

const mildSteelRows = [
  { t: '0.5mm', speed: '20-25 m/min', power: '1-2 kW', gas: 'O₂ or N₂' },
  { t: '1mm', speed: '15-20 m/min', power: '2-3 kW', gas: 'O₂ or N₂' },
  { t: '2mm', speed: '8-12 m/min', power: '3-4 kW', gas: 'O₂' },
  { t: '3mm', speed: '4-6 m/min', power: '4-6 kW', gas: 'O₂' },
  { t: '5mm', speed: '2-3 m/min', power: '6-8 kW', gas: 'O₂' },
  { t: '6mm', speed: '1.5-2.2 m/min', power: '6-10 kW', gas: 'O₂' },
  { t: '10mm', speed: '0.8-1.2 m/min', power: '10-12 kW', gas: 'O₂' },
  { t: '15mm', speed: '0.4-0.6 m/min', power: '12-15 kW', gas: 'O₂' },
];

const stainlessRows = [
  { t: '0.5mm', speed: '15-18 m/min', power: '1-2 kW', gas: 'N₂' },
  { t: '1mm', speed: '10-14 m/min', power: '2-3 kW', gas: 'N₂' },
  { t: '2mm', speed: '6-8 m/min', power: '3-4 kW', gas: 'N₂' },
  { t: '3mm', speed: '3-4 m/min', power: '4-6 kW', gas: 'N₂' },
  { t: '5mm', speed: '1.5-2 m/min', power: '6-8 kW', gas: 'N₂' },
  { t: '6mm', speed: '1.2-1.6 m/min', power: '8-10 kW', gas: 'N₂' },
  { t: '10mm', speed: '0.6-0.8 m/min', power: '10-12 kW', gas: 'N₂' },
];

const aluminumRows = [
  { t: '1mm', speed: '12-16 m/min', power: '2-3 kW', gas: 'N₂' },
  { t: '2mm', speed: '8-10 m/min', power: '3-4 kW', gas: 'N₂' },
  { t: '3mm', speed: '5-7 m/min', power: '4-6 kW', gas: 'N₂' },
  { t: '4mm', speed: '3-4 m/min', power: '6-8 kW', gas: 'N₂' },
  { t: '5mm', speed: '2-3 m/min', power: '8-10 kW', gas: 'N₂' },
  { t: '6mm', speed: '1.5-2 m/min', power: '10-12 kW', gas: 'N₂' },
];

export default function CuttingSpeedsQuickReferencePage() {
  const faqSchema = generateFAQSchema([
    {
      question: 'What factors affect laser cutting speed?',
      answer: 'Material type, thickness, laser power, assist gas type and pressure, focus position, nozzle design, and desired edge quality all significantly impact cutting speed.',
    },
    {
      question: 'Why is oxygen faster than nitrogen for mild steel?',
      answer: 'Oxygen creates an exothermic reaction that adds heat to the cutting process, allowing 20-30% faster speeds. However, it leaves an oxidized edge. Nitrogen produces cleaner edges but cuts slower.',
    },
    {
      question: 'How do I convert m/min to in/min?',
      answer: 'Multiply meters per minute by 39.37 to get inches per minute. For example, 5 m/min = 196.85 in/min (approximately 197 IPM).',
    },
  ]);

  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 p-3">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Laser Cutting Speeds Quick Reference</h1>
                <p className="text-gray-600">Fiber laser benchmarks with optimized parameters</p>
              </div>
            </div>
          </div>

          {/* Mild Steel Table */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Mild Steel (Carbon Steel)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Thickness</th>
                    <th className="pb-2 text-left font-semibold">Speed</th>
                    <th className="pb-2 text-left font-semibold">Laser Power</th>
                    <th className="pb-2 text-left font-semibold">Assist Gas</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {mildSteelRows.map((r, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{r.t}</td>
                      <td className="py-2">{r.speed}</td>
                      <td className="py-2">{r.power}</td>
                      <td className="py-2">{r.gas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              O₂ (oxygen) cutting is 20-30% faster but leaves oxidized edges. N₂ (nitrogen) provides cleaner edges.
            </p>
          </div>

          {/* Stainless Steel Table */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Stainless Steel 304/316</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Thickness</th>
                    <th className="pb-2 text-left font-semibold">Speed</th>
                    <th className="pb-2 text-left font-semibold">Laser Power</th>
                    <th className="pb-2 text-left font-semibold">Assist Gas</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {stainlessRows.map((r, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{r.t}</td>
                      <td className="py-2">{r.speed}</td>
                      <td className="py-2">{r.power}</td>
                      <td className="py-2">{r.gas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Nitrogen required for oxide-free edges. High gas pressure (12-20 bar) recommended.
            </p>
          </div>

          {/* Aluminum Table */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Aluminum (5052, 6061)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Thickness</th>
                    <th className="pb-2 text-left font-semibold">Speed</th>
                    <th className="pb-2 text-left font-semibold">Laser Power</th>
                    <th className="pb-2 text-left font-semibold">Assist Gas</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {aluminumRows.map((r, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{r.t}</td>
                      <td className="py-2">{r.speed}</td>
                      <td className="py-2">{r.power}</td>
                      <td className="py-2">{r.gas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Requires fiber laser due to high reflectivity. CO₂ lasers cannot cut aluminum efficiently.
            </p>
          </div>

          {/* Important Notes */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Important Notes</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">These are Benchmark Values</h3>
                <p className="text-gray-700">
                  Actual cutting speeds vary based on equipment brand, beam quality, focus lens, nozzle design, 
                  gas purity and pressure, material quality, and desired edge quality. Use these as starting points 
                  and optimize for your specific setup.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Power Requirements</h3>
                <p className="text-gray-700">
                  Higher power lasers can cut thicker materials and/or cut faster. A 3kW laser is suitable for 
                  up to 6mm mild steel, while 6kW handles up to 12mm, and 12kW+ for 15-25mm thick plates.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Edge Quality Trade-offs</h3>
                <p className="text-gray-700">
                  Faster speeds may produce more dross (slag) on the bottom edge. For critical applications, 
                  reduce speed by 10-20% to achieve cleaner cuts. For non-critical parts, maximize speed to 
                  reduce cost.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="What factors affect laser cutting speed?"
                answer="Material type, thickness, laser power, assist gas type and pressure, focus position, nozzle design, and desired edge quality all significantly impact cutting speed."
              />
              <FAQItem
                question="Why is oxygen faster than nitrogen for mild steel?"
                answer="Oxygen creates an exothermic reaction that adds heat to the cutting process, allowing 20-30% faster speeds. However, it leaves an oxidized edge. Nitrogen produces cleaner edges but cuts slower."
              />
              <FAQItem
                question="How do I convert m/min to in/min?"
                answer="Multiply meters per minute by 39.37 to get inches per minute. For example, 5 m/min = 196.85 in/min (approximately 197 IPM)."
              />
              <FAQItem
                question="Can I cut faster with more power?"
                answer="Yes, but with diminishing returns. Doubling power doesn't double speed. A 6kW laser cuts mild steel 3mm about 40-50% faster than 3kW, not 100% faster. Beyond optimal power for a thickness, gains are minimal."
              />
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/calculators/quick/price-per-meter" className="card-hover group border-l-4 border-blue-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Price per Meter Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Estimate operating cost per meter using these speed benchmarks
                </p>
              </Link>

              <Link href="/calculators/laser-cutting" className="card-hover group border-l-4 border-blue-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Full Laser Cutting Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Complete cost analysis with material, gas, and labor costs
                </p>
              </Link>

              <Link href="/calculators/quick-reference/assist-gas" className="card-hover group border-l-4 border-green-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Assist Gas Reference
                </h3>
                <p className="text-sm text-gray-600">
                  Gas selection guide and cost comparison
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


