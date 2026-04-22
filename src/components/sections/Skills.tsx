import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from 'react-fast-marquee';
import { SKILLS, MARQUEE_ITEMS } from '../../utils/data';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  setCursorLabel: (label: string) => void;
}

function SkillBar({ label, level }: { label: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current!.querySelector('.bar-fill'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={barRef} className={styles.skillBar}>
      <div className={styles.skillBarTop}>
        <span className={styles.skillBarLabel}>{label}</span>
        <span className={styles.skillBarPct}>{level}%</span>
      </div>
      <div className={styles.skillBarTrack}>
        <div
          className={`${styles.skillBarFill} bar-fill`}
          style={{
            width: `${level}%`,
            transformOrigin: 'left center',
          }}
        />
      </div>
    </div>
  );
}

const CORE_SKILLS = [
  { label: 'React / Next.js', level: 96 },
  { label: 'TypeScript', level: 93 },
  { label: 'Three.js / WebGL', level: 88 },
  { label: 'GSAP Animation', level: 91 },
  { label: 'Node.js / Go', level: 85 },
  { label: 'GLSL / Shaders', level: 78 },
  { label: 'Python / ML', level: 80 },
  { label: 'DevOps / K8s', level: 74 },
];

export default function Skills({ setCursorLabel }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.skills-reveal',
            start: 'top 85%',
          },
        }
      );

      // Category cards
      gsap.fromTo(
        '.cat-card',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.4)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.cat-card',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      {/* Marquee banner */}
      <div className={styles.marqueeWrap}>
        <Marquee speed={40} gradient={false} className={styles.marquee}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot}>◆</span>
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container">
        {/* Header */}
        <div className={`${styles.header} skills-reveal`}>
          <span className="label">// Capabilities</span>
          <h2 className={styles.heading}>
            Tools of the
            <br />
            <span className="gradient-text">trade</span>
          </h2>
          <p className={styles.desc}>
            A growing toolkit built with dedication — focused on clean UI,
            modern web technologies, and delivering real user value.
          </p>
        </div>

        <div className={styles.body}>
          {/* Left — proficiency bars */}
          <div className={styles.leftCol}>
            <div className={`${styles.barsHeader} skills-reveal`}>
              <span className="label">// Proficiency</span>
            </div>
            <div className={styles.bars}>
              {CORE_SKILLS.map(s => (
                <SkillBar key={s.label} label={s.label} level={s.level} />
              ))}
            </div>
          </div>

          {/* Right — category cards */}
          <div className={styles.rightCol}>
            <div className={`${styles.barsHeader} skills-reveal`}>
              <span className="label">// Categories</span>
            </div>
            <div className={styles.catGrid}>
              {SKILLS.map((skill) => (
                <div
                  key={skill.category}
                  className={`${styles.catCard} cat-card`}
                  onMouseEnter={() => setCursorLabel('stack')}
                  onMouseLeave={() => setCursorLabel('')}
                >
                  <div className={styles.catIcon}>{skill.icon}</div>
                  <h3 className={styles.catTitle}>{skill.category}</h3>
                  <ul className={styles.catItems}>
                    {skill.items.map(item => (
                      <li key={item} className={styles.catItem}>
                        <span className={styles.catDot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second marquee (reverse) */}
      <div className={styles.marqueeWrap} style={{ marginTop: '5rem' }}>
        <Marquee speed={30} gradient={false} direction="right" className={styles.marquee}>
          {[...MARQUEE_ITEMS].reverse().map((item, i) => (
            <span key={i} className={`${styles.marqueeItem} ${styles.marqueeItemAlt}`}>
              <span className={styles.marqueeDot}>◇</span>
              {item}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
