'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  weldingCalculatorSchema,
  type WeldingCalculatorInput,
  WELDING_MATERIAL_LABELS,
  WELDING_PROCESS_LABELS,
  JOINT_TYPE_LABELS,
  GAS_TYPE_LABELS,
} from '@/lib/validations/welding';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Calculator, Zap, DollarSign, Clock, TrendingUp, CheckCircle, Info, Flame, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import {
  generateHowToSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { calculateWelding, type WeldingResult } from '@/lib/calculators/welding';
import { ExportButton } from '@/components/calculators/ExportButton';
import { saveCalculationToAPI } from '@/lib/utils/api-client';

export default function WeldingCalculatorPage() {
  const [result, setResult] = useState<WeldingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

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

  const watchValues = watch();

  const onSubmit = async (data: WeldingCalculatorInput) => {
    setIsCalculating(true);

    try {
      const calcResult = calculateWelding(data);
      setResult(calcResult);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      const saveResult = await saveCalculationToAPI({
        tool_type: 'welding',
        input_params: data,
        result: calcResult as unknown as Record<string, unknown>,
      });

      if (!saveResult.success) {
        console.error('Failed to save calculation:', saveResult.error);
      }
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  // Schema markup for SEO
  const howToSchema = generateHowToSchema({
    name: 'Calculate Laser Welding Cost',
    description: 'Step-by-step guide to estimate laser welding costs based on your inputs',
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
        'Argon is commonly used for stainless steel and aluminum to provide protection and weld quality. Helium can be chosen for deeper penetration on some thicker materials. Nitrogen may be used for certain mild steel applications depending on your procedure, and some thin-gauge jobs use no shielding gas at all. Always follow your qualified welding procedures and supplier guidance when selecting shielding gas.',
    },
    {
      question: 'How much power do I need for laser welding?',
      answer:
        'Required laser power depends on material, thickness, weld geometry, and desired speed. Higher power generally allows faster welding or thicker sections, but also increases equipment and operating costs. Follow your equipment supplier’s recommended power levels for your applications and enter the actual power you plan to use into this calculator.',
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

  const softwareSchema = generateSoftwareApplicationSchema('Laser Welding Cost Calculator');

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={softwareSchema} />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Compact */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Laser Welding Cost Calculator
            </h1>
            <p className="text-base text-gray-600">
              Estimate laser welding costs for different processes and materials.
            </p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-orange-500 bg-orange-50 px-4 py-3">
            <p className="text-sm text-orange-900">
              <Flame className="mr-2 inline h-4 w-4" />
              <strong>Estimates Only:</strong> Results are based on simplified welding models and assume consistent joint fit-up,
              stable material properties, and typical shop practices. Actual costs depend on joint quality, material condition,
              qualified procedures, and inspection level. Always test with your own welding procedures and compare against real
              job data before committing quotes.
            </p>
          </div>

          {/* When to choose laser welding */}
          <div className="mb-8 card bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-600" />
              When to Choose Laser Welding
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-green-700 mb-2">✓ Best for:</p>
                <ul className="text-xs text-gray-700 space-y-1 ml-4">
                  <li>• Thin to medium sections where distortion matters</li>
                  <li>• High-precision parts and sealed joints</li>
                  <li>• Dissimilar materials and hard-to-reach joints</li>
                  <li>• High-volume, repeatable production</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-amber-700 mb-2">⚠️ Traditional welding may be better when:</p>
                <ul className="text-xs text-gray-700 space-y-1 ml-4">
                  <li>• Fit-up gaps are large or inconsistent</li>
                  <li>• Very thick sections (&gt;20 mm) dominate the job</li>
                  <li>• Work is mostly field welding or repair</li>
                  <li>• Lowest equipment cost is more important than speed</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 pt-3 border-t border-orange-200 text-xs text-gray-600">
              For capital decisions, combine this calculator with the ROI and Energy calculators to capture the full picture.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Weld Specifications</h3>
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
                  {watchValues.weldingProcess && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        {WELDING_PROCESS_LABELS[watchValues.weldingProcess]} – typical use
                      </p>
                      <p className="text-xs text-blue-800">
                        Conduction is usually best for thin materials and cosmetic welds; keyhole for deeper penetration on
                        thicker sections; seam for continuous joints; spot for discrete points. Match your process to material
                        thickness and joint design.
                      </p>
                    </div>
                  )}
                  {watchValues.materialThicknessMm > 0 && watchValues.weldingProcess && (() => {
                    const thickness = watchValues.materialThicknessMm;
                    const process = watchValues.weldingProcess;
                    const mismatch =
                      (process === 'spot' && thickness > 3) ||
                      (process === 'conduction' && thickness > 2) ||
                      (process === 'keyhole' && thickness < 3) ||
                      (process === 'seam' && thickness > 6);
                    if (!mismatch) return null;
                    return (
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                        <AlertTriangle className="inline h-4 w-4 mr-2 text-amber-700" />
                        <span className="text-sm font-semibold text-amber-900">Process–thickness mismatch warning</span>
                        <p className="mt-1 text-xs text-amber-800">
                          {thickness}mm material with {WELDING_PROCESS_LABELS[process]} welding may not be ideal. Check your
                          qualified welding procedures or consider an alternative process mode.
                        </p>
                      </div>
                    );
                  })()}
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Operating Costs</h3>
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

                    {watchValues.shieldingGasType && watchValues.materialType && (
                      <div className="md:col-span-2 mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm font-semibold text-green-900 mb-1">Gas selection check</p>
                        {(() => {
                          type MaterialKey = keyof typeof WELDING_MATERIAL_LABELS;
                          type GasKey = keyof typeof GAS_TYPE_LABELS;

                          const material = watchValues.materialType as MaterialKey;
                          const gas = watchValues.shieldingGasType as GasKey;

                          const bestCombos: Partial<Record<MaterialKey, GasKey[]>> = {
                            mild_steel: ['argon', 'nitrogen'],
                            stainless_steel_304: ['argon'],
                            stainless_steel_316: ['argon'],
                            aluminum_5052: ['argon', 'helium'],
                            aluminum_6061: ['argon', 'helium'],
                            titanium: ['argon', 'helium'],
                            copper: ['argon'],
                            brass: ['argon'],
                            galvanized_steel: ['argon', 'nitrogen'],
                          };

                          const best = bestCombos[material] ?? (['argon'] as GasKey[]);
                          const isOptimal = best.includes(gas);

                          if (isOptimal) {
                            return (
                              <p className="text-xs text-green-800">
                                ✅ <strong>{GAS_TYPE_LABELS[gas]}</strong> is a common choice for {WELDING_MATERIAL_LABELS[material]}.
                                Still follow your qualified welding procedures.
                              </p>
                            );
                          }

                          return (
                            <p className="text-xs text-amber-800">
                              ⚠️ <strong>{GAS_TYPE_LABELS[gas]}</strong> is less typical for {WELDING_MATERIAL_LABELS[material]}.
                              Check your welding procedure specifications; many shops prefer{' '}
                              <strong>{best.map((g) => GAS_TYPE_LABELS[g]).join(' or ')}</strong> here.
                            </p>
                          );
                        })()}
                      </div>
                    )}

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
                        Gas Cost ($/m^3)
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality & Batch</h3>
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
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-semibold text-purple-900 mb-2">Weld quality class & inspection</p>
                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white rounded p-2">
                        <p className="font-semibold text-gray-900 mb-1">Class A – stringent</p>
                        <p className="text-gray-700">
                          Aerospace and pressure-vessel work with full NDT. Expect 5–15 minutes per part of inspection and
                          documentation.
                        </p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="font-semibold text-gray-900 mb-1">Class B – standard</p>
                        <p className="text-gray-700">
                          Automotive and general industrial welds with visual plus spot checks. Typically 1–3 minutes per part.
                        </p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="font-semibold text-gray-900 mb-1">Class C – basic</p>
                        <p className="text-gray-700">
                          Prototypes and non-critical welds with a quick visual check under 1 minute per part.
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      Enter inspection time according to your quality class. Higher classes increase time and cost but reduce
                      rework and risk.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60"
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Cost'}
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
            <div id="results" className="space-y-6">
              {result && (
                <>
                  {/* Time Analysis */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                      Pricing Recommendation
                    </h2>
                    <p className="mb-3 text-sm text-gray-700">
                      These prices are calculated from your cost inputs and the profit margin used in this scenario. Treat them as a
                      modeled starting point, and adjust based on your quoting policies, risk, and market conditions.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Profit Margin:</span>
                        <span className="font-semibold">{result.profitMargin}%</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-white -mx-2 px-2 rounded-lg border-2 border-green-300">
                        <span className="font-bold text-gray-900">Modeled Price/Piece (based on your inputs):</span>
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

                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                      <Info className="w-6 h-6 mr-2 text-indigo-600" />
                      Cost vs quality considerations
                    </h2>
                    <p className="text-sm text-gray-700 mb-4">
                      Use the quality and batch fields to explore how requirements change cost. Higher quality usually means
                      slower welding, more inspection time, and higher hourly rates—but lower rework and risk.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-700">
                      <div className="bg-white rounded-lg p-3">
                        <p className="font-semibold text-gray-900 mb-1">Signals you are in a high-quality regime:</p>
                        <ul className="list-disc ml-4 space-y-1">
                          {watchValues.qualityInspectionTimeMin > 0 && (
                            <li>Inspection time ≥ {watchValues.qualityInspectionTimeMin} min per part</li>
                          )}
                          {watchValues.requiresPreheat && <li>Preheat enabled for this joint</li>}
                          {watchValues.requiresPostHeatTreatment && <li>Post‑weld heat treatment enabled</li>}
                          <li>Utilization rate around {result.utilizationRate}% (more time welding than handling)</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="font-semibold text-gray-900 mb-1">Ways to reduce cost safely:</p>
                        <ul className="list-disc ml-4 space-y-1">
                          <li>Group parts into larger batches to spread setup and inspection time.</li>
                          <li>Use a standard quality class where codes and customer requirements allow.</li>
                          <li>Optimize shielding gas type and flow with supplier guidance, not just default values.</li>
                          <li>Run trial welds and update this calculator with measured speeds and times.</li>
                        </ul>
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
                    Enter your welding parameters and click &quot;Calculate Cost&quot; to see detailed analysis.
                  </p>
                </div>
              )}
              {result && (
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <ExportButton
                    title="Laser Welding Cost Report"
                    calculationType="Welding"
                    inputData={watchValues}
                    results={{
                      'Cost Per Piece': result.costPerPiece,
                      'Recommended Price': result.recommendedPrice,
                      'Total Batch Cost': result.totalBatchCost,
                      'Total Batch Time': result.totalBatchTimeFormatted,
                      'Weld Speed (mm/s)': result.weldSpeedMmPerSec,
                      'Weld Time Per Piece (sec)': result.weldTimePerPieceSec,
                      'Setup Time Per Piece (min)': result.setupTimePerPieceMin,
                      'Electricity Per Hour': result.electricityPerHour,
                      'Depreciation Per Hour': result.depreciationPerHour,
                      'Gas Cost Per Hour': result.gasCostPerHour,
                      'Total Hourly Cost': result.totalHourlyCost,
                      'Profit Margin (%)': result.profitMargin,
                      'Pieces Per Hour': result.piecesPerHour,
                      'Revenue Per Hour': result.revenuePerHour,
                      'Utilization Rate (%)': result.utilizationRate,
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    New Welding Scenario
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-blue-600" />
              Welding Optimization Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Process Selection
                </h3>
                <ul className="text-sm text-blue-800 space-y-1 ml-7">
                  <li>- Compare conduction and keyhole modes for your thickness range using the welding process input</li>
                  <li>- Use seam welding settings for continuous joints and spot welding for discrete tack points where appropriate</li>
                  <li>- Reflect your actual procedure choices in the calculator so the time and cost outputs match your process plan</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Cost Reduction
                </h3>
                <ul className="text-sm text-green-800 space-y-1 ml-7">
                  <li>- Increase batch sizes where possible to spread setup time across more pieces, and adjust quantity per batch in the calculator to see the impact</li>
                  <li>- Use the shielding gas type, flow rate, and gas cost fields to compare different gas scenarios for cost versus quality</li>
                  <li>- Try different power levels and weld speeds within your qualified ranges to see how they influence hourly cost and cost per piece</li>
                  <li>- Regular maintenance and reliable equipment reduce unplanned downtime, which is not modeled directly but affects how many hours you can bill</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Quality Improvement
                </h3>
                <ul className="text-sm text-purple-800 space-y-1 ml-7">
                  <li>- Maintain tight and consistent joint fit-up according to your welding procedure to help quality and repeatability</li>
                  <li>- Choose shielding gas and parameters that meet your material and quality requirements, then mirror those settings in the calculator</li>
                  <li>- If procedures require preheat or post-weld heat treatment, enable those options and add inspection time so related time is reflected in the estimate</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Pricing Strategy
                </h3>
                <ul className="text-sm text-orange-800 space-y-1 ml-7">
                  <li>- Use the cost per piece and recommended price from this calculator as a starting point, then adjust margins based on project complexity and risk</li>
                  <li>- Consider setup fees for small batches where setup time is high relative to weld time</li>
                  <li>- Premium pricing for certified or high-spec welds can reflect additional qualification and inspection effort</li>
                  <li>- Offer volume discounts only where higher quantities genuinely improve your overall economics</li>
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
      <Footer />
    </>
  );
}














