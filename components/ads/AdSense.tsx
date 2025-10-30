'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  /**
   * Ad slot ID from Google AdSense
   */
  adSlot: string;
  /**
   * Ad format (auto, rectangle, horizontal, vertical)
   */
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  /**
   * Whether the ad should be responsive
   */
  responsive?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Ad style
   */
  style?: React.CSSProperties;
}

export function AdSense({
  adSlot,
  adFormat = 'auto',
  responsive = true,
  className = '',
  style = {},
}: AdSenseProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  if (!adClient) {
    return (
      <div className={`bg-gray-100 p-4 text-center text-sm text-gray-500 ${className}`}>
        Ad Space (AdSense not configured)
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}









