import { z } from 'zod';

export const pricePerMeterSchema = z.object({
  materialType: z.enum(['stainless_steel', 'aluminum', 'copper', 'mild_steel', 'brass']),
  thickness: z.number().min(0.1).max(50),
  electricityRate: z.number().min(0.01).max(1).default(0.12),
  laborRate: z.number().min(1).max(200).default(25),
  laserPower: z.number().min(0.5).max(30).default(3),
});

export type PricePerMeterInput = z.infer<typeof pricePerMeterSchema>;

export const hourlyRateSchema = z.object({
  equipmentCost: z.number().min(10000).max(2000000).default(150000),
  lifespanYears: z.number().min(1).max(20).default(10),
  annualHours: z.number().min(100).max(8760).default(2000),
  electricityRate: z.number().min(0.01).max(1).default(0.12),
  totalPowerKw: z.number().min(1).max(60).default(10),
  laborRate: z.number().min(1).max(200).default(25),
  consumablesPerHour: z.number().min(0).max(100).default(2),
  maintenanceReservePerHour: z.number().min(0).max(100).default(3),
  overheadPerHour: z.number().min(0).max(200).default(8),
});

export type HourlyRateInput = z.infer<typeof hourlyRateSchema>;




