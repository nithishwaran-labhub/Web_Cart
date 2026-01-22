const cacheName = "webcart-v1";

const filesToCache = [
  "index.html",
  "cart.html",
  "checkout.html",
  "wishlist.html",
  "login.html",
  "signup.html",
  "style.css",
  "script.js",
  "cart.js",
  "wishlist.js",
  "logo.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

