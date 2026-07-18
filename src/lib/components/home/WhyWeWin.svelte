<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { MOAT, MOAT_LINE } from '$lib/data/company';

	const R = 27;
	const circles = [
		{ cx: 50, cy: 36 },
		{ cx: 37, cy: 60 },
		{ cx: 63, cy: 60 }
	];
	const labels = [
		{ x: 50, y: 2, anchor: 'middle' as const },
		{ x: 12, y: 84, anchor: 'middle' as const },
		{ x: 88, y: 84, anchor: 'middle' as const }
	];
	/* Lines from each label to the nearest circle edge */
	const connectors = [
		{ x1: 50, y1: 5, x2: 50, y2: 9 },
		{ x1: 14, y1: 81, x2: 17.5, y2: 78.7 },
		{ x1: 86, y1: 81, x2: 82.5, y2: 78.7 }
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
							style="cursor:pointer; transition: all 0.25s ease;"
						/>
					{/each}

					<circle class="core" cx="50" cy="52" r="3" />

					<!-- Connector lines from labels to circles -->
					{#each connectors as cn, i}
						<line
							class="connector"
							class:connector-active={active === i}
							x1={cn.x1}
							y1={cn.y1}
							x2={cn.x2}
							y2={cn.y2}
						/>
					{/each}

					<!-- Number labels outside circles -->
					{#each labels as l, i}
						<circle
							class="num-bg"
							class:num-bg-active={active === i}
							cx={l.x}
							cy={l.y}
							r="4.5"
						/>
						<text
							class="venn-num"
							class:venn-num-active={active === i}
							x={l.x}
							y={l.y}
							text-anchor={l.anchor}
							dominant-baseline="central"
							style="cursor:pointer;"
							onclick={() => toggle(i)}
						>{i + 1}</text>
					{/each}
				</svg>
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
		gap: 2rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}

	/* Venn */
	.venn {
		position: relative;
		width: 100%;
		max-width: 22rem;
		margin: 0 auto;
		aspect-ratio: 1;
	}
	.venn svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.lobe {
		fill: rgba(47, 78, 192, 0.05);
		stroke: var(--color-primary-300);
		stroke-width: 1.5;
		outline: none;
		transition: all 0.25s ease;
	}
	.lobe:focus-visible {
		stroke: var(--color-primary-600);
		stroke-width: 2;
	}
	.lobe-active {
		fill: rgba(47, 78, 192, 0.1);
		stroke: var(--color-primary-600);
		stroke-width: 2;
	}
	.core {
		fill: var(--color-primary-400);
		opacity: 0.5;
		transition: opacity 0.25s ease;
	}
	.connector {
		stroke: var(--color-primary-300);
		stroke-width: 0.7;
		transition: stroke 0.25s ease;
	}
	.connector-active {
		stroke: var(--color-primary-600);
		stroke-width: 1;
	}
	.num-bg {
		fill: var(--color-neutral-0);
		stroke: var(--color-primary-200);
		stroke-width: 0.8;
		transition: all 0.25s ease;
	}
	.num-bg-active {
		stroke: var(--color-primary-600);
		fill: var(--color-primary-50);
	}
	.venn-num {
		font-family: var(--font-family-mono);
		font-size: 6.5px;
		font-weight: 600;
		fill: var(--color-primary-600);
		transition: all 0.25s ease;
	}
	.venn-num-active {
		font-weight: 700;
		font-size: 7px;
		fill: var(--color-primary-700);
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
