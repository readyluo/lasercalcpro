import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metal Material Costs Reference | Sheet Pricing & Waste Factors',
  description:
    'Benchmarks for mild steel, stainless, aluminum, copper, and brass pricing plus formulas for sheet weight, waste, and sourcing workflows.',
  keywords: [
    'metal material cost reference',
    'sheet metal price table',
    'laser cutting material calculator',
    'steel plate pricing',
    'sheet weight formula',
  ].join(', '),
  openGraph: {
    title: 'Metal Material Costs Reference',
    description:
      'Quick lookup for sheet pricing, unit conversions, and sourcing workflows for laser cutting projects.',
    url: 'https://lasercalcpro.com/calculators/quick-reference/material-costs',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/quick-reference/material-costs',
  },
};

export default function MaterialCostsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
