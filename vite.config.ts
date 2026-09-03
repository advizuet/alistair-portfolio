import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo at /alistair-portfolio/. Local dev stays at /.
  base: process.env.GITHUB_PAGES ? '/alistair-portfolio/' : '/',
})
