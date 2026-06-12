import { defineConfig } from "vitest/config";

// The waitlist pure functions (validation + both field mappings) are unit tested in Node, with
// no DOM and no network, so the default environment is fine. Keep the suite fast and isolated.
export default defineConfig({
  test: {
    include: [
      "app/**/*.test.{ts,tsx}",
      "lib/**/*.test.{ts,tsx}",
      "components/**/*.test.{ts,tsx}",
    ],
    environment: "node",
  },
});
