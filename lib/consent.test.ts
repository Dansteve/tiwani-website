import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  getConsent,
  hasAnalyticsConsent,
  resetConsent,
  setConsent,
} from "./consent";

// A Map-backed localStorage + window shim so the browser-only consent helpers can be exercised in
// the node test environment. setConsent dispatches a CustomEvent, so we record dispatched types.
function installBrowser() {
  const store = new Map<string, string>();
  const events: string[] = [];
  const storage = {
    getItem: (key: string): string | null => (store.has(key) ? (store.get(key) as string) : null),
    setItem: (key: string, value: string): void => {
      store.set(key, value);
    },
    removeItem: (key: string): void => {
      store.delete(key);
    },
  };
  class TestCustomEvent {
    type: string;
    detail: unknown;
    constructor(type: string, init?: { detail?: unknown }) {
      this.type = type;
      this.detail = init?.detail;
    }
  }
  const win = {
    localStorage: storage,
    dispatchEvent: (event: { type: string }): boolean => {
      events.push(event.type);
      return true;
    },
  };
  vi.stubGlobal("window", win);
  vi.stubGlobal("localStorage", storage);
  vi.stubGlobal("CustomEvent", TestCustomEvent);
  return { store, events };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("consent (server-safe, no window)", () => {
  it("returns null / false and never throws without a browser", () => {
    expect(getConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
    expect(() => setConsent("accepted")).not.toThrow();
    expect(() => resetConsent()).not.toThrow();
  });
});

describe("consent (with a browser)", () => {
  it("defaults to undecided: no stored choice, analytics off", () => {
    installBrowser();
    expect(getConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("accepting persists the choice, turns analytics on, and notifies", () => {
    const { store, events } = installBrowser();
    setConsent("accepted");
    expect(store.get(CONSENT_STORAGE_KEY)).toBe("accepted");
    expect(getConsent()).toBe("accepted");
    expect(hasAnalyticsConsent()).toBe(true);
    expect(events).toContain(CONSENT_EVENT);
  });

  it("rejecting persists the choice and keeps analytics off", () => {
    const { store } = installBrowser();
    setConsent("rejected");
    expect(store.get(CONSENT_STORAGE_KEY)).toBe("rejected");
    expect(getConsent()).toBe("rejected");
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("resetting clears the choice so the banner shows again", () => {
    installBrowser();
    setConsent("accepted");
    resetConsent();
    expect(getConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("ignores an unrecognised stored value", () => {
    const { store } = installBrowser();
    store.set(CONSENT_STORAGE_KEY, "maybe");
    expect(getConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
  });
});
