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

		function show(el) {
			el.classList.add('in');
			var i = pending.indexOf(el);
			if (i > -1) pending.splice(i, 1);
		}

		/* CRITICAL: reveal everything already in (or above) the viewport RIGHT NOW,
		   synchronously, before any observer. This is the guarantee that above-the-
		   fold content is never left hidden — it does not depend on IntersectionObserver
		   firing, on timers, or on rAF, any of which can be stubbed, throttled, or slow.
		   Only genuinely below-the-fold elements are left to animate in on scroll. */
		function revealInView(margin) {
			pending.slice().forEach(function (el) {
				if (el.getBoundingClientRect().top < window.innerHeight - (margin || 0)) show(el);
			});
		}
		revealInView(0);

		// Below-fold elements animate in as they scroll up.
		var ioFired = false;
		if ('IntersectionObserver' in window) {
			var io = new IntersectionObserver(function (entries) {
				ioFired = true;
				entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
			}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
			pending.slice().forEach(function (el) { io.observe(el); });
		}

		function onScroll() {
			revealInView(60);
			if (!pending.length) {
				window.removeEventListener('scroll', onScroll);
				window.removeEventListener('resize', onScroll);
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		/* Failsafe. If the observer never fired at all shortly after load, it is
		   stubbed or broken (some webviews and automation contexts do this). Reveal
		   everything and drop motion — an unanimated page always beats one with
		   invisible sections that scroll can never bring back. */
		setTimeout(function () {
			var stuckOnScreen = pending.some(function (el) { return el.getBoundingClientRect().top < window.innerHeight; });
			if (!ioFired || stuckOnScreen) {
				pending.slice().forEach(show);
				root.classList.remove('has-motion');
			}
		}, 1200);
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
