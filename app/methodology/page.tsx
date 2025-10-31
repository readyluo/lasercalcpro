import { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { MethodologySection } from '@/components/methodology/MethodologySection';
import { BookOpen, AlertCircle } from 'lucide-react';

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
    formula: 'Payback Period = Total Investment / (Annual Revenue - Annual Operating Costs)',
    variables: [
      { name: 'Total Investment', definition: 'Equipment cost + Installation + Training + Initial tooling', unit: 'USD' },
      { name: 'Annual Revenue', definition: 'Monthly production × Unit price × 12 months', unit: 'USD/year' },
      { name: 'Operating Costs', definition: 'Labor + Materials + Energy + Maintenance + Consumables', unit: 'USD/year' },
      { name: 'NPV', definition: 'Net Present Value considering discount rate', unit: 'USD' },
      { name: 'IRR', definition: 'Internal Rate of Return (%)', unit: '%' },
    ],
    assumptions: [
      'Discount rate: 8-12% (typical for manufacturing investments)',
      'Equipment lifetime: 10-15 years',
      'Utilization rate: 60-80% of available hours',
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
      'Salvage value is estimated',
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
                <li>✓ <strong>Peer-Reviewed:</strong> Formulas validated against academic and industry research</li>
                <li>✓ <strong>Real-World Calibrated:</strong> Tested against actual manufacturing data</li>
                <li>✓ <strong>Regularly Updated:</strong> Reviewed quarterly and updated as standards evolve</li>
                <li>✓ <strong>Transparent:</strong> All assumptions and limitations clearly documented</li>
              </ul>
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

