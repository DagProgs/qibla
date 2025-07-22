importScripts('workbox-v4.3.1/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.1/',
  debug: true
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "06e757546b22c62367c05267e36c5945"
  },
  {
    "url": "mounth.html",
    "revision": "3e15502215fecdd8b3dafd4b8dfcb14e"
  },
  {
    "url": "year.html",
    "revision": "64f69e73e2b017dfee41b92dc01caac4"
  },
  {
    "url": "data/derbent.json",
    "revision": "ecd13ab83a5369e4baad3df7a138f693"
  },
  {
    "url": "data/izberbash.json",
    "revision": "233f8cbbea5d809f6cb3887c49014534"
  },
  {
    "url": "data/kaspiysk.json",
    "revision": "412aa8c57e7d88fb559adff034c6e8af"
  },
  {
    "url": "data/kurah.json",
    "revision": "9fa73418c1118fd575680d525f2e9eee"
  },
  {
    "url": "data/makhachkala.json",
    "revision": "a6c29888d765175ca7f778b3ba9cc837"
  },
  {
    "url": "data/s.stalsk.json",
    "revision": "cece35168dea92cca3964394dc4f509e"
  },
  {
    "url": "css/styles.css",
    "revision": "6c1832921a2afd134cea24dfac6370b7"
  },
  {
    "url": "js/jquery-3.7.1.min.js",
    "revision": "c9a1b0aa0167c8a4df724d18d06814a8"
  },
  {
    "url": "js/modernizr.min.js",
    "revision": "65f1d21d5fcc9d21da758adababd0c3c"
  },
  {
    "url": "js/prayer-times/day.js",
    "revision": "2964087ddac8f6d4e0987ae932601a6f"
  },
  {
    "url": "js/prayer-times/mounth.js",
    "revision": "4a721906e090e6316c84edac72552d99"
  },
  {
    "url": "js/prayer-times/yer.js",
    "revision": "3da38d94765868aeacde12f83fd04a8e"
  },
  {
    "url": "js/prefixfree.min.js",
    "revision": "99ea8d1961f9bb4e61f0512d1870aaf4"
  },
  {
    "url": "js/theme.js",
    "revision": "4dc2d1bb6cbc416b7ee56dc22a7a7c92"
  },
  {
    "url": "generate-vapid-keys.js",
    "revision": "b5ca8ec42e5e1255d9a5b4a0d0e6bcd7"
  },
  {
    "url": "main.js",
    "revision": "80846bb3403b82a07c7f84658f186b23"
  },
  {
    "url": "polyfills.js",
    "revision": "56f34b0f4d3a42d45bfdb1782adaa173"
  },
  {
    "url": "pwacompat.min.js",
    "revision": "038770ef3eb91f3e8a50a3916cb7cf28"
  },
  {
    "url": "runtime.js",
    "revision": "cd1ce3e306bf57f272364d1cc0249d6e"
  },
  {
    "url": "sendPush.js",
    "revision": "77e6ebd060bdcc27b4ecb954a09bd6ed"
  },
  {
    "url": "update.js",
    "revision": "2e37a1e61c0f6c88bddbb61150536944"
  },
  {
    "url": "img/svg/mounth.svg",
    "revision": "28b9786d0a8b41c97a7a7801711a1f8a"
  },
  {
    "url": "img/svg/year.svg",
    "revision": "8b97737e3fc289d58f9aaad12ea0d411"
  },
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "25c8eb241d5e0c913da717f6007736b2"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "6e606e6871ccc1fdc7222dee1d72d42e"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "33b8202ee77c28c332a4fa3efee61d34"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "c5d401eb140c47f0d0a1b8880b5c8b49"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "47f069d621e0e363d1f0b560be4335dc"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "84f212482ada6ec3913a2a76d4b89c0d"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "9c82c0475577731db0e52b9fa62e8c05"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "9815fb3c4b57df1e8cda23d01fc66078"
  }
]);

// Роутинг и кэширование (ваш текущий код)
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({ maxEntries: 30 })
    ]
  })
);

workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
);

// Обработка push-уведомлений
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Push received', event);
  
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }

  const title = data.title || 'Пора намаза';
  const options = {
    body: data.body || 'Время для молитвы',
    icon: 'icon.png', // замените на путь к вашей иконке
    badge: 'badge.png', // замените на путь к вашему значку
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/', // ссылка, которая откроется при клике
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});