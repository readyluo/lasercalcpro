/**
 * Piercing Time & Cost Constants
 * 
 * Pierce time is critical for parts with many holes and can exceed cutting time.
 * Values based on fiber laser systems with optimized piercing strategies.
 * 
 * Source: Industry data from major laser manufacturers (Trumpf, Bystronic, Amada)
 * Last updated: 2024
 */

/**
 * Piercing time per hole (seconds) by material and thickness
 * Using optimized high-pressure piercing for fiber lasers
 */
export const PIERCE_TIME_MATRIX = {
  // Mild Steel (with oxygen assist)
  mild_steel: {
    '0.5-1mm': { min: 0.1, typical: 0.2, max: 0.3 },
    '1-2mm': { min: 0.2, typical: 0.3, max: 0.5 },
    '2-3mm': { min: 0.3, typical: 0.5, max: 0.8 },
    '3-5mm': { min: 0.5, typical: 0.8, max: 1.2 },
    '5-8mm': { min: 0.8, typical: 1.5, max: 2.5 },
    '8-12mm': { min: 1.5, typical: 2.5, max: 4.0 },
    '12-20mm': { min: 2.5, typical: 4.0, max: 6.0 },
    '20-25mm': { min: 4.0, typical: 6.0, max: 8.0 },
  },
  
  // Stainless Steel (nitrogen assist, slower piercing)
  stainless_steel: {
    '0.5-1mm': { min: 0.2, typical: 0.3, max: 0.5 },
    '1-2mm': { min: 0.3, typical: 0.5, max: 0.8 },
    '2-3mm': { min: 0.5, typical: 0.8, max: 1.2 },
    '3-5mm': { min: 0.8, typical: 1.2, max: 2.0 },
    '5-8mm': { min: 1.2, typical: 2.0, max: 3.5 },
    '8-12mm': { min: 2.0, typical: 3.5, max: 5.5 },
    '12-20mm': { min: 3.5, typical: 5.5, max: 8.0 },
  },
  
  // Aluminum (nitrogen assist)
  aluminum: {
    '0.5-1mm': { min: 0.1, typical: 0.2, max: 0.4 },
    '1-2mm': { min: 0.2, typical: 0.4, max: 0.6 },
    '2-3mm': { min: 0.4, typical: 0.6, max: 1.0 },
    '3-5mm': { min: 0.6, typical: 1.0, max: 1.5 },
    '5-8mm': { min: 1.0, typical: 1.5, max: 2.5 },
    '8-12mm': { min: 1.5, typical: 2.5, max: 4.0 },
  },
  
  // Copper & Brass (challenging, high power required)
  copper_brass: {
    '0.5-1mm': { min: 0.3, typical: 0.5, max: 0.8 },
    '1-2mm': { min: 0.5, typical: 0.8, max: 1.2 },
    '2-3mm': { min: 0.8, typical: 1.2, max: 2.0 },
    '3-5mm': { min: 1.2, typical: 2.0, max: 3.0 },
    '5-8mm': { min: 2.0, typical: 3.0, max: 5.0 },
  },
} as const;

/**
 * Piercing strategy modifiers
 */
export const PIERCE_STRATEGY_MODIFIERS = {
  // High-pressure piercing (standard for fiber lasers)
  highPressure: 1.0, // Baseline
  
  // Ramped piercing (reduces splatter, slightly slower)
  ramped: 1.15,
  
  // Low-power piercing (for delicate parts or thin materials)
  lowPower: 1.3,
  
  // Pulsed piercing (for thick materials, CO2 lasers)
  pulsed: 1.4,
  
  // Edge start (no pierce needed, fastest)
  edgeStart: 0.0,
} as const;

/**
 * Pierce quality factors (affect time)
 */
export const PIERCE_QUALITY_FACTORS = {
  // Nozzle standoff distance impact
  optimalStandoff: 1.0, // 0.7-1.2mm typical
  highStandoff: 1.1, // Reduces splatter risk but slower
  
  // Focus position impact
  optimalFocus: 1.0,
  deepFocus: 1.15, // For thick materials
  
  // Gas pressure impact
  optimalPressure: 1.0, // Material-specific optimal
  highPressure: 0.9, // Faster but more gas consumption
  lowPressure: 1.2, // Cleaner but slower
} as const;

/**
 * Typical hole count scenarios
 */
export const TYPICAL_HOLE_SCENARIOS = {
  simpleFlange: {
    description: '4-8 mounting holes',
    holeCount: { min: 4, max: 8, typical: 6 },
  },
  bracketWithSlots: {
    description: '10-20 holes + slots',
    holeCount: { min: 10, max: 20, typical: 15 },
  },
  perforatedPanel: {
    description: '50-500 holes in pattern',
    holeCount: { min: 50, max: 500, typical: 200 },
  },
  ventilationGrill: {
    description: '100-1000+ small holes',
    holeCount: { min: 100, max: 1000, typical: 400 },
  },
  simpleProfile: {
    description: 'Outer contour only, no internal holes',
    holeCount: { min: 0, max: 2, typical: 1 }, // 1 pierce for outer contour
  },
} as const;

/**
 * Pierce cost calculation factors
 */
export const PIERCE_COST_FACTORS = {
  // Additional gas consumption per pierce (m³)
  gasConsumptionPerPierce: {
    nitrogen: 0.002, // ~2 liters per pierce
    oxygen: 0.003, // ~3 liters per pierce
    air: 0.001, // ~1 liter per pierce
  },
  
  // Lens contamination (piercing generates more splatter)
  splatterCleaningFrequency: 200, // Clean lens every 200 pierces (typical)
  cleaningTimeCost: 300, // 5 minutes @ $60/hour = $5
  
  // Nozzle wear factor (piercing causes more wear than cutting)
  nozzleWearMultiplier: 1.5, // Piercing wears nozzles 50% faster
} as const;

/**
 * Helper function to get pierce time for material and thickness
 */
export function getPierceTime(
  material: keyof typeof PIERCE_TIME_MATRIX,
  thicknessMm: number,
  strategy: keyof typeof PIERCE_STRATEGY_MODIFIERS = 'highPressure',
  quality: 'typical' | 'min' | 'max' = 'typical'
): number {
  const materialData = PIERCE_TIME_MATRIX[material];
  
  // Find appropriate thickness range
  let thicknessRange: keyof typeof materialData | null = null;
  
  if (thicknessMm <= 1) thicknessRange = '0.5-1mm';
  else if (thicknessMm <= 2) thicknessRange = '1-2mm';
  else if (thicknessMm <= 3) thicknessRange = '2-3mm';
  else if (thicknessMm <= 5) thicknessRange = '3-5mm';
  else if (thicknessMm <= 8) thicknessRange = '5-8mm';
  else if (thicknessMm <= 12) thicknessRange = '8-12mm';
  else if (thicknessMm <= 20 && material === 'mild_steel') thicknessRange = '12-20mm';
  else if (thicknessMm <= 25 && material === 'mild_steel') thicknessRange = '20-25mm';
  
  if (!thicknessRange || !(thicknessRange in materialData)) {
    throw new Error(`Thickness ${thicknessMm}mm not supported for ${material}`);
  }
  
  const rangeData = materialData[thicknessRange as keyof typeof materialData];
  const baseTime = rangeData[quality];
  const strategyModifier = PIERCE_STRATEGY_MODIFIERS[strategy];
  
  return baseTime * strategyModifier;
}

/**
 * Calculate total piercing time for a part
 */
export function calculateTotalPierceTime(
  holeCount: number,
  material: keyof typeof PIERCE_TIME_MATRIX,
  thicknessMm: number,
  strategy: keyof typeof PIERCE_STRATEGY_MODIFIERS = 'highPressure',
  quality: 'typical' | 'min' | 'max' = 'typical'
): number {
  const timePerPierce = getPierceTime(material, thicknessMm, strategy, quality);
  return holeCount * timePerPierce;
}

/**
 * Piercing time as percentage of total job time (typical ranges)
 */
export const PIERCE_TIME_PERCENTAGE_RANGES = {
  simpleProfiles: { min: 1, max: 5, typical: 2 }, // Few holes
  standardParts: { min: 5, max: 15, typical: 10 }, // Moderate holes
  perforated: { min: 15, max: 40, typical: 25 }, // Many holes
  heavilyPerforated: { min: 40, max: 70, typical: 50 }, // Piercing dominates
} as const;

/**
 * Optimization recommendations based on pierce count
 */
export const PIERCE_OPTIMIZATION_THRESHOLDS = {
  // When to consider design changes
  highPierceCountThreshold: 50, // Consider reducing hole count
  veryHighPierceCountThreshold: 200, // Strong recommendation to optimize
  
  // When to consider alternative methods
  plasmaThreshold: 500, // Consider plasma for heavily perforated thick plates
  punchingThreshold: 100, // Consider punching for thin sheets with many holes
} as const;

