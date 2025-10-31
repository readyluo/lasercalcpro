import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Reference Tables - Laser Processing Data | LaserCalc Pro',
  description:
    'Comprehensive quick reference tables for laser processing. Instant lookup of cutting speeds, material costs, assist gas costs, power consumption, and processing parameters. Essential data for planning and quoting.',
  keywords: [
    'laser cutting speed chart',
    'material cost reference',
    'assist gas cost table',
    'laser power consumption',
    'processing parameters',
    'cutting speed reference',
    'laser cutting data',
    'fiber laser parameters',
    'manufacturing reference',
    'laser processing guide',
    'metal cutting speeds',
    'laser operating costs',
  ].join(', '),
  openGraph: {
    title: 'Quick Reference Tables - Laser Processing Data',
    description:
      'Comprehensive reference tables for laser processing. Instant data lookup for speeds, costs, and parameters.',
    type: 'website',
    url: 'https://lasercalcpro.com/calculators/quick-reference',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/quick-reference',
  },
};

export default function QuickReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}







