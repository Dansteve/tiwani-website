-- Waitlist capture table for the public marketing site (tiwani-website).
--
-- Each signup from the website is inserted here (the primary store) by the anon Supabase client,
-- with a secondary copy posted to the Google Sheet. The table holds only an email, the coarse
-- care-context checkboxes, a source tag, and a timestamp: no PII beyond the email, no special
-- category data (Product.md data-minimization).
--
-- Security: row level security is enabled, and the ONLY policy grants the anon role INSERT
-- (public signup). There is deliberately NO select/update/delete policy for anon, so with RLS on
-- and no permissive policy the website (anon) can write a signup but can never read, change, or
-- delete the list. Reading the waitlist is done with the service role from a trusted context.
--
-- This migration is written for the website's own Supabase project (ref kogpfmuxgfjfjkdwrsjv).
-- It should later unify into the tiwani-api schema/migration set when the platform DB is one.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  contexts text[] not null default '{}',
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Public signup: the anon role may INSERT a row. with check (true) allows any well-formed insert
-- from the client; the columns the client omits (id, created_at) fall back to their defaults.
create policy "anon can insert a waitlist signup"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- No anon select/update/delete policy is defined on purpose: with RLS enabled and no permissive
-- read/write policy, those operations are denied to anon, keeping the list private.
