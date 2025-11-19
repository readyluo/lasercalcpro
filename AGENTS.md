# Repository Guidelines

## Project Structure & Module Organization
Next.js routes live in `app/`: marketing in `app/(frontend)`, calculators in `app/calculators`, and admin/API endpoints in `app/admin` and `app/api`. Shared UI sits in `components/`, domain helpers in `lib/`, and long-form copy or datasets in `content/`. Static media reside in `public/`, operational playbooks in `docs/` plus the root `*_GUIDE.md` files, automation in `scripts/`, and fixtures or regression suites in `tests/`.

## Build, Test, and Development Commands
```
npm run dev             # Next.js dev server with Turbopack
npm run lint            # ESLint + Prettier rules
npm run type-check      # Strict TypeScript project references
npm run test            # Node test runner for calculator suites
npm run build           # Production bundle + route manifest
npm run start           # Run the compiled build locally
npm run pages:build     # Workers artifact for Cloudflare Pages
npm run db:init && npm run create-admin && npm run db:seed   # Turso bootstrap
```

## Coding Style & Naming Conventions
Use two-space indentation, single quotes, and the repo Tailwind ordering—`npm run lint` fixes most issues. Default to server components; opt-in to client components only for hooks or browser APIs. Components use PascalCase (`components/forms/QuoteForm.tsx`), routes are kebab-case, hooks follow `useThing.ts`, and calculator helpers stay under `lib/calculators/<domain>.ts` so UI, API routes, and PDFs can reuse the same math.

## Testing Guidelines
Run `npm run lint`, `npm run type-check`, `npm run test`, and `npm run build` before opening a PR. Calculator suites in `tests/` validate input/output tables; add regression fixtures whenever formulas change. Capture manual steps in `QUICK_TEST_GUIDE.md` or a short doc under `docs/` so reviewers can replay the scenario.

## Commit & Pull Request Guidelines
Use `type(scope): imperative summary`, e.g., `fix(roi-calculator): include principal amortization`. Reference issue IDs, update `CHANGELOG.md`, and refresh relevant `*_SUMMARY.md` files. PRs must list the verification commands, attach screenshots for UI shifts, and call out schema/env changes plus whether `npm run pages:build` passed.

## Security & Configuration Tips
Store secrets only in `.env.local` or managed env vars; follow `ENV_SETUP_GUIDE.md` and `TURSO_MIGRATION_GUIDE.md` for provisioning. Reuse helpers in `lib/seo`, `lib/analytics`, and `lib/security` instead of hard-coding tokens, rotate admin logins via `npm run create-admin`, and run `npm run db:verify` whenever the Turso schema changes.
