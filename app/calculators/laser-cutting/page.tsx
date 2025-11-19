'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  generateCalculatorHowToSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo/schema';
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
import { Calculator, RotateCcw, TrendingUp, Zap, DollarSign, Clock, Info } from 'lucide-react';
import { ExportButton } from '@/components/calculators/ExportButton';
import { saveCalculationToAPI } from '@/lib/utils/api-client';
export default function LaserCuttingCalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = React.useState<LaserCuttingResult | null>(null);
  const [isCalculating, setIsCalculating] = React.useState(false);

  // SEO structured data
  const howToSchema = generateCalculatorHowToSchema(
    'Laser Cutting Cost Calculator',
    'Estimate laser cutting costs including material, power, labor, and gas components based on your input data',
    [
      { name: 'Select Material Type', text: 'Choose your material type (steel, aluminum, copper, etc.)' },
      { name: 'Enter Dimensions', text: 'Input material thickness, cutting length, and part geometry' },
      { name: 'Set Equipment Parameters', text: 'Specify laser power and operating costs' },
      { name: 'Calculate Costs', text: 'Get detailed cost breakdown and recommendations' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'How accurate is the laser cutting cost calculator?',
      answer:
        'This calculator uses simplified cost formulas together with your input data to provide approximate estimates. Actual costs vary with your equipment, process, and local rates, so always compare results with your own production data.',
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

  const softwareSchema = generateSoftwareApplicationSchema('Laser Cutting Cost Calculator');

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

  const thickness = watch('thickness');
  const materialUtilization = watch('materialUtilization');

  const onSubmit = async (data: LaserCuttingInput) => {
    setIsCalculating(true);

    try {
      const calculationResult = calculateLaserCutting(data);
      setResult(calculationResult);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      const saveResult = await saveCalculationToAPI({
        tool_type: 'laser-cutting',
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
      <SchemaMarkup schema={softwareSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs />

          {/* Compact Header */}
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {t.laserCutting.title}
            </h1>
            <p className="text-sm text-gray-600">
              {t.laserCutting.description}
              <span className="ml-2 text-xs text-amber-600">⚠️ Estimates only - verify against your production data</span>
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
                        helperText="Material thickness in millimeters. Typical fiber range: ~0.5–25 mm; verify your machine limits."
                        required
                      />
                      {thickness !== undefined && thickness > 25 && (
                        <p className="mt-1 text-xs text-amber-600">
                          ⚠️ Thickness above ~25 mm can be very slow or infeasible on many laser systems. Double-check your
                          equipment capability and parameter tables for this material and thickness.
                        </p>
                      )}

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

                  {/* Part Geometry & Utilization */}
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Part Geometry & Utilization</h3>
                      <span className="text-sm text-gray-500">Used to calculate sheet mass</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        {...register('partLength', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.laserCutting.fields.partLength}
                        error={errors.partLength?.message}
                        helperText="Longest dimension of a single part"
                        required
                      />
                      <Input
                        {...register('partWidth', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.laserCutting.fields.partWidth}
                        error={errors.partWidth?.message}
                        helperText="Second dimension of a single part"
                        required
                      />
                    </div>
                    <Input
                      {...register('materialUtilization', { valueAsNumber: true })}
                      type="number"
                      step="0.01"
                      min={0.1}
                      max={1}
                      label={t.laserCutting.fields.materialUtilization}
                      error={errors.materialUtilization?.message}
                      helperText="Enter as decimal (0.85 = 85% sheet usage, including scrap)"
                    />
                    <div className="mt-2 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                      More realistic geometry and utilization inputs help the material cost estimate reflect the full sheet, not just kerf waste.
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
                    <h2 className="mb-6 text-3xl font-bold">Cost Summary</h2>

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
                      <p className="mt-1 ml-6 text-xs text-gray-500">
                        Based on a default assumption of ~$150k equipment cost, 10-year life, and 2000 operating hours per
                        year. Your actual ownership cost may differ.
                      </p>
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
                      <MetricCard
                        icon={<Info className="h-6 w-6" />}
                        label="Material Weight"
                        value={`${result.materialWeight.toFixed(2)} kg`}
                      />
                      <MetricCard
                        icon={<TrendingUp className="h-6 w-6" />}
                        label="Material Utilization"
                        value={`${(((materialUtilization ?? 0.85) * 100)).toFixed(0)}%`}
                      />
                    </div>
                  </div>

                  {/* Quick sanity check */}
                  <div className="card border-l-4 border-purple-500 bg-purple-50">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Info className="h-5 w-5 text-purple-600" />
                      Quick sanity check
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      {result.totalCost > 0 && result.materialCost / result.totalCost > 0.6 ? (
                        <p className="flex items-start gap-2 text-xs">
                          <span className="text-amber-600">⚠️</span>
                          <span>
                            Material is about
                            {' '}
                            {((result.materialCost / result.totalCost) * 100).toFixed(0)}% of the modeled total. This is
                            common for expensive alloys or high utilization, but if it surprises you, double-check material
                            price, sheet size, and utilization assumptions.
                          </span>
                        </p>
                      ) : (
                        <p className="flex items-start gap-2 text-xs">
                          <span className="text-green-600">✓</span>
                          <span>
                            Material share of total cost looks within a typical range for many jobs. Still compare against
                            your accounting data for similar parts.
                          </span>
                        </p>
                      )}

                      {result.costPerMeter > 15 ? (
                        <p className="flex items-start gap-2 text-xs">
                          <span className="text-amber-600">⚠️</span>
                          <span>
                            Modeled cost per meter (${result.costPerMeter.toFixed(2)}) is on the high side. For thin mild
                            steel with good nesting, many shops see lower values; for thick stainless or copper, higher
                            numbers can be normal. Recheck thickness, material, and rate inputs if this seems off.
                          </span>
                        </p>
                      ) : (
                        <p className="flex items-start gap-2 text-xs">
                          <span className="text-green-600">✓</span>
                          <span>
                            Cost per meter (${result.costPerMeter.toFixed(2)}) is within a moderate range. Validate it
                            against one or two real jobs as a spot-check.
                          </span>
                        </p>
                      )}

                      {materialUtilization !== undefined && materialUtilization < 0.65 && (
                        <p className="flex items-start gap-2 text-xs">
                          <span className="text-amber-600">⚠️</span>
                          <span>
                            Material utilization ({(materialUtilization * 100).toFixed(0)}%) is below the 70–75% often seen in
                            everyday work. That can be correct for tricky shapes or very small batches; otherwise, revisit
                            nesting and part grouping.
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Laser Cutting Cost Report"
                        calculationType="Laser Cutting"
                        inputData={{
                          materialType: watch('materialType'),
                          thickness: watch('thickness'),
                          partLength: watch('partLength'),
                          partWidth: watch('partWidth'),
                          materialUtilization: watch('materialUtilization'),
                          cuttingLength: watch('cuttingLength'),
                          laserPower: watch('laserPower'),
                          electricityRate: watch('electricityRate'),
                          laborRate: watch('laborRate'),
                          materialPrice: watch('materialPrice'),
                          gasConsumption: watch('gasConsumption'),
                          gasPrice: watch('gasPrice'),
                        }}
                        results={{
                          'Total Cost': result.totalCost,
                          'Suggested Price (30% markup)': result.suggestedPrice,
                          'Profit Margin': result.profitMargin,
                          'Material Cost': result.materialCost,
                          'Power Cost': result.powerCost,
                          'Labor Cost': result.laborCost,
                          'Gas Cost': result.gasCost,
                          'Equipment Depreciation': result.depreciation,
                          'Maintenance Cost': result.maintenanceCost,
                          'Total Time': `${(result.totalTime * 60).toFixed(1)} minutes`,
                          'Cutting Time': `${(result.cuttingTime * 60).toFixed(1)} minutes`,
                          'Cost per Meter': `$${result.costPerMeter}`,
                          'Cost per Minute': `$${result.costPerMinute}`,
                          'Energy Efficiency': result.energyEfficiency,
                          'Material Weight (kg)': result.materialWeight,
                          'Material Volume (cm^3)': result.materialVolume,
                        }}
                        recommendations={[
                          result.energyEfficiency === 'Poor' 
                            ? 'Consider using a more energy-efficient laser or optimizing cutting parameters to reduce energy consumption.'
                            : 'In this estimate, energy use per meter is relatively low under the current assumptions; compare it with your own measurements.',
                          result.materialCost > result.totalCost * 0.6
                            ? 'In this estimate, material cost represents more than 60% of the modeled total. You may want to review material pricing, nesting, scrap, and specification choices if that does not match your expectations.'
                            : 'In this estimate, material cost is a smaller share of the modeled total; check that this aligns with your accounting data and typical jobs.',
                          result.costPerMeter > 10
                            ? 'In this scenario, the modeled cost per meter is on the higher side for the assumptions entered. Consider exploring changes to cutting speed, batch sizes, or labor and overhead assumptions and compare against your actual job data.'
                            : 'In this scenario, the modeled cost per meter appears moderate; validate it against your historical jobs and target pricing.',
                          'Always verify calculations against actual production data for your specific equipment and conditions.',
                        ]}
                      />
                    </div>
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

          {/* How to Use Section */}
          <div className="mt-16">
            <div className="card">
              <div className="mb-6 flex items-start gap-3">
                <div className="rounded-full bg-primary-100 p-2">
                  <Info className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">How to Use This Calculator</h2>
                  <p className="mt-2 text-gray-600">
                    Follow these steps to get structured cost estimates for your laser cutting projects based on your own inputs
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Step 1: Material Selection</h3>
                  <p className="text-gray-600">
                    Choose your material type and enter the thickness. Different materials have different cutting speeds 
                    and power requirements. Our calculator accounts for material density, reflectivity, and cutting characteristics.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Step 2: Cutting Parameters</h3>
                  <p className="text-gray-600">
                    Enter the total cutting length and your laser power. The cutting length should include all cuts, holes, 
                    and contours. Higher power lasers cut faster but consume more energy.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Step 3: Cost Factors</h3>
                  <p className="text-gray-600">
                    Input your local electricity rate, labor cost, material price, and assist gas consumption. These values 
                    directly affect your total cost. Use up-to-date rates so the estimates better reflect your current situation.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Step 4: Review Results</h3>
                  <p className="text-gray-600">
                    Get detailed cost breakdown including material, energy, labor, and equipment costs. Use the suggested 
                    retail price as a starting point for your quotations. Export PDF report for professional presentations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="How accurate is this calculator?"
                  answer="This calculator uses simplified cost formulas and your input data to estimate costs. Actual results depend on your equipment, parameters, material quality, and local prices, so treat the output as a guide and validate it against your own production data."
                />
                <FAQItem
                  question="What cutting length should I enter?"
                  answer="Enter the total length of all cutting paths including outer contours, inner holes, and details. Measure in millimeters. For complex parts, use your CAD software&rsquo;s &quot;measure length&quot; function on the cutting path."
                />
                <FAQItem
                  question="How is equipment depreciation calculated?"
                  answer="Depreciation in this calculator is estimated from an assumed equipment cost ($150,000), lifespan (10 years), and annual working hours (2000 hours). This approximates an hourly ownership cost that is added on top of material, energy, and labor. Your actual equipment cost structure may differ from these defaults."
                />
                <FAQItem
                  question="What assist gas should I use?"
                  answer="Oxygen (O2) is commonly used for mild steel when cutting speed is the priority. Nitrogen (N2) is often used for stainless steel and aluminum where clean, oxide-free edges are required. Compressed air can be an option for some thinner materials when edge quality requirements allow. Gas consumption depends on nozzle size, pressure, and machine setup, so rely on your own process data when entering gas-related values in the calculator."
                />
                <FAQItem
                  question="Why is my cost per meter high?"
                  answer="High cost per meter can result from: thick materials (slower cutting), expensive materials, high labor rates, or inefficient parameters. Consider optimizing cutting speed, batch production to reduce setup costs, or reviewing your overhead expenses."
                />
              </div>
            </div>
          </div>

          {/* Material Selection Guide */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Material Selection Guide</h2>
              <p className="mb-6 text-gray-700">
                Different materials require different cutting parameters and affect overall costs in different ways.
                The calculator uses your selected material type together with your own price inputs to estimate cost.
                For up-to-date material pricing, see our{' '}
                <Link href="/calculators/quick-reference/material-costs" className="text-primary-600 hover:underline font-semibold">
                  Material Costs Reference
                </Link>.
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Mild Steel (Carbon Steel)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> General fabrication, structural parts, brackets</p>
                    <p><strong>Cutting characteristics:</strong> Generally cuts quickly and economically with fiber lasers.</p>
                    <p><strong>Assist gas:</strong> Often cut with oxygen for speed or nitrogen for cleaner edges.</p>
                    <p><strong>Thickness range:</strong> Commonly used from thin sheet to medium plate thicknesses.</p>
                    <p><strong>Cost consideration:</strong> Often one of the lower-cost sheet metals; enter your current purchase price in the calculator.</p>
                  </div>
                </div>

                <div className="border-l-4 border-gray-500 bg-gray-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Stainless Steel 304/316</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> Food equipment, medical devices, corrosion-resistant parts</p>
                    <p><strong>Cutting characteristics:</strong> Typically slower to cut than mild steel and more sensitive to parameter settings.</p>
                    <p><strong>Assist gas:</strong> Commonly cut with nitrogen to achieve oxide-free edges.</p>
                    <p><strong>Thickness range:</strong> Used across a wide range of sheet and plate gauges.</p>
                    <p><strong>Cost consideration:</strong> Usually more expensive than mild steel; use your current supplier pricing when entering material price.</p>
                  </div>
                </div>

                <div className="border-l-4 border-gray-400 bg-gray-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Aluminum (5052, 6061)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> Lightweight parts, aerospace, transportation</p>
                    <p><strong>Cutting characteristics:</strong> Can be cut quickly but requires appropriate equipment because of reflectivity.</p>
                    <p><strong>Assist gas:</strong> Often cut with nitrogen; compressed air may be suitable for some thin gauges.</p>
                    <p><strong>Thickness range:</strong> Common in thin to medium sheet applications.</p>
                    <p><strong>Cost consideration:</strong> Material is lighter than steel for the same volume; use your current price per kg in the calculator.</p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Copper & Brass</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> Electrical components, decorative parts</p>
                    <p><strong>Cutting characteristics:</strong> More challenging to cut due to high thermal conductivity and reflectivity.</p>
                    <p><strong>Assist gas:</strong> Often cut with nitrogen or compressed air depending on quality requirements.</p>
                    <p><strong>Thickness range:</strong> Typically used in thinner gauges for laser cutting applications.</p>
                    <p><strong>Cost consideration:</strong> Generally higher-cost materials; use your actual purchase price to reflect cost accurately in the calculator.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Optimization Strategies */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Cost Optimization Strategies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">1</span>
                    Optimize Nesting and Material Utilization
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Better nesting layouts can significantly increase how much of each sheet becomes usable parts and reduce scrap.
                    Use the material utilization input in this calculator to compare different nesting approaches and see how
                    changes in utilization affect your total material cost.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">2</span>
                    Batch Similar Jobs Together
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Setup and loading time is usually shared across all parts in a batch. When similar parts are produced together,
                    the setup time per piece is reduced and cost per part decreases. Use this calculator together with your
                    typical batch sizes to understand how setup time influences your overall job cost.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">3</span>
                    Choose the Right Assist Gas
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Different assist gases influence both cut quality and operating cost. Oxygen is often used when cutting speed
                    on carbon steel is a priority, while nitrogen is preferred when clean, oxide-free edges are required.
                    Compressed air can be suitable for some applications when edge quality requirements permit. Use your own
                    gas consumption and price data in the calculator to compare scenarios.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">4</span>
                    Optimize Cutting Parameters
                  </h3>
                  <p className="ml-10 text-gray-700">
                    There is always a trade-off between speed, edge quality, and process stability. Cutting too slowly wastes
                    time and energy, while cutting too fast can create dross and require secondary operations. Work with
                    your machine supplier's recommended parameters and then use this calculator to understand how changes in
                    cutting speed impact total cost.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">5</span>
                    Minimize Piercing Operations
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Piercing adds extra time and wear to the process, especially on thicker materials and parts with many holes.
                    Where design requirements allow, reducing internal features and pierce points can shorten total processing
                    time and lower cost. Reflect this in the cutting length and setup assumptions you use in the calculator.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Benchmarks */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Industry Benchmarks & Standards</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Cutting Speed Benchmarks (Fiber Laser)</h3>
                  <p className="text-sm text-gray-700">
                    Typical cutting speeds depend strongly on material, thickness, laser power, assist gas, and machine setup.
                    Always use your own proven parameter tables or machine supplier data when estimating processing time.
                    This calculator combines your cutting length and power assumptions with a simplified speed model to
                    estimate cutting time.
                  </p>
                  <p className="mt-3 text-xs text-gray-600">
                    For additional example ranges, refer to your machine documentation or the{' '}
                    <Link href="/calculators/quick-reference/cutting-speeds" className="text-primary-600 hover:underline font-semibold">
                      Cutting Speeds Reference
                    </Link>
                    .
                  </p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Typical Cost Breakdown</h3>
                  <p className="text-sm text-gray-700">
                    The share of total cost coming from material, labor, energy, depreciation, consumables, and overhead
                    varies widely from one shop to another. This calculator breaks these components out separately so you can
                    compare its output with your own accounting data instead of relying on generic percentages.
                  </p>
                  <p className="mt-3 text-xs text-gray-600">
                    Use the cost breakdown on this page together with your internal reports, and refer to related tools such as{' '}
                    <Link href="/calculators/quick-reference/assist-gas" className="text-primary-600 hover:underline font-semibold">
                      Assist Gas Costs
                    </Link>
                    {' '}and{' '}
                    <Link href="/calculators/quick-reference/power-consumption" className="text-primary-600 hover:underline font-semibold">
                      Power Consumption
                    </Link>
                    {' '}when you need more detailed references.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Machine Utilization Targets</h3>
                  <p className="text-sm text-gray-700">
                    Many shops track how much of their available time is spent cutting, setting up and loading parts,
                    programming, performing maintenance, or sitting idle. The time outputs from this calculator can support
                    those analyses, but actual utilization targets should come from your own production planning and KPIs.
                  </p>
                  <p className="mt-3 text-xs text-gray-600">Use your shop's utilization data and goals when interpreting time-related results.</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Quality Standards</h3>
                  <p className="text-sm text-gray-700">
                    Edge roughness, kerf width, perpendicularity, and dimensional accuracy are defined by customer drawings
                    and relevant standards (for example, ISO 9013). This calculator focuses on cost and time and does not
                    evaluate quality. Always confirm that your chosen cutting parameters meet required quality levels.
                  </p>
                  <p className="mt-3 text-xs text-gray-600">Refer to applicable standards and your quality documentation when setting requirements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced FAQ */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Advanced Questions</h2>
              <p className="text-gray-700">
                Topics such as detailed machine selection, outsourcing versus in-house production, gas supply economics, and
                long-term return on investment depend heavily on your specific situation and are not modeled in full detail
                by this calculator. Use the cost breakdown and time estimates on this page together with your own shop data
                or the dedicated calculators (for example, Energy Cost, ROI, or Cost Center tools) when you analyse those
                decisions.
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Calculators</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/calculators/material-utilization"
                className="card-hover group border-l-4 border-green-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Material Utilization
                </h3>
                <p className="text-sm text-gray-600">
                  Optimize your material layout to reduce waste and lower material costs
                </p>
              </Link>

              <Link
                href="/calculators/energy"
                className="card-hover group border-l-4 border-yellow-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Energy Cost Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate detailed power consumption and identify energy saving opportunities
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
                  Evaluate if purchasing laser cutting equipment is financially viable for your business
                </p>
              </Link>
            </div>

            <h3 className="mb-4 mt-8 text-xl font-bold text-gray-900">Quick Reference Guides</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/calculators/quick-reference/cutting-speeds"
                className="card-hover group border-l-4 border-yellow-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Cutting Speeds Reference
                </h3>
                <p className="text-sm text-gray-600">
                  Benchmark speeds for all materials and thicknesses
                </p>
              </Link>

              <Link
                href="/calculators/quick-reference/material-costs"
                className="card-hover group border-l-4 border-blue-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Material Costs Reference
                </h3>
                <p className="text-sm text-gray-600">
                  Current pricing for steel, stainless, aluminum and more
                </p>
              </Link>

              <Link
                href="/calculators/quick-reference/assist-gas"
                className="card-hover group border-l-4 border-green-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Assist Gas Guide
                </h3>
                <p className="text-sm text-gray-600">
                  O2 vs N2 selection and cost optimization
                </p>
              </Link>
            </div>
          </div>

          {/* When to use this calculator - Moved to bottom */}
          <div className="mt-12 rounded-2xl bg-blue-50 border-l-4 border-blue-500 px-6 py-4">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">When to use this laser cutting calculator</h2>
            <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900 mb-2">✓ Best suited for:</p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>Sheet and plate cutting with typical fiber or CO₂ laser systems</li>
                  <li>Order-of-magnitude cost estimates using your own rates and material prices</li>
                  <li>Comparing material choices, thicknesses, and utilization scenarios</li>
                  <li>Explaining cost structure (material vs power vs labor) to internal teams or customers</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">✗ Not ideal for:</p>
                <ul className="ml-5 list-disc space-y-1.5">
                  <li>Highly optimized production quoting based on detailed CAM time studies</li>
                  <li>Jobs dominated by setup, fixturing, or complex secondary operations</li>
                  <li>Very thick plate or exotic alloys beyond your proven parameter tables</li>
                  <li>Guaranteeing margins without first validating against your own production data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Disclaimer - Moved to bottom */}
          <div className="mt-6 border-l-4 border-amber-500 bg-amber-50 px-6 py-4">
            <h3 className="mb-2 text-base font-semibold text-amber-900">
              <Info className="mr-2 inline h-5 w-5" />
              Important: These are estimates only
            </h3>
            <p className="text-sm text-amber-900 mb-2">
              This calculator combines your own inputs with simplified empirical models and a
              few default assumptions (e.g. typical equipment cost, lifespan, auxiliary power). Actual cutting speeds, gas
              usage, and margins depend strongly on your machine, parameters, nesting strategy, and local rates.
            </p>
            <p className="text-sm text-amber-800">
              Use these results as a structured starting point, then compare them against your real jobs and CAM estimates
              before final quoting—especially for very thick material, unusual alloys, or tight-tolerance parts.
            </p>
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
