import nodemailer, { type Transporter } from "nodemailer";
import { renderOrderEmailHtml, renderOrderEmailText } from "@/lib/email-template";

export interface OrderInfo {
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  format: "print" | "digital";
  total: string;
  items: { title: string; quantity: number; price: string; cover?: string }[];
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
      from: `"${order.siteName} Bookstore" <${process.env.SMTP_USER}>`,
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
  const buyerName = /[a-zA-Z]/.test(order.buyerName?.trim() ?? "") ? order.buyerName!.trim() : "Reader";
  const productTitle = order.items?.[0]?.title?.trim() || "White Words";
  const subject =
    order.format === "digital"
      ? `Your ${productTitle} download — Order ${order.orderNumber} confirmed`
      : `Order ${order.orderNumber} confirmed — ${productTitle}`;
  try {
    const info = await transporter.sendMail({
      from: `"${order.siteName}" <${process.env.SMTP_USER}>`,
      replyTo: order.authorEmail,
      to: order.buyerEmail,
      subject,
      html: renderOrderEmailHtml(order, buyerName),
      text: renderOrderEmailText(order, buyerName),
    });
    console.log(`Confirmation email sent to ${order.buyerEmail} (${info.messageId})`);
  } catch (err) {
    console.error(`Confirmation email to ${order.buyerEmail} failed:`, err);
    throw err;
  }
}