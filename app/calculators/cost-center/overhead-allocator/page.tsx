'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ExportButton } from '@/components/calculators/ExportButton';
import { DollarSign, Calculator as CalculatorIcon, RotateCcw } from 'lucide-react';
import { overheadAllocatorSchema, overheadAllocatorDefaults, type OverheadAllocatorInput } from '@/lib/validations/cost-center';
import { allocateOverhead, calculateOverheadRate, compareAllocationMethods } from '@/lib/calculators/cost-center/overhead';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export default function OverheadAllocatorPage() {
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [result, setResult] = React.useState<ReturnType<typeof allocateOverhead> | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Overhead Allocator',
    'Allocate overhead across jobs using machine hours, labor hours, material cost, floor space, or equal split.',
    [
      { name: 'Enter Total Overhead', text: 'Input the total overhead amount to allocate.' },
      { name: 'Choose Method', text: 'Select an allocation basis that reflects your cost drivers.' },
      { name: 'List Jobs', text: 'Add jobs with their machine hours, labor hours, material cost and floor space.' },
      { name: 'Calculate', text: 'Get allocated overhead per job with percentage and summary insights.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'Which allocation method should I use?',
      answer: 'Use machine hours for capital-intensive shops, labor hours for labor-driven work, material cost when overhead correlates with material handling/storage, or floor space for facility-driven overheads.'
    },
    {
      question: 'Can I mix methods? ',
      answer: 'For simplicity and consistency, use one method per period and review annually. Mixing can be done offline but reduces comparability.'
    }
  ]);

  const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<OverheadAllocatorInput>({
    resolver: zodResolver(overheadAllocatorSchema),
    defaultValues: overheadAllocatorDefaults,
  });

  const jobsArray = useFieldArray({ control, name: 'jobs' });

  const onSubmit = (data: OverheadAllocatorInput) => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = allocateOverhead(data);
      setResult(res);
      setIsCalculating(false);
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleReset = () => {
    reset(overheadAllocatorDefaults);
    setResult(null);
  };

  const totalDirectCosts = watch('jobs').reduce((sum, j) => sum + j.materialCost, 0);
  const overheadRate = result ? calculateOverheadRate(watch('totalOverhead'), totalDirectCosts) : null;

  // Pre-compute method comparison for the first job to illustrate method impact
  const firstJob = watch('jobs')[0];
  const totals = {
    machine: watch('jobs').reduce((s, j) => s + j.machineHours, 0),
    labor: watch('jobs').reduce((s, j) => s + j.laborHours, 0),
    material: watch('jobs').reduce((s, j) => s + j.materialCost, 0),
    floor: watch('jobs').reduce((s, j) => s + j.floorSpace, 0),
  };
  const comparison = firstJob
    ? compareAllocationMethods(watch('totalOverhead'), firstJob, totals.machine, totals.labor, totals.material, totals.floor, watch('jobs').length)
    : [];

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">Overhead Allocator</h1>
            <p className="text-gray-600">Distribute overhead fairly across jobs using a consistent, transparent method.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input {...register('totalOverhead', { valueAsNumber: true })} type="number" step="100" label="Total Overhead (USD)" error={errors.totalOverhead?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                    <Input {...register('allocationMethod')} label="Allocation Method (machineHours/laborHours/materialCost/floorSpace/equalSplit)" error={errors.allocationMethod?.message} required />
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Jobs</h3>
                    <div className="space-y-4">
                      {jobsArray.fields.map((field, index) => (
                        <div key={field.id} className="rounded-lg border p-4">
                          <div className="mb-3 grid gap-3 md:grid-cols-3">
                            <Input {...register(`jobs.${index}.jobName` as const)} label="Job Name" error={errors.jobs?.[index]?.jobName?.message} required />
                            <Input {...register(`jobs.${index}.machineHours` as const, { valueAsNumber: true })} type="number" step="1" label="Machine Hours" error={errors.jobs?.[index]?.machineHours?.message} />
                            <Input {...register(`jobs.${index}.laborHours` as const, { valueAsNumber: true })} type="number" step="1" label="Labor Hours" error={errors.jobs?.[index]?.laborHours?.message} />
                          </div>
                          <div className="grid gap-3 md:grid-cols-3">
                            <Input {...register(`jobs.${index}.materialCost` as const, { valueAsNumber: true })} type="number" step="10" label="Material Cost (USD)" leftIcon={<DollarSign className="h-4 w-4" />} error={errors.jobs?.[index]?.materialCost?.message} />
                            <Input {...register(`jobs.${index}.floorSpace` as const, { valueAsNumber: true })} type="number" step="10" label="Floor Space (ft²)" error={errors.jobs?.[index]?.floorSpace?.message} />
                            <div className="flex items-end justify-end gap-3">
                              <Button type="button" variant="outline" onClick={() => jobsArray.remove(index)}>Remove</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button type="button" variant="secondary" onClick={() => jobsArray.append({ jobName: `Job ${jobsArray.fields.length + 1}`, machineHours: 0, laborHours: 0, materialCost: 0, floorSpace: 0 })}>Add Job</Button>
                    </div>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isCalculating} leftIcon={<CalculatorIcon className="h-5 w-5" />}>Allocate Overhead</Button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Summary */}
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-6 text-3xl font-bold">Allocation Summary</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Overhead</p>
                        <p className="text-3xl font-bold">${result.totalAllocated.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Method</p>
                        <p className="text-xl font-semibold">{result.allocationMethod}</p>
                      </div>
                      {overheadRate && (
                        <div>
                          <p className="mb-1 text-sm text-blue-100">Overhead Rate</p>
                          <p className="text-2xl font-semibold">{overheadRate.overheadRate}%</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Allocation Table */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Job Allocations</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="pb-2 text-left">Job</th>
                            <th className="pb-2 text-right">Allocated Overhead</th>
                            <th className="pb-2 text-right">Overhead %</th>
                            <th className="pb-2 text-right">Total Cost with Overhead</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.jobs.map(job => (
                            <tr key={job.jobName} className="border-b">
                              <td className="py-2">{job.jobName}</td>
                              <td className="py-2 text-right">${job.allocatedOverhead.toFixed(2)}</td>
                              <td className="py-2 text-right">{job.overheadPercent.toFixed(1)}%</td>
                              <td className="py-2 text-right">${job.totalCostWithOverhead.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Method Comparison (first job) */}
                  {firstJob && (
                    <div className="card">
                      <h3 className="mb-4 text-xl font-bold">Method Comparison (Example: {firstJob.jobName})</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-2 text-left">Method</th>
                              <th className="pb-2 text-right">Allocated</th>
                              <th className="pb-2 text-right">Diff vs Avg</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparison.map(row => (
                              <tr key={row.method} className="border-b">
                                <td className="py-2">{row.method}</td>
                                <td className="py-2 text-right">${row.allocatedAmount.toFixed(2)}</td>
                                <td className="py-2 text-right">{row.difference.toFixed(1)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Export */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Overhead Allocation Report"
                        calculationType="Overhead Allocation"
                        inputData={watch() as any}
                        results={{
                          'Total Overhead': watch('totalOverhead'),
                          'Method': watch('allocationMethod'),
                          'Average Overhead Per Job': result.summary.averageOverheadPerJob,
                          'Highest Overhead': `${result.summary.highestOverhead.jobName}: $${result.summary.highestOverhead.amount.toFixed(2)}`,
                          'Lowest Overhead': `${result.summary.lowestOverhead.jobName}: $${result.summary.lowestOverhead.amount.toFixed(2)}`,
                        }}
                        recommendations={result.recommendations}
                      />
                    </div>
                    <Button variant="outline" size="lg" onClick={handleReset} leftIcon={<RotateCcw className="h-5 w-5" />}>New Allocation</Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[300px] flex-col items-center justify-center text-center">
                  <CalculatorIcon className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">Ready to Allocate</h3>
                  <p className="text-gray-500">Enter overhead and jobs, then calculate allocations</p>
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


