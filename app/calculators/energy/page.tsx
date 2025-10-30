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
import { energySchema, energyDefaults, type EnergyInput } from '@/lib/validations/energy';
import { calculateEnergy, type EnergyResult, calculateTotalPotentialSavings } from '@/lib/calculators/energy';
import { Calculator, Download, RotateCcw, Zap, Leaf, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

export default function EnergyCalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = useState<EnergyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnergyInput>({
    resolver: zodResolver(energySchema),
    defaultValues: energyDefaults,
  });

  const onSubmit = async (data: EnergyInput) => {
    setIsCalculating(true);

    setTimeout(() => {
      const calculationResult = calculateEnergy(data);
      setResult(calculationResult);
      setIsCalculating(false);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
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
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Energy Cost Calculator
            </h1>
            <p className="text-xl text-gray-600">
              Calculate power consumption, energy costs, and carbon footprint
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Equipment Parameters</h2>
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
                        label="Grid Carbon Intensity (g CO₂/kWh)"
                        error={errors.gridCarbonIntensity?.message}
                        helperText="Average for your region"
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
                    <h2 className="mb-6 text-2xl font-bold">Energy Cost Summary</h2>

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
                        <p className="text-sm text-green-700">Annual CO₂ Emissions</p>
                        <p className="text-2xl font-bold text-green-900">{result.annualCO2.toFixed(2)} tonnes</p>
                      </div>

                      <div>
                        <p className="text-sm text-green-700">Carbon Cost (at $50/tonne)</p>
                        <p className="text-2xl font-bold text-green-900">${result.carbonCostPerYear.toLocaleString()}</p>
                      </div>

                      <div>
                        <p className="text-sm text-green-700">Monthly CO₂</p>
                        <p className="text-lg font-semibold text-green-900">{result.monthlyCO2.toFixed(0)} kg</p>
                      </div>

                      <div>
                        <p className="text-sm text-green-700">Daily CO₂</p>
                        <p className="text-lg font-semibold text-green-900">{result.dailyCO2.toFixed(1)} kg</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-green-700">
                      💡 Equivalent to {(result.annualCO2 * 2.5).toFixed(0)} trees needed to offset annual emissions
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="card">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <TrendingUp className="h-6 w-6 text-primary-600" />
                      Energy Saving Recommendations
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      Total Potential Annual Savings: <span className="font-semibold text-green-600">${calculateTotalPotentialSavings(result.recommendations).toLocaleString()}</span>
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

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      leftIcon={<Download className="h-5 w-5" />}
                    >
                      Export Energy Report
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

