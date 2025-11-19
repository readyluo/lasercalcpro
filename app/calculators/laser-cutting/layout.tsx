import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laser Cutting Cost Calculator | Material, Power & Labor Pricing',
  description:
    'Compute laser cutting costs with accurate material usage, power, labor, and gas breakdowns. Export PDF-ready quotes for every job size.',
  keywords: [
    'laser cutting calculator',
    'sheet metal cost estimator',
    'laser pricing tool',
    'fabrication quote calculator',
    'material utilization calculator',
  ].join(', '),
  openGraph: {
    title: 'Laser Cutting Cost Calculator',
    description:
      'Instant laser cutting quotes with detailed material, energy, and labor costs.',
    url: 'https://lasercalcpro.com/calculators/laser-cutting',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/laser-cutting',
  },
};

export default function LaserCuttingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
