const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/main.js',
    '/service-worker.js',
    '/README.md',
    '/Screenshoot1-TravelxIn.png',

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

// Install - cache files
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching assets...');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Activate immediately
});

// Activate - cleanup old cache and notify
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => {
            return self.registration.showNotification('🔁 TravelXIn Updated!', {
                body: 'New content is available. Refresh the page to see updates.',
                icon: '/assets/img2/home-bg2.webp',
                badge: '/assets/img2/home-goa.webp',
                vibrate: [100, 50, 100],
            });
        })
    );
});

// Fetch - serve from cache first
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Notification click - refresh tab or open new one
// self.addEventListener('notificationclick', (event) => {
//     event.notification.close();
//     event.waitUntil(
//         clients.matchAll({ type: 'window' }).then((clientList) => {
//             for (const client of clientList) {
//                 if ('focus' in client) return client.focus();
//             }
//             if (clients.openWindow) {
//                 return clients.openWindow('/');
//             }
//         })
//     );
// });
