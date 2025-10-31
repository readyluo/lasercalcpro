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
        heading: '1) Identify fixed vs variable time',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Setup time (fixtures, program load) is fixed; amortize across batch size.</li>
            <li>Spindle time, tool changes, deburr are variable per part.</li>
          </ul>
        ),
      },
      {
        heading: '2) Choose batch sizes and compute unit cost',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Model quantities (1, 10, 50, 200) and distribute setup time accordingly.</li>
            <li>Add tooling wear per part and machine hourly rate.</li>
          </ul>
        ),
      },
      {
        heading: '3) Publish tiered prices',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Target margin 25–35% for custom work; relax for strategic accounts.</li>
            <li>Export a table with Qty, Unit Price, Margin for the quote.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Separate times', text: 'Classify setup vs per-part time.' },
      { name: 'Distribute setup', text: 'Divide setup minutes by quantity tiers.' },
      { name: 'Add machine rate', text: 'Apply hourly rate incl. overhead.' },
      { name: 'Compute tooling', text: 'Include wear per part for cutters.' },
      { name: 'Set margins', text: 'Price tiers to margin targets.' },
    ],
  },
  'equipment-roi-narrative': {
    title: 'Narrating equipment ROI to CFOs and bank partners',
    description:
      'Translate calculator outputs into payback & NPV narratives with scenario analysis for executive stakeholders.',
    duration: '18 min',
    level: 'Strategic',
    sections: [
      {
        heading: '1) Build scenarios',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Create Base, Optimistic (+15% utilization), Downside (−15% utilization) cases.</li>
            <li>Lock inputs for power, labor, maintenance, and financing terms.</li>
          </ul>
        ),
      },
      {
        heading: '2) Convert to board-ready slides',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Summarize Payback (months), IRR, NPV at discount rate 8–12%.</li>
            <li>Highlight risk mitigations: service contracts, training, grants.</li>
          </ul>
        ),
      },
      {
        heading: '3) Communicate sensitivities',
        content: (
          <ul className="ml-5 list-disc space-y-2 text-gray-700">
            <li>Show spider chart: margin vs utilization, energy price, labor rate.</li>
            <li>Provide appendix with underlying assumptions and data sources.</li>
          </ul>
        ),
      },
    ],
    steps: [
      { name: 'Define cases', text: 'Base/Up/Down utilization scenarios.' },
      { name: 'Compute metrics', text: 'Payback, IRR, NPV with clear rates.' },
      { name: 'Draft narrative', text: 'Risk, mitigations, and next steps.' },
      { name: 'Finalize deck', text: 'Appendix with assumptions and sources.' },
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


