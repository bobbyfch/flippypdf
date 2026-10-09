# 2.1.0 — 2026-10-09

- Manga RTL, reading filters, setFilter API and ES5 compatibility loader with original-PDF fallback.
- Green bird identity, bilingual EN/ID Pages with system/light/dark themes, crawlable SEO metadata and sitemap.
- Eight-page illustrated Limaraya friendship story replaces the sample at the same URL.
- React/Svelte/Angular/Astro/Web Component integration recipes; existing Vue adapter retained.
- Remove unused legacy snapshots from current branch; existing version tags and CDN root paths retained.

# Changelog

## 2.0.0

- Replace the obfuscated v1 runtime with readable source and repeatable builds.
- Integrate the intranet book engine/UI while preserving Flippy constructor,
  public distribution paths, navigation aliases, and three reading modes.
- Remove Bootstrap and icon-font requirements; provide scoped SVG-based UI.
- Lazily load PDF.js 4.10.38 with matching modern/legacy module workers,
  fonts/CMaps, per-document worker lifecycle, and eval disabled.
- Cancel loading/render tasks on close; cap canvas pixels; lazy webtoon renders.
- Add light/dark/auto themes, reduced-motion handling, ESM/SSR-safe import,
  TypeScript declarations, Vue adapter, and integration examples.
- Preserve v1 snapshot/demo and original MIT/Apache license notices.
- Refresh the demo, README, migration guide, tests, and GitHub Pages workflow.

## 1.x

Original three-mode Flippy viewer. Historical refs remain intact:
`v1.0.0`, `v.1.0.1`, `v.1.0.2`.
