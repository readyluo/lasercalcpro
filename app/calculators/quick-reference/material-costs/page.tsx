'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Package, DollarSign, Info, TrendingUp } from 'lucide-react';

const materialPrices = [
  {
    material: 'Mild Steel (A36)',
    pricePerKg: '$0.80-1.20',
    pricePerLb: '$0.36-0.54',
    density: '7.85 g/cm³',
    notes: 'Most economical option, widely available',
    applications: 'Structural parts, brackets, general fabrication',
  },
  {
    material: 'Stainless Steel 304',
    pricePerKg: '$3.50-5.50',
    pricePerLb: '$1.59-2.50',
    density: '8.00 g/cm³',
    notes: 'Corrosion resistant, food-grade',
    applications: 'Food equipment, medical devices, marine',
  },
  {
    material: 'Stainless Steel 316',
    pricePerKg: '$5.00-7.50',
    pricePerLb: '$2.27-3.40',
    density: '8.00 g/cm³',
    notes: 'Superior corrosion resistance',
    applications: 'Chemical processing, marine, medical',
  },
  {
    material: 'Aluminum 5052',
    pricePerKg: '$3.00-4.50',
    pricePerLb: '$1.36-2.04',
    density: '2.68 g/cm³',
    notes: 'Good formability, weldable',
    applications: 'Enclosures, panels, marine applications',
  },
  {
    material: 'Aluminum 6061',
    pricePerKg: '$3.20-4.80',
    pricePerLb: '$1.45-2.18',
    density: '2.70 g/cm³',
    notes: 'Structural grade, heat treatable',
    applications: 'Aerospace, automotive, structural',
  },
  {
    material: 'Copper C110',
    pricePerKg: '$9.00-12.00',
    pricePerLb: '$4.08-5.44',
    density: '8.96 g/cm³',
    notes: 'Excellent conductivity, expensive',
    applications: 'Electrical components, heat exchangers',
  },
  {
    material: 'Brass (C260)',
    pricePerKg: '$6.50-9.00',
    pricePerLb: '$2.95-4.08',
    density: '8.53 g/cm³',
    notes: 'Good machinability, decorative',
    applications: 'Decorative parts, fittings, musical instruments',
  },
];

const sheetSizeCalculator = [
  { size: '4\' × 8\' (1220 × 2440 mm)', area: '2.98 m²', areaFt: '32 ft²' },
  { size: '5\' × 10\' (1525 × 3050 mm)', area: '4.65 m²', areaFt: '50 ft²' },
  { size: '6\' × 12\' (1830 × 3660 mm)', area: '6.70 m²', areaFt: '72 ft²' },
];

export default function MaterialCostsReferencePage() {
  const faqSchema = generateFAQSchema([
    {
      question: 'How do I calculate material cost for a laser cutting project?',
      answer: 'Calculate sheet weight (length × width × thickness × density), then multiply by price per kg. Add 20-40% waste factor for nesting inefficiency. For example: 1220×2440×3mm mild steel = 68.5 kg × $1.00/kg × 1.25 waste = $85.63 material cost.',
    },
    {
      question: 'Why do material prices fluctuate?',
      answer: 'Metal prices are affected by global commodity markets, supply chain factors, energy costs, and demand cycles. Steel and aluminum prices can vary 20-40% year over year. Lock in prices with suppliers for large projects.',
    },
    {
      question: 'Should I buy material or have the shop supply it?',
      answer: 'Buying your own material saves 20-40% markup but requires storage, handling, and quality risk. Shop-supplied material includes convenience, guaranteed quality, and no minimum quantities. For high-volume production, buying direct makes sense.',
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
              <div className="rounded-full bg-blue-100 p-3">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Metal Material Costs Reference</h1>
                <p className="text-gray-600">Current pricing guide for common laser cutting materials</p>
              </div>
            </div>
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Prices shown are approximate wholesale/distributor prices as of 2025. 
                Actual prices vary by supplier, quantity, location, and market conditions. Always get current quotes.
              </p>
            </div>
          </div>

          {/* Material Prices Table */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Material Price Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Material</th>
                    <th className="pb-2 text-right font-semibold">Price/kg</th>
                    <th className="pb-2 text-right font-semibold">Price/lb</th>
                    <th className="pb-2 text-left font-semibold">Density</th>
                    <th className="pb-2 text-left font-semibold">Key Applications</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {materialPrices.map((mat, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 font-medium">{mat.material}</td>
                      <td className="py-3 text-right">{mat.pricePerKg}</td>
                      <td className="py-3 text-right">{mat.pricePerLb}</td>
                      <td className="py-3">{mat.density}</td>
                      <td className="py-3 text-xs">{mat.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Prices reflect bulk purchasing (full sheets). Small quantities may cost 30-50% more.
            </p>
          </div>

          {/* Cost Calculation Guide */}
          <div className="card mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">How to Calculate Material Cost</h2>
                <p className="mt-1 text-gray-700">Step-by-step guide to estimating material costs for your project</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Step 1: Calculate Sheet Weight</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Formula:</strong> Weight (kg) = Length (m) × Width (m) × Thickness (mm) × Density (g/cm³)</p>
                  <p className="mt-2"><strong>Example:</strong> 4×8 ft mild steel, 3mm thick</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Dimensions: 1.22m × 2.44m × 3mm</li>
                    <li>Density: 7.85 g/cm³ (mild steel)</li>
                    <li>Weight = 1.22 × 2.44 × 3 × 7.85 = 70.1 kg</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Step 2: Apply Material Price</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Multiply weight by price per kg from supplier quote or reference table.</p>
                  <p className="mt-2"><strong>Example:</strong> 70.1 kg × $1.00/kg = $70.10 base cost</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Step 3: Add Waste Factor</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Account for nesting inefficiency, edge trim, and scrap:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li><strong>Simple rectangular parts:</strong> 15-20% waste</li>
                    <li><strong>Complex shapes:</strong> 25-35% waste</li>
                    <li><strong>Small parts on large sheets:</strong> 30-40% waste</li>
                  </ul>
                  <p className="mt-2"><strong>Example:</strong> $70.10 × 1.25 (25% waste) = $87.63 total material cost</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">Step 4: Consider Quantity Discounts</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <ul className="list-disc pl-5">
                    <li><strong>1-5 sheets:</strong> Retail pricing (+30-50%)</li>
                    <li><strong>6-20 sheets:</strong> Small quantity discount (-10%)</li>
                    <li><strong>21-50 sheets:</strong> Volume discount (-20%)</li>
                    <li><strong>50+ sheets:</strong> Bulk pricing (-30-40%)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sheet Size Reference */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common Sheet Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Sheet Size</th>
                    <th className="pb-2 text-right font-semibold">Area (m²)</th>
                    <th className="pb-2 text-right font-semibold">Area (ft²)</th>
                    <th className="pb-2 text-left font-semibold">Typical Use</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {sheetSizeCalculator.map((sheet, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{sheet.size}</td>
                      <td className="py-2 text-right">{sheet.area}</td>
                      <td className="py-2 text-right">{sheet.areaFt}</td>
                      <td className="py-2 text-xs">
                        {i === 0 && 'Most common, standard stock'}
                        {i === 1 && 'Large parts, better nesting'}
                        {i === 2 && 'High-volume production'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Material Selection Tips */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Info className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Material Selection Tips</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Cost vs. Performance Trade-offs</h3>
                <p className="text-gray-700">
                  Don't over-specify materials. If mild steel works for your application, don't use stainless steel 
                  (3-5x more expensive). Consider coating mild steel instead of upgrading to stainless for corrosion 
                  resistance - powder coating costs $2-5/ft² vs. 300% material premium.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Thickness Selection</h3>
                <p className="text-gray-700">
                  Thicker isn't always better. A 3mm part is 50% heavier (and more expensive) than 2mm. Use structural 
                  analysis to determine minimum required thickness. Common mistake: specifying 6mm when 3mm with proper 
                  design (ribs, bends) would suffice.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Material Availability</h3>
                <p className="text-gray-700">
                  Standard thicknesses (1mm, 1.5mm, 2mm, 3mm, 4mm, 5mm, 6mm) are readily available and cheaper. 
                  Odd thicknesses (2.5mm, 3.5mm) may require special order with 20-30% premium and lead time. 
                  Design around standard sizes when possible.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Buy vs. Shop Supply</h3>
                <p className="text-gray-700">
                  Laser cutting shops typically mark up material 30-50%. For one-off projects, shop supply is convenient. 
                  For production runs (10+ sheets), buying direct from metal distributor saves 25-40%. Factor in delivery 
                  costs and minimum order quantities.
                </p>
              </div>
            </div>
          </div>

          {/* Price Trends */}
          <div className="card mb-8 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Material Price Trends & Factors</h2>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 font-semibold">Global Commodity Markets</h3>
                <p>Steel and aluminum prices track global commodity indices. Check LME (London Metal Exchange) for 
                aluminum and iron ore futures to anticipate price movements.</p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 font-semibold">Energy Costs</h3>
                <p>Metal production is energy-intensive. Natural gas and electricity price increases directly impact 
                material costs, especially for aluminum (requires significant electricity for smelting).</p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 font-semibold">Supply Chain Disruptions</h3>
                <p>Transportation costs, port congestion, and trade policies affect prices. Domestic material may cost 
                more but offers supply security and faster delivery.</p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 font-semibold">Seasonal Demand</h3>
                <p>Construction and manufacturing demand peaks in spring/summer. Prices typically 10-15% lower in 
                Q4/Q1. Consider timing large material purchases for off-season savings.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="How do I calculate material cost for a laser cutting project?"
                answer="Calculate sheet weight (length × width × thickness × density), then multiply by price per kg. Add 20-40% waste factor for nesting inefficiency. For example: 1220×2440×3mm mild steel = 68.5 kg × $1.00/kg × 1.25 waste = $85.63 material cost."
              />
              <FAQItem
                question="Why do material prices fluctuate?"
                answer="Metal prices are affected by global commodity markets, supply chain factors, energy costs, and demand cycles. Steel and aluminum prices can vary 20-40% year over year. Lock in prices with suppliers for large projects."
              />
              <FAQItem
                question="Should I buy material or have the shop supply it?"
                answer="Buying your own material saves 20-40% markup but requires storage, handling, and quality risk. Shop-supplied material includes convenience, guaranteed quality, and no minimum quantities. For high-volume production, buying direct makes sense."
              />
              <FAQItem
                question="What's the difference between 304 and 316 stainless steel?"
                answer="316 has added molybdenum for superior corrosion resistance, especially against chlorides (salt water). It costs 40-50% more than 304. Use 304 for general corrosion resistance (food, medical), 316 for marine or chemical environments."
              />
              <FAQItem
                question="How much does material waste typically cost?"
                answer="Material waste from nesting inefficiency ranges from 15-40% depending on part complexity. On a $100 material cost, waste adds $15-40. Optimize nesting with CAM software to minimize waste. Scrap metal can be sold for 30-50% of purchase price."
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
                  Calculate total project costs including material, labor, and overhead
                </p>
              </Link>

              <Link href="/calculators/material-utilization" className="card-hover group border-l-4 border-green-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Material Utilization Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Optimize nesting efficiency and reduce material waste
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

