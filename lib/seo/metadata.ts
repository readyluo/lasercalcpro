import { Metadata } from 'next';

const SITE_URL = 'https://www.lasercalcpro.com';
const SITE_NAME = 'LaserCalc Pro';
const SITE_DESCRIPTION = 'Free, accurate cost estimation tools for laser cutting, CNC machining, and equipment ROI analysis. Trusted by manufacturers worldwide.';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

export function generateMetadata(props: SEOProps = {}): Metadata {
  const {
    title,
    description = SITE_DESCRIPTION,
    keywords = [],
    canonicalUrl,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    publishedTime,
    modifiedTime,
    authors,
    noindex = false,
  } = props;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = canonicalUrl || SITE_URL;

  const baseMetadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: [
      'laser cutting calculator',
      'CNC machining cost',
      'manufacturing cost estimator',
      'ROI calculator',
      'material utilization',
      'energy cost calculator',
      ...keywords,
    ],
    authors: authors ? authors.map(name => ({ name })) : [{ name: 'LaserCalc Pro Team' }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
    alternates: {
      canonical,
    },
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

  if (ogType === 'article' && publishedTime) {
    return {
      ...baseMetadata,
      openGraph: {
        ...baseMetadata.openGraph,
        type: 'article',
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors,
      },
    };
  }

  return baseMetadata;
}

export function generateCalculatorMetadata(
  toolName: string,
  description: string,
  keywords: string[]
): Metadata {
  return generateMetadata({
    title: toolName,
    description,
    keywords,
    canonicalUrl: `${SITE_URL}/calculators/${toolName.toLowerCase().replace(/\s+/g, '-')}`,
  });
}









