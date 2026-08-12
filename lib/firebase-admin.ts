import "server-only";

import { cert, getApps, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getMessaging } from "firebase-admin/messaging";
import { getDatabase, type Database } from "firebase-admin/database";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

export interface FirebaseServices {
  db: ReturnType<typeof getFirestore>;
  auth: ReturnType<typeof getAuth>;
}

function initApp() {
  return getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: resolveCredential(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
      });
}

export function initFirebaseAdmin(): FirebaseServices {
  const app = initApp();
  return { db: getFirestore(app), auth: getAuth(app) };
}

export function initFirebaseMessaging() {
  return getMessaging(initApp());
}

export function initFirebaseDatabase(): Database {
  return getDatabase(initApp());
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