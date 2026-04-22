import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './TransitionOverlay.module.css';

/**
 * Renders a subtle full-screen reveal overlay that wipes in
 * when navigating between sections via the side / top nav.
 * Exported as both a component and a helper function so other
 * components can trigger a transition imperatively.
 */

let _overlayEl: HTMLDivElement | null = null;

export function triggerTransition(cb?: () => void) {
  if (!_overlayEl) { cb?.(); return; }
  const tl = gsap.timeline({ onComplete: cb });
  tl.fromTo(
    _overlayEl,
    { scaleY: 0, transformOrigin: 'top center' },
    { scaleY: 1, duration: 0.4, ease: 'power3.inOut' }
  ).to(_overlayEl, {
    scaleY: 0,
    transformOrigin: 'bottom center',
    duration: 0.4,
    ease: 'power3.inOut',
    delay: 0.05,
  });
}

export default function TransitionOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    _overlayEl = ref.current;
    return () => { _overlayEl = null; };
  }, []);

  return <div ref={ref} className={styles.overlay} aria-hidden />;
}
