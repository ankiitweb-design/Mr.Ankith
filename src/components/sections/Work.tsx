import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../utils/data';
import type { Project } from '../../types';
import styles from './Work.module.css';

gsap.registerPlugin(ScrollTrigger);

interface WorkProps {
  setCursorLabel: (label: string) => void;
}

function ProjectCard({
  project,
  index,
  setCursorLabel,
}: {
  project: Project;
  index: number;
  setCursorLabel: (label: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    setCursorLabel('view');
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -8,
        borderColor: project.accentColor,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setCursorLabel('');
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        borderColor: 'rgba(255,255,255,0.06)',
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} project-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      {/* Card header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardIndex}>
          <span className={styles.indexNum}>0{index + 1}</span>
          <span className={styles.indexYear}>{project.year}</span>
        </div>
        <div
          className={styles.cardArrow}
          style={{ color: project.accentColor, opacity: hovered ? 1 : 0.3 }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      {/* Visual preview — abstract 3D-ish art */}
      <div className={styles.preview}>
        <div
          className={styles.previewArt}
          style={{ '--c': project.accentColor } as React.CSSProperties}
        >
          <div className={styles.previewOrb} />
          <div className={styles.previewGrid} />
          <div className={styles.previewLines}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.previewLine} style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <span className={styles.cardSubtitle}>{project.subtitle}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        {/* Metrics */}
        {project.metrics && (
          <div className={styles.metrics}>
            {project.metrics.map(m => (
              <div key={m.label} className={styles.metric}>
                <span className={styles.metricValue} style={{ color: project.accentColor }}>
                  {m.value}
                </span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work({ setCursorLabel }: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.work-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work-header',
            start: 'top 85%',
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.project-card',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className={styles.work}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} work-header`}>
          <div className={styles.headerLeft}>
            <span className="label">// Selected work</span>
            <h2 className={styles.heading}>
              Projects that
              <br />
              <span className="gradient-text">define me</span>
            </h2>
          </div>
          <p className={styles.headerDesc}>
            A curated selection of projects spanning immersive 3D experiences,
            systems-level engineering, and creative interfaces.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              setCursorLabel={setCursorLabel}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomCta} work-header`}>
          <div className={styles.ctaLine} />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
            onMouseEnter={() => setCursorLabel('github')}
            onMouseLeave={() => setCursorLabel('')}
          >
            <span>View all projects on GitHub</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <div className={styles.ctaLine} />
        </div>
      </div>
    </section>
  );
}
