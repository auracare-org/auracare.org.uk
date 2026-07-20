<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import {
		AURACARE_INTRO,
		AURACARE_INPUTS,
		AURACARE_OUTPUTS,
		AURACARE_HW_USP,
		HARDWARE,
		HARDWARE_MORE,
		HARDWARE_NOTE,
		REGULATORY_NOTE
	} from '$lib/data/company';
</script>

<section class="auracare aura-space section-y" aria-labelledby="auracare-heading">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>The clinical product</span>
		<h2 id="auracare-heading" use:reveal={{ delay: 60 }}>
			Meet Auracare. The twin <span class="text-gradient-l">comes with you to the appointment</span>.
		</h2>
		<p class="lead" use:reveal={{ delay: 120 }}>{AURACARE_INTRO}</p>

		<div class="flow" use:reveal={{ delay: 160 }}>
			<div class="flow-col">
				<span class="flow-label">Every input, automatic</span>
				<ul>
					{#each AURACARE_INPUTS as stage (stage.title)}
						<li class="tile">
							<h3>{stage.title}</h3>
							<p>{stage.body}</p>
						</li>
					{/each}
				</ul>
			</div>

			<div class="flow-core" aria-hidden="true">
				<span class="core-glyph">
					<svg viewBox="0 0 48 48" fill="none">
						<path
							d="M17.4 19.4 22.2 30M30.5 17.6 26 30M18.2 16.4 29.6 15.2"
							stroke="currentColor"
							stroke-width="2.4"
							stroke-linecap="round"
						/>
						<circle cx="15" cy="17" r="3.4" stroke="currentColor" stroke-width="2.6" />
						<circle cx="33" cy="15" r="3.4" stroke="currentColor" stroke-width="2.6" />
						<circle cx="24" cy="33" r="3.4" stroke="currentColor" stroke-width="2.6" />
					</svg>
				</span>
				<span class="core-name">Reasoning core</span>
				<p>Thinks over everything, systematically, with safety rails present at every step.</p>
			</div>

			<div class="flow-col">
				<span class="flow-label">Every output, tailored</span>
				<ul>
					{#each AURACARE_OUTPUTS as stage (stage.title)}
						<li class="tile">
							<h3>{stage.title}</h3>
							<p>{stage.body}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="hardware" use:reveal={{ delay: 120 }}>
			<div class="hw-head">
				<h3>Our own hardware, straight into the core.</h3>
				<p class="hw-usp">{AURACARE_HW_USP}</p>
			</div>
			<ul class="hw-grid">
				{#each HARDWARE as device (device.name)}
					<li class="tile">
						<h4>{device.name}</h4>
						<p>{device.note}</p>
					</li>
				{/each}
			</ul>
			<p class="hw-more">{HARDWARE_MORE}</p>
			<p class="hw-note">{HARDWARE_NOTE}</p>
		</div>

		<p class="reg-note" use:reveal>{REGULATORY_NOTE}</p>
	</div>
</section>

<style>
	.auracare {
		border-block: 1px solid var(--color-border-dark);
	}
	.eyebrow {
		color: var(--color-primary-300);
	}
	h2 {
		font-size: clamp(1.9rem, 4.2vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 1.1rem;
		max-width: 20ch;
		color: #fff;
	}
	.text-gradient-l {
		color: var(--color-primary-300);
	}
	.lead {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.65;
		max-width: 44rem;
		color: var(--color-white-alpha-80, rgba(226, 232, 255, 0.82));
	}

	/* Flow: inputs -> core -> outputs */
	.flow {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		align-items: center;
	}
	.flow-col ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}
	.flow-label {
		display: block;
		font-family: var(--font-family-mono);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-primary-300);
		margin-bottom: 0.85rem;
	}

	.tile {
		background: rgba(15, 18, 30, 0.85);
		backdrop-filter: blur(8px);
		border: 1px solid var(--color-border-dark);
		border-radius: var(--radius-lg);
		padding: 1.1rem 1.25rem;
	}
	.tile h3,
	.tile h4 {
		font-size: 1rem;
		letter-spacing: -0.01em;
		color: #fff;
		margin-bottom: 0.3rem;
	}
	.tile p {
		font-size: 0.88rem;
		line-height: 1.55;
		color: rgba(226, 232, 255, 0.72);
	}

	.flow-core {
		text-align: center;
		padding: 1.4rem 1.25rem;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
		border: 1px solid var(--color-primary-400);
	}
	.core-glyph {
		display: inline-flex;
		width: 2.75rem;
		height: 2.75rem;
		color: #fff;
	}
	.core-glyph svg {
		width: 100%;
		height: 100%;
	}
	.core-name {
		display: block;
		font-family: var(--font-family-heading);
		font-weight: 600;
		font-size: 1.1rem;
		color: #fff;
		margin-top: 0.35rem;
	}
	.flow-core p {
		margin-top: 0.4rem;
		font-size: 0.85rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.85);
	}

	/* Hardware */
	.hardware {
		margin-top: clamp(2.5rem, 5vw, 3.75rem);
		padding-top: clamp(2rem, 4vw, 2.75rem);
		border-top: 1px solid var(--color-border-dark);
	}
	.hw-head {
		max-width: 46rem;
	}
	.hw-head h3 {
		font-size: clamp(1.3rem, 2.4vw, 1.8rem);
		letter-spacing: -0.01em;
		color: #fff;
	}
	.hw-usp {
		margin-top: 0.6rem;
		font-size: 0.98rem;
		line-height: 1.6;
		color: rgba(226, 232, 255, 0.82);
	}
	.hw-grid {
		list-style: none;
		margin: clamp(1.5rem, 3vw, 2rem) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	.hw-more {
		margin-top: 1.25rem;
		font-size: 0.95rem;
		line-height: 1.6;
		font-weight: 500;
		color: var(--color-primary-300);
		max-width: 52rem;
	}
	.hw-note {
		margin-top: 1.5rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: rgba(226, 232, 255, 0.7);
		max-width: 52rem;
	}

	.reg-note {
		margin-top: clamp(2rem, 4vw, 3rem);
		font-size: 0.82rem;
		line-height: 1.6;
		color: rgba(226, 232, 255, 0.55);
		max-width: 52rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	@media (min-width: 860px) {
		.flow {
			grid-template-columns: 1fr 0.82fr 1fr;
			gap: 1.5rem;
		}
		.hw-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
