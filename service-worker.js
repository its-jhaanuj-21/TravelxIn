const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/main.js',
    '/style.css',
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
