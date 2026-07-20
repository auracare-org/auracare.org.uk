<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import {
		TRACTION,
		FOUNDATION_EYEBROW,
		FOUNDATION_TITLE,
		FOUNDATION_POINTS
	} from '$lib/data/company';

	// A traction stat counts up only when it is a plain integer ("28").
	// Anything else ("$134k", "~$400k") is a label we keep verbatim.
	function numericStat(stat: string): number | null {
		return /^\d+$/.test(stat) ? Number(stat) : null;
	}
</script>

<section class="market section-y">
	<div class="container-wide">
		<header class="market-head">
			<p class="eyebrow" use:reveal>Traction to date</p>
			<h2 use:reveal={{ delay: 60 }}>
				Early days, <span class="text-gradient">real momentum</span>.
			</h2>
			<p class="market-sub" use:reveal={{ delay: 120 }}>
				Funding, partnerships and pedigree already behind us, before the raise.
			</p>
		</header>

		<div class="grid">
			<!-- Foundation: who is building this, and the CAS route to trials -->
			<article class="foundation glass-card" use:reveal>
				<p class="foundation-eyebrow">{FOUNDATION_EYEBROW}</p>
				<h3 class="foundation-title">{FOUNDATION_TITLE}</h3>
				<ul class="foundation-points">
					{#each FOUNDATION_POINTS as point, i}
						<li class="foundation-point" use:reveal={{ delay: 120 + i * 90 }}>
							<span class="foundation-point-title">{point.title}</span>
							<span class="foundation-point-body">{point.body}</span>
						</li>
					{/each}
				</ul>
			</article>

			<!-- Traction numbers -->
			<ul class="traction" aria-label="Traction to date">
				{#each TRACTION as item, i}
					{@const n = numericStat(item.stat)}
					<li class="stat glass-card" use:reveal={{ delay: i * 90 }}>
						{#if n !== null}
							<span
								class="stat-value"
								use:countUp={{ value: n, format: (v) => Math.round(v).toLocaleString() }}
								aria-label={item.stat}
							></span>
						{:else}
							<span class="stat-value">{item.stat}</span>
						{/if}
						<span class="stat-label">{item.label}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.market-head {
		max-width: 44rem;
	}
	.eyebrow {
		font-family: var(--font-family-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-500);
	}
	.market-head h2 {
		font-size: clamp(1.9rem, 4vw, 2.9rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-top: 0.75rem;
	}
	.market-sub {
		margin-top: 1rem;
		font-size: clamp(1rem, 1.5vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
	}

	/* ---- Layout ---- */
	.grid {
		margin-top: clamp(2rem, 5vw, 3.5rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	/* ---- Foundation box ---- */
	.foundation {
		display: flex;
		flex-direction: column;
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--radius-lg);
	}
	.foundation-eyebrow {
		font-family: var(--font-family-mono);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.foundation-title {
		margin-top: 0.65rem;
		font-family: var(--font-family-heading);
		font-size: clamp(1.35rem, 2.4vw, 1.75rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: var(--color-ink);
	}
	.foundation-points {
		list-style: none;
		margin: clamp(1.25rem, 2.5vw, 1.75rem) 0 0;
		padding: 0;
		display: grid;
		gap: 1.25rem;
	}
	.foundation-point {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding-left: 1rem;
		border-left: 2px solid color-mix(in srgb, var(--color-primary-500), transparent 55%);
	}
	.foundation-point-title {
		font-family: var(--font-family-heading);
		font-size: 1.02rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--color-ink);
	}
	.foundation-point-body {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-faint);
	}

	/* ---- Traction ---- */
	.traction {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
	.stat {
		display: flex;
		flex-direction: column;
		padding: 1.35rem 1.5rem;
		border-radius: var(--radius-lg);
	}
	.stat-value {
		display: block;
		font-family: var(--font-family-heading);
		font-size: clamp(1.7rem, 3.2vw, 2.4rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}
	.stat-label {
		display: block;
		margin-top: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--color-ink-faint);
	}

	@media (min-width: 900px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
			align-items: stretch;
		}
		/* Stat cards keep a comfortable minimum height when paired with the foundation box. */
		.stat {
			justify-content: flex-end;
		}
	}
</style>
