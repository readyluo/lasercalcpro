'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ExportButton } from '@/components/calculators/ExportButton';
import { Calculator as CalculatorIcon, RotateCcw } from 'lucide-react';
import { quotationMarginSchema, quotationMarginDefaults, type QuotationMarginInput } from '@/lib/validations/cost-center';
import { calculateQuotationMargin, calculateMarginAtPrice, calculatePriceForMargin, calculateDiscountImpact } from '@/lib/calculators/cost-center/quotation';
import { generateCalculatorHowToSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export default function QuotationMarginPage() {
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [result, setResult] = React.useState<ReturnType<typeof calculateQuotationMargin> | null>(null);

  const howToSchema = generateCalculatorHowToSchema(
    'Quotation Margin Simulator',
    'Calculate prices to meet target margins, compare with competitor pricing, and model volume discounts.',
    [
      { name: 'Enter Costs', text: 'Provide base, material, labor, and overhead costs.' },
      { name: 'Set Margin & Terms', text: 'Choose target margin, payment terms and risk factor.' },
      { name: 'Optional Inputs', text: 'Add competitor price and volume discount tiers.' },
      { name: 'Calculate', text: 'See suggested price, margin breakdown, and recommendations.' },
    ]
  );

  const faqSchema = generateFAQSchema([
    { question: 'Margin vs Markup?', answer: 'Margin = Profit / Price. Markup = Profit / Cost. They are different metrics; this tool shows both.' },
    { question: 'What is minimum viable margin?', answer: 'Varies by business model; many shops target >=10% minimum with typical 25-35% for custom work.' },
  ]);

  const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<QuotationMarginInput>({
    resolver: zodResolver(quotationMarginSchema),
    defaultValues: quotationMarginDefaults,
  });

  const volumeArray = useFieldArray({ control, name: 'volumeDiscounts' });

  const onSubmit = (data: QuotationMarginInput) => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = calculateQuotationMargin(data);
      setResult(res);
      setIsCalculating(false);
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleReset = () => {
    reset(quotationMarginDefaults);
    setResult(null);
  };

  // Utilities
  const priceFor20Margin = calculatePriceForMargin(watch('baseCost'), 20);
  const discountImpact = calculateDiscountImpact(result?.finalRecommendedPrice || 0, watch('baseCost'), 5);

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">Quotation Margin Simulator</h1>
            <p className="text-gray-600">Set margins confidently, compare to competitors, and model volume discounts.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Input Parameters</h2>
                  <Button type="button" variant="ghost" size="sm" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>Reset</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input {...register('baseCost', { valueAsNumber: true })} type="number" step="1" label="Base Cost (USD)" error={errors.baseCost?.message} required />
                    <Input {...register('materialCost', { valueAsNumber: true })} type="number" step="1" label="Material Cost (USD)" error={errors.materialCost?.message} required />
                    <Input {...register('laborCost', { valueAsNumber: true })} type="number" step="1" label="Labor Cost (USD)" error={errors.laborCost?.message} required />
                    <Input {...register('overheadCost', { valueAsNumber: true })} type="number" step="1" label="Overhead Cost (USD)" error={errors.overheadCost?.message} required />
                    <Input {...register('targetMarginPercent', { valueAsNumber: true })} type="number" step="1" label="Target Margin (%)" error={errors.targetMarginPercent?.message} required />
                    <Input {...register('paymentTerms')} label="Payment Terms (immediate/net30/net60/net90)" error={errors.paymentTerms?.message} required />
                    <Input {...register('riskFactor')} label="Risk (low/medium/high)" error={errors.riskFactor?.message} required />
                    <Input {...register('competitorPrice', { valueAsNumber: true })} type="number" step="1" label="Competitor Price (USD, optional)" error={errors.competitorPrice?.message} />
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Volume Discount Tiers (optional)</h3>
                    <div className="space-y-4">
                      {volumeArray.fields.map((field, index) => (
                        <div key={field.id} className="grid gap-3 md:grid-cols-3">
                          <Input {...register(`volumeDiscounts.${index}.quantity` as const, { valueAsNumber: true })} type="number" step="1" label="Quantity" />
                          <Input {...register(`volumeDiscounts.${index}.discountPercent` as const, { valueAsNumber: true })} type="number" step="0.5" label="Discount (%)" />
                          <div className="flex items-end justify-end"><Button type="button" variant="outline" onClick={() => volumeArray.remove(index)}>Remove</Button></div>
                        </div>
                      ))}
                      <Button type="button" variant="secondary" onClick={() => volumeArray.append({ quantity: 100, discountPercent: 5 })}>Add Tier</Button>
                    </div>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isCalculating} leftIcon={<CalculatorIcon className="h-5 w-5" />}>Simulate Pricing</Button>
                </form>
              </div>
            </div>

            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Pricing Summary</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Stat label="Suggested Price" value={`$${result.suggestedPrice.toFixed(2)}`} />
                      <Stat label="Final Recommended Price" value={`$${result.finalRecommendedPrice.toFixed(2)}`} />
                      <Stat label="Profit" value={`$${result.profitAmount.toFixed(2)}`} />
                      <Stat label="Margin" value={`${result.marginPercent.toFixed(1)}%`} />
                      <Stat label="Markup" value={`${result.markupPercent.toFixed(1)}%`} />
                      <Stat label="Break-even" value={`$${result.breakEvenPrice.toFixed(2)}`} />
                    </div>
                  </div>

                  {result.volumePricing && result.volumePricing.length > 0 && (
                    <div className="card">
                      <h3 className="mb-4 text-xl font-bold">Volume Pricing</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-2 text-left">Quantity</th>
                              <th className="pb-2 text-right">Price / Unit</th>
                              <th className="pb-2 text-right">Revenue</th>
                              <th className="pb-2 text-right">Profit</th>
                              <th className="pb-2 text-right">Margin</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.volumePricing.map(row => (
                              <tr key={row.quantity} className="border-b">
                                <td className="py-2">{row.quantity}</td>
                                <td className="py-2 text-right">${row.pricePerUnit.toFixed(2)}</td>
                                <td className="py-2 text-right">${row.totalRevenue.toFixed(2)}</td>
                                <td className="py-2 text-right">${row.totalProfit.toFixed(2)}</td>
                                <td className="py-2 text-right">{row.marginPercent.toFixed(1)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {result.competitorComparison && (
                    <div className="card">
                      <h3 className="mb-2 text-xl font-bold">Competitor Comparison</h3>
                      <div className="grid gap-4 md:grid-cols-4">
                        <Stat label="Competitor Price" value={`$${result.competitorComparison.competitorPrice.toFixed(2)}`} />
                        <Stat label="Our Price" value={`$${result.competitorComparison.ourPrice.toFixed(2)}`} />
                        <Stat label="Diff" value={`$${result.competitorComparison.priceDifference.toFixed(2)}`} />
                        <Stat label="Position" value={result.competitorComparison.position.toUpperCase()} />
                      </div>
                    </div>
                  )}

                  <div className="card">
                    <h3 className="mb-2 text-xl font-bold">Discount Impact (5%)</h3>
                    <div className="grid gap-4 md:grid-cols-4">
                      <Stat label="Discounted Price" value={`$${discountImpact.discountedPrice.toFixed(2)}`} />
                      <Stat label="Original Margin" value={`${discountImpact.originalMarginPercent.toFixed(1)}%`} />
                      <Stat label="New Margin" value={`${discountImpact.newMarginPercent.toFixed(1)}%`} />
                      <Stat label="Profit Loss" value={`$${discountImpact.profitLoss.toFixed(2)}`} />
                    </div>
                  </div>

                  {/* Export */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <ExportButton
                        title="Quotation Margin Report"
                        calculationType="Quotation Margin"
                        inputData={watch()}
                        results={{
                          'Suggested Price ($)': result.suggestedPrice,
                          'Final Recommended Price ($)': result.finalRecommendedPrice,
                          'Profit ($)': result.profitAmount,
                          'Margin (%)': result.marginPercent,
                          'Markup (%)': result.markupPercent,
                        }}
                        recommendations={result.recommendations}
                      />
                    </div>
                    <Button variant="outline" size="lg" onClick={handleReset} leftIcon={<RotateCcw className="h-5 w-5" />}>New Simulation</Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[300px] flex-col items-center justify-center text-center">
                  <CalculatorIcon className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">Ready to Simulate</h3>
                  <p className="text-gray-500">Enter costs and target margin to simulate pricing</p>
                </div>
              )}
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


