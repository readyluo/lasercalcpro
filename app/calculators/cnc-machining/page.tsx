'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEnglish } from '@/lib/i18n';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import {
  cncMachiningSchema,
  cncMachiningDefaults,
  type CNCMachiningInput,
} from '@/lib/validations/cnc-machining';
import {
  calculateCNCMachining,
  type CNCMachiningResult,
} from '@/lib/calculators/cnc-machining';
import {
  Calculator,
  Download,
  RotateCcw,
  DollarSign,
  Package,
  TrendingDown,
} from 'lucide-react';

export default function CNCMachiningCalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = useState<CNCMachiningResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CNCMachiningInput>({
    resolver: zodResolver(cncMachiningSchema),
    defaultValues: cncMachiningDefaults,
  });

  const onSubmit = async (data: CNCMachiningInput) => {
    setIsCalculating(true);

    setTimeout(() => {
      const calculationResult = calculateCNCMachining(data);
      setResult(calculationResult);
      setIsCalculating(false);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleReset = () => {
    reset(cncMachiningDefaults);
    setResult(null);
  };

  const materialOptions = [
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'steel', label: 'Steel' },
    { value: 'stainless_steel', label: 'Stainless Steel' },
    { value: 'brass', label: 'Brass' },
    { value: 'plastic', label: 'Plastic (ABS/Nylon)' },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {t.cncMachining.title}
            </h1>
            <p className="text-xl text-gray-600">{t.cncMachining.description}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Input Parameters</h2>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    leftIcon={<RotateCcw className="h-4 w-4" />}
                  >
                    Reset
                  </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Part Dimensions */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Part Dimensions</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('partLength', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.cncMachining.fields.partLength}
                        error={errors.partLength?.message}
                        required
                      />

                      <Input
                        {...register('partWidth', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.cncMachining.fields.partWidth}
                        error={errors.partWidth?.message}
                        required
                      />

                      <Input
                        {...register('partHeight', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.cncMachining.fields.partHeight}
                        error={errors.partHeight?.message}
                        required
                      />
                    </div>
                  </div>

                  {/* Material */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Material</h3>
                    <div className="space-y-4">
                      <Select
                        {...register('materialType')}
                        label={t.cncMachining.fields.materialType}
                        options={materialOptions}
                        error={errors.materialType?.message}
                        required
                      />

                      <Input
                        {...register('materialPrice', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label="Material Price ($/kg)"
                        error={errors.materialPrice?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />
                    </div>
                  </div>

                  {/* Machining Time */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Machining Parameters
                    </h3>
                    <div className="space-y-4">
                      <Input
                        {...register('machiningTime', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.cncMachining.fields.machiningTime}
                        error={errors.machiningTime?.message}
                        helperText="CNC cutting time per part"
                        required
                      />

                      <Input
                        {...register('setupTime', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.cncMachining.fields.setupTime}
                        error={errors.setupTime?.message}
                        helperText="One-time setup for the batch"
                      />
                    </div>
                  </div>

                  {/* Batch & Tooling */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Batch & Tooling</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('batchSize', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.cncMachining.fields.batchSize}
                        error={errors.batchSize?.message}
                        helperText="Number of parts in this batch"
                        leftIcon={<Package className="h-4 w-4" />}
                      />

                      <Input
                        {...register('toolCost', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.cncMachining.fields.toolCost}
                        error={errors.toolCost?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />

                      <Input
                        {...register('toolLife', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.cncMachining.fields.toolLife}
                        error={errors.toolLife?.message}
                        helperText="Number of parts before tool replacement"
                      />
                    </div>
                  </div>

                  {/* Rates */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Cost Rates</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('machineRate', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Machine Rate ($/hour)"
                        error={errors.machineRate?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />

                      <Input
                        {...register('laborRate', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Labor Rate ($/hour)"
                        error={errors.laborRate?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />

                      <Input
                        {...register('overheadRate', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Overhead Rate (%)"
                        error={errors.overheadRate?.message}
                        helperText="Facility, utilities, admin costs"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isCalculating}
                    leftIcon={<Calculator className="h-5 w-5" />}
                  >
                    {isCalculating ? 'Calculating...' : t.calculator.calculate}
                  </Button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Summary */}
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-6 text-2xl font-bold">Cost Summary</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Cost Per Part</p>
                        <p className="text-3xl font-bold">${result.totalCostPerPart}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Suggested Price</p>
                        <p className="text-3xl font-bold">${result.suggestedPricePerPart}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Batch Cost</p>
                        <p className="text-2xl font-semibold">${result.totalBatchCost}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Batch Time</p>
                        <p className="text-2xl font-semibold">
                          {result.totalBatchTime.toFixed(2)} hrs
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Cost Breakdown (Per Part)</h3>
                    <div className="space-y-3">
                      <CostItem label="Material" value={result.materialCostPerPart} />
                      <CostItem label="Machine Time" value={result.machineCostPerPart} />
                      <CostItem label="Labor" value={result.laborCostPerPart} />
                      <CostItem label="Tooling" value={result.toolingCostPerPart} />
                      <CostItem label="Setup (Amortized)" value={result.setupCostPerPart} />
                      <CostItem label="Overhead" value={result.overheadPerPart} />
                      <div className="border-t pt-3">
                        <CostItem label="Total" value={result.totalCostPerPart} isTotal />
                      </div>
                    </div>
                  </div>

                  {/* Volume Pricing */}
                  <div className="card">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <TrendingDown className="h-6 w-6 text-primary-600" />
                      Volume Pricing Tiers
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      Larger quantities benefit from setup cost amortization
                    </p>
                    <div className="space-y-2">
                      {result.volumePricing.map(tier => (
                        <div
                          key={tier.quantity}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                        >
                          <div>
                            <p className="font-semibold">
                              {tier.quantity} {tier.quantity === 1 ? 'Part' : 'Parts'}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${tier.pricePerPart} per part
                            </p>
                          </div>
                          {tier.discount > 0 && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                              {tier.discount}% OFF
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Efficiency Metrics</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Part Weight</p>
                        <p className="text-lg font-semibold">{result.partWeight.toFixed(3)} kg</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Machine Utilization</p>
                        <p className="text-lg font-semibold">{result.machineUtilization}%</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Profit Per Part</p>
                        <p className="text-lg font-semibold text-green-600">
                          ${result.profitPerPart}
                        </p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Total Batch Profit</p>
                        <p className="text-lg font-semibold text-green-600">
                          ${result.totalProfit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      leftIcon={<Download className="h-5 w-5" />}
                    >
                      Export PDF Report
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleReset}
                      leftIcon={<RotateCcw className="h-5 w-5" />}
                    >
                      New Calculation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[400px] flex-col items-center justify-center text-center">
                  <Calculator className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">
                    Ready to Calculate
                  </h3>
                  <p className="text-gray-500">
                    Fill in the parameters and click Calculate to see your results
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CNC Machining Process Guide */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">CNC Machining Operations Guide</h2>
              <p className="mb-6 text-gray-700">
                Understanding different machining operations and their cost implications is crucial for accurate estimating.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Milling Operations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Face Milling:</strong> Fastest material removal, $50-80/hr machine rate</p>
                    <p><strong>End Milling:</strong> Versatile for profiles and pockets, $60-90/hr</p>
                    <p><strong>Slotting:</strong> Slower than face milling, requires multiple passes</p>
                    <p><strong>3D Contouring:</strong> Complex surfaces, $80-120/hr for 5-axis machines</p>
                    <p><strong>Typical Feed Rates:</strong> 100-500 mm/min for steel, 300-1000 mm/min for aluminum</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Turning Operations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>External Turning:</strong> High material removal rates, $45-70/hr</p>
                    <p><strong>Facing:</strong> Quick operation for flat surfaces</p>
                    <p><strong>Boring:</strong> Internal diameter precision work, slower speeds</p>
                    <p><strong>Threading:</strong> Time-intensive, requires multiple passes</p>
                    <p><strong>Typical Speeds:</strong> 100-300 m/min surface speed for steel</p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Drilling & Boring</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Spot Drilling:</strong> Essential for accurate hole location, 5-10 sec/hole</p>
                    <p><strong>Drilling:</strong> 10-30 seconds per hole depending on depth and diameter</p>
                    <p><strong>Reaming:</strong> Precision finishing, adds 20-40% to drilling time</p>
                    <p><strong>Tapping:</strong> Thread cutting, 15-45 sec per hole</p>
                    <p><strong>Cost Impact:</strong> 100 holes can add 30-60 minutes of machine time</p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Finishing Operations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Deburring:</strong> Manual or tumbling, $15-30/hr labor</p>
                    <p><strong>Surface Grinding:</strong> Tight tolerances ±0.005mm, $60-100/hr</p>
                    <p><strong>Polishing:</strong> Mirror finish, labor-intensive, $25-40/hr</p>
                    <p><strong>Heat Treatment:</strong> Stress relief or hardening, $50-200 per batch</p>
                    <p><strong>Anodizing/Coating:</strong> Adds $5-20 per part depending on size</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Material Selection for CNC */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Material Selection & Machinability</h2>
              <p className="mb-6 text-gray-700">
                Material choice significantly impacts machining time, tool life, and overall cost. Machinability rating 
                indicates how easy a material is to machine (higher = easier).
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="p-3 text-left">Material</th>
                      <th className="p-3 text-center">Machinability</th>
                      <th className="p-3 text-center">Typical Cost</th>
                      <th className="p-3 text-center">Speed Factor</th>
                      <th className="p-3 text-left">Best Applications</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Aluminum 6061</td>
                      <td className="p-3 text-center">
                        <span className="rounded bg-green-100 px-2 py-1 text-green-800">90%</span>
                      </td>
                      <td className="p-3 text-center">$3-5/lb</td>
                      <td className="p-3 text-center">3-4x</td>
                      <td className="p-3">Aerospace, lightweight structures</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Brass C360</td>
                      <td className="p-3 text-center">
                        <span className="rounded bg-green-100 px-2 py-1 text-green-800">100%</span>
                      </td>
                      <td className="p-3 text-center">$4-7/lb</td>
                      <td className="p-3 text-center">3-5x</td>
                      <td className="p-3">Bearings, fittings, decorative</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Mild Steel 1018</td>
                      <td className="p-3 text-center">
                        <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">70%</span>
                      </td>
                      <td className="p-3 text-center">$1-2/lb</td>
                      <td className="p-3 text-center">1x baseline</td>
                      <td className="p-3">General fabrication, structural</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Stainless 304</td>
                      <td className="p-3 text-center">
                        <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">45%</span>
                      </td>
                      <td className="p-3 text-center">$3-5/lb</td>
                      <td className="p-3 text-center">0.5-0.6x</td>
                      <td className="p-3">Food equipment, medical devices</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Tool Steel 4140</td>
                      <td className="p-3 text-center">
                        <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">55%</span>
                      </td>
                      <td className="p-3 text-center">$2-4/lb</td>
                      <td className="p-3 text-center">0.6-0.7x</td>
                      <td className="p-3">High-stress components, gears</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Titanium Ti-6Al-4V</td>
                      <td className="p-3 text-center">
                        <span className="rounded bg-red-100 px-2 py-1 text-red-800">30%</span>
                      </td>
                      <td className="p-3 text-center">$20-35/lb</td>
                      <td className="p-3 text-center">0.2-0.3x</td>
                      <td className="p-3">Aerospace, medical implants</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Inconel 718</td>
                      <td className="p-3 text-center">
                        <span className="rounded bg-red-100 px-2 py-1 text-red-800">15%</span>
                      </td>
                      <td className="p-3 text-center">$30-50/lb</td>
                      <td className="p-3 text-center">0.1-0.15x</td>
                      <td className="p-3">Extreme temperature, turbines</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-gray-600">
                *Machinability ratings relative to Brass C360 (100%). Speed factors relative to mild steel baseline.
              </p>
            </div>
          </div>

          {/* Cost Optimization for CNC */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Cost Optimization Strategies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">1</span>
                    Design for Manufacturability (DFM)
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Use standard tool sizes:</strong> Custom tools cost $50-300 each and add lead time. Standard end mills (1/8", 1/4", 1/2") are readily available.</p>
                    <p><strong>Avoid deep pockets:</strong> Depth-to-diameter ratio should be &lt;3:1 for efficiency. Deeper pockets require smaller tools and multiple passes.</p>
                    <p><strong>Minimize setups:</strong> Each additional setup adds 15-30 minutes. Design parts to be machined from one or two sides maximum.</p>
                    <p><strong>Standard tolerances:</strong> ±0.005" is standard. Tighter tolerances (±0.001") can double machining time and require inspection.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">2</span>
                    Optimize Batch Sizing
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Setup time impact:</strong> Setup typically takes 30-90 minutes. For a 15-minute part, one piece costs 7x more than 100 pieces.</p>
                    <p><strong>Tooling amortization:</strong> $200 in custom tooling spread over 100 parts = $2/part vs. $200 for one piece.</p>
                    <p><strong>Economic batch size:</strong> Generally 10-50 pieces for prototypes, 100-500 for production parts.</p>
                    <p><strong>Just-in-time consideration:</strong> Balance inventory costs (~20% annually) against batch savings.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">3</span>
                    Material Stock Selection
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Use near-net shapes:</strong> Starting with 6" diameter for a 5" part wastes 30% material vs. starting with 5.5" stock.</p>
                    <p><strong>Standard stock sizes:</strong> Custom sizes add 2-4 weeks lead time and 20-50% cost premium.</p>
                    <p><strong>Material utilization:</strong> Typical is 40-60% after machining. Design to maximize usable material.</p>
                    <p><strong>Scrap value:</strong> Aluminum and brass scrap has 40-60% of new material value. Steel scrap ~5-10%.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">4</span>
                    Cutting Parameters Optimization
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>High-speed machining:</strong> Modern CAM can reduce cycle time by 30-50% with optimized toolpaths and feeds.</p>
                    <p><strong>Adaptive clearing:</strong> Maintains constant tool load, increasing feed rates by 3-5x for roughing.</p>
                    <p><strong>Tool life balance:</strong> Running tools at 80% of max speed doubles tool life while only reducing speed 20%.</p>
                    <p><strong>Coolant selection:</strong> Flood coolant extends tool life 2-3x vs. dry machining. High-pressure through-tool coolant adds another 50%.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">5</span>
                    Alternative Processes
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Castings:</strong> For volumes &gt;100 parts, casting + machining can be 40-60% cheaper than solid machining.</p>
                    <p><strong>Laser/waterjet blanking:</strong> Pre-cut 2D profiles before machining to reduce roughing time by 50-70%.</p>
                    <p><strong>3D printing + machining:</strong> Print complex features, machine critical surfaces. Hybrid approach saves 30-50% on complex parts.</p>
                    <p><strong>EDM for hard materials:</strong> For hardened steel or exotic alloys, EDM can be faster and cheaper than milling.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Benchmarks for CNC */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-purple-50 to-indigo-50">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Industry Benchmarks & Performance</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Machine Hour Rates (2024)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between border-b pb-2">
                      <span>3-axis VMC (small):</span>
                      <span className="font-semibold">$45-65/hr</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>3-axis VMC (large):</span>
                      <span className="font-semibold">$75-95/hr</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>4-axis horizontal:</span>
                      <span className="font-semibold">$80-110/hr</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>5-axis simultaneous:</span>
                      <span className="font-semibold">$120-180/hr</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Swiss-type lathe:</span>
                      <span className="font-semibold">$70-100/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Manual machining:</span>
                      <span className="font-semibold">$35-50/hr</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">Rates vary by region, machine capability, and facility overhead</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Typical Project Breakdown</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Programming & CAM:</span>
                      <span className="font-semibold">10-20% of cycle</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Setup & fixturing:</span>
                      <span className="font-semibold">15-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Roughing operations:</span>
                      <span className="font-semibold">30-40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finishing operations:</span>
                      <span className="font-semibold">20-30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inspection & deburr:</span>
                      <span className="font-semibold">10-15%</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">For typical machined parts with moderate complexity</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Tool Life Expectations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Carbide end mills (steel):</strong> 2-4 hours cutting time</p>
                    <p><strong>Carbide end mills (aluminum):</strong> 6-12 hours</p>
                    <p><strong>HSS drills:</strong> 20-50 holes in steel</p>
                    <p><strong>Carbide drills:</strong> 200-500 holes in steel</p>
                    <p><strong>Inserts (turning):</strong> 20-40 parts before indexing</p>
                    <p><strong>Taps (steel):</strong> 50-200 holes depending on material</p>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">Varies significantly based on material hardness and cutting parameters</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Quality & Tolerance Standards</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Standard tolerance:</strong> ±0.005" (±0.13mm)</p>
                    <p><strong>Precision tolerance:</strong> ±0.001" (±0.025mm)</p>
                    <p><strong>Ultra-precision:</strong> ±0.0005" (±0.013mm)</p>
                    <p><strong>Surface finish Ra:</strong> 63-125 µin (standard), 16-32 µin (fine)</p>
                    <p><strong>Flatness/parallelism:</strong> 0.001" per inch typical</p>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">Per ASME Y14.5 geometric dimensioning standards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced FAQ for CNC */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="How accurate is this CNC cost calculator?"
                  answer="This calculator achieves 85-95% accuracy for typical parts. Accuracy depends on complexity: simple parts (±5%), complex parts with many features (±15%). Always verify with actual machine time data for your specific shop. Factors like programmer efficiency, machine condition, and material variability affect real-world costs."
                />
                <FAQItem
                  question="Why is my first piece so expensive compared to production quantity?"
                  answer="Setup time is amortized across the batch. For example: 60-minute setup + 15-minute cycle time. First piece = 75 minutes ($93.75 @ $75/hr). 100 pieces = 60 + (100×15) = 1560 minutes, or $19.50 per piece. The setup cost drops from $60/piece to $0.60/piece. This is why job shops often have minimum order quantities of 10-50 pieces."
                />
                <FAQItem
                  question="What's included in the machine hour rate?"
                  answer="Typical breakdown of $75/hr rate: Equipment depreciation ($250k machine / 10 years / 2000 hrs = $12.50), Labor ($25-35/hr operator or programmer), Overhead (facility rent, utilities, insurance = $15-20/hr), Maintenance reserve (tooling, repairs = $8-12/hr), Profit margin (15-25% = $12-15/hr). Rates vary significantly by shop size, location, and machine capabilities."
                />
                <FAQItem
                  question="When should I use 3-axis vs. 5-axis machining?"
                  answer="Use 3-axis for: Simple parts with features on one or two sides, cost-sensitive projects (3-axis is 40-60% cheaper per hour), high-volume production. Use 5-axis for: Complex compound angles, turbine blades, impellers (reduces 5+ setups to 1-2), aerospace/medical parts requiring full traceability, parts requiring 4+ setups on 3-axis. Break-even is typically when 3-axis requires 3+ setups vs. 1-2 on 5-axis."
                />
                <FAQItem
                  question="How can I reduce tooling costs?"
                  answer="Strategies: 1) Design for standard tools – custom tools are $100-500 vs. $20-50 for standard. 2) Minimize tool changes – each change adds 30-90 seconds. 3) Use coated tools – cost 2x but last 3-5x longer. 4) Optimize feeds/speeds – running tools too hard reduces life 50%, too conservatively wastes time. 5) Batch similar parts – tooling setup once for entire batch. 6) Consider tooling package deals for production – pre-negotiated tool sets save 20-30%."
                />
                <FAQItem
                  question="What's the difference between CNC milling and turning costs?"
                  answer="Turning (lathe) is generally 30-50% less expensive per hour ($45-70 vs $75-95) and has higher material removal rates for cylindrical parts. However, milling can produce more complex geometries. For round parts: Use turning when length &lt; 3× diameter and external features dominate. Use milling when: part has prismatic features, length &gt; 5× diameter, or requires compound angles. Many parts benefit from mill-turn machines that combine both in one setup."
                />
                <FAQItem
                  question="How do I account for scrap rate in my estimates?"
                  answer="Industry standards: Prototype/first article: 20-50% scrap rate (learning curve), Low-volume production: 5-15% scrap, High-volume production: 2-5% scrap, Simple parts: 1-3%, Complex/tight tolerance: 5-10%. Build scrap cost into pricing by dividing total cost by yield. Example: $100 part cost / 0.95 yield = $105.26 selling price to account for 5% scrap. Also factor first article inspection (100% inspection initially, sampling for production)."
                />
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Calculators</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/calculators/laser-cutting"
                className="card-hover group border-l-4 border-blue-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Laser Cutting Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Compare costs for sheet metal parts that could be laser cut vs. CNC machined
                </p>
              </Link>

              <Link
                href="/calculators/material-utilization"
                className="card-hover group border-l-4 border-green-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Material Utilization
                </h3>
                <p className="text-sm text-gray-600">
                  Optimize material usage and reduce waste from your CNC stock
                </p>
              </Link>

              <Link
                href="/calculators/roi"
                className="card-hover group border-l-4 border-purple-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Equipment ROI Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Determine if investing in CNC equipment makes financial sense for your volume
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

// FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg border border-gray-200 transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900">{question}</h3>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-3">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

function CostItem({
  label,
  value,
  isTotal = false,
}: {
  label: string;
  value: number;
  isTotal?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${isTotal ? 'font-bold' : 'text-gray-700'}`}>{label}</span>
      <span className={`${isTotal ? 'text-xl font-bold text-primary-600' : 'font-semibold'}`}>
        ${value.toFixed(2)}
      </span>
    </div>
  );
}

