// @vitest-environment jsdom

// Component-level accessibility regression net (parity with tiwani-app). vitest-axe runs axe-core
// inside jsdom, so it catches STRUCTURAL a11y violations (a control with no accessible name, broken
// or conflicting ARIA, an image with no alt, a role misuse) the moment a shared component regresses.
// It does NOT check colour-contrast (axe needs real layout for that; the live Lighthouse audit
// covers contrast before launch). This file opts into jsdom via the docblock above so the default
// node-env lib tests (waitlist/consent/audiences) keep running unchanged in node.
//
// We assert on the violations array DIRECTLY (not the toHaveNoViolations matcher) because vitest-axe
// 0.1.0 mis-types that matcher; comparing the rule ids also makes a failure name the offending rule.
// "region" (a page-level landmark rule) is disabled because these are isolated fragments, not pages.

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Wordmark } from "@/components/Wordmark";
import { Button } from "@/components/ui/button";
import { NonClinicalNote } from "@/components/sections/NonClinicalNote";

const AXE_OPTS = { rules: { region: { enabled: false } } };

async function axeRuleViolations(container: HTMLElement): Promise<string[]> {
  const { violations } = await axe(container, AXE_OPTS);
  return violations.map((v) => v.id);
}

describe("accessibility (axe) regression net", () => {
  it("Wordmark (full) has no violations", async () => {
    const { container } = render(<Wordmark />);
    expect(await axeRuleViolations(container)).toEqual([]);
  });

  it("Wordmark (small mark, light tone) has no violations", async () => {
    const { container } = render(<Wordmark mark tone="light" />);
    expect(await axeRuleViolations(container)).toEqual([]);
  });

  it("Button (the coral waitlist CTA) has no violations", async () => {
    const { container } = render(
      <Button variant="cta-primary" size="cta">
        Join the waitlist
      </Button>,
    );
    expect(await axeRuleViolations(container)).toEqual([]);
  });

  it("NonClinicalNote (non-clinical boundary aside) has no violations", async () => {
    const { container } = render(<NonClinicalNote />);
    expect(await axeRuleViolations(container)).toEqual([]);
  });
});
