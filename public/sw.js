const CACHE_NAME = 'hesaplas-v5-pages-20260720'
const scopeUrl = new URL(self.registration.scope)
const BASE_PATH = scopeUrl.pathname.replace(/\/$/, '')
const withBase = (path) => `${BASE_PATH}${path}`
const APP_SHELL = [withBase('/'), withBase('/tum-araclar/'), withBase('/offline/'), withBase('/manifest.webmanifest'), withBase('/logo-192.png'), withBase('/logo-512.png')]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()))
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone()
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
      return response
    }).catch(async () => (await caches.match(request)) || caches.match(withBase('/offline/'))))
    return
  }

  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()))
        return response
      }).catch(() => cached)
      return cached || network
    }))
  }
})
