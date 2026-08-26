-- Trip Ledger schema. Paste into the Supabase Studio SQL editor.
--
-- No RLS: single-user personal project accessed via the publishable API key
-- from a trusted client. Accepted tradeoff — do not expose this schema to a
-- public multi-tenant app without adding auth + RLS policies first.

create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  from_location text not null,
  to_location text not null,
  mode text not null check (mode in ('train','bus','tram','metro','bike','walk','car','other')),
  actual_cost numeric(10,2) not null default 0,
  normal_cost numeric(10,2) not null default 0,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists trips_date_idx on trips (date);

-- Singleton settings row (id fixed to 1 via CHECK).
create table if not exists subscription (
  id smallint primary key default 1 check (id = 1),
  name text not null,
  monthly_cost numeric(10,2) not null
);

insert into subscription (id, name, monthly_cost)
values (1, 'Deutschlandticket', 58)
on conflict (id) do nothing;

-- Supabase enables RLS by default on new tables in the public schema. With
-- no policies defined, that blocks all access (including from this app's
-- publishable key) — so it must be disabled explicitly.
alter table trips disable row level security;
alter table subscription disable row level security;
