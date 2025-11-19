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
import { energySchema, energyDefaults, type EnergyInput } from '@/lib/validations/energy';
import { calculateEnergy, type EnergyResult, calculateTotalPotentialSavings } from '@/lib/calculators/energy';
import { Calculator, RotateCcw, Zap, Leaf, TrendingUp, DollarSign } from 'lucide-react';
import {
  generateCalculatorHowToSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { saveCalculationToAPI } from '@/lib/utils/api-client';
import { ExportButton } from '@/components/calculators/ExportButton';

export default function EnergyCalculatorPage() {
  const [result, setResult] = useState<EnergyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const howToSchema = generateCalculatorHowToSchema(
    'Energy Cost Calculator',
    'Estimate equipment energy costs and carbon footprint based on your inputs',
    [
      { name: 'Select Equipment', text: 'Choose equipment type and enter power rating' },
      { name: 'Set Operating Time', text: 'Enter daily and yearly operating hours' },
      { name: 'Configure Rates', text: 'Input electricity rate and efficiency factor' },
      { name: 'Calculate Costs', text: 'Get energy consumption, costs, and carbon footprint' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'How accurate is the energy cost calculator?',
      answer:
        'This calculator uses your equipment power, operating schedule, and rate assumptions to estimate energy use and cost. Actual utility bills depend on factors like efficiency, power factor, varying loads, and tariff structure, so treat the results as directional estimates and compare them with your own meter and billing data.',
    },
    {
      question: 'What is included in total power consumption?',
      answer: 'Total power includes equipment rated power plus auxiliary systems (cooling, extraction, controls). Total power equals rated load multiplied by the average load factor plus any auxiliary power you enter for cooling/extraction systems.',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EnergyInput>({
    resolver: zodResolver(energySchema),
    defaultValues: energyDefaults,
  });
  const softwareSchema = generateSoftwareApplicationSchema('Energy Cost Calculator');
  const watchValues = watch();
  const auxiliaryShare =
    result && result.annualCost > 0 ? Math.min(100, Math.max(0, (result.auxiliaryCost / result.annualCost) * 100)) : 0;

  const onSubmit = async (data: EnergyInput) => {
    setIsCalculating(true);

    try {
      const calculationResult = calculateEnergy(data);
      setResult(calculationResult);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      const saveResult = await saveCalculationToAPI({
        tool_type: 'energy',
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
    reset(energyDefaults);
    setResult(null);
  };

  const equipmentOptions = [
    { value: 'laser_cutter', label: 'Laser Cutter' },
    { value: 'cnc_mill', label: 'CNC Mill' },
    { value: 'plasma_cutter', label: 'Plasma Cutter' },
    { value: 'waterjet', label: 'Waterjet Cutter' },
    { value: 'other', label: 'Other Equipment' },
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

          {/* Use cases & boundaries */}
          <div className="mb-4 card bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              When this energy calculator is (and isn't) a good fit
            </h2>
            <div className="grid gap-4 md:grid-cols-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold text-green-700 mb-1">✓ Well suited for:</p>
                <ul className="space-y-0.5 ml-4 list-disc">
                  <li>Comparing the running cost of different machines</li>
                  <li>Identifying which equipment drives most of your bill</li>
                  <li>Rough carbon footprint estimates for a specific line</li>
                  <li>Building inputs for ROI or equipment upgrade decisions</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-amber-700 mb-1">
                  ✗ Not a replacement for:
                </p>
                <ul className="space-y-0.5 ml-4 list-disc">
                  <li>Official utility bills or power-quality studies</li>
                  <li>Detailed demand / peak power charges</li>
                  <li>Complex time-of-use tariffs with many price bands</li>
                  <li>Regulatory carbon reporting without further validation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Header - Compact */}
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Energy Cost Calculator
            </h1>
            <p className="text-base text-gray-600">
              Estimate power consumption, energy costs, and carbon footprint.
            </p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-green-500 bg-green-50 px-4 py-3">
            <p className="text-sm text-green-900">
              <Zap className="mr-2 inline h-4 w-4" />
              <strong>Directional estimates only:</strong> Results are based on rated power, average load, and simplified tariff
              assumptions. Actual bills depend on real-time load variation, auxiliary systems, power factor penalties, demand
              charges, and detailed time-of-use structures. Before you calibrate the model with your own data, it is common to
              see differences in roughly the 15–20% range. Always compare against your own meter readings and utility bills.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Equipment Parameters</h2>
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
                  {/* Equipment */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Equipment Details</h3>
                    <div className="space-y-4">
                      <Select
                        {...register('equipmentType')}
                        label="Equipment Type"
                        options={equipmentOptions}
                        error={errors.equipmentType?.message}
                        required
                      />

                      {watchValues.equipmentType && (
                        <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
                          <p className="mb-1 font-semibold text-blue-900">Typical power ranges (for reference only)</p>
                          <p>
                            {(() => {
                              switch (watchValues.equipmentType) {
                                case 'laser_cutter':
                                  return 'Modern fiber lasers are commonly around 2–3 kW for light work and 4–12 kW for heavy plate; older CO2 models are often in the 2–6 kW range.';
                                case 'cnc_mill':
                                  return 'Many CNC mills fall roughly in the 7–30 kW spindle plus axis drive range, depending on size and configuration.';
                                case 'plasma_cutter':
                                  return 'Industrial plasma systems can range from about 50–200 kW; always check the nameplate on your power supply.';
                                case 'waterjet':
                                  return 'Waterjet pumps are often in the 20–60 kW range (including intensifier and drive motors).';
                                default:
                                  return 'Use the nameplate on your equipment or manufacturer datasheet for the most accurate kW rating.';
                              }
                            })()}
                            {' '}Always check your own machine's nameplate or manual and enter that value here.
                          </p>
                        </div>
                      )}

                      <Input
                        {...register('ratedPower', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label="Rated Power (kW)"
                        error={errors.ratedPower?.message}
                        leftIcon={<Zap className="h-4 w-4" />}
                        required
                      />

                      <Input
                        {...register('averageLoad', { valueAsNumber: true })}
                        type="number"
                        step="5"
                        label="Average Load Factor (%)"
                        error={errors.averageLoad?.message}
                        helperText="Typical operating load percentage"
                      />
                    </div>
                  </div>

                  {/* Operating Schedule */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Operating Schedule</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('dailyOperatingHours', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label="Daily Operating Hours"
                        error={errors.dailyOperatingHours?.message}
                        required
                      />

                      <Input
                        {...register('operatingDaysPerWeek', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Operating Days Per Week"
                        error={errors.operatingDaysPerWeek?.message}
                      />

                      <Input
                        {...register('weeksPerYear', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Working Weeks Per Year"
                        error={errors.weeksPerYear?.message}
                      />
                    </div>
                  </div>

                  {/* Energy Costs */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Energy Costs</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('electricityRate', { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        label="Electricity Rate ($/kWh)"
                        error={errors.electricityRate?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                        required
                      />

                      <Input
                        {...register('peakRatePremium', { valueAsNumber: true })}
                        type="number"
                        step="5"
                        label="Peak Rate Premium (%)"
                        error={errors.peakRatePremium?.message}
                        helperText="Additional cost during peak hours"
                      />

                      <Input
                        {...register('peakHoursPercentage', { valueAsNumber: true })}
                        type="number"
                        step="5"
                        label="Peak Hours Operation (%)"
                        error={errors.peakHoursPercentage?.message}
                      />
                    </div>
                    <div className="mt-3 rounded-lg bg-yellow-50 p-3 text-xs text-yellow-800">
                      <p className="font-semibold text-yellow-900 mb-1">Time-of-use simplification</p>
                      <p>
                        This model treats peak pricing as a simple percentage uplift on your base rate over a share of hours.
                        It does <span className="font-semibold">not</span> model detailed tariff ladders or demand charges.
                        Use it to explore rough savings from shifting work out of peak hours, then validate with your actual
                        tariff sheet.
                      </p>
                    </div>
                  </div>

                  {/* Auxiliary Systems */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Auxiliary Systems</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('coolingSystemPower', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label="Cooling System Power (kW)"
                        error={errors.coolingSystemPower?.message}
                      />

                      <Input
                        {...register('extractionSystemPower', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label="Extraction/Ventilation Power (kW)"
                        error={errors.extractionSystemPower?.message}
                      />

                      <Input
                        {...register('gridCarbonIntensity', { valueAsNumber: true })}
                        type="number"
                        step="10"
                        label="Grid Carbon Intensity (g CO2/kWh)"
                        error={errors.gridCarbonIntensity?.message}
                        helperText="Average for your region; adjust using your utility or government data"
                      />
                    </div>
                    <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
                      <p className="mb-1 font-semibold text-emerald-900">Typical regional values (order-of-magnitude)</p>
                      <ul className="ml-4 list-disc space-y-0.5">
                        <li>Coal-heavy grids: ~800–950 g CO2/kWh</li>
                        <li>Mixed generation (gas + renewables): ~350–550 g CO2/kWh</li>
                        <li>Hydro / nuclear heavy grids: ~20–100 g CO2/kWh</li>
                      </ul>
                      <p className="mt-1">
                        For serious carbon accounting, replace the default with numbers from your local utility or national
                        inventory.
                      </p>
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
                    {isCalculating ? 'Calculating...' : 'Calculate Energy Costs'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Summary */}
                  <div className="card bg-gradient-to-br from-green-600 to-green-800 text-white">
                    <h2 className="mb-6 text-3xl font-bold">Energy Cost Summary</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-green-100">Annual Cost</p>
                        <p className="text-3xl font-bold">${result.annualCost.toLocaleString()}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-green-100">Monthly Cost</p>
                        <p className="text-3xl font-bold">${result.monthlyCost.toLocaleString()}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-green-100">Daily Cost</p>
                        <p className="text-2xl font-semibold">${result.dailyCost.toFixed(2)}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-green-100">Cost Per Hour</p>
                        <p className="text-2xl font-semibold">${result.costPerOperatingHour.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Energy Consumption */}
                  <div className="card">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <Zap className="h-6 w-6 text-yellow-500" />
                      Energy Consumption
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Annual</p>
                        <p className="text-lg font-semibold">{result.annualEnergyConsumption.toLocaleString()} kWh</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Monthly</p>
                        <p className="text-lg font-semibold">{result.monthlyEnergyConsumption.toLocaleString()} kWh</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Total System Power</p>
                        <p className="text-lg font-semibold">{result.totalSystemPower} kW</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Power Efficiency</p>
                        <p className="text-lg font-semibold">{result.powerEfficiency}%</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Average Load</p>
                        <p className="text-lg font-semibold">{result.averagePowerConsumption} kW</p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">Auxiliary Cost Share</p>
                        <p className="text-lg font-semibold">
                          {auxiliaryShare.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Cooling + extraction portion of annual cost</p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Annual Cost Breakdown</h3>
                    <div className="space-y-3">
                      <CostItem label="Standard Rate" value={result.standardRateCost} />
                      <CostItem label="Peak Rate Premium" value={result.peakRateCost} />
                      <CostItem label="Auxiliary Systems" value={result.auxiliaryCost} />
                      <div className="border-t pt-3">
                        <CostItem label="Total Annual Cost" value={result.annualCost} isTotal />
                      </div>
                    </div>
                  </div>

                  {/* Carbon Footprint */}
                  <div className="card bg-green-50 border-green-200">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-green-900">
                      <Leaf className="h-6 w-6" />
                      Carbon Footprint
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-green-700">Annual CO2 Emissions</p>
                        <p className="text-2xl font-bold text-green-900">{result.annualCO2.toFixed(2)} tonnes</p>
                      </div>

                      <div>
                        <p className="text-sm text-green-700">Carbon Cost (at $50/tonne)</p>
                        <p className="text-2xl font-bold text-green-900">${result.carbonCostPerYear.toLocaleString()}</p>
                      </div>

                      <div>
                        <p className="text-sm text-green-700">Monthly CO2</p>
                        <p className="text-lg font-semibold text-green-900">{result.monthlyCO2.toFixed(0)} kg</p>
                      </div>

                      <div>
                        <p className="text-sm text-green-700">Daily CO2</p>
                        <p className="text-lg font-semibold text-green-900">{result.dailyCO2.toFixed(1)} kg</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-green-700">
                      For illustration, this model uses a simple tree-equivalent factor and shows {(result.annualCO2 * 2.5).toFixed(0)} notional tree offsets; actual sequestration per tree varies widely by species, age, and project.
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="card">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <TrendingUp className="h-6 w-6 text-primary-600" />
                      Energy Saving Recommendations
                    </h3>
                    <p className="mb-1 text-sm text-gray-600">
                      Modeled potential annual savings in this scenario:{' '}
                      <span className="font-semibold text-green-600">${calculateTotalPotentialSavings(result.recommendations).toLocaleString()}</span>
                    </p>
                    <p className="mb-4 text-xs text-gray-500">
                      These savings figures are based on simplified assumptions inside each recommendation. Use them as directional estimates and compare against your own tariffs, equipment data, and implementation plans.
                    </p>
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
                            <div className="ml-4 text-right">
                              <p className="text-xs text-gray-500">Potential Savings</p>
                              <p className="text-lg font-bold text-green-600">${rec.potentialSavings.toLocaleString()}/yr</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Validation guide */}
                  <div className="card bg-gray-50 border-gray-200">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">How to validate these estimates</h3>
                    <ol className="mb-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">
                      <li>
                        Pick one representative machine and time period, then gather its meter readings or utility bill data
                        (kWh and cost).
                      </li>
                      <li>
                        Enter the same operating hours and tariffs here and compare the modeled annual or monthly cost to
                        your real numbers.
                      </li>
                      <li>
                        Adjust average load, auxiliary power, and peak-hour share until the model lines up with reality, then
                        reuse those calibrated assumptions for similar equipment.
                      </li>
                    </ol>
                    <p className="text-xs text-gray-600">
                      As a rule of thumb: around 10% difference is excellent, up to about 20% is reasonable for planning, and
                      anything above 30% means you should revisit inputs or tariff details before using the results for major
                      decisions.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <ExportButton
                      title='Energy Cost Report'
                      calculationType='Energy Cost'
                      inputData={watchValues}
                      results={{
                        'Annual Cost': result.annualCost,
                        'Monthly Cost': result.monthlyCost,
                        'Daily Cost': result.dailyCost,
                        'Cost Per Operating Hour': result.costPerOperatingHour,
                        'Annual kWh': result.annualEnergyConsumption,
                        'Monthly kWh': result.monthlyEnergyConsumption,
                        'Daily kWh': result.dailyEnergyConsumption,
                        'Total System Power (kW)': result.totalSystemPower,
                        'Average Load (kW)': result.averagePowerConsumption,
                        'Auxiliary Cost ($/yr)': result.auxiliaryCost,
                        'Peak Rate Cost ($/yr)': result.peakRateCost,
                        'Standard Rate Cost ($/yr)': result.standardRateCost,
                        'Carbon Cost ($/yr)': result.carbonCostPerYear,
                      }}
                      recommendations={result.recommendations.map(rec => `${rec.title}: ${rec.description}`)}
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
                  <Zap className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">
                    Ready to Calculate Energy Costs
                  </h3>
                  <p className="text-gray-500">
                    Enter your equipment details to analyze energy consumption
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
        ${value.toLocaleString()}
      </span>
    </div>
  );
}
