import Image from "next/image";
import { Reveal } from "../Reveal";

// The problem: "life narrowing" (Product.md §1). The invisible second job of coordinating care,
// and how a Coordinator's own life quietly contracts before anyone notices. Keeps the strong
// existing line. Calm, no blame, no clinical framing. A warm, diverse photo of a parent still in
// their own life with their child sits beside the copy, reinforcing "stay in your own life"
// (committed local asset, attribution in public/images/ATTRIBUTIONS.md; explicit width/height so
// it reserves its space and never shifts the layout).
export function ProblemSection() {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              The invisible second job
            </p>
          </Reveal>

          <Reveal delayMs={60}>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-tiwani-dark sm:text-4xl">
              And somewhere along the way, your own life got smaller.
            </h2>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Caring for someone with additional needs carries a second, invisible job: the
              constant work of preparing for everyday life, the school run, a family
              gathering, a holiday, a day at work, and absorbing the fallout when things go
              wrong. Existing tools track tasks and appointments. None of them helps you stay
              in your own life while you do it.
            </p>
          </Reveal>

          <Reveal delayMs={180}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              So work, friendships, and community quietly fall away, often before anyone
              notices. TIWANI is built for exactly that.
            </p>
          </Reveal>
        </div>

        <Reveal delayMs={120} className="w-full">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-tiwani-mid/20 shadow-lg lg:ml-auto">
            <Image
              src="/images/care-connection.jpg"
              alt="A parent outdoors carrying their young child on their shoulders, both smiling"
              width={1600}
              height={2400}
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 90vw"
              className="h-auto w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 60%, rgba(4,52,44,0.16))" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
