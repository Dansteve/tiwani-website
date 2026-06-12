import { describe, it, expect } from "vitest";
import { AUDIENCES, AUDIENCE_SLUGS, getAudience } from "./audiences";

// The audience content is data, so its integrity is testable: the four pages exist, every field a
// page renders is present, and every external resource link is well-formed (absolute https). The
// links are verified to RESOLVE against the live web in the link-research step and re-checked by
// the content-manager lens; this test pins the shape so a future edit cannot silently ship a
// malformed or relative link, an empty section, or a duplicate slug.

const EXPECTED_SLUGS = [
  "children",
  "older-adults",
  "long-term-conditions",
  "professionals",
];

describe("audiences data", () => {
  it("has exactly the four expected audiences", () => {
    expect(AUDIENCE_SLUGS).toEqual(EXPECTED_SLUGS);
  });

  it("has unique slugs", () => {
    expect(new Set(AUDIENCE_SLUGS).size).toBe(AUDIENCE_SLUGS.length);
  });

  it("resolves a known slug and rejects an unknown one", () => {
    expect(getAudience("children")?.slug).toBe("children");
    expect(getAudience("not-a-slug")).toBeUndefined();
  });

  for (const audience of AUDIENCES) {
    describe(`audience: ${audience.slug}`, () => {
      it("has all the fields a page renders", () => {
        expect(audience.nav.trim()).not.toBe("");
        expect(audience.cardTitle.trim()).not.toBe("");
        expect(audience.cardBlurb.trim()).not.toBe("");
        expect(audience.eyebrow.trim()).not.toBe("");
        expect(audience.title.trim()).not.toBe("");
        expect(audience.intro.length).toBeGreaterThan(0);
        expect(audience.helps.length).toBeGreaterThan(0);
        expect(audience.resources.length).toBeGreaterThan(0);
        expect(audience.seoTitle.trim()).not.toBe("");
        expect(audience.seoDescription.trim()).not.toBe("");
      });

      it("has non-empty help points", () => {
        for (const help of audience.helps) {
          expect(help.title.trim()).not.toBe("");
          expect(help.body.trim()).not.toBe("");
        }
      });

      it("has well-formed, absolute https resource links with no duplicates", () => {
        const hrefs: string[] = [];
        for (const group of audience.resources) {
          expect(group.title.trim()).not.toBe("");
          expect(group.links.length).toBeGreaterThan(0);
          for (const link of group.links) {
            expect(link.name.trim()).not.toBe("");
            expect(link.blurb.trim()).not.toBe("");
            // Absolute https URL only (these are external authoritative sources).
            expect(link.href).toMatch(/^https:\/\/[^\s]+$/);
            // No accidental trailing whitespace in the URL.
            expect(link.href).toBe(link.href.trim());
            hrefs.push(link.href);
          }
        }
        // No duplicate link within a single audience page.
        expect(new Set(hrefs).size).toBe(hrefs.length);
      });
    });
  }
});
