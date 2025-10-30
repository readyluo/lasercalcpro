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
        </div>
      </main>
      <Footer />
    </>
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

