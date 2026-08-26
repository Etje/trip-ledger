<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

Trip Ledger is a personal travel-cost tracker: log trips (date, from/to, transport mode, actual cost vs. normal/reference cost) to see savings or spend over time. Everything currently runs client-side — no backend, no auth, data lives in the browser's `localStorage`.

## Stack

- Next.js 16.3.2 (App Router), React 19, TypeScript
- Tailwind CSS v4 (`globals.css`, no config file — v4 uses CSS-based config)
- Zustand + `persist` middleware for state (`src/lib/useTripStore.ts`), backed by a thin localStorage wrapper (`src/lib/storage.ts`)
- Zod is installed but **not yet used anywhere** — intended for form/data validation
- Heroicons for icons

Both `package-lock.json` and `pnpm-lock.yaml` are present. Confirm with whoever set up the project which package manager is canonical before adding dependencies with the other one.

## Structure

- `src/app/page.tsx` — home: `Topbar` + `MonthlySummaryCard` + `OverlayPanel` + `TripList`
- `src/app/trips/page.tsx` — add-trip form (`TripForm`)
- `src/app/distances/page.tsx` — distance page (`DistanceForm`)
- `src/app/components/` — all UI components (flat, no subfolders yet)
- `src/lib/types.ts` — domain types
- `src/lib/useTripStore.ts` — Zustand store (`trips`, `pointsOfInterest`, add/remove/clear)
- `src/lib/storage.ts` — safe localStorage get/set/remove (SSR-safe, swallows errors)

## Domain types (`src/lib/types.ts`)

- `Trip`, `Subscription`, `MonthSummary` are fully defined.
- `PointOfInterest` and `Overlay` are still empty interfaces (`{}`) — placeholders for features not yet built (POI persistence for the "Afstand" overlay, and formal overlay metadata if plain strings stop being enough). Define their fields when implementing the feature that needs them, not before.

## Known gaps / in-progress areas

See `PROGRESS.md` at the repo root for the live checklist of what's done and what's next. As of this writing, the main open items are:

- `DistanceForm` is an unbuilt placeholder (no logic, no data).
- `OverlayPanel`'s "Dagen", "Maand", and "Afstand" tabs still render static placeholder text ("Ritten" is done — see `src/lib/overlays.ts` + `RittenOverlays`).
- No delete/edit UI for trips, even though `useTripStore` already exposes `removeTrip`.
- `Trip` has no distance/km field, so the "Afstand" view has nothing to compute from yet.
- `TripForm` calls `redirect()` from `next/navigation` inside a client component (`"use client"`) after submit — in a client component, navigation should go through `useRouter().push()` from `next/navigation` instead; `redirect()` is meant for Server Components/Actions.
- No validation on forms yet — wire up Zod schemas in `src/lib/types.ts` or alongside forms rather than trusting raw form input.

## Conventions

- UI copy is in Dutch (labels like "Datum", "Van", "Naar", "Betaald"); identifiers/code stay in English. Keep following this split.
- Components are default-exported, one per file, PascalCase filenames matching the component name.
