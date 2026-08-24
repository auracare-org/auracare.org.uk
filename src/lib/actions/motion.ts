import type { Action } from 'svelte/action';

/** True when the visitor has asked for reduced motion (or we're on the server). */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined' || !window.matchMedia) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface RevealParams {
	/** 0 to 1 intersection ratio before revealing. */
	threshold?: number;
	/** Reveal once and stop observing (default true). */
	once?: boolean;
	/** Stagger delay in ms. */
	delay?: number;
}

/**
 * Reveal-on-scroll registry.
 *
 * This deliberately does not use IntersectionObserver. An observer only queues
 * a callback when the intersection ratio *crosses* a threshold, so a fast
 * scroll, an anchor jump or a restored scroll position can take an element
 * from "below the fold" (ratio 0) to "above the fold" (ratio 0) without ever
 * crossing one. The element then stays at `opacity: 0` permanently, leaving a
 * blank band on the page.
 *
 * A single rAF-throttled sweep over the nodes still waiting is both simpler and
 * correct. It binds on the first registration and unbinds the moment the last
 * node is revealed, so a fully-revealed page carries no scroll cost at all.
 */
interface PendingReveal {
	node: HTMLElement;
	once: boolean;
}

const pending = new Set<PendingReveal>();
let sweepQueued = 0;
let listening = false;

function show(entry: PendingReveal) {
	entry.node.classList.add('reveal--in');
	// Release the GPU layer once the dissolve has actually finished.
	entry.node.addEventListener('transitionend', () => entry.node.classList.add('reveal--done'), {
		once: true
	});
	if (entry.once) {
		pending.delete(entry);
		if (pending.size === 0) stopListening();
	}
}

function sweep() {
	sweepQueued = 0;
	const vh = window.innerHeight || document.documentElement.clientHeight || 0;
	for (const entry of [...pending]) {
		const r = entry.node.getBoundingClientRect();
		// Revealed once the top edge rises into the lower tenth of the viewport,
		// or if the element has already been scrolled clean past.
		const entered = r.top < vh * 0.9 && r.bottom > 0;
		const passed = r.bottom <= 0;
		if (entered || passed) show(entry);
		else if (!entry.once) entry.node.classList.remove('reveal--in');
	}
}

function onScroll() {
	if (!sweepQueued) sweepQueued = requestAnimationFrame(sweep);
}

function startListening() {
	if (listening) return;
	listening = true;
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
}

function stopListening() {
	if (!listening) return;
	listening = false;
	window.removeEventListener('scroll', onScroll);
	window.removeEventListener('resize', onScroll);
	if (sweepQueued) {
		cancelAnimationFrame(sweepQueued);
		sweepQueued = 0;
	}
}

/**
 * Reveal-on-scroll. Adds `.reveal` immediately and `.reveal--in` once the node
 * enters the viewport. Respects prefers-reduced-motion (reveals instantly).
 */
/**
 * Pages already seen this session, by pathname.
 *
 * The reveal is an introduction, not decoration: it earns its keep the first
 * time someone reads a page and becomes a delay on every visit after that.
 * Coming back to a page you have already scrolled should feel instant, so each
 * path animates once per session and renders immediately from then on.
 */
const SEEN_KEY = 'auracare:seen-paths';

function seenPaths(): Set<string> {
	if (typeof sessionStorage === 'undefined') return new Set();
	try {
		return new Set(JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? '[]') as string[]);
	} catch {
		return new Set();
	}
}

/* The decision is made once per navigation, not once per element. Every reveal
   on a page must share one answer, otherwise the first element to mount would
   mark the path seen and each element after it would skip its own entrance. */
let decidedPath: string | null = null;
let animateCurrentPath = true;

function shouldAnimateHere(): boolean {
	if (typeof window === 'undefined') return false;
	const path = window.location.pathname;
	if (path === decidedPath) return animateCurrentPath;

	decidedPath = path;
	animateCurrentPath = !seenPaths().has(path);

	if (typeof sessionStorage !== 'undefined') {
		try {
			const paths = seenPaths();
			paths.add(path);
			sessionStorage.setItem(SEEN_KEY, JSON.stringify([...paths]));
		} catch {
			/* Private mode or a full quota: fall back to animating every time. */
		}
	}
	return animateCurrentPath;
}

export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	const opts = { threshold: 0.15, once: true, delay: 0, ...(params ?? {}) };
	node.classList.add('reveal');
	if (opts.delay) node.style.setProperty('--reveal-delay', `${opts.delay}ms`);

	// Reduced motion, no DOM, or a page this visitor has already read: show it
	// immediately rather than replaying the introduction.
	if (prefersReducedMotion() || typeof window === 'undefined' || !shouldAnimateHere()) {
		node.classList.add('reveal--in');
		return {};
	}

	const entry: PendingReveal = { node, once: opts.once };
	pending.add(entry);
	startListening();
	// Evaluate straight away so anything already in view on load reveals without
	// waiting for the visitor to move.
	onScroll();

	return {
		destroy() {
			pending.delete(entry);
			if (pending.size === 0) stopListening();
		}
	};
};

interface ProgressParams {
	/** Called with a 0 to 1 value as the node travels through the viewport. */
	onProgress: (p: number) => void;
}

/**
 * Reports the node's progress through the viewport: 0 when its top reaches the
 * bottom of the screen, 1 when its bottom passes the top. rAF-throttled and
 * passive. Use with a tall/sticky element to drive pinned or scrubbed effects.
 */
export const scrollProgress: Action<HTMLElement, ProgressParams> = (node, params) => {
	let onProgress = params.onProgress;
	let raf = 0;

	const compute = () => {
		raf = 0;
		const rect = node.getBoundingClientRect();
		const vh = window.innerHeight || document.documentElement.clientHeight;
		const total = rect.height + vh;
		const scrolled = vh - rect.top;
		onProgress(Math.min(1, Math.max(0, scrolled / total)));
	};

	const onScroll = () => {
		if (!raf) raf = requestAnimationFrame(compute);
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	compute();

	return {
		update(p: ProgressParams) {
			onProgress = p.onProgress;
		},
		destroy() {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (raf) cancelAnimationFrame(raf);
		}
	};
};

interface CountParams {
	/** Target numeric value to count up to. */
	value: number;
	/** Duration in ms (default 1400). */
	duration?: number;
	/** Formatter for the rendered text. */
	format?: (n: number) => string;
}

/** Counts a number up from 0 to `value` the first time the node is seen. */
export const countUp: Action<HTMLElement, CountParams> = (node, params) => {
	const format = params.format ?? ((n: number) => Math.round(n).toLocaleString());
	const duration = params.duration ?? 1400;

	const run = () => {
		if (prefersReducedMotion()) {
			node.textContent = format(params.value);
			return;
		}
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			node.textContent = format(params.value * eased);
			if (t < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};

	if (typeof IntersectionObserver === 'undefined') {
		run();
		return {};
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					run();
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.5 }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
};
