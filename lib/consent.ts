// Cookie-consent state, for PECR compliance. The site loads Google / Firebase Analytics (GA4),
// which sets non-essential cookies (_ga, _ga_*); under PECR those need prior, opt-in consent. This
// module is the single source of truth for that choice: it stores the visitor's decision in
// localStorage and reports whether analytics may run. firebase.ts checks hasAnalyticsConsent()
// before it ever initializes GA, so no analytics cookie is set until the visitor accepts (privacy
// by default). Pure read / write helpers (no React, no SDK) so they unit-test without a browser.

export type ConsentValue = "accepted" | "rejected";

// The localStorage key the choice is stored under, and the window event dispatched when it changes
// (so the banner and any listeners react immediately). Exported so the test and the UI agree.
export const CONSENT_STORAGE_KEY = "tiwani-cookie-consent";
export const CONSENT_EVENT = "tiwani-consent-change";

// Reads the stored choice. Returns null when no choice has been made (the banner should show), or
// when storage is unavailable (treated as no consent, so analytics stays off: privacy by default).
export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

// Records the choice and notifies listeners. A no-op on the server or where storage is blocked.
export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage blocked (private mode, cookies disabled): the choice cannot persist, so analytics
    // simply stays off. Still notify, so the banner closes for this session.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

// Clears the choice so the banner shows again. Used by "Cookie settings" to let a visitor change
// or withdraw consent, which PECR requires be as easy to withdraw as it was to give.
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Nothing to clear if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

// True only when the visitor has actively accepted analytics. Every other state (undecided,
// rejected, no storage) is false: no analytics cookie until an explicit opt-in.
export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}
