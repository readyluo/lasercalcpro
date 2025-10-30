import type { CNCMachiningInput } from '../validations/cnc-machining';

export interface CNCMachiningResult {
  // Per part costs
  materialCostPerPart: number;
  machineCostPerPart: number;
  laborCostPerPart: number;
  toolingCostPerPart: number;
  setupCostPerPart: number;
  overheadPerPart: number;
  totalCostPerPart: number;

  // Batch totals
  totalBatchCost: number;
  totalBatchTime: number; // hours
  totalMaterialCost: number;

  // Pricing
  suggestedPricePerPart: number; // 25% markup
  profitPerPart: number;
  totalProfit: number;

  // Volume pricing tiers
  volumePricing: {
    quantity: number;
    pricePerPart: number;
    discount: number;
  }[];

  // Efficiency
  partWeight: number; // kg
  machineUtilization: number; // percentage
}

// Material density database (kg/m³)
const MATERIAL_DENSITY: Record<string, number> = {
  aluminum: 2700,
  steel: 7850,
  stainless_steel: 7900,
  brass: 8500,
  plastic: 1200,
};

/**
 * Calculate CNC machining costs with batch pricing
 */
export function calculateCNCMachining(input: CNCMachiningInput): CNCMachiningResult {
  // 1. Calculate part volume and weight
  const volumeCm3 = (input.partLength * input.partWidth * input.partHeight) / 1000; // cm³
  const volumeM3 = volumeCm3 / 1000000; // m³
  const materialDensity = MATERIAL_DENSITY[input.materialType];
  const partWeight = volumeM3 * materialDensity; // kg

  // 2. Material cost per part
  const materialCostPerPart = partWeight * input.materialPrice;

  // 3. Setup cost per part (amortized across batch)
  const setupCostPerPart = (input.setupTime * input.machineRate) / input.batchSize;

  // 4. Machine cost per part
  const machineCostPerPart = input.machiningTime * input.machineRate;

  // 5. Labor cost per part
  // Operator typically monitors multiple machines, so labor is 40% of machining time
  const laborCostPerPart = input.machiningTime * input.laborRate * 0.4;

  // 6. Tooling cost per part
  const toolingCostPerPart = input.toolCost / input.toolLife;

  // 7. Overhead (typically 15% of direct costs)
  const directCosts =
    materialCostPerPart +
    machineCostPerPart +
    laborCostPerPart +
    toolingCostPerPart +
    setupCostPerPart;
  const overheadPerPart = directCosts * (input.overheadRate / 100);

  // 8. Total cost per part
  const totalCostPerPart =
    materialCostPerPart +
    machineCostPerPart +
    laborCostPerPart +
    toolingCostPerPart +
    setupCostPerPart +
    overheadPerPart;

  // 9. Batch totals
  const totalBatchCost = totalCostPerPart * input.batchSize;
  const totalBatchTime = input.setupTime + input.machiningTime * input.batchSize;
  const totalMaterialCost = materialCostPerPart * input.batchSize;

  // 10. Pricing (25% markup for single units, decreases with volume)
  const suggestedPricePerPart = totalCostPerPart * 1.25;
  const profitPerPart = suggestedPricePerPart - totalCostPerPart;
  const totalProfit = profitPerPart * input.batchSize;

  // 11. Volume pricing tiers with economies of scale
  const volumePricing = calculateVolumePricing(input, totalCostPerPart);

  // 12. Machine utilization (percentage of time machine is cutting vs idle)
  const cuttingTime = input.machiningTime * input.batchSize;
  const machineUtilization = (cuttingTime / totalBatchTime) * 100;

  return {
    // Per part
    materialCostPerPart: parseFloat(materialCostPerPart.toFixed(2)),
    machineCostPerPart: parseFloat(machineCostPerPart.toFixed(2)),
    laborCostPerPart: parseFloat(laborCostPerPart.toFixed(2)),
    toolingCostPerPart: parseFloat(toolingCostPerPart.toFixed(2)),
    setupCostPerPart: parseFloat(setupCostPerPart.toFixed(2)),
    overheadPerPart: parseFloat(overheadPerPart.toFixed(2)),
    totalCostPerPart: parseFloat(totalCostPerPart.toFixed(2)),

    // Batch totals
    totalBatchCost: parseFloat(totalBatchCost.toFixed(2)),
    totalBatchTime: parseFloat(totalBatchTime.toFixed(2)),
    totalMaterialCost: parseFloat(totalMaterialCost.toFixed(2)),

    // Pricing
    suggestedPricePerPart: parseFloat(suggestedPricePerPart.toFixed(2)),
    profitPerPart: parseFloat(profitPerPart.toFixed(2)),
    totalProfit: parseFloat(totalProfit.toFixed(2)),

    // Volume pricing
    volumePricing,

    // Efficiency
    partWeight: parseFloat(partWeight.toFixed(4)),
    machineUtilization: parseFloat(machineUtilization.toFixed(1)),
  };
}

/**
 * Calculate volume pricing tiers
 * Economies of scale: setup cost amortization + volume discounts
 */
function calculateVolumePricing(
  input: CNCMachiningInput,
  baseCostPerPart: number
): {
  quantity: number;
  pricePerPart: number;
  discount: number;
}[] {
  const tiers = [1, 10, 50, 100, 500, 1000];
  const basePrice = baseCostPerPart * 1.25; // 25% markup for single unit

  return tiers.map(quantity => {
    // Recalculate with new batch size for accurate setup cost amortization
    const setupCostPerPart = (input.setupTime * input.machineRate) / quantity;

    // Recalculate total cost with new setup cost
    const materialCostPerPart =
      ((input.partLength * input.partWidth * input.partHeight) / 1000000000) *
      MATERIAL_DENSITY[input.materialType] *
      input.materialPrice;

    const machineCostPerPart = input.machiningTime * input.machineRate;
    const laborCostPerPart = input.machiningTime * input.laborRate * 0.4;
    const toolingCostPerPart = input.toolCost / input.toolLife;

    const directCosts =
      materialCostPerPart +
      machineCostPerPart +
      laborCostPerPart +
      toolingCostPerPart +
      setupCostPerPart;

    const overheadPerPart = directCosts * (input.overheadRate / 100);
    const newCostPerPart = directCosts + overheadPerPart;

    // Volume discount: larger quantities get better margins
    let markup: number;
    if (quantity === 1) markup = 1.25;
    // 25%
    else if (quantity <= 10) markup = 1.20;
    // 20%
    else if (quantity <= 50) markup = 1.15;
    // 15%
    else if (quantity <= 100) markup = 1.12;
    // 12%
    else if (quantity <= 500) markup = 1.10;
    // 10%
    else markup = 1.08; // 8%

    const pricePerPart = newCostPerPart * markup;
    const discount = ((basePrice - pricePerPart) / basePrice) * 100;

    return {
      quantity,
      pricePerPart: parseFloat(pricePerPart.toFixed(2)),
      discount: parseFloat(discount.toFixed(1)),
    };
  });
}

/**
 * Get material properties for display
 */
export function getMaterialDensity(materialType: string): number {
  return MATERIAL_DENSITY[materialType] || 0;
}









