import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { BrandLogo } from "@/components/BrandLogo";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Dasturchi",
  description:
    "MyAgro muallifi Abdurasul — web dasturchi. Loyiha haqida va bog‘lanish.",
};

export default function DeveloperPage() {
  return (
    <main>
      <PageHero
        eyebrow="Dasturchi"
        title="Abdurasul"
        text="Web Developer · MyAgro muallifi"
      />
      <div className={`container ${styles.content}`}>
        <Reveal className={styles.team}>
          <div className={styles.avatar} aria-hidden>
            A
          </div>
          <div>
            <p className={styles.role}>Web Developer</p>
            <h2 className={`display ${styles.teamTitle}`}>Salom, men Abdurasul</h2>
            <p>
              O‘zbekiston fermer va tomorqachilari uchun zamonaviy texnologiyani
              sodda qilib yetkazish — mening asosiy maqsadim. MyAgro shu yo‘lda
              yaratilgan: ovoz orqali gapiring, AI-agronom amaliy maslahat bersin.
            </p>
            <p>
              Men web va mobil dasturlash bilan shug‘ullanaman. MyAgro Android
              ilovasi (Flutter) va rasmiy sayt (Next.js) — ikkalasi ham mening
              qo‘limdan chiqqan. Hozirgi holat: Android MVP (~0.1.3).
            </p>
            <p>
              Taklif, xato yoki hamkorlik uchun bog‘laning. Loyihani birgalikda
              yanada foydali qilishga ochiqman.
            </p>

            <p className={styles.skills}>
              <strong>Yo‘nalish:</strong> Flutter / Android · Next.js / React · AI
              integratsiya · UI/UX
            </p>

            <div className={styles.teamActions}>
              <BrandLogo size={28} />
              <a className="btn btn-primary" href="/api/download">
                APK yuklab olish
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
