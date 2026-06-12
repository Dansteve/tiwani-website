import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { DONATE_PATH } from "../../lib/config";

// The donation / "support our work" call to action, surfaced on the audience pages and the hub.
// It is calm and honest, never pressure or guilt (the promotion lens guards this): it states
// plainly that support is optional and that donations are not open yet, and links to the gated
// funding placeholder (DONATE_PATH). Coral stays sparing: the one CTA button carries it.
export function SupportCta() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-tiwani-mid/20 bg-accent p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <span className="flex size-11 items-center justify-center rounded-xl bg-tiwani-coral/10 text-tiwani-coral-deep">
              <Heart className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-tiwani-dark">
              Help us build TIWANI
            </h2>
            <p className="mt-3 text-base leading-relaxed text-accent-foreground/80">
              TIWANI is built by a small team for families who carry more than their
              share. If you would like to help us keep building it, you can register your
              interest in supporting our work. Donations are not open yet, and we will be
              clear about how any support is used.
            </p>
          </div>

          <Button asChild variant="cta-primary" size="cta" className="shrink-0">
            <Link href={DONATE_PATH}>
              Support our work
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
