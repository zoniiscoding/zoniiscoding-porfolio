/**
 * Vite copies public/ verbatim into dist/, which includes public/assets — the
 * ~22MB of original, unoptimized artwork that scripts/build-sprites.mjs reads
 * from. Nothing in the shipped site references those files (everything uses
 * the generated /sprites and /img instead), so they're deleted from the build
 * output only. The source files under public/assets/ are never touched.
 */
import { rm } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await rm(path.join(ROOT, "dist/assets"), { recursive: true, force: true });
console.log("stripped dist/assets (source art excluded from the deploy)");
