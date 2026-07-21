# Project: gustygroup.com

Marketing site for Gusty Group LLC — a fractional ops and finance firm for healthcare and life sciences founders. Sister site to chrisgusty.com (personal consulting brand); shares look and content but written in firm voice ("Gusty Group" / "we").

## Technology Stack

- Static HTML/CSS/JS, no build step — **except** the `/cred` blog, see below
- Hosting: GitHub Pages with custom domain (gustygroup.com)
- Root site: all styles and scripts inlined in `index.html`

## Project Structure

- `/index.html` — root marketing site (nav, hero, ICP, what-you-keep, track record, founder, FAQ, contact, footer)
- `/hero-image.png` — founder headshot (used in About / Founder section)
- `/favicon.png`, `/favicon-192.png`, `/apple-touch-icon.png` — icons
- `/CNAME` — custom domain
- `/.nojekyll` — skip Jekyll processing on Pages
- `/cred/` — credentialing & licensing sub-site (see below)
- `/credentialing-licensing-site/` — the Claude design system the sub-site was built from (source of truth for tokens and components)

## The /cred sub-site

A separate marketing site for the credentialing & licensing business, served at
`gustygroup.com/cred/`. It is **deliberately isolated from the root site**: no link
in `/cred` points back to gustygroup.com, and every "Home" link resolves to `/cred/`.

Structure:

- 15 hand-authored pages (`index`, `about`, `contact`, services ×3, who-we-serve ×7)
- `styles.css` → `@import`s `tokens/*.css` — the design-system token layer. Without it the whole sub-site renders unstyled.
- `site.css` — shared page styles. **`index.html` does not load it** — it carries its own inline `<style>` copy, so shared-chrome edits must be applied to it separately.
- `graphics.css` — the `.gfx-*` editorial graphics (panels, covers, avatars, charts) that replace the design runtime's `<image-slot>` placeholders. Separate file precisely because `index.html` skips `site.css`.
- `site-icons.js` — maps card/step headings to Lucide icons at runtime.

### Blog & resources (the one build step)

Content is authored in **Pages CMS** (`app.pagescms.org`, GitHub App scoped to this repo;
config in `/.pages.yml`), which commits Markdown. A GitHub Action then regenerates static HTML.

- **Source** (edit these): `cred/blog/posts/*.md`, `cred/authors/*.md`, `cred/resources/*.md`, `cred/media/`
- **Generated** (never hand-edit — the Action overwrites): `cred/blog/*.html`, `cred/blog.html`, `cred/resources.html`, `cred/sitemap.xml`
- **Generator**: `scripts/build-blog.mjs`, templates in `/templates/`
- **CI**: `.github/workflows/build-blog.yml` — triggers only on source paths, commits only generated output, so it cannot loop

Rebuild locally with `npm run build:blog`. Articles are emitted as fully rendered HTML
(not client-side rendered) so the text is in the source for search engines.

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
- `hello@gustygroup.com` mailbox/forwarder (`/cred` currently uses the live `chris@gustygroup.com`)
- OG image (`sitescreenshot.png`) once site is live
- Decide whether to keep shared Google Calendar booking link and Formspree endpoint, or set up firm-specific ones

`/cred` specifically:
- Install the Pages CMS GitHub App on this repo to enable the blog admin
- Upload a PDF for the Revenue-at-Risk Playbook — until then its button reads "Request the playbook" and links to contact
- `/cred` shares the root site's Formspree endpoint and Google Calendar link

## Code Style

- Tab indentation in HTML
- Fonts: Fraunces (serif), Geist (sans), JetBrains Mono (mono) — all via Google Fonts
- Palette defined as CSS custom properties at the top of `<style>` in `index.html`

## Git Workflow

- Single `master` branch, push directly
- Commit messages: short imperative description on first line
