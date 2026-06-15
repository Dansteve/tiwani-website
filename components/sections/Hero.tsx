import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "../Reveal";
import { Button } from "../ui/button";
import { ContinuityCardPreview } from "./ContinuityCardPreview";

// The hero. Keeps the strong existing line "What if nothing had to give?" and pairs it with a
// product-true subhead grounded in Product.md (coordinate care without your own life narrowing).
// The primary CTA is the coral waitlist button (coral used sparingly, Docs/Brand.md); the
// secondary is a quiet teal-outline link. The right column grounds the abstract product in a
// real, warm caregiving moment: a photograph in a token-framed panel with the on-brand Continuity
// Card preview floating over it (the card stays token-built, not a stock image). The photo is a
// committed local asset (public/images, attribution in public/images/ATTRIBUTIONS.md), sized with
// explicit width/height so it reserves its space and never shifts the layout as it loads.
export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:pb-28 lg:pt-44">
      {/* Calm teal wash behind the hero, kept very soft so the cream surface still reads. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 15%, rgba(29,158,117,0.16), transparent 70%), radial-gradient(50% 50% at 10% 90%, rgba(15,110,86,0.10), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-tiwani-mid/30 bg-tiwani-mid/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-tiwani-mid" aria-hidden="true" />
              Launching 2026
            </span>
          </Reveal>

          <Reveal delayMs={60}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-tiwani-dark sm:text-5xl lg:text-6xl">
              What if nothing had to give?
            </h1>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              You coordinate care for someone you love. TIWANI helps you prepare, adapt
              and keep participating in life, so work, friendships, family, culture and
              community do not quietly disappear.
            </p>
          </Reveal>

          <Reveal delayMs={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="cta-primary" size="cta">
                <Link href="/waitlist">
                  Join the waitlist
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="cta-secondary" size="cta">
                <a href="#what-tiwani-does">See how it works</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delayMs={240}>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
              Private and non-clinical. It suggests, it never instructs.
            </p>
          </Reveal>
        </div>

        <Reveal delayMs={160} className="w-full lg:justify-self-end">
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            {/* The human moment: a warm caregiving photo set in a bigger green frame that echoes the
                Continuity Card below it, a padded mid-teal mat with an inset ring so the brand green
                reads clearly without going harsh. The radii are concentric (2rem mat, p-4, 1rem photo). */}
            <div className="rounded-[2rem] bg-tiwani-mid/20 p-4 shadow-xl ring-1 ring-inset ring-tiwani-mid/40">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/care-hero-family.jpg"
                  alt="A family at home, sharing a warm and relaxed moment together on the sofa"
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 26rem, 88vw"
                  className="h-auto w-full object-cover"
                />
                {/* A very soft teal wash so the photo sits in the brand world without recolouring it. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: "linear-gradient(180deg, transparent 55%, rgba(4,52,44,0.18))" }}
                />
              </div>
            </div>

            {/* The token-built Continuity Card preview, floated over the lower edge of the photo on
                larger screens, stacked beneath it on small screens so nothing is clipped. */}
            <div className="mt-5 sm:-mt-16 sm:ml-auto sm:max-w-xs sm:pr-2 lg:-mt-20">
              <ContinuityCardPreview />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
