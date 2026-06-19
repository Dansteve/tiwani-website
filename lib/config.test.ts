import { describe, it, expect } from "vitest";

import { appUrlForHost, APP_URL } from "./config";

// appUrlForHost resolves the "Try the beta" target from the current marketing host. The intended end
// state maps each brand domain onto its app subdomain, but TEMPORARILY (the app subdomains are not live
// yet) every host points at the working default APP_URL, so the button works for testers today. When the
// subdomains go live, the config map switches to them and these expectations move with it. Pure, so it is
// asserted here without a browser.
describe("appUrlForHost", () => {
  it("points every marketing host at the working app URL while the app subdomains are not live", () => {
    expect(appUrlForHost("tiwanilife.com")).toBe(APP_URL);
    expect(appUrlForHost("www.tiwanilife.com")).toBe(APP_URL);
    expect(appUrlForHost("tiwanilife.co.uk")).toBe(APP_URL);
    expect(appUrlForHost("www.tiwanilife.co.uk")).toBe(APP_URL);
    expect(appUrlForHost("tiwani-main.web.app")).toBe(APP_URL);
    expect(appUrlForHost("localhost")).toBe(APP_URL);
  });

  it("is case-insensitive, trims whitespace, and handles unknown/empty hosts", () => {
    expect(appUrlForHost("  TIWANILIFE.COM  ")).toBe(APP_URL);
    expect(appUrlForHost("example.com")).toBe(APP_URL);
    expect(appUrlForHost("")).toBe(APP_URL);
  });
});
