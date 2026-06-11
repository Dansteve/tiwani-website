import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { RefCardBanner } from "./components/RefCardBanner";
import { Hero } from "./components/sections/Hero";
import { ProblemSection } from "./components/sections/ProblemSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { AudienceSection } from "./components/sections/AudienceSection";
import { FinalCta } from "./components/sections/FinalCta";

// The marketing landing page. Section order (Tasks/10): hero -> the "life narrowing" problem ->
// what TIWANI does (prep plans / LCE, the resilience signal / LCI, the Continuity Card, the
// gentle alerts) -> who it is for (lifespan, child + adult care) -> final CTA -> footer. Every
// claim is grounded in Product.md; the content is calm and non-clinical.
export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <RefCardBanner />
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <AudienceSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
