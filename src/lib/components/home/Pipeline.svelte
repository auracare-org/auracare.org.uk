<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PIPELINE_FOUNDATION, STAGES } from '$lib/data/company';
</script>

<!--
  The pipeline, stated once: three stages side by side, in order, then the
  shared encoding underneath them. This replaced the old "two products" panels
  when the company reframed as one package sold to providers.
-->
<section id="pipeline" class="pipeline section-y">
	<div class="container-wide">
		<h2 use:reveal>One pipeline, three stages.</h2>
		<p class="pipeline-lede" use:reveal={{ delay: 60 }}>
			Sold to clinics and pharmacies as a single package. Each stage feeds the next, and the last
			feeds the first.
		</p>

		<div class="panels">
			{#each STAGES as stage, i (stage.key)}
				<article class="panel" use:reveal={{ delay: i * 80 }}>
					<span class="panel-n">{stage.n}</span>
					<h3>{stage.name}</h3>
					<p class="panel-tagline">{stage.tagline}</p>
					<p class="panel-blurb">{stage.blurb}</p>
					<dl class="panel-facts">
						<div>
							<dt>Status</dt>
							<dd>{stage.statusLabel}</dd>
						</div>
					</dl>
				</article>
			{/each}
		</div>

		<div class="engine" use:reveal>
			<p class="engine-lead">{PIPELINE_FOUNDATION}</p>
			<a class="engine-link" href={CONTACT.ontologyUrl} target="_blank" rel="noopener">
				Explore the graph <span aria-hidden="true">&#8599;</span>
			</a>
		</div>
	</div>
</section>

<style>
	.pipeline {
		border-top: 1px solid var(--color-rule);
	}
	.pipeline h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin: 0 auto 1rem;
	}
	.pipeline-lede {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 52ch;
		margin: 0 auto clamp(2.5rem, 5vw, 4rem);
		text-align: center;
	}

	.panels {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		border-top: 1px solid var(--color-ink);
	}
	/* A column, so the status rows share one baseline whatever the blurbs do. */
	.panel {
		display: flex;
		flex-direction: column;
		padding-top: 1.75rem;
	}
	.panel-n {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		color: var(--color-primary-600);
		margin-bottom: 0.9rem;
		font-variant-numeric: tabular-nums;
	}
	.panel h3 {
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		letter-spacing: -0.03em;
		margin: 0;
	}
	.panel-tagline {
		margin: 0.4rem 0 1rem;
		font-size: 0.95rem;
		color: var(--color-primary-600);
	}
	.panel-blurb {
		margin: 0 0 1.5rem;
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
	}
	.panel-facts {
		margin: auto 0 0;
		border-top: 1px solid var(--color-rule);
	}
	.panel-facts > div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.7rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.panel-facts dt {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.panel-facts dd {
		margin: 0;
		font-size: 0.88rem;
		color: var(--color-ink);
		text-align: right;
	}

	/* The closing statement about all three stages, on the page's centre line. */
	.engine {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: clamp(1.5rem, 3vw, 2rem);
		border-top: 1px solid var(--color-ink);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.5rem;
	}
	.engine-lead {
		font-size: clamp(1.05rem, 1.6vw, 1.3rem);
		line-height: 1.65;
		color: var(--color-ink);
		max-width: 62ch;
		margin: 0 auto;
	}
	/* A standalone action, so it carries a real tap height rather than just
	   its line box. */
	.engine-link {
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

	@media (hover: hover) and (pointer: fine) {
		.engine-link:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
	}
	@media (min-width: 880px) {
		.panels {
			grid-template-columns: repeat(3, 1fr);
			gap: 0;
		}
		.panel {
			padding-inline: 2.25rem;
		}
		.panel + .panel {
			border-left: 1px solid var(--color-rule);
		}
		.panel:first-child {
			padding-left: 0;
		}
		.panel:last-child {
			padding-right: 0;
		}
	}
</style>
