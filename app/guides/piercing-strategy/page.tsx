import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';
import { Target, Clock, Zap, AlertTriangle, CheckCircle, TrendingDown, Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Piercing Strategy for Laser Cutting: Time & Quality Trade-offs Guide',
  description: 'Master laser piercing techniques for sheet metal cutting. Compare standard, soft, and ramp piercing strategies. Optimize for time, quality, and nozzle life with data-driven decisions.',
  keywords: ['laser piercing time', 'pierce strategy', 'laser cutting pierce', 'soft piercing', 'ramp piercing', 'nozzle life optimization', 'laser dwell time'],
});

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is laser piercing and why is it necessary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Laser piercing is the initial penetration phase where the laser beam creates a starting hole through the material before beginning the cutting path. It\'s necessary because lasers cannot start cutting from the edge instantaneously - they need to establish a molten pool and eject material to begin the cut. Piercing time accounts for 10-40% of total cycle time in parts with many holes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the different piercing strategies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The three main strategies are: (1) Standard Piercing - full power, fastest but creates spatter damage; (2) Soft Piercing - gradual power ramp, cleaner but slower; (3) Ramp Piercing - circular motion during pierce, excellent quality but slowest. Choice depends on material thickness, quality requirements, and production volume.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does laser piercing take for different materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pierce time varies dramatically by material thickness and type. For 3mm stainless steel: 0.5-1.5 seconds. For 10mm mild steel: 3-8 seconds. For 20mm aluminum: 5-12 seconds. Thicker materials and harder alloys require exponentially longer pierce times. Using oxygen assist on mild steel can reduce pierce time by 40-60% compared to nitrogen.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I reduce piercing time and costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Five key strategies: (1) Optimize nesting to minimize pierce count; (2) Use edge starts instead of piercing where possible; (3) Select appropriate pierce strategy for quality requirements; (4) Use oxygen assist for mild steel; (5) Increase laser power for thicker materials. Reducing pierce count from 200 to 100 per sheet can save 5-15 minutes per sheet.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes nozzle damage during piercing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nozzle damage occurs from: (1) Back-spatter from molten material ejection hitting the nozzle face; (2) Excessive heat buildup during long pierces in thick material; (3) Insufficient standoff distance allowing spatter contact; (4) Contamination from oxide buildup. Soft piercing and proper gas pressure reduce damage by 60-80%, extending nozzle life from 50 to 200+ pierces.',
      },
    },
  ],
};

export default function PiercingStrategyPage() {
  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Piercing Strategy for Laser Cutting
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl">
              Time vs. Quality Trade-offs: A complete guide to laser piercing optimization. 
              Learn when to use standard, soft, or ramp piercing strategies to balance 
              cycle time, part quality, and nozzle life.
            </p>
          </div>

          {/* Quick Reference Card */}
          <div className="card bg-gradient-to-br from-orange-50 to-red-50 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Decision Guide</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Standard Pierce</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">Use when: High volume, non-critical quality, thin material (&lt;6mm)</p>
                <p className="text-xs text-gray-600">✓ Fastest • ✗ Spatter damage</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-primary-600">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <h3 className="font-bold text-gray-900">Soft Pierce</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">Use when: Balance needed, visible surfaces, 3-12mm material</p>
                <p className="text-xs text-gray-600">✓ Clean • ✓ Moderate speed</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <h3 className="font-bold text-gray-900">Ramp Pierce</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">Use when: Thick material (>10mm), aerospace quality, minimal spatter</p>
                <p className="text-xs text-gray-600">✓ Best quality • ✗ Slowest</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">

              {/* Why Piercing Matters */}
              <section className="card">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Piercing Strategy Matters</h2>
                <p className="text-gray-700 mb-4">
                  Laser piercing is the initial penetration phase before the cutting path begins. 
                  Unlike continuous cutting, piercing creates concentrated heat and violent material 
                  ejection in a confined area, causing:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li><strong>Back-spatter damage:</strong> Molten material rebounds onto the part surface, creating dross and pitting</li>
                  <li><strong>Nozzle contamination:</strong> Spatter buildup shortens nozzle life from 200 to 50 pierces</li>
                  <li><strong>Cycle time impact:</strong> 10-40% of total job time is spent piercing in high-hole-count parts</li>
                  <li><strong>Heat-affected zone:</strong> Excessive dwell creates wider HAZ, affecting nearby features</li>
                </ul>
                
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Cost Impact Example:</strong> A sheet with 150 holes at 2 seconds per pierce = 5 minutes of piercing. 
                    Optimizing pierce strategy and nesting to reduce count by 30% saves 1.5 minutes per sheet, 
                    or 15 hours/month at 600 sheets/month.
                  </p>
                </div>
              </section>

              {/* Strategy Comparison */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Piercing Strategy Comparison</h2>
                </div>

                {/* Standard Pierce */}
                <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-orange-600" />
                    1. Standard Piercing (Full Power)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Laser immediately ramps to full cutting power at pierce location. Creates instant 
                    molten pool and blasts through material.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">✓ Advantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Fastest cycle time (baseline)</li>
                        <li>• Simple programming, no parameter tuning</li>
                        <li>• Effective for thin materials (&lt;3mm)</li>
                        <li>• Reliable piercing in dirty/scaled material</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">✗ Disadvantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Heavy spatter on top surface (0.5-2mm radius)</li>
                        <li>• Severe nozzle contamination (50-100 pierces)</li>
                        <li>• Dross buildup on bottom surface</li>
                        <li>• Not suitable for visible/cosmetic surfaces</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Typical Time (3mm Stainless, Nitrogen):</p>
                    <p className="text-2xl font-bold text-primary-600">0.5-0.8 seconds/pierce</p>
                  </div>
                </div>

                {/* Soft Pierce */}
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border-2 border-primary-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                    2. Soft Piercing (Gradual Power Ramp)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Laser starts at reduced power (40-70%) and gradually increases to cutting power over 
                    0.3-1.0 seconds. Creates controlled melt pool with reduced spatter velocity.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">✓ Advantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 60-80% reduction in spatter damage</li>
                        <li>• Extends nozzle life 3-4x (150-200 pierces)</li>
                        <li>• Minimal top surface marks</li>
                        <li>• Suitable for cosmetic/visible parts</li>
                        <li>• Industry standard for quality work</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">✗ Disadvantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 15-30% longer cycle time vs standard</li>
                        <li>• Requires parameter optimization per material</li>
                        <li>• May fail on rusty/scaled surfaces</li>
                        <li>• Less effective on very thin material (&lt;1mm)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Typical Time (3mm Stainless, Nitrogen):</p>
                    <p className="text-2xl font-bold text-primary-600">0.8-1.2 seconds/pierce</p>
                  </div>
                </div>

                {/* Ramp Pierce */}
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-600" />
                    3. Ramp Piercing (Circular Motion)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Laser traces a small circle (typically 0.5-2mm diameter) while ramping power. 
                    Distributes heat over larger area, creating the cleanest pierce.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">✓ Advantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Virtually eliminates spatter damage</li>
                        <li>• Best nozzle life (200-300 pierces)</li>
                        <li>• Minimal HAZ and thermal stress</li>
                        <li>• Aerospace/medical device quality</li>
                        <li>• Best for thick material (>10mm)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">✗ Disadvantages</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 30-60% longer than soft pierce</li>
                        <li>• Complex parameter setup</li>
                        <li>• Creates slightly larger pierce mark (1-3mm)</li>
                        <li>• Unnecessary for thin material (&lt;5mm)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Typical Time (3mm Stainless, Nitrogen):</p>
                    <p className="text-2xl font-bold text-primary-600">1.2-2.0 seconds/pierce</p>
                  </div>
                </div>
              </section>

              {/* Pierce Time by Material */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Pierce Time by Material & Thickness</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  Pierce times shown are for <strong>soft piercing with nitrogen assist</strong>. 
                  Standard pierce: 20-30% faster. Ramp pierce: 30-50% slower.
                </p>

                {/* Mild Steel Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mild Steel (Oxygen Assist)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">3kW Laser</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">6kW Laser</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">12kW Laser</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 px-3 py-2">1mm</td><td className="border border-gray-300 px-3 py-2">0.3-0.5s</td><td className="border border-gray-300 px-3 py-2">0.2-0.3s</td><td className="border border-gray-300 px-3 py-2">0.2s</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2">3mm</td><td className="border border-gray-300 px-3 py-2">0.6-0.9s</td><td className="border border-gray-300 px-3 py-2">0.4-0.6s</td><td className="border border-gray-300 px-3 py-2">0.3-0.4s</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">6mm</td><td className="border border-gray-300 px-3 py-2">1.5-2.5s</td><td className="border border-gray-300 px-3 py-2">0.8-1.2s</td><td className="border border-gray-300 px-3 py-2">0.5-0.8s</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2">10mm</td><td className="border border-gray-300 px-3 py-2">4-6s</td><td className="border border-gray-300 px-3 py-2">2-3s</td><td className="border border-gray-300 px-3 py-2">1.2-1.8s</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">15mm</td><td className="border border-gray-300 px-3 py-2">8-12s</td><td className="border border-gray-300 px-3 py-2">4-6s</td><td className="border border-gray-300 px-3 py-2">2.5-4s</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2">20mm</td><td className="border border-gray-300 px-3 py-2">Not rec.</td><td className="border border-gray-300 px-3 py-2">8-12s</td><td className="border border-gray-300 px-3 py-2">4-7s</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Stainless Steel Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Stainless Steel 304 (Nitrogen Assist)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">3kW Laser</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">6kW Laser</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">12kW Laser</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 px-3 py-2">1mm</td><td className="border border-gray-300 px-3 py-2">0.4-0.6s</td><td className="border border-gray-300 px-3 py-2">0.3-0.4s</td><td className="border border-gray-300 px-3 py-2">0.2-0.3s</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2">3mm</td><td className="border border-gray-300 px-3 py-2">1.0-1.5s</td><td className="border border-gray-300 px-3 py-2">0.6-0.9s</td><td className="border border-gray-300 px-3 py-2">0.4-0.6s</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">6mm</td><td className="border border-gray-300 px-3 py-2">3-5s</td><td className="border border-gray-300 px-3 py-2">1.5-2.5s</td><td className="border border-gray-300 px-3 py-2">0.8-1.5s</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2">10mm</td><td className="border border-gray-300 px-3 py-2">Not rec.</td><td className="border border-gray-300 px-3 py-2">4-7s</td><td className="border border-gray-300 px-3 py-2">2-4s</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">12mm</td><td className="border border-gray-300 px-3 py-2">Not rec.</td><td className="border border-gray-300 px-3 py-2">6-10s</td><td className="border border-gray-300 px-3 py-2">3-6s</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Aluminum Table */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Aluminum 5052 (Nitrogen Assist)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Thickness</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">3kW Laser</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">6kW Laser</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">12kW Laser</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 px-3 py-2">1mm</td><td className="border border-gray-300 px-3 py-2">0.5-0.8s</td><td className="border border-gray-300 px-3 py-2">0.3-0.5s</td><td className="border border-gray-300 px-3 py-2">0.2-0.4s</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2">3mm</td><td className="border border-gray-300 px-3 py-2">1.5-2.5s</td><td className="border border-gray-300 px-3 py-2">0.8-1.5s</td><td className="border border-gray-300 px-3 py-2">0.5-1.0s</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">6mm</td><td className="border border-gray-300 px-3 py-2">5-8s</td><td className="border border-gray-300 px-3 py-2">2.5-4s</td><td className="border border-gray-300 px-3 py-2">1.5-2.5s</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2">10mm</td><td className="border border-gray-300 px-3 py-2">Not rec.</td><td className="border border-gray-300 px-3 py-2">6-10s</td><td className="border border-gray-300 px-3 py-2">3-6s</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">15mm</td><td className="border border-gray-300 px-3 py-2">Not rec.</td><td className="border border-gray-300 px-3 py-2">Not rec.</td><td className="border border-gray-300 px-3 py-2">6-12s</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Times shown are ranges accounting for machine condition, gas purity, 
                    focus quality, and parameter optimization. Actual times may vary ±20%. Always verify on your equipment.
                  </p>
                </div>
              </section>

              {/* Optimization Strategies */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="h-8 w-8 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900">5 Strategies to Reduce Piercing Costs</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">1. Optimize Nesting to Minimize Pierce Count</h3>
                    <p className="text-gray-700 mb-2">
                      Use advanced nesting software with common-line cutting to share edges between parts. 
                      For rectangular parts, nesting efficiently can reduce pierce count by 30-50%.
                    </p>
                    <p className="text-sm text-gray-600">
                      Example: 4 separate rectangles = 4 pierces. Nested with shared edges = 1 pierce. Savings: 3 pierces × 2s = 6 seconds/cycle.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">2. Use Edge Starts Instead of Piercing</h3>
                    <p className="text-gray-700 mb-2">
                      Program lead-ins from the sheet edge or previously cut openings. Eliminates piercing 
                      entirely on perimeter cuts and saves 0.5-2 seconds per part.
                    </p>
                    <p className="text-sm text-gray-600">
                      Best for: Large parts with edge access, profile cuts, pre-drilled starting holes.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">3. Match Strategy to Quality Requirements</h3>
                    <p className="text-gray-700 mb-2">
                      Don't use soft/ramp pierce on hidden surfaces or high-volume non-critical parts. 
                      Reserve quality piercing for visible surfaces and thick material only.
                    </p>
                    <p className="text-sm text-gray-600">
                      Cost savings: Standard vs soft pierce on 100-piece batch with 200 pierces = 60 seconds/part × 100 = 100 minutes saved.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">4. Use Oxygen for Mild Steel</h3>
                    <p className="text-gray-700 mb-2">
                      Oxygen assist on mild steel reduces pierce time by 40-60% due to exothermic reaction. 
                      Trade-off is oxide edge (acceptable for most structural parts).
                    </p>
                    <p className="text-sm text-gray-600">
                      Example: 6mm mild steel with nitrogen: 1.5s/pierce. With oxygen: 0.6s/pierce. Saves 0.9s × 150 pierces = 2.25 minutes/sheet.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">5. Increase Laser Power for Thick Materials</h3>
                    <p className="text-gray-700 mb-2">
                      Pierce time decreases dramatically with higher power. A 12kW laser pierces 10mm stainless 
                      2-3x faster than 6kW, improving throughput on thick material jobs.
                    </p>
                    <p className="text-sm text-gray-600">
                      ROI consideration: Extra power costs $50-100K upfront but saves 30-60 seconds per high-hole-count part.
                    </p>
                  </div>
                </div>
              </section>

              {/* Nozzle Life */}
              <section className="card">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Nozzle Life Optimization</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  Nozzle replacement is a major consumable cost ($15-80 per nozzle). Pierce strategy 
                  dramatically affects nozzle life:
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Standard Pierce</p>
                    <p className="text-3xl font-bold text-red-600 mb-2">50-100</p>
                    <p className="text-xs text-gray-600">pierces per nozzle</p>
                  </div>
                  <div className="p-4 bg-primary-50 rounded-lg border-2 border-primary-600">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Soft Pierce</p>
                    <p className="text-3xl font-bold text-primary-600 mb-2">150-250</p>
                    <p className="text-xs text-gray-600">pierces per nozzle</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Ramp Pierce</p>
                    <p className="text-3xl font-bold text-green-600 mb-2">200-400</p>
                    <p className="text-xs text-gray-600">pierces per nozzle</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Calculation Example</h3>
                <div className="bg-gray-100 p-4 rounded-lg text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Nozzle cost (2.0mm diameter)</span>
                    <span className="font-mono">$40</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pierces per day (average shop)</span>
                    <span className="font-mono">500 pierces</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between mb-1">
                      <span>Standard pierce: $40 ÷ 75 =</span>
                      <span className="font-mono font-bold text-red-600">$0.53/pierce</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Soft pierce: $40 ÷ 200 =</span>
                      <span className="font-mono font-bold text-primary-600">$0.20/pierce</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ramp pierce: $40 ÷ 300 =</span>
                      <span className="font-mono font-bold text-green-600">$0.13/pierce</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Monthly savings (500 pierces/day × 20 days)</span>
                      <span className="font-mono text-primary-600">$3,300-4,000</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Bottom Line:</strong> Investing 20-30% more cycle time in soft/ramp piercing 
                    typically pays for itself through 60-75% reduction in nozzle costs, plus improved part quality.
                  </p>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Calculator CTA */}
              <div className="card bg-gradient-to-br from-primary-600 to-blue-600 text-white">
                <h3 className="text-xl font-bold mb-3">Calculate Pierce Time</h3>
                <p className="mb-4 text-primary-50">
                  Estimate total piercing time and compare strategies for your specific jobs.
                </p>
                <Link
                  href="/calculators/cost-center/pierce-estimator"
                  className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 w-full justify-center font-semibold"
                >
                  <Calculator className="h-5 w-5" />
                  Pierce Estimator
                </Link>
              </div>

              {/* Related Guides */}
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Guides</h3>
                <div className="space-y-3">
                  <Link
                    href="/guides/kerf-width-reference"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Kerf Width Reference</p>
                    <p className="text-sm text-gray-600">Optimize nozzle selection & cutting quality</p>
                  </Link>
                  <Link
                    href="/guides/hourly-cost-structure"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Hourly Cost Structure</p>
                    <p className="text-sm text-gray-600">Calculate true operating costs</p>
                  </Link>
                  <Link
                    href="/guides/finishing-time-cheatsheet"
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">Finishing Time Cheat Sheet</p>
                    <p className="text-sm text-gray-600">Post-cut processing estimates</p>
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card bg-orange-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Pierce time as % of cycle</p>
                    <p className="text-2xl font-bold text-primary-600">10-40%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Soft pierce time penalty</p>
                    <p className="text-2xl font-bold text-primary-600">+20-30%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nozzle life improvement</p>
                    <p className="text-2xl font-bold text-primary-600">3-4×</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom CTA */}
          <div className="card bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">Master Laser Cutting Economics</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore our complete library of guides and calculators to optimize every aspect 
              of your laser cutting operations.
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

