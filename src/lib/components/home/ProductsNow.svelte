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

		<ol class="index">
			{#each products as product (product.key)}
				<li class="entry" use:reveal={{ delay: 60 }}>
					<div class="entry-body">
						<h3>
							<a href={product.href}>
								{product.name}
								<span aria-hidden="true">&rarr;</span>
							</a>
						</h3>
						<p class="entry-tagline">{product.tagline}</p>
						<p class="entry-blurb">{product.blurb}</p>
						<p class="entry-status">{product.statusLabel}</p>
					</div>
				</li>
			{/each}
		</ol>

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
		max-width: none;
		text-align: left;
	}

	.index {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}
	.entry {
		padding-block: clamp(2rem, 4vw, 3rem);
		border-bottom: 1px solid var(--color-rule);
	}
	.entry-status {
		margin: 1.25rem 0 0;
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.entry h3 {
		font-size: clamp(1.6rem, 3vw, 2.4rem);
		letter-spacing: -0.02em;
		margin: 0 0 0.4rem;
	}
	.entry h3 a {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5rem;
		color: var(--color-ink);
		transition: color var(--duration-hover) ease;
	}
	.entry h3 a span {
		font-size: 0.8em;
		color: var(--color-primary-600);
		transition: transform var(--duration-hover) var(--ease-out);
	}
	.entry-tagline {
		font-size: 0.95rem;
		color: var(--color-primary-600);
		margin: 0 0 0.75rem;
	}
	.entry-blurb {
		font-size: 0.98rem;
		line-height: 1.6;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 62ch;
	}

	/* The engine statement: wider measure, no rule above it, so it reads as a
	   conclusion rather than as a third row of the list. */
	.engine {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.25rem;
	}
	.engine-lead {
		font-size: clamp(1.05rem, 1.6vw, 1.3rem);
		line-height: 1.55;
		color: var(--color-ink);
		max-width: 60ch;
		margin: 0;
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
		.engine-link:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
		.entry h3 a:hover {
			color: var(--color-primary-600);
		}
		.entry h3 a:hover span {
			transform: translateX(4px);
		}
	}
</style>
