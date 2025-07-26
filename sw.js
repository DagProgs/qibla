// public/sw.js

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push received.');

  let data = {};
  if (event.data) {
    data = event.data.json();
    console.log('[Service Worker] Push data:', data);
  }

  const title = data.title || 'Намаз';
  const options = {
    body: data.body || 'Время намаза наступило',
    icon: data.icon || '/img/icon-192x192.png', // Убедитесь, что иконка существует
    badge: data.badge || '/img/badge-72x72.png', // Убедитесь, что значок существует
    tag: data.tag || 'prayer-time-notification',
    renotify: true, // Если тег совпадает, перезапускать уведомление
    data: data.data || {} // Дополнительные данные
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received.');

  event.notification.close(); // Закрываем уведомление

  // Открываем/фокусируем вкладку с приложением
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
