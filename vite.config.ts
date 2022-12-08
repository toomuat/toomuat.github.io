import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [react()],
  publicDir: './public',
  base: process.env.GITHUB_PAGES
    ? 'https://toomuat.github.io/'
    : './'
})
