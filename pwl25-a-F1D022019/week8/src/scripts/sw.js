const CACHE_NAME = 'MovieCatalogue-V1';
const APP_SHELL = ['/']; // minimal safe app shell

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        )
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) {
                event.waitUntil(
                    fetch(event.request)
                        .then((fresh) =>
                            caches.open(CACHE_NAME).then((c) => c.put(event.request, fresh.clone()))
                        )
                        .catch(() => {})
                );
                return cached;
            }
            return fetch(event.request)
                .then((resp) =>
                    caches.open(CACHE_NAME).then((c) => {
                        c.put(event.request, resp.clone());
                        return resp;
                    })
                )
                .catch(() => caches.match('/'));
        })
    );
});
