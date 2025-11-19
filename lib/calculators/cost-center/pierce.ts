/**
 * Pierce Time Estimator
 * 
 * Calculates piercing time and cost for laser cutting jobs.
 * Pure functions built on shared piercing time and cost constants.
 */

import type { PierceEstimatorInput } from '@/lib/validations/cost-center';
import {
  getPierceTime,
  calculateTotalPierceTime,
  PIERCE_COST_FACTORS,
  PIERCE_OPTIMIZATION_THRESHOLDS,
} from '@/lib/calculators/constants/piercing';

export interface PierceEstimatorResult {
  // Time calculations
  timePerPierce: number; // seconds
  totalPierceTime: number; // minutes
  totalPierceTimeHours: number; // hours
  
  // Cost calculations
  piercingLaborCost: number;
  piercingGasCost: number;
  piercingEquipmentCost: number;
  totalPiercingCost: number;
  costPerPierce: number;
  
  // Analysis
  pierceIntensity: 'low' | 'moderate' | 'high' | 'very-high';
  asPercentageOfCutting: number; // Estimated percentage vs cutting time
  
  // Recommendations
  recommendations: string[];
  optimizationOpportunities: string[];
}

/**
 * Calculate pierce time and cost estimate
 */
export function calculatePierceEstimate(input: PierceEstimatorInput): PierceEstimatorResult {
  // Get time per pierce (in seconds)
  const timePerPierce = getPierceTime(
    input.material,
    input.thickness,
    input.strategy,
    input.quality
  );
  
  // Calculate total piercing time
  const totalPierceTimeSeconds = input.holeCount * timePerPierce;
  const totalPierceTime = totalPierceTimeSeconds / 60; // Convert to minutes
  const totalPierceTimeHours = totalPierceTime / 60; // Convert to hours
  
  // Calculate gas cost for piercing
  const gasPerPierce = PIERCE_COST_FACTORS.gasConsumptionPerPierce[input.gasType] || 0;
  const totalGasConsumption = input.holeCount * gasPerPierce;
  const piercingGasCost = totalGasConsumption * input.gasPricePerCubicMeter;
  
  // Calculate labor cost (time × rate)
  const piercingLaborCost = totalPierceTimeHours * input.hourlyCost;
  
  // Equipment cost (depreciation + consumables during piercing)
  // Piercing causes 50% more wear than cutting
  const equipmentCostPerHour = input.hourlyCost * 0.15; // Assume 15% of hourly cost is equipment
  const piercingEquipmentCost = totalPierceTimeHours * equipmentCostPerHour * 
    PIERCE_COST_FACTORS.nozzleWearMultiplier;
  
  // Total piercing cost
  const totalPiercingCost = piercingLaborCost + piercingGasCost + piercingEquipmentCost;
  const costPerPierce = totalPiercingCost / input.holeCount;
  
  // Determine pierce intensity
  let pierceIntensity: 'low' | 'moderate' | 'high' | 'very-high';
  if (input.holeCount < 10) {
    pierceIntensity = 'low';
  } else if (input.holeCount < 50) {
    pierceIntensity = 'moderate';
  } else if (input.holeCount < 200) {
    pierceIntensity = 'high';
  } else {
    pierceIntensity = 'very-high';
  }
  
  // Estimate as percentage of cutting time
  // Rule of thumb: 1 meter of cutting ≈ 3-10 seconds depending on material/thickness
  // For moderate complexity, assume piercing is 5-30% of cutting time
  let asPercentageOfCutting: number;
  if (input.holeCount < 10) asPercentageOfCutting = 5;
  else if (input.holeCount < 50) asPercentageOfCutting = 15;
  else if (input.holeCount < 200) asPercentageOfCutting = 30;
  else asPercentageOfCutting = 50;
  
  // Generate recommendations
  const recommendations: string[] = [];
  const optimizationOpportunities: string[] = [];
  
  // High pierce count warnings
  if (input.holeCount >= PIERCE_OPTIMIZATION_THRESHOLDS.veryHighPierceCountThreshold) {
    recommendations.push(
      `Very high pierce count (${input.holeCount}). Piercing time may exceed cutting time.`
    );
    optimizationOpportunities.push(
      'Consider reducing hole count in design if functionally acceptable'
    );
  } else if (input.holeCount >= PIERCE_OPTIMIZATION_THRESHOLDS.highPierceCountThreshold) {
    recommendations.push(
      'High pierce count detected. Piercing time will be significant portion of total job time.'
    );
  }
  
  // Strategy recommendations
  if (input.strategy === 'pulsed' || input.strategy === 'lowPower') {
    recommendations.push(
      'Using slower piercing strategy. Consider high-pressure piercing if equipment allows for faster throughput.'
    );
  }
  
  if (input.strategy === 'highPressure' && input.quality === 'max') {
    optimizationOpportunities.push(
      'Using max quality with high-pressure piercing. If acceptable for your application, compare a "typical" quality scenario in this model to see the trade-off between time and quality.'
    );
  }
  
  // Material-specific recommendations
  if (input.material === 'stainless_steel' && input.thickness > 10) {
    recommendations.push(
      'Thick stainless steel piercing can be relatively slow in practice. Ensure gas pressure, focus, and assist gas settings are appropriate for your machine, and validate times against your own production data.'
    );
  }
  
  if (input.material === 'copper_brass') {
    recommendations.push(
      'Copper/brass can require higher power and careful process settings for reliable piercing. Follow your machine supplier’s guidance on power and assist gas for the thicknesses you run, and confirm process windows with trials.'
    );
  }
  
  // Alternative method recommendations
  if (input.holeCount >= PIERCE_OPTIMIZATION_THRESHOLDS.punchingThreshold && input.thickness <= 3) {
    optimizationOpportunities.push(
      `With ${input.holeCount} holes in material ≤3mm, consider punching for faster production and lower cost.`
    );
  }
  
  if (input.holeCount >= PIERCE_OPTIMIZATION_THRESHOLDS.plasmaThreshold && input.thickness >= 8) {
    optimizationOpportunities.push(
      'For heavily perforated thick plates, plasma cutting may be more economical than laser.'
    );
  }
  
  // Gas cost optimization
  if (piercingGasCost > totalPiercingCost * 0.2) {
    optimizationOpportunities.push(
      'In this scenario, gas cost represents a sizable share of the modeled piercing cost. Consider reviewing gas pressure, assist gas type, and cut parameters to see if alternative setups remain acceptable while reducing consumption.'
    );
  }
  
  // Edge start recommendation
  if (input.strategy !== 'edgeStart' && input.holeCount > 100) {
    optimizationOpportunities.push(
      'With many holes, consider redesigning parts to allow edge-start cutting where possible (eliminates piercing).'
    );
  }
  
  // Cost per pierce analysis
  if (costPerPierce > 0.50) {
    recommendations.push(
      `Cost per pierce is $${costPerPierce.toFixed(2)}. With ${input.holeCount} holes, piercing represents significant cost.`
    );
  }
  
  // Batch recommendations
  if (pierceIntensity === 'very-high') {
    optimizationOpportunities.push(
      'Consider batching multiple parts on a single sheet to amortize piercing time across multiple pieces.'
    );
  }
  
  return {
    timePerPierce: parseFloat(timePerPierce.toFixed(3)),
    totalPierceTime: parseFloat(totalPierceTime.toFixed(2)),
    totalPierceTimeHours: parseFloat(totalPierceTimeHours.toFixed(3)),
    piercingLaborCost: parseFloat(piercingLaborCost.toFixed(2)),
    piercingGasCost: parseFloat(piercingGasCost.toFixed(2)),
    piercingEquipmentCost: parseFloat(piercingEquipmentCost.toFixed(2)),
    totalPiercingCost: parseFloat(totalPiercingCost.toFixed(2)),
    costPerPierce: parseFloat(costPerPierce.toFixed(3)),
    pierceIntensity,
    asPercentageOfCutting,
    recommendations,
    optimizationOpportunities,
  };
}

/**
 * Compare different piercing strategies
 */
export function comparePierceStrategies(
  material: 'mild_steel' | 'stainless_steel' | 'aluminum' | 'copper_brass',
  thickness: number,
  holeCount: number,
  quality: 'typical' | 'min' | 'max' = 'typical'
): Array<{
  strategy: string;
  timePerPierce: number;
  totalTime: number;
  timeDifference: number;
}> {
  const strategies: Array<'highPressure' | 'ramped' | 'lowPower' | 'pulsed'> = [
    'highPressure',
    'ramped',
    'lowPower',
    'pulsed',
  ];
  
  const results = strategies.map(strategy => {
    const timePerPierce = getPierceTime(material, thickness, strategy, quality);
    const totalTime = (timePerPierce * holeCount) / 60; // minutes
    
    return {
      strategy: formatStrategyName(strategy),
      timePerPierce: parseFloat(timePerPierce.toFixed(3)),
      totalTime: parseFloat(totalTime.toFixed(2)),
      timeDifference: 0, // Will calculate below
    };
  });
  
  // Calculate time difference from fastest
  const fastestTime = Math.min(...results.map(r => r.totalTime));
  results.forEach(r => {
    r.timeDifference = parseFloat(((r.totalTime - fastestTime) / fastestTime * 100).toFixed(1));
  });
  
  return results;
}

/**
 * Helper to format strategy names
 */
function formatStrategyName(strategy: string): string {
  const nameMap: Record<string, string> = {
    highPressure: 'High Pressure (Standard)',
    ramped: 'Ramped (Low Splatter)',
    lowPower: 'Low Power (Delicate)',
    pulsed: 'Pulsed (Thick Material)',
    edgeStart: 'Edge Start (No Pierce)',
  };
  
  return nameMap[strategy] || strategy;
}

/**
 * Calculate piercing time savings from design optimization
 */
export function calculateDesignOptimizationSavings(
  currentHoleCount: number,
  optimizedHoleCount: number,
  material: 'mild_steel' | 'stainless_steel' | 'aluminum' | 'copper_brass',
  thickness: number,
  hourlyCost: number
): {
  holeReduction: number;
  holeReductionPercent: number;
  timeSavingsMinutes: number;
  costSavings: number;
  annualSavings: number; // Assuming 100 parts/year
} {
  const timePerPierce = getPierceTime(material, thickness, 'highPressure', 'typical');
  
  const currentTotalTime = (currentHoleCount * timePerPierce) / 60; // minutes
  const optimizedTotalTime = (optimizedHoleCount * timePerPierce) / 60;
  const timeSavingsMinutes = currentTotalTime - optimizedTotalTime;
  
  const costSavings = (timeSavingsMinutes / 60) * hourlyCost;
  const annualSavings = costSavings * 100; // Assuming 100 parts per year
  
  const holeReduction = currentHoleCount - optimizedHoleCount;
  const holeReductionPercent = (holeReduction / currentHoleCount) * 100;
  
  return {
    holeReduction,
    holeReductionPercent: parseFloat(holeReductionPercent.toFixed(1)),
    timeSavingsMinutes: parseFloat(timeSavingsMinutes.toFixed(2)),
    costSavings: parseFloat(costSavings.toFixed(2)),
    annualSavings: parseFloat(annualSavings.toFixed(0)),
  };
}

