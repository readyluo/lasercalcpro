'use client';

import { useEffect } from 'react';
import { trackPerformance } from '@/lib/analytics/events';

export function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals (FID deprecated → use INP)
    import('web-vitals').then((vitalsModule) => {
      const { onCLS, onFCP, onINP, onLCP, onTTFB } = vitalsModule;
      
      if (typeof onCLS === 'function') {
        onCLS((metric) => {
          trackPerformance('CLS', metric.value);
        });
      }

      if (typeof onFCP === 'function') {
        onFCP((metric) => {
          trackPerformance('FCP', metric.value);
        });
      }

      if (typeof onINP === 'function') {
        onINP((metric) => {
          trackPerformance('INP', metric.value);
        });
      }

      if (typeof onLCP === 'function') {
        onLCP((metric) => {
          trackPerformance('LCP', metric.value);
        });
      }

      if (typeof onTTFB === 'function') {
        onTTFB((metric) => {
          trackPerformance('TTFB', metric.value);
        });
      }
    }).catch((error) => {
      console.error('Failed to load web-vitals:', error);
    });
  }, []);

  return null;
}









