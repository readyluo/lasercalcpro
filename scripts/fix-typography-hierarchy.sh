#!/bin/bash

# Typography Hierarchy Fix Script
# This script scans for heading hierarchy issues across all pages

echo "🔍 Scanning for typography hierarchy issues..."
echo ""

# Define patterns to search for (inverted hierarchy issues)
ISSUE_PATTERNS=(
  # Pattern 1: H2 text-2xl followed by H3 text-3xl (inverted)
  "text-2xl.*<h3.*text-3xl"
  # Pattern 2: Small section titles with larger nested titles
  "mb-4 text-2xl.*text-3xl"
)

# Files to check (excluding admin and API routes)
FILES=$(find /Users/luokun/Downloads/LaserCalcpro/app -name "page.tsx" \
  ! -path "*/api/*" \
  ! -path "*/admin/*" \
  | sort)

echo "📄 Files to scan: $(echo "$FILES" | wc -l)"
echo ""

# Track issues found
ISSUES_FOUND=0

for file in $FILES; do
  # Check for common problematic patterns
  
  # Pattern 1: H2 smaller than H3
  if grep -q 'text-2xl.*font-bold' "$file" && grep -q 'text-3xl.*font-' "$file"; then
    # Get context around the issue
    CONTEXT=$(grep -B2 -A2 'text-2xl.*font-bold\|text-3xl.*font-' "$file" 2>/dev/null)
    if [ ! -z "$CONTEXT" ]; then
      echo "⚠️  Potential hierarchy issue in:"
      echo "   $file"
      echo ""
      ((ISSUES_FOUND++))
    fi
  fi
done

echo ""
echo "✅ Scan complete"
echo "   Total issues found: $ISSUES_FOUND"
echo ""
echo "📋 Recommended fixes:"
echo "   H1 (Page Title):    text-4xl/text-5xl + font-bold"
echo "   H2 (Major Section): text-3xl + font-bold"
echo "   H3 (Subsection):    text-2xl + font-bold"
echo "   H4 (Card Title):    text-xl + font-semibold"
echo "   H5 (Sub-element):   text-lg + font-semibold"
echo ""

