<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import { TRACTION, FOUNDATION_TITLE, FOUNDATION_POINTS } from '$lib/data/company';

	// A traction stat counts up only when it is a plain integer ("28").
	// Anything else ("$134k", "2 LOIs") is a label we keep verbatim.
	function numericStat(stat: string): number | null {
		return /^\d+$/.test(stat) ? Number(stat) : null;
	}
</script>

<!--
  Traction as a ruled ledger rather than a grid of stat tiles.

  Each line is a figure and what it refers to, which is how someone assessing
  the company would want to read it, and it stops four unrelated numbers from
  competing for the same visual weight.
-->
<section class="market section-y">
	<div class="container-wide">
		<h2 use:reveal>Early days, real momentum.</h2>
		<p class="market-sub" use:reveal={{ delay: 60 }}>
			Funding, partnerships and clinical pilots already in place, before this round.
		</p>

		<dl class="ledger">
			{#each TRACTION as item (item.label)}
				{@const n = numericStat(item.stat)}
				<div class="row" use:reveal={{ delay: 40 }}>
					<dt>{item.label}</dt>
					<dd>
						{#if n !== null}
							<!-- Rendered with its final value, not empty: the count-up only runs
							     when the row scrolls into view, so an empty span meant the
							     figure was missing until then, and missing entirely without
							     JavaScript. The action overwrites this text when it runs. -->
							<span use:countUp={{ value: n, format: (v) => Math.round(v).toLocaleString() }}>
								{item.stat}
							</span>
						{:else}
							{item.stat}
						{/if}
					</dd>
				</div>
			{/each}
		</dl>

		<div class="foundation" use:reveal>
			<h3>{FOUNDATION_TITLE}</h3>
			<div class="points">
				{#each FOUNDATION_POINTS as point (point.title)}
					<div class="point">
						<h4>{point.title}</h4>
						<p>{point.body}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.market {
		border-top: 1px solid var(--color-rule);
	}
	h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.06;
		letter-spacing: -0.03em;
		margin: 0 0 1.25rem;
	}
	.market-sub {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 52ch;
		margin: 0;
	}

	.ledger {
		margin: clamp(2.5rem, 5vw, 4rem) 0 0;
		border-top: 1px solid var(--color-ink);
	}
	.row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1.5rem;
		padding-block: 1.35rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.row dt {
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		max-width: 46ch;
	}
	.row dd {
		margin: 0;
		font-size: clamp(1.6rem, 3.2vw, 2.6rem);
		font-weight: var(--weight-display);
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.foundation {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}
	.foundation h3 {
		font-size: clamp(1.15rem, 2vw, 1.5rem);
		letter-spacing: -0.02em;
		margin: 0 0 1.5rem;
		max-width: 34ch;
	}
	.points {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.75rem;
	}
	.point h4 {
		font-size: 0.98rem;
		margin: 0 0 0.4rem;
	}
	.point p {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 52ch;
	}

	@media (min-width: 860px) {
		.points {
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem;
		}
	}
</style>
