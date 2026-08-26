# Progress

Living checklist for the Trip Ledger MVP. See `AGENTS.md` for stack/structure info and the full product vision behind this list.

## Done

- [x] Trip logging — form (`TripForm`), store (`useTripStore`), overview (`TripList`)
- [x] Store persistence to localStorage (survives reload)
- [x] Monthly summary calculation (`src/lib/monthSummary.ts`) — subscription cost / waarde benut / bespaard
- [x] `MonthlySummaryCard` wired to real data, "bespaard" highlighted in neon green
- [x] `Subscription` and `MonthSummary` types fully defined
- [x] Overlay Panel tabs exist (Ritten | Dagen | Maand | Afstand)
- [x] "Ritten" overlay — `src/lib/overlays.ts` (`generateRittenOverlays`, `getTripDayNumbers`) + `RittenOverlays` component with per-line copy-to-clipboard

## Next up (suggested order)

1. **"Dagen" overlay** (`── day 1 · 12 aug 2026 ──`) — near-direct reuse of `getTripDayNumbers()` from `overlays.ts`; just needs a date formatter (`12 aug 2026`) and a small component analogous to `RittenOverlays`.
2. **"Maand" overlay tab** — reuse `summarizeMonth()`; render the same line `MonthlySummaryCard` shows, but inside the Overlay Panel with a copy button.
3. **`DistanceForm` + "Afstand" overlay** — manual distance + point-of-interest name input, generates `340m · dom van keulen`. Later: persist reusable POIs (needs `PointOfInterest` type, currently empty `{}`).
4. **Trip delete/edit UI** — `useTripStore.removeTrip` already exists but nothing in `TripList` calls it.
5. **Fix `TripForm` navigation** — it calls `redirect()` from `next/navigation` inside a `"use client"` component after submit; that's meant for Server Components/Actions. Should use `useRouter().push('/')` instead.
6. **Form validation with Zod** — installed, unused. Wire up a schema for `TripForm` (and later `DistanceForm`).
7. **Overlay extras** — running total, "bespaard tot nu", badge, full log block (mentioned in the vision as later additions, no rush).

## Notes

- `Overlay` type is still an empty `{}` placeholder — overlays are currently generated as plain strings (see `overlays.ts`). Only formalize this type if/when overlays need more structure than a string (e.g. per-overlay metadata for the "badge" extra).
- Both `package-lock.json` and `pnpm-lock.yaml` exist in the repo — pick one before adding new dependencies.
