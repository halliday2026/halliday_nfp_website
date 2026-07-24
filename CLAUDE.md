# Halliday NFP Website

Astro 5 + Tailwind CSS v4 static site for [hallidayinc.com](https://hallidayinc.com).
Halliday is a **nonprofit data consultancy** with a **managed-website program as its
front door**. Targeting nonprofit leadership (Executive Directors) in the "messy
middle" (~$500K–$2M budgets).

> **Rebuild complete (landed June–July 2026).** The site was rebuilt from a locked
> strategy and now matches the target state below (two-tier Data Work + Managed
> Websites, all sitemap pages live). The five files in `/docs/strategy/` remain the
> source of truth for positioning, structure, and design — **read them before making
> content, structure, or design changes**, since they explain the *why* behind
> current copy and layout, not just history.

## Source of truth — read before building

`/docs/strategy/`:
1. `Halliday_Messaging_Artifact_2026-06.md` — hero, pillars, WHO, before/after,
   operating rules. The trunk.
2. `Halliday_Service_Architecture_2026-06.md` — two-tier model, funnel, $7,500
   productized offer.
3. `Halliday_Gateway_Calculator_Spec_2026-06.md` — the Cost Calculator spec.
4. `Halliday_Website_Brief_2026-06.md` — sitemap + page-by-page structure. The build map.
5. `Halliday_Design_Tokens_2026-06.md` — colors, type, logo, Tailwind v4 @theme.

The Brief governs structure and words; the Tokens file governs look. Don't invent
positioning, copy angles, or colors outside these files. If ambiguous, ask.

## Non-negotiable guardrails (every line of copy)

- Lead with the customer + outcome. Never lead with "custom build" or "AI."
- Custom build is the HOW — Data Work page body only, never a flag.
- Deliver with AI, never sell the AI. No "powered by AI" customer-facing.
- Never market "cheaper." No price near the hero; no "easy/simple/fast" as the
  loudest note. Website value = a real person + peace of mind, not price.
- Home hero is MODULAR — emphasis re-weights later (websites-led now → data-led at
  Gate 1) without a structural rebuild.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview built site locally |
| `npm run typecheck` | TypeScript type check |

## Tech Stack

- **Astro 5** — static output (`output: 'static'`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (NOT `@astrojs/tailwind`)
- **TypeScript** (strict mode, `astro/tsconfigs/strict`)
- **Fonts**: Hanken Grotesk (headings) + Inter (body) via **Fontsource** (self-hosted,
  not Google Fonts hotlink)
- **Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Domain**: hallidayinc.com (`public/CNAME`)
- **Analytics**: Plausible snippet in `BaseLayout.astro`

## Sitemap

```
Home              /                  hero leads websites; body asserts the data case
Data Work         /data-work         THE MOAT PAGE — serious data consultancy, $7,500 floor
Managed Websites  /managed-websites  the wedge — done-for-you + peace of mind
Cost Calculator   /cost-calculator   gateway asset — self-built Astro island (NOT Tally)
Proof             /case-studies      case studies — EHL at launch (nav label "Proof")
About             /about             credibility + why us
Contact           /contact           book the free discovery conversation
```

Primary nav CTA throughout: **"Book a discovery call."**

## Design System

Tokens live in `src/styles/global.css` via Tailwind v4 `@theme` — source values in
`/docs/strategy/Halliday_Design_Tokens_2026-06.md`.

| Token | Hex | Usage |
|---|---|---|
| `--color-charcoal` / `--color-ink` | `#2B2B2F` | Primary ink, headings, single dark |
| `--color-body` | `#3F4145` | Body copy |
| `--color-muted` | `#6E7176` | Secondary text |
| `--color-silver` | `#C8C9CC` | Dividers, quiet UI |
| `--color-stone` | `#EDEAE4` | Section backgrounds |
| `--color-border` | `#DAD8D2` | Hairlines, card edges |
| `--color-navy` | `#2E4A6B` | **Action only** — CTAs, links, focus |
| `--color-navy-dark` | `#233A54` | Hover / active |
| `--color-navy-tint` | `#EAEEF3` | Subtle navy surfaces |
| `--color-success` | `#3F7A5E` | Form valid state |
| `--color-error` | `#B0413A` | Form errors |

**Discipline:** navy = "do something." If it isn't clickable or a focus state, it
isn't navy. Refinement comes from spacing and type, not heavy shadows.

**Logo:** geometric H monogram + HALLIDAY wordmark. Normalize the mark fill to
charcoal `#2B2B2F`. On dark/navy backgrounds use stone/white. No diamond, no "CO."

## Critical Gotchas

1. **Font import order**: any Google Fonts `@import` MUST precede `@import
   "tailwindcss"` in `global.css` (v4 requirement). Preferred: use Fontsource and
   remove the Google import entirely.
2. **Tailwind integration**: `@tailwindcss/vite` plugin in `astro.config.mjs`. Do
   NOT use `@astrojs/tailwind` (v3).
3. **Content collection config**: `src/content.config.ts` at the `src/` root (Astro 5
   convention), not in `src/content/`.

## Forms — Supabase (single backend, two edge functions)

One Supabase backend/project (`qncqegweobwyudatlomq`), no other form service. Two
edge functions live in it:

- `contact-form` — existing, used by `ContactForm.astro`.
  `https://qncqegweobwyudatlomq.supabase.co/functions/v1/contact-form`
- `calculator-lead` — new, used by the Cost Calculator's post-result email capture.
  `https://qncqegweobwyudatlomq.supabase.co/functions/v1/calculator-lead`

Don't introduce a third backend (e.g. Formspree, despite the Gateway Calculator Spec
doc's original Phase-1 suggestion) — that decision was superseded in favor of staying
on the one Supabase project.

`interestedIn` options reflect the current offers (Managed Website, Data Work,
Not Sure Yet, Referral Partner, General Inquiry) — the old "Impact Data Review" and
"AI Readiness Assessment" options have already been removed. Keep it that way; don't
reintroduce stale options when touching this form.

## Reuse vs. replace (historical — from the June 2026 rebuild)

Kept from the pre-rebuild site:
- Tailwind v4 / `@tailwindcss/vite` setup, TS strict, path aliases.
- `BaseLayout.astro` scroll animations (`data-animate` + IntersectionObserver,
  respects `prefers-reduced-motion`).
- Content-collections pattern (resources, case studies) — reused for Proof.
- `/case-studies/conservation-nonprofit` = the EHL case study, adapted onto the new
  productized offer.

Replaced and gone — **don't reintroduce these**:
- Old palette (teal/amber) — tokens above are the only palette now.
- Old fonts (Fraunces / DM Sans) — Hanken Grotesk / Inter only.
- Old services chain (IDR / Strategic Advisory / Custom Solutions, $2,500 IDR) —
  superseded by two-tier Data Work + Managed Websites, $7,500 floor.
- Tally "AI Readiness Assessment" page — replaced by the self-built Cost Calculator.
- **"Signal by Halliday" product marketing** — unvalidated downstream experiment;
  a single neutral one-liner at most, default to omitting.
- Any "$2M–$20M budgets" framing — messy-middle ($500K–$2M, signals over budget) only.
- Old four capability pillars — replaced by the new outcome pillars.

## Path Aliases

```
@components/* → src/components/*
@layouts/*    → src/layouts/*
@styles/*     → src/styles/*
@assets/*     → src/assets/*
```

## Notes

- Productized data offer name is provisional ("Donor Insight Engagement") — used as
  placeholder; lock before final copy.
- Cost Calculator: result UNGATED (instant estimate, email captured after), tap-only
  inputs, no salary question. Loss figure shown in charcoal (the prospect's loss),
  not navy.
