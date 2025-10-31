import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Tools - Fast Laser Calculators | LaserCalc Pro',
  description:
    'Fast, focused calculators for instant laser cost estimates. Calculate price per meter, hourly rates, and pierce time in seconds. Perfect for quick quotes and phone estimates without extensive input.',
  keywords: [
    'quick laser calculator',
    'fast cost estimate',
    'price per meter calculator',
    'hourly rate calculator',
    'pierce time calculator',
    'instant laser quote',
    'quick cutting cost',
    'rapid estimate tool',
    'phone quote calculator',
    'simple laser pricing',
    'fast laser cost',
    'quick manufacturing estimate',
  ].join(', '),
  openGraph: {
    title: 'Quick Tools - Fast Laser Calculators',
    description:
      'Fast, focused calculators for instant laser cost estimates. Get results in seconds.',
    type: 'website',
    url: 'https://lasercalcpro.com/calculators/quick',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/quick',
  },
};

export default function QuickToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

















