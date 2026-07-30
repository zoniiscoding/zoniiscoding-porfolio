import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Vite's default output dir for bundled JS/CSS is "assets", which
    // collides with the copied public/assets/ source-art folder. Renaming it
    // lets scripts/strip-source-art.mjs delete dist/assets/ wholesale after
    // the build without touching the site's own bundle.
    assetsDir: "static",
  },
})
