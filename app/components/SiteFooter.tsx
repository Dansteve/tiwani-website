import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { CookieSettingsButton } from "./CookieSettingsButton";

// The footer's legal + policy links (the pages stood up as drafts, pending solicitor + DPO review).
const POLICY_LINKS = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/support", label: "Support our work" },
] as const;

// text-sm + font-normal are set explicitly so the CookieSettingsButton (a <button>, which the
// globals.css base layer would otherwise render at 16px / weight 500 / line-height 1.5) matches
// the 14px / normal <a> links exactly and sits on the same baseline.
const FOOTER_LINK_CLASS =
  "text-sm font-normal leading-5 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// The footer: the wordmark on the Deep Teal anchor surface, the contact email, and LinkedIn.
// Deep Teal #04342C is the brand's dark anchor (Docs/Brand.md); text is on-surface light.
export function SiteFooter() {
  return (
    <footer className="bg-tiwani-dark px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <Wordmark className="text-2xl" tone="light" />
            <p className="text-sm text-white/70">
              Life Continuity for families who coordinate care. Launching 2026.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <a
              href="mailto:hello@tiwanilife.com"
              className="inline-flex items-center gap-3 text-sm text-white/90 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Mail className="size-5" aria-hidden="true" />
              hello@tiwanilife.com
            </a>
            <a
              href="https://www.linkedin.com/company/tiwani-life-continuity/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-white/90 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Linkedin className="size-5" aria-hidden="true" />
              Connect on LinkedIn
            </a>
            <a
              href="https://www.instagram.com/tiwanilife/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-white/90 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Follow on Instagram
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <nav
            aria-label="Legal and policies"
            className="flex flex-wrap items-baseline gap-x-6 gap-y-3 text-sm"
          >
            {POLICY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={FOOTER_LINK_CLASS}>
                {link.label}
              </Link>
            ))}
            <CookieSettingsButton className={FOOTER_LINK_CLASS} />
          </nav>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
            TIWANI is a non-clinical planning tool, not a medical, emergency, or crisis service. In
            an emergency, or if someone is at risk of harm, call 999. For urgent health concerns,
            call NHS 111.
          </p>
          <p className="mt-6 text-sm text-white/60">
            &copy; 2026 TIWANI Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
