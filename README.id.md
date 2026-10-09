<p align="center"><img src="logo.svg" width="88" alt="Burung hijau FlippyPDF"></p>

# FlippyPDF 🌿

**Ceritamu. Ritme bacamu.** Reader web ringan dengan book flip, manga kanan ke kiri, webtoon tanpa jarak, dan mode satu halaman.

[English](README.md) · [Demo interaktif](https://bobbyfch.github.io/flippypdf/) · [Integrasi](docs/integrations.md) · [Format & batasan](docs/formats.md)

## ✨ Yang tersedia

- PDF dengan PDF.js yang baru dimuat saat diperlukan.
- EPUB berupa teks mengalir, bisa diseleksi, navigasi bab dan ukuran teks.
- CBZ berisi gambar komik; DjVu melalui decoder eksternal opsional.
- Zoom tombol, Ctrl + roda mouse, pinch trackpad/touch; zoom roda biasa bisa diaktifkan.
- Webtoon tanpa jarak, lipatan dengan easing halus, tekstur kertas opsional.
- Bookmark, progres tersimpan, filter warna, light/dark/system, reduced motion.
- Playground untuk mengganti parameter sebelum dan saat membaca.

Tanpa Bootstrap, jQuery, atau icon font wajib. Interface sekitar **21 KiB gzip**; adapter EPUB/CBZ sekitar **6 KiB gzip**, dimuat terpisah. Ukuran total tetap mengikuti renderer dan dokumen yang digunakan.

## 🚀 Pasang

```html
<script src="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.2.0/dist/js/flippy.min.js"></script>
<button id="baca">Baca cerita</button>
<script>
const reader = new Flippy({
  url: '/buku/cerita.pdf', mode: 'webtoon', pageGap: 0,
  theme: 'auto', paperTexture: true
});
document.querySelector('#baca').onclick = () => reader.open().catch(console.error);
</script>
```

CSS otomatis dimuat. URL berakhiran `.epub`, `.cbz`, `.djvu` dikenali otomatis; URL Blob, endpoint tanpa ekstensi dan byte data perlu `format` eksplisit. DjVu perlu `djvujsSrc` dari decoder GPL-2.0 yang kamu sediakan terpisah. EPUB tidak mendukung DRM, CSS penerbit atau fixed layout; CBZ mendukung gambar raster. Detail ada di [panduan format](docs/formats.md).

CI3, Laravel, Vue, React, Svelte, Angular, Astro, TypeScript dan HTML biasa punya [contoh integrasi](docs/integrations.md). Bootstrap/Tailwind tetap boleh digunakan aplikasi. CDN lama dan tag historis dipertahankan; pin versi untuk produksi.

## ⌨️ Shortcut

| Tombol | Fungsi |
| --- | --- |
| Panah / Page Up / Page Down | Pindah halaman atau bab; manga mengikuti RTL |
| Home / End | Awal / akhir |
| + / − / 0 | Perbesar / perkecil / reset |
| F / B / M | Fullscreen / bookmark / suara |
| ? / Escape | Bantuan / tutup bantuan atau reader |

File yang dipilih di demo diproses di browser tanpa diunggah. Progress/bookmark memakai localStorage bila tersedia. Browser lama mendapat jalur PDF asli melalui compatibility entry, bukan seluruh fitur modern. Pengujian memakai Edge/Chromium dan emulasi viewport mobile; belum menguji semua perangkat fisik.

MIT untuk FlippyPDF, PDFlipbook dan fflate; PDF.js Apache-2.0. Decoder DjVu eksternal GPL-2.0 tidak dibundel. [Lisensi pihak ketiga](THIRD_PARTY_NOTICES.md).

Kalau membantu proyekmu, ⭐ memudahkan orang lain menemukannya. Untuk laporan bug, sertakan contoh dokumen, browser, mode, dan langkah reproduksi.
