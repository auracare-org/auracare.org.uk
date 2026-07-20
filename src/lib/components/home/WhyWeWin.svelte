<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { MOAT, MOAT_LINE } from '$lib/data/company';

	let active = $state<number | null>(null);
	let trackEl = $state<HTMLElement>();
	let stageEl = $state<HTMLElement>();

	function toggle(i: number) {
		active = active === i ? null : i;
	}

	// Geometry (% of the square venn box). All three circles share one
	// translucent Auracare blue; alpha stacking deepens the overlaps, so the
	// centre where all three meet reads as the solid brand blue.
	const LOBES = [
		{ left: 18, top: 1, lx: 50, ly: 23 }, // top
		{ left: 2, top: 31, lx: 34, ly: 73 }, // lower-left
		{ left: 34, top: 31, lx: 66, ly: 73 } // lower-right
	];

	// Only the circles pin. The heading and closing line flow normally above and
	// below; a tall track wraps a viewport-height sticky stage holding just the
	// venn, so as you scroll through, the circles hold at the middle of the
	// screen and cycle 1 → 2 → 3. Clicks still work; the next scroll recomputes.
	$effect(() => {
		const track = trackEl;
		const stage = stageEl;
		if (!track || !stage || typeof window === 'undefined') return;

		let raf = 0;
		const update = () => {
			raf = 0;
			const rect = track.getBoundingClientRect();
			const range = Math.max(1, track.offsetHeight - stage.offsetHeight);
			const scrolled = -rect.top;
			if (scrolled <= 0) {
				active = null;
				return;
			}
			const p = Math.min(1, scrolled / range);
			active = Math.min(2, Math.floor(p * 3));
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<section class="why section-y">
	<div class="container-wide">
		<header class="head">
			<h2 use:reveal>
				Three capabilities. <span class="text-gradient">Most tools hold one.</span>
			</h2>
			<p use:reveal={{ delay: 140 }}>
				The hard part of clinical reasoning isn't any single capability: it's holding all three at
				once, and keeping every step auditable and safe.
			</p>
		</header>
	</div>

	<!-- Only the circles pin: this tall track wraps a sticky viewport-height
	     stage so the venn holds mid-screen and cycles 1 → 2 → 3 as you scroll. -->
	<div class="pin-track" bind:this={trackEl}>
		<div class="pin-stage" bind:this={stageEl}>
			<div class="container-wide">
				<div class="venn-grid">
					<!-- Left: three translucent circles, labelled 1 / 2 / 3 -->
					<div class="venn">
						<div class="lobes" aria-hidden="true">
							{#each LOBES as l, i}
								<span
									class="fill"
									class:fill-active={active === i}
									style="left:{l.left}%;top:{l.top}%;"
								></span>
							{/each}
						</div>

						<div class="hits">
							{#each MOAT as pillar, i}
								<button
									class="lobe"
									class:lobe-active={active === i}
									style="left:{LOBES[i].left}%;top:{LOBES[i].top}%;--lx:{LOBES[i].lx}%;--ly:{LOBES[
										i
									].ly}%;"
									onclick={() => toggle(i)}
									aria-pressed={active === i}
									aria-label={pillar.title}
								>
									<span class="num">{i + 1}</span>
								</button>
							{/each}
						</div>
					</div>

					<!-- Right: numbered capabilities, expanding on click/scroll -->
					<ol class="rows">
						{#each MOAT as pillar, i}
							<li>
								<button
									class="row"
									class:row-active={active === i}
									onclick={() => toggle(i)}
									aria-expanded={active === i}
								>
									<span class="row-num">{i + 1}</span>
									<span class="row-text">
										<span class="row-title">{pillar.title}</span>
										{#if active === i}
											<span class="row-body">{pillar.body}</span>
										{/if}
									</span>
								</button>
							</li>
						{/each}
					</ol>
				</div>
			</div>
		</div>
	</div>

	<div class="container-wide">
		<!-- Closing line flows normally beneath the pinned circles. -->
		<p class="moat-line" use:reveal={{ delay: 160 }}>{MOAT_LINE}</p>
	</div>
</section>

<style>
	.why {
		background: var(--color-neutral-0);
	}
	.head {
		max-width: 44rem;
	}

	/* Only the circles pin. The stage hugs the venn (no 100vh centring box, which
	   would strand the circles half a screen below the heading from the first
	   frame). It flows in right under the heading, then sticks to the middle of
	   the viewport — top:50% + translateY(-50%) centres a content-height sticky —
	   while the surplus track height scrolls past, cycling the circles 1 → 2 → 3.
	   Heading and closing line flow normally above and below. */
	.pin-track {
		position: relative;
		height: 200vh;
	}
	.pin-stage {
		position: sticky;
		top: 50%;
		transform: translateY(-50%);
	}
	.pin-stage > .container-wide {
		width: 100%;
	}
	.head h2 {
		font-size: clamp(1.9rem, 4vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-block: 0.6rem 1rem;
	}
	.head p {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 36rem;
	}

	.venn-grid {
		display: grid;
		grid-template-columns: minmax(0, 22rem) 1fr;
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
		max-width: 56rem;
		margin: clamp(1.5rem, 4vw, 2.5rem) auto 0;
	}
	@media (max-width: 700px) {
		.venn-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
			justify-items: center;
		}
	}

	/* Square venn box */
	.venn {
		position: relative;
		width: 100%;
		max-width: 22rem;
		aspect-ratio: 1 / 1;
	}
	.lobes,
	.hits {
		position: absolute;
		inset: 0;
	}
	.lobes {
		pointer-events: none;
	}

	/* Circles: one translucent brand blue; overlaps deepen via alpha */
	.fill {
		position: absolute;
		width: 64%;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		background: rgba(47, 78, 192, 0.12);
		border: 1px solid var(--color-border-strong);
		transition:
			background 0.3s ease,
			border-color 0.3s ease;
	}
	.fill-active {
		background: rgba(47, 78, 192, 0.22);
		border-color: var(--color-primary-500);
	}

	/* Transparent, precisely-round hit targets carrying the numbers */
	.lobe {
		position: absolute;
		width: 64%;
		aspect-ratio: 1 / 1;
		padding: 0;
		border: none;
		background: transparent;
		border-radius: 50%;
		clip-path: circle(50%);
		cursor: pointer;
		outline: none;
	}

	.num {
		position: absolute;
		left: var(--lx);
		top: var(--ly);
		transform: translate(-50%, -50%);
		display: grid;
		place-items: center;
		width: 1.65rem;
		height: 1.65rem;
		border-radius: var(--radius-sm);
		background: #fff;
		border: 1px solid var(--color-border-default);
		color: var(--color-primary-600);
		font-family: var(--font-family-mono);
		font-size: 0.8rem;
		font-weight: 700;
		transition:
			border-color 0.3s ease,
			color 0.3s ease;
	}
	.lobe:hover .num {
		border-color: var(--color-border-strong);
	}
	.lobe-active .num {
		border-color: var(--color-primary-500);
		color: var(--color-primary-700);
	}

	/* Right column: flat, hairline-separated, editorial.
	   min-height reserves space so expanding a row doesn't shift the diagram. */
	.rows {
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 15rem;
	}
	.rows li + li {
		border-top: 1px solid var(--color-border-default);
	}
	.row {
		display: flex;
		gap: 0.9rem;
		align-items: flex-start;
		width: 100%;
		padding: 1rem 0.25rem;
		border: none;
		background: transparent;
		text-align: left;
		cursor: pointer;
	}
	.row-num {
		flex: none;
		display: grid;
		place-items: center;
		width: 1.65rem;
		height: 1.65rem;
		border-radius: var(--radius-sm);
		background: #fff;
		border: 1px solid var(--color-border-default);
		color: var(--color-primary-600);
		font-family: var(--font-family-mono);
		font-size: 0.8rem;
		font-weight: 700;
		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			color 0.25s ease;
	}
	.row:hover .row-num {
		border-color: var(--color-border-strong);
	}
	.row-active .row-num {
		background: var(--color-primary-600);
		border-color: var(--color-primary-600);
		color: #fff;
	}
	.row-text {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
		padding-top: 0.15rem;
	}
	.row-title {
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--color-ink);
		transition: color 0.25s ease;
	}
	.row-active .row-title {
		color: var(--color-primary-700);
	}
	.row-body {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
		animation: fadeUp 0.25s ease-out;
	}
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.moat-line {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		font-family: var(--font-family-heading);
		font-size: clamp(1.15rem, 2.2vw, 1.6rem);
		line-height: 1.4;
		letter-spacing: -0.01em;
		text-align: center;
		max-width: 42rem;
		margin-inline: auto;
		color: var(--color-ink);
	}

	@media (prefers-reduced-motion: reduce) {
		.fill,
		.num,
		.row-num,
		.row-title,
		.row-body {
			transition: none;
			animation: none;
		}
	}
</style>
