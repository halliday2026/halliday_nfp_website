import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hallidayinc.com',
  base: '/',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', { path: 'es', codes: ['es-NI', 'es'] }],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
