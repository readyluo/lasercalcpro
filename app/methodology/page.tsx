import { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { MethodologySection } from '@/components/methodology/MethodologySection';
import { BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculation Methodology & Data Sources | LaserCalc Pro',
  description: 'Learn about the formulas, assumptions, and data sources behind our laser cutting and CNC cost calculators. Transparent, accurate, industry-standard calculations.',
  keywords: ['calculation methodology', 'cost formulas', 'manufacturing calculations', 'data sources', 'industry standards'],
  alternates: { canonical: '/methodology' },
};

const methodologies = [
  {
    id: 'laser-cutting',
    title: 'Laser Cutting Cost Calculator',
    formula: 'Total Cost = Material Cost + Energy Cost + Labor Cost + Gas Cost + Depreciation + Overhead',
    variables: [
      { name: 'Material Cost', definition: 'Sheet price × (Part area + Kerf waste) / Sheet area', unit: 'USD' },
      { name: 'Energy Cost', definition: 'Machine power (kW) × Cutting time (h) × Electricity rate ($/kWh)', unit: 'USD' },
      { name: 'Labor Cost', definition: 'Operator hourly rate × (Cutting time + Setup time)', unit: 'USD' },
      { name: 'Gas Cost', definition: 'Gas consumption rate × Cutting time × Gas price', unit: 'USD' },
      { name: 'Depreciation', definition: 'Machine cost / (Expected lifetime hours) × Cutting time', unit: 'USD' },
      { name: 'Overhead', definition: '15-25% of direct costs (facility, utilities, admin)', unit: '%' },
    ],
    assumptions: [
      'Machine operates at rated power during cutting (actual may vary 70-100%)',
      'Kerf width averages 0.1-0.3mm depending on material and thickness',
      'Pierce time: 0.5-2 seconds per hole depending on thickness',
      'Setup time: 5-15 minutes per job (material loading, program setup)',
      'Gas consumption: 10-30 L/min for assist gas (varies by process)',
      'Machine efficiency: 90-95% (accounts for downtime, maintenance)',
    ],
    dataSources: [
      { source: 'Cutting speed tables', reference: 'TRUMPF Technical Documentation, 2023', url: 'https://www.trumpf.com' },
      { source: 'Material properties', reference: 'ASM International Handbook, Vol. 2', url: null },
      { source: 'Energy consumption', reference: 'ISO 14955-1:2017 Machine tools — Environmental evaluation', url: null },
      { source: 'Industry benchmarks', reference: 'Fabricators & Manufacturers Association (FMA) Survey 2023', url: null },
    ],
    errorRange: '±10-15%',
    applicableScenarios: [
      'Sheet metal cutting (0.5-50mm thickness)',
      'Stainless steel, mild steel, aluminum, copper, brass',
      'CO2 and fiber laser systems',
      'Single parts and batch production',
    ],
    limitations: [
      'Does not include post-processing (deburring, finishing)',
      'Assumes standard material grades and quality',
      'Does not account for material price fluctuations',
      'Setup time is estimated average (varies by shop)',
    ],
  },
  {
    id: 'cnc-machining',
    title: 'CNC Machining Cost Calculator',
    formula: 'Total Cost = Machine Cost + Material Cost + Tooling Cost + Setup Cost + Overhead',
    variables: [
      { name: 'Machine Cost', definition: 'Machine hourly rate × Machining time', unit: 'USD' },
      { name: 'Material Cost', definition: 'Material price per unit × Material volume/weight', unit: 'USD' },
      { name: 'Tooling Cost', definition: 'Tool cost / Tool lifetime × Number of operations', unit: 'USD' },
      { name: 'Setup Cost', definition: 'Setup time × Machine hourly rate', unit: 'USD' },
      { name: 'Overhead', definition: '15-20% of direct costs', unit: '%' },
    ],
    assumptions: [
      'Machine hourly rate includes depreciation, maintenance, and facility costs',
      'Tool life based on manufacturer specifications and material hardness',
      'Machining time calculated from feed rates and cutting speeds',
      'Setup time: 30-120 minutes depending on complexity',
      'Material utilization: 40-70% (remaining is waste/chips)',
    ],
    dataSources: [
      { source: 'Machining parameters', reference: 'Machinery\'s Handbook, 31st Edition', url: null },
      { source: 'Tool life data', reference: 'Sandvik Coromant Technical Guide', url: 'https://www.sandvik.coromant.com' },
      { source: 'Machine rates', reference: 'NTMA (National Tooling & Machining Association) Benchmarks', url: null },
    ],
    errorRange: '±12-18%',
    applicableScenarios: [
      'Milling, turning, drilling operations',
      'Aluminum, steel, titanium, plastics',
      '3-axis and multi-axis machining',
      'Prototype and production runs',
    ],
    limitations: [
      'Does not include CAM programming time',
      'Assumes standard tooling (special tools add cost)',
      'Does not account for inspection and quality control',
      'Complex geometries may require longer setup',
    ],
  },
  {
    id: 'roi',
    title: 'Equipment ROI Calculator',
    formula: 'Cash Flow = Revenue - (Operating Costs + Debt Service); Payback occurs when cumulative cash flow ≥ 0',
    variables: [
      { name: 'Total Investment', definition: 'Equipment purchase price + installation expenses', unit: 'USD' },
      { name: 'Financed Amount', definition: 'Total investment - Down payment', unit: 'USD' },
      { name: 'Debt Service', definition: 'Monthly principal + interest payment over the loan term', unit: 'USD/month' },
      { name: 'Annual Revenue', definition: 'Monthly production × Unit price × 12 months', unit: 'USD/year' },
      { name: 'Operating Costs', definition: 'User-supplied monthly operating cost (labor, consumables, utilities)', unit: 'USD/month' },
      { name: 'NPV', definition: 'Net Present Value considering discount rate', unit: 'USD' },
      { name: 'IRR', definition: 'Internal Rate of Return (%)', unit: '%' },
    ],
    assumptions: [
      'Discount rate: 8-12% (typical for manufacturing investments)',
      'Equipment lifetime: 10-15 years',
      'Utilization rate: 60-80% of available hours',
      'Loan amortized monthly with declining principal balance',
      'Revenue and costs remain relatively stable',
      'No major technology disruptions',
    ],
    dataSources: [
      { source: 'Financial formulas', reference: 'Corporate Finance, Ross, Westerfield, Jaffe', url: null },
      { source: 'Industry benchmarks', reference: 'Manufacturing Institute ROI Studies', url: null },
      { source: 'Depreciation schedules', reference: 'IRS Publication 946 (MACRS)', url: null },
    ],
    errorRange: '±15-20%',
    applicableScenarios: [
      'New equipment purchases',
      'Equipment upgrade decisions',
      'Lease vs. buy analysis',
      'Capacity expansion planning',
    ],
    limitations: [
      'Assumes stable market conditions',
      'Does not account for opportunity costs',
      'Tax implications vary by jurisdiction',
      'Salvage value is estimated and applied at analysis year end',
    ],
  },
  {
    id: 'energy',
    title: 'Energy Cost Calculator',
    formula: 'Monthly Cost = (Machine Power + Auxiliary Power) × Operating Hours × Electricity Rate × Load Factor',
    variables: [
      { name: 'Machine Power', definition: 'Rated laser/spindle power', unit: 'kW' },
      { name: 'Auxiliary Power', definition: 'Cooling, extraction, controls', unit: 'kW' },
      { name: 'Operating Hours', definition: 'Monthly production hours', unit: 'hours/month' },
      { name: 'Electricity Rate', definition: 'Cost per kWh (varies by region)', unit: '$/kWh' },
      { name: 'Load Factor', definition: 'Actual power / Rated power (typically 0.6-0.8)', unit: 'ratio' },
    ],
    assumptions: [
      'Load factor: 60-80% (machine rarely runs at full power)',
      'Auxiliary systems: 20-40% of main machine power',
      'Electricity rates based on industrial tariffs',
      'Power factor: 0.85-0.95 (for AC systems)',
    ],
    dataSources: [
      { source: 'Power consumption', reference: 'Equipment manufacturer specifications', url: null },
      { source: 'Energy standards', reference: 'ISO 14955 series (Machine tool energy evaluation)', url: null },
      { source: 'Electricity rates', reference: 'U.S. Energy Information Administration', url: 'https://www.eia.gov' },
    ],
    errorRange: '±5-10%',
    applicableScenarios: [
      'Monthly/annual energy budgeting',
      'Equipment comparison (energy efficiency)',
      'Carbon footprint calculation',
      'Utility cost forecasting',
    ],
    limitations: [
      'Does not include demand charges',
      'Assumes consistent electricity rates',
      'Does not account for power factor penalties',
      'Seasonal variations not modeled',
    ],
  },
  {
    id: 'material-utilization',
    title: 'Material Utilization Calculator',
    formula: 'Utilization % = (Total Part Area / Sheet Area) × 100',
    variables: [
      { name: 'Sheet Area', definition: 'Width × Length of raw material sheet', unit: 'mm²' },
      { name: 'Part Area', definition: 'Sum of all part areas on sheet', unit: 'mm²' },
      { name: 'Kerf Width', definition: 'Cutting path width (material removed)', unit: 'mm' },
      { name: 'Edge Margin', definition: 'Minimum distance from sheet edge', unit: 'mm' },
      { name: 'Part Spacing', definition: 'Minimum gap between parts', unit: 'mm' },
    ],
    assumptions: [
      'Kerf width: 0.1-0.3mm (depends on process and material)',
      'Edge margins: 5-10mm (for clamp clearance)',
      'Part spacing: 2-5mm (thermal distortion prevention)',
      'Rectangular nesting (not optimized algorithms)',
    ],
    dataSources: [
      { source: 'Nesting algorithms', reference: 'Computational Geometry: Algorithms and Applications', url: null },
      { source: 'Industry practices', reference: 'Sheet Metal Industries Best Practices Guide', url: null },
    ],
    errorRange: '±3-8%',
    applicableScenarios: [
      'Sheet metal nesting optimization',
      'Material cost estimation',
      'Waste reduction analysis',
      'Quote accuracy improvement',
    ],
    limitations: [
      'Manual nesting (automated software achieves higher utilization)',
      'Does not account for material grain direction',
      'Assumes uniform material thickness',
      'Complex shapes may require lower utilization',
    ],
  },
];

export default function MethodologyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Calculation Methodology & Assumptions
              </h1>
              <p className="text-lg text-gray-600">
                Transparent formulas, data sources, and assumptions behind our calculators
              </p>
            </div>

            {/* Overview */}
            <div className="mb-10 rounded-xl border border-blue-200 bg-blue-50 p-6">
              <div className="mb-3 flex items-center gap-2 text-blue-700">
                <AlertCircle className="h-5 w-5" />
                <h2 className="font-semibold">Our Methodology Principles</h2>
              </div>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>✓ <strong>Industry Standards:</strong> Based on ASME, ISO, and industry best practices</li>
                <li>✓ <strong>Peer-Reviewed:</strong> Formulas validated against academic and industry research where possible</li>
                <li>✓ <strong>Real-World Calibrated:</strong> Intended to be checked and tuned against your own shop data</li>
                <li>✓ <strong>Regularly Reviewed:</strong> Revisited as equipment, energy, and material benchmarks evolve</li>
                <li>✓ <strong>Transparent:</strong> All assumptions and limitations clearly documented on this page</li>
              </ul>
            </div>

            {/* How to validate and calibrate formulas */}
            <div className="mb-10 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-6">
              <div className="mb-3 flex items-center gap-2 text-blue-800">
                <CheckCircle className="h-5 w-5" />
                <h2 className="text-sm font-semibold">How to validate these formulas with your own data</h2>
              </div>
              <div className="space-y-3 text-sm text-blue-900">
                <div>
                  <p className="mb-1 font-semibold">Step 1: Collect a small baseline</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-xs">
                    <li>Pick 3–10 representative jobs and record actual time, cost, and material usage.</li>
                    <li>Use machine logs, ERP data, or simple stopwatches and job tickets.</li>
                    <li>Note any special factors (unusual materials, rework, second operations).</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-1 font-semibold">Step 2: Recreate those jobs in the calculators</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-xs">
                    <li>Enter the same dimensions, materials, and batch sizes you used in production.</li>
                    <li>Use your actual shop rates for labor, machine time, energy, and gas – not generic examples.</li>
                    <li>Compare the modeled outputs (time and cost) against what you actually measured.</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-1 font-semibold">Step 3: Calibrate the sensitive inputs</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-xs">
                    <li>If real jobs are consistently slower than modeled, reduce cutting speeds or increase setup time inputs.</li>
                    <li>If costs are off, double-check material prices, hourly rates, and overhead assumptions first.</li>
                    <li>Use your own typical utilization, scrap rate, and auxiliary power instead of leaving defaults unchanged.</li>
                  </ul>
                </div>

                <div className="rounded bg-white p-3 text-xs text-gray-800">
                  <p className="mb-1 font-semibold text-gray-900">What kind of match to expect</p>
                  <ul className="ml-4 list-disc space-y-0.5">
                    <li>Roughly ±5–10% difference between modeled and actual results is excellent for planning.</li>
                    <li>±10–20% is common before detailed calibration and usually fine for early quoting.</li>
                    <li>If differences are regularly above ~20%, revisit inputs, local rates, and key assumptions before relying on the numbers.</li>
                  </ul>
                  <p className="mt-2 text-[11px] text-gray-700">
                    Most of the remaining error typically comes from shop-specific factors such as exact cutting parameters, operator technique,
                    material price volatility, and how you allocate overhead. The calculators are designed to make those drivers visible so you
                    can tune them to match your own reality.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator Methodologies */}
            <div className="space-y-6">
              {methodologies.map((method) => (
                <MethodologySection key={method.id} methodology={method} />
              ))}
            </div>

            {/* General Disclaimer */}
            <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">General Disclaimer</h2>
              <p className="text-sm text-gray-700">
                All calculations provided by LaserCalc Pro are estimates based on standard industry formulas and user-provided data. 
                Actual costs may vary depending on specific equipment efficiency, operator skill, material quality, regional factors, 
                and other variables. Results should be verified by qualified professionals before making critical business decisions. 
                LaserCalc Pro is not responsible for any financial decisions made based on these calculations.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                Questions about our methodology?{' '}
                <a href="/contact" className="font-semibold text-primary-600 hover:text-primary-700">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
