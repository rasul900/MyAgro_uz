import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.loading} aria-label="MyAgro yuklanmoqda" aria-busy="true">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.card}>
        <div className={styles.logoMark} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.brand}>MyAgro</div>
        <p>Daladagi yordamchingiz tayyorlanmoqda</p>
        <div className={styles.progress} aria-hidden="true">
          <span />
        </div>
        <div className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </main>
  );
}
