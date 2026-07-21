# Gusty Group — Design System

A design system for **Gusty Group LLC**, a fractional operations and finance firm serving healthcare and life sciences founders from early stage through growth. The brand pairs an editorial serif with a clean grotesque sans over a warm, near-monochrome palette anchored by a single deep **olive** — the look of a boutique advisory practice, not a SaaS product.

> **Scope note.** The brand's color and design language are lifted verbatim from the firm's live marketing site. The brief described Gusty Group as a "healthcare credentialing and enrollment" company; the source material presents it as fractional ops & finance for healthcare/life sciences. This system follows the **source repo** for all visual decisions and copy, since that is the ground truth for the brand. If the credentialing positioning is correct, the copy in the UI kit can be swapped without touching any foundation.

## Sources used
- **GitHub:** `rems3n/gustygroup` (branch `master`) — a single static `index.html` marketing site plus a founder photo and favicons. All colors, type, spacing, components, and copy in this system are derived from that file. Explore it further to build higher-fidelity Gusty Group work: https://github.com/rems3n/gustygroup
- Related brand mentioned in the repo's `CLAUDE.md`: `chrisgusty.com` (sister personal-consulting site, shared look). Not read for this system.

No Figma file, component library, or brand guidelines document was provided — the marketing site is the sole source.

---

## Content fundamentals

**Voice.** Firm-person plural — "we," "Gusty Group," never "I." The founder (Chris Gusty) is named in exactly one place: the About/Founder section. Case studies credit "the Gusty Group founder," not the firm, as the person who held the operating role.

**Tone.** Confident, plain-spoken, senior-operator. Short declaratives. It states outcomes rather than selling ("Most consultants leave behind a deck. Gusty Group leaves behind systems."). It names the client's real, specific pain in their own words and answers with concrete deliverables — no hype adjectives, no "revolutionary/cutting-edge."

**Address.** Speaks directly to the founder as "you" / "your team." Client situations are framed as **quoted first-person lines** ("We just closed our seed."), set in the serif — a signature device.

**Casing.** Sentence case everywhere, including headlines and buttons ("Book a 30-minute call," "See if we're a fit"). Nav labels are Title Case ("Client Needs," "What You Keep," "Selected Work"). No ALL-CAPS in running text; the only uppercase is the letter-spaced GUSTY / GROUP wordmark.

**Punctuation & numerals.** Uses real typographic quotes and dashes (em dash —, en dash in ranges "2018 — 2026"). Roman numerals for enumerated situations (i., ii., iii.). Metrics are terse and punchy: "$25M+", "0 → 40", "20+", "$150M+".

**Emoji.** None. Never. No decorative unicode either, aside from the ↗ arrow on booking CTAs, the → on "more" links, and +/− on FAQ toggles.

**Vibe.** An editorial one-pager that reads like a well-set letterhead — restrained, literate, and quietly expensive.

---

## Visual foundations

**Palette.** Warm near-monochrome. One saturated brand color: **olive `#3D4D2A`** (CTAs, dark section bands, serif accents), with **olive-deep `#2A361B`** for pressed/hover. Text is **ink `#1A1A17`** softening to `#33332E` / `#5A5A52`. Surfaces are **paper `#FFFFFF`** with two neutral bands — warm **stone `#E8E6DC`** and cool **mist `#EEF0F3`**. Hairlines use **rule `#C7C2B3`**. The lone true accent is **oxblood `#6B1F1F`**, reserved for links, `::selection`, and hover-invert fills. Light mode only — the site declares `color-scheme: light`.

**Type.** Two families. **EB Garamond** (serif) for all display — hero, section headers, card titles, big metrics, quoted client lines — set at weight 500 with tight tracking (`-0.012em`) and near-1.0 line height at large sizes. **General Sans** (Fontshare grotesque) for everything functional: body copy, nav, labels, tags, buttons, form fields, at 400/500/600. There is no dedicated mono; `--font-mono` maps to General Sans. Headlines run large — hero and section H2 clamp up to 64px, the final CTA to 88px.

**Spacing & layout.** 4px base step. Sections breathe: ~96px vertical rhythm, 120px on the final CTA. Content sits in a 1080px container (1280px for the hero) with 32px gutters. Multi-column grids for situations (3-up) and deliverables (2-up). Fixed element: the sticky olive nav.

**Backgrounds.** Flat color only — no gradients, no photography as background, no textures or repeating patterns. Rhythm comes from alternating flat bands: paper → mist → paper → olive (inverted) → paper. The single image is the founder headshot, shown small, bordered, and desaturated (`grayscale(0.3)`). The one piece of "art" is a 3-bar SVG bar chart in the hero.

**Borders, cards & shadow.** Essentially **flat — no drop shadows anywhere.** Structure is drawn with 1px lines: hairline `--rule` on paper, 1px `--ink` for strong dividers, translucent white on olive. Cards are paper with a 12%-ink hairline border and a single small **4px radius** (the only rounding in the system — everything else is square). Bordered grids (deliverables) share cell rules rather than floating as separate cards.

**Corner radii.** Near-zero. Buttons, inputs, and section bands are fully square (`border-radius: 0`); only the situation cards get 4px.

**Motion.** Restrained and quick. Scroll-reveal fades (opacity + 28px rise, 0.8s ease `cubic-bezier(0.2,0.8,0.2,1)`, staggered ~140ms across siblings). Hero bars grow up from the baseline on load. Interaction transitions are 0.15s. Honors `prefers-reduced-motion`. No bounces, no spring, no parallax.

**Hover states.** The signature interaction is a **full color inversion**: solid buttons swap fill and text (ink→paper, olive→olive-deep); ghost buttons fill with their border color; links flip to an oxblood block with white text; situation cards gain an olive border and lift 2px. Hover is decisive, never a subtle tint.

**Press / focus.** Form fields have no box — a single bottom rule that turns **oxblood and thickens to 2px** on focus (text nudges up 1px to compensate). No separate pressed state beyond the hover inversion.

**Transparency & blur.** No backdrop blur. Transparency appears only as flat alpha on the olive surface (white at 22%/70%/88%/92% for rules, captions, intros, and body) and the 12%-ink card border.

**Imagery vibe.** Minimal and cool-neutral — one desaturated, bordered headshot. No warm filters, no grain, no illustration library.

---

## Iconography

Gusty Group is **near-iconless by design** — a deliberate editorial choice, not an omission. There is no icon font, no SVG icon set, and no icon library in the source. What stands in for icons:

- **Typographic marks only.** The up-right arrow `↗` (`&#8599;`) on booking CTAs, the right arrow `→` on "more" links, and `+` / `−` (`&#8722;`) as FAQ expand/collapse toggles. All are unicode glyphs set in the body font, not drawn icons.
- **Roman numerals** (i., ii., iii.) in olive serif act as the visual index for the situation cards.
- **One bespoke SVG:** the three-bar growth chart in the hero (three olive `<rect>`s on a faint baseline, animated to rise). It is decorative, `aria-hidden`, and reproduced faithfully in the UI kit.
- **No emoji, ever.**

**Guidance for extending:** stay iconless wherever possible. If a future surface genuinely needs UI glyphs (e.g. an app), introduce a **thin, single-weight line set** — [Lucide](https://lucide.dev) is the closest CDN match to the restrained aesthetic (1.5–2px strokes, square feel) — at olive or ink, never filled or multicolor. Flag any such addition here. **Substitution flag:** no icon set ships with this system today; Lucide is only a *suggested* match, not an adopted dependency.

**Logo / brand mark:** The source has **no logo file** — the wordmark is rendered type ("GUSTY / GROUP" in letter-spaced EB Garamond, stacked, white on olive). This system reproduces it as type in `NavBar` and the thumbnail. `assets/` holds the founder photo (`hero-image.png`) and the site favicons (`favicon.png`, `favicon-192.png`, `apple-touch-icon.png`) copied from the repo. **No mark was invented.**

---

## Fonts — substitution note
Both faces are the *real* brand fonts, loaded as hosted webfonts exactly as the source site loads them: **EB Garamond** via Google Fonts, **General Sans** via Fontshare (`api.fontshare.com`). No font binaries are vendored into the project. If you need offline/self-hosted copies, upload the General Sans files and I'll add local `@font-face` rules.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (import list only). Consumers link this.
- `thumbnail.html` — homepage tile (olive wordmark + swatch strip).
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible wrapper.

**`tokens/`** — `fonts.css` (webfont imports), `colors.css` (base palette + semantic aliases), `typography.css` (families, weights, type scale), `spacing.css` (spacing, radii, borders, motion).

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand groups).

**`components/`** — reusable primitives (namespace `window.GustyGroupDesignSystem_2bd7dd`):
- `core/` — **Button**, **Tag**, **Stat**, **SectionHead**
- `forms/` — **Input**, **Textarea**
- `patterns/` — **SituationCard**, **KeepItem**, **CaseStudy**, **FaqItem**
- `navigation/` — **NavBar**

**`ui_kits/marketing-site/`** — interactive recreation of the Gusty Group marketing page (`index.html`) composed from the components: `Hero.jsx`, `Sections.jsx` (Situations, WhatYouKeep, TrackRecord, Founder), `Contact.jsx` (Faq, Contact, SiteFooter).

**`assets/`** — `hero-image.png` (founder headshot), `favicon.png`, `favicon-192.png`, `apple-touch-icon.png`.

### Intentional additions
None. Every component maps to a real element on the source marketing site; no primitives were invented beyond what the site defines.
