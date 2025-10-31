import { z } from 'zod';

// Welding process types
export const weldingProcessTypes = [
  'conduction',     // Conduction welding (lower power, wider seam)
  'keyhole',        // Keyhole welding (higher power, deep penetration)
  'seam',           // Seam welding (continuous)
  'spot',           // Spot welding (discrete points)
  'overlap',        // Lap joint welding
  'butt',           // Butt joint welding
] as const;

export type WeldingProcessType = typeof weldingProcessTypes[number];

// Material types for welding
export const weldingMaterialTypes = [
  'mild_steel',
  'stainless_steel_304',
  'stainless_steel_316',
  'aluminum_5052',
  'aluminum_6061',
  'titanium',
  'copper',
  'brass',
  'galvanized_steel',
] as const;

export type WeldingMaterialType = typeof weldingMaterialTypes[number];

// Joint types
export const jointTypes = [
  'butt_joint',
  'lap_joint',
  'corner_joint',
  't_joint',
  'edge_joint',
] as const;

export type JointType = typeof jointTypes[number];

// Main schema for welding calculator
export const weldingCalculatorSchema = z.object({
  // Process & Material
  weldingProcess: z.enum(weldingProcessTypes),
  materialType: z.enum(weldingMaterialTypes),
  jointType: z.enum(jointTypes),
  
  // Material specifications
  materialThicknessMm: z.number().min(0.1).max(50).default(2),
  
  // Welding specifications
  weldLengthMm: z.number().min(1).max(10000).default(500),
  numberOfWelds: z.number().int().min(1).max(10000).default(1),
  weldSpeedMmPerSec: z.number().min(1).max(200).default(20), // Auto-calculated but can be overridden
  
  // Equipment
  laserPowerWatts: z.number().min(100).max(20000).default(1500),
  equipmentCost: z.number().min(10000).max(5000000).default(150000),
  equipmentLifespanYears: z.number().min(1).max(20).default(10),
  annualWorkingHours: z.number().min(100).max(8760).default(2000),
  
  // Operating costs
  electricityRatePerKwh: z.number().min(0.01).max(1).default(0.12),
  shieldingGasType: z.enum(['argon', 'helium', 'nitrogen', 'none']).default('argon'),
  gasFlowRateLPerMin: z.number().min(0).max(50).default(15),
  gasCostPerM3: z.number().min(0).max(500).default(50),
  
  laborRatePerHour: z.number().min(5).max(300).default(35),
  overheadRatePerHour: z.number().min(0).max(200).default(10),
  maintenanceRatePerHour: z.number().min(0).max(100).default(5),
  
  // Quality parameters
  requiresPreheat: z.boolean().default(false),
  requiresPostHeatTreatment: z.boolean().default(false),
  qualityInspectionTimeMin: z.number().min(0).max(60).default(0),
  
  // Batch information
  setupTimePerBatchMin: z.number().min(0).max(240).default(15),
  quantityPerBatch: z.number().int().min(1).max(10000).default(1),
});

export type WeldingCalculatorInput = z.infer<typeof weldingCalculatorSchema>;

// Welding speed table (mm/s) based on material, thickness, and process
// Returns base speed - actual speed may vary based on power and quality requirements
export const WELDING_SPEED_TABLE: Record<
  WeldingMaterialType,
  Record<WeldingProcessType, (thickness: number, power: number) => number>
> = {
  mild_steel: {
    conduction: (t, p) => Math.min(50, (p / 1000) * (t <= 1 ? 40 : t <= 3 ? 20 : 10)),
    keyhole: (t, p) => Math.min(80, (p / 1000) * (t <= 2 ? 50 : t <= 5 ? 30 : 15)),
    seam: (t, p) => Math.min(60, (p / 1000) * (t <= 1.5 ? 35 : t <= 4 ? 18 : 10)),
    spot: (t, p) => 0, // Spot is time-based, not speed-based
    overlap: (t, p) => Math.min(45, (p / 1000) * (t <= 1 ? 30 : t <= 3 ? 15 : 8)),
    butt: (t, p) => Math.min(55, (p / 1000) * (t <= 1.5 ? 35 : t <= 4 ? 20 : 12)),
  },
  stainless_steel_304: {
    conduction: (t, p) => Math.min(40, (p / 1000) * (t <= 1 ? 30 : t <= 3 ? 15 : 8)),
    keyhole: (t, p) => Math.min(70, (p / 1000) * (t <= 2 ? 45 : t <= 5 ? 25 : 12)),
    seam: (t, p) => Math.min(50, (p / 1000) * (t <= 1.5 ? 30 : t <= 4 ? 15 : 8)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(40, (p / 1000) * (t <= 1 ? 25 : t <= 3 ? 12 : 6)),
    butt: (t, p) => Math.min(50, (p / 1000) * (t <= 1.5 ? 30 : t <= 4 ? 18 : 10)),
  },
  stainless_steel_316: {
    conduction: (t, p) => Math.min(38, (p / 1000) * (t <= 1 ? 28 : t <= 3 ? 14 : 7)),
    keyhole: (t, p) => Math.min(65, (p / 1000) * (t <= 2 ? 42 : t <= 5 ? 23 : 11)),
    seam: (t, p) => Math.min(48, (p / 1000) * (t <= 1.5 ? 28 : t <= 4 ? 14 : 7)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(38, (p / 1000) * (t <= 1 ? 23 : t <= 3 ? 11 : 5)),
    butt: (t, p) => Math.min(48, (p / 1000) * (t <= 1.5 ? 28 : t <= 4 ? 16 : 9)),
  },
  aluminum_5052: {
    conduction: (t, p) => Math.min(45, (p / 1000) * (t <= 1 ? 35 : t <= 3 ? 18 : 9)),
    keyhole: (t, p) => Math.min(75, (p / 1000) * (t <= 2 ? 48 : t <= 5 ? 28 : 14)),
    seam: (t, p) => Math.min(55, (p / 1000) * (t <= 1.5 ? 32 : t <= 4 ? 16 : 9)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(42, (p / 1000) * (t <= 1 ? 28 : t <= 3 ? 14 : 7)),
    butt: (t, p) => Math.min(52, (p / 1000) * (t <= 1.5 ? 32 : t <= 4 ? 19 : 11)),
  },
  aluminum_6061: {
    conduction: (t, p) => Math.min(43, (p / 1000) * (t <= 1 ? 33 : t <= 3 ? 17 : 8)),
    keyhole: (t, p) => Math.min(72, (p / 1000) * (t <= 2 ? 46 : t <= 5 ? 26 : 13)),
    seam: (t, p) => Math.min(53, (p / 1000) * (t <= 1.5 ? 30 : t <= 4 ? 15 : 8)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(40, (p / 1000) * (t <= 1 ? 26 : t <= 3 ? 13 : 6)),
    butt: (t, p) => Math.min(50, (p / 1000) * (t <= 1.5 ? 30 : t <= 4 ? 18 : 10)),
  },
  titanium: {
    conduction: (t, p) => Math.min(30, (p / 1000) * (t <= 1 ? 20 : t <= 3 ? 10 : 5)),
    keyhole: (t, p) => Math.min(50, (p / 1000) * (t <= 2 ? 30 : t <= 5 ? 18 : 9)),
    seam: (t, p) => Math.min(40, (p / 1000) * (t <= 1.5 ? 22 : t <= 4 ? 12 : 6)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(28, (p / 1000) * (t <= 1 ? 18 : t <= 3 ? 9 : 4)),
    butt: (t, p) => Math.min(38, (p / 1000) * (t <= 1.5 ? 22 : t <= 4 ? 13 : 7)),
  },
  copper: {
    conduction: (t, p) => Math.min(35, (p / 1500) * (t <= 1 ? 25 : t <= 3 ? 12 : 6)),
    keyhole: (t, p) => Math.min(55, (p / 1500) * (t <= 2 ? 35 : t <= 5 ? 20 : 10)),
    seam: (t, p) => Math.min(45, (p / 1500) * (t <= 1.5 ? 26 : t <= 4 ? 14 : 7)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(33, (p / 1500) * (t <= 1 ? 20 : t <= 3 ? 10 : 5)),
    butt: (t, p) => Math.min(43, (p / 1500) * (t <= 1.5 ? 26 : t <= 4 ? 15 : 8)),
  },
  brass: {
    conduction: (t, p) => Math.min(38, (p / 1500) * (t <= 1 ? 27 : t <= 3 ? 13 : 6)),
    keyhole: (t, p) => Math.min(60, (p / 1500) * (t <= 2 ? 38 : t <= 5 ? 22 : 11)),
    seam: (t, p) => Math.min(48, (p / 1500) * (t <= 1.5 ? 28 : t <= 4 ? 15 : 7)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(36, (p / 1500) * (t <= 1 ? 22 : t <= 3 ? 11 : 5)),
    butt: (t, p) => Math.min(46, (p / 1500) * (t <= 1.5 ? 28 : t <= 4 ? 16 : 9)),
  },
  galvanized_steel: {
    conduction: (t, p) => Math.min(45, (p / 1000) * (t <= 1 ? 35 : t <= 3 ? 18 : 9)),
    keyhole: (t, p) => Math.min(75, (p / 1000) * (t <= 2 ? 45 : t <= 5 ? 28 : 14)),
    seam: (t, p) => Math.min(55, (p / 1000) * (t <= 1.5 ? 32 : t <= 4 ? 16 : 9)),
    spot: (t, p) => 0,
    overlap: (t, p) => Math.min(42, (p / 1000) * (t <= 1 ? 28 : t <= 3 ? 14 : 7)),
    butt: (t, p) => Math.min(52, (p / 1000) * (t <= 1.5 ? 32 : t <= 4 ? 18 : 10)),
  },
};

// Spot weld time (seconds per spot) based on material and thickness
export const SPOT_WELD_TIME_TABLE: Record<WeldingMaterialType, (thickness: number) => number> = {
  mild_steel: (t) => (t <= 1 ? 0.5 : t <= 2 ? 1.0 : t <= 4 ? 1.5 : 2.5),
  stainless_steel_304: (t) => (t <= 1 ? 0.6 : t <= 2 ? 1.2 : t <= 4 ? 1.8 : 3.0),
  stainless_steel_316: (t) => (t <= 1 ? 0.6 : t <= 2 ? 1.2 : t <= 4 ? 1.8 : 3.0),
  aluminum_5052: (t) => (t <= 1 ? 0.4 : t <= 2 ? 0.8 : t <= 4 ? 1.2 : 2.0),
  aluminum_6061: (t) => (t <= 1 ? 0.4 : t <= 2 ? 0.8 : t <= 4 ? 1.2 : 2.0),
  titanium: (t) => (t <= 1 ? 0.8 : t <= 2 ? 1.5 : t <= 4 ? 2.5 : 4.0),
  copper: (t) => (t <= 1 ? 0.7 : t <= 2 ? 1.3 : t <= 4 ? 2.0 : 3.5),
  brass: (t) => (t <= 1 ? 0.7 : t <= 2 ? 1.3 : t <= 4 ? 2.0 : 3.5),
  galvanized_steel: (t) => (t <= 1 ? 0.5 : t <= 2 ? 1.0 : t <= 4 ? 1.5 : 2.5),
};

// Power efficiency by laser power
export function getWeldingPowerEfficiency(watts: number): number {
  if (watts <= 500) return 0.25;
  if (watts <= 1000) return 0.30;
  if (watts <= 2000) return 0.35;
  if (watts <= 5000) return 0.40;
  return 0.45;
}

// Display labels
export const WELDING_MATERIAL_LABELS: Record<WeldingMaterialType, string> = {
  mild_steel: 'Mild Steel',
  stainless_steel_304: 'Stainless Steel 304',
  stainless_steel_316: 'Stainless Steel 316',
  aluminum_5052: 'Aluminum 5052',
  aluminum_6061: 'Aluminum 6061',
  titanium: 'Titanium',
  copper: 'Copper',
  brass: 'Brass',
  galvanized_steel: 'Galvanized Steel',
};

export const WELDING_PROCESS_LABELS: Record<WeldingProcessType, string> = {
  conduction: 'Conduction Welding',
  keyhole: 'Keyhole Welding',
  seam: 'Seam Welding',
  spot: 'Spot Welding',
  overlap: 'Lap Joint Welding',
  butt: 'Butt Joint Welding',
};

export const JOINT_TYPE_LABELS: Record<JointType, string> = {
  butt_joint: 'Butt Joint',
  lap_joint: 'Lap Joint',
  corner_joint: 'Corner Joint',
  't_joint': 'T-Joint',
  edge_joint: 'Edge Joint',
};

export const GAS_TYPE_LABELS = {
  argon: 'Argon',
  helium: 'Helium',
  nitrogen: 'Nitrogen',
  none: 'None',
};







