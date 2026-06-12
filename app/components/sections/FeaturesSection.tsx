import { ClipboardList, Activity, Share2, Bell, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";

// What TIWANI does: the four real product capabilities (Product.md), in plain, non-clinical
// language, no overclaiming. Each maps to an authoritative or core feature:
//   - Preparation plans  -> the Life Continuity Engine (§4.4)
//   - The honest signal  -> the Life Continuity Index (§4.8)
//   - The Continuity Card -> §4.6
//   - The gentle warning -> Erosion Alerts (§4.9), signposting real, named, non-clinical support
interface Feature {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: ClipboardList,
    eyebrow: "Preparation plans",
    title: "A ready plan in seconds, not from a blank page",
    body: "Tell TIWANI about an activity coming up and it turns your lived experience into a preparation plan: what to expect, an approach that fits, and the strategies most likely to help. You accept, edit, or reject everything.",
  },
  {
    icon: Activity,
    eyebrow: "An honest signal",
    title: "See whether life is holding or quietly narrowing",
    body: "Your Life Continuity Index: a simple read on whether life is holding or quietly narrowing, per area of life and overall. It builds quietly from two-tap check-ins after the things you prepare for. One honest read on how you are really doing, so you are not guessing.",
  },
  {
    icon: Share2,
    eyebrow: "The Continuity Card",
    title: "Hand someone a clear plan in one tap",
    body: "Share a one-page support plan with a teacher, an employer, or a carer, so you never have to explain from scratch again. It carries what helps and what to avoid, and no personal data travels in the link.",
  },
  {
    icon: Bell,
    eyebrow: "A gentle early warning",
    title: "A heads-up before things tip over, not after",
    body: "When an area of life has been under sustained pressure, TIWANI gives you a gentle, dismissible heads-up and points to real support, from organisations like Carers UK, IPSEA, and SENDIASS. It signposts, never diagnoses.",
  },
];

function FeatureCard({ feature, delayMs }: { feature: Feature; delayMs: number }) {
  const Icon = feature.icon;
  return (
    <Reveal as="li" delayMs={delayMs} className="h-full">
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/30 sm:p-7">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-primary">
          {feature.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-tiwani-dark">
          {feature.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {feature.body}
        </p>
      </div>
    </Reveal>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="what-tiwani-does"
      className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              What TIWANI does
            </p>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-tiwani-dark sm:text-4xl">
              Infrastructure for the work of caring
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Not another task list. TIWANI turns what you already know into structured,
              reusable preparation, and it watches the thing no other tool does: whether
              your family&rsquo;s life is holding steady.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} delayMs={i * 80} />
          ))}
        </ul>
      </div>
    </section>
  );
}
