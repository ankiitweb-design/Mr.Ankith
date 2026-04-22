import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CursorState } from '../types';

gsap.registerPlugin(ScrollTrigger);

// ─── useCursor ────────────────────────────────────────────
export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovering: false,
    isClicking: false,
    label: '',
  });

  const setCursorLabel = useCallback((label: string) => {
    setCursor((prev: CursorState) => ({ ...prev, isHovering: !!label, label }));
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursor((prev: CursorState) => ({ ...prev, x: e.clientX, y: e.clientY }));
    };
    const handleDown = () => setCursor((prev: CursorState) => ({ ...prev, isClicking: true }));
    const handleUp = () => setCursor((prev: CursorState) => ({ ...prev, isClicking: false }));

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return { cursor, setCursorLabel };
}

// ─── useScrollProgress ────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// ─── useActiveSection ─────────────────────────────────────
export function useActiveSection(sections: string[]) {
  const [active, setActive] = useState(sections[0] || '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o: IntersectionObserver) => o.disconnect());
  }, [sections]);

  return active;
}

// ─── useGSAPReveal ────────────────────────────────────────
export function useGSAPReveal(selector: string) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector, containerRef.current!).forEach((el: HTMLElement) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector]);

  return containerRef;
}

// ─── useParallax ──────────────────────────────────────────
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [speed]);

  return ref;
}

// ─── useTypingEffect ──────────────────────────────────────
export function useTypingEffect(words: string[], speed: number = 100) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const delay = isDeleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setDisplayed(currentWord.slice(0, charIndex + 1));
          setCharIndex((c: number) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(currentWord.slice(0, charIndex - 1));
          setCharIndex((c: number) => c - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((i: number) => (i + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, speed]);

  return displayed;
}
