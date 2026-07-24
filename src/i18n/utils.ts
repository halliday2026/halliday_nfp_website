import { ui, defaultLang, type Lang, type UiKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  return maybeLang in ui ? (maybeLang as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

// Strips a leading locale segment (e.g. "/es") so callers can re-target the
// current page in the other language via getRelativeLocaleUrl().
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] in ui && segments[0] !== defaultLang) {
    segments.shift();
  }
  return '/' + segments.join('/');
}

// BCP-47 tag for <html lang>, hreflang, and Intl (toLocaleString/toLocaleDateString)
// calls. Kept separate from the "en"/"es" dictionary key above so those call
// sites always get the Nicaraguan-specific tag regardless of what
// Astro.currentLocale resolves to.
export function getLocaleTag(lang: Lang): string {
  return lang === 'es' ? 'es-NI' : 'en';
}
