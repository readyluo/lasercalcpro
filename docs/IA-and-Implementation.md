## LaserCalc Pro — Information Architecture & Implementation Checklist (v1)

Last updated: 2025-10-31

### Scope
- This document expands the “缺失项” into a page-by-page information architecture and an actionable implementation checklist aligned with the repository rules.
- Tech stack: Next.js 14 (App Router), Cloudflare Pages + Workers, D1, Tailwind CSS, Zod.

## 1) Global Information Architecture

- Routes (public, English UI)
  - `/` Home (product overview + primary CTAs + calculators entry points)
  - `/calculators/laser-cutting` Laser Cutting Cost Calculator
  - `/calculators/cnc-machining` CNC Machining Cost Estimator
  - `/calculators/roi` Equipment ROI Calculator
  - `/calculators/energy-cost` Energy Cost Calculator
  - `/calculators/material-yield` Material Utilization Calculator
  - `/about` About Us
  - `/contact` Contact Us (with form)
  - `/privacy` Privacy Policy
  - `/terms` Terms of Service
  - `/disclaimer` Disclaimer

- Routes (admin, Chinese UI, protected)
  - `/admin` 仪表板
  - `/admin/content` 内容管理（文章、页面）
  - `/admin/analytics` 数据分析
  - `/admin/login` 登录

- Shared layout structure
  - `app/layout.tsx` Root layout (global styles, fonts, metadata scaffolding)
  - `components/layout/Header.tsx` (navigation, logo, calculators menu)
  - `components/layout/Footer.tsx` (links, legal, sitemap link)

- Core libs
  - `lib/calculators/*` calculation engines (pure functions, no side effects)
  - `lib/db/*` D1 client + DAO (prepared statements only)
  - `lib/i18n/en.ts`, `lib/i18n/zh.ts` i18n texts
  - `lib/validations/*` Zod schemas for inputs
  - `lib/utils/*` helpers (edge-safe)

- API
  - `app/api/calculate/route.ts` POST (validated calculation trigger)
  - `app/api/calculators/[id]/route.ts` GET (history/item retrieval)
  - `app/api/subscribers/route.ts` POST (email subscribe)

- SEO
  - Per-page `metadata`
  - `components/seo/StructuredData.tsx` (HowTo, FAQ)
  - `app/sitemap.ts` (auto sitemap)
  - `robots.txt` static

## 2) Page-by-Page IA and Acceptance Criteria

### A) Home `/`
- Goal: Introduce platform, route users to calculators, establish trust (AdSense-friendly layout).
- Sections:
  - Hero: headline, value proposition, primary CTA to Laser Cutting Calculator
  - Calculators Grid: 5 tools, each with icon, short description, CTA
  - How it works: 3 steps overview (input → compute → export)
  - Trust & SEO: brief copy, links to About, Privacy, Disclaimer
  - Footer: legal links, contact
- SEO:
  - Title: “LaserCalc Pro — Professional Manufacturing Cost Calculators”
  - Description: concise value prop; canonical to `/`
  - Structured data: HowTo (3 steps)
- UI Components:
  - `components/ui/Button` `components/ui/Card` `components/layout/Header` `components/layout/Footer`
- Done when:
  - Lighthouse > 90 (mobile), CLS < 0.1, no console errors
  - Links to all calculators work
  - Structured data valid via Rich Results test

### B) Laser Cutting Calculator `/calculators/laser-cutting`
- Inputs (validated by `laserCuttingSchema`): materialType, thickness, cuttingLength, laserPower, electricityRate, laborRate
- Output: totalCost, unitCost, breakdown (material/electricity/labor/depreciation/gas), optional PDF export, save history
- SEO metadata per repo rules; HowTo schema
- API usage: POST `/api/calculate` with toolType `laser-cutting`
- DAO: writes to `calculations`

### C) CNC Machining Calculator `/calculators/cnc-machining`
- Inputs: part size, material, machiningTime, setupTime, toolCost, batchSize
- Output: detailed cost, batch discount suggestion, margin analysis
- API usage: POST `/api/calculate` with toolType `cnc-machining`

### D) ROI Calculator `/calculators/roi`
- Inputs: machinePrice, monthlyVolume, pricePerPart, operatingCost, interestRate
- Output: payback period, 5y profit, NPV, IRR (+ charts via dynamic import)

### E) Energy Cost `/calculators/energy-cost`
- Inputs: laserPower, chillerPower, exhaustPower, monthlyHours, electricityRate, loadFactor
- Output: daily/monthly/annual energy cost, carbon estimate

### F) Material Utilization `/calculators/material-yield`
- Inputs: sheetSize, partSize, kerfWidth
- Output: utilization %, scrap cost, tips

### G) Static Pages
- About `/about`: mission, expertise, trust elements
- Contact `/contact`: form (Zod validation) → optional `/api/subscribers`
- Privacy `/privacy`: policy content (static)
- Terms `/terms`: terms content (static)
- Disclaimer `/disclaimer`: calculator assumptions, liability disclaimer

### H) Admin (protected, Chinese UI)
- `/admin/login` 登录表单
- `/admin` 总览指标（只读占位即可）
- `/admin/content` 列表与简单编辑器（未来扩展）

## 3) Data and API Specs

- D1 tables (see PRD): `calculations`, `subscribers`
  - Access via `lib/db/client.ts` and DAO in `lib/db/calculations.ts`
  - Only prepared statements; JSON fields stringified/parsed at boundary

- API contracts
  - POST `/api/calculate`
    - Request: `{ toolType: 'laser-cutting'|'cnc-machining'|'roi'|'energy-cost'|'material-yield', params: {...} }`
    - Response: `{ success: boolean, result: object } | { error, details? }`
  - GET `/api/calculators/[id]`
    - Response 200 with calculation, 404 if not found
  - POST `/api/subscribers`
    - Request: `{ email: string, source_tool?: string }`
    - Response: `{ success: true }` or validation error

## 4) Components Inventory (initial)

- Layout: `Header`, `Footer`, `Container`
- UI: `Button`, `Input`, `Select`, `NumberField`, `Card`, `Badge`, `Alert`
- Forms: Calculator form wrappers (client), schema resolvers
- SEO: `StructuredData` (HowTo/FAQ)

## 5) Edge/Runtime Rules

- No Node core modules; use Web Crypto, fetch, Request/Response
- Client components require `'use client'` if using hooks or event handlers
- Dynamic rendering for pages using `usePathname/useSearchParams`

## 6) Implementation Checklist (Executable Tasks)

### Batch 0 — Foundations
1. Initialize root layout `app/layout.tsx` with Tailwind and base metadata
2. Add `components/layout/Header.tsx` with navigation (EN)
3. Add `components/layout/Footer.tsx` with legal links
4. Add `components/seo/StructuredData.tsx`
5. Set up `lib/i18n/en.ts` and `lib/i18n/zh.ts` hooks accessors
6. Create D1 client `lib/db/client.ts` and DAO `lib/db/calculations.ts`

### Batch 1 — Home Page (current focus)
1. Create `app/page.tsx` (Server Component)
2. Add calculators grid linking to 5 calculator routes
3. Add HowTo schema via `StructuredData`
4. Add metadata for home
5. Verify Lighthouse mobile > 90

### Batch 2 — Laser Cutting Calculator
1. Schema `lib/validations/laser.ts` (Zod)
2. Calculation engine `lib/calculators/laser.ts`
3. Page UI `app/calculators/laser-cutting/page.tsx` + client form
4. API `app/api/calculate/route.ts` (supports toolType)
5. DAO save + history retrieval

### Batch 3 — CNC Calculator
1. Zod schema + engine
2. Page UI + metadata
3. Integrate shared API

### Batch 4 — ROI Calculator
1. Zod schema + engine + dynamic charts
2. Page UI + metadata

### Batch 5 — Energy Cost
1. Zod schema + engine
2. Page UI + metadata

### Batch 6 — Material Utilization
1. Zod schema + engine
2. Page UI + metadata

### Batch 7 — Static Pages
1. `/about` `/contact` `/privacy` `/terms` `/disclaimer`
2. Contact form validation + optional subscriber API

### Batch 8 — SEO & System Pages
1. `app/sitemap.ts`, `public/robots.txt`
2. `app/error.tsx`, `app/not-found.tsx`

### Batch 9 — Admin (MVP)
1. `middleware.ts` protect `/admin`
2. `/admin/login`, `/admin`, `/admin/content` skeleton

## 7) Definition of Done
- TypeScript strict, no `any`
- Zod validation for all user inputs
- Prepared statements for all DB operations
- Edge-compatible APIs only
- Page-level metadata and structured data
- Mobile-first responsive, Tailwind only
- No build/lint errors













