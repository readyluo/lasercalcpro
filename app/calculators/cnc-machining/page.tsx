'use client';

import React from 'react';

import Link from 'next/link';
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
import { Calculator, RotateCcw, DollarSign, Package, TrendingDown } from 'lucide-react';
import {
  generateCalculatorHowToSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { saveCalculationToAPI } from '@/lib/utils/api-client';
import { ExportButton } from '@/components/calculators/ExportButton';

export default function CNCMachiningCalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = useState<CNCMachiningResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const howToSchema = generateCalculatorHowToSchema(
    'CNC Machining Cost Calculator',
    'Estimate CNC machining costs with batch pricing and tooling analysis based on your own inputs',
    [
      { name: 'Enter Part Dimensions', text: 'Input length, width, and height of your part in millimeters' },
      { name: 'Select Material', text: 'Choose material type and enter price per kg' },
      { name: 'Set Machining Parameters', text: 'Enter machining time, setup time, and batch size' },
      { name: 'Configure Costs', text: 'Set machine rate, labor rate, tooling costs, and overhead percentage' },
      { name: 'Calculate & Review', text: 'Get per-part costs, batch totals, and volume pricing tiers' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'How accurate is this CNC cost calculator?',
      answer:
        'This calculator uses simplified cost formulas together with your input data to estimate CNC machining costs. Actual results depend on your machines, tooling, programming strategies, and shop rates, so treat the output as a guide and compare it against measured cycle times and historical jobs in your own shop.',
    },
    {
      question: 'Why is the first piece more expensive than production quantities?',
      answer:
        'Setup time is spread across all pieces in a batch. When you only make one part, the entire setup cost sits on that part. As batch size increases, the same setup time is divided by more parts, so cost per piece decreases. Use the setup time and batch size fields in this calculator to see how different batch sizes change per-part cost.',
    },
    {
      question: 'What is included in the machine hour rate?',
      answer:
        'Machine hour rate usually bundles equipment depreciation, labor, facility overhead, maintenance, and profit. In this calculator you can represent this by combining your machine, labor, and overhead assumptions into the machine and overhead rate fields. For exact breakdowns, rely on your own cost accounting rather than generic hourly examples.',
    },
  ]);
  const softwareSchema = generateSoftwareApplicationSchema('CNC Machining Cost Calculator');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CNCMachiningInput>({
    resolver: zodResolver(cncMachiningSchema),
    defaultValues: cncMachiningDefaults,
  });
  const watchedValues = watch();

  const onSubmit = async (data: CNCMachiningInput) => {
    setIsCalculating(true);

    try {
      const calculationResult = calculateCNCMachining(data);
      setResult(calculationResult);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      const saveResult = await saveCalculationToAPI({
        tool_type: 'cnc-machining',
        input_params: data,
        result: calculationResult as unknown as Record<string, unknown>,
      });

      if (!saveResult.success) {
        console.error('Failed to save calculation:', saveResult.error);
      }
    } finally {
      setIsCalculating(false);
    }
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
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={softwareSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* When to use this calculator */}
          <div className="mb-4 rounded-2xl bg-blue-50 border-l-4 border-blue-500 px-4 py-3">
            <h2 className="mb-1 text-sm font-semibold text-gray-900">When to use this CNC machining calculator</h2>
            <div className="grid gap-3 md:grid-cols-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">✓ Best suited for:</p>
                <ul className="mt-1 ml-5 list-disc space-y-1">
                  <li>Simple prismatic parts with mostly milling, turning, and drilling</li>
                  <li>Rough cost comparisons between materials and batch sizes</li>
                  <li>Understanding setup vs. cycle time impact on cost/part</li>
                  <li>Early-stage quoting where you already know approximate cycle times</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900">✗ Not ideal for:</p>
                <ul className="mt-1 ml-5 list-disc space-y-1">
                  <li>Highly complex 5-axis surfaces, undercuts, or deep cavities</li>
                  <li>Jobs dominated by programming, inspection, or fixturing time</li>
                  <li>Exotic materials (Inconel, hardened steels) without measured cycle data</li>
                  <li>Fully-optimized production lines with detailed time studies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Header - Compact */}
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {t.cncMachining.title}
            </h1>
            <p className="text-base text-gray-600">{t.cncMachining.description}</p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-900">
              <svg className="mr-2 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <strong>Estimates only:</strong> This tool combines your own time and rate inputs with simplified cost formulas.
              It does not model detailed toolpaths, fixturing strategies, programming time, inspection, coolant usage, or scrap.
              Always compare against measured cycle times and historical jobs in your own shop before final quoting.
            </p>
            <p className="mt-1 text-xs text-amber-800">
              Complex 5-axis parts, hard-to-machine alloys, and tight-tolerance features can be significantly slower than
              simple prismatic examples. Treat these results as planning guidance, not a guaranteed shop rate.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Input Parameters</h2>
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

                      {watchedValues.materialType && (
                        <div className="mt-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-gray-800">
                          {(() => {
                            const map: Record<
                              string,
                              { index: number; note: string; level: 'easy' | 'medium' | 'hard' }
                            > = {
                              aluminum: {
                                index: 4.5,
                                note: 'Excellent machinability – high feeds/speeds and long tool life when coolant is correct.',
                                level: 'easy',
                              },
                              steel: {
                                index: 3.0,
                                note: 'Baseline machinability – standard feeds/speeds and common tooling.',
                                level: 'medium',
                              },
                              stainless_steel: {
                                index: 2.0,
                                note: 'Work-hardening – needs conservative feeds, sharp tools, and good coolant.',
                                level: 'hard',
                              },
                              brass: {
                                index: 5.0,
                                note: 'Free-cutting – very fast machining, but material cost is higher.',
                                level: 'easy',
                              },
                              plastic: {
                                index: 4.0,
                                note: 'Easy to cut but sensitive to heat and deflection – chip evacuation and fixturing matter.',
                                level: 'medium',
                              },
                            };

                            const mat = map[watchedValues.materialType as keyof typeof map];
                            const label = materialOptions.find(m => m.value === watchedValues.materialType)?.label;
                            if (!mat || !label) return null;

                            return (
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${{
                                    easy: 'bg-green-100 text-green-700',
                                    medium: 'bg-blue-100 text-blue-700',
                                    hard: 'bg-red-100 text-red-700',
                                  }[mat.level]}`}
                                >
                                  {mat.index.toFixed(1)}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">{label} machinability index</p>
                                  <p className="mt-0.5 text-gray-700">{mat.note}</p>
                                  <p className="mt-1 text-[11px] text-gray-600">
                                    Compared to easy-cutting brass at ~5.0. Lower index usually means slower feeds/speeds and
                                    higher tool wear, which should be reflected in your machining time and tooling inputs above.
                                  </p>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

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
                    <h2 className="mb-6 text-3xl font-bold">Cost Summary</h2>

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

                  {/* Optimization opportunities */}
                  <div className="card border-l-4 border-green-500 bg-green-50">
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                      <TrendingDown className="h-6 w-6 text-green-600" />
                      Optimization opportunities
                    </h3>
                    <div className="space-y-3 text-sm text-gray-800">
                      {result.setupCostPerPart > result.machineCostPerPart && (
                        <div className="rounded bg-white p-3 text-xs">
                          <p className="font-semibold text-amber-800 mb-1">Setup dominating unit cost</p>
                          <p>
                            Setup cost per part (${result.setupCostPerPart.toFixed(2)}) is higher than machine time
                            (${result.machineCostPerPart.toFixed(2)}). For recurring work, consider larger batch sizes,
                            reusable fixtures, or consolidating similar jobs to spread setup across more parts.
                          </p>
                        </div>
                      )}

                      {result.toolingCostPerPart > result.totalCostPerPart * 0.25 && (
                        <div className="rounded bg-white p-3 text-xs">
                          <p className="font-semibold text-blue-800 mb-1">
                            Tooling is ~
                            {((result.toolingCostPerPart / result.totalCostPerPart) * 100).toFixed(0)}% of cost/part
                          </p>
                          <p>
                            High tooling share suggests aggressive parameters, difficult materials, or suboptimal tool
                            choice. Check insert grade, coating, coolant, and whether a different tool strategy could extend
                            life without sacrificing quality.
                          </p>
                        </div>
                      )}

                      {result.machineUtilization < 60 && (
                        <div className="rounded bg-white p-3 text-xs">
                          <p className="font-semibold text-purple-800 mb-1">Low cutting-time utilization</p>
                          <p>
                            Machine utilization is {result.machineUtilization}% – much of the batch time is in setup or
                            non-cutting activities. Review fixturing, probing, and toolchange strategy, and consider
                            combining operations or using palletization for repeat jobs.
                          </p>
                        </div>
                      )}

                      {watchedValues.batchSize < 10 && (
                        <div className="rounded bg-white p-3 text-xs">
                          <p className="font-semibold text-gray-900 mb-1">Very small batch size</p>
                          <p>
                            With a batch of {watchedValues.batchSize} part
                            {watchedValues.batchSize === 1 ? '' : 's'}, setup has a strong impact on cost per part. For
                            prototype or pre-production work, consider charging a separate setup fee or quoting a small
                            minimum order rather than only a per-piece price.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <ExportButton
                      title="CNC Machining Cost Report"
                      calculationType="CNC Machining"
                      inputData={watchedValues}
                      results={{
                        'Cost Per Part': result.totalCostPerPart,
                        'Suggested Price': result.suggestedPricePerPart,
                        'Total Batch Cost': result.totalBatchCost,
                        'Total Batch Time (hrs)': result.totalBatchTime,
                        'Material Cost Per Part': result.materialCostPerPart,
                        'Machine Cost Per Part': result.machineCostPerPart,
                        'Labor Cost Per Part': result.laborCostPerPart,
                        'Tooling Cost Per Part': result.toolingCostPerPart,
                        'Setup Cost Per Part': result.setupCostPerPart,
                        'Overhead Per Part': result.overheadPerPart,
                        'Part Weight (kg)': result.partWeight,
                        'Machine Utilization (%)': result.machineUtilization,
                        'Profit Per Part': result.profitPerPart,
                        'Total Profit': result.totalProfit,
                      }}
                    />
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
              <h2 className="mb-6 text-3xl font-bold text-gray-900">CNC Machining Operations Guide</h2>
              <p className="mb-6 text-gray-700">
                Understanding different machining operations and their cost implications is crucial for accurate estimating.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Milling Operations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Face Milling:</strong> Often used for high-area stock removal. Actual hourly rates depend on machine size, tooling cost, and regional labor markets. Calculate your rate from equipment depreciation, labor burden, overhead, and target profit using this calculator.</p>
                    <p><strong>End Milling:</strong> Versatile for profiles and pockets. Rates vary widely by machine capability and shop specialization. Use your own cost structure when pricing these operations.</p>
                    <p><strong>Slotting:</strong> Slower than face milling due to higher engagement; requires multiple passes. Factor in longer cycle times when estimating.</p>
                    <p><strong>3D Contouring:</strong> Complex surfaces on 4- or 5-axis equipment typically command premium rates reflecting machine investment, programming time, and operator skill. Your pricing should reflect these value-added capabilities.</p>
                    <p><strong>Feed Rates:</strong> Safe and productive feeds depend on material, tooling, rigidity, and machine capability. Always use values from your tooling manufacturer recommendations, CAM libraries, and validated test cuts rather than generic examples.</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Turning Operations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>External Turning:</strong> Capable of high material removal rates. Machine hour rates vary by equipment size, chuck capacity, and automation level. Use this calculator with your actual machine and labor costs.</p>
                    <p><strong>Facing:</strong> Quick operation for flat surfaces; cycle time depends on part diameter and finish requirements.</p>
                    <p><strong>Boring:</strong> Internal diameter precision work typically requires slower speeds and careful tool selection.</p>
                    <p><strong>Threading:</strong> Time-intensive operation requiring multiple passes; cycle time depends on thread pitch and length.</p>
                    <p><strong>Cutting Speeds:</strong> Surface speeds vary significantly with material, insert grade, and coolant. Always follow your insert manufacturer data and validate with your machine capabilities.</p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Drilling & Boring</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Spot Drilling:</strong> Essential for accurate hole location. Cycle time per hole depends on your machine spindle speed, feed rate, and tool approach strategy.</p>
                    <p><strong>Drilling:</strong> Cycle time depends on depth, diameter, material, and chip evacuation requirements. Tighter tolerances or difficult materials extend drilling time. Use your CAM time estimates or measured cycle times when quoting.</p>
                    <p><strong>Reaming:</strong> Precision finishing operation adds time beyond drilling. The additional time depends on tolerance requirements, reamer quality, and material. Validate with your own process data.</p>
                    <p><strong>Tapping:</strong> Thread cutting cycles are sensitive to material, lubrication quality, and thread depth. Cycle time varies significantly; use proven parameters from your shop.</p>
                    <p><strong>Cost Impact:</strong> Multiple-hole patterns can accumulate significant machine time. Use your own cycle-time reports from CAM or time studies to accurately quantify hole-making costs in your quotes.</p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Finishing Operations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Deburring:</strong> Manual or tumbling operations require labor time. Use your own wage rates and burden factors when calculating deburring costs.</p>
                    <p><strong>Surface Grinding:</strong> Precision grinding for tight tolerances typically commands higher machine rates than basic milling. Your rate should reflect the specialized equipment and skill required.</p>
                    <p><strong>Polishing:</strong> Mirror finishes are labor-intensive operations. Time required varies greatly by part geometry, material, and finish specification. Use time studies from your shop to estimate polishing costs accurately.</p>
                    <p><strong>Heat Treatment:</strong> Stress relief, hardening, or tempering is often outsourced and priced per batch. Obtain quotes from your heat treat suppliers for specific alloys and requirements.</p>
                    <p><strong>Anodizing/Coating:</strong> Per-part finishing charges vary widely by part size, surface area, alloy, and coating type. Obtain current quotes from your finishing suppliers rather than using generic estimates when pricing finished parts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Material Selection for CNC */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Material Selection & Machinability</h2>
              <p className="mb-6 text-gray-700">
                Material choice significantly impacts machining time, tool life, and overall cost. Machinability rating 
                indicates relative ease of machining (higher = easier in general terms).
              </p>
              
              <div className="mb-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-yellow-900">
                    <strong>Reference Data Only:</strong> The machinability ratings, cost ranges, and speed factors in this table are simplified reference values for general comparison. Actual values vary significantly with specific alloy grades, heat treatment, tooling, cutting conditions, and regional suppliers. Use your own material costs and validated machining times when entering values into the calculator.
                  </p>
                </div>
              </div>
              
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
                *These machinability ratings and price/speed ranges are illustrative only and based on simplified reference data.
                Actual values vary with alloy, tooling, coolant, machine, and supplier pricing. Use them only as rough context and
                rely on your own material costs and machining times when entering values into this calculator.
              </p>
            </div>
          </div>

          {/* Cost Optimization for CNC */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Cost Optimization Strategies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">1</span>
                    Design for Manufacturability (DFM)
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Use standard tool sizes:</strong> Custom tools are more expensive and add lead time. Where possible, design around common cutter diameters to simplify tooling.</p>
                    <p><strong>Avoid very deep pockets:</strong> Deep, narrow pockets often require smaller tools and multiple passes, which increases cycle time. Simpler geometries are usually faster to machine.</p>
                    <p><strong>Minimize setups:</strong> Each additional setup adds non-cutting time. Parts that can be completed in fewer setups typically have lower per-part cost.</p>
                    <p><strong>Standard tolerances:</strong> Tighter tolerances and special surface finish requirements can significantly increase machining and inspection time. Use only as tight as the function of the part requires.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">2</span>
                    Optimize Batch Sizing
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Setup time impact:</strong> When setup time is large compared to machining time, very small batches can make each part expensive. Larger batches spread the same setup effort across more parts. Use the setup time and batch size fields in this calculator to explore that trade-off.</p>
                    <p><strong>Tooling amortization:</strong> Spreading custom tooling cost across more parts reduces tooling cost per part. Adjust tool cost and tool life inputs to reflect how many pieces you expect a tool to run.</p>
                    <p><strong>Batch sizing:</strong> Choose batch sizes that balance machine efficiency, changeover frequency, and your inventory strategy rather than relying on a single "typical" number.</p>
                    <p><strong>Inventory vs. efficiency:</strong> Larger batches may reduce unit machining cost but increase inventory. Use this calculator together with your inventory carrying cost assumptions to decide what is appropriate for your shop.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">3</span>
                    Material Stock Selection
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Use near-net shapes:</strong> Oversized stock increases material waste and machine time. Where possible, choose bar, plate, or extrusion sizes that are close to the finished part envelope.</p>
                    <p><strong>Standard stock sizes:</strong> Standard sizes are usually easier to source and more economical than highly customized dimensions. Check with your suppliers to see which sizes give the best overall value.</p>
                    <p><strong>Material utilization:</strong> Consider how much of each blank becomes finished part versus chips and offcuts, and reflect your expectations in the material cost inputs.</p>
                    <p><strong>Scrap value:</strong> Scrap can offset some material cost, but actual values depend on local markets and scrap handling. Use your own scrap value assumptions when analyzing material cost.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">4</span>
                    Cutting Parameters Optimization
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>High-speed machining:</strong> Modern CAM strategies can significantly reduce cycle time by improving toolpaths, feeds, and engagement. Use the machining time input in this calculator to capture those gains once you validate them on your machines.</p>
                    <p><strong>Adaptive clearing:</strong> Toolpaths that maintain more constant tool load often allow higher feeds for roughing compared to traditional paths, which can shorten roughing time.</p>
                    <p><strong>Tool life balance:</strong> Running tools aggressively can shorten tool life; running more conservatively can extend it but may lengthen cycle time. Use your experience and tooling data to find a balance, and update tool cost and tool life in the calculator accordingly.</p>
                    <p><strong>Coolant selection:</strong> Appropriate coolant type and delivery can improve tool life and surface finish. Reflect any changes in tool life and machining time in your calculator inputs rather than relying on generic multipliers.</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">5</span>
                    Alternative Processes
                  </h3>
                  <div className="ml-10 space-y-2 text-gray-700">
                    <p><strong>Castings:</strong> At higher volumes, casting plus finish machining can sometimes be more economical than machining from solid. Use this calculator alongside your casting quotes to compare total part cost.</p>
                    <p><strong>Laser/waterjet blanking:</strong> Pre-cut 2D profiles before machining can reduce roughing time for some geometries. Reflect any time savings by updating the machining time input when you validate them on your parts.</p>
                    <p><strong>3D printing + machining:</strong> Printing complex features and machining only critical surfaces can be beneficial for certain shapes. Model this by entering the machining time and material cost for the post-process CNC step.</p>
                    <p><strong>EDM for hard materials:</strong> For hardened steels or exotic alloys, EDM or other processes may be more suitable than milling. Compare alternative process quotes to the CNC estimates from this tool rather than assuming one method is always cheaper.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Benchmarks for CNC */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-purple-50 to-indigo-50">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Industry Benchmarks & Performance</h2>

              <p className="mb-6 text-gray-700">
                Benchmarks for machine rates, tool life, and tolerances vary widely by region, equipment, and industry.
                This calculator does not enforce any specific benchmark values; instead, it helps you apply your own shop
                data consistently. Use the following points as guidance on how to think about benchmarks rather than as
                fixed targets.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Machine Hour Rates</h3>
                  <p className="text-sm text-gray-700">
                    Machine hour rates are typically built from equipment costs, labor, overhead, maintenance, and
                    profit. Gather your own hourly costs for different machine types and enter them into the machine
                    rate and labor rate fields. This will give results that reflect your shop instead of generic market
                    ranges.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Time Breakdown</h3>
                  <p className="text-sm text-gray-700">
                    The share of time spent on programming, setup, roughing, finishing, and inspection depends heavily
                    on part geometry and workflow. Rather than relying on universal percentages, estimate setup and
                    machining time for your job and input those directly. You can then review how much of the total cost
                    is driven by non-cutting activities.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Tool Life</h3>
                  <p className="text-sm text-gray-700">
                    Tool life is influenced by material, coatings, coolant, and cutting parameters. Use your tooling
                    supplier recommendations and in-house experience to decide reasonable tool life assumptions, then set
                    tool cost and tool life values in the calculator so the tooling cost per part reflects your actual
                    usage.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Quality & Tolerances</h3>
                  <p className="text-sm text-gray-700">
                    Tolerances, surface finish, and geometric requirements should come from drawings and standards such
                    as ASME Y14.5, not from this calculator. Tighter quality requirements typically increase machining
                    and inspection time, which you can represent by adjusting machining time, setup time, and overhead
                    in your inputs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced FAQ for CNC */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="How accurate is this CNC cost calculator?"
                  answer="This calculator combines your inputs with simplified cost formulas to estimate machining costs. The results are intended as a planning and quoting aid rather than an exact prediction. Real costs depend on programming strategy, operator efficiency, tool choices, and how closely your assumptions match actual cycle times, so you should always compare estimates with your own historical data."
                />
                <FAQItem
                  question="Why is my first piece so expensive compared to production quantity?"
                  answer="Setup time is spread across all parts in a batch. When you run only a few pieces, each one carries a large share of the setup effort; as batch size increases, that same setup time is divided among more parts, so cost per piece falls. You can see this effect directly by changing batch size and setup time in the calculator and watching how per-part cost responds."
                />
                <FAQItem
                  question="What's included in the machine hour rate?"
                  answer="Machine hour rates usually combine equipment depreciation, labor, facility overhead, maintenance, and profit. The exact breakdown is specific to each shop. In this tool, you can represent that structure by choosing machine, labor, and overhead rates that match your accounting, then using the suggested price output as a starting point for quotes."
                />
                <FAQItem
                  question="When should I use 3-axis vs. 5-axis machining?"
                  answer="3-axis machines are often suitable for simpler parts with features on one or two sides and can be a good fit when hourly rates and fixturing are straightforward. 5-axis machines are typically chosen when you need access to multiple faces in a single setup or have complex angles and contours. The economic trade-off depends on your own machine rates and setup times; you can model different scenarios by changing setup, machining time, and batch size in this calculator."
                />
                <FAQItem
                  question="How can I reduce tooling costs?"
                  answer="Strategies include designing around standard tool sizes where possible, minimizing unnecessary tool changes, using appropriate coatings and grades for your materials, and tuning feeds and speeds so tools last reliably without excessive cycle time. Grouping similar parts into shared setups can also help spread tooling and setup effort. Reflect these choices in the tool cost and tool life inputs so the calculator matches your real usage."
                />
                <FAQItem
                  question="What's the difference between CNC milling and turning costs?"
                  answer="Turning is typically well-suited for cylindrical parts and can achieve high material removal rates when most features are rotational. Milling is more flexible for prismatic parts and complex 3D geometries. For many jobs, a combination of milling and turning (or mill-turn platforms) is appropriate. Rather than assuming one is always cheaper, estimate realistic times for each approach and compare the resulting costs with this calculator."
                />
                <FAQItem
                  question="How do I account for scrap rate in my estimates?"
                  answer="Scrap and rework rates depend on part complexity, process stability, and inspection strategy. One common way to reflect scrap in pricing is to divide your expected unit cost by the yield you typically achieve on similar work, so that the price covers both good parts and unavoidable losses. You can also add extra machining or inspection time into the inputs when you know a job will have a steeper learning curve or tighter requirements."
                />
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Calculators</h2>
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
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
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
