import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search — LaserCalc Pro',
  description: 'Find calculators, guides, and articles across LaserCalc Pro.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lasercalcpro.com/search',
  },
};

interface SearchPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawQuery = searchParams?.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery || '';

  const hasQuery = query.trim().length > 0;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Search</h1>

      <form action="/search" className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search calculators, guides, and blog..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search query"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {!hasQuery && (
        <div className="text-gray-600">
          Enter a keyword to find calculators, guides, and articles.
        </div>
      )}

      {hasQuery && (
        <div>
          <p className="text-gray-700 mb-4">
            Showing results for: <span className="font-medium">{query}</span>
          </p>
          <div className="rounded-lg border border-gray-200 p-6 text-gray-500">
            No results yet. Search functionality will be connected to content soon.
          </div>
        </div>
      )}
    </div>
  );
}


