# Halliday NFP Website

Astro 5 + Tailwind CSS v4 static site for [hallidayinc.com](https://hallidayinc.com), targeting nonprofit leadership with data strategy services.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview built site locally |
| `npm run typecheck` | TypeScript type check |

## Tech Stack

- **Astro 5.3** — static output (`output: 'static'`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (NOT `@astrojs/tailwind`)
- **TypeScript** (strict mode, `astro/tsconfigs/strict`)
- **Fonts**: Fraunces (headings) + DM Sans (body) via Google Fonts
- **Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Domain**: hallidayinc.com (`public/CNAME`)

## Project Structure

```
src/
  assets/           Logo.jpg
  components/       Nav, Footer, ContactForm, ResourceCard
  content/
    resources/      3 markdown resource articles
  layouts/
    BaseLayout.astro  shared layout (Nav, Footer, SEO, scroll animations)
  pages/
    index, about, services, assessment, resources, contact
    case-studies/     conservation-nonprofit (full case study pages — add future ones here)
  styles/
    global.css      Tailwind v4 entry + @theme design tokens + animations
  content.config.ts content collection schema (Astro 5 convention — at src/ root)
public/             CNAME, favicon.svg, images/
```

## TypeScript Path Aliases

```
@components/* → src/components/*
@layouts/*    → src/layouts/*
@styles/*     → src/styles/*
@assets/*     → src/assets/*
```

## Design System

CSS variables defined via `@theme` in `src/styles/global.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#0d5c63` | Deep teal — primary brand |
| `--color-primary-dark` | `#09424a` | Hover / footer background |
| `--color-primary-light` | `#1a7a83` | Lighter teal accents |
| `--color-accent` | `#c8873a` | Warm amber — CTAs |
| `--color-accent-hover` | `#b07030` | Amber hover state |
| `--color-bg` | `#f7f4ef` | Warm off-white page background |
| `--color-surface` | `#ffffff` | Card/panel backgrounds |
| `--color-text` | `#1c2426` | Primary body text |
| `--color-text-muted` | `#566063` | Secondary/muted text |
| `--color-border` | `#ddd8cf` | Borders and dividers |

## Critical Gotchas

1. **Google Fonts import order**: The `@import` for Google Fonts MUST come before `@import "tailwindcss"` in `global.css`. Tailwind v4 requirement — reversing the order breaks fonts.

2. **Tailwind integration**: Uses `@tailwindcss/vite` plugin directly in `astro.config.mjs`. Do NOT use `@astrojs/tailwind` (that's Tailwind v3 integration).

3. **Content collection config**: `src/content.config.ts` lives at the `src/` root (Astro 5 convention), not in `src/content/`.

## Scroll Animations

`BaseLayout.astro` includes an IntersectionObserver that adds `is-visible` class to any element with `[data-animate]` attribute when 10% visible. Animation delays available via `data-delay="100"` through `"400"`. Respects `prefers-reduced-motion`.

## Contact Form (ContactForm.astro)

POSTs to Supabase edge function. Field names must match exactly:

- `fullName` (required)
- `email` (required)
- `phoneNumber`
- `bestTimeToCall` (Morning | Afternoon | Evening)
- `organizationName`
- `interestedIn` (Impact Data Review | Strategic Advisory | Custom Solutions | AI Readiness Assessment | General Inquiry)
- `comments` (required, textarea)

**Endpoint**: `https://qncqegweobwyudatlomq.supabase.co/functions/v1/contact-form`

## Services Page Structure

The services page (`src/pages/services.astro`) is organized as a three-stage sequential value chain, each with an anchor ID:
- `#impact-data-review` — Gateway fixed-scope engagement (IDR)
- `#strategic-advisory` — Buy vs. build advisory and roadmap
- `#custom-solutions` — Custom dashboards, integrations, and data products (includes Signal by Halliday)

The homepage previews these three stages and links to the anchors.

## Footer

Tagline: "Data strategy for mission-driven organizations."
Located in `src/components/Footer.astro`.

## Case Studies

Full case study pages live in `src/pages/case-studies/` as static `.astro` files (one per case study). Current:
- `/case-studies/conservation-nonprofit` — Impact Data Review for a habitat conservation nonprofit

The homepage has a "Results That Speak for Themselves" section (`<!-- CASE STUDIES -->` in index.astro) with a card grid (`grid-cols-1 lg:grid-cols-2`) — add future case study cards there as well.

## Assessment Page

`src/pages/assessment.astro` contains a Tally embed. The form ID placeholder is `FORM_ID_HERE` — swap in the real Tally form ID when available.

## Resources Content Collection

Schema (`src/content.config.ts`):
- `title` (string, required)
- `description` (string, required)
- `publishDate` (date, coerced)
- `category` (string, required)
- `tags` (string[], optional)
- `draft` (boolean, default false)

Content files: `src/content/resources/*.md`
