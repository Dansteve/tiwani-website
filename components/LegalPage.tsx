import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { DraftNotice } from "./DraftNotice";

// The shared shell for the legal + funding pages (Terms, Privacy, Cookie, Accessibility, Support).
// One calm, readable column on the warm background, the full site header / footer for navigation,
// the draft-notice gate at the top, and a cross-link nav at the foot. The long-form body is styled
// by the .legal-prose rules in globals.css, so each page passes only its content as children.

const LEGAL_LINKS = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/support", label: "Support our work" },
] as const;

interface LegalPageProps {
  title: string;
  updated: string;
  lede?: ReactNode;
  draftKind?: "legal" | "funding";
  // The current page's own href, so it is excluded from the "More from TIWANI" cross-links.
  current: string;
  children: ReactNode;
}

export function LegalPage({
  title,
  updated,
  lede,
  draftKind = "legal",
  current,
  children,
}: LegalPageProps) {
  const related = LEGAL_LINKS.filter((link) => link.href !== current);
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <SiteHeader />
      <main className="flex-1 px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-tiwani-dark sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>
          {lede && (
            <div className="mt-4 text-lg leading-relaxed text-muted-foreground">{lede}</div>
          )}

          <DraftNotice kind={draftKind} />

          <div className="legal-prose mt-10">{children}</div>

          <nav aria-label="Other policies" className="mt-14 border-t border-border pt-8">
            <p className="text-sm font-medium text-tiwani-dark">More from TIWANI</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-primary underline underline-offset-2 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
