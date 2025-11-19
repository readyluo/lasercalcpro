'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema, generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Zap, Info, Gauge, Calculator } from 'lucide-react';

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
  const softwareSchema = generateSoftwareApplicationSchema('Cutting Speeds Reference');
  const faqSchema = generateFAQSchema([
    {
      question: 'What factors affect laser cutting speed?',
      answer: 'Material type, thickness, laser power, assist gas type and pressure, focus position, nozzle design, and desired edge quality all significantly impact cutting speed.',
    },
    {
      question: 'Why is oxygen faster than nitrogen for mild steel?',
      answer: 'Oxygen creates an exothermic reaction that adds heat to the cutting process and can enable higher cutting speeds in many setups, at the cost of an oxidized edge. Nitrogen produces cleaner, oxide-free edges but may require slower feeds for similar quality. Actual speed differences depend on your machine, parameters, and quality targets.',
    },
    {
      question: 'How do I convert m/min to in/min?',
      answer: 'Multiply meters per minute by 39.37 to get inches per minute. For example, 5 m/min = 196.85 in/min (approximately 197 IPM).',
    },
  ]);

  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={softwareSchema} />
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
                <h1 className="text-4xl font-bold text-gray-900">Laser Cutting Speeds Quick Reference</h1>
                <p className="text-gray-600">Example fiber laser cutting speed benchmarks under tuned parameters. Always verify against your own machine and cut charts.</p>
              </div>
            </div>
          </div>

          {/* Mild Steel Table */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Mild Steel (Carbon Steel)</h2>
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
              In many setups, O₂ (oxygen) cutting can achieve higher speeds but leaves oxidized edges. N₂ (nitrogen) is typically used when cleaner, oxide-free edges are required, often at different feed rates. Use these rows as starting points and fine-tune for your own equipment.
            </p>
          </div>

          {/* Stainless Steel Table */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Stainless Steel 304/316</h2>
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
              Nitrogen is commonly used for oxide-free edges. Specific assist gas pressures should follow your machine supplier's cut charts and application notes rather than a single generic range.
            </p>
          </div>

          {/* Aluminum Table */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Aluminum (5052, 6061)</h2>
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
              These benchmarks assume a fiber laser, since high reflectivity makes many aluminum jobs challenging for typical CO₂ systems. Always follow your machine documentation for which aluminum grades and thicknesses are supported.
            </p>
          </div>

          {/* Units & Conversion */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Gauge className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Units & Conversion Checklist</h2>
                <p className="mt-1 text-gray-700">
                  Feed rates here are shown in meters per minute (m/min) as illustrative production benchmarks.
                  Keep every note in a consistent unit system before driving quotes or machine programs, and confirm final feeds against your own process limits.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Speed conversion</p>
                <p className="text-gray-700">IPM (in/min) = m/min x 39.37</p>
                <div className="mt-3 rounded bg-white p-3 font-mono text-xs text-gray-900">
                  197 IPM = 5 m/min x 39.37
                </div>
                <p className="mt-2 text-gray-600">Use this factor when entering feeds into legacy CAM posts.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Material shorthand</p>
                <p className="text-gray-700">
                  Thickness values (t) are in millimeters. Laser power values refer to optical output; actual electrical draw will be higher and depends on machine efficiency. Assist gas notes assume high-purity nitrogen or oxygen at typical cutting pressures for these materials.
                </p>
                <p className="mt-2 text-gray-700">
                  Keep your machine's measured kerf width in your CAM profile when matching these feeds; in many fiber setups this is on the order of a small fraction of a millimeter.
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              Need nozzle, focus, or pierce timing guidance? Review the{' '}
              <Link
                href="/calculators/quick-reference/processing-parameters"
                className="text-primary-700 underline-offset-2 hover:underline"
              >
                processing parameters reference
              </Link>{' '}
              for the rest of the stack.
            </p>
          </div>

          {/* Workflow */}
          <div className="card mb-8 bg-gradient-to-br from-primary-50 to-blue-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-primary-100 p-2">
                <Calculator className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">How to Use These Speeds</h2>
                <p className="mt-1 text-gray-700">
                  Turn feed benchmarks into costed quotes by pairing them with our calculators.
                </p>
              </div>
            </div>
            <ol className="space-y-4 text-sm text-gray-800">
              <li>
                <span className="font-semibold text-gray-900">1. Select a baseline.</span> Match material, thickness,
                and optical power from the tables above, then note the mid-point of the speed range.
              </li>
              <li>
                <span className="font-semibold text-gray-900">2. Convert the feed into machine time.</span> Enter the
                m/min value in the{' '}
                <Link
                  href="/calculators/quick/price-per-meter"
                  className="text-primary-700 underline-offset-2 hover:underline"
                >
                  Price per Meter calculator
                </Link>{' '}
                or plug it directly into the{' '}
                <Link
                  href="/calculators/laser-cutting"
                  className="text-primary-700 underline-offset-2 hover:underline"
                >
                  full laser cutting calculator
                </Link>{' '}
                to compute cycle time and machine cost.
              </li>
              <li>
                <span className="font-semibold text-gray-900">3. Adjust for quality requirements.</span> Reduce speed
                as needed for weld-ready or painted edges, and prioritize faster benchmark feeds only where a slight
                dross line is acceptable. Use trial cuts and inspection to decide how much to change speed for each job.
              </li>
            </ol>
          </div>

          {/* Important Notes */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Important Notes</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Baseline parameters for this chart</h3>
                <p className="text-gray-700">
                  These tables were compiled from example data for modern fiber lasers across a typical power range, with common spot sizes, nozzle sizes, and high-purity gases.
                  Older CO₂ equipment or setups with poorer alignment, beam quality, or gas purity will often run slower than these benchmarks. Always confirm speeds against your own cut charts and sample cuts.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Focus & pierce settings matter</h3>
                <p className="text-gray-700">
                  Focus position and pierce settings strongly affect cut quality, reliability, and speed. Use your machine's parameter library and application notes as a starting point, then log the combinations that work well for your materials and thicknesses so you can reuse them in future nests.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">These are Benchmark Values</h3>
                <p className="text-gray-700">
                  Actual cutting speeds vary based on equipment brand, beam quality, focus lens, nozzle design, 
                  gas purity and pressure, material quality, and desired edge quality. Use these as starting points 
                  and optimize for your specific setup.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Power Requirements</h3>
                <p className="text-gray-700">
                  Higher power lasers can cut thicker materials and/or cut faster, but the practical limits and benefits depend on your specific machine and optics.
                  In many shops, lower-power sources are used mainly for thin sheet and higher-power sources for thicker plate; follow your machine supplier's material and thickness guidelines instead of relying on a single generic mapping.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Edge Quality Trade-offs</h3>
                <p className="text-gray-700">
                  Faster feeds generally increase burr height and discoloration. For parts that require welding, painting, or food-grade finishes, you may need slower feeds, higher assist gas pressure, or a finishing pass; for less demanding parts, you might prioritize shorter machine time.
                  Use test cuts and inspection to find a balance between edge quality and throughput that fits your work.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="What factors affect laser cutting speed?"
                answer="Material type, thickness, laser power, assist gas type and pressure, focus position, nozzle design, and desired edge quality all significantly impact cutting speed."
              />
              <FAQItem
                question="Why is oxygen faster than nitrogen for mild steel?"
                answer="Oxygen creates an exothermic reaction that adds heat to the cutting process and can enable higher cutting speeds in many setups, at the cost of an oxidized edge. Nitrogen produces cleaner, oxide-free edges but may require different feeds for similar quality. Actual speed differences depend on your machine, parameters, and quality targets."
              />
              <FAQItem
                question="How do I convert m/min to in/min?"
                answer="Multiply meters per minute by 39.37 to get inches per minute. For example, 5 m/min = 196.85 in/min (approximately 197 IPM)."
              />
              <FAQItem
                question="Can I cut faster with more power?"
                answer="Yes, but with diminishing returns. Doubling power does not usually double speed. In many 3mm mild steel applications, moving from 3kW to 6kW yields noticeably faster but less-than-proportional speed increases. Beyond the power level that your machine and material are optimized for, additional gains can be modest."
              />
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Tools</h2>
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
