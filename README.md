<p align="center"><img src="logo.svg" width="88" alt="Sela open-book emblem"></p>
<h1 align="center">Sela</h1>
<p align="center"><strong>A place between. A story within. 📖</strong><br>PDF · EPUB · CBZ · TXT · Markdown · HTML · FB2 · optional DjVu<br>Book flip · Manga RTL · Seamless webtoon · Single page</p>
<p align="center"><a href="https://github.com/bobbyfch/flippypdf/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/bobbyfch/flippypdf/actions/workflows/ci.yml/badge.svg"></a> <img alt="MIT" src="https://img.shields.io/badge/license-MIT-31725a"> <img alt="Release" src="https://img.shields.io/github/v/release/bobbyfch/flippypdf?color=31725a"> <img alt="TypeScript ready" src="https://img.shields.io/badge/TypeScript-ready-3178c6"> <img alt="Framework independent" src="https://img.shields.io/badge/framework-independent-31725a"></p>

[Live playground](https://bobbyfch.github.io/flippypdf/) · [Bahasa Indonesia](README.id.md) · [Integrations](docs/integrations.md) · [Formats](docs/formats.md) · [Browser support](docs/compatibility.md) · [Changelog](CHANGELOG.md)

**Sela** means an interval: a space between things, and a moment to make room for a story. Formerly **FlippyPDF**, it is a lightweight reading interface for your website. **No Bootstrap, jQuery or icon font required.** PDF.js loads only for PDFs; EPUB and CBZ use a separate lazy adapter. Optional DjVu integration uses an externally supplied decoder.

🇮🇩 [Baca panduan lengkap dalam Bahasa Indonesia →](README.id.md)

[![Sela live book reader](site/preview-reader.jpg)](https://bobbyfch.github.io/flippypdf/)

## ✨ Why Sela?

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
| Main interface | ~22.7 KiB | Main script requested |
| Scoped CSS | ~2.9 KiB | First open |
| EPUB / CBZ adapter (includes fflate) | ~6.8 KiB | EPUB or CBZ selected |
| Reading tools: contents, search, notes, TTS | ~4.1 KiB | Tools first opened |
| Plain text / Markdown / HTML / FB2 | ~2.5 KiB | Text format selected |
| DjVu adapter | ~1.4 KiB | DjVu selected; external decoder also needed |
| PDF.js + worker (modern) | ~491 KiB combined | PDF selected; fonts/CMaps may load separately |

The interface is lightweight; total download depends on the document and decoder. [Format capabilities, archive limits and licensing](docs/formats.md).

## 📚 Pick your format

| Document | Experience | Current scope |
| --- | --- | --- |
| PDF | Book · single · manga RTL · webtoon | Canvas pages; embedded outline, optional search, selectable transcript, narration and page notes; no aligned PDF text layer or OCR |
| EPUB | Selectable text · chapter reading · continuous chapters | Reflowable HTML, reader typography; navigation/NCX, anchor links; no encrypted resources or publisher layout fidelity |
| CBZ | Comic pages in all four modes | Naturally sorted raster images supported by the browser |
| TXT / MD / HTML / FB2 | Selectable reflowable text | UTF-8; basic Markdown headings/fences, safe HTML, text-only FB2; heading outline |
| DjVu | Scanned pages in all four modes | Bundled single-file documents; separately supplied external decoder |

```js
const reader = new Sela({
  url: '/books/story.epub', // EPUB / CBZ / DjVu inferred from URL extension
  language: 'en', mode: 'webtoon', theme: 'auto', pageGap: 0
});
await reader.open();
```

Set `format: 'epub'`, `'cbz'` or `'djvu'` explicitly for Blob URLs, byte data and extensionless endpoints. DjVu also requires `djvujsSrc`; its GPL-2.0 decoder is not part of the MIT bundle. CBR/RAR, MOBI/AZW, DOCX and DRM are not supported in this release. [Full format guide](docs/formats.md).

## 🎛️ Read, tweak, repeat

Use `pageGap: 0` for seamless webtoon, `paperTexture: true` for subtle grain on book faces, `duration: 560` for eased folds, and `wheelZoom: true` to opt into ordinary mouse-wheel zoom. Ctrl + wheel / trackpad pinch zooms without changing ordinary scrolling; touch pinch is also supported. EPUB zoom changes text size.

| Shortcut | Action |
| --- | --- |
| Arrow keys / Page Up / Page Down | Previous / next; manga arrows follow RTL |
| Home / End | First / last page or chapter |
| + / − / 0 | Zoom in / out / reset |
| F / B / M | Fullscreen / bookmark / page sound |
| ? / Escape | Shortcut help / dismiss help or close reader |

Shortcuts ignore editable fields. Reduced motion overrides fold duration. The playground exposes settings before opening and inside the reader.

Set `language: 'en'` for English reader controls or `'id'` for Indonesian (the default retained for existing integrations). The Pages topbar selects the demo language.

## 🎧 Listen, find, keep

Open **Reading tools** in the reader header, or call `await reader.showTools()`. Embedded PDF bookmarks resolve to their page; EPUB navigation/NCX opens chapters and anchors. Search scans pages sequentially, can be cancelled, and caps results at 100 matching pages. `await reader.getText(page)` returns extractable text. Scans and image comics need external OCR before narration/search can work.

**TTS uses the Web Speech API:** no Sela API key, paid SDK, server or model download. Local voices are selected by default; enable online voices explicitly if desired. Voices/languages come from the browser/OS. Remote voices may send narration text to their provider; local voice availability, audible quality, pause/resume and background playback vary. No guaranteed free third-party voice service or Indonesian voice is promised. Speech is chunked, user-started and cancelled on manual navigation or close. Optional continuous narration advances pages/chapters.

Write page/chapter notes; export/import a versioned JSON file with notes and personal bookmarks. Import merges the current book's notes by page/chapter number: use the same document edition. Notes are not geometric PDF highlights. EPUB chapter and relative scroll position resume on reopen; stable EPUB CFI locations are future work.

## 🗄️ A shelf, when you want one

The public demo's **bookshelf** saves selected documents in IndexedDB on that browser. Save a book, then **Prepare offline reader** while online: the optional download includes PDF engines, fonts/CMaps and demo assets. After preparation, reopen the app and read saved books without a connection. This is separate from the embedding core. Browser storage can be evicted or cleared: retain your original files. Local voices work offline when the OS supplies them; the external DjVu decoder is not offline-bundled.

`npm run package:extension` builds standalone Chromium (Chrome/Edge/Brave) and Firefox extension ZIPs in `.git/sela-extension/`. Clicking the extension opens a local shelf with bundled readers. No host permissions, remote scripts or automatic PDF interception. These are development packages, **not store-published extensions**. [Offline & extension setup](docs/offline-extension.md).

## 🌿 Sela, with the same roots

`window.Sela` and `window.Flippy` refer to the same constructor. Named ESM/type exports include `Sela`/`SelaOptions` as well as legacy `Flippy`/`FlippyOptions`. New `sela.*` entry files coexist with `flippy.*`. The repository and Pages URLs remain `flippypdf` to protect existing integration/CDN paths; historical tags are unchanged. The package name for v3 is `@bobbyfch/sela` (install from GitHub; npm registry publication is still pending).

Pages uses a first-visit IP country lookup through [country.is](https://country.is/): Indonesia defaults to Indonesian, other countries to English. Saved manual choice wins; a 2.5-second failure falls back to browser language. `?geo=off` disables the lookup. No document, precise device location or browser history is sent. The embed library makes no IP lookup; use `language: 'auto'` for browser language or supply `en`/`id` from your host.

## Quick start

```html
<script src="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v3.0.0/dist/js/sela.min.js"></script>
<button id="read" type="button">Read PDF</button>
<script>
const reader = new Sela({
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v3.0.0/dist/css/flippy.min.css">
```

Pin releases in production. Existing root JS/CSS/sound paths remain; historical tags are never rewritten. Unused snapshots were removed from the current branch. [v1 migration](docs/release-v2.md).

### ESM / TypeScript

```sh
npm install github:bobbyfch/flippypdf#v3.0.0
```

```ts
import Sela from '@bobbyfch/sela';
const reader = new Sela({ pdfUrl: '/story.pdf', mode: 'manga', filter: 'grayscale' });
await reader.open();
reader.next().setFilter('sepia');
reader.addEventListener('pagechange', event => console.log(event.detail.page));
reader.destroy(); // component cleanup
```

Bundled imports use the pinned CDN for renderer assets. Self-hosting/offline: serve all of `dist/` and set `assetBase: '/assets/flippy/dist/'`. Keep module and worker versions matched.

### Older browsers

Use `dist/js/sela.compat.js` instead of the main script. This ES5 entry checks capabilities before loading the modern viewer:

```html
<script src="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v3.0.0/dist/js/sela.compat.js"></script>
<script>
document.getElementById('read').onclick = function () {
  var start = function () { new Sela({ pdfUrl: '/story.pdf' }).open(); };
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

Events: `ready`, `pagechange`, `pageerror`, `close`, `error`; payloads are in `event.detail`. Options include `format`, `language`, `pageGap`, `paperTexture`, `wheelZoom`, `startPage`, `id`, `storagePrefix`, `maxScale`, `maxCanvasPixels`, `duration`, `httpHeaders`, `withCredentials`, `password`, `data`, `assetBase`, `pdfBuild`, `zIndex`. Current zoom is available as `reader.zoom`. [Full declarations](src/index.d.ts).

## Privacy & accessibility

Selected demo documents stay in the browser; no upload or analytics. Bookmarks/progress use localStorage when available. CDN requests follow normal browser networking. Keyboard controls, focus trapping, labelled actions and reduced motion are included. PDFs render to canvases; optional tools provide a selectable text transcript, but this is not an aligned text layer or full tagged-PDF accessibility. Provide an accessible original for screen-reader users. EPUB scripts and external resources are removed. Physical Safari/iOS and mobile device testing remains outstanding; no full WCAG conformance claim is made.

## Development

```sh
npm ci
npm run build
npm test
npm run test:types
npm run test:browser
npm run serve
```

The browser suite covers PDF/EPUB/CBZ/DjVu, real pixels, layouts, RTL, filters, Vue lifecycle, flag/theme controls, mobile settings, archive errors, cancellation and auth headers. CI uses Chromium; local checks use Edge. Platform lists do not imply testing every OS/version.

## 🌱 What's next?

[Research & prioritized roadmap](docs/roadmap.md) · [Contributing](CONTRIBUTING.md)

The direction is **one reading interface, optional capabilities, many stacks**. This release implements search/transcripts, document contents, browser narration, page notes and a local shelf. Aligned PDF text layers/highlights, EPUB CFI pagination, MOBI/AZW3, OPDS and synchronization remain roadmap work. Feature parity or performance superiority over Readest/foliate-js is not claimed. Npm-registry distribution is also planned; today's installation uses CDN, GitHub or self-hosted assets.

## Open source 🌱

MIT © Bobby Fajar Christian. Engine adapted from [PDFlipbook](https://github.com/SympleNZ/PDFlipbook) (MIT), PDF renderer [PDF.js](https://github.com/mozilla/pdf.js) (Apache-2.0), ZIP adapter fflate (MIT). External DjVu.js decoder is GPL-2.0 and is not bundled. [Third-party notices](THIRD_PARTY_NOTICES.md).

If Sela makes your project easier to read, a ⭐ helps others find it. Bug reports are welcome: include a reproducible PDF, browser version, mode and console error.
