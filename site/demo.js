(function () {
'use strict';
var viewer, selectedUrl;
var status = document.querySelector('#status');
var theme = document.querySelector('#theme');
var language = document.querySelector('#language');
var translations = {
eyebrow:'SEDIKIT SETUP. BANYAK CERITA.',headline:'PDF milikmu.<br>Ritme bacamu.',intro:'Balik halaman. Ikuti cerita. Temukan fokus.<br>Reader hijau kecil yang menyatu dengan aplikasimu.',try:'Coba pembacanya ↓',original:'CERITA PENDEK BERILUSTRASI ORISINAL',storySub:'Rumah untuk cerita yang belum selesai',demoEyebrow:'NYAMANKAN DIRIMU',demoHeading:'Empat jalan menuju cerita.',lazy:'Mesin PDF dimuat hanya saat membaca.',bookTitle:'Balik halamannya.',bookText:'Lipatan kertas, bayangan lembut, dan dua halaman seperti buku.',webtoonTitle:'Ikuti ceritanya.',webtoonText:'Baca vertikal. Halaman terdekat dirender saat kamu menggulir.',singleTitle:'Satu halaman dulu.',singleText:'Satu halaman, lebih fokus. Nyaman juga di layar kecil.',mangaTitle:'Mulai dari kanan.',mangaText:'Balik halaman dan tombol panah kanan ke kiri. Urutan PDF tetap.',read:'Mulai membaca ↗',upload:'Atau coba PDF milikmu',privacy:'File tetap di browsermu. Tanpa upload, akun, atau pelacakan.',download:'Unduh cerita Limaraya 8 halaman ↗',installTitle:'Menyatu dengan stack kamu.',installText:'CI3, Laravel, Vue, React, Svelte, Astro, atau HTML biasa. Bootstrap dan Tailwind boleh dipakai, keduanya tidak wajib.',docs:'Panduan pemasangan & integrasi ↗',filtersTitle:'Ruang baca lebih nyaman',filtersText:'Warna asli, hitam putih, sepia, kontras tinggi, serta warna hangat dan dingin. Warna netral bisa membantu saat warna sulit dibedakan; kebutuhan tiap orang berbeda.',compatTitle:'Tetap ada jalan membaca',compatText:'Browser modern mendapat viewer lengkap. Browser lama membuka PDF asli melalui compatibility entry. Dukungan Windows, macOS, Linux, Android, dan iOS mengikuti kemampuan browser.',openTitle:'Open source, asal jelas',openText:'Reader MIT, mesin halaman PDFlipbook, dan PDF.js Apache-2.0 yang dimuat saat dibutuhkan. Navigasi keyboard, progres tersimpan, dan bookmark tersedia.',themeLabel:'Tampilan'};
var nodes = document.querySelectorAll('[data-i18n]');
var original = [];
for (var i=0;i<nodes.length;i++) original.push(nodes[i].innerHTML);
function save(key,value){try{localStorage.setItem('flippy-site:'+key,value);}catch(e){}}
function read(key,fallback){try{return localStorage.getItem('flippy-site:'+key)||fallback;}catch(e){return fallback;}}
function localize(){
 var id=language.value==='id';document.documentElement.lang=id?'id':'en';
 for(var i=0;i<nodes.length;i++) nodes[i].innerHTML=id?(translations[nodes[i].getAttribute('data-i18n')]||original[i]):original[i];
 theme.options[0].text=id?'Sistem':'System';theme.options[1].text=id?'Terang':'Light';theme.options[2].text=id?'Gelap':'Dark';theme.setAttribute('aria-label',id?'Tampilan':'Appearance');
 save('language',language.value);
}
function applyTheme(){document.documentElement.setAttribute('data-theme',theme.value);save('theme',theme.value);if(viewer&&viewer.overlay)viewer.overlay.setAttribute('data-flippy-theme',theme.value);}
theme.value=/^(auto|light|dark)$/.test(read('theme','auto'))?read('theme','auto'):'auto';
language.value=read('language','en')==='id'?'id':'en';localize();applyTheme();
theme.addEventListener('change',applyTheme);language.addEventListener('change',localize);
document.querySelector('#pdf-file').addEventListener('change',function(event){
 if(viewer)viewer.close();if(selectedUrl)URL.revokeObjectURL(selectedUrl);
 var file=event.target.files[0];selectedUrl=file?URL.createObjectURL(file):null;
 status.textContent=file?file.name:'';
});
if(!window.URL||!URL.createObjectURL)document.querySelector('#pdf-file').disabled=true;
var buttons=document.querySelectorAll('[data-mode]');
function open(button){
 if(viewer)viewer.close();
 if(window.Flippy&&Flippy.supported===false){window.location.assign(selectedUrl||'example/limarayamusic.pdf');return;}
 var run=function(){
  viewer=new Flippy({pdfUrl:selectedUrl||'example/limarayamusic.pdf',title:selectedUrl?document.querySelector('#pdf-file').files[0].name:'Limaraya · Rumah untuk cerita yang belum selesai',mode:button.getAttribute('data-mode'),theme:theme.value,trigger:button,soundEnabled:false,onPageError:function(){status.textContent=language.value==='id'?'Halaman gagal dirender. Coba halaman lain.':'A page could not render. Try another page.';}});
  status.textContent=language.value==='id'?'Memuat reader…':'Loading reader…';
  viewer.open().then(function(){status.textContent=viewer.totalPages+' '+(language.value==='id'?'halaman':'pages')+' · '+button.getAttribute('data-mode');}).catch(function(error){if(error.name!=='AbortError')status.textContent=error.message;});
 };
 if(window.FlippyReady)window.FlippyReady.then(run).catch(function(error){status.textContent=error.message;});else run();
}
for(var j=0;j<buttons.length;j++)(function(button){button.addEventListener('click',function(){open(button);});})(buttons[j]);
window.addEventListener('pagehide',function(){if(viewer)viewer.destroy();if(selectedUrl)URL.revokeObjectURL(selectedUrl);});
})();
