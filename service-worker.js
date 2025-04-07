// service-worker.js

const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/main.js',
    '/style.css',
    '/img2/about-darjeeling.webp',
    '/img2/explore-dalLake3.jpg.webp',
    '/img2/explore-profile.webp',
    '/img2/home-ayodhya.webp',
    '/img2/home-bg2.webp',
    '/img2/home-goa.webp',
    '/img2/home-jaisalmer.webp',
    '/img2/home-kashmir.webp',
    '/img2/home-Kedarnath.webp',
    '/img2/home-lake.webp',
    '/img2/home-Meghalaya.webp',
    '/img2/home-mountain.webp',
    '/img2/home-trees.webp',
    '/img2/home-varanasi.webp',
    '/img2/Jaipur-home.webp',
    '/img2/join-island.webp',
    '/img2/join-sunrise.webp',
    '/img2/landscape.webp',
    '/img2/Popular-GoldenTemple.webp',
    '/img2/popular-Hawa-Mahal.webp',
    '/img2/popular-Hawa-Mahal2.webp',
    '/img2/Popular-TajMahal.webp',
    '/img2/Popular-TajMahal2.webp',
    '/img2/Popular-TirupatiBalajiTemple.webp',
    '/img2/Popular-TirupatiBalajiTemple2.webp',
    '/img2/popular-TungnathTemple.webp',
    '/img2/popular-VictoriaMemorial.webp',
    '/img2/popular-VictoriaMemorial2.webp',

    // Add more assets like images, fonts
];

self.addEventListener('install', (event) => {
    // Cache resources
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching app shell...');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Clean up old caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        console.log('Removing old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Intercept fetch requests
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response or fetch from network
                return response || fetch(event.request);
            })
    );
});
