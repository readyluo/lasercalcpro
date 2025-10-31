/**
 * Quotation Margin Simulator
 * 
 * Simulates pricing scenarios with different margins, discounts, and risk factors.
 * Pure functions for quotation analysis.
 */

import type { QuotationMarginInput } from '@/lib/validations/cost-center';

export interface QuotationMarginResult {
  // Basic calculations
  suggestedPrice: number;
  profitAmount: number;
  marginPercent: number;
  markupPercent: number;
  
  // Cost breakdown percentages
  materialPercent: number;
  laborPercent: number;
  overheadPercent: number;
  profitPercent: number;
  
  // Payment terms adjustment
  paymentTermsAdjustment: number;
  adjustedPrice: number;
  
  // Risk factor adjustment
  riskAdjustment: number;
  finalRecommendedPrice: number;
  
  // Volume discount analysis
  volumePricing?: Array<{
    quantity: number;
    discountPercent: number;
    pricePerUnit: number;
    totalRevenue: number;
    totalProfit: number;
    marginPercent: number;
  }>;
  
  // Competitor comparison
  competitorComparison?: {
    competitorPrice: number;
    ourPrice: number;
    priceDifference: number;
    percentageDifference: number;
    position: 'lower' | 'similar' | 'higher';
  };
  
  // Analysis
  breakEvenPrice: number;
  minimumAcceptablePrice: number;
  recommendations: string[];
}

/**
 * Calculate quotation with margin analysis
 */
export function calculateQuotationMargin(input: QuotationMarginInput): QuotationMarginResult {
  const { baseCost, materialCost, laborCost, overheadCost, targetMarginPercent } = input;
  
  // Basic price calculation
  // Price = Cost / (1 - Margin%)
  const marginFraction = targetMarginPercent / 100;
  const suggestedPrice = baseCost / (1 - marginFraction);
  const profitAmount = suggestedPrice - baseCost;
  
  // Markup percentage (different from margin)
  // Markup = (Price - Cost) / Cost × 100
  const markupPercent = (profitAmount / baseCost) * 100;
  
  // Cost breakdown percentages
  const materialPercent = (materialCost / suggestedPrice) * 100;
  const laborPercent = (laborCost / suggestedPrice) * 100;
  const overheadPercent = (overheadCost / suggestedPrice) * 100;
  const profitPercent = (profitAmount / suggestedPrice) * 100;
  
  // Payment terms adjustment
  // Longer payment terms = higher carrying cost
  const paymentTermsMultipliers = {
    immediate: 0,
    net30: 0.01, // 1% for 30-day terms
    net60: 0.02, // 2% for 60-day terms
    net90: 0.03, // 3% for 90-day terms
  };
  
  const paymentTermsAdjustment = suggestedPrice * paymentTermsMultipliers[input.paymentTerms];
  const adjustedPrice = suggestedPrice + paymentTermsAdjustment;
  
  // Risk factor adjustment
  const riskMultipliers = {
    low: 0,
    medium: 0.05, // 5% buffer for medium risk
    high: 0.10, // 10% buffer for high risk
  };
  
  const riskAdjustment = adjustedPrice * riskMultipliers[input.riskFactor];
  const finalRecommendedPrice = adjustedPrice + riskAdjustment;
  
  // Break-even price (minimum to cover costs)
  const breakEvenPrice = baseCost;
  
  // Minimum acceptable price (cost + 10% minimum margin)
  const minimumAcceptablePrice = baseCost * 1.10;
  
  // Volume discount analysis (if provided)
  let volumePricing: Array<{
    quantity: number;
    discountPercent: number;
    pricePerUnit: number;
    totalRevenue: number;
    totalProfit: number;
    marginPercent: number;
  }> | undefined;
  
  if (input.volumeDiscounts && input.volumeDiscounts.length > 0) {
    volumePricing = input.volumeDiscounts.map(tier => {
      const discountedPrice = finalRecommendedPrice * (1 - tier.discountPercent / 100);
      const totalRevenue = discountedPrice * tier.quantity;
      const totalCost = baseCost * tier.quantity;
      const totalProfit = totalRevenue - totalCost;
      const marginPercent = (totalProfit / totalRevenue) * 100;
      
      return {
        quantity: tier.quantity,
        discountPercent: tier.discountPercent,
        pricePerUnit: parseFloat(discountedPrice.toFixed(2)),
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalProfit: parseFloat(totalProfit.toFixed(2)),
        marginPercent: parseFloat(marginPercent.toFixed(1)),
      };
    });
  }
  
  // Competitor comparison (if provided)
  let competitorComparison: {
    competitorPrice: number;
    ourPrice: number;
    priceDifference: number;
    percentageDifference: number;
    position: 'lower' | 'similar' | 'higher';
  } | undefined;
  
  if (input.competitorPrice && input.competitorPrice > 0) {
    const priceDifference = finalRecommendedPrice - input.competitorPrice;
    const percentageDifference = (priceDifference / input.competitorPrice) * 100;
    
    let position: 'lower' | 'similar' | 'higher';
    if (percentageDifference < -5) {
      position = 'lower';
    } else if (percentageDifference > 5) {
      position = 'higher';
    } else {
      position = 'similar';
    }
    
    competitorComparison = {
      competitorPrice: input.competitorPrice,
      ourPrice: finalRecommendedPrice,
      priceDifference: parseFloat(priceDifference.toFixed(2)),
      percentageDifference: parseFloat(percentageDifference.toFixed(1)),
      position,
    };
  }
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  // Margin analysis
  if (targetMarginPercent < 20) {
    recommendations.push(
      'Target margin below 20% is low. Ensure volume justifies thin margins or consider increasing price.'
    );
  } else if (targetMarginPercent > 50) {
    recommendations.push(
      'Target margin above 50% is high. Ensure value proposition justifies premium pricing or risk losing to competitors.'
    );
  }
  
  // Cost structure analysis
  if (materialPercent > 60) {
    recommendations.push(
      `Material costs are ${materialPercent.toFixed(0)}% of price. Consider negotiating bulk discounts with suppliers.`
    );
  }
  
  if (laborPercent > 40) {
    recommendations.push(
      'Labor costs are high. Consider automation or process optimization opportunities.'
    );
  }
  
  if (overheadPercent > 30) {
    recommendations.push(
      'Overhead allocation is high. Review if overhead rates are current and accurate.'
    );
  }
  
  // Payment terms
  if (input.paymentTerms === 'net90' || input.paymentTerms === 'net60') {
    recommendations.push(
      `Extended payment terms (${input.paymentTerms}) increase carrying costs by ${(paymentTermsMultipliers[input.paymentTerms] * 100).toFixed(0)}%. Consider early payment discounts.`
    );
  }
  
  // Risk factor
  if (input.riskFactor === 'high') {
    recommendations.push(
      'High risk factor applied (10% buffer). Consider requiring deposit or progress payments to mitigate risk.'
    );
  }
  
  // Competitor comparison recommendations
  if (competitorComparison) {
    if (competitorComparison.position === 'higher') {
      recommendations.push(
        `Price is ${Math.abs(competitorComparison.percentageDifference).toFixed(0)}% higher than competitor. Justify with quality, service, or delivery advantages.`
      );
    } else if (competitorComparison.position === 'lower') {
      recommendations.push(
        `Price is ${Math.abs(competitorComparison.percentageDifference).toFixed(0)}% lower than competitor. Consider if you can increase margins.`
      );
    } else {
      recommendations.push(
        'Price is competitive with market. Focus on non-price differentiators to win the business.'
      );
    }
  }
  
  // Volume discount recommendations
  if (volumePricing && volumePricing.length > 0) {
    const lowestMargin = Math.min(...volumePricing.map(v => v.marginPercent));
    if (lowestMargin < 15) {
      recommendations.push(
        `Volume discount reduces margin to ${lowestMargin.toFixed(0)}%. Ensure volume justifies thin margins.`
      );
    }
  }
  
  // General recommendations
  recommendations.push(
    'Always verify actual costs before quoting. Use this as a guideline, not absolute.'
  );
  
  if (targetMarginPercent >= 25 && targetMarginPercent <= 35) {
    recommendations.push(
      'Target margin is in healthy range (25-35%) for custom fabrication work.'
    );
  }
  
  return {
    suggestedPrice: parseFloat(suggestedPrice.toFixed(2)),
    profitAmount: parseFloat(profitAmount.toFixed(2)),
    marginPercent: parseFloat(targetMarginPercent.toFixed(1)),
    markupPercent: parseFloat(markupPercent.toFixed(1)),
    materialPercent: parseFloat(materialPercent.toFixed(1)),
    laborPercent: parseFloat(laborPercent.toFixed(1)),
    overheadPercent: parseFloat(overheadPercent.toFixed(1)),
    profitPercent: parseFloat(profitPercent.toFixed(1)),
    paymentTermsAdjustment: parseFloat(paymentTermsAdjustment.toFixed(2)),
    adjustedPrice: parseFloat(adjustedPrice.toFixed(2)),
    riskAdjustment: parseFloat(riskAdjustment.toFixed(2)),
    finalRecommendedPrice: parseFloat(finalRecommendedPrice.toFixed(2)),
    volumePricing,
    competitorComparison,
    breakEvenPrice: parseFloat(breakEvenPrice.toFixed(2)),
    minimumAcceptablePrice: parseFloat(minimumAcceptablePrice.toFixed(2)),
    recommendations,
  };
}

/**
 * Calculate what margin is achieved at a given price
 */
export function calculateMarginAtPrice(
  baseCost: number,
  sellingPrice: number
): {
  marginPercent: number;
  markupPercent: number;
  profitAmount: number;
  isViable: boolean;
} {
  const profitAmount = sellingPrice - baseCost;
  const marginPercent = (profitAmount / sellingPrice) * 100;
  const markupPercent = (profitAmount / baseCost) * 100;
  const isViable = marginPercent >= 10; // Minimum 10% margin considered viable
  
  return {
    marginPercent: parseFloat(marginPercent.toFixed(1)),
    markupPercent: parseFloat(markupPercent.toFixed(1)),
    profitAmount: parseFloat(profitAmount.toFixed(2)),
    isViable,
  };
}

/**
 * Calculate price needed to achieve target margin
 */
export function calculatePriceForMargin(
  baseCost: number,
  targetMarginPercent: number
): number {
  const marginFraction = targetMarginPercent / 100;
  const price = baseCost / (1 - marginFraction);
  return parseFloat(price.toFixed(2));
}

/**
 * Calculate discount impact on margin
 */
export function calculateDiscountImpact(
  originalPrice: number,
  baseCost: number,
  discountPercent: number
): {
  discountedPrice: number;
  originalMarginPercent: number;
  newMarginPercent: number;
  marginReduction: number;
  profitLoss: number;
} {
  const originalProfit = originalPrice - baseCost;
  const originalMarginPercent = (originalProfit / originalPrice) * 100;
  
  const discountedPrice = originalPrice * (1 - discountPercent / 100);
  const newProfit = discountedPrice - baseCost;
  const newMarginPercent = (newProfit / discountedPrice) * 100;
  
  const marginReduction = originalMarginPercent - newMarginPercent;
  const profitLoss = originalProfit - newProfit;
  
  return {
    discountedPrice: parseFloat(discountedPrice.toFixed(2)),
    originalMarginPercent: parseFloat(originalMarginPercent.toFixed(1)),
    newMarginPercent: parseFloat(newMarginPercent.toFixed(1)),
    marginReduction: parseFloat(marginReduction.toFixed(1)),
    profitLoss: parseFloat(profitLoss.toFixed(2)),
  };
}

