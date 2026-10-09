import Flippy, { type FlippyOptions } from '../dist/js/flippy.esm.js';
const options: FlippyOptions = {
  pdfUrl: '/api/ebooks/42',
  mode: 'book',
  assetBase: 'https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.1.0/dist/',
  onPageChange: ({ page }) => console.log(page)
};
const viewer = new Flippy(options);
await viewer.open();
// Call viewer.destroy() when your component/route unmounts.
