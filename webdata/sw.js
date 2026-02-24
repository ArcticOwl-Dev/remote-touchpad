/* Minimal service worker so the app meets PWA installability criteria (e.g. Brave/Chrome on Android). */
self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
});
