import { z } from 'zod';

export const energySchema = z.object({
  // Equipment parameters
  equipmentType: z.enum(['laser_cutter', 'cnc_mill', 'plasma_cutter', 'waterjet', 'other'], {
    required_error: 'Equipment type is required',
  }),

  ratedPower: z
    .number({ required_error: 'Rated power is required' })
    .min(0.1, 'Rated power must be at least 0.1 kW')
    .max(500, 'Rated power cannot exceed 500 kW'),

  averageLoad: z
    .number()
    .min(10, 'Average load must be at least 10%')
    .max(100, 'Average load cannot exceed 100%')
    .default(75),

  // Usage patterns
  dailyOperatingHours: z
    .number({ required_error: 'Daily operating hours is required' })
    .min(0.1, 'Operating hours must be at least 0.1 hours')
    .max(24, 'Operating hours cannot exceed 24 hours')
    .default(8),

  operatingDaysPerWeek: z
    .number()
    .int('Operating days must be a whole number')
    .min(1, 'Operating days must be at least 1')
    .max(7, 'Operating days cannot exceed 7')
    .default(5),

  weeksPerYear: z
    .number()
    .int('Weeks per year must be a whole number')
    .min(1, 'Weeks per year must be at least 1')
    .max(52, 'Weeks per year cannot exceed 52')
    .default(50),

  // Energy costs
  electricityRate: z
    .number({ required_error: 'Electricity rate is required' })
    .min(0.01, 'Electricity rate must be at least $0.01/kWh')
    .max(1, 'Electricity rate cannot exceed $1/kWh')
    .default(0.12),

  peakRatePremium: z
    .number()
    .min(0, 'Peak rate premium cannot be negative')
    .max(200, 'Peak rate premium cannot exceed 200%')
    .default(30),

  peakHoursPercentage: z
    .number()
    .min(0, 'Peak hours percentage cannot be negative')
    .max(100, 'Peak hours percentage cannot exceed 100%')
    .default(40),

  // Auxiliary systems
  coolingSystemPower: z
    .number()
    .min(0, 'Cooling system power cannot be negative')
    .max(100, 'Cooling system power cannot exceed 100 kW')
    .default(3),

  extractionSystemPower: z
    .number()
    .min(0, 'Extraction system power cannot be negative')
    .max(50, 'Extraction system power cannot exceed 50 kW')
    .default(2),

  // Carbon footprint
  gridCarbonIntensity: z
    .number()
    .min(0, 'Carbon intensity cannot be negative')
    .max(2000, 'Carbon intensity cannot exceed 2000 g CO₂/kWh')
    .default(400),
});

export type EnergyInput = z.infer<typeof energySchema>;

export const energyDefaults: Partial<EnergyInput> = {
  equipmentType: 'laser_cutter',
  ratedPower: 6,
  averageLoad: 75,
  dailyOperatingHours: 8,
  operatingDaysPerWeek: 5,
  weeksPerYear: 50,
  electricityRate: 0.12,
  peakRatePremium: 30,
  peakHoursPercentage: 40,
  coolingSystemPower: 3,
  extractionSystemPower: 2,
  gridCarbonIntensity: 400,
};

