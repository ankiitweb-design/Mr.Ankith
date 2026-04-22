import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../../utils/data';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  setCursorLabel: (label: string) => void;
}

export default function About({ setCursorLabel }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.to(imageRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.exp-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.exp-item',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className="container">
        <div className={styles.grid}>

          {/* Left — photo */}
          <div className={styles.leftCol}>
            <div ref={imageRef} className={styles.avatarWrap}>
              <div className={styles.avatarBg} />
              <img
                src="/avatar.jpeg"
                alt="Ankit — Web Developer"
                className={styles.avatarPhoto}
              />
              <div className={`${styles.badge} ${styles.badge1}`}>
                <span>React</span>
              </div>
              <div className={`${styles.badge} ${styles.badge2}`}>
                <span>UI/UX</span>
              </div>
              <div className={`${styles.badge} ${styles.badge3}`}>
                <span>MCA</span>
              </div>
            </div>
          </div>

          {/* Right — text + experience */}
          <div ref={textRef} className={styles.rightCol}>
            <div className="about-reveal">
              <span className="label">// About me</span>
              <h2 className={styles.heading}>
                Hi, I'm<br />
                <span className="gradient-text">Ankit Kumar</span>
              </h2>
            </div>

            <div className="about-reveal">
              <p className={styles.bio}>
                I'm a Web Developer and Product Associate with a passion
                for building intuitive digital experiences. I bridge the
                gap between design and engineering — turning ideas into
                clean, functional interfaces that users enjoy.
              </p>
              <p className={styles.bio}>
                I design and develop modern, responsive websites that
                deliver seamless user experiences. Focused on clean code,
                creative design, and <strong>100% dedication</strong> to
                continuous growth.
              </p>
            </div>

            {/* Experience timeline */}
            <div className={`${styles.expSection} about-reveal`}>
              <span className="label">// Experience</span>
              <div className={styles.timeline}>
                {EXPERIENCES.map((exp, i) => (
                  <div
                    key={i}
                    className={`${styles.expItem} exp-item`}
                    onMouseEnter={() => setCursorLabel('view')}
                    onMouseLeave={() => setCursorLabel('')}
                  >
                    <div className={styles.expLeft}>
                      <span className={styles.expPeriod}>{exp.period}</span>
                    </div>
                    <div className={styles.expLine}>
                      <div className={styles.expDot} />
                      <div className={styles.expVLine} />
                    </div>
                    <div className={styles.expRight}>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      <span className={styles.expCompany}>{exp.company}</span>
                      <p className={styles.expDesc}>{exp.description}</p>
                      <div className={styles.expTags}>
                        {exp.tags.map(tag => (
                          <span key={tag} className={styles.expTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}