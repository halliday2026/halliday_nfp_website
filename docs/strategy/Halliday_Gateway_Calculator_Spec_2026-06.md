# Halliday — Gateway Calculator Spec
**Thread 3 · Locked June 2026**

> Inherits Thread 1 (messaging) and Thread 2 (architecture). This is a **spec only** — the build happens during or after the website rebuild. Replaces the dead Workflow Review as the site's first-touch capture asset.

---

## What this replaces, and why the old one died

The Workflow Review pulled **zero leads** because it read as a *commitment* — a 2–3 week engagement the nonprofit had to invest in before getting anything back. That kills impulse.

The gateway calculator inverts it: **value first, in under a minute, then the ask.** The nonprofit gets a number that makes their pain concrete *before* you ask for anything.

---

## Concept

A lightweight web calculator: **"What is scattered data costing your nonprofit?"**

A few tap-only inputs → an instant estimate of hours and dollars lost per year to fragmented data and manual reporting → a reframe to what that time could be → an optional email capture for the detailed breakdown.

The arc is **loss → recovery → mission.** Lead with the loss number (loss-averse and validating — every ED already *feels* this), immediately reframe to hours-back-for-the-mission, then offer the deeper personalized value for an email.

---

## UX flow (~60 seconds end to end)

1. One-line framing + a single "Start" — no wall of fields up front.
2. 3–4 tap inputs, one at a time. No typing, no lookup, no homework (homework is what killed the Workflow Review).
3. **Instant headline estimate shown immediately — not gated behind email.**
4. Email capture offered *after* the result: "Send me the full breakdown + the 3 quickest fixes for my setup."

**Locked decision — result is ungated.** Gating behind email would lift capture rate but reintroduces the friction/bait feeling that killed the last asset. Everyone who finishes gets educated (good for a positioning asset even when they don't convert); the email is for the deeper, personalized value.

---

## Inputs (tap-only, no salary question)

| Input | Options | Feeds |
|---|---|---|
| Where does your data live? | 1–2 / 3–4 / 5+ systems | Qualifier + light multiplier |
| How long does a board or grant report take to pull together? | A couple hours / About a day / Several days / A week+ | Hours per report (≈2 / 8 / 24 / 40) |
| How often do you produce reports like that? | Monthly / Quarterly / A few times a year | Reports per year (12 / 4 / 3) |
| Outside reporting, weekly hours moving/reconciling data between tools? | <2 / 2–5 / 5–10 / 10+ | Weekly wrangling hours (≈1 / 3.5 / 7.5 / 12) |

No salary question — friction and awkwardness. Use a default loaded labor rate (**~$35/hr** for nonprofit ops, tunable).

Optional 5th input — budget band — purely as a messy-middle **qualifier**, not a math input. Optional so it adds no friction.

---

## Estimate logic (transparent, honest)

```
report_hours_per_year    = hours_per_report × reports_per_year
wrangling_hours_per_year = weekly_hours × 52
total_hours_per_year     = report_hours_per_year + wrangling_hours_per_year
annual_dollars           = total_hours_per_year × loaded_rate   (default $35)
```

Show the annual figure; optionally a 3-year projection (these costs recur — legitimate to project).

**Worked example:** 3–4 systems · report takes a day (8h) quarterly (32h/yr) · 2–5h/wk wrangling (~182h/yr) = ~214h/yr × $35 ≈ **$7,500/yr.**

Note where that lands: for a typical messy-middle org, the *annual* loss naturally lands near the productized engagement price — so the data work pays for itself in year one. Powerful talking point.

**Integrity rules (non-negotiable):**
- The constants stay **honest and defensible** — never tuned to hit the $7,500 number. The framing has to emerge from real defaults or it's worthless, and it must survive an ED who pushes on the math.
- Label the output as an **illustration, not an audit**: "a rough estimate based on what you told us." Overclaiming precision to a sharp ED is a credibility risk; the soft framing is both honest and disarming.

---

## Capture & nurture handoff

**Phase 1 (ships with the rebuild):**
- Capture via **Formspree** → notify Chris/Suzette. (Chosen for zero learning curve — already in use on other sites. See form-backend note below.)
- Lead logged in **Folk** (manual copy-paste per the known Folk constraint), tagged with the calculator inputs as qualifying data.
- Suzette runs the follow-up cadence; the **free discovery conversation** (Thread 2) is what the nurture drives toward.

**Phase 2 (after it proves out):**
- Store inputs in **Supabase** → generate a *tailored* breakdown email/PDF via the **Anthropic SDK** → send automatically.
- This reuses the exact pipeline pattern already planned for the monthly Plausible reports (API → Python/SDK → WeasyPrint). Reuse it, don't reinvent.

**Form-backend note:** Halliday is currently split across two form backends — Formspree (other sites + this calculator) and Web3Forms (EHL membership form spec). Pick one standard down the road; consolidating EHL onto Formspree would resolve it. **Watch flag:** Formspree's free tier caps at ~50 submissions/month, shared across sites on one account — know where the paid tier kicks in before volume surprises you.

---

## Build approach — self-built Astro widget, not Tally

**Locked decision — build as a small Astro/JS island in the site being rebuilt, not Tally.**

Reasoning:
- Needs custom math and a branded UX (Tally's calc/conditional logic is constrained, and it's a third-party embed with seams).
- Already in Astro/Tailwind/Claude Code — marginal build cost is a few hours.
- Owning the asset beats renting a tool (same "fewer moving parts" logic that deactivated n8n and chose self-build over Tally).
- Tally would win only with no dev capability — Claude Code removes that constraint.

**Phased build (ship fast, don't over-build before proven):**
- **Phase 1:** calculator + instant estimate + Formspree capture + manual Folk follow-up. Live and pulling leads. The Workflow Review's failure was *zero leads* — clear that bar first.
- **Phase 2:** Supabase + AI-generated tailored breakdown + automated nurture. Build only after Phase 1 proves it pulls leads.

---

## Guardrail

This calculator is the rare place a **cost frame is correct**: quantifying the loss makes the $7,500 engagement obviously worth it instead of anchoring cheap. It's the opposite of the cheapness risk.

Keep it on the **data pain** — never "our AI calculates," never a price near the result. The number is the prospect's loss, not Halliday's price.

---

## Locked decisions (summary)

1. **Result is ungated** — shown instantly, email captured after for the deeper breakdown.
2. **Self-built Astro widget**, not Tally.
3. **Formspree** as the Phase 1 capture layer (with the standardization + free-cap watch flags above).
