<button type="button" id="open-ebook" data-pdf="{{ route('ebooks.show', ['ebook' => $ebook->id]) }}">Read PDF</button>
<script src="https://cdn.jsdelivr.net/gh/bobbyfch/flippypdf@v2.0.0/dist/js/flippy.min.js"></script>
<script>
document.querySelector('#open-ebook').addEventListener('click', function () {
  new Flippy({ pdfUrl: this.dataset.pdf, title: 'E-book', trigger: this }).open();
});
</script>
