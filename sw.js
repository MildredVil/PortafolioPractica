const CACHE_NAME = 'v1_cache_mi_pwa';

const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './img/mvr_16x16.png',
    './img/mvr_32x32.png',
    './img/mvr_64x64.png',
    './img/mvr_96x96.png',
    './img/mvr_124x124.png',
    './img/mvr_128x128.png',
    './img/mvr_144x144.png',
    './img/mvr_192x192.png',
    './img/mvr_256x256.png',
    './img/mvr_384x384.png',
    './img/mvr_512x512.png',
    './img/mvr_1024x1024.png',
    './main.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//evento activar
//se encarga de la activaciotn del service worker y de la limpieza de caches antiguas
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                //recorrer los nombres de las caches
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        //eliminar caches que no se necesitan o ya no existan en la cache
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
        self.clients.claim();
    })
    );
});
//Response con los recursos en cache
self.addEventListener('fetch', e => {
    e.respondWidth(
        caches.match(e.request)
        .then(response => {
            if(response){
                // Si hay respuesta
        
            return response;

        }
        return fetch(e.request);
    })
    );
});




