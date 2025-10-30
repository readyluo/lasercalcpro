import React from 'react';

import Link from 'next/link';
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

          {/* Investment Decision Framework */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Investment Decision Framework</h2>
              <p className="mb-6 text-gray-700">
                Making the right equipment investment decision requires analyzing multiple financial metrics. 
                Here's how to evaluate your investment systematically.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Return on Investment (ROI)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Formula:</strong> (Net Profit / Initial Investment) × 100%</p>
                    <p><strong>Good ROI:</strong> &gt;20% per year in manufacturing</p>
                    <p><strong>Excellent ROI:</strong> &gt;40% per year</p>
                    <p><strong>Consider:</strong> ROI alone doesn't account for time value of money</p>
                    <p><strong>Use case:</strong> Simple comparison between investments of similar duration</p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Payback Period</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Definition:</strong> Time to recover initial investment</p>
                    <p><strong>Target:</strong> &lt;2 years (excellent), 2-3 years (good), &gt;5 years (risky)</p>
                    <p><strong>Industry standard:</strong> Most manufacturers target 2-3 year payback</p>
                    <p><strong>Limitation:</strong> Ignores profits after payback period</p>
                    <p><strong>Best for:</strong> Quick screening of investment opportunities</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Net Present Value (NPV)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Definition:</strong> Present value of future cash flows minus investment</p>
                    <p><strong>Decision rule:</strong> Invest if NPV &gt; 0</p>
                    <p><strong>Advantage:</strong> Accounts for time value of money</p>
                    <p><strong>Discount rate:</strong> Typically 8-15% for manufacturing equipment</p>
                    <p><strong>Best for:</strong> Comparing mutually exclusive projects</p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Internal Rate of Return (IRR)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Definition:</strong> Discount rate where NPV = 0</p>
                    <p><strong>Target IRR:</strong> Should exceed cost of capital by 5-10%</p>
                    <p><strong>Typical:</strong> 15-25% IRR is attractive for equipment</p>
                    <p><strong>Limitation:</strong> Can be misleading with non-conventional cash flows</p>
                    <p><strong>Use case:</strong> Ranking multiple investment opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Case Studies */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Real-World ROI Case Studies</h2>
              
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Case Study 1: Job Shop Adds Fiber Laser</h3>
                    <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
                      ROI: 68% Year 1
                    </span>
                  </div>
                  <div className="mb-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-600">Investment</p>
                      <p className="text-lg font-bold text-gray-900">$175,000</p>
                      <p className="text-xs text-gray-500">6kW fiber laser + installation</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Annual Revenue Impact</p>
                      <p className="text-lg font-bold text-green-600">+$240,000</p>
                      <p className="text-xs text-gray-500">Previously outsourced work</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payback Period</p>
                      <p className="text-lg font-bold text-primary-600">18 months</p>
                      <p className="text-xs text-gray-500">Including ramp-up time</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="mb-2 text-sm font-semibold text-gray-900">Key Success Factors:</p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                      <li>Had existing customer base requiring laser cutting (previously outsourced at 2.5x markup)</li>
                      <li>Operator training completed before machine delivery</li>
                      <li>Started with familiar materials (mild steel, stainless) before expanding</li>
                      <li>Machine utilization reached 65% by month 6, 85% by month 12</li>
                      <li>Reduced lead times from 5-7 days (outsourced) to same-day turnaround</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Case Study 2: Product Manufacturer Adds 5-Axis Mill</h3>
                    <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
                      ROI: 42% Year 1
                    </span>
                  </div>
                  <div className="mb-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-600">Investment</p>
                      <p className="text-lg font-bold text-gray-900">$425,000</p>
                      <p className="text-xs text-gray-500">5-axis VMC + tooling + training</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Annual Savings</p>
                      <p className="text-lg font-bold text-green-600">$178,000</p>
                      <p className="text-xs text-gray-500">Reduced outsourcing + faster cycle</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payback Period</p>
                      <p className="text-lg font-bold text-primary-600">2.4 years</p>
                      <p className="text-xs text-gray-500">Conservative estimate</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="mb-2 text-sm font-semibold text-gray-900">Key Success Factors:</p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                      <li>Complex aerospace parts previously required 4-6 setups, now 1-2 setups (60% time reduction)</li>
                      <li>Part accuracy improved from ±0.003" to ±0.001" eliminating rework</li>
                      <li>Programmer learning curve: 3 months to proficiency, 6 months to full optimization</li>
                      <li>Qualified for new contracts requiring 5-axis capabilities (+$300k annual potential)</li>
                      <li>First year utilization: 55% (below target) but revenue per hour increased 80%</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Case Study 3: Failed Investment - Underutilized Wire EDM</h3>
                    <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-800">
                      ROI: -8% Year 1
                    </span>
                  </div>
                  <div className="mb-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-600">Investment</p>
                      <p className="text-lg font-bold text-gray-900">$145,000</p>
                      <p className="text-xs text-gray-500">Wire EDM + installation</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Actual Utilization</p>
                      <p className="text-lg font-bold text-red-600">18%</p>
                      <p className="text-xs text-gray-500">vs. projected 60%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lost Investment</p>
                      <p className="text-lg font-bold text-red-600">-$12,000</p>
                      <p className="text-xs text-gray-500">Year 1 negative cash flow</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="mb-2 text-sm font-semibold text-gray-900">Lessons Learned:</p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                      <li><strong>Overestimated demand:</strong> Projected 120 hrs/month usage, actual 35 hrs/month</li>
                      <li><strong>Skills gap:</strong> Existing staff unfamiliar with EDM, hired specialist at $75k/year overhead</li>
                      <li><strong>Lead times:</strong> Wire and consumables had 2-week lead time causing downtime</li>
                      <li><strong>Marketing issue:</strong> Existing customers didn't need EDM capabilities</li>
                      <li><strong>Recovery plan:</strong> Pivoted to marketing EDM services, reached 45% utilization by year 2, positive ROI by year 3</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factors & Mitigation */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Risk Factors & Mitigation Strategies</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
                      <span className="text-xl font-bold">⚠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Demand Risk: Insufficient Workload</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Equipment utilization falls below 40%, making investment unprofitable.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Secure 6-12 months of confirmed orders before purchasing</li>
                      <li>Consider leasing instead of buying for first 2-3 years to reduce commitment</li>
                      <li>Start with used equipment (50-60% of new cost) to lower break-even point</li>
                      <li>Market new capabilities 3-6 months before equipment arrival</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                      <span className="text-xl font-bold">⚠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Technology Risk: Obsolescence</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Equipment becomes outdated, losing competitive advantage.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Choose mature, proven technologies over bleeding-edge (e.g., fiber lasers, not hybrid experimental)</li>
                      <li>Verify supplier has 10+ year track record and strong service network</li>
                      <li>Factor in resale value: quality machines retain 40-50% value after 5 years</li>
                      <li>Plan for 7-10 year useful life, not perpetual operation</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                      <span className="text-xl font-bold">⚠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Operational Risk: Skills Gap</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Cannot operate equipment efficiently, extending payback period.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Include comprehensive training in purchase contract (1-2 weeks minimum)</li>
                      <li>Hire experienced operator ($50-70k) or send existing staff for 3-6 month intensive training</li>
                      <li>Start with simple work to build confidence before complex jobs</li>
                      <li>Budget 3-6 months for learning curve at 40-60% efficiency</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <span className="text-xl font-bold">⚠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Financial Risk: Cash Flow Constraint</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Equipment purchase strains working capital, affecting operations.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Finance equipment (5-7 year terms at 5-8% interest) to preserve cash</li>
                      <li>Ensure 6 months operating expenses in reserve after purchase</li>
                      <li>Phase investments: buy basic configuration first, add options as revenue grows</li>
                      <li>Consider SBA 504 loans (up to $5M at favorable rates for equipment)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <span className="text-xl font-bold">⚠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Market Risk: Economic Downturn</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Recession reduces demand, making debt service difficult.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Diversify customer base: no single customer &gt;25% of revenue</li>
                      <li>Target countercyclical industries (medical, defense, essential goods)</li>
                      <li>Maintain debt service coverage ratio of 1.5x or higher</li>
                      <li>Build cash reserves equal to 12 months of loan payments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics Explained */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-purple-50 to-blue-50">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Financial Metrics Explained</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Break-Even Analysis</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Formula:</strong> Fixed Costs / (Revenue per Hour - Variable Costs per Hour)</p>
                    <p><strong>Example:</strong> $150k machine / ($100/hr revenue - $40/hr costs) = 2,500 hours to break even</p>
                    <p><strong>At 40 hrs/week:</strong> 62.5 weeks (14.4 months)</p>
                    <p><strong>At 60 hrs/week:</strong> 41.7 weeks (9.6 months)</p>
                    <p><strong>Insight:</strong> Higher utilization dramatically improves payback</p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Machine Hour Rate Calculation</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Components:</strong></p>
                    <p>• Depreciation: $150k / 10 years / 2000 hrs = $7.50/hr</p>
                    <p>• Labor: $25/hr (operator)</p>
                    <p>• Consumables: $3-5/hr (tooling, gas, etc.)</p>
                    <p>• Overhead: $15/hr (facility, utilities, insurance)</p>
                    <p>• Total Cost: ~$50-55/hr</p>
                    <p>• Profit margin (30%): $15-17/hr</p>
                    <p>• <strong>Billing rate: $65-72/hr</strong></p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Utilization Rate Impact</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>At 40% utilization:</strong> 800 hrs/year = $64k revenue</p>
                    <p>Annual profit: $64k - $40k costs = $24k (16% ROI on $150k)</p>
                    <p><strong>At 60% utilization:</strong> 1,200 hrs/year = $96k revenue</p>
                    <p>Annual profit: $96k - $52k costs = $44k (29% ROI)</p>
                    <p><strong>At 80% utilization:</strong> 1,600 hrs/year = $128k revenue</p>
                    <p>Annual profit: $128k - $64k costs = $64k (43% ROI)</p>
                    <p><strong>Key insight:</strong> Fixed costs make utilization critical</p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">Financing vs. Cash Purchase</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Cash purchase $150k:</strong></p>
                    <p>• No interest expense</p>
                    <p>• Full ownership immediately</p>
                    <p>• Depletes working capital</p>
                    <p><strong>Financed at 6% for 7 years:</strong></p>
                    <p>• Monthly payment: $2,250</p>
                    <p>• Total interest: $39,000</p>
                    <p>• Preserves $150k cash for operations</p>
                    <p>• Tax-deductible interest expense</p>
                    <p><strong>Recommendation:</strong> Finance if cash flow positive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ for ROI */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="What's a realistic ROI target for manufacturing equipment?"
                  answer="Industry standards: 20-30% annual ROI is good, 40%+ is excellent. Payback period of 2-3 years is typical for most manufacturers. However, strategic equipment (enables new markets or critical capabilities) may justify lower ROI of 15-20%. Always compare against alternative uses of capital - if you can earn 12% from other investments, equipment should return at least 15-18% to justify the operational risk."
                />
                <FAQItem
                  question="Should I buy new or used equipment to improve ROI?"
                  answer="Used equipment pros: 50-70% of new cost, faster payback, lower risk if demand uncertain. Cons: Limited warranty (1 year typical vs. 3-5 for new), potential reliability issues, may lack latest features. Buy used if: 1) Testing new market, 2) Budget constrained, 3) Mature technology. Buy new if: 1) Mission-critical equipment, 2) Need warranty support, 3) Latest features improve competitiveness. Many shops start with used equipment and upgrade to new after proving demand."
                />
                <FAQItem
                  question="How do I calculate the opportunity cost of not investing?"
                  answer="Consider: 1) Revenue lost from outsourcing at 2-3x markup (e.g., paying $100k/year for work you could do for $40k = $60k annual opportunity cost), 2) Lost business from longer lead times vs. competitors, 3) Customer relationships damaged by outsourcing reliability issues, 4) Growth limitation (can't scale without capacity). If opportunity cost exceeds 30% of equipment cost annually, investment typically justified. Example: Losing $75k/year by outsourcing makes $200k equipment purchase break even in 2.7 years on opportunity cost alone."
                />
                <FAQItem
                  question="What utilization rate should I target for profitability?"
                  answer="Minimum viable: 40% (800 hrs/year) covers costs. Target: 60-70% (1,200-1,400 hrs/year) provides healthy profit. Excellent: 80%+ (1,600+ hrs/year) maximizes ROI. Above 85% indicates capacity constraint - consider second machine. Important: Don't confuse spindle time with availability. 70% spindle utilization = ~45% overall utilization when including setup, programming, maintenance. Track 'billable hours' not just 'cutting hours'. Single-shift operations max around 75% practical utilization (1,500 hrs/year)."
                />
                <FAQItem
                  question="How do I account for productivity improvements in ROI calculations?"
                  answer="Common productivity gains: 1) Speed: New equipment 30-50% faster than 10-year-old machine, 2) Setup reduction: Advanced work holding cuts setup 40-60%, 3) Lights-out operation: Automated loading adds 8-16 hrs unattended time, 4) First-pass yield: Better accuracy reduces rework from 10% to 2%. Quantify: Old process 15 min/part vs. new 9 min/part = 40% productivity gain. At 1,000 parts/year: saves 100 hours ($10k value). Conservative approach: assume 60% of theoretical gains in year 1, 80% in year 2, full gains by year 3 to account for learning curve."
                />
                <FAQItem
                  question="Should I consider tax benefits in ROI calculations?"
                  answer="Yes, significantly impacts true ROI. Section 179 deduction: Deduct full equipment cost (up to $1.16M in 2024) in year of purchase vs. depreciation over 7 years. Bonus depreciation: 60% (2024) of cost in year 1, phases out by 2027. Example: $200k equipment, 25% tax bracket: immediate $50k tax savings = effective cost $150k (33% improvement in ROI). Also consider state tax benefits: some states offer manufacturing equipment exemptions. Consult tax advisor but typical total benefit is 25-35% of equipment cost depending on tax situation. This can reduce payback period by 6-12 months."
                />
                <FAQItem
                  question="How do I project revenue growth realistically for ROI analysis?"
                  answer="Conservative approach: Year 1: 50% of target utilization (learning curve, marketing ramp), Year 2: 75% of target, Year 3+: Full target. Revenue sources: 1) Insourced work currently outsourced (most predictable), 2) Existing customers buying new capabilities (medium confidence), 3) New customer acquisition (least predictable, 6-12 month sales cycle). Risk: Don't assume 'if you build it they will come'. Validate: secure 6-12 months confirmed orders before purchasing. Red flags: Projecting >30% annual growth without concrete customer commitments, assuming immediate 80%+ utilization, ignoring competitive response (competitors may drop prices)."
                />
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Calculators</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/calculators/laser-cutting"
                className="card-hover group border-l-4 border-blue-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Laser Cutting Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate operating costs to estimate revenue for ROI analysis
                </p>
              </Link>

              <Link
                href="/calculators/cnc-machining"
                className="card-hover group border-l-4 border-purple-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  CNC Machining Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Estimate per-part profitability for your CNC investment case
                </p>
              </Link>

              <Link
                href="/calculators/energy"
                className="card-hover group border-l-4 border-yellow-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Energy Cost Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Factor energy costs into your operating expense projections
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg border border-gray-200 transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900">{question}</h3>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-3">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
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

