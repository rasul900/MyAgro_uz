import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <BrandLogo size={26} />
          <p>Ovoz-birinchi AI-agronom · O‘zbekiston fermerlari uchun</p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/qollanma">Qo‘llanma</Link>
          <Link href="/maxfiylik">Maxfiylik</Link>
          <Link href="/dasturchi">Dasturchi</Link>
          <a href="/api/download">Yuklab olish</a>
        </nav>
        <p className={styles.copy}>© {new Date().getFullYear()} MyAgro</p>
      </div>
    </footer>
  );
}
