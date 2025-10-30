'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Something went wrong</h1>
        <p className="mb-2 text-lg text-gray-600">
          We're sorry, but something unexpected happened.
        </p>
        <p className="mb-8 text-sm text-gray-500">
          {error.message || 'An unexpected error occurred'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="btn-primary btn-lg inline-flex items-center gap-2 rounded-lg"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="btn-outline btn-lg inline-flex items-center gap-2 rounded-lg"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mt-8 rounded-lg bg-gray-100 p-4 text-left">
            <p className="text-sm font-mono text-gray-700">
              <strong>Error Digest:</strong> {error.digest}
            </p>
            {error.stack && (
              <pre className="mt-4 overflow-auto text-xs text-gray-600">
                {error.stack}
              </pre>
            )}
          </div>
        )}

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          If this problem persists, please{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

