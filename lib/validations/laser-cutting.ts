import { z } from 'zod';

export const laserCuttingSchema = z.object({
  // Material properties
  materialType: z.enum(['stainless_steel', 'aluminum', 'copper', 'mild_steel', 'brass'], {
    required_error: 'Material type is required',
  }),
  thickness: z
    .number({
      required_error: 'Thickness is required',
      invalid_type_error: 'Thickness must be a number',
    })
    .min(0.1, 'Thickness must be at least 0.1mm')
    .max(50, 'Thickness cannot exceed 50mm'),

  // Cutting parameters
  cuttingLength: z
    .number({
      required_error: 'Cutting length is required',
      invalid_type_error: 'Cutting length must be a number',
    })
    .min(1, 'Cutting length must be at least 1mm')
    .max(100000, 'Cutting length cannot exceed 100,000mm'),

  laserPower: z
    .number({
      required_error: 'Laser power is required',
      invalid_type_error: 'Laser power must be a number',
    })
    .min(0.5, 'Laser power must be at least 0.5kW')
    .max(30, 'Laser power cannot exceed 30kW'),

  // Cost parameters
  electricityRate: z
    .number({
      required_error: 'Electricity rate is required',
      invalid_type_error: 'Electricity rate must be a number',
    })
    .min(0.01, 'Electricity rate must be at least $0.01/kWh')
    .max(1, 'Electricity rate cannot exceed $1/kWh')
    .default(0.12),

  laborRate: z
    .number({
      required_error: 'Labor rate is required',
      invalid_type_error: 'Labor rate must be a number',
    })
    .min(1, 'Labor rate must be at least $1/hour')
    .max(200, 'Labor rate cannot exceed $200/hour')
    .default(25),

  materialPrice: z
    .number({
      required_error: 'Material price is required',
      invalid_type_error: 'Material price must be a number',
    })
    .min(0.1, 'Material price must be at least $0.1/kg')
    .max(1000, 'Material price cannot exceed $1000/kg')
    .default(5),

  // Gas parameters
  gasConsumption: z
    .number({
      invalid_type_error: 'Gas consumption must be a number',
    })
    .min(0, 'Gas consumption cannot be negative')
    .max(100, 'Gas consumption cannot exceed 100 m³/hour')
    .default(2),

  gasPrice: z
    .number({
      invalid_type_error: 'Gas price must be a number',
    })
    .min(0, 'Gas price cannot be negative')
    .max(50, 'Gas price cannot exceed $50/m³')
    .default(1.5),

  // Optional geometry + efficiency parameters
  partLength: z
    .number({
      invalid_type_error: 'Part length must be a number',
    })
    .min(1, 'Part length must be at least 1mm')
    .max(5000, 'Part length cannot exceed 5000mm')
    .default(500),

  partWidth: z
    .number({
      invalid_type_error: 'Part width must be a number',
    })
    .min(1, 'Part width must be at least 1mm')
    .max(5000, 'Part width cannot exceed 5000mm')
    .default(300),

  partArea: z
    .number()
    .min(1)
    .max(25000000) // up to 5000mm x 5000mm
    .optional(),

  materialUtilization: z
    .number()
    .min(0.1, 'Utilization must be at least 10%')
    .max(1, 'Utilization cannot exceed 100%')
    .default(0.85),

  // Optional: Equipment parameters
  equipmentCost: z
    .number()
    .min(0)
    .max(10000000)
    .default(150000)
    .optional(),

  equipmentLifespan: z
    .number()
    .min(1)
    .max(30)
    .default(10)
    .optional(),

  annualWorkingHours: z
    .number()
    .min(100)
    .max(8760)
    .default(2000)
    .optional(),
});

export type LaserCuttingInput = z.infer<typeof laserCuttingSchema>;

// Default values for quick calculations
// ⚠️ IMPORTANT: These are EXAMPLE VALUES ONLY for demonstration purposes.
// Actual values vary significantly by region, equipment, and market conditions.
// Users should replace these with their own shop-specific data for accurate estimates.
export const laserCuttingDefaults: Partial<LaserCuttingInput> = {
  materialType: 'stainless_steel',
  thickness: 3,                    // Example: 3mm sheet (common thickness)
  cuttingLength: 1000,             // Example: 1 meter total cut path
  partLength: 500,                 // Example: 500mm part dimension
  partWidth: 300,                  // Example: 300mm part dimension
  laserPower: 3,                   // Example: 3kW fiber laser (common mid-range)
  electricityRate: 0.12,           // Example rate (varies by region: typically $0.08-0.25)
  laborRate: 25,                   // Example rate (varies widely by region and skill level)
  materialPrice: 5,                // Example: ~$5/kg for 304 stainless (market-dependent)
  gasConsumption: 2,               // Example: 2 m³/hr (depends on nozzle size and pressure)
  gasPrice: 1.5,                   // Example: $1.5/m³ (varies by gas type and supplier)
  materialUtilization: 0.85,       // Example: 85% nesting efficiency (typical range 70-90%)
  equipmentCost: 150000,           // Example: entry-level fiber laser system
  equipmentLifespan: 10,           // Example: 10 years (varies by usage and maintenance)
  annualWorkingHours: 2000,        // Example: single-shift operation (2000 hrs/year)
};






