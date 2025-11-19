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
 * 
 * ⚠️ ESTIMATION LIMITATIONS:
 * This calculator provides cost estimates based on user inputs and simplified assumptions.
 * 
 * What IS modeled:
 * - Material cost based on part volume and density
 * - Machine time cost (user-provided cycle time)
 * - Labor cost with assumed multi-machine monitoring factor
 * - Tooling cost amortized over tool life
 * - Setup cost amortized across batch
 * - Overhead as percentage of direct costs
 * - Volume pricing tiers with economies of scale
 * 
 * What is NOT modeled:
 * - Actual machining strategy optimization
 * - Programming time cost
 * - Inspection and quality control time
 * - Part-specific complexity factors
 * - Scrap rate and rework costs
 * - Material waste beyond finished part volume
 * 
 * Key assumptions to verify:
 * - Labor utilization factor is 40% (assumes operator monitors multiple machines)
 *   Actual: 10-100% depending on automation level
 * - Profit margin is 25% for single pieces (volume discounts reduce this)
 *   Actual: varies widely by market, customer, and competition
 * - Overhead rate is user-input (default 15%)
 *   Actual: typically 10-40% depending on shop structure
 * 
 * For accurate quoting:
 * - Input your actual measured machining times (from CAM or time studies)
 * - Use your shop's actual hourly rates and overhead structure
 * - Validate against historical job costs
 * - Adjust labor factor based on your automation level
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
  // ⚠️ IMPORTANT: This assumes 40% labor utilization (operator monitors multiple machines)
  // Actual labor requirements vary significantly:
  // - Manual operations: 80-100% (dedicated operator attention required)
  // - Semi-automated: 40-60% (periodic monitoring and tool changes)
  // - Fully automated cells: 20-30% (setup and inspection only)
  // - Multi-machine monitoring: 10-40% (one operator, multiple machines)
  // 
  // For accurate costing:
  // 1. Track actual operator time per part in your shop
  // 2. Calculate your labor utilization factor: (operator_hours / machine_hours)
  // 3. Consider adding a labor utilization input field to the calculator
  // 
  // This 40% factor is a middle-ground estimate for shops with moderate automation.
  const laborUtilizationFactor = 0.4; // 40% - example for semi-automated operation
  const laborCostPerPart = input.machiningTime * input.laborRate * laborUtilizationFactor;

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

  // 10. Pricing (default 25% markup for single units, decreases with volume)
  // ⚠️ Profit margin assumptions vary widely by market and business model:
  // - Prototype/R&D work: often 30-50% due to uncertainty and small batches
  // - Production quantities: typically 15-30% depending on competition
  // - High-volume contract manufacturing: may be 8-15% with high reliability
  // - Rush jobs: may justify 40-60% premium for schedule accommodation
  // 
  // This calculator uses 25% as a middle-ground example for single-piece pricing.
  // Adjust your final quotes based on:
  // - Customer relationship and volume commitments
  // - Market competition and geographic factors  
  // - Risk level, payment terms, and warranty requirements
  // - Your competitive advantage and specialized capabilities
  const defaultMarkupPercent = 0.25; // 25% markup (example for single-piece)
  const suggestedPricePerPart = totalCostPerPart * (1 + defaultMarkupPercent);
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
    // ⚠️ These markup percentages are EXAMPLES for illustration purposes.
    // Actual pricing strategies vary significantly by:
    // - Your cost structure and breakeven volume
    // - Market positioning (premium specialist vs. high-volume player)
    // - Customer relationship and negotiating power
    // - Inventory risk and working capital constraints
    // - Competition level in your market
    // 
    // Example markup strategy used here:
    let markup: number;
    if (quantity === 1) markup = 1.25;       // 25% - single piece/prototype
    else if (quantity <= 10) markup = 1.20;  // 20% - small batch
    else if (quantity <= 50) markup = 1.15;  // 15% - medium batch
    else if (quantity <= 100) markup = 1.12; // 12% - larger batch
    else if (quantity <= 500) markup = 1.10; // 10% - production quantity
    else markup = 1.08;                      // 8% - high volume
    // 
    // Many shops also add:
    // - Minimum order charges for very small quantities
    // - Setup fees separate from per-piece pricing
    // - Volume discounts negotiated per customer relationship

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









