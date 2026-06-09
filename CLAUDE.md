# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                        # Start dev server (http://localhost:3000)
pnpm build                      # Production build (also runs next-sitemap postbuild)
pnpm start                      # Serve production build
pnpm lint                       # Lint
pnpm lint:fix                   # Lint and auto-fix

# Payload CLI
pnpm payload migrate:create     # Create a new DB migration
pnpm payload migrate            # Run pending migrations
pnpm generate:types             # Regenerate payload-types.ts from schema
pnpm generate:importmap         # Regenerate Payload admin import map

# Tests
pnpm test:int                   # Integration tests (Vitest, tests/int/**/*.int.spec.ts)
pnpm test:e2e                   # E2E tests (Playwright, tests/e2e/)
pnpm test                       # Both
```

## Architecture

This is a **Payload CMS v3 + Next.js 15 monorepo** — the CMS backend and the public-facing website run in the same Next.js app.

### Routing split

`src/app` uses two route groups:

- `(payload)` — Payload admin panel (`/admin`) and API routes (`/api`). Managed by Payload internals via `@payloadcms/next`.
- `(frontend)` — Public website. Catch-all `[slug]` renders Pages, `/posts` renders Posts, `/homes/[slug]` renders Homes, `/search` is the search page. The root `page.tsx` redirects to the first published Home.

### Data model

Defined in `src/payload.config.ts`. Collections:

- **Pages** — general content pages with a layout builder
- **Posts** — blog/news articles, also layout-builder enabled, draft-enabled
- **Homes** — property listings; each has a hero + layout blocks + SEO tab
- **Media** — image/file uploads (stored in Vercel Blob in production)
- **Categories** — nested taxonomy for Posts (via `plugin-nested-docs`)
- **Users** — auth-enabled, grants admin panel access

Globals: **Header** and **Footer** (nav links).

`src/payload-types.ts` is auto-generated — never edit it manually, run `pnpm generate:types` instead.

### Layout builder (blocks)

Pages and Homes are built by composing blocks. Each block lives in `src/blocks/<BlockName>/` with a `config.ts` (Payload field schema) and a `Component.tsx` (React rendering). `src/blocks/RenderBlocks.tsx` maps `blockType` slugs to components.

Current blocks: `archive`, `banner`, `callToAction` (cta), `code`, `contactUs`, `content`, `formBlock`, `mediaBlock`, `mediaCarousel`, `processTimeline`, `productMediaBlock`, `relatedPosts`, `section`, `textBox`.

### Heros

`src/heros/` contains hero variants (`FullImpact`, `HighImpact`, `MediumImpact`, `LowImpact`, `PostHero`). `src/heros/config.ts` defines the Payload field group used across collections.

### Plugins (src/plugins/index.ts)

- `redirectsPlugin` — admin-managed redirects for pages/posts
- `nestedDocsPlugin` — nested categories
- `seoPlugin` — SEO fields on Pages/Posts
- `formBuilderPlugin` — drag-and-drop forms
- `searchPlugin` — full-text search over posts (synced to a search collection)

### Database & storage

- **Production**: Vercel Postgres (`@payloadcms/db-vercel-postgres`) + Vercel Blob for media
- **Local dev**: SQLite (`@payloadcms/db-sqlite`) via `bhb.db` — schema changes are pushed automatically (`push: true`) without running migrations
- Migrations live in `src/migrations/`. Always create a migration before deploying schema changes to production.

### Environment variables

Key vars (see `.env.example`): `DATABASE_URI`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `CRON_SECRET`. `NEXT_PUBLIC_SERVER_URL` / `VERCEL_PROJECT_PRODUCTION_URL` determine the server URL used for CORS and SEO URL generation.

### On-demand revalidation

`afterChange` hooks on Pages, Posts, Homes, Header, and Footer call Next.js revalidate endpoints so static pages update without a full rebuild. If only an image is changed, the page using it must be re-published manually to bust the Next.js image cache.

### Fonts & styling

Fonts are `Playfair_Display` (`--font-playfair`) and `Montserrat` (`--font-montserrat`), loaded in `src/app/(frontend)/layout.tsx`. Styling is Tailwind CSS with shadcn/ui components (`components.json`).

### Tests

- **Integration** (`tests/int/api.int.spec.ts`): Vitest + jsdom, hits the Payload local API
- **E2E** (`tests/e2e/frontend.e2e.spec.ts`): Playwright/Chromium, spins up `pnpm dev` automatically
- Integration tests use `test.env` for environment overrides
