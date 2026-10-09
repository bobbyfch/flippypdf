# Third-party notices

FlippyPDF is MIT licensed, Copyright (c) 2025 Bobby Fajar Christian.

The book engine is based on PDFlipbook, Copyright (c) 2026 Symple NZ,
MIT licensed. The imported baseline was the locally modified intranet engine,
originally based on SympleNZ/PDFlipbook commit
`99d46380ea37394d8c83c95f6d7cc8e9a0129986`. Its license is preserved in
`licenses/PDFlipbook-MIT.txt` and `dist/PDFlipbook-LICENSE.txt`.

PDF.js 4.10.38 is bundled as lazily loaded assets, Copyright Mozilla Foundation
and contributors, Apache-2.0 licensed. Its full license is in
`dist/vendor/pdfjs/LICENSE`. The modern and legacy builds and corresponding
workers come from the same pinned npm package. Its CMap and standard-font
assets retain their upstream notices. PDF.js is an internal dependency; this
project does not claim to implement a new PDF parser.

The page-turn audio is from the original MIT-licensed FlippyPDF distribution.
Flippy includes inline SVG icons rather than third-party icon fonts.
