import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envFile = path.join(root, ".env.local");
if (!fs.existsSync(envFile)) {
  console.error("✗ .env.local not found");
  process.exit(1);
}
const env = Object.fromEntries(
  fs
    .readFileSync(envFile, "utf8")
    .split("\n")
    .filter((l) => l && !l.trim().startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = env;
if (!SMTP_PASS) {
  console.error("✗ SMTP_PASS is empty. Paste your Brevo SMTP key into .env.local line: SMTP_PASS=");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT ?? 587),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const to = process.argv[2] || ADMIN_EMAIL || SMTP_USER;
console.log(`→ Sending test email to ${to} via ${SMTP_HOST} ...`);
try {
  const info = await transporter.sendMail({
    from: `"Bookstore Test" <${ADMIN_EMAIL || SMTP_USER}>`,
    to,
    subject: "✔ Email is working",
    html: "<h2>Email test passed</h2><p>Your bookstore order alerts will now arrive at this inbox.</p>",
  });
  console.log("✓ Sent! Wait ~30 seconds and check the inbox (and spam folder).");
  console.log(`  Message id: ${info.messageId}`);
} catch (err) {
  console.error(`✗ Send failed: ${err.message}`);
  if (String(err.message).toLowerCase().includes("smtp")) {
    console.error("  → Double-check SMTP_PASS is the full Brevo key (starts with xsmtpsib-)");
  }
  process.exit(1);
}
