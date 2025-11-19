'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema, generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Wind, DollarSign, Info, Gauge, Workflow } from 'lucide-react';

const gasComparison = [
  {
    gas: 'Oxygen (O2)',
    bestFor: 'Mild steel, carbon steel',
    advantages: [
      'Can enable higher cutting speeds in many setups',
      'Often lower unit gas cost (for example, $0.10-0.30/m3 in some markets)',
      'Exothermic reaction adds heat',
    ],
    disadvantages: ['Oxidized (black) edges', 'Not suitable for stainless/aluminum', 'Requires post-processing for painted parts'],
    typicalPressure: '0.5-2 bar (example range)',
    consumption: '0.5-2 m3/hr (example range)',
  },
  {
    gas: 'Nitrogen (N2)',
    bestFor: 'Stainless steel, aluminum, brass, copper',
    advantages: ['Clean, oxide-free edges', 'Often reduces or removes post-processing', 'Suitable for painted/coated parts'],
    disadvantages: [
      'Higher unit cost in many contracts (for example, $0.50-2.00/m3)',
      'May require slower feeds than O2 at similar edge quality',
      'Typically run at elevated assist gas pressures (for example, 12-20 bar)',
    ],
    typicalPressure: '12-20 bar (example range)',
    consumption: '2-8 m3/hr (example range)',
  },
  {
    gas: 'Air (Compressed)',
    bestFor: 'Thin mild steel (<3 mm), general purpose',
    advantages: ['Lowest cost (compressor only)', 'Suitable for non-critical parts', 'No gas supply needed'],
    disadvantages: ['Limited thickness capability', 'Moderate edge quality', 'Requires oil-free compressor'],
    typicalPressure: '8-15 bar',
    consumption: 'Compressor-dependent',
  },
];

export default function AssistGasQuickReferencePage() {
  const faqSchema = generateFAQSchema([
    {
      question: 'When should I use nitrogen vs oxygen?',
      answer:
        'For mild steel jobs where an oxidized edge is acceptable, oxygen is often used because it can enable higher cutting speeds and has a lower unit gas cost in many contracts. Nitrogen is more commonly used for stainless steel, aluminum, and parts that need clean, oxide-free edges for painting or welding. Always confirm with sample cuts and your own quality requirements.',
    },
    {
      question: 'Is on-site nitrogen generation worth it?',
      answer:
        'Whether on-site nitrogen generation makes sense depends on your nitrogen hours, local gas and electricity prices, generator cost, and financing. Use your own consumption data together with an ROI or energy calculator and supplier proposals instead of relying on a single hour-per-week threshold or payback period. Typical generators on the market may cost on the order of $30k-80k, and many shops see lower unit nitrogen costs once they are properly utilized.',
    },
    {
      question: 'Can I use air instead of nitrogen?',
      answer:
        'Compressed air is sometimes used for thin mild steel and non-critical applications where moderate edge quality is acceptable. It often sits between oxygen and nitrogen in terms of edge appearance. Always follow your laser and compressor manufacturer guidance on allowable thicknesses and pressures, and use oil-free air where required.',
    },
  ]);
  const softwareSchema = generateSoftwareApplicationSchema('Assist Gas Reference');

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
              <div className="rounded-full bg-green-100 p-3">
                <Wind className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Assist Gas Cost & Selection Guide</h1>
                <p className="text-gray-600">Choose the right assist gas for your application and optimize costs</p>
              </div>
            </div>
          </div>

          {/* Gas Comparison Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            {gasComparison.map((gas, i) => (
              <div key={i} className="card border-l-4 border-primary-600">
                <h2 className="mb-3 text-xl font-bold text-gray-900">{gas.gas}</h2>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600">Best For:</p>
                  <p className="text-gray-800">{gas.bestFor}</p>
                </div>
                
                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-green-700">Advantages:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {gas.advantages.map((adv, j) => (
                      <li key={j}>{adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-red-700">Disadvantages:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {gas.disadvantages.map((dis, j) => (
                      <li key={j}>{dis}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pressure:</span>
                    <span className="font-semibold">{gas.typicalPressure}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Consumption:</span>
                    <span className="font-semibold">{gas.consumption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Comparison Table */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Cost Comparison by Application</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Application</th>
                    <th className="pb-2 text-left font-semibold">Recommended Gas</th>
                    <th className="pb-2 text-right font-semibold">Cost per Hour</th>
                    <th className="pb-2 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-2">Mild Steel (structural)</td>
                    <td className="py-2">Oxygen</td>
                    <td className="py-2 text-right">$0.50-1.50</td>
                    <td className="py-2 text-xs">Fastest, lowest cost</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Mild Steel (for painting)</td>
                    <td className="py-2">Nitrogen</td>
                    <td className="py-2 text-right">$2.00-5.00</td>
                    <td className="py-2 text-xs">Clean edges, no grinding</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Stainless Steel</td>
                    <td className="py-2">Nitrogen</td>
                    <td className="py-2 text-right">$3.00-6.00</td>
                    <td className="py-2 text-xs">Required for quality</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Aluminum</td>
                    <td className="py-2">Nitrogen</td>
                    <td className="py-2 text-right">$2.50-5.00</td>
                    <td className="py-2 text-xs">High pressure needed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Thin sheets (&lt;3 mm)</td>
                    <td className="py-2">Air</td>
                    <td className="py-2 text-right">$0.20-0.50</td>
                    <td className="py-2 text-xs">Compressor cost only</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Costs in this table assume bottled gas delivery and are illustrative only. On-site generation can reduce effective nitrogen unit cost in many scenarios; actual savings depend on your equipment, tariffs, and utilization.
            </p>
          </div>

          {/* On-Site Generation Analysis */}
          <div className="card mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">On-Site Nitrogen Generation</h2>
                <p className="mt-1 text-gray-700">When does it make sense to invest in your own nitrogen generator?</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Bottled Nitrogen Costs</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cost per m3:</span>
                    <span className="font-semibold">$0.50-2.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Typical consumption:</span>
                    <span className="font-semibold">4 m3/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per hour:</span>
                    <span className="font-semibold">$2.00-8.00</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Annual cost (example 40 hrs/wk):</span>
                    <span className="text-red-600">$4,160-16,640</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Generator Investment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Equipment cost:</span>
                    <span className="font-semibold">$30k-80k</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operating cost:</span>
                    <span className="font-semibold">$0.15-0.50/m3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual operating:</span>
                    <span className="font-semibold">$1,248-4,160</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Example payback range:</span>
                    <span className="text-green-600">varies with usage, pricing, and financing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-primary-100 p-4">
              <p className="text-sm text-gray-800">
                <strong>Planning Tip:</strong> Shops with sustained nitrogen usage sometimes find that on-site generation
                becomes cost-effective over time. Use your own hours of nitrogen cutting, gas and electricity rates, and
                generator quotes as inputs to an ROI or energy-cost calculator to estimate payback and long-term savings
                instead of relying on a single rule-of-thumb threshold.
              </p>
            </div>
          </div>

          {/* Flow & Pressure Reference */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Gauge className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Flow & Pressure Reference</h2>
                <p className="mt-1 text-gray-700">Keep conversion factors handy when translating supplier data.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Common conversions</p>
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  <li>1 bar = 14.5 psi (12 bar nitrogen = 174 psi).</li>
                  <li>m3/hr = SCFH x 0.472; SCFH = m3/hr x 2.12.</li>
                  <li>kg/cm2 roughly equals bar for quick mental math.</li>
                </ul>
                <p className="mt-2 text-gray-600">
                  Validate flow references when comparing European spec sheets to US pricing.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Setup checklist</p>
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  <li>Log gas purity (99.5%+ for stainless) and dew point (-40 C or better).</li>
                  <li>Confirm regulator Cv and hose ID match the required flow rate.</li>
                  <li>
                    Record nozzle size/focus inside your{' '}
                    <Link
                      href="/calculators/quick-reference/processing-parameters"
                      className="text-primary-700 underline-offset-2 hover:underline"
                    >
                      processing parameter sheet
                    </Link>{' '}
                    for repeatability.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Info className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Gas Cost Optimization Tips</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">1. Choose the Right Gas for Each Job</h3>
                <p className="text-gray-700">
                  Do not use expensive nitrogen when oxygen will work. For structural mild steel parts that will be 
                  painted, the oxidized edge gets covered anyway. Save nitrogen for stainless, aluminum, and parts 
                  requiring clean edges.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">2. Optimize Gas Pressure</h3>
                <p className="text-gray-700">
                  Excessive pressure can waste gas without improving cut quality. Start from your machine or supplier
                  recommended pressure, then adjust in small steps while checking edge quality and cut stability.
                  Use flow meters or supplier guidance to understand how changes in pressure affect actual gas use for
                  your setup.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">3. Fix Leaks Promptly</h3>
                <p className="text-gray-700">
                  Even small leaks in your gas system can accumulate into meaningful annual cost. Check connections
                  regularly with leak detection spray and use your own gas pricing to estimate the financial impact.
                  Common leak points include quick disconnects, regulators, and nozzle seals.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">4. Consider Bulk Gas Delivery</h3>
                <p className="text-gray-700">
                  If your nitrogen consumption is consistently high, bulk liquid delivery may offer lower unit pricing
                  than high-pressure cylinders. Discuss volume tiers, tank requirements, and long-term pricing with your
                  gas supplier rather than relying on a single bottle-per-week threshold.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">5. Use Air for Non-Critical Parts</h3>
                <p className="text-gray-700">
                  For thin mild steel prototype parts, test pieces, or internal brackets, compressed air can provide 
                  acceptable quality at minimal cost. Invest in an oil-free compressor with adequate CFM.
                </p>
              </div>
            </div>
          </div>

          {/* Workflow Integration */}
          <div className="card mb-8 bg-gradient-to-br from-primary-50 to-blue-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-primary-100 p-2">
                <Workflow className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Cost Workflow Checklist</h2>
                <p className="mt-1 text-gray-700">
                  Tie gas pricing to the calculators so every quote reflects real consumption.
                </p>
              </div>
            </div>
            <ol className="space-y-4 text-sm text-gray-800">
              <li>
                <span className="font-semibold text-gray-900">1. Capture contract pricing.</span> Store cylinder rental,
                delivery fees, purity, and pressure requirements inside your sourcing log so operators and estimators
                share the same assumptions.
              </li>
              <li>
                <span className="font-semibold text-gray-900">2. Convert to hourly cost.</span> Feed flow (m3/hr) and
                price per m3 into the{' '}
                <Link
                  href="/calculators/quick/hourly-rate"
                  className="text-primary-700 underline-offset-2 hover:underline"
                >
                  Hourly Rate calculator
                </Link>{' '}
                or{' '}
                <Link href="/calculators/energy" className="text-primary-700 underline-offset-2 hover:underline">
                  Energy reference
                </Link>{' '}
                to keep shop-rate math aligned with energy usage.
              </li>
              <li>
                <span className="font-semibold text-gray-900">3. Push per-part cost downstream.</span> Apply the hourly
                gas cost inside the{' '}
                <Link href="/calculators/laser-cutting" className="text-primary-700 underline-offset-2 hover:underline">
                  Laser Cutting calculator
                </Link>{' '}
                or{' '}
                <Link href="/calculators/quick/price-per-meter" className="text-primary-700 underline-offset-2 hover:underline">
                  Price per Meter tool
                </Link>{' '}
                so final quotes show true margin impact.
              </li>
            </ol>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="When should I use nitrogen vs oxygen?"
                answer="For mild steel jobs where an oxidized edge is acceptable, oxygen is often used because it can enable higher cutting speeds and has a lower unit gas cost in many contracts. Nitrogen is more commonly used for stainless steel, aluminum, and parts that need clean, oxide-free edges for painting or welding. Always confirm with sample cuts and your own quality requirements."
              />
              <FAQItem
                question="Is on-site nitrogen generation worth it?"
                answer="Whether on-site nitrogen generation makes sense depends on your nitrogen hours, local gas and electricity prices, generator cost, and financing. Use your own consumption data together with an ROI or energy calculator and supplier proposals instead of relying on a single hour-per-week threshold or payback period. Typical generators on the market may cost on the order of $30k-80k, and many shops see lower unit nitrogen costs once they are properly utilized."
              />
              <FAQItem
                question="Can I use air instead of nitrogen?"
                answer="Compressed air is sometimes used for thin mild steel and non-critical applications where moderate edge quality is acceptable. It often sits between oxygen and nitrogen in terms of edge appearance. Always follow your laser and compressor manufacturer guidance on allowable thicknesses and pressures, and use oil-free air where required."
              />
              <FAQItem
                question="Why is nitrogen so expensive?"
                answer="Nitrogen requires cryogenic separation or PSA generation, plus high-pressure storage and delivery. Bottled nitrogen includes production, compression, transportation, and cylinder rental costs. On-site generation eliminates most of these costs."
              />
              <FAQItem
                question="What purity nitrogen do I need?"
                answer="99.5-99.9% purity is standard for laser cutting. Higher purity (99.999%) is unnecessary and more expensive. Lower purity (<99%) can cause oxidation on stainless steel edges."
              />
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/calculators/laser-cutting" className="card-hover group border-l-4 border-blue-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Laser Cutting Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate total costs including gas consumption
                </p>
              </Link>

              <Link href="/calculators/quick/hourly-rate" className="card-hover group border-l-4 border-indigo-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Hourly Rate Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Include gas costs in your hourly operating rate
                </p>
              </Link>

              <Link href="/calculators/quick-reference/cutting-speeds" className="card-hover group border-l-4 border-yellow-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Cutting Speeds Reference
                </h3>
                <p className="text-sm text-gray-600">
                  See recommended gases for each material and thickness
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
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
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
