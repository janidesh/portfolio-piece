const CACHE_NAME = 'janith-gpt-v5';

// Only cache the bare minimum for the app to start
const ASSETS = [
  '/gpt/',
  '/gpt/index.html',
  '/gpt/gpt-style.css',
  '/other images/logo.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forces the new service worker to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Become the active worker for all open tabs
});

// FIXED FETCH LOGIC:
self.addEventListener('fetch', (event) => {
  // 1. Let API calls (Groq) go straight to the network
  if (event.request.url.includes('/api/')) return;

  // 2. For page navigation, always try the Network FIRST
  // This prevents the ERR_FAILED redirect error
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/gpt/index.html'))
    );
    return;
  }

  // 3. For images/css, try cache then network
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});