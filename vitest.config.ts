import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// The waitlist + consent + audiences pure functions are unit tested in Node, with their own
// window/localStorage shims where needed, so the DEFAULT environment stays "node" and those tests
// run unchanged. The component-level accessibility net (components/accessibility.test.tsx) opts into
// jsdom per-file via a "// @vitest-environment jsdom" docblock, so only it pays for a DOM. The react
// plugin compiles the JSX it renders; the "@" alias mirrors tsconfig ("@/*": ["./*"]) so imports
// resolve identically. setupFiles sets a document lang, guarded so the node tests are not affected.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    include: [
      "app/**/*.test.{ts,tsx}",
      "lib/**/*.test.{ts,tsx}",
      "components/**/*.test.{ts,tsx}",
    ],
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
  },
});
