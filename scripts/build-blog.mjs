/**
 * Gusty Group /cred blog + resources generator.
 *
 * Reads CMS-authored Markdown from cred/{blog/posts,authors,resources} and writes
 * static HTML into cred/. Everything it emits is fully rendered — no client-side
 * fetching — so article text is in the HTML source for search engines.
 *
 *   node scripts/build-blog.mjs
 *
 * Outputs (all generated; do not hand-edit):
 *   cred/blog/<slug>.html   cred/blog.html   cred/resources.html   cred/sitemap.xml
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import matter from 'gray-matter';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CRED = join(ROOT, 'cred');
const TPL = join(ROOT, 'templates');
const SITE = 'https://gustygroup.com/cred';

/* Category → Lucide icon. Mirrors the map in cred/site-icons.js. */
const CATEGORY_ICON = {
	'License management': 'scroll-text',
	'Credentialing': 'badge-check',
	'Payer enrollment': 'file-check-2',
	'Revenue': 'trending-up',
	'Operations': 'clipboard-list',
};
const CATEGORIES = Object.keys(CATEGORY_ICON);

const esc = (s = '') => String(s)
	.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;');

/* YAML parses an unquoted `date: 2026-07-14` into a Date, not a string — normalise both. */
const isoDate = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d).slice(0, 10));

const fmtDate = (d) => new Date(`${isoDate(d)}T12:00:00Z`).toLocaleDateString('en-US', {
	month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});

/* Pages CMS reference fields may store "chris-gusty", "chris-gusty.md", or a
   full path depending on the token used — normalise to the bare slug. */
const refSlug = (v) => (v == null ? '' : String(v).split('/').pop().replace(/\.md$/i, ''));

const initials = (name = '') => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

/** Read every .md in a directory into {slug, ...frontmatter, body}. */
function readCollection(dir) {
	const path = join(CRED, dir);
	if (!existsSync(path)) return [];
	return readdirSync(path)
		.filter((f) => f.endsWith('.md'))
		.map((f) => {
			const { data, content } = matter(readFileSync(join(path, f), 'utf8'));
			return { slug: basename(f, '.md'), ...data, body: content };
		});
}

/* ── graphics ─────────────────────────────────────────────────────────
   When a post or resource has no uploaded cover, fall back to the same
   .gfx-cover treatment used across the static pages. */

const coverFor = (item, { alt = false, variant = '', prefix = '' } = {}) => {
	if (item.cover) return `<img src="${esc(prefix + item.cover)}" alt="${esc(item.title)}" style="width:100%;height:100%;object-fit:cover">`;
	const icon = CATEGORY_ICON[item.category] || 'file-text';
	const cls = variant || (alt ? ' alt' : '');
	return `<div class="gfx gfx-cover${cls}">
        <div class="gfx-kicker">${esc(item.kicker || item.category || 'Resource')}</div>
        <div>
          <div class="gfx-ico"><i data-lucide="${esc(item.icon || icon)}"></i></div>
          <div class="gfx-t">${esc(item.title)}</div>
        </div>
      </div>`;
};

const avatarFor = (author, prefix = '') => author?.photo
	? `<img src="${esc(prefix + author.photo)}" alt="${esc(author.name)}" style="width:100%;height:100%;object-fit:cover">`
	: `<div class="gfx-avatar">${esc(initials(author?.name || 'Gusty Group'))}</div>`;

/* ── markdown ───────────────────────────────────────────────────────── */

marked.setOptions({ mangle: false, headerIds: false });

function renderBody(md, prefix) {
	let html = marked.parse(md);
	// Media paths are authored site-absolute (/cred/media/…); rewrite for depth.
	if (prefix) html = html.replace(/(src|href)="\/cred\//g, `$1="${prefix}`);
	// Wrap standalone images in the design system's figure/mediaframe treatment.
	html = html.replace(
		/<p>\s*<img src="([^"]+)" alt="([^"]*)"[^>]*>\s*<\/p>/g,
		(_m, src, alt) => `<figure>\n      <div class="mediaframe"><img src="${src}" alt="${alt}" style="width:100%;height:100%;object-fit:cover"></div>\n      ${alt ? `<figcaption>${alt}</figcaption>` : ''}\n    </figure>`,
	);
	return html.trim().split('\n').map((l) => `    ${l}`).join('\n');
}

/* ── build ──────────────────────────────────────────────────────────── */

const authors = Object.fromEntries(readCollection('authors').map((a) => [a.slug, a]));
const resources = readCollection('resources').filter((r) => !r.draft);
const resourceBySlug = Object.fromEntries(resources.map((r) => [r.slug, r]));

const posts = readCollection('blog/posts')
	.filter((p) => !p.draft)
	.sort((a, b) => isoDate(b.date).localeCompare(isoDate(a.date)));

if (!posts.length) console.warn('! no published posts found — blog.html will render its empty state');

const tpl = {
	article: readFileSync(join(TPL, 'article.html'), 'utf8'),
	list: readFileSync(join(TPL, 'blog-list.html'), 'utf8'),
	resources: readFileSync(join(TPL, 'resources.html'), 'utf8'),
};

const fill = (t, map) => Object.entries(map)
	.reduce((acc, [k, v]) => acc.split(`{{${k}}}`).join(v ?? ''), t);

/* ── article pages ── */

const BLOG_DIR = join(CRED, 'blog');
mkdirSync(BLOG_DIR, { recursive: true });
// Clear stale generated pages so deleted/renamed posts do not linger.
for (const f of readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html'))) rmSync(join(BLOG_DIR, f));

for (const post of posts) {
	const author = authors[refSlug(post.author)];
	if (!author) console.warn(`! post "${post.slug}" references unknown author "${post.author}"`);

	const others = posts.filter((p) => p.slug !== post.slug);
	const related = others
		.filter((p) => p.category === post.category)
		.concat(others.filter((p) => p.category !== post.category))
		.slice(0, 3);

	const lead = resourceBySlug[refSlug(post.leadMagnet)];
	const url = `${SITE}/blog/${post.slug}.html`;

	writeFileSync(join(BLOG_DIR, `${post.slug}.html`), fill(tpl.article, {
		SITE,
		SLUG: post.slug,
		TITLE: esc(post.title),
		TITLE_ENC: encodeURIComponent(post.title),
		URL_ENC: encodeURIComponent(url),
		EXCERPT: esc(post.excerpt),
		CATEGORY: esc(post.category),
		DATE: fmtDate(post.date),
		DATE_ISO: isoDate(post.date),
		READ_TIME: esc(post.readTime || 5),
		AUTHOR_NAME: esc(author?.name || 'Gusty Group'),
		AUTHOR_ROLE: esc(author?.role || ''),
		AUTHOR_BIO: esc(author?.bio || ''),
		AUTHOR_AVATAR: avatarFor(author, '../'),
		COVER: coverFor(post, { prefix: '../' }),
		BODY: renderBody(post.body, '../'),
		TAKEAWAY: post.takeaway
			? `    <div class="takeaway">\n      <div class="t">Key takeaway</div>\n      <p>${esc(post.takeaway)}</p>\n    </div>`
			: '',
		LEAD_MAGNET: lead ? `    <div class="side-box lead">
      <div class="sb-k"><i data-lucide="download"></i> Free resource</div>
      <div class="mediaframe">${coverFor(lead, { variant: ' paper', prefix: '../' })}</div>
      <div class="sb-t">${esc(lead.title)}</div>
      <p>${esc(lead.description)}</p>
      <a href="${lead.file ? esc('../' + lead.file) : '../resources.html'}"${lead.file ? ' download' : ''} class="btn btn-olive">Get the ${esc(lead.noun || 'resource')} <span>&#8599;</span></a>
    </div>` : '',
		MORE_POSTS: others.slice(0, 4).map((p, i) =>
			`        <a href="${p.slug}.html"><span class="rank">${String(i + 1).padStart(2, '0')}</span> ${esc(p.title)}</a>`
		).join('\n') || '        <p style="font-size:14px;color:var(--ink-dim)">More articles coming soon.</p>',
		RELATED: related.length ? `<section class="sec alt"><div class="wrap">
  <div class="sec-head" style="margin-bottom:8px"><h2 style="font-size:clamp(26px,3vw,34px)">Keep reading.</h2></div>
  <div class="cards3">
${related.map((p) => `    <div class="rel"><h3>${esc(p.category)}</h3><p>${esc(p.excerpt)}</p><a class="more" href="${p.slug}.html">Read article &#8594;</a></div>`).join('\n')}
  </div>
</div></section>` : '',
	}));
}

/* ── blog.html ── */

const [featured, ...rest] = posts.some((p) => p.featured)
	? [posts.find((p) => p.featured), ...posts.filter((p) => !p.featured)]
	: posts;

const postCard = (p) => `    <article class="post" data-cat="${esc(p.category)}">
      <div class="mediaframe">${coverFor(p)}</div>
      <span class="tag">${esc(p.category)}</span>
      <h3><a href="blog/${p.slug}.html">${esc(p.title)}</a></h3>
      <p>${esc(p.excerpt)}</p>
      <div class="pmeta"><span>${esc(authors[refSlug(p.author)]?.name || 'Gusty Group')}</span><span class="dot"></span><span>${fmtDate(p.date)}</span><span class="dot"></span><span>${esc(p.readTime || 5)} min</span></div>
    </article>`;

writeFileSync(join(CRED, 'blog.html'), fill(tpl.list, {
	SITE,
	CATEGORIES: ['All', ...CATEGORIES]
		.map((c, i) => `    <span class="cat${i === 0 ? ' on' : ''}" data-cat="${c === 'All' ? '' : esc(c)}">${esc(c)}</span>`)
		.join('\n'),
	FEATURED: featured ? `<section class="sec" style="padding-top:0;border-bottom:1px solid var(--rule)"><div class="wrap">
  <article class="featured">
    <div class="mediaframe">${coverFor(featured)}</div>
    <div class="txt">
      <span class="tag">${esc(featured.category)}</span>
      <h2><a href="blog/${featured.slug}.html">${esc(featured.title)}</a></h2>
      <p>${esc(featured.excerpt)}</p>
      <div class="pmeta"><span>${esc(authors[refSlug(featured.author)]?.name || 'Gusty Group')}</span><span class="dot"></span><span>${fmtDate(featured.date)}</span><span class="dot"></span><span>${esc(featured.readTime || 5)} min read</span></div>
      <div style="margin-top:22px"><a href="blog/${featured.slug}.html" class="btn btn-olive">Read the article <span>&#8599;</span></a></div>
    </div>
  </article>
</div></section>` : '',
	POSTS: rest.length
		? rest.map(postCard).join('\n')
		: '    <p style="color:var(--ink-dim)">More articles are on the way.</p>',
}));

/* ── resources.html ── */

writeFileSync(join(CRED, 'resources.html'), fill(tpl.resources, {
	SITE,
	RESOURCES: resources.length ? resources.map((r) => {
		// Until a file is uploaded via the CMS, point at contact rather than a dead download.
		const href = esc(r.file || 'contact.html');
		const attr = r.file ? ' download' : '';
		const label = r.file ? 'Download' : `Request the ${esc(r.noun || 'resource')}`;
		return `    <article class="post">
      <div class="mediaframe">${coverFor(r, { variant: ' paper' })}</div>
      <span class="tag">${esc(r.kicker || 'Free resource')}</span>
      <h3><a href="${href}"${attr}>${esc(r.title)}</a></h3>
      <p>${esc(r.description)}</p>
      <div style="margin-top:auto"><a href="${href}"${attr} class="btn btn-olive">${label} <span>&#8599;</span></a></div>
    </article>`;
	}).join('\n')
		: '    <p style="color:var(--ink-dim)">Resources are on the way.</p>',
}));

/* ── sitemap ── */

const staticPages = readdirSync(CRED)
	.filter((f) => f.endsWith('.html'))
	.map((f) => (f === 'index.html' ? '' : f));

writeFileSync(join(CRED, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages.map((p) => `${SITE}/${p}`), ...posts.map((p) => `${SITE}/blog/${p.slug}.html`)]
		.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`);

console.log(`built ${posts.length} post(s), ${resources.length} resource(s), blog.html, resources.html, sitemap.xml`);
