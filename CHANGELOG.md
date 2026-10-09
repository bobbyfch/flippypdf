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
