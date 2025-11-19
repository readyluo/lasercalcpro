import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata = generateMetadata({
  title: 'Search LaserCalc Pro Tools & Guides',
  description: 'Find calculators, ROI models, and manufacturing guides across LaserCalc Pro.',
  alternates: { canonical: '/search' },
});

const searchSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LaserCalc Pro Search',
  url: 'https://www.lasercalcpro.com/search',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.lasercalcpro.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

interface SearchPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const rawQuery = searchParams?.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery || '';
  const hasQuery = query.trim().length > 0;

  return (
    <>
      <Navigation />
      <SchemaMarkup schema={searchSchema} />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Breadcrumbs />
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900">Search</h1>

          <form action="/search" className="mb-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search calculators, guides, and blog…"
                className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                aria-label="Search query"
              />
              <button
                type="submit"
                className="rounded-md bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Search
              </button>
            </div>
          </form>

          {!hasQuery && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
              Enter a keyword to find calculators, guides, ROI models, and articles.
            </div>
          )}

          {hasQuery && (
            <section className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-gray-700">
                Showing results for <span className="font-semibold text-gray-900">{query}</span>
              </p>
              <div className="rounded border border-dashed border-gray-300 p-6 text-sm text-gray-500">
                Search index is synchronizing. Aggregated results from calculators, guides, and blog posts will appear here
                once indexing completes.
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
