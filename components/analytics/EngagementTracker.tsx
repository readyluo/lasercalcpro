'use client';

import { useEffect, useRef } from 'react';
import { trackEngagementTime } from '@/lib/analytics/events';

interface EngagementTrackerProps {
  pageType: string;
  children: React.ReactNode;
}

export function EngagementTracker({ pageType, children }: EngagementTrackerProps) {
  const startTimeRef = useRef<number>(Date.now());
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    hasTrackedRef.current = false;

    const trackEngagement = () => {
      if (!hasTrackedRef.current) {
        const engagementTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (engagementTime > 5) { // Only track if user stayed for more than 5 seconds
          trackEngagementTime(pageType, engagementTime);
          hasTrackedRef.current = true;
        }
      }
    };

    // Track on visibility change (tab switch, minimize)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEngagement();
      }
    };

    // Track on beforeunload (page close, navigation)
    const handleBeforeUnload = () => {
      trackEngagement();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackEngagement();
    };
  }, [pageType]);

  return <>{children}</>;
}


