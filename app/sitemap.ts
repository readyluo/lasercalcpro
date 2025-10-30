import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lasercalcpro.com';
  const lastModified = new Date();

  // Static pages
  const routes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
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

  // Calculator pages (highest priority after home)
  const calculators = [
    { url: '/calculators/laser-cutting', priority: 0.95 },
    { url: '/calculators/cnc-machining', priority: 0.95 },
    { url: '/calculators/roi', priority: 0.95 },
    { url: '/calculators/energy', priority: 0.9 },
    { url: '/calculators/material-utilization', priority: 0.9 },
  ].map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route.priority,
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

  // TODO: Add blog posts dynamically from database
  // const blogPosts = await getPublishedPosts();
  // const blogs = blogPosts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }));

  return [...routes, ...calculators, ...blogCategories];
}

