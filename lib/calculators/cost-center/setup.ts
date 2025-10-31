/**
 * Setup Time Estimator
 * 
 * Estimates setup and changeover time for laser cutting jobs.
 * Pure functions with industry-standard time components.
 */

import type { SetupEstimatorInput } from '@/lib/validations/cost-center';
import { 
  SETUP_TIME_COMPONENTS, 
  SETUP_REDUCTION_FACTORS,
  calculateSetupTime as calcSetupTimeUtil,
  calculateSetupCostPerPart,
} from '@/lib/calculators/constants/setup';

export interface SetupEstimatorResult {
  // Time breakdown (minutes)
  programmingTime: number;
  loadingTime: number;
  machinePrepTime: number;
  inspectionTime: number;
  fixtureTime: number;
  baseTotal: number;
  adjustedTotal: number;
  
  // Batch distribution
  setupTimePerPart: number;
  setupCostPerPart: number;
  setupPercentage: number;
  
  // Cost analysis
  totalSetupCost: number;
  
  // Comparisons
  batchComparison: Array<{
    quantity: number;
    timePerPart: number;
    costPerPart: number;
    totalTime: number;
  }>;
  
  // Recommendations
  recommendations: string[];
  efficiency: 'excellent' | 'good' | 'average' | 'needs-improvement';
}

/**
 * Calculate setup time estimate
 */
export function calculateSetupEstimate(input: SetupEstimatorInput): SetupEstimatorResult {
  // Get detailed time breakdown
  const timeBreakdown = calcSetupTimeUtil(
    input.programmingComplexity,
    input.materialSize,
    input.machineChange,
    input.inspectionLevel,
    input.fixtureComplexity,
    input.operatorExperience,
    input.jobFamiliarity
  );
  
  // Calculate per-part distribution
  const perPartDistribution = calculateSetupCostPerPart(
    timeBreakdown.adjustedTotal,
    input.batchQuantity,
    input.setupLaborRate
  );
  
  // Calculate total setup cost
  const totalSetupCost = (timeBreakdown.adjustedTotal / 60) * input.setupLaborRate;
  
  // Generate batch comparison (1, 5, 10, 25, 50, 100)
  const batchSizes = [1, 5, 10, 25, 50, 100];
  const batchComparison = batchSizes.map(qty => {
    const dist = calculateSetupCostPerPart(timeBreakdown.adjustedTotal, qty, input.setupLaborRate);
    return {
      quantity: qty,
      timePerPart: parseFloat(dist.setupTimePerPart.toFixed(2)),
      costPerPart: parseFloat(dist.setupCostPerPart.toFixed(2)),
      totalTime: parseFloat(timeBreakdown.adjustedTotal.toFixed(2)),
    };
  });
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  // Setup time analysis
  if (timeBreakdown.adjustedTotal > 60) {
    recommendations.push(
      'Setup time exceeds 1 hour. Consider pre-staging materials and programs to reduce setup time.'
    );
  }
  
  // Programming time analysis
  if (timeBreakdown.programmingTime > 30 && input.jobFamiliarity === 'regular') {
    recommendations.push(
      'Programming time is high for a regular job. Consider creating saved programs for repeat work.'
    );
  }
  
  // Batch size analysis
  if (input.batchQuantity < 5 && perPartDistribution.setupCostPerPart > 20) {
    recommendations.push(
      `Setup cost per part is $${perPartDistribution.setupCostPerPart.toFixed(2)}. Consider batching orders to reduce per-part setup costs.`
    );
  }
  
  // Operator experience
  if (input.operatorExperience === 'novice' || input.operatorExperience === 'intermediate') {
    recommendations.push(
      'Training operators on efficient setup procedures can reduce setup time by 20-40%.'
    );
  }
  
  // Job familiarity
  if (input.jobFamiliarity === 'firstTime' && input.programmingComplexity !== 'simple') {
    recommendations.push(
      'First-time setup for complex jobs. Budget extra time for troubleshooting and parameter optimization.'
    );
  }
  
  // Machine change analysis
  if (input.machineChange === 'fullSetup' || input.machineChange === 'gasChange') {
    recommendations.push(
      'Full setup changeover required. Group similar jobs together to minimize changeover frequency.'
    );
  }
  
  // Batch optimization
  if (input.batchQuantity === 1) {
    const batch10 = batchComparison.find(b => b.quantity === 10);
    if (batch10) {
      const savings = ((perPartDistribution.setupCostPerPart - batch10.costPerPart) / perPartDistribution.setupCostPerPart) * 100;
      recommendations.push(
        `Single-part production. Batching 10 parts would reduce setup cost per part by ${savings.toFixed(0)}%.`
      );
    }
  }
  
  // Determine efficiency level
  let efficiency: 'excellent' | 'good' | 'average' | 'needs-improvement';
  if (timeBreakdown.adjustedTotal <= 15) {
    efficiency = 'excellent';
  } else if (timeBreakdown.adjustedTotal <= 30) {
    efficiency = 'good';
  } else if (timeBreakdown.adjustedTotal <= 60) {
    efficiency = 'average';
  } else {
    efficiency = 'needs-improvement';
  }
  
  return {
    programmingTime: parseFloat(timeBreakdown.programmingTime.toFixed(2)),
    loadingTime: parseFloat(timeBreakdown.loadingTime.toFixed(2)),
    machinePrepTime: parseFloat(timeBreakdown.machinePrepTime.toFixed(2)),
    inspectionTime: parseFloat(timeBreakdown.inspectionTime.toFixed(2)),
    fixtureTime: parseFloat(timeBreakdown.fixtureTime.toFixed(2)),
    baseTotal: parseFloat(timeBreakdown.baseTotal.toFixed(2)),
    adjustedTotal: parseFloat(timeBreakdown.adjustedTotal.toFixed(2)),
    setupTimePerPart: parseFloat(perPartDistribution.setupTimePerPart.toFixed(2)),
    setupCostPerPart: parseFloat(perPartDistribution.setupCostPerPart.toFixed(2)),
    setupPercentage: perPartDistribution.setupPercentage,
    totalSetupCost: parseFloat(totalSetupCost.toFixed(2)),
    batchComparison,
    recommendations,
    efficiency,
  };
}

/**
 * Calculate ideal batch size for given setup time and part cutting time
 */
export function calculateIdealBatchSize(
  setupTimeMinutes: number,
  cuttingTimePerPartMinutes: number,
  targetSetupPercentage: number = 10 // Target setup as 10% of total time
): {
  idealBatchSize: number;
  setupTimePercentage: number;
  totalTimeForBatch: number;
} {
  // Setup + (Parts × CuttingTime) = Total
  // Setup / Total = Target%
  // Setup = Target% × Total
  // Setup = Target% × (Setup + Parts × CuttingTime)
  // Setup = Target% × Setup + Target% × Parts × CuttingTime
  // Setup × (1 - Target%) = Target% × Parts × CuttingTime
  // Parts = Setup × (1 - Target%) / (Target% × CuttingTime)
  
  const targetFraction = targetSetupPercentage / 100;
  const idealBatchSize = Math.ceil(
    (setupTimeMinutes * (1 - targetFraction)) / (targetFraction * cuttingTimePerPartMinutes)
  );
  
  const totalCuttingTime = idealBatchSize * cuttingTimePerPartMinutes;
  const totalTimeForBatch = setupTimeMinutes + totalCuttingTime;
  const actualSetupPercentage = (setupTimeMinutes / totalTimeForBatch) * 100;
  
  return {
    idealBatchSize: Math.max(1, idealBatchSize),
    setupTimePercentage: parseFloat(actualSetupPercentage.toFixed(1)),
    totalTimeForBatch: parseFloat(totalTimeForBatch.toFixed(2)),
  };
}

/**
 * Compare current vs optimized setup time
 */
export function compareSetupScenarios(
  currentSetupMinutes: number,
  optimizedSetupMinutes: number,
  annualSetups: number,
  laborRate: number
): {
  timeSavingsPerSetup: number;
  annualTimeSavings: number;
  costSavingsPerSetup: number;
  annualCostSavings: number;
  improvementPercentage: number;
} {
  const timeSavingsPerSetup = currentSetupMinutes - optimizedSetupMinutes;
  const annualTimeSavings = timeSavingsPerSetup * annualSetups;
  const costSavingsPerSetup = (timeSavingsPerSetup / 60) * laborRate;
  const annualCostSavings = (annualTimeSavings / 60) * laborRate;
  const improvementPercentage = ((currentSetupMinutes - optimizedSetupMinutes) / currentSetupMinutes) * 100;
  
  return {
    timeSavingsPerSetup: parseFloat(timeSavingsPerSetup.toFixed(2)),
    annualTimeSavings: parseFloat(annualTimeSavings.toFixed(0)),
    costSavingsPerSetup: parseFloat(costSavingsPerSetup.toFixed(2)),
    annualCostSavings: parseFloat(annualCostSavings.toFixed(0)),
    improvementPercentage: parseFloat(improvementPercentage.toFixed(1)),
  };
}

