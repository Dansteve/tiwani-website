import { describe, it, expect } from "vitest";

import { appUrlForHost, APP_URL } from "./config";

// appUrlForHost resolves the "Try out beta now" target from the current marketing host: each public
// domain points to its matching app subdomain (same brand TLD); the Firebase preview domain, localhost,
// and unknown hosts fall back to APP_URL. Pure, so it is asserted here without a browser.
describe("appUrlForHost", () => {
  it("maps each public marketing domain to its matching app subdomain", () => {
    expect(appUrlForHost("tiwanilife.com")).toBe("https://app.tiwanilife.com");
    expect(appUrlForHost("www.tiwanilife.com")).toBe("https://app.tiwanilife.com");
    expect(appUrlForHost("tiwanilife.co.uk")).toBe("https://app.tiwanilife.co.uk");
    expect(appUrlForHost("www.tiwanilife.co.uk")).toBe("https://app.tiwanilife.co.uk");
  });

  it("is case-insensitive and trims surrounding whitespace", () => {
    expect(appUrlForHost("TIWANILIFE.COM")).toBe("https://app.tiwanilife.com");
    expect(appUrlForHost("  tiwanilife.co.uk  ")).toBe("https://app.tiwanilife.co.uk");
  });

  it("falls back to APP_URL for the preview domain, localhost, and unknown hosts", () => {
    expect(appUrlForHost("tiwani-main.web.app")).toBe(APP_URL);
    expect(appUrlForHost("localhost")).toBe(APP_URL);
    expect(appUrlForHost("example.com")).toBe(APP_URL);
    expect(appUrlForHost("")).toBe(APP_URL);
  });
});
