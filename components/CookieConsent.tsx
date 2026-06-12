"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { CONSENT_EVENT, getConsent, setConsent } from "../lib/consent";

// The PECR cookie-consent banner. The site loads Google / Firebase Analytics (GA4), a non-essential
// analytics cookie that needs prior opt-in; firebase.ts will not initialize GA until the visitor
// accepts here, so analytics is off by default. "Reject" and "Accept" carry equal visual weight,
// as PECR requires refusing to be as easy as accepting. The choice persists in localStorage
// (lib/consent.ts) and can be changed later via "Cookie settings" in the footer.
export function CookieConsent() {
  // Start hidden so the server markup and the first client render match (both render nothing); the
  // effect then reads storage in the browser and shows the banner only if no choice has been made.
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    const sync = () => setDecided(getConsent() !== null);
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (decided) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="flex gap-3">
          <Cookie className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground">
            We use a few essential cookies to make this site work. With your consent we would also
            set optional analytics cookies, to understand how the site is used. See our{" "}
            <Link
              href="/legal/cookies"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-secondary px-5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-switch-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex-none"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-tiwani-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex-none"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
