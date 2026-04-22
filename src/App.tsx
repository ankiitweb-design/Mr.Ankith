import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';

import { useCursor, useActiveSection } from './hooks';
import { NAV_ITEMS } from './utils/data';

import Cursor from './components/ui/Cursor';
import Nav from './components/ui/Nav';
import SideNav from './components/ui/SideNav';
import ProgressBar from './components/ui/ProgressBar';
import Footer from './components/ui/Footer';
import TransitionOverlay from './components/ui/TransitionOverlay';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Work from './components/sections/Work';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

// Lazy-load heavy 3D background to avoid blocking initial paint
const BackgroundScene = lazy(() => import('./components/three/BackgroundScene'));

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = NAV_ITEMS.map(n => n.id);

export default function App() {
  const { cursor, setCursorLabel } = useCursor();
  const activeSection = useActiveSection(SECTION_IDS);
  const loaderRef = useRef<HTMLDivElement>(null);

  // ── Intro loader ───────────────────────────────────────
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    const bar = loader.querySelector<HTMLElement>('.loader-bar');
    if (!bar) return;

    gsap.set(bar, { scaleX: 0 });
    const tl = gsap.timeline();
    tl.to(bar, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' })
      .to(loader, { yPercent: -100, duration: 0.7, ease: 'power3.inOut', delay: 0.15 })
      .set(loader, { display: 'none' });
  }, []);

  // ── Refresh ScrollTrigger after assets load ────────────
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <>
      {/* ── Intro loader ── */}
      <div ref={loaderRef} className="loader">
        <div className="loader-content">
          <svg viewBox="0 0 40 40" width="52" height="52" fill="none">
            <polygon
              points="20,2 38,11 38,29 20,38 2,29 2,11"
              stroke="#00ffe6"
              strokeWidth="1.5"
              fill="none"
            />
            <polygon
              points="20,12 28,16.5 28,25.5 20,30 12,25.5 12,16.5"
              fill="#00ffe6"
              opacity="0.8"
            />
          </svg>
          <span className="loader-label">Initializing 3D Engine</span>
          <div className="loader-track">
            <div className="loader-bar" />
          </div>
        </div>
      </div>

      {/* ── Atmospheric overlays ── */}
      <div className="scanlines" aria-hidden />
      <TransitionOverlay />

      {/* ── Ambient 3D background ── */}
      <Suspense fallback={null}>
        <BackgroundScene />
      </Suspense>

      {/* ── Chrome / UI ── */}
      <ProgressBar />
      <Cursor cursor={cursor} />
      <Nav activeSection={activeSection} setCursorLabel={setCursorLabel} />
      <SideNav activeSection={activeSection} />

      {/* ── Page content ── */}
      <main>
        <Hero setCursorLabel={setCursorLabel} />

        <About setCursorLabel={setCursorLabel} />

        <Work setCursorLabel={setCursorLabel} />

        <Skills setCursorLabel={setCursorLabel} />
        
        <Contact setCursorLabel={setCursorLabel} />
      </main>

      <Footer />
      <Analytics />
    </>
  );
}
