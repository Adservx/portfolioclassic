import { initFirebaseDatabase } from "@/lib/firebase-admin";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const snap = await initFirebaseDatabase().ref(`screenshots/${id}`).get();
  if (!snap.exists()) {
    return new Response("Not found", { status: 404 });
  }

  const { data, mime } = snap.val() as { data?: string; mime?: string };
  if (typeof data !== "string") {
    return new Response("Not found", { status: 404 });
  }

  const buffer = Buffer.from(data, "base64");
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": mime ?? "image/jpeg",
      "Cache-Control": "private, max-age=3600",
    },
  });
}