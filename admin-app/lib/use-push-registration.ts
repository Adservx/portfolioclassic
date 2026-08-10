"use client";

import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { isSupported } from "firebase/messaging";
import { getFirestoreClient } from "@/lib/firebase";
import { useAuth } from "@/components/auth-context";

export function usePushRegistration() {
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user || !isAdmin) return;
    let cancelled = false;

    (async () => {
      try {
        const supported = await isSupported();
        if (!supported) return;
        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
        if (!vapidKey) return;
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        const messaging = getMessaging();
        const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration });
        if (cancelled) return;
        await setDoc(doc(getFirestoreClient(), "admins", user.uid), {
          email: user.email,
          fcmToken: token,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        console.warn("Push notification registration skipped:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isAdmin]);
}