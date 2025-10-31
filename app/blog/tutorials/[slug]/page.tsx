import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateHowToSchema } from '@/lib/seo/schema';

interface TutorialConfig {
  title: string;
  description: string;
  duration: string;
  level: string;
  sections: Array<{ heading: string; content: React.ReactNode }>;
  steps: Array<{ name: string; text: string }>;
}

const TUTORIALS: Record<string, TutorialConfig> = {
  'cad-to-quote': {
    title: 'From CAD to Quote: Laser cutting workflows in 20 minutes',
    description:
      'Load 2D profiles, validate inputs, configure gas & energy, and export a customer-ready quote with cost breakdowns.',
    duration: '20 min',
    level: 'Intermediate',
    sections: [
      {
        heading: '1) Prepare CAD and measure path length',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Export 2D profile as DXF/SVG; ensure units are millimeters.</li>
            <li>Use your CAD tool to compute total path length (outer contour + internal holes).</li>
            <li>Record pierce count if holes exist; include outer contour pierce.</li>
          </ul>
        ),
      },
      {
        heading: '2) Input parameters in Laser Cutting calculator',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Material: pick the closest grade (mild steel, stainless, aluminum).</li>
            <li>Thickness: match the sheet used in production.</li>
            <li>Cutting length: paste the measured total path length.</li>
            <li>Laser power & electricity rate: use your actual machine and local tariff.</li>
            <li>Labor & gas: set operator rate and gas type (O₂ for mild steel, N₂ for clean edges).</li>
          </ul>
        ),
      },
      {
        heading: '3) Validate and export',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Check cost breakdown: material, power, labor, gas, depreciation, maintenance.</li>
            <li>Use “Suggested Price (30% markup)” as baseline; adjust per customer tier.</li>
            <li>Click “Export PDF Report” to generate a branded quote.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Export CAD', text: 'Save 2D geometry as DXF/SVG in millimeters.' },
      { name: 'Measure length', text: 'Sum outer and inner path lengths from CAD.' },
      { name: 'Enter parameters', text: 'Fill material, thickness, length, power, labor, gas.' },
      { name: 'Verify costs', text: 'Confirm breakdown aligns with shop data.' },
      { name: 'Export quote', text: 'Generate PDF and archive version.' },
    ],
  },
  'cnc-volume-pricing': {
    title: 'Precision CNC cost breakdown with volume pricing tiers',
    description:
      'Build per-part margins with setup amortization, tooling life, and utilization targets; output tiered pricing.',
    duration: '25 min',
    level: 'Advanced',
    sections: [
      {
        heading: '1) Identify fixed vs variable time',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Setup time (fixtures, program load) is fixed; amortize across batch size.</li>
            <li>Spindle time, tool changes, deburr are variable per part.</li>
          </ul>
        ),
      },
      {
        heading: '2) Choose batch sizes and compute unit cost',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Model quantities (1, 10, 50, 200) and distribute setup time accordingly.</li>
            <li>Add tooling wear per part and machine hourly rate.</li>
          </ul>
        ),
      },
      {
        heading: '3) Publish tiered prices',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Target margin 25–35% for custom work; relax for strategic accounts.</li>
            <li>Export a table with Qty, Unit Price, Margin for the quote.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Separate times', text: 'Classify setup vs per-part time.' },
      { name: 'Distribute setup', text: 'Divide setup minutes by quantity tiers.' },
      { name: 'Add machine rate', text: 'Apply hourly rate incl. overhead.' },
      { name: 'Compute tooling', text: 'Include wear per part for cutters.' },
      { name: 'Set margins', text: 'Price tiers to margin targets.' },
    ],
  },
  'equipment-roi-narrative': {
    title: 'Narrating equipment ROI to CFOs and bank partners',
    description:
      'Translate calculator outputs into payback & NPV narratives with scenario analysis for executive stakeholders.',
    duration: '18 min',
    level: 'Strategic',
    sections: [
      {
        heading: '1) Build scenarios',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Create Base, Optimistic (+15% utilization), Downside (−15% utilization) cases.</li>
            <li>Lock inputs for power, labor, maintenance, and financing terms.</li>
          </ul>
        ),
      },
      {
        heading: '2) Convert to board-ready slides',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Summarize Payback (months), IRR, NPV at discount rate 8–12%.</li>
            <li>Highlight risk mitigations: service contracts, training, grants.</li>
          </ul>
        ),
      },
      {
        heading: '3) Communicate sensitivities',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Show spider chart: margin vs utilization, energy price, labor rate.</li>
            <li>Provide appendix with underlying assumptions and data sources.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Define cases', text: 'Base/Up/Down utilization scenarios.' },
      { name: 'Compute metrics', text: 'Payback, IRR, NPV with clear rates.' },
      { name: 'Draft narrative', text: 'Risk, mitigations, and next steps.' },
      { name: 'Finalize deck', text: 'Appendix with assumptions and sources.' },
    ],
  },
};

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = TUTORIALS[params.slug];
  if (!tutorial) return notFound();

  const howTo = generateHowToSchema({ name: tutorial.title, description: tutorial.description, steps: tutorial.steps });

  return (
    <main className="bg-gray-50 py-16">
      <SchemaMarkup schema={howTo} />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog/tutorials" className="text-sm font-semibold text-primary-600">← Back to tutorials</Link>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">{tutorial.title}</h1>
          <p className="mt-2 text-gray-600">{tutorial.description}</p>
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">{tutorial.level}</span>
            <span>Duration: {tutorial.duration}</span>
          </div>

          <div className="prose prose-gray mt-8 max-w-none">
            {tutorial.sections.map(section => (
              <section key={section.heading} className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">{section.heading}</h2>
                <div>{section.content}</div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Downloadables</h3>
            <ul className="ml-5 list-disc space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/calculators/laser-cutting" className="text-primary-600 hover:underline">
                  Open Laser Cutting Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/cost-center/hourly-rate" className="text-primary-600 hover:underline">
                  Open Hourly Rate Builder
                </Link>
              </li>
              <li>
                <Link href="/calculators/cost-center/quotation-margin" className="text-primary-600 hover:underline">
                  Open Quotation Margin Simulator
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}


