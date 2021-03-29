const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
    '/it_Beleg.html',
    '/it_Beleg.js',
    '/manifest.json',
    '/sw.js',
    '/style.css'
];

self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(FILES_TO_CACHE);            
        })
    );    
});

self.addEventListener('message', function(event){
    if(event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', function(event){
    event.respondWith(caches.match(event.request).then(function(response){
            if(response) {
                return response;
            }
            return fetch(event.request).then(function(response){
                    if(!response || response.status !==200 || response.type !== 'basic'){
                        return response;
                    }
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME).then(function(cache){
                        cache.put(event.request, responseToCache);
                    });
                    return response;
            });
    }));
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['static-cache-v2'];
  
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
            }
        }));
    }));
    
    self.clients.claim();
});

