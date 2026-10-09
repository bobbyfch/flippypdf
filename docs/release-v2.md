# FlippyPDF 2.0 migration

The `v2.0.0` ref is a release snapshot branch, kept at the tested v2 commit.
Existing v1 tags remain untouched. Applications should pin a tested ref or
commit; never use the unversioned URL for production. No npm registry
publication is implied by this repository release.

Public paths are preserved:

- `dist/js/flippy.min.js`
- `dist/css/flippy.min.css`
- `dist/sound/turnPage.mp3`

`new Flippy({pdfUrl, title, mode}).open()` still works; `open()` now returns a
Promise that resolves on document readiness. Errors reject the Promise and
emit an `error` event. Close during loading rejects with `AbortError`. Ignored
Promises are handled internally for legacy call sites.

The old source's internal sizing/rendering options (`pageWidth`, `pageHeight`,
`parallelRender`, `jpegQuality`, `minZoom`, `maxZoom`, `zoomStep`) are accepted
but replaced by responsive canvas rendering and the engine's bounded zoom.
Their numeric behavior is not identical. `scale` is mapped to the capped
device-pixel rendering quality; prefer `maxScale` and `maxCanvasPixels`.

Book mode switches to single page on narrow screens. Webtoon remains vertical
scroll; it uses the same PDF engine with lazy pages and at most two concurrent
page renders. The application owns trigger-button binding. No implicit
`.mode-btn` or `[data-pdflipbook]` initialization is added.

The viewer uses system light/dark selection with `theme:'auto'`; an app-specific
theme switch should pass `light` or `dark`. It is a modal reader, not a full
PDF.js viewer: searchable/selectable text, PDF annotations, and form filling
are not provided. Passwords can be supplied explicitly via the options.

The original distribution and demo are archived under `dist/legacy/v1.0.2`
and `example/legacy-demo-v1.html`. They retain their original dependencies and
security limitations; prefer v2 for new integrations.

## Intranet migration

After validating CDN bytes, replace the dashboard reader asset list with Flippy
CSS/JS at the release ref. Use `Flippy` instead of `LibraryCornerReader`, pass
the existing URL/id/title/trigger, and use `storagePrefix:'library-corner:'`
to preserve saved page/bookmarks/sound preference. Keep `media/ebook/{id}`,
session authorization, Range serving, and DOM trigger selectors unchanged.
Keep local vendor assets available for rollback; do not delete them.

## Validation scope

Local Chromium/Edge automation covers three modes, real canvas rendering,
navigation, bookmarks, close/reopen, one-page and mixed-size PDF, invalid input,
legacy PDF.js build, deferred loading cleanup, error fallback/retry, mobile
light/dark/reduced motion/focus, ESM and Vue runtime mount/unmount.
Unit tests cover SSR import, URL schemes, and caller-owned binary PDF data.
Type declarations compile in strict TypeScript. Real Safari/iOS, Firefox,
encrypted-PDF fixtures, long-document profiling, and authenticated intranet
device testing are not covered by these checks.
