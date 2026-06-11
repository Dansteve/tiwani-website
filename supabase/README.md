# Supabase (waitlist)

This folder holds the database migration for the website's waitlist capture. The website writes
each signup to two stores (Docs/Decisions.md D11): the Supabase `public.waitlist` table (primary)
and a Google Sheet via SheetMonkey (secondary). The migration here defines that table.

## Project

- Project ref: `kogpfmuxgfjfjkdwrsjv`
- URL: `https://kogpfmuxgfjfjkdwrsjv.supabase.co`

The URL and the anon (publishable) key are read from `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY`. The real anon key lives only in `.env` (gitignored), never in
source; `.env.example` documents the names.

## Status: UNAPPLIED (pending a working Supabase connection)

The migration in `migrations/0001_waitlist.sql` has **not been applied** to the project yet. At
the time it was written the Supabase MCP / connection was failing (`net::ERR_FAILED`), so the
table could not be created and the anon key could not be fetched. As a result:

- The table does not exist yet, so the live DB insert path is written but not verified.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is empty in `.env`. While it is empty, the site detects that
  Supabase is not configured (`app/lib/supabase.ts`) and falls back to the Sheet-only copy, so
  signups are still captured. Once the key is set and the migration is applied, the DB write
  becomes the source of truth.

## To apply (once the connection works)

1. Restore the Supabase connection, then create a dev branch (or use the project directly).
2. Apply `migrations/0001_waitlist.sql` (via the Supabase MCP `apply_migration`, the Supabase
   CLI `db push`, or the SQL editor).
3. Paste the project's anon (publishable) key into `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`.
4. Verify, on the dev branch: a signup from the site lands one row in `public.waitlist`, and the
   anon role can insert but CANNOT select/update/delete (RLS holds).

## The table

`public.waitlist(id uuid pk default gen_random_uuid(), email text not null, contexts text[] not
null default '{}', source text not null default 'website', created_at timestamptz not null
default now())`, with row level security enabled and a single anon `insert` policy
(`with check (true)`) and no anon select/update/delete.
