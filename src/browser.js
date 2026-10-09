import { createFlippyClass } from './flippy.js';

// Capture currentScript before any async operation; works under CDN aliases too.
const script = document.currentScript;
const base = script?.src ? new URL('../', script.src).href : 'https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.1.0/dist/';
window.Flippy = createFlippyClass(base);
