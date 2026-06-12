import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { Button } from "../ui/button";

// The closing call to action, on the Deep Teal anchor surface for one calm, confident moment
// before the footer. Keeps the strong existing lines "Stay connected. Stay whole." and "You are
// early." The coral waitlist button is the single accent here.
export function FinalCta() {
  return (
    <section className="bg-tiwani-dark px-4 py-24 text-white sm:px-6 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-tight text-tiwani-teal-near-white sm:text-5xl">
            Stay connected. Stay whole.
          </h2>
        </Reveal>

        <Reveal delayMs={80}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            TIWANI launches in 2026. You are early, and that matters: the first families
            shape what we build. Join the waitlist and we will keep you close to the
            journey.
          </p>
        </Reveal>

        <Reveal delayMs={160}>
          <div className="mt-10 flex justify-center">
            {/* On the Deep Teal anchor surface, the focus ring is white for contrast (the teal ring
                would vanish here); the rest of the CTA is the shared primitive. */}
            <Button
              asChild
              variant="cta-primary"
              size="cta"
              className="px-8 focus-visible:ring-white"
            >
              <Link href="/waitlist">
                Join the waitlist
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
