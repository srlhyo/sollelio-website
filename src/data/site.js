// Single place for the few values that change between environments.
export const SITE = {
  name: 'Sollelio',
  tagline: 'Software for better business operations.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://sollelio.com',
  email: 'helio@sollelio.com',
  // Founder profile. PUBLIC_LINKEDIN_URL can override it per environment.
  linkedin: import.meta.env.PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/helio-goncalves/',
  year: 2026,
};

export const linkedinHref = () => SITE.linkedin;

export const mailto = (subject) =>
  `mailto:${SITE.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const DP_SUBJECT = 'Founding Design Partner — Sollelio Events';
