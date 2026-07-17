<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { PRODUCTS, type ProductStatus } from '$lib/data/company';

	const pillClass: Record<ProductStatus, string> = {
		live: 'pill-live',
		'ships-soon': 'pill-soon',
		'in-development': 'pill-dev'
	};
</script>

<section class="products section-y">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>What we're building now</span>
		<h2 use:reveal={{ delay: 60 }}>
			Three things, shipping on <span class="text-gradient">three horizons</span>.
		</h2>
		<p class="intro" use:reveal={{ delay: 120 }}>
			One product in your hands soon, one engine in active development, and one graph you can
			explore today. We name each honestly — so you always know what is real now and what is still
			ahead.
		</p>

		<div class="grid">
			{#each PRODUCTS as product, i (product.key)}
				<article class="glass-card card" use:reveal={{ delay: 140 + i * 120 }}>
					<div class="motif" aria-hidden="true">
						{#if product.key === 'twin'}
							<!-- twin core -->
							<svg viewBox="0 0 48 48" fill="none">
								<circle cx="24" cy="24" r="8" fill="#2f4ec0" />
								<circle cx="24" cy="24" r="13" stroke="#c0cdff" stroke-width="1.4" />
								<ellipse
									cx="24"
									cy="24"
									rx="20"
									ry="7.5"
									fill="none"
									stroke="#2f4ec0"
									stroke-width="1.4"
									stroke-dasharray="3 4"
									stroke-linecap="round"
									transform="rotate(-20 24 24)"
								/>
							</svg>
						{:else if product.key === 'reasoning'}
							<!-- loop glyph -->
							<svg viewBox="0 0 48 48" fill="none">
								<path
									d="M14 30a11 11 0 1 1 4 8"
									stroke="#2f4ec0"
									stroke-width="2.4"
									stroke-linecap="round"
								/>
								<path
									d="M18 30v9h9"
									stroke="#94abff"
									stroke-width="2.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<circle
									cx="24"
									cy="24"
									r="4.5"
									fill="#2f4ec0"
									fill-opacity="0.14"
									stroke="#2f4ec0"
									stroke-width="1.6"
								/>
							</svg>
						{:else}
							<!-- graph glyph -->
							<svg viewBox="0 0 48 48" fill="none">
								<path
									d="M14 16 24 24 34 12M24 24 20 36M24 24 36 32"
									stroke="#c0cdff"
									stroke-width="1.6"
									stroke-linecap="round"
								/>
								<circle cx="14" cy="16" r="3.4" fill="#94abff" />
								<circle cx="34" cy="12" r="3.4" fill="#2f4ec0" />
								<circle cx="24" cy="24" r="4.2" fill="#2f4ec0" />
								<circle cx="20" cy="36" r="3.2" fill="#94abff" />
								<circle cx="36" cy="32" r="3.2" fill="#2f4ec0" />
							</svg>
						{/if}
					</div>

					<span class="pill {pillClass[product.status]}">{product.statusLabel}</span>

					<h3>{product.name}</h3>
					<p class="tagline">{product.tagline}</p>
					<p class="blurb">{product.blurb}</p>

					{#if product.href}
						<a
							class="card-link"
							href={product.href}
							{...product.external ? { target: '_blank', rel: 'noopener' } : {}}
						>
							{#if product.external}
								Explore the graph <span aria-hidden="true">↗</span>
							{:else if product.status === 'live'}
								Explore <span aria-hidden="true">→</span>
							{:else}
								Learn more <span aria-hidden="true">→</span>
							{/if}
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.products {
		background: var(--color-neutral-0);
	}
	h2 {
		font-size: clamp(1.9rem, 4.5vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 0.9rem;
		max-width: 20ch;
	}
	.intro {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 46rem;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.25rem, 2.5vw, 1.75rem);
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		padding: clamp(1.5rem, 2.5vw, 2rem);
		border-radius: var(--radius-lg);
		height: 100%;
	}
	.motif {
		width: 3rem;
		height: 3rem;
		margin-bottom: 0.25rem;
	}
	.motif svg {
		width: 100%;
		height: 100%;
	}
	h3 {
		font-family: var(--font-family-heading);
		font-size: 1.35rem;
		letter-spacing: -0.01em;
	}
	.tagline {
		font-weight: 600;
		color: var(--color-primary-600);
		font-size: 0.98rem;
		margin-top: -0.35rem;
	}
	.blurb {
		color: var(--color-ink-soft);
		line-height: 1.6;
		font-size: 0.95rem;
	}
	.card-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: auto;
		padding-top: 0.5rem;
		color: var(--color-primary-600);
		font-weight: 600;
		font-size: 0.95rem;
		transition:
			gap 0.2s ease,
			color 0.2s ease;
	}
	.card-link:hover {
		gap: 0.65rem;
		color: var(--color-bg-button-primary-hover);
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
