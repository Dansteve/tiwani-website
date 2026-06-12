// The Supabase client for the primary waitlist DB write. The site stores nothing else in
// Supabase (no auth, no reads): the one call is an anon insert into public.waitlist, guarded by
// an insert-only RLS policy (supabase/migrations/0001_waitlist.sql). The URL is public and the
// client key is a publishable key; both come from NEXT_PUBLIC_* env vars, never source.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Accept either key name. NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is Supabase's newer publishable
// key (the sb_publishable_... format); NEXT_PUBLIC_SUPABASE_ANON_KEY is the legacy anon-JWT name.
// Both are public client keys safe to ship to the browser; the publishable key wins if both are
// set. The insert is still gated by RLS server-side, so the key only authorizes the anon role.
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// True only when both the URL and a key are present. When false (e.g. neither key is set yet),
// the DB write is skipped and the signup flow falls back to the Sheet copy, so capture never
// stops. See submitWaitlist.
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

// A single client instance, created only when configured. No session is persisted: the only
// operation is a one-shot anonymous insert, so there is no auth state to keep.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_KEY as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
