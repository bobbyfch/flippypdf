# FlippyPDF: research and proposed roadmap

Reviewed **9 October 2026**. This is a product recommendation, not a release schedule. None of the proposed capabilities below should be read as available features.

## Positioning

**One delightful reading interface, optional capabilities, many stacks.** Focus on embedding PDF, EPUB and comics into existing websites, with an honest download budget and thoughtful manga/webtoon controls. GitHub stars reflect adoption and community interest; no feature set guarantees a ranking.

## What adjacent projects already do

| Project / primary source | Observed strength | Implication for Flippy |
| --- | --- | --- |
| [PDF.js](https://github.com/mozilla/pdf.js) | General-purpose PDF parsing/rendering, established viewer and contributor documentation | Keep the proven decoder; improve our reading UI and optional integrations |
| [foliate-js](https://github.com/johnfactotum/foliate-js) | Modular browser ebook rendering, several ebook formats, book/renderer interfaces and auxiliary search/annotation modules | Multi-format alone is not a differentiator; define stable, small adapter contracts |
| [Readest](https://github.com/readest/readest#features) | Cross-platform reading, full-text search and annotations/highlights | Search and useful reading tools are a baseline expectation for richer readers |
| [StPageFlip](https://github.com/Nodlik/StPageFlip) | Dedicated realistic page-turning library | Animation needs polish, but cannot be the whole product proposition |

These projects serve different scopes. No relative speed, memory or bundle superiority is claimed without equivalent measurements.

## Recommended sequence

| Priority | Proposal | Why it matters | Lightweight approach / acceptance criterion |
| --- | --- | --- | --- |
| P0 | Optional PDF text layer, search and document outline | Readers need to find, copy and navigate content; canvas-only PDFs have accessibility limits | Load on demand, cancellable indexing, keyboard navigation; verify text alignment at zoom and RTL |
| P0 | EPUB table of contents, stable text locations and footnotes | Chapter-only progress is too coarse; layout changes should not lose position | Parse navigation/NCX, stable anchors; preserve position after font-size changes and reopen |
| P0 | Performance evidence + browser/device matrix | A documented budget is more credible than “super lightweight” | Measure interface versus decoder versus document; cold/warm loads, peak canvas memory, long books, Safari/Firefox and physical touch devices |
| P1 | Comic panel focus and gutter/crop presets | A clear manga/webtoon specialty that can work on small screens | Start with user-defined panel regions and non-destructive cropping; avoid shipping a mandatory AI model |
| P1 | Portable highlights, notes and reading progress | Useful for students and reading apps; users should own their data | Local first, JSON/Markdown export, versioned location format, optional host-provided sync adapter |
| P1 | Reproducible embed/config links and integration starter examples | Makes a striking demo useful to actual developers | Whitelist public demo parameters; never embed tokens/private URLs; offer copyable config and tested SSR cleanup examples |
| P1 | Npm distribution and adapter extension API | Reduce setup friction; let contributors add capabilities without bloating core | Publish only after package ownership/release checks; stable adapter lifecycle and conformance tests |
| P2 | Optional narration / reading ruler / OPDS catalog | Broaden learning and library use cases | Browser capability detection and separate modules; opt-in permissions, no compulsory backend |
| P2 | Host-controlled AI hooks | Allow apps to provide search assistance or summaries | Explicit opt-in callback/provider; no silent document upload and no mandatory provider SDK |

## Growth work that supports adoption

- Put real screenshots and a working playground above long documentation.
- Keep English documentation primary, Indonesian translation linked, and feature limits visible.
- Publish reproducible small integration examples; identify recipes versus maintained adapters.
- Provide a release changelog, issue reproduction guidance and contributor entry points.
- After benchmark evidence exists, publish a short demo with setup, real use cases and measured costs. Invite organic feedback and contributions; avoid artificial stars or unsupported “fastest” claims.

## Current gaps, stated plainly

PDF has no text/search/annotation layer. EPUB uses sanitized reader typography and chapter locations, without publisher layout fidelity or encrypted resources. Archives are bounded but synchronously extracted. DjVu is optional and depends on an external GPL-2.0 decoder. Physical Safari/iOS and Firefox checks, long-book profiling, npm-registry publication and a public third-party adapter API remain outstanding.

[Current capabilities](formats.md) · [Compatibility](compatibility.md) · [Contributing](../CONTRIBUTING.md)
