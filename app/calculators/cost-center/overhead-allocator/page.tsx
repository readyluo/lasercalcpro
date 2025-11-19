'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ExportButton } from '@/components/calculators/ExportButton';
import { DollarSign, Calculator as CalculatorIcon, RotateCcw, HelpCircle, TrendingUp, AlertTriangle, PieChart } from 'lucide-react';
import { overheadAllocatorSchema, overheadAllocatorDefaults, type OverheadAllocatorInput } from '@/lib/validations/cost-center';
import { allocateOverhead, calculateOverheadRate, compareAllocationMethods } from '@/lib/calculators/cost-center/overhead';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

// Allocation method options with detailed descriptions
const allocationMethodOptions = [
  { 
    value: 'machineHours', 
    label: 'Machine Hours - Best for capital-intensive operations with heavy machinery usage' 
  },
  { 
    value: 'laborHours', 
    label: 'Labor Hours - Ideal for labor-intensive operations with varying workforce' 
  },
  { 
    value: 'materialCost', 
    label: 'Material Cost - Suitable when overhead correlates with material handling/storage' 
  },
  { 
    value: 'floorSpace', 
    label: 'Floor Space - Best for facility-driven overhead costs (rent, utilities)' 
  },
  { 
    value: 'equalSplit', 
    label: 'Equal Split - Simple method for uniform job distribution' 
  },
];

// Method descriptions for guidance
const methodDescriptions: Record<string, { description: string; bestFor: string; caution: string }> = {
  machineHours: {
    description: 'Allocates overhead based on the proportion of machine hours used by each job.',
    bestFor: 'Capital-intensive manufacturing with automated equipment',
    caution: 'Ensure accurate machine hour tracking for all jobs'
  },
  laborHours: {
    description: 'Distributes overhead based on direct labor hours consumed by each job.',
    bestFor: 'Labor-intensive operations with skilled workforce',
    caution: 'Track both productive and non-productive labor time'
  },
  materialCost: {
    description: 'Allocates overhead proportional to material costs incurred by each job.',
    bestFor: 'Operations with material handling and storage overhead',
    caution: 'May not reflect actual overhead drivers accurately'
  },
  floorSpace: {
    description: 'Distributes overhead based on the floor space occupied by each job.',
    bestFor: 'Facility costs like rent, utilities, and property taxes',
    caution: 'Measure actual space usage, not just theoretical allocation'
  },
  equalSplit: {
    description: 'Divides overhead equally among all jobs regardless of size or complexity.',
    bestFor: 'Simple operations with similar job characteristics',
    caution: 'May not accurately reflect cost drivers for diverse jobs'
  },
};

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
      answer: 'Choose based on your primary cost drivers: Machine Hours for capital-intensive operations with heavy equipment usage; Labor Hours for labor-intensive operations where workforce varies significantly; Material Cost when overhead correlates with material handling, storage, and procurement; Floor Space for facility-driven costs like rent, utilities, and property taxes; Equal Split for simple operations with similar job characteristics. The best method reflects how your overhead costs are actually incurred.'
    },
    {
      question: 'What is overhead allocation and why is it important?',
      answer: 'Overhead allocation is the process of distributing indirect costs (rent, utilities, insurance, administrative expenses) across products or jobs. It\'s crucial for accurate product costing, pricing decisions, profitability analysis, and cost control. Without proper allocation, you may underprice some products and overprice others, leading to poor business decisions.'
    },
    {
      question: 'How do I calculate my total overhead costs?',
      answer: 'Total overhead includes all indirect costs: facility costs (rent, utilities, property taxes), equipment depreciation, insurance, maintenance, administrative salaries, office supplies, and other shared expenses. Exclude direct materials and direct labor. Add up all these costs for your chosen period (monthly, quarterly, or annually).'
    },
    {
      question: 'Can I mix different allocation methods?',
      answer: 'For consistency and comparability, use one method per accounting period and review annually. While you can use different methods for different cost pools (e.g., facility costs by floor space, equipment costs by machine hours), this requires more complex accounting. Start with a single method that best represents your overall cost structure.'
    },
    {
      question: 'What if my overhead rate is very high?',
      answer:
        'An overhead rate that is high relative to your direct costs means indirect costs are a large share of the modeled total. In this tool, higher percentages are a signal to review your inputs, allocation choices, and overall cost structure. Compare the calculated rate with your historical data and business context before deciding whether to adjust costs, utilization, or pricing.'
    },
    {
      question: 'How often should I review my overhead allocation?',
      answer: 'Review your allocation method at least annually, or when there are significant changes in operations, equipment, facility size, or business model. Update your actual overhead costs monthly or quarterly to ensure accurate product costing and pricing decisions.'
    }
  ]);

  const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<OverheadAllocatorInput>({
    resolver: zodResolver(overheadAllocatorSchema),
    defaultValues: overheadAllocatorDefaults,
  });

  const jobsArray = useFieldArray({ control, name: 'jobs' });
  
  const selectedMethod = watch('allocationMethod');
  const methodInfo = methodDescriptions[selectedMethod];

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

          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Overhead Allocator Calculator</h1>
            <p className="text-base text-gray-600">
              Distribute overhead costs across jobs using common allocation methods.
            </p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-teal-500 bg-teal-50 px-4 py-3">
            <p className="text-sm text-teal-900">
              <PieChart className="mr-2 inline h-4 w-4" />
              <strong>Allocation Tool:</strong> Results depend on method choice. Different methods suit different operations. Review with your accounting standards and cost structure.
            </p>
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
                    <Input 
                      {...register('totalOverhead', { valueAsNumber: true })} 
                      type="number" 
                      step="100" 
                      label="Total Overhead (USD)" 
                      error={errors.totalOverhead?.message} 
                      leftIcon={<DollarSign className="h-4 w-4" />} 
                      helperText="Total overhead costs to be allocated across all jobs"
                      required 
                    />
                    <Select 
                      {...register('allocationMethod')} 
                      label="Allocation Method" 
                      options={allocationMethodOptions}
                      error={errors.allocationMethod?.message} 
                      helperText="Choose the method that best reflects your cost drivers"
                      required 
                    />
                  </div>
                  
                  {/* Method Information Card */}
                  {methodInfo && (
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                        <div className="space-y-2">
                          <h4 className="font-semibold text-blue-900">About {allocationMethodOptions.find(m => m.value === selectedMethod)?.label.split(' - ')[0]}</h4>
                          <p className="text-sm text-blue-800">{methodInfo.description}</p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            <div className="flex items-start gap-2">
                              <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                              <div>
                                <p className="text-xs font-medium text-green-700">Best For:</p>
                                <p className="text-xs text-green-600">{methodInfo.bestFor}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                              <div>
                                <p className="text-xs font-medium text-orange-700">Caution:</p>
                                <p className="text-xs text-orange-600">{methodInfo.caution}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Jobs to Allocate</h3>
                      <span className="text-sm text-gray-500">{jobsArray.fields.length} job(s)</span>
                    </div>
                    <div className="space-y-4">
                      {jobsArray.fields.map((field, index) => (
                        <div key={field.id} className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="font-medium text-gray-700">Job #{index + 1}</h4>
                            {jobsArray.fields.length > 1 && (
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => jobsArray.remove(index)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <div className="mb-3 grid gap-3 md:grid-cols-3">
                            <Input 
                              {...register(`jobs.${index}.jobName` as const)} 
                              label="Job Name" 
                              placeholder="e.g., Product A" 
                              error={errors.jobs?.[index]?.jobName?.message} 
                              required 
                            />
                            <Input 
                              {...register(`jobs.${index}.machineHours` as const, { valueAsNumber: true })} 
                              type="number" 
                              step="0.5" 
                              label="Machine Hours" 
                              placeholder="0.0"
                              helperText="Total machine time"
                              error={errors.jobs?.[index]?.machineHours?.message} 
                            />
                            <Input 
                              {...register(`jobs.${index}.laborHours` as const, { valueAsNumber: true })} 
                              type="number" 
                              step="0.5" 
                              label="Labor Hours" 
                              placeholder="0.0"
                              helperText="Total labor time"
                              error={errors.jobs?.[index]?.laborHours?.message} 
                            />
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <Input 
                              {...register(`jobs.${index}.materialCost` as const, { valueAsNumber: true })} 
                              type="number" 
                              step="10" 
                              label="Material Cost (USD)" 
                              placeholder="0.00"
                              leftIcon={<DollarSign className="h-4 w-4" />} 
                              helperText="Direct material costs"
                              error={errors.jobs?.[index]?.materialCost?.message} 
                            />
                            <Input 
                              {...register(`jobs.${index}.floorSpace` as const, { valueAsNumber: true })} 
                              type="number" 
                              step="10" 
                              label="Floor Space (ft^2)" 
                              placeholder="0"
                              helperText="Space occupied"
                              error={errors.jobs?.[index]?.floorSpace?.message} 
                            />
                          </div>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={() => jobsArray.append({ 
                          jobName: `Job ${jobsArray.fields.length + 1}`, 
                          machineHours: 0, 
                          laborHours: 0, 
                          materialCost: 0, 
                          floorSpace: 0 
                        })}
                        className="w-full"
                      >
                        + Add Another Job
                      </Button>
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
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Overhead</p>
                        <p className="text-3xl font-bold">${result.totalAllocated.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Method</p>
                        <p className="text-xl font-semibold">{result.allocationMethod}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Average per Job</p>
                        <p className="text-2xl font-semibold">${result.summary.averageOverheadPerJob.toLocaleString()}</p>
                      </div>
                      {overheadRate && (
                        <div>
                          <p className="mb-1 text-sm text-blue-100">Overhead Rate</p>
                          <p className="text-2xl font-semibold">{overheadRate.overheadRate}%</p>
                          <p className="mt-1 text-xs text-blue-200">{overheadRate.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Key Insights */}
                  <div className="card bg-gradient-to-br from-green-50 to-blue-50">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Key Insights</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Highest Overhead</h4>
                        </div>
                        <p className="text-2xl font-bold text-green-700">{result.summary.highestOverhead.jobName}</p>
                        <p className="text-sm text-gray-600">Allocated: ${result.summary.highestOverhead.amount.toLocaleString()}</p>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 rotate-180 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Lowest Overhead</h4>
                        </div>
                        <p className="text-2xl font-bold text-blue-700">{result.summary.lowestOverhead.jobName}</p>
                        <p className="text-sm text-gray-600">Allocated: ${result.summary.lowestOverhead.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Job Allocation Table */}
                  <div className="card">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold">Detailed Job Allocations</h3>
                      <span className="text-sm text-gray-500">{result.jobs.length} jobs</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300 bg-gray-50">
                            <th className="p-3 text-left font-semibold text-gray-700">Job Name</th>
                            <th className="p-3 text-right font-semibold text-gray-700">Allocated Overhead</th>
                            <th className="p-3 text-right font-semibold text-gray-700">Overhead %</th>
                            <th className="p-3 text-right font-semibold text-gray-700">Total Cost</th>
                            <th className="p-3 text-center font-semibold text-gray-700">Distribution</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.jobs.map((job) => {
                            const percentOfTotal = (job.allocatedOverhead / result.totalAllocated) * 100;
                            const isHighest = job.jobName === result.summary.highestOverhead.jobName;
                            const isLowest = job.jobName === result.summary.lowestOverhead.jobName;
                            
                            return (
                              <tr 
                                key={job.jobName} 
                                className={`border-b transition-colors hover:bg-gray-50 ${
                                  isHighest ? 'bg-green-50' : isLowest ? 'bg-blue-50' : ''
                                }`}
                              >
                                <td className="p-3 font-medium text-gray-900">
                                  <div className="flex items-center gap-2">
                                    {job.jobName}
                                    {isHighest && <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Highest</span>}
                                    {isLowest && <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Lowest</span>}
                                  </div>
                                </td>
                                <td className="p-3 text-right font-semibold text-gray-900">
                                  ${job.allocatedOverhead.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="p-3 text-right">
                                  <span className={`font-medium ${
                                    job.overheadPercent > 50 ? 'text-red-600' : 
                                    job.overheadPercent > 30 ? 'text-orange-600' : 
                                    'text-green-600'
                                  }`}>
                                    {job.overheadPercent.toFixed(1)}%
                                  </span>
                                </td>
                                <td className="p-3 text-right font-semibold text-gray-900">
                                  ${job.totalCostWithOverhead.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                                      <div 
                                        className={`h-full ${
                                          isHighest ? 'bg-green-600' : 
                                          isLowest ? 'bg-blue-600' : 
                                          'bg-primary-600'
                                        }`}
                                        style={{ width: `${percentOfTotal}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-600">{percentOfTotal.toFixed(1)}%</span>
                                  </div>
                                </td>
                            </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                            <td className="p-3 text-gray-900">Total</td>
                            <td className="p-3 text-right text-gray-900">
                              ${result.totalAllocated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="p-3 text-right text-gray-600">-</td>
                            <td className="p-3 text-right text-gray-900">
                              ${result.jobs.reduce((sum, j) => sum + j.totalCostWithOverhead, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="p-3 text-center text-gray-600">100%</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Method Comparison (first job) */}
                  {firstJob && comparison.length > 0 && (
                    <div className="card border-2 border-purple-200 bg-purple-50">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="rounded-full bg-purple-600 p-2">
                          <HelpCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-purple-900">Method Impact Analysis</h3>
                          <p className="text-sm text-purple-700">Comparing allocation methods for: <span className="font-semibold">{firstJob.jobName}</span></p>
                        </div>
                      </div>
                      <div className="overflow-x-auto rounded-lg bg-white p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-gray-300">
                              <th className="pb-3 text-left font-semibold text-gray-700">Allocation Method</th>
                              <th className="pb-3 text-right font-semibold text-gray-700">Allocated Amount</th>
                              <th className="pb-3 text-right font-semibold text-gray-700">Variance from Average</th>
                              <th className="pb-3 text-center font-semibold text-gray-700">Visual</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparison.map((row) => {
                              const isSelected = row.method === result.allocationMethod;
                              return (
                                <tr 
                                  key={row.method} 
                                  className={`border-b transition-colors ${
                                    isSelected ? 'bg-purple-100 font-semibold' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <td className="py-3">
                                    <div className="flex items-center gap-2">
                                      {row.method}
                                      {isSelected && (
                                        <span className="rounded bg-purple-600 px-2 py-0.5 text-xs font-medium text-white">
                                          Selected
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-3 text-right font-semibold text-gray-900">
                                    ${row.allocatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </td>
                                  <td className="py-3 text-right">
                                    <span className={`font-medium ${
                                      row.difference > 20 ? 'text-red-600' :
                                      row.difference > 0 ? 'text-orange-600' :
                                      row.difference < -20 ? 'text-blue-600' :
                                      'text-green-600'
                                    }`}>
                                      {row.difference > 0 ? '+' : ''}{row.difference.toFixed(1)}%
                                    </span>
                                  </td>
                                  <td className="py-3">
                                    <div className="flex items-center justify-center">
                                      <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                                        <div 
                                          className={`h-full ${
                                            isSelected ? 'bg-purple-600' :
                                            row.difference > 0 ? 'bg-orange-500' : 'bg-blue-500'
                                          }`}
                                          style={{ 
                                            width: `${Math.min(100, Math.abs(row.difference) * 2 + 30)}%`,
                                            marginLeft: row.difference < 0 ? 'auto' : '0'
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </td>
                              </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <p className="mt-3 text-xs text-gray-600">
                          Tip: Large variances indicate that method selection significantly impacts cost allocation. Choose the method that best reflects your actual cost drivers.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="card border-2 border-amber-200 bg-amber-50">
                      <div className="mb-4 flex items-start gap-3">
                        <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-600" />
                        <div>
                          <h3 className="text-xl font-bold text-amber-900">Recommendations & Insights</h3>
                          <p className="text-sm text-amber-700">Best practices and optimization suggestions</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, index) => (
                          <li 
                            key={index}
                            className="flex gap-3 rounded-lg bg-white p-4 shadow-sm"
                          >
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                              {index + 1}
                            </span>
                            <p className="text-sm text-gray-800">{rec}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Export */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Overhead Allocation Report"
                        calculationType="Overhead Allocation"
                        inputData={watch() as unknown as Record<string, any>}
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


