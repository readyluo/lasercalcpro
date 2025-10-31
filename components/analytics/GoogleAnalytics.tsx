'use client';

import Script from 'next/script';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
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
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
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









