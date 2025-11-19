import type { MaterialUtilizationInput } from '../validations/material-utilization';

export interface NestingLayout {
  partsPerSheet: number;
  rows: number;
  cols: number;
  rotated: boolean;
  parts: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotated: boolean;
  }[];
}

export interface MaterialUtilizationResult {
  // Utilization metrics
  utilizationRate: number; // percentage
  wasteRate: number; // percentage
  partsPerSheet: number;
  sheetsRequired: number;

  // Areas
  sheetArea: number; // mm²
  usedArea: number; // mm²
  wasteArea: number; // mm²
  partArea: number; // mm²

  // Material weights
  sheetWeight: number; // kg
  usedWeight: number; // kg
  wasteWeight: number; // kg
  totalMaterialWeight: number; // kg

  // Costs
  totalMaterialCost: number;
  materialCostPerPart: number;
  wasteCost: number;
  scrapValue: number;
  netMaterialCost: number;

  // Optimization suggestions
  layout: NestingLayout;
  alternativeLayouts: {
    description: string;
    utilizationRate: number;
    partsPerSheet: number;
  }[];

  // Recommendations
  recommendations: {
    title: string;
    description: string;
    potentialSavings: number;
    priority: 'high' | 'medium' | 'low';
  }[];
}

// Material density (kg/m³)
const MATERIAL_DENSITY: Record<string, number> = {
  steel: 7850,
  stainless_steel: 7900,
  aluminum: 2700,
  copper: 8960,
  brass: 8500,
};

/**
 * Calculate material utilization and nesting layout
 * 
 * ⚠️ NESTING ALGORITHM NOTES:
 * This calculator uses a simple rectangular grid nesting algorithm suitable for
 * rectangular parts. It calculates optimal orientation (normal vs. rotated) to
 * maximize parts per sheet.
 * 
 * What IS calculated:
 * - Rectangular grid arrangement (rows × columns)
 * - Normal and rotated orientations
 * - Part spacing, kerf allowance, and edge margins
 * - Accurate area, weight, and cost calculations
 * 
 * What is NOT calculated:
 * - Complex irregular part shapes
 * - True mixed-orientation optimization (only rough estimate provided)
 * - Nested parts within waste areas
 * - Advanced nesting algorithms (genetic algorithms, etc.)
 * - Part-to-part interference or collision detection
 * 
 * For complex parts or maximum utilization:
 * - Use dedicated nesting software (SigmaNEST, ProNest, TruTops, etc.)
 * - Results from this calculator provide good baseline estimates
 * - Professional software typically achieves 5-15% better utilization
 * 
 * Calculations for area, weight, and cost are exact based on the nesting layout.
 */
export function calculateMaterialUtilization(
  input: MaterialUtilizationInput
): MaterialUtilizationResult {
  // 1. Calculate available space considering margins
  const availableLength = input.sheetLength - 2 * input.edgeMargin;
  const availableWidth = input.sheetWidth - 2 * input.edgeMargin;

  // 2. Calculate part dimensions including kerf and spacing
  const effectivePartLength = input.partLength + input.kerf + input.partSpacing;
  const effectivePartWidth = input.partWidth + input.kerf + input.partSpacing;

  // 3. Calculate optimal nesting layout
  const layout = calculateOptimalLayout(
    availableLength,
    availableWidth,
    input.partLength,
    input.partWidth,
    effectivePartLength,
    effectivePartWidth,
    input.allowRotation,
    input.edgeMargin
  );

  const partsPerSheet = layout.partsPerSheet;
  const sheetsRequired = Math.ceil(input.quantity / partsPerSheet);

  // 4. Calculate areas
  const sheetArea = input.sheetLength * input.sheetWidth;
  const partArea = input.partLength * input.partWidth;
  const usedArea = partArea * partsPerSheet;
  const wasteArea = sheetArea - usedArea;

  // 5. Calculate utilization rates
  const utilizationRate = (usedArea / sheetArea) * 100;
  const wasteRate = 100 - utilizationRate;

  // 6. Calculate weights
  const materialDensity = MATERIAL_DENSITY[input.materialType];
  const volumeM3 = (sheetArea * input.materialThickness) / 1000000000; // mm³ to m³
  const sheetWeight = volumeM3 * materialDensity;
  const usedWeight = sheetWeight * (utilizationRate / 100);
  const wasteWeight = sheetWeight - usedWeight;
  const totalMaterialWeight = sheetWeight * sheetsRequired;

  // 7. Calculate costs
  const totalMaterialCost = totalMaterialWeight * input.materialPricePerKg;
  const wasteCost = wasteWeight * sheetsRequired * input.materialPricePerKg;
  const scrapValue = wasteWeight * sheetsRequired * input.scrapValuePerKg;
  const netMaterialCost = totalMaterialCost - scrapValue;
  const materialCostPerPart = netMaterialCost / input.quantity;

  // 8. Generate alternative layouts
  const alternativeLayouts = generateAlternativeLayouts(
    availableLength,
    availableWidth,
    input.partLength,
    input.partWidth,
    effectivePartLength,
    effectivePartWidth
  );

  // 9. Generate recommendations
  const recommendations = generateRecommendations(input, {
    utilizationRate,
    wasteRate,
    partsPerSheet,
    wasteCost,
    layout,
  });

  return {
    // Utilization
    utilizationRate: parseFloat(utilizationRate.toFixed(2)),
    wasteRate: parseFloat(wasteRate.toFixed(2)),
    partsPerSheet,
    sheetsRequired,

    // Areas
    sheetArea: parseFloat(sheetArea.toFixed(2)),
    usedArea: parseFloat(usedArea.toFixed(2)),
    wasteArea: parseFloat(wasteArea.toFixed(2)),
    partArea: parseFloat(partArea.toFixed(2)),

    // Weights
    sheetWeight: parseFloat(sheetWeight.toFixed(3)),
    usedWeight: parseFloat(usedWeight.toFixed(3)),
    wasteWeight: parseFloat(wasteWeight.toFixed(3)),
    totalMaterialWeight: parseFloat(totalMaterialWeight.toFixed(3)),

    // Costs
    totalMaterialCost: parseFloat(totalMaterialCost.toFixed(2)),
    materialCostPerPart: parseFloat(materialCostPerPart.toFixed(2)),
    wasteCost: parseFloat(wasteCost.toFixed(2)),
    scrapValue: parseFloat(scrapValue.toFixed(2)),
    netMaterialCost: parseFloat(netMaterialCost.toFixed(2)),

    // Layout & recommendations
    layout,
    alternativeLayouts,
    recommendations,
  };
}

/**
 * Calculate optimal nesting layout
 */
function calculateOptimalLayout(
  availableLength: number,
  availableWidth: number,
  partLength: number,
  partWidth: number,
  effectivePartLength: number,
  effectivePartWidth: number,
  allowRotation: boolean,
  edgeMargin: number
): NestingLayout {
  // Try normal orientation
  const colsNormal = Math.floor(availableLength / effectivePartLength);
  const rowsNormal = Math.floor(availableWidth / effectivePartWidth);
  const partsNormal = colsNormal * rowsNormal;

  let bestLayout = {
    partsPerSheet: partsNormal,
    rows: rowsNormal,
    cols: colsNormal,
    rotated: false,
  };

  // Try rotated orientation if allowed
  if (allowRotation) {
    const colsRotated = Math.floor(availableLength / effectivePartWidth);
    const rowsRotated = Math.floor(availableWidth / effectivePartLength);
    const partsRotated = colsRotated * rowsRotated;

    if (partsRotated > partsNormal) {
      bestLayout = {
        partsPerSheet: partsRotated,
        rows: rowsRotated,
        cols: colsRotated,
        rotated: true,
      };
    }
  }

  // Generate part positions
  const parts: NestingLayout['parts'] = [];
  const actualPartLength = bestLayout.rotated ? partWidth : partLength;
  const actualPartWidth = bestLayout.rotated ? partLength : partWidth;
  const actualEffectiveLength = bestLayout.rotated ? effectivePartWidth : effectivePartLength;
  const actualEffectiveWidth = bestLayout.rotated ? effectivePartLength : effectivePartWidth;

  for (let row = 0; row < bestLayout.rows; row++) {
    for (let col = 0; col < bestLayout.cols; col++) {
      parts.push({
        x: edgeMargin + col * actualEffectiveLength,
        y: edgeMargin + row * actualEffectiveWidth,
        width: actualPartLength,
        height: actualPartWidth,
        rotated: bestLayout.rotated,
      });
    }
  }

  return {
    ...bestLayout,
    parts,
  };
}

/**
 * Generate alternative layout options
 */
function generateAlternativeLayouts(
  availableLength: number,
  availableWidth: number,
  partLength: number,
  partWidth: number,
  effectivePartLength: number,
  effectivePartWidth: number
): MaterialUtilizationResult['alternativeLayouts'] {
  const alternatives: MaterialUtilizationResult['alternativeLayouts'] = [];

  // Normal orientation
  const colsNormal = Math.floor(availableLength / effectivePartLength);
  const rowsNormal = Math.floor(availableWidth / effectivePartWidth);
  const partsNormal = colsNormal * rowsNormal;
  const sheetArea = availableLength * availableWidth;
  const utilizationNormal = ((partLength * partWidth * partsNormal) / sheetArea) * 100;

  alternatives.push({
    description: 'Standard orientation (no rotation)',
    utilizationRate: parseFloat(utilizationNormal.toFixed(2)),
    partsPerSheet: partsNormal,
  });

  // Rotated orientation
  const colsRotated = Math.floor(availableLength / effectivePartWidth);
  const rowsRotated = Math.floor(availableWidth / effectivePartLength);
  const partsRotated = colsRotated * rowsRotated;
  const utilizationRotated = ((partLength * partWidth * partsRotated) / sheetArea) * 100;

  alternatives.push({
    description: 'Rotated 90° orientation',
    utilizationRate: parseFloat(utilizationRotated.toFixed(2)),
    partsPerSheet: partsRotated,
  });

  // Mixed orientation (advanced) - ESTIMATION ONLY
  // ⚠️ IMPORTANT: This is a ROUGH ESTIMATE, not a true mixed-orientation calculation
  // 
  // Real mixed-orientation nesting:
  // - Requires specialized nesting software (e.g., SigmaNEST, ProNest, TruTops)
  // - Involves manual optimization and iterative refinement
  // - Results vary greatly by part geometry and aspect ratio
  // - May not always be feasible or cost-effective to implement
  //
  // This estimate uses a simplified weighted formula to suggest potential improvement range:
  // Formula: (normal_parts × 0.8) + (rotated_parts × 0.3)
  // 
  // Interpretation:
  // - Assumes you might achieve ~80% of the normal orientation part count
  // - Plus ~30% of additional parts from strategically rotated pieces
  // - Actual results could be significantly higher or lower
  //
  // For accurate mixed nesting:
  // - Use professional nesting software with optimization algorithms
  // - Perform actual layout tests with your specific part geometry
  // - Factor in increased programming and setup time costs
  // - Consider material handling complexity
  const partsMixed = Math.floor(partsNormal * 0.8 + partsRotated * 0.3);
  const utilizationMixed = ((partLength * partWidth * partsMixed) / sheetArea) * 100;

  alternatives.push({
    description: 'Mixed orientation (rough estimate - requires nesting software and manual optimization)',
    utilizationRate: parseFloat(utilizationMixed.toFixed(2)),
    partsPerSheet: partsMixed,
  });

  return alternatives.sort((a, b) => b.utilizationRate - a.utilizationRate);
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(
  input: MaterialUtilizationInput,
  metrics: {
    utilizationRate: number;
    wasteRate: number;
    partsPerSheet: number;
    wasteCost: number;
    layout: NestingLayout;
  }
): MaterialUtilizationResult['recommendations'] {
  const recommendations: MaterialUtilizationResult['recommendations'] = [];
  const partArea = input.partLength * input.partWidth;

  // 1. Low utilization rate
  if (metrics.utilizationRate < 70) {
    const potentialSavings = metrics.wasteCost * 0.3;
    recommendations.push({
      title: 'Optimize Part Orientation',
      description: `Current utilization is ${metrics.utilizationRate.toFixed(1)}%. Consider exploring improved nesting strategies such as part rotation, adjusted spacing, or dedicated nesting software. Higher utilization generally reduces waste and material cost, but achievable levels depend on your parts, materials, and cutting process.`,
      potentialSavings: parseFloat(potentialSavings.toFixed(2)),
      priority: 'high',
    });
  }

  // 2. Sheet size optimization
  if (metrics.wasteRate > 25) {
    const savings = metrics.wasteCost * 0.4;
    recommendations.push({
      title: 'Consider Different Sheet Sizes',
      description: `${metrics.wasteRate.toFixed(1)}% waste detected. Using custom sheet sizes closer to your part dimensions could significantly reduce waste. Consult with your supplier about available sizes.`,
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'high',
    });
  }

  // 3. Kerf optimization
  if (input.kerf > 0.5) {
    const kerfWasteMm3 = input.quantity * partArea * input.kerf;
    const kerfWasteKg =
      (kerfWasteMm3 / 1000000000) * MATERIAL_DENSITY[input.materialType];
    const savings = kerfWasteKg * input.materialPricePerKg;
    recommendations.push({
      title: 'Optimize Cutting Process',
      description: `Your kerf width (${input.kerf}mm) is relatively wide. In some cases, finer cutting processes or optimized parameters can reduce material loss. Review whether your current kerf is required for quality and adjust if your process and equipment allow.`,
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'medium',
    });
  }

  // 4. Batch size optimization
  if (input.quantity < metrics.partsPerSheet * 2) {
    recommendations.push({
      title: 'Increase Batch Size',
      description: `Your batch size (${input.quantity} parts) results in ${metrics.partsPerSheet - (input.quantity % metrics.partsPerSheet)} empty positions on the last sheet. Consider ordering in multiples of ${metrics.partsPerSheet} to maximize utilization.`,
      potentialSavings: 0,
      priority: 'low',
    });
  }

  // 5. Common cut lines
  if (input.partSpacing > 3) {
    const savings = metrics.wasteCost * 0.15;
    recommendations.push({
      title: 'Implement Common Cut Lines',
      description:
        'Adjacent parts can sometimes share cutting paths, which reduces total cutting length and kerf waste. Evaluate whether your part geometry and quality requirements permit this, and adjust spacing and cutting strategy accordingly.',
      potentialSavings: parseFloat(savings.toFixed(2)),
      priority: 'medium',
    });
  }

  // 6. Scrap recycling
  if (input.scrapValuePerKg < input.materialPricePerKg * 0.3) {
    const potentialScrapValue = metrics.wasteCost * 0.4;
    recommendations.push({
      title: 'Improve Scrap Recycling Program',
      description: `Your scrap value is ${((input.scrapValuePerKg / input.materialPricePerKg) * 100).toFixed(0)}% of material cost. Reviewing scrap handling, sorting, and recycling agreements may improve how much of the waste material cost you recover.`,
      potentialSavings: parseFloat(potentialScrapValue.toFixed(2)),
      priority: 'low',
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}







