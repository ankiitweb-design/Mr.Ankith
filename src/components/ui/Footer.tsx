import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <span className={styles.logo}>ANKIT.STUDIO</span>
            <span className={styles.copy}>
              © {year} — Built with React, Three.js & GSAP
            </span>
          </div>

          <div className={styles.center}>
            <span className={styles.status}>
              <span className={styles.statusDot} />
              All systems operational
            </span>
          </div>

          <div className={styles.right}>
            <span className={styles.mono}>v1.0.0 — 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
