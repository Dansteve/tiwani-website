/**
 * Waitlist submission: validation, the two field mappings, and the dual-write.
 *
 * Each signup is written to BOTH stores (Docs/Decisions.md D11, Tasks/10):
 *   1. Supabase (primary): an anon insert into public.waitlist, the platform database.
 *   2. Google Sheet (secondary): a POST to a SheetMonkey endpoint, the marketing copy.
 *
 * Success is defined by the primary write: if the DB insert succeeds the signup is recorded,
 * and the Sheet is best-effort on top. Validation and both mappings are pure functions
 * (isValidEmail / validateWaitlist / mapToSheetRow / mapToWaitlistRow) so they are unit tested
 * without a network call, an SDK, or a rendered form. submitWaitlist composes them.
 *
 * Fallback: until the Supabase anon key is configured (the connection is currently down, so the
 * key could not be fetched), the DB write is skipped and the Sheet write alone defines success,
 * so capture never stops. Once the key lands in .env, the DB becomes the source of truth.
 */

import { supabase, isSupabaseConfigured } from "./supabase";

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;

// The name of the Supabase table the signup is inserted into (kept in one place).
const WAITLIST_TABLE = "waitlist";

// The four care roles offered on the form (Decisions.md D8: the platform's lifespan scope,
// child and adult/elder care). The exact strings double as the form values and the keys the
// mapping matches on, so they live here as the single source of truth.
export const WAITLIST_ROLES = {
  childAdditionalNeeds: "A child or young person with additional needs",
  olderAdult: "An older adult",
  longTermCondition: "Someone with a long-term condition",
  professional: "I work with caregiving families professionally",
} as const;

export interface WaitlistData {
  email: string;
  roles: string[];
}

// The columns written to the Google Sheet. A mapping change updates this shape and its module file.
export interface WaitlistSheetRow {
  Email: string;
  Role_Child_AdditionalNeeds: "Yes" | "No";
  Role_Older_Adult: "Yes" | "No";
  Role_LongTerm_Condition: "Yes" | "No";
  Role_Professional: "Yes" | "No";
  Created: string;
}

// The row inserted into public.waitlist. Mirrors the migration: id and created_at are DB
// defaults, so the client supplies only email, the selected contexts, and the source tag.
export interface WaitlistDbRow {
  email: string;
  contexts: string[];
  source: "website";
}

export interface ValidationResult {
  valid: boolean;
  errors: { email?: string; roles?: string };
}

// The outcome of the dual-write: which of the two stores accepted the signup, and the mode.
// "db" means the primary DB write succeeded (the Sheet may or may not have); "sheet-only" means
// the DB did not accept it (unconfigured, or the table is not applied yet) and the secondary
// Sheet write carried it; "development" means no endpoints were set at all (local dev).
export interface SubmitResult {
  success: true;
  mode: "db" | "sheet-only" | "development";
  db: boolean;
  sheet: boolean;
}

// Same pattern the form enforces; kept here so validation has one definition.
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

// Submit is allowed only with a valid email and at least one role (matches the form's disabled
// state). Returns per-field messages for display.
export function validateWaitlist(data: WaitlistData): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.roles || data.roles.length === 0) {
    errors.roles = "Please select at least one option.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

const yesNo = (present: boolean): "Yes" | "No" => (present ? "Yes" : "No");

// Maps the form to the Google Sheet columns. "Created" is a SheetMonkey server-side timestamp token.
export function mapToSheetRow(data: WaitlistData): WaitlistSheetRow {
  return {
    Email: data.email.trim(),
    Role_Child_AdditionalNeeds: yesNo(data.roles.includes(WAITLIST_ROLES.childAdditionalNeeds)),
    Role_Older_Adult: yesNo(data.roles.includes(WAITLIST_ROLES.olderAdult)),
    Role_LongTerm_Condition: yesNo(data.roles.includes(WAITLIST_ROLES.longTermCondition)),
    Role_Professional: yesNo(data.roles.includes(WAITLIST_ROLES.professional)),
    Created: "x-sheetmonkey-current-date-time",
  };
}

// Maps the form to the public.waitlist row. The selected role strings go straight into the
// text[] contexts column (only known roles are kept, so an off-list string is dropped); id and
// created_at are DB defaults.
export function mapToWaitlistRow(data: WaitlistData): WaitlistDbRow {
  const known = Object.values(WAITLIST_ROLES) as readonly string[];
  return {
    email: data.email.trim(),
    contexts: data.roles.filter((role) => known.includes(role)),
    source: "website",
  };
}

// Secondary copy: POST the sheet row to SheetMonkey. Returns false (not throw) on failure so the
// orchestrator can treat it as best-effort. In dev with no endpoint set, it logs and reports true.
async function submitToSheet(data: WaitlistData): Promise<boolean> {
  const row = mapToSheetRow(data);

  if (!WAITLIST_ENDPOINT) {
    console.warn("NEXT_PUBLIC_WAITLIST_ENDPOINT is not set. Sheet row only logged to console.");
    console.log("Sheet submission:", row);
    return true;
  }

  try {
    const response = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Primary write: insert the row into public.waitlist via the anon Supabase client. Returns false
// (not throw) when Supabase is not configured or when the insert errors (for example the table
// is not applied yet), so the orchestrator can fall back to the Sheet rather than dropping the
// signup. The error is logged so a configured-but-failing DB is visible, never silent.
async function submitToSupabase(data: WaitlistData): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const row = mapToWaitlistRow(data);
  try {
    const { error } = await supabase.from(WAITLIST_TABLE).insert(row);
    if (error) {
      console.error("Waitlist DB insert failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Waitlist DB insert threw:", err);
    return false;
  }
}

// The dual-write. Validate once, then attempt the DB (primary) and the Sheet (secondary). The
// signup succeeds if EITHER store accepts the row, so a signup is never silently lost while one
// store is unavailable (the DB table is still unapplied at launch of this work, so the Sheet
// currently carries it). The mode reports which store took it; only when BOTH fail does this
// throw, which the form turns into a clear error toast (a silent failure is the one outcome this
// path must never produce). Validation failure also throws.
export async function submitWaitlist(data: WaitlistData): Promise<SubmitResult> {
  const { valid, errors } = validateWaitlist(data);
  if (!valid) {
    throw new Error(errors.email ?? errors.roles ?? "Invalid submission");
  }

  const db = await submitToSupabase(data);
  const sheet = await submitToSheet(data);

  if (db) {
    return { success: true, mode: "db", db, sheet };
  }

  // The DB did not take it (unconfigured, or the table is not applied): the Sheet must carry it,
  // or the signup failed outright.
  if (!sheet) {
    throw new Error("Failed to submit to waitlist");
  }
  return { success: true, mode: WAITLIST_ENDPOINT ? "sheet-only" : "development", db, sheet };
}
