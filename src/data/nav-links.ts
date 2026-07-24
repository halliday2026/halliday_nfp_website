import type { UiKey } from '../i18n/ui';

// Locale-agnostic nav structure — Nav.astro and Footer.astro both build their
// link lists from this single source instead of hardcoding their own copies.
export const navItems: { path: string; key: UiKey }[] = [
  { path: '/', key: 'nav.home' },
  { path: '/data-work', key: 'nav.dataWork' },
  { path: '/managed-websites', key: 'nav.managedWebsites' },
  { path: '/cost-calculator', key: 'nav.costCalculator' },
  { path: '/case-studies', key: 'nav.proof' },
  { path: '/about', key: 'nav.about' },
  { path: '/contact', key: 'nav.contact' },
];
