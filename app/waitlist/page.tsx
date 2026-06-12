import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { Wordmark } from "@/components/Wordmark";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Join the waitlist | TIWANI",
  description:
    "Be early to TIWANI, the Life Continuity platform for families who coordinate care. Join the waitlist with your email and care context.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    type: "website",
    siteName: "TIWANI",
    title: "Join the TIWANI waitlist",
    description:
      "Be early to TIWANI, the Life Continuity platform for families who coordinate care.",
    url: "https://tiwanilife.com/waitlist",
    locale: "en_GB",
  },
};

// The dedicated waitlist page: a simple header (wordmark + back link), the intro, and the capture
// form (WaitlistForm, which owns the dual-write). Kept calm and focused, one job on the page.
export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <header className="border-b border-primary/10 px-4 py-3.5 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" aria-label="TIWANI home">
            <Wordmark className="text-xl" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center sm:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-tiwani-coral/30 bg-tiwani-coral/10 px-3.5 py-1.5 text-sm font-medium text-tiwani-coral-deep">
              <span className="size-1.5 rounded-full bg-tiwani-coral" aria-hidden="true" />
              Early access
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-tiwani-dark sm:text-4xl">
              Join the TIWANI waitlist
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We are building infrastructure for families who carry more than their share.
              Tell us a little about your care context and we will keep your place.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
