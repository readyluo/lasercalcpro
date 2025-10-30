/**
 * Custom event tracking for Google Analytics
 */

import { event } from '@/lib/utils/analytics';

/**
 * Track calculator usage
 */
export function trackCalculatorStart(calculatorName: string) {
  event({
    action: 'calculator_start',
    category: 'Calculator',
    label: calculatorName,
  });
}

export function trackCalculatorComplete(calculatorName: string, duration: number) {
  event({
    action: 'calculator_complete',
    category: 'Calculator',
    label: calculatorName,
    value: Math.round(duration / 1000), // Convert to seconds
  });
}

/**
 * Track form interactions
 */
export function trackFormFieldChange(fieldName: string, calculatorName: string) {
  event({
    action: 'form_field_change',
    category: 'Form Interaction',
    label: `${calculatorName} - ${fieldName}`,
  });
}

export function trackFormValidationError(fieldName: string, errorType: string) {
  event({
    action: 'form_validation_error',
    category: 'Form Error',
    label: `${fieldName} - ${errorType}`,
  });
}

/**
 * Track PDF exports
 */
export function trackPDFExportStart(calculatorName: string) {
  event({
    action: 'pdf_export_start',
    category: 'Export',
    label: calculatorName,
  });
}

export function trackPDFExportComplete(calculatorName: string) {
  event({
    action: 'pdf_export_complete',
    category: 'Export',
    label: calculatorName,
  });
}

/**
 * Track subscriptions
 */
export function trackSubscriptionAttempt(source: string) {
  event({
    action: 'subscription_attempt',
    category: 'Engagement',
    label: source,
  });
}

export function trackSubscriptionSuccess(source: string) {
  event({
    action: 'subscription_success',
    category: 'Engagement',
    label: source,
  });
}

export function trackSubscriptionError(errorType: string) {
  event({
    action: 'subscription_error',
    category: 'Engagement',
    label: errorType,
  });
}

/**
 * Track navigation
 */
export function trackNavigationClick(destination: string, source: string) {
  event({
    action: 'navigation_click',
    category: 'Navigation',
    label: `${source} → ${destination}`,
  });
}

/**
 * Track content engagement
 */
export function trackArticleView(articleTitle: string, category: string) {
  event({
    action: 'article_view',
    category: 'Content',
    label: `${category} - ${articleTitle}`,
  });
}

export function trackArticleReadTime(articleTitle: string, seconds: number) {
  event({
    action: 'article_read_time',
    category: 'Content',
    label: articleTitle,
    value: seconds,
  });
}

/**
 * Track search
 */
export function trackSearch(query: string, resultsCount: number) {
  event({
    action: 'search',
    category: 'Search',
    label: query,
    value: resultsCount,
  });
}

/**
 * Track errors
 */
export function trackError(errorType: string, errorMessage: string) {
  event({
    action: 'error',
    category: 'Error',
    label: `${errorType}: ${errorMessage}`,
  });
}

/**
 * Track ad interactions
 */
export function trackAdView(adPosition: string) {
  event({
    action: 'ad_view',
    category: 'Advertising',
    label: adPosition,
  });
}

export function trackAdClick(adPosition: string) {
  event({
    action: 'ad_click',
    category: 'Advertising',
    label: adPosition,
  });
}

/**
 * Track social sharing
 */
export function trackSocialShare(platform: string, contentType: string) {
  event({
    action: 'social_share',
    category: 'Social',
    label: `${platform} - ${contentType}`,
  });
}

/**
 * Track external links
 */
export function trackExternalLink(url: string, text: string) {
  event({
    action: 'external_link_click',
    category: 'Outbound',
    label: `${text} → ${url}`,
  });
}

/**
 * Track performance metrics
 */
export function trackPerformance(metric: string, value: number) {
  event({
    action: 'performance_metric',
    category: 'Performance',
    label: metric,
    value: Math.round(value),
  });
}

/**
 * Track user engagement time
 */
export function trackEngagementTime(pageType: string, seconds: number) {
  event({
    action: 'engagement_time',
    category: 'Engagement',
    label: pageType,
    value: seconds,
  });
}

