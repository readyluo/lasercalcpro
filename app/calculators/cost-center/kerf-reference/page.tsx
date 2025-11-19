'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Calculator as CalculatorIcon, RotateCcw, Ruler } from 'lucide-react';
import { kerfReferenceSchema, kerfReferenceDefaults, type KerfReferenceInput } from '@/lib/validations/cost-center';
import { KERF_WIDTH_MATRIX, getKerfWidth, getRecommendedNozzle, calculateKerfMaterialLoss } from '@/lib/calculators/constants/kerf';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

const materialOptions = [
  { value: 'mild_steel', label: 'Mild Steel - Example kerf widths in this reference' },
  { value: 'stainless_steel', label: 'Stainless Steel - Often slightly wider kerf in these examples' },
  { value: 'aluminum', label: 'Aluminum - Example cases where narrower kerf is possible' },
  { value: 'copper_brass', label: 'Copper/Brass - Reflective materials with specialized settings' },
];

const nozzleOptions = [
  { value: '1.0mm_nozzle', label: '1.0mm - Often used for thin materials and precision work' },
  { value: '1.5mm_nozzle', label: '1.5mm - Common around 1-3mm materials in this reference' },
  { value: '2.0mm_nozzle', label: '2.0mm - General purpose; examples shown for ~2-8mm' },
  { value: '2.5mm_nozzle', label: '2.5mm - Frequently used in the mid-thickness range' },
  { value: '3.0mm_nozzle', label: '3.0mm - Example for thicker plate in this kerf table' },
  { value: '3.5mm_nozzle', label: '3.5mm - Larger nozzle option for heavier sections' },
  { value: '4.0mm_nozzle', label: '4.0mm - Heavy material example; confirm in your cut charts' },
];

export default function KerfReferencePage() {
  const [kerfWidth, setKerfWidth] = React.useState<number | null>(null);
  const [loss, setLoss] = React.useState<{ volumeLossCm3: number; massLossKg: number; linearAreaLossCm2: number } | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Kerf Width Reference',
    'Look up reference kerf width estimates for your material, thickness and nozzle, and estimate material loss per meter based on those assumptions.',
    [
      { name: 'Select Material & Thickness', text: 'Choose your material and enter the thickness in millimeters.' },
      { name: 'Select Nozzle', text: 'Pick the nozzle diameter. Use the recommended list as guidance.' },
      { name: 'Optional: Length', text: 'Enter cutting length to estimate material loss due to kerf.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'Is kerf width exact?',
      answer:
        'No. Kerf varies with power, speed, focus, gas, and machine condition. The values here are internal reference points from the kerf table; always validate with test cuts on your own machine before relying on a specific kerf value for tight tolerances.',
    },
    {
      question: 'Which nozzle should I use?',
      answer:
        'The recommended nozzle list is a starting point based on thickness bands in this reference. Final nozzle choice should be made using your machine manual, cut charts, and trial cuts to balance edge quality, speed, and stability for your process.',
    },
  ]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<KerfReferenceInput>({
    resolver: zodResolver(kerfReferenceSchema),
    defaultValues: kerfReferenceDefaults,
  });

  const onSubmit = (data: KerfReferenceInput) => {
    const width = getKerfWidth(data.material, data.thickness, data.nozzleDiameter);
    setKerfWidth(width);
    if (width && data.cuttingLengthMeters && data.cuttingLengthMeters > 0) {
      setLoss(calculateKerfMaterialLoss(width, data.cuttingLengthMeters, data.thickness));
    } else {
      setLoss(null);
    }
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    reset(kerfReferenceDefaults);
    setKerfWidth(null);
    setLoss(null);
  };

  const recommendedNozzles = getRecommendedNozzle(watch('thickness'));

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Kerf Width Reference</h1>
            <p className="text-base text-gray-600">View kerf width estimates by material, thickness and nozzle, and approximate material loss.</p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-slate-500 bg-slate-50 px-4 py-3">
            <p className="text-sm text-slate-900">
              <Ruler className="mr-2 inline h-4 w-4" />
              <strong>Reference Data:</strong> Values from typical ranges. Actual kerf depends on machine, focus, gas pressure, and speed. Always verify with test cuts for your setup.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Lookup</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Select 
                      {...register('material')} 
                      label="Material" 
                      options={materialOptions}
                      helperText="Material type affects kerf width"
                      error={errors.material?.message} 
                      required 
                    />
                    <Input 
                      {...register('thickness', { valueAsNumber: true })} 
                      type="number" 
                      step="0.1" 
                      label="Thickness (mm)" 
                      placeholder="e.g., 3.0"
                      helperText="Material thickness"
                      error={errors.thickness?.message} 
                      required 
                    />
                    <Select 
                      {...register('nozzleDiameter')} 
                      label="Nozzle Diameter" 
                      options={nozzleOptions}
                      helperText="In this reference, larger nozzles are associated with wider kerf values"
                      error={errors.nozzleDiameter?.message} 
                      required 
                    />
                    <Input 
                      {...register('cuttingLengthMeters', { valueAsNumber: true })} 
                      type="number" 
                      step="0.1" 
                      label="Cutting Length (m, optional)" 
                      placeholder="e.g., 10"
                      helperText="For material loss calculation"
                      error={errors.cuttingLengthMeters?.message} 
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" leftIcon={<CalculatorIcon className="h-5 w-5" />}>Look Up Kerf Width</Button>
                </form>
              </div>
            </div>

            <div>
              <div id="results" className="space-y-6">
                <div className="card">
                  <h3 className="mb-4 text-xl font-bold">Recommended Nozzles</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendedNozzles.map(n => (
                      <span key={n} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{n}</span>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="mb-4 text-xl font-bold">Kerf Width</h3>
                  {kerfWidth !== null ? (
                    <p className="text-lg font-semibold text-gray-900">{kerfWidth.toFixed(2)} mm</p>
                  ) : (
                    <p className="text-gray-600">Enter inputs and click Calculate to see kerf width.</p>
                  )}
                </div>

                {loss && (
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Material Loss (from Kerf)</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Stat label="Linear Area Loss" value={`${loss.linearAreaLossCm2.toFixed(2)} cm^2`} />
                      <Stat label="Volume Loss" value={`${loss.volumeLossCm3.toFixed(2)} cm^3`} />
                      <Stat label="Mass Loss (steel)" value={`${loss.massLossKg.toFixed(3)} kg`} />
                    </div>
                  </div>
                )}

                <div className="card">
                  <h3 className="mb-4 text-xl font-bold">Reference Table (Mild Steel, excerpt)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 text-left">Thickness</th>
                          <th className="pb-2 text-right">1.5mm nozzle</th>
                          <th className="pb-2 text-right">2.0mm nozzle</th>
                          <th className="pb-2 text-right">2.5mm nozzle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['1mm','2mm','3mm','5mm','8mm','10mm'].map(t => (
                          <tr key={t} className="border-b">
                            <td className="py-2">{t}</td>
                            <td className="py-2 text-right">{(KERF_WIDTH_MATRIX.mild_steel[t as keyof typeof KERF_WIDTH_MATRIX.mild_steel] as any)?.['1.5mm_nozzle'] ?? '-'}</td>
                            <td className="py-2 text-right">{(KERF_WIDTH_MATRIX.mild_steel[t as keyof typeof KERF_WIDTH_MATRIX.mild_steel] as any)?.['2.0mm_nozzle'] ?? '-'}</td>
                            <td className="py-2 text-right">{(KERF_WIDTH_MATRIX.mild_steel[t as keyof typeof KERF_WIDTH_MATRIX.mild_steel] as any)?.['2.5mm_nozzle'] ?? '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    Kerf values and nozzle associations in this table come from an internal reference matrix for mild steel.
                    Treat them as starting points and confirm actual kerf and nozzle choices with your own cut charts and test cuts
                    before using them for tight-tolerance work or detailed cost calculations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}


