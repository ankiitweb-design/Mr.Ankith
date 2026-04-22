import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { NAV_ITEMS } from '../../utils/data';
import styles from './SideNav.module.css';

interface SideNavProps {
  activeSection: string;
}

export default function SideNav({ activeSection }: SideNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 1.5 }
    );
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={navRef} className={styles.sideNav} aria-label="Section navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            className={`${styles.dot} ${isActive ? styles.active : ''}`}
            onClick={() => scrollTo(item.id)}
            aria-label={`Go to ${item.label}`}
            title={item.label}
          >
            <span className={styles.dotCore} />
            <span className={styles.dotLabel}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
