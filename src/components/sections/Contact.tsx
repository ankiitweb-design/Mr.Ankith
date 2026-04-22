import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  setCursorLabel: (label: string) => void;
}

const SOCIALS = [
  {
    icon: FiGithub,
    label: 'GitHub',
    href: 'https://github.com/ankiitweb-design',
    handle: '@ankiitweb-design',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ankit-kumar-new712001/',
    handle: 'ankit-kumar',
  },
  {
    icon: FiMail,
    label: 'Gmail',
    href: 'mailto:ankiit.web@gmail.com',
    handle: 'ankiit.web@gmail.com',
  },
  {
    icon: FiTwitter,
    label: 'WhatsApp',
    href: 'https://wa.me/916385077487',
    handle: 'Message on WhatsApp',
  },
];
export default function Contact({ setCursorLabel }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <div className="container">
        {/* Big headline */}
        <div className={`${styles.headline} contact-reveal`}>
          <span className="label">// Let's build something</span>
          <h2 className={styles.heading}>
            Got a project?
            <br />
            <span className="gradient-text">Let's talk.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Left — form */}
          <div className={`${styles.formCol} contact-reveal`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your name</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Jane Smith"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email address</label>
                <input
                  type="email"
                  className={styles.formInput}
                  placeholder="jane@company.com"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tell me about your project</label>
                <textarea
                  className={styles.formTextarea}
                  placeholder="I'm working on..."
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
                onMouseEnter={() => setCursorLabel('send')}
                onMouseLeave={() => setCursorLabel('')}
              >
                {submitted ? (
                  <>
                    <span>✓ Message sent!</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <FiArrowUpRight />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right — info */}
          <div className={`${styles.infoCol} contact-reveal`}>
            {/* Availability */}
            <div className={styles.availCard}>
              <div className={styles.availDot} />
              <div>
                <span className={styles.availStatus}>Available for work</span>
                <p className={styles.availDesc}>
                 I am currently open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out. Looking forward to creating something amazing together!
                </p>
              </div>
            </div>

            {/* Timezone */}
            <div className={styles.infoBlock}>
              <span className="label">// Based in</span>
              <p className={styles.infoText}>Chennai, INDIA</p>
              <p className={styles.infoSubtext}>PST (UTC-5.30) — open to remote</p>
            </div>

            {/* Preferred work */}
            <div className={styles.infoBlock}>
              <span className="label">// Looking for</span>
              <div className={styles.tagList}>
                {['3D / WebGL', 'Creative dev', 'React apps', 'Full stack', 'Consulting'].map(t => (
                  <span key={t} className={styles.infoTag}>{t}</span>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className={styles.infoBlock}>
              <span className="label">// Find me at</span>
              <div className={styles.socials}>
                {SOCIALS.map((s, i) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLink} ${hoveredSocial === i ? styles.socialActive : ''}`}
                    onMouseEnter={() => { setHoveredSocial(i); setCursorLabel(s.label); }}
                    onMouseLeave={() => { setHoveredSocial(null); setCursorLabel(''); }}
                  >
                    <span className={styles.socialIcon}><s.icon /></span>
                    <span className={styles.socialLabel}>{s.label}</span>
                    <span className={styles.socialHandle}>{s.handle}</span>
                    <FiArrowUpRight className={styles.socialArrow} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
