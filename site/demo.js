'use strict';
let viewer;
let selectedUrl;
const status = document.querySelector('#status');
document.querySelector('#pdf-file').addEventListener('change', event => {
  viewer?.close();
  if (selectedUrl) URL.revokeObjectURL(selectedUrl);
  const file = event.target.files[0];
  selectedUrl = file ? URL.createObjectURL(file) : null;
  status.textContent = file ? `File lokal: ${file.name}` : 'Demo memakai example/limarayamusic.pdf.';
});
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', async () => {
  viewer?.close();
  viewer = new Flippy({
    pdfUrl: selectedUrl || 'example/limarayamusic.pdf',
    title: selectedUrl ? document.querySelector('#pdf-file').files[0].name : 'Limaraya Music',
    mode: button.dataset.mode,
    theme: document.querySelector('#theme').value,
    trigger: button,
    soundEnabled: false,
    onPageError: () => { status.textContent = 'Ada halaman yang gagal dirender; coba halaman lain.'; }
  });
  status.textContent = 'Memuat reader…';
  try { await viewer.open(); status.textContent = `${viewer.totalPages} halaman · ${button.dataset.mode}`; }
  catch (error) { if (error.name !== 'AbortError') status.textContent = `PDF gagal dibuka: ${error.message}`; }
}));
