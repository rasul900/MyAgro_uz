import { NextRequest, NextResponse } from "next/server";

/**
 * APK havolasi faqat server env da — brauzer HTML da ochiq chiqmaydi.
 * Oddiy redirect + asosiy himoya sarlavhalari.
 */
export async function GET(req: NextRequest) {
  const apkUrl = (process.env.APK_URL || "").trim();

  if (!apkUrl) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "APK_URL sozlanmagan. .env.local yoki Vercel Environment Variables ga APK_URL qo‘ying.",
      },
      { status: 503 },
    );
  }

  // Oddiy bot/skriptlarni sekinlatish — to'liq himoya emas, lekin ochiq linkdan yaxshiroq
  const ua = req.headers.get("user-agent") || "";
  if (!ua || ua.length < 8) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const res = NextResponse.redirect(apkUrl, 302);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
