const webPush = require('web-push');

// Вставьте ваши VAPID ключи сюда
const vapidKeys = {
  publicKey: 'BCL4qWZk-G-XAl-3J4kNAuus6SmWGd4DB6qxMWAKOCywYVgMpCrPHfXvNOzcvpvP_Y7lIAMUoVcJ36r1k44jo64',
  privateKey: 'DzgBEVDBto8qbYoISJrAXnQqd49C1Uwd1HobdyKndOA'
};

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Загрузите подписку из базы или файла (пример)
const subscription = {/* вставьте подписку, полученную от клиента */ };

// Создайте payload
const payload = JSON.stringify({
  title: 'Пора намаза',
  body: 'Наступило время для молитвы',
  url: 'https://your-pwa-url.com/prayer'
});

// Отправка
webPush.sendNotification(subscription, payload).then(res => {
  console.log('Уведомление отправлено', res);
}).catch(err => {
  console.error('Ошибка отправки уведомления', err);
});