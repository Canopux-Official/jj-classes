// public/service-worker.js

// Change this cache version on every deploy
const CACHE_NAME = 'my-app-cache-v2';

// Static assets to cache (do not include index.html)
const urlsToCache = [
  '/manifest.json',
  '/icons/pwa-192x192.png',
  '/icons/pwa-512x512.png',
  // Add other static assets like images/fonts here
];

// Install SW and cache static assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate SW and remove old caches
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

  // Handle navigation requests (HTML pages) -> fallback to index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Network-first strategy for JS/CSS to always get latest version
  if (url.endsWith('.js') || url.endsWith('.css')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Clone response before caching
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first strategy for other static assets (images, icons)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});