import Flippy from '../dist/js/flippy.esm.js';

// Call after the DOM exists. Importing this module itself remains SSR-safe.
export function registerFlippyElement(name = 'flippy-reader') {
  if (customElements.get(name)) return;
  customElements.define(name, class extends HTMLElement {
    connectedCallback() {
      if (this.viewer) return;
      this.viewer = new Flippy({ pdfUrl: this.getAttribute('src'), mode: this.getAttribute('mode') || 'book' });
      this.button = document.createElement('button');
      this.button.type = 'button'; this.button.textContent = this.getAttribute('label') || 'Read PDF';
      this.button.addEventListener('click', () => this.viewer.open().catch(error => {
        if (error.name !== 'AbortError') this.dispatchEvent(new CustomEvent('reader-error', { detail: error }));
      }));
      this.appendChild(this.button);
    }
    disconnectedCallback() { this.viewer?.destroy(); this.viewer = null; this.button?.remove(); }
  });
}
