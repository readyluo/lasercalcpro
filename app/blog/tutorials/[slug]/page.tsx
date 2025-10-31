import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateHowToSchema } from '@/lib/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface TutorialConfig {
  title: string;
  description: string;
  duration: string;
  level: string;
  sections: Array<{ heading: string; content: React.ReactNode }>;
  steps: Array<{ name: string; text: string }>;
  downloads?: Array<{ label: string; href: string }>;
}

const TUTORIALS: Record<string, TutorialConfig> = {
  'cad-to-quote': {
    title: 'From CAD to Quote: Complete laser cutting workflow in 20 minutes',
    description:
      'Master the complete workflow from CAD file preparation to customer-ready quotes. Includes file validation, material selection, cost calculation, and quality control best practices.',
    duration: '20 min',
    level: 'Intermediate',
    sections: [
      {
        heading: '1) CAD File Preparation & Validation',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Proper file preparation is critical for accurate quotes and successful production.</p>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">File Format Requirements</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-blue-800">
                <li><strong>DXF/DWG:</strong> Most common, ensure version R12-R2018 for compatibility</li>
                <li><strong>SVG:</strong> Good for simple shapes, verify scale on import</li>
                <li><strong>AI/EPS:</strong> Convert text to paths, flatten layers</li>
              </ul>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Unit verification:</strong> Always use millimeters (mm) as standard. Check drawing units in CAD properties before export.</li>
              <li><strong>Layer management:</strong> Place cutting paths on separate layers from dimensions/notes. Delete hidden or reference layers.</li>
              <li><strong>Path validation:</strong> Ensure all paths are closed polylines. Use "Join" command to connect broken segments.</li>
              <li><strong>Remove duplicates:</strong> Delete overlapping lines that cause double-cutting and wasted time.</li>
              <li><strong>Measure total length:</strong> Use CAD measurement tools to sum outer contour + all internal holes. Record this value.</li>
              <li><strong>Count pierces:</strong> Each closed contour requires one pierce. Include outer edge + all holes.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '2) Material Selection & Specifications',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Material choice directly impacts cutting speed, quality, and total cost.</p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left">Material</th>
                    <th className="px-3 py-2 text-left">Common Grades</th>
                    <th className="px-3 py-2 text-left">Assist Gas</th>
                    <th className="px-3 py-2 text-left">Edge Quality</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2">Mild Steel</td>
                    <td className="px-3 py-2">A36, 1018, 1020</td>
                    <td className="px-3 py-2">O₂ (fast) or N₂ (clean)</td>
                    <td className="px-3 py-2">Oxide layer with O₂</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Stainless Steel</td>
                    <td className="px-3 py-2">304, 316, 430</td>
                    <td className="px-3 py-2">N₂ (required)</td>
                    <td className="px-3 py-2">Bright, clean edge</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Aluminum</td>
                    <td className="px-3 py-2">5052, 6061</td>
                    <td className="px-3 py-2">N₂ or Air</td>
                    <td className="px-3 py-2">Dross on bottom edge</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Galvanized</td>
                    <td className="px-3 py-2">G90, G60</td>
                    <td className="px-3 py-2">N₂ (avoid fumes)</td>
                    <td className="px-3 py-2">Zinc coating affects</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Thickness tolerance:</strong> Standard is ±0.1mm for &lt;6mm, ±0.2mm for 6-12mm. Verify with supplier.</li>
              <li><strong>Surface finish:</strong> Hot-rolled (HR) has scale, cold-rolled (CR) is smooth. Affects edge quality.</li>
              <li><strong>Sheet size:</strong> Standard 4'×8' (1220×2440mm) or 5'×10' (1525×3050mm). Confirm availability.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '3) Cost Calculation & Parameters',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Accurate cost estimation requires understanding all cost components.</p>
            <div className="mb-4 rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">Cost Breakdown Formula</h4>
              <div className="space-y-1 text-sm text-green-800">
                <div><strong>Material Cost</strong> = Sheet price × (Part area + kerf loss + scrap) ÷ Sheet area</div>
                <div><strong>Cutting Time</strong> = (Length ÷ Speed) + (Pierce count × Pierce time) + Setup time</div>
                <div><strong>Labor Cost</strong> = Cutting time × Operator hourly rate</div>
                <div><strong>Machine Cost</strong> = Cutting time × (Power cost + Gas cost + Depreciation + Maintenance)</div>
                <div><strong>Total Cost</strong> = Material + Labor + Machine + Overhead</div>
              </div>
            </div>
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Cutting speed:</strong> Varies by material/thickness. 1mm mild steel: 10-15 m/min; 10mm: 0.8-1.2 m/min.</li>
              <li><strong>Pierce time:</strong> 0.5-2 seconds per pierce depending on thickness and gas type.</li>
              <li><strong>Setup time:</strong> Include 5-15 minutes for sheet loading, program verification, first-piece inspection.</li>
              <li><strong>Kerf allowance:</strong> Typical 0.1-0.3mm per side. Use Kerf Reference calculator for exact values.</li>
              <li><strong>Material utilization:</strong> Target 70-85% for standard jobs, 85-92% for optimized nesting.</li>
              <li><strong>Batch considerations:</strong> Setup cost amortized across quantity. Offer volume discounts for 50+ pieces.</li>
          </ul>
          </div>
        ),
      },
      {
        heading: '4) Quality Control & Tolerances',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Define quality requirements upfront to avoid rework and disputes.</p>
            <div className="mb-4 rounded-lg bg-yellow-50 p-4">
              <h4 className="mb-2 font-semibold text-yellow-900">Standard Tolerances</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-yellow-800">
                <li><strong>Linear dimensions:</strong> ±0.1mm for features &lt;100mm, ±0.2mm for 100-500mm</li>
                <li><strong>Hole diameter:</strong> +0.1/-0mm (slightly oversized due to kerf)</li>
                <li><strong>Perpendicularity:</strong> ±1° typical, ±0.5° for precision work</li>
                <li><strong>Edge roughness:</strong> Ra 6.3-12.5 μm typical for laser cutting</li>
              </ul>
            </div>
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Dimensional verification:</strong> Measure critical features on first piece before running full batch.</li>
              <li><strong>Edge quality inspection:</strong> Check for dross (bottom edge buildup), burrs, and heat-affected zone (HAZ).</li>
              <li><strong>Flatness check:</strong> Thermal distortion can occur on thin sheets (&lt;1mm) with long cuts.</li>
              <li><strong>Corner sharpness:</strong> Inside corners have radius equal to kerf width (~0.1-0.2mm).</li>
              <li><strong>Documentation:</strong> Include tolerance callouts on quote. Default to ISO 2768-m if not specified.</li>
          </ul>
          </div>
        ),
      },
      {
        heading: '5) Quote Generation & Customer Communication',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Professional quotes build trust and streamline the approval process.</p>
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Cost transparency:</strong> Break down material, labor, machine time, and overhead separately. Builds credibility.</li>
              <li><strong>Pricing strategy:</strong> Use 25-35% markup for standard work, 40-50% for rush jobs or complex parts.</li>
              <li><strong>Volume tiers:</strong> Offer 3-4 quantity breaks (e.g., 1-10, 11-50, 51-100, 100+) with 5-15% discounts.</li>
              <li><strong>Lead time:</strong> Standard 3-5 business days. Add 20-30% cost for 24-48 hour rush service.</li>
              <li><strong>Terms & conditions:</strong> Include payment terms (Net 30), material substitution policy, and tolerance standards.</li>
              <li><strong>Validity period:</strong> Quote valid for 30 days. Material prices fluctuate, especially for stainless and aluminum.</li>
              <li><strong>Revision tracking:</strong> Use version numbers (v1.0, v1.1) and date stamps for quote history.</li>
            </ul>
            <div className="mt-4 rounded-lg bg-purple-50 p-4">
              <h4 className="mb-2 font-semibold text-purple-900">Quote Checklist</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-purple-800">
                <li>✓ Part description and quantity</li>
                <li>✓ Material specification (grade, thickness, finish)</li>
                <li>✓ Itemized cost breakdown</li>
                <li>✓ Lead time and delivery method</li>
                <li>✓ Payment terms and validity period</li>
                <li>✓ Tolerance and quality standards</li>
                <li>✓ Company contact info and quote number</li>
          </ul>
            </div>
          </div>
        ),
      },
      {
        heading: '6) Common Issues & Solutions',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Anticipate and resolve common problems before they impact production.</p>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ DXF Import Fails or Displays Incorrectly</h5>
                <p className="text-sm text-gray-700"><strong>Cause:</strong> Version incompatibility, wrong units, or complex entities (splines, 3D objects).</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Export as DXF R12 (universal), convert splines to polylines, flatten to 2D, verify units.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Parts Don't Fit Together (Tolerance Issues)</h5>
                <p className="text-sm text-gray-700"><strong>Cause:</strong> Kerf not accounted for, material thickness variation, thermal distortion.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Apply kerf compensation (+0.1mm per side for slots), test-fit first piece, use fixturing for thin parts.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Poor Edge Quality (Dross, Burrs, Discoloration)</h5>
                <p className="text-sm text-gray-700"><strong>Cause:</strong> Wrong gas type, incorrect pressure, worn nozzle, slow cutting speed.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Use N₂ for clean edges, check nozzle condition, optimize speed/power parameters, add deburring step to quote.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Nesting Efficiency Too Low (&lt;70%)</h5>
                <p className="text-sm text-gray-700"><strong>Cause:</strong> Poor part arrangement, excessive spacing, no rotation optimization.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Use nesting software, allow 90°/180° rotation, reduce spacing to 3-5mm, combine similar jobs.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Quote Rejected as "Too Expensive"</h5>
                <p className="text-sm text-gray-700"><strong>Cause:</strong> Customer comparing to high-volume pricing, unrealistic expectations, competitor underbidding.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Explain cost breakdown, offer volume discounts, suggest design changes to reduce cost (fewer pierces, simpler shapes).</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '7) Real-World Case Studies',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Learn from actual projects across different complexity levels.</p>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 1: Simple Bracket (Low Complexity)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p><strong>Part:</strong> L-shaped mounting bracket</p>
                    <p><strong>Material:</strong> 3mm mild steel (A36)</p>
                    <p><strong>Quantity:</strong> 50 pieces</p>
                    <p><strong>Cutting length:</strong> 280mm per part</p>
                    <p><strong>Pierces:</strong> 3 (outer + 2 holes)</p>
                  </div>
                  <div>
                    <p><strong>Cutting time:</strong> 1.2 min/part</p>
                    <p><strong>Material cost:</strong> $1.80/part</p>
                    <p><strong>Labor + machine:</strong> $2.40/part</p>
                    <p><strong>Total cost:</strong> $4.20/part</p>
                    <p><strong>Quote price:</strong> $5.60/part (33% margin)</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Key insight:</strong> Simple geometry allows 82% nesting efficiency. Setup time amortized across 50 pieces reduces per-part cost.</p>
              </div>
              <div className="rounded-lg border-l-4 border-yellow-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 2: Decorative Panel (Medium Complexity)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p><strong>Part:</strong> Architectural screen panel</p>
                    <p><strong>Material:</strong> 2mm stainless 304</p>
                    <p><strong>Quantity:</strong> 12 pieces</p>
                    <p><strong>Cutting length:</strong> 4,800mm per part</p>
                    <p><strong>Pierces:</strong> 48 (complex pattern)</p>
                  </div>
                  <div>
                    <p><strong>Cutting time:</strong> 18 min/part</p>
                    <p><strong>Material cost:</strong> $28.50/part</p>
                    <p><strong>Labor + machine:</strong> $36.00/part</p>
                    <p><strong>Total cost:</strong> $64.50/part</p>
                    <p><strong>Quote price:</strong> $95.00/part (47% margin)</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Key insight:</strong> High pierce count increases time significantly. N₂ gas required for clean stainless edges adds $8/part. Premium margin justified by complexity.</p>
              </div>
              <div className="rounded-lg border-l-4 border-red-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 3: Precision Enclosure (High Complexity)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p><strong>Part:</strong> Electronics enclosure with tight tolerances</p>
                    <p><strong>Material:</strong> 1.5mm aluminum 5052</p>
                    <p><strong>Quantity:</strong> 5 pieces (prototype)</p>
                    <p><strong>Cutting length:</strong> 1,200mm per part</p>
                    <p><strong>Pierces:</strong> 24 (mounting holes + cutouts)</p>
                  </div>
                  <div>
                    <p><strong>Cutting time:</strong> 8 min/part</p>
                    <p><strong>Material cost:</strong> $12.00/part</p>
                    <p><strong>Labor + machine:</strong> $16.00/part</p>
                    <p><strong>Total cost:</strong> $28.00/part</p>
                    <p><strong>Quote price:</strong> $45.00/part (61% margin)</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Key insight:</strong> Low quantity means setup cost ($75) heavily impacts per-part price. Tight tolerances (±0.05mm) require first-piece inspection and slower speeds. High margin accounts for risk and low volume.</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Prepare CAD file', text: 'Export as DXF/SVG, verify units (mm), clean layers, join broken paths.' },
      { name: 'Validate geometry', text: 'Check closed paths, measure total length, count pierces, remove duplicates.' },
      { name: 'Select material', text: 'Choose grade and thickness, verify availability, note surface finish requirements.' },
      { name: 'Calculate costs', text: 'Input parameters: length, pierces, material, gas type, labor rate, machine cost.' },
      { name: 'Review breakdown', text: 'Verify material cost, cutting time, labor, overhead align with shop standards.' },
      { name: 'Set pricing', text: 'Apply appropriate margin (25-50%), create volume tiers, define lead time.' },
      { name: 'Generate quote', text: 'Export PDF with itemized costs, terms, tolerances, and validity period.' },
      { name: 'Archive version', text: 'Save quote with version number and date for future reference and revisions.' },
    ],
    downloads: [
      { label: 'CAD-to-Quote Worksheet (Markdown)', href: '/downloads/tutorials/cad-to-quote-worksheet.md' },
      { label: 'Laser Cutting Cost Calculator (Excel)', href: '/downloads/tutorials/laser-cutting-cost-calculator.csv' },
    ],
  },
  'cnc-volume-pricing': {
    title: 'Precision CNC cost breakdown with volume pricing tiers',
    description:
      'Build per-part margins with setup amortization, tooling life, and utilization targets; output tiered pricing.',
    duration: '25 min',
    level: 'Advanced',
    sections: [
      {
        heading: '1) Understanding Fixed vs Variable Costs',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Accurate CNC pricing requires distinguishing between fixed costs (amortized across batch size) and variable costs (incurred per part).
            </p>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">Fixed Costs (One-Time Setup)</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-blue-800">
                <li><strong>Fixture & workholding setup:</strong> 15-45 minutes depending on complexity</li>
                <li><strong>Program loading & verification:</strong> 10-20 minutes for CAM setup and toolpath validation</li>
                <li><strong>Tool setup & presetting:</strong> 5-15 minutes per tool (offset measurement, runout check)</li>
                <li><strong>First article inspection:</strong> 10-30 minutes to verify dimensions and surface finish</li>
                <li><strong>Machine warm-up:</strong> 5-10 minutes for thermal stability on precision work</li>
              </ul>
            </div>
            <div className="mb-4 rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">Variable Costs (Per Part)</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-green-800">
                <li><strong>Spindle time:</strong> Actual machining time per operation (roughing, finishing, drilling)</li>
                <li><strong>Tool changes:</strong> 3-8 seconds per tool change × number of operations</li>
                <li><strong>Tooling wear:</strong> $0.50-$15 per part depending on material hardness and tool life</li>
                <li><strong>Deburring & cleaning:</strong> 2-10 minutes manual work per part</li>
                <li><strong>Material cost:</strong> Stock size × material rate with 10-20% waste allowance</li>
                <li><strong>Secondary operations:</strong> Tapping, heat treatment, surface finishing if required</li>
              </ul>
            </div>
            <div className="mb-4 rounded-lg bg-purple-50 p-4">
              <h4 className="mb-2 font-semibold text-purple-900">Cost Formula</h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div><strong>Setup Cost per Part</strong> = Total Setup Time ÷ Batch Quantity</div>
                <div><strong>Variable Cost per Part</strong> = (Cycle Time + Tool Changes) × Machine Rate + Tooling Wear + Material</div>
                <div><strong>Total Unit Cost</strong> = Setup Cost per Part + Variable Cost per Part</div>
                <div><strong>Quote Price</strong> = Total Unit Cost × (1 + Target Margin%)</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '2) Setup Cost Amortization Across Batch Sizes',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              The dramatic cost reduction from batch manufacturing comes from spreading fixed setup costs across more units.
            </p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Batch Quantity</th>
                    <th className="px-3 py-2 text-right border">Setup Cost per Part</th>
                    <th className="px-3 py-2 text-right border">Variable Cost</th>
                    <th className="px-3 py-2 text-right border">Total Unit Cost</th>
                    <th className="px-3 py-2 text-right border">Setup % of Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border font-medium">1 piece</td>
                    <td className="px-3 py-2 text-right border">$300.00</td>
                    <td className="px-3 py-2 text-right border">$15.00</td>
                    <td className="px-3 py-2 text-right border font-semibold">$315.00</td>
                    <td className="px-3 py-2 text-right border text-red-700">95.2%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">10 pieces</td>
                    <td className="px-3 py-2 text-right border">$30.00</td>
                    <td className="px-3 py-2 text-right border">$15.00</td>
                    <td className="px-3 py-2 text-right border font-semibold">$45.00</td>
                    <td className="px-3 py-2 text-right border text-orange-700">66.7%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">50 pieces</td>
                    <td className="px-3 py-2 text-right border">$6.00</td>
                    <td className="px-3 py-2 text-right border">$15.00</td>
                    <td className="px-3 py-2 text-right border font-semibold">$21.00</td>
                    <td className="px-3 py-2 text-right border text-yellow-700">28.6%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">100 pieces</td>
                    <td className="px-3 py-2 text-right border">$3.00</td>
                    <td className="px-3 py-2 text-right border">$15.00</td>
                    <td className="px-3 py-2 text-right border font-semibold">$18.00</td>
                    <td className="px-3 py-2 text-right border text-green-700">16.7%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">500 pieces</td>
                    <td className="px-3 py-2 text-right border">$0.60</td>
                    <td className="px-3 py-2 text-right border">$15.00</td>
                    <td className="px-3 py-2 text-right border font-semibold">$15.60</td>
                    <td className="px-3 py-2 text-right border text-green-700">3.8%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">1,000 pieces</td>
                    <td className="px-3 py-2 text-right border">$0.30</td>
                    <td className="px-3 py-2 text-right border">$15.00</td>
                    <td className="px-3 py-2 text-right border font-semibold">$15.30</td>
                    <td className="px-3 py-2 text-right border text-green-700">2.0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-lg bg-yellow-50 p-4">
              <h4 className="mb-2 font-semibold text-yellow-900">Key Insights from the Table</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-yellow-800">
                <li><strong>Dramatic drop from 1→10 units:</strong> Cost falls 86% ($315 → $45) as setup spreads across 10 parts</li>
                <li><strong>10→100 pieces:</strong> 60% reduction ($45 → $18) as setup becomes less dominant</li>
                <li><strong>100+ pieces:</strong> Cost stabilizes near variable cost floor ($15.30 at 1,000 units)</li>
                <li><strong>Break-even analysis:</strong> At $300 setup + $15 variable, profitable pricing requires minimum 10-20 pieces for most shops</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        heading: '3) Tooling Life Cycle & Wear Cost Calculation',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Tooling costs vary dramatically by material hardness, cutting parameters, and tool quality. Accurate tooling cost per part is critical for sustainable pricing.
            </p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Material Type</th>
                    <th className="px-3 py-2 text-left border">Tool Type</th>
                    <th className="px-3 py-2 text-right border">Tool Cost</th>
                    <th className="px-3 py-2 text-right border">Tool Life (parts)</th>
                    <th className="px-3 py-2 text-right border">Cost per Part</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Aluminum 6061</td>
                    <td className="px-3 py-2 border">Carbide end mill</td>
                    <td className="px-3 py-2 text-right border">$45</td>
                    <td className="px-3 py-2 text-right border">500-800</td>
                    <td className="px-3 py-2 text-right border font-medium text-green-700">$0.06-$0.09</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Mild Steel 1018</td>
                    <td className="px-3 py-2 border">Coated carbide</td>
                    <td className="px-3 py-2 text-right border">$65</td>
                    <td className="px-3 py-2 text-right border">200-400</td>
                    <td className="px-3 py-2 text-right border font-medium text-yellow-700">$0.16-$0.33</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Stainless 304</td>
                    <td className="px-3 py-2 border">Coated carbide</td>
                    <td className="px-3 py-2 text-right border">$75</td>
                    <td className="px-3 py-2 text-right border">100-200</td>
                    <td className="px-3 py-2 text-right border font-medium text-orange-700">$0.38-$0.75</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Titanium Ti-6Al-4V</td>
                    <td className="px-3 py-2 border">Premium carbide</td>
                    <td className="px-3 py-2 text-right border">$120</td>
                    <td className="px-3 py-2 text-right border">40-80</td>
                    <td className="px-3 py-2 text-right border font-medium text-red-700">$1.50-$3.00</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Tool Steel D2</td>
                    <td className="px-3 py-2 border">Premium coated</td>
                    <td className="px-3 py-2 text-right border">$95</td>
                    <td className="px-3 py-2 text-right border">60-120</td>
                    <td className="px-3 py-2 text-right border font-medium text-red-700">$0.79-$1.58</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Inconel 718</td>
                    <td className="px-3 py-2 border">Ceramic insert</td>
                    <td className="px-3 py-2 text-right border">$180</td>
                    <td className="px-3 py-2 text-right border">20-40</td>
                    <td className="px-3 py-2 text-right border font-medium text-red-700">$4.50-$9.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Tool life factors:</strong> Cutting speed (SFM), feed rate, depth of cut, coolant quality, and tool coating type all affect wear rate.</li>
              <li><strong>Multi-tool operations:</strong> A complex part may use 4-8 different tools (roughing end mill, finishing mill, drills, taps). Sum wear cost for all tools.</li>
              <li><strong>Tool reconditioning:</strong> Some tools can be resharpened 2-4 times at 30-40% of new cost, reducing effective per-part cost.</li>
              <li><strong>Insert vs solid tools:</strong> Indexable inserts have lower per-edge cost but higher initial investment. Analyze based on production volume.</li>
              <li><strong>Track tool life:</strong> Use CNC control software to log tool usage and predict replacement timing to avoid scrapped parts from worn tools.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '4) Machine Utilization & Hourly Rate Optimization',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Machine hourly rate must cover equipment depreciation, maintenance, energy, and overhead while achieving target utilization rates.
            </p>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">Machine Hourly Rate Components</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div><strong>Equipment depreciation:</strong> $150,000 machine ÷ 5 years ÷ 2,080 hours = $14.42/hr</div>
                <div><strong>Maintenance & repairs:</strong> 8-12% of machine cost annually = $8.65/hr</div>
                <div><strong>Energy consumption:</strong> 15-25 kW × $0.12/kWh = $1.80-$3.00/hr</div>
                <div><strong>Tooling overhead:</strong> Average tool consumption across jobs = $4.00/hr</div>
                <div><strong>Coolant & consumables:</strong> Filters, coolant replacement, shop supplies = $2.50/hr</div>
                <div><strong>Facility overhead:</strong> Rent, insurance, admin allocation = $12.00/hr</div>
                <div className="pt-2 mt-2 border-t border-blue-300"><strong>Total Machine Hour Rate:</strong> $43.37-$44.57/hr</div>
              </div>
            </div>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Utilization Target</th>
                    <th className="px-3 py-2 text-right border">Annual Hours</th>
                    <th className="px-3 py-2 text-right border">Required Rate</th>
                    <th className="px-3 py-2 text-left border">Scenario</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border font-medium">50% (1,040 hrs)</td>
                    <td className="px-3 py-2 text-right border">1,040</td>
                    <td className="px-3 py-2 text-right border font-semibold text-red-700">$86.50/hr</td>
                    <td className="px-3 py-2 border text-sm">Low utilization – need higher rate or more work</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">65% (1,352 hrs)</td>
                    <td className="px-3 py-2 text-right border">1,352</td>
                    <td className="px-3 py-2 text-right border font-semibold text-orange-700">$66.50/hr</td>
                    <td className="px-3 py-2 border text-sm">Typical job shop target</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">80% (1,664 hrs)</td>
                    <td className="px-3 py-2 text-right border">1,664</td>
                    <td className="px-3 py-2 text-right border font-semibold text-green-700">$54.00/hr</td>
                    <td className="px-3 py-2 border text-sm">High efficiency – competitive pricing possible</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">90% (1,872 hrs)</td>
                    <td className="px-3 py-2 text-right border">1,872</td>
                    <td className="px-3 py-2 text-right border font-semibold text-green-700">$48.00/hr</td>
                    <td className="px-3 py-2 border text-sm">Production environment – maximum efficiency</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Opportunity cost:</strong> When utilization exceeds 85%, consider premium pricing for rush jobs or investing in additional capacity.</li>
              <li><strong>Multi-shift operation:</strong> Second shift can reduce hourly rate by 30-40% through depreciation spreading, but requires labor premium (10-15%).</li>
              <li><strong>Machine capability premium:</strong> 5-axis or high-speed machining centers can command 20-40% higher rates due to capability advantage.</li>
              <li><strong>Benchmark rates:</strong> Industry standard CNC hourly rates range $45-$95/hr depending on region, machine type, and shop specialization.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '5) Detailed Case Studies by Complexity',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Real-world examples showing cost breakdown and pricing strategy across different part complexities.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 1: Simple Mounting Bracket (Low Complexity)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p><strong>Part description:</strong> L-bracket with 4 mounting holes</p>
                    <p><strong>Material:</strong> Aluminum 6061, 10mm × 80mm × 120mm stock</p>
                    <p><strong>Operations:</strong> Face mill, drill 4× Ø8mm, chamfer edges</p>
                    <p><strong>Batch size:</strong> 50 pieces</p>
                    <p><strong>Setup time:</strong> 45 minutes ($67.50 total)</p>
                  </div>
                  <div>
                    <p><strong>Cycle time per part:</strong> 4.5 minutes</p>
                    <p><strong>Material cost:</strong> $3.20 per part (stock + 15% waste)</p>
                    <p><strong>Machine time:</strong> 4.5 min × $54/hr = $4.05</p>
                    <p><strong>Tooling wear:</strong> $0.15 per part</p>
                    <p><strong>Setup per part:</strong> $67.50 ÷ 50 = $1.35</p>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Total Cost per Part</div>
                    <div className="text-lg font-bold text-gray-900">$8.75</div>
                  </div>
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Quote Price (35% margin)</div>
                    <div className="text-lg font-bold text-green-700">$11.81</div>
                  </div>
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Batch Total</div>
                    <div className="text-lg font-bold text-primary-700">$590.50</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Key insight:</strong> Simple geometry and soft aluminum allow fast cycle time. At 50 pieces, setup cost is only 15% of total. Profitable even at 35% margin.</p>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 2: Precision Housing (Medium Complexity)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p><strong>Part description:</strong> Electronics enclosure with internal pockets</p>
                    <p><strong>Material:</strong> 6061-T6 aluminum, 25mm × 100mm × 150mm</p>
                    <p><strong>Operations:</strong> 3-axis milling, roughing + finishing, 12× tapped holes M4</p>
                    <p><strong>Batch size:</strong> 25 pieces</p>
                    <p><strong>Setup time:</strong> 75 minutes ($90 total)</p>
                  </div>
                  <div>
                    <p><strong>Cycle time per part:</strong> 28 minutes</p>
                    <p><strong>Material cost:</strong> $18.50 per part</p>
                    <p><strong>Machine time:</strong> 28 min × $54/hr = $25.20</p>
                    <p><strong>Tooling wear:</strong> $1.85 per part (4 tools)</p>
                    <p><strong>Setup per part:</strong> $90 ÷ 25 = $3.60</p>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Total Cost per Part</div>
                    <div className="text-lg font-bold text-gray-900">$49.15</div>
                  </div>
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Quote Price (42% margin)</div>
                    <div className="text-lg font-bold text-yellow-700">$69.79</div>
                  </div>
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Batch Total</div>
                    <div className="text-lg font-bold text-primary-700">$1,744.75</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Key insight:</strong> Longer cycle time (28 min) and complex geometry justify 42% margin. Tapping operations add significant time. Consider volume discount at 100+ pieces.</p>
              </div>

              <div className="rounded-lg border-l-4 border-red-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 3: Precision Shaft (High Complexity)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p><strong>Part description:</strong> Multi-diameter turned shaft with ±0.005mm tolerance</p>
                    <p><strong>Material:</strong> 4140 steel, Ø50mm × 200mm bar stock, heat-treated</p>
                    <p><strong>Operations:</strong> CNC turning, OD grinding, centerless grinding</p>
                    <p><strong>Batch size:</strong> 10 pieces (prototype run)</p>
                    <p><strong>Setup time:</strong> 120 minutes ($150 total + $50 grinding setup)</p>
                  </div>
                  <div>
                    <p><strong>Cycle time per part:</strong> 45 min lathe + 18 min grinding</p>
                    <p><strong>Material cost:</strong> $32.00 per part (heat-treated stock)</p>
                    <p><strong>Machine time:</strong> 45 min × $54/hr + 18 min × $72/hr = $62.10</p>
                    <p><strong>Tooling wear:</strong> $4.20 per part (carbide inserts + grinding wheel)</p>
                    <p><strong>Setup per part:</strong> $200 ÷ 10 = $20.00</p>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Total Cost per Part</div>
                    <div className="text-lg font-bold text-gray-900">$118.30</div>
                  </div>
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Quote Price (55% margin)</div>
                    <div className="text-lg font-bold text-red-700">$183.37</div>
                  </div>
                  <div className="rounded bg-white p-2 border">
                    <div className="text-gray-600">Batch Total</div>
                    <div className="text-lg font-bold text-primary-700">$1,833.70</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Key insight:</strong> Low volume (10 pcs) means setup is 17% of total cost. Tight tolerances require precision grinding. 55% margin justified by complexity, risk, and small batch. At 100+ pieces, cost drops to $102/part.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '6) Volume Pricing Strategy & Tier Structure',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Structure tiered pricing to incentivize larger orders while maintaining profitability at all volume levels.
            </p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Pricing Tier</th>
                    <th className="px-3 py-2 text-right border">Quantity Range</th>
                    <th className="px-3 py-2 text-right border">Unit Price</th>
                    <th className="px-3 py-2 text-right border">Discount %</th>
                    <th className="px-3 py-2 text-right border">Target Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border font-medium">Prototype</td>
                    <td className="px-3 py-2 text-right border">1-10 pieces</td>
                    <td className="px-3 py-2 text-right border font-semibold">$45.00</td>
                    <td className="px-3 py-2 text-right border">—</td>
                    <td className="px-3 py-2 text-right border">45-55%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Small Batch</td>
                    <td className="px-3 py-2 text-right border">11-50 pieces</td>
                    <td className="px-3 py-2 text-right border font-semibold">$36.00</td>
                    <td className="px-3 py-2 text-right border text-green-700">20%</td>
                    <td className="px-3 py-2 text-right border">35-42%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Standard</td>
                    <td className="px-3 py-2 text-right border">51-200 pieces</td>
                    <td className="px-3 py-2 text-right border font-semibold">$28.80</td>
                    <td className="px-3 py-2 text-right border text-green-700">36%</td>
                    <td className="px-3 py-2 text-right border">28-35%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Production</td>
                    <td className="px-3 py-2 text-right border">201-1,000 pieces</td>
                    <td className="px-3 py-2 text-right border font-semibold">$23.40</td>
                    <td className="px-3 py-2 text-right border text-green-700">48%</td>
                    <td className="px-3 py-2 text-right border">22-28%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Volume</td>
                    <td className="px-3 py-2 text-right border">1,000+ pieces</td>
                    <td className="px-3 py-2 text-right border font-semibold">$19.80</td>
                    <td className="px-3 py-2 text-right border text-green-700">56%</td>
                    <td className="px-3 py-2 text-right border">18-22%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">Pricing Strategy Guidelines</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-green-800">
                <li><strong>Prototype tier (1-10):</strong> High margin (45-55%) compensates for setup dominance and risk. Premium for engineering support and quick turnaround.</li>
                <li><strong>Small batch (11-50):</strong> Setup cost amortizes significantly. Offer 20% discount to incentivize larger orders while maintaining healthy margin.</li>
                <li><strong>Standard (51-200):</strong> Sweet spot for most job shops. 28-35% margin balances competitiveness with profitability.</li>
                <li><strong>Production (201-1,000):</strong> Lower margin (22-28%) acceptable due to volume. Setup cost negligible, focus on machine efficiency.</li>
                <li><strong>Volume (1,000+):</strong> Strategic pricing at 18-22% margin. Ensure capacity, tooling investment, and quality systems can support volume.</li>
              </ul>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700 mt-4">
              <li><strong>Customer segmentation:</strong> Strategic OEM accounts may get 5-8% additional discount. New customers pay list price until proven reliability.</li>
              <li><strong>Contract pricing:</strong> Annual agreements with volume commitments can justify 10-15% discount in exchange for predictable revenue.</li>
              <li><strong>Rush pricing:</strong> Add 25-40% premium for 24-48 hour turnaround. Add 15% for 1-week rush on standard 2-3 week lead time.</li>
              <li><strong>Minimum order value:</strong> Consider $500-$1,000 minimum to avoid unprofitable small orders consuming setup capacity.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '7) Design for Manufacturability (DFM) Cost Optimization',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Smart design choices can reduce CNC costs by 30-60% without compromising functionality. Collaborate with customers early in design phase.
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">✓ Standardize Material Sizes</h5>
                <p className="text-sm text-gray-700"><strong>Impact:</strong> Reduce material cost by 15-25% and minimize waste.</p>
                <p className="text-sm text-green-700"><strong>Best practice:</strong> Design parts to fit standard stock sizes (e.g., 25mm, 50mm, 100mm). Avoid custom bar diameters or plate thicknesses requiring special orders.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">✓ Simplify Internal Corners</h5>
                <p className="text-sm text-gray-700"><strong>Impact:</strong> Reduce cycle time by 10-20% and eliminate secondary operations.</p>
                <p className="text-sm text-green-700"><strong>Best practice:</strong> Use radius corners (R3-R6mm) instead of sharp internal corners. Sharp corners require EDM or multiple tool passes, adding cost and time.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">✓ Relax Tolerances Where Possible</h5>
                <p className="text-sm text-gray-700"><strong>Impact:</strong> Reduce machining time by 20-40% and lower scrap rate.</p>
                <p className="text-sm text-green-700"><strong>Best practice:</strong> Use ±0.1mm standard tolerance for non-critical features. Reserve ±0.025mm or tighter for mating surfaces only. Each tighter tolerance level adds 15-30% to cycle time.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">✓ Minimize Deep Pockets & Thin Walls</h5>
                <p className="text-sm text-gray-700"><strong>Impact:</strong> Reduce tool wear cost by 30-50% and improve surface finish.</p>
                <p className="text-sm text-green-700"><strong>Best practice:</strong> Keep pocket depth ≤3× tool diameter. Maintain wall thickness ≥2× material thickness to avoid chatter and deflection. Deep pockets require multiple roughing passes and slow finishing speeds.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">✓ Reduce Number of Setups</h5>
                <p className="text-sm text-gray-700"><strong>Impact:</strong> Save 15-45 minutes per setup, reduce tolerance stack-up errors.</p>
                <p className="text-sm text-green-700"><strong>Best practice:</strong> Design parts for single-side machining when possible. If multiple setups required, incorporate alignment features (dowel pins, reference faces) for repeatable positioning.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">✓ Avoid Exotic Surface Finishes</h5>
                <p className="text-sm text-gray-700"><strong>Impact:</strong> Eliminate $50-$200 secondary operation cost per part.</p>
                <p className="text-sm text-green-700"><strong>Best practice:</strong> Specify "as-machined" finish (Ra 1.6-3.2 μm) unless functional requirement demands better. Polishing, lapping, and coating add significant cost and lead time.</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">DFM Cost Comparison Example</h4>
              <div className="grid gap-3 text-sm md:grid-cols-2">
                <div>
                  <p className="font-semibold mb-1">Original Design (Not Optimized)</p>
                  <ul className="ml-5 list-disc space-y-1 text-blue-800">
                    <li>Custom material size: $22.00</li>
                    <li>Sharp internal corners: +12 min cycle time</li>
                    <li>±0.025mm tolerance overall: +8 min grinding</li>
                    <li>Deep pocket (6×Ø): +15 min extra passes</li>
                    <li>Surface grinding finish: +$45 secondary op</li>
                  </ul>
                  <p className="font-bold mt-2 text-red-700">Total Cost: $128.50 per part</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Optimized Design (DFM Applied)</p>
                  <ul className="ml-5 list-disc space-y-1 text-blue-800">
                    <li>Standard material size: $16.50 (25% savings)</li>
                    <li>R4mm radius corners: -12 min cycle time</li>
                    <li>±0.1mm standard tolerance: -8 min grinding</li>
                    <li>Shallow pocket (3×Ø): -15 min extra passes</li>
                    <li>As-machined finish: $0 secondary op</li>
                  </ul>
                  <p className="font-bold mt-2 text-green-700">Total Cost: $67.20 per part (48% reduction!)</p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '8) Publishing Multi-Tier Quotes',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Professional tiered quotes increase average order value by making volume discounts transparent and encouraging larger commitments.
            </p>
            <div className="mb-4 rounded-lg bg-purple-50 p-4">
              <h4 className="mb-2 font-semibold text-purple-900">Quote Presentation Best Practices</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-purple-800">
                <li><strong>Show all tiers:</strong> Display 3-5 quantity tiers even if customer requested only one quantity. This educates them on volume economics.</li>
                <li><strong>Highlight sweet spot:</strong> Use visual emphasis (bold, color) on the tier with best margin:value ratio for your shop (typically 50-200 pieces).</li>
                <li><strong>Include cost breakdown:</strong> Show material, setup, machining, and tooling separately. Transparency builds trust and justifies pricing.</li>
                <li><strong>Add lead time by tier:</strong> Larger quantities need longer lead time. Be explicit: 1-10 pcs = 5 days, 100+ pcs = 3 weeks.</li>
                <li><strong>Validity period:</strong> State quote valid for 30-60 days. Material prices fluctuate, protect yourself from commodity swings.</li>
                <li><strong>Terms & conditions:</strong> Include payment terms (50% deposit, Net 30), tolerance standards (ISO 2768-m unless specified), and revision policy.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-300 bg-white p-4">
              <h5 className="mb-3 font-semibold text-gray-900">Sample Quote Table</h5>
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left border">Quantity</th>
                    <th className="px-3 py-2 text-right border">Unit Price</th>
                    <th className="px-3 py-2 text-right border">Extended Total</th>
                    <th className="px-3 py-2 text-right border">Lead Time</th>
                    <th className="px-3 py-2 text-right border">Savings vs Prototype</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">5 pieces</td>
                    <td className="px-3 py-2 text-right border">$45.00</td>
                    <td className="px-3 py-2 text-right border font-medium">$225.00</td>
                    <td className="px-3 py-2 text-right border">5 days</td>
                    <td className="px-3 py-2 text-right border">—</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-3 py-2 border font-semibold">25 pieces ⭐</td>
                    <td className="px-3 py-2 text-right border font-semibold">$36.00</td>
                    <td className="px-3 py-2 text-right border font-bold">$900.00</td>
                    <td className="px-3 py-2 text-right border">10 days</td>
                    <td className="px-3 py-2 text-right border text-green-700 font-medium">20%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">100 pieces</td>
                    <td className="px-3 py-2 text-right border">$28.80</td>
                    <td className="px-3 py-2 text-right border font-medium">$2,880.00</td>
                    <td className="px-3 py-2 text-right border">3 weeks</td>
                    <td className="px-3 py-2 text-right border text-green-700 font-medium">36%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">500 pieces</td>
                    <td className="px-3 py-2 text-right border">$23.40</td>
                    <td className="px-3 py-2 text-right border font-medium">$11,700.00</td>
                    <td className="px-3 py-2 text-right border">6 weeks</td>
                    <td className="px-3 py-2 text-right border text-green-700 font-medium">48%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-gray-600"><strong>Note:</strong> Prices include setup, material, machining, and standard deburring. Anodizing or special finishes quoted separately. Quote valid 45 days. Payment terms: 50% deposit, balance Net 30.</p>
            </div>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Separate costs', text: 'Classify setup (fixed) vs machining/material (variable) costs with detailed breakdown.' },
      { name: 'Calculate setup amortization', text: 'Divide total setup cost by quantity tiers (1, 10, 50, 100, 500, 1000) to see dramatic unit cost reduction.' },
      { name: 'Apply machine rate', text: 'Use hourly rate including depreciation, maintenance, energy, and overhead based on target utilization (65-80%).' },
      { name: 'Compute tooling wear', text: 'Calculate per-part tool cost based on material hardness, tool life, and number of operations.' },
      { name: 'Structure pricing tiers', text: 'Create 4-5 volume tiers with appropriate margins: 45-55% prototype, 35-42% small batch, 28-35% standard, 22-28% production.' },
      { name: 'Optimize with DFM', text: 'Review design for cost reduction opportunities: standard materials, relaxed tolerances, simplified geometry.' },
      { name: 'Generate professional quote', text: 'Export tiered pricing table with cost breakdown, lead times, terms, and validity period.' },
    ],
    downloads: [
      { label: 'CNC Volume Pricing Calculator (Excel)', href: '/downloads/tutorials/laser-cutting-cost-calculator.csv' },
      { label: 'Tooling Cost Reference Guide', href: '/downloads/tutorials/tooling-cost-reference.csv' },
    ],
  },
  'equipment-roi-narrative': {
    title: 'Equipment ROI analysis for CFOs and finance partners',
    description:
      'Turn calculator outputs into board-ready Payback, NPV, and IRR with scenarios, sensitivities, risks, and a concise executive narrative.',
    duration: '18 min',
    level: 'Strategic',
    sections: [
      {
        heading: '1) Finance metrics: definitions & formulas',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Use consistent definitions and cash flow conventions. All cash flows are after-tax and nominal unless stated otherwise.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-900">Payback Period</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm text-blue-800">
                  <li><strong>Definition:</strong> Time required for cumulative net cash flow to recover initial investment.</li>
                  <li><strong>Formula:</strong> Smallest t s.t. Σ<sub>i=0..t</sub> CF<sub>i</sub> ≥ 0 (with CF<sub>0</sub> negative).</li>
                  <li><strong>Use:</strong> Simplicity for risk filters; does not measure total value.</li>
                </ul>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <h4 className="mb-2 font-semibold text-green-900">Net Present Value (NPV)</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm text-green-800">
                  <li><strong>Definition:</strong> Present value of all cash inflows minus outflows at discount rate r.</li>
                  <li><strong>Formula:</strong> NPV = Σ CF<sub>t</sub> / (1 + r)<sup>t</sup>, t = 0..T.</li>
                  <li><strong>Decision rule:</strong> Accept if NPV &gt; 0 at hurdle r (typ. 8–12%).</li>
                </ul>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <h4 className="mb-2 font-semibold text-purple-900">Internal Rate of Return (IRR)</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm text-purple-800">
                  <li><strong>Definition:</strong> Discount rate where NPV = 0.</li>
                  <li><strong>Interpretation:</strong> Annualized return of the investment's cash flows.</li>
                  <li><strong>Decision rule:</strong> Accept if IRR &gt; hurdle rate (WACC or policy rate).</li>
                </ul>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <h4 className="mb-2 font-semibold text-amber-900">Cash Flow Construction</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm text-amber-800">
                  <li>CF<sub>0</sub> = −(Purchase price + Installation + Ramp costs − Financing proceeds).</li>
                  <li>CF<sub>t</sub> = EBITDA gains − ΔOPEX − Maintenance − Financing interest/principal ± Tax effects + Working capital changes + Residual value at T.</li>
                  <li>Use <strong>after-tax</strong> cash flows for comparability; include depreciation only via tax shield if modeling taxes.</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '2) Step-by-step example workflow (inputs → cash flows → metrics)',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Document inputs, build annual cash flows, then compute Payback, NPV, and IRR. Replace placeholders with your firm's rates and quotes.</p>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Required Inputs</h4>
              <div className="grid gap-3 md:grid-cols-2 text-sm text-gray-700">
                <ul className="ml-5 list-disc space-y-1">
                  <li>Equipment price, installation, training, tooling starter kit</li>
                  <li>Financing terms (rate, tenor, down payment) or cash purchase</li>
                  <li>Utilization plan (hours/year by year), yield/scrap, learning curve</li>
                  <li>Revenue drivers (throughput/hour, price/hour or per-part margin)</li>
                </ul>
                <ul className="ml-5 list-disc space-y-1">
                  <li>Operating costs: energy, consumables, maintenance contract</li>
                  <li>Labor: operators per shift, wage/benefits, productivity uplift</li>
                  <li>Tax rate, depreciation method (for tax shield), salvage value</li>
                  <li>Discount rate (WACC or policy hurdle), evaluation horizon (e.g., 5–7 years)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">Computation Steps</h4>
              <ol className="ml-5 list-decimal space-y-1 text-sm text-blue-800">
                <li>Build year-0 outflow (purchase + install − financing proceeds).</li>
                <li>For each year t, compute incremental gross margin = (throughput × price or contribution) − variable costs.</li>
                <li>Subtract fixed OPEX (labor delta, maintenance, software, insurance).</li>
                <li>Subtract financing cash flows if debt-funded (interest + principal) or apply WACC in NPV if unlevered modeling.</li>
                <li>Apply taxes if modeling after-tax cash flows; add back tax shield where applicable.</li>
                <li>Add terminal cash flow at horizon (salvage value − tax on gain/loss).</li>
                <li>Compute Payback (cumulative CF), NPV at r, and IRR.</li>
              </ol>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Year</th>
                    <th className="px-3 py-2 text-right border">Utilization (hrs)</th>
                    <th className="px-3 py-2 text-right border">Net CF</th>
                    <th className="px-3 py-2 text-right border">Cum. CF</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-3 py-2 border">0</td><td className="px-3 py-2 text-right border">—</td><td className="px-3 py-2 text-right border">− Initial outlay</td><td className="px-3 py-2 text-right border">− Initial outlay</td></tr>
                  <tr><td className="px-3 py-2 border">1</td><td className="px-3 py-2 text-right border">Plan</td><td className="px-3 py-2 text-right border">CF₁</td><td className="px-3 py-2 text-right border">CF₀+CF₁</td></tr>
                  <tr><td className="px-3 py-2 border">2</td><td className="px-3 py-2 text-right border">Plan</td><td className="px-3 py-2 text-right border">CF₂</td><td className="px-3 py-2 text-right border">…</td></tr>
                  <tr><td className="px-3 py-2 border">3</td><td className="px-3 py-2 text-right border">Plan</td><td className="px-3 py-2 text-right border">CF₃</td><td className="px-3 py-2 text-right border">…</td></tr>
                  <tr><td className="px-3 py-2 border">4</td><td className="px-3 py-2 text-right border">Plan</td><td className="px-3 py-2 text-right border">CF₄</td><td className="px-3 py-2 text-right border">…</td></tr>
                  <tr><td className="px-3 py-2 border">5</td><td className="px-3 py-2 text-right border">Plan</td><td className="px-3 py-2 text-right border">CF₅ + Terminal</td><td className="px-3 py-2 text-right border">…</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        heading: '3) Scenario planning (Conservative / Target / Optimistic)',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Frame outcomes as utilization and pricing vary. Keep assumptions explicit and consistent across scenarios.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Scenario</th>
                    <th className="px-3 py-2 text-right border">Utilization</th>
                    <th className="px-3 py-2 text-right border">Throughput</th>
                    <th className="px-3 py-2 text-right border">Unit economics</th>
                    <th className="px-3 py-2 text-right border">NPV @ r</th>
                    <th className="px-3 py-2 text-right border">IRR</th>
                    <th className="px-3 py-2 text-right border">Payback</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border font-medium">Conservative</td>
                    <td className="px-3 py-2 text-right border">50–60%</td>
                    <td className="px-3 py-2 text-right border">Lower bound</td>
                    <td className="px-3 py-2 text-right border">Price −5%, scrap +2%</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Target</td>
                    <td className="px-3 py-2 text-right border">65–75%</td>
                    <td className="px-3 py-2 text-right border">Plan</td>
                    <td className="px-3 py-2 text-right border">Baseline</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Optimistic</td>
                    <td className="px-3 py-2 text-right border">80–90%</td>
                    <td className="px-3 py-2 text-right border">Upper bound</td>
                    <td className="px-3 py-2 text-right border">Price +3%, scrap −1%</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                    <td className="px-3 py-2 text-right border">Result</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        heading: '4) Sensitivity analysis (what moves ROI most?)',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Stress-test key levers individually to show which variables dominate value creation.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Variable</th>
                    <th className="px-3 py-2 text-right border">−10%</th>
                    <th className="px-3 py-2 text-right border">−5%</th>
                    <th className="px-3 py-2 text-right border">Base</th>
                    <th className="px-3 py-2 text-right border">+5%</th>
                    <th className="px-3 py-2 text-right border">+10%</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-3 py-2 border">Average selling price</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td></tr>
                  <tr><td className="px-3 py-2 border">Utilization (hrs/year)</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td></tr>
                  <tr><td className="px-3 py-2 border">Labor cost</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td></tr>
                  <tr><td className="px-3 py-2 border">Energy & consumables</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td></tr>
                  <tr><td className="px-3 py-2 border">Discount rate (WACC)</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td><td className="px-3 py-2 text-right border">NPV</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        heading: '5) Risk register & mitigations (for credit committees)',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Show you have identified and actively managed key risks across demand, execution, and finance.</p>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Demand risk</h5>
                <p className="text-sm text-gray-700"><strong>Risk:</strong> Order intake slower than plan; price pressure.</p>
                <p className="text-sm text-green-700"><strong>Mitigation:</strong> Signed MOUs, frame agreements, diversified sectors, tiered pricing incentives, marketing pipeline commitments.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Ramp risk</h5>
                <p className="text-sm text-gray-700"><strong>Risk:</strong> Longer learning curve; scrap and rework during ramp-up.</p>
                <p className="text-sm text-green-700"><strong>Mitigation:</strong> OEM training, on-site apps support, pilot runs, SPC/first-article protocols, preventive maintenance.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Operational risk</h5>
                <p className="text-sm text-gray-700"><strong>Risk:</strong> Unplanned downtime; consumable cost spikes.</p>
                <p className="text-sm text-green-700"><strong>Mitigation:</strong> Service contract with uptime SLAs, critical spares kit, dual-source consumables, OEE monitoring.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Financial risk</h5>
                <p className="text-sm text-gray-700"><strong>Risk:</strong> Interest rate increases; FX exposure on imports.</p>
                <p className="text-sm text-green-700"><strong>Mitigation:</strong> Fixed-rate financing, interest rate caps, forward cover, matched-currency cash flows.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '6) Executive narrative & slide outline',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Communicate value in finance language with a clear storyline and verifiable assumptions.</p>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Slide 1 – Investment summary:</strong> What, why now, total outlay, timing, decision required.</li>
              <li><strong>Slide 2 – Business case:</strong> Customer demand, throughput gains, cost-out, margin uplift.</li>
              <li><strong>Slide 3 – Scenarios:</strong> Conservative / Target / Optimistic KPIs (NPV/IRR/Payback).</li>
              <li><strong>Slide 4 – Sensitivities:</strong> Top 3 value drivers and break-even points.</li>
              <li><strong>Slide 5 – Risks & mitigations:</strong> Controls, contracts, service SLAs, contingency.</li>
              <li><strong>Slide 6 – Recommendation:</strong> Ask, conditions precedent, success metrics, next steps.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '7) Stakeholder FAQs & objection handling',
        content: (
          <div>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">"What happens if utilization is 20% lower?"</h5>
                <p className="text-sm text-gray-700">Show conservative scenario metrics; add mitigation: sales commitments, cross-selling into adjacent SKUs, flexible staffing.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">"Why is IRR below our hurdle?"</h5>
                <p className="text-sm text-gray-700">Demonstrate levers to close gap: price uplift via value-add, higher OEE, shift structure, or vendor financing improvements.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">"Are cash flows after-tax and realistic?"</h5>
                <p className="text-sm text-gray-700">Confirm after-tax basis, tax shield treatment, and data sources (quotes, utility tariffs, wage tables, historical OEE).</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Collect inputs', text: 'Gather equipment, financing, utilization, pricing, OPEX, tax, and discount rate.' },
      { name: 'Build cash flows', text: 'Construct after-tax annual cash flows including terminal value.' },
      { name: 'Evaluate metrics', text: 'Compute Payback (months), NPV at hurdle, and IRR.' },
      { name: 'Run scenarios', text: 'Conservative/Target/Optimistic utilization and pricing.' },
      { name: 'Test sensitivities', text: 'Vary top levers ±5–10% to locate break-even points.' },
      { name: 'Package narrative', text: 'Slides with assumptions, risks, mitigations, and clear ask.' },
    ],
    downloads: [
      { label: 'ROI Calculator Template (Excel)', href: '/downloads/tutorials/equipment-roi-analysis-template.csv' },
      { label: 'Scenario & Sensitivity Worksheet (CSV)', href: '/downloads/tutorials/roi-sensitivity-template.csv' },
    ],
  },
  'complex-nesting-pro': {
    title: 'Advanced nesting strategies for 80–90% material utilization',
    description:
      'Master professional nesting techniques to achieve 80-90% material utilization through intelligent part placement, rotation optimization, and kerf management.',
    duration: '22 min',
    level: 'Intermediate',
    sections: [
      {
        heading: '1) Baseline Utilization Measurement & Analysis',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Establish your current material efficiency to quantify improvement opportunities and track progress.
            </p>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">Utilization Formula</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div><strong>Material Utilization %</strong> = (Total Part Area ÷ Sheet Area Used) × 100</div>
                <div><strong>Total Part Area</strong> = Sum of all part footprints (including kerf allowance)</div>
                <div><strong>Sheet Area Used</strong> = Actual sheet dimensions consumed (not full sheet if partial)</div>
                <div><strong>Scrap Rate %</strong> = 100 − Utilization %</div>
              </div>
            </div>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Nesting Method</th>
                    <th className="px-3 py-2 text-right border">Typical Utilization</th>
                    <th className="px-3 py-2 text-right border">Scrap Rate</th>
                    <th className="px-3 py-2 text-left border">Characteristics</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Manual rectangular layout</td>
                    <td className="px-3 py-2 text-right border text-red-700">55-65%</td>
                    <td className="px-3 py-2 text-right border text-red-700">35-45%</td>
                    <td className="px-3 py-2 border text-sm">Simple grid, no rotation, large gaps</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Basic software nesting</td>
                    <td className="px-3 py-2 text-right border text-orange-700">70-75%</td>
                    <td className="px-3 py-2 text-right border text-orange-700">25-30%</td>
                    <td className="px-3 py-2 border text-sm">Auto-spacing, limited rotation</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Advanced nesting (manual optimized)</td>
                    <td className="px-3 py-2 text-right border text-yellow-700">78-82%</td>
                    <td className="px-3 py-2 text-right border text-yellow-700">18-22%</td>
                    <td className="px-3 py-2 border text-sm">Strategic rotation, tight spacing, part grouping</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Professional CAM software</td>
                    <td className="px-3 py-2 text-right border text-green-700">85-90%</td>
                    <td className="px-3 py-2 text-right border text-green-700">10-15%</td>
                    <td className="px-3 py-2 border text-sm">AI optimization, common line cutting, micro-spacing</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Measurement process:</strong> For current jobs, measure actual part areas (CAD), sheet size used, and calculate utilization. Track over 10-20 jobs for baseline average.</li>
              <li><strong>Cost impact:</strong> Each 1% utilization improvement saves ~$0.50-$2.00 per sheet depending on material. At 100 sheets/month, 10% improvement = $500-$2,000/month savings.</li>
              <li><strong>Benchmark targets:</strong> Standard job shop: 70-75%, optimized shop: 78-85%, production with CAM software: 85-90%.</li>
              <li><strong>Documentation:</strong> Create utilization log with job number, material, sheet size, parts nested, utilization %, and notes on constraints (grain direction, finish side, etc.).</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '2) Strategic Part Grouping & Rotation Optimization',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Intelligent part arrangement and rotation rules can improve utilization by 8-15% without software investment.
            </p>
            <div className="mb-4 rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">Rotation Strategy by Part Type</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-green-800">
                <li><strong>Symmetric parts:</strong> Allow 90°, 180°, 270° rotation freely. No functional impact.</li>
                <li><strong>Asymmetric with grain:</strong> Limit to 0° or 180° only if grain direction matters (aluminum extrusions, rolled steel).</li>
                <li><strong>Finish-critical parts:</strong> Keep same orientation if one side has protective film or better surface finish.</li>
                <li><strong>Nested shapes:</strong> Try interlocking patterns where concave areas of one part fit convex areas of another.</li>
                <li><strong>Mixed sizes:</strong> Place large parts first, fill gaps with smaller parts. Avoid all-same-size layouts.</li>
              </ul>
            </div>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Spacing Parameter</th>
                    <th className="px-3 py-2 text-right border">Minimum Safe</th>
                    <th className="px-3 py-2 text-right border">Standard</th>
                    <th className="px-3 py-2 text-right border">Conservative</th>
                    <th className="px-3 py-2 text-left border">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Part-to-part spacing</td>
                    <td className="px-3 py-2 text-right border">2-3mm</td>
                    <td className="px-3 py-2 text-right border">3-5mm</td>
                    <td className="px-3 py-2 text-right border">5-8mm</td>
                    <td className="px-3 py-2 border text-sm">Tighter for thin materials, wider for thick</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Edge margin (sheet edge)</td>
                    <td className="px-3 py-2 text-right border">5mm</td>
                    <td className="px-3 py-2 text-right border">8-10mm</td>
                    <td className="px-3 py-2 text-right border">12-15mm</td>
                    <td className="px-3 py-2 border text-sm">Prevents edge warping and clamp interference</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Common line cutting</td>
                    <td className="px-3 py-2 text-right border">0mm (shared)</td>
                    <td className="px-3 py-2 text-right border">N/A</td>
                    <td className="px-3 py-2 text-right border">N/A</td>
                    <td className="px-3 py-2 border text-sm">Advanced: one cut serves two parts (CAM software)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Skeleton bridge width</td>
                    <td className="px-3 py-2 text-right border">3mm</td>
                    <td className="px-3 py-2 text-right border">5-8mm</td>
                    <td className="px-3 py-2 text-right border">10mm</td>
                    <td className="px-3 py-2 border text-sm">Keeps scrap skeleton stable during cutting</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Grouping by size:</strong> Nest similar-sized parts together. Large parts (&gt;500mm) separate from small parts (&lt;100mm) to avoid wasted space.</li>
              <li><strong>Grouping by shape:</strong> Rectangular parts nest efficiently together. Complex organic shapes need more trial-and-error or software optimization.</li>
              <li><strong>Pierce optimization:</strong> Group parts to minimize total pierces. Shared edges or common line cutting can eliminate pierces between adjacent parts.</li>
              <li><strong>Lead-in placement:</strong> Position lead-ins toward scrap areas, not into adjacent parts. Use tangent or perpendicular lead-ins (0.5-2mm) to minimize dross.</li>
              <li><strong>Grain direction rules:</strong> For materials with grain (rolled sheet), orient parts along grain for better strength. Mark grain direction on CAD layers.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '3) Kerf Compensation & Offset Management',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Proper kerf compensation ensures parts fit together while maximizing material usage. Incorrect offsets waste material or cause scrap.
            </p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Material & Thickness</th>
                    <th className="px-3 py-2 text-right border">Typical Kerf Width</th>
                    <th className="px-3 py-2 text-right border">Offset per Side</th>
                    <th className="px-3 py-2 text-left border">Compensation Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Mild steel 1-3mm</td>
                    <td className="px-3 py-2 text-right border">0.15-0.25mm</td>
                    <td className="px-3 py-2 text-right border">0.08-0.13mm</td>
                    <td className="px-3 py-2 border text-sm">Offset outward for outer contours, inward for holes</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Mild steel 6-12mm</td>
                    <td className="px-3 py-2 text-right border">0.25-0.40mm</td>
                    <td className="px-3 py-2 text-right border">0.13-0.20mm</td>
                    <td className="px-3 py-2 border text-sm">Wider kerf due to slower speeds and higher power</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Stainless 1-3mm</td>
                    <td className="px-3 py-2 text-right border">0.20-0.30mm</td>
                    <td className="px-3 py-2 text-right border">0.10-0.15mm</td>
                    <td className="px-3 py-2 border text-sm">Nitrogen assist gas, cleaner kerf than oxygen</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Aluminum 1-6mm</td>
                    <td className="px-3 py-2 text-right border">0.15-0.30mm</td>
                    <td className="px-3 py-2 text-right border">0.08-0.15mm</td>
                    <td className="px-3 py-2 border text-sm">Reflective material, kerf varies with power/speed</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Acrylic/Plastic 3-10mm</td>
                    <td className="px-3 py-2 text-right border">0.10-0.20mm</td>
                    <td className="px-3 py-2 text-right border">0.05-0.10mm</td>
                    <td className="px-3 py-2 border text-sm">Very clean kerf, minimal taper</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-lg bg-yellow-50 p-4">
              <h4 className="mb-2 font-semibold text-yellow-900">Kerf Compensation Best Practices</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-yellow-800">
                <li><strong>Test cuts first:</strong> Cut test squares (e.g., 100mm × 100mm) and measure actual dimensions to determine real kerf for your machine/material combo.</li>
                <li><strong>Outer contours:</strong> Offset toolpath outward by half kerf width so finished part matches CAD dimensions.</li>
                <li><strong>Inner holes:</strong> Offset toolpath inward by half kerf width so hole size matches CAD.</li>
                <li><strong>Mating parts:</strong> For parts that fit together (slots, tabs), add 0.1-0.2mm clearance beyond kerf compensation to ensure assembly fit.</li>
                <li><strong>Nesting spacing:</strong> When calculating part-to-part spacing, account for kerf width. Minimum spacing = desired gap + kerf width.</li>
                <li><strong>Software settings:</strong> Most CAM software has kerf compensation built-in. Set "tool diameter" or "kerf width" parameter correctly.</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        heading: '4) Lead-In/Lead-Out Optimization',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Lead-ins and lead-outs affect cut quality, dross formation, and nesting efficiency. Optimize for both quality and material usage.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Perpendicular Lead-In</h5>
                <p className="text-sm text-gray-700"><strong>Length:</strong> 0.5-1.5mm typical</p>
                <p className="text-sm text-gray-700"><strong>Pros:</strong> Minimal material waste, fast programming</p>
                <p className="text-sm text-gray-700"><strong>Cons:</strong> Can leave small mark on part edge</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> Internal holes, non-critical edges, tight nesting</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Arc/Loop Lead-In</h5>
                <p className="text-sm text-gray-700"><strong>Radius:</strong> 1-3mm typical</p>
                <p className="text-sm text-gray-700"><strong>Pros:</strong> Smooth entry, minimal dross, better edge quality</p>
                <p className="text-sm text-gray-700"><strong>Cons:</strong> Requires more space (2-6mm), slower programming</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> External contours, visible edges, quality parts</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Tangent Lead-In</h5>
                <p className="text-sm text-gray-700"><strong>Length:</strong> 1-2mm typical</p>
                <p className="text-sm text-gray-700"><strong>Pros:</strong> Smooth transition, good for curves</p>
                <p className="text-sm text-gray-700"><strong>Cons:</strong> Moderate space requirement</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> Curved edges, aesthetic parts</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Common Line (No Lead-In)</h5>
                <p className="text-sm text-gray-700"><strong>Space:</strong> 0mm (shared cut)</p>
                <p className="text-sm text-gray-700"><strong>Pros:</strong> Maximum material efficiency, eliminates pierce</p>
                <p className="text-sm text-gray-700"><strong>Cons:</strong> Requires CAM software, not always possible</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> Adjacent rectangular parts, production runs</p>
              </div>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700 mt-4">
              <li><strong>Lead-in placement strategy:</strong> Position lead-ins in scrap areas or corners where marks are acceptable. Avoid placing on mating edges or visible surfaces.</li>
              <li><strong>Pierce point optimization:</strong> Each pierce takes 0.5-2 seconds and creates a defect point. Minimize total pierces by using common line cutting where possible.</li>
              <li><strong>Dross management:</strong> Lead-out length affects dross buildup. Extend lead-out 1-2mm beyond part to allow dross to fall into scrap area.</li>
              <li><strong>Thermal distortion:</strong> On thin materials (&lt;1.5mm), use shorter lead-ins (0.5mm) to minimize heat input and warping.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '5) Software vs Manual Nesting Trade-Offs',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Evaluate when to invest in nesting software versus manual optimization based on volume, complexity, and material costs.
            </p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Approach</th>
                    <th className="px-3 py-2 text-right border">Utilization</th>
                    <th className="px-3 py-2 text-right border">Time per Job</th>
                    <th className="px-3 py-2 text-right border">Cost</th>
                    <th className="px-3 py-2 text-left border">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Manual CAD nesting</td>
                    <td className="px-3 py-2 text-right border">70-78%</td>
                    <td className="px-3 py-2 text-right border">15-45 min</td>
                    <td className="px-3 py-2 text-right border">$0 (CAD only)</td>
                    <td className="px-3 py-2 border text-sm">Low volume, simple shapes, tight budget</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Basic CAM software</td>
                    <td className="px-3 py-2 text-right border">75-82%</td>
                    <td className="px-3 py-2 text-right border">5-15 min</td>
                    <td className="px-3 py-2 text-right border">$2-5K/year</td>
                    <td className="px-3 py-2 border text-sm">Medium volume, mixed complexity</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Advanced CAM (SigmaNEST, etc.)</td>
                    <td className="px-3 py-2 text-right border">85-90%</td>
                    <td className="px-3 py-2 text-right border">2-8 min</td>
                    <td className="px-3 py-2 text-right border">$8-20K/year</td>
                    <td className="px-3 py-2 border text-sm">High volume, complex shapes, expensive materials</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">ROI Calculation for Nesting Software</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div><strong>Material savings:</strong> 10% utilization improvement on $50K annual material spend = $5,000/year savings</div>
                <div><strong>Time savings:</strong> 20 min/job × 200 jobs/year × $60/hr labor = $4,000/year savings</div>
                <div><strong>Total annual benefit:</strong> $9,000/year</div>
                <div><strong>Software cost:</strong> $10,000/year (advanced CAM)</div>
                <div><strong>Payback period:</strong> 13 months</div>
                <div className="pt-2 mt-2 border-t border-blue-300"><strong>Decision:</strong> Invest if material spend &gt;$30K/year or &gt;150 jobs/year</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '6) Before/After Case Studies',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Real-world examples showing utilization improvements and cost savings through optimized nesting strategies.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 1: Bracket Production (Simple Shapes)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="font-semibold mb-1">Before Optimization</p>
                    <ul className="ml-5 list-disc space-y-1 text-gray-700">
                      <li>Manual rectangular layout</li>
                      <li>No rotation, 8mm spacing</li>
                      <li>24 parts per 1220×2440mm sheet</li>
                      <li>Utilization: 62%</li>
                      <li>Material cost: $3.85/part</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">After Optimization</p>
                    <ul className="ml-5 list-disc space-y-1 text-green-700">
                      <li>90° rotation enabled</li>
                      <li>4mm spacing, optimized placement</li>
                      <li>32 parts per sheet (+33%)</li>
                      <li>Utilization: 82%</li>
                      <li>Material cost: $2.89/part (−25%)</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Annual savings:</strong> 500 parts/month × $0.96 savings/part × 12 months = $5,760/year</p>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 2: Decorative Panels (Complex Shapes)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="font-semibold mb-1">Before Optimization</p>
                    <ul className="ml-5 list-disc space-y-1 text-gray-700">
                      <li>Basic CAM auto-nesting</li>
                      <li>6mm spacing, limited rotation</li>
                      <li>8 panels per 1525×3050mm sheet</li>
                      <li>Utilization: 71%</li>
                      <li>Material cost: $42.50/panel</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">After Optimization</p>
                    <ul className="ml-5 list-disc space-y-1 text-green-700">
                      <li>Advanced CAM with interlocking</li>
                      <li>3mm spacing, full rotation, common lines</li>
                      <li>11 panels per sheet (+38%)</li>
                      <li>Utilization: 88%</li>
                      <li>Material cost: $30.90/panel (−27%)</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Annual savings:</strong> 200 panels/month × $11.60 savings/panel × 12 months = $27,840/year</p>
              </div>

              <div className="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">📊 Case 3: Mixed Part Job (Various Sizes)</h5>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="font-semibold mb-1">Before Optimization</p>
                    <ul className="ml-5 list-disc space-y-1 text-gray-700">
                      <li>All same-size parts per sheet</li>
                      <li>Multiple sheets for different sizes</li>
                      <li>3 sheets required for job</li>
                      <li>Average utilization: 68%</li>
                      <li>Total material cost: $285</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">After Optimization</p>
                    <ul className="ml-5 list-disc space-y-1 text-green-700">
                      <li>Mixed sizes on same sheet</li>
                      <li>Small parts fill gaps around large parts</li>
                      <li>2 sheets required for job (−33%)</li>
                      <li>Average utilization: 84%</li>
                      <li>Total material cost: $190 (−33%)</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600"><strong>Key insight:</strong> Mixed-size nesting is most effective when you have variety. Combining jobs can dramatically improve utilization.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '7) Common Nesting Mistakes & Troubleshooting',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Avoid these common errors that waste material, cause quality issues, or damage equipment.
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Parts Too Close to Sheet Edge</h5>
                <p className="text-sm text-gray-700"><strong>Problem:</strong> Edge warping, clamp interference, parts fall off table.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Maintain 8-12mm minimum edge margin. Increase to 15mm for thick materials (&gt;10mm).</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Insufficient Part-to-Part Spacing</h5>
                <p className="text-sm text-gray-700"><strong>Problem:</strong> Heat transfer between parts causes warping, parts stick together, difficult to separate.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Use minimum 3mm spacing for thin materials, 5mm for thick. Test and adjust based on material behavior.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Ignoring Grain Direction</h5>
                <p className="text-sm text-gray-700"><strong>Problem:</strong> Parts crack along grain under stress, inconsistent bending behavior.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Mark grain direction on CAD. Orient critical parts along grain. Document grain orientation requirements in job notes.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Weak Skeleton Bridges</h5>
                <p className="text-sm text-gray-700"><strong>Problem:</strong> Scrap skeleton collapses during cutting, parts shift, machine crashes.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Maintain 5-8mm bridge width between parts. Add support tabs on large scrap areas. Cut perimeter last.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Incorrect Kerf Compensation Direction</h5>
                <p className="text-sm text-gray-700"><strong>Problem:</strong> Parts oversized or undersized, mating parts don't fit, scrap parts.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Offset outward for outer contours, inward for holes. Test first part before running full batch.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">❌ Lead-Ins on Visible Edges</h5>
                <p className="text-sm text-gray-700"><strong>Problem:</strong> Cosmetic defects, customer rejects, rework costs.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Place lead-ins in scrap areas, corners, or non-visible edges. Use arc lead-ins for critical edges.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '8) Material Cost Impact Calculator',
        content: (
          <div>
            <p className="mb-3 text-gray-700">
              Quantify the financial impact of utilization improvements to justify process changes or software investment.
            </p>
            <div className="rounded-lg bg-purple-50 p-4">
              <h4 className="mb-2 font-semibold text-purple-900">Cost Savings Formula</h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div><strong>Annual Material Spend</strong> = Monthly sheet consumption × Sheet cost × 12 months</div>
                <div><strong>Utilization Improvement Value</strong> = Annual spend × (New util % − Old util %) ÷ Old util %</div>
                <div><strong>Example:</strong> $60,000 annual spend, 70% → 85% utilization</div>
                <div className="ml-4">Savings = $60,000 × (85 − 70) ÷ 70 = $12,857/year</div>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Utilization Improvement</th>
                    <th className="px-3 py-2 text-right border">$30K/yr spend</th>
                    <th className="px-3 py-2 text-right border">$60K/yr spend</th>
                    <th className="px-3 py-2 text-right border">$120K/yr spend</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">65% → 75% (+10%)</td>
                    <td className="px-3 py-2 text-right border">$4,615/yr</td>
                    <td className="px-3 py-2 text-right border">$9,231/yr</td>
                    <td className="px-3 py-2 text-right border">$18,462/yr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">70% → 85% (+15%)</td>
                    <td className="px-3 py-2 text-right border">$6,429/yr</td>
                    <td className="px-3 py-2 text-right border">$12,857/yr</td>
                    <td className="px-3 py-2 text-right border">$25,714/yr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">75% → 88% (+13%)</td>
                    <td className="px-3 py-2 text-right border">$5,200/yr</td>
                    <td className="px-3 py-2 text-right border">$10,400/yr</td>
                    <td className="px-3 py-2 text-right border">$20,800/yr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-2 text-gray-700 mt-4">
              <li><strong>Break-even analysis:</strong> If nesting software costs $10K/year, you need >$10K annual material savings. At $60K spend, need 10%+ utilization improvement.</li>
              <li><strong>Hidden benefits:</strong> Beyond material savings, improved nesting reduces cutting time (fewer pierces, shorter travel), lowers gas consumption, and increases throughput.</li>
              <li><strong>Competitive advantage:</strong> 15% lower material costs allow 10-12% price reduction while maintaining margins, winning more bids.</li>
            </ul>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Measure baseline', text: 'Calculate current utilization % on 10-20 recent jobs to establish baseline average.' },
      { name: 'Identify constraints', text: 'Document grain direction, finish requirements, and rotation limitations for each part type.' },
      { name: 'Optimize spacing', text: 'Reduce part-to-part spacing to 3-5mm while maintaining quality. Test on sample sheet.' },
      { name: 'Enable rotation', text: 'Allow 90°/180° rotation for symmetric parts. Group similar shapes together.' },
      { name: 'Set kerf compensation', text: 'Test cut squares, measure actual dimensions, set correct kerf offsets in CAM software.' },
      { name: 'Optimize lead-ins', text: 'Use arc lead-ins for visible edges, perpendicular for internal holes. Place in scrap areas.' },
      { name: 'Calculate savings', text: 'Compare new vs old utilization %. Multiply improvement by annual material spend to quantify value.' },
      { name: 'Document process', text: 'Create nesting standards document with spacing rules, rotation guidelines, and kerf values.' },
    ],
    downloads: [
      { label: 'Nesting Optimization Checklist (Markdown)', href: '/downloads/tutorials/material-nesting-checklist.md' },
      { label: 'Utilization Calculator (Excel)', href: '/downloads/tutorials/nesting-utilization-calculator.csv' },
    ],
  },
  'quoting-automation-playbook': {
    title: 'Quoting automation: from inputs to versioned offers in minutes',
    description:
      'Build a repeatable workflow for quotes with consistent assumptions, margin targets, and PDF exports.',
    duration: '24 min',
    level: 'Intermediate',
    sections: [
      {
        heading: '1) Standardize commercial assumptions',
        content: (
          <div>
            <p className="mb-2 text-gray-700">Quoting automation is only reliable when the economic inputs are controlled.</p>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Rates:</strong> Lock machine hourly rates, setup fees, labor rates, and overhead allocation per quarter.</li>
              <li><strong>Materials:</strong> Maintain a price list with effective dates, supplier, and MOQ/breaks; expire old prices.</li>
              <li><strong>Energy & gas:</strong> Capture kWh and gas cost per hour by machine/material stack.</li>
              <li><strong>Margins:</strong> Define target and floor margins by customer tier (New, Strategic, OEM) and by deal size.</li>
              <li><strong>Rounding:</strong> Standardize currency rounding (e.g., to $0.10) and freight handling rules.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '2) Inputs → routings → costs (repeatable extraction)',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>File intake:</strong> Validate CAD (units mm, closed contours, no duplicates). Capture metadata: material, thickness, finish, quantity tiers.</li>
              <li><strong>Routing build:</strong> Derive operations (program, load, cut, deburr, bend, finish) with standard times and formulas.</li>
              <li><strong>Cycle time calc:</strong> From geometry: cutting length, number of pierces, rapid moves; apply machine parameters from your cut database.</li>
              <li><strong>Setup amortization:</strong> Split setup time across quantity tier (1, 10, 50, 100, 250, 500).</li>
              <li><strong>Material calc:</strong> Use nesting utilization or conservative yield to compute sheet usage and scrap cost.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '3) Multi-quantity pricing and tier logic',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Quantity ladder:</strong> Quote at least 5 tiers (1, 10, 50, 100, 250) to capture scale effects.</li>
              <li><strong>Setup allocation:</strong> Unit setup cost = Setup time × Rate ÷ Qty.</li>
              <li><strong>Price floors:</strong> Enforce minimum margin per tier; flag any tier below floor for approval.</li>
              <li><strong>Bundle logic:</strong> Combine SKUs that share setup to improve effective price for customer while protecting margin.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '4) Margin policy, approvals, and discounts',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Target vs floor:</strong> Display both; color-code below-floor tiers for manager approval.</li>
              <li><strong>Discount scenarios:</strong> Simulate % discount effect on gross margin and contribution per hour.</li>
              <li><strong>Exception logging:</strong> Record reason codes (strategic logo, excess capacity, competitive match).</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '5) Customer-facing output (consistent PDF)',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Header:</strong> Quote ID, validity, lead time, incoterms, payment terms.</li>
              <li><strong>Table:</strong> Quantity tiers, unit price, tooling/setup line, notes.</li>
              <li><strong>Assumptions:</strong> Material grade, finish, tolerances, exclusions, and revision date.</li>
              <li><strong>Branding:</strong> Use unified template with logo, contact, and CTA.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '6) Versioning and audit trail',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Version control:</strong> Increment revision on any commercial change; keep immutable history.</li>
              <li><strong>Change log:</strong> Who, when, what changed (rates, tiers, discounts, assumptions).</li>
              <li><strong>Status:</strong> Draft → Sent → Customer discussion → Won/Lost; store acceptance evidence.</li>
            </ul>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Lock inputs', text: 'Freeze quarterly rates, material list, and margin bands.' },
      { name: 'Build routing', text: 'Extract geometry → cycle time; add setup, secondary ops.' },
      { name: 'Price tiers', text: 'Apply setup amortization across 1/10/50/100/250 quantities.' },
      { name: 'Check margin', text: 'Enforce floor; flag exceptions and request approval.' },
      { name: 'Export PDF', text: 'Generate branded, consistent customer PDF with assumptions.' },
      { name: 'Archive versions', text: 'Save revisions with change log and status updates.' },
    ],
    downloads: [
      { label: 'Quoting Automation Template (CSV)', href: '/downloads/quoting-automation-template.csv' },
      { label: 'Quote PDF Template (Markdown)', href: '/downloads/tutorials/quote-pdf-template.md' },
      { label: 'Margin Policy Checklist (Markdown)', href: '/downloads/tutorials/margin-policy-checklist.md' },
    ],
  },
  'laser-assist-gas-strategy': {
    title: 'Assist gas strategy: cost, quality, and speed trade-offs',
    description:
      'Select O₂/N₂/Air by material and thickness to balance edge quality with total job cost and throughput.',
    duration: '16 min',
    level: 'Fundamental',
    sections: [
      {
        heading: '1) Choose gas by material, thickness, and outcome',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Match gas to material to achieve the required edge quality at the lowest total cost.</p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Material</th>
                    <th className="px-3 py-2 text-left border">Typical Thickness</th>
                    <th className="px-3 py-2 text-left border">Recommended Gas</th>
                    <th className="px-3 py-2 text-left border">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Mild steel</td>
                    <td className="px-3 py-2 border">1–12 mm</td>
                    <td className="px-3 py-2 border">O₂ (most), N₂ for paint-ready edges</td>
                    <td className="px-3 py-2 border text-sm">O₂ fastest; oxide layer present. N₂ is slower but clean edge, no oxide.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Stainless steel</td>
                    <td className="px-3 py-2 border">0.8–8 mm</td>
                    <td className="px-3 py-2 border">N₂</td>
                    <td className="px-3 py-2 border text-sm">Bright, clean edge. Prevents oxidation and discoloration.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Aluminum</td>
                    <td className="px-3 py-2 border">1–6 mm</td>
                    <td className="px-3 py-2 border">N₂ or Air (thin)</td>
                    <td className="px-3 py-2 border text-sm">N₂ for best edge. Air acceptable on thin sheet with minor burr risk.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Galvanized steel</td>
                    <td className="px-3 py-2 border">1–4 mm</td>
                    <td className="px-3 py-2 border">N₂</td>
                    <td className="px-3 py-2 border text-sm">Minimizes coating burn; watch fumes; ensure extraction.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Finish requirement:</strong> Paint-ready or food-grade edges → prefer N₂ even on mild steel.</li>
              <li><strong>Throughput focus:</strong> General fabrication with deburr step → O₂ on mild steel for speed.</li>
              <li><strong>Cost control:</strong> Thin (&lt;2 mm) aluminum or mild steel → consider Air; validate edge quality first.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '2) Quantify gas cost and total job economics',
        content: (
          <div>
            <div className="rounded-lg bg-blue-50 p-4 mb-4">
              <h4 className="mb-2 font-semibold text-blue-900">Cost Formulas</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div><strong>Gas cost per hour</strong> = Flow (m³/hr) × Price ($/m³)</div>
                <div><strong>Gas cost per job</strong> = Gas cost/hr × Cut time (hr)</div>
                <div><strong>Total job cost impact</strong> = (Gas + Energy + Consumables) ÷ Quantity</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Gas</th>
                    <th className="px-3 py-2 text-right border">Typical Flow</th>
                    <th className="px-3 py-2 text-right border">Price</th>
                    <th className="px-3 py-2 text-right border">Cost/hr (example)</th>
                    <th className="px-3 py-2 text-left border">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">O₂</td>
                    <td className="px-3 py-2 text-right border">6–15 m³/hr</td>
                    <td className="px-3 py-2 text-right border">$0.50–$1.50/m³</td>
                    <td className="px-3 py-2 text-right border">$3–$23</td>
                    <td className="px-3 py-2 border text-sm">Lower flow than N₂; fastest on mild steel.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">N₂</td>
                    <td className="px-3 py-2 text-right border">15–35 m³/hr</td>
                    <td className="px-3 py-2 text-right border">$0.30–$1.20/m³</td>
                    <td className="px-3 py-2 text-right border">$5–$42</td>
                    <td className="px-3 py-2 border text-sm">Higher flow; clean edge, no oxide.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Air</td>
                    <td className="px-3 py-2 text-right border">10–25 m³/hr</td>
                    <td className="px-3 py-2 text-right border">Low (compressor)</td>
                    <td className="px-3 py-2 text-right border">$1–$6 (electricity)</td>
                    <td className="px-3 py-2 border text-sm">Very low gas cost; validate edge quality.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        heading: '3) Nozzle, pressure, and parameter guidelines',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Nozzle diameter:</strong> 1.0–2.0 mm common; larger for thicker material to maintain flow.</li>
              <li><strong>Pressure:</strong> O₂: 0.3–1.5 bar; N₂: 8–20 bar; Air: 5–10 bar (typical ranges—tune per machine).</li>
              <li><strong>Stand-off:</strong> Maintain correct distance to minimize dross and taper; auto height control recommended.</li>
              <li><strong>Clean supply:</strong> Ensure dry, oil-free Air and N₂; filter to protect optics and improve edge quality.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '4) Quality vs speed: when to choose O₂ / N₂ / Air',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>O₂ (mild steel):</strong> Best for speed and thick sections; oxide must be removed before painting/welding.</li>
              <li><strong>N₂ (stainless/aluminum):</strong> Best edge quality; use when cosmetic finish or corrosion resistance matters.</li>
              <li><strong>Air (thin sheet):</strong> Lowest cost; acceptable for non-cosmetic parts; test for minor burr/discoloration.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '5) Safety and supply management',
        content: (
          <div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Ventilation:</strong> Use proper extraction for O₂ on mild steel and galvanized materials (fume control).</li>
              <li><strong>Cylinders vs bulk:</strong> High N₂ consumption favors bulk tanks or N₂ generators; review ROI on annual usage.</li>
              <li><strong>Leak checks:</strong> Regularly inspect lines and fittings; leaks raise gas cost and reduce cut quality.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '6) Case studies: choosing the right gas',
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
              <h5 className="mb-1 font-semibold text-gray-900">Mild Steel 6 mm, Painted Parts</h5>
              <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                <li><strong>O₂:</strong> Fastest cut, oxide removal adds 30–60 sec/part deburr → total time increases.</li>
                <li><strong>N₂:</strong> Slightly slower but paint-ready edge → saves rework, better total cost on small/medium batches.</li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-4">
              <h5 className="mb-1 font-semibold text-gray-900">Stainless 3 mm, Visible Panels</h5>
              <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                <li>N₂ provides bright edge; avoids discoloration and post-processing → shortest end-to-end lead time.</li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-yellow-500 bg-gray-50 p-4">
              <h5 className="mb-1 font-semibold text-gray-900">Aluminum 2 mm, Internal Brackets</h5>
              <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                <li>Air viable with minor burr; if cosmetic surfaces needed, switch to N₂ to avoid rework.</li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Select gas', text: 'Pick O₂/N₂/Air by material, thickness, and cosmetic requirements.' },
      { name: 'Estimate cost', text: 'Compute gas cost/hr and per job; include energy and consumables.' },
      { name: 'Set parameters', text: 'Choose nozzle and pressure; validate cut quality on sample.' },
      { name: 'Verify finish', text: 'Check edge for paint/weld-readiness; adjust gas if rework is high.' },
      { name: 'Standardize', text: 'Document chosen parameters and update your cut database.' },
    ],
    downloads: [
      { label: 'Assist Gas Reference (CSV)', href: '/downloads/assist-gas-reference.csv' },
      { label: 'Gas Cost Calculator (CSV)', href: '/downloads/tutorials/gas-cost-calculator.csv' },
      { label: 'Parameter Checklist (Markdown)', href: '/downloads/tutorials/assist-gas-parameter-checklist.md' },
    ],
  },
  'overhead-allocation': {
    title: 'Overhead allocation strategies for accurate job costing',
    description:
      'Master overhead allocation methods to ensure every quote captures your true costs including rent, utilities, insurance, and indirect labor.',
    duration: '28 min',
    level: 'Advanced',
    sections: [
      {
        heading: '1) Calculate total overhead burden',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Identify and quantify all indirect costs that must be recovered through pricing.</p>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Overhead Category</th>
                    <th className="px-3 py-2 text-left border">Examples</th>
                    <th className="px-3 py-2 text-right border">Typical % of Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border font-medium">Facilities</td>
                    <td className="px-3 py-2 border text-sm">Rent, utilities, property tax, insurance, maintenance</td>
                    <td className="px-3 py-2 text-right border">8-15%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Equipment</td>
                    <td className="px-3 py-2 border text-sm">Depreciation, lease payments, repairs, calibration</td>
                    <td className="px-3 py-2 text-right border">10-20%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Indirect labor</td>
                    <td className="px-3 py-2 border text-sm">Supervision, QC, scheduling, shipping, admin</td>
                    <td className="px-3 py-2 text-right border">12-25%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Support functions</td>
                    <td className="px-3 py-2 border text-sm">IT, HR, accounting, sales, engineering</td>
                    <td className="px-3 py-2 text-right border">5-12%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Annual calculation:</strong> Sum all overhead expenses from P&L; exclude direct material and direct labor.</li>
              <li><strong>Fixed vs variable:</strong> Separate fixed (rent, salaries) from variable (utilities, consumables) for better utilization modeling.</li>
              <li><strong>Benchmark:</strong> Total overhead typically 35-60% of revenue for job shops; higher for capital-intensive operations.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '2) Choose allocation method by shop type',
        content: (
          <div>
            <div className="space-y-3 mb-4">
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Machine Hour Rate (capital-intensive)</h5>
                <p className="text-sm text-gray-700"><strong>Formula:</strong> Overhead ÷ Total machine hours available</p>
                <p className="text-sm text-gray-600"><strong>Best for:</strong> Laser cutting, CNC machining, high equipment depreciation</p>
                <p className="text-sm text-green-700"><strong>Example:</strong> $500K overhead ÷ 4,000 hrs = $125/machine-hr</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Direct Labor % (traditional job shops)</h5>
                <p className="text-sm text-gray-700"><strong>Formula:</strong> Overhead ÷ Direct labor cost × 100%</p>
                <p className="text-sm text-gray-600"><strong>Best for:</strong> Labor-intensive operations, manual assembly</p>
                <p className="text-sm text-green-700"><strong>Example:</strong> $400K overhead ÷ $600K labor = 67% markup</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Activity-Based Costing (complex multi-process)</h5>
                <p className="text-sm text-gray-700"><strong>Formula:</strong> Assign costs to activities, then allocate based on activity drivers</p>
                <p className="text-sm text-gray-600"><strong>Best for:</strong> Mixed operations with multiple cost pools</p>
                <p className="text-sm text-green-700"><strong>Example:</strong> Setup cost pool allocated by # setups; QC pool by inspection time</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '3) Adjust for utilization and capacity',
        content: (
          <div>
            <div className="rounded-lg bg-yellow-50 p-4 mb-4">
              <h4 className="mb-2 font-semibold text-yellow-900">Utilization Impact on Rates</h4>
              <div className="space-y-1 text-sm text-yellow-800">
                <div><strong>Low utilization (50-60%):</strong> Fixed costs spread over fewer hours → higher rates required</div>
                <div><strong>Target utilization (70-80%):</strong> Standard rate; sustainable for long-term planning</div>
                <div><strong>High utilization (85-95%):</strong> Lower rates possible; watch for capacity constraints and overtime</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Utilization</th>
                    <th className="px-3 py-2 text-right border">Available Hours</th>
                    <th className="px-3 py-2 text-right border">Billable Hours</th>
                    <th className="px-3 py-2 text-right border">Overhead/Hr</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">50% (low)</td>
                    <td className="px-3 py-2 text-right border">4,000</td>
                    <td className="px-3 py-2 text-right border">2,000</td>
                    <td className="px-3 py-2 text-right border text-red-700">$250/hr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">75% (target)</td>
                    <td className="px-3 py-2 text-right border">4,000</td>
                    <td className="px-3 py-2 text-right border">3,000</td>
                    <td className="px-3 py-2 text-right border text-green-700">$167/hr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">90% (high)</td>
                    <td className="px-3 py-2 text-right border">4,000</td>
                    <td className="px-3 py-2 text-right border">3,600</td>
                    <td className="px-3 py-2 text-right border text-blue-700">$139/hr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        heading: '4) Department-specific overhead pools',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Different departments have different cost structures; separate pools improve accuracy.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Department</th>
                    <th className="px-3 py-2 text-left border">Primary Driver</th>
                    <th className="px-3 py-2 text-left border">Cost Profile</th>
                    <th className="px-3 py-2 text-right border">Typical OH Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Laser cutting</td>
                    <td className="px-3 py-2 border text-sm">Machine hours</td>
                    <td className="px-3 py-2 border text-sm">High equipment depreciation, low labor</td>
                    <td className="px-3 py-2 text-right border">$120-180/hr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Bending/forming</td>
                    <td className="px-3 py-2 border text-sm">Machine hours</td>
                    <td className="px-3 py-2 border text-sm">Medium equipment, medium labor</td>
                    <td className="px-3 py-2 text-right border">$80-120/hr</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Welding/assembly</td>
                    <td className="px-3 py-2 border text-sm">Labor hours</td>
                    <td className="px-3 py-2 border text-sm">Low equipment, high skilled labor</td>
                    <td className="px-3 py-2 text-right border">50-80% of DL</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Finishing/coating</td>
                    <td className="px-3 py-2 border text-sm">Square footage</td>
                    <td className="px-3 py-2 border text-sm">High facility cost, environmental compliance</td>
                    <td className="px-3 py-2 text-right border">$60-100/hr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        heading: '5) Quarterly review and rate reconciliation',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Prevent over/under-absorption by reviewing actual vs budgeted overhead quarterly.</p>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm">
              <li><strong>Compare actual overhead:</strong> Review P&L; identify variances (utilities spike, unplanned repairs, etc.).</li>
              <li><strong>Compare actual hours:</strong> Did utilization match plan? If lower, rates need adjustment for Q next.</li>
              <li><strong>True-up mechanism:</strong> If overhead under-absorbed (rates too low), adjust next quarter rates +10-15% to recover.</li>
              <li><strong>Document assumptions:</strong> Record utilization target, major cost changes, and rate effective dates.</li>
              <li><strong>Communicate to sales:</strong> Share rate changes with lead time; avoid mid-quote surprises.</li>
            </ul>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Sum overhead', text: 'Total all indirect costs from P&L; separate fixed vs variable.' },
      { name: 'Choose method', text: 'Select machine hour, labor %, or ABC based on shop profile.' },
      { name: 'Set utilization', text: 'Target 70-80% utilization for sustainable rate calculation.' },
      { name: 'Create pools', text: 'Separate rates by department if cost profiles differ significantly.' },
      { name: 'Review quarterly', text: 'Compare actual to budget; adjust rates to prevent under-absorption.' },
    ],
    downloads: [
      { label: 'Overhead Allocation Calculator (CSV)', href: '/downloads/tutorials/overhead-allocation-calculator.csv' },
      { label: 'Department Rate Worksheet (CSV)', href: '/downloads/tutorials/department-overhead-rates.csv' },
    ],
  },
  'competitive-benchmarking': {
    title: 'Competitive pricing analysis and market positioning',
    description:
      'Use market data and competitor analysis to position your pricing strategically while maintaining profitability.',
    duration: '21 min',
    level: 'Strategic',
    sections: [
      {
        heading: '1) Conduct competitor pricing research',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Gather intelligence on competitor pricing through multiple channels to establish market baseline.</p>
            <div className="space-y-3">
              <div className="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Method 1: RFQ sampling</h5>
                <p className="text-sm text-gray-700">Submit test RFQs to 3-5 competitors quarterly. Track prices by part type, material, and quantity.</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> Direct price comparison on similar parts</p>
              </div>
              <div className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Method 2: Online pricing tools</h5>
                <p className="text-sm text-gray-700">Use instant-quote platforms (Xometry, Protolabs, etc.) to benchmark pricing models and lead times.</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> Understanding automated pricing algorithms</p>
              </div>
              <div className="rounded-lg border-l-4 border-yellow-500 bg-gray-50 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Method 3: Customer feedback</h5>
                <p className="text-sm text-gray-700">Ask sales team to gather competitive quotes from prospects; note win/loss price gaps.</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> Real-world pricing in your target segment</p>
              </div>
              <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-3">
                <h5 className="mb-1 font-semibold text-gray-900">Method 4: Industry surveys</h5>
                <p className="text-sm text-gray-700">Reference SME, NTMA, or regional fab association pricing surveys for hourly rates by region.</p>
                <p className="text-sm text-green-700"><strong>Best for:</strong> Regional rate benchmarks and market trends</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '2) Map capabilities and differentiation factors',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Identify what justifies premium pricing or where you should compete on value.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Capability</th>
                    <th className="px-3 py-2 text-left border">Your Position</th>
                    <th className="px-3 py-2 text-left border">Competitor Avg</th>
                    <th className="px-3 py-2 text-left border">Pricing Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">Lead time</td>
                    <td className="px-3 py-2 border text-sm">3-5 days</td>
                    <td className="px-3 py-2 border text-sm">7-10 days</td>
                    <td className="px-3 py-2 border text-sm text-green-700">Premium +10-15%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Quality certifications</td>
                    <td className="px-3 py-2 border text-sm">ISO 9001, AS9100</td>
                    <td className="px-3 py-2 border text-sm">ISO 9001 only</td>
                    <td className="px-3 py-2 border text-sm text-green-700">Premium +5-10% (aerospace)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Max thickness</td>
                    <td className="px-3 py-2 border text-sm">25mm mild steel</td>
                    <td className="px-3 py-2 border text-sm">12-15mm typical</td>
                    <td className="px-3 py-2 border text-sm text-green-700">Niche advantage</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Secondary services</td>
                    <td className="px-3 py-2 border text-sm">Bending, welding, coating</td>
                    <td className="px-3 py-2 border text-sm">Cutting only</td>
                    <td className="px-3 py-2 border text-sm text-green-700">Bundle value +20-30%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">Capacity/volume</td>
                    <td className="px-3 py-2 border text-sm">Medium (2 machines)</td>
                    <td className="px-3 py-2 border text-sm">High (5+ machines)</td>
                    <td className="px-3 py-2 border text-sm text-red-700">Value position required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        heading: '3) Calculate price elasticity by segment',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Different customer segments have different price sensitivity; tailor your approach.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Customer Segment</th>
                    <th className="px-3 py-2 text-left border">Price Sensitivity</th>
                    <th className="px-3 py-2 text-left border">Decision Drivers</th>
                    <th className="px-3 py-2 text-left border">Pricing Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border font-medium">Prototype/R&D</td>
                    <td className="px-3 py-2 border text-sm">Low</td>
                    <td className="px-3 py-2 border text-sm">Speed, flexibility, iteration support</td>
                    <td className="px-3 py-2 border text-sm text-green-700">Premium +20-30%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Small batch (1-50)</td>
                    <td className="px-3 py-2 border text-sm">Medium</td>
                    <td className="px-3 py-2 border text-sm">Quality, lead time, service</td>
                    <td className="px-3 py-2 border text-sm text-blue-700">Standard +10-15%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">Production (100+)</td>
                    <td className="px-3 py-2 border text-sm">High</td>
                    <td className="px-3 py-2 border text-sm">Price, consistency, capacity</td>
                    <td className="px-3 py-2 border text-sm text-orange-700">Competitive, volume tiers</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border font-medium">OEM partnerships</td>
                    <td className="px-3 py-2 border text-sm">Very high</td>
                    <td className="px-3 py-2 border text-sm">Lowest total cost, reliability, terms</td>
                    <td className="px-3 py-2 border text-sm text-red-700">Tight margins, long-term value</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="ml-5 list-disc space-y-1 text-gray-700 text-sm mt-4">
              <li><strong>Test pricing:</strong> Vary quotes by ±10% across similar opportunities; track conversion rates to find sweet spot.</li>
              <li><strong>Bundle services:</strong> Prototype customers value one-stop-shop; bundle cutting + finishing at 25% premium vs à la carte.</li>
              <li><strong>Volume incentives:</strong> Production customers respond to tiered pricing; show 15-25% savings at higher quantities.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '4) Develop value-based pricing tiers',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Package your services into tiered offerings that communicate value beyond price.</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border-2 border-gray-300 p-4">
                <h5 className="mb-2 font-semibold text-gray-900">Economy</h5>
                <p className="text-sm text-gray-600 mb-3">Best for: Simple parts, flexible lead time</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>✓ 7-10 day lead time</li>
                  <li>✓ Standard tolerances</li>
                  <li>✓ Cutting only</li>
                  <li>✗ No expediting</li>
                  <li>✗ Limited materials</li>
                </ul>
                <p className="mt-3 text-sm font-semibold text-gray-900">Price: Market −10%</p>
              </div>
              <div className="rounded-lg border-2 border-blue-500 p-4 bg-blue-50">
                <h5 className="mb-2 font-semibold text-blue-900">Standard</h5>
                <p className="text-sm text-blue-700 mb-3">Best for: Most projects</p>
                <ul className="space-y-1 text-xs text-blue-800">
                  <li>✓ 3-5 day lead time</li>
                  <li>✓ Tight tolerances (±0.1mm)</li>
                  <li>✓ Bending, deburring available</li>
                  <li>✓ All standard materials</li>
                  <li>✓ Dedicated support</li>
                </ul>
                <p className="mt-3 text-sm font-semibold text-blue-900">Price: Market rate</p>
              </div>
              <div className="rounded-lg border-2 border-green-500 p-4 bg-green-50">
                <h5 className="mb-2 font-semibold text-green-900">Premium</h5>
                <p className="text-sm text-green-700 mb-3">Best for: Urgent, complex, certified</p>
                <ul className="space-y-1 text-xs text-green-800">
                  <li>✓ 24-48 hr rush available</li>
                  <li>✓ Precision ±0.05mm</li>
                  <li>✓ Full finishing, assembly</li>
                  <li>✓ Exotic materials, certs</li>
                  <li>✓ Engineering review included</li>
                </ul>
                <p className="mt-3 text-sm font-semibold text-green-900">Price: Market +20-30%</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        heading: '5) Monitor win/loss patterns and adjust',
        content: (
          <div>
            <p className="mb-3 text-gray-700">Track quote outcomes systematically to identify pricing sweet spots and blind spots.</p>
            <div className="rounded-lg bg-purple-50 p-4 mb-4">
              <h4 className="mb-2 font-semibold text-purple-900">Win/Loss Analysis Framework</h4>
              <ul className="ml-5 list-disc space-y-1 text-sm text-purple-800">
                <li><strong>Win rate by price point:</strong> If win rate &lt;30% when within 10% of market, you may be overpriced.</li>
                <li><strong>Loss reason codes:</strong> Track: price too high, lead time, quality concerns, no response. Focus on price losses.</li>
                <li><strong>Competitive intel:</strong> When lost on price, ask customer for winner's price (±10% range). Build database.</li>
                <li><strong>Quarterly review:</strong> Plot win rate vs price premium. Adjust pricing to target 40-60% win rate on qualified leads.</li>
              </ul>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border">Price Position</th>
                    <th className="px-3 py-2 text-right border">Quotes</th>
                    <th className="px-3 py-2 text-right border">Wins</th>
                    <th className="px-3 py-2 text-right border">Win Rate</th>
                    <th className="px-3 py-2 text-left border">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 border">−10% below market</td>
                    <td className="px-3 py-2 text-right border">50</td>
                    <td className="px-3 py-2 text-right border">42</td>
                    <td className="px-3 py-2 text-right border text-green-700">84%</td>
                    <td className="px-3 py-2 border text-sm text-red-700">Too low; leaving money on table</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">At market (±5%)</td>
                    <td className="px-3 py-2 text-right border">100</td>
                    <td className="px-3 py-2 text-right border">55</td>
                    <td className="px-3 py-2 text-right border text-green-700">55%</td>
                    <td className="px-3 py-2 border text-sm text-green-700">Optimal; competitive and profitable</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border">+15% above market</td>
                    <td className="px-3 py-2 text-right border">60</td>
                    <td className="px-3 py-2 text-right border">12</td>
                    <td className="px-3 py-2 text-right border text-red-700">20%</td>
                    <td className="px-3 py-2 border text-sm text-red-700">Too high unless differentiation clear</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
    ],
    steps: [
      { name: 'Research competitors', text: 'Submit test RFQs, use online tools, gather customer feedback, review industry surveys.' },
      { name: 'Map differentiation', text: 'Identify your lead time, quality, capacity, service advantages vs competitors.' },
      { name: 'Segment customers', text: 'Classify by price sensitivity: prototype (low), small batch (medium), production (high).' },
      { name: 'Create tiers', text: 'Package Economy/Standard/Premium offerings with clear value differences.' },
      { name: 'Track win/loss', text: 'Monitor win rate by price point; adjust quarterly to maintain 40-60% win rate.' },
    ],
    downloads: [
      { label: 'Competitive Analysis Template (CSV)', href: '/downloads/tutorials/competitive-analysis-template.csv' },
      { label: 'Win/Loss Tracker (CSV)', href: '/downloads/tutorials/win-loss-tracker.csv' },
      { label: 'Pricing Tier Worksheet (Markdown)', href: '/downloads/tutorials/pricing-tiers-worksheet.md' },
    ],
  },
};

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = TUTORIALS[params.slug];
  if (!tutorial) return notFound();

  const howTo = generateHowToSchema({ name: tutorial.title, description: tutorial.description, steps: tutorial.steps });

  return (
    <div>
      <Navigation />
      <main className="bg-gray-50 py-16">
        <SchemaMarkup schema={howTo} />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog/tutorials" className="text-sm font-semibold text-primary-600">← Back to tutorials</Link>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">{tutorial.title}</h1>
            <p className="mt-2 text-gray-600">{tutorial.description}</p>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
              <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">{tutorial.level}</span>
              <span>Duration: {tutorial.duration}</span>
            </div>

            <div className="prose prose-gray mt-8 max-w-none">
              {tutorial.sections.map(section => (
                <section key={section.heading} className="mb-8">
                  <h2 className="mb-3 text-2xl font-semibold text-gray-900">{section.heading}</h2>
                  <div>{section.content}</div>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border bg-white p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Downloadables</h3>
              <ul className="ml-5 list-disc space-y-2 text-sm text-gray-700">
                <li>
                  <Link href="/calculators/laser-cutting" className="text-primary-600 hover:underline">
                    Open Laser Cutting Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/cost-center/hourly-rate" className="text-primary-600 hover:underline">
                    Open Hourly Rate Builder
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/cost-center/quotation-margin" className="text-primary-600 hover:underline">
                    Open Quotation Margin Simulator
                  </Link>
                </li>
                {tutorial.downloads?.map(d => (
                  <li key={d.href}>
                    <a href={d.href} className="text-primary-600 hover:underline" download>
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


