import { z } from 'zod';

export const materialUtilizationSchema = z.object({
  // Sheet dimensions
  sheetLength: z
    .number({ required_error: 'Sheet length is required' })
    .min(100, 'Sheet length must be at least 100mm')
    .max(10000, 'Sheet length cannot exceed 10,000mm'),

  sheetWidth: z
    .number({ required_error: 'Sheet width is required' })
    .min(100, 'Sheet width must be at least 100mm')
    .max(10000, 'Sheet width cannot exceed 10,000mm'),

  // Part dimensions
  partLength: z
    .number({ required_error: 'Part length is required' })
    .min(1, 'Part length must be at least 1mm')
    .max(5000, 'Part length cannot exceed 5,000mm'),

  partWidth: z
    .number({ required_error: 'Part width is required' })
    .min(1, 'Part width must be at least 1mm')
    .max(5000, 'Part width cannot exceed 5,000mm'),

  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(10000, 'Quantity cannot exceed 10,000'),

  // Cutting parameters
  kerf: z
    .number()
    .min(0, 'Kerf cannot be negative')
    .max(10, 'Kerf cannot exceed 10mm')
    .default(0.3),

  edgeMargin: z
    .number()
    .min(0, 'Edge margin cannot be negative')
    .max(100, 'Edge margin cannot exceed 100mm')
    .default(5),

  partSpacing: z
    .number()
    .min(0, 'Part spacing cannot be negative')
    .max(50, 'Part spacing cannot exceed 50mm')
    .default(2),

  allowRotation: z.boolean().default(true),

  // Material & cost
  materialType: z.enum(['steel', 'stainless_steel', 'aluminum', 'copper', 'brass'], {
    required_error: 'Material type is required',
  }),

  materialThickness: z
    .number({ required_error: 'Material thickness is required' })
    .min(0.5, 'Thickness must be at least 0.5mm')
    .max(50, 'Thickness cannot exceed 50mm'),

  materialPricePerKg: z
    .number({ required_error: 'Material price is required' })
    .min(0.1, 'Material price must be at least $0.1/kg')
    .max(1000, 'Material price cannot exceed $1000/kg'),

  scrapValuePerKg: z
    .number()
    .min(0, 'Scrap value cannot be negative')
    .max(1000, 'Scrap value cannot exceed $1000/kg')
    .default(0.5),
});

export type MaterialUtilizationInput = z.infer<typeof materialUtilizationSchema>;

export const materialUtilizationDefaults: Partial<MaterialUtilizationInput> = {
  sheetLength: 3000,
  sheetWidth: 1500,
  partLength: 200,
  partWidth: 100,
  quantity: 50,
  kerf: 0.3,
  edgeMargin: 5,
  partSpacing: 2,
  allowRotation: true,
  materialType: 'steel',
  materialThickness: 3,
  materialPricePerKg: 3,
  scrapValuePerKg: 0.5,
};


