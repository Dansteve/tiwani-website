import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { DashboardLink } from "./DashboardLink";
import { Button } from "./ui/button";

// The fixed top navigation: the wordmark, a quiet "Go to dashboard" link to the tiwani-app (a
// plain cross-origin navigation, the two are separate Firebase sites), and the coral "Join
// waitlist" CTA. The bar is a translucent cream with a hairline teal border so the page reads
// through it. Server component: the links are static and APP_URL resolves at build.
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6"
      >
        <Link href="/" className="rounded-md" aria-label="TIWANI home">
          <Wordmark className="text-xl" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/for"
            className="hidden rounded-md text-sm font-medium text-tiwani-dark transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
          >
            Who it&rsquo;s for
          </Link>
          <DashboardLink className="hidden sm:inline-flex" />
          <Button asChild variant="cta-primary" size="cta-sm">
            <Link href="/waitlist">
              Join waitlist
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
