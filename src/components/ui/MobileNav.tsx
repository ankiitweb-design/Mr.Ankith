import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { NAV_ITEMS } from '../../utils/data';
import styles from './MobileNav.module.css';

interface MobileNavProps {
  activeSection: string;
}

export default function MobileNav({ activeSection }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (open) {
      // Open
      gsap.set(drawerRef.current, { display: 'flex' });
      gsap.set(overlayRef.current, { display: 'block' });
      gsap.fromTo(
        drawerRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: 0.06, delay: 0.15 }
      );
    } else {
      // Close
      gsap.to(drawerRef.current, {
        xPercent: 100,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => gsap.set(drawerRef.current, { display: 'none' }),
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => gsap.set(overlayRef.current, { display: 'none' }),
      });
    }
  }, [open]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger toggle */}
      <button
        className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
        onClick={() => setOpen((o: boolean) => !o)}
        aria-label="Toggle navigation"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        style={{ display: 'none' }}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={styles.drawer}
        style={{ display: 'none' }}
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
            <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="#00ffe6" strokeWidth="1.5" fill="none"/>
            <polygon points="20,12 28,16.5 28,25.5 20,30 12,25.5 12,16.5" fill="#00ffe6" opacity="0.8"/>
          </svg>
          <span className={styles.drawerLogo}>MENU</span>
        </div>

        {/* Nav links */}
        <ul className={styles.drawerList}>
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.id}
              ref={el => { if (el) itemRefs.current[i] = el; }}
              className={styles.drawerItem}
            >
              <button
                className={`${styles.drawerLink} ${activeSection === item.id ? styles.drawerLinkActive : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                <span className={styles.drawerIndex}>0{item.index + 1}</span>
                <span className={styles.drawerLabel}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div className={styles.drawerFooter}>
          <button className={styles.drawerCta} onClick={() => scrollTo('contact')}>
            <span className={styles.ctaDot} />
            Available for work
          </button>
        </div>
      </div>
    </>
  );
}
