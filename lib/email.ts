import nodemailer, { type Transporter } from "nodemailer";

export interface OrderInfo {
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  format: "print" | "digital";
  total: string;
  items: { title: string; quantity: number; price: string }[];
  address?: string;
  downloadUrl?: string;
  siteUrl: string;
  siteName: string;
  authorName: string;
  authorEmail: string;
}

function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 465);
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

function requireTransporter(): Transporter {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error("SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS");
  }
  return transporter;
}

export async function sendNewOrderAdminEmail(order: OrderInfo) {
  const transporter = requireTransporter();
  const items = order.items.map((i) => `${i.title} ×${i.quantity} (${i.price})`).join("<br/>");
  try {
    const info = await transporter.sendMail({
      from: `"${order.siteName} Bookstore" <${order.authorEmail}>`,
      to: order.authorEmail,
      subject: `New order ${order.orderNumber} (${order.format})`,
      html: `<h2>New bookstore order</h2><p><b>Order:</b> ${order.orderNumber}<br/><b>Buyer:</b> ${order.buyerName} &lt;${order.buyerEmail}&gt;<br/><b>Format:</b> ${order.format}<br/><b>Total:</b> ${order.total}<br/><b>Items:</b><br/>${items}${order.address ? `<br/><b>Ship to:</b> ${order.address.replace(/\n/g, ", ")}` : ""}</p><p>Confirm it from the admin app: ${process.env.NEXT_PUBLIC_ADMIN_ORIGIN ?? ""}</p>`,
    });
    console.log(`Admin email sent to ${order.authorEmail} (${info.messageId})`);
  } catch (err) {
    console.error(`Admin email to ${order.authorEmail} failed:`, err);
    throw err;
  }
}

export async function sendOrderConfirmationEmail(order: OrderInfo) {
  const transporter = requireTransporter();
  if (!order.buyerEmail?.trim()) {
    throw new Error("Buyer email is empty — cannot send confirmation");
  }
  const subject =
    order.format === "digital"
      ? `Your White Words download — Order ${order.orderNumber} confirmed`
      : `Order ${order.orderNumber} confirmed — White Words`;
  let body = "";
  if (order.format === "digital") {
    body = order.downloadUrl
      ? `<p>Dear ${order.buyerName},</p><p>Your order <b>${order.orderNumber}</b> is confirmed. Download your copy here:</p><p><a href="${order.downloadUrl}">Download White Words (PDF)</a></p><p>This link expires 7 days after it was generated.</p>`
      : `<p>Dear ${order.buyerName},</p><p>Your order <b>${order.orderNumber}</b> is confirmed. Your download link is being prepared — please email ${order.authorEmail} if you don't receive it shortly.</p>`;
  } else {
    body = `<p>Dear ${order.buyerName},</p><p>Your order <b>${order.orderNumber}</b> is confirmed. Your printed copy will be dispatched from the author's study within 2–4 weeks.</p>`;
  }
  body += `<p>— ${order.authorName}, ${order.siteName}</p>`;
  try {
    const info = await transporter.sendMail({
      from: `"${order.siteName}" <${order.authorEmail}>`,
      to: order.buyerEmail,
      subject,
      html: `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto">${body}</div>`,
    });
    console.log(`Confirmation email sent to ${order.buyerEmail} (${info.messageId})`);
  } catch (err) {
    console.error(`Confirmation email to ${order.buyerEmail} failed:`, err);
    throw err;
  }
}