import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { NonClinicalNote } from "@/components/sections/NonClinicalNote";
import { SupportCta } from "@/components/sections/SupportCta";
import { AUDIENCES } from "@/lib/audiences";

export const metadata: Metadata = {
  title: "Who TIWANI is for | TIWANI",
  description:
    "TIWANI is for the people who hold it all together, across the lifespan: families raising a child with additional needs, those supporting an older adult or someone with a long-term condition, and the professionals who work alongside them.",
  alternates: { canonical: "/for" },
  openGraph: {
    type: "website",
    siteName: "TIWANI",
    title: "Who TIWANI is for",
    description:
      "Across the lifespan: a child with additional needs, an older adult, someone with a long-term condition, and the professionals who support caregiving families.",
    url: "https://tiwanilife.com/for",
    locale: "en_GB",
  },
};

// The "Who TIWANI is for" hub: the four audiences as cards that link to a dedicated page each.
// It frames the lifespan scope (child and adult care, Docs/Decisions.md D8) and keeps the
// non-clinical line. The landing AudienceSection links here; each card links to /for/<slug>.
export default function ForHubPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <section className="px-4 pb-12 pt-32 sm:px-6 sm:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Who it is for
              </p>
            </Reveal>
            <Reveal delayMs={60}>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-tiwani-dark sm:text-5xl">
                Built for the one holding it all together
              </h1>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                TIWANI is for the person who plans for every outcome and carries more than
                their share. We are starting with families caring for a child with
                additional needs, and building toward care across the lifespan. Find the
                place that fits you.
              </p>
            </Reveal>
            <Reveal delayMs={180}>
              <div className="mt-8 flex justify-center">
                <Button asChild variant="cta-primary" size="cta">
                  <Link href="/waitlist">
                    Join the waitlist
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6">
          <ul className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {AUDIENCES.map((audience, i) => {
              const Icon = audience.icon;
              return (
                <Reveal as="li" key={audience.slug} delayMs={i * 70} className="h-full">
                  <Link
                    href={`/for/${audience.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-7"
                  >
                    <span className="flex size-12 items-center justify-center rounded-xl bg-tiwani-mid/15 text-primary">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold leading-snug text-tiwani-dark">
                      {audience.cardTitle}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {audience.cardBlurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 group-hover:underline">
                      How TIWANI helps
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <NonClinicalNote />
          </div>
        </section>

        <SupportCta />
      </main>
      <SiteFooter />
    </div>
  );
}
