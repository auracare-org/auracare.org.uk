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
		<h2 use:reveal={{ delay: 60 }}>
			Two products, <span class="text-gradient">one patient model</span>.
		</h2>
		<p class="intro" use:reveal={{ delay: 120 }}>
			Auratwin puts a health digital twin in your messages. Auracare puts clinical decision support
			inside the consultation. Both draw on one shared model of the patient, and we’re upfront
			about where each one stands, so you always know what is real now and what is still ahead.
		</p>

		<div class="grid">
			{#each PRODUCTS as product, i (product.key)}
				<article class="glass-card card" use:reveal={{ delay: 140 + i * 120 }}>
					<div class="card-head">
						<div class="motif" aria-hidden="true">
							{#if product.key === 'auratwin'}
							<!-- twin figure -->
							<svg viewBox="0 0 48 48" fill="none">
								<circle cx="24" cy="10" r="5" fill="#2f4ec0" />
								<rect x="20.3" y="16.5" width="7.4" height="15" rx="3.7" fill="#2f4ec0" />
								<path d="M22.5 21 15 24.5" stroke="#2f4ec0" stroke-width="4.8" stroke-linecap="round" />
								<path d="M25.5 21 33 24.5" stroke="#2f4ec0" stroke-width="4.8" stroke-linecap="round" />
								<path d="M22.4 30 21 42" stroke="#2f4ec0" stroke-width="4.8" stroke-linecap="round" />
								<path d="M25.6 30 27 42" stroke="#2f4ec0" stroke-width="4.8" stroke-linecap="round" />
							</svg>
						{:else if product.key === 'auracare'}
							<!-- care heart + pulse -->
							<svg viewBox="0 0 48 48" fill="none">
								<path
									d="M24 36C24 36 11 27.5 11 19.5C11 15.6 13.9 13 17.2 13C20.1 13 22.6 15 24 17.2C25.4 15 27.9 13 30.8 13C34.1 13 37 15.6 37 19.5C37 27.5 24 36 24 36Z"
									fill="none"
									stroke="#2f4ec0"
									stroke-width="2.4"
									stroke-linejoin="round"
								/>
								<path
									d="M15.5 24h3.5l2.2-4.2 3 8.6 2.2-4.4h4.1"
									fill="none"
									stroke="#94abff"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
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

						<div class="card-heading">
							<span class="pill {pillClass[product.status]}">{product.statusLabel}</span>
							<h3>{product.name}</h3>
							<p class="tagline">{product.tagline}</p>
						</div>
					</div>

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
	.card-head {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
	}
	.card-heading {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.4rem;
		min-width: 0;
	}
	.motif {
		flex-shrink: 0;
		width: 3rem;
		height: 3rem;
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
