importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDatDgKpAVe0MkUFZo6E-htAgKz9bCQ5wQ",
  authDomain: "darshanpathak-com-np-67ddf.firebaseapp.com",
  projectId: "darshanpathak-com-np-67ddf",
  storageBucket: "darshanpathak-com-np-67ddf.firebasestorage.app",
  messagingSenderId: "51997078416",
  appId: "1:51997078416:web:26a3afb34d0b2ad4fe7915",
});

const messaging = firebase.messaging();

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("focus" in client) return client.focus();
      }
      return clients.openWindow("/");
    })
  );
});