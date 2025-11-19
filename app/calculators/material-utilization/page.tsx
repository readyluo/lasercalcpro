'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Calculator, RotateCcw, DollarSign, Package, TrendingUp, Info } from 'lucide-react';
import {
  generateCalculatorHowToSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { saveCalculationToAPI } from '@/lib/utils/api-client';
import { ExportButton } from '@/components/calculators/ExportButton';

export default function MaterialUtilizationPage() {
  const [result, setResult] = useState<MaterialUtilizationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
      answer:
        'There is no single utilization percentage that fits every shop. Higher utilization generally means less waste, but acceptable levels depend on your parts, materials, nesting approach, and pricing. Use this calculator to compare different layouts, sheet sizes, and rotation settings against your own historical performance.',
    },
    {
      question: 'Should I allow 90-degree rotation?',
      answer:
        'Allowing 90-degree rotation often opens up more layout options and can improve utilization in many cases. However, you should still consider grain direction, mechanical properties, and appearance requirements. Enable or disable rotation here according to your design rules, then compare the resulting utilization and waste in the calculator.',
    },
    {
      question: 'How do I reduce material waste?',
      answer:
        'Practical approaches include using nesting tools, allowing rotation where your design permits, batching similar parts, choosing reasonable edge margins and spacing, planning to reuse remnants for future jobs, and aligning sheet sizes with common part families. This calculator helps you see how those decisions change utilization, waste, and material cost for your own work.',
    },
    {
      question: 'Does this calculator account for common line cutting?',
      answer:
        'No. This tool assumes each part is cut independently as a rectangle with its full perimeter and a gap to the next part. In production, professional CAM systems can use common line cutting so adjacent parts share edges, reducing total cutting length and gas use by roughly 15–30% on suitable jobs. The utilization percentage shown here is still valid for material planning, but actual cutting time and consumable usage may be lower than a simple perimeter-based estimate would suggest.',
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
  const softwareSchema = generateSoftwareApplicationSchema('Material Utilization Calculator');

  const onSubmit = async (data: MaterialUtilizationInput) => {
    setIsCalculating(true);

    try {
      const availableLength = data.sheetLength - 2 * data.edgeMargin;
      const availableWidth = data.sheetWidth - 2 * data.edgeMargin;
      const effectivePartLength = data.partLength + data.kerf + data.partSpacing;
      const effectivePartWidth = data.partWidth + data.kerf + data.partSpacing;

      const fitsNormally =
        availableLength >= effectivePartLength && availableWidth >= effectivePartWidth;
      const fitsRotated =
        data.allowRotation &&
        availableLength >= effectivePartWidth &&
        availableWidth >= effectivePartLength;

      if (!fitsNormally && !fitsRotated) {
        setFormError(
          'With the current sheet size, margins, kerf, and spacing, this part does not fit on the sheet. Adjust part or sheet dimensions, spacing, or margins and try again.'
        );
        setResult(null);
        return;
      }

      setFormError(null);

      const calculationResult = calculateMaterialUtilization(data);
      setResult(calculationResult);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      const saveResult = await saveCalculationToAPI({
        tool_type: 'material-utilization',
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
      <SchemaMarkup schema={softwareSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* When to use this calculator */}
          <div className="mb-6 card bg-blue-50 border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">When to Use This Calculator</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900">✓ Best for:</p>
                    <ul className="ml-6 mt-1 list-disc space-y-1">
                      <li>Quick estimates for rectangular or near-rectangular parts</li>
                      <li>Comparing different sheet sizes before ordering material</li>
                      <li>Evaluating whether batch sizes justify custom nesting work</li>
                      <li>Teaching nesting concepts to new estimators or operators</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">✗ Not ideal for:</p>
                    <ul className="ml-6 mt-1 list-disc space-y-1">
                      <li>Complex shapes (circles, brackets, irregular contours)</li>
                      <li>Production optimization with many mixed part numbers</li>
                      <li>Replacing professional CAM / true-shape nesting software</li>
                    </ul>
                  </div>
                  <p className="pt-2 mt-2 border-t border-blue-200 text-xs text-gray-600">
                    <strong>Upgrade path:</strong> If you regularly run complex nests or need to push utilization beyond ~80%,
                    use this tool for rough planning, then rely on professional nesting software (e.g., SigmaNEST, ProNest) for
                    final layouts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Header - Compact */}
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Material Utilization Calculator
            </h1>
            <p className="text-base text-gray-600">
              Optimize sheet material usage and minimize waste with nesting analysis.
            </p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-900">
              <Info className="mr-2 inline h-4 w-4" />
              <strong>Simplified rectangular nesting:</strong> This calculator treats parts as simple rectangles arranged in a
              grid. Real utilization depends on true part shapes, advanced nesting algorithms (true-shape, common-line
              cutting), and programmer skill.
            </p>
            <p className="mt-2 text-xs text-amber-800">
              <strong>Typical gap from reality:</strong> It is common to see this model report 70–75% utilization where a tuned
              CAM system can reach 80–85% on the same mix of parts. Use this tool for quick comparisons and planning, and rely
              on your nesting software for final production programs.
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
                        <span className="text-xs text-gray-500">
                          {allowRotation
                            ? 'Rotation enabled (ignores grain direction)'
                            : 'Rotation disabled (grain-sensitive)'}
                        </span>
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
                  {formError && (
                    <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {formError}
                    </p>
                  )}

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
                    <div className="mt-4 text-sm text-gray-600 bg-blue-50 rounded p-3">
                      <p className="font-semibold text-gray-900 mb-1">📊 Visualization notes</p>
                      <ul className="space-y-1 ml-4 list-disc">
                        <li>Green areas represent placed parts on the sheet.</li>
                        <li>Light background area is unused material (potential scrap).</li>
                        <li>This is a rectangular approximation; real nests for complex shapes may look very different.</li>
                        <li>Professional CAM can often gain an extra 5–15% utilization on complex parts.</li>
                      </ul>
                    </div>
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

                  {/* Scrap management hint */}
                  {result.wasteWeight > 0 && (
                    <div className="card border-l-4 border-green-500 bg-green-50">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="h-5 w-5 text-green-600" />
                        Scrap Management Opportunity
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>
                          This job generates <strong>{result.wasteWeight.toFixed(2)} kg</strong> of scrap material
                          {' '}(<strong>${result.wasteCost.toFixed(2)}</strong> cost before scrap value).
                        </p>
                        <p className="text-xs text-gray-600">
                          Consider tracking large, clean remnants as inventory for future small parts, and sending the rest to
                          recycling. Improving utilization by even 2–3% on recurring jobs can add up to significant annual
                          savings.
                        </p>
                      </div>
                    </div>
                  )}

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
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <ExportButton
                      title="Material Utilization Report"
                      calculationType="Material Utilization"
                      inputData={watch()}
                      results={{
                        'Utilization (%)': result.utilizationRate,
                        'Waste (%)': result.wasteRate,
                        'Parts Per Sheet': result.partsPerSheet,
                        'Sheets Required': result.sheetsRequired,
                        'Sheet Area (mm^2)': result.sheetArea,
                        'Used Area (mm^2)': result.usedArea,
                        'Waste Area (mm^2)': result.wasteArea,
                        'Sheet Weight (kg)': result.sheetWeight,
                        'Used Weight (kg)': result.usedWeight,
                        'Waste Weight (kg)': result.wasteWeight,
                        'Total Material Cost': result.totalMaterialCost,
                        'Material Cost Per Part': result.materialCostPerPart,
                        'Waste Cost': result.wasteCost,
                        'Scrap Value': result.scrapValue,
                        'Net Material Cost': result.netMaterialCost,
                      }}
                      recommendations={result.recommendations.map(r => `${r.title}: ${r.description}`)}
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

          {/* Best practices */}
          <div className="mt-8">
            <div className="card bg-gradient-to-br from-green-50 to-blue-50">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Material Utilization Best Practices</h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="rounded bg-white/70 p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">1. Plan around common sheet sizes</h3>
                  <p>
                    Where possible, design part families to fit standard sheet sizes (for example 4×8 ft, 5×10 ft, 6×12 ft)
                    so you benefit from better availability and pricing. Use this calculator to see how utilization changes
                    if you switch between common sheet dimensions.
                  </p>
                </div>
                <div className="rounded bg-white/70 p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">2. Group similar parts together</h3>
                  <p>
                    Nest parts of the same material and thickness together instead of mixing many different jobs on one
                    sheet. Consistent part geometry and spacing usually produce higher utilization and simpler cutting
                    programs.
                  </p>
                </div>
                <div className="rounded bg-white/70 p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">3. Track large remnants as inventory</h3>
                  <p>
                    For large, clean remnants, record the material, thickness, and approximate size so they can be reused
                    on future small-part jobs. Improving effective utilization by just a few percentage points on recurring
                    work can add up to significant annual savings.
                  </p>
                </div>
              </div>
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
