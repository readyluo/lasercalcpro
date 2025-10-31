/**
 * Setup & Changeover Time Constants
 * 
 * Setup time often represents 15-30% of total job time and is critical for accurate costing.
 * Based on typical job shop operations with modern laser cutting systems.
 * 
 * Source: Time-motion studies from manufacturing operations
 */

/**
 * Base setup time components (minutes)
 */
export const SETUP_TIME_COMPONENTS = {
  // Programming and file preparation
  programming: {
    simple: { min: 5, typical: 10, max: 15 }, // Import DXF, basic nesting
    moderate: { min: 10, typical: 20, max: 30 }, // Manual nesting, parameter adjustment
    complex: { min: 20, typical: 40, max: 60 }, // Complex nesting, multiple materials
    veryComplex: { min: 40, typical: 80, max: 120 }, // Custom programming, special features
  },
  
  // Material loading and positioning
  materialLoading: {
    small: { min: 2, typical: 3, max: 5 }, // <1m² sheets
    medium: { min: 3, typical: 5, max: 8 }, // 1-2m² sheets
    large: { min: 5, typical: 10, max: 15 }, // 2-4m² sheets
    xlarge: { min: 10, typical: 20, max: 30 }, // >4m² sheets or heavy plates
  },
  
  // Machine preparation
  machinePrep: {
    noChange: { min: 1, typical: 2, max: 3 }, // Same material, same thickness
    nozzleChange: { min: 3, typical: 5, max: 8 }, // Change nozzle diameter
    gasChange: { min: 2, typical: 4, max: 6 }, // Switch assist gas type
    focusAdjust: { min: 2, typical: 4, max: 6 }, // Adjust focus for new thickness
    fullSetup: { min: 8, typical: 15, max: 25 }, // Complete changeover
  },
  
  // First article inspection
  firstArticle: {
    none: 0, // No inspection (repeat jobs)
    quick: { min: 2, typical: 3, max: 5 }, // Visual check only
    standard: { min: 5, typical: 10, max: 15 }, // Basic dimensional check
    detailed: { min: 15, typical: 30, max: 45 }, // Full dimensional inspection
  },
  
  // Fixture/clamping setup (for small parts requiring fixtures)
  fixtureSetup: {
    none: 0, // No fixture needed
    simple: { min: 3, typical: 5, max: 8 }, // Magnetic strips or simple clamps
    moderate: { min: 8, typical: 15, max: 25 }, // Custom fixture positioning
    complex: { min: 25, typical: 45, max: 70 }, // Complex multi-part fixturing
  },
} as const;

/**
 * Setup time reduction factors
 */
export const SETUP_REDUCTION_FACTORS = {
  // Operator experience
  operatorExperience: {
    novice: 1.5, // 50% slower than baseline
    intermediate: 1.0, // Baseline
    experienced: 0.75, // 25% faster
    expert: 0.6, // 40% faster
  },
  
  // Job familiarity
  jobFamiliarity: {
    firstTime: 1.5, // New job, no prior experience
    occasional: 1.2, // Done a few times before
    regular: 0.9, // Done regularly
    repeat: 0.6, // Exact repeat with saved program
  },
  
  // Equipment automation level
  automation: {
    manual: 1.3, // Manual loading, manual parameter entry
    semiAuto: 1.0, // Baseline - some automation
    automated: 0.7, // Auto loading, saved programs
    fullyAuto: 0.4, // Lights-out capable with minimal setup
  },
  
  // Material standardization
  materialStandardization: {
    varied: 1.2, // Many different materials/thicknesses
    limited: 1.0, // Baseline - moderate variety
    standardized: 0.8, // Limited material variety
  },
} as const;

/**
 * Changeover time between jobs (minutes)
 */
export const CHANGEOVER_TIME = {
  // Same material type and thickness
  sameSetup: { min: 2, typical: 5, max: 8 },
  
  // Same material, different thickness
  thicknessChange: { min: 5, typical: 10, max: 15 },
  
  // Different material, same thickness
  materialChange: { min: 8, typical: 15, max: 25 },
  
  // Different material and thickness
  fullChange: { min: 15, typical: 25, max: 40 },
  
  // Major setup (gas type change, extensive parameter changes)
  majorChange: { min: 30, typical: 50, max: 80 },
} as const;

/**
 * Batch processing time savings
 */
export const BATCH_PROCESSING = {
  // Setup time distribution in batch
  setupTimeDistribution: {
    singlePart: 1.0, // 100% of setup time per part
    batch_5: 0.25, // 25% of setup time per part (5 parts)
    batch_10: 0.15, // 15% of setup time per part
    batch_25: 0.08, // 8% of setup time per part
    batch_50: 0.05, // 5% of setup time per part
    batch_100plus: 0.03, // 3% of setup time per part
  },
  
  // Optimal batch sizes by part complexity
  optimalBatchSizes: {
    simple: { min: 10, optimal: 50, max: 200 },
    moderate: { min: 5, optimal: 25, max: 100 },
    complex: { min: 2, optimal: 10, max: 50 },
  },
} as const;

/**
 * Setup cost calculation factors
 */
export const SETUP_COST_FACTORS = {
  // Labor cost during setup (typically higher rate than operation)
  setupLaborRate: 35, // USD per hour (programmer/specialist)
  
  // Equipment idle cost during setup
  equipmentIdleCost: 15, // USD per hour (depreciation continues)
  
  // Consumables used during setup (test cuts, calibration)
  testMaterialCost: {
    none: 0,
    minimal: 5, // Small test piece
    standard: 15, // Standard test cut
    extensive: 30, // Multiple test iterations
  },
} as const;

/**
 * Common setup scenarios
 */
export const TYPICAL_SETUP_SCENARIOS = {
  // Scenario 1: Simple repeat job
  repeatJobSameSetup: {
    description: 'Repeat job, same material/thickness, saved program',
    programmingMin: 2,
    loadingMin: 3,
    machinePrepMin: 2,
    inspectionMin: 3,
    totalMin: 10,
    applicableFor: ['High-volume production', 'Standard parts', 'Established customers'],
  },
  
  // Scenario 2: New job, standard material
  newJobStandardMaterial: {
    description: 'New part, standard material (mild steel 3mm)',
    programmingMin: 15,
    loadingMin: 5,
    machinePrepMin: 5,
    inspectionMin: 10,
    totalMin: 35,
    applicableFor: ['First-time orders', 'Prototype work', 'New customers'],
  },
  
  // Scenario 3: Complex new job
  complexNewJob: {
    description: 'Complex part, special material, tight tolerances',
    programmingMin: 40,
    loadingMin: 8,
    machinePrepMin: 15,
    inspectionMin: 30,
    totalMin: 93,
    applicableFor: ['Precision work', 'Unusual materials', 'Critical parts'],
  },
  
  // Scenario 4: Quick changeover
  quickChangeover: {
    description: 'Switch to different job, similar setup',
    programmingMin: 5,
    loadingMin: 5,
    machinePrepMin: 10,
    inspectionMin: 5,
    totalMin: 25,
    applicableFor: ['Mixed production', 'Small batch work', 'Job shops'],
  },
} as const;

/**
 * Setup time as percentage of total job time (typical ranges)
 */
export const SETUP_TIME_PERCENTAGES = {
  highVolume: { min: 2, typical: 5, max: 10 }, // Large batches
  mediumVolume: { min: 10, typical: 20, max: 30 }, // Medium batches
  lowVolume: { min: 30, typical: 50, max: 80 }, // Small batches, prototypes
  oneOff: { min: 80, typical: 150, max: 300 }, // Single parts (setup can exceed cutting)
} as const;

/**
 * Helper function to calculate total setup time
 */
export function calculateSetupTime(
  programmingComplexity: keyof typeof SETUP_TIME_COMPONENTS.programming,
  materialSize: keyof typeof SETUP_TIME_COMPONENTS.materialLoading,
  machineChange: keyof typeof SETUP_TIME_COMPONENTS.machinePrep,
  inspectionLevel: keyof typeof SETUP_TIME_COMPONENTS.firstArticle,
  fixtureComplexity: keyof typeof SETUP_TIME_COMPONENTS.fixtureSetup,
  operatorLevel: keyof typeof SETUP_REDUCTION_FACTORS.operatorExperience = 'intermediate',
  familiarity: keyof typeof SETUP_REDUCTION_FACTORS.jobFamiliarity = 'firstTime'
): {
  programmingTime: number;
  loadingTime: number;
  machinePrepTime: number;
  inspectionTime: number;
  fixtureTime: number;
  baseTotal: number;
  adjustedTotal: number;
} {
  // Get base times (typical values)
  const programmingTime = SETUP_TIME_COMPONENTS.programming[programmingComplexity].typical;
  const loadingTime = SETUP_TIME_COMPONENTS.materialLoading[materialSize].typical;
  const machinePrepTime = SETUP_TIME_COMPONENTS.machinePrep[machineChange].typical;
  
  const inspectionData = SETUP_TIME_COMPONENTS.firstArticle[inspectionLevel];
  const inspectionTime = typeof inspectionData === 'number' ? inspectionData : inspectionData.typical;
  
  const fixtureData = SETUP_TIME_COMPONENTS.fixtureSetup[fixtureComplexity];
  const fixtureTime = typeof fixtureData === 'number' ? fixtureData : fixtureData.typical;
  
  // Calculate base total
  const baseTotal = programmingTime + loadingTime + machinePrepTime + inspectionTime + fixtureTime;
  
  // Apply reduction factors
  const experienceFactor = SETUP_REDUCTION_FACTORS.operatorExperience[operatorLevel];
  const familiarityFactor = SETUP_REDUCTION_FACTORS.jobFamiliarity[familiarity];
  
  const adjustedTotal = baseTotal * experienceFactor * familiarityFactor;
  
  return {
    programmingTime,
    loadingTime,
    machinePrepTime,
    inspectionTime,
    fixtureTime,
    baseTotal,
    adjustedTotal,
  };
}

/**
 * Calculate setup cost distribution per part in batch
 */
export function calculateSetupCostPerPart(
  totalSetupTimeMinutes: number,
  batchQuantity: number,
  setupLaborRate: number = SETUP_COST_FACTORS.setupLaborRate
): {
  setupTimePerPart: number;
  setupCostPerPart: number;
  setupPercentage: number;
} {
  const setupTimePerPart = totalSetupTimeMinutes / batchQuantity;
  const setupCostPerPart = (totalSetupTimeMinutes / 60) * setupLaborRate / batchQuantity;
  
  // Determine setup percentage category
  let setupPercentage: number;
  if (batchQuantity >= 100) setupPercentage = 3;
  else if (batchQuantity >= 50) setupPercentage = 5;
  else if (batchQuantity >= 25) setupPercentage = 8;
  else if (batchQuantity >= 10) setupPercentage = 15;
  else if (batchQuantity >= 5) setupPercentage = 25;
  else setupPercentage = 100;
  
  return {
    setupTimePerPart,
    setupCostPerPart,
    setupPercentage,
  };
}

/**
 * Setup time optimization strategies
 */
export const SETUP_OPTIMIZATION = {
  reduceSetupTime: [
    'Standardize material inventory (reduce variety)',
    'Create saved programs for repeat jobs',
    'Implement SMED (Single-Minute Exchange of Die) principles',
    'Pre-stage materials and programs before shift',
    'Train operators on efficient setup procedures',
    'Use quick-change nozzle systems',
    'Invest in automatic nozzle changers',
  ],
  
  increaseEfficiency: [
    'Batch similar jobs together to minimize changeovers',
    'Schedule production runs to minimize material changes',
    'Use standardized fixtures for similar part families',
    'Implement setup checklists to reduce errors',
    'Track setup times to identify improvement opportunities',
  ],
  
  whenSetupIsCritical: [
    'Low-volume/high-mix production (job shops)',
    'Prototype and sample work',
    'Custom fabrication',
    'When setup time > 30% of cutting time',
  ],
} as const;

/**
 * Industry benchmarks for setup time
 */
export const SETUP_BENCHMARKS = {
  worldClass: {
    setupTimeMinutes: { min: 5, typical: 10, max: 15 },
    changeoverMinutes: { min: 3, typical: 5, max: 8 },
    description: 'Highly automated, standardized processes',
  },
  
  good: {
    setupTimeMinutes: { min: 15, typical: 25, max: 40 },
    changeoverMinutes: { min: 8, typical: 15, max: 25 },
    description: 'Well-organized shop with good procedures',
  },
  
  average: {
    setupTimeMinutes: { min: 30, typical: 45, max: 70 },
    changeoverMinutes: { min: 20, typical: 35, max: 50 },
    description: 'Typical job shop operations',
  },
  
  needsImprovement: {
    setupTimeMinutes: { min: 60, typical: 90, max: 120 },
    changeoverMinutes: { min: 40, typical: 60, max: 90 },
    description: 'High setup time, opportunity for improvement',
  },
} as const;

