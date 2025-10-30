'use client';

import { AdSense } from './AdSense';

type AdPosition = 'header' | 'sidebar' | 'in-article' | 'footer' | 'result-top';

interface AdBannerProps {
  position: AdPosition;
  className?: string;
}

/**
 * Pre-configured ad banner for common positions
 */
export function AdBanner({ position, className = '' }: AdBannerProps) {
  // Ad slot IDs (replace with actual IDs from Google AdSense)
  const adSlots: Record<AdPosition, string> = {
    header: '1234567890', // Replace with actual slot ID
    sidebar: '1234567891',
    'in-article': '1234567892',
    footer: '1234567893',
    'result-top': '1234567894',
  };

  const configs: Record<AdPosition, { format: 'auto' | 'rectangle' | 'horizontal' | 'vertical'; style?: React.CSSProperties }> = {
    header: {
      format: 'horizontal',
      style: { minHeight: '90px' },
    },
    sidebar: {
      format: 'vertical',
      style: { minHeight: '600px', minWidth: '300px' },
    },
    'in-article': {
      format: 'rectangle',
      style: { minHeight: '250px' },
    },
    footer: {
      format: 'horizontal',
      style: { minHeight: '90px' },
    },
    'result-top': {
      format: 'horizontal',
      style: { minHeight: '250px' },
    },
  };

  const config = configs[position];

  return (
    <div className={`ad-container ${className}`}>
      <div className="mb-1 text-center text-xs text-gray-400">Advertisement</div>
      <AdSense
        adSlot={adSlots[position]}
        adFormat={config.format}
        responsive={true}
        style={config.style}
      />
    </div>
  );
}

