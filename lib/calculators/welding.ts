import type { WeldingCalculatorInput } from '../validations/welding';
import {
  SPOT_WELD_TIME_TABLE,
  WELDING_SPEED_TABLE,
  getWeldingPowerEfficiency,
} from '../validations/welding';

export interface WeldingResult {
  // Time calculations
  weldSpeedMmPerSec: number;
  weldTimePerPieceSec: number;
  setupTimePerPieceMin: number;
  totalTimePerPieceSec: number;
  totalBatchTimeSec: number;
  totalBatchTimeFormatted: string;

  // Cost calculations
  depreciationPerHour: number;
  electricityPerHour: number;
  gasCostPerHour: number;
  totalHourlyCost: number;
  costPerPiece: number;
  totalBatchCost: number;

  // Pricing
  profitMargin: number;
  recommendedPrice: number;

  // Efficiency
  piecesPerHour: number;
  revenuePerHour: number;
  utilizationRate: number;
}

const WELDING_PROFIT_MARGIN = 0.4; // 40%

function formatBatchTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export function calculateWelding(input: WeldingCalculatorInput): WeldingResult {
  let weldSpeed: number;
  if (input.weldingProcess === 'spot') {
    const timePerSpot = SPOT_WELD_TIME_TABLE[input.materialType](input.materialThicknessMm);
    weldSpeed = 5 / timePerSpot; // assume 5mm spacing
  } else {
    const speedFunc = WELDING_SPEED_TABLE[input.materialType][input.weldingProcess];
    weldSpeed = speedFunc(input.materialThicknessMm, input.laserPowerWatts);
  }

  const weldTimePerPiece = (input.weldLengthMm / weldSpeed) * input.numberOfWelds;
  const setupTimePerPieceMin = input.setupTimePerBatchMin / input.quantityPerBatch;

  let additionalTimeMin = input.qualityInspectionTimeMin;
  if (input.requiresPreheat) additionalTimeMin += 5;
  if (input.requiresPostHeatTreatment) additionalTimeMin += 10;

  const totalTimePerPiece = weldTimePerPiece + (setupTimePerPieceMin + additionalTimeMin) * 60;
  const totalBatchTime = totalTimePerPiece * input.quantityPerBatch;

  const depreciationPerHour =
    input.equipmentCost / (input.equipmentLifespanYears * input.annualWorkingHours);

  const powerEfficiency = getWeldingPowerEfficiency(input.laserPowerWatts);
  const electricityPerHour =
    (input.laserPowerWatts / 1000) * (input.electricityRatePerKwh / powerEfficiency);

  const gasCostPerHour =
    input.shieldingGasType === 'none'
      ? 0
      : (input.gasFlowRateLPerMin * 60 * input.gasCostPerM3) / 1000;

  const totalHourlyCost =
    depreciationPerHour +
    electricityPerHour +
    gasCostPerHour +
    input.laborRatePerHour +
    input.overheadRatePerHour +
    input.maintenanceRatePerHour;

  const costPerPiece = (totalTimePerPiece / 3600) * totalHourlyCost;
  const totalBatchCost = costPerPiece * input.quantityPerBatch;

  const recommendedPrice = costPerPiece / (1 - WELDING_PROFIT_MARGIN);
  const piecesPerHour = 3600 / totalTimePerPiece;
  const revenuePerHour = piecesPerHour * recommendedPrice;
  const utilizationRate = (weldTimePerPiece / totalTimePerPiece) * 100;

  return {
    weldSpeedMmPerSec: Number(weldSpeed.toFixed(1)),
    weldTimePerPieceSec: Number(weldTimePerPiece.toFixed(1)),
    setupTimePerPieceMin: Number(setupTimePerPieceMin.toFixed(2)),
    totalTimePerPieceSec: Number(totalTimePerPiece.toFixed(1)),
    totalBatchTimeSec: Number(totalBatchTime.toFixed(1)),
    totalBatchTimeFormatted: formatBatchTime(totalBatchTime),
    depreciationPerHour: Number(depreciationPerHour.toFixed(2)),
    electricityPerHour: Number(electricityPerHour.toFixed(2)),
    gasCostPerHour: Number(gasCostPerHour.toFixed(2)),
    totalHourlyCost: Number(totalHourlyCost.toFixed(2)),
    costPerPiece: Number(costPerPiece.toFixed(2)),
    totalBatchCost: Number(totalBatchCost.toFixed(2)),
    profitMargin: Number((WELDING_PROFIT_MARGIN * 100).toFixed(0)),
    recommendedPrice: Number(recommendedPrice.toFixed(2)),
    piecesPerHour: Number(piecesPerHour.toFixed(1)),
    revenuePerHour: Number(revenuePerHour.toFixed(2)),
    utilizationRate: Number(utilizationRate.toFixed(1)),
  };
}
