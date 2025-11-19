'use client';

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
import { ExportButton } from '@/components/calculators/ExportButton';
import { roiSchema, roiDefaults, type ROIInput } from '@/lib/validations/roi';
import { calculateROI, type ROIResult, formatCurrency } from '@/lib/calculators/roi';
import {
  CumulativeCashFlowChart,
  YearlyROIChart,
  ROIGrowthChart,
} from '@/components/calculators/ROIChart';
import { Calculator, RotateCcw, DollarSign, TrendingUp, Calendar, Target } from 'lucide-react';
import {
  generateCalculatorHowToSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { saveCalculationToAPI } from '@/lib/utils/api-client';

export default function ROICalculatorPage() {
  const t = useEnglish();
  const [result, setResult] = useState<ROIResult | null>(null);
  const [lastInput, setLastInput] = useState<ROIInput | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const analysisYears: number =
    (lastInput?.analysisYears ?? roiDefaults.analysisYears ?? 0) || 0;
  const discountRate: number =
    (lastInput?.discountRate ?? roiDefaults.discountRate ?? 0) || 0;

  const howToSchema = generateCalculatorHowToSchema(
    'Equipment ROI Calculator',
    'Calculate return on investment for equipment purchases',
    [
      { name: 'Enter Investment', text: 'Input equipment cost, installation, and training costs' },
      { name: 'Set Revenue', text: 'Enter annual revenue and operating costs' },
      { name: 'Configure Parameters', text: 'Set analysis period, discount rate, and growth rates' },
      { name: 'Analyze Results', text: 'Get NPV, IRR, payback period, and cash flow projections' },
    ]
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'What is a good ROI for equipment?',
      answer:
        'There is no single ROI or payback target that fits every shop. Acceptable ROI depends on your cost of capital, risk tolerance, and alternative uses of cash. Use this calculator to compare scenarios, then decide on ROI and payback thresholds that make sense for your business and financing situation.',
    },
    {
      question: 'What is NPV and why is it important?',
      answer:
        'Net Present Value (NPV) shows the present value of the future cash flows in your scenario after accounting for the discount rate you chose. In many finance texts, a positive NPV is interpreted as value-creating relative to that rate, but how convincing a given NPV is depends on your cost of capital, risk profile, and the alternatives you are comparing. This calculator reports NPV for the assumptions you enter; final investment decisions should follow your own financial policies and review process.',
    },
    {
      question: 'How is IRR different from ROI?',
      answer:
        'IRR (Internal Rate of Return) is the discount rate that makes NPV zero and represents an annualized return rate. ROI is a simpler profit / investment ratio. IRR is helpful for comparing projects with different timelines but has limitations: it assumes you can reinvest cash flows at the same IRR, and unusual cash-flow patterns can produce multiple or misleading IRRs. Use IRR alongside NPV and payback period, not as a standalone decision rule.',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ROIInput>({
    resolver: zodResolver(roiSchema),
    defaultValues: roiDefaults,
  });
  const softwareSchema = generateSoftwareApplicationSchema('Equipment ROI Calculator');

  const onSubmit = async (data: ROIInput) => {
    setIsCalculating(true);

    try {
      const calculationResult = calculateROI(data);
      setResult(calculationResult);
      setLastInput(data);

      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });

      const saveResult = await saveCalculationToAPI({
        tool_type: 'roi',
        input_params: data,
        result: calculationResult as unknown as Record<string, unknown>,
      });

      if (!saveResult.success) {
        console.error('Failed to save calculation:', saveResult.error);
      }
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    reset(roiDefaults);
    setResult(null);
  };

  return (
    <>
      <SchemaMarkup schema={howToSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={softwareSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* When to use this calculator */}
          <div className="mb-4 rounded-2xl bg-blue-50 border-l-4 border-blue-500 px-4 py-3">
            <h2 className="mb-1 text-sm font-semibold text-gray-900">When to use this equipment ROI calculator</h2>
            <div className="grid gap-3 md:grid-cols-2 text-xs text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">✓ Best suited for:</p>
                <ul className="mt-1 ml-5 list-disc space-y-1">
                  <li>Evaluating individual equipment purchases with clear revenue or savings assumptions</li>
                  <li>Comparing financing vs cash purchase scenarios on the same machine</li>
                  <li>Checking whether a proposed investment roughly meets your payback and ROI targets</li>
                  <li>Communicating investment logic to partners, managers, or lenders</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900">✗ Not ideal for:</p>
                <ul className="mt-1 ml-5 list-disc space-y-1">
                  <li>Full company valuations or multi-asset portfolio decisions</li>
                  <li>Detailed tax planning or GAAP/IFRS-compliant financial statements</li>
                  <li>Projects with highly uncertain or speculative revenue profiles</li>
                  <li>Making final investment decisions without review by finance or tax advisors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Header - Compact */}
          <div className="mb-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {t.roi.title}
            </h1>
            <p className="text-base text-gray-600">{t.roi.description}</p>
          </div>

          {/* Disclaimer - Simplified */}
          <div className="mb-4 border-l-4 border-blue-500 bg-blue-50 px-4 py-3">
            <p className="text-sm text-blue-900">
              <TrendingUp className="mr-2 inline h-4 w-4" />
              <strong>Investment analysis (before tax):</strong> This tool models cash flows and financing based on the
              assumptions you enter. It does not include income tax, depreciation tax shields, or local accounting rules.
              Treat the outputs as structured what-if scenarios to compare options, not guaranteed returns or financial advice.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <div className="card sticky top-24">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Investment Parameters</h2>
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

                      <Input
                        {...register('loanTermYears', { valueAsNumber: true })}
                        type="number"
                        step="1"
                        label="Loan Term (Years)"
                        error={errors.loanTermYears?.message}
                        helperText="Amortization period for financing"
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

              {/* Typical values reference */}
              <div className="mt-6 card bg-blue-50 border-l-4 border-blue-500">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Typical values reference</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900">Discount rate (for NPV)</p>
                    <ul className="ml-4 mt-1 space-y-1 text-xs">
                      <li>• <strong>6–8%:</strong> Lower-risk, established business and stable demand</li>
                      <li>• <strong>10–12%:</strong> Typical for many manufacturing investments</li>
                      <li>• <strong>15–20%:</strong> Higher-risk, new markets or aggressive growth</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Annual revenue growth</p>
                    <ul className="ml-4 mt-1 space-y-1 text-xs">
                      <li>• <strong>0–3%:</strong> Conservative (inflation-level growth)</li>
                      <li>• <strong>5–8%:</strong> Moderate expansion in a healthy market</li>
                      <li>• <strong>10–15%:</strong> Aggressive plan that should be justified by a clear pipeline</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Down payment and financing rate</p>
                    <ul className="ml-4 mt-1 space-y-1 text-xs">
                      <li>• <strong>Down payment 10–30%:</strong> Common for equipment financing</li>
                      <li>• <strong>Financing rate 6–10%:</strong> Typical for creditworthy industrial borrowers</li>
                      <li>• <strong>Higher rates:</strong> Reflect greater risk or weaker credit profile</li>
                    </ul>
                  </div>

                  <p className="mt-2 border-t border-blue-200 pt-2 text-xs text-gray-600">
                    Start with conservative assumptions (higher discount rate, lower growth) to see a downside case, then
                    explore upside scenarios. Always align these ranges with your accountant or finance team.
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div id="results" className="space-y-6">
                  {/* Key Metrics */}
                  <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <h2 className="mb-6 text-3xl font-bold">Investment Summary</h2>

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

                      <div>
                        <p className="mb-1 text-sm text-blue-100">Loan Term</p>
                        <p className="text-2xl font-semibold">
                          {result.loanTermYears} yrs ({result.loanTermMonths} mo)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tax and accounting scope */}
                  <div className="card border-l-4 border-amber-500 bg-amber-50">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="mt-0.5 h-5 w-5 text-amber-600" />
                      <div>
                        <h3 className="mb-1 text-sm font-semibold text-gray-900">Tax considerations not included</h3>
                        <div className="space-y-1 text-xs text-gray-700">
                          <p>
                            This model does <strong>not</strong> include income taxes, depreciation tax shields, investment
                            credits, or local tax rules. All ROI, NPV, and IRR figures are on a pre-tax basis.
                          </p>
                          <p>
                            Actual after-tax returns are usually lower and depend heavily on your jurisdiction and accounting
                            policies. For critical decisions, review scenarios with your finance or tax advisor.
                          </p>
                          <p className="text-[11px] text-amber-800">
                            Rough rule of thumb: if your marginal tax rate is ~25%, multiplying annual profit by ~0.75 gives a
                            basic after-tax estimate before considering depreciation benefits.
                          </p>
                        </div>
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
                    <p className="mt-3 text-xs text-gray-600">
                      IRR assumes interim cash flows could be reinvested at the same rate and can behave unexpectedly for
                      unusual cash-flow patterns. Use it together with NPV, payback period, and your own risk thresholds
                      rather than as a single go / no-go number.
                    </p>
                  </div>

                  {/* Quick sanity check */}
                  <div className="card border-l-4 border-purple-500 bg-purple-50">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Target className="h-5 w-5 text-purple-600" />
                      Quick sanity check
                    </h3>
                    <div className="space-y-2 text-xs text-gray-700">
                      {analysisYears > 0 && result.paybackPeriodYears > analysisYears && (
                        <p className="flex items-start gap-2">
                          <span className="text-amber-600">⚠️</span>
                          <span>
                            Payback period ({result.paybackPeriodYears.toFixed(1)} years) is longer than your analysis
                            horizon ({analysisYears} years). This can be acceptable for highly strategic equipment, but it
                            means most returns arrive after the window you are modeling.
                          </span>
                        </p>
                      )}

                      {result.annualROI > 40 && (
                        <p className="flex items-start gap-2">
                          <span className="text-amber-600">⚠️</span>
                          <span>
                            Annual ROI above {result.annualROI.toFixed(1)}% is quite aggressive for many manufacturing
                            investments. Double-check production volume, pricing, and operating cost assumptions to ensure
                            they reflect realistic utilization and margins.
                          </span>
                        </p>
                      )}

                      {discountRate >= 0 && result.npv > 0 && result.irr > discountRate && (
                        <p className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>
                            IRR ({result.irr.toFixed(1)}%) is above your modeled discount rate ({discountRate.toFixed(1)}%).
                            Together with a positive NPV, this usually indicates the scenario is value-creating relative to
                            that required return, subject to the risk and tax caveats above.
                          </span>
                        </p>
                      )}
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
                    <ExportButton
                      title="Equipment ROI Report"
                      calculationType="ROI"
                      inputData={lastInput || roiDefaults}
                      results={{
                        totalInvestment: result.totalInvestment,
                        paybackPeriodYears: result.paybackPeriodYears,
                        paybackPeriodMonths: result.breakEvenMonth,
                        loanTermYears: result.loanTermYears,
                        loanTermMonths: result.loanTermMonths,
                        fiveYearROI: result.totalROI5Year,
                        annualROI: result.annualROI,
                        npv: result.npv,
                        irr: result.irr,
                        monthlyRevenue: result.monthlyRevenue,
                        monthlyProfit: result.monthlyProfit,
                      }}
                      chartDataUrls={(() => {
                        const canvases = Array.from(document.querySelectorAll('#results canvas')) as HTMLCanvasElement[];
                        return canvases.slice(0, 3).map(c => c.toDataURL('image/png'));
                      })()}
                    />
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
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Investment Decision Framework</h2>
              <p className="mb-6 text-gray-700">
                Making the right equipment investment decision requires analyzing multiple financial metrics. 
                Here&rsquo;s how to evaluate your investment systematically.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Return on Investment (ROI)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Formula:</strong> (Net Profit / Initial Investment)  x  100%</p>
                    <p><strong>Interpretation:</strong> Higher ROI means more return per unit of capital invested, but what counts as &ldquo;good&rdquo; depends on your funding costs, business risk, and alternative investments.</p>
                    <p><strong>Consider:</strong> ROI alone doesn&rsquo;t account for time value of money</p>
                    <p><strong>Use case:</strong> Simple comparison between investments of similar duration</p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Payback Period</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Definition:</strong> Time to recover initial investment</p>
                    <p><strong>Interpretation:</strong> Shorter payback reduces the time your capital is at risk, but acceptable timelines vary by business model, financing terms, and how strategic the equipment is for your operations.</p>
                    <p><strong>Limitation:</strong> Ignores profits after payback period</p>
                    <p><strong>Best for:</strong> Quick screening of investment opportunities</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Net Present Value (NPV)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Definition:</strong> Present value of future cash flows minus investment</p>
                    <p><strong>Interpretation:</strong> Finance texts often treat positive NPV, given a chosen discount rate, as indicating a value-creating scenario, but real decisions usually weigh NPV alongside risk, liquidity, and alternative uses of capital.</p>
                    <p><strong>Advantage:</strong> Accounts for time value of money</p>
                    <p><strong>Discount rate:</strong> Choose a rate that reflects your cost of capital, risk profile, and opportunity cost of funds.</p>
                    <p><strong>Best for:</strong> Comparing mutually exclusive projects</p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                  <h3 className="mb-3 font-bold text-gray-900">Internal Rate of Return (IRR)</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Definition:</strong> Discount rate where NPV = 0</p>
                    <p><strong>Interpretation:</strong> IRR is most useful when compared against your cost of capital and other investment options rather than against a universal target percentage.</p>
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
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Real-World ROI Case Studies</h2>
              <p className="mb-4 text-sm text-gray-700">
                The following case-style examples illustrate how different assumptions about investment, savings, and
                utilization can affect ROI. They are simplified and not industry benchmarks. Always base your own
                analysis on actual costs, prices, and volumes from your business.
              </p>
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
                      <li>Part accuracy improved from +/-0.003&quot; to +/-0.001&quot; eliminating rework</li>
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
                      <li><strong>Marketing issue:</strong> Existing customers did not need EDM capabilities</li>
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
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Risk Factors & Mitigation Strategies</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
                      <span className="text-xl font-bold">!</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Demand Risk: Insufficient Workload</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Equipment utilization ends up significantly lower than assumed in your ROI model, reducing or delaying expected returns.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Secure a realistic pipeline of work and customer commitments before purchasing</li>
                      <li>Consider leasing or shorter-term arrangements at first if long-term demand is uncertain</li>
                      <li>Evaluate whether lower-cost or used equipment could reduce your break-even point</li>
                      <li>Begin marketing new capabilities ahead of installation so demand can ramp as the machine comes online</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                      <span className="text-xl font-bold">!</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Technology Risk: Obsolescence</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Equipment becomes outdated, losing competitive advantage.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Favor proven technologies and platforms over untested concepts unless you are prepared for higher risk</li>
                      <li>Work with suppliers that have a strong service track record and local support</li>
                      <li>Consider potential resale value in your scenarios instead of assuming equipment will run indefinitely</li>
                      <li>Plan for a finite useful life and potential upgrade path in your ROI horizon</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                      <span className="text-xl font-bold">!</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Operational Risk: Skills Gap</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Cannot operate equipment efficiently, extending payback period.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Include appropriate training and support in the purchase contract</li>
                      <li>Consider hiring experienced operators or investing in deeper training for existing staff</li>
                      <li>Start with simple work to build confidence before complex jobs</li>
                      <li>Allow for a learning curve period in your ROI scenarios rather than assuming full efficiency on day one</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <span className="text-xl font-bold">!</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Financial Risk: Cash Flow Constraint</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Equipment purchase strains working capital, affecting operations.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Consider financing structures that preserve sufficient working capital for day-to-day operations</li>
                      <li>Maintain an operating reserve that fits your risk tolerance and cash flow volatility</li>
                      <li>Phase investments: buy basic configuration first, add options as revenue grows</li>
                      <li>Explore different loan and leasing options that match your scale and region, and review terms carefully</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <span className="text-xl font-bold">!</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Market Risk: Economic Downturn</h3>
                  </div>
                  <div className="ml-13 space-y-2 text-gray-700">
                    <p><strong>Risk:</strong> Recession reduces demand, making debt service difficult.</p>
                    <p><strong>Mitigation:</strong></p>
                    <ul className="list-inside list-disc space-y-1 pl-4">
                      <li>Diversify your customer base so no single account dominates revenue if possible</li>
                      <li>Target countercyclical industries (medical, defense, essential goods)</li>
                      <li>Monitor leverage and coverage ratios over time and avoid committing to debt service that your downside scenarios cannot support</li>
                      <li>Build cash reserves that reflect your own view of acceptable risk and demand volatility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics Explained */}
          <div className="mt-12">
            <div className="card bg-gradient-to-br from-purple-50 to-blue-50">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Key Financial Metrics Explained</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Break-Even Analysis</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Formula:</strong> Fixed Costs / (Revenue per Hour - Variable Costs per Hour)</p>
                    <p><strong>Example (illustrative only):</strong> $150k machine / ($100/hr revenue - $40/hr costs) = 2,500 hours to break even</p>
                    <p>At 40 hrs/week this example would take about 62.5 weeks, at 60 hrs/week about 41.7 weeks. Your own break-even point will depend entirely on your actual rates and costs.</p>
                    <p><strong>Insight:</strong> Higher utilization generally improves payback when fixed costs are significant, but the effect should be evaluated using your own numbers.</p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Machine Hour Rate Calculation</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Components:</strong></p>
                    <p>- Depreciation, labor, consumables, and overhead are all components you can include when building a machine rate.</p>
                    <p>- The specific dollar amounts will vary widely by shop, region, and equipment. Use your own cost structure and tools like the hourly rate calculator to build a rate rather than adopting generic figures.</p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Utilization Rate Impact</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>This calculator lets you test how different utilization assumptions affect revenue, profit, and ROI over time.</p>
                    <p>Instead of aiming for one fixed "right" utilization level, build scenarios that reflect your current workload, realistic ramp-up, and any capacity constraints, then see how sensitive the investment case is to those assumptions.</p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Financing vs. Cash Purchase</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Cash purchase $150k:</strong></p>
                    <p>- No interest expense</p>
                    <p>- Full ownership immediately</p>
                    <p>- Depletes working capital</p>
                    <p><strong>Financed example:</strong></p>
                    <p>- Spreads the cost over time in exchange for interest expense</p>
                    <p>- Can preserve cash for operations but increases fixed commitments</p>
                    <p>- Tax treatment of interest and depreciation will depend on your jurisdiction</p>
                    <p><strong>Consideration:</strong> Compare cash and financed scenarios in this calculator using your actual loan terms, and ensure projected cash flow remains acceptable under conservative assumptions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ for ROI */}
          <div className="mt-12">
            <div className="card">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem
                  question="What's a realistic ROI target for manufacturing equipment?"
                  answer="There is no universal ROI or payback target. Some shops look for projects whose modeled ROI comfortably exceeds their cost of capital, while others are willing to accept lower headline ROI for strategic capabilities or risk reduction. Use this calculator to compare scenarios, then weigh them against alternative ways you could deploy the same capital (e.g., debt reduction, other equipment, or financial investments)."
                />
                <FAQItem
                  question="Should I buy new or used equipment to improve ROI?"
                  answer="Used equipment is often significantly cheaper than new and can provide faster payback if demand is uncertain, but may come with shorter warranties, higher maintenance risk, or fewer modern features. New equipment typically offers longer support and current capabilities at a higher upfront cost. Many shops model both options in this calculator using their own purchase prices, expected uptime, and support assumptions before deciding."
                />
                <FAQItem
                  question="How do I calculate the opportunity cost of not investing?"
                  answer="Think about the gap between what you currently pay for outsourced work or missed opportunities and what it might cost to do that work in-house. This calculator can help you estimate the in-house side of that comparison. Instead of following a fixed rule of thumb, compare the annual opportunity cost you estimate with the modeled investment cost and risk profile for your specific situation."
                />
                <FAQItem
                  question="What utilization rate should I target for profitability?"
                  answer="Rather than aiming for a single utilization percentage, build scenarios that reflect your realistic workload, shift structure, and mix of setup versus cutting time. Distinguish between available machine hours and true billable hours, and check how sensitive your ROI results are to more conservative utilization assumptions. High modeled utilization may signal a capacity constraint, while very low utilization may indicate that a purchase is more strategic than purely financial."
                />
                <FAQItem
                  question="How do I account for productivity improvements in ROI calculations?"
                  answer="Productivity gains typically show up as higher output for the same time, lower operating cost per part, or reduced scrap and rework. In this calculator you can reflect those changes by adjusting monthly production, operating cost, and growth assumptions. It is often safer to model improvements conservatively and phase them in over time rather than assuming full theoretical gains from day one."
                />
                <FAQItem
                  question="Should I consider tax benefits in ROI calculations?"
                  answer="Yes. Tax deductions, accelerated depreciation, and local incentives can materially change the after-tax ROI of equipment purchases, and rules vary by country and over time. This calculator focuses on pre-tax cash flows, so you may want to run separate tax scenarios with your accountant or finance team and use those results alongside this tool when making decisions."
                />
                <FAQItem
                  question="How do I project revenue growth realistically for ROI analysis?"
                  answer="One approach is to separate more predictable revenue sources (such as insourcing existing outsourced work) from new or speculative demand, and to model a ramp-up period rather than full utilization on day one. This calculator lets you test different growth and utilization paths. Be cautious about relying on aggressive growth assumptions without concrete customer commitments, and consider stress-testing your ROI with slower ramps and weaker demand to understand downside risk."
                />
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Calculators</h2>
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
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
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
