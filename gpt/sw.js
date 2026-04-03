const CACHE_NAME = 'janith-gpt-v13';

const ASSETS = [
  '/gpt/',
  '/gpt/index.html',
  '/gpt/gpt-style.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force update instantly
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Ignore AI API calls
  if (event.request.url.includes('/api/')) return;

  // Network-First for Navigation to prevent Cloudflare redirect loops
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/gpt/'))
    );
    return;
  }

  // Cache-First for assets like CSS and images
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});