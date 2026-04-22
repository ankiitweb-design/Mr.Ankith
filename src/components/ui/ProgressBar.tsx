import { useScrollProgress } from '../../hooks';
import styles from './ProgressBar.module.css';

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
