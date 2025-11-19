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
import { Calculator as CalculatorIcon, RotateCcw, HelpCircle, Clock, TrendingDown, Lightbulb } from 'lucide-react';
import { setupEstimatorSchema, setupEstimatorDefaults, type SetupEstimatorInput } from '@/lib/validations/cost-center';
import { calculateSetupEstimate, calculateIdealBatchSize, compareSetupScenarios } from '@/lib/calculators/cost-center/setup';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

// Programming complexity options
const programmingOptions = [
  { value: 'simple', label: 'Simple - Basic shapes, few features' },
  { value: 'moderate', label: 'Moderate - Standard parts with some complexity' },
  { value: 'complex', label: 'Complex - Intricate designs, multiple tool paths' },
  { value: 'veryComplex', label: 'Very Complex - Highly detailed, extensive programming' },
];

// Material size options
const materialSizeOptions = [
  { value: 'small', label: 'Small - Up to roughly 2ft x 2ft, quick to load' },
  { value: 'medium', label: 'Medium - Around 2-4ft x 2-4ft, standard loading effort' },
  { value: 'large', label: 'Large - Around 4-8ft x 4-8ft, heavier loading' },
  { value: 'xlarge', label: 'X-Large - Very large sheets or plates, may need lifting aids' },
];

// Machine preparation options
const machineChangeOptions = [
  { value: 'noChange', label: 'No Change - Same setup as previous job' },
  { value: 'nozzleChange', label: 'Nozzle Change - Replace cutting nozzle' },
  { value: 'gasChange', label: 'Gas Change - Switch assist gas type' },
  { value: 'focusAdjust', label: 'Focus Adjust - Calibrate focal length' },
  { value: 'fullSetup', label: 'Full Setup - Complete machine reconfiguration' },
];

// Inspection level options
const inspectionOptions = [
  { value: 'none', label: 'None - Skip additional first article inspection' },
  { value: 'quick', label: 'Quick - Visual check only' },
  { value: 'standard', label: 'Standard - Measure critical dimensions' },
  { value: 'detailed', label: 'Detailed - Full dimensional inspection' },
];

// Fixture complexity options
const fixtureOptions = [
  { value: 'none', label: 'None - No fixturing required' },
  { value: 'simple', label: 'Simple - Basic clamping or positioning' },
  { value: 'moderate', label: 'Moderate - Custom jigs or alignment tools' },
  { value: 'complex', label: 'Complex - Intricate fixturing systems' },
];

// Operator experience options
const operatorOptions = [
  { value: 'novice', label: 'Novice - < 6 months experience; typically slower than baseline' },
  { value: 'intermediate', label: 'Intermediate - 6-24 months experience; near baseline speed' },
  { value: 'experienced', label: 'Experienced - 2-5 years experience; generally efficient' },
  { value: 'expert', label: 'Expert - 5+ years, highly skilled; tends to be faster and more consistent' },
];

// Job familiarity options
const familiarityOptions = [
  { value: 'firstTime', label: 'First Time - Never done before; allow extra time for learning and checks' },
  { value: 'occasional', label: 'Occasional - Done a few times; some familiarity' },
  { value: 'regular', label: 'Regular - Familiar with process' },
  { value: 'repeat', label: 'Repeat - Well-practiced routine with established steps' },
];

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
    { 
      question: 'Why is setup time important?', 
      answer:
        'Setup time can be a significant portion of total job time, especially for small batches, because you are paying for preparation before parts are produced. Estimating it explicitly helps avoid under-quoting, supports scheduling, and can highlight where process changes might help. In some small-batch scenarios, setup cost per part may even be comparable to or higher than cutting cost; this estimator lets you explore that with your own inputs.'
    },
    { 
      question: 'How to reduce setup time?', 
      answer: 'Key strategies include: standardize materials and processes; save and reuse programs; batch similar jobs together; invest in operator training; use quick-change tooling and fixtures; implement 5S workplace organization; create setup checklists; consider SMED (Single-Minute Exchange of Die) principles; maintain equipment properly; and use standardized work procedures.' 
    },
    {
      question: 'What is included in setup time?',
      answer: 'Setup time includes: programming (creating or loading CNC programs), material loading/positioning, machine preparation (nozzle changes, gas setup, focus adjustment), fixture installation, first article inspection, parameter verification, and any adjustments needed before production begins. It excludes actual cutting time and post-processing.'
    },
    {
      question: 'How does batch size affect setup cost per part?',
      answer:
        'Setup is a fixed cost spread across all parts in a batch, so larger batches reduce setup cost per part. For example, if you model 30 minutes of setup at $30 of labor cost, the cost per part would be $30 for 1 part, $3 for 10 parts, or $0.30 for 100 parts. This is only an illustration—use your own times and rates in the estimator to see how sensitive your jobs are to batch size.'
    },
    {
      question: 'What is the ideal batch size?',
      answer:
        'The ideal batch size balances setup efficiency with inventory, lead time, and cash flow. One approach is to choose a target share of total time for setup (this estimator uses a percentage parameter, such as 10% by default) and see how many parts you would need at a given cutting time per part. For example, if you assume 30 minutes of setup and target setup as 15% of total time, you would need around 200 minutes of cutting to reach that mix. Treat these percentages as planning aids rather than fixed rules, and adjust them to match your customers and operations.'
    },
    {
      question: 'How can operator experience affect setup time?',
      answer:
        'Operator experience can have a large effect on how long setup actually takes. Less-experienced operators often require more time for checks and adjustments, while very experienced operators are usually faster and encounter fewer interruptions. The experience levels in this estimator use relative multipliers as an internal assumption; compare the results with your own measured setup times to decide which level best matches your team.'
    }
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

          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Setup & Changeover Time Estimator</h1>
            <p className="text-base text-gray-600">
              Estimate total setup time, analyze per-part distribution, and explore optimization opportunities.
            </p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-cyan-500 bg-cyan-50 px-4 py-3">
            <p className="text-sm text-cyan-900">
              <Clock className="mr-2 inline h-4 w-4" />
              <strong>Planning Tool:</strong> Results based on typical ranges. Actual setup times vary by operator skill, equipment, and standardization. Track your actual times for accuracy.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Job Complexity Section */}
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Job Complexity</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Select 
                        {...register('programmingComplexity')} 
                        label="Programming Complexity" 
                        options={programmingOptions}
                        error={errors.programmingComplexity?.message} 
                        helperText="Complexity of CAD/CAM programming required"
                        required 
                      />
                      <Select 
                        {...register('materialSize')} 
                        label="Material Size" 
                        options={materialSizeOptions}
                        error={errors.materialSize?.message} 
                        helperText="Physical dimensions and weight of material"
                        required 
                      />
                    </div>
                  </div>

                  {/* Machine Setup Section */}
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Machine Setup</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Select 
                        {...register('machineChange')} 
                        label="Machine Preparation" 
                        options={machineChangeOptions}
                        error={errors.machineChange?.message} 
                        helperText="Changes needed from previous job"
                        required 
                      />
                      <Select 
                        {...register('inspectionLevel')} 
                        label="First Article Inspection" 
                        options={inspectionOptions}
                        error={errors.inspectionLevel?.message} 
                        helperText="Quality check level for first part"
                        required 
                      />
                    </div>
                  </div>

                  {/* Fixtures & Team Section */}
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Fixtures & Team</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                      <Select 
                        {...register('fixtureComplexity')} 
                        label="Fixture Complexity" 
                        options={fixtureOptions}
                        error={errors.fixtureComplexity?.message} 
                        helperText="Clamping and positioning requirements"
                        required 
                      />
                      <Select 
                        {...register('operatorExperience')} 
                        label="Operator Experience" 
                        options={operatorOptions}
                        error={errors.operatorExperience?.message} 
                        helperText="Experience level affects setup speed"
                        required 
                      />
                    </div>
                  </div>

                  {/* Batch & Cost Section */}
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Batch & Costing</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Select 
                        {...register('jobFamiliarity')} 
                        label="Job Familiarity" 
                        options={familiarityOptions}
                        error={errors.jobFamiliarity?.message} 
                        helperText="How often this job is run"
                        required 
                      />
                      <Input 
                        {...register('batchQuantity', { valueAsNumber: true })} 
                        type="number" 
                        step="1" 
                        label="Batch Quantity" 
                        placeholder="e.g., 50"
                        helperText="Number of parts to produce"
                        error={errors.batchQuantity?.message} 
                        required 
                      />
                      <Input 
                        {...register('setupLaborRate', { valueAsNumber: true })} 
                        type="number" 
                        step="1" 
                        label="Setup Labor Rate (USD/hr)" 
                        placeholder="e.g., 35"
                        helperText="Hourly cost of setup labor"
                        error={errors.setupLaborRate?.message} 
                        required 
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isCalculating} leftIcon={<CalculatorIcon className="h-5 w-5" />}>
                    Calculate Setup Time
                  </Button>
                </form>
              </div>
            </div>

            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Summary Card */}
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-6 text-3xl font-bold">Setup Time Summary</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Setup Time</p>
                        <p className="text-4xl font-bold">{result.adjustedTotal.toFixed(1)} <span className="text-2xl">min</span></p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Cost Per Part</p>
                        <p className="text-3xl font-bold">${result.setupCostPerPart.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Time Per Part</p>
                        <p className="text-3xl font-bold">{result.setupTimePerPart.toFixed(2)} <span className="text-xl">min</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Time Breakdown */}
                  <div className="card">
                    <div className="mb-4 flex items-center gap-2">
                      <Clock className="h-6 w-6 text-primary-600" />
                      <h3 className="text-xl font-bold">Detailed Time Breakdown</h3>
                    </div>
                    <div className="space-y-3">
                      <BreakdownWithBar label="Programming" value={result.programmingTime} total={result.adjustedTotal} />
                      <BreakdownWithBar label="Material Loading" value={result.loadingTime} total={result.adjustedTotal} />
                      <BreakdownWithBar label="Machine Preparation" value={result.machinePrepTime} total={result.adjustedTotal} />
                      <BreakdownWithBar label="First Article Inspection" value={result.inspectionTime} total={result.adjustedTotal} />
                      <BreakdownWithBar label="Fixture Setup" value={result.fixtureTime} total={result.adjustedTotal} />
                      <div className="border-t-2 border-gray-300 pt-3">
                        <Breakdown label="Total (Experience Adjusted)" value={result.adjustedTotal} isTotal />
                      </div>
                    </div>
                  </div>

                  {/* Batch Analysis */}
                  {idealBatch && (
                    <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
                      <div className="mb-4 flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-green-600" />
                        <h3 className="text-xl font-bold text-green-900">Batch Size Scenario Analysis</h3>
                      </div>
                      <p className="mb-4 text-sm text-green-700">
                        Based on an example assumption of 10 min cutting time per part; enter your own cutting time per part
                        to re-model this analysis for your shop.
                      </p>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                          <p className="mb-1 text-sm font-medium text-gray-600">Modeled Batch Size (example)</p>
                          <p className="text-3xl font-bold text-green-700">{idealBatch.idealBatchSize}</p>
                          <p className="mt-1 text-xs text-gray-500">parts per run in this scenario</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                          <p className="mb-1 text-sm font-medium text-gray-600">Setup % of Total Time</p>
                          <p className="text-3xl font-bold text-green-700">{idealBatch.setupTimePercentage}%</p>
                          <p className="mt-1 text-xs text-gray-500">for this modeled batch and cutting-time assumption</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                          <p className="mb-1 text-sm font-medium text-gray-600">Total Batch Time</p>
                          <p className="text-3xl font-bold text-green-700">{idealBatch.totalTimeForBatch}</p>
                          <p className="mt-1 text-xs text-gray-500">minutes</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optimization Impact */}
                  {scenarioCompare && (
                    <div className="card border-2 border-orange-200 bg-orange-50">
                      <div className="mb-4 flex items-start gap-3">
                        <TrendingDown className="mt-1 h-6 w-6 flex-shrink-0 text-orange-600" />
                        <div>
                          <h3 className="text-xl font-bold text-orange-900">Modeled Cost Reduction Scenario</h3>
                          <p className="text-sm text-orange-700">
                            This example shows potential savings if setup time were reduced from {result.adjustedTotal.toFixed(1)} min to
                            {" "}
                            {Math.max(5, result.adjustedTotal * 0.6).toFixed(1)} min. Adjust the before/after times in your own analysis
                            to match realistic improvements for your equipment and processes.
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                          <p className="mb-1 text-xs font-medium text-gray-600">Time Saved Per Setup</p>
                          <p className="text-2xl font-bold text-orange-700">{scenarioCompare.timeSavingsPerSetup}</p>
                          <p className="text-xs text-gray-500">minutes</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                          <p className="mb-1 text-xs font-medium text-gray-600">Annual Time Savings</p>
                          <p className="text-2xl font-bold text-orange-700">{scenarioCompare.annualTimeSavings.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">minutes/year (assuming 200 setups in this example)</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                          <p className="mb-1 text-xs font-medium text-gray-600">Cost Saved Per Setup</p>
                          <p className="text-2xl font-bold text-orange-700">${scenarioCompare.costSavingsPerSetup}</p>
                          <p className="text-xs text-gray-500">per changeover</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                          <p className="mb-1 text-xs font-medium text-gray-600">Annual Cost Savings</p>
                          <p className="text-2xl font-bold text-orange-700">${scenarioCompare.annualCostSavings.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">potential savings in this modeled scenario</p>
                        </div>
                      </div>
                      <div className="mt-4 rounded-lg bg-white p-3">
                        <p className="text-sm text-gray-700">
                          <strong>How to achieve this:</strong> Standardize programs, batch similar jobs, improve operator training, 
                          optimize fixture designs, and implement quick-change tooling systems.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Recommendations */}
                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="card border-2 border-blue-200 bg-blue-50">
                      <div className="mb-4 flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-blue-900">Setup Optimization Tips</h3>
                      </div>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, idx) => (
                          <li 
                            key={idx}
                            className="flex gap-3 rounded-lg bg-white p-3 shadow-sm"
                          >
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                              {idx + 1}
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

function BreakdownWithBar({ label, value, total }: { label: string; value: number; total: number }) {
  const percentage = (value / total) * 100;
  
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value.toFixed(1)} min ({percentage.toFixed(0)}%)</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
