const C='worktrack-1795590563';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./fonts/hg-400.woff2','./fonts/hg-600.woff2','./fonts/hg-700.woff2','./fonts/hg-800.woff2'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});
  const net=fetch(e.request).then(r=>{if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(()=>null);
  if(hit){e.waitUntil(net);return hit}return (await net)||c.match('./index.html')}))});
