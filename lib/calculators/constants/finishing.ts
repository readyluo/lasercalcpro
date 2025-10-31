/**
 * Post-Cut Finishing Time & Cost Constants
 * 
 * Edge finishing is often overlooked in cost estimates but can add 20-50% to total job time.
 * Values based on typical job shop operations with standard equipment.
 * 
 * Source: Manufacturing time studies and industry benchmarks
 */

/**
 * Deburring time per meter of edge (minutes)
 * By material, thickness, and method
 */
export const DEBURR_TIME_MATRIX = {
  // Manual deburring with hand tools
  manual: {
    mild_steel: {
      '0.5-2mm': { min: 0.5, typical: 0.8, max: 1.2 },
      '2-5mm': { min: 0.8, typical: 1.2, max: 1.8 },
      '5-10mm': { min: 1.2, typical: 1.8, max: 2.5 },
      '10-20mm': { min: 1.8, typical: 2.5, max: 3.5 },
    },
    stainless_steel: {
      '0.5-2mm': { min: 0.6, typical: 1.0, max: 1.5 },
      '2-5mm': { min: 1.0, typical: 1.5, max: 2.2 },
      '5-10mm': { min: 1.5, typical: 2.2, max: 3.0 },
      '10-20mm': { min: 2.2, typical: 3.0, max: 4.0 },
    },
    aluminum: {
      '0.5-2mm': { min: 0.4, typical: 0.6, max: 1.0 },
      '2-5mm': { min: 0.6, typical: 1.0, max: 1.5 },
      '5-10mm': { min: 1.0, typical: 1.5, max: 2.2 },
      '10-20mm': { min: 1.5, typical: 2.2, max: 3.0 },
    },
  },
  
  // Belt sander / grinder
  powered: {
    mild_steel: {
      '0.5-2mm': { min: 0.3, typical: 0.5, max: 0.8 },
      '2-5mm': { min: 0.5, typical: 0.8, max: 1.2 },
      '5-10mm': { min: 0.8, typical: 1.2, max: 1.8 },
      '10-20mm': { min: 1.2, typical: 1.8, max: 2.5 },
    },
    stainless_steel: {
      '0.5-2mm': { min: 0.4, typical: 0.6, max: 1.0 },
      '2-5mm': { min: 0.6, typical: 1.0, max: 1.5 },
      '5-10mm': { min: 1.0, typical: 1.5, max: 2.2 },
      '10-20mm': { min: 1.5, typical: 2.2, max: 3.0 },
    },
    aluminum: {
      '0.5-2mm': { min: 0.2, typical: 0.4, max: 0.6 },
      '2-5mm': { min: 0.4, typical: 0.6, max: 1.0 },
      '5-10mm': { min: 0.6, typical: 1.0, max: 1.5 },
      '10-20mm': { min: 1.0, typical: 1.5, max: 2.2 },
    },
  },
  
  // Automated deburring machine
  automated: {
    mild_steel: {
      '0.5-2mm': { min: 0.1, typical: 0.2, max: 0.3 },
      '2-5mm': { min: 0.2, typical: 0.3, max: 0.5 },
      '5-10mm': { min: 0.3, typical: 0.5, max: 0.8 },
      '10-20mm': { min: 0.5, typical: 0.8, max: 1.2 },
    },
    stainless_steel: {
      '0.5-2mm': { min: 0.15, typical: 0.25, max: 0.4 },
      '2-5mm': { min: 0.25, typical: 0.4, max: 0.6 },
      '5-10mm': { min: 0.4, typical: 0.6, max: 1.0 },
      '10-20mm': { min: 0.6, typical: 1.0, max: 1.5 },
    },
    aluminum: {
      '0.5-2mm': { min: 0.08, typical: 0.15, max: 0.25 },
      '2-5mm': { min: 0.15, typical: 0.25, max: 0.4 },
      '5-10mm': { min: 0.25, typical: 0.4, max: 0.6 },
      '10-20mm': { min: 0.4, typical: 0.6, max: 1.0 },
    },
  },
} as const;

/**
 * Edge quality levels and finishing requirements
 */
export const EDGE_QUALITY_LEVELS = {
  // No finishing required (laser-cut quality acceptable)
  ascut: {
    description: 'Laser-cut edge, no post-processing',
    finishingTime: 0,
    applications: ['Internal parts', 'Non-visible edges', 'Prototypes'],
    acceptableDross: 'Light dross acceptable',
  },
  
  // Light deburring only
  light: {
    description: 'Remove sharp edges and major burrs',
    finishingTimeMultiplier: 1.0, // Baseline from matrix
    applications: ['General fabrication', 'Painted parts', 'Most commercial work'],
    acceptableDross: 'No visible dross',
  },
  
  // Medium finishing
  medium: {
    description: 'Smooth edges, remove all burrs and dross',
    finishingTimeMultiplier: 1.5,
    applications: ['Visible parts', 'Assembly interfaces', 'Safety-critical edges'],
    acceptableDross: 'None',
  },
  
  // High-quality finish
  high: {
    description: 'Polished edges, uniform appearance',
    finishingTimeMultiplier: 2.5,
    applications: ['Food equipment', 'Medical devices', 'Architectural'],
    acceptableDross: 'None, polished finish',
  },
  
  // Mirror finish
  mirror: {
    description: 'Mirror-polished edges',
    finishingTimeMultiplier: 4.0,
    applications: ['High-end architectural', 'Decorative', 'Display pieces'],
    acceptableDross: 'Mirror finish required',
  },
} as const;

/**
 * Additional finishing operations
 */
export const ADDITIONAL_FINISHING = {
  // Oxide/scale removal (minutes per part)
  oxideRemoval: {
    chemical: { min: 2, typical: 5, max: 10 }, // Pickling/passivation
    mechanical: { min: 1, typical: 3, max: 6 }, // Wire brush/grinding
  },
  
  // Cleaning operations (minutes per part)
  cleaning: {
    solventWipe: { min: 0.5, typical: 1, max: 2 },
    ultrasonicCleaning: { min: 3, typical: 5, max: 10 },
    vaporDegreasing: { min: 2, typical: 4, max: 8 },
  },
  
  // Chamfering (minutes per meter)
  chamfering: {
    manual: { min: 1.5, typical: 2.5, max: 4.0 },
    powered: { min: 0.8, typical: 1.5, max: 2.5 },
    automated: { min: 0.3, typical: 0.6, max: 1.0 },
  },
  
  // Radius edges (minutes per meter)
  radiusing: {
    manual: { min: 2.0, typical: 3.5, max: 5.5 },
    powered: { min: 1.0, typical: 2.0, max: 3.5 },
    automated: { min: 0.5, typical: 1.0, max: 1.8 },
  },
} as const;

/**
 * Setup and handling time per part (minutes)
 */
export const HANDLING_TIME = {
  // Part size categories
  small: { min: 0.5, typical: 1, max: 2 }, // <300mm
  medium: { min: 1, typical: 2, max: 3 }, // 300-1000mm
  large: { min: 2, typical: 4, max: 6 }, // 1000-2000mm
  xlarge: { min: 4, typical: 8, max: 12 }, // >2000mm
  
  // Complexity factors
  simple: 1.0, // Simple rectangular or circular
  moderate: 1.3, // Some internal features
  complex: 1.8, // Many internal cutouts
  veryComplex: 2.5, // Intricate patterns
} as const;

/**
 * Quality inspection time (minutes per part)
 */
export const INSPECTION_TIME = {
  visual: { min: 0.5, typical: 1, max: 2 },
  dimensional: { min: 2, typical: 5, max: 10 },
  detailed: { min: 5, typical: 15, max: 30 },
} as const;

/**
 * Labor rates for finishing operations (USD per hour)
 */
export const FINISHING_LABOR_RATES = {
  generalLabor: 20, // Basic deburring
  skilledLabor: 30, // Grinding, polishing
  specializedLabor: 45, // High-precision finishing
  inspection: 35, // Quality control
} as const;

/**
 * Equipment costs for finishing (USD per hour of operation)
 */
export const FINISHING_EQUIPMENT_COSTS = {
  handTools: 2, // Depreciation + maintenance
  beltSander: 5,
  grinder: 4,
  automatedDeburr: 15,
  ultrasonicCleaner: 8,
  polishingStation: 10,
} as const;

/**
 * Consumables costs (USD per meter of edge processed)
 */
export const FINISHING_CONSUMABLES = {
  sandingBelts: 0.15,
  grindingDiscs: 0.20,
  polishingCompounds: 0.30,
  chemicalCleaning: 0.10,
  protectiveCoating: 0.25,
} as const;

/**
 * Typical finishing time as percentage of cutting time
 */
export const FINISHING_TIME_PERCENTAGES = {
  noFinishing: 0,
  lightFinishing: { min: 10, typical: 20, max: 30 },
  mediumFinishing: { min: 30, typical: 50, max: 80 },
  heavyFinishing: { min: 80, typical: 120, max: 180 },
} as const;

/**
 * Cut quality vs finishing requirements
 */
export const CUT_QUALITY_FINISHING_RELATIONSHIP = {
  excellentCut: {
    description: 'Nitrogen cutting, optimal parameters',
    finishingReduction: 0.5, // 50% less finishing time needed
    typicalEdgeRoughness: '3-6 µm Ra',
  },
  goodCut: {
    description: 'Standard parameters, minimal dross',
    finishingReduction: 1.0, // Baseline
    typicalEdgeRoughness: '6-12 µm Ra',
  },
  fairCut: {
    description: 'Some dross, slight irregularities',
    finishingReduction: 1.3, // 30% more finishing time
    typicalEdgeRoughness: '12-25 µm Ra',
  },
  poorCut: {
    description: 'Heavy dross, rough edges',
    finishingReduction: 2.0, // 100% more finishing time
    typicalEdgeRoughness: '>25 µm Ra',
  },
} as const;

/**
 * Helper function to estimate finishing time
 */
export function estimateFinishingTime(
  edgeLengthMeters: number,
  material: 'mild_steel' | 'stainless_steel' | 'aluminum',
  thicknessMm: number,
  method: 'manual' | 'powered' | 'automated',
  qualityLevel: keyof typeof EDGE_QUALITY_LEVELS,
  partSize: keyof typeof HANDLING_TIME
): {
  deburrTimeMinutes: number;
  handlingTimeMinutes: number;
  totalTimeMinutes: number;
} {
  // Determine thickness range
  let thicknessRange: string;
  if (thicknessMm <= 2) thicknessRange = '0.5-2mm';
  else if (thicknessMm <= 5) thicknessRange = '2-5mm';
  else if (thicknessMm <= 10) thicknessRange = '5-10mm';
  else thicknessRange = '10-20mm';
  
  // Get base deburr time per meter
  const methodData = DEBURR_TIME_MATRIX[method];
  const materialData = methodData[material];
  const rangeData = materialData[thicknessRange as keyof typeof materialData];
  const baseTimePerMeter = rangeData.typical;
  
  // Apply quality level multiplier
  const qualityData = EDGE_QUALITY_LEVELS[qualityLevel];
  const qualityMultiplier = 'finishingTimeMultiplier' in qualityData 
    ? qualityData.finishingTimeMultiplier 
    : 0;
  
  // Calculate total deburr time
  const deburrTimeMinutes = edgeLengthMeters * baseTimePerMeter * qualityMultiplier;
  
  // Add handling time
  const handlingData = HANDLING_TIME[partSize];
  const handlingTimeMinutes = handlingData.typical;
  
  return {
    deburrTimeMinutes,
    handlingTimeMinutes,
    totalTimeMinutes: deburrTimeMinutes + handlingTimeMinutes,
  };
}

/**
 * Common finishing scenarios and time estimates
 */
export const TYPICAL_FINISHING_SCENARIOS = {
  bracketMildSteel: {
    description: '300mm perimeter bracket, 3mm mild steel',
    edgeLengthM: 0.3,
    material: 'mild_steel',
    thickness: 3,
    method: 'powered',
    quality: 'light',
    estimatedTimeMinutes: 1.5,
  },
  panelStainless: {
    description: '2m perimeter panel, 2mm stainless',
    edgeLengthM: 2.0,
    material: 'stainless_steel',
    thickness: 2,
    method: 'powered',
    quality: 'medium',
    estimatedTimeMinutes: 6,
  },
  architecturalAluminum: {
    description: '1.5m decorative part, 5mm aluminum',
    edgeLengthM: 1.5,
    material: 'aluminum',
    thickness: 5,
    method: 'manual',
    quality: 'high',
    estimatedTimeMinutes: 9,
  },
} as const;

/**
 * Optimization recommendations
 */
export const FINISHING_OPTIMIZATION = {
  reduceFinishingTime: [
    'Optimize laser cutting parameters to reduce dross',
    'Use nitrogen assist gas for cleaner edges',
    'Invest in automated deburring equipment for high-volume work',
    'Train operators on proper cutting techniques',
    'Use lower power for final pass to improve edge quality',
  ],
  whenToOutsource: [
    'High-volume production (>1000 parts/month)',
    'Specialized finishing (mirror polish, electropolishing)',
    'When finishing time exceeds cutting time by 2x',
  ],
  whenToInvest: [
    'Automated deburring: ROI at >500 hours finishing/year',
    'Ultrasonic cleaner: ROI at >200 parts/month requiring cleaning',
    'Polishing station: ROI at >100 hours polishing/year',
  ],
} as const;

