'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema, generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Package, DollarSign, Info, TrendingUp, Scale, ClipboardList } from 'lucide-react';

const materialPrices = [
  {
    material: 'Mild Steel (A36)',
    pricePerKg: '$0.80-1.20',
    pricePerLb: '$0.36-0.54',
    density: '7.85 g/cm3',
    notes: 'Most economical option, widely available',
    applications: 'Structural parts, brackets, general fabrication',
  },
  {
    material: 'Stainless Steel 304',
    pricePerKg: '$3.50-5.50',
    pricePerLb: '$1.59-2.50',
    density: '8.00 g/cm3',
    notes: 'Corrosion resistant, food-grade',
    applications: 'Food equipment, medical devices, marine',
  },
  {
    material: 'Stainless Steel 316',
    pricePerKg: '$5.00-7.50',
    pricePerLb: '$2.27-3.40',
    density: '8.00 g/cm3',
    notes: 'Superior corrosion resistance',
    applications: 'Chemical processing, marine, medical',
  },
  {
    material: 'Aluminum 5052',
    pricePerKg: '$3.00-4.50',
    pricePerLb: '$1.36-2.04',
    density: '2.68 g/cm3',
    notes: 'Good formability, weldable',
    applications: 'Enclosures, panels, marine applications',
  },
  {
    material: 'Aluminum 6061',
    pricePerKg: '$3.20-4.80',
    pricePerLb: '$1.45-2.18',
    density: '2.70 g/cm3',
    notes: 'Structural grade, heat treatable',
    applications: 'Aerospace, automotive, structural',
  },
  {
    material: 'Copper C110',
    pricePerKg: '$9.00-12.00',
    pricePerLb: '$4.08-5.44',
    density: '8.96 g/cm3',
    notes: 'Excellent conductivity, expensive',
    applications: 'Electrical components, heat exchangers',
  },
  {
    material: 'Brass (C260)',
    pricePerKg: '$6.50-9.00',
    pricePerLb: '$2.95-4.08',
    density: '8.53 g/cm3',
    notes: 'Good machinability, decorative',
    applications: 'Decorative parts, fittings, musical instruments',
  },
];

const sheetSizeCalculator = [
  { size: '4\' x 8\' (1220 x 2440 mm)', area: '2.98 m²', areaFt: '32 ft²' },
  { size: '5\' x 10\' (1525 x 3050 mm)', area: '4.65 m²', areaFt: '50 ft²' },
  { size: '6\' x 12\' (1830 x 3660 mm)', area: '6.70 m²', areaFt: '72 ft²' },
];

export default function MaterialCostsReferencePage() {
  const faqSchema = generateFAQSchema([
    {
      question: 'How do I calculate material cost for a laser cutting project?',
      answer:
        'Calculate sheet weight (length x width x thickness x density), then multiply by price per kg. Include a waste factor that reflects your own nesting inefficiency and scrap, or use the Material Utilization calculator to model it more directly. For example: 1220x2440x3mm mild steel = 68.5 kg x $1.00/kg x 1.25 waste = $85.63 material cost.',
    },
    {
      question: 'Why do material prices fluctuate?',
      answer:
        'Metal prices are affected by global commodity markets, supply chain factors, energy costs, and demand cycles. Steel and aluminum prices can change significantly year over year. Review recent supplier quotes or published indices when planning larger projects.',
    },
    {
      question: 'Should I buy material or have the shop supply it?',
      answer:
        'Buying your own material can reduce markup but shifts storage, handling, and quality risk to you. Shop-supplied material trades a higher unit price for convenience, guaranteed quality, and lower minimum quantities. For high-volume production, compare both approaches using your own quotes, logistics costs, and risk tolerance.',
    },
  ]);
  const softwareSchema = generateSoftwareApplicationSchema('Material Costs Reference');

  return (
    <>
      <SchemaMarkup schema={softwareSchema} />
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
                <h1 className="text-4xl font-bold text-gray-900">Metal Material Costs Reference</h1>
                <p className="text-gray-600">Current pricing guide for common laser cutting materials</p>
              </div>
            </div>
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Prices shown are approximate wholesale/distributor prices as of 2024 Q4. 
                Actual prices vary by supplier, quantity, location, and market conditions. Always get current quotes.
              </p>
            </div>
          </div>

          {/* Material Prices Table */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Material Price Comparison</h2>
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
              Prices reflect bulk purchasing (full sheets) as an example. Small-quantity or rush orders are often priced higher per unit; check your supplier's actual breakpoints and surcharges.
            </p>
          </div>

          {/* Cost Calculation Guide */}
          <div className="card mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">How to Calculate Material Cost</h2>
                <p className="mt-1 text-gray-700">Step-by-step guide to estimating material costs for your project</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Step 1: Calculate Sheet Weight</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Formula:</strong> Weight (kg) = Area (m^2) x Thickness (m) x Density (kg/m3)</p>
                  <p className="mt-2"><strong>Example:</strong> 4x8 ft mild steel, 3 mm thick</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Area: 1.22 m x 2.44 m = 2.98 m^2</li>
                    <li>Thickness: 3 mm = 0.003 m</li>
                    <li>Density: 7,850 kg/m3 (mild steel)</li>
                    <li>Weight = 2.98 x 0.003 x 7,850 = 70.1 kg</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Step 2: Apply Material Price</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Multiply weight by price per kg from supplier quote or reference table.</p>
                  <p className="mt-2"><strong>Example:</strong> 70.1 kg x $1.00/kg = $70.10 base cost</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Step 3: Add Waste Factor</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Account for nesting inefficiency, edge trim, and scrap when moving from base sheet price to quoted part cost.</p>
                  <p className="mt-2">
                    Historical data or the Material Utilization calculator can help you choose a waste factor that matches your own part mix; simple rectangular parts usually have lower waste than intricate shapes or very small parts on large sheets.
                  </p>
                  <p className="mt-2"><strong>Example:</strong> $70.10 x 1.25 (a 25% waste factor) = $87.63 total material cost in this scenario</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Step 4: Consider Quantity Discounts</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <ul className="list-disc pl-5">
                    <li><strong>1-5 sheets:</strong> Often priced close to retail in many catalogs.</li>
                    <li><strong>6-20 sheets:</strong> Some suppliers offer modest discounts at this volume.</li>
                    <li><strong>21-50 sheets:</strong> Larger runs may qualify for more favorable pricing.</li>
                    <li><strong>50+ sheets:</strong> Negotiated or contract pricing is common at this scale.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sheet Size Reference */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Common Sheet Sizes</h2>
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

          {/* Unit Conversion */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Unit Conversion & Stock Allocation</h2>
                <p className="mt-1 text-gray-700">Translate supplier quotes between weight, area, and sheet counts.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Weight conversions</p>
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  <li>kg = lb / 2.2046</li>
                  <li>lb = kg x 2.2046</li>
                  <li>kg per m^2 = Density (kg/m3) x Thickness (m)</li>
                </ul>
                <p className="mt-2 text-gray-600">Use kg/m^2 when comparing alloys or quoting by part area.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Sheet allocation checklist</p>
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  <li>Parts per sheet = usable area / part area.</li>
                  <li>Reserve 15-25 mm trim for clamps and edge quality.</li>
                  <li>Record heat/lot numbers for traceability and audits.</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              Feed the resulting yield and scrap value into the{' '}
              <Link
                href="/calculators/material-utilization"
                className="text-primary-700 underline-offset-2 hover:underline"
              >
                Material Utilization calculator
              </Link>{' '}
              to quantify savings inside quotes and cost reports.
            </p>
          </div>

          {/* Material Selection Tips */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Info className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Material Selection Tips</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Cost vs. Performance Trade-offs</h3>
                <p className="text-gray-700">
                  Do not over-specify materials. If mild steel meets your requirements, upgrading to stainless will usually
                  increase material cost significantly. In some applications, coating mild steel can achieve needed
                  corrosion resistance at lower total cost than switching alloys—compare your actual coating and material
                  quotes rather than relying on generic multipliers.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Thickness Selection</h3>
                <p className="text-gray-700">
                  Thicker is not always better. A 3mm part is 50% heavier (and more expensive) than 2mm. Use structural 
                  analysis to determine minimum required thickness. Common mistake: specifying 6mm when 3mm with proper 
                  design (ribs, bends) would suffice.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Material Availability</h3>
                <p className="text-gray-700">
                  Standard thicknesses (1mm, 1.5mm, 2mm, 3mm, 4mm, 5mm, 6mm) are usually easier to source and often
                  priced more favorably. Odd thicknesses (such as 2.5mm or 3.5mm) may require special order and can carry
                  different pricing or lead times. When possible, confirm availability and pricing with your suppliers
                  and design around sizes that fit their standard stock.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Buy vs. Shop Supply</h3>
                <p className="text-gray-700">
                  Laser cutting shops generally add a margin to material to cover handling, storage, and risk. For
                  one-off projects, shop-supplied material is often the simplest option. For higher-volume runs, buying
                  directly from a metal distributor can reduce material cost—but be sure to account for delivery, storage,
                  minimum order quantities, and internal handling when you compare scenarios.
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
                <h2 className="text-3xl font-bold text-gray-900">Material Price Trends & Factors</h2>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 text-lg font-semibold">Global Commodity Markets</h3>
                <p>Steel and aluminum prices track global commodity indices. Check LME (London Metal Exchange) for 
                aluminum and iron ore futures to anticipate price movements.</p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 text-lg font-semibold">Energy Costs</h3>
                <p>Metal production is energy-intensive. Natural gas and electricity price increases directly impact 
                material costs, especially for aluminum (requires significant electricity for smelting).</p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 text-lg font-semibold">Supply Chain Disruptions</h3>
                <p>Transportation costs, port congestion, and trade policies affect prices. Domestic material may cost 
                more but offers supply security and faster delivery.</p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <h3 className="mb-1 text-lg font-semibold">Seasonal Demand</h3>
                <p>Construction and manufacturing demand peaks in spring/summer. Prices typically 10-15% lower in 
                Q4/Q1. Consider timing large material purchases for off-season savings.</p>
              </div>
            </div>
          </div>

          {/* Workflow Integration */}
          <div className="card mb-8 bg-gradient-to-br from-primary-50 to-blue-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-primary-100 p-2">
                <ClipboardList className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Quoting Workflow Checklist</h2>
                <p className="mt-1 text-gray-700">Keep pricing data synchronized across calculators and exports.</p>
              </div>
            </div>
            <ol className="space-y-4 text-sm text-gray-800">
              <li>
                <span className="font-semibold text-gray-900">1. Capture supplier inputs.</span> Save sheet price, alloy,
                thickness, currency, and minimum order inside your sourcing log so every quote references the same
                baseline.
              </li>
              <li>
                <span className="font-semibold text-gray-900">2. Convert yield.</span> Use the{' '}
                <Link
                  href="/calculators/material-utilization"
                  className="text-primary-700 underline-offset-2 hover:underline"
                >
                  Material Utilization calculator
                </Link>{' '}
                to translate part geometry into sheets consumed, waste percentage, and scrap resale.
              </li>
              <li>
                <span className="font-semibold text-gray-900">3. Push cost downstream.</span> Feed the per-part material
                cost into the{' '}
                <Link href="/calculators/laser-cutting" className="text-primary-700 underline-offset-2 hover:underline">
                  Laser Cutting calculator
                </Link>{' '}
                or{' '}
                <Link href="/calculators/quick/price-per-meter" className="text-primary-700 underline-offset-2 hover:underline">
                  Price per Meter tool
                </Link>{' '}
                to validate profit targets before presenting a quote.
              </li>
            </ol>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="How do I calculate material cost for a laser cutting project?"
                answer="Calculate sheet weight (length x width x thickness x density), then multiply by price per kg. Include a waste factor that reflects your own nesting inefficiency and scrap, or use the Material Utilization calculator to model it more directly. For example: 1220x2440x3mm mild steel = 68.5 kg x $1.00/kg x 1.25 waste = $85.63 material cost."
              />
              <FAQItem
                question="Why do material prices fluctuate?"
                answer="Metal prices are affected by global commodity markets, supply chain factors, energy costs, and demand cycles. Steel and aluminum prices can change significantly year over year. Review recent supplier quotes or published indices when planning larger projects."
              />
              <FAQItem
                question="Should I buy material or have the shop supply it?"
                answer="Buying your own material can reduce markup but shifts storage, handling, and quality risk to you. Shop-supplied material trades a higher unit price for convenience, guaranteed quality, and lower minimum quantities. For high-volume production, compare both approaches using your own quotes, logistics costs, and risk tolerance."
              />
              <FAQItem
                question="What's the difference between 304 and 316 stainless steel?"
                answer="316 has added molybdenum for superior corrosion resistance, especially against chlorides (salt water). It is typically priced higher than 304. Many shops use 304 for general corrosion resistance (food, medical) and reserve 316 for marine or chemical environments—your choice should follow your specific requirements and supplier pricing."
              />
              <FAQItem
                question="How much does material waste typically cost?"
                answer="Material waste from nesting inefficiency can be a meaningful share of total material usage, and the impact depends strongly on part complexity and sheet strategy. On a $100 material cost, poor nesting can noticeably increase effective spend. Use nesting/CAM tools and the Material Utilization calculator to understand your own waste patterns. Scrap metal is usually sold at a fraction of purchase price; use your local scrap rates when modeling recovered value."
              />
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Tools</h2>
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
