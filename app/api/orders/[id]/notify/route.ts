import { NextResponse } from "next/server";
import { initFirebaseAdmin } from "@/lib/firebase-admin";
import { getLiveDownloadUrl } from "@/lib/download";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
import { products } from "@/lib/book";

export const maxDuration = 60;
export const runtime = "nodejs";

function corsHeaders(origin: string | null) {
  const configured = process.env.NEXT_PUBLIC_ADMIN_ORIGIN;
  const isDevOrigin = origin != null && /^http:\/\/localhost(:\d+)?$/.test(origin);
  return {
    "Access-Control-Allow-Origin": isDevOrigin ? origin : (configured ?? "*"),
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cors = corsHeaders(request.headers.get("origin"));
  const authHeader = request.headers.get("authorization") ?? "";
  const idToken = authHeader.replace(/^Bearer\s+/i, "");

  if (!idToken) {
    return NextResponse.json({ error: "Missing authorization token" }, { status: 401, headers: cors });
  }

  const { auth, db } = initFirebaseAdmin();

  let claims: Record<string, unknown> = {};
  try {
    const decoded = await auth.verifyIdToken(idToken);
    const user = await auth.getUser(decoded.uid);
    claims = user.customClaims ?? {};
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401, headers: cors });
  }

  if (claims.admin !== true) {
    return NextResponse.json({ error: "Admin only" }, { status: 403, headers: cors });
  }

  const orderSnap = await db.collection("orders").doc(id).get();
  if (!orderSnap.exists) {
    return NextResponse.json({ error: "Order not found" }, { status: 404, headers: cors });
  }
  const order = orderSnap.data()!;

  if (order.status !== "confirmed") {
    return NextResponse.json(
      { error: "Order is not confirmed yet — update status in the admin app first" },
      { status: 400, headers: cors }
    );
  }

  if (order.format === "print") {
    return NextResponse.json({ ok: true, skipped: "cash-on-delivery", orderId: id }, { headers: cors });
  }

  const rawItems = order.items ?? [];
  const downloadUrl = (await getLiveDownloadUrl(rawItems[0]?.id)) ?? undefined;
  const emailItems = rawItems.map((i: { id?: number; title?: string; quantity?: number; price?: string }) => ({
    title: i.title ?? "White Words",
    quantity: i.quantity ?? 1,
    price: i.price ?? "",
    cover: products.find((p) => p.id === i.id)?.cover ?? "",
  }));

  try {
    await sendOrderConfirmationEmail({
      orderNumber: order.orderNumber,
      buyerName: order.shipping.name,
      buyerEmail: order.shipping.email,
      format: order.format ?? "digital",
      total: order.total,
      items: emailItems,
      downloadUrl,
      siteUrl: SITE_URL,
      siteName: SITE_NAME,
      authorName: AUTHOR.name,
      authorEmail: AUTHOR.email,
    });
  } catch (err) {
    console.error("Confirmation email failed:", err);
    return NextResponse.json(
      { error: "Confirmation email could not be sent" },
      { status: 500, headers: cors }
    );
  }

  return NextResponse.json({ ok: true, orderId: id }, { headers: cors });
}