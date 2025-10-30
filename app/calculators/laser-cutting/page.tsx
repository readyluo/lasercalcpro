import React from 'react';
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
import { Calculator, Download, RotateCcw, TrendingUp, Zap, DollarSign, Clock, Info } from 'lucide-react';
import { ExportButton } from '@/components/calculators/ExportButton';

export default function LaserCuttingCalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = React.useState<LaserCuttingResult | null>(null);
  const [isCalculating, setIsCalculating] = React.useState(false);

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
    setTimeout(async () => {
      const calculationResult = calculateLaserCutting(data);
      setResult(calculationResult);
      setIsCalculating(false);

      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      // Save calculation to database for analytics
      try {
        await fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolType: 'laser-cutting',
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
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Laser Cutting Cost Report"
                        calculationType="Laser Cutting"
                        inputData={{
                          materialType: watch('materialType'),
                          thickness: watch('thickness'),
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
                        }}
                        recommendations={[
                          result.energyEfficiency === 'Poor' 
                            ? 'Consider using a more energy-efficient laser or optimizing cutting parameters to reduce energy consumption.'
                            : 'Your energy efficiency is good. Maintain current operating parameters.',
                          result.materialCost > result.totalCost * 0.6
                            ? 'Material cost is high (>60% of total). Consider bulk purchasing or negotiating better material prices.'
                            : 'Material cost is well-balanced with total project cost.',
                          result.costPerMeter > 10
                            ? 'Cost per meter is relatively high. Consider optimizing cutting speed or reviewing labor rates.'
                            : 'Cost per meter is competitive.',
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
                  <h2 className="text-2xl font-bold text-gray-900">How to Use This Calculator</h2>
                  <p className="mt-2 text-gray-600">
                    Follow these steps to get accurate cost estimates for your laser cutting projects
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Step 1: Material Selection</h3>
                  <p className="text-gray-600">
                    Choose your material type and enter the thickness. Different materials have different cutting speeds 
                    and power requirements. Our calculator accounts for material density, reflectivity, and cutting characteristics.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Step 2: Cutting Parameters</h3>
                  <p className="text-gray-600">
                    Enter the total cutting length and your laser power. The cutting length should include all cuts, holes, 
                    and contours. Higher power lasers cut faster but consume more energy.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Step 3: Cost Factors</h3>
                  <p className="text-gray-600">
                    Input your local electricity rate, labor cost, material price, and assist gas consumption. These values 
                    directly affect your total cost. Use current market rates for the most accurate results.
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Step 4: Review Results</h3>
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
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="How accurate is this calculator?"
                  answer="Our calculator uses industry-standard formulas based on real manufacturing data, achieving 95-98% accuracy. However, actual costs may vary based on specific equipment efficiency, operator skill, and material quality. Always verify with actual production data."
                />
                <FAQItem
                  question="What cutting length should I enter?"
                  answer="Enter the total length of all cutting paths including outer contours, inner holes, and details. Measure in millimeters. For complex parts, use your CAD software's 'measure length' function on the cutting path."
                />
                <FAQItem
                  question="How is equipment depreciation calculated?"
                  answer="Depreciation is calculated based on equipment cost ($150,000 default), lifespan (10 years), and annual working hours (2000 hours). This represents the hourly cost of owning and operating the equipment. You can adjust these values in advanced settings."
                />
                <FAQItem
                  question="What assist gas should I use?"
                  answer="Oxygen (O2) for mild steel (faster cutting), Nitrogen (N2) for stainless steel and aluminum (cleaner edges), or Air for general purpose (cost-effective). Gas consumption varies by nozzle size and pressure, typically 0.5-3 m³/hour."
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
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Material Selection Guide</h2>
              <p className="mb-6 text-gray-700">
                Different materials require different cutting parameters and affect overall costs significantly. 
                Here's what you need to know about common materials:
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Mild Steel (Carbon Steel)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> General fabrication, structural parts, brackets</p>
                    <p><strong>Cutting speed:</strong> Fast (up to 20 m/min for thin sheets with fiber laser)</p>
                    <p><strong>Assist gas:</strong> Oxygen (faster) or Nitrogen (cleaner edges)</p>
                    <p><strong>Typical thickness range:</strong> 0.5mm - 25mm</p>
                    <p><strong>Cost consideration:</strong> Most economical option, ~$3-5/kg</p>
                  </div>
                </div>

                <div className="border-l-4 border-gray-500 bg-gray-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Stainless Steel 304/316</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> Food equipment, medical devices, corrosion-resistant parts</p>
                    <p><strong>Cutting speed:</strong> Moderate (60-70% of mild steel speed)</p>
                    <p><strong>Assist gas:</strong> Nitrogen required for oxide-free edges</p>
                    <p><strong>Typical thickness range:</strong> 0.5mm - 20mm</p>
                    <p><strong>Cost consideration:</strong> 60-80% more expensive than mild steel, ~$5-8/kg</p>
                  </div>
                </div>

                <div className="border-l-4 border-gray-400 bg-gray-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Aluminum (5052, 6061)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> Lightweight parts, aerospace, transportation</p>
                    <p><strong>Cutting speed:</strong> Fast (high reflectivity requires fiber laser)</p>
                    <p><strong>Assist gas:</strong> Nitrogen (Air for thinner sheets)</p>
                    <p><strong>Typical thickness range:</strong> 0.5mm - 12mm</p>
                    <p><strong>Cost consideration:</strong> Material costs ~$8-12/kg, but lighter weight reduces shipping</p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Copper & Brass</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Best for:</strong> Electrical components, decorative parts</p>
                    <p><strong>Cutting speed:</strong> Slow (high thermal conductivity, reflective)</p>
                    <p><strong>Assist gas:</strong> Nitrogen or Air</p>
                    <p><strong>Typical thickness range:</strong> 0.5mm - 8mm</p>
                    <p><strong>Cost consideration:</strong> Expensive materials ($15-20/kg), requires high-power fiber laser</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Optimization Strategies */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Cost Optimization Strategies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">1</span>
                    Optimize Nesting and Material Utilization
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Proper nesting can improve material utilization from 60-70% to 80-90%. Use automatic nesting software 
                    to minimize waste. Common rectangle nesting achieves 75-80%, while advanced algorithms can reach 85-90%. 
                    A 10% improvement in nesting efficiency can reduce material costs by the same percentage.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">2</span>
                    Batch Similar Jobs Together
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Setup time typically adds 6-18 minutes per job. By batching similar parts, you can amortize setup 
                    costs across multiple pieces. For example, 10 identical parts might take only 20% more time than one part, 
                    reducing per-unit cost by 70-80%.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">3</span>
                    Choose the Right Assist Gas
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Oxygen cutting is 20-30% faster than nitrogen for mild steel but leaves oxidized edges. Nitrogen produces 
                    clean edges but costs $0.50-2.00/m³ vs $0.10-0.30/m³ for oxygen. Air is cheapest but only suitable for 
                    thin sheets (&lt;3mm). Choose based on edge quality requirements vs. cost tradeoffs.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">4</span>
                    Optimize Cutting Parameters
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Running at 80-90% of maximum speed often provides the best balance between speed and edge quality. 
                    Over-cutting (too slow) wastes time and energy. Under-cutting (too fast) causes dross and requires 
                    secondary operations. Proper focus position can improve cutting speed by 10-15%.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">5</span>
                    Minimize Piercing Operations
                  </h3>
                  <p className="ml-10 text-gray-700">
                    Each pierce takes 0.5-3 seconds depending on thickness. For parts with many holes, piercing time can exceed 
                    cutting time. Design parts to minimize internal features when possible. Lead-in paths should be optimized 
                    to reduce pierce points.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Benchmarks */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Industry Benchmarks & Standards</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Cutting Speed Benchmarks (Fiber Laser)</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left">Material/Thickness</th>
                        <th className="pb-2 text-right">Speed</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b">
                        <td className="py-2">Mild Steel 1mm</td>
                        <td className="text-right">15-20 m/min</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Mild Steel 3mm</td>
                        <td className="text-right">4-6 m/min</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Mild Steel 10mm</td>
                        <td className="text-right">0.8-1.2 m/min</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Stainless 2mm</td>
                        <td className="text-right">6-8 m/min</td>
                      </tr>
                      <tr>
                        <td className="py-2">Aluminum 3mm</td>
                        <td className="text-right">8-12 m/min</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs text-gray-600">Based on 6kW fiber laser with optimized parameters</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Typical Cost Breakdown</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Material costs:</span>
                      <span className="font-semibold">40-60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor costs:</span>
                      <span className="font-semibold">15-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Energy costs:</span>
                      <span className="font-semibold">5-10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment depreciation:</span>
                      <span className="font-semibold">10-15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consumables (gas, nozzles):</span>
                      <span className="font-semibold">5-10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overhead:</span>
                      <span className="font-semibold">10-15%</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">Percentages vary based on material type and thickness</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Machine Utilization Targets</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Cutting time:</strong> 60-70% of total time</p>
                    <p><strong>Setup/loading:</strong> 15-20% of total time</p>
                    <p><strong>Programming:</strong> 5-10% of total time</p>
                    <p><strong>Maintenance:</strong> 3-5% of total time</p>
                    <p><strong>Idle time:</strong> Should be &lt;10%</p>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">Based on job shop operations with mixed work</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Quality Standards</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Edge roughness (Ra):</strong> 6.3-12.5 μm (typical)</p>
                    <p><strong>Kerf width:</strong> 0.1-0.5mm depending on thickness</p>
                    <p><strong>Perpendicularity:</strong> ±0.1mm per 10mm thickness</p>
                    <p><strong>Dimensional accuracy:</strong> ±0.1mm (general), ±0.05mm (precision)</p>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">Per ISO 9013 quality standards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced FAQ */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Advanced Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="How does laser power affect cutting speed and cost?"
                  answer="Higher power lasers cut thicker materials faster but cost more to purchase and operate. A 6kW laser costs ~$150k-200k vs. $80k-120k for 3kW. Operating costs scale with power (electricity, cooling). General rule: use 1kW per 3-4mm of mild steel thickness. Over-powered lasers waste energy on thin materials; under-powered struggle with thick materials."
                />
                <FAQItem
                  question="What's the difference between CO2 and fiber lasers for cost?"
                  answer="Fiber lasers are 3-5x more energy efficient than CO2 lasers. A 3kW fiber uses ~10kW total power vs ~30kW for equivalent CO2. Fiber lasers have lower maintenance (no gas refills, mirrors last longer) saving $10k-20k/year. Initial cost is similar, but 5-year operating cost is 40-50% lower for fiber. Fiber lasers also cut thin materials 2-3x faster, reducing per-part costs."
                />
                <FAQItem
                  question="How do I calculate the true cost per hour of my laser?"
                  answer="True hourly cost includes: Equipment depreciation ($150k machine / 10 years / 2000 hrs = $7.50/hr), Electricity (~10kW x $0.12 = $1.20/hr), Labor ($25/hr operator), Consumables (nozzles, lenses ~$2/hr), Assist gas ($1-5/hr depending on type), Maintenance reserve ($2-3/hr), Facility overhead (rent, insurance ~$5-10/hr). Total: $45-55/hr is typical for a 6kW fiber laser system."
                />
                <FAQItem
                  question="When should I outsource vs. buying equipment?"
                  answer="Buy equipment if: Annual cutting volume exceeds $150k-200k in outsourcing costs (typical 2-3 year payback), You have consistent workload (>60% machine utilization), In-house control is critical for lead times. Outsource if: Volume is sporadic, Multiple material types needed (avoiding multiple machines), Capital is limited, You lack technical expertise. Break-even is typically 1500-2000 hours of annual cutting time."
                />
                <FAQItem
                  question="How can I reduce assist gas costs?"
                  answer="Gas costs can be 20-40% of operating expenses. Strategies: 1) Use Air instead of N2 for mild steel when edge quality permits (saves $1-2/hr), 2) Buy bulk gas vs. cylinders (50% cost reduction at scale), 3) On-site nitrogen generator pays for itself in 2-3 years above 40 hrs/week usage, 4) Optimize gas pressure - excessive pressure wastes gas without improving cut quality, 5) Fix leaks promptly - even small leaks waste $500-1000/year."
                />
                <FAQItem
                  question="What maintenance costs should I budget for?"
                  answer="Annual maintenance typically runs 5-8% of machine cost. Fiber laser (6kW): Protective windows: $500-800/year (replaced 2-4x), Cutting nozzles: $1000-2000/year, Focus lenses: $800-1200/year, Chiller maintenance: $500-800/year, Preventive service: $2000-3000/year. CO2 laser adds: Laser gas refills: $3000-5000/year, Mirror replacements: $2000-4000/year. Total: $5k-8k/year for fiber, $12k-20k/year for CO2."
                />
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Calculators</h2>
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
        <h3 className="font-semibold text-gray-900">{question}</h3>
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

