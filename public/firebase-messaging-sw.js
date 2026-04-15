importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCCiVpiIkuygymVaEx4N0tf7Z5NICFxZ90",
  authDomain: "topnewsmarathi-notificat-24f30.firebaseapp.com",
  projectId: "topnewsmarathi-notificat-24f30",
  storageBucket: "topnewsmarathi-notificat-24f30.firebasestorage.app",
  messagingSenderId: "687889330734",
  appId: "1:687889330734:web:d99a409e2d4cb532aea5bf",
  measurementId: "G-7TLLMCL6EB"
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/favicon.svg', // Fallback icon
      data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (err) {
  console.log("Firebase SW initialization failed: ", err);
}

// Handle notification click to open the URL
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        // Check if there is already a window/tab open with the target URL
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          // If so, just focus it.
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (clients.openWindow) {
          // Since the client URL is usually relative (e.g., /article/slug), we prepend the origin
          const targetUrl = new URL(event.notification.data.url, self.location.origin).href;
          return clients.openWindow(targetUrl);
        }
      })
    );
  }
});
