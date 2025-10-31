'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  markingCalculatorSchema,
  type MarkingCalculatorInput,
  MARKING_SPEED_TABLE,
  DEPTH_SPEED_FACTOR,
  getPowerEfficiency,
  MATERIAL_LABELS,
  METHOD_LABELS,
  JOB_TYPE_LABELS,
  type MarkingMaterialType,
  type MarkingMethod,
} from '@/lib/validations/marking';
import { Navigation } from '@/components/layout/Navigation';
import { Calculator, Zap, DollarSign, Clock, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateHowToSchema, generateFAQSchema } from '@/lib/seo/schema';

interface MarkingResult {
  // Time calculations
  baseSpeedMm2PerSec: number;
  adjustedSpeedMm2PerSec: number;
  markingTimePerPieceSec: number;
  setupTimePerPieceSec: number;
  totalTimePerPieceSec: number;
  totalJobTimeSec: number;
  totalJobTimeFormatted: string;

  // Cost calculations
  depreciationPerHour: number;
  electricityPerHour: number;
  totalHourlyCost: number;
  costPerPiece: number;
  totalJobCost: number;
  materialCostPerPiece: number; // Negligible for marking
  profitMargin: number;
  recommendedPrice: number;

  // Efficiency metrics
  piecesPerHour: number;
  revenuePerHour: number;
  utilizationRate: number;
}

function calculateMarking(input: MarkingCalculatorInput): MarkingResult | null {
  // Get base speed from table
  const baseSpeed = MARKING_SPEED_TABLE[input.materialType][input.markingMethod];
  
  if (baseSpeed === null) {
    return null; // Invalid combination
  }

  // Adjust speed for depth (deeper = slower)
  const depthFactor = Math.pow(DEPTH_SPEED_FACTOR, input.markingDepth);
  const adjustedSpeed = baseSpeed * depthFactor;

  // Adjust for fill density (higher density = slower)
  const densityFactor = 10 / input.fillDensity; // Normalized to 10 lines/mm
  const finalSpeed = adjustedSpeed * densityFactor;

  // Calculate marking time per piece
  const markingTimePerPiece = (input.markingAreaMm2 / finalSpeed) * input.passes;

  // Setup time per piece (loading, positioning, unloading)
  const setupTimePerPiece = input.quantity > 100 ? 5 : input.quantity > 10 ? 8 : 12;

  const totalTimePerPiece = markingTimePerPiece + setupTimePerPiece;
  const totalJobTime = totalTimePerPiece * input.quantity;

  // Format total time
  const hours = Math.floor(totalJobTime / 3600);
  const minutes = Math.floor((totalJobTime % 3600) / 60);
  const seconds = Math.floor(totalJobTime % 60);
  const totalJobTimeFormatted =
    hours > 0 ? `${hours}h ${minutes}m` : minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  // Calculate hourly costs
  const depreciationPerHour =
    input.equipmentCost / (input.equipmentLifespanYears * input.annualWorkingHours);
  const powerEfficiency = getPowerEfficiency(input.laserPowerWatts);
  const electricityPerHour = (input.laserPowerWatts / 1000) * input.electricityRatePerKwh / powerEfficiency;
  const totalHourlyCost =
    depreciationPerHour +
    electricityPerHour +
    input.laborRatePerHour +
    input.overheadRatePerHour +
    input.maintenanceRatePerHour;

  // Cost per piece
  const costPerPiece = (totalTimePerPiece / 3600) * totalHourlyCost;
  const totalJobCost = costPerPiece * input.quantity;

  // Material cost (negligible for marking)
  const materialCostPerPiece = 0;

  // Recommended pricing with margin
  const profitMargin = 0.35; // 35% margin
  const recommendedPrice = costPerPiece / (1 - profitMargin);

  // Efficiency metrics
  const piecesPerHour = 3600 / totalTimePerPiece;
  const revenuePerHour = piecesPerHour * recommendedPrice;
  const utilizationRate = (markingTimePerPiece / totalTimePerPiece) * 100;

  return {
    baseSpeedMm2PerSec: Number(baseSpeed.toFixed(1)),
    adjustedSpeedMm2PerSec: Number(finalSpeed.toFixed(1)),
    markingTimePerPieceSec: Number(markingTimePerPiece.toFixed(1)),
    setupTimePerPieceSec: Number(setupTimePerPiece.toFixed(1)),
    totalTimePerPieceSec: Number(totalTimePerPiece.toFixed(1)),
    totalJobTimeSec: Number(totalJobTime.toFixed(1)),
    totalJobTimeFormatted,
    depreciationPerHour: Number(depreciationPerHour.toFixed(2)),
    electricityPerHour: Number(electricityPerHour.toFixed(2)),
    totalHourlyCost: Number(totalHourlyCost.toFixed(2)),
    costPerPiece: Number(costPerPiece.toFixed(4)),
    totalJobCost: Number(totalJobCost.toFixed(2)),
    materialCostPerPiece: 0,
    profitMargin: Number((profitMargin * 100).toFixed(0)),
    recommendedPrice: Number(recommendedPrice.toFixed(4)),
    piecesPerHour: Number(piecesPerHour.toFixed(1)),
    revenuePerHour: Number(revenuePerHour.toFixed(2)),
    utilizationRate: Number(utilizationRate.toFixed(1)),
  };
}

export default function MarkingCalculatorPage() {
  const [result, setResult] = useState<MarkingResult | null>(null);
  const [isInvalidCombination, setIsInvalidCombination] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<MarkingCalculatorInput>({
    resolver: zodResolver(markingCalculatorSchema),
    defaultValues: {
      materialType: 'stainless_steel',
      markingMethod: 'annealing',
      jobType: 'serial_number',
      markingAreaMm2: 2500,
      markingDepth: 0.1,
      quantity: 100,
      laserPowerWatts: 30,
      equipmentCost: 50000,
      equipmentLifespanYears: 8,
      annualWorkingHours: 2000,
      electricityRatePerKwh: 0.12,
      laborRatePerHour: 20,
      overheadRatePerHour: 5,
      maintenanceRatePerHour: 2,
      fillDensity: 10,
      passes: 1,
    },
  });

  const materialType = watch('materialType');
  const markingMethod = watch('markingMethod');

  const onSubmit = (data: MarkingCalculatorInput) => {
    const calcResult = calculateMarking(data);
    if (calcResult === null) {
      setIsInvalidCombination(true);
      setResult(null);
    } else {
      setIsInvalidCombination(false);
      setResult(calcResult);
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setIsInvalidCombination(false);
  };

  // Check if current combination is valid
  const isValidCombination =
    MARKING_SPEED_TABLE[materialType as MarkingMaterialType]?.[markingMethod as MarkingMethod] !== null;

  // Schema markup for SEO
  const howToSchema = generateHowToSchema({
    name: 'Calculate Laser Marking Cost',
    description: 'Step-by-step guide to calculate laser marking and engraving costs',
    steps: [
      {
        name: 'Select Material and Marking Method',
        text: 'Choose your material type and the appropriate marking method (annealing, engraving, etching, etc.)',
      },
      {
        name: 'Enter Job Specifications',
        text: 'Input marking area (mm²), depth, quantity, and quality settings like fill density and passes',
      },
      {
        name: 'Configure Equipment Parameters',
        text: 'Enter laser power, equipment cost, lifespan, and annual working hours',
      },
      {
        name: 'Set Operating Costs',
        text: 'Define electricity rate, labor rate, overhead, and maintenance costs',
      },
      {
        name: 'Calculate and Analyze',
        text: 'Review time estimates, cost breakdown, and recommended pricing with profit margins',
      },
    ],
  });

  const faqSchema = generateFAQSchema([
    {
      question: 'What is the difference between laser annealing and engraving?',
      answer:
        'Annealing creates a color mark on metal surfaces through heat without removing material, ideal for permanent marks on stainless steel. Engraving removes material to create deep, tactile marks suitable for various materials.',
    },
    {
      question: 'How does marking depth affect processing time?',
      answer:
        'Deeper marks require more laser passes or slower speeds, increasing processing time. The speed reduction is approximately 30% per mm of depth. For production efficiency, use the minimum depth needed for durability.',
    },
    {
      question: 'What laser power is recommended for marking?',
      answer:
        '20-30W fiber lasers are ideal for most metal marking applications. 50-100W lasers are better for deep engraving or high-speed production. Lower power lasers are more cost-effective for standard marking jobs.',
    },
    {
      question: 'How to price laser marking services?',
      answer:
        'Calculate your total hourly cost (depreciation, electricity, labor, overhead), determine pieces per hour, then add 30-40% profit margin. Consider market rates, job complexity, and setup time. Volume discounts typically range from 10-30%.',
    },
    {
      question: 'What is fill density in laser marking?',
      answer:
        'Fill density refers to the number of marking lines per millimeter. Higher density (15-20 lines/mm) creates darker, more solid marks but takes longer. Lower density (5-10 lines/mm) is faster but may appear lighter.',
    },
  ]);

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <Calculator className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Laser Marking & Engraving Cost Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate precise costs for laser marking, engraving, and etching across all materials. 
              Optimize pricing with real-time analysis of speed, power, and profitability. 
              See our{' '}
              <Link href="/calculators/quick-reference/processing-parameters" className="text-purple-600 hover:text-purple-700 underline">
                processing parameters reference
              </Link>{' '}
              for detailed settings.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-purple-600" />
                Job Parameters
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Material & Method */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Type
                    </label>
                    <select
                      {...register('materialType')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(MATERIAL_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marking Method
                    </label>
                    <select
                      {...register('markingMethod')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {Object.entries(METHOD_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {!isValidCombination && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">
                      This material and method combination is not compatible. Please select a different marking method.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    {...register('jobType')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Specifications */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Specifications</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marking Area (mm²)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('markingAreaMm2', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.markingAreaMm2 && (
                        <p className="mt-1 text-sm text-red-600">{errors.markingAreaMm2.message}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        e.g., 50×50mm = 2500mm²
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Depth (mm)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('markingDepth', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.markingDepth && (
                        <p className="mt-1 text-sm text-red-600">{errors.markingDepth.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('quantity', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.quantity && (
                        <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quality Settings */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fill Density (lines/mm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('fillDensity', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.fillDensity && (
                        <p className="mt-1 text-sm text-red-600">{errors.fillDensity.message}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Higher = darker/slower
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passes
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('passes', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.passes && (
                        <p className="mt-1 text-sm text-red-600">{errors.passes.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Equipment</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Laser Power (Watts)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('laserPowerWatts', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.laserPowerWatts && (
                        <p className="mt-1 text-sm text-red-600">{errors.laserPowerWatts.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Equipment Cost ($)
                      </label>
                      <input
                        type="number"
                        step="1000"
                        {...register('equipmentCost', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.equipmentCost && (
                        <p className="mt-1 text-sm text-red-600">{errors.equipmentCost.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lifespan (years)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('equipmentLifespanYears', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.equipmentLifespanYears && (
                        <p className="mt-1 text-sm text-red-600">{errors.equipmentLifespanYears.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Hours
                      </label>
                      <input
                        type="number"
                        step="100"
                        {...register('annualWorkingHours', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.annualWorkingHours && (
                        <p className="mt-1 text-sm text-red-600">{errors.annualWorkingHours.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Operating Costs */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Operating Costs</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Electricity Rate ($/kWh)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('electricityRatePerKwh', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.electricityRatePerKwh && (
                        <p className="mt-1 text-sm text-red-600">{errors.electricityRatePerKwh.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Labor Rate ($/hr)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('laborRatePerHour', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.laborRatePerHour && (
                        <p className="mt-1 text-sm text-red-600">{errors.laborRatePerHour.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overhead ($/hr)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        {...register('overheadRatePerHour', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.overheadRatePerHour && (
                        <p className="mt-1 text-sm text-red-600">{errors.overheadRatePerHour.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maintenance ($/hr)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        {...register('maintenanceRatePerHour', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.maintenanceRatePerHour && (
                        <p className="mt-1 text-sm text-red-600">{errors.maintenanceRatePerHour.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={!isValidCombination}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Calculate Cost
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {isInvalidCombination && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-red-900 mb-2">Invalid Combination</h3>
                      <p className="text-red-800">
                        The selected material and marking method are not compatible. 
                        Please choose a different marking method for this material.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <>
                  {/* Time Analysis */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-6 h-6 mr-2 text-purple-600" />
                      Time Analysis
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Base Speed:</span>
                        <span className="font-semibold">{result.baseSpeedMm2PerSec} mm²/s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Adjusted Speed:</span>
                        <span className="font-semibold">{result.adjustedSpeedMm2PerSec} mm²/s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Marking Time/Piece:</span>
                        <span className="font-semibold">{result.markingTimePerPieceSec}s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Setup Time/Piece:</span>
                        <span className="font-semibold">{result.setupTimePerPieceSec}s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b bg-purple-50 -mx-2 px-2 rounded">
                        <span className="font-semibold text-gray-900">Total Time/Piece:</span>
                        <span className="font-bold text-purple-600">{result.totalTimePerPieceSec}s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-purple-100 -mx-2 px-2 rounded">
                        <span className="font-semibold text-gray-900">Total Job Time:</span>
                        <span className="font-bold text-purple-700 text-lg">{result.totalJobTimeFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                      Cost Breakdown
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Depreciation/Hour:</span>
                        <span className="font-semibold">${result.depreciationPerHour}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Electricity/Hour:</span>
                        <span className="font-semibold">${result.electricityPerHour}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b bg-green-50 -mx-2 px-2 rounded">
                        <span className="font-semibold text-gray-900">Total Hourly Cost:</span>
                        <span className="font-bold text-green-600">${result.totalHourlyCost}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Cost/Piece:</span>
                        <span className="font-semibold">${result.costPerPiece}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-green-100 -mx-2 px-2 rounded">
                        <span className="font-semibold text-gray-900">Total Job Cost:</span>
                        <span className="font-bold text-green-700 text-lg">${result.totalJobCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Recommendation */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 border-2 border-green-200">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                      Pricing Recommendation
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Profit Margin:</span>
                        <span className="font-semibold">{result.profitMargin}%</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-white -mx-2 px-2 rounded-lg border-2 border-green-300">
                        <span className="font-bold text-gray-900">Recommended Price/Piece:</span>
                        <span className="font-bold text-green-700 text-xl">${result.recommendedPrice}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Total Quote:</span>
                        <span className="font-bold text-green-700 text-lg">
                          ${(result.recommendedPrice * watch('quantity')).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Metrics */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                      <Zap className="w-6 h-6 mr-2 text-yellow-600" />
                      Efficiency Metrics
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Pieces/Hour:</span>
                        <span className="font-semibold">{result.piecesPerHour}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Revenue/Hour:</span>
                        <span className="font-semibold">${result.revenuePerHour}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Utilization Rate:</span>
                        <span className="font-semibold">{result.utilizationRate}%</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!result && !isInvalidCombination && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-12 text-center border-2 border-dashed border-purple-300">
                  <Calculator className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">
                    Enter your job parameters and click "Calculate Cost" to see detailed time and cost analysis.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-blue-600" />
              Optimization Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Speed Optimization
                </h3>
                <ul className="text-sm text-blue-800 space-y-1 ml-7">
                  <li>• Use minimum depth needed for durability</li>
                  <li>• Reduce fill density for faster marking</li>
                  <li>• Batch similar jobs to minimize setup</li>
                  <li>• Use higher power lasers for production</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Cost Reduction
                </h3>
                <ul className="text-sm text-green-800 space-y-1 ml-7">
                  <li>• Maximize equipment utilization (2000+ hrs/year)</li>
                  <li>• Use off-peak electricity rates</li>
                  <li>• Regular maintenance prevents downtime</li>
                  <li>• Train operators for faster setup</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Quality Balance
                </h3>
                <ul className="text-sm text-purple-800 space-y-1 ml-7">
                  <li>• Test settings before production runs</li>
                  <li>• Match depth to application requirements</li>
                  <li>• Choose appropriate marking method</li>
                  <li>• Consider material reflectivity</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Pricing Strategy
                </h3>
                <ul className="text-sm text-orange-800 space-y-1 ml-7">
                  <li>• Offer volume discounts (10-30%)</li>
                  <li>• Charge setup fees for small batches</li>
                  <li>• Premium pricing for rush jobs</li>
                  <li>• Bundle related marking services</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/calculators/quick/hourly-rate"
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Hourly Rate Calculator</h4>
                <p className="text-sm text-gray-600">Calculate true hourly operating costs</p>
              </Link>
              <Link
                href="/calculators/quick-reference/processing-parameters"
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Processing Parameters</h4>
                <p className="text-sm text-gray-600">Comprehensive parameter tables</p>
              </Link>
              <Link
                href="/calculators/quick-reference/power-consumption"
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Power Consumption</h4>
                <p className="text-sm text-gray-600">Energy cost reference tables</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


















