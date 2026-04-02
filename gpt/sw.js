const CACHE_NAME = 'janith-gpt-app-v2';
const urlsToCache = [
  './index.html',
  './gpt-style.css',
  '../other images/logo.png'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch Event with Redirect Support
self.addEventListener('fetch', event => {
  // Skip cross-origin requests and non-GET requests (like your AI API)
  if (!event.request.url.startsWith(self.location.origin) || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      // Force "follow" on redirects to prevent the network error you saw
      return fetch(event.request, { redirect: 'follow' })
        .then(networkResponse => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback if network fails completely
          return caches.match('./index.html');
        });
    })
  );
});