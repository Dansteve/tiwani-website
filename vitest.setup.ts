// Shared Vitest setup. The default environment is "node" (the lib tests), so this runs for those
// too: it must be a no-op without a DOM. The component-level accessibility net opts into jsdom, and
// there axe (vitest-axe) flags the page-level html-has-lang rule on isolated fragments unless the
// document declares a language. Set one, guarded so the node-env tests (no document) are untouched.
if (typeof document !== "undefined") {
  document.documentElement.lang = "en";
}
