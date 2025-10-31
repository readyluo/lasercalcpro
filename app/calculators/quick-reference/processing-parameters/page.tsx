'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Settings, Info, Zap, Wind } from 'lucide-react';

// Material-specific cutting parameters for fiber laser
const mildSteelParams = [
  { thickness: '1mm', power: '1-2 kW', speed: '15-20 m/min', focus: '-1 to 0 mm', gas: 'O₂', pressure: '0.8-1.2 bar', nozzle: '1.0-1.5 mm' },
  { thickness: '2mm', power: '2-3 kW', speed: '8-12 m/min', focus: '-1 to 0 mm', gas: 'O₂', pressure: '0.6-1.0 bar', nozzle: '1.5-2.0 mm' },
  { thickness: '3mm', power: '3-4 kW', speed: '4-6 m/min', focus: '-1.5 to -0.5 mm', gas: 'O₂', pressure: '0.5-0.8 bar', nozzle: '1.5-2.0 mm' },
  { thickness: '5mm', power: '4-6 kW', speed: '2-3.5 m/min', focus: '-2 to -1 mm', gas: 'O₂', pressure: '0.4-0.6 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '6mm', power: '6-8 kW', speed: '1.8-2.5 m/min', focus: '-2 to -1 mm', gas: 'O₂', pressure: '0.3-0.5 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '8mm', power: '6-10 kW', speed: '1.2-1.8 m/min', focus: '-2.5 to -1.5 mm', gas: 'O₂', pressure: '0.3-0.5 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '10mm', power: '8-12 kW', speed: '0.8-1.2 m/min', focus: '-3 to -2 mm', gas: 'O₂', pressure: '0.25-0.4 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '12mm', power: '10-15 kW', speed: '0.6-0.9 m/min', focus: '-3 to -2 mm', gas: 'O₂', pressure: '0.2-0.35 bar', nozzle: '3.0-3.5 mm' },
  { thickness: '15mm', power: '12-20 kW', speed: '0.4-0.7 m/min', focus: '-3.5 to -2.5 mm', gas: 'O₂', pressure: '0.15-0.3 bar', nozzle: '3.0-3.5 mm' },
];

const stainlessSteelParams = [
  { thickness: '1mm', power: '1-2 kW', speed: '10-15 m/min', focus: '-1 to 0 mm', gas: 'N₂', pressure: '12-16 bar', nozzle: '1.0-1.5 mm' },
  { thickness: '2mm', power: '2-3 kW', speed: '5-8 m/min', focus: '-1.5 to -0.5 mm', gas: 'N₂', pressure: '12-16 bar', nozzle: '1.5-2.0 mm' },
  { thickness: '3mm', power: '3-4 kW', speed: '3-4.5 m/min', focus: '-2 to -1 mm', gas: 'N₂', pressure: '14-18 bar', nozzle: '1.5-2.0 mm' },
  { thickness: '4mm', power: '4-6 kW', speed: '2-3 m/min', focus: '-2 to -1 mm', gas: 'N₂', pressure: '14-18 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '5mm', power: '6-8 kW', speed: '1.5-2.2 m/min', focus: '-2.5 to -1.5 mm', gas: 'N₂', pressure: '16-20 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '6mm', power: '6-10 kW', speed: '1.2-1.8 m/min', focus: '-2.5 to -1.5 mm', gas: 'N₂', pressure: '16-20 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '8mm', power: '8-12 kW', speed: '0.8-1.2 m/min', focus: '-3 to -2 mm', gas: 'N₂', pressure: '18-22 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '10mm', power: '10-15 kW', speed: '0.6-0.9 m/min', focus: '-3 to -2 mm', gas: 'N₂', pressure: '18-22 bar', nozzle: '3.0-3.5 mm' },
];

const aluminumParams = [
  { thickness: '1mm', power: '2-3 kW', speed: '12-18 m/min', focus: '0 to +1 mm', gas: 'N₂', pressure: '14-18 bar', nozzle: '1.5-2.0 mm' },
  { thickness: '2mm', power: '3-4 kW', speed: '8-12 m/min', focus: '0 to +1 mm', gas: 'N₂', pressure: '14-18 bar', nozzle: '1.5-2.0 mm' },
  { thickness: '3mm', power: '4-6 kW', speed: '6-9 m/min', focus: '-0.5 to +0.5 mm', gas: 'N₂', pressure: '16-20 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '4mm', power: '6-8 kW', speed: '4-6 m/min', focus: '-0.5 to +0.5 mm', gas: 'N₂', pressure: '16-20 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '5mm', power: '6-10 kW', speed: '3-4.5 m/min', focus: '-1 to 0 mm', gas: 'N₂', pressure: '16-20 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '6mm', power: '8-12 kW', speed: '2.5-3.5 m/min', focus: '-1 to 0 mm', gas: 'N₂', pressure: '18-22 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '8mm', power: '10-15 kW', speed: '1.8-2.5 m/min', focus: '-1.5 to -0.5 mm', gas: 'N₂', pressure: '18-22 bar', nozzle: '3.0-3.5 mm' },
  { thickness: '10mm', power: '12-20 kW', speed: '1.2-1.8 m/min', focus: '-2 to -1 mm', gas: 'N₂', pressure: '20-24 bar', nozzle: '3.0-3.5 mm' },
];

const copperParams = [
  { thickness: '1mm', power: '3-4 kW', speed: '6-10 m/min', focus: '0 to +1 mm', gas: 'N₂', pressure: '16-20 bar', nozzle: '1.5-2.0 mm' },
  { thickness: '2mm', power: '4-6 kW', speed: '3-5 m/min', focus: '0 to +1 mm', gas: 'N₂', pressure: '16-20 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '3mm', power: '6-8 kW', speed: '2-3 m/min', focus: '-0.5 to +0.5 mm', gas: 'N₂', pressure: '18-22 bar', nozzle: '2.0-2.5 mm' },
  { thickness: '4mm', power: '8-10 kW', speed: '1.5-2.2 m/min', focus: '-1 to 0 mm', gas: 'N₂', pressure: '18-22 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '5mm', power: '10-12 kW', speed: '1.2-1.6 m/min', focus: '-1 to 0 mm', gas: 'N₂', pressure: '18-22 bar', nozzle: '2.5-3.0 mm' },
  { thickness: '6mm', power: '12-15 kW', speed: '0.9-1.3 m/min', focus: '-1.5 to -0.5 mm', gas: 'N₂', pressure: '20-24 bar', nozzle: '3.0-3.5 mm' },
];

export default function ProcessingParametersPage() {
  const [selectedMaterial, setSelectedMaterial] = React.useState('mild_steel');

  const faqSchema = generateFAQSchema([
    {
      question: 'What is focal position and why does it matter?',
      answer: 'Focal position is where the laser beam is most concentrated relative to the material surface. Negative focus (below surface) provides deeper penetration for thick materials. Positive focus (above surface) gives cleaner cuts on reflective materials like aluminum. Zero focus (on surface) balances speed and quality.',
    },
    {
      question: 'Why does stainless steel require high nitrogen pressure?',
      answer: 'High nitrogen pressure (12-22 bar) is needed to prevent oxidation and achieve bright, oxide-free cut edges on stainless steel. The high pressure also helps blow molten material out of the kerf efficiently. Lower pressure results in discolored edges that require secondary finishing.',
    },
    {
      question: 'How do I choose the right nozzle diameter?',
      answer: 'Nozzle diameter should increase with material thickness. Thin materials (1-3mm) use 1.0-2.0mm nozzles for precision. Medium thickness (4-8mm) needs 2.0-3.0mm for adequate gas flow. Thick materials (10mm+) require 3.0-3.5mm nozzles to maintain cutting performance.',
    },
    {
      question: 'Can I use these parameters on my laser system?',
      answer: 'These are baseline parameters for modern fiber lasers. Your specific system may require adjustments based on beam quality, nozzle design, material quality, and environmental conditions. Always start with conservative parameters and optimize through testing.',
    },
    {
      question: 'Why is oxygen pressure lower than nitrogen pressure?',
      answer: 'Oxygen cutting uses an exothermic reaction that generates additional heat, requiring only 0.2-1.2 bar. Nitrogen cutting is purely thermal (no reaction), requiring 12-24 bar to blow molten material out effectively. This pressure difference significantly impacts operating costs.',
    },
  ]);

  const materialData: Record<string, typeof mildSteelParams> = {
    mild_steel: mildSteelParams,
    stainless_steel: stainlessSteelParams,
    aluminum: aluminumParams,
    copper: copperParams,
  };

  const materialInfo: Record<string, { name: string; color: string; notes: string }> = {
    mild_steel: {
      name: 'Mild Steel (Carbon Steel)',
      color: 'blue',
      notes: 'Oxygen cutting provides fast speeds and low gas costs. Edge oxidation is normal and often acceptable.',
    },
    stainless_steel: {
      name: 'Stainless Steel (304/316)',
      color: 'gray',
      notes: 'High-pressure nitrogen required for oxide-free edges. Higher gas cost but superior edge quality.',
    },
    aluminum: {
      name: 'Aluminum (5000/6000 Series)',
      color: 'green',
      notes: 'Highly reflective - requires higher power. Positive or zero focus position for best results.',
    },
    copper: {
      name: 'Copper / Brass',
      color: 'orange',
      notes: 'Extremely reflective - high power essential. Challenging to cut consistently below 3kW.',
    },
  };

  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Laser Cutting Processing Parameters Reference
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive parameter tables for fiber laser cutting across materials and thicknesses
            </p>
          </div>

          {/* Quick Info Banner */}
          <div className="card mb-8 border-l-4 border-blue-600 bg-blue-50">
            <div className="flex items-start gap-4">
              <Info className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">How to Use This Reference</h3>
                <p className="text-gray-700 mb-3">
                  These parameters are starting points for modern fiber laser systems (1-20kW). Actual optimal 
                  parameters vary based on beam quality, material grade, nozzle condition, and environmental factors. 
                  Always verify with test cuts before production runs.
                </p>
                <div className="grid gap-2 text-sm md:grid-cols-3">
                  <div className="rounded bg-white p-2">
                    <span className="font-semibold">Power:</span> Laser output power
                  </div>
                  <div className="rounded bg-white p-2">
                    <span className="font-semibold">Focus:</span> Position relative to surface
                  </div>
                  <div className="rounded bg-white p-2">
                    <span className="font-semibold">Pressure:</span> Assist gas pressure
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Material Selector */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Select Material</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(materialInfo).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setSelectedMaterial(key)}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    selectedMaterial === key
                      ? `border-${info.color}-600 bg-${info.color}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <h3 className={`mb-1 font-semibold ${selectedMaterial === key ? `text-${info.color}-900` : 'text-gray-900'}`}>
                    {info.name}
                  </h3>
                  <p className="text-xs text-gray-600">{info.notes}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Parameters Table */}
          <div className="card mb-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                {materialInfo[selectedMaterial].name} - Cutting Parameters
              </h2>
              <Settings className="h-6 w-6 text-gray-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50">
                    <th className="p-3 text-left font-semibold">Thickness</th>
                    <th className="p-3 text-left font-semibold">Power Range</th>
                    <th className="p-3 text-left font-semibold">Cutting Speed</th>
                    <th className="p-3 text-left font-semibold">Focal Position</th>
                    <th className="p-3 text-left font-semibold">Assist Gas</th>
                    <th className="p-3 text-left font-semibold">Gas Pressure</th>
                    <th className="p-3 text-left font-semibold">Nozzle Ø</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {materialData[selectedMaterial].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 font-medium">{row.thickness}</td>
                      <td className="p-3">{row.power}</td>
                      <td className="p-3">{row.speed}</td>
                      <td className="p-3">{row.focus}</td>
                      <td className="p-3">{row.gas}</td>
                      <td className="p-3">{row.pressure}</td>
                      <td className="p-3">{row.nozzle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-lg bg-yellow-50 p-4">
              <div className="flex items-start gap-3">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> These parameters assume good beam quality (M² &lt; 1.5), clean nozzles, 
                  and standard material grades. Higher-quality materials or better beam quality may allow faster speeds. 
                  Lower-grade materials may require slower speeds or higher power.
                </p>
              </div>
            </div>
          </div>

          {/* Parameter Optimization Guide */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Parameter Optimization Guide</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Power & Speed Relationship
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">▸</span>
                    <span><strong>Higher Power:</strong> Enables faster speeds but increases heat input and edge roughness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">▸</span>
                    <span><strong>Lower Power:</strong> Slower but smoother edges, less dross, better dimensional accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">▸</span>
                    <span><strong>Optimal Zone:</strong> Maximum speed where edge quality meets requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">▸</span>
                    <span><strong>Rule of Thumb:</strong> Doubling power increases cutting speed by 50-70%, not 100%</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Settings className="h-5 w-5 text-green-600" />
                  Focal Position Effects
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">▸</span>
                    <span><strong>Negative Focus (-2 to -3mm):</strong> Deep penetration, good for thick materials (≥6mm)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">▸</span>
                    <span><strong>Zero Focus (0mm):</strong> Balanced performance, general purpose for most thicknesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">▸</span>
                    <span><strong>Positive Focus (+0.5 to +1mm):</strong> Clean top edge, ideal for reflective materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">▸</span>
                    <span><strong>Adjustment Step:</strong> Change in 0.5mm increments during optimization</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Wind className="h-5 w-5 text-purple-600" />
                  Gas Pressure Tuning
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-purple-600">▸</span>
                    <span><strong>Too High:</strong> Excessive turbulence, rough edges, wasted gas, potential nozzle damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-purple-600">▸</span>
                    <span><strong>Too Low:</strong> Incomplete melt ejection, dross buildup, poor edge quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-purple-600">▸</span>
                    <span><strong>Optimal:</strong> Clean ejection without turbulence, minimal dross, smooth edges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-purple-600">▸</span>
                    <span><strong>Testing:</strong> Start at recommended pressure, adjust ±2 bar to optimize</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Info className="h-5 w-5 text-orange-600" />
                  Nozzle Selection
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-orange-600">▸</span>
                    <span><strong>Small Nozzle (1.0-1.5mm):</strong> Precision cutting, thin materials, tight tolerances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-orange-600">▸</span>
                    <span><strong>Medium Nozzle (2.0-2.5mm):</strong> General purpose, most common for 3-8mm materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-orange-600">▸</span>
                    <span><strong>Large Nozzle (3.0-3.5mm):</strong> Thick materials (≥10mm), high gas flow required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-orange-600">▸</span>
                    <span><strong>Maintenance:</strong> Replace or clean nozzles every 20-40 hours of cutting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Issues & Solutions */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Common Issues & Solutions</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Issue: Excessive Dross (molten material on bottom edge)</h3>
                <p className="mb-2 text-sm text-gray-700"><strong>Causes:</strong> Insufficient gas pressure, focus too high, speed too slow, nozzle worn/dirty</p>
                <p className="text-sm text-gray-700">
                  <strong>Solutions:</strong> Increase gas pressure by 2-4 bar → Lower focal position by 0.5-1mm → 
                  Increase cutting speed by 10-15% → Clean or replace nozzle → Check nozzle standoff distance
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Issue: Rough or Wavy Edge Quality</h3>
                <p className="mb-2 text-sm text-gray-700"><strong>Causes:</strong> Speed too fast, power insufficient, gas pressure too high, poor beam quality</p>
                <p className="text-sm text-gray-700">
                  <strong>Solutions:</strong> Reduce speed by 15-20% → Increase power by 10-15% → 
                  Reduce gas pressure by 2-3 bar → Check lens cleanliness → Verify beam alignment
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Issue: Incomplete Cuts or Interrupted Cuts</h3>
                <p className="mb-2 text-sm text-gray-700"><strong>Causes:</strong> Insufficient power, speed too fast, focal drift, material quality issues</p>
                <p className="text-sm text-gray-700">
                  <strong>Solutions:</strong> Increase power by 15-20% → Reduce speed by 20-30% → 
                  Re-measure and adjust focal position → Verify material thickness consistency → Check for oil/rust on material
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Issue: Discolored Edges on Stainless Steel</h3>
                <p className="mb-2 text-sm text-gray-700"><strong>Causes:</strong> Nitrogen pressure too low, oxidation occurring, contaminated gas</p>
                <p className="text-sm text-gray-700">
                  <strong>Solutions:</strong> Increase nitrogen pressure to 16-20 bar → Verify nitrogen purity (&gt;99.95%) → 
                  Check for air leaks in gas line → Reduce cutting speed slightly → Increase gas flow volume
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Issue: Burning or Melting on Aluminum</h3>
                <p className="mb-2 text-sm text-gray-700"><strong>Causes:</strong> Focus position too negative, speed too slow, power too high</p>
                <p className="text-sm text-gray-700">
                  <strong>Solutions:</strong> Adjust focus to zero or slightly positive → Increase cutting speed by 15-25% → 
                  Reduce power by 10% if possible → Increase nitrogen pressure → Use higher-purity nitrogen (&gt;99.99%)
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Tips */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Advanced Optimization Tips</h2>
            
            <div className="prose prose-gray max-w-none">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">1. Parameter Testing Matrix</h3>
                  <p className="text-sm text-gray-700">
                    When optimizing, vary only ONE parameter at a time. Create a test matrix: start with recommended 
                    parameters, then test speed ±20%, power ±10%, pressure ±20%, and focus ±1mm. Document results 
                    with photos to identify optimal combinations.
                  </p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-5">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">2. Material-Specific Challenges</h3>
                  <p className="text-sm text-gray-700">
                    Galvanized steel requires careful power control to avoid zinc vapor damage. Painted materials 
                    need higher power. Rusty or oily materials require cleaning or significantly more power (15-25%). 
                    Account for these variations in production planning.
                  </p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-5">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">3. Environmental Factors</h3>
                  <p className="text-sm text-gray-700">
                    Temperature affects beam quality and material properties. Cold materials (&lt;10°C) may need 10-15% 
                    more power. High humidity can cause lens condensation. Maintain workshop temperature 15-25°C and 
                    humidity &lt;60% for consistent results.
                  </p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-orange-50 to-red-50 p-5">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">4. Production vs. Quality Balance</h3>
                  <p className="text-sm text-gray-700">
                    Maximum speed isn't always optimal. Running at 85-90% of maximum speed often improves edge quality 
                    significantly while reducing speed by only 10-15%. For high-value parts, prioritize quality. For 
                    high-volume parts, maximize speed within quality tolerances.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="What is focal position and why does it matter?"
                answer="Focal position is where the laser beam is most concentrated relative to the material surface. Negative focus (below surface) provides deeper penetration for thick materials. Positive focus (above surface) gives cleaner cuts on reflective materials like aluminum. Zero focus (on surface) balances speed and quality."
              />
              <FAQItem
                question="Why does stainless steel require high nitrogen pressure?"
                answer="High nitrogen pressure (12-22 bar) is needed to prevent oxidation and achieve bright, oxide-free cut edges on stainless steel. The high pressure also helps blow molten material out of the kerf efficiently. Lower pressure results in discolored edges that require secondary finishing."
              />
              <FAQItem
                question="How do I choose the right nozzle diameter?"
                answer="Nozzle diameter should increase with material thickness. Thin materials (1-3mm) use 1.0-2.0mm nozzles for precision. Medium thickness (4-8mm) needs 2.0-3.0mm for adequate gas flow. Thick materials (10mm+) require 3.0-3.5mm nozzles to maintain cutting performance."
              />
              <FAQItem
                question="Can I use these parameters on my laser system?"
                answer="These are baseline parameters for modern fiber lasers. Your specific system may require adjustments based on beam quality, nozzle design, material quality, and environmental conditions. Always start with conservative parameters and optimize through testing."
              />
              <FAQItem
                question="Why is oxygen pressure lower than nitrogen pressure?"
                answer="Oxygen cutting uses an exothermic reaction that generates additional heat, requiring only 0.2-1.2 bar. Nitrogen cutting is purely thermal (no reaction), requiring 12-24 bar to blow molten material out effectively. This pressure difference significantly impacts operating costs."
              />
            </div>
          </div>

          {/* Related Resources */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/calculators/quick-reference/cutting-speeds"
                className="card-hover group border-l-4 border-yellow-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Cutting Speeds Reference
                </h3>
                <p className="text-sm text-gray-600">
                  Benchmark speeds for production planning
                </p>
              </Link>

              <Link
                href="/calculators/quick-reference/assist-gas"
                className="card-hover group border-l-4 border-green-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Assist Gas Guide
                </h3>
                <p className="text-sm text-gray-600">
                  Gas selection and cost optimization
                </p>
              </Link>

              <Link
                href="/calculators/laser-cutting"
                className="card-hover group border-l-4 border-blue-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Laser Cutting Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Complete job costing with parameters
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        className="flex w-full items-start justify-between gap-4 p-4 text-left hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className="flex-shrink-0 text-gray-400">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-3">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}


















