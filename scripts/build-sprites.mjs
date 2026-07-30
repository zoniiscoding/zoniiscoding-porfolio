/**
 * Sprite pipeline.
 *
 * Reads the original artwork in public/assets (never modified) and emits
 * optimized, evenly-gridded atlases to public/sprites plus a manifest.
 *
 * The source sheets are hand-drawn: frames sit at irregular x offsets, and each
 * sheet was drawn at a different scale (the character stands 626px tall in
 * idle.png but only 451px in walk.png). This script normalizes all of that so
 * the runtime only ever does `frameIndex * cellWidth` arithmetic.
 *
 * Run: npm run assets   (also runs automatically via prebuild)
 */
import sharp from "sharp";
import { mkdir, writeFile, rm } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "public/assets");
const OUT = path.join(ROOT, "public/sprites");
const IMG_SRC = path.join(ROOT, "src/assets/images");
const IMG_OUT = path.join(ROOT, "public/img");
const MANIFEST = path.join(ROOT, "src/world/spriteManifest.js");

const PAD = 6; // transparent gutter around each cell, avoids bleed when scaling

/**
 * Frame rectangles measured from the source art by scanning alpha columns.
 *
 * `ground` is the sheet's shared baseline (the lowest opaque row across all its
 * frames). Aligning every frame to its sheet baseline rather than to its own
 * bounding box is what keeps the character's feet planted and lets the jump's
 * airborne frame float at the correct height for free.
 *
 * `standing` is the character's height in source pixels *when standing*. For
 * poses that are naturally shorter than standing it is the measured frame
 * height divided by that pose's ratio, so every sheet resolves to the same
 * on-screen character size.
 */
const PLAYER_HEIGHT = 340; // output px, standing

const PLAYER = {
  idle: {
    file: "player/idle.png",
    ground: 842,
    standing: 626,
    frames: [
      { x: 104, y: 213, w: 263, h: 626 },
      { x: 461, y: 214, w: 261, h: 628 },
      { x: 817, y: 214, w: 263, h: 629 },
      { x: 1164, y: 214, w: 263, h: 629 },
    ],
  },
  walk: {
    file: "player/walk.png",
    ground: 672,
    standing: 451 / 0.96, // mid-stride reads ~4% shorter than standing
    frames: [
      { x: 61, y: 220, w: 222, h: 451 },
      { x: 348, y: 221, w: 235, h: 450 },
      { x: 638, y: 220, w: 229, h: 452 },
      { x: 931, y: 220, w: 225, h: 451 },
      { x: 1216, y: 220, w: 213, h: 453 },
      { x: 1499, y: 219, w: 223, h: 454 },
    ],
  },
  wave: {
    file: "player/wave.png",
    ground: 776,
    standing: 615,
    frames: [
      { x: 247, y: 162, w: 310, h: 615 },
      { x: 719, y: 162, w: 310, h: 615 },
      { x: 1234, y: 162, w: 257, h: 615 },
    ],
  },
  jump: {
    file: "player/jump.png",
    ground: 776,
    standing: 459 / 0.8, // frame 0 is a crouch, ~80% of standing height
    frames: [
      { x: 218, y: 318, w: 289, h: 459 },
      { x: 668, y: 144, w: 324, h: 493 },
      { x: 1175, y: 347, w: 253, h: 428 },
    ],
  },
};

/** Single-scale sheets: one uniform cell, aligned on a shared baseline. */
const SHEETS = {
  cat: {
    file: "effects/cat.png",
    ground: 609,
    scale: 92 / 207,
    frames: [
      { x: 88, y: 402, w: 246, h: 208 },
      { x: 393, y: 405, w: 253, h: 205 },
      { x: 767, y: 405, w: 262, h: 205 },
      { x: 1147, y: 405, w: 293, h: 205 },
    ],
  },
  coin: {
    file: "effects/coin.png",
    ground: 579,
    scale: 52 / 158,
    frames: [
      { x: 114, y: 426, w: 153, h: 154 },
      { x: 320, y: 422, w: 133, h: 158 },
      { x: 496, y: 431, w: 86, h: 149 },
      { x: 653, y: 431, w: 75, h: 149 },
      { x: 819, y: 431, w: 45, h: 149 },
      { x: 945, y: 430, w: 90, h: 150 },
      { x: 1097, y: 430, w: 125, h: 150 },
      { x: 1273, y: 427, w: 151, h: 153 },
    ],
  },
  sparkle: {
    file: "environment/sparkles.png",
    ground: null, // centred rather than baseline-aligned
    scale: 80 / 211,
    frames: [
      { x: 100, y: 219, w: 168, h: 191 },
      { x: 403, y: 249, w: 146, h: 166 },
      { x: 697, y: 219, w: 175, h: 211 },
      { x: 1002, y: 226, w: 167, h: 194 },
      { x: 1291, y: 239, w: 145, h: 171 },
      { x: 104, y: 626, w: 171, h: 176 },
      { x: 409, y: 625, w: 149, h: 188 },
      { x: 716, y: 657, w: 125, h: 138 },
      { x: 1007, y: 625, w: 133, h: 187 },
      { x: 1281, y: 636, w: 170, h: 176 },
    ],
  },
};

/** Standalone images: cropped, scaled, emitted one file each. */
const SINGLES = {
  cloud_sm: { file: "environment/clouds.png", rect: { x: 117, y: 243, w: 482, h: 219 }, scale: 0.5 },
  cloud_md: { file: "environment/clouds.png", rect: { x: 753, y: 261, w: 693, h: 201 }, scale: 0.5 },
  cloud_lg: { file: "environment/clouds.png", rect: { x: 323, y: 625, w: 788, h: 251 }, scale: 0.5 },
  // x127..1407 is the widest span whose left and right edges share an identical
  // top (402) and bottom (663) profile, so this crop repeats without a seam.
  ground: { file: "environment/grass_platform.png", rect: { x: 127, y: 339, w: 1280, h: 325 }, scale: 0.7 },
  desk: { file: "props/desk.png", rect: { x: 219, y: 58, w: 1073, h: 521 }, scale: 0.485 },
  chair: { file: "props/chair.png", rect: { x: 518, y: 76, w: 471, h: 814 }, scale: 0.34 },
  plant: { file: "props/plant.png", rect: { x: 543, y: 120, w: 454, h: 654 }, scale: 0.4 },
  macbook: { file: "props/macbook.png", rect: { x: 1057, y: 141, w: 439, h: 370 }, scale: 0.42 },
};

/**
 * 9-slice UI. Insets are in *source* pixels and are scaled alongside the image,
 * so the manifest always reports them in output-pixel space.
 *
 * Baked-in ornaments have to land inside a corner slice or the stretch smears
 * them, which drives two structural decisions:
 *
 * - The window is emitted as two pieces. Slicing it whole would need a 164px
 *   right inset to clear the title-bar buttons, and that inset would then eat
 *   content width down the entire right edge. A title strip sliced horizontally
 *   only, plus a body with thin borders, keeps both correct.
 * - The dialog's heart and continue-arrow are painted out of the sliceable
 *   source (see PATCHES) and emitted separately, so the box stretches cleanly
 *   and the ornaments can animate on their own.
 */
const NINE_SLICE = {
  window_top: {
    file: "ui/retro_window.png",
    rect: { x: 387, y: 204, w: 763, h: 91 },
    scale: 0.773,
    inset: { top: 0, right: 210, bottom: 0, left: 80 }, // heart left, buttons right
  },
  window_body: {
    file: "ui/retro_window.png",
    rect: { x: 387, y: 295, w: 763, h: 519 },
    scale: 0.773,
    inset: { top: 8, right: 28, bottom: 96, left: 28 }, // bottom inset is the status bar
  },
  dialog: {
    file: "ui/dialog_box.png",
    rect: { x: 321, y: 304, w: 942, h: 375 },
    scale: 0.909,
    inset: { top: 76, right: 30, bottom: 30, left: 20 }, // top inset carries the pink title strip
  },
  button: {
    file: "ui/button.png",
    rect: { x: 389, y: 385, w: 758, h: 220 },
    scale: 0.7,
    inset: { top: 26, right: 26, bottom: 26, left: 26 },
  },
};

/**
 * Ornaments that sit on top of an otherwise stretchable surface. Each is cut out
 * as its own sprite, and the hole it leaves is filled by copying an equivalent
 * clean region from elsewhere in the same artwork — same rows, so the border,
 * inset and title-strip bands all line up.
 */
const PATCHES = {
  "ui/dialog_box.png": [
    { from: { x: 700, y: 298 }, to: { x: 341, y: 298 }, w: 185, h: 86 }, // heart
    { from: { x: 850, y: 450 }, to: { x: 1166, y: 588 }, w: 72, h: 62 }, // continue arrow (incl. drop shadow)
  ],
};

const ORNAMENTS = {
  dialog_heart: { file: "ui/dialog_box.png", rect: { x: 343, y: 300, w: 177, h: 76 }, scale: 0.909 },
  dialog_arrow: { file: "ui/dialog_box.png", rect: { x: 1166, y: 588, w: 72, h: 62 }, scale: 0.909 },
};

/** Project screenshots and avatar, resized to what the layout actually renders. */
const PHOTOS = [
  { name: "recipe-1", width: 1000 },
  { name: "recipe-2", width: 1000 },
  { name: "ai-interview-1", width: 1000 },
  { name: "ai-interview-2", width: 1000 },
  { name: "plant-disease", width: 1000 },
  { name: "avatar", width: 128 },
];

const round = (n) => Math.round(n);
// The art has photographic gradients and dithering rather than flat colour, so
// lossless costs ~3x the bytes for no visible gain. Alpha stays lossless so
// sprite silhouettes keep hard edges.
const webp = (img) => img.webp({ quality: 90, alphaQuality: 100, effort: 6 });

/**
 * Horizontal anchor for a frame: the centre of the torso band rather than the
 * centre of the bounding box. Arms and legs swing through a walk cycle; the
 * waist does not, so anchoring there stops the sprite twitching side to side.
 */
async function torsoCentre(file, rect) {
  const { data, info } = await sharp(file)
    .extract({ left: rect.x, top: rect.y, width: rect.w, height: rect.h })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const from = Math.floor(height * 0.35);
  const to = Math.floor(height * 0.55);
  let min = width;
  let max = -1;
  for (let y = from; y < to; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] >= 24) {
        if (x < min) min = x;
        if (x > max) max = x;
      }
    }
  }
  return max < 0 ? width / 2 : (min + max) / 2;
}

/**
 * Lay frames out on a uniform grid. Every frame is scaled, then positioned so
 * its anchor column and its sheet baseline land on the same spot in every cell.
 */
async function buildSheet(name, spec) {
  const file = path.join(SRC, spec.file);
  const placed = [];

  for (const frame of spec.frames) {
    const scale = spec.scaleFor ? spec.scaleFor(frame) : spec.scale;
    const w = round(frame.w * scale);
    const h = round(frame.h * scale);
    const anchor = round((await torsoCentre(file, frame)) * scale);
    // Distance from the top of this frame down to the sheet's shared baseline.
    const toBaseline = spec.ground === null ? round(h / 2) : round((spec.ground - frame.y) * scale);
    placed.push({ frame, scale, w, h, anchor, toBaseline });
  }

  const left = Math.max(...placed.map((p) => p.anchor));
  const right = Math.max(...placed.map((p) => p.w - p.anchor));
  const above = Math.max(...placed.map((p) => p.toBaseline));
  const below = Math.max(...placed.map((p) => p.h - p.toBaseline));

  const cellW = left + right + PAD * 2;
  const cellH = above + below + PAD * 2;
  const baseline = PAD + above;
  const originX = PAD + left;

  const composites = [];
  for (const [i, p] of placed.entries()) {
    const buffer = await sharp(file)
      .extract({ left: p.frame.x, top: p.frame.y, width: p.frame.w, height: p.frame.h })
      .resize(p.w, p.h, { kernel: "lanczos3", fit: "fill" })
      .png()
      .toBuffer();
    composites.push({
      input: buffer,
      left: i * cellW + originX - p.anchor,
      top: baseline - p.toBaseline,
    });
  }

  await webp(
    sharp({
      create: {
        width: cellW * placed.length,
        height: cellH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    }).composite(composites)
  ).toFile(path.join(OUT, `${name}.webp`));

  return {
    src: `/sprites/${name}.webp`,
    frames: placed.length,
    cellW,
    cellH,
    baseline,
    originX,
  };
}

const patched = new Map();

/** Source artwork with any ornament holes filled in. Cached per file. */
async function sourceOf(file) {
  if (patched.has(file)) return patched.get(file);
  const abs = path.join(SRC, file);
  const patches = PATCHES[file];
  let buffer;
  if (!patches) {
    buffer = await sharp(abs).png().toBuffer();
  } else {
    // Default `over` blend is enough: donor rects are cut from solid interior
    // with no transparency or antialiased edges, so they fully cover what's
    // beneath. (A Porter-Duff `source`/`clear` blend looks tempting for a
    // "hard replace" but libvips applies those across the whole canvas, not
    // just the overlay's bounds, which wipes the entire base image.)
    const pieces = await Promise.all(
      patches.map(async (p) => ({
        left: p.to.x,
        top: p.to.y,
        input: await sharp(abs)
          .extract({ left: p.from.x, top: p.from.y, width: p.w, height: p.h })
          .png()
          .toBuffer(),
      }))
    );
    buffer = await sharp(abs).composite(pieces).png().toBuffer();
  }
  patched.set(file, buffer);
  return buffer;
}

async function buildSingle(name, spec, source) {
  const w = round(spec.rect.w * spec.scale);
  const h = round(spec.rect.h * spec.scale);
  await webp(
    sharp(source ?? (await sourceOf(spec.file)))
      .extract({ left: spec.rect.x, top: spec.rect.y, width: spec.rect.w, height: spec.rect.h })
      .resize(w, h, { kernel: "lanczos3", fit: "fill" })
  ).toFile(path.join(OUT, `${name}.webp`));
  return { src: `/sprites/${name}.webp`, width: w, height: h };
}

async function buildNineSlice(name, spec) {
  const base = await buildSingle(name, spec);
  const inset = Object.fromEntries(
    Object.entries(spec.inset).map(([side, value]) => [side, round(value * spec.scale)])
  );
  return { ...base, inset };
}

async function buildPhotos() {
  await mkdir(IMG_OUT, { recursive: true });
  const out = {};
  for (const { name, width } of PHOTOS) {
    const meta = await sharp(path.join(IMG_SRC, `${name}.png`))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(IMG_OUT, `${name}.webp`));
    out[name] = { src: `/img/${name}.webp`, width: meta.width, height: meta.height };
  }
  return out;
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const manifest = { player: {}, sheets: {}, single: {}, ui: {}, photos: {} };

  for (const [name, spec] of Object.entries(PLAYER)) {
    manifest.player[name] = await buildSheet(name, {
      ...spec,
      scale: PLAYER_HEIGHT / spec.standing,
    });
  }
  for (const [name, spec] of Object.entries(SHEETS)) {
    manifest.sheets[name] = await buildSheet(name, spec);
  }
  for (const [name, spec] of Object.entries(SINGLES)) {
    manifest.single[name] = await buildSingle(name, spec);
  }
  for (const [name, spec] of Object.entries(NINE_SLICE)) {
    manifest.ui[name] = await buildNineSlice(name, spec);
  }
  for (const [name, spec] of Object.entries(ORNAMENTS)) {
    // Cut from the untouched original — the patched copy has these painted out.
    manifest.single[name] = await buildSingle(name, spec, path.join(SRC, spec.file));
  }
  manifest.photos = await buildPhotos();

  await writeFile(
    MANIFEST,
    `// Generated by scripts/build-sprites.mjs — do not edit by hand.\n` +
      `// Run \`npm run assets\` to regenerate.\n\n` +
      `export const sprites = ${JSON.stringify(manifest, null, 2)};\n\n` +
      `export const PLAYER_STANDING_HEIGHT = ${PLAYER_HEIGHT};\n`
  );

  console.log("sprites built:");
  for (const group of ["player", "sheets"]) {
    for (const [name, m] of Object.entries(manifest[group])) {
      console.log(`  ${name.padEnd(10)} ${m.frames} frames  cell ${m.cellW}x${m.cellH}  baseline ${m.baseline}`);
    }
  }
}

main();
