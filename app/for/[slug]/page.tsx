import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { ResourceList } from "@/components/sections/ResourceList";
import { NonClinicalNote } from "@/components/sections/NonClinicalNote";
import { SupportCta } from "@/components/sections/SupportCta";
import { AUDIENCES, AUDIENCE_SLUGS, getAudience } from "@/lib/audiences";

type Params = Promise<{ slug: string }>;

// Static export: pre-render exactly the four audience slugs, nothing else (Docs/Decisions.md D9).
export const dynamicParams = false;
export function generateStaticParams() {
  return AUDIENCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return {};
  const url = `https://tiwanilife.com/for/${audience.slug}`;
  return {
    title: audience.seoTitle,
    description: audience.seoDescription,
    alternates: { canonical: `/for/${audience.slug}` },
    openGraph: {
      type: "website",
      siteName: "TIWANI",
      title: audience.seoTitle,
      description: audience.seoDescription,
      url,
      locale: "en_GB",
    },
  };
}

// One template, four audiences, driven by app/lib/audiences.ts. Each page: a hero, how TIWANI
// helps this audience (grounded in real features, non-clinical, no overclaiming), a curated set
// of verified authoritative UK resources (TIWANI signposts, it is not the source), the
// non-clinical boundary, links to the other audiences, and the support CTA.
export default async function AudiencePage({ params }: { params: Params }) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();

  const others = AUDIENCES.filter((a) => a.slug !== audience.slug);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="px-4 pb-14 pt-32 sm:px-6 sm:pt-36">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Link
                href="/for"
                className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Who TIWANI is for
              </Link>
            </Reveal>
            <Reveal delayMs={60}>
              <p className="mt-6 text-sm font-medium uppercase tracking-wide text-primary">
                {audience.eyebrow}
              </p>
            </Reveal>
            <Reveal delayMs={120}>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-tiwani-dark sm:text-5xl">
                {audience.title}
              </h1>
            </Reveal>
            {audience.intro.map((para, i) => (
              <Reveal key={i} delayMs={180 + i * 60}>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {para}
                </p>
              </Reveal>
            ))}
            <Reveal delayMs={180 + audience.intro.length * 60}>
              <div className="mt-8">
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

        {/* How TIWANI helps */}
        <section className="px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-2xl font-semibold leading-tight text-tiwani-dark sm:text-3xl">
                How TIWANI helps
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6">
              {audience.helps.map((help, i) => {
                const Icon = help.icon;
                return (
                  <Reveal as="li" key={help.title} delayMs={i * 70} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm sm:p-7">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold leading-snug text-tiwani-dark">
                        {help.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                        {help.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Trusted information and support (the curated, verified authoritative links) */}
        <section className="px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-2xl font-semibold leading-tight text-tiwani-dark sm:text-3xl">
                Trusted information and support
              </h2>
            </Reveal>
            <Reveal delayMs={60}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {audience.resourcesIntro}
              </p>
            </Reveal>
            <div className="mt-10">
              <ResourceList groups={audience.resources} />
            </div>
            <div className="mt-10 max-w-3xl">
              <NonClinicalNote />
            </div>
          </div>
        </section>

        {/* Other audiences */}
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-lg font-semibold text-tiwani-dark">
              Explore who else TIWANI is for
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.map((other) => {
                const Icon = other.icon;
                return (
                  <li key={other.slug} className="h-full">
                    <Link
                      href={`/for/${other.slug}`}
                      className="group flex h-full items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-tiwani-mid/15 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium leading-snug text-tiwani-dark group-hover:underline">
                        {other.nav}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <SupportCta />
      </main>
      <SiteFooter />
    </div>
  );
}
