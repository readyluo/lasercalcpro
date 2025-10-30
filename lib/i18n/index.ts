/**
 * Language management for LaserCalc Pro
 * Frontend: English (en) - Public pages
 * Backend: Chinese (zh) - Admin panel
 */

import { en, type EnglishTexts } from './en';
import { zh, type ChineseTexts } from './zh';

export type { EnglishTexts, ChineseTexts };

/**
 * Get English translations for frontend pages
 * Use in all public-facing pages and components
 */
export function useEnglish(): EnglishTexts {
  return en;
}

/**
 * Get Chinese translations for admin panel
 * Use in /admin routes only
 */
export function useChinese(): ChineseTexts {
  return zh;
}

/**
 * Get translations based on locale
 * @param locale - 'en' for frontend, 'zh' for admin
 */
export function getTranslations(locale: 'en' | 'zh'): EnglishTexts | ChineseTexts {
  return locale === 'zh' ? zh : en;
}

// Re-export for convenience
export { en, zh };

