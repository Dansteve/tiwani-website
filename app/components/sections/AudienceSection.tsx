import { Baby, HeartHandshake, Stethoscope, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";

// Who it is for: Coordinators across the lifespan, child and adult/elder care (Docs/Decisions.md
// D8). The MVP starts with child care, but the platform's scope is additional-needs caregiving
// across the lifespan, which is what the waitlist gauges. Non-clinical, private, calm. The four
// contexts mirror the waitlist care-context options so the message and the form agree.
interface Audience {
  icon: LucideIcon;
  label: string;
}

const AUDIENCES: Audience[] = [
  { icon: Baby, label: "A child or young person with additional needs" },
  { icon: HeartHandshake, label: "An older adult who needs more support" },
  { icon: Stethoscope, label: "Someone living with a long-term condition" },
  { icon: Users, label: "Professionals working with caregiving families" },
];

export function AudienceSection() {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:py-28">
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
                Built for the Coordinator, across a whole life
              </h2>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                If you are the one holding it together, the person who plans for every
                outcome and carries more than their share, TIWANI is for you. We are
                starting with families caring for a child with additional needs, and
                building toward care across the lifespan, including older adults and
                long-term conditions.
              </p>
            </Reveal>
            <Reveal delayMs={180}>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                It is private, and it is non-clinical: TIWANI holds your planning, never
                health records, and it suggests, it never instructs.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {AUDIENCES.map((audience, i) => {
              const Icon = audience.icon;
              return (
                <Reveal as="li" key={audience.label} delayMs={i * 70}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-background p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tiwani-mid/15 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-base font-medium leading-snug text-tiwani-dark">
                      {audience.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
