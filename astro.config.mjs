import { defineConfig, fontProviders } from 'astro/config';

// Static site: pre-rendered HTML, CSS inlined, JS only for motion and the mobile nav.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://sollelio.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Manrope',
      cssVariable: '--font-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
  ],
});
