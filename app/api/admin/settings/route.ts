import { NextRequest, NextResponse } from 'next/server';
import { getAllSiteSettings, updateSiteSettings } from '@/lib/db/settings';
import { verifyAdminAuth } from '@/lib/auth/middleware';
import { recordAuditLog } from '@/lib/db/audit-logs';

export const runtime = 'nodejs'; // Changed from 'edge' to support D1

// GET settings
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch settings from database
    const settings = await getAllSiteSettings();

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
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

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

    // Validate GSC URL format (if provided)
    if (settings.gscPropertyUrl && settings.gscPropertyUrl.trim() !== '') {
      try {
        new URL(settings.gscPropertyUrl);
      } catch {
        return NextResponse.json(
          { error: 'Invalid GSC Property URL format' },
          { status: 400 }
        );
      }
    }

    // Validate AdSense ID format (if provided)
    if (settings.adsenseClientId && !settings.adsenseClientId.match(/^ca-pub-\d+$/)) {
      return NextResponse.json(
        { error: 'Invalid AdSense Client ID format. Should be ca-pub-XXXXXXXXXXXXXXXX' },
        { status: 400 }
      );
    }

    // Save settings to database
    const success = await updateSiteSettings(settings);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save settings to database' },
        { status: 500 }
      );
    }

    // Record audit log
    try {
      await recordAuditLog({
        user_id: admin.id,
        action: 'settings_update',
        module: 'settings',
        description: 'Updated system settings',
        payload: JSON.stringify(settings),
      });
    } catch (error) {
      console.error('Failed to record audit log:', error);
      // Don't fail the request if audit log fails
    }

    console.log('Settings updated successfully by admin:', admin.username);

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
