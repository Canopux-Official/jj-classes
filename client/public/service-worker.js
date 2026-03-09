// public/service-worker.js

// Increment this version whenever you deploy new code
const CACHE_NAME = 'my-app-cache-v2';

// Assets to cache (static files only, do NOT cache index.html)
const urlsToCache = [
  '/manifest.json',
  '/icons/pwa-192x192.png',
  '/icons/pwa-512x512.png',
  // Add any other static assets here (images, fonts)
];

// Install service worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate service worker and remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim(); // Take control of all pages immediately
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Network-first strategy for JS/CSS (always get latest)
  if (url.endsWith('.js') || url.endsWith('.css')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          caches.open(CACHE_NAME).then((cache) =>
            cache.put(event.request, response.clone())
          );
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first strategy for other static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});