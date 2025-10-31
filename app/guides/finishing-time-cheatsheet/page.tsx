import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';
import { FileText, Clock, Sparkles, Shield, Package, Calculator, ArrowRight, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Post-Cut Finishing Time Cheat Sheet: Deburring, Cleaning, Treatment',
  description: 'Quick reference for laser cut finishing time estimates: deburring methods, edge treatment, cleaning, coating. Optimize labor planning and quotations with real-world time benchmarks.',
  keywords: ['deburring time', 'laser cut finishing', 'edge treatment time', 'post-processing time', 'cleaning laser parts', 'finishing labor cost', 'deburring methods comparison'],
});

export default function FinishingTimeCheatsheetPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Post-Cut Finishing Time Cheat Sheet
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl">
              Quick reference guide for estimating finishing, deburring, and post-processing time 
              after laser cutting. Use these benchmarks for accurate labor planning and quotations.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="card bg-gradient-to-br from-purple-50 to-pink-50 mb-12">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Why Finishing Time Matters</h2>
                <p className="text-gray-700 mb-3">
                  Laser cutting is often quoted by machine hour, but finishing labor can add <strong>30-200%</strong> to 
                  total cycle time. Thin materials with nitrogen cutting may need minimal finishing (30 sec/meter), 
                  while thick oxygen-cut steel can require extensive deburring (5-15 min/meter).
                </p>
                <p className="text-gray-700">
                  <strong>Bottom Line:</strong> Finishing time directly affects delivery schedules and labor costs. 
                  Accurate estimates prevent underpricing and missed deadlines.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">

              {/* Deburring Methods Comparison */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Deburring Methods Comparison</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  Choose deburring method based on part complexity, quality requirements, and production volume. 
                  Times shown are per linear meter of edge.
                </p>

                <div className="space-y-4">
                  {/* Manual Deburring */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Manual Deburring (Hand File/Grinder)</h3>
                      <span className="text-xl font-bold text-primary-600">2-8 min/m</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Low-volume production (1-10 parts)</li>
                          <li>• Complex geometries with tight corners</li>
                          <li>• Parts requiring selective deburring</li>
                          <li>• Prototype and custom work</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Considerations:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Labor-intensive, inconsistent quality</li>
                          <li>• Operator skill dependent</li>
                          <li>• Risk of over-deburring/damage</li>
                          <li>• Ergonomic concerns (repetitive strain)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Time by Material Thickness:</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-600">1-3mm:</span> <strong>2-3 min/m</strong></div>
                        <div><span className="text-gray-600">6-10mm:</span> <strong>4-6 min/m</strong></div>
                        <div><span className="text-gray-600">12-20mm:</span> <strong>6-8 min/m</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Belt Grinder */}
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Belt/Disc Grinder</h3>
                      <span className="text-xl font-bold text-primary-600">1-3 min/m</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Medium-volume (10-100 parts/batch)</li>
                          <li>• Flat or gently curved edges</li>
                          <li>• Parts with long straight sections</li>
                          <li>• Consistent edge radius requirements</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Considerations:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Faster than manual, more consistent</li>
                          <li>• Limited access to tight internal features</li>
                          <li>• Requires operator attention per part</li>
                          <li>• Dust generation (ventilation needed)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Time by Material Thickness:</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-600">1-3mm:</span> <strong>1-1.5 min/m</strong></div>
                        <div><span className="text-gray-600">6-10mm:</span> <strong>1.5-2.5 min/m</strong></div>
                        <div><span className="text-gray-600">12-20mm:</span> <strong>2-3 min/m</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Brush Deburring */}
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-500">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Brush Deburring Machine</h3>
                      <span className="text-xl font-bold text-primary-600">0.3-1.5 min/m</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• High-volume production (>100 parts)</li>
                          <li>• Flat sheet parts (single-pass)</li>
                          <li>• Light burr removal only</li>
                          <li>• Batch processing of similar parts</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Considerations:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• High throughput, low labor per part</li>
                          <li>• Capital investment ($5K-25K)</li>
                          <li>• Limited to relatively flat parts</li>
                          <li>• May not remove heavy burrs</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Time by Material Thickness:</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-600">1-3mm:</span> <strong>0.3-0.6 min/m</strong></div>
                        <div><span className="text-gray-600">6-10mm:</span> <strong>0.6-1.0 min/m</strong></div>
                        <div><span className="text-gray-600">12-20mm:</span> <strong>1.0-1.5 min/m</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Tumbling/Vibratory */}
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Tumbling/Vibratory Finishing</h3>
                      <span className="text-xl font-bold text-primary-600">Batch: 1-4 hrs</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Very high volume (>500 parts/batch)</li>
                          <li>• Small to medium-sized parts</li>
                          <li>• Uniform deburring + surface finish</li>
                          <li>• Parts that can tolerate mass contact</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Considerations:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Minimal labor (load/unload only)</li>
                          <li>• Long cycle time (1-4 hours per batch)</li>
                          <li>• Cannot be used for fragile/precision parts</li>
                          <li>• Media cost and disposal</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Typical Batch Capacity & Time:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-gray-600">Small parts (&lt;100cm²):</span> <strong>200-500 pcs, 1-2 hrs</strong></div>
                        <div><span className="text-gray-600">Medium parts (100-500cm²):</span> <strong>50-150 pcs, 2-4 hrs</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Time Estimates by Cut Quality */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Finishing Time by Cut Quality</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  Cutting parameters and assist gas dramatically affect finishing requirements. 
                  Times are for manual deburring per linear meter of edge.
                </p>

                {/* Nitrogen Cut - Stainless */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    Nitrogen Cut - Stainless Steel (Clean, oxide-free)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Burr Type</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Finishing Required</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Time/Meter</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">1-2mm</td>
                          <td className="border border-gray-300 px-3 py-2">Minimal/none</td>
                          <td className="border border-gray-300 px-3 py-2">Light brush or none</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-green-600">0.5-1 min</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">3-5mm</td>
                          <td className="border border-gray-300 px-3 py-2">Small bottom burr</td>
                          <td className="border border-gray-300 px-3 py-2">Light deburring tool</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-green-600">1-2 min</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">6-10mm</td>
                          <td className="border border-gray-300 px-3 py-2">Moderate burr</td>
                          <td className="border border-gray-300 px-3 py-2">Hand file + deburring</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">2-4 min</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">12-15mm</td>
                          <td className="border border-gray-300 px-3 py-2">Heavy burr + dross</td>
                          <td className="border border-gray-300 px-3 py-2">File + grinder both sides</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-orange-600">4-6 min</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Oxygen Cut - Mild Steel */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-orange-500 rounded-full"></span>
                    Oxygen Cut - Mild Steel (Oxide edge, heavier burr)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Burr Type</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Finishing Required</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Time/Meter</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">1-2mm</td>
                          <td className="border border-gray-300 px-3 py-2">Light oxide burr</td>
                          <td className="border border-gray-300 px-3 py-2">Brush + light deburr</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">1-2 min</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">3-5mm</td>
                          <td className="border border-gray-300 px-3 py-2">Moderate oxide + burr</td>
                          <td className="border border-gray-300 px-3 py-2">File + wire brush</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">2-3 min</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">6-10mm</td>
                          <td className="border border-gray-300 px-3 py-2">Heavy burr + oxide</td>
                          <td className="border border-gray-300 px-3 py-2">Grinder + file both sides</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-orange-600">4-6 min</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">12-20mm</td>
                          <td className="border border-gray-300 px-3 py-2">Very heavy burr/dross</td>
                          <td className="border border-gray-300 px-3 py-2">Angle grinder + cleanup</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-red-600">6-10 min</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Aluminum */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>
                    Aluminum (Nitrogen) - Typically clean cuts
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Burr Type</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Finishing Required</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Time/Meter</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">1-3mm</td>
                          <td className="border border-gray-300 px-3 py-2">Very light burr</td>
                          <td className="border border-gray-300 px-3 py-2">Brush or none</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-green-600">0.5-1.5 min</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2">5-8mm</td>
                          <td className="border border-gray-300 px-3 py-2">Small to moderate</td>
                          <td className="border border-gray-300 px-3 py-2">Light file/deburr</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-primary-600">1.5-3 min</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">10-15mm</td>
                          <td className="border border-gray-300 px-3 py-2">Moderate burr</td>
                          <td className="border border-gray-300 px-3 py-2">File + grinder</td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold text-orange-600">3-5 min</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Times assume experienced operators. First-time or unskilled labor 
                    may take 1.5-2× longer. Complex geometries (small holes, tight internal corners) add 20-50% time.
                  </p>
                </div>
              </section>

              {/* Additional Finishing Operations */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Additional Finishing Operations</h2>
                </div>

                <div className="space-y-4">
                  {/* Cleaning */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cleaning & Residue Removal</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Wipe-down (dry cloth)</p>
                        <p className="text-gray-600">Remove dust and loose particles</p>
                        <p className="font-mono text-primary-600">15-30 sec/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Solvent cleaning</p>
                        <p className="text-gray-600">Remove oil, cutting residue, marking ink</p>
                        <p className="font-mono text-primary-600">1-3 min/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Ultrasonic cleaning</p>
                        <p className="text-gray-600">Deep clean complex parts (batch)</p>
                        <p className="font-mono text-primary-600">5-15 min/batch</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Blast cleaning (media)</p>
                        <p className="text-gray-600">Remove oxide, scale, surface prep</p>
                        <p className="font-mono text-primary-600">2-5 min/part</p>
                      </div>
                    </div>
                  </div>

                  {/* Surface Treatment */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Surface Treatment & Coating</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Powder coating prep</p>
                        <p className="text-gray-600">Mask, hang, prepare for coating line</p>
                        <p className="font-mono text-primary-600">3-8 min/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Passivation (stainless)</p>
                        <p className="text-gray-600">Chemical bath to restore corrosion resistance</p>
                        <p className="font-mono text-primary-600">20-60 min batch cycle</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Oil/rust preventive</p>
                        <p className="text-gray-600">Apply protective coating for storage/shipping</p>
                        <p className="font-mono text-primary-600">30-90 sec/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Edge sealing (aluminum)</p>
                        <p className="text-gray-600">Seal cut edges before anodizing</p>
                        <p className="font-mono text-primary-600">2-4 min/part</p>
                      </div>
                    </div>
                  </div>

                  {/* Inspection & QC */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Inspection & Quality Control</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Visual inspection</p>
                        <p className="text-gray-600">Check for defects, proper deburring</p>
                        <p className="font-mono text-primary-600">30-60 sec/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Dimensional verification</p>
                        <p className="text-gray-600">Caliper check critical dimensions</p>
                        <p className="font-mono text-primary-600">1-3 min/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Surface roughness test</p>
                        <p className="text-gray-600">Profilometer measurement (sample)</p>
                        <p className="font-mono text-primary-600">2-5 min/sample</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Full CMM inspection</p>
                        <p className="text-gray-600">Critical features, first article, aerospace</p>
                        <p className="font-mono text-primary-600">15-60 min/part</p>
                      </div>
                    </div>
                  </div>

                  {/* Packaging */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary-600" />
                      Packaging & Preparation
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Basic wrapping (paper/plastic)</p>
                        <p className="text-gray-600">Prevent scratches in transit</p>
                        <p className="font-mono text-primary-600">30-90 sec/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Individual bagging (poly)</p>
                        <p className="text-gray-600">Separate parts, add labels/barcodes</p>
                        <p className="font-mono text-primary-600">1-2 min/part</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Custom crating/padding</p>
                        <p className="text-gray-600">Foam, cardboard dividers for fragile parts</p>
                        <p className="font-mono text-primary-600">5-15 min/shipment</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Labeling & documentation</p>
                        <p className="text-gray-600">Part tags, certs, packing lists</p>
                        <p className="font-mono text-primary-600">2-5 min/order</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cost Impact Example */}
              <section className="card bg-gradient-to-br from-orange-50 to-red-50">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Real-World Cost Impact Example</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  <strong>Job:</strong> 50 brackets, 6mm mild steel (oxygen cut), 2 meters of edge per part
                </p>

                <div className="bg-white rounded-lg p-5 space-y-3 text-sm mb-4">
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Cost Component</span>
                    <span className="font-semibold text-gray-900">Amount</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-700">Laser cutting time (2 min/part)</span>
                    <span className="font-mono">100 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Laser cost @ $75/hour</span>
                    <span className="font-mono font-semibold text-primary-600">$125.00</span>
                  </div>

                  <div className="border-t border-gray-200 pt-2"></div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-700">Deburring time (5 min/m × 2m/part × 50)</span>
                    <span className="font-mono">500 minutes (8.3 hrs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Labor cost @ $35/hour loaded</span>
                    <span className="font-mono font-semibold text-orange-600">$290.50</span>
                  </div>

                  <div className="border-t border-gray-200 pt-2"></div>

                  <div className="flex justify-between">
                    <span className="text-gray-700">Cleaning & packaging (2 min/part)</span>
                    <span className="font-mono">100 minutes (1.67 hrs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Labor cost @ $30/hour loaded</span>
                    <span className="font-mono font-semibold text-blue-600">$50.00</span>
                  </div>

                  <div className="border-t-2 border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between text-base">
                      <span className="font-bold text-gray-900">Total Direct Cost</span>
                      <span className="font-mono font-bold text-primary-600">$465.50</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-700">Laser cutting as % of total</span>
                      <span className="font-mono">26.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Finishing as % of total</span>
                      <span className="font-mono font-semibold text-orange-600">73.1%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-l-4 border-orange-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Key Insight:</strong> In this scenario, finishing labor costs 2.7× more than the actual 
                    laser cutting. Underestimating finishing time by even 20% would eliminate most profit margin. 
                    This is why nitrogen cutting (cleaner edges, less finishing) often justifies higher gas costs.
                  </p>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Calculator CTA */}
              <div className="card bg-gradient-to-br from-primary-600 to-blue-600 text-white">
                <h3 className="text-xl font-bold mb-3">Calculate Finishing Costs</h3>
                <p className="mb-4 text-primary-50">
                  Use our interactive tool to estimate total finishing time and labor costs for your jobs.
                </p>
                <Link
                  href="/calculators/cost-center/finishing-guide"
                  className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 w-full justify-center font-semibold"
                >
                  <Calculator className="h-5 w-5" />
                  Finishing Calculator
                </Link>
              </div>

              {/* Quick Reference */}
              <div className="card bg-purple-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Time Reference</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Thin Nitrogen Cut</p>
                    <p className="text-2xl font-bold text-green-600">0.5-2 min/m</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Medium Thickness</p>
                    <p className="text-2xl font-bold text-primary-600">2-4 min/m</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Thick Oxygen Cut</p>
                    <p className="text-2xl font-bold text-orange-600">4-10 min/m</p>
                  </div>
                </div>
              </div>

              {/* Related Guides */}
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Guides</h3>
                <div className="space-y-3">
                  <Link
                    href="/guides/hourly-cost-structure"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Hourly Cost Structure</p>
                    <p className="text-sm text-gray-600">Calculate true operating costs</p>
                  </Link>
                  <Link
                    href="/guides/piercing-strategy"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Piercing Strategy Guide</p>
                    <p className="text-sm text-gray-600">Optimize pierce time & quality</p>
                  </Link>
                  <Link
                    href="/guides/kerf-width-reference"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Kerf Width Reference</p>
                    <p className="text-sm text-gray-600">Dimensional accuracy guide</p>
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom CTA */}
          <div className="card bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Complete Manufacturing Cost Mastery</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              From cutting to finishing, our guides and calculators help you understand every cost 
              component and optimize profitability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/guides"
                className="btn-primary bg-primary-600 hover:bg-primary-700"
              >
                Browse All Guides
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/calculators/cost-center"
                className="btn-secondary bg-white text-gray-900 hover:bg-gray-100"
              >
                View Cost Tools
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

