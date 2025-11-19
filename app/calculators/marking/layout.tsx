import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laser Marking & Engraving Cost Calculator | Pricing Tool',
  description:
    'Professional laser marking and engraving cost calculator. Estimate costs for annealing, deep engraving, etching, and coating removal using your own inputs. Get time estimates, cost breakdowns, and pricing guidance for metal, plastic, wood, and more.',
  keywords: [
    'laser marking calculator',
    'laser engraving cost',
    'fiber laser marking',
    'annealing calculator',
    'laser etching cost',
    'marking pricing tool',
    'engraving time calculator',
    'laser marking ROI',
    'industrial marking cost',
    'part marking calculator',
    'serial number marking',
    'barcode laser marking',
    'QR code engraving',
    'metal marking cost',
    'plastic laser marking',
  ].join(', '),
  openGraph: {
    title: 'Laser Marking & Engraving Cost Calculator',
    description:
      'Estimate costs for laser marking and engraving. Get time estimates, cost breakdowns, and pricing guidance to support your quotes.',
    type: 'website',
    url: 'https://lasercalcpro.com/calculators/marking',
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/calculators/marking',
  },
};

export default function MarkingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



























