import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorBySlug, getAuthorArticles } from '@/lib/db/authors';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  const name = author?.name || 'Author';
  return {
    title: `${name} - Articles & Guides | LaserCalc Pro`,
    description: author?.bio ? author.bio.substring(0, 150) : `Read articles by ${name} on LaserCalc Pro.`,
    alternates: { canonical: `/blog/author/${params.slug}` },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-700">
            Author not found.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const articles = await getAuthorArticles(params.slug);
  let social: Record<string, string> | null = null;
  try {
    social = author.social_links ? JSON.parse(author.social_links) : null;
  } catch {}

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      description: author.bio || undefined,
      jobTitle: author.title || undefined,
      url: `https://www.lasercalcpro.com/blog/author/${params.slug}`,
    },
  };

  return (
    <>
      <Navigation />
      <SchemaMarkup schema={authorSchema} />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs />
            {/* Header */}
            <div className="mb-10 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                  {author.avatar_url ? (
                    <Image src={author.avatar_url} alt={author.name} width={96} height={96} className="h-24 w-24 object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-gray-500">
                      {author.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{author.name}</h1>
                  {author.title && (
                    <p className="mt-1 text-gray-600">{author.title}</p>
                  )}
                  {social && (
                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      {social.linkedin && (
                        <a href={social.linkedin} className="text-primary-600 hover:underline">LinkedIn</a>
                      )}
                      {social.twitter && (
                        <a href={social.twitter} className="text-primary-600 hover:underline">Twitter/X</a>
                      )}
                      {social.github && (
                        <a href={social.github} className="text-primary-600 hover:underline">GitHub</a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {author.bio && (
                <p className="mt-6 text-gray-700">{author.bio}</p>
              )}
            </div>

            {/* Articles */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Articles by {author.name}</h2>
              {articles.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
                  No articles yet.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {articles.map((article) => (
                    <article key={article.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                      <div className="p-6">
                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                          <Link href={`/blog/${article.slug}`} className="hover:underline">
                            {article.title}
                          </Link>
                        </h3>
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
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
