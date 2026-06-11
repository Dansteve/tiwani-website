import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

// Fire a conversion event when a visitor successfully joins the waitlist. Kept separate from
// the pure waitlist validation/mapping (waitlist.ts) so that module stays free of the Firebase
// SDK and fully unit testable. Guarded: analytics is null outside the browser, and logEvent is
// wrapped so a tracking failure never breaks the signup flow.
export function trackWaitlistConversion(roleCount: number): void {
  if (!analytics) return;
  try {
    logEvent(analytics, "waitlist_signup", { role_count: roleCount });
  } catch {
    // Tracking is best-effort; never surface an analytics error to the user.
  }
}
