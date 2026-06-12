import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

// PECR guard (the load-bearing control for the whole cookie posture). getAnalytics() is what
// initializes Google / Firebase Analytics and sets the _ga cookie, so it may be called ONLY in
// lib/firebase.ts, where getAnalyticsClient gates it behind hasAnalyticsConsent(). If any other
// file ever calls getAnalytics() directly, the consent gate is bypassed and _ga could be set before
// opt-in, a PECR breach. This test fails the build if that happens. (Importing logEvent from
// firebase/analytics is fine; only the getAnalytics() initializer is restricted.)
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry) && !/\.test\.(ts|tsx)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

describe("analytics consent gate (PECR)", () => {
  it("only lib/firebase.ts may call getAnalytics() (the _ga initializer)", () => {
    const appDir = join(process.cwd(), "app");
    const gated = join("lib", "firebase.ts");
    const offenders = walk(appDir)
      .filter((file) => !file.endsWith(gated))
      .filter((file) => /\bgetAnalytics\s*\(/.test(readFileSync(file, "utf8")))
      .map((file) => file.slice(process.cwd().length + 1));
    expect(offenders).toEqual([]);
  });
});
