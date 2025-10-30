# 🚨 URGENT SECURITY NOTICE

## Immediate Actions Required

Your Cloudflare API credentials were exposed in this conversation. You MUST take these actions immediately:

### 1. Revoke Exposed Credentials (CRITICAL - Do this NOW)

#### Revoke Global API Key
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "View" next to "Global API Key"
3. Click "Roll" to generate a new key
4. Save the new key securely (use a password manager)

#### Revoke Origin CA Key
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Find the Origin CA Key in the list
3. Delete or regenerate it

### 2. Create API Token Instead (Recommended)

Instead of using Global API Key, create a limited API Token:

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Choose "Edit Cloudflare Workers" template
4. Select specific permissions:
   - Zone: DNS: Edit
   - Zone: Worker Routes: Edit
   - Account: Cloudflare Pages: Edit
   - Account: D1: Edit
5. Set specific zone resources (your domain only)
6. Create token and save it securely

### 3. Check for Unauthorized Access

1. Review your Cloudflare audit logs: https://dash.cloudflare.com/audit-log
2. Check for any unauthorized changes in the last few hours
3. Review all DNS records
4. Check Workers and Pages deployments

### 4. Enable Two-Factor Authentication

1. Go to: https://dash.cloudflare.com/profile/authentication
2. Enable 2FA immediately
3. Save backup codes in a secure location

---

## Secure Deployment Process

Once you've secured your account, follow this safe deployment process:

### Step 1: Set Up API Token Securely

Create `.env.local` (NEVER commit to git):

```bash
CLOUDFLARE_API_TOKEN=your_new_limited_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

### Step 2: Deploy Using Wrangler

```bash
# Login with token
wrangler login

# Or use environment variable
export CLOUDFLARE_API_TOKEN=your_token

# Deploy
npm run deploy
```

### Step 3: Use GitHub Actions (Recommended)

Store credentials as GitHub Secrets:
1. Go to repository Settings → Secrets and variables → Actions
2. Add secrets:
   - CLOUDFLARE_API_TOKEN
   - CLOUDFLARE_ACCOUNT_ID
3. GitHub Actions will deploy automatically on push

---

## Best Practices Going Forward

1. ✅ Use API Tokens (not Global API Key)
2. ✅ Apply least privilege principle
3. ✅ Store credentials in password manager
4. ✅ Never share credentials in chat/email
5. ✅ Use environment variables
6. ✅ Enable 2FA on all accounts
7. ✅ Regular security audits
8. ✅ Rotate credentials periodically

---

## Need Help?

Contact Cloudflare Support if you see any suspicious activity:
https://dash.cloudflare.com/support

---

**DO NOT PROCEED WITH DEPLOYMENT UNTIL YOU'VE SECURED YOUR ACCOUNT**

