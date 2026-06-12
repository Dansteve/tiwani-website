# tiwani-website

The TIWANI public marketing site (tiwanilife.com): the landing page, the audience pages, the waitlist capture, the funding page, and the legal surface. Next.js (App Router) + React 19 + TypeScript + Tailwind v4 + shadcn/ui, brand tokens from `app/globals.css`. Static export (`output: "export"`) deployed to Firebase Hosting (the `tiwani-main` site).

This is marketing only: no app logic, no user data store, no auth (those live in `tiwani-app` / `tiwani-api`). The one functional path is the waitlist, which dual-writes to Supabase and a Google Sheet.

## Layout

`app/` holds page routes only (one `page.tsx` per route folder) plus `layout.tsx`, `globals.css`, `sitemap.ts`, `not-found.tsx`, and the icon files. `components/` and `lib/` are siblings of `app/` at the repo root; route files import them via the `@/` alias.

## Develop

```bash
npm install
cp .env.example .env   # NEXT_PUBLIC_* (waitlist endpoint, Supabase url/key, app url)
npm run dev            # http://localhost:3000
```

```bash
npm run typecheck      # tsc --noEmit
npm run lint           # next lint
npm run test           # vitest (waitlist, audiences, consent, the PECR analytics-gate)
npm run build          # next build (static export to out/)
```

## Docs

The architecture, the routing table, and the per-area module docs live in the governance workspace:

- `governance/HardRules/Website/SETUP.md` - architecture, source layout, the routing table, the website hard rules.
- `governance/HardRules/Website/Modules/` - `Pages.md`, `Waitlist.md`, `Components.md`, `Legal.md`.
- `governance/Docs/Brand.md` - the brand system. `governance/Docs/Decisions.md` - the stack/deploy decisions (D9, D11).
