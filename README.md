<p align="center"><img src="README.png" width="160" alt="FlippyPDF"></p>

# FlippyPDF 2.0

PDF reader dengan **book flip, webtoon, dan single page**. Core vanilla JavaScript,
inline SVG, tanpa Bootstrap, jQuery, atau icon font. PDF.js tetap menjadi mesin
PDF internal, dimuat otomatis ketika reader dibuka.

[Demo GitHub Pages](https://bobbyfch.github.io/flippypdf/) ·
[Integrations](docs/integrations.md) · [Migration](docs/release-v2.md) ·
[Changelog](CHANGELOG.md) · [MIT license](LICENSE)

## Quick start: CDN

Tidak perlu memasang atau menginisialisasi PDF.js sendiri.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.0.0/dist/css/flippy.min.css">
<script src="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.0.0/dist/js/flippy.min.js"></script>
<button type="button" id="read">Baca PDF</button>
<script>
const viewer = new Flippy({
  pdfUrl: '/media/ebook/42',
  title: 'My book',
  mode: 'book',
  theme: 'auto'
});
document.querySelector('#read').addEventListener('click', () => viewer.open());
</script>
```

Stylesheet juga dimuat otomatis saat open jika belum disertakan. Menyertakan
link CSS di atas memberi kontrol CSP dan loading lebih jelas. Jalur CDN JS,
CSS, dan sound lama dipertahankan. Tag v1 tidak diubah; v2.0.0 adalah branch
snapshot rilis, bukan penggantian tag lama. Gunakan ref/commit yang sudah diuji
untuk production. URL tanpa versi mengikuti perkembangan repository dan cache CDN.

## ESM / TypeScript

Paket belum diterbitkan otomatis ke npm registry. Gunakan ref GitHub:

```sh
npm install github:bobbyfch/flippypdf#v2.0.0
```

```ts
import Flippy, { type FlippyOptions } from 'flippypdf';
const options: FlippyOptions = {
  pdfUrl: '/api/ebook/42',
  mode: 'single',
  assetBase: 'https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.0.0/dist/'
};
const viewer = new Flippy(options);
await viewer.open();
viewer.goTo(3);
// Saat component/route dilepas:
viewer.destroy();
```

Raw ESM: `dist/js/flippy.esm.js`. Import dan constructor aman saat SSR;
`open()` memerlukan DOM dan dipanggil setelah mount. Bundler memakai CDN
pinned sebagai default asset; self-hosting memerlukan seluruh folder dist dan
`assetBase` yang menunjuk URL folder tersebut.

## Features

- Book flip: corner fold, bayangan kertas, zoom/pan, fullscreen, keyboard.
- Single page otomatis untuk layar sempit; webtoon untuk scroll vertikal.
- Thumbnail saat sidebar diperlukan, bookmark, progres, page jump, resume posisi.
- Light/dark/auto, reduced motion, focus restoration, dan suara opsional.
- URL tanpa suffix .pdf, binary PDF data, headers, credentials, dan password.
- Pembatalan loading/render saat destroy; batas pixel canvas untuk memori.
- Optional Vue 3 adapter; contoh CI3, Laravel, TypeScript, Bootstrap/Tailwind.

Satu modal aktif pada satu waktu. Membuka instance lain menutup reader sebelumnya.
Text selection/search, annotation, dan pengisian form PDF belum tersedia.
Default string UI memakai Bahasa Indonesia; mode webtoon memiliki label navigasi
English. Belum ada klaim multi-language viewer penuh.

## API

```js
await viewer.open(); // document ready; reject jika gagal / AbortError saat ditutup
viewer.next(); viewer.prev(); viewer.goTo(5);
viewer.firstPage(); viewer.lastPage();
viewer.zoomIn(); viewer.zoomOut(); viewer.setZoom(2);
viewer.toggleFullscreen();
viewer.currentPage(); viewer.totalPages;
viewer.close(); viewer.destroy(); // aman dipanggil berulang
viewer.addEventListener('pagechange', event => console.log(event.detail.page));
viewer.addEventListener('error', event => console.error(event.detail.error));
```

Alias lama: nextPage, prevPage, goToPage. Events: ready, pagechange, pageerror,
error, close. Callback: onReady, onPageChange, onPageError, onError, onClose.

| Option | Default / fungsi |
| --- | --- |
| pdfUrl / url | URL HTTP(S)/blob; atau gunakan data |
| data | ArrayBuffer / Uint8Array, disalin sebelum diproses |
| mode | book / single / webtoon; default book |
| title | Judul reader; default E-book |
| theme | auto / light / dark |
| startPage | Posisi awal; default posisi tersimpan atau 1 |
| soundEnabled | Preferensi tersimpan; suara awal mati pada reduced motion |
| soundUrl | Asset audio Flippy, relatif ke base distribusi |
| assetBase | Base asset CDN/self-hosted, berakhiran slash |
| cssUrl / autoStyles | Override stylesheet / false jika dikelola aplikasi |
| pdfBuild | modern atau legacy dari PDF.js versi yang sama |
| pdfjsSrc / pdfWorkerSrc | Override module + worker dari versi yang cocok |
| pdfjsLib | Engine yang telah dimuat dan dikonfigurasi aplikasi |
| maxScale | 1.75, dibatasi 0.5–3 |
| maxCanvasPixels | 2,500,000 per canvas; batas konfigurasi 250,000–8,000,000 |
| duration | 560ms, otomatis 0 pada reduced motion |
| id / storagePrefix | Kunci resume/bookmark; default prefix flippy: |
| httpHeaders / withCredentials | Akses endpoint PDF aplikasi |
| password | Password PDF bila diperlukan |
| zIndex | 12010, dapat disesuaikan |
| cMapUrl / standardFontDataUrl | Default asset PDF.js dalam dist |

Opsi render/sizing v1 masih diterima, tetapi perilaku numeriknya berubah.
Lihat [migration notes](docs/release-v2.md) sebelum mengganti production.

Keyboard saat stage fokus: ←/→, PageUp/PageDown, Home/End, +/-; Esc menutup
modal. Engine book juga menyediakan F untuk fullscreen. Tab tetap dalam modal.

## Performance and browser support

Build viewer JS+CSS sekitar **21 KiB gzip**, di luar suara dan mesin PDF.
PDF.js 4.10.38 module+worker sekitar **491 KiB gzip**, lazy-loaded. Gzip dihitung
lokal; transfer nyata bergantung pada server/CDN. Manifest ukuran/hash berada
di `dist/manifest.json`. CDN tidak otomatis membuat PDF lebih kecil.

Target: browser evergreen dengan ES2020, module workers, ResizeObserver,
IntersectionObserver, dan Pointer Events. Legacy build PDF.js membantu browser
yang belum memiliki API modern tertentu; bukan jaminan untuk IE atau seluruh
browser lama. Local automation memakai Chromium/Edge. Safari/iOS dan Firefox
perlu validasi perangkat tersendiri sebelum dijanjikan sebagai tested support.

## Development

Node.js 20+.

```sh
npm ci
npm run build
npm test
npm run test:types
npx playwright install chromium
npm run test:browser
npm run serve
```

Demo: http://127.0.0.1:4173. Di Windows yang memiliki Edge, test lokal memakai
Edge headless. CI memakai Chromium. Source berada di src; build deterministik
menghasilkan dist, tipe, asset PDF.js, dan manifest. GitHub Pages menyajikan
demo statis dari index.html / site / dist / example.

## Troubleshooting

- Gunakan HTTP server, bukan file://.
- PDF berbeda origin memerlukan CORS; private PDF tetap di endpoint aplikasi.
- Module dan worker PDF.js harus dari versi yang sama.
- CDN worker membutuhkan worker-src blob:; lihat panduan CSP pada integrations.
- Jika loading gagal, viewer memberikan tautan membuka PDF langsung.
- Source viewer memuat PDF sebagai canvas; fitur PDF.js viewer lengkap tidak tersedia.

## License and credits

MIT: Bobby Fajar Christian. Book engine berbasis PDFlipbook MIT, Symple NZ.
PDF.js: Mozilla dan kontributor, Apache-2.0. Lisensi pihak ketiga tetap dibawa
dalam distribusi; lihat [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
