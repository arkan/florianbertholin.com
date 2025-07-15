// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime, remarkFillDescription } from './src/js/remark-reading-time.mjs';
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkFillDescription, remarkToc, remarkGfm],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  site: "https://www.florianbertholin.com",

  integrations: [sitemap({
    filenameBase: "sitemap"
  })],
});