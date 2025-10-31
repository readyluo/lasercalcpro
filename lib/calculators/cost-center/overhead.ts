/**
 * Overhead Allocator
 * 
 * Allocates overhead costs across multiple jobs/orders using various methods.
 * Pure functions with no side effects.
 */

import type { OverheadAllocatorInput } from '@/lib/validations/cost-center';

export interface OverheadAllocationResult {
  jobs: Array<{
    jobName: string;
    allocatedOverhead: number;
    overheadPercent: number;
    totalCostWithOverhead: number;
  }>;
  
  totalAllocated: number;
  allocationMethod: string;
  
  summary: {
    averageOverheadPerJob: number;
    highestOverhead: { jobName: string; amount: number };
    lowestOverhead: { jobName: string; amount: number };
  };
  
  recommendations: string[];
}

/**
 * Allocate overhead across jobs
 */
export function allocateOverhead(input: OverheadAllocatorInput): OverheadAllocationResult {
  const { totalOverhead, allocationMethod, jobs } = input;
  
  let allocatedJobs: Array<{
    jobName: string;
    allocatedOverhead: number;
    overheadPercent: number;
    totalCostWithOverhead: number;
  }> = [];
  
  // Calculate total of allocation basis
  let totalBasis = 0;
  
  switch (allocationMethod) {
    case 'machineHours':
      totalBasis = jobs.reduce((sum, job) => sum + job.machineHours, 0);
      allocatedJobs = jobs.map(job => {
        const allocatedOverhead = (job.machineHours / totalBasis) * totalOverhead;
        const directCost = job.materialCost; // Simplified
        const totalCostWithOverhead = directCost + allocatedOverhead;
        const overheadPercent = (allocatedOverhead / totalCostWithOverhead) * 100;
        
        return {
          jobName: job.jobName,
          allocatedOverhead: parseFloat(allocatedOverhead.toFixed(2)),
          overheadPercent: parseFloat(overheadPercent.toFixed(1)),
          totalCostWithOverhead: parseFloat(totalCostWithOverhead.toFixed(2)),
        };
      });
      break;
      
    case 'laborHours':
      totalBasis = jobs.reduce((sum, job) => sum + job.laborHours, 0);
      allocatedJobs = jobs.map(job => {
        const allocatedOverhead = (job.laborHours / totalBasis) * totalOverhead;
        const directCost = job.materialCost;
        const totalCostWithOverhead = directCost + allocatedOverhead;
        const overheadPercent = (allocatedOverhead / totalCostWithOverhead) * 100;
        
        return {
          jobName: job.jobName,
          allocatedOverhead: parseFloat(allocatedOverhead.toFixed(2)),
          overheadPercent: parseFloat(overheadPercent.toFixed(1)),
          totalCostWithOverhead: parseFloat(totalCostWithOverhead.toFixed(2)),
        };
      });
      break;
      
    case 'materialCost':
      totalBasis = jobs.reduce((sum, job) => sum + job.materialCost, 0);
      allocatedJobs = jobs.map(job => {
        const allocatedOverhead = (job.materialCost / totalBasis) * totalOverhead;
        const directCost = job.materialCost;
        const totalCostWithOverhead = directCost + allocatedOverhead;
        const overheadPercent = (allocatedOverhead / totalCostWithOverhead) * 100;
        
        return {
          jobName: job.jobName,
          allocatedOverhead: parseFloat(allocatedOverhead.toFixed(2)),
          overheadPercent: parseFloat(overheadPercent.toFixed(1)),
          totalCostWithOverhead: parseFloat(totalCostWithOverhead.toFixed(2)),
        };
      });
      break;
      
    case 'floorSpace':
      totalBasis = jobs.reduce((sum, job) => sum + job.floorSpace, 0);
      allocatedJobs = jobs.map(job => {
        const allocatedOverhead = (job.floorSpace / totalBasis) * totalOverhead;
        const directCost = job.materialCost;
        const totalCostWithOverhead = directCost + allocatedOverhead;
        const overheadPercent = (allocatedOverhead / totalCostWithOverhead) * 100;
        
        return {
          jobName: job.jobName,
          allocatedOverhead: parseFloat(allocatedOverhead.toFixed(2)),
          overheadPercent: parseFloat(overheadPercent.toFixed(1)),
          totalCostWithOverhead: parseFloat(totalCostWithOverhead.toFixed(2)),
        };
      });
      break;
      
    case 'equalSplit':
      const overheadPerJob = totalOverhead / jobs.length;
      allocatedJobs = jobs.map(job => {
        const allocatedOverhead = overheadPerJob;
        const directCost = job.materialCost;
        const totalCostWithOverhead = directCost + allocatedOverhead;
        const overheadPercent = (allocatedOverhead / totalCostWithOverhead) * 100;
        
        return {
          jobName: job.jobName,
          allocatedOverhead: parseFloat(allocatedOverhead.toFixed(2)),
          overheadPercent: parseFloat(overheadPercent.toFixed(1)),
          totalCostWithOverhead: parseFloat(totalCostWithOverhead.toFixed(2)),
        };
      });
      break;
  }
  
  // Calculate summary
  const totalAllocated = allocatedJobs.reduce((sum, job) => sum + job.allocatedOverhead, 0);
  const averageOverheadPerJob = totalAllocated / allocatedJobs.length;
  
  const sortedByOverhead = [...allocatedJobs].sort((a, b) => b.allocatedOverhead - a.allocatedOverhead);
  const highestOverhead = {
    jobName: sortedByOverhead[0].jobName,
    amount: sortedByOverhead[0].allocatedOverhead,
  };
  const lowestOverhead = {
    jobName: sortedByOverhead[sortedByOverhead.length - 1].jobName,
    amount: sortedByOverhead[sortedByOverhead.length - 1].allocatedOverhead,
  };
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  // Check allocation method appropriateness
  if (allocationMethod === 'equalSplit' && jobs.length > 5) {
    recommendations.push(
      'Equal split may not accurately reflect cost drivers. Consider machine hours or labor hours allocation.'
    );
  }
  
  // Check for significant variance
  const maxOverhead = Math.max(...allocatedJobs.map(j => j.allocatedOverhead));
  const minOverhead = Math.min(...allocatedJobs.map(j => j.allocatedOverhead));
  if (maxOverhead > minOverhead * 3) {
    recommendations.push(
      'Significant variance in overhead allocation detected. Ensure chosen method reflects actual resource consumption.'
    );
  }
  
  // Check overhead percentage
  allocatedJobs.forEach(job => {
    if (job.overheadPercent > 50) {
      recommendations.push(
        `${job.jobName}: Overhead exceeds 50% of total cost. Review if allocation method is appropriate.`
      );
    }
  });
  
  // Method-specific recommendations
  if (allocationMethod === 'machineHours') {
    recommendations.push(
      'Machine hours allocation works well for capital-intensive operations. Ensure accurate time tracking.'
    );
  } else if (allocationMethod === 'materialCost') {
    recommendations.push(
      'Material cost allocation may not reflect actual overhead drivers. Consider if suitable for your operations.'
    );
  }
  
  return {
    jobs: allocatedJobs,
    totalAllocated: parseFloat(totalAllocated.toFixed(2)),
    allocationMethod: formatAllocationMethod(allocationMethod),
    summary: {
      averageOverheadPerJob: parseFloat(averageOverheadPerJob.toFixed(2)),
      highestOverhead,
      lowestOverhead,
    },
    recommendations,
  };
}

/**
 * Helper to format allocation method for display
 */
function formatAllocationMethod(method: string): string {
  const methodMap: Record<string, string> = {
    machineHours: 'Machine Hours',
    laborHours: 'Labor Hours',
    materialCost: 'Material Cost',
    floorSpace: 'Floor Space',
    equalSplit: 'Equal Split',
  };
  
  return methodMap[method] || method;
}

/**
 * Calculate overhead rate (percentage of direct costs)
 */
export function calculateOverheadRate(
  totalOverhead: number,
  totalDirectCosts: number
): {
  overheadRate: number;
  description: string;
} {
  const overheadRate = (totalOverhead / totalDirectCosts) * 100;
  
  let description: string;
  if (overheadRate < 30) {
    description = 'Low overhead rate. Typical for lean operations.';
  } else if (overheadRate <= 60) {
    description = 'Moderate overhead rate. Common in manufacturing.';
  } else if (overheadRate <= 100) {
    description = 'High overhead rate. Review cost structure.';
  } else {
    description = 'Very high overhead rate. Significant optimization opportunity.';
  }
  
  return {
    overheadRate: parseFloat(overheadRate.toFixed(1)),
    description,
  };
}

/**
 * Compare allocation methods to show differences
 */
export function compareAllocationMethods(
  totalOverhead: number,
  job: {
    jobName: string;
    machineHours: number;
    laborHours: number;
    materialCost: number;
    floorSpace: number;
  },
  totalMachineHours: number,
  totalLaborHours: number,
  totalMaterialCost: number,
  totalFloorSpace: number,
  jobCount: number
): Array<{
  method: string;
  allocatedAmount: number;
  difference: number;
}> {
  const methods = [
    {
      method: 'Machine Hours',
      allocatedAmount: (job.machineHours / totalMachineHours) * totalOverhead,
    },
    {
      method: 'Labor Hours',
      allocatedAmount: (job.laborHours / totalLaborHours) * totalOverhead,
    },
    {
      method: 'Material Cost',
      allocatedAmount: (job.materialCost / totalMaterialCost) * totalOverhead,
    },
    {
      method: 'Floor Space',
      allocatedAmount: (job.floorSpace / totalFloorSpace) * totalOverhead,
    },
    {
      method: 'Equal Split',
      allocatedAmount: totalOverhead / jobCount,
    },
  ];
  
  // Calculate average allocation
  const avgAllocation = methods.reduce((sum, m) => sum + m.allocatedAmount, 0) / methods.length;
  
  return methods.map(m => ({
    method: m.method,
    allocatedAmount: parseFloat(m.allocatedAmount.toFixed(2)),
    difference: parseFloat(((m.allocatedAmount - avgAllocation) / avgAllocation * 100).toFixed(1)),
  }));
}

