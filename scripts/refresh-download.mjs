import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envFile = path.join(root, ".env.local");

const env = Object.fromEntries(
  fs
    .readFileSync(envFile, "utf8")
    .split("\n")
    .filter((l) => l && !l.trim().startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const BOOK_MASTER_URL =
  "https://drive.usercontent.google.com/download?id=18FPW80lOGw702W222RZJDZ2f6df4tSBV&export=download&confirm=t";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function loadCredential() {
  if (env.FIREBASE_SERVICE_ACCOUNT) return cert(JSON.parse(env.FIREBASE_SERVICE_ACCOUNT));
  const file = path.join(root, "service-account.json");
  if (fs.existsSync(file)) return cert(JSON.parse(fs.readFileSync(file, "utf8")));
  throw new Error("Firebase service account missing: set FIREBASE_SERVICE_ACCOUNT or drop service-account.json in the repo root.");
}

async function downloadMaster() {
  console.log("→ Downloading master PDF from Google Drive ...");
  const res = await fetch(BOOK_MASTER_URL, { signal: AbortSignal.timeout(180_000) });
  if (!res.ok) throw new Error(`Master download failed: HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  console.log(`  Got ${(buffer.length / 1024 / 1024).toFixed(1)} MB`);
  return buffer;
}

async function uploadToGoFile(buffer) {
  const serversRes = await fetch("https://api.gofile.io/servers", {
    signal: AbortSignal.timeout(30_000),
  });
  if (!serversRes.ok) throw new Error(`GoFile server lookup failed: HTTP ${serversRes.status}`);
  const serversJson = await serversRes.json();
  const server = serversJson?.data?.servers?.find((s) => typeof s.name === "string")?.name;
  if (!server) throw new Error("GoFile returned no upload server");

  const form = new FormData();
  form.append("file", new Blob([buffer], { type: "application/pdf" }), "white-words.pdf");
  const res = await fetch(`https://${server}.gofile.io/contents/uploadfile`, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(240_000),
  });
  if (!res.ok) throw new Error(`GoFile upload failed: HTTP ${res.status}`);
  const json = await res.json();
  const url = json?.status === "ok" ? json?.data?.downloadPage : undefined;
  if (!url) throw new Error("GoFile upload returned no download page");
  return { url, provider: "gofile" };
}

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({ credential: loadCredential(), projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });
const db = getFirestore(app);

const buffer = await downloadMaster();

console.log("→ Uploading to GoFile ...");
const link = await uploadToGoFile(buffer);

const doc = {
  url: link.url,
  provider: link.provider,
  expiresAt: new Date(Date.now() + WEEK_MS).toISOString(),
  updatedAt: new Date().toISOString(),
};

await db.collection("siteConfig").doc("downloads").set(doc);
console.log(`✓ Live download link seeded (${link.provider})`);
console.log(`  URL: ${link.url}`);
console.log(`  Expires: ${doc.expiresAt}`);