#!/bin/bash
# LaserCalcPro Pre-Launch Comprehensive Check
# This script performs a thorough check before deployment

echo "🚀 LaserCalcPro Pre-Launch Check"
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# 1. Check Favicon Files
echo "📱 1. Checking Favicon Files..."
FAVICON_FILES=(
    "public/favicon.ico"
    "public/favicon-16x16.png"
    "public/favicon-32x32.png"
    "public/apple-touch-icon.png"
    "public/android-chrome-192x192.png"
    "public/android-chrome-512x512.png"
)

for file in "${FAVICON_FILES[@]}"; do
    if [ -f "$file" ] && [ -s "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file exists ($(ls -lh "$file" | awk '{print $5}'))"
    else
        echo -e "  ${RED}✗${NC} $file missing or empty"
        ((ERRORS++))
    fi
done
echo ""

# 2. Check Critical Pages
echo "📄 2. Checking Critical Pages..."
CRITICAL_PAGES=(
    "app/page.tsx"
    "app/layout.tsx"
    "app/not-found.tsx"
    "app/calculators/laser-cutting/page.tsx"
    "app/calculators/cnc-machining/page.tsx"
    "app/blog/page.tsx"
    "app/about/page.tsx"
    "app/contact/page.tsx"
)

for page in "${CRITICAL_PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo -e "  ${GREEN}✓${NC} $page"
    else
        echo -e "  ${RED}✗${NC} $page missing"
        ((ERRORS++))
    fi
done
echo ""

# 3. Check Footer in Calculator Pages
echo "🔗 3. Checking Footers in Calculator Pages..."
CALC_PAGES=$(find app/calculators -name "page.tsx" -not -path "*/node_modules/*" | head -15)
MISSING_FOOTER=0
for page in $CALC_PAGES; do
    if grep -q "<Footer" "$page"; then
        echo -e "  ${GREEN}✓${NC} $(echo $page | sed 's/app\/calculators\///')"
    else
        echo -e "  ${YELLOW}⚠${NC} $(echo $page | sed 's/app\/calculators\///') - No Footer"
        ((WARNINGS++))
        ((MISSING_FOOTER++))
    fi
done
if [ $MISSING_FOOTER -eq 0 ]; then
    echo -e "  ${GREEN}All calculator pages have footers!${NC}"
fi
echo ""

# 4. Check Navigation Component
echo "🧭 4. Checking Navigation Component..."
if [ -f "components/layout/Navigation.tsx" ]; then
    echo -e "  ${GREEN}✓${NC} Navigation component exists"
else
    echo -e "  ${RED}✗${NC} Navigation component missing"
    ((ERRORS++))
fi

if [ -f "components/layout/Footer.tsx" ]; then
    echo -e "  ${GREEN}✓${NC} Footer component exists"
else
    echo -e "  ${RED}✗${NC} Footer component missing"
    ((ERRORS++))
fi
echo ""

# 5. Check Environment Setup
echo "🔐 5. Checking Environment Files..."
if [ -f ".env.local" ]; then
    echo -e "  ${GREEN}✓${NC} .env.local exists"
    # Check for critical env vars (without showing values)
    if grep -q "TURSO_DATABASE_URL" .env.local && grep -q "TURSO_AUTH_TOKEN" .env.local; then
        echo -e "  ${GREEN}✓${NC} Database credentials configured"
    else
        echo -e "  ${YELLOW}⚠${NC} Some database credentials might be missing"
        ((WARNINGS++))
    fi
else
    echo -e "  ${YELLOW}⚠${NC} .env.local not found (OK for production if using Vercel env vars)"
fi
echo ""

# 6. Check Package Dependencies
echo "📦 6. Checking Dependencies..."
if [ -f "package.json" ]; then
    echo -e "  ${GREEN}✓${NC} package.json exists"
    if [ -f "package-lock.json" ]; then
        echo -e "  ${GREEN}✓${NC} package-lock.json exists"
    fi
else
    echo -e "  ${RED}✗${NC} package.json missing"
    ((ERRORS++))
fi
echo ""

# 7. Check Build Configuration
echo "⚙️  7. Checking Build Configuration..."
if [ -f "next.config.js" ]; then
    echo -e "  ${GREEN}✓${NC} next.config.js exists"
else
    echo -e "  ${RED}✗${NC} next.config.js missing"
    ((ERRORS++))
fi

if [ -f "tsconfig.json" ]; then
    echo -e "  ${GREEN}✓${NC} tsconfig.json exists"
else
    echo -e "  ${RED}✗${NC} tsconfig.json missing"
    ((ERRORS++))
fi

if [ -f "tailwind.config.ts" ]; then
    echo -e "  ${GREEN}✓${NC} tailwind.config.ts exists"
else
    echo -e "  ${YELLOW}⚠${NC} tailwind.config.ts missing"
    ((WARNINGS++))
fi
echo ""

# 8. Check SEO Files
echo "🔍 8. Checking SEO Configuration..."
if [ -f "app/robots.ts" ]; then
    echo -e "  ${GREEN}✓${NC} robots.ts exists"
else
    echo -e "  ${YELLOW}⚠${NC} robots.ts missing"
    ((WARNINGS++))
fi

if [ -f "app/sitemap.ts" ]; then
    echo -e "  ${GREEN}✓${NC} sitemap.ts exists"
else
    echo -e "  ${YELLOW}⚠${NC} sitemap.ts missing"
    ((WARNINGS++))
fi

if [ -f "app/manifest.ts" ]; then
    echo -e "  ${GREEN}✓${NC} manifest.ts exists"
else
    echo -e "  ${YELLOW}⚠${NC} manifest.ts missing"
    ((WARNINGS++))
fi

if [ -f "public/robots.txt" ]; then
    echo -e "  ${GREEN}✓${NC} public/robots.txt exists"
else
    echo -e "  ${YELLOW}⚠${NC} public/robots.txt missing"
    ((WARNINGS++))
fi
echo ""

# 9. Check Git Status
echo "📝 9. Checking Git Status..."
if [ -d ".git" ]; then
    echo -e "  ${GREEN}✓${NC} Git repository initialized"
    
    # Check for uncommitted changes
    CHANGED_FILES=$(git status --porcelain | wc -l)
    if [ $CHANGED_FILES -gt 0 ]; then
        echo -e "  ${YELLOW}⚠${NC} You have $CHANGED_FILES uncommitted file(s)"
        echo "    Run 'git status' to see details"
    else
        echo -e "  ${GREEN}✓${NC} No uncommitted changes"
    fi
else
    echo -e "  ${YELLOW}⚠${NC} Not a git repository"
    ((WARNINGS++))
fi
echo ""

# 10. Check Content Files
echo "📚 10. Checking Content Files..."
if [ -d "content" ]; then
    ARTICLE_COUNT=$(ls -1 content/article-*.ts 2>/dev/null | wc -l)
    echo -e "  ${GREEN}✓${NC} Content directory exists ($ARTICLE_COUNT articles found)"
else
    echo -e "  ${YELLOW}⚠${NC} Content directory missing"
    ((WARNINGS++))
fi
echo ""

# Summary
echo "=================================="
echo "📊 Pre-Launch Check Summary"
echo "=================================="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Site is ready for deployment.${NC}"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found. Review recommended but not critical.${NC}"
    exit 0
else
    echo -e "${RED}❌ $ERRORS critical error(s) and $WARNINGS warning(s) found.${NC}"
    echo "   Please fix the errors before deploying."
    exit 1
fi

