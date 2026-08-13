/**
 * Seed script: populate `books` collection + grant admin claim.
 *
 * Usage (from repo root):
 *  1. Download the service account key from Firebase console
 *     (Project settings > Service accounts > Generate new private key)
 *  2. Set FIREBASE_SERVICE_ACCOUNT env var or save the file as service-account.json
 *  3. node scripts/seed.mjs
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const projectId = "darshanpathak-com-np-67ddf";
const adminEmail = process.env.ADMIN_EMAIL ?? "darshanpathak2083@gmail.com";

let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else if (existsSync(path.join(process.cwd(), "service-account.json"))) {
  serviceAccount = JSON.parse(readFileSync(path.join(process.cwd(), "service-account.json"), "utf8"));
} else {
  console.error("No service account found. Set FIREBASE_SERVICE_ACCOUNT or create service-account.json.");
  process.exit(1);
}

const app = initializeApp({ credential: cert(serviceAccount), projectId });
const db = getFirestore(app);
const auth = getAuth(app);

const book = {
  id: 1,
  title: "White Words",
  author: "Darshan Pathak",
  category: "Poetry & Essays",
  year: "2023",
  cover: "/bookstore/white-words-cover.webp",
  binding: "First Edition · 312 pp.",
  price: "$3.00/- · NPR 460",
  pdfUrl: "/bookstore/white-words.pdf",
  isbn: "978-9937-1-3757-7",
  publisher: "Darshan Pathak",
  excerpt:
    "A collection of 93 articles on love, spirit, science and the quiet architecture of the mind — written to cure and prevent the chronic ache the world faces.",
  publishedAt: new Date().toISOString(),
};

async function run() {
  try {
    const docRef = await db.collection("books").doc("white-words");
    await docRef.set(book, { merge: true });
    console.log("books/white-words seeded.");

try {
    let user;
    try {
      user = await auth.getUserByEmail(adminEmail);
    } catch {
      const password = process.env.ADMIN_PASSWORD;
      if (!password || password.length < 6) {
        throw new Error(
          "Admin user does not exist yet. Create it in Firebase console (Authentication > Users > Add user) or rerun with ADMIN_PASSWORD env set."
        );
      }
      user = await auth.createUser({ email: adminEmail, password });
      console.log(`Created admin user ${adminEmail}.`);
    }
    await auth.setCustomUserClaims(user.uid, { admin: true });
    await db.collection("admins").doc(user.uid).set({
      email: adminEmail,
      role: "admin",
      createdAt: new Date().toISOString(),
    });
    console.log(`Admin claim set on ${adminEmail} (${user.uid}).`);
  } catch (err) {
    console.error("Failed to set admin claim:", err.message);
  }

    console.log("Done.");
  } finally {
    await app.delete();
  }
}

run();