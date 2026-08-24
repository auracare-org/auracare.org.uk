/**
 * Wheel smoothing.
 *
 * This deliberately does NOT use the usual transform-wrapper approach, where
 * the page is translated inside a fixed container. That technique breaks
 * `position: sticky` (the investor map pins itself that way), and it decouples
 * the real scroll position from the visual one, which confuses anchor jumps,
 * scroll restoration and the reveal sweep.
 *
 * Instead the real scroll position is animated: wheel input accumulates into a
 * target, and a rAF loop eases the window toward it. Everything downstream
 * still sees a genuine scroll position, so sticky, anchors and reveals keep
 * working untouched.
 *
 * It stays out of the way where smoothing would hurt: touch devices already
 * have momentum from the OS, and reduced-motion users have asked for less of
 * exactly this.
 */

/** Higher settles faster. Low enough to feel eased, high enough not to float. */
const EASE = 0.155;
/** Below this many pixels from target, snap and stop the loop. */
const SETTLE = 0.4;

export function initSmoothScroll(): () => void {
	if (typeof window === 'undefined') return () => {};

	const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!fine || reduced) return () => {};

	let target = window.scrollY;
	let raf = 0;
	let animating = false;

	const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

	function step() {
		const diff = target - window.scrollY;
		if (Math.abs(diff) < SETTLE) {
			window.scrollTo(0, target);
			animating = false;
			raf = 0;
			return;
		}
		window.scrollTo(0, window.scrollY + diff * EASE);
		raf = requestAnimationFrame(step);
	}

	function onWheel(e: WheelEvent) {
		// Leave modified wheels alone: pinch-zoom and horizontal intent.
		if (e.ctrlKey || e.metaKey || e.deltaY === 0) return;
		// Never fight a scrollable panel inside the page.
		if (isInsideScrollable(e.target as Element | null, e.deltaY)) return;

		e.preventDefault();
		const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
		target = clamp(target + delta, 0, maxScroll());
		if (!animating) {
			animating = true;
			// Re-sync before easing, in case anything moved the page since.
			target = clamp(window.scrollY + delta, 0, maxScroll());
			raf = requestAnimationFrame(step);
		}
	}

	// Anything that moves the page by other means (anchor click, keyboard,
	// scrollbar drag, scroll restoration) becomes the new truth.
	function onScroll() {
		if (!animating) target = window.scrollY;
	}

	window.addEventListener('wheel', onWheel, { passive: false });
	window.addEventListener('scroll', onScroll, { passive: true });

	return () => {
		window.removeEventListener('wheel', onWheel);
		window.removeEventListener('scroll', onScroll);
		if (raf) cancelAnimationFrame(raf);
	};
}

function clamp(n: number, min: number, max: number) {
	return Math.min(max, Math.max(min, n));
}

/** True when the wheel is over a panel that can still scroll in that direction. */
function isInsideScrollable(el: Element | null, deltaY: number): boolean {
	let node: Element | null = el;
	while (node && node !== document.body && node !== document.documentElement) {
		const style = getComputedStyle(node);
		const scrolls = /(auto|scroll)/.test(style.overflowY);
		if (scrolls && node.scrollHeight > node.clientHeight) {
			const atTop = node.scrollTop <= 0;
			const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
			if (!((deltaY < 0 && atTop) || (deltaY > 0 && atBottom))) return true;
		}
		node = node.parentElement;
	}
	return false;
}
