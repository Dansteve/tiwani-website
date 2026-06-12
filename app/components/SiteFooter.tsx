import { Linkedin, Mail } from "lucide-react";
import { Wordmark } from "./Wordmark";

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
              aria-label="TIWANI on Instagram"
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
          <p className="text-sm text-white/60">
            &copy; 2026 TIWANI Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
