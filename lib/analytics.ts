import { logEvent } from "firebase/analytics";
import { getAnalyticsClient } from "./firebase";

// Fire a conversion event when a visitor successfully joins the waitlist. Kept separate from the
// pure waitlist validation/mapping (waitlist.ts) so that module stays free of the Firebase SDK
// and fully unit testable. Guarded end to end: analytics is null on the server and where it is
// unsupported, and logEvent is wrapped so a tracking failure never breaks the signup flow.
export async function trackWaitlistConversion(roleCount: number): Promise<void> {
  try {
    const analytics = await getAnalyticsClient();
    if (!analytics) return;
    logEvent(analytics, "waitlist_signup", { role_count: roleCount });
  } catch {
    // Tracking is best-effort; never surface an analytics error to the user.
  }
}
