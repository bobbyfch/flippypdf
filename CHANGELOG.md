# Changelog

## 3.0.0 — Sela / 2026-10-09

- Rename the product to Sela, with a minimal open-book emblem and Indonesian literary copy; preserve repository/Pages/CDN URLs and Flippy entry points.
- Add the Sela global/named ESM/type aliases and scoped package identity `@bobbyfch/sela` (GitHub installation).
- Lazy reading tools: PDF embedded outline, EPUB navigation/NCX and anchors, cancellable text search/transcript, Web Speech TTS, local notes and JSON import/export.
- Add lazy TXT/basic Markdown/sanitized HTML/text-only FB2 adapter without PDF/ZIP download.
- Local IndexedDB bookshelf, explicit offline engine/assets preparation and development Chromium/Firefox extension packaging without host permissions.
- Portrait/spread adaptation preserves portrait page during rotation; supported browsers can request orientation lock in fullscreen.
- First-visit public Pages language uses bounded IP-country lookup, with manual-choice priority, browser-language fallback and `?geo=off` bypass. The embedding library makes no geolocation requests.
- Add regression coverage for real embedded PDF bookmarks, EPUB anchors, narration lifecycle, new formats, notes, actual offline PDF reload and extension-safe URLs.
## 2.2.0 — 2026-10-09

- Lazy EPUB/CBZ adapters, optional external DjVu decoder, and real format samples.
- Seamless configurable webtoon spacing, Ctrl-wheel/touch zoom, global keyboard help and shortcuts.
- Smoother fold easing, optional paper grain, live demo parameter controls inside the reader.
- Rebuilt local-file panel, icon theme picker, story card opens the interactive reader.
- English and Indonesian README; explicit format, resource and decoder license limits.
- Preserve PDF API and historical CDN paths/tags.

## 2.1.0 — 2026-10-09

- Manga RTL, reading filters, setFilter API and ES5 compatibility loader with original-PDF fallback.
- Green bird identity, bilingual EN/ID Pages with system/light/dark themes, crawlable SEO metadata and sitemap.
- Eight-page illustrated Limaraya friendship story replaces the sample at the same URL.
- React/Svelte/Angular/Astro/Web Component integration recipes; existing Vue adapter retained.
- Remove unused legacy snapshots from current branch; existing version tags and CDN root paths retained.

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
