import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';
import { Calculator, Target, Users, TrendingUp } from 'lucide-react';

export const metadata = generateMetadata({
  title: 'About Us',
  description: 'Learn about LaserCalc Pro - professional manufacturing cost calculators trusted by manufacturers worldwide.',
  keywords: ['about laserCalc Pro', 'manufacturing tools', 'cost estimation'],
});

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              About LaserCalc Pro
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Professional manufacturing cost calculators designed to help businesses make informed decisions.
            </p>
          </div>

          {/* Mission Section */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              LaserCalc Pro was created to bridge the gap between complex manufacturing calculations and 
              practical business decisions. We provide free, accurate, and easy-to-use tools that help 
              manufacturers, engineers, and business owners estimate costs, optimize operations, and 
              improve profitability.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Our platform combines industry-standard formulas, real manufacturing data, and modern 
              technology to deliver reliable calculations that professionals can trust.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
              What We Stand For
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Calculator className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Accuracy</h3>
                <p className="text-gray-600">
                  Industry-standard formulas and validated calculations you can rely on.
                </p>
              </div>

              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Simplicity</h3>
                <p className="text-gray-600">
                  Complex calculations made simple and accessible for everyone.
                </p>
              </div>

              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Transparency</h3>
                <p className="text-gray-600">
                  Clear formulas and detailed breakdowns of every calculation.
                </p>
              </div>

              <div className="card text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                  <TrendingUp className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                <p className="text-gray-600">
                  Continuously improving and adding new tools based on user feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why Choose LaserCalc Pro?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Free Forever
                </h3>
                <p className="text-gray-700">
                  All calculators are completely free to use with no hidden charges or subscriptions.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ No Registration Required
                </h3>
                <p className="text-gray-700">
                  Start calculating immediately without creating an account or providing personal information.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Industry-Standard Formulas
                </h3>
                <p className="text-gray-700">
                  Based on proven manufacturing formulas used by professionals worldwide.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Detailed Reports
                </h3>
                <p className="text-gray-700">
                  Export comprehensive PDF reports with full cost breakdowns and recommendations.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Mobile Friendly
                </h3>
                <p className="text-gray-700">
                  Access all tools seamlessly from any device - desktop, tablet, or mobile.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ✓ Regular Updates
                </h3>
                <p className="text-gray-700">
                  Continuously updated with new features, calculators, and improvements.
                </p>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="card mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Who We Serve</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Manufacturing Companies</h3>
                <p className="text-gray-700">
                  Estimate job costs, optimize pricing strategies, and improve profitability.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Engineers & Designers</h3>
                <p className="text-gray-700">
                  Quickly evaluate manufacturing costs during the design phase to optimize for cost efficiency.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Procurement Professionals</h3>
                <p className="text-gray-700">
                  Validate supplier quotes and negotiate better pricing with data-driven insights.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Business Owners</h3>
                <p className="text-gray-700">
                  Make informed equipment investment decisions with accurate ROI calculations.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Students & Educators</h3>
                <p className="text-gray-700">
                  Learn manufacturing cost principles with practical, real-world calculation tools.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="card bg-primary-50 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Have Questions or Feedback?
            </h2>
            <p className="mb-6 text-gray-700">
              We'd love to hear from you. Get in touch with our team.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-block rounded-lg px-8 py-3"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}









