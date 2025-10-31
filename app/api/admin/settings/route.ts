import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// GET settings
export async function GET(request: NextRequest) {
  try {
    // In a real application, fetch from database
    // For now, return environment variables and defaults
    const settings = {
      siteName: process.env.SITE_NAME || 'LaserCalc Pro',
      siteUrl: process.env.SITE_URL || 'https://lasercalcpro.com',
      contactEmail: process.env.CONTACT_EMAIL || 'contact@lasercalcpro.com',
      ga4MeasurementId: process.env.NEXT_PUBLIC_GA_ID || '',
      gscPropertyUrl: process.env.GSC_PROPERTY_URL || '',
      adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
      adsenseEnabled: process.env.ADSENSE_ENABLED !== 'false',
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
      allowRegistrations: process.env.ALLOW_REGISTRATIONS !== 'false',
    };

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST settings (save)
export async function POST(request: NextRequest) {
  try {
    const settings = await request.json();

    // Validate settings
    if (!settings.siteName || settings.siteName.trim() === '') {
      return NextResponse.json(
        { error: 'Site name is required' },
        { status: 400 }
      );
    }

    if (!settings.siteUrl || settings.siteUrl.trim() === '') {
      return NextResponse.json(
        { error: 'Site URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(settings.siteUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid site URL format' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(settings.contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid contact email format' },
        { status: 400 }
      );
    }

    // Validate GA4 ID format (if provided)
    if (settings.ga4MeasurementId && !settings.ga4MeasurementId.match(/^G-[A-Z0-9]+$/)) {
      return NextResponse.json(
        { error: 'Invalid GA4 Measurement ID format. Should be G-XXXXXXXXXX' },
        { status: 400 }
      );
    }

    // Validate AdSense ID format (if provided)
    if (settings.adsenseClientId && !settings.adsenseClientId.match(/^ca-pub-\d+$/)) {
      return NextResponse.json(
        { error: 'Invalid AdSense Client ID format. Should be ca-pub-XXXXXXXXXXXXXXXX' },
        { status: 400 }
      );
    }

    // In a real application:
    // 1. Store settings in database
    // 2. Update environment variables if needed
    // 3. Trigger cache invalidation
    // 4. Log the change in audit log
    
    console.log('Settings updated:', settings);

    // TODO: Implement actual storage
    // await updateSiteSettings(settings);
    // await recordAuditLog('settings', 'update', adminId, settings);

    return NextResponse.json(
      { success: true, message: 'Settings saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
