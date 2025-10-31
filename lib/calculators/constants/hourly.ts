/**
 * Hourly Cost Structure Constants
 * 
 * These are default/reference values for shop rate calculation.
 * Users should override with their actual local data for 100% accuracy.
 * 
 * Source: Industry averages from manufacturing cost accounting standards
 * Applicable to: Medium-scale laser cutting job shops (2-5 machines)
 */

export const EQUIPMENT_DEFAULTS = {
  // Equipment costs (USD)
  fiberLaser6kW: 150000,
  fiberLaser3kW: 100000,
  co2Laser4kW: 120000,
  
  // Lifespan (years)
  equipmentLifespan: 10,
  
  // Annual working hours
  annualWorkingHours: 2000, // 50 weeks × 40 hours
  
  // Utilization rates (%)
  cuttingTimePercentage: 65, // Actual cutting vs total time
  setupTimePercentage: 20,
  maintenanceTimePercentage: 5,
  idleTimePercentage: 10,
} as const;

export const LABOR_DEFAULTS = {
  // Hourly labor rates (USD/hour)
  operator: 25,
  supervisor: 40,
  programmer: 35,
  qualityInspector: 30,
  
  // Labor multipliers
  benefitsMultiplier: 1.35, // Includes benefits, taxes, insurance (35% overhead)
  trainingHoursPerYear: 40,
} as const;

export const ENERGY_DEFAULTS = {
  // Power consumption (kW)
  laser6kW_totalPower: 10, // Includes chiller, controls
  laser3kW_totalPower: 6,
  co2Laser4kW_totalPower: 25,
  
  // Electricity rates (USD/kWh) - regional averages
  electricityRate_us: 0.12,
  electricityRate_eu: 0.20,
  electricityRate_china: 0.08,
  
  // Cooling costs (additional %)
  coolingOverhead: 0.15, // 15% additional for facility cooling
} as const;

export const MAINTENANCE_DEFAULTS = {
  // Annual maintenance as % of equipment cost
  fiberLaser_annualMaintenance: 0.05, // 5% per year
  co2Laser_annualMaintenance: 0.08, // 8% per year
  
  // Consumables (USD per cutting hour)
  nozzles_perHour: 0.80,
  protectiveWindows_perHour: 0.30,
  focusLenses_perHour: 0.25,
  
  // Preventive maintenance
  preventiveService_annual: 3000, // USD per year
} as const;

export const FACILITY_DEFAULTS = {
  // Facility costs (USD per month)
  rent_perSquareFoot: 8, // Industrial space
  facilitySquareFootage: 5000, // Typical job shop
  
  // Utilities (monthly, USD)
  utilities_monthly: 1500,
  insurance_monthly: 2000,
  propertyTax_monthly: 800,
  
  // Convert to hourly
  monthlyToHourly: 173, // 2000 annual hours / 12 months ≈ 173 hours/month
} as const;

export const OVERHEAD_DEFAULTS = {
  // Management & administrative overhead (% of direct costs)
  managementOverheadRate: 0.20, // 20% of direct costs
  
  // Indirect costs (USD per month)
  officeStaff_monthly: 8000,
  salesMarketing_monthly: 4000,
  accounting_monthly: 2000,
  it_monthly: 1000,
  
  // Material handling & waste
  materialHandling_perHour: 2.0, // Forklift, storage
  wasteDisposal_perHour: 0.50,
} as const;

export const GAS_DEFAULTS = {
  // Assist gas costs (USD per m³)
  nitrogen_perCubicMeter: 1.50,
  oxygen_perCubicMeter: 0.20,
  air_perCubicMeter: 0.05, // Compressed air
  
  // Consumption rates (m³/hour) - typical ranges
  nitrogen_consumption_low: 0.5,
  nitrogen_consumption_high: 3.0,
  oxygen_consumption_low: 0.3,
  oxygen_consumption_high: 2.0,
  air_consumption: 1.0,
} as const;

/**
 * Calculate hourly equipment depreciation
 */
export function calculateDepreciationPerHour(
  equipmentCost: number,
  lifespanYears: number = EQUIPMENT_DEFAULTS.equipmentLifespan,
  annualHours: number = EQUIPMENT_DEFAULTS.annualWorkingHours
): number {
  return equipmentCost / (lifespanYears * annualHours);
}

/**
 * Calculate hourly facility cost
 */
export function calculateFacilityCostPerHour(
  rentPerMonth: number,
  utilitiesPerMonth: number = FACILITY_DEFAULTS.utilities_monthly,
  insurancePerMonth: number = FACILITY_DEFAULTS.insurance_monthly,
  propertyTaxPerMonth: number = FACILITY_DEFAULTS.propertyTax_monthly,
  hoursPerMonth: number = FACILITY_DEFAULTS.monthlyToHourly
): number {
  const totalMonthly = rentPerMonth + utilitiesPerMonth + insurancePerMonth + propertyTaxPerMonth;
  return totalMonthly / hoursPerMonth;
}

/**
 * Calculate total hourly overhead
 */
export function calculateOverheadPerHour(
  officeStaffMonthly: number = OVERHEAD_DEFAULTS.officeStaff_monthly,
  salesMarketingMonthly: number = OVERHEAD_DEFAULTS.salesMarketing_monthly,
  accountingMonthly: number = OVERHEAD_DEFAULTS.accounting_monthly,
  itMonthly: number = OVERHEAD_DEFAULTS.it_monthly,
  hoursPerMonth: number = FACILITY_DEFAULTS.monthlyToHourly
): number {
  const totalMonthly = officeStaffMonthly + salesMarketingMonthly + accountingMonthly + itMonthly;
  return totalMonthly / hoursPerMonth;
}

/**
 * Typical hourly cost breakdown for reference
 */
export const TYPICAL_HOURLY_BREAKDOWN = {
  depreciation: 7.5, // $150k / 10 years / 2000 hours
  labor: 33.75, // $25 × 1.35 (with benefits)
  energy: 1.2, // 10kW × $0.12
  maintenance: 1.5, // Consumables + service
  facility: 8.7, // Rent + utilities + insurance
  overhead: 8.7, // Office + admin
  gas: 2.0, // Nitrogen average
  total: 63.35, // Sum of above
} as const;

/**
 * Cost percentage ranges (for validation and recommendations)
 */
export const COST_PERCENTAGE_RANGES = {
  depreciation: { min: 10, max: 20, typical: 12 },
  labor: { min: 30, max: 50, typical: 40 },
  energy: { min: 2, max: 8, typical: 3 },
  maintenance: { min: 2, max: 5, typical: 3 },
  facility: { min: 8, max: 15, typical: 12 },
  overhead: { min: 10, max: 20, typical: 15 },
  gas: { min: 2, max: 8, typical: 4 },
} as const;

