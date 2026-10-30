// Versão do cache: troque o número a cada atualização do app para o celular baixar a nova versão.
const VERSAO = 'extracao-v9';
const ARQUIVOS = ['./', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO && k !== 'fontes').map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Fontes do Google: guarda na primeira visita para funcionar offline depois
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.open('fontes').then(async c => {
      const hit = await c.match(e.request);
      const rede = fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || rede;
    }));
    return;
  }
  // App: responde do cache e atualiza em segundo plano
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => {
    const rede = fetch(e.request).then(r => {
      if (r.ok && url.origin === location.origin) caches.open(VERSAO).then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() => hit || caches.match('index.html'));
    return hit || rede;
  }));
});
