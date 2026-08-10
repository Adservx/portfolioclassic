import "server-only";

import { cert, getApps, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getMessaging } from "firebase-admin/messaging";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

export interface FirebaseServices {
  db: ReturnType<typeof getFirestore>;
  auth: ReturnType<typeof getAuth>;
}

export function initFirebaseAdmin(): FirebaseServices {
  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          credential: resolveCredential(),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
  return { db: getFirestore(app), auth: getAuth(app) };
}

export function initFirebaseMessaging() {
  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          credential: resolveCredential(),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
  return getMessaging(app);
}

function resolveCredential() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) return cert(JSON.parse(raw));
  const file = path.join(process.cwd(), "service-account.json");
  if (existsSync(file)) return cert(JSON.parse(readFileSync(file, "utf8")));
  throw new Error(
    "Firebase service account missing. Set FIREBASE_SERVICE_ACCOUNT env var or drop service-account.json in the repo root."
  );
}