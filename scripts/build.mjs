import { build, transform } from 'esbuild';
import { mkdir, copyFile, cp, readFile, writeFile, stat, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';

const banner = '/*! Sela v3.0.0 (FlippyPDF compatible) | MIT Bobby Fajar Christian | PDFlipbook MIT Symple NZ | see THIRD_PARTY_NOTICES.md */';
const copyText = async (source, target) => writeFile(target, (await readFile(source, 'utf8')).replace(/\r\n/g, '\n'));
for (const dir of ['dist/js', 'dist/css', 'dist/types', 'dist/vendor/pdfjs/build', 'dist/vendor/pdfjs/legacy/build']) await mkdir(dir, { recursive: true });
await build({ entryPoints: ['src/browser.js'], outfile: 'dist/js/flippy.min.js', bundle: true, minify: true, format: 'iife', target: 'es2020', banner: { js: banner }, legalComments: 'none' });
await build({ entryPoints: ['src/module.js'], outfile: 'dist/js/flippy.esm.js', bundle: true, minify: true, format: 'esm', target: 'es2020', banner: { js: banner }, legalComments: 'none' });
for (const [name,entry] of [['archive','src/archive.js'],['djvu','src/djvu.js']]) await build({entryPoints:[entry],outfile:'dist/js/flippy.'+name+'.js',bundle:true,minify:true,format:'esm',target:'es2020',legalComments:'none'});
for (const [name,entry] of [['tools','src/reading-tools.js'],['text','src/text.js']]) await build({entryPoints:[entry],outfile:'dist/js/sela.'+name+'.js',bundle:true,minify:true,format:'esm',target:'es2020',legalComments:'none'});
for(const name of ['min','esm'])await copyFile('dist/js/flippy.'+name+'.js','dist/js/sela.'+name+'.js');
await copyFile('node_modules/fflate/LICENSE','dist/fflate-LICENSE.txt');
const css = await transform(await readFile('src/flippy.css', 'utf8'), { loader: 'css', minify: true });
await writeFile('dist/css/flippy.min.css', `${banner}\n${css.code}`);
await copyText('src/index.d.ts', 'dist/types/index.d.ts');
await copyText('src/index.d.ts', 'dist/js/flippy.esm.d.ts');
await copyText('src/index.d.ts','dist/js/sela.esm.d.ts');
await copyText('site/index.html', 'index.html');
await copyText('src/compat.js', 'dist/js/flippy.compat.js');
await copyText('src/compat.js', 'dist/js/sela.compat.js');
for (const folder of ['build', 'legacy/build']) {
  for (const file of ['pdf.min.mjs', 'pdf.worker.min.mjs']) await copyFile(`node_modules/pdfjs-dist/${folder}/${file}`, `dist/vendor/pdfjs/${folder}/${file}`);
}
for (const folder of ['cmaps', 'standard_fonts']) await cp(`node_modules/pdfjs-dist/${folder}`, `dist/vendor/pdfjs/${folder}`, { recursive: true });
await copyFile('node_modules/pdfjs-dist/LICENSE', 'dist/vendor/pdfjs/LICENSE');
await copyFile('licenses/PDFlipbook-MIT.txt', 'dist/PDFlipbook-LICENSE.txt');
const manifest = { version: '3.0.0', pdfjs: '4.10.38', assets: {} };
for (const path of ['dist/js/flippy.min.js', 'dist/js/flippy.esm.js', 'dist/js/flippy.compat.js', 'dist/js/flippy.archive.js', 'dist/js/flippy.djvu.js', 'dist/js/sela.min.js', 'dist/js/sela.tools.js', 'dist/js/sela.text.js', 'dist/css/flippy.min.css', 'dist/sound/turnPage.mp3', 'dist/vendor/pdfjs/build/pdf.min.mjs', 'dist/vendor/pdfjs/build/pdf.worker.min.mjs']) {
  const data = await readFile(path);
  manifest.assets[path] = { bytes: (await stat(path)).size, gzip: gzipSync(data).length, sha256: createHash('sha256').update(data).digest('hex') };
}
await writeFile('dist/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(manifest, null, 2));

async function walk(folder){const files=[];for(const item of await readdir(folder,{withFileTypes:true})){const name=folder+'/'+item.name;if(item.isDirectory())files.push(...await walk(name));else files.push(name);}return files;}
const offlineFiles=['index.html','logo.svg','favicon.svg','favicon.png','site/icon-192.png','site/icon-512.png','site/demo.js','site/demo.css','site/shelf.js','site/flag-en.svg','site/flag-id.svg','manifest.webmanifest',...await walk('dist'),...await walk('example')];
await writeFile('site/offline-assets.json',JSON.stringify(offlineFiles.sort())+'\n');
