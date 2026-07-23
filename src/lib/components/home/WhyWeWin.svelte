<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { MOAT, MOAT_LINE } from '$lib/data/company';

	let active = $state<number | null>(null);

	function toggle(i: number) {
		active = active === i ? null : i;
	}
</script>

<section class="why section-y">
	<div class="container-wide">
		<header class="head">
			<h2 use:reveal>
				Three capabilities. <span class="text-gradient">Most tools hold one.</span>
			</h2>
			<p use:reveal={{ delay: 140 }}>
				The hard part of clinical reasoning isn't any single capability — it's holding all three at
				once, and keeping every step auditable.
			</p>
		</header>

		<div class="layout">
			<div class="venn-wrap" use:reveal={{ delay: 120 }}>
				<svg class="venn-svg" viewBox="0 0 320 245" fill="none">
					<!-- Three overlapping circles — drawn 3, 2, 1 so 1 is on top -->
					<circle
						class="lobe" class:lobe-active={active === 2}
						cx="200" cy="162" r="72"
						onclick={() => toggle(2)}
						role="button" tabindex="0" aria-label={MOAT[2].title}
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(2); }}
					/>
					<circle
						class="lobe" class:lobe-active={active === 1}
						cx="120" cy="162" r="72"
						onclick={() => toggle(1)}
						role="button" tabindex="0" aria-label={MOAT[1].title}
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(1); }}
					/>
					<circle
						class="lobe" class:lobe-active={active === 0}
						cx="160" cy="100" r="72"
						onclick={() => toggle(0)}
						role="button" tabindex="0" aria-label={MOAT[0].title}
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(0); }}
					/>

					<!-- Center dot -->
					<circle cx="160" cy="142" r="4" fill="var(--color-primary-400)" opacity="0.5" />

					<!-- Dashed lines to labels -->
					<line class="dash" class:dash-active={active === 0} x1="220" y1="52" x2="252" y2="36" />
					<line class="dash" class:dash-active={active === 1} x1="60" y1="190" x2="32" y2="200" />
					<line class="dash" class:dash-active={active === 2} x1="260" y1="190" x2="288" y2="200" />

					<!-- Number circles -->
					<circle class="num-circle" class:num-active={active === 0} cx="264" cy="28" r="14" />
					<circle class="num-circle" class:num-active={active === 1} cx="22" cy="208" r="14" />
					<circle class="num-circle" class:num-active={active === 2} cx="298" cy="208" r="14" />

					<text class="num" class:num-text-active={active === 0} x="264" y="28" text-anchor="middle" dominant-baseline="central" onclick={() => toggle(0)}>1</text>
					<text class="num" class:num-text-active={active === 1} x="22" y="208" text-anchor="middle" dominant-baseline="central" onclick={() => toggle(1)}>2</text>
					<text class="num" class:num-text-active={active === 2} x="298" y="208" text-anchor="middle" dominant-baseline="central" onclick={() => toggle(2)}>3</text>

				</svg>

				<div class="venn-legend">
					{#each MOAT as pillar, i}
						<button
							class="legend-item"
							class:legend-active={active === i}
							onclick={() => toggle(i)}
						>
							<span class="legend-num">{i + 1}</span>
							<span>{pillar.title}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="detail-area">
				{#if active !== null}
					<div class="detail glass-card" role="region" aria-live="polite">
						<span class="idx" aria-hidden="true">{active + 1}</span>
						<div>
							<h3>{MOAT[active].title}</h3>
							<p>{MOAT[active].body}</p>
						</div>
					</div>
				{:else}
					<p class="detail-hint">Click a circle to explore each capability.</p>
				{/if}
			</div>
		</div>

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

	.layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}

	/* Venn container */
	.venn-wrap {
		position: relative;
		width: 100%;
		max-width: 26rem;
		margin: 0 auto;
	}
	.venn-svg {
		width: 100%;
		height: auto;
		overflow: visible;
	}

	/* Circles */
	.lobe {
		fill: rgba(47, 78, 192, 0.03);
		stroke: var(--color-primary-200);
		stroke-width: 1.5;
		cursor: pointer;
		outline: none;
		transition: fill 0.3s ease, stroke 0.3s ease;
	}
	.lobe:hover {
		fill: rgba(47, 78, 192, 0.06);
		stroke: var(--color-primary-400);
	}
	.lobe-active {
		fill: rgba(47, 78, 192, 0.08);
		stroke: var(--color-primary-500);
		stroke-width: 1.8;
	}

	/* Dashed connector lines */
	.dash {
		stroke: var(--color-primary-200);
		stroke-width: 1.2;
		stroke-dasharray: 4 4;
		transition: stroke 0.3s ease;
	}
	.dash-active {
		stroke: var(--color-primary-500);
	}

	/* Number circles */
	.num-circle {
		fill: #fff;
		stroke: var(--color-primary-200);
		stroke-width: 1.2;
		transition: all 0.3s ease;
	}
	.num-active {
		stroke: var(--color-primary-500);
		fill: var(--color-primary-50);
	}
	.num {
		font-family: var(--font-family-mono);
		font-size: 12px;
		font-weight: 600;
		fill: var(--color-primary-500);
		cursor: pointer;
		transition: fill 0.3s ease;
	}
	.num-text-active {
		fill: var(--color-primary-700);
	}

	/* Legend below SVG */
	.venn-legend {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem 1.25rem;
		margin-top: 1rem;
	}
	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		background: none;
		border: none;
		cursor: pointer;
		font: inherit;
		font-size: 0.875rem;
		color: var(--color-ink-soft);
		padding: 0.2rem 0.4rem;
		border-radius: var(--radius-sm);
		transition: color 0.2s ease;
		text-align: left;
	}
	.legend-item:hover {
		color: var(--color-primary-600);
	}
	.legend-active {
		color: var(--color-primary-700);
		font-weight: 500;
	}
	.legend-num {
		display: inline-grid;
		place-items: center;
		flex-shrink: 0;
		width: 1.35rem;
		height: 1.35rem;
		border-radius: 50%;
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-200);
		color: var(--color-primary-600);
		font-family: var(--font-family-mono);
		font-size: 0.75rem;
		font-weight: 600;
		transition: all 0.2s ease;
	}
	.legend-active .legend-num {
		background: var(--color-primary-100);
		border-color: var(--color-primary-400);
		color: var(--color-primary-700);
	}

	/* Detail card */
	.detail-area {
		width: 100%;
		max-width: 32rem;
		min-height: 5rem;
		text-align: center;
	}
	.detail {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1.25rem 1.4rem;
		border-radius: var(--radius-lg);
		text-align: left;
		animation: fadeUp 0.3s ease-out;
	}
	.detail-hint {
		color: var(--color-ink-faint);
		font-size: 0.9rem;
		padding-top: 1rem;
	}
	.idx {
		flex: none;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-md);
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-100);
		color: var(--color-primary-700);
		font-family: var(--font-family-mono);
		font-weight: 500;
		font-size: 0.85rem;
	}
	.detail h3 {
		font-size: 1.08rem;
		line-height: 1.3;
		margin: 0 0 0.3rem;
	}
	.detail p {
		margin: 0;
		font-size: 0.94rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.moat-line {
		margin-top: clamp(2rem, 4vw, 3rem);
		font-family: var(--font-family-heading);
		font-size: clamp(1.15rem, 2.2vw, 1.6rem);
		line-height: 1.4;
		letter-spacing: -0.01em;
		text-align: center;
		max-width: 42rem;
		margin-inline: auto;
		color: var(--color-ink);
	}
</style>
