<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

Trip Ledger is a personal travel-cost tracker: log trips (date, from/to, transport mode, actual cost vs. normal/reference cost) to see savings or spend over time. It's a single-user tool with no auth — data is persisted to a Supabase (Postgres) database, accessed directly from the client via the publishable API key.

## Stack

- Next.js 16.3.2 (App Router), React 19, TypeScript
- Tailwind CSS v4 (`globals.css`, no config file — v4 uses CSS-based config)
- Zustand for client state (`src/lib/useTripStore.ts`), synced with Supabase — no `persist`/localStorage; `hydrate()` fetches on mount via `StoreHydrator`, and mutations (`addTrip`, `removeTrip`, `setSubscription`) write through to Supabase before updating local state
- Supabase (`@supabase/supabase-js`) — client singleton in `src/lib/supabase.ts`, CRUD + row mapping in `src/lib/api/trips.ts` and `src/lib/api/subscription.ts`. Schema reference in `supabase/schema.sql`. No RLS (single-user, publishable key) — accepted tradeoff, do not reuse this schema for a multi-tenant app without adding auth + RLS
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
- `src/lib/useTripStore.ts` — Zustand store (`trips`, `pointsOfInterest`, `subscription`, `status`/`error`, `hydrate`/add/remove/setSubscription)
- `src/lib/supabase.ts` — Supabase client singleton
- `src/lib/api/` — Supabase CRUD + DB-row ↔ domain-type mapping (`trips.ts`, `subscription.ts`)

## Domain types (`src/lib/types.ts`)

- `Trip`, `Subscription`, `MonthSummary` are fully defined.
- `PointOfInterest` and `Overlay` are still empty interfaces (`{}`) — placeholders for features not yet built (POI persistence for the "Afstand" overlay, and formal overlay metadata if plain strings stop being enough). Define their fields when implementing the feature that needs them, not before.

## Known gaps / in-progress areas

See `PROGRESS.md` at the repo root for the live checklist of what's done and what's next. As of this writing, the main open items are:

- `DistanceForm` is an unbuilt placeholder (no logic, no data).
- `OverlayPanel`'s "Dagen", "Maand", and "Afstand" tabs still render static placeholder text ("Ritten" is done — see `src/lib/overlays.ts` + `RittenOverlays`).
- No edit UI for trips (delete exists in `TripList`).
- `Trip` has no distance/km field, so the "Afstand" view has nothing to compute from yet.
- No validation on forms yet — wire up Zod schemas in `src/lib/types.ts` or alongside forms rather than trusting raw form input.

## Conventions

- UI copy is in Dutch (labels like "Datum", "Van", "Naar", "Betaald"); identifiers/code stay in English. Keep following this split.
- Components are default-exported, one per file, PascalCase filenames matching the component name.
