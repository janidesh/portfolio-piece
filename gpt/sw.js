const CACHE_NAME = 'janith-gpt-app-v1';
const urlsToCache = [
  './index.html',
  './gpt-style.css',
  '../other images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Only cache GET requests (UI and styles). Ignore POST requests to /api/chat.
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});