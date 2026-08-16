import "server-only";

import { initFirebaseAdmin } from "@/lib/firebase-admin";
import { BOOK_MASTER_URL } from "@/lib/site";

const REFRESH_SLACK_MS = 48 * 60 * 60 * 1000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const FILE_NAME = "white-words.pdf";

export interface DownloadLink {
  url: string;
  provider: string;
  expiresAt: string;
  updatedAt: string;
  lastError?: string;
}

async function downloadMaster(): Promise<Buffer> {
  const res = await fetch(BOOK_MASTER_URL, { signal: AbortSignal.timeout(180_000) });
  if (!res.ok) throw new Error(`Master download failed: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadToGoFile(buffer: Buffer): Promise<{ url: string; provider: string }> {
  const serversRes = await fetch("https://api.gofile.io/servers", {
    signal: AbortSignal.timeout(30_000),
  });
  if (!serversRes.ok) throw new Error(`GoFile server lookup failed: HTTP ${serversRes.status}`);
  const serversJson = (await serversRes.json()) as { data?: { servers?: { name?: string }[] } };
  const server = serversJson.data?.servers?.find((s) => typeof s.name === "string")?.name;
  if (!server) throw new Error("GoFile returned no upload server");

  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
  const form = new FormData();
  form.append("file", new Blob([arrayBuffer], { type: "application/pdf" }), FILE_NAME);
  const res = await fetch(`https://${server}.gofile.io/contents/uploadfile`, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(240_000),
  });
  if (!res.ok) throw new Error(`GoFile upload failed: HTTP ${res.status}`);
  const json = (await res.json()) as { status?: string; data?: { downloadPage?: string } };
  const url = json.status === "ok" ? json.data?.downloadPage : undefined;
  if (!url) throw new Error("GoFile upload returned no download page");
  return { url, provider: "gofile" };
}

export async function getLiveDownloadUrl(): Promise<string | null> {
  const { db } = initFirebaseAdmin();
  const snap = await db.collection("siteConfig").doc("downloads").get();
  if (!snap.exists) return null;
  const url = (snap.data() as DownloadLink | undefined)?.url;
  return url ?? null;
}

export async function refreshDownloadLink(): Promise<DownloadLink> {
  const { db } = initFirebaseAdmin();
  const ref = db.collection("siteConfig").doc("downloads");
  const snap = await ref.get();
  const existing = snap.exists ? (snap.data() as DownloadLink | undefined) : undefined;

  if (existing?.expiresAt && new Date(existing.expiresAt).getTime() > Date.now() + REFRESH_SLACK_MS) {
    return existing;
  }

  const buffer = await downloadMaster();
  const { url, provider } = await uploadToGoFile(buffer);

  const doc: DownloadLink = {
    url,
    provider,
    expiresAt: new Date(Date.now() + WEEK_MS).toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await ref.set(doc);
  return doc;
}