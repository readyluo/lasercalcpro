import type { LaserCuttingInput } from '../validations/laser-cutting';

export interface LaserCuttingResult {
  // Time calculations
  cuttingTime: number; // hours
  setupTime: number; // hours
  totalTime: number; // hours

  // Cost breakdown
  materialCost: number;
  powerCost: number;
  laborCost: number;
  gasCost: number;
  depreciation: number;
  maintenanceCost: number;

  // Totals
  totalCost: number;
  suggestedPrice: number; // with 30% markup
  profitMargin: number;

  // Efficiency metrics
  costPerMeter: number;
  costPerMinute: number;
  energyEfficiency: string;

  // Material info
  materialWeight: number; // kg
  materialVolume: number; // cm³
}

// Material properties database
const MATERIAL_PROPERTIES: Record<
  string,
  {
    density: number; // kg/m³
    cuttingSpeed: number; // mm/min at 1kW per 1mm thickness
    reflectivity: number; // 0-1
    defaultPrice: number; // $/kg
  }
> = {
  stainless_steel: {
    density: 7900,
    cuttingSpeed: 800,
    reflectivity: 0.6,
    defaultPrice: 5,
  },
  aluminum: {
    density: 2700,
    cuttingSpeed: 1200,
    reflectivity: 0.9,
    defaultPrice: 8,
  },
  copper: {
    density: 8960,
    cuttingSpeed: 600,
    reflectivity: 0.95,
    defaultPrice: 15,
  },
  mild_steel: {
    density: 7850,
    cuttingSpeed: 1000,
    reflectivity: 0.5,
    defaultPrice: 3,
  },
  brass: {
    density: 8500,
    cuttingSpeed: 700,
    reflectivity: 0.85,
    defaultPrice: 10,
  },
};

function estimatePartArea(input: LaserCuttingInput): number {
  if (input.partArea && input.partArea > 0) {
    return input.partArea;
  }
  if (input.partLength && input.partWidth) {
    return input.partLength * input.partWidth;
  }

  // Fallback: assume near-rectangular part where area ≈ (perimeter / 4)^2
  const perimeter = Math.max(input.cuttingLength, 1);
  return Math.pow(perimeter / 4, 2);
}

/**
 * Calculate laser cutting cost with detailed breakdown
 * 
 * ⚠️ ESTIMATION LIMITATIONS:
 * This calculator uses simplified formulas for order-of-magnitude cost estimates.
 * 
 * What IS modeled:
 * - Material cost based on part envelope and utilization
 * - Energy consumption including auxiliary systems
 * - Labor cost based on total time
 * - Assist gas consumption during cutting
 * - Equipment depreciation and maintenance
 * 
 * What is NOT modeled in detail:
 * - Pierce time per hole (lumped into cutting time)
 * - Lead-in/ramp time
 * - Acceleration/deceleration effects
 * - Common-line cutting optimization
 * - Part removal and sorting time
 * - Quality-dependent speed adjustments
 * - Specific assist gas effects on speed
 * 
 * For accurate quoting:
 * - Validate results against your actual production data
 * - Use your machine's proven parameter tables
 * - Perform test cuts for unfamiliar materials or thicknesses
 * - Track actual setup times by job type
 * 
 * Formula basis: Simplified empirical models calibrated to industry averages.
 * Individual shop results will vary based on equipment, process, and efficiency.
 */
export function calculateLaserCutting(input: LaserCuttingInput): LaserCuttingResult {
  const material = MATERIAL_PROPERTIES[input.materialType];

  // 1. Calculate cutting time
  // ⚠️ IMPORTANT: This uses a simplified empirical formula for estimation.
  // Real cutting speeds depend on many factors not modeled here:
  // - Assist gas type and pressure (O2 vs N2 significantly affects speed)
  // - Cut quality requirements (precision vs. speed trade-off)
  // - Material surface condition (mill scale, coatings, oxidation)
  // - Nozzle condition and alignment
  // - Focus position and beam quality
  // - Specific cutting parameters (frequency, pulse settings for pulsed lasers)
  // 
  // Formula: speed = baseCuttingSpeed × sqrt(power) / sqrt(thickness) × reflectivityFactor
  // This provides a rough order-of-magnitude estimate only.
  // For accurate quotes, always use your machine's proven parameter tables.
  
  const baseCuttingSpeed = material.cuttingSpeed; // mm/min at reference conditions
  const thicknessFactor = Math.sqrt(input.thickness); // Nonlinear: thicker = slower (simplified)
  const powerFactor = Math.sqrt(input.laserPower); // More power = faster (diminishing returns)
  const reflectivityPenalty = 1 - material.reflectivity * 0.3; // High reflectivity reduces efficiency (simplified)

  const effectiveCuttingSpeed =
    (baseCuttingSpeed * powerFactor * reflectivityPenalty) / thicknessFactor;

  const cuttingTimeMinutes = input.cuttingLength / effectiveCuttingSpeed;
  const cuttingTime = cuttingTimeMinutes / 60; // Convert to hours

  // Setup time: 0.1-0.3 hours (6-18 minutes) depending on complexity
  // ⚠️ This is a simplified linear model: base_time + thickness_factor
  // Actual setup time depends on:
  // - Part complexity and nesting arrangement
  // - Material loading method (manual vs. automated)
  // - Operator experience
  // - Programming time (if not pre-programmed)
  // - Fixturing and alignment requirements
  // For better accuracy, track your actual setup times by job type.
  const baseSetupTime = 0.15; // hours (~9 minutes)
  const thicknessAdjustment = input.thickness * 0.005; // slight increase for thicker materials
  const setupTime = baseSetupTime + thicknessAdjustment;

  const totalTime = cuttingTime + setupTime;

  // 2. Calculate material cost
  // Estimate part area and gross material allocation (includes scrap/kerf allowance)
  const partArea = estimatePartArea(input); // mm²
  const utilization = Math.min(Math.max(input.materialUtilization ?? 0.85, 0.1), 1);
  const grossArea = partArea / utilization;
  const materialVolumeMm3 = grossArea * input.thickness;
  const materialVolumeCm3 = materialVolumeMm3 / 1000;
  const materialWeight = (materialVolumeMm3 / 1000000000) * material.density; // kg
  const materialCost = materialWeight * input.materialPrice;

  // 3. Calculate power cost
  // Total power = laser power + auxiliary systems (cooling, extraction, etc.)
  // ⚠️ Auxiliary multiplier (1.3x) is a simplified average assumption.
  // Actual auxiliary power consumption varies:
  // - Efficient fiber lasers with air cooling: ~1.2x laser power
  // - Systems with heavy water chillers: ~1.4-1.5x laser power
  // - CO2 lasers with turbine blowers: ~1.5-2x laser power
  // Use your actual measured power consumption for accurate costing.
  const auxiliaryMultiplier = 1.3; // 30% overhead for auxiliary systems (industry average)
  const totalPowerConsumption = input.laserPower * auxiliaryMultiplier;
  const energyConsumed = totalPowerConsumption * cuttingTime; // kWh
  const powerCost = energyConsumed * input.electricityRate;

  // 4. Calculate labor cost
  const laborCost = totalTime * input.laborRate;

  // 5. Calculate gas cost (assist gas: N2, O2, or Air)
  const gasCost = input.gasConsumption * cuttingTime * input.gasPrice;

  // 6. Calculate equipment depreciation
  const equipmentCost = input.equipmentCost || 150000;
  const equipmentLifespan = input.equipmentLifespan || 10;
  const annualWorkingHours = input.annualWorkingHours || 2000;

  const hourlyDepreciation = equipmentCost / (equipmentLifespan * annualWorkingHours);
  const depreciation = hourlyDepreciation * totalTime;

  // 7. Calculate maintenance cost (typically 5-10% of depreciation)
  // ⚠️ This uses 7% as a mid-range estimate.
  // Actual maintenance costs vary by:
  // - Equipment age and condition
  // - Operating hours and intensity
  // - Preventive maintenance program quality
  // - Local service costs
  // Track your actual maintenance expenses for accurate budgeting.
  const maintenanceMultiplier = 0.07; // 7% of depreciation (simplified average)
  const maintenanceCost = depreciation * maintenanceMultiplier;

  // 8. Calculate totals
  const totalCost =
    materialCost + powerCost + laborCost + gasCost + depreciation + maintenanceCost;

  // Suggested price with 30% profit margin
  const suggestedPrice = totalCost * 1.3;
  const profitMargin = suggestedPrice - totalCost;

  // 9. Calculate efficiency metrics
  const costPerMeter = totalCost / (input.cuttingLength / 1000);
  const costPerMinute = totalCost / (totalTime * 60);

  // Energy efficiency rating
  const energyPerMeter = energyConsumed / (input.cuttingLength / 1000); // kWh/m
  let energyEfficiency: string;
  if (energyPerMeter < 0.1) energyEfficiency = 'Excellent';
  else if (energyPerMeter < 0.3) energyEfficiency = 'Good';
  else if (energyPerMeter < 0.5) energyEfficiency = 'Average';
  else energyEfficiency = 'Poor';

  return {
    // Time
    cuttingTime: parseFloat(cuttingTime.toFixed(4)),
    setupTime: parseFloat(setupTime.toFixed(4)),
    totalTime: parseFloat(totalTime.toFixed(4)),

    // Costs
    materialCost: parseFloat(materialCost.toFixed(2)),
    powerCost: parseFloat(powerCost.toFixed(2)),
    laborCost: parseFloat(laborCost.toFixed(2)),
    gasCost: parseFloat(gasCost.toFixed(2)),
    depreciation: parseFloat(depreciation.toFixed(2)),
    maintenanceCost: parseFloat(maintenanceCost.toFixed(2)),

    // Totals
    totalCost: parseFloat(totalCost.toFixed(2)),
    suggestedPrice: parseFloat(suggestedPrice.toFixed(2)),
    profitMargin: parseFloat(profitMargin.toFixed(2)),

    // Metrics
    costPerMeter: parseFloat(costPerMeter.toFixed(2)),
    costPerMinute: parseFloat(costPerMinute.toFixed(2)),
    energyEfficiency,

    // Material
    materialWeight: parseFloat(materialWeight.toFixed(4)),
    materialVolume: parseFloat(materialVolumeCm3.toFixed(2)),
  };
}

/**
 * Get material properties for display
 */
export function getMaterialInfo(materialType: string) {
  const material = MATERIAL_PROPERTIES[materialType];
  if (!material) return null;

  return {
    density: material.density,
    cuttingSpeed: material.cuttingSpeed,
    reflectivity: material.reflectivity * 100,
    defaultPrice: material.defaultPrice,
  };
}

/**
 * Validate calculation inputs and return errors
 */
export function validateInputs(input: Partial<LaserCuttingInput>): string[] {
  const errors: string[] = [];

  if (!input.materialType) errors.push('Material type is required');
  if (!input.thickness || input.thickness <= 0) errors.push('Valid thickness is required');
  if (!input.cuttingLength || input.cuttingLength <= 0)
    errors.push('Valid cutting length is required');
  if (!input.laserPower || input.laserPower <= 0) errors.push('Valid laser power is required');

  return errors;
}








