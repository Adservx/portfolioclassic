import type { OrderInfo } from "@/lib/email";

const SERIF = "Georgia, 'Times New Roman', serif";
const CAPS = "Arial, Helvetica, sans-serif";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rules(): string {
  return '<div style="height:1px;background-color:#D9D9D9;"></div><div style="height:1px;background-color:#F0F0F0;margin-top:2px;"></div>';
}

function itemsRows(items: OrderInfo["items"]): string {
  return items
    .map(
      (i) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #F0F0F0;font-family:${SERIF};font-size:14px;color:#222222;">${esc(i.title)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #F0F0F0;font-family:${SERIF};font-size:14px;color:#666666;text-align:right;white-space:nowrap;">×${i.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #F0F0F0;font-family:${SERIF};font-size:14px;color:#222222;text-align:right;white-space:nowrap;">${esc(i.price)}</td>
      </tr>`
    )
    .join("");
}

function summaryTable(order: OrderInfo): string {
  if (!order.items.length) return "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
    <tr><td style="font-family:${CAPS};font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#999999;padding-bottom:8px;border-bottom:2px solid #222222;">Order summary</td></tr>
    ${itemsRows(order.items)}
    <tr>
      <td style="padding:12px 0 0;font-family:${CAPS};font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#000000;font-weight:600;">Total</td>
      <td></td>
      <td style="padding:12px 0 0;font-family:${SERIF};font-size:15px;color:#000000;text-align:right;font-weight:bold;white-space:nowrap;">${esc(order.total)}</td>
    </tr>
  </table>`;
}

function ctaBlock(order: OrderInfo): string {
  if (order.format !== "digital") return "";
  if (order.downloadUrl) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
      <tr><td align="center" style="padding:0 40px;">
        <a href="${esc(order.downloadUrl)}" style="display:inline-block;background-color:#000000;color:#FFFFFF;font-family:${CAPS};font-size:12px;letter-spacing:0.3em;text-transform:uppercase;text-decoration:none;padding:16px 36px;border-radius:2px;">Download White Words (PDF)</a>
        <div style="margin-top:14px;font-family:${SERIF};font-size:12px;color:#999999;word-break:break-all;">or copy: <a href="${esc(order.downloadUrl)}" style="color:#666666;">${esc(order.downloadUrl)}</a></div>
      </td></tr>
    </table>`;
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
    <tr><td style="padding:16px 18px;border:1px solid #E0E0E0;font-family:${SERIF};font-size:14px;color:#333333;line-height:1.7;">Your download link is being prepared — please email <a href="mailto:${esc(order.authorEmail)}" style="color:#000000;">${esc(order.authorEmail)}</a> if you don't receive it shortly.</td></tr>
  </table>`;
}

export function renderOrderEmailHtml(order: OrderInfo, buyerName: string): string {
  const greeting = `<p style="margin:0 0 14px;font-family:${SERIF};font-size:18px;color:#000000;">Dear ${esc(buyerName)},</p>`;
  const lead =
    order.format === "digital"
      ? `<p style="margin:0;font-family:${SERIF};font-size:15px;line-height:1.8;color:#333333;">Your order <b style="color:#000000;">${esc(order.orderNumber)}</b> is confirmed. Your copy of <i>White Words</i> is ready — download it below.</p>`
      : `<p style="margin:0;font-family:${SERIF};font-size:15px;line-height:1.8;color:#333333;">Your order <b style="color:#000000;">${esc(order.orderNumber)}</b> is confirmed. Your printed copy will be dispatched from the author's study within 2–4 weeks.</p>`;

  return `<div style="background-color:#F5F5F5;padding:32px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border:1px solid #E0E0E0;">
        <tr><td style="padding:36px 40px 0;text-align:center;">
          <div style="font-family:${CAPS};font-size:11px;letter-spacing:0.45em;text-transform:uppercase;color:#000000;font-weight:600;">${esc(order.siteName)}</div>
          <div style="margin-top:20px;">${rules()}</div>
        </td></tr>
        <tr><td style="padding:26px 40px 0;text-align:center;">
          <div style="font-family:${CAPS};font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#999999;">White Words &nbsp;·&nbsp; Order ${esc(order.orderNumber)}</div>
        </td></tr>
        <tr><td align="center" style="padding:28px 40px 0;">
          <img src="${esc(order.siteUrl)}/bookstore/white-words-cover.webp" alt="White Words — Darshan Pathak" width="220" style="width:220px;max-width:100%;border:1px solid #E5E5E5;display:block;" />
        </td></tr>
        <tr><td style="padding:30px 40px 0;">
          ${greeting}
          ${lead}
          ${summaryTable(order)}
        </td></tr>
        ${ctaBlock(order)}
        <tr><td style="padding:36px 40px 0;">
          <div style="height:1px;background-color:#E5E5E5;"></div>
        </td></tr>
        <tr><td style="padding:26px 40px 36px;text-align:center;">
          <div style="font-family:${SERIF};font-size:16px;font-style:italic;color:#000000;">— ${esc(order.authorName)}</div>
          <div style="margin-top:12px;font-family:${CAPS};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#999999;"><a href="${esc(order.siteUrl)}" style="color:#666666;text-decoration:none;">${esc(order.siteUrl.replace(/^https?:\/\//, ""))}</a></div>
          <div style="margin-top:14px;font-family:${SERIF};font-size:11px;color:#AAAAAA;">This email was sent automatically to confirm your order. Replies reach the author at <a href="mailto:${esc(order.authorEmail)}" style="color:#999999;">${esc(order.authorEmail)}</a>.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</div>`;
}

export function renderOrderEmailText(order: OrderInfo, buyerName: string): string {
  const lines: string[] = [];
  lines.push(`Dear ${buyerName},`);
  lines.push("");
  if (order.format === "digital") {
    lines.push(`Your order ${order.orderNumber} is confirmed.`);
    if (order.downloadUrl) {
      lines.push("");
      lines.push(`Download your copy: ${order.downloadUrl}`);
    } else {
      lines.push("");
      lines.push(`Your download link is being prepared — email ${order.authorEmail} if you don't receive it shortly.`);
    }
  } else {
    lines.push(`Your order ${order.orderNumber} is confirmed. Your printed copy will be dispatched from the author's study within 2–4 weeks.`);
  }
  if (order.items.length) {
    lines.push("");
    for (const i of order.items) lines.push(`- ${i.title} x${i.quantity} — ${i.price}`);
    lines.push(`Total: ${order.total}`);
  }
  lines.push("");
  lines.push(`— ${order.authorName}, ${order.siteName}`);
  lines.push(order.siteUrl);
  return lines.join("\n");
}