import type { UiKey } from '../i18n/ui';

// Locale-agnostic nav structure — Nav.astro and Footer.astro both build their
// link lists from this single source instead of hardcoding their own copies.
// Footer flattens this to top-level links only; Nav renders `children` as a
// dropdown (desktop) / accordion (mobile).
export const navItems: { path: string; key: UiKey; children?: { path: string; key: UiKey }[] }[] = [
  { path: '/', key: 'nav.home' },
  {
    path: '/managed-websites',
    key: 'nav.managedWebsites',
    children: [
      { path: '/managed-websites/professional-web-presence', key: 'nav.professionalWebPresence' },
      { path: '/managed-websites/managed-hosting', key: 'nav.managedHosting' },
      { path: '/managed-websites/starter-package', key: 'nav.starterPackage' },
    ],
  },
  { path: '/data-work', key: 'nav.dataWork' },
  { path: '/cost-calculator', key: 'nav.costCalculator' },
  { path: '/case-studies', key: 'nav.proof' },
  { path: '/about', key: 'nav.about' },
  { path: '/contact', key: 'nav.contact' },
];
