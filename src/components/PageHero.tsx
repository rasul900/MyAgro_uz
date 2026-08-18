import styles from "./PageHero.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
};

export function PageHero({ eyebrow, title, text }: Props) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 className={`display ${styles.title}`}>{title}</h1>
        {text ? <p className={styles.text}>{text}</p> : null}
      </div>
    </section>
  );
}
