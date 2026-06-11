/**
 * Waitlist submission: validation, field mapping to the Google Sheet, and the POST.
 *
 * The sheet is written via a SheetMonkey endpoint held in VITE_WAITLIST_ENDPOINT (a
 * console fallback runs in dev when it is unset). Validation and the field mapping are
 * pure functions (isValidEmail / validateWaitlist / mapToSheetRow) so they are unit
 * tested without a network call or a rendered form; submitToWaitlist composes them.
 */

const WAITLIST_ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

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

// The columns written to the sheet. A mapping change updates this shape and its module file.
export interface WaitlistSheetRow {
  Email: string;
  Role_Child_AdditionalNeeds: "Yes" | "No";
  Role_Older_Adult: "Yes" | "No";
  Role_LongTerm_Condition: "Yes" | "No";
  Role_Professional: "Yes" | "No";
  Created: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: { email?: string; roles?: string };
}

// Same pattern the form enforces; kept here so validation has one definition.
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

// Submit is allowed only with a valid email and at least one role (matches the form's
// disabled state). Returns per-field messages for display.
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

// Maps the form to the sheet columns. "Created" is a SheetMonkey server-side timestamp token.
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

export async function submitToWaitlist(data: WaitlistData) {
  const { valid, errors } = validateWaitlist(data);
  if (!valid) {
    throw new Error(errors.email ?? errors.roles ?? "Invalid submission");
  }

  const row = mapToSheetRow(data);

  if (!WAITLIST_ENDPOINT) {
    console.warn("WAITLIST_ENDPOINT is not set. Data is only being logged to console.");
    console.log("Submission data:", row);
    return { success: true, mode: "development" as const };
  }

  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    throw new Error("Failed to submit to waitlist");
  }

  return { success: true as const };
}
