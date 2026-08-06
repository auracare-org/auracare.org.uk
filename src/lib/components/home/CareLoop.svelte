<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CARE_LOOP, CARE_LOOP_LINE } from '$lib/data/company';

	const actorLabel = { auratwin: 'Auratwin', auracare: 'Auracare' } as const;
</script>

<section class="loop section-y" aria-labelledby="loop-heading">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>How they work together</span>
		<h2 id="loop-heading" use:reveal={{ delay: 60 }}>
			One patient-centred <span class="text-gradient">care loop</span>.
		</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Daily life in, sharper decisions out, habits back in. The spin-out feeds the clinic; the
			clinic feeds the spin-out.
		</p>

		<ol class="steps">
			{#each CARE_LOOP as step, i (step.title)}
				<li
					class="step glass-card"
					class:step-twin={step.actor === 'auratwin'}
					use:reveal={{ delay: 80 + i * 60 }}
				>
					<div class="step-top">
						<span class="step-num">{String(i + 1).padStart(2, '0')}</span>
						<span class="step-actor">{actorLabel[step.actor]}</span>
					</div>
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</li>
			{/each}
		</ol>

		<p class="loop-line" use:reveal={{ delay: 160 }}>
			<span class="loop-glyph" aria-hidden="true">↺</span>
			{CARE_LOOP_LINE}
		</p>
	</div>
</section>

<style>
	.loop {
		background: var(--color-neutral-0);
		border-block: 1px solid var(--color-border-default);
	}
	h2 {
		font-size: clamp(1.9rem, 4.5vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 0.9rem;
		max-width: 20ch;
	}
	.lede {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 42rem;
	}

	.steps {
		list-style: none;
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		counter-reset: none;
	}
	.step {
		padding: 1.2rem 1.3rem;
		border-radius: var(--radius-lg);
	}
	.step-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.6rem;
	}
	.step-num {
		font-family: var(--font-family-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-ink-faint);
	}
	.step-actor {
		font-family: var(--font-family-mono);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-100);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
	}
	/* The spin-out's steps carry a soft tint so the handoff between the two
	   products reads at a glance. */
	.step-twin .step-actor {
		color: var(--color-ink-soft);
		background: var(--color-surface-alt);
		border-color: var(--color-border-default);
	}
	.step h3 {
		font-size: 1rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.3rem;
	}
	.step p {
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}

	.loop-line {
		margin-top: clamp(1.75rem, 3vw, 2.5rem);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		text-align: center;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-primary-600);
	}
	.loop-glyph {
		font-size: 1.15rem;
		line-height: 1;
	}

	@media (min-width: 640px) {
		.steps {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1000px) {
		.steps {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
