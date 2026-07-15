<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollProgress, prefersReducedMotion } from '$lib/actions/motion';
	import { VIEWBOX, countryPaths, project, arcPath } from '$lib/map/geo';
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

	const maxWave = MARKET_WAVES.length - 1;

	let activeWave = $state(0);
	let pinned = $state(false);

	// Precompute pixel positions for every market point.
	const points = MARKET_POINTS.map((p) => ({ ...p, xy: project(p.coords) })).filter(
		(p) => p.xy
	) as ((typeof MARKET_POINTS)[number] & { xy: [number, number] })[];

	const arcs = MARKET_ARCS.map((a) => ({ ...a, d: arcPath(a.from, a.to) })).filter((a) => a.d);

	const currentWave = $derived(MARKET_WAVES[Math.min(activeWave, maxWave)]);

	function onProgress(p: number) {
		if (!pinned) return;
		// spread the waves across the middle 80% of the scroll for comfortable pacing
		const t = Math.min(1, Math.max(0, (p - 0.08) / 0.84));
		activeWave = Math.round(t * maxWave);
	}

	onMount(() => {
		const mq = window.matchMedia('(min-width: 780px)');
		const apply = () => {
			pinned = mq.matches && !prefersReducedMotion();
			if (!pinned) activeWave = maxWave; // show everything at once
		};
		apply();
		mq.addEventListener('change', apply);
		return () => mq.removeEventListener('change', apply);
	});

	// Points grouped by wave for the accessible list.
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
				<svg
					class="map-svg"
					viewBox={VIEWBOX}
					preserveAspectRatio="xMidYMid meet"
					role="img"
					aria-labelledby="map-heading"
				>
					<!-- base countries -->
					<g class="map-countries">
						{#each countryPaths as c (c.id)}
							<path d={c.d} />
						{/each}
					</g>

					<!-- evidence-factory arcs (wave 1) -->
					{#each arcs as a}
						<path
							class="map-arc"
							class:on={activeWave >= a.wave}
							d={a.d}
							style="stroke:{toneColor.clinical}"
						/>
					{/each}

					<!-- market pins -->
					{#each points as p}
						{@const on = activeWave >= p.wave}
						<g class="map-pin" class:on transform="translate({p.xy[0]},{p.xy[1]})">
							<circle class="pin-halo" r="11" style="fill:{toneColor[p.tone]}" />
							<circle class="pin-dot" r="3.4" style="fill:{toneColor[p.tone]}" />
						</g>
					{/each}
				</svg>
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
	/* On desktop the scroller is tall and the inner stage pins while waves fire. */
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
	.map-countries path {
		fill: rgba(255, 255, 255, 0.06);
		stroke: rgba(174, 191, 255, 0.16);
		stroke-width: 0.4;
	}
	.map-arc {
		fill: none;
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		opacity: 0;
		transition:
			stroke-dashoffset 1.1s ease,
			opacity 0.5s ease;
		filter: drop-shadow(0 0 6px rgba(97, 128, 255, 0.6));
	}
	.map-arc.on {
		opacity: 0.9;
		stroke-dashoffset: 0;
	}
	.map-pin {
		opacity: 0;
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
	}
	.map-pin.on {
		opacity: 1;
	}
	.pin-halo {
		opacity: 0.28;
		transform-origin: center;
	}
	.map-pin.on .pin-halo {
		animation: pulseGlow 2.6s ease-in-out infinite;
	}
	.pin-dot {
		filter: drop-shadow(0 0 4px currentColor);
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
		font-size: 0.72rem;
		font-weight: 700;
		color: #fff;
		background: var(--c);
		padding: 0.3rem 0.6rem;
		border-radius: 999px;
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
