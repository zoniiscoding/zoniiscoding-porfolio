# Tanisha Joshi — Developer Portfolio

A modern, premium full-stack developer portfolio built with React, Tailwind CSS, Framer Motion, and Lucide icons.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Build for Production

```bash
npm run build
npm run preview
```

## Customize

Update your personal links, project URLs, and resume in:

- `src/data/portfolio.js` — all content and links
- `src/assets/images/` — replace placeholder PNGs with real project screenshots
- **Navbar photo:** replace `src/assets/images/avatar.png` with your own image (keep the same filename)
- `public/resume.pdf` — add your resume file for the download button

Regenerate placeholder images (optional):

```bash
node scripts/generate-placeholders.mjs
```

## Project Structure

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, Loading, ScrollToTop
│   ├── sections/   # Hero, About, Skills, Projects, Education, Contact
│   └── ui/         # Reusable UI (Button, particles, etc.)
├── data/
│   └── portfolio.js
├── hooks/
└── App.jsx
```

## Deploy

Deploy the `dist` folder to Vercel, Netlify, or GitHub Pages.
