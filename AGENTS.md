<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## What this is

- Bengali-language news portal built with Next.js 16 (App Router), React 19, strict TypeScript, Tailwind CSS v4, and daisyUI. No backend, database, auth, tests, or CI live in this repo.
- All data comes from the hard-coded external API `https://news-api-v2.vercel.app`. Endpoints currently used: `/api/news/sections`, `/api/news?limit=10`, `/api/news/most-read`, `/api/categories`, `/api/category/:slug`, `/api/article/:id`.
- Routes: `/` (home sections), `/category/[categoryid]` (segment receives a category **slug**, e.g. `/category/politics`), `/news/[newsid]`. Components are in `src/components`; `@/*` maps to `src/*`.
- UI copy is Bengali; the global font is `Noto_Serif_Bengali`. Brand red is `#c00107`.

## Commands

- `npm run dev` — dev server (Turbopack is the default in Next 16).
- `npm run build` — production build; also runs TypeScript checking.
- `npm run lint` — ESLint flat config. It is separate; `next build` no longer lints.
- `npx tsc --noEmit` — standalone typecheck (there is no `typecheck` script).
- `npx next typegen` — regenerate global `PageProps` / `LayoutProps` route types after adding routes.

## Next.js 16 gotchas

- `params` and `searchParams` are Promises: always `await` them. Prefer the generated global helpers, e.g. `PageProps<'/news/[newsid]'>` / `LayoutProps<'/'>`, instead of hand-written prop types. Existing dynamic pages use looser hand-written types.
- Fetching defaults to `auto no cache`: a route without request-time APIs is statically prerendered, so `npm run build` calls the live API once and bakes that data into the page (currently `/`). Add `cache`/`revalidate` options deliberately if freshness matters.
- In dev, Next caches fetch results across HMR; do a navigation or full reload to see fresh API data.
- `next/image` only permits the remote host `ichef.bbci.co.uk` (see `next.config.ts`). Add any new API image hostname to `images.remotePatterns`, otherwise optimization returns 400.
- Turbopack is used for dev and build. Tailwind is wired through the `@tailwindcss/turbopack` loader in `next.config.ts`; don't add a `webpack` config (Next 16 builds fail on one unless you opt out with `--webpack`).
- `src/app/globals.css` combines Tailwind v4, daisyUI (`btn`, `card`, etc.), and `@heroui/styles`. HeroUI components are not used yet, though the package is installed.

## Conventions / pitfalls

- Components are async Server Components that fetch directly; add `"use client"` only when interactivity requires it.
- Each component fetches independently, so the header, nav, marquee, and home sections all make separate API calls. Keep that pattern unless intentionally refactoring data loading.
- `Marquee` is rendered once in `src/app/layout.tsx`. `src/app/page.tsx` imports it but does not render it (causes the only lint warning); don't add a second render.
- Use npm (`package-lock.json` is the only lockfile) and Node 20.9+.
