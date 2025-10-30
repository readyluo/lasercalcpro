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

/**
 * Calculate laser cutting cost with detailed breakdown
 * Formula based on industry standards and real manufacturing data
 */
export function calculateLaserCutting(input: LaserCuttingInput): LaserCuttingResult {
  const material = MATERIAL_PROPERTIES[input.materialType];

  // 1. Calculate cutting time
  // Speed decreases with thickness and increases with power
  // Formula: speed = baseCuttingSpeed × (power / thickness) × efficiencyFactor
  const baseCuttingSpeed = material.cuttingSpeed; // mm/min
  const thicknessFactor = Math.sqrt(input.thickness); // Nonlinear relationship
  const powerFactor = Math.sqrt(input.laserPower);
  const reflectivityPenalty = 1 - material.reflectivity * 0.3; // High reflectivity reduces efficiency

  const effectiveCuttingSpeed =
    (baseCuttingSpeed * powerFactor * reflectivityPenalty) / thicknessFactor;

  const cuttingTimeMinutes = input.cuttingLength / effectiveCuttingSpeed;
  const cuttingTime = cuttingTimeMinutes / 60; // Convert to hours

  // Setup time: 0.1-0.3 hours (6-18 minutes) depending on complexity
  const setupTime = 0.15 + input.thickness * 0.005;

  const totalTime = cuttingTime + setupTime;

  // 2. Calculate material cost
  // Estimate material weight based on cutting length and thickness
  const kerf = 0.3; // mm, typical laser kerf width
  const cuttingPathWidth = kerf;
  const materialVolumeCm3 =
    (input.cuttingLength * cuttingPathWidth * input.thickness) / 1000; // cm³

  const materialWeight = (materialVolumeCm3 * material.density) / 1000000; // kg
  const materialCost = materialWeight * input.materialPrice;

  // 3. Calculate power cost
  // Total power = laser power + auxiliary systems (cooling, extraction, etc.)
  const totalPowerConsumption = input.laserPower * 1.3; // 30% overhead for auxiliary systems
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

  // 7. Calculate maintenance cost (5-10% of depreciation)
  const maintenanceCost = depreciation * 0.07;

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


