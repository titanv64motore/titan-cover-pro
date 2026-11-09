// Titan Cover Pro - Service Worker
const CACHE_NAME = 'titan-cache-v1';

self.addEventListener('install', (event) => {
  console.log('Titan Service Worker: Installed');
});

self.addEventListener('fetch', (event) => {
  // Base request management for global access
  event.respondWith(fetch(event.request));
});