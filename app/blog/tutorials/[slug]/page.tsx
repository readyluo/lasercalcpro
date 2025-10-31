import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateHowToSchema } from '@/lib/seo/schema';

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
          <>
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
          </>
        ),
      },
      {
        heading: '2) Material Selection & Specifications',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '3) Cost Calculation & Parameters',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '4) Quality Control & Tolerances',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '5) Quote Generation & Customer Communication',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '6) Common Issues & Solutions',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '7) Real-World Case Studies',
        content: (
          <>
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
          </>
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
          <>
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
          </>
        ),
      },
      {
        heading: '2) Setup Cost Amortization Across Batch Sizes',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '3) Tooling Life Cycle & Wear Cost Calculation',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '4) Machine Utilization & Hourly Rate Optimization',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '5) Detailed Case Studies by Complexity',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '6) Volume Pricing Strategy & Tier Structure',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '7) Design for Manufacturability (DFM) Cost Optimization',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '8) Publishing Multi-Tier Quotes',
        content: (
          <>
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
          </>
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
          <>
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
          </>
        ),
      },
      {
        heading: '2) Step-by-step example workflow (inputs → cash flows → metrics)',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '3) Scenario planning (Conservative / Target / Optimistic)',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '4) Sensitivity analysis (what moves ROI most?)',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '5) Risk register & mitigations (for credit committees)',
        content: (
          <>
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
          </>
        ),
      },
      {
        heading: '6) Executive narrative & slide outline',
        content: (
          <>
            <p className="mb-3 text-gray-700">Communicate value in finance language with a clear storyline and verifiable assumptions.</p>
            <ul className="ml-5 list-disc space-y-2 text-gray-700">
              <li><strong>Slide 1 – Investment summary:</strong> What, why now, total outlay, timing, decision required.</li>
              <li><strong>Slide 2 – Business case:</strong> Customer demand, throughput gains, cost-out, margin uplift.</li>
              <li><strong>Slide 3 – Scenarios:</strong> Conservative / Target / Optimistic KPIs (NPV/IRR/Payback).</li>
              <li><strong>Slide 4 – Sensitivities:</strong> Top 3 value drivers and break-even points.</li>
              <li><strong>Slide 5 – Risks & mitigations:</strong> Controls, contracts, service SLAs, contingency.</li>
              <li><strong>Slide 6 – Recommendation:</strong> Ask, conditions precedent, success metrics, next steps.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '7) Stakeholder FAQs & objection handling',
        content: (
          <>
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
          </>
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
    title: 'Complex nesting for 80–90% material utilisation (hands-on)',
    description:
      'Use nesting strategies to lift utilisation by 10–20% and directly reduce material cost per part.',
    duration: '22 min',
    level: 'Intermediate',
    sections: [
      {
        heading: '1) Establish baseline utilisation',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Calculate current utilisation with simple rectangle nesting.</li>
            <li>Record sheet size, scrap (kerf-adjusted), and part count per sheet.</li>
          </ul>
        ),
      },
      {
        heading: '2) Apply pattern grouping and rotation rules',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Group similar contours to minimise pierces and travel.</li>
            <li>Allow 90°/180° rotations; respect grain or finish constraints.</li>
          </ul>
        ),
      },
      {
        heading: '3) Validate kerf compensation and lead-ins',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Apply kerf offsets from Kerf Reference to critical features.</li>
            <li>Optimise lead-ins to reduce dross and rework.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Measure utilisation', text: 'Compute baseline material utilisation on current layout.' },
      { name: 'Group parts', text: 'Batch similar shapes, enable rotations per spec.' },
      { name: 'Set kerf', text: 'Use typical kerf by material/thickness/nozzle.' },
      { name: 'Recompute', text: 'Compare material cost per part before/after.' },
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
        heading: '1) Standardise assumptions',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Lock hourly rate, gas prices, and energy tariffs per quarter.</li>
            <li>Define margin bands by customer tier (new, strategic, OEM).</li>
          </ul>
        ),
      },
      {
        heading: '2) Generate multi-tier pricing',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Use Quotation Margin Simulator to create tiered pricing and save versions.</li>
            <li>Assess discount impact to maintain minimum viable margin.</li>
          </ul>
        ),
      },
      {
        heading: '3) Export and version control',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Export PDF with inputs and breakdown for transparency.</li>
            <li>Maintain quote IDs and revision history for audits.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Set standards', text: 'Quarterly locked rates and margin targets.' },
      { name: 'Create tiers', text: 'Generate prices per quantity and customer tier.' },
      { name: 'Validate margin', text: 'Check discount impact and thresholds.' },
      { name: 'Export & archive', text: 'PDF export and revision logging.' },
    ],
    downloads: [
      { label: 'Quoting Automation Template (CSV)', href: '/downloads/quoting-automation-template.csv' },
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
        heading: '1) Choose gas by outcome',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>O₂: faster on mild steel, oxide layer present.</li>
            <li>N₂: clean edges on stainless/aluminum, higher cost.</li>
            <li>Air: cost-effective on thin sheets, watch edge finish.</li>
          </ul>
        ),
      },
      {
        heading: '2) Quantify cost impact',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Estimate gas consumption (m³/hr) × price to get hourly gas cost.</li>
            <li>Include in Hourly Rate and per-job Laser Cutting calculator.</li>
          </ul>
        ),
      },
      {
        heading: '3) Optimise parameters',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Use appropriate nozzle and pressure; avoid overpressure waste.</li>
            <li>Track edge quality vs rework time to find the optimum.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Pick gas', text: 'Select by material, thickness, and quality requirements.' },
      { name: 'Estimate cost', text: 'Compute m³ × $/m³ and compare to cycle time.' },
      { name: 'Tune process', text: 'Adjust pressure/nozzle to minimise total cost.' },
    ],
    downloads: [
      { label: 'Assist Gas Reference (CSV)', href: '/downloads/assist-gas-reference.csv' },
    ],
  },
};

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = TUTORIALS[params.slug];
  if (!tutorial) return notFound();

  const howTo = generateHowToSchema({ name: tutorial.title, description: tutorial.description, steps: tutorial.steps });

  return (
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
  );
}


