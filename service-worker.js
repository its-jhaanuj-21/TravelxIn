const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/main.js',
    '/service-worker.js',

    // Image Assets
    '/assets/img2/about-darjeeling.webp',
    '/assets/img2/explore-dalLake3.jpg.webp',
    '/assets/img2/explore-profile.webp',
    '/assets/img2/home-ayodhya.webp',
    '/assets/img2/home-bg2.webp',
    '/assets/img2/home-goa.webp',
    '/assets/img2/home-jaisalmer.webp',
    '/assets/img2/home-kashmir.webp',
    '/assets/img2/home-Kedarnath.webp',
    '/assets/img2/home-lake.webp',
    '/assets/img2/home-Meghalaya.webp',
    '/assets/img2/home-mountain.webp',
    '/assets/img2/home-trees.webp',
    '/assets/img2/home-varanasi.webp',
    '/assets/img2/Jaipur-home.webp',
    '/assets/img2/join-island.webp',
    '/assets/img2/join-sunrise.webp',
    '/assets/img2/landscape.webp',
    '/assets/img2/Popular-GoldenTemple.webp',
    '/assets/img2/popular-Hawa-Mahal.webp',
    '/assets/img2/popular-Hawa-Mahal2.webp',
    '/assets/img2/Popular-TajMahal.webp',
    '/assets/img2/Popular-TajMahal2.webp',
    '/assets/img2/Popular-TirupatiBalajiTemple.webp',
    '/assets/img2/Popular-TirupatiBalajiTemple2.webp',
    '/assets/img2/popular-TungnathTemple.webp',
    '/assets/img2/popular-VictoriaMemorial.webp',
    '/assets/img2/popular-VictoriaMemorial2.webp',
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache);
      })
    );
  });
  
  // Fetch event
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        // Return cached response or fetch from network
        return response || fetch(event.request);
      })
    );
  });
  
  // Activate event
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
    );
  });