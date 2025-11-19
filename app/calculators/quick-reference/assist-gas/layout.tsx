import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assist Gas Cost & Selection Guide | Laser Cutting Reference',
  description:
    'Compare oxygen, nitrogen, and compressed air assist gases with cost/hour, pressure, and application guidance. Optimize laser cutting quality and cost.',
  keywords: [
    'assist gas cost',
    'laser cutting oxygen vs nitrogen',
    'laser gas selection guide',
    'nitrogen generator payback',
    'laser air cutting reference',
  ].join(', '),
  openGraph: {
    title: 'Assist Gas Cost & Selection Guide',
    description:
      'Lookup assist gas pros/cons, pressures, consumption, and hourly costs for laser cutting.',
    url: 'https://lasercalcpro.com/calculators/quick-reference/assist-gas',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/quick-reference/assist-gas',
  },
};

export default function AssistGasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
