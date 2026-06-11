import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "../Reveal";
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
              You coordinate care for someone you love. TIWANI is the Life Continuity
              platform that helps you do it without your own life, your work, your
              friendships, your community, quietly narrowing.
            </p>
          </Reveal>

          <Reveal delayMs={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-destructive px-7 py-3.5 text-base font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-tiwani-coral/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Join the waitlist
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <a
                href="#what-tiwani-does"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-7 py-3.5 text-base font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                See how it works
              </a>
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
            {/* The human moment: a warm, diverse caregiving photo in a rounded, token-bordered
                frame with a soft teal tint, on-brand and corner-matched to the card below it. */}
            <div className="overflow-hidden rounded-3xl border border-tiwani-mid/20 shadow-lg">
              <Image
                src="/images/care-hero.jpg"
                alt="A mother sitting on a sofa at home with her two children, relaxed and close together"
                width={1600}
                height={1062}
                priority
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 90vw"
                className="h-auto w-full object-cover"
              />
              {/* A very soft teal wash so the photo sits in the brand world without recolouring it. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(180deg, transparent 55%, rgba(4,52,44,0.18))" }}
              />
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
