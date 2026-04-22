import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NAV_ITEMS } from '../../utils/data';
import MobileNav from './MobileNav';
import styles from './Nav.module.css';

interface NavProps {
  activeSection: string;
  setCursorLabel: (label: string) => void;
}

export default function Nav({ activeSection, setCursorLabel }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!navRef.current) return;

      if (currentY > lastScrollY.current && currentY > 200) {
        gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power2.in' });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <button
          className={styles.logo}
          onClick={() => scrollTo('hero')}
          onMouseEnter={() => setCursorLabel('home')}
          onMouseLeave={() => setCursorLabel('')}
        >
          <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
            <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="var(--c-accent)" strokeWidth="1.5" fill="none"/>
            <polygon points="20,12 28,16.5 28,25.5 20,30 12,25.5 12,16.5" fill="var(--c-accent)" opacity="0.8"/>
          </svg>
          <span className={styles.logoText}>Ankit.Studio</span>
        </button>

        {/* Nav links */}
        <ul className={styles.links}>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                className={`${styles.link} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setCursorLabel(item.label)}
                onMouseLeave={() => setCursorLabel('')}
              >
                <span className={styles.linkIndex}>0{item.index + 1}</span>
                <span className={styles.linkLabel}>{item.label}</span>
                {activeSection === item.id && (
                  <span className={styles.activeDot} />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA (desktop) */}
        <button
          className={styles.cta}
          onMouseEnter={() => setCursorLabel('hire me')}
          onMouseLeave={() => setCursorLabel('')}
          onClick={() => scrollTo('contact')}
        >
          <span>Available for work</span>
          <span className={styles.ctaDot} />
        </button>

        {/* Mobile hamburger */}
        <MobileNav activeSection={activeSection} />
      </div>
    </nav>
  );
}
