import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laser Cutting Speeds Reference | Fiber Benchmarks & Conversions',
  description:
    'Lookup benchmark feed rates for mild steel, stainless, and aluminum from 0.5-15 mm, plus unit conversions and workflow tips for accurate quoting.',
  keywords: [
    'laser cutting speed chart',
    'fiber laser feed rate reference',
    'laser cutting thickness guide',
    'metal cutting speed table',
    'laser processing data',
  ].join(', '),
  openGraph: {
    title: 'Laser Cutting Speeds Reference',
    description:
      'Benchmark laser cutting speeds, required power, and assist gas recommendations with unit conversions and usage workflow.',
    url: 'https://lasercalcpro.com/calculators/quick-reference/cutting-speeds',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/quick-reference/cutting-speeds',
  },
};

export default function CuttingSpeedsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
