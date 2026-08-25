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
	/**
	 * Called the first time the node is revealed. Lets a component start its own
	 * animation on the same trigger without registering a second scroll
	 * listener — the sweep is already running, so this rides along with it.
	 */
	onEnter?: () => void;
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
	onEnter?: () => void;
}

const pending = new Set<PendingReveal>();
let sweepQueued = 0;
let sweepTimer = 0;
let listening = false;

function show(entry: PendingReveal) {
	entry.node.classList.add('reveal--in');
	if (entry.onEnter) {
		const fire = entry.onEnter;
		entry.onEnter = undefined; // once only, even for a repeating reveal
		fire();
	}
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
	if (sweepQueued) cancelAnimationFrame(sweepQueued);
	if (sweepTimer) clearTimeout(sweepTimer);
	sweepQueued = 0;
	sweepTimer = 0;
	const vh = window.innerHeight || document.documentElement.clientHeight || 0;

	/* Every rect is read before a single class is written. Reading and writing
	   alternately inside one loop invalidates layout on each write, so the next
	   `getBoundingClientRect` forces a fresh reflow — sixty nodes then cost
	   sixty synchronous layouts per frame, which is most of a frame budget on
	   its own and is what made a long page feel heavy under the thumb. */
	const entering: PendingReveal[] = [];
	const leaving: PendingReveal[] = [];
	for (const entry of pending) {
		const r = entry.node.getBoundingClientRect();
		// Revealed once the top edge rises into the lower tenth of the viewport,
		// or if the element has already been scrolled clean past.
		const entered = r.top < vh * 0.9 && r.bottom > 0;
		const passed = r.bottom <= 0;
		if (entered || passed) entering.push(entry);
		else if (!entry.once) leaving.push(entry);
	}
	for (const entry of leaving) entry.node.classList.remove('reveal--in');
	for (const entry of entering) show(entry);
}

function onScroll() {
	if (sweepQueued || sweepTimer) return;
	/* While the page is being painted, rAF is the throttle and it is guaranteed
	   to run — no timer needed, and arming one anyway meant every scroll burst
	   scheduled two sweeps instead of one. A hidden document is the one state
	   where rAF can be deferred indefinitely, and since every node starts at
	   opacity 0 a sweep that never runs leaves the page blank rather than merely
	   un-animated. So the timer is armed only there. */
	if (typeof document !== 'undefined' && document.hidden) {
		sweepTimer = window.setTimeout(sweep, 250);
		return;
	}
	sweepQueued = requestAnimationFrame(sweep);
}

function startListening() {
	if (listening) return;
	listening = true;
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	// Coming back to a tab that was hidden while it loaded: sweep once now that
	// frames are being served again.
	document.addEventListener('visibilitychange', onScroll);
}

function stopListening() {
	if (!listening) return;
	listening = false;
	window.removeEventListener('scroll', onScroll);
	window.removeEventListener('resize', onScroll);
	document.removeEventListener('visibilitychange', onScroll);
	if (sweepQueued) {
		cancelAnimationFrame(sweepQueued);
		sweepQueued = 0;
	}
	if (sweepTimer) {
		clearTimeout(sweepTimer);
		sweepTimer = 0;
	}
}

/**
 * Run the sweep now, synchronously.
 *
 * A page arriving through a client-side navigation mounts with every revealable
 * node at `opacity: 0` and its first sweep queued for the next frame. Inside a
 * view transition that frame can land after the incoming page has been
 * captured, so the new page cross-fades in empty and its content appears
 * afterwards. Calling this once the navigation has settled reveals whatever is
 * already in view before that capture, and the entrance still plays because the
 * class change drives a CSS transition either way.
 */
export function revealNow(): void {
	if (pending.size) sweep();
}

/**
 * Reveal-on-scroll. Adds `.reveal` immediately and `.reveal--in` once the node
 * enters the viewport. Respects prefers-reduced-motion (reveals instantly).
 */
/* The reveal used to run at most once per path per session, on the theory that
   an entrance earns its keep the first time you read a page and is a delay on
   every visit after that. In practice it meant the site stopped moving
   entirely after a few minutes of browsing: every page had been seen, so
   everything rendered flat and the whole thing read as static. The entrance is
   part of how the page reads, not a one-time introduction, so it plays every
   time now. Reduced-motion still skips it outright.
*/

export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	const opts = { threshold: 0.15, once: true, delay: 0, ...(params ?? {}) };
	const onEnter = opts.onEnter;
	node.classList.add('reveal');
	if (opts.delay) node.style.setProperty('--reveal-delay', `${opts.delay}ms`);

	// Reduced motion or no DOM: show it immediately.
	if (prefersReducedMotion() || typeof window === 'undefined') {
		node.classList.add('reveal--in');
		onEnter?.();
		return {};
	}

	const entry: PendingReveal = { node, once: opts.once, onEnter };
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
