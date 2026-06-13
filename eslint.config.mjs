import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  // Ignore generated, built, and vendored artifacts BEFORE the rule sets, so the
  // typescript-eslint recommended rules (no-this-alias, no-require-imports) never
  // run against minified bundles. Globs are prefixed with **/ so they also match
  // nested copies (for example a checked-out worktree under .claude/worktrees/<name>/out).
  globalIgnores([
    "**/node_modules/**", // dependencies (default-ignored too; explicit for clarity)
    "**/.next/**", // Next.js build output
    "**/out/**", // Next.js static export (the Turbopack chunks: minified bundles)
    "**/build/**", // generic build output
    "**/dist/**", // generic build output
    "**/coverage/**", // test coverage reports
    ".firebase/**", // Firebase Hosting deploy cache
    "**/next-env.d.ts", // Next.js generated ambient types
  ]),
  ...compat.extends("next/core-web-vitals", "next/typescript"),
]);

export default eslintConfig;
