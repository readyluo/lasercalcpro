import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug } from '@/lib/db/case-studies';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cs = await getCaseStudyBySlug(params.slug);
  const title = cs ? `${cs.title} - Case Study | LaserCalc Pro` : 'Case Study - LaserCalc Pro';
  const description = cs?.results?.slice(0, 150) || 'Manufacturing cost optimization case study.';
  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${params.slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) {
    notFound();
  }

  let tools: string[] | null = null;
  let metrics: Record<string, string> | null = null;
  try {
    tools = cs.tools_used ? JSON.parse(cs.tools_used) : null;
  } catch {}
  try {
    metrics = cs.key_metrics ? JSON.parse(cs.key_metrics) : null;
  } catch {}

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <article className="mx-auto max-w-4xl">
            {/* Hero */}
            <header className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{cs.title}</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                {cs.industry && <span>Industry: <strong>{cs.industry}</strong></span>}
                {cs.company_size && <span>Company Size: <strong>{cs.company_size}</strong></span>}
                {cs.published_at && <span>Published: {new Date(cs.published_at).toLocaleDateString()}</span>}
              </div>
              {tools && tools.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span key={t} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Key Metrics */}
            {metrics && (
              <section className="mb-8 grid gap-4 sm:grid-cols-3">
                {Object.entries(metrics).map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">{v}</div>
                    <div className="mt-1 text-sm text-gray-600">{formatKey(k)}</div>
                  </div>
                ))}
              </section>
            )}

            {/* Sections */}
            {cs.challenge && (
              <Section title="Background & Challenges" body={cs.challenge} />
            )}
            {cs.solution && (
              <Section title="Solution" body={cs.solution} />
            )}
            {cs.results && (
              <Section title="Outcomes & Results" body={cs.results} />
            )}

            {/* CTA */}
            <section className="mt-10 rounded-xl bg-gradient-to-br from-primary-50 to-white p-8 text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Achieve Similar Results</h2>
              <p className="mb-6 text-gray-700">
                Use our calculators to reproduce these savings in your shop
              </p>
              <a
                href="/calculators"
                className="inline-block rounded-lg bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Explore Calculators
              </a>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="prose max-w-none text-gray-700">
        <p>{body}</p>
      </div>
    </section>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
