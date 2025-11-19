/* eslint-disable @next/next/no-before-interactive-script-outside-document */

'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const ENV_GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? null;

export function GoogleAnalytics() {
  const [gaId, setGaId] = useState<string | null>(ENV_GA_ID);
  const [resolved, setResolved] = useState<boolean>(Boolean(ENV_GA_ID));

  useEffect(() => {
    if (ENV_GA_ID) {
      return;
    }

    let isMounted = true;

    const fetchGAId = async () => {
      try {
        const response = await fetch('/api/settings/public');
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (isMounted && data.ga4MeasurementId) {
          setGaId(data.ga4MeasurementId);
        }
      } catch (error) {
        console.error('Failed to fetch GA4 settings:', error);
      } finally {
        if (isMounted) {
          setResolved(true);
        }
      }
    };

    fetchGAId();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!gaId || !resolved) {
    return null;
  }

  return (
    <>
      {/* Google Consent Mode v2 - Must load first */}
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent to denied (GDPR compliant)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            
            // Check for saved consent
            try {
              const savedConsent = localStorage.getItem('cookie_consent');
              if (savedConsent) {
                const preferences = JSON.parse(savedConsent);
                gtag('consent', 'update', {
                  'analytics_storage': preferences.analytics ? 'granted' : 'denied',
                  'ad_storage': preferences.advertising ? 'granted' : 'denied',
                  'ad_user_data': preferences.advertising ? 'granted' : 'denied',
                  'ad_personalization': preferences.advertising ? 'granted' : 'denied'
                });
              }
            } catch (e) {
              console.error('Failed to load consent preferences:', e);
            }
          `,
        }}
      />
      
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
