/* Gusty Group — scroll reveals.
   Loaded from <head> (blocking, ~2KB) so .has-motion lands before first paint;
   without that the page would render visible and then flash hidden.

   Elements are tagged here rather than in the markup, so generated blog pages
   pick up the same motion without any template changes. */
(function () {
	'use strict';

	var root = document.documentElement;

	// Bail out entirely if the browser can't observe — content then just renders
	// normally, since motion.css only hides things under .has-motion.
	if (!('IntersectionObserver' in window)) return;

	root.classList.add('has-motion');

	/* Groups whose direct children reveal in sequence (--i drives the delay). */
	var STAGGER = [
		'.hero .hero-grid', '.phero .wrap', '.blog-hero .wrap', '.art-head .inner',
		'.problem .grid', '.sec-head', '.deliver', '.steps', '.cards3', '.chips',
		'.serve-grid', '.postgrid', '.media-split', '.featured', '.contact-grid',
		'.cside', '.art-side', '.final .wrap', '.nwrap',
	];

	/* Elements that reveal on their own. */
	var SINGLE = [
		'.art-cover', '.takeaway', '.inline-cta', '.cta-bar', '.authorcard',
		'.share', '.prose > h2', '.prose > figure', '.media-band',
	];

	function markReveal(el, i) {
		// Skip anything already inside a revealing element — nested fades read as a stutter.
		if (el.closest('.reveal') || el.classList.contains('reveal')) return;
		el.classList.add('reveal');
		if (i) el.style.setProperty('--i', i);
	}

	function collect() {
		STAGGER.forEach(function (sel) {
			document.querySelectorAll(sel).forEach(function (group) {
				var kids = Array.prototype.filter.call(group.children, function (c) {
					return c.offsetParent !== null || c.getClientRects().length;
				});
				kids.forEach(function (kid, i) { markReveal(kid, Math.min(i, 4)); });
			});
		});

		SINGLE.forEach(function (sel) {
			document.querySelectorAll(sel).forEach(function (el) { markReveal(el, 0); });
		});

		// Graphics animate their own bars/columns; separate class so this can sit
		// inside a .reveal container without the two fighting.
		document.querySelectorAll('.gfx-panel, .gfx-chart').forEach(function (gfx) {
			gfx.classList.add('gfx-anim');
			gfx.querySelectorAll('.gfx-row').forEach(function (r, i) { r.style.setProperty('--i', i); });
			gfx.querySelectorAll('.gfx-bars span').forEach(function (b, i) { b.style.setProperty('--i', i); });
		});
	}

	function observe() {
		var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal, .gfx-anim'));
		var queued = false;

		function show(el) {
			el.classList.add('in');
			io.unobserve(el);
			var i = pending.indexOf(el);
			if (i > -1) pending.splice(i, 1);
		}

		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) { if (e.isIntersecting) show(e.target); });
		}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

		pending.slice().forEach(function (el) { io.observe(el); });

		/* Catch-up sweep. IntersectionObserver only reports a *change* in
		   intersection, so a fast scroll or an in-page anchor jump can carry an
		   element from below the fold to above it without ever being seen as
		   intersecting — stranding it at opacity 0. This reveals anything the
		   observer may have skipped, and detaches once everything is shown. */
		function sweep(onlyPassed) {
			queued = false;
			var limit = onlyPassed ? 0 : window.innerHeight - 60;
			pending.slice().forEach(function (el) {
				if (el.getBoundingClientRect().top < limit) show(el);
			});
			if (!pending.length) {
				window.removeEventListener('scroll', onScroll);
				window.removeEventListener('resize', onScroll);
			}
		}

		function onScroll() {
			if (queued) return;
			queued = true;
			requestAnimationFrame(function () { sweep(false); });
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		// If the browser restored a mid-page scroll position, reveal what is
		// already above the viewport without animating it.
		requestAnimationFrame(function () { sweep(true); });

		/* Failsafe. If the observer never reported anything even though content
		   is sitting on screen, it is not working (some embedded webviews and
		   automation contexts stub it out). Drop motion entirely rather than
		   risk leaving copy invisible — no animation is a far better failure
		   than an unreadable page. */
		setTimeout(function () {
			var onscreen = pending.filter(function (el) {
				return el.getBoundingClientRect().top < window.innerHeight;
			});
			if (!onscreen.length) return;
			root.classList.remove('has-motion');
			pending.length = 0;
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		}, 2500);
	}

	function init() {
		collect();
		observe();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
