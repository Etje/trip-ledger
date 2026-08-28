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
2. Maak een Supabase-project aan op [supabase.com](https://supabase.com). Er is geen `schema.sql` meer in de repo — run onderstaande SQL in de SQL Editor om de tabellen aan te maken:
   ```sql
   create table trips (
     id uuid primary key default gen_random_uuid(),
     date date not null,
     from_location text not null,
     to_location text not null,
     mode text not null,
     actual_cost numeric not null default 0,
     normal_cost numeric not null default 0,
     note text,
     arrival_time time,
     distance_km numeric
   );

   create table subscription (
     id int primary key,
     name text not null,
     monthly_cost numeric not null
   );

   insert into subscription (id, name, monthly_cost) values (1, 'Deutschlandticket', 63);
   ```
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

## Hoe log je een rit met het Deutschlandticket?

Het Deutschlandticket (of een ander abonnement) betaal je één keer, niet per rit. Dat abonnement staat los van je trips in de `subscription`-tabel (naam + maandprijs, `src/lib/api/subscription.ts`) en wordt in `summarizeMonth()` (`src/lib/monthSummary.ts`) van de totale "waarde benut" afgetrokken om "bespaard" te berekenen.

Per rit die onder het ticket valt vul je dus in:
- **Normale prijs** — wat die rit zonder ticket gekost zou hebben (dit telt mee als "waarde benut")
- **Betaald** — `€0`, want die rit is al gedekt door het abonnement

De abonnementsprijs pas je aan via het instelveldje op de homepage (onder de maandkaart) — geen handmatige Supabase-update meer nodig.

## In de pipeline

- **Trip edit UI** — nu alleen toevoegen/verwijderen, nog geen bewerken
- **Formuliervalidatie met Zod** — geïnstalleerd, nog niet gebruikt
- **Overlay extras** — lopend totaal, "bespaard tot nu"-badge, volledig logblok

Volledige, actuele checklist staat in `PROGRESS.md`.
