<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

Trip Ledger is a personal travel-cost tracker: log trips (date, from/to, transport mode, actual cost vs. normal/reference cost) to see savings or spend over time. It's a single-user tool with Supabase Auth — data is persisted to a Supabase (Postgres) database and protected by RLS.

## Stack

- Next.js 16.3.2 (App Router), React 19, TypeScript
- Tailwind CSS v4 (`globals.css`, no config file — v4 uses CSS-based config)
- Zustand for client state (`src/lib/useTripStore.ts`), synced with Supabase — no `persist`/localStorage; `hydrate()` fetches on mount via `StoreHydrator`, and mutations (`addTrip`, `removeTrip`, `updateTripDistance`, `setSubscription`) write through to Supabase before updating local state
- Supabase (`@supabase/supabase-js` + `@supabase/ssr`) — browser/server clients in `src/lib/supabase/`, CRUD + row mapping in `src/lib/api/trips.ts` and `src/lib/api/subscription.ts`. RLS restricts access to the single owner account; migration in `supabase/migrations/`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — copy `.env.example` to `.env.local` and fill in from the Supabase project's API settings (publishable key, not the secret key — the secret key is only for privileged server-side access, which this app doesn't need)
- Zod is installed but **not yet used anywhere** — intended for form/data validation
- Heroicons for icons

Package manager is **pnpm** (`packageManager` field pinned in `package.json`).

## Structure

- `src/app/page.tsx` — home: `Topbar` + `MonthlySummaryCard` + `OverlayPanel` + `TripList`
- `src/app/trips/page.tsx` — add-trip form (`TripForm`)
- `src/app/distances/page.tsx` — distance page (`DistanceForm`)
- `src/app/components/` — all UI components (flat, no subfolders yet); `StoreHydrator` triggers the initial Supabase fetch and is mounted once in `layout.tsx`
- `src/lib/types.ts` — domain types
- `src/lib/useTripStore.ts` — Zustand store (`trips`, `subscription`, `status`/`error`, `hydrate`/add/remove/updateTripDistance/setSubscription)
- `src/lib/supabase/` — browser/server Supabase clients; `src/lib/supabase.ts` re-exports the browser singleton
- `src/lib/api/` — Supabase CRUD + DB-row ↔ domain-type mapping (`trips.ts`, `subscription.ts`)

## Domain types (`src/lib/types.ts`)

- `Trip`, `Subscription`, `MonthSummary` are fully defined, including `Trip.distanceKm` (optional, `distance_km` column in Supabase).
- No `PointOfInterest`/`Overlay` types exist — they were removed as unused placeholders. Add them back with real fields only when a feature (reusable POIs, structured overlay metadata) actually needs them.

## Known gaps / in-progress areas

See `PROGRESS.md` at the repo root for the live checklist of what's done and what's next. As of this writing, the main open items are:

- Auth and RLS are implemented; run the migration in `supabase/migrations/` before using an existing database.
- No edit UI for trips (delete exists in `TripList`).
- No validation on forms yet — wire up Zod schemas in `src/lib/types.ts` or alongside forms rather than trusting raw form input.

## Conventions

- UI copy is in Dutch (labels like "Datum", "Van", "Naar", "Betaald"); identifiers/code stay in English. Keep following this split.
- Components are default-exported, one per file, PascalCase filenames matching the component name.
