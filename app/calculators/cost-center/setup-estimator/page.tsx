'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ExportButton } from '@/components/calculators/ExportButton';
import { Calculator as CalculatorIcon, RotateCcw } from 'lucide-react';
import { setupEstimatorSchema, setupEstimatorDefaults, type SetupEstimatorInput } from '@/lib/validations/cost-center';
import { calculateSetupEstimate, calculateIdealBatchSize, compareSetupScenarios } from '@/lib/calculators/cost-center/setup';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export default function SetupEstimatorPage() {
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [result, setResult] = React.useState<ReturnType<typeof calculateSetupEstimate> | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Setup & Changeover Time Estimator',
    'Estimate total setup time based on programming, loading, machine preparation, inspection, fixtures, and batch size.',
    [
      { name: 'Select Complexity', text: 'Choose programming complexity and material size.' },
      { name: 'Choose Prep & Inspection', text: 'Select machine change and inspection level.' },
      { name: 'Operator & Familiarity', text: 'Set operator experience and job familiarity.' },
      { name: 'Batch & Rate', text: 'Enter batch quantity and setup labor rate.' },
      { name: 'Calculate', text: 'Review total setup time, per-part distribution and recommendations.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    { question: 'Why is setup time important?', answer: 'Setup can be 15-50% of total job time, especially for small batches. Accurate setup estimation prevents under-quoting.' },
    { question: 'How to reduce setup time?', answer: 'Standardize materials, save programs, batch similar jobs, train operators, and use quick-change tooling.' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<SetupEstimatorInput>({
    resolver: zodResolver(setupEstimatorSchema),
    defaultValues: setupEstimatorDefaults,
  });

  const onSubmit = (data: SetupEstimatorInput) => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = calculateSetupEstimate(data);
      setResult(res);
      setIsCalculating(false);
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleReset = () => {
    reset(setupEstimatorDefaults);
    setResult(null);
  };

  // Example: compute ideal batch size for 10min cutting time/part (user can adapt later)
  const idealBatch = result ? calculateIdealBatchSize(result.adjustedTotal, 10) : null;
  const scenarioCompare = result ? compareSetupScenarios(result.adjustedTotal, Math.max(5, result.adjustedTotal * 0.6), 200, watch('setupLaborRate')) : null;

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">Setup & Changeover Time Estimator</h1>
            <p className="text-gray-600">Estimate total setup time, per-part distribution, and identify optimization opportunities.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input {...register('programmingComplexity')} label="Programming (simple/moderate/complex/veryComplex)" error={errors.programmingComplexity?.message} required />
                    <Input {...register('materialSize')} label="Material Size (small/medium/large/xlarge)" error={errors.materialSize?.message} required />
                    <Input {...register('machineChange')} label="Machine Prep (noChange/nozzleChange/gasChange/focusAdjust/fullSetup)" error={errors.machineChange?.message} required />
                    <Input {...register('inspectionLevel')} label="Inspection (none/quick/standard/detailed)" error={errors.inspectionLevel?.message} required />
                    <Input {...register('fixtureComplexity')} label="Fixture (none/simple/moderate/complex)" error={errors.fixtureComplexity?.message} required />
                    <Input {...register('operatorExperience')} label="Operator (novice/intermediate/experienced/expert)" error={errors.operatorExperience?.message} required />
                    <Input {...register('jobFamiliarity')} label="Familiarity (firstTime/occasional/regular/repeat)" error={errors.jobFamiliarity?.message} required />
                    <Input {...register('batchQuantity', { valueAsNumber: true })} type="number" step="1" label="Batch Quantity" error={errors.batchQuantity?.message} required />
                    <Input {...register('setupLaborRate', { valueAsNumber: true })} type="number" step="1" label="Setup Labor Rate (USD/hr)" error={errors.setupLaborRate?.message} required />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isCalculating} leftIcon={<CalculatorIcon className="h-5 w-5" />}>Estimate Setup Time</Button>
                </form>
              </div>
            </div>

            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Time Breakdown</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Breakdown label="Programming" value={result.programmingTime} />
                      <Breakdown label="Material Loading" value={result.loadingTime} />
                      <Breakdown label="Machine Prep" value={result.machinePrepTime} />
                      <Breakdown label="Inspection" value={result.inspectionTime} />
                      <Breakdown label="Fixture" value={result.fixtureTime} />
                      <div className="border-t pt-3 md:col-span-2">
                        <Breakdown label="Total (Adjusted)" value={result.adjustedTotal} isTotal />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Per-Part Distribution</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Stat label="Setup Time / Part" value={`${result.setupTimePerPart.toFixed(2)} min`} />
                      <Stat label="Setup Cost / Part" value={`$${result.setupCostPerPart.toFixed(2)}`} />
                      <Stat label="Setup % (batch heuristic)" value={`${result.setupPercentage}%`} />
                    </div>
                  </div>

                  {idealBatch && (
                    <div className="card">
                      <h3 className="mb-4 text-xl font-bold">Ideal Batch Size (10 min cutting/part)</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Stat label="Ideal Batch" value={`${idealBatch.idealBatchSize}`} />
                        <Stat label="Setup % of Total" value={`${idealBatch.setupTimePercentage}%`} />
                        <Stat label="Total Time (Batch)" value={`${idealBatch.totalTimeForBatch} min`} />
                      </div>
                    </div>
                  )}

                  {scenarioCompare && (
                    <div className="card">
                      <h3 className="mb-2 text-xl font-bold">Optimization Impact (Example)</h3>
                      <p className="mb-4 text-sm text-gray-600">Comparing current vs optimized setup minutes across a year</p>
                      <div className="grid gap-4 md:grid-cols-4">
                        <Stat label="Time Saved / Setup" value={`${scenarioCompare.timeSavingsPerSetup} min`} />
                        <Stat label="Annual Time Saved" value={`${scenarioCompare.annualTimeSavings} min`} />
                        <Stat label="Cost Saved / Setup" value={`$${scenarioCompare.costSavingsPerSetup}`} />
                        <Stat label="Annual Cost Saved" value={`$${scenarioCompare.annualCostSavings}`} />
                      </div>
                    </div>
                  )}

                  {/* Export */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Setup Time Report"
                        calculationType="Setup & Changeover"
                        inputData={watch()}
                        results={{
                          'Programming (min)': result.programmingTime,
                          'Loading (min)': result.loadingTime,
                          'Machine Prep (min)': result.machinePrepTime,
                          'Inspection (min)': result.inspectionTime,
                          'Fixture (min)': result.fixtureTime,
                          'Total Adjusted (min)': result.adjustedTotal,
                          'Setup Time / Part (min)': result.setupTimePerPart,
                          'Setup Cost / Part ($)': result.setupCostPerPart,
                        }}
                        recommendations={result.recommendations}
                      />
                    </div>
                    <Button variant="outline" size="lg" onClick={handleReset} leftIcon={<RotateCcw className="h-5 w-5" />}>New Estimation</Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[300px] flex-col items-center justify-center text-center">
                  <CalculatorIcon className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">Ready to Estimate</h3>
                  <p className="text-gray-500">Set parameters and click Estimate to see setup time</p>
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

function Breakdown({ label, value, isTotal = false }: { label: string; value: number; isTotal?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${isTotal ? 'font-bold' : 'text-gray-700'}`}>{label}</span>
      <span className={`${isTotal ? 'text-xl font-bold text-primary-600' : 'font-semibold'}`}>{value.toFixed(2)} min</span>
    </div>
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


