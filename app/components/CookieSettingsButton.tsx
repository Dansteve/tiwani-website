"use client";

import { resetConsent } from "../lib/consent";

// Re-opens the cookie banner so a visitor can change or withdraw their choice (PECR: withdrawing
// consent must be as easy as giving it). Rendered in the footer and on the Cookie Policy page; the
// caller supplies the styling so the control sits naturally in either context.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => resetConsent()} className={className}>
      Cookie settings
    </button>
  );
}
