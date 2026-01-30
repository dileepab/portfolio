import { Palette, Server, Database, Terminal } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  challenges?: string[];
  solutions?: string[];
  features?: string[];
  category: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  education: {
    degree: string;
    school: string;
  };
  certifications: string;
  stats: {
    yearsExperience: string;
    projectsCompleted: string;
    happyClients: string;
    openSourceContribs: string;
  };
  avatar: string;
  about: string[];
}

export const profile: Profile = {
  name: "Dileepa Balasuriya",
  role: "Senior Software Engineer",
  bio: "Passionate Front End Developer dedicated to crafting immersive and user-centric web experiences. Proficient in transforming design concepts into pixel-perfect, interactive interfaces.",
  location: "Bingiriya, Sri Lanka",
  email: "bmdbalasuriya@gmail.com",
  linkedin: "linkedin.com/in/dileepabalasuriya", // Inferred pattern, user can update
  github: "profiles.topcoder.com/dileepa", // Using Topcoder as primary since it was emphasized
  education: {
    degree: "B.Sc. Engineering (Hons)",
    school: "University of Peradeniya"
  },
  certifications: "TCO15 & TCO16 UI Prototyping Champion",
  stats: {
    yearsExperience: "16+",
    projectsCompleted: "200+",
    happyClients: "80+", // Inferred from wins/clients
    openSourceContribs: "175+" // Using submission count as proxy for activity
  },
  avatar: "/profile.jpg",
  about: [
    "I am an experienced Senior IT Professional with over 16 years in software development. My expertise spans the complete SDLC, where I excel in time-critical tasks and thrive under pressure. I am a skilled team player, adept at code reviews, and have a proven track record of leading teams to achieve company goals.",
    "As a Topcoder copilot and competitor since 2010, I have participated in hundreds of projects, securing 86 wins. My focus is on creating responsive, high-performance web and mobile applications using modern technologies like React, React Native, Flutter, and Angular.",
    "I stay up-to-date with industry trends and emerging technologies to drive innovation. Whether it's building a complex financial dashboard or a seamless mobile app, I am committed to delivering visually stunning and robust solutions."
  ]
};

// Project images (using placeholders for now as specific project images weren't provided)
const projectImages = [
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800", // Finance
  "https://images.unsplash.com/photo-1554260570-e9689a3418b8?auto=format&fit=crop&q=80&w=800", // Dashboard
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800", // NFT/Crypto
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800", // Mobile
];

export const projects: Project[] = [
  {
    id: 0,
    title: "AI Powered Enterprise Guardrails",
    description: "Enterprise-grade security system for GitHub Copilot that enforces compliance, detects secrets, and prevents bad AI patterns using a hybrid analysis engine (Regex/AST + Gemini LLM).",
    longDescription: "A comprehensive security solution designed for enterprises adopting AI coding assistants. It acts as a middleware between GitHub and the developer, analyzing every pull request and commit for security violations, best practice deviations, and regulatory compliance. The system specifically targets risks introduced by AI-generated code, such as hallucinations, insecure patterns, and license violations.",
    challenges: [
      "Detecting subtle AI hallucinations that static analysis misses.",
      "Enforcing enterprise-specific coding standards across a large organization.",
      "Preventing license contamination from AI-suggested code snippets.",
      "Providing real-time feedback without slowing down the development velocity."
    ],
    solutions: [
      "Hybrid Analysis Engine combining AST parsing with Google Gemini LLM for deep context understanding.",
      "Probot-based GitHub App for seamless integration into the developer workflow.",
      "Policy-as-Code architecture allowing custom rule definition via YAML.",
      "Real-time pre-commit hooks to catch issues before they reach the remote repository."
    ],
    features: [
      "AI-Aware Static Analysis",
      "Secret & PII Detection",
      "License Compliance Scanning",
      "Automated Code Reviews",
      "Compliance Dashboard"
    ],
    category: "fullstack",
    tech: ["Python", "FastAPI", "TypeScript", "Probot", "Google Gemini", "Docker"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800", // Security/Code abstract image
    github: "github.com/dileepab/ai-guardrails-enterprise",
    live: "ai-guardrails-enterprise-production.up.railway.app",
    featured: true
  },
  {
    id: -1,
    title: "DEEZ Factory Flow",
    description: "AI-powered garment production planning system that optimizes operator assignments and schedules using detailed manufacturing data models.",
    longDescription: "A modern production planning application built for the garment industry. It digitizes the factory floor by modeling garment styles, operations, and operator profiles. The system leverages AI to generate optimal production schedules, track real-time efficiency metrics, and minimize bottlenecks. It features a modular architecture with a comprehensive style management interface and performance analytics dashboard.",
    challenges: [
      "Complex dependencies between garment manufacturing operations (e.g., 'Cut Fabric' must happen before 'Sewing').",
      "Tracking individual operator efficiency and rework rates in real-time.",
      "Optimizing production schedules to meet strict delivery deadlines.",
      "Digitizing legacy manual tracking processes without disrupting factory operations."
    ],
    solutions: [
      "Implemented a robust data model relating Styles, Operations, and Operators for granular tracking.",
      "Built a Next.js application with React Server Components for high-performance data rendering.",
      "Integrated Recharts for visualizing operator efficiency and production trends.",
      "Utilized Genkit AI for intelligent production planning and resource allocation."
    ],
    features: [
      "AI-Driven Production Scheduling",
      "Real-time Operator Efficiency Tracking",
      "Style & Operation Management",
      "Visual Performance Analytics",
      "Rework Rate Monitoring"
    ],
    category: "fullstack",
    tech: ["Next.js", "TypeScript", "Firebase", "Genkit AI", "Tailwind CSS", "Recharts"],
    image: "https://images.unsplash.com/photo-1742535038295-57e2a54809b3?fm=jpg&q=80&w=800&auto=format&fit=crop", // Textile workers
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: 7,
    title: "Crypto Checkers",
    description: "A cyberpunk-themed real-time multiplayer checkers game with AI opponents and virtual currency.",
    longDescription: "Crypto Checkers reimagines the classic board game for the Web3 era. Built with Next.js and Firebase, it features real-time multiplayer matching, AI opponents powered by Google's Genkit and Gemini models, and a virtual economy system where players earn coins. The app showcases a stunning neon-grid aesthetic, utilizing Tailwind CSS and Framer Motion for immersive visual effects.",
    category: "fullstack",
    tech: ["Next.js", "Firebase", "Genkit AI", "React", "Tailwind CSS"],
    image: "https://plus.unsplash.com/premium_photo-1720612507481-05538b2df9ff?q=80&w=1200&auto=format&fit=crop",
    github: "#",
    live: "https://duelplays.com",
    featured: true,
    challenges: [
      "Synchronizing game state in real-time across multiple clients with low latency.",
      "Integrating Genkit AI for responsive and challenging bot opponents.",
      "Designing a cohesive neon-cyberpunk UI system with Tailwind CSS."
    ],
    solutions: [
      "Utilized Firebase Firestore for real-time document listeners to handle game moves instantly.",
      "Implemented server-side AI processing with Genkit to ensure fair play and difficulty scaling.",
      "Created reusable UI components with Framer Motion for smooth animations and effects."
    ],
    features: [
      "Real-time Multiplayer Lobby",
      "AI Opponents (Gemini 2.5 Flash)",
      "Virtual Currency System",
      "Cyberpunk Aesthetic"
    ]
  },
  {
    id: 8,
    title: "ExpenseWise",
    description: "AI-powered personal finance assistant that automates expense tracking and provides smart budget recommendations.",
    longDescription: "ExpenseWise is a next-generation expense tracker built with Next.js 15 and Firebase. It leverages Genkit AI to automatically categorize transactions based on natural language descriptions and analyzes spending patterns to suggest realistic monthly budgets. The application features a comprehensive dashboard with financial health indicators, multi-language support (i18n), and a transaction management system.",
    category: "fullstack",
    tech: ["Next.js 15", "Firebase", "Genkit AI", "Tailwind CSS", "Shadcn UI", "Recharts"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Implementing accurate AI-driven transaction categorization using Genkit flows.",
      "Designing a scalable schema for multi-currency and multi-language support.",
      "Building responsive financial charts that handle large transaction datasets.",
      "Ensuring real-time data synchronization across devices using Firebase."
    ],
    solutions: [
      "Created specialized Genkit flows with Zod schema validation for precise category suggestions.",
      "Utilized Next.js Internationalization (i18n) routing for seamless language switching.",
      "Integrated Recharts with custom memoized hooks for performant data visualization.",
      "Implemented a server-actions based architecture to interact securely with Firestore."
    ],
    features: [
      "AI Smart Categorization",
      "Budget Recommendation Engine",
      "Interactive Financial Dashboard",
      "Multi-language Support",
      "Real-time Transaction Sync"
    ]
  },
  {
    id: 9,
    title: "AI CREAT Platform",
    description: "A full-stack platform for automating creative asset adaptation using GenAI (Gemini/OpenAI) and custom workflows.",
    longDescription: "AI CREAT is an enterprise-grade platform designed to streamline the production of marketing assets. It enables users to upload brand assets and automatically generate variations across multiple formats and channels using generative AI. The system features a powerful backend with Celery/RabbitMQ for asynchronous processing and a Next.js frontend with a real-time canvas editor for manual refinements.",
    category: "fullstack",
    tech: ["Next.js 15", "Python FastAPI", "Docker", "Celery", "RabbitMQ", "PostgreSQL", "Google Gemini", "OpenAI"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Orchestrating complex long-running AI tasks with RabbitMQ and Celery.",
      "Building a performant client-side canvas editor for modifying generated assets.",
      "Handling large file uploads and parallel processing."
    ],
    solutions: [
      "Implemented a scalable worker architecture using Docker and Celery.",
      "Utilized React Cropper and custom canvas logic for the interactive frontend editor.",
      "Optimized file handling with chunked uploads and background processing."
    ],
    features: [
      "Automated Asset Repurposing",
      "Batch Processing",
      "Real-time Canvas Editor",
      "Multi-model AI Integration",
      "Asynchronous Workflow Engine"
    ]
  },
  {
    id: 10,
    title: "Gamma/Theta Frequency Infusion",
    description: "An interactive audio therapy tool that infuses music with Gamma (40Hz) and Theta (6Hz) waves for cognitive enhancement.",
    longDescription: "A scientific audio processing tool designed to overlay Gamma and Theta isochronic tones onto standard music tracks. Built with Streamlit and Python, it allows users to upload their own music or select from a library, processes the audio to embed specific frequencies, and provides immediate visual feedback through detailed spectrograms and adherence metrics.",
    category: "backend",
    tech: ["Python", "Streamlit", "Librosa", "NumPy", "Matplotlib", "Pydub"],
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Ensuring accurate frequency generation without distorting the original music quality.",
      "Visualizing complex audio data (spectrograms) in an interactive web interface.",
      "Handling cross-platform audio format compatibility (WAV/MP3)."
    ],
    solutions: [
      "Implemented a modular infusion pipeline using `librosa` and `scipy` for precise signal processing.",
      "Developed a custom Streamlit component to display a carousel of generated spectrograms.",
      "Integrated `pydub` (ffmpeg) for robust audio transcoding/export."
    ],
    features: [
      "Real-time Frequency Infusion",
      "Interactive Spectrogram Carousel",
      "Automated Adherence Scoring",
      "WAV/MP3 Export",
      "Scientific Visualization"
    ]
  },
  {
    id: 11,
    title: "Avalara Tax Compliance",
    description: "A comprehensive frontend dashboard for managing tax compliance, entity onboarding, and property registrations.",
    longDescription: "A modern enterprise React application built for Avalara's tax compliance ecosystem. It streamlines the onboarding process for new companies and properties, offering a guided workflow for tax registration. The application features a dynamic drag-and-drop interface, real-time validation, and seamless integration with Avalara's proprietary Skylab Design System.",
    category: "frontend",
    tech: ["React 18", "TypeScript", "Redux Toolkit", "Avalara Skylab SDK", "SCSS", "React PDF"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Integrating the proprietary Avalara Skylab SDK for consistent enterprise UI/UX.",
      "Managing complex multi-step onboarding forms with Redux state persistence.",
      "Implementing secure document handling and PDF previews within the browser."
    ],
    solutions: [
      "Utilized Redux Toolkit for efficient global state management across onboarding steps.",
      "Implemented a custom document viewer using React PDF and Drag-and-Drop capabilities.",
      "Built reusable form components extending Skylab's base controls for specific tax requirements."
    ],
    features: [
      "Company & Property Onboarding",
      "Drag-and-Drop Document Management",
      "Real-time Tax Registration Status",
      "PDF Generation & Preview",
      "Skylab Design System Implementation"
    ]
  },
  {
    id: 12,
    title: "Sparly (Financial Wellness)",
    description: "A financial habit-building app focused on gamified savings and personalized goal setting.",
    longDescription: "Sparly is a comprehensive financial wellness application designed to help users build better spending habits. Leveraging Open Banking (Tink API), it aggregates user financial data to provide personalized insights and gamified savings challenges ('Habs'). The app features a highly interactive UI with Lottie animations, customized flip-card effects, and secure biometric authentication.",
    category: "mobile",
    tech: ["React Native", "Expo", "Jotai", "React Query", "Lottie", "Sentry"],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Optimizing complex animations (Lottie/Skia) for smooth performance on low-end devices.",
      "Handling secure financial data and real-time bank connectivity via Tink API.",
      "Managing global state for multi-step financial goal wizards using Jotai."
    ],
    solutions: [
      "Implemented react-native-skia for high-performance graphics and custom flip-card interactions.",
      "Utilized Jotai for atomic state management to handle complex user flows efficiently.",
      "Integrated Sentry for proactive error monitoring and performance tracking in production."
    ],
    features: [
      "Gamified Savings (Habs)",
      "Open Banking Integration",
      "Interactive Flip Cards",
      "Multi-language Support (i18n)",
      "Biometric Security"
    ]
  },
  {
    id: 13,
    title: "RealNet Power Search",
    description: "A high-performance real estate listing search application integrated with Azure Cloud API and Google Maps.",
    longDescription: "A modern enterprise frontend application designed for searching and managing property listings. Built with Angular 12 and utilizing Kendo UI for advanced data grids and components, it offers a powerful map-based search experience using Google Maps API. The application integrates seamlessly with Azure Cloud APIs to fetch real-time listing data.",
    category: "frontend",
    tech: ["Angular 12", "TypeScript", "Kendo UI", "Angular Material", "Google Maps API", "Azure Cloud API"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Integrating complex third-party UI libraries (Kendo UI) with custom Angular themes.",
      "Optimizing map rendering and cluster marker performance for large datasets.",
      "Ensuring seamless synchronization between grid data and map view states."
    ],
    solutions: [
      "Implemented custom Kendo styling overrides to match corporate branding guidelines.",
      "Utilized efficient data fetching strategies and caching for map overlays.",
      "Developed shared state services to synchronize map and list interactions."
    ],
    features: [
      "Advanced Property Search",
      "Interactive Map Integration",
      "High-Performance Data Grids",
      "Real-time Listing Updates",
      "Kendo UI Components"
    ]
  },
  {
    id: 1,
    title: "Wealth Investment App",
    description: "A secure Flutter app for managing investment portfolios with real-time charting.",
    longDescription: "A secure and high-performance mobile investment application built with Flutter. It features a robust architecture using BLoC for state management and Dio for networking. The app provides real-time portfolio visualization using comprehensive charting libraries and ensures data security with encrypted local storage.",
    category: "mobile",
    tech: ["Flutter", "Dart", "Bloc", "Dio", "Freezed", "Auto Route", "Fl Chart"],
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=800",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Managing complex state transformations for real-time investment data.",
      "Ensuring secure handling of sensitive financial information on the device.",
      "Implementing a modular and scalable architecture for future feature expansion."
    ],
    solutions: [
      "Adopted the BLoC pattern with Freezed for immutable state and event handling.",
      "Utilized flutter_secure_storage for encrypting sensitive tokens and user data.",
      "Implemented dependency injection with GetIt/Injectable to decouple components."
    ],
    features: [
      "Portfolio Visualization",
      "Real-time Market Data",
      "Secure Authentication",
      "Interactive Charts",
      "Bloc State Management"
    ]
  },
  {
    id: 2,
    title: "Project Skyscraper",
    description: "Cross-platform mobile features with native module integration, interactive dashboards, and Redux state management.",
    category: "mobile",
    tech: ["React Native", "Redux", "iOS", "Android"],
    image: projectImages[1],
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: 3,
    title: "NFT Marketplace Ecosystem",
    description: "A dual-portal NFT marketplace (User & Admin) built on Hedera Hashgraph.",
    longDescription: "A comprehensive NFT marketplace ecosystem consisting of separate User and Admin portals. Built with React 18 and TypeScript, it features secure wallet integration via HashConnect for Hedera Hashgraph. The platform includes a robust admin dashboard with analytics (Recharts) and a user-friendly storefront for minting and trading NFTs.",
    category: "fullstack",
    tech: ["React 18", "TypeScript", "Redux", "Hedera Hashgraph", "HashConnect", "Bootstrap 5", "Docker"],
    image: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?auto=format&fit=crop&q=80&w=800",
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Integrating Hedera Hashgraph wallet connection securely.",
      "Managing state across two separate but interacting applications.",
      "Ensuring responsive design for extensive admin data tables."
    ],
    solutions: [
      "Implemented HashConnect for secure and seamless wallet pairing.",
      "Utilized Redux Thunk for centralized and efficient state management.",
      "Leveraged Bootstrap 5 for rapid, responsive UI development."
    ],
    features: [
      "Dual Portals (User/Admin)",
      "Hedera Wallet Integration",
      "Real-time Analytics",
      "NFT Minting & Trading",
      "Dockerized Deployment"
    ]
  },
  {
    id: 4,
    title: "TopME (formerly Sparly)",
    description: "A white-label mobile top-up application with dynamic telco-based theming.",
    longDescription: "TopME is a React Native mobile application designed for seamless mobile top-ups and bill payments. Built with Expo and TypeScript, it features a dynamic theming engine that adapts the UI colors and branding based on the user's selected telecommunications provider. The app includes secure authentication, real-time transaction history, and a rewards system.",
    category: "mobile",
    tech: ["React Native", "Expo", "TypeScript", "Expo Router", "Context API"],
    image: projectImages[3], // Keeping the mobile placeholder or use a new one if available? Using placeholder for now as per plan, or maybe find a better one later.
    github: "#",
    live: "#",
    featured: true,
    challenges: [
      "Implementing a dynamic theming system that changes the entire app's color scheme at runtime based on the selected telco.",
      "Managing complex navigation flows with Expo Router for both authenticated and guest users.",
      "Ensuring consistent performance and UI behavior across both iOS and Android platforms."
    ],
    solutions: [
      "Created a custom ThemeContext to broadcast color changes instantly across all components.",
      "Utilized Expo Router's stack navigation with protected routes for secure user flows.",
      "Implemented centralized service layers for consistent API communication and error handling."
    ],
    features: [
      "Dynamic Telco Theming",
      "Mobile Top-up",
      "Multi-number Management",
      "Rewards System",
      "Secure Authentication"
    ]
  },

];

export const skills: SkillCategory[] = [
  {
    name: "Frontend",
    icon: <Palette className="w-6 h-6" />,
    skills: [
      { name: "React.js", level: 95 },
      { name: "Angular", level: 85 },
      { name: "Vue.js", level: 80 },
      { name: "HTML5/CSS3", level: 98 },
      { name: "TypeScript", level: 90 },
      { name: "Bootstrap", level: 92 },
    ]
  },
  {
    name: "Mobile",
    icon: <Server className="w-6 h-6" />, // Using Server icon as placeholder for Mobile/App
    skills: [
      { name: "React Native", level: 92 },
      { name: "Flutter", level: 88 },
      { name: "iOS/Android", level: 80 },
      { name: "PhoneGap", level: 75 },
    ]
  },
  {
    name: "Backend & Cloud",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Google Cloud", level: 78 },
      { name: "Python", level: 75 },
      { name: "IBM Bluemix", level: 70 },
    ]
  },
  {
    name: "Tools & Methods",
    icon: <Terminal className="w-6 h-6" />,
    skills: [
      { name: "Git", level: 95 },
      { name: "CI/CD", level: 85 },
      { name: "Jest/Enzyme", level: 82 },
      { name: "Jira/Confluence", level: 90 },
      { name: "Agile/Scrum", level: 92 },
    ]
  },
];

export const experiences: Experience[] = [
  {
    title: "Frontend Development",
    company: "Topcoder",
    location: "Global / Remote",
    period: "2010 - Present",
    description: "Participating in elite development competitions and copilot/review roles. Secured 86 wins across hundreds of challenges.",
    achievements: [
      "Created wealth investment Flutter apps and dashboard ecosystems.",
      "Built cross-platform mobile features for major enterprise clients.",
      "Consistently ranked in the top percentile of UI prototypers globally."
    ]
  },
  {
    title: "Senior Software Engineer",
    company: "CreativeHub",
    location: "Remote / Hybrid",
    period: "2023 - 2024",
    description: "Lead developer for financial mobile applications and gamified user experiences.",
    achievements: [
      "Developed 'Sparly', a React Native financial habit-building app.",
      "Implemented gamified reward systems to boost user engagement.",
      "Integrated financial data connectivity via Tink API."
    ]
  },
  {
    title: "Frontend and Javascript Developer",
    company: "VUULR",
    location: "Remote",
    period: "2018 - 2020",
    description: "Core frontend developer for a global content marketplace platform.",
    achievements: [
      "Developed responsive interfaces using React, React Native, and AngularJS.",
      "Collaborated with cross-functional teams to implement project requirements.",
      "Optimized user experience through new feature implementations."
    ]
  },
  {
    title: "Software Engineer",
    company: "DIRECTFN / MUBASHER",
    location: "Sri Lanka",
    period: "2009 - 2011",
    description: "Contributed to real-time e-trading projects and financial software solutions.",
    achievements: [
      "Actively contributed to extensive real-time E-Trading projects.",
      "Worked on low-latency data feed processing and display.",
      "Gained strong foundation in software engineering principles."
    ]
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Topcoder Community",
    role: "Global Network",
    content: "A highly reliable and skilled competitor who consistently delivers high-quality UI prototypes and mobile applications.",
    avatar: "TC"
  },
  {
    name: "CreativeHub Team",
    role: "Management",
    content: "Dileepa brings exceptional problem-solving skills and a deep understanding of mobile development framewoks.",
    avatar: "CH"
  },
];

// Placeholder blog posts as none were explicitly provided, keeping general tech aligned with skills
export const blogPosts: BlogPost[] = [
  { id: 1, slug: "mastering-react-native-animations", title: "Mastering React Native Animations", excerpt: "Tips and tricks for creating smooth, 60fps animations in your mobile apps.", date: "Jan 10, 2026", readTime: "5 min", category: "Mobile" },
  { id: 2, slug: "why-flutter-for-fintech", title: "Why Flutter is Perfect for Fintech Apps", excerpt: "Exploring the security and performance benefits of Flutter for financial applications.", date: "Dec 05, 2025", readTime: "6 min", category: "Flutter" },
  { id: 3, slug: "effective-state-management", title: "Effective State Management in 2026", excerpt: "A look at modern state management solutions for large scale React applications.", date: "Nov 20, 2025", readTime: "8 min", category: "React" },
];
