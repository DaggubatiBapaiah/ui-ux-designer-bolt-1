export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  duration: string;
  image: string;
  color: string;
  brief: string;
  problem: string;
  process: string[];
  solution: string;
  outcome: string;
  tags: string[];
}

export const portraitImage = 'https://images.pexels.com/photos/14535948/pexels-photo-14535948.jpeg?auto=compress&cs=tinysrgb&h=900&w=600';

export const cardLeftImage = 'https://images.pexels.com/photos/20694723/pexels-photo-20694723.jpeg?auto=compress&cs=tinysrgb&h=500&w=400';
export const cardLeftBackImage = 'https://images.pexels.com/photos/7698707/pexels-photo-7698707.jpeg?auto=compress&cs=tinysrgb&h=500&w=400';
export const cardRightImage = 'https://images.pexels.com/photos/5668776/pexels-photo-5668776.jpeg?auto=compress&cs=tinysrgb&h=500&w=400';
export const cardRightBackImage = 'https://images.pexels.com/photos/4977354/pexels-photo-4977354.jpeg?auto=compress&cs=tinysrgb&h=500&w=400';

export const projects: Project[] = [
  {
    id: 'lumen',
    title: 'Lumen Banking',
    category: 'Fintech / Mobile App',
    year: '2025',
    client: 'Lumen Financial',
    role: 'Lead Product Designer',
    duration: '6 months',
    image: 'https://images.pexels.com/photos/89955/pexels-photo-89955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#c25e3a',
    brief: 'Redesigning personal banking for a generation that expects simplicity without sacrificing trust.',
    problem: 'Lumen\'s legacy app had a 32% abandonment rate during onboarding. Users found the interface cluttered, the mental model confusing, and the visual language felt outdated for a fintech targeting 25-35 year-olds.',
    process: [
      'Conducted 24 user interviews across three demographics to map pain points and mental models.',
      'Synthesized findings into a journey map revealing three critical drop-off zones in onboarding.',
      'Rapid-prototyped 5 onboarding flows and ran unmoderated usability tests with 60 participants.',
      'Iterated the winning flow through 3 rounds, reducing steps from 12 to 5.',
      'Built a component library in Figma with 80+ variants, tokens, and dark/light theming.',
    ],
    solution: 'A calm, confident banking experience with progressive disclosure, biometric-first authentication, and a card-centric home screen. The design system uses a warm neutral palette to feel approachable while maintaining the gravitas expected of a financial institution.',
    outcome: 'Onboarding completion rose to 89%. App store rating climbed from 3.1 to 4.7 stars. The design system was adopted across 4 product teams.',
    tags: ['UX Research', 'Design System', 'Prototyping', 'iOS', 'Android'],
  },
  {
    id: 'pulse',
    title: 'Pulse Analytics',
    category: 'SaaS / Dashboard',
    year: '2024',
    client: 'Pulse Data Inc.',
    role: 'Senior UX Designer',
    duration: '4 months',
    image: 'https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#5a7355',
    brief: 'Turning complex real-time data into an interface that decision-makers can actually use.',
    problem: 'Pulse had a powerful data engine but a UI that only data scientists could love. Non-technical users needed 45+ minutes to build their first custom report, and most never returned after the trial.',
    process: [
      'Shadowed 8 power users and 12 trial users to understand the gap between expert and novice workflows.',
      'Created a task-based information architecture, reorganizing 40+ features into 6 clear categories.',
      'Designed a guided report builder with smart defaults and inline education.',
      'Ran A/B tests on 3 dashboard layouts to validate which structure reduced time-to-insight.',
      'Delivered a 120-screen Figma prototype with interactive states and edge cases documented.',
    ],
    solution: 'A modular dashboard with a configurable widget system, drag-and-drop report building, and contextual help that appears exactly when users need it. The visual language uses data-viz best practices: restrained color, clear hierarchy, and purposeful whitespace.',
    outcome: 'Time-to-first-report dropped from 45 minutes to 6. Trial-to-paid conversion improved by 41%. NPS went from 12 to 54.',
    tags: ['Data Visualization', 'Information Architecture', 'SaaS', 'Design System'],
  },
  {
    id: 'atlas',
    title: 'Atlas Brand System',
    category: 'Brand / Identity',
    year: '2024',
    client: 'Atlas Studios',
    role: 'Brand & Digital Designer',
    duration: '3 months',
    image: 'https://images.pexels.com/photos/5706015/pexels-photo-5706015.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#8a7a63',
    brief: 'A complete brand identity for a creative studio that needed to stand out in a sea of sameness.',
    problem: 'Atlas Studios had grown from a two-person team to a 30-person agency, but their visual identity still looked like a side project. They needed a system that felt established, distinctive, and flexible enough to work across every touchpoint.',
    process: [
      'Ran brand workshops with the founding team to surface values, personality, and positioning.',
      'Explored 4 visual directions, narrowed to 2, and refined the winner through 5 iterations.',
      'Designed a custom logotype and supporting mark with geometric foundations.',
      'Built a 60-page brand guideline covering logo, color, type, imagery, motion, and voice.',
      'Created templates for social, presentations, and proposals to ensure consistency.',
    ],
    solution: 'A warm, editorial brand identity with a custom wordmark, a versatile accent color, and a typography system that balances authority with creativity. The identity system includes motion principles and a flexible grid that adapts from business cards to billboards.',
    outcome: 'Atlas saw a 60% increase in inbound inquiries within 3 months. The brand system was featured in two design publications.',
    tags: ['Brand Identity', 'Typography', 'Art Direction', 'Guidelines'],
  },
  {
    id: 'haven',
    title: 'Haven Commerce',
    category: 'E-commerce / Web',
    year: '2025',
    client: 'Haven Home',
    role: 'Lead UX Designer',
    duration: '5 months',
    image: 'https://images.pexels.com/photos/5632391/pexels-photo-5632391.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    color: '#a14a30',
    brief: 'An e-commerce experience for a home goods brand that treats shopping like curating a space.',
    problem: 'Haven\'s existing Shopify store had a 1.8% conversion rate—well below the industry average. The product discovery experience was generic, the checkout was friction-heavy, and the brand\'s premium positioning was completely absent online.',
    process: [
      'Analyzed heatmaps and session recordings from 2,000+ user sessions to find friction points.',
      'Designed a mood-board-based discovery system that lets users shop by aesthetic, not just category.',
      'Prototyped a one-page checkout with progressive disclosure and tested with 40 users.',
      'Created a custom product configurator with real-time AR preview.',
      'Built a 90-screen responsive design system covering the full purchase journey.',
    ],
    solution: 'A commerce experience that feels like browsing a beautifully curated gallery. The design features editorial product photography, a mood-based filtering system, and a checkout that collapses from 3 pages to 1. Every interaction is tuned for delight without sacrificing speed.',
    outcome: 'Conversion rate rose from 1.8% to 4.7%. Average order value increased by 28%. Mobile checkout completion reached 92%.',
    tags: ['E-commerce', 'UX Strategy', 'Responsive Design', 'Prototyping'],
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Maya doesn\'t just design screens—she reframes the problem until the solution becomes inevitable. Working with her changed how our entire team thinks about product design.',
    author: 'Sarah Chen',
    title: 'VP of Product',
    company: 'Lumen Financial',
  },
  {
    quote: 'The depth of research and the clarity of the final design was unlike anything I\'ve seen from a designer in 15 years of building products. Every decision had a reason.',
    author: 'Marcus Webb',
    title: 'CEO',
    company: 'Pulse Data Inc.',
  },
  {
    quote: 'She took our messy, half-formed brand and turned it into something that finally looks like the studio we always wanted to be. The inbound speaks for itself.',
    author: 'Jin Park',
    title: 'Creative Director',
    company: 'Atlas Studios',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'User interviews, competitive analysis, and data deep-dives to understand the real problem before touching a pixel.',
    icon: 'Search',
  },
  {
    number: '02',
    title: 'Define',
    description: 'Synthesizing research into journey maps, personas, and a clear design strategy that aligns stakeholders.',
    icon: 'Compass',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Rapid prototyping, design systems, and iterative testing—turning ideas into interfaces that feel inevitable.',
    icon: 'PenTool',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Pixel-perfect handoff, component documentation, and developer collaboration to ship the vision intact.',
    icon: 'Rocket',
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 8, suffix: '+', label: 'Years of Experience' },
  { value: 47, suffix: '', label: 'Projects Shipped' },
  { value: 12, suffix: '', label: 'Design Awards' },
  { value: 4, suffix: 'M', label: 'Users Impacted' },
];

export const recognition = [
  'Awwwards SOTD ×3',
  'CSS Design Awards',
  'Communication Arts',
  'Designboom',
  'Behance Featured',
  'Figma Community',
];

export const skills = [
  'Figma', 'Framer', 'Webflow', 'Prototyping', 'Design Systems',
  'User Research', 'Usability Testing', 'Information Architecture',
  'Interaction Design', 'Motion Design', 'Data Visualization',
  'Brand Strategy', 'Wireframing', 'A/B Testing',
  'Accessibility', 'Design Tokens', 'Component Libraries',
];
