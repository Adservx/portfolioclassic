import { NextResponse } from "next/server";
import { refreshDownloadLink } from "@/lib/download";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization") ?? "";
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const link = await refreshDownloadLink();
    return NextResponse.json({ ok: true, provider: link.provider, expiresAt: link.expiresAt });
  } catch (err) {
    console.error("Download link refresh failed:", err);
    return NextResponse.json({ ok: false, error: "Refresh failed" }, { status: 502 });
  }
}
