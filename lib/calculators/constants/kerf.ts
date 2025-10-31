/**
 * Kerf Width Reference Constants
 * 
 * Kerf width affects dimensional accuracy, material usage, and edge quality.
 * Values for fiber laser systems (CO2 lasers typically have wider kerfs).
 * 
 * Source: Manufacturing data from laser OEMs and job shop measurements
 * Accuracy: ±0.02mm typical variation due to conditions
 */

/**
 * Kerf width (mm) by material, thickness, and nozzle diameter
 * Format: { nozzleDiameter: kerfWidth }
 */
export const KERF_WIDTH_MATRIX = {
  // Mild Steel (carbon steel)
  mild_steel: {
    '0.5mm': { '1.0mm_nozzle': 0.10, '1.5mm_nozzle': 0.15, '2.0mm_nozzle': 0.20 },
    '1mm': { '1.0mm_nozzle': 0.12, '1.5mm_nozzle': 0.18, '2.0mm_nozzle': 0.24 },
    '2mm': { '1.0mm_nozzle': 0.15, '1.5mm_nozzle': 0.22, '2.0mm_nozzle': 0.28 },
    '3mm': { '1.5mm_nozzle': 0.25, '2.0mm_nozzle': 0.32, '2.5mm_nozzle': 0.38 },
    '5mm': { '1.5mm_nozzle': 0.28, '2.0mm_nozzle': 0.35, '2.5mm_nozzle': 0.42 },
    '8mm': { '2.0mm_nozzle': 0.38, '2.5mm_nozzle': 0.45, '3.0mm_nozzle': 0.52 },
    '10mm': { '2.0mm_nozzle': 0.42, '2.5mm_nozzle': 0.50, '3.0mm_nozzle': 0.58 },
    '12mm': { '2.5mm_nozzle': 0.52, '3.0mm_nozzle': 0.60, '3.5mm_nozzle': 0.68 },
    '15mm': { '2.5mm_nozzle': 0.58, '3.0mm_nozzle': 0.65, '3.5mm_nozzle': 0.75 },
    '20mm': { '3.0mm_nozzle': 0.70, '3.5mm_nozzle': 0.80, '4.0mm_nozzle': 0.90 },
  },
  
  // Stainless Steel (304/316)
  stainless_steel: {
    '0.5mm': { '1.0mm_nozzle': 0.12, '1.5mm_nozzle': 0.18, '2.0mm_nozzle': 0.24 },
    '1mm': { '1.0mm_nozzle': 0.15, '1.5mm_nozzle': 0.20, '2.0mm_nozzle': 0.28 },
    '2mm': { '1.0mm_nozzle': 0.18, '1.5mm_nozzle': 0.25, '2.0mm_nozzle': 0.32 },
    '3mm': { '1.5mm_nozzle': 0.28, '2.0mm_nozzle': 0.35, '2.5mm_nozzle': 0.42 },
    '5mm': { '1.5mm_nozzle': 0.32, '2.0mm_nozzle': 0.40, '2.5mm_nozzle': 0.48 },
    '8mm': { '2.0mm_nozzle': 0.42, '2.5mm_nozzle': 0.50, '3.0mm_nozzle': 0.58 },
    '10mm': { '2.0mm_nozzle': 0.48, '2.5mm_nozzle': 0.55, '3.0mm_nozzle': 0.65 },
    '12mm': { '2.5mm_nozzle': 0.55, '3.0mm_nozzle': 0.65, '3.5mm_nozzle': 0.75 },
    '15mm': { '3.0mm_nozzle': 0.70, '3.5mm_nozzle': 0.80, '4.0mm_nozzle': 0.90 },
  },
  
  // Aluminum (5052, 6061)
  aluminum: {
    '0.5mm': { '1.0mm_nozzle': 0.10, '1.5mm_nozzle': 0.15, '2.0mm_nozzle': 0.22 },
    '1mm': { '1.0mm_nozzle': 0.12, '1.5mm_nozzle': 0.18, '2.0mm_nozzle': 0.25 },
    '2mm': { '1.0mm_nozzle': 0.15, '1.5mm_nozzle': 0.22, '2.0mm_nozzle': 0.30 },
    '3mm': { '1.5mm_nozzle': 0.25, '2.0mm_nozzle': 0.32, '2.5mm_nozzle': 0.40 },
    '5mm': { '1.5mm_nozzle': 0.30, '2.0mm_nozzle': 0.38, '2.5mm_nozzle': 0.45 },
    '8mm': { '2.0mm_nozzle': 0.40, '2.5mm_nozzle': 0.48, '3.0mm_nozzle': 0.55 },
    '10mm': { '2.5mm_nozzle': 0.50, '3.0mm_nozzle': 0.58, '3.5mm_nozzle': 0.68 },
    '12mm': { '3.0mm_nozzle': 0.60, '3.5mm_nozzle': 0.70, '4.0mm_nozzle': 0.80 },
  },
  
  // Copper & Brass
  copper_brass: {
    '0.5mm': { '1.0mm_nozzle': 0.12, '1.5mm_nozzle': 0.18, '2.0mm_nozzle': 0.25 },
    '1mm': { '1.0mm_nozzle': 0.15, '1.5mm_nozzle': 0.22, '2.0mm_nozzle': 0.30 },
    '2mm': { '1.5mm_nozzle': 0.22, '2.0mm_nozzle': 0.30, '2.5mm_nozzle': 0.38 },
    '3mm': { '1.5mm_nozzle': 0.28, '2.0mm_nozzle': 0.35, '2.5mm_nozzle': 0.45 },
    '5mm': { '2.0mm_nozzle': 0.38, '2.5mm_nozzle': 0.48, '3.0mm_nozzle': 0.58 },
    '8mm': { '2.5mm_nozzle': 0.50, '3.0mm_nozzle': 0.60, '3.5mm_nozzle': 0.70 },
  },
} as const;

/**
 * Typical nozzle diameter selection by thickness
 */
export const NOZZLE_SELECTION_GUIDE = {
  '0.5-1mm': ['1.0mm_nozzle', '1.5mm_nozzle'],
  '1-3mm': ['1.5mm_nozzle', '2.0mm_nozzle'],
  '3-6mm': ['2.0mm_nozzle', '2.5mm_nozzle'],
  '6-10mm': ['2.5mm_nozzle', '3.0mm_nozzle'],
  '10-15mm': ['3.0mm_nozzle', '3.5mm_nozzle'],
  '15-25mm': ['3.5mm_nozzle', '4.0mm_nozzle'],
} as const;

/**
 * Kerf width factors and modifiers
 */
export const KERF_MODIFIERS = {
  // Laser power impact (higher power = slightly wider kerf)
  laserPower: {
    '1-3kW': 0.95,
    '3-6kW': 1.0, // Baseline
    '6-12kW': 1.05,
    '12kW+': 1.10,
  },
  
  // Cutting speed impact (faster = slightly narrower)
  cuttingSpeed: {
    slow: 1.05, // <50% of optimal speed
    optimal: 1.0, // 80-100% of optimal speed
    fast: 0.95, // >100% of optimal speed
  },
  
  // Focus position impact
  focusPosition: {
    onSurface: 1.0,
    inMaterial: 0.95, // Narrower kerf, good for thick materials
    aboveSurface: 1.08, // Wider kerf, good for thin materials
  },
  
  // Gas pressure impact
  gasPressure: {
    low: 1.05,
    optimal: 1.0,
    high: 0.98,
  },
} as const;

/**
 * Kerf compensation strategies
 */
export const KERF_COMPENSATION = {
  // When to apply kerf compensation
  alwaysCompensate: ['precise_holes', 'tight_fit_parts', 'assembly_components'],
  sometimesCompensate: ['general_cutting', 'decorative_parts'],
  neverCompensate: ['outer_profiles_only', 'oversized_blanks'],
  
  // Typical compensation values (offset the cutting path)
  compensationStrategy: {
    inside_cut: 'outward', // Offset outward by half kerf width
    outside_cut: 'inward', // Offset inward by half kerf width
    center_line: 'none', // No compensation (rare)
  },
  
  // Tolerance considerations
  typicalTolerance: {
    standard: 0.1, // ±0.1mm
    precision: 0.05, // ±0.05mm
    loose: 0.2, // ±0.2mm
  },
} as const;

/**
 * Material loss due to kerf (per meter of cutting)
 */
export function calculateKerfMaterialLoss(
  kerfWidthMm: number,
  cuttingLengthM: number,
  materialThicknessMm: number,
  materialDensity: number = 7.85 // kg/dm³, default for steel
): {
  volumeLossCm3: number;
  massLossKg: number;
  linearAreaLossCm2: number;
} {
  const kerfWidthCm = kerfWidthMm / 10;
  const thicknessCm = materialThicknessMm / 10;
  const lengthCm = cuttingLengthM * 100;
  
  const linearAreaLossCm2 = kerfWidthCm * lengthCm;
  const volumeLossCm3 = linearAreaLossCm2 * thicknessCm;
  const massLossKg = volumeLossCm3 * materialDensity / 1000;
  
  return {
    volumeLossCm3,
    massLossKg,
    linearAreaLossCm2,
  };
}

/**
 * Typical kerf width ranges by laser type
 */
export const KERF_BY_LASER_TYPE = {
  fiberLaser: {
    thin: { min: 0.08, max: 0.20, typical: 0.12 }, // <3mm
    medium: { min: 0.20, max: 0.40, typical: 0.30 }, // 3-10mm
    thick: { min: 0.40, max: 0.70, typical: 0.55 }, // >10mm
  },
  co2Laser: {
    thin: { min: 0.15, max: 0.30, typical: 0.22 },
    medium: { min: 0.30, max: 0.60, typical: 0.45 },
    thick: { min: 0.60, max: 1.00, typical: 0.80 },
  },
  plasmaLaser: {
    thin: { min: 0.50, max: 1.50, typical: 1.00 },
    medium: { min: 1.50, max: 3.00, typical: 2.20 },
    thick: { min: 3.00, max: 6.00, typical: 4.50 },
  },
} as const;

/**
 * Edge quality vs kerf width relationship
 */
export const KERF_EDGE_QUALITY = {
  narrowKerf: {
    advantages: [
      'Less material waste',
      'Better dimensional accuracy',
      'Suitable for fine features',
      'Lower heat input',
    ],
    disadvantages: [
      'Requires smaller nozzle (more prone to blockage)',
      'May require slower cutting speed',
      'Less forgiving of focus errors',
    ],
  },
  wideKerf: {
    advantages: [
      'More stable cutting process',
      'Better for thick materials',
      'Higher gas flow prevents dross',
      'More forgiving parameters',
    ],
    disadvantages: [
      'More material waste',
      'Reduced accuracy on small features',
      'Higher gas consumption',
      'More heat input',
    ],
  },
} as const;

/**
 * Helper function to get kerf width
 */
export function getKerfWidth(
  material: keyof typeof KERF_WIDTH_MATRIX,
  thicknessMm: number,
  nozzleDiameter: string
): number | null {
  const materialData = KERF_WIDTH_MATRIX[material];
  
  // Find the closest thickness key
  const thicknessKeys = Object.keys(materialData);
  const closestKey = thicknessKeys.find(key => {
    const keyValue = parseFloat(key);
    return Math.abs(keyValue - thicknessMm) < 0.5;
  });
  
  if (!closestKey) return null;
  
  const thicknessData = materialData[closestKey as keyof typeof materialData];
  return thicknessData[nozzleDiameter as keyof typeof thicknessData] || null;
}

/**
 * Recommended nozzle for thickness
 */
export function getRecommendedNozzle(thicknessMm: number): string[] {
  if (thicknessMm <= 1) return NOZZLE_SELECTION_GUIDE['0.5-1mm'];
  if (thicknessMm <= 3) return NOZZLE_SELECTION_GUIDE['1-3mm'];
  if (thicknessMm <= 6) return NOZZLE_SELECTION_GUIDE['3-6mm'];
  if (thicknessMm <= 10) return NOZZLE_SELECTION_GUIDE['6-10mm'];
  if (thicknessMm <= 15) return NOZZLE_SELECTION_GUIDE['10-15mm'];
  return NOZZLE_SELECTION_GUIDE['15-25mm'];
}

