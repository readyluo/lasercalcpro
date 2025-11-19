import { z } from 'zod';

// Material types for laser marking/engraving
export const markingMaterialTypes = [
  'stainless_steel',
  'aluminum',
  'brass',
  'copper',
  'titanium',
  'plastics',
  'coated_metal',
  'anodized_aluminum',
  'wood',
  'leather',
  'acrylic',
  'glass',
  'ceramic',
] as const;

export type MarkingMaterialType = typeof markingMaterialTypes[number];

// Marking method types
export const markingMethods = [
  'annealing',      // Color marking (metals)
  'engraving',      // Deep engraving
  'etching',        // Surface etching
  'ablation',       // Coating removal
  'foaming',        // Plastics
  'carbonization',  // Wood/leather
] as const;

export type MarkingMethod = typeof markingMethods[number];

// Job type
export const jobTypes = [
  'text',
  'logo',
  'barcode',
  'qr_code',
  'serial_number',
  'graphics',
  'photo_engraving',
] as const;

export type JobType = typeof jobTypes[number];

// Main schema for marking calculator
export const markingCalculatorSchema = z.object({
  // Material & Method
  materialType: z.enum(markingMaterialTypes),
  markingMethod: z.enum(markingMethods),
  jobType: z.enum(jobTypes),

  // Job specifications
  markingAreaMm2: z.number().min(1).max(1000000).default(2500), // Area in mm²
  markingDepth: z.number().min(0.01).max(5).default(0.1), // Depth in mm
  quantity: z.number().int().min(1).max(100000).default(100),

  // Equipment
  laserPowerWatts: z.number().min(10).max(100).default(30),
  equipmentCost: z.number().min(5000).max(500000).default(50000),
  equipmentLifespanYears: z.number().min(1).max(15).default(8),
  annualWorkingHours: z.number().min(100).max(8760).default(2000),

  // Operating costs
  electricityRatePerKwh: z.number().min(0.01).max(1).default(0.12),
  laborRatePerHour: z.number().min(5).max(200).default(20),
  overheadRatePerHour: z.number().min(0).max(100).default(5),
  maintenanceRatePerHour: z.number().min(0).max(50).default(2),

  // Quality settings
  fillDensity: z.number().min(1).max(20).default(10), // Lines per mm
  passes: z.number().int().min(1).max(10).default(1),
});

export type MarkingCalculatorInput = z.infer<typeof markingCalculatorSchema>;

// Speed calculation constants (mm²/sec) based on material and method
//
// ⚠️ IMPORTANT DATA SOURCE NOTICE:
// These speed values are APPROXIMATE ESTIMATES compiled from industry references,
// equipment specifications, and application notes. They represent simplified averages
// for typical fiber laser marking systems in the 30-50W power range.
//
// ⚠️ These values are NOT:
// - Guaranteed performance metrics for any specific equipment
// - Validated through systematic controlled testing
// - Applicable to all laser types, powers, or quality requirements
// - Suitable for precision time estimation without validation
//
// Actual marking speeds vary significantly based on:
// - Specific laser power, beam quality (M²), and spot size
// - Material surface condition, preparation, and cleanliness
// - Required contrast, depth, and edge quality
// - Fill pattern, line spacing, and hatch angle
// - Ambient conditions and material temperature
// - Equipment condition, calibration, and maintenance state
//
// For accurate production time estimates:
// 1. Perform test marks with your specific equipment and materials
// 2. Measure actual cycle times for representative jobs
// 3. Build your own speed table from measured production data
// 4. Account for setup, loading, and inspection time separately
//
// Speed table interpretation:
// - Values in mm²/second (area coverage rate)
// - Higher values = faster marking
// - 'null' = combination not technically feasible or not commonly used
// - Values assume moderate quality (not ultra-precision or cosmetic-grade)
//
// Material-specific notes:
// - Metals: speeds vary with alloy composition and surface finish
// - Plastics: vary significantly by polymer type and additives
// - Organics: highly dependent on moisture content and density
//
// Method-specific notes:
// - Annealing: Heat-based color marking (no material removal)
// - Engraving: Deep material removal (slowest, most energy intensive)
// - Etching: Shallow surface texturing
// - Ablation: Coating/layer removal
// - Foaming: Plastic surface expansion through heat
// - Carbonization: Organic material darkening through controlled burning
//
export const MARKING_SPEED_TABLE: Record<
  MarkingMaterialType,
  Record<MarkingMethod, number | null>
> = {
  stainless_steel: {
    annealing: 80,
    engraving: 25,
    etching: 60,
    ablation: 50,
    foaming: null,
    carbonization: null,
  },
  aluminum: {
    annealing: 90,
    engraving: 35,
    etching: 70,
    ablation: 60,
    foaming: null,
    carbonization: null,
  },
  brass: {
    annealing: 70,
    engraving: 30,
    etching: 55,
    ablation: 45,
    foaming: null,
    carbonization: null,
  },
  copper: {
    annealing: 65,
    engraving: 28,
    etching: 50,
    ablation: 40,
    foaming: null,
    carbonization: null,
  },
  titanium: {
    annealing: 75,
    engraving: 20,
    etching: 55,
    ablation: 45,
    foaming: null,
    carbonization: null,
  },
  plastics: {
    annealing: null,
    engraving: 40,
    etching: 80,
    ablation: null,
    foaming: 100,
    carbonization: 60,
  },
  coated_metal: {
    annealing: null,
    engraving: 30,
    etching: 50,
    ablation: 90,
    foaming: null,
    carbonization: null,
  },
  anodized_aluminum: {
    annealing: null,
    engraving: 35,
    etching: 60,
    ablation: 95,
    foaming: null,
    carbonization: null,
  },
  wood: {
    annealing: null,
    engraving: 50,
    etching: 70,
    ablation: null,
    foaming: null,
    carbonization: 90,
  },
  leather: {
    annealing: null,
    engraving: 45,
    etching: 65,
    ablation: null,
    foaming: null,
    carbonization: 85,
  },
  acrylic: {
    annealing: null,
    engraving: 55,
    etching: 75,
    ablation: null,
    foaming: null,
    carbonization: 70,
  },
  glass: {
    annealing: null,
    engraving: 15,
    etching: 30,
    ablation: null,
    foaming: null,
    carbonization: null,
  },
  ceramic: {
    annealing: null,
    engraving: 12,
    etching: 25,
    ablation: null,
    foaming: null,
    carbonization: null,
  },
};

// Depth factor: how much speed decreases per mm of depth
//
// ⚠️ This is a HIGHLY SIMPLIFIED linear model for estimation.
//
// Actual depth vs. speed relationship:
// - Is typically NON-LINEAR (diminishing returns at greater depths)
// - Varies significantly by material hardness and thermal properties
// - Depends strongly on required edge quality and contrast
// - Affected by heat accumulation and dissipation in deep marks
// - Different for different marking methods (engraving vs. etching)
//
// This 0.7 factor means:
// - 0.1mm depth: 0.97x speed (3% slower than surface marking)
// - 0.3mm depth: 0.91x speed (9% slower)
// - 0.5mm depth: 0.87x speed (13% slower)
// - 1.0mm depth: 0.70x speed (30% slower)
//
// For deep engraving (>0.5mm) or precision applications:
// - Always validate with test marks on actual material
// - Consider multiple passes instead of single deep pass
// - Monitor for heat-affected zone (HAZ) quality issues
//
export const DEPTH_SPEED_FACTOR = 0.7; // 30% speed reduction per mm (simplified average)

// Power efficiency factor for energy cost calculation
//
// ⚠️ IMPORTANT: These values represent SIMPLIFIED ESTIMATES of overall
// laser system efficiency in marking operations.
//
// This is NOT electrical-to-optical conversion efficiency.
// This represents the effective power utilization considering:
// - Beam quality and M² parameter
// - Spot size and focus quality
// - Pulse characteristics and frequency
// - Material absorption at laser wavelength
//
// Interpretation:
// - Lower power systems (20W): Often use simpler optics and older technology
//   Effective utilization ~75% due to beam quality and thermal limitations
//
// - Mid-range systems (30-50W): Common industrial marking lasers
//   Effective utilization ~85-90% with good beam quality
//
// - High power systems (60-100W): Premium systems with excellent beam quality
//   Effective utilization ~92-95% due to better optics and thermal management
//
// For accurate energy cost calculation:
// - Measure actual power consumption with a power meter
// - Compare input power vs. effective marking power
// - Account for chiller and auxiliary system power separately
//
export const POWER_EFFICIENCY_MAP: Record<number, number> = {
  20: 0.75,  // Entry-level systems with basic optics
  30: 0.85,  // Common mid-range marking lasers
  50: 0.90,  // Industrial-grade systems
  60: 0.92,  // High-performance systems
  100: 0.95, // Premium high-power systems with excellent beam quality
};

export function getPowerEfficiency(watts: number): number {
  // Linear interpolation between defined power levels
  // For powers outside the range, return nearest boundary value
  if (watts <= 20) return 0.75;
  if (watts <= 30) return 0.85;
  if (watts <= 50) return 0.90;
  if (watts <= 60) return 0.92;
  return 0.95;
}

// Display labels
export const MATERIAL_LABELS: Record<MarkingMaterialType, string> = {
  stainless_steel: 'Stainless Steel',
  aluminum: 'Aluminum',
  brass: 'Brass',
  copper: 'Copper',
  titanium: 'Titanium',
  plastics: 'Plastics (ABS, PC, PVC)',
  coated_metal: 'Coated Metal',
  anodized_aluminum: 'Anodized Aluminum',
  wood: 'Wood',
  leather: 'Leather',
  acrylic: 'Acrylic',
  glass: 'Glass',
  ceramic: 'Ceramic',
};

export const METHOD_LABELS: Record<MarkingMethod, string> = {
  annealing: 'Annealing (Color Mark)',
  engraving: 'Deep Engraving',
  etching: 'Surface Etching',
  ablation: 'Coating Removal',
  foaming: 'Foaming (Plastics)',
  carbonization: 'Carbonization (Organic)',
};

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  text: 'Text Marking',
  logo: 'Logo/Brand',
  barcode: '1D Barcode',
  qr_code: 'QR Code',
  serial_number: 'Serial Number',
  graphics: 'Graphics/Pattern',
  photo_engraving: 'Photo Engraving',
};



























