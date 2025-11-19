import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CNC Machining Cost Calculator | Batch & Tooling Pricing',
  description:
    'Estimate CNC machining costs per part and per batch with tooling, labor, overhead, and volume discounts. Export PDF-ready cost summaries to support your manufacturing quotes.',
  keywords: [
    'cnc machining cost calculator',
    'machine shop quote tool',
    'cnc pricing estimator',
    'manufacturing cost per part',
    'machining batch calculator',
  ].join(', '),
  openGraph: {
    title: 'CNC Machining Cost Calculator',
    description:
      'Interactive CNC machining cost estimates with tooling, setup, and batch pricing analysis.',
    url: 'https://lasercalcpro.com/calculators/cnc-machining',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/cnc-machining',
  },
};

export default function CNCMachiningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
