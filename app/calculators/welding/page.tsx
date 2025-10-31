'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  weldingCalculatorSchema,
  type WeldingCalculatorInput,
  WELDING_SPEED_TABLE,
  SPOT_WELD_TIME_TABLE,
  getWeldingPowerEfficiency,
  WELDING_MATERIAL_LABELS,
  WELDING_PROCESS_LABELS,
  JOINT_TYPE_LABELS,
  GAS_TYPE_LABELS,
  type WeldingMaterialType,
  type WeldingProcessType,
} from '@/lib/validations/welding';
import { Navigation } from '@/components/layout/Navigation';
import { Calculator, Zap, DollarSign, Clock, TrendingUp, CheckCircle, Info, Flame } from 'lucide-react';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateHowToSchema, generateFAQSchema } from '@/lib/seo/schema';

interface WeldingResult {
  // Time calculations
  weldSpeedMmPerSec: number;
  weldTimePerPieceSec: number;
  setupTimePerPieceMin: number;
  totalTimePerPieceSec: number;
  totalBatchTimeSec: number;
  totalBatchTimeFormatted: string;

  // Cost calculations
  depreciationPerHour: number;
  electricityPerHour: number;
  gasCostPerHour: number;
  totalHourlyCost: number;
  costPerPiece: number;
  totalBatchCost: number;

  // Pricing
  profitMargin: number;
  recommendedPrice: number;

  // Efficiency
  piecesPerHour: number;
  revenuePerHour: number;
  utilizationRate: number;
}

function calculateWelding(input: WeldingCalculatorInput): WeldingResult {
  // Calculate weld speed
  let weldSpeed: number;
  if (input.weldingProcess === 'spot') {
    // Spot welding uses time per spot
    const timePerSpot = SPOT_WELD_TIME_TABLE[input.materialType](input.materialThicknessMm);
    // Convert to effective speed (assuming spots are 5mm apart on average)
    weldSpeed = 5 / timePerSpot;
  } else {
    const speedFunc = WELDING_SPEED_TABLE[input.materialType][input.weldingProcess];
    weldSpeed = speedFunc(input.materialThicknessMm, input.laserPowerWatts);
  }

  // Weld time per piece
  const weldTimePerPiece = (input.weldLengthMm / weldSpeed) * input.numberOfWelds;

  // Setup time per piece (distributed across batch)
  const setupTimePerPieceMin = input.setupTimePerBatchMin / input.quantityPerBatch;

  // Additional time for special treatments
  let additionalTimeMin = input.qualityInspectionTimeMin;
  if (input.requiresPreheat) additionalTimeMin += 5;
  if (input.requiresPostHeatTreatment) additionalTimeMin += 10;

  const totalTimePerPiece = weldTimePerPiece + (setupTimePerPieceMin + additionalTimeMin) * 60;
  const totalBatchTime = totalTimePerPiece * input.quantityPerBatch;

  // Format batch time
  const hours = Math.floor(totalBatchTime / 3600);
  const minutes = Math.floor((totalBatchTime % 3600) / 60);
  const seconds = Math.floor(totalBatchTime % 60);
  const totalBatchTimeFormatted =
    hours > 0 ? `${hours}h ${minutes}m` : minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  // Calculate hourly costs
  const depreciationPerHour =
    input.equipmentCost / (input.equipmentLifespanYears * input.annualWorkingHours);
  
  const powerEfficiency = getWeldingPowerEfficiency(input.laserPowerWatts);
  const electricityPerHour = (input.laserPowerWatts / 1000) * input.electricityRatePerKwh / powerEfficiency;
  
  // Gas cost per hour
  const gasCostPerHour = input.shieldingGasType === 'none' 
    ? 0 
    : (input.gasFlowRateLPerMin * 60 * input.gasCostPerM3) / 1000;

  const totalHourlyCost =
    depreciationPerHour +
    electricityPerHour +
    gasCostPerHour +
    input.laborRatePerHour +
    input.overheadRatePerHour +
    input.maintenanceRatePerHour;

  // Cost per piece
  const costPerPiece = (totalTimePerPiece / 3600) * totalHourlyCost;
  const totalBatchCost = costPerPiece * input.quantityPerBatch;

  // Recommended pricing with margin
  const profitMargin = 0.40; // 40% margin for welding
  const recommendedPrice = costPerPiece / (1 - profitMargin);

  // Efficiency metrics
  const piecesPerHour = 3600 / totalTimePerPiece;
  const revenuePerHour = piecesPerHour * recommendedPrice;
  const utilizationRate = (weldTimePerPiece / totalTimePerPiece) * 100;

  return {
    weldSpeedMmPerSec: Number(weldSpeed.toFixed(1)),
    weldTimePerPieceSec: Number(weldTimePerPiece.toFixed(1)),
    setupTimePerPieceMin: Number(setupTimePerPieceMin.toFixed(2)),
    totalTimePerPieceSec: Number(totalTimePerPiece.toFixed(1)),
    totalBatchTimeSec: Number(totalBatchTime.toFixed(1)),
    totalBatchTimeFormatted,
    depreciationPerHour: Number(depreciationPerHour.toFixed(2)),
    electricityPerHour: Number(electricityPerHour.toFixed(2)),
    gasCostPerHour: Number(gasCostPerHour.toFixed(2)),
    totalHourlyCost: Number(totalHourlyCost.toFixed(2)),
    costPerPiece: Number(costPerPiece.toFixed(2)),
    totalBatchCost: Number(totalBatchCost.toFixed(2)),
    profitMargin: Number((profitMargin * 100).toFixed(0)),
    recommendedPrice: Number(recommendedPrice.toFixed(2)),
    piecesPerHour: Number(piecesPerHour.toFixed(1)),
    revenuePerHour: Number(revenuePerHour.toFixed(2)),
    utilizationRate: Number(utilizationRate.toFixed(1)),
  };
}

export default function WeldingCalculatorPage() {
  const [result, setResult] = useState<WeldingResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<WeldingCalculatorInput>({
    resolver: zodResolver(weldingCalculatorSchema),
    defaultValues: {
      weldingProcess: 'seam',
      materialType: 'mild_steel',
      jointType: 'butt_joint',
      materialThicknessMm: 2,
      weldLengthMm: 500,
      numberOfWelds: 1,
      weldSpeedMmPerSec: 20,
      laserPowerWatts: 1500,
      equipmentCost: 150000,
      equipmentLifespanYears: 10,
      annualWorkingHours: 2000,
      electricityRatePerKwh: 0.12,
      shieldingGasType: 'argon',
      gasFlowRateLPerMin: 15,
      gasCostPerM3: 50,
      laborRatePerHour: 35,
      overheadRatePerHour: 10,
      maintenanceRatePerHour: 5,
      requiresPreheat: false,
      requiresPostHeatTreatment: false,
      qualityInspectionTimeMin: 0,
      setupTimePerBatchMin: 15,
      quantityPerBatch: 1,
    },
  });

  const onSubmit = (data: WeldingCalculatorInput) => {
    const calcResult = calculateWelding(data);
    setResult(calcResult);
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  // Schema markup for SEO
  const howToSchema = generateHowToSchema({
    name: 'Calculate Laser Welding Cost',
    description: 'Step-by-step guide to calculate laser welding costs accurately',
    steps: [
      {
        name: 'Select Welding Process and Material',
        text: 'Choose your welding process type (conduction, keyhole, seam, spot, etc.) and material (mild steel, stainless steel, aluminum, etc.)',
      },
      {
        name: 'Enter Weld Specifications',
        text: 'Input material thickness, weld length, number of welds per piece, and batch quantity',
      },
      {
        name: 'Configure Equipment Settings',
        text: 'Enter laser power, equipment cost, lifespan, and annual working hours',
      },
      {
        name: 'Set Operating Costs',
        text: 'Define electricity rate, shielding gas type and cost, labor rate, overhead, and maintenance costs',
      },
      {
        name: 'Add Quality Requirements',
        text: 'Specify if preheat, post-heat treatment, or quality inspection is required',
      },
      {
        name: 'Calculate and Analyze',
        text: 'Review welding speed, time estimates, cost breakdown, and recommended pricing with profit margins',
      },
    ],
  });

  const faqSchema = generateFAQSchema([
    {
      question: 'What is the difference between conduction and keyhole welding?',
      answer:
        'Conduction welding uses lower power to melt and fuse material surfaces, creating wider, shallower welds. Keyhole welding uses higher power to create deep penetration through vaporization, ideal for thicker materials and butt joints.',
    },
    {
      question: 'What shielding gas should I use for laser welding?',
      answer:
        'Argon is most common for stainless steel and aluminum, providing good protection and weld quality. Helium offers deeper penetration for thick materials. Nitrogen is economical for mild steel. Some applications use no shielding gas for thin materials.',
    },
    {
      question: 'How much power do I need for laser welding?',
      answer:
        '1-2kW fiber lasers handle most thin sheet metal (0.5-3mm). 2-4kW is ideal for general fabrication (2-6mm). 4-10kW+ is needed for thick plate welding and high-speed production. Higher power increases speed but also equipment and operating costs.',
    },
    {
      question: 'Why does welding cost more than cutting?',
      answer:
        'Welding requires higher precision, slower speeds, shielding gas, potential pre/post-heat treatment, and more stringent quality control. Setup time per piece is often higher, and skilled operators command higher wages. The profit margin also reflects the higher risk and quality requirements.',
    },
    {
      question: 'What factors affect welding speed?',
      answer:
        'Material type and thickness, laser power, welding process (conduction vs keyhole), joint fit-up quality, required penetration depth, and quality requirements. Aluminum welds faster than stainless steel. Keyhole welding is faster than conduction for thick materials.',
    },
  ]);

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <Flame className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Laser Welding Cost Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate accurate laser welding costs for all processes and materials. 
              Optimize pricing with comprehensive cost analysis including gas, power, and labor. 
              See our{' '}
              <Link href="/calculators/quick-reference/power-consumption" className="text-orange-600 hover:text-orange-700 underline">
                power consumption reference
              </Link>{' '}
              for energy costs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-orange-600" />
                Welding Parameters
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Process & Material */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Welding Process
                    </label>
                    <select
                      {...register('weldingProcess')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {Object.entries(WELDING_PROCESS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Type
                    </label>
                    <select
                      {...register('materialType')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {Object.entries(WELDING_MATERIAL_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joint Type
                  </label>
                  <select
                    {...register('jointType')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {Object.entries(JOINT_TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weld Specifications */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Weld Specifications</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thickness (mm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('materialThicknessMm', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.materialThicknessMm && (
                        <p className="mt-1 text-sm text-red-600">{errors.materialThicknessMm.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weld Length (mm)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('weldLengthMm', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.weldLengthMm && (
                        <p className="mt-1 text-sm text-red-600">{errors.weldLengthMm.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        # of Welds
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('numberOfWelds', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.numberOfWelds && (
                        <p className="mt-1 text-sm text-red-600">{errors.numberOfWelds.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Equipment</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Laser Power (Watts)
                      </label>
                      <input
                        type="number"
                        step="100"
                        {...register('laserPowerWatts', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.annualWorkingHours && (
                        <p className="mt-1 text-sm text-red-600">{errors.annualWorkingHours.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Operating Costs */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Operating Costs</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Electricity ($/kWh)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('electricityRatePerKwh', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.electricityRatePerKwh && (
                        <p className="mt-1 text-sm text-red-600">{errors.electricityRatePerKwh.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shielding Gas
                      </label>
                      <select
                        {...register('shieldingGasType')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {Object.entries(GAS_TYPE_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gas Flow (L/min)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('gasFlowRateLPerMin', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.gasFlowRateLPerMin && (
                        <p className="mt-1 text-sm text-red-600">{errors.gasFlowRateLPerMin.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gas Cost ($/m³)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('gasCostPerM3', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.gasCostPerM3 && (
                        <p className="mt-1 text-sm text-red-600">{errors.gasCostPerM3.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Labor ($/hr)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('laborRatePerHour', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        step="1"
                        {...register('overheadRatePerHour', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.maintenanceRatePerHour && (
                        <p className="mt-1 text-sm text-red-600">{errors.maintenanceRatePerHour.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quality & Batch */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Quality & Batch</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('requiresPreheat')}
                        className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Requires Preheat (+5 min)
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('requiresPostHeatTreatment')}
                        className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Post Heat Treatment (+10 min)
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inspection Time (min)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('qualityInspectionTimeMin', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.qualityInspectionTimeMin && (
                        <p className="mt-1 text-sm text-red-600">{errors.qualityInspectionTimeMin.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Setup Time (min/batch)
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('setupTimePerBatchMin', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.setupTimePerBatchMin && (
                        <p className="mt-1 text-sm text-red-600">{errors.setupTimePerBatchMin.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity per Batch
                      </label>
                      <input
                        type="number"
                        step="1"
                        {...register('quantityPerBatch', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.quantityPerBatch && (
                        <p className="mt-1 text-sm text-red-600">{errors.quantityPerBatch.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
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
              {result && (
                <>
                  {/* Time Analysis */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-6 h-6 mr-2 text-orange-600" />
                      Time Analysis
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Weld Speed:</span>
                        <span className="font-semibold">{result.weldSpeedMmPerSec} mm/s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Weld Time/Piece:</span>
                        <span className="font-semibold">{result.weldTimePerPieceSec}s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Setup Time/Piece:</span>
                        <span className="font-semibold">{result.setupTimePerPieceMin} min</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b bg-orange-50 -mx-2 px-2 rounded">
                        <span className="font-semibold text-gray-900">Total Time/Piece:</span>
                        <span className="font-bold text-orange-600">{result.totalTimePerPieceSec}s</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-orange-100 -mx-2 px-2 rounded">
                        <span className="font-semibold text-gray-900">Total Batch Time:</span>
                        <span className="font-bold text-orange-700 text-lg">{result.totalBatchTimeFormatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
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
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Gas Cost/Hour:</span>
                        <span className="font-semibold">${result.gasCostPerHour}</span>
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
                        <span className="font-semibold text-gray-900">Total Batch Cost:</span>
                        <span className="font-bold text-green-700 text-lg">${result.totalBatchCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Recommendation */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 border-2 border-green-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
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
                          ${(result.recommendedPrice * watch('quantityPerBatch')).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Metrics */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
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

              {!result && (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-xl p-12 text-center border-2 border-dashed border-orange-300">
                  <Calculator className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">
                    Enter your welding parameters and click "Calculate Cost" to see detailed analysis.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-blue-600" />
              Welding Optimization Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Process Selection
                </h3>
                <ul className="text-sm text-blue-800 space-y-1 ml-7">
                  <li>• Use keyhole for thick materials (&gt;3mm)</li>
                  <li>• Conduction mode for thin sheet (&lt;2mm)</li>
                  <li>• Seam welding for continuous joints</li>
                  <li>• Spot welding for quick tack welds</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Cost Reduction
                </h3>
                <ul className="text-sm text-green-800 space-y-1 ml-7">
                  <li>• Maximize batch sizes to reduce setup time</li>
                  <li>• Use nitrogen instead of argon for mild steel</li>
                  <li>• Optimize gas flow (15-20 L/min typical)</li>
                  <li>• Regular maintenance prevents costly failures</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Quality Improvement
                </h3>
                <ul className="text-sm text-purple-800 space-y-1 ml-7">
                  <li>• Ensure proper joint fit-up (gap &lt;0.2mm)</li>
                  <li>• Use appropriate shielding gas for material</li>
                  <li>• Preheat thick sections to prevent cracking</li>
                  <li>• Post-weld heat treatment for stress relief</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Pricing Strategy
                </h3>
                <ul className="text-sm text-orange-800 space-y-1 ml-7">
                  <li>• 40%+ margin for complex welding jobs</li>
                  <li>• Charge setup fees for small batches</li>
                  <li>• Premium pricing for certified welds</li>
                  <li>• Volume discounts at 50+ pieces</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/calculators/marking"
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Marking Calculator</h4>
                <p className="text-sm text-gray-600">Calculate laser marking costs</p>
              </Link>
              <Link
                href="/calculators/quick/hourly-rate"
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-1">Hourly Rate Calculator</h4>
                <p className="text-sm text-gray-600">Calculate true hourly operating costs</p>
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







