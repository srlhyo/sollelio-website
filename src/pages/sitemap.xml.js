import { LOCALES, localePath, t } from '../i18n/index.js';

const ROUTES = ['/', '/events'];

export function GET({ site }) {
  const url = (lang, path) => new URL(localePath(lang, path), site).href;
  const entries = ROUTES.flatMap((path) =>
    LOCALES.map((lang) => {
      const alternates = LOCALES.map((l) => `<xhtml:link rel="alternate" hreflang="${t(l).htmlLang}" href="${url(l, path)}"/>`).join('');
      return `<url><loc>${url(lang, path)}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${url('pt', path)}"/></url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
