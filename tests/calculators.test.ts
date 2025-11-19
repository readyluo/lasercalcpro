import test from 'node:test';
import assert from 'node:assert/strict';
import {
  laserCuttingSchema,
  laserCuttingDefaults,
  type LaserCuttingInput,
} from '../lib/validations/laser-cutting';
import {
  materialUtilizationSchema,
  materialUtilizationDefaults,
} from '../lib/validations/material-utilization';
import { energySchema, energyDefaults } from '../lib/validations/energy';
import { roiSchema, roiDefaults } from '../lib/validations/roi';
import { weldingCalculatorSchema } from '../lib/validations/welding';
import { calculateLaserCutting } from '../lib/calculators/laser-cutting';
import { calculateMaterialUtilization } from '../lib/calculators/material-utilization';
import { calculateEnergy } from '../lib/calculators/energy';
import { calculateROI } from '../lib/calculators/roi';
import { calculateWelding } from '../lib/calculators/welding';

test('laser cutting uses realistic material cost', () => {
  const input = laserCuttingSchema.parse({
    ...laserCuttingDefaults,
    partLength: 600,
    partWidth: 400,
    materialType: 'stainless_steel',
    thickness: 4,
    cuttingLength: 1200,
    laserPower: 6,
    materialPrice: 6,
  } satisfies Partial<LaserCuttingInput>);

  const result = calculateLaserCutting(input);
  assert.ok(result.materialCost > 20);
  assert.ok(result.costPerMeter > 0);
});

test('material utilization kerf recommendation returns numeric savings', () => {
  const input = materialUtilizationSchema.parse({
    ...materialUtilizationDefaults,
    kerf: 0.8,
    quantity: 40,
  });

  const result = calculateMaterialUtilization(input);
  const kerfRecommendation = result.recommendations.find(
    rec => rec.title === 'Optimize Cutting Process'
  );

  assert.ok(kerfRecommendation);
  assert.ok((kerfRecommendation?.potentialSavings ?? 0) > 0);
});

test('energy calculator keeps cost ratios consistent', () => {
  const input = energySchema.parse({
    ...energyDefaults,
    ratedPower: 5,
    averageLoad: 80,
    dailyOperatingHours: 6,
    operatingDaysPerWeek: 5,
    weeksPerYear: 48,
    peakHoursPercentage: 40,
    peakRatePremium: 15,
  });

  const result = calculateEnergy(input);
  assert.ok(
    Math.abs(result.weeklyCost - result.dailyCost * input.operatingDaysPerWeek) < 0.05
  );
  assert.ok(Math.abs(result.annualCost - result.weeklyCost * input.weeksPerYear) < 0.5);
});

test('ROI model includes loan repayment', () => {
  const input = roiSchema.parse({
    ...roiDefaults,
    equipmentCost: 300000,
    installationCost: 20000,
    monthlyProduction: 900,
    pricePerUnit: 180,
    monthlyOperatingCost: 60000,
    financingRate: 8,
    downPayment: 20,
    loanTermYears: 3,
    analysisYears: 5,
  });

  const result = calculateROI(input);
  assert.ok((result.monthlyProjections[0]?.costs ?? 0) > input.monthlyOperatingCost);
  assert.ok(result.paybackPeriodMonths > 0);
  assert.ok(result.npv > 0);
  assert.equal(result.loanTermYears, 3);
  assert.equal(result.loanTermMonths, 36);
});

test('welding calculator returns profitable recommendation', () => {
  const input = weldingCalculatorSchema.parse({
    weldingProcess: 'seam',
    materialType: 'mild_steel',
    jointType: 'butt_joint',
    materialThicknessMm: 2,
    weldLengthMm: 400,
    numberOfWelds: 2,
    weldSpeedMmPerSec: 25,
    laserPowerWatts: 1200,
    equipmentCost: 120000,
    equipmentLifespanYears: 8,
    annualWorkingHours: 1800,
    electricityRatePerKwh: 0.15,
    shieldingGasType: 'argon',
    gasFlowRateLPerMin: 12,
    gasCostPerM3: 40,
    laborRatePerHour: 40,
    overheadRatePerHour: 12,
    maintenanceRatePerHour: 6,
    requiresPreheat: false,
    requiresPostHeatTreatment: false,
    qualityInspectionTimeMin: 2,
    setupTimePerBatchMin: 10,
    quantityPerBatch: 5,
  });

  const result = calculateWelding(input);
  assert.ok(result.recommendedPrice > result.costPerPiece);
  assert.ok(result.piecesPerHour > 0);
});
