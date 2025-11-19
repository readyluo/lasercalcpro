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
import { DollarSign, Calculator as CalculatorIcon, RotateCcw, HelpCircle, PieChart, TrendingUp, AlertCircle } from 'lucide-react';
import { hourlyRateSchema, hourlyRateDefaults, type HourlyRateInput } from '@/lib/validations/cost-center';
import { calculateHourlyRate, calculateBreakEvenUtilization, compareToIndustryBenchmarks } from '@/lib/calculators/cost-center/hourly-rate';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

// Gas type options
const gasTypeOptions = [
  { value: 'nitrogen', label: 'Nitrogen - High purity, best cut quality' },
  { value: 'oxygen', label: 'Oxygen - Fast cutting for mild steel' },
  { value: 'air', label: 'Air - Most economical, lower quality' },
  { value: 'mixed', label: 'Mixed - Combination approach for different materials' },
];

export default function HourlyRateCalculatorPage() {
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [result, setResult] = React.useState<ReturnType<typeof calculateHourlyRate> | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Shop Hourly Rate Builder',
    'Estimate shop hourly rate with depreciation, labor, energy, maintenance, facility, overhead and gas cost components based on your inputs.',
    [
      { name: 'Enter Equipment Data', text: 'Input equipment cost, lifespan and annual working hours.' },
      { name: 'Enter Labor & Energy', text: 'Provide operator rate, benefits multiplier, total kW and electricity rate.' },
      { name: 'Facility & Overhead', text: 'Enter monthly rent, utilities, insurance and overhead costs.' },
      { name: 'Gas Costs', text: 'Select gas type and enter consumption and price per m^3.' },
      { name: 'Calculate', text: 'Get hourly rate and cost breakdown with recommendations.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'What is included in the hourly rate?',
      answer: 'The hourly rate includes all costs of running your shop: equipment depreciation (spreading purchase cost over lifespan), direct labor with benefits, electricity consumption, annual maintenance, consumables (lenses, nozzles, wear parts), facility costs (rent, utilities, insurance), general overhead (admin, sales, management), and assist gas consumption. This comprehensive rate ensures you cover all expenses.',
    },
    {
      question: 'How accurate is this calculation?',
      answer:
        'This calculator applies straightforward formulas to the cost and utilization inputs you provide to estimate a shop hourly rate. The usefulness of the result depends on how representative your inputs are for your shop. Treat defaults as placeholders, replace them with your own current costs, and update the numbers when wages, energy, rent, or production volume change.',
    },
    {
      question: 'How often should I update my hourly rate?',
      answer: 'Review and update your hourly rate quarterly at minimum, or immediately after major changes: new equipment purchases, significant wage adjustments, facility cost changes, utility rate increases, or changes in production volume. Many shops review monthly to ensure pricing remains competitive and profitable.',
    },
    {
      question: 'What is the break-even utilization rate?',
      answer:
        'In this tool, break-even utilization is an estimate of the minimum machine hours per year needed to cover the fixed and variable costs you entered. Running well below that level may indicate that your modeled costs are not being recovered. Use the result as a planning reference and choose utilization targets that reflect your actual backlog, staffing, and capacity strategy.',
    },
    {
      question: 'How do I compare my rate to industry benchmarks?',
      answer:
        'There is no single “correct” hourly rate for every shop. Rather than relying on generic benchmark ranges, compare your modeled rate with your own historical quotes, win/loss data, and the rates you see in your specific market. The positioning information in this tool is only a rough guide and should be validated against your actual customers, competitors, and value-added services.',
    },
    {
      question: 'Should I include profit margin in the hourly rate?',
      answer:
        'This calculator focuses on estimating your break-even cost. Profit margin is typically added separately when quoting and should reflect job complexity, customer relationship, competition, and risk. Many shops test a range of margin levels in their quoting process rather than relying on a single fixed percentage. Treat the hourly rate here as a cost baseline, not a final selling price.',
    },
    {
      question: 'How does equipment utilization affect my costs?',
      answer:
        'When fixed expenses like depreciation, facility, and overhead are a large share of your cost, increasing the number of billable hours tends to reduce the cost per hour. For example, if you spread $50k/year in fixed costs over 1000 hours versus 2000 hours, the resulting cost per hour is very different. Use this calculator to model different annual working hours and see how sensitive your own hourly rate is to utilization.',
    }
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
  const breakEven = result
    ? calculateBreakEvenUtilization(
        equipmentCost,
        equipmentLifespan,
        // Fixed costs: facility + overhead monthly  x  12
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

          {/* Header - Compact */}
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Shop Hourly Rate Builder</h1>
            <p className="text-base text-gray-600">
              Estimate a shop hourly rate with transparent cost breakdown.
            </p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-purple-500 bg-purple-50 px-4 py-3">
            <p className="text-sm text-purple-900">
              <DollarSign className="mr-2 inline h-4 w-4" />
              <strong>Cost Baseline:</strong> Results show break-even hourly cost. Add profit margin when quoting based on your market and risk. Compare with your accounting data.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Equipment */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Equipment</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input 
                        {...register('equipmentCost', { valueAsNumber: true })} 
                        type="number" 
                        step="1000" 
                        label="Equipment Cost (USD)" 
                        placeholder="e.g., 150000"
                        helperText="Initial purchase price of laser system"
                        error={errors.equipmentCost?.message} 
                        leftIcon={<DollarSign className="h-4 w-4" />} 
                        required 
                      />
                      <Input 
                        {...register('equipmentLifespan', { valueAsNumber: true })} 
                        type="number" 
                        step="1" 
                        label="Lifespan (years)" 
                        placeholder="e.g., 10"
                        helperText="Expected useful life of equipment"
                        error={errors.equipmentLifespan?.message} 
                        required 
                      />
                      <Input 
                        {...register('annualWorkingHours', { valueAsNumber: true })} 
                        type="number" 
                        step="50" 
                        label="Annual Working Hours" 
                        placeholder="e.g., 2000"
                        helperText="Expected billable hours per year"
                        error={errors.annualWorkingHours?.message} 
                        required 
                        className="md:col-span-2"
                      />
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
                      <Select 
                        {...register('gasType')} 
                        label="Gas Type" 
                        options={gasTypeOptions}
                        helperText="Choose based on material and quality needs"
                        error={errors.gasType?.message} 
                        required 
                      />
                      <Input 
                        {...register('gasConsumptionPerHour', { valueAsNumber: true })} 
                        type="number" 
                        step="0.1" 
                        label="Consumption (m^3/hr)" 
                        placeholder="e.g., 1.5"
                        helperText="Average gas flow rate"
                        error={errors.gasConsumptionPerHour?.message} 
                        required 
                      />
                      <Input 
                        {...register('gasPricePerCubicMeter', { valueAsNumber: true })} 
                        type="number" 
                        step="0.01" 
                        label="Gas Price (USD/m^3)" 
                        placeholder="e.g., 1.50"
                        helperText="Local gas supplier cost"
                        error={errors.gasPricePerCubicMeter?.message} 
                        leftIcon={<DollarSign className="h-4 w-4" />} 
                        required 
                      />
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
                    <h2 className="mb-6 text-3xl font-bold">Your Shop Hourly Rate</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Hourly Cost</p>
                        <p className="text-5xl font-bold">${result.totalHourlyCost.toFixed(2)}</p>
                        <p className="mt-2 text-sm text-blue-200">per operating hour</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Rate Context</p>
                        <p className="text-3xl font-semibold capitalize">{benchmark?.position}</p>
                        <p className="mt-2 text-sm text-blue-200">{benchmark?.description}</p>
                      </div>
                      {breakEven && (
                        <div className="md:col-span-2 mt-4 rounded-lg bg-white/10 p-4">
                          <div className="flex items-start gap-3">
                            <TrendingUp className="h-6 w-6 flex-shrink-0" />
                            <div>
                              <p className="font-semibold">Break-Even Analysis</p>
                              <p className="mt-1 text-sm">
                                Minimum <span className="font-semibold">{breakEven.breakEvenHours} hours/year</span> ({breakEven.breakEvenPercentage}% utilization) in this modeled scenario to cover the costs you entered.
                                This example also shows <span className="font-semibold">{breakEven.recommendedMinimumHours} hours/year</span> as a higher-utilization case you can compare against your own backlog, staffing, and capacity strategy rather than as a universal target.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cost Breakdown with Visual Bars */}
                  <div className="card">
                    <div className="mb-4 flex items-center gap-2">
                      <PieChart className="h-6 w-6 text-primary-600" />
                      <h3 className="text-xl font-bold">Detailed Cost Breakdown</h3>
                    </div>
                    <div className="space-y-3">
                      {result.costBreakdown.map((item, idx) => {
                        const colors = [
                          'bg-blue-600',
                          'bg-green-600',
                          'bg-yellow-600',
                          'bg-orange-600',
                          'bg-red-600',
                          'bg-purple-600',
                          'bg-pink-600',
                          'bg-indigo-600',
                          'bg-cyan-600',
                        ];
                        return (
                          <div key={item.category}>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">{item.category}</span>
                              <span className="text-sm font-semibold text-gray-900">
                                ${item.cost.toFixed(2)}/hr ({item.percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                              <div 
                                className={`h-full ${colors[idx % colors.length]} transition-all duration-500`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <div className="border-t-2 border-gray-300 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">Total Hourly Rate</span>
                          <span className="text-2xl font-bold text-primary-600">${result.totalHourlyCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {(result.alerts.length > 0 || result.recommendations.length > 0) && (
                    <div className="card border-2 border-amber-200 bg-amber-50">
                      <div className="mb-4 flex items-start gap-3">
                        <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-amber-600" />
                        <div>
                          <h3 className="text-xl font-bold text-amber-900">Insights & Recommendations</h3>
                          <p className="mt-1 text-sm text-amber-700">Based on your cost structure and the assumptions in this calculator</p>
                        </div>
                      </div>
                        {result.alerts.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-3 font-semibold text-red-900">Warning: Action Required</h4>
                          <ul className="space-y-2">
                            {result.alerts.map((a, idx) => (
                              <li key={idx} className="flex gap-3 rounded-lg bg-white p-3 shadow-sm">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                                  {idx + 1}
                                </span>
                                <p className="text-sm text-gray-800">{a}</p>
                              </li>
                            ))}
                            </ul>
                          </div>
                        )}
                        {result.recommendations.length > 0 && (
                          <div>
                          <h4 className="mb-3 font-semibold text-amber-900">Optimization Opportunities</h4>
                          <ul className="space-y-2">
                            {result.recommendations.map((r, idx) => (
                              <li key={idx} className="flex gap-3 rounded-lg bg-white p-3 shadow-sm">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                                  {idx + 1}
                                </span>
                                <p className="text-sm text-gray-800">{r}</p>
                              </li>
                            ))}
                            </ul>
                          </div>
                        )}
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


