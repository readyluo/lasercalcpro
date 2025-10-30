'use client';

import Link from 'next/link';
import { useEnglish } from '@/lib/i18n';
import { Home, ArrowLeft, Calculator } from 'lucide-react';

export default function NotFound() {
  const t = useEnglish();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-primary-600"></div>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="mb-8 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="btn-primary btn-lg inline-flex items-center gap-2 rounded-lg"
          >
            <Home className="h-5 w-5" />
            {t.common.goHome}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline btn-lg inline-flex items-center gap-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Popular Tools */}
        <div className="mt-16">
          <h3 className="mb-6 text-xl font-semibold text-gray-900">
            Try these popular tools:
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="card-hover group text-left"
              >
                <div className="mb-3 text-primary-600">{tool.icon}</div>
                <h4 className="mb-2 font-semibold group-hover:text-primary-600">{tool.title}</h4>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const popularTools = [
  {
    title: 'Laser Cutting Calculator',
    description: 'Calculate precise costs for laser cutting',
    href: '/calculators/laser-cutting',
    icon: <Calculator className="h-8 w-8" />,
  },
  {
    title: 'CNC Machining Estimator',
    description: 'Estimate CNC machining costs',
    href: '/calculators/cnc-machining',
    icon: <Calculator className="h-8 w-8" />,
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate equipment ROI',
    href: '/calculators/roi',
    icon: <Calculator className="h-8 w-8" />,
  },
];

