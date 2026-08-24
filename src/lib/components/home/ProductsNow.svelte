<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { PRODUCTS } from '$lib/data/company';

	/* The ontology entry is not a product, so it is pulled out of the list and
	   rendered as the closing statement instead. */
	const products = PRODUCTS.filter((p) => p.key !== 'ontology');
	const model = PRODUCTS.find((p) => p.key === 'ontology')!;
</script>

<!--
  Two products, then the thing underneath them.

  The patient model used to sit as a third entry in this list, which read as a
  third product. It is not one: it is the engine the other two run on. It now
  closes the section as a statement about both, which is also the argument the
  company actually wants to make.
-->
<section id="products" class="products section-y">
	<div class="container-wide">
		<h2 use:reveal>Two products, one patient model.</h2>

		<!-- Side by side, so the division of labour is the layout. Each panel
		     states who it is for, what it does, and when it lands; the rule
		     between them is the handoff. -->
		<div class="panels">
			{#each products as product, i (product.key)}
				<article class="panel" use:reveal={{ delay: i * 80 }}>
					<span class="panel-for"
						>{product.key === 'auracle' ? 'For people' : 'For clinicians'}</span
					>
					<h3>
						<a href={product.href}>{product.name} <span aria-hidden="true">&rarr;</span></a>
					</h3>
					<p class="panel-tagline">{product.tagline}</p>
					<p class="panel-blurb">{product.blurb}</p>
					<dl class="panel-facts">
						<div>
							<dt>Status</dt>
							<dd>{product.statusLabel}</dd>
						</div>
						<div>
							<dt>Runs</dt>
							<dd>{product.key === 'auracle' ? 'In your messages' : 'In the consultation'}</dd>
						</div>
					</dl>
				</article>
			{/each}
		</div>

		<div class="engine" use:reveal>
			<p class="engine-lead">
				Both run on <strong>one patient model</strong>: a single, timestamped picture of a person,
				grounded in the terminology medicine already agrees on. {model.blurb}
			</p>
			<a class="engine-link" href={model.href} target="_blank" rel="noopener">
				Explore the graph <span aria-hidden="true">&#8599;</span>
			</a>
		</div>
	</div>
</section>

<style>
	.products {
		border-top: 1px solid var(--color-rule);
	}
	.products h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.06;
		letter-spacing: -0.03em;
		margin: 0 0 clamp(2.5rem, 5vw, 4rem);
		text-align: left;
	}

	.panels {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		border-top: 1px solid var(--color-ink);
	}
	.panel {
		padding-top: 1.75rem;
	}
	.panel-for {
		display: block;
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin-bottom: 0.9rem;
	}
	.panel h3 {
		font-size: clamp(1.7rem, 3.2vw, 2.5rem);
		letter-spacing: -0.03em;
		margin: 0;
	}
	.panel h3 a {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5rem;
		color: var(--color-ink);
		transition: color var(--duration-hover) ease;
	}
	.panel h3 a span {
		font-size: 0.7em;
		color: var(--color-primary-600);
		transition: transform var(--duration-hover) var(--ease-out);
	}
	.panel-tagline {
		margin: 0.4rem 0 1rem;
		font-size: 0.98rem;
		color: var(--color-primary-600);
	}
	.panel-blurb {
		margin: 0 0 1.5rem;
		font-size: 0.98rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
	}
	.panel-facts {
		margin: 0;
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
		font-size: 0.66rem;
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

	/* Centred: this is the closing statement about both products, not a
	   left-ruled column of its own, so it sits on the page's centre line. */
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
	.engine-lead strong {
		font-weight: 600;
		color: var(--color-primary-600);
	}
	.engine-link {
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
		.panel h3 a:hover {
			color: var(--color-primary-600);
		}
		.panel h3 a:hover span {
			transform: translateX(4px);
		}
		.engine-link:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
	}
	@media (min-width: 880px) {
		.panels {
			grid-template-columns: repeat(2, 1fr);
			gap: 0;
		}
		.panel + .panel {
			border-left: 1px solid var(--color-rule);
			padding-left: 3rem;
		}
		.panel:first-child {
			padding-right: 3rem;
		}
	}
</style>
