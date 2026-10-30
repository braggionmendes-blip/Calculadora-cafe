// Versão do cache: troque o número a cada atualização do app.
const VERSAO = 'extracao-v21';
const ARQUIVOS = ['./', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO && k !== 'fontes').map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.open('fontes').then(async c => {
      const hit = await c.match(req);
      const rede = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || rede;
    }));
    return;
  }
  // Página: busca sempre a versão mais nova na internet; sem internet, usa a cópia guardada
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    e.respondWith(fetch(req, {cache: 'no-store'}).then(r => {
      if (r.ok) { const cp = r.clone(); caches.open(VERSAO).then(c => c.put('index.html', cp)); }
      return r;
    }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req)));
});
