<p align="center"><img src="logo.svg" width="88" alt="FlippyPDF green bird"></p>
<h1 align="center">FlippyPDF</h1>
<p align="center"><strong>Your stories. Your reading rhythm. 🌿</strong><br>PDF · EPUB · CBZ · optional DjVu<br>Book flip · Manga RTL · Seamless webtoon · Single page</p>
<p align="center"><a href="https://github.com/bobbyfch/flippypdf/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/bobbyfch/flippypdf/actions/workflows/ci.yml/badge.svg"></a> <img alt="MIT" src="https://img.shields.io/badge/license-MIT-31725a"> <img alt="Release" src="https://img.shields.io/github/v/release/bobbyfch/flippypdf?color=31725a"> <img alt="TypeScript ready" src="https://img.shields.io/badge/TypeScript-ready-3178c6"> <img alt="Framework independent" src="https://img.shields.io/badge/framework-independent-31725a"></p>

[Live playground](https://bobbyfch.github.io/flippypdf/) · [Bahasa Indonesia](README.id.md) · [Integrations](docs/integrations.md) · [Formats](docs/formats.md) · [Browser support](docs/compatibility.md) · [Changelog](CHANGELOG.md)

A lightweight reading interface for your website. **No Bootstrap, jQuery or icon font required.** PDF.js loads only for PDFs; EPUB and CBZ use a separate lazy adapter. Optional DjVu integration uses an externally supplied decoder.

🇮🇩 Reader PDF dengan empat mode, bookmark, progres tersimpan, dan filter warna. Bisa dipasang pada CI3, Laravel, Vue, React, Svelte, Angular, Astro, atau HTML biasa. Demo mendukung EN/ID serta light/dark/system.

## ✨ Why Flippy?

| Read your way | Fit your project |
| --- | --- |
| 📖 Book folds and two-page spreads | Vanilla JavaScript + ESM |
| 🗯️ Manga RTL turns and arrow keys | TypeScript declarations, SSR-safe import |
| 📜 Webtoon with nearby-page rendering | Vue component; additional integration examples |
| 🎯 Responsive single-page focus | Bootstrap/Tailwind can stay in your app |
| 🌗 Themes and reduced motion | Auth headers, credentials, byte-data PDFs |
| 🔖 Bookmarks and saved progress | Lazy PDF.js and bounded canvas sizes |
| 🎨 Monochrome, sepia, contrast, warm/cool | Compatibility entry with direct-PDF fallback |

[Read **Limaraya**, our 8-page illustrated friendship story, in the live reader](https://bobbyfch.github.io/flippypdf/#demo-heading). Choose a document, change parameters, or drop your own file. Original fiction; AI-assisted illustrations. [Story sources and prompts](example/story/README.md).

## 🧩 Load only what you read

| Module | Gzip size | Loaded when |
| --- | ---: | --- |
| Main interface | ~21 KiB | Main script requested |
| Scoped CSS | ~2.5 KiB | First open |
| EPUB / CBZ adapter (includes fflate) | ~6.1 KiB | EPUB or CBZ selected |
| DjVu adapter | ~1.4 KiB | DjVu selected; external decoder also needed |
| PDF.js + worker | Separate, larger assets | PDF selected |

The interface is lightweight; total download depends on the document and decoder. [Format capabilities, archive limits and licensing](docs/formats.md).

## 🎛️ Read, tweak, repeat

Use `pageGap: 0` for seamless webtoon, `paperTexture: true` for subtle paper grain, `duration: 560` for eased folds, and `wheelZoom: true` to opt into ordinary mouse-wheel zoom. Ctrl + wheel / trackpad pinch zooms without changing ordinary scrolling; touch pinch is also supported. EPUB zoom changes text size.

| Shortcut | Action |
| --- | --- |
| Arrow keys / Page Up / Page Down | Previous / next; manga arrows follow RTL |
| Home / End | First / last page or chapter |
| + / − / 0 | Zoom in / out / reset |
| F / B / M | Fullscreen / bookmark / page sound |
| ? / Escape | Shortcut help / dismiss help or close reader |

Shortcuts ignore editable fields. Reduced motion overrides fold duration. The playground exposes settings before opening and inside the reader.

Set `language: 'en'` for English reader controls or `'id'` for Indonesian (the default retained for existing integrations). The Pages topbar selects the demo language.

## Quick start

```html
<script src="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.2.0/dist/js/flippy.min.js"></script>
<button id="read" type="button">Read PDF</button>
<script>
const reader = new Flippy({
  pdfUrl: '/books/story.pdf', title: 'My story',
  mode: 'book', // book | single | webtoon | manga
  theme: 'auto', language: 'en', soundEnabled: false
});
document.querySelector('#read').addEventListener('click', () => {
  reader.open().catch(error => console.error(error));
});
</script>
```

CSS loads automatically on first open. For explicit loading/CSP:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.2.0/dist/css/flippy.min.css">
```

Pin releases in production. Existing root JS/CSS/sound paths remain; historical tags are never rewritten. Unused snapshots were removed from the current branch. [v1 migration](docs/release-v2.md).

### ESM / TypeScript

```sh
npm install github:bobbyfch/flippypdf#v2.2.0
```

```ts
import Flippy from 'flippypdf';
const reader = new Flippy({ pdfUrl: '/story.pdf', mode: 'manga', filter: 'grayscale' });
await reader.open();
reader.next().setFilter('sepia');
reader.addEventListener('pagechange', event => console.log(event));
reader.destroy(); // component cleanup
```

Bundled imports use the pinned CDN for renderer assets. Self-hosting/offline: serve all of `dist/` and set `assetBase: '/assets/flippy/dist/'`. Keep module and worker versions matched.

### Older browsers

Use `dist/js/flippy.compat.js` instead of the main script. This ES5 entry checks capabilities before loading the modern viewer:

```html
<script src="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.2.0/dist/js/flippy.compat.js"></script>
<script>
document.getElementById('read').onclick = function () {
  var start = function () { new Flippy({ pdfUrl: '/story.pdf' }).open(); };
  if (window.FlippyReady) FlippyReady.then(start).catch(function () {
    window.location.assign('/story.pdf');
  }); else start();
};
</script>
```

Keep a normal PDF link for disabled JavaScript and load failures. Very old browsers receive the original PDF. [Verified capabilities and limits](docs/compatibility.md).

## Reading API

`open()` returns a promise; `close()`/`destroy()` cancel work. Controls: `next()`, `prev()`, `goTo(page)`, `firstPage()`, `lastPage()`, `zoomIn()`, `zoomOut()`, `setZoom(value)`, `toggleFullscreen()`, `setFilter(value)`. Position: `currentPage()` and `totalPages`.

Manga preserves PDF page numbers: `next()` increases the page number; **ArrowLeft** advances in RTL. Source pages must already be in reading order. `readingDirection: 'rtl'` also works with book/single.

Filters: `none`, `grayscale`, `sepia`, `contrast`, `warm`, `cool`. Grayscale avoids relying on hue; warm/cool presets are personal adjustments, not medical color-blindness correction. Filters affect canvases, never the source PDF/download.

Events: `ready`, `pagechange`, `pageerror`, `close`, `error`. Options include `startPage`, `id`, `storagePrefix`, `maxScale`, `maxCanvasPixels`, `duration`, `httpHeaders`, `withCredentials`, `password`, `data`, `assetBase`, `pdfBuild`, `zIndex`. [Full declarations](src/index.d.ts).

## Privacy & accessibility

Selected demo PDFs stay in the browser; no upload or analytics. Bookmarks/progress use localStorage when available. CDN requests follow normal browser networking. Keyboard controls, focus trapping, labelled actions and reduced motion are included. PDFs render to canvases; provide an accessible original or alternative content for screen-reader users.

## Development

```sh
npm ci
npm run build
npm test
npm run test:types
npm run test:browser
npm run serve
```

Tests cover real PDF pixels, layouts, RTL, filters, Vue lifecycle, mobile themes, failures/cancellation and auth headers. CI uses Chromium; local checks use Edge. Platform lists do not imply testing every OS/version.

## Open source 🌱

MIT © Bobby Fajar Christian. Engine adapted from [PDFlipbook](https://github.com/SympleNZ/PDFlipbook) (MIT), PDF renderer [PDF.js](https://github.com/mozilla/pdf.js) (Apache-2.0), ZIP adapter fflate (MIT). External DjVu.js decoder is GPL-2.0 and is not bundled. [Third-party notices](THIRD_PARTY_NOTICES.md).

If Flippy makes your project easier to read, a ⭐ helps others find it. Bug reports are welcome: include a reproducible PDF, browser version, mode and console error.
