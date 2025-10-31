'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function GoogleAnalytics() {
  const [gaId, setGaId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Use hardcoded GA4 ID
    const GA_ID = 'G-Z1Q5K1N1WM';
    
    // Fetch GA4 ID from database via public API (optional override)
    const fetchGAId = async () => {
      try {
        const response = await fetch('/api/settings/public');
        if (response.ok) {
          const data = await response.json();
          if (data.ga4MeasurementId) {
            setGaId(data.ga4MeasurementId);
            setLoaded(true);
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch GA4 settings:', error);
      }
      
      // Use hardcoded ID as primary fallback
      setGaId(GA_ID);
      setLoaded(true);
    };

    fetchGAId();
  }, []);

  // Don't render until we've checked for GA ID
  if (!loaded || !gaId) {
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
