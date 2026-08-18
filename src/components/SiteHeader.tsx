"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/#imkoniyatlar", label: "Imkoniyatlar" },
  { href: "/#qanday", label: "Qanday ishlaydi" },
  { href: "/qollanma", label: "Qo‘llanma" },
  { href: "/maxfiylik", label: "Maxfiylik" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="MyAgro bosh sahifa">
          <BrandLogo size={30} />
        </Link>

        <nav className={styles.nav} aria-label="Asosiy">
          {links.map((l) => {
            const active =
              !l.href.startsWith("/#") &&
              (pathname === l.href || pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? styles.active : undefined}
              >
                {l.label}
              </Link>
            );
          })}
          <a href="/api/download" className={styles.cta}>
            Yuklab olish
          </a>
        </nav>

        <button
          className={styles.burger}
          type="button"
          aria-expanded={open}
          aria-label="Menyu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open ? (
        <div className={styles.menu}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href="/api/download" onClick={() => setOpen(false)}>
            Yuklab olish
          </a>
        </div>
      ) : null}
    </header>
  );
}
