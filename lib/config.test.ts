import { describe, it, expect } from "vitest";

import { isPublicMarketingHost, PUBLIC_MARKETING_HOSTS } from "./config";

// isPublicMarketingHost decides where the "Go to dashboard" entry (DashboardLink) is hidden: the
// public marketing domain(s) only, never the Firebase preview domain or localhost. Pure, so it is
// asserted here without a browser.
describe("isPublicMarketingHost", () => {
  it("is true for the public marketing domain(s)", () => {
    expect(isPublicMarketingHost("tiwanilife.com")).toBe(true);
    expect(isPublicMarketingHost("www.tiwanilife.com")).toBe(true);
  });

  it("is false for the Firebase preview domain, the app domain, and localhost", () => {
    expect(isPublicMarketingHost("tiwani-main.web.app")).toBe(false);
    expect(isPublicMarketingHost("app-tiwani.web.app")).toBe(false);
    expect(isPublicMarketingHost("localhost")).toBe(false);
    expect(isPublicMarketingHost("127.0.0.1")).toBe(false);
  });

  it("is case-insensitive and trims surrounding whitespace", () => {
    expect(isPublicMarketingHost("TIWANILIFE.COM")).toBe(true);
    expect(isPublicMarketingHost("  tiwanilife.com  ")).toBe(true);
  });

  it("is false for the empty string and unrelated hosts", () => {
    expect(isPublicMarketingHost("")).toBe(false);
    expect(isPublicMarketingHost("example.com")).toBe(false);
    // A subdomain that is not in the allowlist is not treated as the public host.
    expect(isPublicMarketingHost("staging.tiwanilife.com")).toBe(false);
  });

  it("exposes the host list as a non-empty constant", () => {
    expect(PUBLIC_MARKETING_HOSTS).toContain("tiwanilife.com");
  });
});
