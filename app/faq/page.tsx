import { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { MessageCircle, HelpCircle, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'Frequently Asked Questions - LaserCalc Pro',
  description: 'Find answers to common questions about laser cutting cost calculators, CNC machining estimators, and manufacturing cost analysis tools. Learn how to use our tools effectively.',
  keywords: ['laser cutting calculator FAQ', 'CNC cost estimator questions', 'manufacturing calculator help', 'cost analysis tools guide'],
  openGraph: {
    title: 'FAQ - LaserCalc Pro Cost Calculators',
    description: 'Everything you need to know about using our manufacturing cost calculators.',
  }
});

// FAQ data organized by category
const faqCategories = [
  {
    id: 'about',
    title: 'About the Platform',
    icon: <HelpCircle className="h-6 w-6" />,
    description: 'Learn about LaserCalc Pro and our mission',
    faqs: [
      {
        question: 'What is LaserCalc Pro?',
        answer: 'LaserCalc Pro is a comprehensive web platform offering professional-grade manufacturing cost calculators for laser cutting, CNC machining, equipment ROI analysis, energy consumption, and material utilization. Our tools are designed to help manufacturers, engineers, and business decision-makers make informed cost decisions quickly and accurately.'
      },
      {
        question: 'Are the calculators really free to use?',
        answer: 'Yes! All our calculators are 100% free with no hidden fees, registration requirements, or usage limits. We believe in providing valuable tools to the manufacturing community. Our platform is supported by ethical advertising and partnerships.'
      },
      {
        question: 'How accurate are the cost calculations?',
        answer: 'Our calculators use industry-standard formulas calibrated against real-world data from manufacturing facilities worldwide. Typical accuracy is approximately 90-98% for standard scenarios. However, results are estimates and should be verified by professionals before making critical business decisions. Actual costs may vary based on specific equipment, materials, regional factors, and operational conditions.'
      },
      {
        question: 'What makes LaserCalc Pro different from other cost calculators?',
        answer: 'We offer comprehensive, professionally-designed calculators that cover multiple aspects of manufacturing costs - not just basic estimates. Our tools include material utilization optimization, batch pricing analysis, detailed cost breakdowns, interactive charts, PDF export capabilities, and are all backed by documented methodology. We focus on accuracy, transparency, and ease of use.'
      },
      {
        question: 'How do you protect my data?',
        answer: 'Your calculation data is processed locally in your browser and is not stored on our servers unless you explicitly save results or subscribe. We respect your privacy and do not collect or share specific calculation details. We only collect anonymized usage statistics to improve our tools. See our Privacy Policy for complete details.'
      }
    ]
  },
  {
    id: 'usage',
    title: 'Using the Calculators',
    icon: <BookOpen className="h-6 w-6" />,
    description: 'How to use our tools effectively',
    faqs: [
      {
        question: 'How do I use the laser cutting cost calculator?',
        answer: 'Using the laser cutting calculator is simple: (1) Select your material type and thickness, (2) Enter cutting length and piercing points, (3) Input your machine power and operating costs, (4) Review the detailed cost breakdown including material, energy, labor, gas, and depreciation. You can adjust any parameter in real-time to see how it affects total cost. Export results as PDF for client presentations or internal analysis.'
      },
      {
        question: 'Which calculator should I use for my project?',
        answer: 'Choose based on your primary need: Use the Laser Cutting Calculator for sheet metal cutting costs; CNC Machining Calculator for milling, drilling, and turning operations; ROI Calculator when evaluating equipment purchases; Energy Cost Calculator for power consumption analysis; Material Utilization Calculator for optimizing material usage and reducing waste. Visit our Calculator Comparison page for detailed guidance.'
      },
      {
        question: 'Can I export calculation results?',
        answer: 'Absolutely! Every calculator includes a professional PDF export feature. Reports include detailed cost breakdowns, input parameters, charts, methodology notes, and disclaimers - perfect for client quotes, internal reviews, management presentations, or record keeping. PDFs are generated instantly in your browser with no upload required.'
      },
      {
        question: 'How do I save my calculation history?',
        answer: 'Currently, calculations are stored in your browser\'s local storage for quick access during your session. To keep permanent records, we recommend exporting results as PDF files. For registered users (coming soon), we\'ll offer cloud-based calculation history with search and organization features.'
      },
      {
        question: 'What materials and processes are supported?',
        answer: 'Our laser cutting calculator supports common metals (stainless steel, mild steel, aluminum, copper, brass) and thicknesses from 0.5mm to 50mm. The CNC calculator covers aluminum, steel, titanium, plastics, and composites. Material properties are based on industry standards. If your material isn\'t listed, use the "custom material" option or contact us to request additions.'
      },
      {
        question: 'How do I understand the cost breakdown?',
        answer: 'Each calculator provides detailed cost components: Material Cost (raw material at current market rates), Labor Cost (operator time at your hourly rate), Machine Cost (depreciation and maintenance), Energy Cost (power consumption), Consumables (gas, coolant, tooling), and Overhead (typically 15-25% of direct costs). Hover over any item for detailed explanations. Visit our Guides section for in-depth methodology documentation.'
      },
      {
        question: 'Do calculators work on mobile devices?',
        answer: 'Yes! All our calculators are fully responsive and optimized for desktop, tablet, and mobile devices. The interface adapts to your screen size for comfortable use anywhere. For complex calculations with many parameters, we recommend desktop or tablet for the best experience. PDFs export correctly on all devices.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Questions',
    icon: <MessageCircle className="h-6 w-6" />,
    description: 'Technical details and troubleshooting',
    faqs: [
      {
        question: 'Why might calculation results differ from my actual costs?',
        answer: 'Variations can occur due to: (1) Machine-specific efficiency differences, (2) Operator skill levels, (3) Material grade variations, (4) Regional cost differences (energy rates, labor costs), (5) Setup and changeover times not fully accounted for, (6) Quality requirements affecting speed, (7) Machine maintenance status. We recommend adding a 10-20% safety margin and calibrating our formulas with your actual historical data.'
      },
      {
        question: 'What are the calculation formulas based on?',
        answer: 'Our formulas are derived from: Industry standards (ASME, ISO), Published engineering references, Empirical data from manufacturing facilities, Equipment manufacturer specifications, and Academic research. Detailed methodology and assumptions are documented on our Methodology page for transparency. All calculations are regularly reviewed and updated.'
      },
      {
        question: 'How do I adjust parameters for my specific shop?',
        answer: 'Most calculators allow custom inputs for: Hourly labor rates, Energy costs ($/kWh), Machine depreciation periods, Overhead percentages, Material costs, and Setup times. Use your actual shop rates for the most accurate estimates. Save your "shop profile" (feature coming soon) for quick future calculations with your standard rates.'
      },
      {
        question: 'Why is the page loading slowly?',
        answer: 'Slow loading can be caused by: Poor internet connection, Browser caching issues (try clearing cache), Ad blockers interfering with scripts (whitelist our site), or Outdated browser version. Our calculators are optimized to load in under 2 seconds on standard connections. If problems persist, contact us with your browser and device details.'
      },
      {
        question: 'What browsers and devices are supported?',
        answer: 'Our calculators work on all modern browsers: Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. Mobile browsers are fully supported. We recommend keeping your browser updated for the best performance, security, and features. Internet Explorer is not supported. JavaScript must be enabled.'
      }
    ]
  },
  {
    id: 'business',
    title: 'Business & Collaboration',
    icon: <Users className="h-6 w-6" />,
    description: 'Commercial use and partnerships',
    faqs: [
      {
        question: 'Can I use these calculators for commercial quotes?',
        answer: 'Yes! Many manufacturers, job shops, and fabricators use our calculators as a foundation for customer quotes and internal cost analysis. However, we recommend: (1) Adding appropriate safety margins (typically 10-20%) for business risk, (2) Verifying critical calculations independently, (3) Including a disclaimer that estimates are subject to actual inspection, (4) Confirming material availability and pricing. See our Terms of Service for usage guidelines.'
      },
      {
        question: 'Do I need an account to use the calculators?',
        answer: 'No account required! All calculators are instantly accessible without registration. However, subscribing to our newsletter (optional) gives you: Exclusive calculation tips, Industry cost trend updates, New feature announcements, Advanced guides and case studies, and Access to our community forum (coming soon).'
      },
      {
        question: 'Can I embed these calculators on my website?',
        answer: 'We offer calculator embedding for business partners and educational institutions. Embedded widgets can be customized with your branding and default parameters. Contact us at partners@lasercalc.pro to discuss integration options, API access, and partnership opportunities. White-label solutions are available for enterprise clients.'
      },
      {
        question: 'Do you provide API access?',
        answer: 'API access is currently in beta testing for selected partners. Our API allows programmatic access to calculation engines for integration with ERP systems, quoting software, or custom applications. Contact our business development team to discuss API access, pricing, rate limits, and documentation. Public API launch is planned for Q2 2026.'
      },
      {
        question: 'How can I partner with LaserCalc Pro?',
        answer: 'We welcome partnerships with: Equipment manufacturers (co-marketing opportunities), Material suppliers (material database integration), Software companies (API integration), Industry associations (educational content collaboration), and Educational institutions (free access for students). Visit our Partnerships page or contact partnerships@lasercalc.pro to explore opportunities.'
      },
      {
        question: 'Can I contribute content or suggest features?',
        answer: 'Absolutely! We value community input. You can: Submit feature requests through our contact form, Propose new calculator types or materials, Contribute case studies or best practices, Report bugs or accuracy issues, or Suggest improvements to existing tools. Active contributors may be featured on our site and receive early access to new features.'
      }
    ]
  }
];

export default function FAQPage() {
  // Generate FAQ schema for all questions
  const allFAQs = faqCategories.flatMap(category => category.faqs);
  const faqSchema = generateFAQSchema(allFAQs);

  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mb-8 text-xl text-primary-100 md:text-2xl">
                Everything you need to know about LaserCalc Pro calculators
              </p>
              <p className="text-lg text-primary-200">
                Find quick answers to common questions, or{' '}
                <Link href="/contact" className="font-semibold text-white underline hover:text-primary-100">
                  contact us
                </Link>
                {' '}for personalized support
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="border-b border-gray-200 bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-lg font-semibold text-gray-700">
                Jump to Section
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {faqCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md"
                  >
                    <div className="flex-shrink-0 text-primary-600 transition-colors group-hover:text-primary-700">
                      {category.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-primary-700">
                        {category.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {category.faqs.length} questions
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-16">
              {faqCategories.map((category, categoryIndex) => (
                <div key={category.id} id={category.id} className="scroll-mt-20">
                  {/* Category Header */}
                  <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                          {category.title}
                        </h2>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="h-1 w-24 rounded-full bg-primary-600"></div>
                  </div>

                  {/* Accordion */}
                  <FAQAccordion 
                    faqs={category.faqs} 
                    categoryId={category.id}
                    defaultOpenIndex={categoryIndex === 0 ? 0 : null}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-gray-200 bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Still Have Questions?
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </Link>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-8 py-4 font-semibold text-primary-600 transition-all hover:bg-primary-50"
                >
                  <BookOpen className="h-5 w-5" />
                  Browse Guides
                </Link>
              </div>
              
              {/* Additional Resources */}
              <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-2 font-semibold text-gray-900">Documentation</h3>
                  <p className="mb-3 text-sm text-gray-600">
                    Detailed guides on using our calculators effectively
                  </p>
                  <Link href="/guides" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                    View Guides →
                  </Link>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-2 font-semibold text-gray-900">Methodology</h3>
                  <p className="mb-3 text-sm text-gray-600">
                    Understand the formulas and assumptions behind calculations
                  </p>
                  <Link href="/methodology" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Read More →
                  </Link>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-2 font-semibold text-gray-900">Blog & Tutorials</h3>
                  <p className="mb-3 text-sm text-gray-600">
                    Learn best practices and industry insights
                  </p>
                  <Link href="/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Explore Blog →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

