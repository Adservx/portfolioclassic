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

export async function sendNewOrderAdminEmail(order: OrderInfo) {
  const transporter = getTransporter();
  if (!transporter) return;
  const items = order.items.map((i) => `${i.title} ×${i.quantity} (${i.price})`).join("<br/>");
  await transporter.sendMail({
    from: `"${order.siteName} Bookstore" <${order.authorEmail}>`,
    to: order.authorEmail,
    subject: `New order ${order.orderNumber} (${order.format})`,
    html: `<h2>New bookstore order</h2><p><b>Order:</b> ${order.orderNumber}<br/><b>Buyer:</b> ${order.buyerName} &lt;${order.buyerEmail}&gt;<br/><b>Format:</b> ${order.format}<br/><b>Total:</b> ${order.total}<br/><b>Items:</b><br/>${items}${order.address ? `<br/><b>Ship to:</b> ${order.address.replace(/\n/g, ", ")}` : ""}</p><p>Confirm it from the admin app: ${process.env.NEXT_PUBLIC_ADMIN_ORIGIN ?? ""}</p>`,
  });
}

export async function sendOrderConfirmationEmail(order: OrderInfo) {
  const transporter = getTransporter();
  if (!transporter) return;
  if (!order.buyerEmail?.trim()) return;
  const subject =
    order.format === "digital"
      ? `Your White Words download — Order ${order.orderNumber} confirmed`
      : `Order ${order.orderNumber} confirmed — White Words`;
  let body = "";
  if (order.format === "digital") {
    body = `<p>Dear ${order.buyerName},</p><p>Your order <b>${order.orderNumber}</b> is confirmed. Download your copy here:</p><p><a href="${order.downloadUrl}">Download White Words (PDF)</a></p>`;
  } else {
    body = `<p>Dear ${order.buyerName},</p><p>Your order <b>${order.orderNumber}</b> is confirmed. Your printed copy will be dispatched from the author's study within 2–4 weeks.</p>`;
  }
  body += `<p>— ${order.authorName}, ${order.siteName}</p>`;
  await transporter.sendMail({
    from: `"${order.siteName}" <${order.authorEmail}>`,
    to: order.buyerEmail,
    subject,
    html: `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto">${body}</div>`,
  });
}