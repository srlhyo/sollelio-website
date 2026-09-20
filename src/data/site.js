// Single place for the few values that change between environments.
export const SITE = {
  name: 'Sollelio',
  tagline: 'Software for better business operations.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://sollelio.com',
  email: 'helio@sollelio.com',
  // Set PUBLIC_LINKEDIN_URL in the environment. Until then the site renders an
  // obviously-placeholder href so nothing fabricated ships by accident.
  linkedin: import.meta.env.PUBLIC_LINKEDIN_URL || '',
  year: 2026,
};

export const LINKEDIN_PLACEHOLDER = 'https://www.linkedin.com/in/REPLACE-WITH-HELIO-LINKEDIN-URL';

export const linkedinHref = () => SITE.linkedin || LINKEDIN_PLACEHOLDER;

export const mailto = (subject) =>
  `mailto:${SITE.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const DP_SUBJECT = 'Founding Design Partner — Sollelio Events';
