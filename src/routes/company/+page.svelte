<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import StoryTimeline from '$lib/components/home/StoryTimeline.svelte';
	import TeamRaise from '$lib/components/home/TeamRaise.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	const locationBlurb: Record<string, string> = {
		London: 'Where Auracare began, and where much of the engineering lives.',
		'Hong Kong': 'Operations and our first clinical market — the start of the evidence factory.',
		'San Francisco': 'Where we’re building relationships with frontier-health investors.'
	};
</script>

<Seo
	title="Company — the pivot, the mission, the team"
	description="How Auracare went from NHS data-aggregation to agentic healthcare on a personal digital twin — and the five-person team building it across London, Hong Kong and San Francisco."
	path="/company"
/>

<section class="chero aura-space">
	<div class="container-wide chero-inner">
		<span class="eyebrow" use:reveal>Our company</span>
		<h1 use:reveal={{ delay: 60 }}>
			We’re building the health system<br />that should already exist.
		</h1>
		<p use:reveal={{ delay: 130 }}>
			Auracare is building agentic clinical decision support grounded in a personal health digital
			twin. We got here the hard way — inside a public health system — and we kept everything we
			learned.
		</p>
	</div>
</section>

<StoryTimeline />

<section class="where section-y">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Where we are</span>
		<h2 use:reveal={{ delay: 60 }}>Three cities, one team.</h2>
		<div class="where-grid">
			{#each CONTACT.locations as city, i}
				<div class="glass-card where-card" use:reveal={{ delay: i * 90 }}>
					<span class="where-pin" aria-hidden="true">◈</span>
					<h3>{city}</h3>
					<p>{locationBlurb[city] ?? ''}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<TeamRaise />

<section class="careers-cta section-y">
	<div class="container-wide careers-inner">
		<div use:reveal>
			<h2>We’re hiring.</h2>
			<p>A small, founder-led team building real infrastructure — not a thin wrapper.</p>
		</div>
		<a class="careers-btn" href="/careers" use:reveal={{ delay: 80 }}>See open roles →</a>
	</div>
</section>

<style>
	.chero {
		padding-block: clamp(4rem, 10vw, 8rem) clamp(3rem, 7vw, 5rem);
	}
	.chero-inner {
		max-width: 46rem;
	}
	.chero h1 {
		font-size: clamp(2.2rem, 5.5vw, 4rem);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-block: 0.7rem 1.1rem;
	}
	.chero p {
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		max-width: 38rem;
	}

	.where h2 {
		font-size: clamp(1.6rem, 3.4vw, 2.5rem);
		margin-block: 0.5rem 2rem;
	}
	.where-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}
	.where-card {
		padding: 1.6rem;
	}
	.where-pin {
		color: var(--color-primary-500);
		font-size: 1.4rem;
	}
	.where-card h3 {
		font-size: 1.15rem;
		margin-block: 0.4rem 0.3rem;
	}

	.careers-cta {
		padding-block: clamp(2.5rem, 5vw, 4rem);
	}
	.careers-inner {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
		border-radius: var(--radius-4xl);
		padding: clamp(1.75rem, 4vw, 3rem);
	}
	.careers-inner h2 {
		color: #fff;
		font-size: clamp(1.5rem, 3vw, 2.2rem);
	}
	.careers-inner p {
		color: rgba(255, 255, 255, 0.85);
		margin-top: 0.4rem;
	}
	.careers-btn {
		flex: none;
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 600;
		padding: 0.85rem 1.6rem;
		border-radius: 999px;
		transition: transform 0.2s ease;
	}
	.careers-btn:hover {
		transform: translateY(-2px);
		color: var(--color-primary-800);
	}

	@media (min-width: 760px) {
		.where-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
