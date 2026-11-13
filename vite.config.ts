import react from '@vitejs/plugin-react'
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

// The site is served from https://vir1dian.github.io/dh-101-final/, so every
// URL needs that prefix. Set BASE_PATH=/ (or edit this line) if the site moves
// to a custom domain or a <user>.github.io repo.
const base = process.env.BASE_PATH ?? '/dh-101-final/'

// GitHub Pages has no single-page-app fallback: reloading /dh-101-final/about
// would 404. Pages serves 404.html for any unknown path, so we make 404.html a
// copy of the app shell and the router renders the right page from the URL.
function githubPagesFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'github-pages-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), githubPagesFallback()],
})
