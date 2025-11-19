import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laser Power Consumption Reference | Energy & Cost Guide',
  description:
    'Lookup fiber vs CO₂ laser power draw, auxiliary loads, and annual electricity costs. Compare equipment efficiency and plan operating budgets.',
  keywords: [
    'laser power consumption',
    'fiber laser energy cost',
    'co2 laser electricity usage',
    'manufacturing energy calculator',
    'laser equipment efficiency',
  ].join(', '),
  openGraph: {
    title: 'Laser Power Consumption Reference',
    description:
      'Power draw, auxiliary loads, and electricity cost comparison for fiber and CO₂ lasers.',
    url: 'https://lasercalcpro.com/calculators/quick-reference/power-consumption',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/quick-reference/power-consumption',
  },
};

export default function PowerConsumptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
