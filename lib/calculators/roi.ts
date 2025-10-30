import type { ROIInput } from '../validations/roi';

export interface ROIResult {
  // Investment
  totalInvestment: number;
  financedAmount: number;
  downPaymentAmount: number;

  // Monthly cash flow
  monthlyRevenue: number;
  monthlyProfit: number;

  // Payback analysis
  paybackPeriodMonths: number;
  paybackPeriodYears: number;
  breakEvenMonth: number;

  // ROI metrics
  simpleROI: number; // percentage
  annualROI: number; // percentage
  totalROI5Year: number; // percentage

  // NPV & IRR
  npv: number;
  irr: number; // percentage

  // Cumulative projections
  yearlyProjections: {
    year: number;
    revenue: number;
    costs: number;
    profit: number;
    cumulativeProfit: number;
    roi: number;
  }[];

  // Monthly projections (for charts)
  monthlyProjections: {
    month: number;
    revenue: number;
    costs: number;
    profit: number;
    cumulativeCashFlow: number;
  }[];
}

/**
 * Calculate ROI, NPV, IRR, and payback period
 */
export function calculateROI(input: ROIInput): ROIResult {
  // 1. Calculate total investment
  const totalInvestment = input.equipmentCost + input.installationCost;
  const downPaymentAmount = totalInvestment * (input.downPayment / 100);
  const financedAmount = totalInvestment - downPaymentAmount;

  // 2. Calculate monthly cash flows
  const monthlyRevenue = input.monthlyProduction * input.pricePerUnit;
  const monthlyFinancingCost = input.financingRate > 0
    ? (financedAmount * (input.financingRate / 100)) / 12
    : 0;
  const monthlyTotalCost = input.monthlyOperatingCost + monthlyFinancingCost;
  const monthlyProfit = monthlyRevenue - monthlyTotalCost;

  // 3. Calculate payback period
  let cumulativeCashFlow = -downPaymentAmount;
  let paybackMonth = 0;
  const monthlyGrowthRate = Math.pow(1 + input.annualGrowthRate / 100, 1 / 12) - 1;

  const monthlyProjections: ROIResult['monthlyProjections'] = [];

  for (let month = 1; month <= input.analysisYears * 12; month++) {
    const growthFactor = Math.pow(1 + monthlyGrowthRate, month - 1);
    const adjustedRevenue = monthlyRevenue * growthFactor;
    const adjustedProfit = adjustedRevenue - monthlyTotalCost;

    cumulativeCashFlow += adjustedProfit;

    monthlyProjections.push({
      month,
      revenue: parseFloat(adjustedRevenue.toFixed(2)),
      costs: parseFloat(monthlyTotalCost.toFixed(2)),
      profit: parseFloat(adjustedProfit.toFixed(2)),
      cumulativeCashFlow: parseFloat(cumulativeCashFlow.toFixed(2)),
    });

    if (paybackMonth === 0 && cumulativeCashFlow >= 0) {
      paybackMonth = month;
    }
  }

  const paybackPeriodMonths = paybackMonth;
  const paybackPeriodYears = parseFloat((paybackMonth / 12).toFixed(2));

  // 4. Calculate yearly projections
  const yearlyProjections: ROIResult['yearlyProjections'] = [];
  let cumulativeProfit = -downPaymentAmount;

  for (let year = 1; year <= input.analysisYears; year++) {
    const growthFactor = Math.pow(1 + input.annualGrowthRate / 100, year - 1);
    const yearRevenue = monthlyRevenue * 12 * growthFactor;
    const yearCosts = monthlyTotalCost * 12;
    const yearProfit = yearRevenue - yearCosts;

    cumulativeProfit += yearProfit;
    const roi = (cumulativeProfit / totalInvestment) * 100;

    yearlyProjections.push({
      year,
      revenue: parseFloat(yearRevenue.toFixed(2)),
      costs: parseFloat(yearCosts.toFixed(2)),
      profit: parseFloat(yearProfit.toFixed(2)),
      cumulativeProfit: parseFloat(cumulativeProfit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
    });
  }

  // 5. Calculate simple ROI
  const totalProfit5Year = yearlyProjections.reduce((sum, year) => sum + year.profit, 0);
  const totalROI5Year = (totalProfit5Year / totalInvestment) * 100;
  const annualROI = totalROI5Year / input.analysisYears;
  const simpleROI = (monthlyProfit * 12 / totalInvestment) * 100;

  // 6. Calculate NPV (Net Present Value)
  const discountRate = input.discountRate / 100;
  let npv = -downPaymentAmount;

  for (let month = 1; month <= input.analysisYears * 12; month++) {
    const projection = monthlyProjections[month - 1];
    const discountFactor = Math.pow(1 + discountRate / 12, month);
    npv += projection.profit / discountFactor;
  }

  // 7. Calculate IRR (Internal Rate of Return) using Newton-Raphson method
  const irr = calculateIRR(downPaymentAmount, monthlyProjections);

  return {
    // Investment
    totalInvestment: parseFloat(totalInvestment.toFixed(2)),
    financedAmount: parseFloat(financedAmount.toFixed(2)),
    downPaymentAmount: parseFloat(downPaymentAmount.toFixed(2)),

    // Monthly
    monthlyRevenue: parseFloat(monthlyRevenue.toFixed(2)),
    monthlyProfit: parseFloat(monthlyProfit.toFixed(2)),

    // Payback
    paybackPeriodMonths,
    paybackPeriodYears,
    breakEvenMonth: paybackMonth,

    // ROI metrics
    simpleROI: parseFloat(simpleROI.toFixed(2)),
    annualROI: parseFloat(annualROI.toFixed(2)),
    totalROI5Year: parseFloat(totalROI5Year.toFixed(2)),

    // NPV & IRR
    npv: parseFloat(npv.toFixed(2)),
    irr: parseFloat(irr.toFixed(2)),

    // Projections
    yearlyProjections,
    monthlyProjections,
  };
}

/**
 * Calculate IRR using Newton-Raphson method
 */
function calculateIRR(
  initialInvestment: number,
  cashFlows: { profit: number }[]
): number {
  let irr = 0.1; // Start with 10% guess
  const maxIterations = 100;
  const tolerance = 0.0001;

  for (let i = 0; i < maxIterations; i++) {
    let npv = -initialInvestment;
    let derivative = 0;

    cashFlows.forEach((cf, month) => {
      const period = month + 1;
      const discountFactor = Math.pow(1 + irr / 12, period);
      npv += cf.profit / discountFactor;
      derivative -= (period * cf.profit) / (12 * Math.pow(1 + irr / 12, period + 1));
    });

    const newIrr = irr - npv / derivative;

    if (Math.abs(newIrr - irr) < tolerance) {
      return newIrr * 100; // Convert to percentage
    }

    irr = newIrr;

    // Prevent infinite loop with bad data
    if (isNaN(irr) || !isFinite(irr)) {
      return 0;
    }
  }

  return irr * 100; // Convert to percentage
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

