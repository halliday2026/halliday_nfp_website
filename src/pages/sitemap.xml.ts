import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Hand-rolled sitemap (no @astrojs/sitemap dependency) covering both locales
// with hreflang alternates. Every static page below exists at the same path
// suffix under both "/" and "/es/" — see the i18n plan's path-parity rule.
const SITE = 'https://hallidayinc.com';

const staticPaths = [
  '/',
  '/data-work',
  '/managed-websites',
  '/cost-calculator',
  '/about',
  '/contact',
  '/resources',
  '/case-studies',
  '/case-studies/conservation-nonprofit',
];

function localizedUrl(path: string, lang: 'en' | 'es'): string {
  if (lang === 'en') return `${SITE}${path}`;
  return path === '/' ? `${SITE}/es` : `${SITE}/es${path}`;
}

interface UrlEntry {
  loc: string;
  alternates: { hreflang: string; href: string }[];
}

export const GET: APIRoute = async () => {
  const resources = await getCollection('resources', ({ data }) => !data.draft);
  const enSlugs = new Set(
    resources.filter((r) => r.slug.startsWith('en/')).map((r) => r.slug.replace(/^en\//, ''))
  );
  const esSlugs = new Set(
    resources.filter((r) => r.slug.startsWith('es/')).map((r) => r.slug.replace(/^es\//, ''))
  );
  const allResourceSlugs = new Set([...enSlugs, ...esSlugs]);

  const entries: UrlEntry[] = [];

  for (const path of staticPaths) {
    const enHref = localizedUrl(path, 'en');
    const esHref = localizedUrl(path, 'es');
    const alternates = [
      { hreflang: 'en', href: enHref },
      { hreflang: 'es-NI', href: esHref },
      { hreflang: 'x-default', href: enHref },
    ];
    entries.push({ loc: enHref, alternates });
    entries.push({ loc: esHref, alternates });
  }

  for (const slug of allResourceSlugs) {
    const path = `/resources/${slug}`;
    const hasEn = enSlugs.has(slug);
    const hasEs = esSlugs.has(slug);
    const enHref = localizedUrl(path, 'en');
    const esHref = localizedUrl(path, 'es');
    const alternates = [
      ...(hasEn ? [{ hreflang: 'en', href: enHref }] : []),
      ...(hasEs ? [{ hreflang: 'es-NI', href: esHref }] : []),
      ...(hasEn ? [{ hreflang: 'x-default', href: enHref }] : []),
    ];
    if (hasEn) entries.push({ loc: enHref, alternates });
    if (hasEs) entries.push({ loc: esHref, alternates });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
${entry.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
