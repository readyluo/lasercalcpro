import type { EnergyInput } from '../validations/energy';

export interface EnergyResult {
  // Power consumption
  averagePowerConsumption: number; // kW
  totalSystemPower: number; // kW including auxiliaries
  effectiveLoad: number; // kW

  // Energy usage
  dailyEnergyConsumption: number; // kWh
  weeklyEnergyConsumption: number; // kWh
  monthlyEnergyConsumption: number; // kWh
  annualEnergyConsumption: number; // kWh

  // Costs
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;

  // Cost breakdown
  standardRateCost: number;
  peakRateCost: number;
  auxiliaryCost: number;

  // Carbon footprint
  dailyCO2: number; // kg
  monthlyCO2: number; // kg
  annualCO2: number; // tonnes
  carbonCostPerYear: number; // at $50/tonne

  // Efficiency metrics
  powerEfficiency: number; // percentage
  energyIntensity: number; // kWh per operating hour
  costPerOperatingHour: number;

  // Recommendations
  recommendations: {
    title: string;
    description: string;
    potentialSavings: number;
    priority: 'high' | 'medium' | 'low';
  }[];

  // Time-based breakdown
  hourlyBreakdown: {
    hour: number;
    consumption: number; // kWh
    cost: number;
    isPeak: boolean;
  }[];
}

/**
 * Calculate energy costs and carbon footprint
 */
export function calculateEnergy(input: EnergyInput): EnergyResult {
  // 1. Calculate effective power consumption
  const effectiveLoad = input.ratedPower * (input.averageLoad / 100);
  const totalSystemPower = effectiveLoad + input.coolingSystemPower + input.extractionSystemPower;
  const auxiliaryPower = input.coolingSystemPower + input.extractionSystemPower;

  // 2. Calculate time-based usage
  const annualOperatingHours = 
    input.dailyOperatingHours * 
    input.operatingDaysPerWeek * 
    input.weeksPerYear;

  const dailyEnergyConsumption = totalSystemPower * input.dailyOperatingHours;
  const weeklyEnergyConsumption = dailyEnergyConsumption * input.operatingDaysPerWeek;
  const monthlyEnergyConsumption = (annualOperatingHours / 12) * totalSystemPower;
  const annualEnergyConsumption = annualOperatingHours * totalSystemPower;

  // 3. Calculate costs with peak/off-peak rates
  const peakRate = input.electricityRate * (1 + input.peakRatePremium / 100);
  const peakHours = input.dailyOperatingHours * (input.peakHoursPercentage / 100);
  const offPeakHours = input.dailyOperatingHours - peakHours;

  const dailyPeakCost = totalSystemPower * peakHours * peakRate;
  const dailyOffPeakCost = totalSystemPower * offPeakHours * input.electricityRate;
  const dailyCost = dailyPeakCost + dailyOffPeakCost;

  const weeklyCost = dailyCost * input.operatingDaysPerWeek;
  const monthlyCost = (annualOperatingHours / 12) * 
    ((totalSystemPower * input.electricityRate) + 
    (totalSystemPower * peakRate * input.peakHoursPercentage / 100));
  const annualCost = monthlyCost * 12;

  // Cost breakdown
  const standardRateCost = annualEnergyConsumption * input.electricityRate * 
    (1 - input.peakHoursPercentage / 100);
  const peakRateCost = annualEnergyConsumption * peakRate * 
    (input.peakHoursPercentage / 100);
  const auxiliaryCost = auxiliaryPower * annualOperatingHours * input.electricityRate;

  // 4. Calculate carbon footprint
  const dailyCO2 = (dailyEnergyConsumption * input.gridCarbonIntensity) / 1000; // kg
  const monthlyCO2 = (monthlyEnergyConsumption * input.gridCarbonIntensity) / 1000; // kg
  const annualCO2 = (annualEnergyConsumption * input.gridCarbonIntensity) / 1000000; // tonnes
  const carbonCostPerYear = annualCO2 * 50; // $50 per tonne carbon price

  // 5. Calculate efficiency metrics
  const powerEfficiency = (effectiveLoad / input.ratedPower) * 100;
  const energyIntensity = totalSystemPower;
  const costPerOperatingHour = annualCost / annualOperatingHours;

  // 6. Generate hourly breakdown (24 hours)
  const hourlyBreakdown = Array.from({ length: 24 }, (_, hour) => {
    const isOperating = hour >= 8 && hour < 8 + input.dailyOperatingHours;
    const isPeak = hour >= 9 && hour < 17; // 9 AM to 5 PM
    const rate = isPeak ? peakRate : input.electricityRate;
    const consumption = isOperating ? totalSystemPower : 0;
    const cost = consumption * rate;

    return {
      hour,
      consumption: parseFloat(consumption.toFixed(2)),
      cost: parseFloat(cost.toFixed(2)),
      isPeak: isPeak && isOperating,
    };
  });

  // 7. Generate recommendations
  const recommendations = generateRecommendations(input, {
    annualCost,
    annualEnergyConsumption,
    powerEfficiency,
    peakRateCost,
    auxiliaryCost,
  });

  return {
    // Power
    averagePowerConsumption: parseFloat(effectiveLoad.toFixed(2)),
    totalSystemPower: parseFloat(totalSystemPower.toFixed(2)),
    effectiveLoad: parseFloat(effectiveLoad.toFixed(2)),

    // Energy
    dailyEnergyConsumption: parseFloat(dailyEnergyConsumption.toFixed(2)),
    weeklyEnergyConsumption: parseFloat(weeklyEnergyConsumption.toFixed(2)),
    monthlyEnergyConsumption: parseFloat(monthlyEnergyConsumption.toFixed(2)),
    annualEnergyConsumption: parseFloat(annualEnergyConsumption.toFixed(2)),

    // Costs
    dailyCost: parseFloat(dailyCost.toFixed(2)),
    weeklyCost: parseFloat(weeklyCost.toFixed(2)),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
    annualCost: parseFloat(annualCost.toFixed(2)),

    // Cost breakdown
    standardRateCost: parseFloat(standardRateCost.toFixed(2)),
    peakRateCost: parseFloat(peakRateCost.toFixed(2)),
    auxiliaryCost: parseFloat(auxiliaryCost.toFixed(2)),

    // Carbon
    dailyCO2: parseFloat(dailyCO2.toFixed(2)),
    monthlyCO2: parseFloat(monthlyCO2.toFixed(2)),
    annualCO2: parseFloat(annualCO2.toFixed(2)),
    carbonCostPerYear: parseFloat(carbonCostPerYear.toFixed(2)),

    // Efficiency
    powerEfficiency: parseFloat(powerEfficiency.toFixed(1)),
    energyIntensity: parseFloat(energyIntensity.toFixed(2)),
    costPerOperatingHour: parseFloat(costPerOperatingHour.toFixed(2)),

    // Recommendations
    recommendations,
    hourlyBreakdown,
  };
}

/**
 * Generate energy-saving recommendations
 */
function generateRecommendations(
  input: EnergyInput,
  metrics: {
    annualCost: number;
    annualEnergyConsumption: number;
    powerEfficiency: number;
    peakRateCost: number;
    auxiliaryCost: number;
  }
): EnergyResult['recommendations'] {
  const recommendations: EnergyResult['recommendations'] = [];

  // 1. Peak demand management
  if (input.peakHoursPercentage > 30) {
    const savings = metrics.peakRateCost * 0.5;
    recommendations.push({
      title: 'Shift Operations to Off-Peak Hours',
      description: `${input.peakHoursPercentage}% of your operations occur during peak hours. Shifting 50% of production to off-peak hours could reduce your electricity costs significantly.`,
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'high',
    });
  }

  // 2. Equipment efficiency
  if (metrics.powerEfficiency < 70) {
    const savings = metrics.annualCost * 0.15;
    recommendations.push({
      title: 'Optimize Equipment Load Factor',
      description: `Your equipment is operating at ${metrics.powerEfficiency.toFixed(1)}% efficiency. Optimizing batch sizes and reducing idle time could improve efficiency by 15%.`,
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'high',
    });
  }

  // 3. Auxiliary systems
  if (input.coolingSystemPower + input.extractionSystemPower > input.ratedPower * 0.3) {
    const savings = metrics.auxiliaryCost * 0.25;
    recommendations.push({
      title: 'Upgrade Auxiliary Systems',
      description: `Your auxiliary systems consume ${((input.coolingSystemPower + input.extractionSystemPower) / input.ratedPower * 100).toFixed(0)}% of main equipment power. Consider more efficient cooling and extraction systems.`,
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'medium',
    });
  }

  // 4. Solar/renewable energy
  if (metrics.annualEnergyConsumption > 20000) {
    const savings = metrics.annualCost * 0.3;
    recommendations.push({
      title: 'Consider Solar Panel Installation',
      description: `With annual consumption of ${metrics.annualEnergyConsumption.toFixed(0)} kWh, a solar installation could offset 30-50% of your electricity costs within 5-7 years.`,
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'medium',
    });
  }

  // 5. Power factor correction
  const savings = metrics.annualCost * 0.08;
  recommendations.push({
    title: 'Install Power Factor Correction',
    description: 'Poor power factor can result in utility penalties and wasted energy. Power factor correction equipment typically provides 5-10% energy savings.',
    potentialSavings: parseFloat(savings.toFixed(2)),
    priority: 'low',
  });

  // 6. Equipment maintenance
  if (input.averageLoad > 85) {
    const savings = metrics.annualCost * 0.12;
    recommendations.push({
      title: 'Implement Preventive Maintenance Schedule',
      description: 'High load factors can lead to increased wear. Regular maintenance ensures optimal efficiency and prevents costly breakdowns.',
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'medium',
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Calculate potential savings from implementing recommendations
 */
export function calculateTotalPotentialSavings(recommendations: EnergyResult['recommendations']): number {
  return recommendations.reduce((total, rec) => total + rec.potentialSavings, 0);
}









