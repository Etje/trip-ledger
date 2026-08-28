# Progress

Living checklist for the Trip Ledger MVP. See `AGENTS.md` for stack/structure info and the full product vision behind this list.

## Done

- [x] Trip logging — form (`TripForm`), store (`useTripStore`), overview (`TripList`)
- [x] Supabase backend — trips + subscription persisted to Postgres (`src/lib/api/`, `src/lib/supabase.ts`), store hydrates from and writes through to the DB instead of localStorage
- [x] Trip delete UI — `TripList` calls `removeTrip(id)`
- [x] Fixed `TripForm` navigation — uses `useRouter().push('/')` instead of `redirect()`
- [x] Monthly summary calculation (`src/lib/monthSummary.ts`) — subscription cost / waarde benut / bespaard
- [x] `MonthlySummaryCard` wired to real data, "bespaard" highlighted in neon green
- [x] `Subscription` and `MonthSummary` types fully defined
- [x] Overlay Panel tabs (Ritten | Dagen | Maand | Stations | Afstand) — all wired
- [x] "Ritten" overlay — `src/lib/overlays.ts` (`generateRidesOverlays`, `getTripDayNumbers`) + `RidesOverlays` component with per-line copy-to-clipboard
- [x] "Dagen" overlay — `generateDaysOverlays` + `formatOverlayDate` (`12 aug 2026`) + `DaysOverlays` component; fixed an earlier markup bug (`<li>`s were wrapped in a `<div>` instead of a `<ul>`)
- [x] "Stations" overlay — `Trip.arrivalTime` (`arrival_time` column in Supabase, "Aankomsttijd" input in `TripForm`), `generateStationsOverlays` + `formatOverlayTime` + `StationsOverlays` component, new tab in `OverlayPanel`
- [x] "Afstand" overlay — `Trip.distanceKm` (`distance_km` column in Supabase), real per-trip km input via `DistanceForm` (`/distances`, one row per trip with an input + opslaan-knop), `updateTripDistance` action wired through the store/API, `generateDistanceOverlays` uses real data (no more `HARDCODED_DISTANCE_KM`)
- [x] "Maand" overlay — `generateMonthOverlay()` (reuses `summarizeMonth()`) + `MonthOverlay` component, single centered copyable line, e.g. `aug 2026 · ticket €58 / value €142 / saved €84`
- [x] Subscription edit UI — `SubscriptionSettings` component on the homepage, wired to the already-existing `setSubscription` store action
- [x] Removed unused `PointOfInterest`/`Overlay` placeholder types and the dead `pointsOfInterest` store state — nothing referenced them; add them back with real fields if/when a feature needs them

## Next up (suggested order)

1. **Trip edit UI** — no update action exists yet on `useTripStore`/`src/lib/api/trips.ts` for general trip fields (distance now has its own `updateTripDistance`).
2. **Form validation with Zod** — installed, unused. Wire up a schema for `TripForm` and `DistanceForm` (date, amount > 0, km > 0).
3. **Overlay extras** — running total, "bespaard tot nu", badge, full log block (mentioned in the vision as later additions, no rush).

## Notes

- Package manager is pnpm (pinned via `packageManager` in `package.json`); `package-lock.json` was removed.
- Old localStorage trips were not migrated — re-enter them manually via `TripForm` once Supabase is set up.
- `supabase/schema.sql` was removed from the repo — the create-table SQL now lives inline in `README.md`'s "Aan de slag" section, so keep that in sync if the schema changes (e.g. the `arrival_time` column added for the Stations overlay).
