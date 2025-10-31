import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { generateMetadata } from '@/lib/seo/metadata';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Ruler, Layers, Wind, Target, AlertCircle, Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Kerf Width vs. Thickness & Nozzle: Practical Reference Tables 2025',
  description: 'Complete kerf width reference for laser cutting: material thickness, nozzle size, gas type impact. Optimize nesting compensation, part accuracy, and cutting quality with data tables.',
  keywords: ['laser kerf width', 'kerf compensation', 'nozzle diameter', 'laser cutting accuracy', 'kerf allowance', 'laser beam width', 'nesting offset'],
});

// Structured Data - HowTo Schema
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply Kerf Compensation in Laser Cutting',
  description: 'Step-by-step guide to understanding and applying kerf width compensation for accurate laser cutting',
  tool: [
    {
      '@type': 'HowToTool',
      name: 'CAM Software with Kerf Compensation',
    },
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Measure Actual Kerf Width',
      text: 'Cut test pieces and measure the actual kerf width with calipers. Typical range: 0.1-0.5mm depending on material, thickness, and nozzle.',
    },
    {
      '@type': 'HowToStep',
      name: 'Understand Kerf Impact on Dimensions',
      text: 'External features will be oversized by kerf/2 on each side. Internal features (holes) will be undersized by kerf/2 on each side.',
    },
    {
      '@type': 'HowToStep',
      name: 'Apply Compensation in CAM',
      text: 'Set kerf offset in CAM software. For external cuts, laser path moves inward by kerf/2. For internal cuts, laser path moves outward by kerf/2.',
    },
    {
      '@type': 'HowToStep',
      name: 'Verify with Test Cuts',
      text: 'Cut test parts and verify dimensions with calipers. Adjust kerf compensation value if needed based on actual results.',
    },
  ],
};

export default function KerfWidthReferencePage() {
  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Kerf Width vs. Thickness & Nozzle
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl">
              Practical reference tables for laser cutting kerf width. Understand how material thickness, 
              nozzle diameter, and gas type affect kerf to optimize nesting compensation, dimensional 
              accuracy, and part quality.
            </p>
          </div>

          {/* What is Kerf Card */}
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 mb-12">
            <div className="flex items-start gap-4">
              <Ruler className="h-8 w-8 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">What is Kerf Width?</h2>
                <p className="text-gray-700 mb-3">
                  <strong>Kerf</strong> is the width of material removed during the laser cutting process. 
                  It consists of the actual laser beam spot size plus the molten material expelled by assist gas. 
                  Typical kerf ranges: <strong>0.1-0.5mm</strong> depending on material, thickness, and nozzle.
                </p>
                <p className="text-gray-700">
                  <strong>Why It Matters:</strong> Kerf width directly affects part dimensions. Without proper 
                  compensation in your CAM software, parts will be oversized (external features) or undersized 
                  (holes/internal features) by half the kerf width on each side.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">

              {/* Factors Affecting Kerf */}
              <section className="card">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Factors Affecting Kerf Width</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Layers className="h-6 w-6 text-primary-600" />
                      <h3 className="font-bold text-gray-900">1. Material Thickness</h3>
                    </div>
                    <p className="text-gray-700 mb-2">
                      Thicker materials require more energy to melt through, creating wider molten zones 
                      and larger kerf. Kerf increases approximately 0.02-0.05mm per mm of thickness.
                    </p>
                    <p className="text-sm text-gray-600">
                      Example: 1mm stainless = 0.15mm kerf; 10mm stainless = 0.30-0.40mm kerf
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-6 w-6 text-primary-600" />
                      <h3 className="font-bold text-gray-900">2. Nozzle Diameter</h3>
                    </div>
                    <p className="text-gray-700 mb-2">
                      Larger nozzles allow wider beam focus and higher gas flow, increasing kerf width. 
                      Nozzle selection depends on material thickness and desired cut quality.
                    </p>
                    <p className="text-sm text-gray-600">
                      Typical range: 1.0mm nozzle → 0.10-0.15mm kerf; 3.0mm nozzle → 0.25-0.40mm kerf
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Wind className="h-6 w-6 text-primary-600" />
                      <h3 className="font-bold text-gray-900">3. Assist Gas Type & Pressure</h3>
                    </div>
                    <p className="text-gray-700 mb-2">
                      Nitrogen (inert) produces cleaner, slightly narrower kerfs than oxygen (reactive). 
                      Higher gas pressure increases kerf slightly but improves material ejection.
                    </p>
                    <p className="text-sm text-gray-600">
                      Oxygen on mild steel: +10-20% kerf width vs nitrogen due to exothermic reaction
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Ruler className="h-6 w-6 text-primary-600" />
                      <h3 className="font-bold text-gray-900">4. Laser Power & Focus Position</h3>
                    </div>
                    <p className="text-gray-700 mb-2">
                      Higher power creates wider melted zones. Focus position (surface, middle, or below surface) 
                      affects beam diameter through the material thickness, influencing top/bottom kerf width.
                    </p>
                    <p className="text-sm text-gray-600">
                      Defocused cutting (thick material) can increase kerf by 20-40%
                    </p>
                  </div>
                </div>
              </section>

              {/* Kerf Width Tables - Mild Steel */}
              <section className="card">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Kerf Width Reference Tables</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-gray-500 rounded"></span>
                    Mild Steel (Oxygen Assist)
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    3-6kW fiber laser, standard cutting parameters. Kerf is typically 10-20% wider than nitrogen 
                    due to oxidation reaction.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Nozzle Ø</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Focus Pos.</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Kerf Width</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Tolerance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">1mm</td>
                          <td className="border border-gray-300 px-3 py-2">1.0-1.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">On surface</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.15-0.20mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.05mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">3mm</td>
                          <td className="border border-gray-300 px-3 py-2">1.5-2.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-1mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.20-0.25mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.05mm</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">6mm</td>
                          <td className="border border-gray-300 px-3 py-2">2.0-2.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">-2mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.25-0.35mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.08mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">10mm</td>
                          <td className="border border-gray-300 px-3 py-2">2.5-3.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-3mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.35-0.45mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.10mm</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">15mm</td>
                          <td className="border border-gray-300 px-3 py-2">3.0-3.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">-4mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.40-0.55mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.12mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">20mm</td>
                          <td className="border border-gray-300 px-3 py-2">3.5-4.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-5mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.50-0.65mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.15mm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-gray-400 rounded"></span>
                    Stainless Steel 304 (Nitrogen Assist)
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    3-6kW fiber laser with high-pressure nitrogen. Produces clean, oxide-free edges with 
                    tighter kerf than oxygen cutting.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Nozzle Ø</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Focus Pos.</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Kerf Width</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Tolerance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">0.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">1.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">On surface</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.10-0.14mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.03mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">1mm</td>
                          <td className="border border-gray-300 px-3 py-2">1.0-1.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">On surface</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.12-0.18mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.04mm</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">3mm</td>
                          <td className="border border-gray-300 px-3 py-2">1.5-2.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-1mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.18-0.25mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.05mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">6mm</td>
                          <td className="border border-gray-300 px-3 py-2">2.0-2.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">-2mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.25-0.32mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.06mm</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">8mm</td>
                          <td className="border border-gray-300 px-3 py-2">2.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">-2.5mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.28-0.38mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.08mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">10mm</td>
                          <td className="border border-gray-300 px-3 py-2">2.5-3.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-3mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.32-0.42mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.10mm</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">12mm</td>
                          <td className="border border-gray-300 px-3 py-2">3.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-3.5mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.35-0.48mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.12mm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-blue-400 rounded"></span>
                    Aluminum 5052 (Nitrogen Assist)
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    High-power fiber laser (6-12kW) required for thick aluminum. Kerf tends to be wider 
                    due to high thermal conductivity and lower melting point.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Nozzle Ø</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Focus Pos.</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Kerf Width</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Tolerance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">1mm</td>
                          <td className="border border-gray-300 px-3 py-2">1.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">On surface</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.15-0.22mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.05mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">3mm</td>
                          <td className="border border-gray-300 px-3 py-2">2.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-1mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.22-0.30mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.06mm</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">6mm</td>
                          <td className="border border-gray-300 px-3 py-2">2.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">-2mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.30-0.40mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.08mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">10mm</td>
                          <td className="border border-gray-300 px-3 py-2">3.0mm</td>
                          <td className="border border-gray-300 px-3 py-2">-3mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.38-0.50mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.10mm</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">12mm</td>
                          <td className="border border-gray-300 px-3 py-2">3.0-3.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">-3.5mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.42-0.58mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.12mm</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">15mm</td>
                          <td className="border border-gray-300 px-3 py-2">3.5mm</td>
                          <td className="border border-gray-300 px-3 py-2">-4mm below</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">0.48-0.65mm</td>
                          <td className="border border-gray-300 px-3 py-2">±0.15mm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> These values are typical ranges. Actual kerf depends on specific 
                    machine configuration, focus quality, gas purity, and cutting parameters. Always verify with 
                    test cuts on your equipment before critical production runs.
                  </p>
                </div>
              </section>

              {/* Kerf Compensation */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Applying Kerf Compensation</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  CAM software compensates for kerf by offsetting the cutting path inward (for external features) 
                  or outward (for holes/internal features) by half the kerf width.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-500">
                    <h3 className="font-bold text-gray-900 mb-3">External Features (Perimeter Cuts)</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Target dimension:</span>
                        <span className="font-mono font-semibold">100.00mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Kerf width:</span>
                        <span className="font-mono font-semibold">0.20mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Offset (inward):</span>
                        <span className="font-mono font-semibold">-0.10mm</span>
                      </div>
                      <div className="border-t border-blue-300 pt-2 mt-2 flex justify-between">
                        <span className="text-gray-700 font-semibold">CAM path dimension:</span>
                        <span className="font-mono font-bold text-primary-600">100.10mm</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      Path is slightly larger; laser removes 0.10mm from each side, leaving exactly 100.00mm part.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-500">
                    <h3 className="font-bold text-gray-900 mb-3">Internal Features (Holes)</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Target hole diameter:</span>
                        <span className="font-mono font-semibold">20.00mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Kerf width:</span>
                        <span className="font-mono font-semibold">0.20mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Offset (outward):</span>
                        <span className="font-mono font-semibold">+0.10mm</span>
                      </div>
                      <div className="border-t border-green-300 pt-2 mt-2 flex justify-between">
                        <span className="text-gray-700 font-semibold">CAM path dimension:</span>
                        <span className="font-mono font-bold text-primary-600">19.90mm</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      Path is slightly smaller; laser removes 0.10mm from each side, creating exactly 20.00mm hole.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Common CAM Software Settings</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold min-w-[120px]">SigmaNEST:</span>
                      <span>Set "Kerf Width" in Material Database → Auto-compensates all features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold min-w-[120px]">Lantek:</span>
                      <span>Technology table → "Kerf compensation" → Inside/Outside/No compensation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold min-w-[120px]">Radan:</span>
                      <span>Material setup → "Beam offset" value → Automatically applied to paths</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold min-w-[120px]">SheetCAM:</span>
                      <span>Tool definition → "Kerf width" → Specify compensation direction per cut</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Common Mistakes
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• <strong>Forgetting to measure actual kerf:</strong> Using default values leads to dimensional errors</li>
                    <li>• <strong>Wrong compensation direction:</strong> External features offset outward instead of inward</li>
                    <li>• <strong>Ignoring tolerance variation:</strong> Kerf changes with worn nozzles, dirty optics, focus drift</li>
                    <li>• <strong>Not updating for material changes:</strong> Switching from 3mm to 10mm requires different compensation</li>
                  </ul>
                </div>
              </section>

              {/* Quality Implications */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Kerf Width & Cut Quality</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Dimensional Accuracy</h3>
                    <p className="text-gray-700 mb-2">
                      Proper kerf compensation achieves ±0.05-0.15mm tolerance on thin materials (1-3mm) and 
                      ±0.10-0.25mm on thick materials (>6mm). Without compensation, errors are typically 
                      2-5x the kerf width.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 bg-green-50 rounded">
                        <p className="font-semibold text-green-700 mb-1">✓ With Compensation</p>
                        <p className="text-gray-700">100mm part measures 99.95-100.05mm</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded">
                        <p className="font-semibold text-red-700 mb-1">✗ Without Compensation</p>
                        <p className="text-gray-700">100mm part measures 100.20-100.40mm</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Small Features & Thin Walls</h3>
                    <p className="text-gray-700 mb-2">
                      Kerf width limits minimum feature size. A hole smaller than 1.5× the kerf width may not 
                      cut cleanly. Thin walls (bridges) should be at least 2× the kerf width to avoid burn-through.
                    </p>
                    <div className="bg-gray-100 p-3 rounded text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Kerf: 0.20mm → Min hole diameter:</span>
                        <span className="font-semibold">≥0.30mm (practical: ≥1.0mm)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kerf: 0.20mm → Min wall thickness:</span>
                        <span className="font-semibold">≥0.40mm (practical: ≥0.8mm)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Taper & Edge Quality</h3>
                    <p className="text-gray-700">
                      Kerf width at the top surface is typically 0.02-0.08mm narrower than at the bottom due to 
                      beam divergence. This creates slight taper (1-3° on thick materials). Tighter kerf generally 
                      correlates with better edge perpendicularity and less dross.
                    </p>
                  </div>
                </div>
              </section>

              {/* Measurement Guide */}
              <section className="card bg-gradient-to-br from-primary-50 to-blue-50">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Measure Kerf Width</h2>
                
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-600">1.</span>
                    <div>
                      <p className="font-semibold">Cut a test square with no kerf compensation</p>
                      <p className="text-sm text-gray-600">Program a 100.00mm × 100.00mm square in your CAM software with kerf comp disabled</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-600">2.</span>
                    <div>
                      <p className="font-semibold">Measure the finished part with calipers or CMM</p>
                      <p className="text-sm text-gray-600">Record actual dimensions (e.g., 99.82mm × 99.80mm)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-600">3.</span>
                    <div>
                      <p className="font-semibold">Calculate kerf: Target - Actual = Total kerf removed</p>
                      <p className="text-sm text-gray-600">100.00mm - 99.82mm = 0.18mm total removed from both sides</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-600">4.</span>
                    <div>
                      <p className="font-semibold">Verify with a test hole</p>
                      <p className="text-sm text-gray-600">Program 20.00mm hole, measure actual (e.g., 20.18mm). Kerf = 0.18mm confirms external cut result</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-600">5.</span>
                    <div>
                      <p className="font-semibold">Enter kerf value into CAM software</p>
                      <p className="text-sm text-gray-600">Use the average measured value. Repeat for each material/thickness combination</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-4 p-3 bg-white rounded border-2 border-primary-600">
                  <p className="text-sm text-gray-700">
                    <strong>Pro Tip:</strong> Perform kerf tests quarterly or after major maintenance (lens replacement, 
                    nozzle changes) to catch drift. Keep a logbook of kerf values by material/thickness for quick reference.
                  </p>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick Reference Card */}
              <div className="card bg-gradient-to-br from-primary-600 to-blue-600 text-white">
                <h3 className="text-xl font-bold mb-3">Quick Kerf Reference</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-white/10 rounded">
                    <p className="text-primary-100 mb-1">Thin Material (1-3mm)</p>
                    <p className="text-2xl font-bold">0.10-0.25mm</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded">
                    <p className="text-primary-100 mb-1">Medium (4-8mm)</p>
                    <p className="text-2xl font-bold">0.25-0.35mm</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded">
                    <p className="text-primary-100 mb-1">Thick (10-20mm)</p>
                    <p className="text-2xl font-bold">0.35-0.65mm</p>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Tools & Guides</h3>
                <div className="space-y-3">
                  <Link
                    href="/calculators/cost-center/kerf-reference"
                    className="block p-3 bg-primary-50 rounded hover:bg-primary-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Kerf Calculator</p>
                    <p className="text-sm text-gray-600">Interactive kerf lookup tool</p>
                  </Link>
                  <Link
                    href="/calculators/material-utilization"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Material Utilization</p>
                    <p className="text-sm text-gray-600">Optimize nesting efficiency</p>
                  </Link>
                  <Link
                    href="/guides/piercing-strategy"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Piercing Strategy Guide</p>
                    <p className="text-sm text-gray-600">Optimize pierce time & quality</p>
                  </Link>
                </div>
              </div>

              {/* Nozzle Size Guide */}
              <div className="card bg-orange-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Nozzle Selection Quick Guide</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">0.5-2mm material</span>
                    <span className="font-semibold text-primary-600">1.0-1.5mm nozzle</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">3-6mm material</span>
                    <span className="font-semibold text-primary-600">1.5-2.5mm nozzle</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">8-12mm material</span>
                    <span className="font-semibold text-primary-600">2.5-3.0mm nozzle</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">15-20mm material</span>
                    <span className="font-semibold text-primary-600">3.0-4.0mm nozzle</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom CTA */}
          <div className="card bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Master Every Aspect of Laser Cutting</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              From kerf compensation to hourly rates, our comprehensive guides and calculators 
              help you optimize quality, cost, and efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                View All Guides
                </Button>
              </Link>
              <Link href="/calculators/cost-center">
                <Button variant="secondary" size="lg">
                Explore Cost Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

