const CACHE = 'sela-reader-3.0.0';
const root = new URL('./', self.location.href);
const asset = path => new URL(path, root).href;
self.addEventListener('install', event => { event.waitUntil(self.skipWaiting()); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('message', event => {
  if (event.data?.type !== 'prepare') return;
  event.waitUntil((async () => {
    try {
      const response = await fetch(asset('site/offline-assets.json'), { cache: 'no-store' });
      if (!response.ok) throw new Error('Offline asset manifest unavailable');
      const files = await response.json(); const cache = await caches.open(CACHE);
      // Sequential batches bound concurrent network and memory use.
      for (let i = 0; i < files.length; i += 8) await cache.addAll(files.slice(i, i + 8).map(asset));
      event.ports[0]?.postMessage({ ok: true });
    } catch (error) { event.ports[0]?.postMessage({ ok: false, error: error.message }); }
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = event.request.mode === 'navigate' ? asset('index.html') : event.request;
    // Network first for the app avoids trapping readers on an old release.
    if (event.request.mode === 'navigate') { try { return await fetch(event.request); } catch { const page = await cache.match(key); if (page) return page; throw new Error('Reader has not been prepared offline'); } }
    const hit = await cache.match(key); return hit || fetch(event.request);
  })());
});
