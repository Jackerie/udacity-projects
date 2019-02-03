console.log('registering service_worker.js');

var localCacheName = "restaurant-reviews-cache";
var toCache = [
  './',
  './js/main.js',
  './js/dbhelper.js',
  './js/resaurant_info.js',
  './js/service_worker_wrapper.js',
  './js/service_worker.js',
  './index.html',
  './restaurant.html',
  './css/responsive.css',
  './css/styles.css',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

self.addEventListener('install', function(event) {
  console.log('service worker installing');
  event.waitUntil(
    caches.open(localCacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('service worker activating');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.filter(function(cacheName) {
          console.log(cacheName);
          return false;  // return true if you want to remove this cache.
          //return cacheName.startsWith('restaurant-reviews-') && cacheName != localCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('service worker handling fetch');
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
