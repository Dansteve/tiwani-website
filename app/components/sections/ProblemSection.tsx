import { Reveal } from "../Reveal";

// The problem: "life narrowing" (Product.md §1). The invisible second job of coordinating care,
// and how a Coordinator's own life quietly contracts before anyone notices. Keeps the strong
// existing line. Calm, no blame, no clinical framing.
export function ProblemSection() {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
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
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Caring for someone with additional needs carries a second, invisible job: the
            constant work of preparing for everyday life, the school run, a family
            gathering, a holiday, a day at work, and absorbing the fallout when things go
            wrong. Existing tools track tasks and appointments. None of them helps you stay
            in your own life while you do it.
          </p>
        </Reveal>

        <Reveal delayMs={180}>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            So work, friendships, and community quietly fall away, often before anyone
            notices. TIWANI is built for exactly that.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
