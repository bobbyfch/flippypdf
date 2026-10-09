# Local books, offline reading and browser extensions

Sela's library is separate from the lightweight embedding reader. Your application does not need IndexedDB, a service worker or extension APIs to embed Sela.

## Public web app

1. Choose a supported document in the playground.
2. Open the bookshelf and choose **Save selected book**. SHA-256 identifies duplicate imports; progress and notes use the stored book identifier.
3. While online, choose **Prepare offline reader**. This explicitly downloads the app, optional format modules, PDF.js engines/workers, fonts/CMaps and demo resources. It does not upload the imported book.
4. Wait for the success message, reload once, then reopen the shelf. Saved PDF, EPUB, CBZ and text documents can be read offline.

This requires HTTPS (or a trusted localhost origin), IndexedDB, service workers and Cache Storage. A normal embed has no service worker. Storage belongs to one browser profile and origin; another device/browser does not inherit it. Quota failures surface as errors. Browser clearing/eviction can remove your library, so retain originals. Removing a book offers Undo until the next shelf operation/reload; exported notes are a separate backup.

Local OS/browser voices may narrate offline; the app cannot install or guarantee a voice. The separate GPL-2.0 DjVu decoder remains an online/custom-hosted integration. Offline preparation does not include remote DjVu code or online voices.

## Development extensions

Prebuilt development ZIPs: [Chromium / Chrome / Edge / Brave](https://github.com/bobbyfch/flippypdf/releases/download/v3.0.0/sela-chromium-3.0.0.zip) · [Firefox](https://github.com/bobbyfch/flippypdf/releases/download/v3.0.0/sela-firefox-3.0.0.zip). Extract the appropriate ZIP, then follow the browser-specific instructions below. These packages are unsigned; Firefox uses temporary loading until signing/store distribution is completed.

```sh
npm ci
npm run build
npm run package:extension
```

Outputs: `.git/sela-extension/chromium/`, `.git/sela-extension/firefox/` and matching versioned ZIPs. The directories contain self-hosted app assets and matching PDF workers. Toolbar click opens a reader tab. Books imported there stay in that extension profile's IndexedDB. No host permissions, content scripts, account access, automatic PDF interception or network-wide access is requested. Browser default extension CSP prevents remote JavaScript. Built-in IP lookup is disabled on extension origins; locale/manual selection applies.

- Chrome / Edge / Brave: open the extensions manager, enable developer mode, and load the `chromium` directory unpacked. Keep the extension ID/profile consistent to retain its local shelf.
- Firefox: `about:debugging` → This Firefox → Load Temporary Add-on → choose `firefox/manifest.json`. A permanent install requires signing/distribution review. Temporary installations can disappear on browser restart.

The packages are development builds, not signed or published on Chrome Web Store / Firefox Add-ons. Store review, signed Firefox installation, upgrades/migration and physical-device testing remain separate work. Extension shelf storage and the Pages shelf are different origins. Export notes and retain originals before changing installations.

## Update behavior

The web worker uses a versioned cache. Navigations prefer the network and fall back to the prepared app while offline. Explicit preparation fills the current version's assets. An incomplete preparation never reports success. Historical caches are retained so a failed update does not destroy an older prepared reader; clearing site data removes them. A prepared older app does not gain new format/engine modules until preparation succeeds for the new release.

## Narration and language privacy

Local voices are selected by default. Unchecking **Local voices only** exposes remote voices, labelled online; providers may receive the spoken text. The browser/OS controls providers and charges/availability. Sela itself has no narration subscription, service key or cloud upload endpoint.

Pages first-visit country lookup uses `https://api.country.is/` with no cookies or referrer, times out after 2.5 seconds, reads only the country code and ignores the returned IP. Manual language choice wins even if lookup completes later. `?geo=off` prevents the request. VPN/proxy location can make IP country inaccurate. The library has no mandatory lookup; hosts can supply `language: 'en'` / `'id'`, or use `'auto'` to follow browser locale.
