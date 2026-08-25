<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollProgress, prefersReducedMotion } from '$lib/actions/motion';
	import { VIEWBOX, MAP_ASPECT, countryPaths, arcPath } from '$lib/map/geo';
	import { MARKET_WAVES, MARKET_POINTS, MARKET_ARCS, type MarketTone } from '$lib/data/company';

	const toneColor: Record<MarketTone, string> = {
		launch: '#6180ff',
		clinical: '#387ff5',
		crossover: '#8b7cff',
		sea: '#4f8dff',
		expansion: '#f0b429',
		deferred: '#9ca3af'
	};

	const ATLAS_ALIAS: Record<string, string> = {
		'United States': 'United States of America'
	};

	interface MarketMeta {
		tone: MarketTone;
		wave: number;
		display: string;
		label: string;
	}

	const marketByCountry = new Map<string, MarketMeta>();
	for (const p of MARKET_POINTS) {
		const atlas = ATLAS_ALIAS[p.name] ?? p.name;
		const display = p.name;
		const existing = marketByCountry.get(atlas);
		if (!existing || p.wave < existing.wave) {
			marketByCountry.set(atlas, { tone: p.tone, wave: p.wave, display, label: p.label });
		}
	}

	const countries = countryPaths.map((c) => ({ ...c, market: marketByCountry.get(c.name) }));

	const maxWave = MARKET_WAVES.length - 1;
	const deferredWave = MARKET_WAVES.find((w) => w.tone === 'deferred')?.order ?? maxWave;
	let activeWave = $state(0);
	let pinned = $state(false);

	const arcs = MARKET_ARCS.map((a) => ({ ...a, d: arcPath(a.from, a.to) })).filter((a) => a.d);
	const currentWave = $derived(MARKET_WAVES[Math.min(activeWave, maxWave)]);

	/* Carousel state, for the narrow layout that cannot pin.
	 *
	 * On a phone the section never pins, so the scroll can never drive the wave
	 * sequence: it played itself once when the map came into view and then sat
	 * on the last wave with no way back. It is a carousel there instead —
	 * autoplaying, swipeable, and pausable — which is a control a thumb
	 * understands, rather than a scroll effect that silently does not apply. */
	let paused = $state(false);
	let autoTimer: ReturnType<typeof setInterval> | undefined;
	const AUTO_MS = 2600;

	function stopAuto() {
		if (autoTimer !== undefined) {
			clearInterval(autoTimer);
			autoTimer = undefined;
		}
	}
	function startAuto() {
		if (pinned || paused || autoTimer !== undefined || prefersReducedMotion()) return;
		autoTimer = setInterval(() => {
			activeWave = activeWave >= maxWave ? 0 : activeWave + 1;
		}, AUTO_MS);
	}
	function step(delta: number) {
		const n = maxWave + 1;
		activeWave = (((activeWave + delta) % n) + n) % n;
	}
	/* Any deliberate move takes the carousel off autoplay for good. There is no
	   control to resume it, and there should not be: once someone is steering,
	   having it start moving again on its own is the thing that makes a carousel
	   irritating. */
	function takeOver(fn: () => void) {
		paused = true;
		stopAuto();
		fn();
	}
	let touchX = 0;
	let touchY = 0;
	function onTouchStart(e: TouchEvent) {
		touchX = e.touches[0].clientX;
		touchY = e.touches[0].clientY;
	}
	function onTouchEnd(e: TouchEvent) {
		const dx = e.changedTouches[0].clientX - touchX;
		const dy = e.changedTouches[0].clientY - touchY;
		// Horizontal intent only: a swipe that is mostly vertical is the page
		// being scrolled past the map, not a request to change wave.
		if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
		takeOver(() => step(dx < 0 ? 1 : -1));
	}

	let hovered = $state<{ name: string; label?: string } | null>(null);
	let tipX = $state(0);
	let tipY = $state(0);

	function onMove(e: MouseEvent) {
		const t = e.target as Element | null;
		const name = t && 'dataset' in t ? (t as HTMLElement).dataset.name : undefined;
		if (name) {
			const label = (t as HTMLElement).dataset.label || undefined;
			hovered = { name, label };
			tipX = e.clientX;
			tipY = e.clientY;
		} else {
			hovered = null;
		}
	}
	function onLeave() {
		hovered = null;
	}

	function onProgress(p: number) {
		if (!pinned) return;
		// The section pins (map fully centered / "reached") around p≈0.22 and unpins
		// around p≈0.77. Start the wave sequence only once the map is reached, so you
		// land on Wave 1 and have to scroll again for Wave 2, instead of the early
		// waves being spent while the map is still sliding up into view.
		const t = Math.min(1, Math.max(0, (p - 0.22) / 0.52));
		activeWave = Math.round(t * maxWave);
	}

	let stageEl = $state<HTMLElement | null>(null);

	onMount(() => {
		// Only pin when the viewport is both wide and tall enough to show the
		// complete section beneath the fixed site header.
		const mq = window.matchMedia('(min-width: 780px) and (min-height: 800px)');
		let timer: ReturnType<typeof setInterval> | undefined;
		let io: IntersectionObserver | undefined;

		const clearTimer = () => {
			if (timer !== undefined) {
				clearInterval(timer);
				timer = undefined;
			}
			stopAuto();
		};
		const teardownIO = () => {
			io?.disconnect();
			io = undefined;
		};

		const apply = () => {
			clearTimer();
			teardownIO();
			if (prefersReducedMotion()) {
				pinned = false;
				activeWave = maxWave;
				return;
			}
			pinned = mq.matches;
			if (pinned) return; // scroll-driven via scrollProgress
			if (typeof IntersectionObserver === 'undefined' || !stageEl) {
				activeWave = maxWave;
				return;
			}
			activeWave = 0;
			/* The carousel runs only while it is on screen: it advances when the
			   map comes into view and stops again when it leaves, so it is not
			   ticking away unseen at the other end of the page. */
			io = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						if (e.isIntersecting) startAuto();
						else stopAuto();
					}
				},
				{ threshold: 0.4 }
			);
			io.observe(stageEl);
		};

		apply();
		mq.addEventListener('change', apply);
		return () => {
			mq.removeEventListener('change', apply);
			clearTimer();
			teardownIO();
		};
	});

	const pointsByWave = MARKET_WAVES.map((w) => ({
		wave: w,
		markets: MARKET_POINTS.filter((p) => p.wave === w.order).map((p) => p.name)
	})).filter((g) => g.markets.length > 0);
</script>

<section class="map-section aura-space" aria-labelledby="map-heading">
	<div class="map-scroller" class:pinned use:scrollProgress={{ onProgress }}>
		<div class="map-sticky">
			<div class="container-wide map-layout">
				<!-- Header above -->
				<div class="map-head">
					<span class="eyebrow">Global rollout</span>
					<h2 id="map-heading">Approval portability, not market size, decides where we go next.</h2>
					<p class="map-sub">
						One clinical deployment can feed several regulatory dossiers at once, so we sequence by
						how far an approval travels, not by how big a market looks.
					</p>
				</div>

				<!-- Map in the middle -->
				<div
					class="map-stage"
					bind:this={stageEl}
					style="--map-ar:{MAP_ASPECT}"
					ontouchstart={onTouchStart}
					ontouchend={onTouchEnd}
				>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<svg
						class="map-svg"
						viewBox={VIEWBOX}
						preserveAspectRatio="xMidYMid meet"
						role="img"
						aria-labelledby="map-heading"
						onmousemove={onMove}
						onmouseleave={onLeave}
					>
						<g class="map-countries">
							{#each countries as c (c.id)}
								{@const lit = !!c.market && activeWave >= c.market.wave}
								{@const deferred = !c.market && activeWave >= deferredWave}
								<path
									d={c.d}
									class:is-market={!!c.market}
									class:lit
									class:deferred
									data-name={c.market ? c.market.display : c.name}
									data-label={c.market
										? c.market.label
										: deferred
											? 'Rest of world, more to come'
											: null}
									style={c.market
										? `--tone:${toneColor[c.market.tone]}`
										: `--tone:${toneColor.deferred}`}
								/>
							{/each}
						</g>

						{#each arcs as a}
							<path
								class="map-arc"
								class:on={activeWave >= a.wave}
								d={a.d}
								style="stroke:{toneColor.clinical}"
							/>
						{/each}
					</svg>

					{#if hovered}
						<div class="map-tip" style="left:{tipX}px; top:{tipY}px">
							<strong>{hovered.name}</strong>
							{#if hovered.label}<span>{hovered.label}</span>{/if}
						</div>
					{/if}
				</div>

				<!-- Wave info + legend below -->
				<div class="map-foot">
					<div class="wave-info" aria-live="polite">
						{#key currentWave.order}
							<div class="wave-slide">
								<span class="cap-badge" style="--c:{toneColor[currentWave.tone]}"
									>Wave {currentWave.order + 1}</span
								>
								<strong>{currentWave.title}</strong>
								<span class="wave-caption">{currentWave.caption}</span>
							</div>
						{/key}
					</div>
					<!-- Tappable on the carousel, so the legend doubles as the way to
					     jump straight to a wave. -->
					<ol class="map-legend">
						{#each MARKET_WAVES as w}
							<li class:active={activeWave >= w.order}>
								<button type="button" onclick={() => takeOver(() => (activeWave = w.order))}>
									<span class="dot" style="background:{toneColor[w.tone]}"></span>{w.title}
								</button>
							</li>
						{/each}
					</ol>

					{#if !pinned}
						<div class="map-controls">
							<button
								type="button"
								class="map-ctl"
								aria-label="Previous wave"
								onclick={() => takeOver(() => step(-1))}
							>
								<span aria-hidden="true">&larr;</span>
							</button>
							<button
								type="button"
								class="map-ctl"
								aria-label="Next wave"
								onclick={() => takeOver(() => step(1))}
							>
								<span aria-hidden="true">&rarr;</span>
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="sr-only">
		<h3>Market rollout by wave</h3>
		<ul>
			{#each pointsByWave as g}
				<li>{g.wave.title}: {g.markets.join(', ')}. {g.wave.caption}</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.map-section {
		position: relative;
	}
	.map-scroller.pinned {
		height: 340vh;
	}
	.map-sticky {
		padding-block: clamp(2.5rem, 5vw, 4rem);
	}
	.pinned .map-sticky {
		position: sticky;
		top: var(--header-h, 92px);
		height: calc(100vh - var(--header-h, 92px));
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-block: 1rem;
	}

	.map-layout {
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2vw, 1.5rem);
		/* Explicit, because .container-wide centres itself with auto inline
		   margins and this sits inside a flex column once the section pins.
		   Auto margins on the cross axis cancel the stretch, so the container
		   collapsed to fit-content — the whole section rendered ~680px wide
		   inside a 1265px band and read as sitting off to one side. */
		width: 100%;
	}

	/* Header */
	.map-head {
		flex: none;
		text-align: center;
		max-width: 38rem;
		margin: 0 auto;
	}
	.map-head h2 {
		font-size: clamp(1.5rem, 2.8vw, 2.2rem);
		line-height: 1.15;
		margin-top: 0.5rem;
	}
	.map-sub {
		margin-top: 0.6rem;
		font-size: 0.92rem;
	}

	/* Map */
	.map-stage {
		/* The map's drawn height. Both the frame's width cap and the svg's own
		   height are derived from it, so the two can't drift apart. */
		--map-h: 42vh;
		/* Never let the caption changing lines squeeze the map (flex-shrink). */
		flex: none;
		position: relative;
		width: 100%;
		/* The frame is cut to the map's own 2:1 proportion rather than to the
		   full container width. It used to stretch the whole 1200px column while
		   preserveAspectRatio letterboxed a 756px map inside it, leaving ~185px
		   of dead panel on each side: correctly centred, and reading as
		   anything but. Capping the width at twice the map's height means the
		   map fills its frame edge to edge at every size. */
		max-width: min(100%, calc(var(--map-h) * var(--map-ar) + 1.5rem));
		margin-inline: auto;
		border: 1px solid var(--color-border-dark);
		border-radius: var(--radius-lg);
		padding: 0.75rem;
		background: var(--color-surface-dark);
	}
	.map-svg {
		display: block;
		width: 100%;
		/* Height follows the viewBox's own ratio, capped so a wide viewport can
		   never push the map past the sticky frame. Paired with the max-width
		   above, one of the two constraints always binds exactly and neither
		   leaves a letterbox. */
		aspect-ratio: var(--map-ar);
		height: auto;
		max-height: var(--map-h);
		overflow: visible;
	}

	/* Countries */
	.map-countries path {
		fill: var(--color-neutral-alpha-invert-05);
		stroke: var(--color-white-alpha-10);
		stroke-width: 0.35;
		transition:
			fill 0.6s ease,
			fill-opacity 0.6s ease;
	}
	.map-countries path.is-market {
		fill-opacity: 0.12;
	}
	.map-countries path.lit {
		fill: var(--tone);
		fill-opacity: 0.85;
		stroke: var(--color-white-alpha-20);
		stroke-width: 0.4;
	}
	/* Wave 6: every remaining country floods grey, "deferred by design" */
	.map-countries path.deferred {
		fill: var(--tone);
		fill-opacity: 0.4;
		stroke: var(--color-white-alpha-20);
		stroke-width: 0.4;
	}
	.map-countries path.deferred:hover {
		fill: var(--tone);
		fill-opacity: 0.6;
	}
	.map-countries path:hover {
		fill: var(--color-white-alpha-20);
		stroke: var(--color-dark-overlay-60);
		stroke-width: 0.6;
		cursor: default;
	}
	.map-countries path.lit:hover {
		fill: var(--tone);
		fill-opacity: 1;
	}

	.map-arc {
		fill: none;
		stroke-width: 1.2;
		stroke-linecap: round;
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		opacity: 0;
		transition:
			stroke-dashoffset 1.1s ease,
			opacity 0.5s ease;
		pointer-events: none;
	}
	.map-arc.on {
		opacity: 0.85;
		stroke-dashoffset: 0;
	}

	/* Tooltip */
	.map-tip {
		position: fixed;
		z-index: 60;
		transform: translate(-50%, calc(-100% - 14px));
		pointer-events: none;
		background: var(--color-surface-dark-raised);
		border: 1px solid var(--color-border-dark-strong);
		border-radius: var(--radius-md);
		padding: 0.4rem 0.7rem;
		box-shadow: var(--shadow-md);
		white-space: nowrap;
		max-width: 16rem;
	}
	.map-tip strong {
		display: block;
		color: #fff;
		font-size: 0.85rem;
	}
	.map-tip span {
		display: block;
		color: var(--color-white-alpha-70);
		font-size: 0.74rem;
		white-space: normal;
	}

	/* Footer: wave info + legend */
	.map-foot {
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.wave-info {
		position: relative;
		/* Reserve two lines so a caption wrapping never reflows (and resizes) the map. */
		min-height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: visible;
	}
	.wave-slide {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	/* Ink on the wave tone, not white. The tones are chosen to read against a
	   near-black map, which makes them light — white on the lightest of them
	   was 3.48:1, and on the amber it would have been about half that. Ink
	   clears 4.7:1 on the darkest tone and better on every other. */
	.cap-badge {
		flex: none;
		font-family: var(--font-family-mono);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-ink);
		background: var(--c);
		padding: 0.3rem 0.55rem;
		border-radius: var(--radius-sm);
	}
	.wave-info strong {
		color: #fff;
		font-size: 0.95rem;
	}
	.wave-caption {
		color: var(--color-white-alpha-70);
		font-size: 0.85rem;
	}

	/* Carousel controls: only rendered where the map cannot pin. Square and
	   ruled like every other control on the site. */
	.map-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1.25rem;
	}
	.map-ctl {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
		padding: 0 0.9rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-white-alpha-80);
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.28);
		cursor: pointer;
		transition:
			border-color var(--duration-hover) ease,
			color var(--duration-hover) ease;
	}
	.map-ctl:active {
		transform: scale(0.97);
	}
	@media (hover: hover) and (pointer: fine) {
		.map-ctl:hover {
			color: #fff;
			border-color: rgba(255, 255, 255, 0.6);
		}
	}

	.map-legend {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.map-legend li {
		display: inline-flex;
	}
	.map-legend button {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		text-align: left;
		/* Was 40% white, which on this ground is under AA and, with five of the
		   six waves inactive early in the sequence, made most of the key look
		   switched off rather than simply not reached yet. */
		color: rgba(255, 255, 255, 0.62);
		transition: color 0.3s ease;
		cursor: pointer;
	}
	.map-legend li.active button {
		color: #fff;
	}
	@media (pointer: coarse) {
		.map-legend button {
			min-height: 44px;
		}
	}
	.map-legend .dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		opacity: 0.5;
	}
	.map-legend li.active button .dot {
		opacity: 1;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 779px) {
		/* A two-column key rather than six chips wrapping where they happen to
		   fit. Giving each a 44px tap height turned that ragged wrap into three
		   loosely-spaced rows that read as drifting apart; on a grid the dots
		   line up and it reads as one block. */
		.map-legend {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			justify-items: start;
			gap: 0 1rem;
			max-width: 22rem;
			margin-inline: auto;
			text-align: left;
		}
		.map-svg {
			/* On mobile the section isn't pinned, so let the map take its natural
			   width-driven height instead of the fixed desktop frame. */
			height: auto;
		}
		.wave-slide {
			flex-wrap: wrap;
			justify-content: center;
			text-align: center;
		}
	}
</style>
