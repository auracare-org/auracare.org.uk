<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PLATFORM_NOTE } from '$lib/data/company';

	// Connector chips positioned around the orb (percentages within the square visual).
	const chips = [
		{ name: 'Apple Health', x: 50, y: 7 },
		{ name: 'Oura', x: 89, y: 27 },
		{ name: 'Whoop', x: 93, y: 64 },
		{ name: 'Dexcom', x: 60, y: 93 },
		{ name: 'Garmin', x: 15, y: 82 },
		{ name: 'Fitbit', x: 8, y: 38 }
	];
</script>

<section class="hero aura-space">
	<div class="hero-orbs" aria-hidden="true">
		<span
			class="bubble"
			style="--bubble-size:420px;--bubble-color:rgba(97,128,255,.35);--bubble-blur:20px; top:-8%; right:-6%"
		></span>
		<span
			class="bubble"
			style="--bubble-size:300px;--bubble-color:rgba(56,127,245,.28);--bubble-blur:14px; bottom:-10%; left:-4%"
		></span>
	</div>

	<div class="container-wide hero-grid">
		<div class="hero-copy">
			<span class="eyebrow" use:reveal>Agentic healthcare</span>
			<h1 use:reveal={{ delay: 60 }}>
				Agentic healthcare, built on your <span class="text-gradient-l">digital twin</span>.
			</h1>
			<p class="hero-sub" use:reveal={{ delay: 140 }}>
				Auracare turns your own health data into a living model of you — and a companion that acts
				on it. Our first product, <strong>Twin</strong>, ships in the coming months: the first step
				toward agentic clinical decision support.
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
				<defs>
					<radialGradient id="heroCore" cx="50%" cy="45%" r="55%">
						<stop offset="0%" stop-color="#ffffff" />
						<stop offset="55%" stop-color="#9fb3ff" />
						<stop offset="100%" stop-color="#2f4ec0" stop-opacity="0" />
					</radialGradient>
					<linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#6180ff" stop-opacity="0" />
						<stop offset="100%" stop-color="#8aa0ff" stop-opacity="0.9" />
					</linearGradient>
				</defs>

				<!-- flow lines from each connector to the centre -->
				{#each chips as c}
					<line
						x1={c.x}
						y1={c.y}
						x2="50"
						y2="50"
						stroke="url(#heroLine)"
						stroke-width="0.5"
						stroke-dasharray="2 3"
						class="flow-line"
					/>
				{/each}

				<!-- orbit rings -->
				<g class="orbit orbit-a">
					<ellipse
						cx="50"
						cy="50"
						rx="34"
						ry="34"
						fill="none"
						stroke="#aebfff"
						stroke-opacity="0.22"
						stroke-width="0.4"
					/>
				</g>
				<g class="orbit orbit-b">
					<ellipse
						cx="50"
						cy="50"
						rx="34"
						ry="13"
						fill="none"
						stroke="#cdd9ff"
						stroke-opacity="0.3"
						stroke-width="0.4"
						transform="rotate(-24 50 50)"
					/>
				</g>

				<circle cx="50" cy="50" r="24" fill="url(#heroCore)" class="core-glow" />
				<circle cx="50" cy="50" r="10" fill="#eaf0ff" />
				<circle
					cx="50"
					cy="50"
					r="10"
					fill="none"
					stroke="#ffffff"
					stroke-opacity="0.7"
					stroke-width="0.4"
				/>
			</svg>

			{#each chips as c, i}
				<span class="hero-chip" style="left:{c.x}%; top:{c.y}%; --i:{i}">{c.name}</span>
			{/each}

			<span class="hero-twin-label">your twin</span>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: calc(100svh - var(--header-h, 92px));
		display: flex;
		align-items: center;
		padding-block: clamp(3rem, 7vw, 6rem);
	}
	.hero-orbs {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.hero-orbs .bubble {
		animation: auraFloat 9s ease-in-out infinite;
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
		position: relative;
		z-index: 1;
	}
	.hero-copy h1 {
		font-size: clamp(2.4rem, 6vw, 4.2rem);
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 1.25rem;
	}
	.text-gradient-l {
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.hero-sub {
		font-size: clamp(1rem, 1.6vw, 1.18rem);
		line-height: 1.6;
		max-width: 34rem;
	}
	.hero-sub strong {
		color: #fff;
		font-weight: 600;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 1.75rem;
	}
	.cta-primary {
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 600;
		padding: 0.85rem 1.6rem;
		border-radius: 999px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.cta-primary:hover {
		color: var(--color-primary-800);
		transform: translateY(-2px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.32);
	}
	.cta-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: #eaf0ff;
		font-weight: 600;
		padding: 0.85rem 1.2rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}
	.cta-ghost:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}
	.hero-note {
		margin-top: 1.25rem;
		font-size: 0.8rem;
		color: rgba(226, 232, 255, 0.55) !important;
		max-width: 30rem;
	}

	/* Visual */
	.hero-visual {
		position: relative;
		width: 100%;
		max-width: 30rem;
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
	.core-glow {
		transform-origin: center;
		animation: pulseGlow 4s ease-in-out infinite;
	}
	.orbit {
		transform-origin: 50% 50%;
	}
	.orbit-a {
		animation: spinSlow 44s linear infinite;
	}
	.orbit-b {
		animation: spinSlow 30s linear infinite reverse;
	}
	.flow-line {
		animation: dashFlow 3.5s linear infinite;
	}
	.hero-chip {
		position: absolute;
		transform: translate(-50%, -50%);
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.16);
		backdrop-filter: blur(6px);
		color: #e8eeff;
		font-size: 0.72rem;
		font-weight: 500;
		padding: 0.28rem 0.6rem;
		border-radius: 999px;
		white-space: nowrap;
		animation: auraFloat 6s ease-in-out infinite;
		animation-delay: calc(var(--i) * -1.1s);
	}
	.hero-twin-label {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: var(--color-primary-900);
		font-family: var(--font-family-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		pointer-events: none;
	}

	@media (min-width: 900px) {
		.hero-grid {
			grid-template-columns: 1.05fr 0.95fr;
		}
	}
</style>
