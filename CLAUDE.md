# Project: gustygroup.com

Marketing site for Gusty Group LLC — a fractional ops and finance firm for healthcare and life sciences founders. Sister site to chrisgusty.com (personal consulting brand); shares look and content but written in firm voice ("Gusty Group" / "we").

## Technology Stack

- Single static HTML/CSS/JS file (no build step)
- Hosting: GitHub Pages with custom domain (gustygroup.com)
- All styles and scripts inlined in `index.html`

## Project Structure

- `/index.html` — full marketing site (nav, hero, ICP, what-you-keep, track record, founder, FAQ, contact, footer)
- `/hero-image.png` — founder headshot (used in About / Founder section)
- `/favicon.png`, `/favicon-192.png`, `/apple-touch-icon.png` — icons
- `/CNAME` — custom domain
- `/.nojekyll` — skip Jekyll processing on Pages

## Local Preview

```bash
cd ~/Code/gustygroup
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Push to `master`. GitHub Pages serves directly from the branch root.

## Voice & Content Conventions

- Refer to the firm as "Gusty Group" or "we" — never "I"
- The Founder section (04) is the one place Chris is named personally
- The case study (Track Record) references Chris as the founder/principal, not the firm itself acting as COO

## Outstanding Setup (TODOs)

Search `index.html` for `TODO_GUSTYGROUP_` placeholders:

- `TODO_GUSTYGROUP_CLARITY_ID` — Microsoft Clarity project id
- `TODO_GUSTYGROUP_UMAMI_ID` — Umami website id

Also pending:
- DNS for gustygroup.com → GitHub Pages
- `hello@gustygroup.com` mailbox/forwarder
- OG image (`sitescreenshot.png`) once site is live
- Decide whether to keep shared Google Calendar booking link and Formspree endpoint, or set up firm-specific ones

## Code Style

- Tab indentation in HTML
- Fonts: Fraunces (serif), Geist (sans), JetBrains Mono (mono) — all via Google Fonts
- Palette defined as CSS custom properties at the top of `<style>` in `index.html`

## Git Workflow

- Single `master` branch, push directly
- Commit messages: short imperative description on first line
