# LaserCalc Pro - Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- Node.js 18+ installed
- Cloudflare account
- Google Analytics account
- Google AdSense account (optional)

---

## Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
```

---

## Step 2: Configure Environment Variables

Create `.env.local` file:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (Optional)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://lasercalcpro.com
```

---

## Step 3: Setup Cloudflare D1 Database

### 3.1 Create D1 Database

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create lasercalcpro-db
```

### 3.2 Update `wrangler.toml`

Copy the database ID from the output and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "lasercalcpro-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 3.3 Initialize Database Schema

```bash
# Run the schema
wrangler d1 execute lasercalcpro-db --file=./lib/db/schema.sql
```

---

## Step 4: Setup Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy the Measurement ID (G-XXXXXXXXXX)
4. Add it to `.env.local` as `NEXT_PUBLIC_GA_ID`

---

## Step 5: Setup Google AdSense (Optional)

1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
3. Add it to `.env.local` as `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
4. Update ad slot IDs in `components/ads/AdBanner.tsx`

---

## Step 6: Setup Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (lasercalcpro.com)
3. Verify ownership using HTML tag method
4. Submit sitemap: `https://lasercalcpro.com/sitemap.xml`

---

## Step 7: Deploy to Cloudflare Pages

### Option A: Connect Git Repository (Recommended)

1. Push your code to GitHub/GitLab
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/`
6. Add environment variables in Pages settings
7. Deploy!

### Option B: Manual Deployment

```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy with Wrangler
wrangler pages deploy .vercel/output/static --project-name lasercalcpro
```

---

## Step 8: Configure Domain

### 8.1 Add Custom Domain in Cloudflare Pages

1. Go to your Pages project settings
2. Navigate to "Custom domains"
3. Add `lasercalcpro.com` and `www.lasercalcpro.com`

### 8.2 Update DNS Records

Add these DNS records in Cloudflare DNS:

```
Type    Name    Content                 Proxy
CNAME   @       lasercalcpro.pages.dev  Yes
CNAME   www     lasercalcpro.pages.dev  Yes
```

---

## Step 9: Configure D1 Binding for Pages

1. Go to Cloudflare Pages project settings
2. Navigate to "Settings" → "Functions"
3. Add D1 database binding:
   - **Variable name**: `DB`
   - **D1 database**: Select your `lasercalcpro-db`

---

## Step 10: Enable SSL/HTTPS

1. Go to Cloudflare SSL/TLS settings
2. Set encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

---

## Post-Deployment Checklist

### ✅ Functionality Tests
- [ ] All 5 calculators working
- [ ] PDF export functioning
- [ ] Email subscription working
- [ ] Database saving calculations
- [ ] Forms validation working

### ✅ SEO & Analytics
- [ ] Google Analytics tracking events
- [ ] Search Console verified
- [ ] Sitemap submitted
- [ ] robots.txt accessible
- [ ] Meta tags displaying correctly

### ✅ Performance
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Test on mobile devices
- [ ] Check page load times
- [ ] Verify images loading

### ✅ AdSense (if enabled)
- [ ] Ads displaying correctly
- [ ] Auto ads enabled
- [ ] Ad units responsive

---

## Monitoring & Maintenance

### Daily Checks
- Check Google Analytics for traffic
- Monitor AdSense revenue
- Review error logs in Cloudflare

### Weekly Tasks
- Review Search Console performance
- Check for 404 errors
- Update content if needed

### Monthly Tasks
- Review and optimize top-performing pages
- Create new blog content
- Update calculator formulas if needed

---

## Troubleshooting

### Build Errors

**Issue**: `peer dependency` errors
**Solution**: Use `npm install --legacy-peer-deps`

### Database Not Working

**Issue**: D1 not accessible
**Solution**: 
1. Check D1 binding in Pages settings
2. Verify database ID in `wrangler.toml`
3. Ensure schema is initialized

### Analytics Not Tracking

**Issue**: GA4 not recording events
**Solution**:
1. Verify GA_ID is correct
2. Check browser console for errors
3. Disable ad blockers for testing

### AdSense Not Showing

**Issue**: Ads not displaying
**Solution**:
1. Verify AdSense account is approved
2. Check client ID is correct
3. Update ad slot IDs
4. Wait 24-48 hours for ads to activate

---

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Serve WebP format
- Lazy load images

### Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components

### Caching
- Cloudflare automatically caches static assets
- Configure cache headers if needed

### Monitoring
```bash
# Check bundle size
npm run build

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] CORS configured properly
- [ ] Rate limiting enabled (Cloudflare)
- [ ] DDoS protection active (Cloudflare)

---

## Support

For issues or questions:
- Email: support@lasercalcpro.com
- Documentation: /docs
- GitHub Issues: [your-repo]/issues

---

## License

MIT License - see LICENSE file for details









