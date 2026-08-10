import { NextResponse } from "next/server";
import { initFirebaseAdmin, initFirebaseMessaging } from "@/lib/firebase-admin";
import { sendNewOrderAdminEmail } from "@/lib/email";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

export interface OrderItemPayload {
  id: number;
  title: string;
  price: string;
  quantity: number;
}

export interface PlaceOrderPayload {
  shipping: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    municipality: string;
    ward: string;
    province: string;
    postal: string;
  };
  payment: {
    txnId: string;
    payerName: string;
    payerPhone: string;
  };
  screenshotUrl?: string;
  items: OrderItemPayload[];
  format: "print" | "digital";
  total: string;
}

export async function POST(request: Request) {
  let body: PlaceOrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { shipping, payment, items, format, total, screenshotUrl } = body ?? {};
  if (!shipping?.name || !shipping?.email || !payment?.txnId || !items?.length) {
    return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
  }
  if (format !== "print" && format !== "digital") {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }
  if (screenshotUrl) {
    if (!/^data:image\/(png|jpe?g|webp);base64,/.test(screenshotUrl)) {
      return NextResponse.json({ error: "Invalid screenshot format" }, { status: 400 });
    }
    if (screenshotUrl.length > 900_000) {
      return NextResponse.json({ error: "Screenshot is too large" }, { status: 400 });
    }
  }

  const { db } = initFirebaseAdmin();
  const orderNumber = `DP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();

  const orderRef = await db.collection("orders").add({
    orderNumber,
    status: "pending",
    format,
    total,
    items,
    shipping,
    payment,
    screenshotUrl: screenshotUrl ?? null,
    createdAt: now.toISOString(),
  });

  const downloadUrl = `${SITE_URL}/bookstore/white-words.pdf`;

  try {
    await sendNewOrderAdminEmail({
      orderNumber,
      buyerName: shipping.name,
      buyerEmail: shipping.email,
      format,
      total,
      items,
      address: [
        shipping.address,
        shipping.municipality,
        shipping.city,
        shipping.ward,
        shipping.province,
        shipping.postal,
      ]
        .filter(Boolean)
        .join(", "),
      downloadUrl,
      siteUrl: SITE_URL,
      siteName: SITE_NAME,
      authorName: AUTHOR.name,
      authorEmail: AUTHOR.email,
    });
  } catch (err) {
    console.error("New-order email failed (non-fatal):", err);
  }

  try {
    await pushNewOrderToAdmins(db, orderNumber, format, total, shipping.name);
  } catch (err) {
    console.error("New-order push failed (non-fatal):", err);
  }

  return NextResponse.json({ orderId: orderRef.id, orderNumber, status: "pending" });
}

async function pushNewOrderToAdmins(
  db: ReturnType<typeof initFirebaseAdmin>["db"],
  orderNumber: string,
  format: string,
  total: string,
  buyerName: string
) {
  const admins = await db.collection("admins").get();
  const tokens = admins.docs
    .map((d) => d.data().fcmToken as string | undefined)
    .filter(Boolean) as string[];
  if (!tokens.length) return;
  const messaging = initFirebaseMessaging();
  await Promise.allSettled(
    tokens.map((token) =>
      messaging.send({
        token,
        notification: {
          title: `New order ${orderNumber}`,
          body: `${buyerName} · ${format} · ${total}`,
        },
      })
    )
  );
}