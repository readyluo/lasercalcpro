import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lasercalcpro.com';
  const lastModified = new Date();

  // Static pages
  const routes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/subscribe', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
  ].map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Main Calculator pages (highest priority after home)
  const mainCalculators = [
    { url: '/calculators/laser-cutting', priority: 0.95 },
    { url: '/calculators/cnc-machining', priority: 0.95 },
    { url: '/calculators/marking', priority: 0.92 },
    { url: '/calculators/welding', priority: 0.92 },
    { url: '/calculators/roi', priority: 0.95 },
    { url: '/calculators/energy', priority: 0.9 },
    { url: '/calculators/material-utilization', priority: 0.9 },
    { url: '/calculators/compare', priority: 0.85 },
  ].map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route.priority,
  }));

  // Cost Center Calculators
  const costCenterCalculators = [
    '/calculators/cost-center',
    '/calculators/cost-center/overhead-allocator',
    '/calculators/cost-center/setup-estimator',
    '/calculators/cost-center/hourly-rate',
    '/calculators/cost-center/pierce-estimator',
    '/calculators/cost-center/finishing-guide',
    '/calculators/cost-center/kerf-reference',
    '/calculators/cost-center/quotation-margin',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Guide pages
  const guides = [
    '/guides',
    '/guides/kerf-width-reference',
    '/guides/hourly-cost-structure',
    '/guides/piercing-strategy',
    '/guides/finishing-time-cheatsheet',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog category pages
  const blogCategories = [
    '/blog/tutorials',
    '/blog/industry',
    '/blog/case-studies',
    '/blog/news',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Tutorial pages
  const tutorials = [
    '/blog/tutorials/cad-to-quote',
    '/blog/tutorials/cnc-volume-pricing',
    '/blog/tutorials/equipment-roi-narrative',
    '/blog/tutorials/complex-nesting-pro',
    '/blog/tutorials/quoting-automation-playbook',
    '/blog/tutorials/laser-assist-gas-strategy',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // Quick and Quick Reference
  const quick = [
    '/calculators/quick',
    '/calculators/quick/hourly-rate',
    '/calculators/quick/pierce-time',
    '/calculators/quick/price-per-meter',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.82,
  }));

  const quickRef = [
    '/calculators/quick-reference',
    '/calculators/quick-reference/assist-gas',
    '/calculators/quick-reference/cutting-speeds',
    '/calculators/quick-reference/material-costs',
    '/calculators/quick-reference/power-consumption',
    '/calculators/quick-reference/processing-parameters',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...routes,
    ...mainCalculators,
    ...costCenterCalculators,
    ...guides,
    ...blogCategories,
    ...tutorials,
    ...quick,
    ...quickRef,
  ];
}

