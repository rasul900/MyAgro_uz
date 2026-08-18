import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Maxfiylik",
  description:
    "MyAgro qaysi ma’lumotlarni yig‘adi, nima uchun va qayerda saqlaydi — qisqa maxfiylik siyosati.",
};

const blocks = [
  {
    t: "Shaxsiy ma’lumot",
    d: "Ism va telefon ro‘yxatda kerak. Ular xizmatni shaxsiylashtirish va hisobni bog‘lash uchun saqlanadi.",
  },
  {
    t: "Ferma ma’lumotlari",
    d: "Ferma turi, maydon (ga), ixtiyoriy joylashuv — AI maslahatini aniqroq qilish uchun.",
  },
  {
    t: "Joylashuv",
    d: "Ob-havo va yaqin do‘konlar uchun. Ruxsat bo‘lmasa default nuqta ishlatiladi. Doimiy kuzatuv yo‘q.",
  },
  {
    t: "Rasmlar",
    d: "Kasallik tahlili uchun rasm AI modeliga yuboriladi. Serverda alohida rasm arxivi saqlanmaydi.",
  },
  {
    t: "Suhbatlar",
    d: "Savol-javob AI orqali o‘tadi. Tarix faqat sizning hisobingiz ostida saqlanishi mumkin.",
  },
  {
    t: "Sirlar",
    d: "API kalitlari APK ichida ochiq emas — server muhitida. APK manzili `/api/download` orqali beriladi.",
  },
  {
    t: "Huquqlaringiz",
    d: "Ma’lumotni o‘chirish yoki tuzatish uchun dasturchi sahifasi orqali bog‘laning.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Maxfiylik"
        title="Ma’lumotlaringiz qanday ishlatiladi"
        text="Nima yig‘iladi, nima uchun va qayerda — oddiy tilda."
      />
      <div className={`container ${styles.content}`}>
        <Reveal>
          <p className={styles.intro}>
            MyAgro agro yordamchi. Telefon raqamingizni reklama tarmoqlariga
            sotmaymiz. Ma’lumotlar xizmat ko‘rsatish — AI, ob-havo, yangilanish —
            uchun ishlatiladi.
          </p>
        </Reveal>
        <Stagger className={styles.blocks} stagger={0.07}>
          {blocks.map((b) => (
            <StaggerItem key={b.t}>
              <article className={styles.block}>
                <h2 className="display">{b.t}</h2>
                <p>{b.d}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </main>
  );
}
