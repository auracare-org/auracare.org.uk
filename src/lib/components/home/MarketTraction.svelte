<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import { FUNNEL, MARKET_BASIS, TRACTION } from '$lib/data/company';

	// Widest at the top (TAM) → narrowest at the bottom (SOM).
	const widths = [100, 68, 40, 20];

	// A traction stat counts up only when it is a plain integer ("20").
	// Anything else ("532k", "MHRA", "FDA") is a label we keep verbatim.
	function numericStat(stat: string): number | null {
		return /^\d+$/.test(stat) ? Number(stat) : null;
	}
</script>

<section class="market section-y">
	<div class="container-wide">
		<header class="market-head">
			<span class="eyebrow" use:reveal>The opportunity</span>
			<h2 use:reveal={{ delay: 60 }}>
				We built our own model instead of <span class="text-gradient">quoting a report</span>.
			</h2>
		</header>

		<!-- Funnel -->
		<div class="funnel" role="presentation">
			{#each FUNNEL as stage, i}
				<div class="funnel-row" use:reveal={{ delay: i * 120 }}>
					<div class="funnel-bar" style="--w:{widths[i] ?? 20}%; --depth:{i};" aria-hidden="true">
						<div class="funnel-fill">
							<span class="funnel-label">{stage.label}</span>
							<span class="funnel-value">{stage.value}</span>
						</div>
					</div>
					<p class="funnel-note">{stage.note}</p>
				</div>
			{/each}
		</div>

		<!-- Accessible equivalent of the funnel visual -->
		<table class="visually-hidden">
			<caption>Market sizing funnel, widest to narrowest</caption>
			<thead>
				<tr>
					<th scope="col">Stage</th>
					<th scope="col">Value</th>
					<th scope="col">Basis</th>
				</tr>
			</thead>
			<tbody>
				{#each FUNNEL as stage}
					<tr>
						<th scope="row">{stage.label}</th>
						<td>{stage.value}</td>
						<td>{stage.note}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<p class="basis" use:reveal>{MARKET_BASIS}</p>

		<!-- Traction -->
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
</section>

<style>
	.market-head {
		max-width: 44rem;
	}
	.market-head h2 {
		font-size: clamp(1.9rem, 4vw, 2.9rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-top: 0.75rem;
	}

	/* ---- Funnel ---- */
	.funnel {
		margin-top: clamp(2rem, 5vw, 3.5rem);
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}
	.funnel-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.35rem 1.5rem;
		align-items: center;
	}
	.funnel-bar {
		width: var(--w);
		min-width: 8.5rem;
		max-width: 100%;
	}
	.funnel-fill {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.35rem 0.9rem;
		padding: 0.85rem 1.25rem;
		border-radius: var(--radius-md);
		color: #fff;
		/* Each successive stage sits deeper in the brand-blue ramp. */
		background: color-mix(
			in srgb,
			var(--color-primary-500),
			var(--color-primary-800) calc(var(--depth) * 30%)
		);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.funnel-row:global(.reveal--in) .funnel-fill {
		transform: scaleX(1);
	}
	/* Keep the text upright while the bar scales in. */
	.funnel-label,
	.funnel-value {
		transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.funnel-label {
		font-family: var(--font-family-mono);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.75;
	}
	.funnel-value {
		font-family: var(--font-family-heading);
		font-size: clamp(1.35rem, 2.4vw, 1.9rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.funnel-note {
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--color-ink-faint);
		max-width: 42rem;
	}

	/* ---- Basis paragraph ---- */
	.basis {
		margin-top: clamp(2rem, 4vw, 3rem);
		max-width: 46rem;
		font-size: clamp(1rem, 1.5vw, 1.12rem);
		line-height: 1.65;
		color: var(--color-ink-soft);
	}

	/* ---- Traction ---- */
	.traction {
		list-style: none;
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
	.stat {
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

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@media (min-width: 720px) {
		.funnel-row {
			grid-template-columns: minmax(9rem, var(--w-col, 46%)) 1fr;
		}
		.funnel-note {
			margin: 0;
		}
		.traction {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
