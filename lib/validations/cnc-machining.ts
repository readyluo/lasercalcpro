import { z } from 'zod';

export const cncMachiningSchema = z.object({
  // Part dimensions
  partLength: z
    .number({ required_error: 'Part length is required' })
    .min(1, 'Part length must be at least 1mm')
    .max(5000, 'Part length cannot exceed 5000mm'),

  partWidth: z
    .number({ required_error: 'Part width is required' })
    .min(1, 'Part width must be at least 1mm')
    .max(5000, 'Part width cannot exceed 5000mm'),

  partHeight: z
    .number({ required_error: 'Part height is required' })
    .min(1, 'Part height must be at least 1mm')
    .max(1000, 'Part height cannot exceed 1000mm'),

  // Material
  materialType: z.enum(['aluminum', 'steel', 'stainless_steel', 'brass', 'plastic'], {
    required_error: 'Material type is required',
  }),

  materialPrice: z
    .number()
    .min(0.1, 'Material price must be at least $0.1/kg')
    .max(1000, 'Material price cannot exceed $1000/kg')
    .default(5),

  // Machining parameters
  machiningTime: z
    .number({ required_error: 'Machining time is required' })
    .min(0.1, 'Machining time must be at least 0.1 hours')
    .max(100, 'Machining time cannot exceed 100 hours'),

  setupTime: z
    .number()
    .min(0.1, 'Setup time must be at least 0.1 hours')
    .max(10, 'Setup time cannot exceed 10 hours')
    .default(0.5),

  // Batch parameters
  batchSize: z
    .number()
    .int('Batch size must be a whole number')
    .min(1, 'Batch size must be at least 1')
    .max(10000, 'Batch size cannot exceed 10,000')
    .default(1),

  // Tooling
  toolCost: z
    .number()
    .min(0, 'Tool cost cannot be negative')
    .max(10000, 'Tool cost cannot exceed $10,000')
    .default(100),

  toolLife: z
    .number()
    .int('Tool life must be a whole number')
    .min(1, 'Tool life must be at least 1 part')
    .max(10000, 'Tool life cannot exceed 10,000 parts')
    .default(100),

  // Cost parameters
  machineRate: z
    .number()
    .min(1, 'Machine rate must be at least $1/hour')
    .max(500, 'Machine rate cannot exceed $500/hour')
    .default(75),

  laborRate: z
    .number()
    .min(1, 'Labor rate must be at least $1/hour')
    .max(200, 'Labor rate cannot exceed $200/hour')
    .default(30),

  overheadRate: z
    .number()
    .min(0, 'Overhead rate cannot be negative')
    .max(100, 'Overhead rate cannot exceed 100%')
    .default(15),
});

export type CNCMachiningInput = z.infer<typeof cncMachiningSchema>;

// Default values for quick calculations
// ⚠️ IMPORTANT: These are EXAMPLE VALUES ONLY for demonstration.
// Actual values vary significantly by shop, region, equipment, and part complexity.
// Users should input their own shop-specific data for accurate cost estimates.
export const cncMachiningDefaults: Partial<CNCMachiningInput> = {
  partLength: 100,              // Example: 100mm (small to medium part)
  partWidth: 50,                // Example: 50mm
  partHeight: 25,               // Example: 25mm (suitable for 3-axis milling)
  materialType: 'aluminum',     // Example: aluminum (easy to machine)
  materialPrice: 5,             // Example: ~$5/kg (varies by alloy grade and market)
  machiningTime: 2,             // Example: 2 hours cycle time (highly part-dependent)
  setupTime: 0.5,               // Example: 30 minutes (varies by job complexity)
  batchSize: 1,                 // Example: prototype/single piece
  toolCost: 100,                // Example: set of carbide tools ($50-$200 typical)
  toolLife: 100,                // Example: 100 parts per tool set (varies widely)
  machineRate: 75,              // Example: mid-range 3-axis mill (range: $50-150/hr)
  laborRate: 30,                // Example: skilled machinist (region and skill dependent)
  overheadRate: 15,             // Example: 15% overhead (shop-specific, often 10-30%)
}









