<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollProgress, prefersReducedMotion } from '$lib/actions/motion';
	import { VIEWBOX, countryPaths, arcPath } from '$lib/map/geo';
	import { MARKET_WAVES, MARKET_POINTS, MARKET_ARCS, type MarketTone } from '$lib/data/company';

	const toneColor: Record<MarketTone, string> = {
		launch: '#6180ff',
		clinical: '#387ff5',
		sea: '#4f8dff',
		downstream: '#2f4ec0',
		beachhead: '#94abff',
		researched: '#f0b429',
		deferred: '#6b7280'
	};

	// Map each market entry onto its world-atlas country name.
	const ATLAS_ALIAS: Record<string, string> = {
		'United States': 'United States of America',
		'United Kingdom (MHRA Airlock)': 'United Kingdom'
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
		const display = p.name === 'United Kingdom (MHRA Airlock)' ? 'United Kingdom' : p.name;
		const existing = marketByCountry.get(atlas);
		// Keep the earliest wave a country belongs to, so it lights up as soon as it appears.
		if (!existing || p.wave < existing.wave) {
			marketByCountry.set(atlas, { tone: p.tone, wave: p.wave, display, label: p.label });
		}
	}

	const countries = countryPaths.map((c) => ({ ...c, market: marketByCountry.get(c.name) }));

	const maxWave = MARKET_WAVES.length - 1;
	let activeWave = $state(0);
	let pinned = $state(false);

	const arcs = MARKET_ARCS.map((a) => ({ ...a, d: arcPath(a.from, a.to) })).filter((a) => a.d);
	const currentWave = $derived(MARKET_WAVES[Math.min(activeWave, maxWave)]);

	// Floating hover tooltip (Leaflet-style), driven by event delegation on the svg.
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
		const t = Math.min(1, Math.max(0, (p - 0.08) / 0.84));
		activeWave = Math.round(t * maxWave);
	}

	onMount(() => {
		const mq = window.matchMedia('(min-width: 780px)');
		const apply = () => {
			pinned = mq.matches && !prefersReducedMotion();
			if (!pinned) activeWave = maxWave; // show every wave at once
		};
		apply();
		mq.addEventListener('change', apply);
		return () => mq.removeEventListener('change', apply);
	});

	const pointsByWave = MARKET_WAVES.map((w) => ({
		wave: w,
		markets: MARKET_POINTS.filter((p) => p.wave === w.order).map((p) => p.name)
	})).filter((g) => g.markets.length > 0);
</script>

<section class="map-section aura-space" aria-labelledby="map-heading">
	<div class="map-scroller" class:pinned use:scrollProgress={{ onProgress }}>
		<div class="map-sticky">
			<div class="container-wide map-head">
				<span class="eyebrow">Global rollout</span>
				<h2 id="map-heading">
					Approval portability, not market size,<br />decides where we go next.
				</h2>
				<p class="map-sub">
					One clinical deployment can feed several regulatory dossiers at once — so we sequence by
					how far an approval travels, not by how big a market looks.
				</p>
			</div>

			<div class="map-stage">
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
							<path
								d={c.d}
								class:is-market={!!c.market}
								class:lit
								data-name={c.market ? c.market.display : c.name}
								data-label={c.market ? c.market.label : null}
								style={c.market ? `--tone:${toneColor[c.market.tone]}` : ''}
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

			<div class="container-wide map-foot">
				<div class="map-caption" aria-live="polite">
					<span class="cap-badge" style="--c:{toneColor[currentWave.tone]}"
						>Wave {currentWave.order + 1}</span
					>
					<div>
						<strong>{currentWave.title}</strong>
						<span>{currentWave.caption}</span>
					</div>
				</div>
				<ol class="map-legend">
					{#each MARKET_WAVES as w}
						<li class:active={activeWave >= w.order}>
							<span class="dot" style="background:{toneColor[w.tone]}"></span>{w.title}
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>

	<!-- Accessible text equivalent of the map -->
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
		padding-block: clamp(3rem, 6vw, 5rem);
	}
	.pinned .map-sticky {
		position: sticky;
		top: var(--header-h, 92px);
		height: calc(100vh - var(--header-h, 92px));
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-block: 1.5rem;
	}
	.map-head h2 {
		font-size: clamp(1.7rem, 3.6vw, 2.9rem);
		line-height: 1.1;
		margin-top: 0.5rem;
	}
	.map-sub {
		max-width: 40rem;
		margin-top: 0.75rem;
	}
	.map-stage {
		position: relative;
		width: 100%;
		max-width: 78rem;
		margin: 1rem auto 0;
		padding-inline: 1rem;
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		align-items: center;
	}
	.map-svg {
		width: 100%;
		height: auto;
		max-height: 58vh;
		overflow: visible;
	}

	/* Base countries + coloured market fills */
	.map-countries path {
		fill: rgba(255, 255, 255, 0.05);
		stroke: rgba(255, 255, 255, 0.1);
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
		stroke: rgba(255, 255, 255, 0.3);
		stroke-width: 0.4;
	}
	/* Leaflet-style hover highlight on any country */
	.map-countries path:hover {
		fill: rgba(255, 255, 255, 0.18);
		stroke: rgba(255, 255, 255, 0.6);
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

	/* Floating tooltip */
	.map-tip {
		position: fixed;
		z-index: 60;
		transform: translate(-50%, calc(-100% - 14px));
		pointer-events: none;
		background: var(--color-surface-dark-raised);
		border: 1px solid var(--color-border-dark-strong);
		border-radius: 8px;
		padding: 0.4rem 0.7rem;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
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
		color: rgba(226, 232, 255, 0.7);
		font-size: 0.74rem;
		white-space: normal;
	}

	.map-foot {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		justify-content: space-between;
		align-items: center;
		margin-top: 1.25rem;
	}
	.map-caption {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: 2.75rem;
	}
	.cap-badge {
		flex: none;
		font-family: var(--font-family-mono);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #fff;
		background: var(--c);
		padding: 0.3rem 0.55rem;
		border-radius: 6px;
	}
	.map-caption strong {
		color: #fff;
		display: block;
		font-size: 0.95rem;
	}
	.map-caption span {
		color: rgba(226, 232, 255, 0.7);
		font-size: 0.85rem;
	}
	.map-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.map-legend li {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.78rem;
		color: rgba(226, 232, 255, 0.4);
		transition: color 0.3s ease;
	}
	.map-legend li.active {
		color: rgba(226, 232, 255, 0.92);
	}
	.map-legend .dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		opacity: 0.5;
	}
	.map-legend li.active .dot {
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
		.map-svg {
			max-height: none;
		}
		.map-head h2 br {
			display: none;
		}
	}
</style>
