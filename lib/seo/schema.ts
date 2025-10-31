/**
 * Schema.org structured data generators
 */

import React from 'react';

export interface Organization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
}

export interface WebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export interface HowTo {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: {
    '@type': 'MonetaryAmount';
    currency: 'USD';
    value: string;
  };
  tool?: Array<{
    '@type': 'HowToTool';
    name: string;
  }>;
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    url?: string;
  }>;
}

export interface FAQPage {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface SoftwareApplication {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: 'BusinessApplication';
  offers: {
    '@type': 'Offer';
    price: '0';
    priceCurrency: 'USD';
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
  };
}

export function generateOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LaserCalc Pro',
    url: 'https://lasercalcpro.com',
    logo: 'https://lasercalcpro.com/logo.png',
    description: 'Professional manufacturing cost calculation tools for laser cutting, CNC machining, and equipment ROI analysis.',
    sameAs: [
      'https://twitter.com/lasercalcpro',
      'https://linkedin.com/company/lasercalcpro',
      'https://github.com/lasercalcpro',
    ],
  };
}

export function generateWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LaserCalc Pro',
    url: 'https://lasercalcpro.com',
    description: 'Free manufacturing cost calculators and tools',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://lasercalcpro.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateCalculatorHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
): HowTo {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${name}`,
    description,
    tool: [
      {
        '@type': 'HowToTool',
        name,
      },
    ],
    step: steps.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
  };
}

// Simpler version with just the required fields
export function generateHowToSchema(params: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}): HowTo {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    step: params.steps.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateSoftwareApplicationSchema(
  name: string,
  rating?: { value: string; count: string }
): SoftwareApplication {
  const schema: SoftwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.value,
      ratingCount: rating.count,
    };
  }

  return schema;
}

/**
 * Render schema as JSON-LD script
 */
export function renderSchema(schema: any): React.ReactElement {
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema),
    },
  });
}

