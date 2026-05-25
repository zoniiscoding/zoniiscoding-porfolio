import recipe1 from "../assets/images/recipe-1.png";
import recipe2 from "../assets/images/recipe-2.png";
import aiInterview1 from "../assets/images/ai-interview-1.png";
import aiInterview2 from "../assets/images/ai-interview-2.png";
import plantDisease from "../assets/images/plant-disease.png";
import avatar from "../assets/images/avatar.png";

export const personal = {
  name: "Tanisha Joshi",
  title: "Full Stack Developer | Software Engineer",
  intro:
    "Final-year Computer Science undergraduate passionate about building scalable full-stack applications, AI-powered platforms, and impactful digital products.",
  email: "tanishaj1605@gmail.com",
  github: "https://github.com/zoniiscoding",
  linkedin: "https://www.linkedin.com/in/zoniiscoding/",
  /** Replace avatar.png in src/assets/images/ with your photo */
  avatar,
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const typingRoles = [
  "Full Stack Developer",
  "Software Engineer",
  "React & Node.js Developer",
  "Problem Solver",
];

export const aboutParagraphs = [
  "I'm a Software Engineer focused on building full-stack applications that are clean, interactive, and built with real users in mind.",
  "I enjoy working across both frontend and backend — from designing responsive interfaces to building APIs, authentication flows, real-time features, and scalable backend architecture. Most of my work is about turning ideas into products that feel smooth, intuitive, and polished.",
  "I've been building with React, Node.js, FastAPI, Firebase, MongoDB, and WebSockets, while also exploring AI-powered applications and modern development workflows.",
  "I care about creating experiences that work well technically and feel good to use.",
];

export const skillCategories = [
  {
    title: "Frontend",
    icon: "Layout",
    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Authentication",
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    title: "Languages",
    icon: "Code2",
    skills: ["JavaScript", "Python", "Java", "SQL", "C"],
  },
  {
    title: "Dev Tools",
    icon: "Wrench",
    skills: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Render"],
  },
];

export const projects = [
  {
    id: 1,
    title: "AI Interview Simulation Platform",
    description:
      "An AI-powered interview preparation platform designed to simulate realistic interview experiences through real-time interaction and intelligent feedback systems. Built with a strong focus on responsiveness, live communication, and seamless AI integration to create a more engaging and practical interview practice experience.",
    tech: [
      "React",
      "FastAPI",
      "WebSockets",
      "Python",
      "NLP",
      "Whisper ASR",
      "Coqui TTS",
      "LLM APIs",
    ],
    images: [aiInterview1, aiInterview2],
    github: "https://github.com/zoniiscoding/AI-Interview-Coach",
    showLinks: true,
    gradient: "from-blue-600/30 to-cyan-500/30",
  },
  {
    id: 2,
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
    showLinks: true,
    gradient: "from-violet-600/30 to-blue-600/30",
  },
  {
    id: 3,
    title: "Plant Disease Detection System",
    description:
      "A machine learning project focused on detecting plant diseases from leaf images using deep learning models and image classification workflows. The project involved experimenting with preprocessing pipelines, training optimization, and model evaluation to achieve highly accurate predictions.",
    tech: ["Python", "TensorFlow", "PyTorch", "NumPy", "Pandas"],
    images: [plantDisease],
    showLinks: false,
    note: "Developed in Google Colab · Jupyter Notebook",
    gradient: "from-emerald-600/30 to-teal-500/30",
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