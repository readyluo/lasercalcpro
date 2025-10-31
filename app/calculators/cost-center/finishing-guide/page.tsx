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
import { Calculator as CalculatorIcon, RotateCcw, DollarSign } from 'lucide-react';
import { finishingGuideSchema, finishingGuideDefaults, type FinishingGuideInput } from '@/lib/validations/cost-center';
import { calculateFinishingGuide, compareFinishingMethods, calculateFinishingEquipmentROI } from '@/lib/calculators/cost-center/finishing';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

const materialOptions = [
  { value: 'mild_steel', label: 'Mild Steel - Moderate finishing requirements' },
  { value: 'stainless_steel', label: 'Stainless Steel - Higher finishing time, harder material' },
  { value: 'aluminum', label: 'Aluminum - Easier finishing, softer material' },
];

const methodOptions = [
  { value: 'manual', label: 'Manual - Files, grinders, hand tools' },
  { value: 'powered', label: 'Powered - Angle grinders, belt sanders' },
  { value: 'automated', label: 'Automated - CNC deburring, robotic systems' },
];

const qualityOptions = [
  { value: 'ascut', label: 'As-Cut - No finishing, accept laser edge' },
  { value: 'light', label: 'Light - Remove sharp edges only' },
  { value: 'medium', label: 'Medium - Smooth edges, no sharp burrs' },
  { value: 'high', label: 'High - Polished edges, cosmetic quality' },
  { value: 'mirror', label: 'Mirror - Mirror finish, highest quality' },
];

const partSizeOptions = [
  { value: 'small', label: 'Small - < 300mm, easy handling' },
  { value: 'medium', label: 'Medium - 300-600mm, standard parts' },
  { value: 'large', label: 'Large - 600-1200mm, heavier handling' },
  { value: 'xlarge', label: 'X-Large - > 1200mm, requires assistance' },
];

const cutQualityOptions = [
  { value: 'excellentCut', label: 'Excellent - Clean nitrogen cut, minimal dross' },
  { value: 'goodCut', label: 'Good - Standard cut quality, light dross' },
  { value: 'fairCut', label: 'Fair - Some dross/spatter, needs work' },
  { value: 'poorCut', label: 'Poor - Heavy dross, significant finishing needed' },
];

export default function FinishingGuidePage() {
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [result, setResult] = React.useState<ReturnType<typeof calculateFinishingGuide> | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Edge Finishing Time Guide',
    'Estimate deburring and finishing time based on edge length, material, method, and quality requirements.',
    [
      { name: 'Enter Edge Length', text: 'Total edge length to be finished in meters.' },
      { name: 'Select Material & Thickness', text: 'Choose material and enter thickness.' },
      { name: 'Choose Method & Quality', text: 'Select finishing method and desired quality level.' },
      { name: 'Add Options & Rate', text: 'Add additional operations and your labor rate.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    { question: 'Why finishing time varies?', answer: 'Cut quality, material, and quality level significantly affect finishing. Nitrogen cuts typically need less finishing than oxygen cuts.' },
    { question: 'When to invest in automation?', answer: 'If finishing workload exceeds ~500 hours/year, automated deburring often pays back within 12-24 months.' },
  ]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FinishingGuideInput>({
    resolver: zodResolver(finishingGuideSchema),
    defaultValues: finishingGuideDefaults,
  });

  const onSubmit = (data: FinishingGuideInput) => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = calculateFinishingGuide(data);
      setResult(res);
      setIsCalculating(false);
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleReset = () => {
    reset(finishingGuideDefaults);
    setResult(null);
  };

  const methodsComparison = compareFinishingMethods(
    watch('edgeLengthMeters'),
    watch('material'),
    watch('thickness'),
    watch('qualityLevel'),
    watch('partSize'),
    watch('laborRate')
  );

  const roi = calculateFinishingEquipmentROI(
    'powered',
    500, // example monthly meters
    watch('material'),
    watch('thickness'),
    watch('laborRate'),
    25000
  );

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">Edge Finishing Time Guide</h1>
            <p className="text-gray-600">Estimate finishing time and costs, compare methods, and assess equipment ROI.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input 
                      {...register('edgeLengthMeters', { valueAsNumber: true })} 
                      type="number" 
                      step="0.1" 
                      label="Edge Length (m)" 
                      placeholder="e.g., 1.5"
                      helperText="Total edge length to finish"
                      error={errors.edgeLengthMeters?.message} 
                      required 
                    />
                    <Select 
                      {...register('material')} 
                      label="Material" 
                      options={materialOptions}
                      helperText="Material hardness affects time"
                      error={errors.material?.message} 
                      required 
                    />
                    <Input 
                      {...register('thickness', { valueAsNumber: true })} 
                      type="number" 
                      step="0.1" 
                      label="Thickness (mm)" 
                      placeholder="e.g., 3.0"
                      helperText="Material thickness"
                      error={errors.thickness?.message} 
                      required 
                    />
                    <Select 
                      {...register('method')} 
                      label="Finishing Method" 
                      options={methodOptions}
                      helperText="Tool/equipment type"
                      error={errors.method?.message} 
                      required 
                    />
                    <Select 
                      {...register('qualityLevel')} 
                      label="Quality Level" 
                      options={qualityOptions}
                      helperText="Finish quality requirements"
                      error={errors.qualityLevel?.message} 
                      required 
                    />
                    <Select 
                      {...register('partSize')} 
                      label="Part Size" 
                      options={partSizeOptions}
                      helperText="Part size affects handling"
                      error={errors.partSize?.message} 
                      required 
                    />
                    <Select 
                      {...register('cutQuality')} 
                      label="Cut Quality" 
                      options={cutQualityOptions}
                      helperText="Laser cut edge quality affects finishing"
                      error={errors.cutQuality?.message} 
                      required 
                    />
                    <Input 
                      {...register('laborRate', { valueAsNumber: true })} 
                      type="number" 
                      step="1" 
                      label="Labor Rate (USD/hr)" 
                      placeholder="e.g., 25"
                      helperText="Finishing labor hourly cost"
                      leftIcon={<DollarSign className="h-4 w-4" />}
                      error={errors.laborRate?.message} 
                      required 
                    />
                  </div>

                  <Input {...register('additionalOps.0')} className="hidden" />

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isCalculating} leftIcon={<CalculatorIcon className="h-5 w-5" />}>Calculate Finishing Time & Cost</Button>
                </form>
              </div>
            </div>

            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Time & Cost Summary</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Stat label="Total Time" value={`${result.totalTimeMinutes.toFixed(2)} min`} />
                      <Stat label="Total Cost" value={`$${result.totalCost.toFixed(2)}`} />
                      <Stat label="Labor Cost" value={`$${result.laborCost.toFixed(2)}`} />
                      <Stat label="Equipment Cost" value={`$${result.equipmentCost.toFixed(2)}`} />
                      <Stat label="Consumables" value={`$${result.consumablesCost.toFixed(2)}`} />
                      <Stat label="Cost / Meter" value={`$${result.costPerMeter.toFixed(2)}`} />
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Method Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="pb-2 text-left">Method</th>
                            <th className="pb-2 text-right">Time (min)</th>
                            <th className="pb-2 text-right">Cost ($)</th>
                            <th className="pb-2 text-right">Diff vs Cheapest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {methodsComparison.map(row => (
                            <tr key={row.method} className="border-b">
                              <td className="py-2">{row.method}</td>
                              <td className="py-2 text-right">{row.timeMinutes.toFixed(2)}</td>
                              <td className="py-2 text-right">{row.cost.toFixed(2)}</td>
                              <td className="py-2 text-right">{row.costDifference.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  </div>
                  </div>

                  <div className="card">
                    <h3 className="mb-2 text-xl font-bold">Automation ROI (Example)</h3>
                    <div className="grid gap-4 md:grid-cols-5">
                      <Stat label="Current Monthly Cost" value={`$${roi.currentMonthlyCost}`} />
                      <Stat label="Automated Monthly Cost" value={`$${roi.automatedMonthlyCost}`} />
                      <Stat label="Monthly Savings" value={`$${roi.monthlySavings}`} />
                      <Stat label="Payback (months)" value={`${roi.paybackMonths}`} />
                      <Stat label="ROI (annual)" value={`${roi.roiPercent}%`} />
                    </div>
                  </div>

                  {/* Export */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Finishing Time & Cost Report"
                        calculationType="Finishing Guide"
                        inputData={watch()}
                        results={{
                          'Total Time (min)': result.totalTimeMinutes,
                          'Labor Cost ($)': result.laborCost,
                          'Equipment Cost ($)': result.equipmentCost,
                          'Consumables ($)': result.consumablesCost,
                          'Total Cost ($)': result.totalCost,
                          'Cost per Meter ($/m)': result.costPerMeter,
                        }}
                        recommendations={[...result.recommendations, ...result.costSavingOpportunities]}
                      />
                    </div>
                    <Button variant="outline" size="lg" onClick={handleReset} leftIcon={<RotateCcw className="h-5 w-5" />}>New Estimation</Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[300px] flex-col items-center justify-center text-center">
                  <CalculatorIcon className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">Ready to Estimate</h3>
                  <p className="text-gray-500">Enter finishing parameters and click Estimate</p>
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

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}


