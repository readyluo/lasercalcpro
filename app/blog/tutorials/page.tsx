import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'LaserCalc Pro Tutorials Library',
  description:
    'Step-by-step tutorials that demonstrate how to quote laser cutting, CNC machining, ROI, and energy costs using LaserCalc Pro calculators.',
};

export default function TutorialsLibraryPage() {
  return (
    <main className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Tutorials Library
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Guided playbooks for quoting and operations
          </h1>
          <p className="text-lg text-gray-600">
            Practical, step-by-step guides with real inputs, downloadable worksheets, and exportable checklists.
          </p>
        </header>

        <section className="mx-auto mt-12 max-w-5xl space-y-6">
          {modules.map(module => (
            <article key={module.title} className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="md:max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">
                    {module.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                    <Link href={module.href} className="hover:text-primary-600">
                      {module.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-gray-600">{module.description}</p>
                </div>
                <div className="flex flex-col items-start gap-2 text-sm text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                    {module.level}
                  </span>
                  <span>Duration: {module.duration}</span>
                  <span>Formats: {module.format}</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {module.takeaways.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href={module.href} className="text-sm font-semibold text-primary-600 hover:underline">
                  Open tutorial →
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-12 max-w-4xl rounded-3xl bg-white p-8 text-center shadow-md">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">Need a specific workflow covered?</h2>
          <p className="mb-6 text-gray-600">
            Tell us what you want to learn—complex nesting, quoting automation, ROI storytelling, or
            anything else. We will prioritise the tutorials with the most votes.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-primary btn-lg inline-flex w-full items-center justify-center rounded-xl sm:w-auto"
            >
              Request a topic
            </Link>
            <Link
              href="/subscribe"
              className="btn-outline btn-lg inline-flex w-full items-center justify-center rounded-xl sm:w-auto"
            >
              Subscribe for updates
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

const modules = [
  {
    category: 'Laser Cutting Pricing',
    title: 'From CAD to Quote: Laser cutting workflows in 20 minutes',
    description:
      'Upload 2D profiles, input material specs, configure gas & energy parameters, and produce an exportable customer-ready quote.',
    level: 'Intermediate',
    duration: '20 min',
    format: 'Video + PDF worksheet',
    href: '/blog/tutorials/cad-to-quote',
    takeaways: [
      'How to prep DXF/SVG files for accurate path length detection',
      'Setting realistic gas, labor, and overhead assumptions',
      'Exporting branded PDF reports and versioning quotes',
    ],
  },
  {
    category: 'CNC Machining',
    title: 'Precision CNC cost breakdown with volume pricing tiers',
    description:
      'Build reliable per-part margins by accounting for setup amortization, tooling wear, and machine utilisation targets.',
    level: 'Advanced',
    duration: '25 min',
    format: 'Interactive walkthrough',
    href: '/blog/tutorials/cnc-volume-pricing',
    takeaways: [
      'Estimating spindle time and batch sizes for mill vs. lathe jobs',
      'Modelling tooling life and consumable costs in your quote',
      'Creating tiered pricing offers for prototype and production runs',
    ],
  },
  {
    category: 'Financial Planning',
    title: 'Narrating equipment ROI to CFOs and bank partners',
    description:
      'Translate ROI calculator outputs into board-ready decks with payback sensitivities and risk mitigation talking points.',
    level: 'Strategic',
    duration: '18 min',
    format: 'Template + case study',
    href: '/blog/tutorials/equipment-roi-narrative',
    takeaways: [
      'Mapping utilisation scenarios and stress-testing downside cases',
      'Framing CAPEX justification using NPV and IRR snapshots',
      'Aligning energy savings, labour productivity, and finance incentives',
    ],
  },
  {
    category: 'Nesting & Utilisation',
    title: 'Complex nesting for 80–90% material utilisation (hands-on)',
    description:
      'Apply grouping/rotation, kerf compensation, and lead-ins to lift utilisation and lower cost per part.',
    level: 'Intermediate',
    duration: '22 min',
    format: 'Hands-on guide + checklist',
    href: '/blog/tutorials/complex-nesting-pro',
    takeaways: [
      'Measure baseline utilisation and cost/part',
      'Apply rotations and grouping to reduce scrap',
      'Use kerf offsets and clean lead-ins to reduce rework',
    ],
  },
  {
    category: 'Quoting Ops',
    title: 'Quoting automation: from inputs to versioned offers in minutes',
    description:
      'Standardise assumptions, generate tiered pricing, export PDFs, and track revisions systematically.',
    level: 'Intermediate',
    duration: '24 min',
    format: 'Playbook + templates',
    href: '/blog/tutorials/quoting-automation-playbook',
    takeaways: [
      'Quarterly lock of cost assumptions和margin bands',
      '生成多阶梯价格与折扣冲击校验',
      'PDF导出与版本化归档流程',
    ],
  },
  {
    category: 'Process Parameters',
    title: 'Assist gas strategy: cost, quality, and speed trade-offs',
    description:
      '选择 O₂/N₂/Air 以平衡边缘质量、切割速度与总成本；避免不必要的气压浪费。',
    level: 'Fundamental',
    duration: '16 min',
    format: 'Reference + calculator links',
    href: '/blog/tutorials/laser-assist-gas-strategy',
    takeaways: [
      '不同材料/厚度的助气选择',
      '以 m³×单价 量化气体成本并纳入小时费率',
      '喷嘴与压力优化，降低总成本',
    ],
  },
];








