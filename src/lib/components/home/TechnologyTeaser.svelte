<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	/* The ontology, stated as a specification rather than decorated as tiles.
	   The previous version rendered these on dark chips over a particle canvas:
	   the chips were unreadable once the section moved onto paper, and the
	   canvas was decoration with no argument behind it. */
	const spec = [
		{ value: 532_000, label: 'SNOMED CT concepts', suffix: 'k' },
		{ value: 1_300_000, label: 'Relationships mapped', suffix: 'M' },
		{ value: 31_900, label: 'ICD-11 categories', suffix: 'k' },
		{ value: 217_000, label: 'LOINC lab codes', suffix: 'k' }
	];

	const formatK = (n: number) => `${Math.round(n / 1000)}k`;
	const formatM = (n: number) => `${(n / 1_000_000).toFixed(1)}M`;
</script>

<section class="tech section-y">
	<div class="container-wide tech-grid">
		<div class="tech-copy">
			<h2 use:reveal={{ delay: 60 }}>
				A learned model proposes.<br />
				<em>A symbolic layer disposes.</em>
			</h2>
			<p class="tech-lead" use:reveal={{ delay: 120 }}>
				Every signal is encoded onto the terminology medicine already agrees on, so every answer
				traces back to a named source rather than to a model's confidence. A clinician can follow
				the reasoning back to those sources and stay in the loop.
			</p>
			<div class="tech-cta" use:reveal={{ delay: 180 }}>
				<a class="link-rule" href={CONTACT.ontologyUrl} target="_blank" rel="noopener">
					Explore the graph <span aria-hidden="true">&#8599;</span>
				</a>
				<a class="link-rule" href="/technology">
					How the engine works <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</div>

		<dl class="spec">
			{#each spec as row, i (row.label)}
				<div class="spec-row" use:reveal={{ delay: 60 + i * 60 }}>
					<dt>{row.label}</dt>
					<!-- Seeded with the final value so the figure is present before the
					     count-up runs, and without JavaScript at all. -->
					<dd use:countUp={{ value: row.value, format: row.suffix === 'M' ? formatM : formatK }}>
						{row.suffix === 'M' ? formatM(row.value) : formatK(row.value)}
					</dd>
				</div>
			{/each}
			<p class="spec-note" use:reveal={{ delay: 300 }}>
				The graph is live and explorable today. The reasoning engine that acts on it is in
				development.
			</p>
		</dl>
	</div>
</section>

<style>
	.tech {
		border-top: 1px solid var(--color-rule);
	}
	.tech-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 5vw, 4.5rem);
		align-items: start;
	}

	.tech h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin: 0;
	}
	.tech h2 em {
		font-style: normal;
		color: var(--color-primary-600);
	}
	.tech-lead {
		margin-top: 1.5rem;
		font-size: 1.02rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 40ch;
	}
	.tech-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		margin-top: 2rem;
	}
	/* A standalone action, so it carries a real tap height rather than just
	   its line box. */
	.link-rule {
		@media (pointer: coarse) {
			min-height: 44px;
		}
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.74rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink);
		padding-bottom: 0.3rem;
		border-bottom: 1px solid var(--color-ink);
		transition:
			color var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}

	/* The specification: a ruled table, the way a datasheet states a figure. */
	.spec {
		margin: 0;
		border-top: 1px solid var(--color-ink);
	}
	.spec-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1.5rem;
		padding-block: 1.15rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.spec-row dt {
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.spec-row dd {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
		font-weight: var(--weight-display);
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}
	.spec-note {
		margin: 1.25rem 0 0;
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--color-ink-faint);
	}

	@media (hover: hover) and (pointer: fine) {
		.link-rule:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
	}
	@media (min-width: 940px) {
		.tech-grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: 5rem;
		}
	}
</style>
