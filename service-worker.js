// Define the cache name (change this version number if you update files later)
const CACHE_NAME = 'divine-converter-cache-v1';

// List ALL files needed for the app to load offline
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  // If you added separate CSS or JS files, list them here too:
  // 'styles/main.css', 
  // 'scripts/app.js'
];

// Install Event: Cache all the core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event: Intercept requests and serve from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        // Otherwise, go to the network
        return fetch(event.request);
      })
  );
});
