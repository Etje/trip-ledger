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
- [x] Overlay Panel tabs exist (Ritten | Dagen | Stations | Afstand) — "Maand" is typed but still unwired
- [x] "Ritten" overlay — `src/lib/overlays.ts` (`generateRidesOverlays`, `getTripDayNumbers`) + `RidesOverlays` component with per-line copy-to-clipboard
- [x] "Dagen" overlay — `generateDaysOverlays` + `formatOverlayDate` (`12 aug 2026`) + `DaysOverlays` component; fixed an earlier markup bug (`<li>`s were wrapped in a `<div>` instead of a `<ul>`)
- [x] "Stations" overlay — `Trip.arrivalTime` (`arrival_time` column in Supabase, "Aankomsttijd" input in `TripForm`), `generateStationsOverlays` + `formatOverlayTime` + `StationsOverlays` component, new tab in `OverlayPanel`

## Next up (suggested order)

1. **"Maand" overlay tab** — reuse `summarizeMonth()`; render the same line `MonthlySummaryCard` shows, but inside the Overlay Panel with a copy button.
2. **Subscription edit UI** — no form exists to change `Subscription.monthlyCost`; `setSubscription`/`saveSubscription` are wired but unused. Right now the only way to change it (e.g. Deutschlandticket price) is a manual `update subscription set monthly_cost = ...` in Supabase — see README for the query and the "log a subscription-covered ride" workflow (`normalCost` = what it would've cost, `actualCost` = 0).
3. **`DistanceForm` + "Afstand" overlay** — manual distance + point-of-interest name input, generates `340m · dom van keulen`. Later: persist reusable POIs (needs `PointOfInterest` type, currently empty `{}`).
4. **Trip edit UI** — no update action exists yet on `useTripStore`/`src/lib/api/trips.ts`.
5. **Form validation with Zod** — installed, unused. Wire up a schema for `TripForm` (and later `DistanceForm`).
6. **Overlay extras** — running total, "bespaard tot nu", badge, full log block (mentioned in the vision as later additions, no rush).

## Notes

- `Overlay` type is still an empty `{}` placeholder — overlays are currently generated as plain strings (see `overlays.ts`). Only formalize this type if/when overlays need more structure than a string (e.g. per-overlay metadata for the "badge" extra).
- Package manager is pnpm (pinned via `packageManager` in `package.json`); `package-lock.json` was removed.
- Old localStorage trips were not migrated — re-enter them manually via `TripForm` once Supabase is set up.
- `supabase/schema.sql` was removed from the repo — the create-table SQL now lives inline in `README.md`'s "Aan de slag" section, so keep that in sync if the schema changes (e.g. the `arrival_time` column added for the Stations overlay).
