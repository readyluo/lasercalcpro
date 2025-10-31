import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getArticles } from '@/lib/db/articles';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowRight, Tag } from 'lucide-react';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata = generateMetadata({
  title: 'Manufacturing Blog - Tutorials, Guides & Industry Insights',
  description: 'Expert articles on laser cutting costs, CNC machining, equipment ROI, and manufacturing optimization. Free guides and tutorials for manufacturers.',
  keywords: ['manufacturing blog', 'laser cutting guide', 'CNC machining tutorial', 'manufacturing cost optimization', 'equipment ROI'],
});

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  // Fallback for missing database configuration
  let articles = [];
  let total = 0;
  
  try {
    const result = await getArticles(
      { status: 'published' },
      1,
      20
    );
    articles = result.articles;
    total = result.total;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    // Continue with empty articles array
  }

  const categories = ['tutorials', 'industry', 'case-studies', 'news'];
  const archiveLink = '/blog/archive';

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Manufacturing Blog
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Expert guides, tutorials, and industry insights to help you optimize your manufacturing operations
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              All Articles ({total})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className="rounded-full bg-white border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors capitalize"
              >
                {cat.replace('-', ' ')}
              </Link>
            ))}
            <Link
              href={archiveLink}
              className="rounded-full bg-white border border-primary-300 px-6 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              📅 Archive
            </Link>
          </div>

          {/* Articles Grid */}
          {articles.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found. Check back soon for expert content!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                let tags: string[] = [];
                try {
                  if (article.tags) {
                    tags = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags;
                  }
                } catch (e) {
                  console.error('Failed to parse tags:', e);
                  tags = [];
                }
                
                return (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="card-hover group overflow-hidden"
                  >
                    {/* Featured Image */}
                    {article.featured_image && (
                      <div className="mb-4 -mt-6 -mx-6 overflow-hidden">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Category Badge */}
                    {article.category && (
                      <div className="mb-3">
                        <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 capitalize">
                          {article.category.replace('-', ' ')}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    {article.excerpt && (
                      <p className="mb-4 text-gray-600 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 text-xs text-gray-600"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.published_at || article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold">
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 card bg-gradient-to-br from-primary-50 to-blue-50 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Try Our Free Calculators
            </h2>
            <p className="mb-6 text-gray-700">
              Put theory into practice with our professional manufacturing cost calculators
            </p>
            <Link
              href="/calculators/laser-cutting"
              className="btn-primary inline-flex items-center gap-2 rounded-lg px-8 py-3 font-semibold"
            >
              Start Calculating
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}



