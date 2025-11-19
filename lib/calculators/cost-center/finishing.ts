/**
 * Finishing Time & Cost Estimator
 * 
 * Calculates post-cut finishing time and costs.
 * Pure functions built on shared finishing time and cost constants.
 */

import type { FinishingGuideInput } from '@/lib/validations/cost-center';
import {
  estimateFinishingTime,
  EDGE_QUALITY_LEVELS,
  ADDITIONAL_FINISHING,
  CUT_QUALITY_FINISHING_RELATIONSHIP,
  // FINISHING_LABOR_RATES, // Reserved for future use
} from '@/lib/calculators/constants/finishing';

export interface FinishingGuideResult {
  // Time breakdown (minutes)
  deburrTimeMinutes: number;
  handlingTimeMinutes: number;
  additionalOpsTime: number;
  totalTimeMinutes: number;
  totalTimeHours: number;
  
  // Cost breakdown
  laborCost: number;
  equipmentCost: number;
  consumablesCost: number;
  totalCost: number;
  
  // Analysis
  timeBreakdown: Array<{ operation: string; time: number; percentage: number }>;
  costPerMeter: number;
  qualityLevel: string;
  
  // Recommendations
  recommendations: string[];
  costSavingOpportunities: string[];
}

/**
 * Calculate finishing time and cost
 */
export function calculateFinishingGuide(input: FinishingGuideInput): FinishingGuideResult {
  // Get base deburring and handling time
  const baseEstimate = estimateFinishingTime(
    input.edgeLengthMeters,
    input.material,
    input.thickness,
    input.method,
    input.qualityLevel,
    input.partSize
  );
  
  // Apply cut quality adjustment
  const cutQualityData = CUT_QUALITY_FINISHING_RELATIONSHIP[input.cutQuality];
  const cutQualityMultiplier = cutQualityData.finishingReduction;
  
  const adjustedDeburrTime = baseEstimate.deburrTimeMinutes * cutQualityMultiplier;
  
  // Calculate additional operations time
  let additionalOpsTime = 0;
  
  input.additionalOps.forEach(op => {
    switch (op) {
      case 'oxideRemoval':
        additionalOpsTime += ADDITIONAL_FINISHING.oxideRemoval.mechanical.typical;
        break;
      case 'cleaning':
        additionalOpsTime += ADDITIONAL_FINISHING.cleaning.solventWipe.typical;
        break;
      case 'chamfering':
        const chamferTime = ADDITIONAL_FINISHING.chamfering[input.method]?.typical || 
          ADDITIONAL_FINISHING.chamfering.powered.typical;
        additionalOpsTime += chamferTime * input.edgeLengthMeters;
        break;
      case 'radiusing':
        const radiusTime = ADDITIONAL_FINISHING.radiusing[input.method]?.typical || 
          ADDITIONAL_FINISHING.radiusing.powered.typical;
        additionalOpsTime += radiusTime * input.edgeLengthMeters;
        break;
      case 'inspection':
        additionalOpsTime += 5; // Standard dimensional inspection
        break;
    }
  });
  
  // Total time
  const totalTimeMinutes = adjustedDeburrTime + baseEstimate.handlingTimeMinutes + additionalOpsTime;
  const totalTimeHours = totalTimeMinutes / 60;
  
  // Calculate costs
  const laborRate = input.laborRate;
  const laborCost = (totalTimeMinutes / 60) * laborRate;
  
  // Equipment cost (based on method)
  const equipmentCostPerHour = input.method === 'automated' ? 15 : (input.method === 'powered' ? 5 : 2);
  const equipmentCost = totalTimeHours * equipmentCostPerHour;
  
  // Consumables cost (per meter of edge)
  const consumablesCostPerMeter = input.method === 'automated' ? 0.15 : (input.method === 'powered' ? 0.20 : 0.10);
  const consumablesCost = input.edgeLengthMeters * consumablesCostPerMeter;
  
  // Total cost
  const totalCost = laborCost + equipmentCost + consumablesCost;
  
  // Cost per meter
  const costPerMeter = totalCost / input.edgeLengthMeters;
  
  // Time breakdown
  const timeBreakdown = [
    {
      operation: 'Deburring',
      time: parseFloat(adjustedDeburrTime.toFixed(2)),
      percentage: (adjustedDeburrTime / totalTimeMinutes) * 100,
    },
    {
      operation: 'Handling & Setup',
      time: parseFloat(baseEstimate.handlingTimeMinutes.toFixed(2)),
      percentage: (baseEstimate.handlingTimeMinutes / totalTimeMinutes) * 100,
    },
  ];
  
  if (additionalOpsTime > 0) {
    timeBreakdown.push({
      operation: 'Additional Operations',
      time: parseFloat(additionalOpsTime.toFixed(2)),
      percentage: (additionalOpsTime / totalTimeMinutes) * 100,
    });
  }
  
  // Generate recommendations
  const recommendations: string[] = [];
  const costSavingOpportunities: string[] = [];
  
  // Cut quality recommendations
  if (input.cutQuality === 'poorCut' || input.cutQuality === 'fairCut') {
    recommendations.push(
      'Cut quality is affecting finishing time. Optimize laser cutting parameters to reduce dross and improve edge quality.'
    );
    costSavingOpportunities.push(
      'Improving cut quality from "fair" to "good" can meaningfully reduce finishing time; use this model with your own parameters to compare scenarios.'
    );
  }
  
  // Method recommendations
  if (input.method === 'manual' && input.edgeLengthMeters > 5) {
    costSavingOpportunities.push(
      'Consider powered deburring tools for longer edges to reduce manual touch time; compare modeled manual and powered scenarios with your own data.'
    );
  }
  
  if (input.method === 'powered' && totalTimeMinutes > 60) {
    costSavingOpportunities.push(
      'High modeled finishing volume detected. Automated deburring equipment may be worth evaluating; use the ROI helper here with your volumes, labor rates, and equipment cost to compare options.'
    );
  }
  
  // Quality level recommendations
  const qualityData = EDGE_QUALITY_LEVELS[input.qualityLevel];
  if (input.qualityLevel === 'high' || input.qualityLevel === 'mirror') {
    const multiplier = (qualityData as any).finishingTimeMultiplier || 2;
    recommendations.push(
      `High-quality finish requires ${multiplier}x baseline time. Ensure customer requirements justify the cost.`
    );
  }
  
  if (input.qualityLevel === 'ascut' && input.additionalOps.length > 0) {
    recommendations.push(
      'Additional operations selected with "as-cut" quality level. Consider if finishing is actually needed.'
    );
  }
  
  // Material-specific recommendations
  if (input.material === 'stainless_steel' && (input.qualityLevel === 'high' || input.qualityLevel === 'medium')) {
    recommendations.push(
      'Stainless steel finishing: Consider passivation for corrosion resistance in addition to mechanical finishing.'
    );
  }
  
  if (input.material === 'aluminum' && input.qualityLevel !== 'ascut') {
    recommendations.push(
      'Aluminum is softer and often easier to finish than steel. You may find that measured finishing times are lower than conservative estimates used here; adjust your assumptions accordingly.'
    );
  }
  
  // Cost per meter analysis
  if (costPerMeter > 10) {
    recommendations.push(
      `Finishing cost is $${costPerMeter.toFixed(2)} per meter. Review if edge requirements can be relaxed or process optimized.`
    );
  }
  
  // Time as percentage of cutting
  if (totalTimeMinutes > 30) {
    recommendations.push(
      'Finishing time is significant. Consider it early in the quoting process to ensure accurate pricing.'
    );
  }
  
  // Additional ops recommendations
  if (input.additionalOps.includes('chamfering') && input.additionalOps.includes('radiusing')) {
    recommendations.push(
      'Both chamfering and radiusing selected. Clarify edge requirements with customer as typically only one is needed.'
    );
  }
  
  // General optimization
  costSavingOpportunities.push(
    'Use nitrogen assist gas during cutting for cleaner edges requiring less finishing'
  );
  
  if (input.qualityLevel !== 'ascut') {
    costSavingOpportunities.push(
      'Train operators on efficient finishing techniques to improve consistency and reduce time'
    );
  }
  
  return {
    deburrTimeMinutes: parseFloat(adjustedDeburrTime.toFixed(2)),
    handlingTimeMinutes: parseFloat(baseEstimate.handlingTimeMinutes.toFixed(2)),
    additionalOpsTime: parseFloat(additionalOpsTime.toFixed(2)),
    totalTimeMinutes: parseFloat(totalTimeMinutes.toFixed(2)),
    totalTimeHours: parseFloat(totalTimeHours.toFixed(3)),
    laborCost: parseFloat(laborCost.toFixed(2)),
    equipmentCost: parseFloat(equipmentCost.toFixed(2)),
    consumablesCost: parseFloat(consumablesCost.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    timeBreakdown,
    costPerMeter: parseFloat(costPerMeter.toFixed(2)),
    qualityLevel: qualityData.description,
    recommendations,
    costSavingOpportunities,
  };
}

/**
 * Compare finishing methods
 */
export function compareFinishingMethods(
  edgeLengthMeters: number,
  material: 'mild_steel' | 'stainless_steel' | 'aluminum',
  thickness: number,
  qualityLevel: keyof typeof EDGE_QUALITY_LEVELS,
  partSize: 'small' | 'medium' | 'large' | 'xlarge',
  laborRate: number
): Array<{
  method: string;
  timeMinutes: number;
  cost: number;
  costDifference: number;
}> {
  const methods: Array<'manual' | 'powered' | 'automated'> = ['manual', 'powered', 'automated'];
  
  const results = methods.map(method => {
    const estimate = estimateFinishingTime(edgeLengthMeters, material, thickness, method, qualityLevel, partSize);
    const cost = (estimate.totalTimeMinutes / 60) * laborRate;
    
    return {
      method: formatMethodName(method),
      timeMinutes: parseFloat(estimate.totalTimeMinutes.toFixed(2)),
      cost: parseFloat(cost.toFixed(2)),
      costDifference: 0, // Will calculate below
    };
  });
  
  // Calculate cost difference from cheapest
  const lowestCost = Math.min(...results.map(r => r.cost));
  results.forEach(r => {
    r.costDifference = parseFloat(((r.cost - lowestCost) / lowestCost * 100).toFixed(1));
  });
  
  return results;
}

/**
 * Helper to format method names
 */
function formatMethodName(method: string): string {
  const nameMap: Record<string, string> = {
    manual: 'Manual (Hand Tools)',
    powered: 'Powered (Grinder/Sander)',
    automated: 'Automated (Machine)',
  };
  
  return nameMap[method] || method;
}

/**
 * Calculate ROI for automated finishing equipment
 */
export function calculateFinishingEquipmentROI(
  currentMethod: 'manual' | 'powered',
  monthlyEdgeMeters: number,
  material: 'mild_steel' | 'stainless_steel' | 'aluminum',
  thickness: number,
  laborRate: number,
  equipmentCost: number = 25000
): {
  currentMonthlyCost: number;
  automatedMonthlyCost: number;
  monthlySavings: number;
  paybackMonths: number;
  annualSavings: number;
  roiPercent: number;
} {
  // Estimate time for current method (per meter, typical part size)
  const currentEstimate = estimateFinishingTime(1, material, thickness, currentMethod, 'light', 'medium');
  const currentTimePerMeter = currentEstimate.totalTimeMinutes;
  const currentMonthlyCost = (monthlyEdgeMeters * currentTimePerMeter / 60) * laborRate;
  
  // Estimate time for automated method
  const automatedEstimate = estimateFinishingTime(1, material, thickness, 'automated', 'light', 'medium');
  const automatedTimePerMeter = automatedEstimate.totalTimeMinutes;
  const automatedLaborCost = (monthlyEdgeMeters * automatedTimePerMeter / 60) * laborRate;
  const automatedEquipmentCost = (monthlyEdgeMeters * automatedTimePerMeter / 60) * 15; // $15/hr equipment cost
  const automatedMonthlyCost = automatedLaborCost + automatedEquipmentCost;
  
  const monthlySavings = currentMonthlyCost - automatedMonthlyCost;
  const paybackMonths = equipmentCost / monthlySavings;
  const annualSavings = monthlySavings * 12;
  const roiPercent = (annualSavings / equipmentCost) * 100;
  
  return {
    currentMonthlyCost: parseFloat(currentMonthlyCost.toFixed(0)),
    automatedMonthlyCost: parseFloat(automatedMonthlyCost.toFixed(0)),
    monthlySavings: parseFloat(monthlySavings.toFixed(0)),
    paybackMonths: parseFloat(paybackMonths.toFixed(1)),
    annualSavings: parseFloat(annualSavings.toFixed(0)),
    roiPercent: parseFloat(roiPercent.toFixed(1)),
  };
}

