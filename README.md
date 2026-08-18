# MyAgro marketing sayti (Next.js)

Bu papka **faqat veb-sayt**. Flutter ilova `MyAgro` papkasida qoladi.

Sayt mahsulot/marketing landing — ilova funksiyalari (ovoz, kamera) webda yo‘q.

## Lokal ishga tushirish

```bash
cp .env.example .env.local
# .env.local ichida: APK_URL=https://... (APK yuklash tugmasi uchun)

npm install
npm run dev
```

Ochiladi: http://localhost:3001

## Sahifalar

- `/` — landing (hero, imkoniyatlar, qanday ishlaydi, yuklab olish)
- `/qollanma` — o‘rnatish va foydalanish
- `/maxfiylik` — maxfiylik siyosati
- `/dasturchi` — loyiha / aloqa
- `/api/download` — APK redirect (`APK_URL` server env)

## Vercel ga qo‘yish

1. GitHub ga **shu papkani alohida repo** qilib push qiling (masalan `MyAgro-website`).
2. [Vercel](https://vercel.com/new) → **Import** shu reponi.
3. Sozlamalar:
   - **Framework Preset:** Next.js
   - **Root Directory:** bo‘sh qoldiring (`.`) — `package.json` shu papka ildizida
   - **Install Command:** `npm install` (default)
   - **Build Command:** `npm run build` (default)
4. **Environment Variables:**
   - `APK_URL` — APK faylning to‘liq URL (masalan GitHub Releases)
   - ixtiyoriy: `NEXT_PUBLIC_SITE_URL` — `https://sizning-domen.vercel.app`

Deploy. Flutter `MyAgro` reponi Vercel ga ulamang — u Next.js emas.
