import type { Metadata } from 'next';
import { Archive, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getArticlesByYearMonth } from '@/lib/db/articles';
import Image from 'next/image';

interface PageProps {
  params: {
    year: string;
    month: string;
  };
  searchParams: {
    page?: string;
  };
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const year = parseInt(params.year, 10);
  const month = parseInt(params.month, 10);
  const monthName = monthNames[month - 1];
  
  return {
    title: `Blog Archive - ${monthName} ${year} | LaserCalc Pro`,
    description: `Browse articles published in ${monthName} ${year}. Learn about laser cutting, CNC machining, cost optimization, and manufacturing best practices.`,
    openGraph: {
      title: `Blog Archive - ${monthName} ${year} | LaserCalc Pro`,
      description: `Browse articles published in ${monthName} ${year}.`,
    },
  };
}

export default async function BlogArchiveMonthPage({ params, searchParams }: PageProps) {
  const year = parseInt(params.year, 10);
  const month = parseInt(params.month, 10);
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 20;

  const { articles, total } = await getArticlesByYearMonth(year, month, page, limit);
  const totalPages = Math.ceil(total / limit);
  const monthName = monthNames[month - 1];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              {monthName} {year}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {total} {total === 1 ? 'article' : 'articles'} published
          </p>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary-600 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <Link href="/blog/archive" className="hover:text-primary-600 transition-colors">
            Archive
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{monthName} {year}</span>
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No articles found for this month.</p>
            <Link
              href="/blog/archive"
              className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Archive
            </Link>
          </div>
        ) : (
          <>
            {/* Articles List */}
            <div className="space-y-6 mb-8">
              {articles.map(article => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${article.slug}`} className="block">
                    <div className="flex flex-col md:flex-row">
                      {/* Featured Image */}
                      {article.featured_image && (
                        <div className="md:w-64 h-48 md:h-auto relative flex-shrink-0">
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {article.category && (
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                              {article.category}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {formatDate(article.published_at || article.created_at)}
                          </span>
                          {article.reading_time && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">
                                {article.reading_time} min read
                              </span>
                            </>
                          )}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                          {article.title}
                        </h2>

                        {article.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}

                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Link
                  href={`/blog/archive/${year}/${params.month}?page=${page - 1}`}
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                    page === 1 ? 'pointer-events-none opacity-50' : ''
                  }`}
                  aria-disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
                <span className="text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <Link
                  href={`/blog/archive/${year}/${params.month}?page=${page + 1}`}
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                    page === totalPages ? 'pointer-events-none opacity-50' : ''
                  }`}
                  aria-disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </>
        )}

        {/* Back to Archive */}
        <div className="mt-8 text-center">
          <Link
            href="/blog/archive"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            ← Back to Archive
          </Link>
        </div>
      </div>
    </div>
  );
}

