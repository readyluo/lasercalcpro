/**
 * Article Content Index
 * Central location for all article content definitions
 */

import { article as article01 } from './article-01-laser-cutting-cost-complete-guide';
import { article as article02 } from './article-02-cnc-machining-cost-formula';

// Export all articles as an array
export const allArticles = [
  article01,
  article02,
];

// Export individual articles for direct import
export { article01, article02 };

// Helper to get article by slug
export function getArticleBySlug(slug: string) {
  return allArticles.find(article => article.slug === slug);
}

// Article count
export const articleCount = allArticles.length;
















