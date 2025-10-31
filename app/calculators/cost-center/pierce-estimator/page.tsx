'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ExportButton } from '@/components/calculators/ExportButton';
import { Calculator as CalculatorIcon, RotateCcw, DollarSign } from 'lucide-react';
import { pierceEstimatorSchema, pierceEstimatorDefaults, type PierceEstimatorInput } from '@/lib/validations/cost-center';
import { calculatePierceEstimate, comparePierceStrategies, calculateDesignOptimizationSavings } from '@/lib/calculators/cost-center/pierce';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

const materialOptions = [
  { value: 'mild_steel', label: 'Mild Steel - Fast piercing, standard settings' },
  { value: 'stainless_steel', label: 'Stainless Steel - Slower pierce, higher gas consumption' },
  { value: 'aluminum', label: 'Aluminum - Fast piercing, lower power' },
  { value: 'copper_brass', label: 'Copper/Brass - Highly reflective, challenging to pierce' },
];

const strategyOptions = [
  { value: 'highPressure', label: 'High Pressure - Fastest, most gas consumption' },
  { value: 'ramped', label: 'Ramped - Gradual power increase, good quality' },
  { value: 'lowPower', label: 'Low Power - Slower, better for thin materials' },
  { value: 'pulsed', label: 'Pulsed - Controlled energy, reduced spatter' },
  { value: 'edgeStart', label: 'Edge Start - No pierce needed, fastest overall' },
];

const qualityOptions = [
  { value: 'min', label: 'Minimum - Speed priority, acceptable quality' },
  { value: 'typical', label: 'Typical - Balanced speed and quality' },
  { value: 'max', label: 'Maximum - Quality priority, slower pierce' },
];

const gasTypeOptions = [
  { value: 'nitrogen', label: 'Nitrogen - Clean cuts, no oxidation' },
  { value: 'oxygen', label: 'Oxygen - Faster piercing for mild steel' },
  { value: 'air', label: 'Air - Most economical, lower quality' },
];

export default function PierceEstimatorPage() {
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [result, setResult] = React.useState<ReturnType<typeof calculatePierceEstimate> | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Piercing Time & Cost Estimator',
    'Estimate piercing time and costs based on material, thickness, hole count, strategy, and gas.',
    [
      { name: 'Material & Thickness', text: 'Select material type and enter thickness in millimeters.' },
      { name: 'Holes & Strategy', text: 'Enter hole count and select piercing strategy and quality level.' },
      { name: 'Gas & Rates', text: 'Select gas type and price per m³, and your hourly cost.' },
      { name: 'Calculate', text: 'Review total piercing time, cost, and optimization recommendations.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    { question: 'Why does piercing matter?', answer: 'Each pierce adds seconds of non-cutting time and extra wear. For perforated parts, piercing can exceed cutting time.' },
    { question: 'How to reduce piercing time?', answer: 'Use edge starts when possible, reduce hole count, use faster strategies, increase gas pressure within spec, or switch processes for thin highly perforated sheets.' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<PierceEstimatorInput>({
    resolver: zodResolver(pierceEstimatorSchema),
    defaultValues: pierceEstimatorDefaults,
  });

  const onSubmit = (data: PierceEstimatorInput) => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = calculatePierceEstimate(data);
      setResult(res);
      setIsCalculating(false);
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    reset(pierceEstimatorDefaults);
    setResult(null);
  };

  const strategyCompare = comparePierceStrategies(
    watch('material'),
    watch('thickness'),
    watch('holeCount'),
    watch('quality')
  );

  const designSavings = calculateDesignOptimizationSavings(
    Math.max(1, watch('holeCount')),
    Math.max(0, Math.floor(watch('holeCount') * 0.8)),
    watch('material'),
    watch('thickness'),
    watch('hourlyCost')
  );

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">Piercing Time & Cost Estimator</h1>
            <p className="text-gray-600">Quantify piercing time and costs, and discover optimization opportunities.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Select 
                      {...register('material')} 
                      label="Material" 
                      options={materialOptions}
                      helperText="Material affects pierce time and gas consumption"
                      error={errors.material?.message} 
                      required 
                    />
                    <Input 
                      {...register('thickness', { valueAsNumber: true })} 
                      type="number" 
                      step="0.1" 
                      label="Thickness (mm)" 
                      placeholder="e.g., 3.0"
                      helperText="Material thickness to pierce"
                      error={errors.thickness?.message} 
                      required 
                    />
                    <Input 
                      {...register('holeCount', { valueAsNumber: true })} 
                      type="number" 
                      step="1" 
                      label="Hole Count" 
                      placeholder="e.g., 20"
                      helperText="Total number of holes/pierces"
                      error={errors.holeCount?.message} 
                      required 
                    />
                    <Select 
                      {...register('strategy')} 
                      label="Piercing Strategy" 
                      options={strategyOptions}
                      helperText="Piercing method affects speed and quality"
                      error={errors.strategy?.message} 
                      required 
                    />
                    <Select 
                      {...register('quality')} 
                      label="Quality Level" 
                      options={qualityOptions}
                      helperText="Quality vs speed trade-off"
                      error={errors.quality?.message} 
                      required 
                    />
                    <Select 
                      {...register('gasType')} 
                      label="Assist Gas" 
                      options={gasTypeOptions}
                      helperText="Gas type affects quality and cost"
                      error={errors.gasType?.message} 
                      required 
                    />
                    <Input 
                      {...register('gasPricePerCubicMeter', { valueAsNumber: true })} 
                      type="number" 
                      step="0.01" 
                      label="Gas Price (USD/m³)" 
                      placeholder="e.g., 1.50"
                      helperText="Local gas supplier cost"
                      leftIcon={<DollarSign className="h-4 w-4" />}
                      error={errors.gasPricePerCubicMeter?.message} 
                      required 
                    />
                    <Input 
                      {...register('hourlyCost', { valueAsNumber: true })} 
                      type="number" 
                      step="1" 
                      label="Hourly Cost (USD/hr)" 
                      placeholder="e.g., 60"
                      helperText="Shop hourly rate"
                      leftIcon={<DollarSign className="h-4 w-4" />}
                      error={errors.hourlyCost?.message} 
                      required 
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isCalculating} leftIcon={<CalculatorIcon className="h-5 w-5" />}>Calculate Piercing Time & Cost</Button>
                </form>
              </div>
            </div>

            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Piercing Summary</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Stat label="Time / Pierce" value={`${result.timePerPierce.toFixed(3)} s`} />
                      <Stat label="Total Piercing Time" value={`${result.totalPierceTime.toFixed(2)} min`} />
                      <Stat label="Total Cost" value={`$${result.totalPiercingCost.toFixed(2)}`} />
                      <Stat label="Labor Cost" value={`$${result.piercingLaborCost.toFixed(2)}`} />
                      <Stat label="Gas Cost" value={`$${result.piercingGasCost.toFixed(2)}`} />
                      <Stat label="Equipment Cost" value={`$${result.piercingEquipmentCost.toFixed(2)}`} />
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Strategy Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="pb-2 text-left">Strategy</th>
                            <th className="pb-2 text-right">Time / Pierce (s)</th>
                            <th className="pb-2 text-right">Total Time (min)</th>
                            <th className="pb-2 text-right">Diff vs Fastest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {strategyCompare.map(row => (
                            <tr key={row.strategy} className="border-b">
                              <td className="py-2">{row.strategy}</td>
                              <td className="py-2 text-right">{row.timePerPierce.toFixed(3)}</td>
                              <td className="py-2 text-right">{row.totalTime.toFixed(2)}</td>
                              <td className="py-2 text-right">{row.timeDifference.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="mb-2 text-xl font-bold">Design Optimization (Example: -20% holes)</h3>
                    <div className="grid gap-4 md:grid-cols-4">
                      <Stat label="Hole Reduction" value={`${designSavings.holeReduction} (${designSavings.holeReductionPercent}%)`} />
                      <Stat label="Time Saved" value={`${designSavings.timeSavingsMinutes} min`} />
                      <Stat label="Cost Saved" value={`$${designSavings.costSavings}`} />
                      <Stat label="Annual Savings" value={`$${designSavings.annualSavings}`} />
                    </div>
                  </div>

                  {/* Export */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Piercing Time & Cost Report"
                        calculationType="Piercing Estimation"
                        inputData={watch()}
                        results={{
                          'Time / Pierce (s)': result.timePerPierce,
                          'Total Time (min)': result.totalPierceTime,
                          'Labor Cost ($)': result.piercingLaborCost,
                          'Gas Cost ($)': result.piercingGasCost,
                          'Equipment Cost ($)': result.piercingEquipmentCost,
                          'Total Cost ($)': result.totalPiercingCost,
                        }}
                        recommendations={[...result.recommendations, ...result.optimizationOpportunities]}
                      />
                    </div>
                    <Button variant="outline" size="lg" onClick={handleReset} leftIcon={<RotateCcw className="h-5 w-5" />}>New Estimation</Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[300px] flex-col items-center justify-center text-center">
                  <CalculatorIcon className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">Ready to Estimate</h3>
                  <p className="text-gray-500">Enter material, thickness, and holes to estimate piercing</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}


