import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laser Welding Cost Calculator | Professional Welding Pricing Tool',
  description:
    'Professional laser welding cost calculator for all processes and materials. Calculate accurate costs for conduction, keyhole, seam, and spot welding. Get instant quotes with gas, power, labor, and equipment cost breakdowns.',
  keywords: [
    'laser welding calculator',
    'welding cost estimator',
    'fiber laser welding',
    'conduction welding cost',
    'keyhole welding calculator',
    'seam welding pricing',
    'spot welding cost',
    'laser welding ROI',
    'shielding gas cost',
    'welding equipment calculator',
    'metal welding cost',
    'stainless steel welding',
    'aluminum welding calculator',
    'titanium welding cost',
    'industrial welding pricing',
  ].join(', '),
  openGraph: {
    title: 'Laser Welding Cost Calculator',
    description:
      'Calculate precise laser welding costs for all processes and materials. Instant quotes with comprehensive cost analysis.',
    type: 'website',
    url: 'https://lasercalcpro.com/calculators/welding',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/welding',
  },
};

export default function WeldingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}











