/**
 * Hourly Rate Calculator
 * 
 * Calculates total shop hourly rate broken down by cost components.
 * All calculations are pure functions with no side effects.
 */

import type { HourlyRateInput } from '@/lib/validations/cost-center';

export interface HourlyRateResult {
  // Individual cost components (per hour)
  depreciation: number;
  labor: number;
  energy: number;
  maintenance: number;
  consumables: number;
  facility: number;
  overhead: number;
  gas: number;
  
  // Totals
  totalHourlyCost: number;
  
  // Percentages
  depreciationPercent: number;
  laborPercent: number;
  energyPercent: number;
  maintenancePercent: number;
  consumablesPercent: number;
  facilityPercent: number;
  overheadPercent: number;
  gasPercent: number;
  
  // Analysis
  costBreakdown: Array<{ category: string; cost: number; percentage: number }>;
  
  // Recommendations
  alerts: string[];
  recommendations: string[];
}

/**
 * Calculate hourly shop rate
 */
export function calculateHourlyRate(input: HourlyRateInput): HourlyRateResult {
  const hoursPerMonth = input.annualWorkingHours / 12;
  
  // 1. Equipment depreciation per hour
  const depreciation = input.equipmentCost / (input.equipmentLifespan * input.annualWorkingHours);
  
  // 2. Labor cost per hour (with benefits)
  const labor = input.operatorRate * input.benefitsMultiplier;
  
  // 3. Energy cost per hour
  const energy = input.totalPowerKw * input.electricityRate;
  
  // 4. Maintenance cost per hour
  const annualMaintenance = input.equipmentCost * (input.annualMaintenancePercent / 100);
  const maintenance = annualMaintenance / input.annualWorkingHours;
  
  // 5. Consumables per hour (nozzles, lenses, windows)
  const consumables = input.consumablesPerHour;
  
  // 6. Facility cost per hour
  const facilityMonthly = input.facilityRentMonthly + input.utilitiesMonthly + input.insuranceMonthly;
  const facility = facilityMonthly / hoursPerMonth;
  
  // 7. Overhead per hour (office, admin, sales)
  const overhead = input.overheadMonthly / hoursPerMonth;
  
  // 8. Gas cost per hour
  const gas = input.gasConsumptionPerHour * input.gasPricePerCubicMeter;
  
  // Total hourly cost
  const totalHourlyCost = depreciation + labor + energy + maintenance + consumables + facility + overhead + gas;
  
  // Calculate percentages
  const depreciationPercent = (depreciation / totalHourlyCost) * 100;
  const laborPercent = (labor / totalHourlyCost) * 100;
  const energyPercent = (energy / totalHourlyCost) * 100;
  const maintenancePercent = (maintenance / totalHourlyCost) * 100;
  const consumablesPercent = (consumables / totalHourlyCost) * 100;
  const facilityPercent = (facility / totalHourlyCost) * 100;
  const overheadPercent = (overhead / totalHourlyCost) * 100;
  const gasPercent = (gas / totalHourlyCost) * 100;
  
  // Cost breakdown array (sorted by cost)
  const costBreakdown = [
    { category: 'Labor', cost: labor, percentage: laborPercent },
    { category: 'Overhead', cost: overhead, percentage: overheadPercent },
    { category: 'Facility', cost: facility, percentage: facilityPercent },
    { category: 'Depreciation', cost: depreciation, percentage: depreciationPercent },
    { category: 'Gas', cost: gas, percentage: gasPercent },
    { category: 'Maintenance', cost: maintenance, percentage: maintenancePercent },
    { category: 'Consumables', cost: consumables, percentage: consumablesPercent },
    { category: 'Energy', cost: energy, percentage: energyPercent },
  ].sort((a, b) => b.cost - a.cost);
  
  // Analysis and recommendations
  const alerts: string[] = [];
  const recommendations: string[] = [];
  
  // Labor cost analysis
  if (laborPercent > 50) {
    alerts.push('Labor cost is more than 50% of the modeled hourly rate in this scenario.');
    recommendations.push('Consider automation or process optimization to reduce labor dependency');
  } else if (laborPercent < 25) {
    alerts.push('Labor cost is less than 25% of the modeled hourly rate in this scenario; check that all relevant labor and overhead items are included.');
  }
  
  // Energy cost analysis
  if (energyPercent > 10) {
    alerts.push('Energy cost is more than 10% of the modeled hourly rate in this scenario.');
    recommendations.push('Review machine efficiency and consider energy-saving measures');
  }
  
  // Depreciation analysis
  if (depreciationPercent < 8) {
    alerts.push('Equipment depreciation is less than 8% of the modeled hourly rate; review your utilization and lifespan assumptions.');
    recommendations.push('Consider increasing machine utilization to improve ROI');
  } else if (depreciationPercent > 20) {
    alerts.push('Equipment depreciation is more than 20% of the modeled hourly rate; review whether your lifespan assumption is too short for your use case.');
  }
  
  // Overhead analysis
  if (overheadPercent > 25) {
    alerts.push('Overhead costs are more than 25% of the modeled hourly rate in this scenario.');
    recommendations.push('Review administrative costs and look for efficiency improvements');
  }
  
  // Facility cost analysis
  if (facilityPercent > 20) {
    alerts.push('Facility costs are more than 20% of the modeled hourly rate in this scenario.');
    recommendations.push('Consider optimizing space utilization or negotiating rent');
  }
  
  // Gas cost analysis
  if (gasPercent > 8 && input.gasType === 'nitrogen') {
    recommendations.push('Nitrogen costs are high. Consider on-site nitrogen generator if usage is consistent');
  }
  
  // Total rate analysis
  if (totalHourlyCost < 40) {
    alerts.push('Total hourly rate is below the lower band used in this tool for context; double-check that all cost components and realistic utilization have been included.');
  } else if (totalHourlyCost > 100) {
    alerts.push('Total hourly rate is toward the high end of the bands used in this tool; ensure your pricing and value proposition reflect this level.');
  }
  
  // Utilization recommendation
  if (input.annualWorkingHours < 1500) {
    recommendations.push('Annual working hours are low. Consider strategies to increase machine utilization');
  }
  
  return {
    depreciation: parseFloat(depreciation.toFixed(2)),
    labor: parseFloat(labor.toFixed(2)),
    energy: parseFloat(energy.toFixed(2)),
    maintenance: parseFloat(maintenance.toFixed(2)),
    consumables: parseFloat(consumables.toFixed(2)),
    facility: parseFloat(facility.toFixed(2)),
    overhead: parseFloat(overhead.toFixed(2)),
    gas: parseFloat(gas.toFixed(2)),
    totalHourlyCost: parseFloat(totalHourlyCost.toFixed(2)),
    depreciationPercent: parseFloat(depreciationPercent.toFixed(1)),
    laborPercent: parseFloat(laborPercent.toFixed(1)),
    energyPercent: parseFloat(energyPercent.toFixed(1)),
    maintenancePercent: parseFloat(maintenancePercent.toFixed(1)),
    consumablesPercent: parseFloat(consumablesPercent.toFixed(1)),
    facilityPercent: parseFloat(facilityPercent.toFixed(1)),
    overheadPercent: parseFloat(overheadPercent.toFixed(1)),
    gasPercent: parseFloat(gasPercent.toFixed(1)),
    costBreakdown,
    alerts,
    recommendations,
  };
}

/**
 * Calculate break-even utilization
 * Returns minimum hours per year needed to cover fixed costs
 */
export function calculateBreakEvenUtilization(
  equipmentCost: number,
  lifespanYears: number,
  fixedCostsAnnual: number,
  variableCostPerHour: number,
  targetHourlyRate: number
): {
  breakEvenHours: number;
  breakEvenPercentage: number;
  recommendedMinimumHours: number;
} {
  const annualDepreciation = equipmentCost / lifespanYears;
  const totalFixedCosts = annualDepreciation + fixedCostsAnnual;
  
  // Break-even: (Fixed + Variable*Hours) / Hours = Rate
  // Fixed + Variable*Hours = Rate*Hours
  // Fixed = Hours*(Rate - Variable)
  // Hours = Fixed / (Rate - Variable)
  const breakEvenHours = totalFixedCosts / (targetHourlyRate - variableCostPerHour);
  const breakEvenPercentage = (breakEvenHours / 2000) * 100; // As % of standard 2000 hrs
  
  // Recommend 20% above break-even
  const recommendedMinimumHours = breakEvenHours * 1.2;
  
  return {
    breakEvenHours: Math.round(breakEvenHours),
    breakEvenPercentage: parseFloat(breakEvenPercentage.toFixed(1)),
    recommendedMinimumHours: Math.round(recommendedMinimumHours),
  };
}

/**
 * Compare shop rate to industry benchmarks
 */
export function compareToIndustryBenchmarks(totalHourlyCost: number): {
  position: 'below' | 'average' | 'above' | 'premium';
  description: string;
  competitiveAdvantage: string;
} {
  if (totalHourlyCost < 40) {
    return {
      position: 'below',
      description: 'Your modeled hourly rate is below the lower contextual band used in this tool.',
      competitiveAdvantage: 'Strong cost advantage, but ensure quality and sustainability',
    };
  } else if (totalHourlyCost <= 70) {
    return {
      position: 'average',
      description: 'Your modeled hourly rate falls within the mid-range band used here for context.',
      competitiveAdvantage: 'Competitive positioning, focus on service differentiation',
    };
  } else if (totalHourlyCost <= 100) {
    return {
      position: 'above',
      description: 'Your modeled hourly rate is above that mid-range band.',
      competitiveAdvantage: 'Premium positioning, emphasize quality and capabilities',
    };
  } else {
    return {
      position: 'premium',
      description: 'Your modeled hourly rate is at the high end of the contextual bands used here.',
      competitiveAdvantage: 'High-end positioning, must justify with exceptional quality/service',
    };
  }
}

