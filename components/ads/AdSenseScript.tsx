'use client';

import Script from 'next/script';

export function AdSenseScript() {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!adClient) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}









