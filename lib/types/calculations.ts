export const CALCULATION_TOOL_TYPES = [
  'laser-cutting',
  'cnc-machining',
  'roi',
  'energy',
  'material-utilization',
  'welding',
] as const;

export type CalculationToolType = typeof CALCULATION_TOOL_TYPES[number];
