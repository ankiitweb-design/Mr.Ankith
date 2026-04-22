// ─── Section Types ───────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  index: number;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  accentColor: string;
  metrics?: { label: string; value: string }[];
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

// ─── Three.js / R3F Types ─────────────────────────────────
export interface ParticleData {
  positions: Float32Array;
  colors: Float32Array;
  count: number;
}

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  label: string;
}

// ─── GSAP Context ─────────────────────────────────────────
export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}
