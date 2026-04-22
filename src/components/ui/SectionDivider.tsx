import styles from './SectionDivider.module.css';

interface SectionDividerProps {
  label?: string;
  flipped?: boolean;
}

export default function SectionDivider({ label, flipped = false }: SectionDividerProps) {
  return (
    <div className={`${styles.divider} ${flipped ? styles.flipped : ''}`}>
      <div className={styles.line} />
      {label && (
        <div className={styles.badge}>
          <span className={styles.slash}>//</span>
          <span className={styles.text}>{label}</span>
        </div>
      )}
      <div className={styles.line} />
      <svg
        className={styles.chevron}
        viewBox="0 0 24 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="0,0 12,8 24,0"
          stroke="var(--c-accent)"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="none"
        />
      </svg>
    </div>
  );
}
