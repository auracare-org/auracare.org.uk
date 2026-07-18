<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { MOAT, MOAT_LINE } from '$lib/data/company';

	const R = 24;
	const circles = [
		{ cx: 50, cy: 32 },
		{ cx: 36, cy: 58 },
		{ cx: 64, cy: 58 }
	];

	// Labels positioned to the side of each circle, connected by dashed lines
	// 1 = top-right of circle 1, 2 = left of circle 2, 3 = right of circle 3
	const annotations = [
		{ numX: 82, numY: 18, lineX1: 50 + R - 4, lineY1: 32 - R + 6, lineX2: 79, lineY2: 18 },
		{ numX: 8, numY: 62, lineX1: 36 - R + 4, lineY1: 58, lineX2: 11, lineY2: 62 },
		{ numX: 92, numY: 62, lineX1: 64 + R - 4, lineY1: 58, lineX2: 89, lineY2: 62 }
	];

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
			<figure class="venn" use:reveal={{ delay: 120 }}>
				<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
					{#each circles as c, i}
						<circle
							class="lobe"
							class:lobe-active={active === i}
							cx={c.cx}
							cy={c.cy}
							r={R}
							role="button"
							tabindex="0"
							aria-label={MOAT[i].title}
							onclick={() => toggle(i)}
							onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(i); }}
						/>
					{/each}

					<circle class="core" cx="50" cy="50" r="2.5" />

					<!-- Dashed connector lines from circles to side labels -->
					{#each annotations as a, i}
						<line
							class="connector"
							class:connector-active={active === i}
							x1={a.lineX1}
							y1={a.lineY1}
							x2={a.lineX2}
							y2={a.lineY2}
							stroke-dasharray="2 2"
						/>
					{/each}

					<!-- Number badges to the side -->
					{#each annotations as a, i}
						<circle
							class="num-bg"
							class:num-bg-active={active === i}
							cx={a.numX}
							cy={a.numY}
							r="5"
						/>
						<text
							class="venn-num"
							class:venn-num-active={active === i}
							x={a.numX}
							y={a.numY}
							text-anchor="middle"
							dominant-baseline="central"
							onclick={() => toggle(i)}
						>{i + 1}</text>
					{/each}
				</svg>

				<!-- Side title labels (HTML for better typography) -->
				<button class="side-label side-label-1" class:side-label-active={active === 0} onclick={() => toggle(0)}>
					{MOAT[0].title}
				</button>
				<button class="side-label side-label-2" class:side-label-active={active === 1} onclick={() => toggle(1)}>
					{MOAT[1].title}
				</button>
				<button class="side-label side-label-3" class:side-label-active={active === 2} onclick={() => toggle(2)}>
					{MOAT[2].title}
				</button>
			</figure>

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

	/* Venn */
	.venn {
		position: relative;
		width: 100%;
		max-width: 28rem;
		margin: 0 auto;
		aspect-ratio: 1.2;
	}
	.venn svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.lobe {
		fill: rgba(47, 78, 192, 0.04);
		stroke: var(--color-primary-300);
		stroke-width: 1.2;
		outline: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.lobe:focus-visible {
		stroke: var(--color-primary-600);
		stroke-width: 1.8;
	}
	.lobe-active {
		fill: rgba(47, 78, 192, 0.1);
		stroke: var(--color-primary-600);
		stroke-width: 1.8;
	}
	.core {
		fill: var(--color-primary-500);
		opacity: 0.6;
	}
	.connector {
		stroke: var(--color-primary-200);
		stroke-width: 0.6;
		transition: stroke 0.3s ease;
	}
	.connector-active {
		stroke: var(--color-primary-600);
		stroke-width: 0.8;
	}
	.num-bg {
		fill: var(--color-neutral-0);
		stroke: var(--color-primary-200);
		stroke-width: 0.7;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.num-bg-active {
		stroke: var(--color-primary-600);
		fill: var(--color-primary-50);
	}
	.venn-num {
		font-family: var(--font-family-mono);
		font-size: 5.5px;
		font-weight: 600;
		fill: var(--color-primary-600);
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.venn-num-active {
		font-weight: 700;
		fill: var(--color-primary-700);
	}

	/* Side labels (HTML positioned absolutely) */
	.side-label {
		position: absolute;
		font-size: 0.72rem;
		font-weight: 500;
		color: var(--color-ink-faint);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		max-width: 8rem;
		line-height: 1.3;
		text-align: left;
		transition: color 0.3s ease;
	}
	.side-label:hover,
	.side-label-active {
		color: var(--color-primary-600);
	}
	.side-label-1 {
		top: 8%;
		right: 2%;
		text-align: right;
	}
	.side-label-2 {
		bottom: 22%;
		left: 0;
	}
	.side-label-3 {
		bottom: 22%;
		right: 0;
		text-align: right;
	}

	/* Detail area below Venn */
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
