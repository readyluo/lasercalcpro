## LaserCalc Pro — Missing Items IA & Implementation Checklist (v1)

Scope: Define information architecture, page purposes, content models, SEO, validation, and acceptance criteria for the identified missing items. Aligns with Next.js 14 App Router, TypeScript strict, Tailwind, Cloudflare Pages/Workers constraints.

Conventions
- App Router path names shown as code paths under `app/`
- Server Components default; Client Components only when handling events/hooks
- All user inputs validated with Zod
- SEO metadata included on pages with indexable content

---

### 1) Search
- URL: `/search` → `app/search/page.tsx`
- Purpose: Site-wide search across calculators, guides, and blog posts
- Content model:
  - query: string (q) via search params
  - results: array of { title, url, type: 'calculator'|'guide'|'blog', excerpt }
- SEO:
  - Title: "Search — LaserCalc Pro"
  - Description: "Find calculators, guides, and articles"
  - Noindex when `q` is empty
- Validation:
  - q: z.string().trim().max(100)
- Components:
  - `SearchBox` (client) with debounced input
  - `SearchResults` (server) consuming `q`
- Analytics:
  - track search term, result count, click-through
- Acceptance:
  - Renders with/without query; shows empty state; handles 0 results

### 2) FAQ
- URL: `/faq` → `app/faq/page.tsx`
- Purpose: Onboarding and common questions
- Content model:
  - faqs: array of { question, answer, category? }
- SEO:
  - Title: "FAQ — LaserCalc Pro"
  - Structured Data: FAQPage schema
- Acceptance:
  - Collapsible items; deep links to calculators/guides

### 3) Subscriber Preferences & Unsubscribe
- URLs:
  - `/subscribe/preferences` → `app/subscribe/preferences/page.tsx`
  - `/unsubscribe` → `app/unsubscribe/page.tsx`
- Purpose: Manage email preferences and allow opt-out
- Content model:
  - email: string (from magic link/token)
  - preferences: { newsletters: boolean, productUpdates: boolean }
- Validation:
  - token-based request; zod for payload
- Acceptance:
  - Success and error states; confirmation screen

### 4) Cookie Policy & Preferences Entry
- URL: `/cookies` → `app/cookies/page.tsx`
- Purpose: Legal policy and link to preferences control (future banner)
- Acceptance:
  - Clear categories; link targets work

### 5) Accessibility Statement
- URL: `/accessibility` → `app/accessibility/page.tsx`
- Purpose: Declare a11y commitment and contact channel
- Acceptance:
  - Includes conformance target and feedback contact

### 6) Blog Taxonomy (Category/Tag/Author/Archive)
- URLs:
  - `/blog/category/[slug]`
  - `/blog/tag/[slug]`
  - `/blog/author/[slug]`
  - `/blog/archive/[year]/[month]`
- Purpose: Improve discoverability and SEO
- Content model:
  - listing: { title, slug, excerpt, date, tags, category, author }
- SEO:
  - Canonical, pagination, breadcrumb schema (optional)
- Acceptance:
  - Empty states; pagination supported

### 7) Methodology Pages for Core Calculators
- URLs:
  - `/calculators/laser-cutting/methodology`
  - `/calculators/cnc-machining/methodology`
  - `/calculators/roi/methodology`
- Purpose: Explain assumptions and formulas to build trust
- Content model:
  - sections: intro, assumptions, formulas, references
- SEO:
  - Link rel from calculator pages
- Acceptance:
  - Renders math using plain text or images (no Node APIs)

### 8) Case Studies
- URLs:
  - `/case-studies`
  - `/case-studies/[slug]`
- Purpose: Trust and practical applications
- Content model:
  - case: { title, summary, metrics, industry, body }
- Acceptance:
  - Related calculators CTA

### 9) Partnerships/Integrations
- URL: `/integrations` (alias `/partners`)
- Purpose: Explain ERP/CAD/CAM integrations (current or roadmap)
- Acceptance:
  - Cards with partner logos and status

### 10) Pricing/Plans
- URL: `/pricing`
- Purpose: Future monetization and conversion framing
- Acceptance:
  - Feature matrix; CTA to contact/subscribe

### 11) SLA/Security
- URLs:
  - `/sla`
  - `/security`
- Purpose: Enterprise assurances
- Acceptance:
  - Contact channel for security reports

### 12) Admin Enhancements: RBAC & Audit Logs (中文)
- URLs:
  - `/admin/roles`
  - `/admin/audit-logs`
- Purpose: 权限管理与合规性审计
- Acceptance:
  - 基于角色的页面可见性；操作留痕列表

---

Implementation Batches (execute page-by-page)
1. Search → `/search`
2. FAQ → `/faq`
3. Preferences & Unsubscribe → `/subscribe/preferences`, `/unsubscribe`
4. Cookie Policy → `/cookies`
5. Accessibility → `/accessibility`
6. Blog Taxonomy → category/tag/author/archive
7. Methodology pages (laser-cutting, cnc, roi)
8. Case Studies hub/detail
9. Partnerships/Integrations
10. Pricing/Plans
11. SLA/Security
12. Admin RBAC & Audit Logs

Each page: add metadata, server component structure, placeholder content blocks, and ensure English front-end / Chinese for admin pages.


