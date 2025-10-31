'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ExportButton } from '@/components/calculators/ExportButton';
import { DollarSign, Calculator as CalculatorIcon, RotateCcw, Info } from 'lucide-react';
import { hourlyRateSchema, hourlyRateDefaults, type HourlyRateInput } from '@/lib/validations/cost-center';
import { calculateHourlyRate, calculateBreakEvenUtilization, compareToIndustryBenchmarks } from '@/lib/calculators/cost-center/hourly-rate';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export default function HourlyRateCalculatorPage() {
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [result, setResult] = React.useState<ReturnType<typeof calculateHourlyRate> | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Shop Hourly Rate Builder',
    'Calculate complete hourly shop rate with depreciation, labor, energy, maintenance, facility, overhead and gas costs.',
    [
      { name: 'Enter Equipment Data', text: 'Input equipment cost, lifespan and annual working hours.' },
      { name: 'Enter Labor & Energy', text: 'Provide operator rate, benefits multiplier, total kW and electricity rate.' },
      { name: 'Facility & Overhead', text: 'Enter monthly rent, utilities, insurance and overhead costs.' },
      { name: 'Gas Costs', text: 'Select gas type and enter consumption and price per m³.' },
      { name: 'Calculate', text: 'Get hourly rate and cost breakdown with recommendations.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'What is included in the hourly rate?',
      answer: 'Equipment depreciation, labor with benefits, energy, maintenance, consumables, facility, overhead, and assist gas costs.',
    },
    {
      question: 'How accurate is this calculation?',
      answer: 'It is 100% accurate relative to the inputs you provide. Use your actual local costs for precise results. Defaults are only starting points and must be overridden.',
    },
    {
      question: 'How often should I update inputs?',
      answer: 'Update quarterly or after major changes (new equipment, wage adjustments, rent changes).',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<HourlyRateInput>({
    resolver: zodResolver(hourlyRateSchema),
    defaultValues: hourlyRateDefaults,
  });

  const onSubmit = (data: HourlyRateInput) => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = calculateHourlyRate(data);
      setResult(res);
      setIsCalculating(false);
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleReset = () => {
    reset(hourlyRateDefaults);
    setResult(null);
  };

  const equipmentCost = watch('equipmentCost');
  const equipmentLifespan = watch('equipmentLifespan');
  const annualWorkingHours = watch('annualWorkingHours');

  const breakEven = result
    ? calculateBreakEvenUtilization(
        equipmentCost,
        equipmentLifespan,
        // Fixed costs: facility + overhead monthly × 12
        (watch('facilityRentMonthly') + watch('utilitiesMonthly') + watch('insuranceMonthly') + watch('overheadMonthly')) * 12,
        // Variable per hour: labor + energy + consumables + gas + maintenance
        result.labor + result.energy + result.consumables + result.gas + result.maintenance,
        result.totalHourlyCost
      )
    : null;

  const benchmark = result ? compareToIndustryBenchmarks(result.totalHourlyCost) : null;

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
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">Shop Hourly Rate Builder</h1>
            <p className="text-gray-600">Calculate a complete hourly rate for your laser cutting operation with a transparent cost breakdown.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Equipment */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Equipment</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input {...register('equipmentCost', { valueAsNumber: true })} type="number" step="1000" label="Equipment Cost (USD)" error={errors.equipmentCost?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                      <Input {...register('equipmentLifespan', { valueAsNumber: true })} type="number" step="1" label="Lifespan (years)" error={errors.equipmentLifespan?.message} required />
                      <Input {...register('annualWorkingHours', { valueAsNumber: true })} type="number" step="50" label="Annual Working Hours" error={errors.annualWorkingHours?.message} required />
                    </div>
                  </div>

                  {/* Labor & Energy */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Labor & Energy</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input {...register('operatorRate', { valueAsNumber: true })} type="number" step="1" label="Operator Rate (USD/hr)" error={errors.operatorRate?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                      <Input {...register('benefitsMultiplier', { valueAsNumber: true })} type="number" step="0.01" label="Benefits Multiplier" error={errors.benefitsMultiplier?.message} required />
                      <Input {...register('totalPowerKw', { valueAsNumber: true })} type="number" step="0.1" label="Total Power (kW)" error={errors.totalPowerKw?.message} required />
                      <Input {...register('electricityRate', { valueAsNumber: true })} type="number" step="0.01" label="Electricity Rate (USD/kWh)" error={errors.electricityRate?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                    </div>
                  </div>

                  {/* Maintenance & Consumables */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Maintenance & Consumables</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input {...register('annualMaintenancePercent', { valueAsNumber: true })} type="number" step="0.5" label="Annual Maintenance (% of equipment)" error={errors.annualMaintenancePercent?.message} required />
                      <Input {...register('consumablesPerHour', { valueAsNumber: true })} type="number" step="0.1" label="Consumables (USD/hr)" error={errors.consumablesPerHour?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                    </div>
                  </div>

                  {/* Facility & Overhead */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Facility & Overhead</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Input {...register('facilityRentMonthly', { valueAsNumber: true })} type="number" step="50" label="Rent (USD/month)" error={errors.facilityRentMonthly?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                      <Input {...register('utilitiesMonthly', { valueAsNumber: true })} type="number" step="50" label="Utilities (USD/month)" error={errors.utilitiesMonthly?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                      <Input {...register('insuranceMonthly', { valueAsNumber: true })} type="number" step="50" label="Insurance (USD/month)" error={errors.insuranceMonthly?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                      <Input {...register('overheadMonthly', { valueAsNumber: true })} type="number" step="100" label="Overhead (USD/month)" error={errors.overheadMonthly?.message} leftIcon={<DollarSign className="h-4 w-4" />} required className="md:col-span-3" />
                    </div>
                  </div>

                  {/* Gas */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Assist Gas</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Input {...register('gasType')} label="Gas Type (nitrogen/oxygen/air/mixed)" error={errors.gasType?.message} required />
                      <Input {...register('gasConsumptionPerHour', { valueAsNumber: true })} type="number" step="0.1" label="Consumption (m³/hr)" error={errors.gasConsumptionPerHour?.message} required />
                      <Input {...register('gasPricePerCubicMeter', { valueAsNumber: true })} type="number" step="0.01" label="Gas Price (USD/m³)" error={errors.gasPricePerCubicMeter?.message} leftIcon={<DollarSign className="h-4 w-4" />} required />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isCalculating} leftIcon={<CalculatorIcon className="h-5 w-5" />}>Calculate Hourly Rate</Button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Summary */}
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-4 text-2xl font-bold">Hourly Rate Summary</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Hourly Cost</p>
                        <p className="text-3xl font-bold">${result.totalHourlyCost}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Benchmark Position</p>
                        <p className="text-2xl font-semibold">{benchmark?.position.toUpperCase()}</p>
                      </div>
                      {breakEven && (
                        <div className="md:col-span-2 mt-2 rounded bg-white/10 p-3 text-sm">
                          <p>Break-even hours per year: <span className="font-semibold">{breakEven.breakEvenHours}</span> ({breakEven.breakEvenPercentage}% of 2000 hrs). Recommended minimum: <span className="font-semibold">{breakEven.recommendedMinimumHours}</span>.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Cost Breakdown</h3>
                    <div className="space-y-2">
                      {result.costBreakdown.map(item => (
                        <div key={item.category} className="flex items-center justify-between">
                          <span className="text-gray-700">{item.category}</span>
                          <span className="font-semibold">${item.cost.toFixed(2)} ({item.percentage.toFixed(1)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {(result.alerts.length > 0 || result.recommendations.length > 0) && (
                    <div className="card">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="rounded-full bg-primary-100 p-2"><Info className="h-6 w-6 text-primary-600" /></div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Insights & Recommendations</h3>
                          <p className="mt-1 text-sm text-gray-600">Based on your inputs and cost structure</p>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {result.alerts.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-semibold text-gray-900">Alerts</h4>
                            <ul className="list-disc pl-5 text-sm text-red-700">
                              {result.alerts.map((a, idx) => (<li key={idx}>{a}</li>))}
                            </ul>
                          </div>
                        )}
                        {result.recommendations.length > 0 && (
                          <div>
                            <h4 className="mb-2 font-semibold text-gray-900">Recommendations</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-700">
                              {result.recommendations.map((r, idx) => (<li key={idx}>{r}</li>))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Export */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Shop Hourly Rate Report"
                        calculationType="Shop Hourly Rate"
                        inputData={watch()}
                        results={{
                          'Total Hourly Cost': result.totalHourlyCost,
                          'Depreciation': result.depreciation,
                          'Labor': result.labor,
                          'Energy': result.energy,
                          'Maintenance': result.maintenance,
                          'Consumables': result.consumables,
                          'Facility': result.facility,
                          'Overhead': result.overhead,
                          'Gas': result.gas,
                        }}
                        recommendations={[...result.alerts, ...result.recommendations]}
                      />
                    </div>
                    <Button variant="outline" size="lg" onClick={handleReset} leftIcon={<RotateCcw className="h-5 w-5" />}>New Calculation</Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[300px] flex-col items-center justify-center text-center">
                  <CalculatorIcon className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">Ready to Calculate</h3>
                  <p className="text-gray-500">Fill in your shop parameters and click Calculate to see the hourly rate</p>
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


