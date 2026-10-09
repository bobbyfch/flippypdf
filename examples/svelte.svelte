<script lang="ts">
  import { onMount } from 'svelte';
  import Flippy from 'flippypdf';
  let viewer: Flippy | undefined;
  let error = '';
  onMount(() => {
    viewer = new Flippy({ pdfUrl: '/story.pdf', mode: 'webtoon' });
    return () => viewer?.destroy();
  });
  function read() {
    viewer?.open().catch(e => { if (e.name !== 'AbortError') error = e.message; });
  }
</script>
<button type="button" on:click={read}>Read PDF</button>
<p role="status">{error}</p>
