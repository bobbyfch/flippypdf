# Browser and platform compatibility

The interactive reader requires ES2020, dynamic modules, module workers, Pointer Events, EventTarget, ResizeObserver and IntersectionObserver. Manga uses individual CSS scale. The compatibility entry checks capabilities instead of guessing from OS names.

| Environment | Behavior | Verification |
| --- | --- | --- |
| Current Edge / Windows | Interactive viewer | Local browser suite |
| Chromium / Linux | Interactive viewer | GitHub Actions suite |
| Current Firefox / Safari | Intended support with matching APIs | Not device-tested in this release |
| Android / iOS | Responsive modes and fullscreen fallback | Mobile viewport emulation, not physical devices |
| Missing required capabilities, including IE | Original HTTP(S) PDF via compat entry | Capability removal tested in Chromium |
| JavaScript disabled / blocked | Normal PDF link | Demo includes noscript |

PDF.js 4.10.38 ships matching modern and legacy bundles. A legacy build cannot give IE all modern reader features. [Official PDF.js FAQ](https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions).

Always retain a direct PDF link. CSP must allow scripts/styles and module workers (blob: for cross-origin workers). Authentication and CORS still apply. Windows, macOS, Linux, Android, iOS and ChromeOS are browser hosts, not separate native builds.

SEO: static crawlable content, canonical/description/Open Graph/Twitter tags, SoftwareApplication JSON-LD and sitemap. llms.txt is agent documentation, not a ranking mechanism. [Google AI features use the same foundational SEO practices](https://developers.google.com/search/docs/appearance/ai-features). Indexing, rankings and AI inclusion are not guaranteed. A GitHub project cannot supply origin-root robots.txt; the project-level file documents policy. Submit the sitemap to Search Console after verifying ownership.
