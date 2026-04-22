import type { NavItem, Project, Skill, Experience } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', index: 0 },
  { id: 'about', label: 'About', index: 1 },
  { id: 'work', label: 'Work', index: 2 },
  { id: 'skills', label: 'Skills', index: 3 },
  { id: 'contact', label: 'Contact', index: 4 },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'EazyPay',
    subtitle: 'Digital Lending Application',
    description: 'A digital lending application where loans are simple and secure. Features OTP login flow, clean dashboard UI for managing loans, and a streamlined application process designed for ease of use.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Replit', 'In Progress 🚧'],
    year: '2024',
    accentColor: '#00ffe6',
    metrics: [
      { label: 'Status', value: '🚧' },
      { label: 'Type', value: 'FinTech' },
      { label: 'Auth', value: 'OTP' },
    ],
  },
  {
    id: 'proj-02',
    title: 'Cart Karo-ur personal carpenter',
    subtitle: 'E-Commerce Concept Platform',
    description: 'A modern e-commerce platform concept focused on smooth UI and a user-friendly shopping experience. Built around clean product browsing, intuitive cart management, and a seamless checkout flow.',
    tags: ['React', 'UI/UX', 'E-Commerce', 'Coming Soon 🚀'],
    year: '2025',
    accentColor: '#ff2d6b',
    metrics: [
      { label: 'Status', value: '🚀' },
      { label: 'Type', value: 'E-Commerce' },
      { label: 'Focus', value: 'UI/UX' },
    ],
  },
];

export const SKILLS: Skill[] = [
  {
    category: 'Frontend',
    icon: '⬡',
    items: ['React', 'TypeScript', 'Next.js', 'Vue', 'Svelte', 'Tailwind'],
  },
  {
    category: '3D & Animation',
    icon: '◈',
    items: ['Three.js', 'R3F', 'GSAP', 'WebGL', 'GLSL', 'Blender'],
  },
  {
    category: 'Backend',
    icon: '◬',
    items: ['Node.js', 'Python', 'Rust', 'Go', 'GraphQL', 'PostgreSQL'],
  },
  {
    category: 'Infrastructure',
    icon: '⬟',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Vercel'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Web Developer & Product Associate',
    company: 'Self / Freelance',
    period: '2024 — Present',
    description: 'Building web applications focused on clean UI, intuitive user experiences, and bridging design with functional engineering. Working on digital lending and e-commerce concepts.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Product'],
  },
  {
    role: 'MCA Graduate',
    company: 'University',
    period: '2022 — 2024',
    description: 'Master of Computer Applications — gained strong foundations in software engineering, web technologies, databases, and product thinking.',
    tags: ['MCA', 'Software Engineering', 'Web Tech', 'Databases'],
  },
];

export const MARQUEE_ITEMS = [
  'React',
  'JavaScript',
  'HTML & CSS',
  'UI/UX Design',
  'Product Associate',
  'Node.js',
  'Web Development',
  'Replit',
  'GitHub',
  'Figma',
  'MCA Graduate',
  'Ankit Studio',
];
