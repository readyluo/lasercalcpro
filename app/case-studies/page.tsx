import { Metadata } from 'next';
import Link from 'next/link';
import { getCaseStudies, type PaginatedCaseStudies } from '@/lib/db/case-studies';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Case Studies - Real Manufacturing Cost Success Stories | LaserCalc Pro',
  description: 'Explore case studies showing real cost savings and ROI using LaserCalc Pro calculators across industries.',
  alternates: { canonical: '/case-studies' },
};

interface PageProps {
  searchParams: {
    industry?: string;
    tool?: string;
    size?: 'small' | 'medium' | 'large';
    page?: string;
    q?: string;
  };
}

const INDUSTRIES = ['automotive', 'aerospace', 'construction', 'general'];
const SIZES = ['small', 'medium', 'large'];
const TOOLS = ['laser-cutting', 'cnc-machining', 'roi', 'energy', 'material-utilization'];

export default async function CaseStudiesPage({ searchParams }: PageProps) {
  const page = Math.max(parseInt(searchParams.page || '1', 10) || 1, 1);
  const pageSize = 9;

  const { items, total, totalPages }: PaginatedCaseStudies = await getCaseStudies(
    {
      industry: searchParams.industry,
      size: searchParams.size,
      tool: searchParams.tool,
      search: searchParams.q,
    },
    { page, limit: pageSize, orderBy: 'published_at', orderDir: 'DESC' }
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Case Studies
              </h1>
              <p className="mt-2 text-gray-600">
                Real-world results from manufacturers using LaserCalc Pro
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 grid gap-4 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-4">
              <FilterGroup label="Industry">
                <FilterLinks paramKey="industry" values={INDUSTRIES} />
              </FilterGroup>
              <FilterGroup label="Company Size">
                <FilterLinks paramKey="size" values={SIZES} />
              </FilterGroup>
              <FilterGroup label="Tools Used">
                <FilterLinks paramKey="tool" values={TOOLS} />
              </FilterGroup>
              <div>
                <div className="mb-2 text-sm font-semibold text-gray-700">Search</div>
                <form className="flex gap-2">
                  <input
                    name="q"
                    defaultValue={searchParams.q || ''}
                    placeholder="Search case studies..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-700">
                    Search
                  </button>
                </form>
              </div>
            </div>

            {/* Grid */}
            {items.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
                No case studies found.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((cs) => (
                  <article key={cs.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                    {cs.hero_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cs.hero_image} alt={cs.title} className="h-40 w-full object-cover" />
                    )}
                    <div className="p-6">
                      <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                        <Link href={`/case-studies/${cs.slug}`} className="hover:underline">
                          {cs.title}
                        </Link>
                      </h2>
                      {cs.industry && (
                        <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">{cs.industry}</div>
                      )}
                      {cs.results && (
                        <p className="line-clamp-3 text-sm text-gray-600">{cs.results}</p>
                      )}
                      <div className="mt-4 text-xs text-gray-500">
                        {cs.published_at ? new Date(cs.published_at).toLocaleDateString() : ''}
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
                  const sp = new URLSearchParams({ ...searchParams, page: String(p) } as any);
                  return (
                    <Link
                      key={p}
                      href={`?${sp.toString()}`}
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

            {/* Total */}
            <div className="mt-6 text-center text-sm text-gray-500">{total} results</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-gray-700">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterLinks({ paramKey, values }: { paramKey: string; values: string[] }) {
  return (
    <>
      {values.map((val) => {
        const sp = new URLSearchParams({ [paramKey]: val } as any);
        return (
          <Link
            key={val}
            href={`?${sp.toString()}`}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            {val}
          </Link>
        );
      })}
    </>
  );
}
