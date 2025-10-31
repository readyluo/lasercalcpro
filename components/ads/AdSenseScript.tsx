'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function AdSenseScript() {
  const [adSettings, setAdSettings] = useState<{ clientId: string | null; enabled: boolean }>({
    clientId: null,
    enabled: false,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fetch AdSense settings from database via public API
    const fetchAdSenseSettings = async () => {
      try {
        const response = await fetch('/api/settings/public');
        if (response.ok) {
          const data = await response.json();
          setAdSettings({
            clientId: data.adsenseClientId || null,
            enabled: data.adsenseEnabled !== false,
          });
        }
      } catch (error) {
        console.error('Failed to fetch AdSense settings:', error);
        // Fallback to environment variable
        setAdSettings({
          clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || null,
          enabled: true,
        });
      } finally {
        setLoaded(true);
      }
    };

    fetchAdSenseSettings();
  }, []);

  // Don't render until we've checked for AdSense settings
  if (!loaded || !adSettings.enabled || !adSettings.clientId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSettings.clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
