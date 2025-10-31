/**
 * Validation schemas for Cost Center calculators
 * Using Zod for type-safe validation
 */

import { z } from 'zod';

/**
 * Hourly Rate Calculator Schema
 */
export const hourlyRateSchema = z.object({
  // Equipment costs
  equipmentCost: z.number().min(10000).max(500000),
  equipmentLifespan: z.number().min(5).max(20),
  annualWorkingHours: z.number().min(500).max(6000),
  
  // Labor costs
  operatorRate: z.number().min(10).max(100),
  benefitsMultiplier: z.number().min(1.0).max(2.0),
  
  // Energy costs
  totalPowerKw: z.number().min(1).max(50),
  electricityRate: z.number().min(0.01).max(1.0),
  
  // Maintenance
  annualMaintenancePercent: z.number().min(0).max(20),
  consumablesPerHour: z.number().min(0).max(10),
  
  // Facility costs
  facilityRentMonthly: z.number().min(0).max(50000),
  utilitiesMonthly: z.number().min(0).max(10000),
  insuranceMonthly: z.number().min(0).max(10000),
  
  // Overhead
  overheadMonthly: z.number().min(0).max(50000),
  
  // Gas costs
  gasType: z.enum(['nitrogen', 'oxygen', 'air', 'mixed']),
  gasConsumptionPerHour: z.number().min(0).max(10),
  gasPricePerCubicMeter: z.number().min(0).max(5),
});

export type HourlyRateInput = z.infer<typeof hourlyRateSchema>;

export const hourlyRateDefaults: HourlyRateInput = {
  equipmentCost: 150000,
  equipmentLifespan: 10,
  annualWorkingHours: 2000,
  operatorRate: 25,
  benefitsMultiplier: 1.35,
  totalPowerKw: 10,
  electricityRate: 0.12,
  annualMaintenancePercent: 5,
  consumablesPerHour: 1.35,
  facilityRentMonthly: 3000,
  utilitiesMonthly: 1500,
  insuranceMonthly: 2000,
  overheadMonthly: 15000,
  gasType: 'nitrogen',
  gasConsumptionPerHour: 1.5,
  gasPricePerCubicMeter: 1.5,
};

/**
 * Overhead Allocator Schema
 */
export const overheadAllocatorSchema = z.object({
  // Total overhead to allocate
  totalOverhead: z.number().min(0).max(1000000),
  
  // Allocation method
  allocationMethod: z.enum(['machineHours', 'laborHours', 'materialCost', 'floorSpace', 'equalSplit']),
  
  // Jobs/orders to allocate to
  jobs: z.array(z.object({
    jobName: z.string().min(1).max(100),
    machineHours: z.number().min(0).max(10000),
    laborHours: z.number().min(0).max(10000),
    materialCost: z.number().min(0).max(1000000),
    floorSpace: z.number().min(0).max(10000), // square feet
  })).min(1).max(50),
});

export type OverheadAllocatorInput = z.infer<typeof overheadAllocatorSchema>;

export const overheadAllocatorDefaults: OverheadAllocatorInput = {
  totalOverhead: 50000,
  allocationMethod: 'machineHours',
  jobs: [
    { jobName: 'Job 1', machineHours: 100, laborHours: 120, materialCost: 10000, floorSpace: 500 },
    { jobName: 'Job 2', machineHours: 150, laborHours: 180, materialCost: 15000, floorSpace: 750 },
  ],
};

/**
 * Setup Estimator Schema
 */
export const setupEstimatorSchema = z.object({
  // Programming complexity
  programmingComplexity: z.enum(['simple', 'moderate', 'complex', 'veryComplex']),
  
  // Material size
  materialSize: z.enum(['small', 'medium', 'large', 'xlarge']),
  
  // Machine preparation
  machineChange: z.enum(['noChange', 'nozzleChange', 'gasChange', 'focusAdjust', 'fullSetup']),
  
  // Inspection level
  inspectionLevel: z.enum(['none', 'quick', 'standard', 'detailed']),
  
  // Fixture complexity
  fixtureComplexity: z.enum(['none', 'simple', 'moderate', 'complex']),
  
  // Operator experience
  operatorExperience: z.enum(['novice', 'intermediate', 'experienced', 'expert']),
  
  // Job familiarity
  jobFamiliarity: z.enum(['firstTime', 'occasional', 'regular', 'repeat']),
  
  // Batch quantity
  batchQuantity: z.number().min(1).max(10000),
  
  // Labor rate for setup
  setupLaborRate: z.number().min(10).max(150),
});

export type SetupEstimatorInput = z.infer<typeof setupEstimatorSchema>;

export const setupEstimatorDefaults: SetupEstimatorInput = {
  programmingComplexity: 'moderate',
  materialSize: 'medium',
  machineChange: 'fullSetup',
  inspectionLevel: 'standard',
  fixtureComplexity: 'none',
  operatorExperience: 'intermediate',
  jobFamiliarity: 'firstTime',
  batchQuantity: 10,
  setupLaborRate: 35,
};

/**
 * Pierce Estimator Schema
 */
export const pierceEstimatorSchema = z.object({
  // Material type
  material: z.enum(['mild_steel', 'stainless_steel', 'aluminum', 'copper_brass']),
  
  // Thickness
  thickness: z.number().min(0.5).max(25),
  
  // Number of holes/pierces
  holeCount: z.number().min(1).max(10000),
  
  // Piercing strategy
  strategy: z.enum(['highPressure', 'ramped', 'lowPower', 'pulsed', 'edgeStart']),
  
  // Quality level
  quality: z.enum(['min', 'typical', 'max']),
  
  // Gas type
  gasType: z.enum(['nitrogen', 'oxygen', 'air']),
  
  // Gas price
  gasPricePerCubicMeter: z.number().min(0).max(10),
  
  // Hourly cost
  hourlyCost: z.number().min(0).max(200),
});

export type PierceEstimatorInput = z.infer<typeof pierceEstimatorSchema>;

export const pierceEstimatorDefaults: PierceEstimatorInput = {
  material: 'mild_steel',
  thickness: 3,
  holeCount: 20,
  strategy: 'highPressure',
  quality: 'typical',
  gasType: 'nitrogen',
  gasPricePerCubicMeter: 1.5,
  hourlyCost: 60,
};

/**
 * Finishing Guide Schema
 */
export const finishingGuideSchema = z.object({
  // Edge length to finish
  edgeLengthMeters: z.number().min(0.1).max(100),
  
  // Material
  material: z.enum(['mild_steel', 'stainless_steel', 'aluminum']),
  
  // Thickness
  thickness: z.number().min(0.5).max(25),
  
  // Finishing method
  method: z.enum(['manual', 'powered', 'automated']),
  
  // Quality level
  qualityLevel: z.enum(['ascut', 'light', 'medium', 'high', 'mirror']),
  
  // Part size
  partSize: z.enum(['small', 'medium', 'large', 'xlarge']),
  
  // Additional operations
  additionalOps: z.array(z.enum(['oxideRemoval', 'cleaning', 'chamfering', 'radiusing', 'inspection'])),
  
  // Labor rate
  laborRate: z.number().min(10).max(100),
  
  // Cut quality (affects finishing time needed)
  cutQuality: z.enum(['excellentCut', 'goodCut', 'fairCut', 'poorCut']),
});

export type FinishingGuideInput = z.infer<typeof finishingGuideSchema>;

export const finishingGuideDefaults: FinishingGuideInput = {
  edgeLengthMeters: 1.5,
  material: 'mild_steel',
  thickness: 3,
  method: 'powered',
  qualityLevel: 'light',
  partSize: 'medium',
  additionalOps: [],
  laborRate: 25,
  cutQuality: 'goodCut',
};

/**
 * Quotation Margin Simulator Schema
 */
export const quotationMarginSchema = z.object({
  // Base cost (total manufacturing cost)
  baseCost: z.number().min(1).max(1000000),
  
  // Material cost breakdown
  materialCost: z.number().min(0).max(1000000),
  
  // Labor cost breakdown
  laborCost: z.number().min(0).max(1000000),
  
  // Overhead cost
  overheadCost: z.number().min(0).max(1000000),
  
  // Target margin percentage
  targetMarginPercent: z.number().min(0).max(100),
  
  // Competitor price (optional)
  competitorPrice: z.number().min(0).max(1000000).optional(),
  
  // Volume discount tiers
  volumeDiscounts: z.array(z.object({
    quantity: z.number().min(1),
    discountPercent: z.number().min(0).max(50),
  })).optional(),
  
  // Payment terms impact
  paymentTerms: z.enum(['immediate', 'net30', 'net60', 'net90']),
  
  // Risk factor
  riskFactor: z.enum(['low', 'medium', 'high']),
});

export type QuotationMarginInput = z.infer<typeof quotationMarginSchema>;

export const quotationMarginDefaults: QuotationMarginInput = {
  baseCost: 1000,
  materialCost: 400,
  laborCost: 350,
  overheadCost: 250,
  targetMarginPercent: 30,
  paymentTerms: 'net30',
  riskFactor: 'medium',
};

/**
 * Kerf Reference (read-only reference, minimal input)
 */
export const kerfReferenceSchema = z.object({
  material: z.enum(['mild_steel', 'stainless_steel', 'aluminum', 'copper_brass']),
  thickness: z.number().min(0.5).max(25),
  nozzleDiameter: z.enum(['1.0mm_nozzle', '1.5mm_nozzle', '2.0mm_nozzle', '2.5mm_nozzle', '3.0mm_nozzle', '3.5mm_nozzle', '4.0mm_nozzle']),
  cuttingLengthMeters: z.number().min(0).max(1000).optional(),
});

export type KerfReferenceInput = z.infer<typeof kerfReferenceSchema>;

export const kerfReferenceDefaults: KerfReferenceInput = {
  material: 'mild_steel',
  thickness: 3,
  nozzleDiameter: '2.0mm_nozzle',
  cuttingLengthMeters: 10,
};

