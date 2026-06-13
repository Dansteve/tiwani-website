import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { AUDIENCES } from "../../lib/audiences";

// Who it is for: Coordinators across the lifespan, child and adult/elder care (Docs/Decisions.md
// D8). The MVP starts with child care, but the platform's scope is additional-needs caregiving
// across the lifespan, which is what the waitlist gauges. Non-clinical, private, calm. The four
// contexts are the single source of truth in app/lib/audiences.ts, and each card now LINKS to its
// dedicated /for/<slug> page (how TIWANI helps + curated authoritative UK resources). A warm,
// diverse intergenerational photo heads the right column to make the lifespan span visible
// (committed local asset, attribution in public/images/ATTRIBUTIONS.md; a fixed-aspect frame so it
// reserves its space, no layout shift).
export function AudienceSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Who it is for
              </p>
            </Reveal>
            <Reveal delayMs={60}>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-tiwani-dark sm:text-4xl">
                Built for the one holding it all together
              </h2>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                If you are the one holding it together, the person who plans for every
                outcome and carries more than their share, TIWANI is for you. We are
                starting with families caring for a child with additional needs, and
                building toward care across the lifespan, including older adults and
                long-term conditions. If you care for more than one person, TIWANI keeps
                each of them separate, with their own plans, their own card, and their own
                Village.
              </p>
            </Reveal>
            <Reveal delayMs={180}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                It is private, and it is non-clinical: TIWANI holds your planning, never
                health records, and it suggests, it never instructs.
              </p>
            </Reveal>
            <Reveal delayMs={240}>
              <Link
                href="/for"
                className="mt-6 inline-flex items-center gap-2 rounded-md text-base font-medium text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                See who TIWANI is for
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="space-y-5">
            <Reveal>
              {/* Fixed-aspect band: the portrait photo crops to a calm landscape strip via
                  object-cover, so it never distorts and the box reserves its height up front. */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-tiwani-mid/20 shadow-md">
                <Image
                  src="/images/care-lifespan.jpg"
                  alt="An older man walking outdoors hand in hand with a young girl"
                  fill
                  sizes="(min-width: 1024px) 36rem, 90vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 62%, rgba(4,52,44,0.16))" }}
                />
              </div>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-2">
              {AUDIENCES.map((audience, i) => {
                const Icon = audience.icon;
                return (
                  <Reveal as="li" key={audience.slug} delayMs={i * 70} className="h-full">
                    <Link
                      href={`/for/${audience.slug}`}
                      className="group flex h-full items-start gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tiwani-mid/15 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-base font-medium leading-snug text-tiwani-dark group-hover:underline">
                        {audience.cardTitle}
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
