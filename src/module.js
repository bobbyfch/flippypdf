import { createFlippyClass, VERSION } from './flippy.js';
// Bundlers relocate this module; they do not automatically copy PDF.js assets.
// A direct dist import stays self-hosted; a bundled import defaults to the
// pinned CDN release, with assetBase available for explicit offline hosting.
const directDist = /\/dist\/js\/flippy\.esm\.js(?:[?#]|$)/.test(import.meta.url);
const Flippy = createFlippyClass(directDist ? new URL('../', import.meta.url).href : 'https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.2.0/dist/');
export { Flippy, VERSION };
export default Flippy;
