import { NextResponse } from "next/server";
import { initFirebaseAdmin, initFirebaseMessaging, initFirebaseDatabase } from "@/lib/firebase-admin";
import { sendNewOrderAdminEmail } from "@/lib/email";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
import * as firestoreAdmin from "firebase-admin/firestore";

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
    payerPhone: string;
    screenshotUrl?: string;
    screenshotStatus?: string;
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

  const { shipping, payment, items, format, total, screenshotUrl: topLevelScreenshotUrl } = body ?? {};
  if (!shipping?.name || !items?.length) {
    return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
  }
  if (format !== "print" && format !== "digital") {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }
  if (format === "digital" && (!shipping?.email || !payment?.txnId)) {
    return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
  }

  const isCashOnDelivery = format === "print";
  const screenshotUrl = isCashOnDelivery ? null : payment?.screenshotUrl ?? topLevelScreenshotUrl;

  let screenshotDataUrl: string | null = null;
  let screenshotMime = "image/jpeg";
  if (screenshotUrl) {
    const m = /^data:(image\/(?:png|jpe?g|webp));base64,/.exec(screenshotUrl);
    if (!m) {
      return NextResponse.json({ error: "Invalid screenshot format" }, { status: 400 });
    }
    if (screenshotUrl.length > 4_000_000) {
      return NextResponse.json({ error: "Screenshot is too large" }, { status: 400 });
    }
    screenshotDataUrl = screenshotUrl;
    screenshotMime = m[1];
  }

  const { db } = initFirebaseAdmin();
  const orderNumber = `DP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();

  const orderRef = db.collection("orders").doc();
  const screenshotRef = orderRef.id;

  if (screenshotDataUrl) {
    const rtdb = initFirebaseDatabase();
    try {
      await rtdb.ref(`screenshots/${screenshotRef}`).set({
        data: screenshotDataUrl.replace(/^data:image\/[^;]+;base64,/, ""),
        mime: screenshotMime,
        createdAt: now.toISOString(),
      });
    } catch (err) {
      console.error("Screenshot upload to RTDB failed:", err);
      return NextResponse.json({ error: "Screenshot could not be stored, please try again" }, { status: 500 });
    }
  }

  const screenshotUrlStored = screenshotDataUrl
    ? `${SITE_URL}/api/orders/${screenshotRef}/screenshot`
    : null;

  await orderRef.set({
    orderNumber,
    status: "pending",
    format,
    total,
    items,
    shipping,
    paymentMethod: isCashOnDelivery ? "cod" : "esewa",
    payment: {
      txnId: isCashOnDelivery ? "COD" : payment.txnId,
      payerPhone: isCashOnDelivery ? shipping.phone : payment.payerPhone,
    },
    screenshotUrl: screenshotUrlStored,
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
    .map((d) => ({ uid: d.id, token: d.data().fcmToken as string | undefined }))
    .filter((e): e is { uid: string; token: string } => typeof e.token === "string");
  if (!tokens.length) return;
  const messaging = initFirebaseMessaging();
  await Promise.allSettled(
    tokens.map(({ uid, token }) =>
      messaging
        .send({
          token,
          notification: {
            title: `New order ${orderNumber}`,
            body: `${buyerName} · ${format} · ${total}`,
          },
        })
        .catch(async (err) => {
          const code = (err as { errorInfo?: { code?: string } })?.errorInfo?.code ?? "";
          if (code.includes("not-registered") || code.includes("invalid-argument")) {
            await db
              .collection("admins")
              .doc(uid)
              .update({ fcmToken: firestoreAdmin.FieldValue.delete() })
              .catch(() => {});
            console.warn(`Pruned stale FCM token for admin ${uid} (${code})`);
          } else {
            console.error(`Push to admin ${uid} failed (${code || err}):`, err);
          }
        })
    )
  );
}