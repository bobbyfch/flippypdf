import { mkdir, cp, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { zipSync } from 'fflate';
// No host permissions, content scripts, remote code, telemetry or file interception.
const output = resolve('.git/sela-extension');
for (const browser of ['chromium', 'firefox']) {
  const folder = `${output}/${browser}`; await mkdir(folder, { recursive: true });
  for (const name of ['dist', 'site', 'example', 'index.html', 'logo.svg', 'favicon.svg', 'favicon.png', 'LICENSE', 'THIRD_PARTY_NOTICES.md']) await cp(name, `${folder}/${name}`, { recursive: true });
  let html = await readFile(`${folder}/index.html`, 'utf8');
  html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '').replace('<option value="djvu">Green valley · DjVu</option>', '');
  await writeFile(`${folder}/index.html`, html.replace(/,\.djvu,\.djv/g, ''));
  let demo = await readFile(`${folder}/site/demo.js`, 'utf8');
  demo = demo.replace("if(file&&(","if(file&&/\\.(djvu|djv)$/i.test(file.name)){status.textContent='DjVu requires an external decoder and is not available in this extension.';return;}\n if(file&&(");
  await writeFile(`${folder}/site/demo.js`, demo);
  await writeFile(`${folder}/background.js`, "const api = globalThis.browser || globalThis.chrome; api.action.onClicked.addListener(() => api.tabs.create({url:api.runtime.getURL('index.html')}));\n");
  const manifest = {
    manifest_version: 3, name: 'Sela — local bookshelf', version: '3.0.0',
    description: 'A quiet place for books. Read PDF, EPUB, comics and text from your own local shelf.',
    icons: { '192': 'site/icon-192.png' },
    action: { default_title: 'Open Sela bookshelf' },
    background: browser === 'firefox' ? { scripts: ['background.js'] } : { service_worker: 'background.js' },
    content_security_policy: { extension_pages: "script-src 'self'; object-src 'none';" },
    ...(browser === 'firefox' ? { browser_specific_settings: { gecko: { id: 'sela-reader@bobbyfch.github.io', strict_min_version: '140.0', data_collection_permissions: { required: ['none'] } } } } : {})
  };
  await writeFile(`${folder}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
  const files = {};
  async function walk(path, prefix = '') { for (const entry of await readdir(path)) { const file = `${path}/${entry}`, name = prefix + entry; if ((await stat(file)).isDirectory()) await walk(file, name + '/'); else files[name] = new Uint8Array(await readFile(file)); } }
  await walk(folder); const bytes = zipSync(files, { level: 6 });
  await writeFile(`${output}/sela-${browser}-3.0.0.zip`, bytes); console.log(`${browser}: ${folder} (${bytes.length} ZIP bytes)`);
}
