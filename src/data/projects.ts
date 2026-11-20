import type { Contribution } from '../components/ContributionCards';

export type ScreenshotCrop = {
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ProjectImage = {
  asset: string;
  label: string;
  description: string;
  crop?: ScreenshotCrop;
};

type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  team?: { size: number; members?: string[] };
  dateRange?: string;
  summary: string;
  overview: string;
  contribution: Contribution[];
  stack?: { frontend: string[]; backend?: string[] };
  website?: string;
  demo?: string;
  repository?: string;
  githubOrganization?: string;
  coverScreens?: { asset: string; label: string }[];
  screenshots?: { introduction: string; images: ProjectImage[]; orientation?: 'portrait' };
};

const projectImages = Object.entries(import.meta.glob<string>(
  '../assets/projects/*.{avif,jpg,jpeg,png,webp}',
  { eager: true, import: 'default', query: '?url' },
));

export function getProjectImage(asset: string) {
  return projectImages.find(([path]) => path.startsWith(`../assets/projects/${asset}.`))?.[1];
}

export function getProjectCoverScreens(screens: Project['coverScreens'] = []) {
  return screens.flatMap(({ asset, label }) => {
    const src = getProjectImage(asset);
    return src ? [{ src, label }] : [];
  });
}

export const projects: Project[] = [
  {
    slug: 'modula-pos',
    title: 'Modula POS',
    category: 'Capstone Project',
    role: 'Frontend Lead, Developer & UI/UX Designer',
    team: { size: 6 },
    dateRange: 'October 2025 – Present',
    summary: 'A modular web and mobile point-of-sale system for food and beverage businesses in Cambodia.',
    website: 'https://modulapos.com/#/login',
    githubOrganization: 'https://github.com/modulaPOS',
    overview: 'Modula POS is a modular point-of-sale system with web and mobile apps. It helps businesses in Cambodia process orders and payments, track inventory, and manage staff. Businesses can start with the modules they need and add more as they grow.',
    contribution: [
      {
        title: 'Frontend leadership',
        icon: 'team',
        description: 'Led frontend work on a six-person engineering team. I planned and reviewed frontend tasks and gave feedback on teammates’ work.',
      },
      {
        title: 'Web and mobile design',
        icon: 'design',
        description: 'Designed web and mobile interfaces in Figma before implementation.',
      },
      {
        title: 'Feature development',
        icon: 'code',
        description: 'Developed and polished the frontend for menu management, tenant and branch management, and staff and attendance management.',
      },
    ],
    stack: {
      frontend: ['Flutter', 'Dart', 'Riverpod'],
      backend: ['Node.js', 'TypeScript'],
    },
    screenshots: {
      introduction: 'These screenshots highlight selected Modula POS features for switching between business workspaces, managing staff, and planning shifts.',
      images: [
        {
          asset: 'modula-pos-tenants',
          label: 'Tenant selection',
          description: 'Choose a business workspace and see its branch and staff totals before entering.',
        },
        {
          asset: 'modula-pos-staff',
          label: 'Staff management',
          description: 'Search staff records and review roles, branch assignments, and account status in one view.',
        },
        {
          asset: 'modula-pos-shifts',
          label: 'Shift management',
          description: 'Review reusable shift templates and see the working hours and weekdays assigned to each one.',
        },
      ],
    },
  },
  {
    slug: 'journeyjournal',
    title: 'JourneyJournal',
    category: 'Academic Project',
    role: 'Frontend Developer & UI/UX Designer',
    team: { size: 2 },
    dateRange: 'January 2026',
    summary: 'A mobile travel planner for itineraries, expenses, checklists, and reminders.',
    coverScreens: [
      { asset: 'journeyjournal-splash', label: 'JourneyJournal launch screen' },
      { asset: 'journeyjournal', label: 'JourneyJournal trip list' },
    ],
    demo: 'https://youtu.be/YlJCnB4gv_g?si=LDU4Ut9bL63IDiz1',
    repository: 'https://github.com/Chhun-Nika/JourneyJournal_app',
    overview: 'JourneyJournal helps travelers keep track of the practical details of a trip. Users can manage trips, record expenses, and track tasks with checklists. Notifications support the planning workflow by reminding users about travel-related tasks.',
    contribution: [
      { title: 'Mobile design and development', icon: 'mobile', description: 'Contributed to the mobile UI/UX and frontend development.' },
      { title: 'Trip planning and reminders', icon: 'reminders', description: 'Developed trip management and notification features, helping users organize their plans and receive reminders within the app.' },
    ],
    stack: {
      frontend: ['Flutter', 'Dart', 'SQLite', 'Shared Preferences', 'GoRouter', 'Flutter Local Notifications'],
    },
    screenshots: {
      introduction: 'These screens show how travelers open a saved trip, review daily plans, track spending, and check off tasks.',
      orientation: 'portrait',
      images: [
        {
          asset: 'journeyjournal',
          label: 'Trip list',
          description: 'Browse saved trips by name and date, or start planning a new trip.',
        },
        {
          asset: 'journeyjournal-itinerary',
          label: 'Daily itinerary',
          description: 'Review activities by day with their times, locations, and reminder status.',
        },
        {
          asset: 'journeyjournal-expenses',
          label: 'Expense tracking',
          description: 'See the trip total, a breakdown by category, and individual expenses.',
        },
        {
          asset: 'journeyjournal-checklist',
          label: 'Trip checklist',
          description: 'Organize to-do items, see scheduled reminders, and keep track of completed tasks.',
        },
      ],
    },
  },
  {
    slug: 'baycanteen',
    title: 'BayCanteen',
    category: 'Academic Project',
    role: 'Frontend Developer & UI/UX Designer',
    team: { size: 6 },
    dateRange: 'September 2025',
    summary: 'A campus dining platform where students and staff vote for upcoming meals.',
    overview: 'BayCanteen gives diners a way to vote for meals, browse the menu, save dishes to a wishlist, and share feedback. Canteen staff have their own interface for managing menus and voting polls and reviewing activity through a dashboard.',
    contribution: [
      { title: 'Diner and staff workflows', icon: 'workflow', description: 'Designed the UI and UX across both the diner-facing and staff-facing workflows.' },
      { title: 'Staff tools', icon: 'dashboard', description: 'Implemented the staff-side features, including menu management, dashboards, and voting poll management.' },
      { title: 'Diner-facing frontend', icon: 'frontend', description: 'Contributed to the React frontend for the diner-facing experience.' },
    ],
    stack: {
      frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Axios', 'Framer Motion'],
    },
    website: 'https://meal-voting-system-frontend.vercel.app/',
    repository: 'https://github.com/Chhun-Nika/Bay-canteen_Frontend',
    screenshots: {
      introduction: 'These screenshots show how diners browse meals, save dishes, vote on upcoming options, and share feedback.',
      images: [
        {
          asset: 'baycanteen-home',
          label: 'Homepage',
          description: 'See how the landing page introduces meal voting and directs diners to the current poll.',
        },
        {
          asset: 'baycanteen-menu-wishlist',
          label: 'Menu and wishlist',
          description: 'Browse the full menu and find saved dishes at the top of the page.',
          crop: { sourceWidth: 2163, sourceHeight: 1350, x: 0, y: 170, width: 2160, height: 1180 },
        },
        {
          asset: 'baycanteen-feedback',
          label: 'Anonymous feedback',
          description: 'Rate the canteen and the site separately, leave a comment, and read recent feedback.',
          crop: { sourceWidth: 2940, sourceHeight: 1912, x: 8, y: 301, width: 2919, height: 1420 },
        },
      ],
    },
  },
  {
    slug: 'crochetcraft',
    title: 'CrochetCraft',
    category: 'Academic Project',
    role: 'Full-Stack Developer',
    team: { size: 2 },
    dateRange: 'July 2025',
    summary: 'An e-commerce site for handmade crochet products and crafting supplies.',
    repository: 'https://github.com/Chhun-Nika/crochetCraft',
    overview: 'CrochetCraft lets shoppers browse products by category, search and filter the catalog, save items to a wishlist, and manage cart quantities before placing an order. The customer portal also supports account registration, login, and profile management.',
    contribution: [
      { title: 'Backend development', icon: 'server', description: 'Developed REST APIs and server-side workflows for the e-commerce platform.' },
      { title: 'Database integration', icon: 'database', description: 'Managed database integration with Sequelize and MySQL.' },
      { title: 'Frontend integration', icon: 'integration', description: 'Supported frontend integration so the React interface could use the backend APIs for shopping and account workflows.' },
    ],
    stack: {
      frontend: ['React', 'Vite', 'Tailwind CSS'],
      backend: ['Node.js', 'Express', 'Sequelize', 'MySQL'],
    },
    screenshots: {
      introduction: 'These screens follow the shopping flow from browsing the catalog to reviewing the order at checkout.',
      images: [
        {
          asset: 'crochetcraft-catalog',
          label: 'Product catalog',
          description: 'Search for handmade crochet products, filter by category, and save favorites.',
        },
        {
          asset: 'crochetcraft-product',
          label: 'Product details',
          description: 'Review the product information, choose a quantity, and add the item to the cart.',
        },
        {
          asset: 'crochetcraft-checkout',
          label: 'Checkout',
          description: 'Enter shipping information and review the order total before continuing to payment.',
        },
      ],
    },
  },
];
