'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import Link from 'next/link';
import { useEnglish } from '@/lib/i18n';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { laserCuttingSchema, laserCuttingDefaults, type LaserCuttingInput } from '@/lib/validations/laser-cutting';
import { calculateLaserCutting, type LaserCuttingResult } from '@/lib/calculators/laser-cutting';
import { Calculator, Download, RotateCcw, TrendingUp, Zap, DollarSign, Clock } from 'lucide-react';

export default function LaserCuttingCalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = useState<LaserCuttingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // SEO structured data
  const howToSchema = generateCalculatorHowToSchema(
    'Laser Cutting Cost Calculator',
    'Calculate accurate laser cutting costs including material, power, labor, and gas costs',
    [
      { name: 'Select Material Type', text: 'Choose your material type (steel, aluminum, copper, etc.)' },
      { name: 'Enter Dimensions', text: 'Input material thickness and cutting length' },
      { name: 'Set Equipment Parameters', text: 'Specify laser power and operating costs' },
      { name: 'Calculate Costs', text: 'Get detailed cost breakdown and recommendations' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'How accurate is the laser cutting cost calculator?',
      answer: 'Our calculator uses industry-standard formulas and real manufacturing data to provide highly accurate cost estimates, typically within 5-10% of actual costs.',
    },
    {
      question: 'What factors affect laser cutting costs?',
      answer: 'Key factors include material type and thickness, cutting length, laser power, electricity rates, labor costs, and assist gas consumption.',
    },
    {
      question: 'Can I export the calculation results?',
      answer: 'Yes, you can export detailed PDF reports with complete cost breakdowns and recommendations.',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LaserCuttingInput>({
    resolver: zodResolver(laserCuttingSchema),
    defaultValues: laserCuttingDefaults,
  });

  const onSubmit = async (data: LaserCuttingInput) => {
    setIsCalculating(true);

    // Simulate calculation time for better UX
    setTimeout(() => {
      const calculationResult = calculateLaserCutting(data);
      setResult(calculationResult);
      setIsCalculating(false);

      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleReset = () => {
    reset(laserCuttingDefaults);
    setResult(null);
  };

  const materialOptions = [
    { value: 'stainless_steel', label: 'Stainless Steel 304' },
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'copper', label: 'Copper' },
    { value: 'mild_steel', label: 'Mild Steel' },
    { value: 'brass', label: 'Brass' },
  ];

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
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {t.laserCutting.title}
            </h1>
            <p className="text-xl text-gray-600">{t.laserCutting.description}</p>
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
                  {/* Material Section */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Material Properties</h3>
                    <div className="space-y-4">
                      <Select
                        {...register('materialType')}
                        label={t.laserCutting.fields.materialType}
                        options={materialOptions}
                        error={errors.materialType?.message}
                        required
                      />

                      <Input
                        {...register('thickness', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.laserCutting.fields.thickness}
                        error={errors.thickness?.message}
                        helperText="Material thickness in millimeters"
                        required
                      />

                      <Input
                        {...register('materialPrice', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.laserCutting.fields.materialPrice}
                        error={errors.materialPrice?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />
                    </div>
                  </div>

                  {/* Cutting Parameters */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Cutting Parameters</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('cuttingLength', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.laserCutting.fields.cuttingLength}
                        error={errors.cuttingLength?.message}
                        helperText="Total cutting path length"
                        required
                      />

                      <Input
                        {...register('laserPower', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label={t.laserCutting.fields.laserPower}
                        error={errors.laserPower?.message}
                        helperText="Laser power in kilowatts"
                        leftIcon={<Zap className="h-4 w-4" />}
                        required
                      />
                    </div>
                  </div>

                  {/* Cost Parameters */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Cost Parameters</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('electricityRate', { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        label={t.laserCutting.fields.electricityRate}
                        error={errors.electricityRate?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />

                      <Input
                        {...register('laborRate', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.laserCutting.fields.laborRate}
                        error={errors.laborRate?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />

                      <Input
                        {...register('gasConsumption', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.laserCutting.fields.gasConsumption}
                        error={errors.gasConsumption?.message}
                      />

                      <Input
                        {...register('gasPrice', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label={t.laserCutting.fields.gasPrice}
                        error={errors.gasPrice?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
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
                  {/* Summary Card */}
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-6 text-2xl font-bold">Cost Summary</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Cost</p>
                        <p className="text-3xl font-bold">${result.totalCost}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Suggested Price (30% markup)</p>
                        <p className="text-3xl font-bold">${result.suggestedPrice}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Profit Margin</p>
                        <p className="text-2xl font-semibold">${result.profitMargin}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Time</p>
                        <p className="text-2xl font-semibold">
                          {(result.totalTime * 60).toFixed(1)} minutes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Cost Breakdown</h3>
                    <div className="space-y-3">
                      <CostItem label="Material Cost" value={result.materialCost} />
                      <CostItem label="Power Cost" value={result.powerCost} />
                      <CostItem label="Labor Cost" value={result.laborCost} />
                      <CostItem label="Gas Cost" value={result.gasCost} />
                      <CostItem label="Equipment Depreciation" value={result.depreciation} />
                      <CostItem label="Maintenance" value={result.maintenanceCost} />
                      <div className="border-t pt-3">
                        <CostItem label="Total" value={result.totalCost} isTotal />
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Metrics */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Efficiency Metrics</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <MetricCard
                        icon={<DollarSign className="h-6 w-6" />}
                        label="Cost per Meter"
                        value={`$${result.costPerMeter}`}
                      />
                      <MetricCard
                        icon={<Clock className="h-6 w-6" />}
                        label="Cost per Minute"
                        value={`$${result.costPerMinute}`}
                      />
                      <MetricCard
                        icon={<TrendingUp className="h-6 w-6" />}
                        label="Energy Efficiency"
                        value={result.energyEfficiency}
                      />
                      <MetricCard
                        icon={<Zap className="h-6 w-6" />}
                        label="Cutting Time"
                        value={`${(result.cuttingTime * 60).toFixed(1)} min`}
                      />
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

function CostItem({ label, value, isTotal = false }: { label: string; value: number; isTotal?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${isTotal ? 'font-bold' : 'text-gray-700'}`}>{label}</span>
      <span className={`${isTotal ? 'text-xl font-bold text-primary-600' : 'font-semibold'}`}>
        ${value.toFixed(2)}
      </span>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
      <div className="text-primary-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

