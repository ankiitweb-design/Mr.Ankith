# ◈ 3D Portfolio — React + TypeScript + Three.js + GSAP

A production-grade, immersive personal portfolio built with modern creative web technologies. Features a full 3D character scene, scroll-driven GSAP animations, custom cursor interactions, and a dark cyber-noir aesthetic.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [GSAP License Note](#gsap-license-note)
7. [Customization Guide](#customization-guide)
8. [Troubleshooting](#troubleshooting)
9. [Deployment](#deployment)
10. [License](#license)

---

## Features

- **Responsive one-page portfolio** with reusable section components (Hero, About, Work, Skills, Contact)
- **3D character scene** powered by React Three Fiber — animated distortion sphere with orbital particles, bloom, and chromatic aberration post-processing
- **Ambient background scene** with floating crystal geometries and animated grid
- **GSAP-powered animations** — intro loader, scroll-triggered reveals, SplitText heading animations, parallax effects, and staggered entrances
- **Custom cursor** — smooth lagging ring + dot with hover state morphing and label display
- **Typing effect** cycling through developer role titles
- **Scroll progress bar** with gradient fill
- **Skill proficiency bars** with scroll-triggered fill animations
- **Animated project cards** with per-card accent colors and metric readouts
- **Dual react-fast-marquee** tech stack banners
- **Contact form** with animated submission state
- **Auto-hide navigation** that reappears on scroll-up
- **Intro loader** with progress bar animation
- **Grain overlay** and CRT scanline aesthetics
- **Vercel Analytics** integration
- **Fully typed** with TypeScript throughout

---

## Tech Stack

### Core
| Package | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |

### Animation & 3D
| Package | Version | Purpose |
|---|---|---|
| gsap | 3.12.x | Scroll animations, transitions |
| @gsap/react | 2.x | GSAP React hooks |
| three | 0.165.x | 3D rendering engine |
| @react-three/fiber | 8.x | React renderer for Three.js |
| @react-three/drei | 9.x | R3F helpers (Float, Stars, Trail, etc.) |
| @react-three/postprocessing | 2.x | Bloom, ChromaticAberration |
| @react-three/cannon | 6.x | Physics (available for extension) |
| @react-three/rapier | 1.x | Modern physics (available for extension) |

### Supporting
| Package | Version | Purpose |
|---|---|---|
| react-fast-marquee | 1.6.x | Scrolling tech banner |
| react-icons | 5.x | Icon library |
| @vercel/analytics | 1.x | Usage analytics |

---

## Project Structure

```
portfolio-3d/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.tsx + .module.css
│   │   │   ├── About.tsx + .module.css
│   │   │   ├── Work.tsx + .module.css
│   │   │   ├── Skills.tsx + .module.css
│   │   │   └── Contact.tsx + .module.css
│   │   ├── three/             # R3F scene components
│   │   │   ├── CharacterScene.tsx   # Hero 3D scene
│   │   │   └── BackgroundScene.tsx  # Ambient bg crystals
│   │   └── ui/                # UI chrome
│   │       ├── Cursor.tsx + .module.css
│   │       ├── Nav.tsx + .module.css
│   │       ├── ProgressBar.tsx + .module.css
│   │       └── Footer.tsx + .module.css
│   ├── hooks/
│   │   └── index.ts           # useCursor, useScrollProgress, useActiveSection,
│   │                          # useGSAPReveal, useParallax, useTypingEffect
│   ├── types/
│   │   └── index.ts           # All TypeScript interfaces
│   ├── utils/
│   │   └── data.ts            # Portfolio content (projects, skills, experience)
│   ├── styles/
│   │   ├── globals.css        # Design system, CSS variables, animations
│   │   └── loader.css         # Intro loader styles
│   ├── App.tsx                # Root component + layout
│   └── main.tsx               # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **pnpm** 8+

### Installation

```bash
# 1. Clone or download the project
git clone https://github.com/yourusername/portfolio-3d.git
cd portfolio-3d

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** The 3D scene uses WebGL. Ensure your browser supports it (all modern browsers do).

---

## Available Scripts

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript check + production build → dist/
npm run preview   # Preview the production build locally
npm run lint      # ESLint check across all TS/TSX files
```

---

## GSAP License Note

This project uses the **free public GSAP build** (`gsap` npm package). The following plugins are included in the free tier and work without a Club GSAP license:

- `ScrollTrigger` ✅ (free)
- `Flip` ✅ (free)
- `Observer` ✅ (free)

The following plugin is **Club GSAP only**:

- `SplitText` ⚠️ — Used in `Hero.tsx` for character-by-character heading animation. The code gracefully falls back to a simple `opacity/y` tween if `SplitText` is unavailable. To enable it:

  1. Purchase a [Club GSAP](https://gsap.com/pricing/) membership
  2. Install via the GSAP private registry or copy files from the member download
  3. Remove the try/catch fallback in `Hero.tsx`

---

## Customization Guide

### 1. Update your personal content

Edit `src/utils/data.ts`:

```ts
// Change projects
export const PROJECTS: Project[] = [
  {
    title: 'Your Project Name',
    subtitle: 'Tagline here',
    description: 'What you built and why it matters.',
    tags: ['React', 'TypeScript'],
    year: '2024',
    accentColor: '#00ffe6',  // Pick any hex color
    metrics: [
      { label: 'Users', value: '10k+' },
    ],
  },
  // ...
];

// Change experience
export const EXPERIENCES = [ ... ];

// Change skills
export const SKILLS = [ ... ];
```

### 2. Update personal info

In `src/components/sections/Hero.tsx`:
```ts
const TYPING_WORDS = [
  'Your Title',
  'Another Role',
  // ...
];
```

In `src/components/sections/Contact.tsx`:
- Update `SOCIALS` array with your real links and handles
- Update the "Based in" location text

### 3. Change the color scheme

Edit CSS variables in `src/styles/globals.css`:

```css
:root {
  --c-accent: #00ffe6;     /* Primary accent — cyan */
  --c-accent-2: #ff2d6b;   /* Secondary — pink/red */
  --c-accent-3: #7b2fff;   /* Tertiary — purple */
  --c-bg: #060608;          /* Background */
}
```

### 4. Customize the 3D scene

Edit `src/components/three/CharacterScene.tsx`:
- Change `color` props on `MeshDistortMaterial` to retheme the sphere
- Adjust `distort` (0–1) and `speed` for different morphing feels
- Add `@react-three/rapier` physics for interactive collision

### 5. Add a real contact form

In `Contact.tsx`, replace the `handleSubmit` stub with a real API call:

```ts
// Example: Formspree
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await fetch('https://formspree.io/f/your-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formState),
  });
  setSubmitted(true);
};
```

---

## Troubleshooting

### WebGL / Three.js errors
- Ensure your GPU drivers are up to date
- Try disabling browser extensions (especially ad blockers that block canvas)
- The background scene uses `dpr={1}` for performance; the hero scene uses `dpr={[1, 2]}`

### GSAP SplitText not working
- See [GSAP License Note](#gsap-license-note) above
- The fallback animation runs automatically without it

### Build errors with Three.js types
```bash
npm install --save-dev @types/three@latest
```

### Slow dev startup
Vite pre-bundles `three`, `@react-three/fiber`, and `gsap` on first run. Subsequent starts are instant thanks to caching.

### Performance on lower-end devices
- Reduce `COUNT` in `ParticleField` (CharacterScene.tsx) from 1200 to 600
- Set `dpr={1}` on both Canvas components
- Disable `<EffectComposer>` or remove `<Bloom>` if FPS is low

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys on push.

### Netlify

```bash
npm run build
# Drag and drop the dist/ folder to netlify.com/drop
```

Or set build command: `npm run build` and publish directory: `dist`

### Static hosting (GitHub Pages, S3, etc.)

```bash
npm run build
# Upload the contents of dist/ to your hosting provider
```

Add to `vite.config.ts` if deploying to a subdirectory:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

---

## License

MIT © 2024 — Free to use, modify, and distribute.

Attribution appreciated but not required. If you build something cool with this, share it!

---

*Built with ♥ using React, Three.js, GSAP, and too much caffeine.*
