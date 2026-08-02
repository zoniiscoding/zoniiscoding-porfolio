// Optimized at build time by scripts/build-sprites.mjs (src/assets/images -> public/img).
// Run `npm run assets` after replacing any source image in src/assets/images/.
const recipe1 = "/img/recipe-1.webp";
const recipe2 = "/img/recipe-2.webp";
// Placeholders reused from the old AI Interview Coach screenshots until
// real Anteroom screenshots are provided.
const anteroom1 = "/img/ai-interview-1.webp";
const anteroom2 = "/img/ai-interview-2.webp";
const plantDisease = "/img/plant-disease.webp";
const avatar = "/img/avatar.webp";

export const personal = {
  name: "Tanisha Joshi",
  title: "Full Stack Developer | Software Engineer",
  intro:
    "Final-year Computer Science undergraduate passionate about building scalable full-stack applications, AI-powered platforms, and impactful digital products.",
  email: "tanishaj1605@gmail.com",
  github: "https://github.com/zoniiscoding",
  linkedin: "https://www.linkedin.com/in/zoniiscoding/",
  /** Replace avatar.png in src/assets/images/ with your photo, then run `npm run assets` */
  avatar,
  resume: "/resume.pdf",
};

// No "home" entry: the village itself is the home view. The logo/name in
// the navbar returns to it. Ids double as village landmark ids (see
// src/world/village/Village.jsx's LANDMARKS) — except "experience", which
// deep-links into the same Workshop landmark as "projects" but opens it on
// a different default tab (see App.jsx / WorkshopLocation's initialTab).
export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export const typingRoles = [
  "Full Stack Developer",
  "Software Engineer",
  "React & Node.js Developer",
  "Problem Solver",
];

// [0] is spoken as the greeting in the cottage's PixelDialog typewriter
// (see CottageLocation.jsx); the rest render as the body paragraphs below.
export const aboutParagraphs = [
  "Hi! I'm Tanisha, and welcome to my little corner of the internet.",
  "I'm a Computer Science graduate who enjoys building software that combines thoughtful engineering with practical AI. I love taking ideas from concept to production—whether that's designing intuitive user experiences, building scalable backend systems, integrating AI models, or deploying full-stack applications that solve real problems.",
  "Over the past few years, I've worked on projects ranging from Anteroom, an AI-powered mock interview platform with real-time voice interactions and adaptive interview generation, to Codenaut, a developer platform that helps engineers understand GitHub repositories through evidence-backed AI. Alongside my personal projects, I'm also the Co-Founder of zero2one labs, where I help businesses transform ideas into production-ready digital products. From working directly with clients to gathering requirements, choosing the right technology stack, building applications, and supporting them after launch, I've had the opportunity to experience the entire product development lifecycle firsthand.",
  "What excites me most about software engineering is building products that people genuinely enjoy using. I'm always exploring new technologies, experimenting with AI, and looking for better ways to solve real-world problems through software.",
  "This portfolio is a reflection of that journey. Every landmark, interaction, and project represents something I've learned or built along the way. Thanks for stopping by—I hope you enjoy exploring my little pixel world.",
];

export const skillCategories = [
  {
    title: "Frontend",
    icon: "Layout",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
      "Responsive Design",
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "WebSockets",
      "REST APIs",
      "SQLAlchemy (Async)",
      "Redis",
      "Authentication",
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "Brain",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "LLM Integration (Groq, Llama)",
      "Whisper Speech-to-Text",
      "LoRA Fine-Tuning",
      "Qdrant Vector Search",
      "Tree-sitter",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Qdrant"],
  },
  {
    title: "Languages",
    icon: "Code2",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "C"],
  },
  {
    title: "Dev Tools & Infra",
    icon: "Wrench",
    skills: ["Git", "GitHub", "Docker", "CI/CD", "Vercel", "Render", "Railway", "Postman"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Anteroom",
    description:
      "AI-powered mock interview platform that conducts realistic spoken interviews using adaptive questioning, real-time speech processing, resume-aware interview generation, and LLM-powered evaluation.",
    highlights: [
      "Real-time spoken interviews with adaptive, resume-aware questioning",
      "Whisper transcription + Edge-TTS voice, scored live by Groq's Llama 3.3 70B",
      "LoRA-distilled scoring model cut evaluation error from ~5–7 points to 0.6–1.9",
    ],
    tech: ["React 19", "FastAPI", "WebSockets", "Groq Llama 3.3", "Whisper", "Edge-TTS", "PostgreSQL"],
    images: [anteroom1, anteroom2],
    github: "https://github.com/zoniiscoding/AI-Interview-Coach",
    liveDemo: "https://anteroom-sigma.vercel.app/",
    showLinks: true,
    gradient: "from-blue-600/30 to-cyan-500/30",
  },
  {
    id: 2,
    title: "Codenaut",
    description:
      "AI-powered developer platform for understanding GitHub repositories using Retrieval-Augmented Generation (RAG), semantic code search, and evidence-backed AI responses.",
    highlights: [
      "Every answer is grounded in retrieved repository code, not model memory",
      "Multi-tenant architecture with GitHub App auth and repo-scoped access",
      "Semantic search via Tree-sitter parsing, ONNX embeddings, and Qdrant",
      "Auto-reindexes on GitHub pushes with durable, atomic index activation",
    ],
    tech: ["React", "TypeScript", "FastAPI", "RAG", "Qdrant", "Tree-sitter", "Docker"],
    images: [],
    github: "https://github.com/zoniiscoding/CodeNaut",
    liveDemo: null,
    showLinks: true,
    gradient: "from-fuchsia-600/30 to-indigo-500/30",
  },
  {
    id: 3,
    title: "Recipe Management Platform",
    description:
      "A modern full-stack recipe platform built to make discovering and organizing recipes feel simple, interactive, and visually engaging. The application focuses on smooth user experience, responsive design, and clean frontend interactions while handling dynamic recipe management and authentication through a scalable backend architecture.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
      "REST APIs",
    ],
    images: [recipe1, recipe2],
    github: "https://github.com/zoniiscoding/recipe-app",
    liveDemo: null,
    showLinks: true,
    gradient: "from-violet-600/30 to-blue-600/30",
  },
  {
    id: 4,
    title: "Plant Disease Detection System",
    description:
      "A machine learning project focused on detecting plant diseases from leaf images using deep learning models and image classification workflows. The project involved experimenting with preprocessing pipelines, training optimization, and model evaluation to achieve highly accurate predictions.",
    tech: ["Python", "TensorFlow", "PyTorch", "NumPy", "Pandas"],
    images: [plantDisease],
    liveDemo: null,
    showLinks: false,
    note: "Developed in Google Colab · Jupyter Notebook",
    gradient: "from-emerald-600/30 to-teal-500/30",
  },
];

// Shown in the Workshop's "Professional Experience" tab (see
// WorkshopLocation.jsx), not in Education — kept separate so freelance work
// and coursework don't blur together.
export const experience = [
  {
    company: "zero2one labs",
    role: "Co-founder & Full Stack Developer",
    description:
      "Designed and developed modern websites and web applications for local businesses, managing projects from initial client discussions through deployment and post-launch support.",
    highlights: [
      "Co-founded zero2one labs and delivered 9 client projects end-to-end for cafés, salons, boutique hotels, and local service businesses across Jaipur and Hyderabad.",
      "Worked directly with clients to gather requirements, define project scope, and translate business needs into production-ready web applications.",
      "Selected the most appropriate technology stack for each project instead of using a one-size-fits-all approach.",
      "Built applications using React, JavaScript, Vite, Tailwind CSS, FastAPI, and MySQL, PostgreSQL, or MongoDB depending on project requirements.",
      "Conducted live demos, incorporated client feedback, and iterated through multiple review cycles before deployment.",
      "Managed planning, development, deployment, testing, launch, and post-launch support.",
    ],
    techStack: {
      Frontend: ["React", "JavaScript", "Vite", "Tailwind CSS"],
      Backend: ["FastAPI"],
      Databases: ["MySQL", "PostgreSQL", "MongoDB"],
    },
  },
];

// Shown as a subsection within the existing Bookshelf/Education view (see
// BookshelfLocation.jsx) — not a separate location.
export const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    description:
      "Credential covering Artificial Intelligence fundamentals, Generative AI concepts, machine learning fundamentals, and Oracle AI services.",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    description:
      "Credential covering Oracle Cloud Infrastructure fundamentals, including cloud concepts, compute, networking, storage, security, and core OCI services.",
  },
  {
    name: "Oracle Data Platform 2025 Certified Foundations Associate",
    description:
      "Credential covering Oracle's cloud data platform, databases, data management, analytics, and modern data services.",
  },
];

export const education = {
  institution: "Manipal University Jaipur",
  degree: "B.Tech in Computer Science Engineering",
  minor: "Minor in Cloud Computing",
  period: "2022 – 2026",
  coursework: [
    "Data Structures & Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "Cloud Computing",
  ],
  leetcode:
    "175+ LeetCode problems solved across DSA topics including arrays, graphs, trees, dynamic programming, and greedy algorithms.",
};