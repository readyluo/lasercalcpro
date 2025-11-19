import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy Cost Calculator | Equipment Power & Carbon Analysis',
  description:
    'Estimate equipment energy consumption, peak/off-peak costs, auxiliary loads, and carbon footprint. Export savings reports for laser, CNC, plasma, and other machinery.',
  keywords: [
    'energy cost calculator',
    'manufacturing power estimator',
    'laser cutter energy usage',
    'cnc shop electricity cost',
    'industrial carbon footprint calculator',
  ].join(', '),
  openGraph: {
    title: 'Energy Cost Calculator',
    description:
      'Analyze equipment power, auxiliary loads, and carbon footprint with peak/off-peak breakdowns.',
    url: 'https://lasercalcpro.com/calculators/energy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/energy',
  },
};

export default function EnergyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
