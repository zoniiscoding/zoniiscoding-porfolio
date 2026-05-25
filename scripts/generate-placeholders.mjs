import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../src/assets/images");

const presets = [
  {
    name: "recipe-1",
    colors: ["#1e1b4b", "#4c1d95", "#7c3aed"],
    label: "Recipe App",
  },
  {
    name: "recipe-2",
    colors: ["#172554", "#1d4ed8", "#3b82f6"],
    label: "Recipe Dashboard",
  },
  {
    name: "ai-interview-1",
    colors: ["#0c4a6e", "#0369a1", "#0ea5e9"],
    label: "AI Interview",
  },
  {
    name: "ai-interview-2",
    colors: ["#134e4a", "#0f766e", "#14b8a6"],
    label: "Live Session",
  },
  {
    name: "plant-disease",
    colors: ["#14532d", "#15803d", "#22c55e"],
    label: "Plant ML",
  },
];

async function createAvatar() {
  const size = 256;
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e293b"/>
          <stop offset="100%" style="stop-color:#334155"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8b5cf6"/>
          <stop offset="100%" style="stop-color:#3b82f6"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="128" cy="128" r="118" fill="url(#accent)" opacity="0.25"/>
      <circle cx="128" cy="100" r="36" fill="white" opacity="0.85"/>
      <ellipse cx="128" cy="188" rx="52" ry="44" fill="white" opacity="0.85"/>
      <circle cx="128" cy="128" r="118" fill="none" stroke="url(#accent)" stroke-width="3" opacity="0.6"/>
    </svg>
  `;
  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, "avatar.png"));
}

async function createImage({ name, colors, label }) {
  const w = 960;
  const h = 600;
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]}"/>
          <stop offset="50%" style="stop-color:${colors[1]}"/>
          <stop offset="100%" style="stop-color:${colors[2]}"/>
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="40"/></filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="780" cy="120" r="140" fill="${colors[2]}" opacity="0.35" filter="url(#blur)"/>
      <circle cx="180" cy="480" r="120" fill="${colors[1]}" opacity="0.3" filter="url(#blur)"/>
      <rect x="48" y="48" width="320" height="24" rx="12" fill="white" opacity="0.12"/>
      <rect x="48" y="96" width="220" height="16" rx="8" fill="white" opacity="0.08"/>
      <rect x="48" y="140" width="400" height="280" rx="20" fill="white" opacity="0.06" stroke="white" stroke-opacity="0.1"/>
      <text x="48" y="520" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="white" opacity="0.9">${label}</text>
      <text x="48" y="555" font-family="system-ui,sans-serif" font-size="14" fill="white" opacity="0.45">Replace with project screenshot</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, `${name}.png`));
}

await mkdir(outDir, { recursive: true });
for (const preset of presets) {
  await createImage(preset);
}
await createAvatar();
console.log("Generated placeholder images in src/assets/images/");
