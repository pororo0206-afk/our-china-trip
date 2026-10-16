const CACHE = 'cornies-getaway-static-v6';
const CORE = [
  './','./index.html','./styles.css','./app.js','./data.js','./config.js',
  './manifest.webmanifest','./assets/favicon.svg','./assets/canton-illustration.svg',
  './assets/oldtown-illustration.svg','./assets/qianhai-reference.webp',
  './assets/spot-airport.svg',
  './assets/spot-bar.svg',
  './assets/spot-beijing.svg',
  './assets/spot-bikini.svg',
  './assets/spot-cafe.svg',
  './assets/spot-cathedral.svg',
  './assets/spot-chen.svg',
  './assets/spot-chentianji.svg',
  './assets/spot-clams.svg',
  './assets/spot-coco.svg',
  './assets/spot-coconut.svg',
  './assets/spot-cruise.svg',
  './assets/spot-dafo.svg',
  './assets/spot-delivery.svg',
  './assets/spot-diandude.svg',
  './assets/spot-dinner.svg',
  './assets/spot-dong.svg',
  './assets/spot-electronics.svg',
  './assets/spot-fei.svg',
  './assets/spot-flight.svg',
  './assets/spot-gelato.svg',
  './assets/spot-goose.svg',
  './assets/spot-gzrestaurant.svg',
  './assets/spot-holiday.svg',
  './assets/spot-hotel.svg',
  './assets/spot-jufulou.svg',
  './assets/spot-laihui.svg',
  './assets/spot-lunch.svg',
  './assets/spot-lunch2.svg',
  './assets/spot-mart.svg',
  './assets/spot-miniso.svg',
  './assets/spot-dessertRun.svg',
  './assets/spot-hotelDrop.svg',
  './assets/spot-dessertParty.svg',
  './assets/spot-miao.svg',
  './assets/spot-museum.svg',
  './assets/spot-one.svg',
  './assets/spot-packing.svg',
  './assets/spot-panxi.svg',
  './assets/spot-peizheng.svg',
  './assets/spot-picnic.svg',
  './assets/spot-rail.svg',
  './assets/spot-returnrail.svg',
  './assets/spot-seafoodalt.svg',
  './assets/spot-shamian.svg',
  './assets/spot-spa.svg',
  './assets/spot-starbucks.svg',
  './assets/spot-taodinner.svg',
  './assets/spot-taolunch.svg',
  './assets/spot-taotao.svg',
  './assets/spot-tower.svg',
  './assets/spot-xiaobing.svg',
  './assets/spot-xugu.svg',
  './assets/spot-yong.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => {
    const fresh=fetch(event.request).then(response => {
      if(response.ok){const clone=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,clone));}
      return response;
    }).catch(()=>cached);
    return cached||fresh;
  }));
});
