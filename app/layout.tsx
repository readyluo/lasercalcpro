import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { AdSenseScript } from '@/components/ads/AdSenseScript';
import { WebVitals } from '@/components/performance/WebVitals';
import CookieBanner from '@/components/cookie/CookieBanner';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  ...generateMetadata(),
  verification: {
    google: 'aajlPnwI4brA3BjmsQ30KN3gj0wtVarRoJ_7KMPM65s',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <SchemaMarkup schema={organizationSchema} />
        <SchemaMarkup schema={websiteSchema} />
        <GoogleAnalytics />
        <AdSenseScript />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PageViewTracker />
        <WebVitals />
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}

