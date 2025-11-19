import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Material Utilization Calculator | Sheet Nesting Optimizer',
  description:
    'Estimate sheet utilization, waste cost, and nesting layouts with kerf, spacing, and rotation controls. Export material cost summaries to support laser and CNC fabrication quotes.',
  keywords: [
    'material utilization calculator',
    'sheet nesting optimizer',
    'laser nesting cost',
    'sheet metal waste calculator',
    'fabrication nesting tool',
  ].join(', '),
  openGraph: {
    title: 'Material Utilization Calculator',
    description:
      'Interactive sheet usage analysis with kerf, margin, and rotation controls. Visualize layouts and material cost impact.',
    url: 'https://lasercalcpro.com/calculators/material-utilization',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/material-utilization',
  },
};

export default function MaterialUtilizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
