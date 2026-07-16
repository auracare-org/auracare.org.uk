<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PLATFORM_NOTE } from '$lib/data/company';

	// Connector chips positioned around the core (percentages within the square visual).
	const chips = [
		{ name: 'Apple Health', x: 50, y: 7 },
		{ name: 'Oura', x: 89, y: 27 },
		{ name: 'Whoop', x: 93, y: 64 },
		{ name: 'Dexcom', x: 60, y: 93 },
		{ name: 'Garmin', x: 15, y: 82 },
		{ name: 'Fitbit', x: 8, y: 38 }
	];
</script>

<section class="hero">
	<div class="container-wide hero-grid">
		<div class="hero-copy">
			<span class="eyebrow" use:reveal>Agentic healthcare</span>
			<h1 use:reveal={{ delay: 60 }}>
				Agentic healthcare, built on your <em>digital twin</em>.
			</h1>
			<p class="hero-sub" use:reveal={{ delay: 140 }}>
				Auracare turns your own health data into a living model of you. Our first product,
				<strong>Twin</strong>, is a wellness companion that acts on it — and the first step toward
				the agentic clinical decision support we’re building. Shipping in the coming months.
			</p>
			<div class="hero-cta" use:reveal={{ delay: 220 }}>
				<a class="cta-primary" href="/#waitlist">Join the waitlist</a>
				<a
					class="cta-ghost"
					href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Seed%20round"
				>
					We’re raising a Seed round <span aria-hidden="true">→</span>
				</a>
			</div>
			<p class="hero-note" use:reveal={{ delay: 280 }}>{PLATFORM_NOTE}</p>
		</div>

		<div class="hero-visual" use:reveal={{ delay: 120 }} aria-hidden="true">
			<svg class="hero-orbits" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
				<!-- flow lines from each connector to the centre -->
				{#each chips as c}
					<line
						x1={c.x}
						y1={c.y}
						x2="50"
						y2="50"
						stroke="#c6cbdc"
						stroke-width="0.35"
						stroke-dasharray="1.5 2.5"
						class="flow-line"
					/>
				{/each}

				<!-- concentric hairline rings -->
				<circle cx="50" cy="50" r="34" fill="none" stroke="#dcdfe9" stroke-width="0.3" />
				<circle cx="50" cy="50" r="24" fill="none" stroke="#e4e7ef" stroke-width="0.3" />
				<g class="orbit orbit-a">
					<circle
						cx="50"
						cy="50"
						r="34"
						fill="none"
						stroke="#2f4ec0"
						stroke-width="0.4"
						stroke-dasharray="4 208"
						stroke-linecap="round"
					/>
				</g>

				<!-- core -->
				<circle cx="50" cy="50" r="11.5" fill="#ffffff" stroke="#dcdfe9" stroke-width="0.3" />
				<circle cx="50" cy="50" r="9.5" fill="#2f4ec0" />
			</svg>

			{#each chips as c}
				<span class="hero-chip" style="left:{c.x}%; top:{c.y}%">{c.name}</span>
			{/each}

			<span class="hero-twin-label">your twin</span>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: calc(92svh - var(--header-h, 92px));
		display: flex;
		align-items: center;
		padding-block: clamp(3.5rem, 7vw, 6.5rem);
		background: var(--color-surface-page);
		border-bottom: 1px solid var(--color-border-default);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 5vw, 4.5rem);
		align-items: center;
	}
	.hero-copy h1 {
		font-size: clamp(2.6rem, 5.8vw, 4.4rem);
		line-height: 1.02;
		letter-spacing: -0.035em;
		font-weight: 600;
		margin-block: 1rem 1.4rem;
		max-width: 13ch;
	}
	.hero-copy h1 em {
		font-style: normal;
		color: var(--color-primary-600);
	}
	.hero-sub {
		font-size: clamp(1rem, 1.5vw, 1.14rem);
		line-height: 1.65;
		max-width: 33rem;
		color: var(--color-ink-soft);
	}
	.hero-sub strong {
		color: var(--color-ink);
		font-weight: 600;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.1rem;
		margin-top: 2rem;
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		background: var(--color-primary-600);
		color: #fff;
		font-weight: 500;
		font-size: 0.98rem;
		padding: 0.8rem 1.5rem;
		border-radius: 10px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			var(--shadow-xs);
		transition: background 0.15s ease;
	}
	.cta-primary:hover {
		background: var(--color-primary-700);
		color: #fff;
	}
	.cta-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--color-ink);
		font-weight: 500;
		font-size: 0.98rem;
		transition: color 0.15s ease;
	}
	.cta-ghost span {
		transition: transform 0.2s ease;
	}
	.cta-ghost:hover {
		color: var(--color-primary-600);
	}
	.cta-ghost:hover span {
		transform: translateX(3px);
	}
	.hero-note {
		margin-top: 1.5rem;
		font-size: 0.8rem;
		color: var(--color-ink-faint);
		max-width: 30rem;
	}

	/* Visual — flat technical diagram */
	.hero-visual {
		position: relative;
		width: 100%;
		max-width: 28rem;
		margin-inline: auto;
		aspect-ratio: 1;
	}
	.hero-orbits {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.orbit {
		transform-origin: 50% 50%;
	}
	.orbit-a {
		animation: spinSlow 24s linear infinite;
	}
	.flow-line {
		animation: dashFlow 90s linear infinite;
	}
	.hero-chip {
		position: absolute;
		transform: translate(-50%, -50%);
		background: #fff;
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
		color: var(--color-ink);
		font-size: 0.74rem;
		font-weight: 500;
		padding: 0.32rem 0.65rem;
		border-radius: 999px;
		white-space: nowrap;
	}
	.hero-twin-label {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-family: var(--font-family-mono);
		font-size: 0.62rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		pointer-events: none;
	}

	@media (min-width: 900px) {
		.hero-grid {
			grid-template-columns: 1.05fr 0.95fr;
		}
	}
</style>
