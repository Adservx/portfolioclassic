import { NextResponse } from "next/server";
import { initFirebaseAdmin, initFirebaseDatabase } from "@/lib/firebase-admin";

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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Order id missing" }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const idToken = authHeader.replace(/^Bearer\s+/i, "");
  if (!idToken) {
    return NextResponse.json({ error: "Missing authorization token" }, { status: 401 });
  }

  const { auth } = initFirebaseAdmin();
  let claims: Record<string, unknown> = {};
  try {
    const decoded = await auth.verifyIdToken(idToken);
    const user = await auth.getUser(decoded.uid);
    claims = user.customClaims ?? {};
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (claims.admin !== true) {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  await initFirebaseDatabase().ref(`screenshots/${id}`).remove();
  return NextResponse.json({ ok: true });
}