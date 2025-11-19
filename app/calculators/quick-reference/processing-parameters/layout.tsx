import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laser Processing Parameters Reference | Fiber Laser Settings',
  description:
    'Lookup recommended power, speed, focus, gas pressure, and nozzle settings for mild steel, stainless steel, aluminum, and copper. Ideal for machine setup and troubleshooting.',
  keywords: [
    'laser processing parameters',
    'fiber laser cutting settings',
    'laser gas pressure reference',
    'laser focus position chart',
    'laser cutting speed table',
  ].join(', '),
  openGraph: {
    title: 'Laser Processing Parameters Reference',
    description:
      'Comprehensive fiber laser cutting parameters for multiple materials and thicknesses.',
    url: 'https://lasercalcpro.com/calculators/quick-reference/processing-parameters',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/quick-reference/processing-parameters',
  },
};

export default function ProcessingParametersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
