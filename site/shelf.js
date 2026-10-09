// Local library is a separate app module, never included in the embedding core.
let dbPromise;
function database() {
  if (!globalThis.indexedDB) return Promise.reject(new Error('Local book storage is unavailable in this browser.'));
  return dbPromise ||= new Promise((resolve, reject) => {
    const request = indexedDB.open('sela-library', 2);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains('books')) request.result.createObjectStore('books', { keyPath: 'id' });
      if (!request.result.objectStoreNames.contains('files')) request.result.createObjectStore('files', { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => { dbPromise = null; reject(request.error); };
  });
}
async function transaction(mode, operation, storeName = 'books') {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode); const request = operation(tx.objectStore(storeName));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = tx.onabort = () => reject(tx.error || request.error || new Error('Book storage failed.'));
  });
}
async function writeBook(book, bytes, remove = false) {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['books', 'files'], 'readwrite');
    if (remove) { tx.objectStore('books').delete(book.id); tx.objectStore('files').delete(book.id); }
    else { tx.objectStore('books').put(book); tx.objectStore('files').put({ id: book.id, bytes }); }
    tx.oncomplete = resolve; tx.onerror = tx.onabort = () => reject(tx.error || new Error('Book storage failed.'));
  });
}
async function bookBytes(book) {
  // Support the early development storage representation without deleting books.
  if (book.blob) return book.blob.arrayBuffer();
  const file = await transaction('readonly', store => store.get(book.id), 'files');
  if (!file?.bytes) throw new Error('Stored book content is missing. Import the original again.');
  return file.bytes;
}
export async function mountShelf(host, openBook, selectedFile, language) {
  const t = (en, id) => language() === 'id' ? id : en;
  const el = (tag, text, parent = host) => { const node = document.createElement(tag); node.textContent = text || ''; parent.appendChild(node); return node; };
  const status = el('p'); status.setAttribute('role', 'status');
  const add = el('button', t('Save selected book', 'Simpan buku pilihan')); add.type = 'button';
  const offline = el('button', t('Prepare offline reader', 'Siapkan pembaca offline')); offline.type = 'button';
  const list = el('div'); list.className = 'sela-shelf-books';
  async function refresh() {
    const books = await transaction('readonly', store => store.getAll()); list.replaceChildren();
    if (!books.length) el('p', t('Your shelf is waiting for its first story.', 'Rak ini menunggu cerita pertamanya.'), list);
    books.sort((a, b) => b.saved - a.saved).forEach(book => {
      const card = el('article', null, list); el('h3', book.name, card); el('p', `${book.format.toUpperCase()} · ${((book.size || book.blob?.size || 0) / 1048576).toFixed(2)} MiB`, card);
      const read = el('button', t('Read', 'Baca'), card); read.type = 'button'; read.onclick = async () => { try { await openBook({ ...book, bytes: await bookBytes(book) }); } catch (error) { status.textContent = error.message; } };
      const remove = el('button', t('Remove', 'Keluarkan'), card); remove.type = 'button'; remove.onclick = async () => {
        const backup = book;
        try {
          const bytes = await bookBytes(book); await writeBook(book, null, true); await refresh(); status.replaceChildren();
          status.appendChild(document.createTextNode(t('Removed from this shelf. ', 'Dikeluarkan dari rak. ')));
          const undo = el('button', t('Undo', 'Urungkan'), status); undo.type = 'button'; undo.onclick = async () => { try { await writeBook(backup, bytes); await refresh(); status.textContent = ''; } catch (error) { status.textContent = error.message; } };
        } catch (error) { status.textContent = error.message; }
      };
    });
  }
  add.onclick = async () => {
    const file = selectedFile(); if (!file) { status.textContent = t('Choose a document above first.', 'Pilih dokumen di atas terlebih dahulu.'); return; }
    if (file.size > 64 * 1048576) { status.textContent = t('Maximum book size: 64 MiB.', 'Ukuran buku maksimal: 64 MiB.'); return; }
    add.disabled = true;
    try {
      const bytes = await file.arrayBuffer();
      const hash = crypto.subtle ? Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('') : `${Date.now()}-${Math.random()}`;
      await writeBook({ id: 'sela:' + hash, name: file.name, format: file.name.split('.').pop().toLowerCase().replace(/^djv$/, 'djvu'), size: bytes.byteLength, saved: Date.now() }, bytes);
      status.textContent = t('Saved on this browser. Use offline preparation before disconnecting.', 'Tersimpan di browser ini. Siapkan pembaca offline sebelum memutus koneksi.'); await refresh();
    } catch (error) { status.textContent = t('Could not save: ', 'Tidak dapat menyimpan: ') + error.message; }
    finally { add.disabled = false; }
  };
  offline.onclick = async () => {
    offline.disabled = true;
    try {
      if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) throw new Error(t('Use the HTTPS web app for offline preparation. The extension already bundles its reader.', 'Gunakan aplikasi web HTTPS untuk persiapan offline. Reader extension sudah dibundel.'));
      status.textContent = t('Preparing reader assets; this downloads the optional PDF engine too…', 'Menyiapkan aset reader; mesin PDF opsional juga akan diunduh…');
      await navigator.serviceWorker.register('sela-sw.js'); const registration = await navigator.serviceWorker.ready;
      await new Promise((resolve, reject) => {
        const channel = new MessageChannel(); const timeout = setTimeout(() => reject(new Error('Offline preparation timed out. Retry while online.')), 120000);
        channel.port1.onmessage = event => { clearTimeout(timeout); channel.port1.close(); event.data.ok ? resolve() : reject(new Error(event.data.error)); };
        registration.active.postMessage({ type: 'prepare' }, [channel.port2]);
      });
      status.textContent = t('Offline reader ready. Your shelf stays on this browser. DjVu needs its external decoder online.', 'Pembaca offline siap. Rak tersimpan di browser ini. DjVu memerlukan decoder eksternal secara daring.');
    } catch (error) { status.textContent = error.message; }
    finally { offline.disabled = false; }
  };
  el('p', t('Books stay in IndexedDB on this browser. No account or upload. Browser storage can be cleared or evicted: keep your originals. Local voices work offline when supplied by your OS; DjVu is not bundled.', 'Buku tinggal di IndexedDB browser ini. Tanpa akun atau unggahan. Penyimpanan browser dapat terhapus: simpan berkas asli. Suara lokal dapat bekerja offline jika tersedia dari OS; DjVu tidak dibundel.'));
  await refresh();
}
