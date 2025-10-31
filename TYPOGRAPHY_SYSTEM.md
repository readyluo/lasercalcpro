# Typography & Heading Hierarchy System

## Problem Statement
Current heading sizes are inverted - section titles inside cards are larger than the main section headings, creating visual confusion and poor information hierarchy.

## Correct Hierarchy

### Page Level
```
H1 (Page Title)          → text-4xl/text-5xl (36-48px) + font-bold
H2 (Major Section)       → text-3xl (30px) + font-bold
H3 (Subsection)          → text-2xl (24px) + font-bold
H4 (Card/Component Title)→ text-xl (20px) + font-semibold
H5 (Sub-component)       → text-lg (18px) + font-semibold
H6 (Small heading)       → text-base (16px) + font-semibold
```

### Component Level (Inside Cards/Boxes)
```
Card Title               → text-lg (18px) + font-semibold
Card Subtitle            → text-base (16px) + font-medium
Card Section             → text-sm (14px) + font-semibold
```

## Current Issues & Fixes

### Issue 1: Guide Pages (Material Costs, etc.)
**Current:**
```tsx
// Main section
<h2 className="text-2xl font-bold">How to Calculate Material Cost</h2>

// Steps inside (WRONG - larger than parent!)
<h3 className="text-3xl font-bold">Step 1: Calculate Sheet Weight</h3>
```

**Fix:**
```tsx
// Main section
<h2 className="text-3xl font-bold mb-6">How to Calculate Material Cost</h2>

// Steps inside
<h3 className="text-xl font-semibold mb-4">Step 1: Calculate Sheet Weight</h3>
```

### Issue 2: Info Boxes
**Current:**
```tsx
<div className="bg-green-50 p-6">
  <h3 className="text-2xl font-bold">Material Selection Tips</h3>
  <h4 className="text-xl font-semibold">Cost vs. Performance</h4>
</div>
```

**Fix:**
```tsx
<div className="bg-green-50 p-6">
  <h3 className="text-xl font-bold mb-4">Material Selection Tips</h3>
  <h4 className="text-lg font-semibold mb-3">Cost vs. Performance</h4>
</div>
```

### Issue 3: FAQ Sections
**Current:**
```tsx
<h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
<h3 className="font-semibold text-gray-900">{question}</h3>  // No size class
```

**Fix:**
```tsx
<h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
<h3 className="text-lg font-semibold text-gray-900">{question}</h3>
```

## Standard Spacing

```tsx
// After H1
className="mb-8"

// After H2  
className="mb-6"

// After H3
className="mb-4"

// After H4
className="mb-3"

// Between sections
className="mt-12" or className="mt-8"
```

## Color Guidelines

```tsx
// Headings
text-gray-900     // Primary headings (H1, H2, H3)
text-gray-800     // Secondary headings (H4, H5)
text-gray-700     // Tertiary headings (H6)

// Body text
text-gray-700     // Primary body text
text-gray-600     // Secondary/helper text
text-gray-500     // Muted text
```

## Implementation Checklist

### Priority 1: Guide/Reference Pages
- [ ] `/calculators/quick-reference/material-costs/page.tsx`
- [ ] `/guides/*` pages
- [ ] All calculator result pages

### Priority 2: Content Pages  
- [ ] `/methodology/page.tsx`
- [ ] `/case-studies/*`
- [ ] `/blog/*`

### Priority 3: Utility Pages
- [ ] `/faq/page.tsx`
- [ ] `/accessibility/page.tsx`
- [ ] `/cookie-policy/page.tsx`

## Examples

### ✅ Good Hierarchy
```tsx
<div className="container">
  <h1 className="text-4xl font-bold mb-8">Equipment ROI Calculator</h1>
  
  <h2 className="text-3xl font-bold mb-6">Investment Parameters</h2>
  
  <div className="card">
    <h3 className="text-xl font-semibold mb-4">Initial Investment</h3>
    <div>
      <h4 className="text-lg font-semibold mb-3">Equipment Cost</h4>
      <input ... />
    </div>
  </div>
  
  <h2 className="text-3xl font-bold mt-12 mb-6">Financial Metrics</h2>
  
  <div className="bg-blue-50 p-6">
    <h3 className="text-xl font-bold mb-4">Understanding NPV</h3>
    <p className="text-gray-700">...</p>
  </div>
</div>
```

### ❌ Bad Hierarchy (Current Issue)
```tsx
<div className="container">
  <h1 className="text-4xl font-bold">Material Costs Reference</h1>
  
  <h2 className="text-2xl font-bold">How to Calculate</h2>  {/* Too small */}
  
  <div className="card">
    <h3 className="text-3xl font-bold">Step 1</h3>  {/* WRONG: Larger than H2! */}
  </div>
</div>
```

