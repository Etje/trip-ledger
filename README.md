# Trip Ledger

Personal travel-cost tracker: log trips (datum, van/naar, vervoer, betaalde prijs vs. normale prijs) om te zien hoeveel je bespaart of uitgeeft, plus een generator voor terminal-stijl overlays voor reisvideo's.

Single-user tool, geen login. Data wordt bewaard in Supabase (Postgres).

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Zustand voor client state, gesynchroniseerd met Supabase
- Supabase (`@supabase/supabase-js`) als database, benaderd via de publishable API key (geen auth/RLS — bewuste keuze voor een single-user project)
- pnpm als package manager

## Aan de slag

1. Installeer dependencies:
   ```bash
   pnpm install
   ```
2. Maak een Supabase-project aan op [supabase.com](https://supabase.com) en run `supabase/schema.sql` in de SQL Editor.
3. Kopieer `.env.example` naar `.env.local` en vul de waarden in (Project Settings → API Keys in het Supabase dashboard):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   ```
4. Start de dev server:
   ```bash
   pnpm dev
   ```

Zie `AGENTS.md` voor een gedetailleerd overzicht van de architectuur en mappenstructuur.

## In de pipeline

- **"Dagen" overlay** — dagnummer + datum, hergebruikt `getTripDayNumbers()`
- **"Maand" overlay tab** — de maandsamenvatting ook met een copy-knop in het Overlay Panel
- **Afstand-formulier + "Afstand" overlay** — handmatige afstand + point-of-interest invoer
- **Trip edit UI** — nu alleen toevoegen/verwijderen, nog geen bewerken
- **Formuliervalidatie met Zod** — geïnstalleerd, nog niet gebruikt
- **Overlay extras** — lopend totaal, "bespaard tot nu"-badge, volledig logblok

Volledige, actuele checklist staat in `PROGRESS.md`.
