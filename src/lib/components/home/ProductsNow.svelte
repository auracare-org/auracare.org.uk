<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { PRODUCTS } from '$lib/data/company';
</script>

<!--
  An index of what the company builds, not a row of feature cards.

  The previous version was three bordered cards with decorative icon motifs,
  which is the pattern every other site in the category uses. This states the
  same three things as numbered entries in a ruled list: the clinical product
  first, because that is what this company is.
-->
<section id="products" class="products section-y">
	<div class="container-wide">
		<div class="sec-head" use:reveal>
			<span class="index-num">02</span>
			<h2>Two products, one patient model.</h2>
		</div>

		<ol class="index">
			{#each PRODUCTS as product, i (product.key)}
				<li class="entry" use:reveal={{ delay: 60 + i * 60 }}>
					<div class="entry-meta">
						<span class="entry-num">{String(i + 1).padStart(2, '0')}</span>
						<span class="entry-status">{product.statusLabel}</span>
					</div>
					<div class="entry-body">
						<h3>
							{#if product.href}
								<a
									href={product.href}
									target={product.external ? '_blank' : undefined}
									rel={product.external ? 'noopener' : undefined}
								>
									{product.name}
									<span aria-hidden="true">{product.external ? '↗' : '→'}</span>
								</a>
							{:else}
								{product.name}
							{/if}
						</h3>
						<p class="entry-tagline">{product.tagline}</p>
						<p class="entry-blurb">{product.blurb}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.products {
		border-top: 1px solid var(--color-rule);
	}
	.sec-head {
		display: flex;
		align-items: baseline;
		gap: clamp(1rem, 3vw, 2.5rem);
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}
	.index-num {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		color: var(--color-primary-600);
		font-variant-numeric: tabular-nums;
		flex: none;
	}
	.sec-head h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.06;
		letter-spacing: -0.03em;
		margin: 0;
		max-width: 20ch;
	}

	.index {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}
	.entry {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		padding-block: clamp(1.75rem, 3.5vw, 2.5rem);
		border-bottom: 1px solid var(--color-rule);
	}
	.entry-meta {
		display: flex;
		align-items: baseline;
		gap: 1rem;
	}
	.entry-num {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		color: var(--color-primary-600);
		font-variant-numeric: tabular-nums;
	}
	.entry-status {
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.entry h3 {
		font-size: clamp(1.35rem, 2.4vw, 1.9rem);
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

	@media (hover: hover) and (pointer: fine) {
		.entry h3 a:hover {
			color: var(--color-primary-600);
		}
		.entry h3 a:hover span {
			transform: translateX(4px);
		}
	}
	@media (min-width: 860px) {
		.entry {
			grid-template-columns: 16rem minmax(0, 1fr);
			gap: 2.5rem;
		}
		.entry-meta {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
