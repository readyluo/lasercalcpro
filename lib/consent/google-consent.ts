/**
 * Google Consent Mode v2 Integration
 * Manages consent for Google Analytics and AdSense
 */

export interface ConsentState {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

/**
 * Initialize Google Consent Mode with default denied state
 * This should be called before gtag initialization
 */
export function initializeConsentMode() {
  if (typeof window === 'undefined') return;

  // Define gtag if not already defined
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  // Set default consent to denied (GDPR compliant)
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500, // Wait 500ms for user consent
  });

  // Check if user has previously saved consent
  const savedConsent = localStorage.getItem('cookie_consent');
  if (savedConsent) {
    try {
      const preferences = JSON.parse(savedConsent);
      updateConsent({
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.advertising ? 'granted' : 'denied',
        ad_user_data: preferences.advertising ? 'granted' : 'denied',
        ad_personalization: preferences.advertising ? 'granted' : 'denied',
      });
    } catch (e) {
      console.error('Failed to parse saved consent:', e);
    }
  }
}

/**
 * Update consent state
 */
export function updateConsent(state: ConsentState) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', state);
}

/**
 * Grant all consents
 */
export function grantAllConsent() {
  updateConsent({
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
}

/**
 * Deny all optional consents (keep only necessary)
 */
export function denyAllConsent() {
  updateConsent({
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

// Type augmentation for window
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

