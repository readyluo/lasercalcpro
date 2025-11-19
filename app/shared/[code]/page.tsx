import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { getSharedCalculation, incrementSharedCalculationViews } from '@/lib/db/shared-calculations';
import { Eye, Calendar, AlertCircle } from 'lucide-react';

interface SharedCalculationPageProps {
  params: {
    code: string;
  };
}

export async function generateMetadata({ params }: SharedCalculationPageProps): Promise<Metadata> {
  const shared = await getSharedCalculation(params.code);
  if (!shared) {
    return {
      title: 'Shared Calculation - LaserCalc Pro',
      robots: 'noindex, nofollow',
    };
  }

  return {
    title: `${shared.toolType} Calculation (Shared) | LaserCalc Pro`,
    description: `View read-only ${shared.toolType} results shared from LaserCalc Pro.`,
    robots: 'noindex, nofollow',
    alternates: { canonical: `/shared/${params.code}` },
  };
}

export default async function SharedCalculationPage({ params }: SharedCalculationPageProps) {
  const { code } = params;

  // Fetch shared calculation
  const shared = await getSharedCalculation(code);

  if (!shared) {
    notFound();
  }

  // Increment view count
  await incrementSharedCalculationViews(code);

  const { toolType, calculationData, expiresAt, views } = shared;
  const { inputData, results } = calculationData;
  const sharedSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${toolType} Shared Calculation`,
    url: `https://www.lasercalcpro.com/shared/${code}`,
    description: 'Read-only manufacturing calculator output shared from LaserCalc Pro.',
    datePublished: shared.createdAt || undefined,
    expires: expiresAt || undefined,
  };

  return (
    <>
      <Navigation />
      <SchemaMarkup schema={sharedSchema} />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs />
            {/* Header */}
            <div className="mb-8 rounded-xl bg-primary-600 p-8 text-white shadow-lg">
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">
                {toolType} Calculation
              </h1>
              <p className="text-primary-100">
                Shared calculation results from LaserCalc Pro
              </p>
              
              {/* Metadata */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Eye className="mr-2 h-5 w-5" />
                  <span>{shared.views ?? 0} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Expires {new Date(expiresAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="mb-8 flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold">Read-Only Calculation</p>
                <p>This is a shared calculation. You cannot edit the parameters. To create your own calculation, visit our calculators page.</p>
              </div>
            </div>

            {/* Input Parameters */}
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Input Parameters</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Parameter
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(inputData).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {formatKey(key)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {String(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculation Results */}
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Calculation Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Result
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(results).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {formatKey(key)}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-primary-600">
                          {formatValue(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-xl bg-gradient-to-br from-primary-50 to-white p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Want to Run Your Own Calculations?
              </h3>
              <p className="mb-6 text-gray-600">
                Try our full suite of manufacturing cost calculators for free
              </p>
              <a
                href="/calculators"
                className="inline-block rounded-lg bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Explore All Calculators
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatValue(value: unknown): string {
  if (typeof value === 'number') {
    return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
}
