import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Qo‘llanma",
  description:
    "MyAgro Android ilovasini o‘rnatish, ruxsatlar va asosiy foydalanish bo‘yicha qisqa qo‘llanma.",
};

const steps = [
  {
    t: "APK ni o‘rnating",
    d: "«Android APK yuklab olish» ni bosing. Fayl ochilgach, noma’lum manbalardan o‘rnatishga ruxsat bering. Birinchi ochilishda soft-update tekshiruvi bo‘lishi mumkin.",
  },
  {
    t: "Mikrofon va kamera",
    d: "Ovozli yordamchi uchun mikrofon, kasallik tahlili uchun kamera ruxsatini bering. Joylashuv — ob-havo va yaqin do‘konlar uchun ixtiyoriy.",
  },
  {
    t: "Ro‘yxatdan o‘ting",
    d: "Ism, telefon, ferma turi va maydonni kiriting. Bu ma’lumot maslahatlarni shaxsiylashtirish uchun ishlatiladi.",
  },
  {
    t: "Ovozli savol bering",
    d: "Mikrofonni bosing va o‘zbekcha gapiring — masalan, «Pomidorni qachon sug‘oraman?». Javob matnda va ovozda keladi.",
  },
  {
    t: "Kasallikni suratga oling",
    d: "Barg yoki meva suratini oling. Natijada kasallik nomi, ishonch foizi, davolash va dori yo‘nalishlari ko‘rinadi.",
  },
  {
    t: "Xarita va ob-havo",
    d: "Maydon chizing, gektarni hisoblang. Ob-havo bo‘limida kunlik agronomik tavsiyani o‘qing.",
  },
];

export default function GuidePage() {
  return (
    <main>
      <PageHero
        eyebrow="Qo‘llanma"
        title="Ilovani bosqichma-bosqich ishlatish"
        text="O‘rnatishdan asosiy foydalanishgacha — qisqa va tushunarli."
      />
      <div className={`container ${styles.content}`}>
        <Reveal>
          <p className={styles.intro}>
            MyAgro ovoz-birinchi mobil ilova. Eng muhimi: mikrofon, aniq savol
            va kerak bo‘lsa barg surati. Quyida o‘rnatish va foydalanish yo‘li.
          </p>
        </Reveal>
        <Stagger className={styles.steps} stagger={0.07}>
          {steps.map((s, i) => (
            <StaggerItem key={s.t}>
              <div className={styles.step}>
                <em>{String(i + 1).padStart(2, "0")}</em>
                <div>
                  <strong>{s.t}</strong>
                  <span>{s.d}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className={styles.note} delay={0.05}>
          <h2 className="display">Eslatma</h2>
          <p>
            Bu sayt faqat mahsulot haqida. Chat, kamera va xarita funksiyalari
            Android ilovada ishlaydi — vebda takrorlanmaydi.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
