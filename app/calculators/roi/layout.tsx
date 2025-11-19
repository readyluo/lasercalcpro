import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipment ROI Calculator | Payback, NPV & IRR Analysis',
  description:
    'Model equipment ROI with cash flow projections, payback period, loan amortization, and NPV/IRR metrics. Export ROI summaries to support your investment decisions.',
  keywords: [
    'equipment roi calculator',
    'npv irr calculator',
    'manufacturing investment analysis',
    'payback period calculator',
    'loan amortization roi tool',
  ].join(', '),
  openGraph: {
    title: 'Equipment ROI Calculator',
    description:
      'Analyze equipment investments with monthly cash flow, loan amortization, and payback metrics.',
    url: 'https://lasercalcpro.com/calculators/roi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/roi',
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
