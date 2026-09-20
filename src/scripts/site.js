// Sollelio — the small amount of runtime the site needs.
// Motion respects prefers-reduced-motion; nothing essential lives in it.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Reveal on entry -----------------------------------------------------
const targets = document.querySelectorAll('.reveal');
if (reduced || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
  );
  targets.forEach((el) => io.observe(el));
  // Safety net: never leave content hidden.
  window.setTimeout(() => targets.forEach((el) => el.classList.add('is-in')), 4000);
}

// ---- Header state -------------------------------------------------------
const header = document.getElementById('site-header');
if (header) {
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// ---- Mobile navigation ---------------------------------------------------
const toggle = document.querySelector('.nav__toggle');
const panel = document.getElementById('nav-panel');
if (toggle && panel) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('nav-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 48em)').addEventListener('change', (e) => e.matches && setOpen(false));
}

// ---- Hero figure: settle once fonts are ready ----------------------------
const ready = () => document.documentElement.classList.add('is-ready');
if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready, ready);
else ready();

// ---- View switcher (origin evidence) -------------------------------------
document.querySelectorAll('[data-views]').forEach((group) => {
  const buttons = group.querySelectorAll('[data-view-btn]');
  const views = group.querySelectorAll('[data-view]');
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const id = b.dataset.viewBtn;
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      views.forEach((v) => v.toggleAttribute('hidden', v.dataset.view !== id));
    }),
  );
});
