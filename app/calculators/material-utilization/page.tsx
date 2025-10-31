'use client';

import React, { useState } from 'react';
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
  materialUtilizationSchema,
  materialUtilizationDefaults,
  type MaterialUtilizationInput,
} from '@/lib/validations/material-utilization';
import {
  calculateMaterialUtilization,
  type MaterialUtilizationResult,
} from '@/lib/calculators/material-utilization';
import { NestingVisualization } from '@/components/calculators/NestingVisualization';
import {
  Calculator,
  Download,
  RotateCcw,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import Link from 'next/link';

export default function MaterialUtilizationPage() {
  const t = useEnglish();
  const [result, setResult] = useState<MaterialUtilizationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const howToSchema = generateCalculatorHowToSchema(
    'Material Utilization Calculator',
    'Optimize sheet material nesting to reduce waste and save costs',
    [
      { name: 'Enter Sheet Size', text: 'Input the dimensions of your standard sheet material' },
      { name: 'Define Part Size', text: 'Enter part dimensions and quantity needed' },
      { name: 'Set Parameters', text: 'Configure kerf, margins, spacing, and rotation options' },
      { name: 'Add Material Details', text: 'Select material type, thickness, and pricing' },
      { name: 'Calculate Nesting', text: 'Get utilization rate, layouts, and waste cost analysis' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'What is a good material utilization rate?',
      answer: '80%+ is excellent, 70-80% is good, 60-70% is acceptable, below 60% requires optimization. Industry average is 65-75% for manual nesting and 75-85% with software.',
    },
    {
      question: 'Should I allow 90-degree rotation?',
      answer: 'Yes, rotation typically improves utilization by 5-15%. However, consider material grain direction for stress-critical parts and aesthetic considerations for visible surfaces.',
    },
    {
      question: 'How do I reduce material waste?',
      answer: 'Use nesting software, allow rotation, batch similar parts, minimize edge margins, optimize part spacing, consider common remnants for smaller parts, and negotiate standard sheet sizes with suppliers.',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MaterialUtilizationInput>({
    resolver: zodResolver(materialUtilizationSchema),
    defaultValues: materialUtilizationDefaults,
  });

  const allowRotation = watch('allowRotation');

  const onSubmit = async (data: MaterialUtilizationInput) => {
    setIsCalculating(true);

    setTimeout(async () => {
      const calculationResult = calculateMaterialUtilization(data);
      setResult(calculationResult);
      setIsCalculating(false);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      // Save for analytics
      try {
        await fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolType: 'material-utilization',
            params: data,
            result: calculationResult,
          }),
        });
      } catch (error) {
        console.error('Failed to save calculation:', error);
      }
    }, 300);
  };

  const handleReset = () => {
    reset(materialUtilizationDefaults);
    setResult(null);
  };

  const materialOptions = [
    { value: 'steel', label: 'Steel' },
    { value: 'stainless_steel', label: 'Stainless Steel' },
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'copper', label: 'Copper' },
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
              Material Utilization Calculator
            </h1>
            <p className="text-xl text-gray-600">
              Optimize sheet material usage and minimize waste with nesting analysis. Check{' '}
              <Link href="/calculators/quick-reference/material-costs" className="text-primary-600 hover:underline font-semibold">
                Material Costs Reference
              </Link>
              {' '}for current pricing.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Nesting Parameters</h2>
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
                  {/* Sheet Dimensions */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Sheet Dimensions</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('sheetLength', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Sheet Length (mm)"
                        error={errors.sheetLength?.message}
                        required
                      />

                      <Input
                        {...register('sheetWidth', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Sheet Width (mm)"
                        error={errors.sheetWidth?.message}
                        required
                      />
                    </div>
                  </div>

                  {/* Part Dimensions */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Part Dimensions</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('partLength', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Part Length (mm)"
                        error={errors.partLength?.message}
                        required
                      />

                      <Input
                        {...register('partWidth', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Part Width (mm)"
                        error={errors.partWidth?.message}
                        required
                      />

                      <Input
                        {...register('quantity', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Quantity (parts)"
                        error={errors.quantity?.message}
                        leftIcon={<Package className="h-4 w-4" />}
                        required
                      />
                    </div>
                  </div>

                  {/* Cutting Parameters */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Cutting Parameters
                    </h3>
                    <div className="space-y-4">
                      <Input
                        {...register('kerf', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label="Kerf Width (mm)"
                        error={errors.kerf?.message}
                        helperText="Cutting path width"
                      />

                      <Input
                        {...register('edgeMargin', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Edge Margin (mm)"
                        error={errors.edgeMargin?.message}
                        helperText="Distance from sheet edge"
                      />

                      <Input
                        {...register('partSpacing', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label="Part Spacing (mm)"
                        error={errors.partSpacing?.message}
                        helperText="Gap between parts"
                      />

                      <div className="flex items-center gap-2">
                        <input
                          {...register('allowRotation')}
                          type="checkbox"
                          id="allowRotation"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                        />
                        <label htmlFor="allowRotation" className="text-sm font-medium text-gray-900">
                          Allow 90° rotation for better nesting
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Material */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Material & Costs
                    </h3>
                    <div className="space-y-4">
                      <Select
                        {...register('materialType')}
                        label="Material Type"
                        options={materialOptions}
                        error={errors.materialType?.message}
                        required
                      />

                      <Input
                        {...register('materialThickness', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label="Material Thickness (mm)"
                        error={errors.materialThickness?.message}
                        required
                      />

                      <Input
                        {...register('materialPricePerKg', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label="Material Price ($/kg)"
                        error={errors.materialPricePerKg?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                        required
                      />

                      <Input
                        {...register('scrapValuePerKg', { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        label="Scrap Value ($/kg)"
                        error={errors.scrapValuePerKg?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
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
                    {isCalculating ? 'Calculating...' : 'Calculate Utilization'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Summary */}
                  <div className={`card ${
                    result.utilizationRate >= 80 ? 'bg-gradient-to-br from-green-600 to-green-800' :
                    result.utilizationRate >= 70 ? 'bg-gradient-to-br from-yellow-600 to-yellow-800' :
                    'bg-gradient-to-br from-red-600 to-red-800'
                  } text-white`}>
                    <h2 className="mb-6 text-3xl font-bold">Utilization Summary</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm opacity-90">Utilization Rate</p>
                        <p className="text-4xl font-bold">{result.utilizationRate}%</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm opacity-90">Parts Per Sheet</p>
                        <p className="text-4xl font-bold">{result.partsPerSheet}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm opacity-90">Sheets Required</p>
                        <p className="text-2xl font-semibold">{result.sheetsRequired}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm opacity-90">Waste Rate</p>
                        <p className="text-2xl font-semibold">{result.wasteRate}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Visualization */}
                  <div className="card">
                    <NestingVisualization
                      sheetLength={watch('sheetLength')}
                      sheetWidth={watch('sheetWidth')}
                      layout={result.layout}
                    />
                  </div>

                  {/* Cost Analysis */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Cost Analysis</h3>
                    <div className="space-y-3">
                      <CostItem label="Total Material Cost" value={result.totalMaterialCost} />
                      <CostItem label="Waste Cost" value={result.wasteCost} isNegative />
                      <CostItem label="Scrap Value" value={result.scrapValue} isPositive />
                      <div className="border-t pt-3">
                        <CostItem label="Net Material Cost" value={result.netMaterialCost} isTotal />
                        <div className="mt-2 text-sm text-gray-600">
                          ${result.materialCostPerPart.toFixed(2)} per part
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Weights */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Material Weights</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Total Material</p>
                        <p className="text-lg font-semibold">{result.totalMaterialWeight.toFixed(2)} kg</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Used Material</p>
                        <p className="text-lg font-semibold text-green-600">{result.usedWeight.toFixed(2)} kg</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Waste Material</p>
                        <p className="text-lg font-semibold text-red-600">{result.wasteWeight.toFixed(2)} kg</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Sheet Weight</p>
                        <p className="text-lg font-semibold">{result.sheetWeight.toFixed(2)} kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Layouts */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Alternative Layouts</h3>
                    <div className="space-y-3">
                      {result.alternativeLayouts.map((alt, index) => (
                        <div key={index} className="rounded-lg border bg-gray-50 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{alt.description}</p>
                              <p className="text-sm text-gray-600">
                                {alt.partsPerSheet} parts per sheet
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-2xl font-bold ${
                                alt.utilizationRate >= 80 ? 'text-green-600' :
                                alt.utilizationRate >= 70 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {alt.utilizationRate}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="card">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <TrendingUp className="h-6 w-6 text-primary-600" />
                      Optimization Recommendations
                    </h3>
                    <div className="space-y-4">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className={`rounded-lg border-l-4 p-4 ${
                          rec.priority === 'high' ? 'border-red-500 bg-red-50' :
                          rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                          'border-blue-500 bg-blue-50'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                  rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                  {rec.priority.toUpperCase()}
                                </span>
                              </div>
                              <p className="mt-2 text-sm text-gray-700">{rec.description}</p>
                            </div>
                            {rec.potentialSavings > 0 && (
                              <div className="ml-4 text-right">
                                <p className="text-xs text-gray-500">Savings</p>
                                <p className="text-lg font-bold text-green-600">
                                  ${rec.potentialSavings.toFixed(2)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
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
                      Export Nesting Report
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
                  <Package className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">
                    Ready to Optimize Material Usage
                  </h3>
                  <p className="text-gray-500">
                    Enter your sheet and part dimensions to calculate optimal nesting
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
  isPositive = false,
  isNegative = false,
}: {
  label: string;
  value: number;
  isTotal?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${isTotal ? 'font-bold' : 'text-gray-700'}`}>{label}</span>
      <span className={`font-semibold ${
        isTotal ? 'text-xl text-primary-600' :
        isPositive ? 'text-green-600' :
        isNegative ? 'text-red-600' :
        ''
      }`}>
        {isPositive && '+'}${value.toFixed(2)}
      </span>
    </div>
  );
}









