'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEnglish } from '@/lib/i18n';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { roiSchema, roiDefaults, type ROIInput } from '@/lib/validations/roi';
import { calculateROI, type ROIResult, formatCurrency } from '@/lib/calculators/roi';
import {
  CumulativeCashFlowChart,
  YearlyROIChart,
  ROIGrowthChart,
} from '@/components/calculators/ROIChart';
import {
  Calculator,
  Download,
  RotateCcw,
  DollarSign,
  TrendingUp,
  Calendar,
  Target,
} from 'lucide-react';

export default function ROICalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = useState<ROIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ROIInput>({
    resolver: zodResolver(roiSchema),
    defaultValues: roiDefaults,
  });

  const onSubmit = async (data: ROIInput) => {
    setIsCalculating(true);

    setTimeout(() => {
      const calculationResult = calculateROI(data);
      setResult(calculationResult);
      setIsCalculating(false);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleReset = () => {
    reset(roiDefaults);
    setResult(null);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {t.roi.title}
            </h1>
            <p className="text-xl text-gray-600">{t.roi.description}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Investment Parameters</h2>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    leftIcon={<RotateCcw className="h-4 w-4" />}
                  >
                    Reset
                  </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Investment Section */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Initial Investment
                    </h3>
                    <div className="space-y-4">
                      <Input
                        {...register('equipmentCost', { valueAsNumber: true })}
                        type="number"
                        step="1000"
                        label={t.roi.fields.equipmentCost}
                        error={errors.equipmentCost?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                        required
                      />

                      <Input
                        {...register('installationCost', { valueAsNumber: true })}
                        type="number"
                        step="100"
                        label="Installation & Setup Cost ($)"
                        error={errors.installationCost?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                      />

                      <Input
                        {...register('downPayment', { valueAsNumber: true })}
                        type="number"
                        step="5"
                        label="Down Payment (%)"
                        error={errors.downPayment?.message}
                        helperText="Percentage paid upfront"
                      />

                      <Input
                        {...register('financingRate', { valueAsNumber: true })}
                        type="number"
                        step="0.5"
                        label={t.roi.fields.financingRate}
                        error={errors.financingRate?.message}
                        helperText="Annual interest rate (0 for cash purchase)"
                      />
                    </div>
                  </div>

                  {/* Revenue Section */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Revenue Projections
                    </h3>
                    <div className="space-y-4">
                      <Input
                        {...register('monthlyProduction', { valueAsNumber: true })}
                        type="number"
                        step="10"
                        label={t.roi.fields.monthlyProduction}
                        error={errors.monthlyProduction?.message}
                        helperText="Number of parts per month"
                        required
                      />

                      <Input
                        {...register('pricePerUnit', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label={t.roi.fields.pricePerUnit}
                        error={errors.pricePerUnit?.message}
                        leftIcon={<DollarSign className="h-4 w-4" />}
                        required
                      />

                      <Input
                        {...register('annualGrowthRate', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Annual Growth Rate (%)"
                        error={errors.annualGrowthRate?.message}
                        helperText="Expected yearly revenue growth"
                      />
                    </div>
                  </div>

                  {/* Operating Costs */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Operating Costs</h3>
                    <div className="space-y-4">
                      <Input
                        {...register('monthlyOperatingCost', { valueAsNumber: true })}
                        type="number"
                        step="100"
                        label={t.roi.fields.monthlyOperatingCost}
                        error={errors.monthlyOperatingCost?.message}
                        helperText="Materials, labor, utilities, maintenance"
                        leftIcon={<DollarSign className="h-4 w-4" />}
                        required
                      />
                    </div>
                  </div>

                  {/* Analysis Parameters */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Analysis Settings
                    </h3>
                    <div className="space-y-4">
                      <Input
                        {...register('analysisYears', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Analysis Period (Years)"
                        error={errors.analysisYears?.message}
                        helperText="Length of ROI analysis"
                      />

                      <Input
                        {...register('discountRate', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Discount Rate (%)"
                        error={errors.discountRate?.message}
                        helperText="For NPV calculation"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isCalculating}
                    leftIcon={<Calculator className="h-5 w-5" />}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate ROI'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Key Metrics */}
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-6 text-2xl font-bold">Investment Summary</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-sm text-blue-100">Total Investment</p>
                        <p className="text-3xl font-bold">{formatCurrency(result.totalInvestment)}</p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Payback Period</p>
                        <p className="text-3xl font-bold">
                          {result.paybackPeriodYears} {t.roi.results.years}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">5-Year ROI</p>
                        <p className="text-2xl font-semibold">
                          {result.totalROI5Year >= 0 ? '+' : ''}{result.totalROI5Year.toFixed(2)}%
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Annual ROI</p>
                        <p className="text-2xl font-semibold">
                          {result.annualROI >= 0 ? '+' : ''}{result.annualROI.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Financial Metrics</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <MetricCard
                        icon={<DollarSign className="h-6 w-6" />}
                        label="Net Present Value (NPV)"
                        value={formatCurrency(result.npv)}
                        positive={result.npv > 0}
                      />

                      <MetricCard
                        icon={<TrendingUp className="h-6 w-6" />}
                        label="Internal Rate of Return (IRR)"
                        value={`${result.irr.toFixed(2)}%`}
                        positive={result.irr > 0}
                      />

                      <MetricCard
                        icon={<Calendar className="h-6 w-6" />}
                        label="Monthly Revenue"
                        value={formatCurrency(result.monthlyRevenue)}
                      />

                      <MetricCard
                        icon={<Target className="h-6 w-6" />}
                        label="Monthly Profit"
                        value={formatCurrency(result.monthlyProfit)}
                        positive={result.monthlyProfit > 0}
                      />
                    </div>
                  </div>

                  {/* Charts */}
                  <div className="card">
                    <CumulativeCashFlowChart result={result} />
                  </div>

                  <div className="card">
                    <YearlyROIChart result={result} />
                  </div>

                  <div className="card">
                    <ROIGrowthChart result={result} />
                  </div>

                  {/* Yearly Breakdown Table */}
                  <div className="card">
                    <h3 className="mb-4 text-xl font-bold">Yearly Financial Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="pb-3 text-left font-semibold">Year</th>
                            <th className="pb-3 text-right font-semibold">Revenue</th>
                            <th className="pb-3 text-right font-semibold">Costs</th>
                            <th className="pb-3 text-right font-semibold">Profit</th>
                            <th className="pb-3 text-right font-semibold">Cumulative</th>
                            <th className="pb-3 text-right font-semibold">ROI</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearlyProjections.map(year => (
                            <tr key={year.year} className="border-b last:border-b-0">
                              <td className="py-3 font-medium">Year {year.year}</td>
                              <td className="py-3 text-right text-green-600">
                                {formatCurrency(year.revenue)}
                              </td>
                              <td className="py-3 text-right text-red-600">
                                {formatCurrency(year.costs)}
                              </td>
                              <td className="py-3 text-right font-semibold">
                                {formatCurrency(year.profit)}
                              </td>
                              <td className="py-3 text-right font-semibold">
                                {formatCurrency(year.cumulativeProfit)}
                              </td>
                              <td className="py-3 text-right font-bold text-primary-600">
                                {year.roi >= 0 ? '+' : ''}{year.roi.toFixed(2)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      leftIcon={<Download className="h-5 w-5" />}
                    >
                      Export PDF Report
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleReset}
                      leftIcon={<RotateCcw className="h-5 w-5" />}
                    >
                      New Analysis
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="card flex min-h-[400px] flex-col items-center justify-center text-center">
                  <Calculator className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">
                    Ready to Analyze ROI
                  </h3>
                  <p className="text-gray-500">
                    Enter your investment parameters to see detailed ROI analysis
                  </p>
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

function MetricCard({
  icon,
  label,
  value,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
      <div className={`${positive !== undefined ? (positive ? 'text-green-600' : 'text-red-600') : 'text-primary-600'}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-lg font-semibold ${positive !== undefined ? (positive ? 'text-green-600' : 'text-red-600') : 'text-gray-900'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

