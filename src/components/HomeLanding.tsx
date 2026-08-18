"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { VoiceWave } from "@/components/VoiceWave";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import styles from "./home.module.css";

const features = [
  {
    id: "voice",
    wide: true,
    title: "Ovozli AI agronom",
    text: "Mikrofonni bosing va o‘zbekcha gapiring. Sug‘orish, o‘g‘it, kasallik, ob-havo — savolni oddiy tilda ayting. Javob matnda chiqadi va ovozda ham eshitiladi. Murakkab menyu yodlab o‘tirish shart emas.",
    icon: "mic",
  },
  {
    id: "cam",
    title: "Kamera tahlili",
    text: "Barg yoki mevani suratga oling. AI kasallik nomini, ishonch foizini va davolash yo‘lini ko‘rsatadi. Kerak bo‘lsa dori yo‘nalishi ham chiqadi.",
    icon: "cam",
  },
  {
    id: "weather",
    title: "Ob-havo maslahati",
    text: "Kunlik va haftalik prognoz. Shu kun uchun agronomik tavsiya: sug‘orish, o‘g‘it yoki ishlovni yomg‘irga qarab moslang.",
    icon: "weather",
  },
  {
    id: "map",
    title: "Xarita va maydon",
    text: "OpenStreetMap’da yerni chizing, gektarni hisoblang. Yaqin agro do‘konlarni xaritada toping — dori izlash osonlashadi.",
    icon: "map",
  },
  {
    id: "user",
    title: "Profil va yangilanish",
    text: "Ism, telefon, ferma turi va maydon saqlanadi. Soft-update orqali APK yangilanadi — doim oxirgi versiya.",
    icon: "user",
  },
];

const questions = [
  { tag: "Sug‘orish", q: "Pomidorni qachon sug‘oraman?" },
  { tag: "Kasallik", q: "Bargda sariq dog‘ bor — bu nima?" },
  { tag: "O‘g‘it", q: "Bugun o‘g‘it bersam bo‘ladimi?" },
  { tag: "Ob-havo", q: "Yomg‘ir qachon yog‘adi?" },
  { tag: "Xarita", q: "Maydonim necha gektar?" },
  { tag: "Do‘kon", q: "Yaqin agro do‘kon qayerda?" },
];

const steps = [
  {
    n: "1",
    title: "O‘rnating",
    text: "APK ni yuklab oling, noma’lum manbadan o‘rnatishga ruxsat bering. Mikrofon va kamera ruxsatini so‘raydi — ovoz va surat shu uchun.",
  },
  {
    n: "2",
    title: "Ro‘yxatdan o‘ting",
    text: "Ism, telefon, ferma turi va maydon. Bu ma’lumot maslahatni sizning yeringizga yaqinlashtiradi.",
  },
  {
    n: "3",
    title: "Gapiring yoki suratga oling",
    text: "Savolni o‘zbekcha ayting. Barg kasal bo‘lsa — kamerani oching. Ikkalasi ham bir oqimda.",
  },
  {
    n: "4",
    title: "Amal qiling",
    text: "Qisqa javobni o‘qing yoki eshiting. Xaritada gektarni tekshiring, ob-havo bo‘yicha shu kun rejasini oling.",
  },
];

const audience = [
  {
    title: "Fermer",
    text: "Katta maydon, ob-havo va sug‘orish rejasini ovoz bilan boshqaring. Xaritada gektarni aniq biling.",
  },
  {
    title: "Tomorqachi",
    text: "Hovlidagi pomidor, bodring, uzum. Barg dog‘ini suratga oling — nima ekanini tushunib oling.",
  },
  {
    title: "Kichik xo‘jalik",
    text: "O‘g‘it va dori savollari, yaqin do‘kon. Texnikatilsiz, oddiy o‘zbekcha suhbat.",
  },
];

const faqs = [
  {
    q: "Ilova pullikmi?",
    a: "Hozircha Android APK bepul yuklab olinadi. Asosiy funksiyalar ilova ichida ishlaydi.",
  },
  {
    q: "Qaysi tilda ishlaydi?",
    a: "O‘zbekcha. Savolni gapirib berasiz — javob ham o‘zbekchada, matn va ovozda.",
  },
  {
    q: "Internet kerakmi?",
    a: "Ovoz, kasallik tahlili va ob-havo uchun internet kerak. Kalitlar bo‘lmasa ilova xatosiz namuna rejimida ochiladi.",
  },
  {
    q: "iPhone’da ishlaydimi?",
    a: "Hozircha asosiy platforma Android. iOS reja bosqichida.",
  },
  {
    q: "Ma’lumotlarim qayerda?",
    a: "Ism, telefon va ferma ma’lumoti hisob uchun. Rasmlar kasallik tahlili uchun yuboriladi, reklama tarmog‘iga sotilmaydi. Batafsil — Maxfiylik sahifasida.",
  },
];

export function HomeLanding() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const [home, setHome] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const heroTVar = useTransform(scrollYProgress, (p) =>
    Math.min(1, Math.max(0, p / 0.88)).toFixed(4),
  );
  const photoVar = useTransform(scrollYProgress, (p) =>
    (1 - Math.min(1, Math.max(0, p / 0.62))).toFixed(4),
  );
  const copyIntroVar = useTransform(scrollYProgress, (p) => {
    if (p <= 0.28) return "1";
    if (p >= 0.58) return "0";
    return (1 - (p - 0.28) / 0.3).toFixed(4);
  });
  const copyHomeVar = useTransform(scrollYProgress, (p) => {
    if (p <= 0.42) return "0";
    if (p >= 0.78) return "1";
    return ((p - 0.42) / 0.36).toFixed(4);
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px)");
    const onChange = () => {
      if (!mq.matches) setHome(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (
      reduceMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia("(max-width: 959px)").matches)
    ) {
      setHome(false);
      return;
    }
    setHome(p > 0.48);
  });

  return (
    <main>
      <section
        ref={stageRef}
        className={`${styles.pinStage} ${reduceMotion ? styles.pinStatic : ""}`}
        aria-label="MyAgro"
      >
        <motion.div
          className={styles.pinSticky}
          style={
            reduceMotion
              ? undefined
              : {
                  ["--hero-t" as string]: heroTVar,
                  ["--copy-intro" as string]: copyIntroVar,
                  ["--copy-home" as string]: copyHomeVar,
                  ["--photo-o" as string]: photoVar,
                }
          }
        >
          <div className={styles.heroGlow} aria-hidden />
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.copy}>
              <div className={styles.copyIntro}>
                <p className={styles.pill}>Ovozli AI · Android · O‘zbekcha</p>
                <h1 className={`display ${styles.headline}`}>
                  Gapiring.
                  <br />
                  <span>Maslahat oling.</span>
                </h1>
                <p className={styles.lead}>
                  MyAgro — fermer va tomorqachilar uchun ovoz-birinchi raqamli
                  agronom. Sug‘orish, o‘g‘it, o‘simlik kasalligi va ob-havo
                  bo‘yicha savolni o‘zbekcha ayting.
                </p>
                <ul className={styles.heroPoints}>
                  <li>Ovoz: tinglaydi va ovozda javob beradi</li>
                  <li>Kamera: bargdan kasallik tahlili</li>
                  <li className={styles.desktopHint}>
                    Pastga skrol — telefon chapga o‘tadi, menyu ochiladi
                  </li>
                </ul>
                <div className={styles.actions}>
                  <a className="btn btn-primary" href="/api/download">
                    Android APK yuklab olish
                  </a>
                  <a className="btn btn-ghost" href="#qanday">
                    Qanday ishlaydi
                  </a>
                </div>
              </div>

              <div className={styles.copyHome} aria-hidden={!home}>
                <p className={styles.pill}>Asosiy menyu · Android</p>
                <h1 className={`display ${styles.headline}`}>
                  Hammasi
                  <br />
                  <span>bir joyda.</span>
                </h1>
                <p className={styles.lead}>
                  Ovozdan keyin asosiy ekran: kamera, xarita, ob-havo, dorilar va
                  agro do‘konlar. Pastki menyudan ochiladi — markazda kasallik
                  kamerali tugmasi.
                </p>
              </div>
            </div>

            <div className={styles.sceneStack}>
              <div className={styles.scenePhoto} aria-hidden>
                <Image
                  src="/photos/field.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 48vw"
                  className={styles.cover}
                />
              </div>

              <div className={styles.scene}>
                <VoicePhone home={home} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className={styles.strip} aria-label="Qisqa faktlar">
        <div className={`container ${styles.stripRow}`}>
          <p>
            <strong>Ovoz-birinchi</strong>
            Ekranga qaramasdan ishlating
          </p>
          <p>
            <strong>Kamera + AI</strong>
            Bargdan kasallik tahlili
          </p>
          <p>
            <strong>O‘zbek tili</strong>
            Savol va javob o‘zbekcha
          </p>
          <p>
            <strong>Android APK</strong>
            Bepul yuklab oling
          </p>
        </div>
      </section>

      <section className={styles.problem}>
        <div className={`container ${styles.problemGrid}`}>
          <Reveal>
            <p className={styles.kicker}>Muammo va yechim</p>
            <h2 className={`display ${styles.sectionTitle}`}>
              Agronom har doim yoningizda bo‘lmaydi
            </h2>
            <p className={styles.sectionLead}>
              Dalada savol chiqadi: sug‘oraymi, o‘g‘it beraymi, bu dog‘ nima?
              Maslahat kechiksa — hosil zarar ko‘radi. MyAgro shu joyda:
              mikrofonni bosib gapirasiz yoki bargni suratga olasiz.
            </p>
            <p className={styles.sectionLead}>
              Ilova STT (nutqni matnga) va TTS (javobni ovozga) orqali ishlaydi.
              Kasallik tahlili kameradan olingan surat bo‘yicha AI modeliga
              yuboriladi. Ob-havo GPS va prognoz asosida, xarita — OpenStreetMap.
            </p>
          </Reveal>
          <Reveal delay={0.06} className={styles.photoCard}>
            <Image
              src="/photos/seedling.jpg"
              alt="Ko‘chat — qo‘lda yosh o‘simlik"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.cover}
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.examples} aria-labelledby="savollar-title">
        <div className="container">
          <Reveal>
            <p className={styles.kicker}>Namuna savollar</p>
            <h2 id="savollar-title" className={`display ${styles.sectionTitle}`}>
              Nima deb so‘rash mumkin
            </h2>
            <p className={styles.sectionLead}>
              Oddiy gap — yetarli. Maxsus atama yodlash shart emas.
            </p>
          </Reveal>
          <Stagger className={styles.qGrid} stagger={0.06}>
            {questions.map((item) => (
              <StaggerItem key={item.q}>
                <article className={styles.qCard}>
                  <span>{item.tag}</span>
                  <p>«{item.q}»</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="imkoniyatlar" className={styles.features}>
        <div className="container">
          <Reveal>
            <p className={styles.kicker}>Imkoniyatlar</p>
            <h2 className={`display ${styles.sectionTitle}`}>Ilovada nima bor</h2>
            <p className={styles.sectionLead}>
              Barcha funksiyalar Android ilovada ishlaydi. Sayt mahsulotni
              tushuntirish uchun — chat va kamera vebda takrorlanmaydi.
            </p>
          </Reveal>

          <Stagger className={styles.bento} stagger={0.07}>
            {features.map((f) => (
              <StaggerItem key={f.id} className={f.wide ? styles.spanWide : styles.span}>
                <article className={styles.card}>
                  <span className={styles.icon} aria-hidden>
                    <FeatureIcon name={f.icon} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  {f.id === "voice" ? (
                    <div className={styles.cardWave}>
                      <VoiceWave />
                    </div>
                  ) : null}
                  {f.id === "cam" ? <MiniScan /> : null}
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <div className={styles.mosaic}>
            <Reveal className={styles.mosaicWide}>
              <Image
                src="/photos/greenhouse.jpg"
                alt="Issiqxona — qatorlab o‘simliklar"
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                className={styles.cover}
              />
              <p>Issiqxona va dala — bir xil oqim: gapiring, maslahat oling.</p>
            </Reveal>
            <Reveal delay={0.06} className={styles.mosaicTall}>
              <Image
                src="/photos/weather.jpg"
                alt="Dala va osmon — ob-havo"
                fill
                sizes="(max-width: 900px) 100vw, 38vw"
                className={styles.cover}
              />
              <p>Ob-havo o‘zgarsa — kunlik tavsiya ham yangilanadi.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.scanBlock}>
        <div className={`container ${styles.scanGrid}`}>
          <Reveal className={styles.scanCopy}>
            <p className={styles.kicker}>Kasallik tahlili</p>
            <h2 className={`display ${styles.sectionTitle}`}>
              Bargdagi dog‘ni suratga oling
            </h2>
            <p className={styles.sectionLead}>
              Kamerani o‘simlikka tutasiz. AI suratni o‘qiydi va natija beradi:
              ehtimoliy kasallik, qanchalik ishonchli, nima qilish kerak.
            </p>
            <ol className={styles.scanSteps}>
              <li>Barg yoki mevani yaqindan oling, yorug‘ joyda.</li>
              <li>Tahlil bir necha soniyada chiqadi.</li>
              <li>Davolash yo‘li va dori yo‘nalishi ko‘rsatiladi.</li>
            </ol>
          </Reveal>
          <div className={styles.scanPhotos}>
            <Reveal className={styles.photoCard}>
              <Image
                src="/photos/leaf.jpg"
                alt="Bargdagi kasallik belgisi"
                fill
                sizes="(max-width: 900px) 100vw, 28vw"
                className={styles.cover}
              />
            </Reveal>
            <Reveal delay={0.08} className={styles.photoCard}>
              <Image
                src="/photos/scan.jpg"
                alt="Telefon orqali o‘simlikni suratga olish"
                fill
                sizes="(max-width: 900px) 100vw, 28vw"
                className={styles.cover}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.audience}>
        <div className="container">
          <Reveal>
            <p className={styles.kicker}>Kim uchun</p>
            <h2 className={`display ${styles.sectionTitle}`}>
              Fermer, tomorqachi, kichik xo‘jalik
            </h2>
            <p className={styles.sectionLead}>
              Texnikatilni bilmasangiz ham — gapiring. MyAgro dalada ishlaydigan
              odamlar uchun sodda til bilan yozilgan.
            </p>
          </Reveal>
          <Stagger className={styles.audGrid} stagger={0.07}>
            {audience.map((a) => (
              <StaggerItem key={a.title}>
                <article className={styles.audCard}>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="qanday" className={styles.how}>
        <div className="container">
          <Reveal>
            <p className={styles.kicker}>Qanday ishlaydi</p>
            <h2 className={`display ${styles.sectionTitle}`}>To‘rt oddiy qadam</h2>
            <p className={styles.sectionLead}>
              O‘rnatishdan birinchi maslahatgacha — qisqa yo‘l. Batafsil yo‘riqnoma{" "}
              <a href="/qollanma">Qo‘llanma</a> sahifasida.
            </p>
          </Reveal>
          <Stagger className={styles.steps} stagger={0.08}>
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <article className={styles.step}>
                  <span className={styles.stepN}>{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="container">
          <Reveal>
            <p className={styles.kicker}>Savol-javob</p>
            <h2 className={`display ${styles.sectionTitle}`}>Ko‘p so‘raladiganlar</h2>
          </Reveal>
          <div className={styles.faqList}>
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <article className={styles.faqItem}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.download}>
        <div className={`container ${styles.downloadBox}`}>
          <Reveal>
            <h2 className={`display ${styles.downloadTitle}`}>
              Android’da hozir sinab ko‘ring
            </h2>
            <p>
              Platforma: Android · Til: o‘zbekcha · Ovoz, kamera, xarita va
              ob-havo bir ilovada. O‘rnatish bo‘yicha qadamlar — qo‘llanmada.
            </p>
            <div className={styles.downloadActions}>
              <a className="btn btn-dark" href="/api/download">
                APK yuklab olish
              </a>
              <a className="btn btn-ghost" href="/qollanma">
                Qo‘llanmani o‘qish
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

const demos = [
  {
    q: "Pomidorni qachon sug‘oraman?",
    a: "Ertalab, ildiz atrofiga. Bargga tegmasin.",
  },
  {
    q: "Bargda sariq dog‘ bor.",
    a: "Kamerani oching — kasallikni aniqlayman.",
  },
  {
    q: "Bugun o‘g‘it bersam bo‘ladimi?",
    a: "Yomg‘ir kutyapti. Ertaga qoldiring.",
  },
];

function VoicePhone({ home }: { home: boolean }) {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (reduceMotion || home) return;
    const t = setInterval(() => setI((n) => (n + 1) % demos.length), 4200);
    return () => clearInterval(t);
  }, [reduceMotion, home]);

  const demo = demos[i];

  return (
    <div className={styles.phoneWrap}>
      <div className={styles.device}>
        <span className={styles.silent} />
        <span className={styles.volUp} />
        <span className={styles.volDown} />
        <span className={styles.power} />
        <div className={styles.bezel}>
          <div className={styles.screen}>
            <div className={styles.statusBar}>
              <span className={styles.clock}>9:41</span>
              <span className={styles.island} />
              <span className={styles.sys}>
                <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
                  <rect x="0" y="8" width="2.2" height="4" rx="0.4" fill="currentColor" />
                  <rect x="3.2" y="5.5" width="2.2" height="6.5" rx="0.4" fill="currentColor" />
                  <rect x="6.4" y="3" width="2.2" height="9" rx="0.4" fill="currentColor" />
                  <rect x="9.6" y="0.5" width="2.2" height="11.5" rx="0.4" fill="currentColor" />
                </svg>
                <svg width="15" height="12" viewBox="0 0 15 12" aria-hidden>
                  <path
                    d="M7.5 10.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Zm-3.3-2.3a4.6 4.6 0 0 1 6.6 0M1.4 5.2a8.6 8.6 0 0 1 12.2 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden>
                  <rect
                    x="0.6"
                    y="0.6"
                    width="21"
                    height="10.8"
                    rx="2.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <rect x="2" y="2.1" width="16.4" height="7.8" rx="1.3" fill="currentColor" />
                  <path d="M23.2 4.2v3.6c.7-.4.9-1 .9-1.8s-.2-1.4-.9-1.8Z" fill="currentColor" />
                </svg>
              </span>
            </div>

            <div className={styles.layers}>
              <div
                className={`${styles.layer} ${home ? "" : styles.layerOn}`}
                aria-hidden={home}
              >
                <div className={styles.appHead}>
                  <Image
                    src="/app-icon.png"
                    alt=""
                    width={32}
                    height={32}
                    className={styles.appIcon}
                  />
                  <div>
                    <strong>MyAgro</strong>
                    <em>
                      <span />
                      Tinglayapman
                    </em>
                  </div>
                </div>
                <div className={styles.orb} />
                <div className={styles.chat}>
                  <AnimatePresence mode="wait">
                    {ready ? (
                      <motion.div
                        key={demo.q}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                      >
                        <p className={styles.bubbleUser}>{demo.q}</p>
                        <p className={styles.bubbleAi}>{demo.a}</p>
                      </motion.div>
                    ) : (
                      <div>
                        <p className={styles.bubbleUser}>{demos[0].q}</p>
                        <p className={styles.bubbleAi}>{demos[0].a}</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={styles.dock}>
                  <span className={styles.sideBtn} aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 8h3l2-2h6l2 2h3v10H4V8Z" stroke="currentColor" strokeWidth="1.7" />
                      <circle cx="12" cy="13" r="2.6" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </span>
                  <span className={styles.mic} aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z"
                        fill="#fff"
                      />
                      <path
                        d="M5.5 12a6.5 6.5 0 0 0 13 0"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path d="M12 18.5V21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.sideBtn} aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </span>
                </div>
              </div>

              <div
                className={`${styles.layer} ${styles.layerHome} ${home ? styles.layerOn : ""}`}
                aria-hidden={!home}
              >
                {home ? (
                  <motion.div
                    className={styles.homeReveal}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <HomeMenu />
                  </motion.div>
                ) : null}
              </div>
            </div>
            <span className={styles.homeInd} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeMenu() {
  return (
    <div className={styles.homeUi}>
      <div className={styles.homeScroll}>
        <div className={styles.homeTop}>
          <Image src="/app-icon.png" alt="" width={22} height={22} className={styles.appIcon} />
          <span className={styles.wordmark}>
            My<span>Agro</span>
          </span>
          <span className={styles.homeTopSpacer} />
          <span className={styles.topIcon} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22a2.1 2.1 0 0 0 2.1-2.1H9.9A2.1 2.1 0 0 0 12 22Zm6.3-6.2V11a6.2 6.2 0 0 0-4.7-6V4.4a1.5 1.5 0 0 0-3.2 0V5a6.2 6.2 0 0 0-4.7 6v4.8L4 17.4v.9h16v-.9l-1.7-1.6Z"
                fill="#20261F"
              />
            </svg>
          </span>
          <span className={styles.topIcon} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19.1 12.9a7.2 7.2 0 0 0 .1-1.4 7.2 7.2 0 0 0-.1-1.4l2-1.6-1.9-3.3-2.4 1a7.4 7.4 0 0 0-2.4-1.4L14 2.5h-4l-.4 2.7a7.4 7.4 0 0 0-2.4 1.4l-2.4-1-1.9 3.3 2 1.6a7 7 0 0 0 0 2.8l-2 1.6 1.9 3.3 2.4-1a7.4 7.4 0 0 0 2.4 1.4l.4 2.7h4l.4-2.7a7.4 7.4 0 0 0 2.4-1.4l2.4 1 1.9-3.3-2-1.6ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"
                fill="#20261F"
              />
            </svg>
          </span>
        </div>

        <p className={styles.hello}>Assalomu alaykum, Fermer!</p>
        <p className={styles.homeSub}>Bugun sizga qanday yordam bera olaman?</p>

        <div className={styles.voiceCard}>
          <span className={styles.voiceDot} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3.5a3.2 3.2 0 0 0-3.2 3.2v5.1a3.2 3.2 0 1 0 6.4 0V6.7A3.2 3.2 0 0 0 12 3.5Z"
                fill="#fff"
              />
              <path
                d="M6 12.2a6 6 0 0 0 12 0"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path d="M12 18.3V21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <div className={styles.voiceCopy}>
            <b>Ovozli yordamchi</b>
            <span>Gemini AI — savolingizni ayting</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M9 6.5 15.5 12 9 17.5"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className={styles.weatherMini}>
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
            <circle cx="12" cy="12" r="4.2" fill="#E8B84B" />
            <path
              d="M12 3.2v1.6M12 19.2v1.6M4.8 12H3.2M20.8 12h-1.6M6.3 6.3l1.1 1.1M16.6 16.6l1.1 1.1M17.7 6.3l-1.1 1.1M7.4 16.6l-1.1 1.1"
              stroke="#E8B84B"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <b>28°C · ochiq</b>
            <span>Namlik 42% · Shamol 8 km/soat</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M9 6.5 15.5 12 9 17.5"
              fill="none"
              stroke="#6B7469"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className={styles.quickLabel}>Tezkor amallar</p>
        <div className={styles.quick}>
          <QuickTile color="#0B5D2E" label={"Kasallik\naniqlash"} icon="cam" />
          <QuickTile color="#3FAE5C" label={"Yer\nxaritasi"} icon="map" />
          <QuickTile color="#E8B84B" label={"Dorilar\nbazasi"} icon="med" />
          <QuickTile color="#4A90D9" label={"Agro\ndo‘konlar"} icon="shop" />
        </div>

        <div className={styles.aiTip}>
          <span className={styles.aiDot} aria-hidden>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 3.2 13.6 8.8 19.4 9l-4.6 3.6 1.6 5.6L12 15.4 7.6 18.2l1.6-5.6L4.6 9l5.8-.2L12 3.2Z" />
            </svg>
          </span>
          <div>
            <b>Bugungi AI tavsiya</b>
            <span>Ertalab sug‘oring, bargga tegmasin. Kechki o‘g‘itni ertaga qoldiring.</span>
          </div>
        </div>
      </div>

      <div className={styles.barWrap}>
        <span className={styles.fab} aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 8h3l2-2h6l2 2h3v10H4V8Z" stroke="#fff" strokeWidth="1.8" />
            <circle cx="12" cy="13" r="2.8" stroke="#fff" strokeWidth="1.8" />
          </svg>
        </span>
        <nav className={styles.tabbar} aria-hidden>
          <span className={styles.tabOn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#3FAE5C">
              <path d="M12 4.5 4.5 11h2.2v8h4.1v-5.2h2.4V19h4.1v-8h2.2L12 4.5Z" />
            </svg>
            Asosiy
          </span>
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 4.5 4 6.2v13.2l5-1.6 6 1.6 5-1.6V4.8l-5 1.6-6-1.9Z"
                stroke="#6B7469"
                strokeWidth="1.6"
              />
            </svg>
            Xarita
          </span>
          <span className={styles.tabGap} />
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 16.2a4 4 0 1 1 1.2-7.8A5 5 0 0 1 20 11a3.5 3.5 0 0 1-1 6.6H7Z"
                stroke="#6B7469"
                strokeWidth="1.6"
              />
            </svg>
            Ob-havo
          </span>
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8.2" r="3.1" stroke="#6B7469" strokeWidth="1.6" />
              <path d="M5.4 19a6.6 6.6 0 0 1 13.2 0" stroke="#6B7469" strokeWidth="1.6" />
            </svg>
            Profil
          </span>
        </nav>
      </div>
    </div>
  );
}

function QuickTile({
  color,
  label,
  icon,
}: {
  color: string;
  label: string;
  icon: "cam" | "map" | "med" | "shop";
}) {
  return (
    <span className={styles.quickTile}>
      <span className={styles.quickIco} style={{ background: `${color}24`, color }}>
        {icon === "cam" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 8h3l2-2h6l2 2h3v10H4V8Z" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="13" r="2.6" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        ) : icon === "map" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 4.5 4 6.2v13.2l5-1.6 6 1.6 5-1.6V4.8l-5 1.6-6-1.9Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        ) : icon === "med" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="7" y="3.5" width="10" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 8.5v6M9 11.5h6" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 10h16l-1.2 8.2H5.2L4 10Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        )}
      </span>
      {label}
    </span>
  );
}

function MiniScan() {
  return (
    <div className={styles.miniScan} aria-hidden>
      <span className={styles.leaf} />
      <span className={styles.scan} />
    </div>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "mic":
      return (
        <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden {...stroke}>
          <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case "cam":
      return (
        <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden {...stroke}>
          <path d="M4 8h3l2-2h6l2 2h3v10H4V8Z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    case "weather":
      return (
        <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden {...stroke}>
          <path d="M7 16a4 4 0 1 1 1.2-7.8A5 5 0 0 1 20 11a3.5 3.5 0 0 1-1 6.8H7Z" />
        </svg>
      );
    case "map":
      return (
        <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden {...stroke}>
          <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    default:
      return (
        <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden {...stroke}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </svg>
      );
  }
}
