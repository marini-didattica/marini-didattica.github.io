// @ts-check
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Deployed as a Cloudflare Pages project at
  // https://didattica.mattia-marini.com/
  site: 'https://didattica.mattia-marini.com',
  // Inline the (small) stylesheet into every page. Firefox can paint the HTML
  // before an external stylesheet finishes loading, which shows the raw,
  // unstyled page for a frame or two. Inlining removes that request entirely.
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
