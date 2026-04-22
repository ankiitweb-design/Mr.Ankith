import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTypingEffect } from '../../hooks';
import CharacterScene from '../three/CharacterScene';
import ShaderScene from '../three/ShaderScene';
import styles from './Hero.module.css';

const TYPING_WORDS = [
  'Creative Developer',
  '3D Generalist',
  'UI Architect',
  'Open Source Builder',
];

interface HeroProps {
  setCursorLabel: (label: string) => void;
}

export default function Hero({ setCursorLabel }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const preLabelRef = useRef<HTMLDivElement>(null);

  const typedWord = useTypingEffect(TYPING_WORDS, 80);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Words slide up inside their clip container
      const words = headingRef.current?.querySelectorAll<HTMLElement>('.hero-word');
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        preLabelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      if (words && words.length > 0) {
        tl.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.08,
          },
          '-=0.3'
        );
      } else {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.3'
        );
      }

      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      {/* 3D layers */}
      <div className={styles.sceneContainer}>
        <ShaderScene />
        <CharacterScene />
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.left}>
          {/* Pre-label */}
          <div ref={preLabelRef} className={styles.preLabel}>
            <span className={styles.preDot} />
            <span className="label">Available for projects</span>
          </div>

          {/* Main heading — each word wrapped for clip animation */}
          <h1 ref={headingRef} className={styles.heading}>
            <span className={styles.wordWrap}>
              <span className={`${styles.word} hero-word`}>Building</span>
            </span>
            <br />
            <span className={styles.wordWrap}>
              <span className={`${styles.word} ${styles.accentWord} hero-word`}>Digital</span>
            </span>
            <br />
            <span className={styles.wordWrap}>
              <span className={`${styles.word} hero-word`}>Worlds</span>
            </span>
          </h1>

          {/* Typing subtitle */}
          <p ref={subRef} className={styles.sub}>
            <span className={styles.typed}>{typedWord}</span>
            <span className={styles.cursor}>|</span>
          </p>

          {/* Description */}
          <p className={styles.desc}>
            Crafting immersive 3D experiences and high-performance web applications.
            Specializing in WebGL, React Three Fiber, and creative engineering.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className={styles.ctas}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollTo('work')}
              onMouseEnter={() => setCursorLabel('explore')}
              onMouseLeave={() => setCursorLabel('')}
            >
              <span>View Work</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => setCursorLabel('contact')}
              onMouseLeave={() => setCursorLabel('')}
            >
              Get in touch
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className={styles.stats}>
            {[
              { value: '1+', label: 'Years exp.' },
              { value: '2+', label: 'Projects shipped' },
              { value: 'MCA', label: 'GRADUATE' },
            ].map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className={styles.cornerDecor} aria-hidden="true">
        <svg viewBox="0 0 100 100" width="100" height="100" fill="none">
          <path d="M 0 100 L 0 0 L 100 0"
            stroke="var(--c-accent)" strokeWidth="1" opacity="0.3" />
          <circle cx="0" cy="0" r="3" fill="var(--c-accent)" />
        </svg>
      </div>

      {/* HUD corner — top right */}
      <div className={styles.hudCorner} aria-hidden="true">
        <span className={styles.hudLine}>SYS_ONLINE</span>
        <span className={styles.hudLine}>WebGL::ACTIVE</span>
        <span className={styles.hudLine}>R3F::v8</span>
      </div>
    </section>
  );
}
