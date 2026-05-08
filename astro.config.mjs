// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hovera.app',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: { pl: 'pl-PL', en: 'en-GB', de: 'de-DE', fr: 'fr-FR' },
      },
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    clientPrerender: true,
  },
});
