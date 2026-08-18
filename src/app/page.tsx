import type { Metadata } from "next";
import { HomeLanding } from "@/components/HomeLanding";

export const metadata: Metadata = {
  title: "MyAgro — Ovozli AI-agronom",
  description:
    "O‘zbekiston fermerlari uchun ovoz-birinchi AI-agronom. Gapiring — sug‘orish, o‘g‘it, kasallik va ob-havo bo‘yicha maslahat oling. Android APK yuklab oling.",
  openGraph: {
    title: "MyAgro — Fermer gapiradi, AI javob beradi",
    description:
      "Ovoz-birinchi raqamli agronom. Android ilova, o‘zbekcha, amaliy maslahat.",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeLanding />;
}
