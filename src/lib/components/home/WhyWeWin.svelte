<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { MOAT, MOAT_LINE } from '$lib/data/company';

	// Circle centres for the three-lobe Venn (viewBox 0 0 100 100).
	const R = 27;
	const circles = [
		{ cx: 50, cy: 36 }, // top
		{ cx: 37, cy: 60 }, // bottom-left
		{ cx: 63, cy: 60 } // bottom-right
	];
	// Where each pillar label sits, pushed toward each circle's outer edge.
	const labels = [
		{ x: 50, y: 15, anchor: 'middle' as const },
		{ x: 18, y: 74, anchor: 'middle' as const },
		{ x: 82, y: 74, anchor: 'middle' as const }
	];
</script>

<section class="why section-y">
	<div class="container-wide">
		<header class="head">
			<span class="eyebrow" use:reveal>The category we're defining</span>
			<h2 use:reveal={{ delay: 60 }}>
				Three capabilities. <span class="text-gradient">Most tools hold one.</span>
			</h2>
			<p use:reveal={{ delay: 140 }}>
				The hard part of clinical reasoning isn't any single capability — it's holding all three at
				once, and keeping every step auditable.
			</p>
		</header>

		<div class="layout">
			<!-- Decorative Venn -->
			<figure class="venn" use:reveal={{ delay: 120 }} aria-hidden="true">
				<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
					{#each circles as c, i}
						<circle
							class="lobe"
							style="--i:{i}"
							cx={c.cx}
							cy={c.cy}
							r={R}
							fill="#2f4ec0"
							fill-opacity="0.07"
							stroke="#2f4ec0"
							stroke-opacity="0.45"
							stroke-width="0.4"
						/>
					{/each}

					<!-- overlap centre -->
					<circle class="core" cx="50" cy="52" r="5" fill="#2f4ec0" />

					{#each labels as l, i}
						<text class="venn-num" x={l.x} y={l.y} text-anchor={l.anchor} dominant-baseline="middle"
							>{i + 1}</text
						>
					{/each}
				</svg>
			</figure>

			<!-- Accessible pillars -->
			<ol class="pillars">
				{#each MOAT as pillar, i}
					<li class="pillar glass-card" use:reveal={{ delay: 120 + i * 90 }}>
						<span class="idx" aria-hidden="true">{i + 1}</span>
						<div>
							<h3>{pillar.title}</h3>
							<p>{pillar.body}</p>
						</div>
					</li>
				{/each}
			</ol>
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
		color: var(--color-neutral-600);
		max-width: 36rem;
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
		margin-top: clamp(2rem, 5vw, 3.5rem);
	}

	/* Venn */
	.venn {
		position: relative;
		width: 100%;
		max-width: 24rem;
		margin: 0 auto;
		aspect-ratio: 1;
	}
	.venn svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.venn-num {
		font-family: var(--font-family-mono);
		font-size: 4.5px;
		font-weight: 500;
		fill: var(--color-primary-600);
	}

	/* Pillars */
	.pillars {
		list-style: none;
		display: grid;
		gap: 1rem;
		margin: 0;
		padding: 0;
		counter-reset: none;
	}
	.pillar {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1.25rem 1.4rem;
		border-radius: var(--radius-2xl);
	}
	.idx {
		flex: none;
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 8px;
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-100);
		color: var(--color-primary-700);
		font-family: var(--font-family-mono);
		font-weight: 500;
		font-size: 0.85rem;
	}
	.pillar h3 {
		font-size: 1.08rem;
		line-height: 1.3;
		margin: 0 0 0.3rem;
	}
	.pillar p {
		margin: 0;
		font-size: 0.94rem;
		line-height: 1.55;
		color: var(--color-neutral-600);
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
		color: var(--color-neutral-800);
	}

	@media (min-width: 860px) {
		.layout {
			grid-template-columns: 0.95fr 1.05fr;
		}
	}
</style>
