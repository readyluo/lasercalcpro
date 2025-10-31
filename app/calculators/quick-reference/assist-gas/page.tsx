'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Wind, DollarSign, Info } from 'lucide-react';

const gasComparison = [
  {
    gas: 'Oxygen (O₂)',
    bestFor: 'Mild steel, carbon steel',
    advantages: ['20-30% faster cutting', 'Lower gas cost ($0.10-0.30/m³)', 'Exothermic reaction adds heat'],
    disadvantages: ['Oxidized (black) edges', 'Not suitable for stainless/aluminum', 'Requires post-processing for painted parts'],
    typicalPressure: '0.5-2 bar',
    consumption: '0.5-2 m³/hr',
  },
  {
    gas: 'Nitrogen (N₂)',
    bestFor: 'Stainless steel, aluminum, brass, copper',
    advantages: ['Clean, oxide-free edges', 'No post-processing needed', 'Suitable for painted/coated parts'],
    disadvantages: ['Higher cost ($0.50-2.00/m³)', '20-30% slower than O₂', 'High pressure required (12-20 bar)'],
    typicalPressure: '12-20 bar',
    consumption: '2-8 m³/hr',
  },
  {
    gas: 'Air (Compressed)',
    bestFor: 'Thin mild steel (<3mm), general purpose',
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
      answer: 'Use oxygen for mild steel when edge oxidation is acceptable - it cuts 20-30% faster and costs less. Use nitrogen for stainless steel, aluminum, or when you need clean, oxide-free edges for painting or welding.',
    },
    {
      question: 'Is on-site nitrogen generation worth it?',
      answer: 'If you use more than 40-50 hours per week of nitrogen cutting, an on-site generator typically pays for itself in 2-3 years. Generators cost $30k-80k but reduce nitrogen cost by 50-70%.',
    },
    {
      question: 'Can I use air instead of nitrogen?',
      answer: 'Air works for thin mild steel (under 3mm) and non-critical applications. It provides moderate edge quality between oxygen and nitrogen. Requires oil-free compressed air at 8-15 bar.',
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
                    <td className="py-2">Thin sheets (&lt;3mm)</td>
                    <td className="py-2">Air</td>
                    <td className="py-2 text-right">$0.20-0.50</td>
                    <td className="py-2 text-xs">Compressor cost only</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Costs assume bottled gas delivery. On-site generation reduces nitrogen cost by 50-70%.
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
                    <span>Cost per m³:</span>
                    <span className="font-semibold">$0.50-2.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Typical consumption:</span>
                    <span className="font-semibold">4 m³/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per hour:</span>
                    <span className="font-semibold">$2.00-8.00</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Annual cost (40 hrs/wk):</span>
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
                    <span className="font-semibold">$0.15-0.50/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual operating:</span>
                    <span className="font-semibold">$1,248-4,160</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Typical payback:</span>
                    <span className="text-green-600">2-3 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-primary-100 p-4">
              <p className="text-sm text-gray-800">
                <strong>Rule of Thumb:</strong> If you use nitrogen more than 40 hours per week, on-site generation 
                typically pays for itself within 2-3 years and saves 50-70% on gas costs long-term.
              </p>
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
                  Don't use expensive nitrogen when oxygen will work. For structural mild steel parts that will be 
                  painted, the oxidized edge gets covered anyway. Save nitrogen for stainless, aluminum, and parts 
                  requiring clean edges.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">2. Optimize Gas Pressure</h3>
                <p className="text-gray-700">
                  Excessive pressure wastes gas without improving cut quality. Start at recommended pressure and 
                  reduce incrementally until you see edge quality degradation, then add 1-2 bar back. This can 
                  reduce consumption by 20-30%.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">3. Fix Leaks Promptly</h3>
                <p className="text-gray-700">
                  A small leak in your gas system can waste $500-1000/year. Check all connections regularly with 
                  leak detection spray. Common leak points: quick disconnects, regulators, and nozzle seals.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">4. Consider Bulk Gas Delivery</h3>
                <p className="text-gray-700">
                  If you use 5+ bottles per week, switch to bulk liquid nitrogen delivery. Cost per m³ drops by 
                  30-50% compared to high-pressure cylinders. Requires on-site bulk tank (often provided by supplier).
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

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="When should I use nitrogen vs oxygen?"
                answer="Use oxygen for mild steel when edge oxidation is acceptable - it cuts 20-30% faster and costs less. Use nitrogen for stainless steel, aluminum, or when you need clean, oxide-free edges for painting or welding."
              />
              <FAQItem
                question="Is on-site nitrogen generation worth it?"
                answer="If you use more than 40-50 hours per week of nitrogen cutting, an on-site generator typically pays for itself in 2-3 years. Generators cost $30k-80k but reduce nitrogen cost by 50-70%."
              />
              <FAQItem
                question="Can I use air instead of nitrogen?"
                answer="Air works for thin mild steel (under 3mm) and non-critical applications. It provides moderate edge quality between oxygen and nitrogen. Requires oil-free compressed air at 8-15 bar."
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


