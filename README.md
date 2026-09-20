# Sollelio — public website (V0)

The Minimum Credible Presence for Sollelio: two public pages that make the
company, its product thesis and the Founding Design Partner programme
believable to a prospect who has just received an email from Hélio.

Portuguese is the default language (Portugal is the initial market); English lives under `/en`.

- `/` and `/events` — Portuguese (European Portuguese, AO90 spelling)
- `/en` and `/en/events` — English (the approved copy, verbatim)

Both languages share the same design system, architecture and hierarchy. The
header carries a text-only PT / EN switcher that links to the equivalent page.

## Stack

Astro 7, static output, plain CSS with design tokens, ~2 KB of vanilla JS
(reveal-on-scroll, mobile nav, header state). No backend, CMS or analytics.
Deploys to Netlify (`netlify.toml`); headers in `public/_headers`.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview
```

## Configuration

Copy `.env.example` to `.env` (or set in the Netlify UI):

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_URL` | Public domain, feeds canonical URLs and Open Graph. Defaults to `https://sollelio.com`. |
| `PUBLIC_LINKEDIN_URL` | Hélio's LinkedIn profile. **Until set, the "Connect on LinkedIn" links point at an obvious placeholder** (`…/in/REPLACE-WITH-HELIO-LINKEDIN-URL`) so nothing fabricated ships. |

The contact email (`helio@sollelio.com`) lives in `src/data/site.js`.

## Structure

```
src/
  styles/global.css        design tokens (colour, type, spacing, motion) + base system
  layouts/Base.astro       <head>, metadata, Open Graph, JSON-LD, nav + footer
  components/
    Nav.astro Footer.astro SectionHead.astro Arrow.astro
    HeroFigure.astro       homepage hero: fragments settle into one structure
    ProductSurface.astro   Sollelio Events product surface (schematic today, screenshot slot)
    Fragmentation.astro    /events "The problem" figure
    JourneyMap.astro       /events "What we're building" — eight areas on one rail
    PartnerProcess.astro   /events collaboration track (Understand → Build → Test, iterate)
  pages/index.astro events.astro 404.astro
  scripts/site.js          motion + nav runtime (respects prefers-reduced-motion)
  data/site.js             email, LinkedIn, site URL
  i18n/pt.js en.js         all copy, per language; index.js has localePath()/t()
  components/pages/        HomePage.astro, EventsPage.astro (shared by both languages)
  components/OriginEvidence.astro   Do Luxo à Mesa system screenshots, contextualised
public/brand/              supplied brand assets v0.1 (unchanged) + BRAND-README.md
public/origin/             Do Luxo à Mesa screenshots (desktop, 900w, mobile crops) + logo
```

## Visual system in one paragraph

Two grounds from the brand palette: Warm Off-white for editorial sections,
Midnight Indigo for product environments (the Sollelio Events section, "What
we're building", final CTA and footer). Sections opt in with `.theme-dark`;
Sollelio Events surfaces opt into the controlled teal accent with
`.theme-events`. Type is Manrope (headlines and body) with IBM Plex Mono for
eyebrows, labels and diagram annotations. Logos are the supplied outlined SVGs,
never redrawn; the standalone symbol is used only where the lockup would fall
under ~140 px (mobile nav).

## Origin evidence (Do Luxo à Mesa)

The `/events` origin section and the homepage "Why Sollelio" section show
screenshots of the internal system built for Do Luxo à Mesa. They are shown in
that business's own identity, inside a neutral frame, and labelled as the origin
of Sollelio Events — never restyled to look like the future product. The Do Luxo
à Mesa logo appears only to identify the origin business. **The current captures are placeholders, not approved for production**: they
show the cursor and unconfirmed data. Replace them with clean captures using the
same file names, regenerating the three sizes in `public/origin/` (1600w, 900w
and a `-m` mobile crop).

## Adding real product UI

`ProductSurface.astro` renders a labelled schematic of the operational areas
until real screenshots exist. To swap in a real screenshot without touching the
section, pass an `image` prop from `src/pages/index.astro`:

```astro
<ProductSurface image={{ src: '/product/events-overview.png', alt: 'Sollelio Events — event overview', width: 1600, height: 1000 }} />
```

Put the file in `public/product/`. The facts row and note adapt automatically.

## Content rules

The English copy is approved positioning; the Portuguese version is a natural
European Portuguese rendering of it, not a literal translation. Do not add customer counts,
testimonials, logos, pricing, integrations or capability claims that the copy
does not support. Sollelio Workforce is intentionally not surfaced.
