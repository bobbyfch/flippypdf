import Flippy, { type FlippyOptions } from '../../dist/types/index.js';
const options: FlippyOptions = { pdfUrl: '/media/ebook/42', mode: 'webtoon', withCredentials: true, onPageChange: detail => console.log(detail.page) };
const reader = new Flippy(options);
reader.open().then(instance => instance.goTo(3).zoomIn().next());
reader.addEventListener('close', () => reader.destroy());
