import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getArticleBySlug, incrementArticleViews, getRecentArticles } from '@/lib/db/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Eye, Clock, Tag, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt || '',
    keywords: article.meta_keywords || '',
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      type: 'article',
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at,
      authors: ['LaserCalc Pro Team'],
      images: article.featured_image ? [article.featured_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      images: article.featured_image ? [article.featured_image] : [],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article || article.status !== 'published') {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementArticleViews(article.id).catch(() => {});

  // Get related articles
  const { articles: relatedArticles } = await getRecentArticles(3);
  const tags = article.tags ? JSON.parse(article.tags) : [];

  const readingTime = Math.ceil(article.content.split(' ').length / 200); // ~200 words per minute

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <article className="mx-auto max-w-4xl">
            {/* Article Header */}
            <header className="mb-8">
              {/* Category */}
              {article.category && (
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700 capitalize">
                    {article.category.replace('-', ' ')}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="mb-6 text-xl text-gray-600 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-y border-gray-200 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <time dateTime={article.published_at || article.created_at}>
                    {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary-600" />
                  <span>{article.views + 1} views</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {article.featured_image && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Calculator CTA */}
            <div className="mt-12 card bg-gradient-to-br from-primary-50 to-blue-50">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Ready to Calculate Costs?
              </h3>
              <p className="mb-6 text-gray-700">
                Put what you've learned into practice with our free professional calculators
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/calculators/laser-cutting"
                  className="btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold"
                >
                  Laser Cutting Calculator
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/calculators/cnc-machining"
                  className="btn-secondary inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold"
                >
                  CNC Cost Estimator
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <aside className="mx-auto max-w-4xl mt-16">
              <h2 className="mb-8 text-3xl font-bold text-gray-900">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedArticles
                  .filter(related => related.id !== article.id)
                  .slice(0, 3)
                  .map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.slug}`}
                      className="card-hover group"
                    >
                      {related.featured_image && (
                        <div className="mb-4 -mt-6 -mx-6 overflow-hidden">
                          <img
                            src={related.featured_image}
                            alt={related.title}
                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {related.excerpt}
                        </p>
                      )}
                      <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(related.published_at || related.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
                >
                  View All Articles
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}



