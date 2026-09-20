import pt from './pt.js';
import en from './en.js';

export const LOCALES = ['pt', 'en'];
export const DEFAULT_LOCALE = 'pt';
const DICTS = { pt, en };

export const t = (lang) => DICTS[lang] || DICTS[DEFAULT_LOCALE];

// Localised path: PT lives at the root, EN under /en.
export const localePath = (lang, path = '/') => {
  if (lang === DEFAULT_LOCALE) return path;
  return path === '/' ? '/en' : `/en${path}`;
};

export const otherLang = (lang) => (lang === 'pt' ? 'en' : 'pt');
