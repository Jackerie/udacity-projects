console.log('registering service_worker.js');

var localCacheName = "restaurant-reviews-cache-v3";

var toCache = [
  'js/main.js',
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'index.html',
  'restaurant.html',
  'css/responsive.css',
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(localCacheName).then(function(cache) {
      console.log('Service worker installed.');
      return cache.addAll(toCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [localCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('Service worker handling fetch.');
      return response || fetch(event.request.url)
    }).catch(error => {
      console.log(`Failed to fetch ${event.request.url} because ${error}`);
    })
  );
});
