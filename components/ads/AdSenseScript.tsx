'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const ENV_ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? null;

interface AdSettingsState {
  clientId: string | null;
  enabled: boolean;
  resolved: boolean;
}

export function AdSenseScript() {
  const [adSettings, setAdSettings] = useState<AdSettingsState>({
    clientId: ENV_ADSENSE_ID,
    enabled: Boolean(ENV_ADSENSE_ID),
    resolved: Boolean(ENV_ADSENSE_ID),
  });

  useEffect(() => {
    if (ENV_ADSENSE_ID) {
      return;
    }

    let isMounted = true;

    const fetchAdSenseSettings = async () => {
      try {
        const response = await fetch('/api/settings/public');
        if (!response.ok) return;
        const data = await response.json();
        if (!isMounted) return;
        setAdSettings({
          clientId: data.adsenseClientId || null,
          enabled: data.adsenseEnabled !== false,
          resolved: true,
        });
      } catch (error) {
        console.error('Failed to fetch AdSense settings:', error);
        if (isMounted) {
          setAdSettings({
            clientId: null,
            enabled: false,
            resolved: true,
          });
        }
      }
    };

    fetchAdSenseSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!adSettings.resolved || !adSettings.enabled || !adSettings.clientId) {
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
