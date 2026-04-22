import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { CursorState } from '../../types';
import styles from './Cursor.module.css';

interface CursorProps {
  cursor: CursorState;
}

export default function Cursor({ cursor }: CursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(ringRef.current, { xPercent: -50, yPercent: -50 });
  }, []);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    gsap.to(dotRef.current, {
      x: cursor.x,
      y: cursor.y,
      duration: 0.05,
      ease: 'none',
    });

    gsap.to(ringRef.current, {
      x: cursor.x,
      y: cursor.y,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [cursor.x, cursor.y]);

  useEffect(() => {
    if (!ringRef.current || !dotRef.current) return;

    if (cursor.isHovering) {
      gsap.to(ringRef.current, {
        width: 64,
        height: 64,
        borderColor: 'var(--c-accent)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dotRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
      });
    } else {
      gsap.to(ringRef.current, {
        width: 32,
        height: 32,
        borderColor: 'rgba(255,255,255,0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dotRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      });
    }
  }, [cursor.isHovering]);

  useEffect(() => {
    if (!dotRef.current) return;
    gsap.to(dotRef.current, {
      scale: cursor.isClicking ? 0.5 : 1,
      duration: 0.15,
    });
  }, [cursor.isClicking]);

  return (
    <>
      <div
        ref={dotRef}
        className={styles.dot}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${cursor.isHovering ? styles.hovering : ''}`}
        style={{ left: 0, top: 0 }}
      >
        {cursor.label && (
          <span ref={labelRef} className={styles.label}>
            {cursor.label}
          </span>
        )}
      </div>
    </>
  );
}
