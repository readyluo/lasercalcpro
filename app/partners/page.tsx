import Link from 'next/link';
import { Handshake, CheckCircle, Star, ArrowRight, Mail } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata = generateMetadata({
  title: 'Partners & Integrations | LaserCalc Pro',
  description: 'Explore embedded calculator partners, API integrations, and white-label opportunities with LaserCalc Pro.',
  keywords: ['laser cutting partners', 'manufacturing software integrations', 'LaserCalc Pro partner program'],
  alternates: { canonical: '/partners' },
});

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: 'equipment' | 'software' | 'service' | 'education';
  website: string;
  featured: boolean;
}

const partners: Partner[] = [
  {
    id: 'opmt-laser',
    name: 'OPMT Laser',
    logo: '/images/partners/opmt-laser.svg',
    description: 'Leading manufacturer of industrial laser cutting equipment. Integrated cost calculators for their equipment line.',
    category: 'equipment',
    website: 'https://opmtlaser.com',
    featured: true,
  },
  {
    id: 'cnc-masters',
    name: 'CNC Masters',
    logo: '/images/partners/cnc-masters.svg',
    description: 'Professional CNC machining services with real-time cost estimation powered by LaserCalc Pro.',
    category: 'service',
    website: 'https://example.com',
    featured: false,
  },
  {
    id: 'manufacturing-academy',
    name: 'Manufacturing Academy',
    logo: '/images/partners/academy.svg',
    description: 'Training and certification programs for manufacturing professionals, featuring LaserCalc Pro tools.',
    category: 'education',
    website: 'https://example.com',
    featured: false,
  },
];

const partnersSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Partners & Integrations',
  url: 'https://www.lasercalcpro.com/partners',
  description: 'Directory of LaserCalc Pro equipment, software, and service partners plus integration options.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: partners.map((partner, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: partner.name,
      url: partner.website,
      description: partner.description,
    })),
  },
};

const categoryLabels = {
  equipment: 'Equipment Manufacturers',
  software: 'Software Providers',
  service: 'Service Partners',
  education: 'Education & Training',
};

const categoryIcons = {
  equipment: '🏭',
  software: '💻',
  service: '🤝',
  education: '🎓',
};

const benefits = [
  {
    title: 'White-Label Integration',
    description: 'Embed our calculators on your website with your branding.',
    icon: '🎨',
  },
  {
    title: 'API Access',
    description: 'Integrate cost calculations directly into your systems.',
    icon: '🔌',
  },
  {
    title: 'Co-Marketing',
    description: 'Joint marketing campaigns and content collaboration.',
    icon: '📢',
  },
  {
    title: 'Revenue Share',
    description: 'Earn commissions on referrals and integrations.',
    icon: '💰',
  },
  {
    title: 'Priority Support',
    description: 'Dedicated partner support team and resources.',
    icon: '🎯',
  },
  {
    title: 'Early Access',
    description: 'Be the first to test new features and tools.',
    icon: '🚀',
  },
];

export default function PartnersPage() {
  const groupedPartners = partners.reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>);
  const featuredPartners = partners.filter(partner => partner.featured);

  return (
    <>
      <Navigation />
      <SchemaMarkup schema={partnersSchema} />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs />
            <div className="mt-8 text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <Handshake className="h-12 w-12 text-primary-600" />
                <h1 className="text-5xl font-bold text-gray-900">Partners & Integrations</h1>
              </div>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Collaborate with LaserCalc Pro to embed calculators, power quoting workflows, or co-market manufacturing intelligence.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Partners */}
        {featuredPartners.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full mb-4">
                <Star className="h-4 w-4" />
                <span className="text-sm font-semibold">Featured Partners</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Strategic Partnerships
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPartners.map(partner => (
                <div key={partner.id} className="bg-white rounded-xl border-2 border-primary-200 p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      {/* Partner logo placeholder */}
                      <span className="text-3xl">{categoryIcons[partner.category]}</span>
                    </div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {categoryLabels[partner.category]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {partner.description}
                  </p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Visit Website
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Partners by Category */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Partner Network
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work with leading companies across the manufacturing ecosystem
            </p>
          </div>

          {Object.entries(groupedPartners).map(([category, categoryPartners]) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                <h3 className="text-2xl font-bold text-gray-900">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryPartners.map(partner => (
                  <div key={partner.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{categoryIcons[partner.category]}</span>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        {partner.name}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {partner.description}
                    </p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Partner Benefits */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-200 p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Become a Partner
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Join our partner program and unlock exclusive benefits for your business and customers
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/partners/apply"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                Apply to Become a Partner
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Integration Types */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Integration Options
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Flexible integration methods to suit your business needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Embed Widget
              </h3>
              <p className="text-gray-600 mb-4">
                Add our calculators to your website with a simple embed code. Fully customizable design.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>No coding required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Matches your branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Instant updates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                REST API
              </h3>
              <p className="text-gray-600 mb-4">
                Integrate calculations directly into your applications with our RESTful API.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Full control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive docs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                White Label
              </h3>
              <p className="text-gray-600 mb-4">
                Complete white-label solution hosted on your domain with your branding.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Your domain</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>100% your brand</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Custom features</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <div className="bg-gray-900 rounded-2xl p-12 text-center text-white">
            <Mail className="h-12 w-12 mx-auto mb-6 text-primary-400" />
            <h2 className="text-3xl font-bold mb-4">
              Questions About Partnerships?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our partnership team is here to discuss how we can work together to provide value to your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Contact Partnership Team
              </Link>
              <a
                href="mailto:partners@lasercalcpro.com"
                className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                partners@lasercalcpro.com
              </a>
            </div>
          </div>
        </section>
      </div>
      </main>
      <Footer />
    </>
  );
}
