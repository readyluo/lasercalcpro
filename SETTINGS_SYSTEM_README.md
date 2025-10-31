# Settings System Implementation

## 🎯 Overview

Complete implementation of the site settings system with Turso database persistence for GA4, GSC, AdSense, and other configuration options.

## 📁 Architecture

### Backend Components

1. **Database Layer** (`lib/db/settings.ts`)
   - `getSetting(key)` - Get single setting
   - `getSettings(keys[])` - Get multiple settings
   - `getAllSiteSettings()` - Get all admin UI settings
   - `setSetting(key, value)` - Update single setting
   - `updateSiteSettings(settings)` - Batch update
   - `getAllSettings()` - Debug/admin view all

2. **Admin API** (`app/api/admin/settings/route.ts`)
   - `GET /api/admin/settings` - Fetch settings (requires auth)
   - `POST /api/admin/settings` - Save settings (requires auth)
   - Includes validation for GA4 ID, AdSense ID, emails, URLs
   - Records audit logs on changes

3. **Public API** (`app/api/settings/public/route.ts`)
   - `GET /api/settings/public` - Fetch public settings (GA4, AdSense)
   - No authentication required
   - Cached for 5 minutes
   - Fallback to environment variables

### Frontend Components

1. **Admin UI** (`app/admin/settings/page.tsx`)
   - Form to edit all site settings
   - Real-time validation
   - Success/error feedback
   - Saves to database via admin API

2. **Google Analytics** (`components/analytics/GoogleAnalytics.tsx`)
   - Dynamically fetches GA4 ID from database
   - Includes Google Consent Mode v2
   - Falls back to environment variables if API fails

3. **AdSense** (`components/ads/AdSenseScript.tsx`)
   - Dynamically fetches AdSense settings from database
   - Respects "enabled" toggle
   - Falls back to environment variables

## 🗄️ Database Schema

```sql
CREATE TABLE settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Key settings:
-- ga4_measurement_id  - Google Analytics 4 Tracking ID (G-XXXXXXXXXX)
-- gsc_property_url    - Google Search Console Property URL
-- adsense_client_id   - Google AdSense Client ID (ca-pub-XXXXXXXXXXXXXXXX)
-- adsense_enabled     - Enable/disable AdSense ('true' or 'false')
-- site_name           - Site name
-- site_url            - Site URL
-- admin_email         - Contact email
-- maintenance_mode    - Maintenance mode ('true' or 'false')
-- allow_registrations - Allow user registrations ('true' or 'false')
```

## 🔄 Data Flow

### Admin Saves Settings:
```
Admin UI Form
  ↓ POST /api/admin/settings
  ↓ Validate (auth + data)
  ↓ lib/db/settings.ts → updateSiteSettings()
  ↓ Database UPDATE (multiple settings)
  ↓ Audit log recorded
  ↓ Success response
```

### Frontend Loads GA4:
```
GoogleAnalytics Component mounts
  ↓ useEffect() → fetch('/api/settings/public')
  ↓ GET /api/settings/public (cached 5min)
  ↓ lib/db/settings.ts → getSetting('ga4_measurement_id')
  ↓ Database SELECT
  ↓ Return GA4 ID
  ↓ Load GA4 scripts dynamically
```

## 🚀 Deployment Steps

### 1. Run Database Migration (Turso)

```bash
# Using Turso CLI
turso db shell lasercalcpro < ./lib/db/schema.sql

# OR manually add these settings in Turso dashboard:
INSERT OR IGNORE INTO settings (setting_key, setting_value, description, is_public) VALUES
('ga4_measurement_id', '', 'Google Analytics 4 Measurement ID', 0),
('gsc_property_url', '', 'Google Search Console Property URL', 0),
('adsense_enabled', 'true', 'Enable Google AdSense', 0),
('allow_registrations', 'true', 'Allow new user registrations', 0);
```

### 2. Configure Admin Settings

1. Login to admin panel: `https://yourdomain.com/admin/login`
2. Navigate to Settings: `https://yourdomain.com/admin/settings`
3. Enter your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
4. Enter your GSC Property URL (optional)
5. Enter your AdSense Client ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
6. Toggle AdSense on/off
7. Click "Save Settings"

### 3. Verify Frontend

1. Open browser DevTools → Network tab
2. Visit your homepage
3. Check for:
   - `GET /api/settings/public` - should return your GA4 ID
   - GA4 script loading: `gtag/js?id=G-XXXXXXXXXX`
   - AdSense script loading (if enabled)

## 🧪 Testing

### Test Admin Save:
```bash
curl -X POST https://yourdomain.com/api/admin/settings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "siteName": "LaserCalc Pro",
    "siteUrl": "https://lasercalcpro.com",
    "contactEmail": "contact@lasercalcpro.com",
    "ga4MeasurementId": "G-XXXXXXXXXX",
    "gscPropertyUrl": "https://search.google.com/search-console?resource_id=...",
    "adsenseClientId": "ca-pub-XXXXXXXXXXXXXXXX",
    "adsenseEnabled": true,
    "maintenanceMode": false,
    "allowRegistrations": true
  }'
```

### Test Public API:
```bash
curl https://yourdomain.com/api/settings/public
# Should return: {"ga4MeasurementId":"G-XXXXXXXXXX","adsenseClientId":"ca-pub-...","adsenseEnabled":true}
```

## 🔍 Debugging

### GA4 Not Loading?

1. **Check Database**:
   ```sql
   SELECT * FROM settings WHERE setting_key = 'ga4_measurement_id';
   ```
   Should return a row with your GA4 ID.

2. **Check Public API**:
   Open `https://yourdomain.com/api/settings/public` in browser.
   Should see `{"ga4MeasurementId":"G-XXXXXXXXXX",...}`

3. **Check Browser Console**:
   Look for errors in:
   - "Failed to fetch GA4 settings"
   - Network errors on `/api/settings/public`

4. **Check Page Source**:
   View source → search for `gtag/js?id=G-`
   The script should be present with your GA4 ID.

### Settings Not Saving?

1. **Check Admin Authentication**:
   Ensure you're logged in as admin.

2. **Check API Response**:
   Open DevTools → Network → find POST to `/api/admin/settings`
   - Status should be 200
   - Response: `{"success":true,"message":"Settings saved successfully"}`

3. **Check Database Write Permissions**:
   Verify Turso database has write access and proper authentication.

4. **Check Audit Logs**:
   ```sql
   SELECT * FROM audit_log WHERE resource_type = 'settings' ORDER BY created_at DESC LIMIT 10;
   ```

## 📊 Validation Rules

- **GA4 Measurement ID**: Must match `^G-[A-Z0-9]+$` (e.g., `G-ABC123XYZ`)
- **AdSense Client ID**: Must match `^ca-pub-\d+$` (e.g., `ca-pub-1234567890123456`)
- **Email**: Standard email format validation
- **URLs**: Must be valid URL format

## 🔐 Security

- Admin API requires authentication (`verifyAdminAuth`)
- Public API only exposes safe settings (GA4, AdSense)
- Sensitive settings (admin_email, etc.) not exposed publicly
- All changes logged in audit_log table
- Input validation on all fields

## 🎉 Result

✅ Admin can now save GA4/GSC/AdSense settings in UI
✅ Settings are persisted in Turso database
✅ Frontend dynamically loads tracking IDs from database
✅ No more hardcoded environment variables needed
✅ Settings can be changed without redeployment
✅ Full audit trail of all changes

