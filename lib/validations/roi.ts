import { z } from 'zod';

export const roiSchema = z.object({
  // Equipment investment
  equipmentCost: z
    .number({ required_error: 'Equipment cost is required' })
    .min(1000, 'Equipment cost must be at least $1,000')
    .max(10000000, 'Equipment cost cannot exceed $10,000,000'),

  installationCost: z
    .number()
    .min(0, 'Installation cost cannot be negative')
    .max(1000000, 'Installation cost cannot exceed $1,000,000')
    .default(0),

  // Revenue parameters
  monthlyProduction: z
    .number({ required_error: 'Monthly production is required' })
    .int('Monthly production must be a whole number')
    .min(1, 'Monthly production must be at least 1 part')
    .max(1000000, 'Monthly production cannot exceed 1,000,000 parts'),

  pricePerUnit: z
    .number({ required_error: 'Price per unit is required' })
    .min(0.01, 'Price per unit must be at least $0.01')
    .max(100000, 'Price per unit cannot exceed $100,000'),

  // Operating costs
  monthlyOperatingCost: z
    .number({ required_error: 'Monthly operating cost is required' })
    .min(0, 'Monthly operating cost cannot be negative')
    .max(10000000, 'Monthly operating cost cannot exceed $10,000,000'),

  // Growth & financing
  annualGrowthRate: z
    .number()
    .min(-50, 'Annual growth rate cannot be less than -50%')
    .max(100, 'Annual growth rate cannot exceed 100%')
    .default(5),

  financingRate: z
    .number()
    .min(0, 'Financing rate cannot be negative')
    .max(30, 'Financing rate cannot exceed 30%')
    .default(0),

  downPayment: z
    .number()
    .min(0, 'Down payment cannot be negative')
    .max(100, 'Down payment cannot exceed 100%')
    .default(20),

  loanTermYears: z
    .number()
    .int('Loan term must be a whole number')
    .min(1, 'Loan term must be at least 1 year')
    .max(20, 'Loan term cannot exceed 20 years')
    .default(5),

  // Analysis parameters
  analysisYears: z
    .number()
    .int('Analysis years must be a whole number')
    .min(1, 'Analysis years must be at least 1')
    .max(20, 'Analysis years cannot exceed 20')
    .default(5),

  discountRate: z
    .number()
    .min(0, 'Discount rate cannot be negative')
    .max(50, 'Discount rate cannot exceed 50%')
    .default(10),
});

export type ROIInput = z.infer<typeof roiSchema>;

export const roiDefaults: Partial<ROIInput> = {
  equipmentCost: 150000,
  installationCost: 5000,
  monthlyProduction: 500,
  pricePerUnit: 50,
  monthlyOperatingCost: 8000,
  annualGrowthRate: 5,
  financingRate: 0,
  downPayment: 20,
  loanTermYears: 5,
  analysisYears: 5,
  discountRate: 10,
};








