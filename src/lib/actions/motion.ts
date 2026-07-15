import type { Action } from 'svelte/action';

/** True when the visitor has asked for reduced motion (or we're on the server). */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined' || !window.matchMedia) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface RevealParams {
	/** 0–1 intersection ratio before revealing. */
	threshold?: number;
	/** Reveal once and stop observing (default true). */
	once?: boolean;
	/** Stagger delay in ms. */
	delay?: number;
}

/**
 * Reveal-on-scroll. Adds `.reveal` immediately and `.reveal--in` once the node
 * enters the viewport. Respects prefers-reduced-motion (reveals instantly).
 */
export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	const opts = { threshold: 0.15, once: true, delay: 0, ...(params ?? {}) };
	node.classList.add('reveal');
	if (opts.delay) node.style.setProperty('--reveal-delay', `${opts.delay}ms`);

	if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
		node.classList.add('reveal--in');
		return {};
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('reveal--in');
					if (opts.once) io.unobserve(node);
				} else if (!opts.once) {
					node.classList.remove('reveal--in');
				}
			}
		},
		{ threshold: opts.threshold }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
};

interface ProgressParams {
	/** Called with a 0–1 value as the node travels through the viewport. */
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
