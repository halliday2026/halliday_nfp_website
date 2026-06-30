# Halliday — Design Tokens
**Design north-star · June 2026**

> This is the design direction the Website Brief deferred ("look, type, color, feel — a separate creative-direction pass"). It's the **fifth build-input file** — carry it into Claude Code with the four locked artifacts. It turns the approved palette into something buildable: colors, type, logo usage, and a paste-ready Tailwind v4 theme block. This file governs *look*; the Brief governs *structure and words*.

---

## North-star (the feeling, in four lines)

- **Refined, modern, credible. Data-serious, but human.** Palette tagline: *Refined. Modern. Enduring.*
- **Restraint is the aesthetic.** Generous whitespace, one accent used only for action, no decoration for decoration's sake.
- **Not luxury-boutique.** The approved direction is clean-professional, not high-fashion. Avoid ornamental serif display type, the diamond monogram, and "prestige" styling that could read *expensive / not-for-us* to a messy-middle ED. (The "HALLIDAY CO." treatment from the palette reference is **out** — the approved logo is the geometric H wordmark below.)
- **Accessibility floor: WCAG AA.** Navy-on-white and charcoal-on-stone both pass; keep it that way.

---

## Color tokens

### Brand (from the approved palette)
| Token | Hex | Role |
|---|---|---|
| Charcoal | `#2B2B2F` | Primary ink — headings, the single dark |
| Platinum Silver | `#C8C9CC` | Dividers, disabled states, quiet UI |
| Pale Stone | `#EDEAE4` | Warm off-white — section backgrounds |

### Accent (navy — your pick)
| Token | Hex | Role |
|---|---|---|
| Navy | `#2E4A6B` | **Action only** — CTAs, links, focus rings. Muted, strong white-text contrast. |
| Navy Dark | `#233A54` | Hover / active states |
| Navy Tint | `#EAEEF3` | Subtle navy-tinted surfaces, selected/active backgrounds |

*Discipline: navy means "do something." If it's not clickable or a focus state, it shouldn't be navy. This keeps CTAs obvious against an all-neutral page.*

### Neutrals (derived — warm-grey to harmonize with stone)
| Token | Hex | Role |
|---|---|---|
| White | `#FFFFFF` | Primary surface |
| Ink | `#2B2B2F` | Headings (= Charcoal) |
| Body | `#3F4145` | Body copy (lifted slightly off charcoal for long-read comfort) |
| Muted | `#6E7176` | Captions, secondary text |
| Border | `#DAD8D2` | Hairlines, card edges |
| Surface Alt | `#EDEAE4` | Alternating section background (= Stone) |

### Functional (quiet — form states only, on the calculator + contact form)
| Token | Hex | Role |
|---|---|---|
| Success | `#3F7A5E` | Valid input, success confirmation |
| Error | `#B0413A` | Validation errors |

*Kept muted on purpose — they should read as part of the refined palette, not loud system colors.*

---

## Tailwind v4 `@theme` (paste-ready)

```css
@theme {
  /* brand */
  --color-charcoal: #2B2B2F;
  --color-silver:   #C8C9CC;
  --color-stone:    #EDEAE4;

  /* accent (navy) */
  --color-navy:      #2E4A6B;
  --color-navy-dark: #233A54;
  --color-navy-tint: #EAEEF3;

  /* neutrals */
  --color-ink:    #2B2B2F;
  --color-body:   #3F4145;
  --color-muted:  #6E7176;
  --color-border: #DAD8D2;

  /* functional */
  --color-success: #3F7A5E;
  --color-error:   #B0413A;

  /* type */
  --font-heading: "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-body:    "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

Generates utilities like `bg-navy`, `text-ink`, `border-border`, `bg-stone`, `font-heading`, etc.

---

## Typography direction

**Recommended pairing (clean, credible, free, self-hostable):**
- **Headings — Hanken Grotesk.** Geometric but warm; professional without being cold or fashion-y. Weights 600/700.
- **Body — Inter.** Unmatched readability at small sizes — important for the calculator's numbers and the data-heavy copy. Weights 400/500.

Both are on Google Fonts; self-host via Fontsource in Astro (don't hotlink — keeps it fast and private). Keep to **2 families, ~2 weights each** — weight sprawl reads cheap.

Usage feel: generous heading sizes with tight tracking, body line-height ~1.6, lots of breathing room. Let the stone and white carry the calm.

**Optional alternative (more editorial warmth):** a refined serif for headings (Fraunces or Newsreader) + Inter body. Gives an "established firm" gravitas — but it edges back toward the luxury feel we deliberately stepped away from, so only if you want that warmth. Default recommendation stays the sans pairing.

---

## Logo usage

- **Approved asset:** the geometric **H monogram** (`H_Logo.svg`, icon-only) + the **HALLIDAY** sans wordmark (the lockup in `Logo.jpg`). Clean and modern — keep it that way.
- **One color cleanup to make:** the supplied monogram fills with `#3B3F42`, but the brand charcoal is `#2B2B2F`. Two near-identical darks will look like a mistake on screen. **Recommendation: normalize the mark to `#2B2B2F`** so the site has a single consistent dark. (If you prefer the softer `#3B3F42`, that's fine — but then make *it* the charcoal token everywhere, not just the logo. Pick one dark and use it throughout.)
- **On dark / navy backgrounds:** use a Stone or White version of the mark (don't place charcoal-on-navy).
- **Clear space:** keep at least the width of one H-bar clear on all sides. **Don't** stretch, recolor outside the approved variants, add the diamond, or reintroduce "CO."

---

## Application notes (so the build is consistent from page one)

- **CTAs:** navy fill, white text, navy-dark on hover. The persistent "Book a discovery call" nav button is the one loud element per screen — everything else stays quiet.
- **Sections:** alternate White and Stone backgrounds for rhythm; charcoal headings, body-grey copy throughout.
- **Borders / cards:** hairline `--color-border`, no heavy shadows — refinement comes from spacing and type, not drop-shadows.
- **Focus states:** visible navy focus ring on all interactive elements (accessibility + it reinforces "navy = action").
- **The calculator (Thread 3):** numbers in Inter, the headline loss figure large and charcoal (not navy — it's the prospect's loss, not a Halliday CTA), the post-result discovery-call button in navy.
