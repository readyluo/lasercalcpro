'use client';

import { useEffect } from 'react';
import { trackPerformance } from '@/lib/analytics/events';

export function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    import('web-vitals').then(({ onCLS, onFCP, onFID, onLCP, onTTFB }) => {
      onCLS((metric) => {
        trackPerformance('CLS', metric.value);
      });

      onFCP((metric) => {
        trackPerformance('FCP', metric.value);
      });

      onFID((metric) => {
        trackPerformance('FID', metric.value);
      });

      onLCP((metric) => {
        trackPerformance('LCP', metric.value);
      });

      onTTFB((metric) => {
        trackPerformance('TTFB', metric.value);
      });
    });
  }, []);

  return null;
}

