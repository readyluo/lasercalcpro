import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';
import { BookOpen, DollarSign, Target, Ruler, Clock, ArrowRight, Calculator, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Laser Cutting & Manufacturing Guides - Complete Reference Library',
  description: 'Expert guides for laser cutting optimization: hourly cost calculation, piercing strategies, kerf compensation, finishing time estimates. Free comprehensive references for manufacturers.',
  keywords: ['laser cutting guide', 'manufacturing reference', 'cost calculation guide', 'laser processing best practices', 'manufacturing optimization', 'laser cutting handbook'],
});

const guides = [
  {
    id: 'hourly-cost-structure',
    title: 'Hourly Cost Structure: Complete Reference',
    description: 'Master laser cutting hourly rate calculation with comprehensive breakdown of all cost components: equipment depreciation, labor, energy, maintenance, and overhead allocation.',
    icon: DollarSign,
    color: 'from-blue-500 to-blue-600',
    href: '/guides/hourly-cost-structure',
    topics: [
      'Equipment depreciation calculation',
      'Direct labor cost with benefits',
      'Energy consumption & costs',
      'Maintenance & consumables',
      'Facility & overhead allocation',
      'Real-world cost examples',
    ],
    readTime: '12 min read',
    difficulty: 'Intermediate',
  },
  {
    id: 'piercing-strategy',
    title: 'Piercing Strategy: Time & Quality Trade-offs',
    description: 'Compare standard, soft, and ramp piercing strategies. Learn when to optimize for speed vs. quality, reduce nozzle wear, and minimize cycle time in high-hole-count parts.',
    icon: Target,
    color: 'from-orange-500 to-red-600',
    href: '/guides/piercing-strategy',
    topics: [
      'Standard vs soft vs ramp piercing',
      'Pierce time by material & thickness',
      'Nozzle life optimization',
      'Cost impact of pierce strategy',
      'Quality vs speed trade-offs',
      'Real-world optimization examples',
    ],
    readTime: '15 min read',
    difficulty: 'Intermediate',
  },
  {
    id: 'kerf-width-reference',
    title: 'Kerf Width vs. Thickness & Nozzle',
    description: 'Practical reference tables for laser cutting kerf width across materials, thicknesses, and nozzle sizes. Master kerf compensation for dimensional accuracy and optimal nesting.',
    icon: Ruler,
    color: 'from-purple-500 to-pink-600',
    href: '/guides/kerf-width-reference',
    topics: [
      'Kerf width reference tables',
      'Material & thickness impact',
      'Nozzle diameter selection',
      'CAM software compensation',
      'Dimensional accuracy tips',
      'How to measure actual kerf',
    ],
    readTime: '10 min read',
    difficulty: 'Beginner to Intermediate',
  },
  {
    id: 'finishing-time-cheatsheet',
    title: 'Post-Cut Finishing Time Cheat Sheet',
    description: 'Quick reference for deburring, cleaning, and finishing time estimates. Compare manual vs automated methods and understand the true cost of post-processing operations.',
    icon: Clock,
    color: 'from-green-500 to-teal-600',
    href: '/guides/finishing-time-cheatsheet',
    topics: [
      'Deburring methods comparison',
      'Time estimates by cut quality',
      'Manual vs automated finishing',
      'Cleaning & surface treatment',
      'Packaging & inspection time',
      'Real-world cost impact analysis',
    ],
    readTime: '8 min read',
    difficulty: 'Beginner',
  },
];

export default function GuidesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-16 w-16 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Laser Cutting & Manufacturing Guides
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Comprehensive reference library for laser cutting professionals. Master cost calculation, 
              optimize processes, and improve quality with our in-depth technical guides.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="card bg-gradient-to-br from-primary-50 to-blue-50 mb-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full mb-3">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Data-Driven</h3>
                <p className="text-sm text-gray-700">
                  Industry benchmarks, real-world measurements, and validated formulas you can trust
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full mb-3">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Actionable</h3>
                <p className="text-sm text-gray-700">
                  Step-by-step instructions, reference tables, and examples for immediate application
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full mb-3">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Comprehensive</h3>
                <p className="text-sm text-gray-700">
                  Cover all aspects from cost structure to finishing operations with cross-linked content
                </p>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Complete Guide Library</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {guides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link
                    key={guide.id}
                    href={guide.href}
                    className="card-hover group overflow-hidden"
                  >
                    {/* Header with gradient */}
                    <div className={`-mt-6 -mx-6 mb-6 p-6 bg-gradient-to-br ${guide.color} text-white`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Icon className="h-10 w-10" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 group-hover:underline">
                            {guide.title}
                          </h3>
                          <p className="text-white/90">
                            {guide.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn:</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {guide.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-primary-600 mt-0.5">✓</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {guide.readTime}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          guide.difficulty === 'Beginner' 
                            ? 'bg-green-100 text-green-700' 
                            : guide.difficulty === 'Intermediate'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {guide.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-primary-600 font-semibold">
                        <span>Read Guide</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Interactive Tools CTA */}
          <div className="card bg-gradient-to-br from-gray-900 to-gray-800 text-white mb-12">
            <div className="text-center">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-primary-400" />
              <h2 className="text-3xl font-bold mb-4">Put Knowledge Into Practice</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Each guide is paired with interactive calculators and tools. Apply what you learn 
                immediately to optimize your operations and improve profitability.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/calculators/cost-center"
                  className="btn-primary bg-primary-600 hover:bg-primary-700"
                >
                  <Calculator className="h-5 w-5" />
                  Explore Cost Center Tools
                </Link>
                <Link
                  href="/calculators/laser-cutting"
                  className="btn-secondary bg-white text-gray-900 hover:bg-gray-100"
                >
                  Main Laser Calculator
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tutorials */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Tutorials</h3>
              <p className="text-gray-700 mb-4">
                Practical, hands-on tutorials for common laser cutting workflows and optimization tasks.
              </p>
              <Link
                href="/blog/tutorials"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
              >
                Browse Tutorials
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Blog Articles */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Insights & Articles</h3>
              <p className="text-gray-700 mb-4">
                Latest trends, case studies, and best practices from the laser cutting and manufacturing industry.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
              >
                Read Blog Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

