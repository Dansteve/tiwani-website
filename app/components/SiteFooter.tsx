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
