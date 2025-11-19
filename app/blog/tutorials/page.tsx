import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Award, Download, FileText, CheckCircle2, Calculator } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Tutorials Library - Manufacturing Cost Calculation Guides | LaserCalc Pro',
  description: 'Comprehensive step-by-step tutorials for laser cutting quotes, CNC machining cost breakdowns, ROI analysis, and material optimization. Includes worksheets, templates, and real-world examples.',
  keywords: ['laser cutting tutorial', 'CNC machining guide', 'manufacturing cost calculation', 'ROI analysis', 'nesting optimization'],
};

interface Tutorial {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  extendedDescription: string;
  level: 'Fundamental' | 'Intermediate' | 'Advanced' | 'Strategic';
  duration: string;
  format: string;
  href: string;
  takeaways: string[];
  prerequisites?: string[];
  tools: string[];
  outcomes: string[];
  downloads?: Array<{ name: string; url: string; type: string }>;
}

const tutorials: Tutorial[] = [
  {
    id: 'cad-to-quote',
    category: 'Laser Cutting Pricing',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'From CAD to Quote: Complete Laser Cutting Workflow',
    description: 'Master the end-to-end process of converting CAD files into accurate, profitable laser cutting quotes.',
    extendedDescription: 'This comprehensive tutorial walks you through the complete workflow from receiving customer CAD files to delivering professional quotes. Learn industry-standard techniques for file preparation, cost estimation, and quote generation that ensure accuracy while maintaining healthy profit margins.',
    level: 'Intermediate',
    duration: '20 min',
    format: 'Online guide',
    href: '/blog/tutorials/cad-to-quote',
    takeaways: [
      'Prepare and validate DXF/SVG files for accurate path length detection and cost estimation',
      'Configure realistic gas consumption rates, labor hours, and overhead allocation percentages',
      'Calculate material costs with kerf compensation and scrap allowances',
      'Generate branded PDF quote reports with detailed cost breakdowns and payment terms',
      'Implement version control for quote revisions and customer negotiations',
    ],
    prerequisites: [
      'Basic understanding of laser cutting processes',
      'Familiarity with CAD file formats (DXF, SVG)',
    ],
    tools: ['LaserCalc Cutting Calculator', 'Material Database'],
    downloads: [
      { name: 'CAD to Quote Workflow Worksheet', url: '/downloads/tutorials/cad-to-quote-worksheet.md', type: 'Worksheet' },
      { name: 'Cost Calculator Template', url: '/downloads/tutorials/laser-cutting-cost-calculator.csv', type: 'Excel' },
    ],
    outcomes: [
      'Create accurate quotes in under 10 minutes',
      'Reduce quote errors by 40%+',
      'Improve quote-to-order conversion rates',
    ],
  },
  {
    id: 'cnc-volume-pricing',
    category: 'CNC Machining',
    categoryColor: 'bg-purple-100 text-purple-700',
    title: 'Precision CNC Cost Breakdown with Volume Pricing Tiers',
    description: 'Build reliable per-part margins by accurately accounting for setup time, tooling wear, and batch economics.',
    extendedDescription: 'Advanced CNC cost modeling that goes beyond simple hourly rates. Learn how to structure tiered pricing that incentivizes larger orders while maintaining profitability at all volume levels. Includes detailed breakdowns of setup amortization, tooling life cycles, and machine utilization optimization.',
    level: 'Advanced',
    duration: '25 min',
    format: 'Interactive guide',
    href: '/blog/tutorials/cnc-volume-pricing',
    takeaways: [
      'Calculate true setup costs and amortize across batch sizes for mill, lathe, and multi-axis operations',
      'Model tooling life expectancy and consumable costs per part based on material hardness and cutting parameters',
      'Design tiered pricing structures: prototype (1-10 pcs), small batch (11-100 pcs), and production (100+ pcs)',
      'Factor in machine utilization targets and opportunity costs for optimal pricing',
      'Create automated pricing tables that adjust margins based on complexity and volume',
    ],
    prerequisites: [
      'Experience with CNC machining operations',
      'Understanding of machining parameters and tooling',
    ],
    tools: ['CNC Machining Calculator'],
    downloads: [
      { name: 'Volume Pricing Calculator', url: '/downloads/tutorials/laser-cutting-cost-calculator.csv', type: 'Excel' },
    ],
    outcomes: [
      'Increase average order value by 35%',
      'Optimize tooling budget allocation',
      'Win more high-volume contracts',
    ],
  },
  {
    id: 'equipment-roi-narrative',
    category: 'Financial Planning',
    categoryColor: 'bg-green-100 text-green-700',
    title: 'Equipment ROI Analysis for CFOs and Financial Partners',
    description: 'Transform calculator outputs into compelling board-ready presentations with payback analysis and risk scenarios.',
    extendedDescription: 'Strategic guide for manufacturing leaders seeking capital equipment approval. Learn how to frame your ROI analysis in financial terms that resonate with CFOs, bank loan officers, and board members. Includes sensitivity analysis templates and risk mitigation frameworks.',
    level: 'Strategic',
    duration: '18 min',
    format: 'Detailed guide with case study',
    href: '/blog/tutorials/equipment-roi-narrative',
    takeaways: [
      'Map utilization scenarios: conservative (50%), target (70%), and optimistic (90%) capacity',
      'Stress-test downside cases: 20% sales shortfall, 30% longer ramp-up, and delayed customer contracts',
      'Frame CAPEX justification using NPV, IRR, and payback period with industry benchmark comparisons',
      'Quantify labor productivity gains, energy efficiency improvements, and quality reduction benefits',
      'Align equipment investment with available finance incentives, tax credits, and depreciation strategies',
    ],
    prerequisites: [
      'Basic financial literacy (ROI, NPV, IRR concepts)',
      'Understanding of manufacturing capacity planning',
    ],
    tools: ['ROI Calculator'],
    downloads: [
      { name: 'Equipment ROI Analysis Template', url: '/downloads/tutorials/equipment-roi-analysis-template.csv', type: 'Excel' },
    ],
    outcomes: [
      'Increase equipment approval rates',
      'Secure better financing terms',
      'Build confidence with financial stakeholders',
    ],
  },
  {
    id: 'complex-nesting-pro',
    category: 'Material Optimization',
    categoryColor: 'bg-orange-100 text-orange-700',
    title: 'Advanced Nesting Strategies for 80-90% Material Utilization',
    description: 'Master complex nesting techniques including part rotation, kerf compensation, and lead-in optimization to minimize scrap.',
    extendedDescription: 'Hands-on practical guide to achieving exceptional material utilization rates through advanced nesting strategies. Learn professional techniques used by high-efficiency job shops to reduce material waste and lower per-part costs.',
    level: 'Intermediate',
    duration: '22 min',
    format: 'Hands-on practical guide',
    href: '/blog/tutorials/complex-nesting-pro',
    takeaways: [
      'Measure baseline utilization rates and identify improvement opportunities with utilization audit checklist',
      'Apply intelligent part rotation (0°, 90°, 180°, 270°) and grouping strategies to maximize sheet density',
      'Implement kerf compensation offsets (0.1-0.3mm typical) to maintain part tolerances while optimizing spacing',
      'Design efficient lead-ins and lead-outs that minimize thermal distortion and reduce cycle time',
      'Balance utilization goals with production efficiency: when 75% utilization beats 90% due to setup time',
    ],
    prerequisites: [
      'Basic CAD/CAM software skills',
      'Understanding of laser cutting kerf and tolerances',
    ],
    tools: ['Material Utilization Calculator'],
    downloads: [
      { name: 'Material Nesting Optimization Checklist', url: '/downloads/tutorials/material-nesting-checklist.md', type: 'Checklist' },
    ],
    outcomes: [
      'Reduce material costs by 15-25%',
      'Lower cost per part by $0.50-$2.00',
      'Improve job profitability without price increases',
    ],
  },
  {
    id: 'quoting-automation-playbook',
    category: 'Process Automation',
    categoryColor: 'bg-indigo-100 text-indigo-700',
    title: 'Quoting Automation: From Manual to Systematic Quote Generation',
    description: 'Build a repeatable quoting system that standardizes assumptions, generates tiered pricing, and tracks revisions automatically.',
    extendedDescription: 'Comprehensive playbook for transforming ad-hoc quoting into a streamlined, professional process. Learn how to create standardized cost assumptions, implement tiered pricing structures, and maintain version control for all customer quotes.',
    level: 'Intermediate',
    duration: '24 min',
    format: 'Comprehensive playbook',
    href: '/blog/tutorials/quoting-automation-playbook',
    takeaways: [
      'Establish quarterly cost assumption reviews: lock material costs, labor rates, overhead percentages, and target margin bands',
      'Generate automated multi-tier pricing: economy (1-10 units), standard (11-50 units), and volume (50+ units) with discount validation',
      'Implement PDF export workflows with customer branding, detailed breakdowns, and terms & conditions',
      'Create version control system for quote revisions with change tracking and approval workflows',
      'Set up automated follow-up sequences and quote expiration management',
    ],
    prerequisites: [
      'Experience with quote preparation',
      'Basic Excel or spreadsheet skills',
    ],
    tools: ['Quotation Margin Calculator'],
    downloads: [
      { name: 'Quoting Process Checklist', url: '/downloads/tutorials/quoting-process-checklist.md', type: 'Checklist' },
      { name: 'Quote Calculator Template', url: '/downloads/tutorials/laser-cutting-cost-calculator.csv', type: 'Excel' },
    ],
    outcomes: [
      'Reduce quote preparation time by 60%',
      'Eliminate pricing errors and inconsistencies',
      'Improve quote tracking and follow-up',
    ],
  },
  {
    id: 'laser-assist-gas-strategy',
    category: 'Process Optimization',
    categoryColor: 'bg-red-100 text-red-700',
    title: 'Assist Gas Strategy: Balancing Cost, Quality, and Speed',
    description: 'Optimize your assist gas selection (O₂, N₂, Air) to achieve the best balance of edge quality, cutting speed, and total operating costs.',
    extendedDescription: 'Technical guide to assist gas selection and optimization for laser cutting operations. Learn when to use oxygen for speed, nitrogen for quality, or compressed air for economy, and how to quantify the cost-quality trade-offs.',
    level: 'Fundamental',
    duration: '16 min',
    format: 'Technical reference guide',
    href: '/blog/tutorials/laser-assist-gas-strategy',
    takeaways: [
      'Select optimal assist gas by material and thickness: oxygen for mild steel 1-20mm (fastest), nitrogen for stainless/aluminum (oxide-free edges), compressed air for thin materials (most economical)',
      'Quantify gas costs using volumetric consumption rates: calculate m³/hour × gas price and integrate into machine hour rates',
      'Optimize nozzle selection and pressure settings: reduce consumption by 20-40% without sacrificing cut quality through proper setup',
      'Balance total cost of ownership: sometimes nitrogen at 2x cost delivers 3x value through eliminated secondary operations',
      'Implement gas consumption monitoring and leak detection protocols to prevent unnecessary waste',
    ],
    prerequisites: [
      'Basic knowledge of laser cutting processes',
      'Understanding of material properties',
    ],
    tools: ['Assist Gas Calculator'],
    downloads: [
      { name: 'Gas Cost Calculator', url: '/downloads/tutorials/laser-cutting-cost-calculator.csv', type: 'Excel' },
    ],
    outcomes: [
      'Reduce gas costs by 15-30%',
      'Improve edge quality consistency',
      'Optimize gas purchasing decisions',
    ],
  },
  {
    id: 'overhead-allocation',
    category: 'Cost Accounting',
    categoryColor: 'bg-teal-100 text-teal-700',
    title: 'Overhead Allocation Strategies for Accurate Job Costing',
    description: 'Master overhead allocation methods to ensure every quote captures your true costs including rent, utilities, insurance, and indirect labor.',
    extendedDescription: 'Detailed guide to manufacturing overhead allocation that ensures accurate job costing and sustainable pricing. Learn multiple allocation methods and when to apply each for different shop configurations and job types.',
    level: 'Advanced',
    duration: '28 min',
    format: 'Interactive tutorial with case studies',
    href: '/blog/tutorials/overhead-allocation',
    takeaways: [
      'Calculate total overhead burden: facilities (rent, utilities, insurance), equipment (maintenance, depreciation), and indirect labor (supervision, quality control, scheduling)',
      'Apply allocation methods: machine hour rate (best for capital-intensive shops), direct labor percentage (traditional job shops), activity-based costing (complex multi-process shops)',
      'Differentiate fixed vs. variable overhead: adjust allocation rates based on capacity utilization (70% vs. 95% utilization scenarios)',
      'Create department-specific overhead pools: laser cutting (high equipment depreciation) vs. finishing (high labor) have different overhead profiles',
      'Review and adjust quarterly: prevent over/under-absorption with regular rate reconciliation and true-up adjustments',
    ],
    prerequisites: [
      'Basic cost accounting knowledge',
      'Access to financial statements and cost records',
    ],
    tools: ['Overhead Allocator Calculator'],
    downloads: [
      { name: 'Overhead Allocation Calculator', url: '/downloads/tutorials/overhead-allocation-calculator.csv', type: 'Excel' },
    ],
    outcomes: [
      'Eliminate under-costed jobs',
      'Improve gross margin accuracy',
      'Make better pricing decisions',
    ],
  },
  {
    id: 'competitive-benchmarking',
    category: 'Market Analysis',
    categoryColor: 'bg-pink-100 text-pink-700',
    title: 'Competitive Pricing Analysis and Market Positioning',
    description: 'Use market data and competitor analysis to position your pricing strategically while maintaining profitability.',
    extendedDescription: 'Strategic pricing tutorial that combines cost-based pricing with market intelligence. Learn how to research competitor pricing, identify your competitive advantages, and structure pricing that wins profitable business.',
    level: 'Strategic',
    duration: '21 min',
    format: 'Strategic framework guide',
    href: '/blog/tutorials/competitive-benchmarking',
    takeaways: [
      'Conduct competitor pricing research: collect samples quotes, analyze online pricing calculators, and interview sales teams for market intelligence',
      'Map your capabilities against competitors: identify differentiation factors (lead time, quality, capacity, service) that justify premium or value pricing',
      'Calculate price elasticity by segment: prototype customers (less price-sensitive) vs. production customers (highly price-sensitive) require different approaches',
      'Develop value-based pricing strategies: package speed, quality, and service into tiered offerings (economy, standard, premium)',
      'Monitor win/loss patterns: track quote-to-order conversion rates by price point and adjust positioning quarterly',
    ],
    prerequisites: [
      'Understanding of market dynamics',
      'Sales and quote tracking data',
    ],
    tools: ['Quotation Margin Simulator'],
    downloads: [
      { name: 'Competitive Analysis Template', url: '/downloads/tutorials/laser-cutting-cost-calculator.csv', type: 'Excel' },
    ],
    outcomes: [
      'Improve quote win rates by 20-35%',
      'Identify underpriced service offerings',
      'Develop defensible pricing strategies',
    ],
  },
];

const levelColors = {
  'Fundamental': 'bg-gray-100 text-gray-800',
  'Intermediate': 'bg-blue-100 text-blue-800',
  'Advanced': 'bg-purple-100 text-purple-800',
  'Strategic': 'bg-amber-100 text-amber-800',
};

export default function TutorialsLibraryPage() {
  return (
    <div>
      <Navigation />
      <main className="bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-semibold">Professional Tutorial Library</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Manufacturing Cost Mastery Tutorials
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Comprehensive, step-by-step guides with real-world examples, downloadable worksheets, Excel templates, and actionable checklists to help you master manufacturing cost calculations.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Detailed Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>PDF Worksheets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  <span>Excel Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Checklists</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Tutorial Comparison Table */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Quick Comparison</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Tutorial</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Level</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Duration</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Key Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tutorials.map((tutorial, idx) => (
                    <tr key={tutorial.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        <Link href={tutorial.href} className="font-medium text-primary-600 hover:text-primary-700">
                          {tutorial.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${levelColors[tutorial.level]}`}>
                          {tutorial.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tutorial.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{tutorial.outcomes[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Tutorials */}
        <div className="max-w-6xl mx-auto space-y-8">
          {tutorials.map((tutorial) => (
            <article
              key={tutorial.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${tutorial.categoryColor} mb-3`}>
                          {tutorial.category}
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          <Link href={tutorial.href} className="hover:text-primary-600 transition-colors">
                            {tutorial.title}
                          </Link>
                        </h2>
                        <p className="text-lg text-gray-600 mb-4">{tutorial.description}</p>
                        <p className="text-gray-700 leading-relaxed">{tutorial.extendedDescription}</p>
                      </div>
                    </div>

                    {/* Key Takeaways */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        What You'll Learn
                      </h4>
                      <ul className="space-y-2">
                        {tutorial.takeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected Outcomes */}
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Expected Outcomes
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {tutorial.outcomes.map((outcome, idx) => (
                          <span key={idx} className="text-sm text-green-800 bg-white px-3 py-1 rounded-full border border-green-300">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:w-72 flex-shrink-0 space-y-4">
                    {/* Meta Info */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Level</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[tutorial.level]}`}>
                            {tutorial.level}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium text-gray-900 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {tutorial.duration}
                          </span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-gray-600">Format</span>
                          <span className="font-medium text-gray-900 text-right">{tutorial.format}</span>
                        </div>
                      </div>
                    </div>

                    {/* Related Calculators */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h5 className="font-semibold text-blue-900 mb-2 text-sm">Related Calculators</h5>
                      <ul className="space-y-1.5 text-sm text-blue-800">
                        {tutorial.tools.map((tool, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Calculator className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                            <span>{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Downloadable Resources */}
                    {tutorial.downloads && tutorial.downloads.length > 0 && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-2 text-sm">Download Resources</h5>
                        <ul className="space-y-2">
                          {tutorial.downloads.map((download, idx) => (
                            <li key={idx}>
                              <a
                                href={download.url}
                                download
                                className="flex items-center gap-2 text-sm text-green-800 hover:text-green-900 hover:underline"
                              >
                                <Download className="h-3.5 w-3.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div>{download.name}</div>
                                  <div className="text-xs text-green-600">{download.type}</div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Prerequisites */}
                    {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <h5 className="font-semibold text-amber-900 mb-2 text-sm">Prerequisites</h5>
                        <ul className="space-y-1.5 text-sm text-amber-800">
                          {tutorial.prerequisites.map((prereq, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                              <span>{prereq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      href={tutorial.href}
                      className="block w-full px-6 py-3 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                    >
                      Start Tutorial →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Request Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-200 p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need a Specific Workflow Covered?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Tell us what you want to learn—complex nesting algorithms, quoting automation workflows, ROI storytelling frameworks, or any other manufacturing cost topic. We prioritize tutorials based on community demand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
              >
                Request a Tutorial Topic
              </Link>
              <Link
                href="/subscribe"
                className="px-8 py-4 bg-white border-2 border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
              >
                Subscribe for Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
