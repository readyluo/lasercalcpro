import type { Metadata } from 'next';
import { Archive, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { getArchiveGroups } from '@/lib/db/articles';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Blog Archive | LaserCalc Pro',
  description: 'Browse our complete blog archive by date. Find articles about laser cutting, CNC machining, cost optimization, and manufacturing best practices.',
  openGraph: {
    title: 'Blog Archive | LaserCalc Pro',
    description: 'Browse our complete blog archive by date.',
  },
};

export default async function BlogArchivePage() {
  const archiveGroups = await getArchiveGroups();
  
  // Group by year
  const yearGroups = archiveGroups.reduce((acc, group) => {
    if (!acc[group.year]) {
      acc[group.year] = [];
    }
    acc[group.year].push(group);
    return acc;
  }, {} as Record<number, typeof archiveGroups>);

  const years = Object.keys(yearGroups)
    .map(Number)
    .sort((a, b) => b - a);

  const totalArticles = archiveGroups.reduce((sum, group) => sum + group.count, 0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const archiveSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'LaserCalc Pro Blog Archive',
    url: 'https://www.lasercalcpro.com/blog/archive',
    description: 'Month-by-month manufacturing article archive for LaserCalc Pro.',
  };

  return (
    <>
      <Navigation />
      <SchemaMarkup schema={archiveSchema} />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center gap-3">
              <Archive className="h-8 w-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-900">Blog Archive</h1>
            </div>
            <p className="text-lg text-gray-600">Browse {totalArticles} articles organized by publication date</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {years.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No articles have been published yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {years.map(year => (
              <div key={year} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Year Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white">
                      {year}
                    </h2>
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                      {yearGroups[year].reduce((sum, m) => sum + m.count, 0)} articles
                    </span>
                  </div>
                </div>

                {/* Months Grid */}
                <div className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {yearGroups[year].map(group => (
                      <Link
                        key={`${group.year}-${group.month}`}
                        href={`/blog/archive/${group.year}/${String(group.month).padStart(2, '0')}`}
                        className="group p-4 border border-gray-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                              {monthNames[group.month - 1]}
                            </h3>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 group-hover:bg-primary-100 text-gray-700 group-hover:text-primary-700 rounded text-sm font-medium">
                            {group.count}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700">
                          View all articles
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
