import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedArticlesByCategory, type PaginatedArticles } from '@/lib/db/articles';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
  params: { slug: 'tutorials' | 'industry' | 'case-studies' | 'news' };
  searchParams: { page?: string };
}

const CATEGORY_TITLES: Record<PageProps['params']['slug'], string> = {
  tutorials: 'Tutorials',
  industry: 'Industry Insights',
  'case-studies': 'Case Studies',
  news: 'News',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = `${CATEGORY_TITLES[params.slug]} Articles - LaserCalc Pro Blog`;
  const description = `Browse ${CATEGORY_TITLES[params.slug]} articles from LaserCalc Pro.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/category/${params.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const page = Math.max(parseInt(searchParams.page || '1', 10) || 1, 1);
  const pageSize = 12;

  const { articles, total, totalPages }: PaginatedArticles = await getPublishedArticlesByCategory(
    params.slug,
    { page, limit: pageSize, orderBy: 'published_at', orderDir: 'DESC' }
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {CATEGORY_TITLES[params.slug]}
              </h1>
              <p className="mt-2 text-gray-600">{total} articles</p>
            </header>

            {/* Articles Grid */}
            {articles.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
                No articles found in this category.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <article key={article.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                    <div className="p-6">
                      <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                        <Link href={`/blog/${article.slug}`} className="hover:underline">
                          {article.title}
                        </Link>
                      </h2>
                      {article.excerpt && (
                        <p className="line-clamp-3 text-sm text-gray-600">{article.excerpt}</p>
                      )}
                      <div className="mt-4 text-xs text-gray-500">
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const p = i + 1;
                  const isActive = p === page;
                  return (
                    <Link
                      key={p}
                      href={`?page=${p}`}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
