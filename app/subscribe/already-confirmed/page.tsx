import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Info } from 'lucide-react';

export default function AlreadyConfirmedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Info className="h-12 w-12 text-blue-600" />
            </div>

            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Already Confirmed
            </h1>

            <p className="mb-8 text-xl text-gray-600">
              Your email address has already been confirmed. You're all set!
            </p>

            <Link
              href="/"
              className="btn-primary btn-lg inline-block rounded-lg px-8 py-4"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}









