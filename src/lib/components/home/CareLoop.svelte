<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CARE_LOOP, CARE_LOOP_LINE } from '$lib/data/company';

	const actorLabel = { auracle: 'Auracle', auracare: 'Auracare CDSS' } as const;

	/* The loop has two halves: what happens between appointments, and what
	   happens inside one. Grouping by actor shows the handoff, which the old
	   snake-of-arrows layout only implied. */
	const halves = [
		{
			side: 'Between appointments',
			owner: 'auracle' as const,
			steps: CARE_LOOP.map((s, i) => ({ ...s, n: i + 1 })).filter((s) => s.actor === 'auracle')
		},
		{
			side: 'Inside the consultation',
			owner: 'auracare' as const,
			steps: CARE_LOOP.map((s, i) => ({ ...s, n: i + 1 })).filter((s) => s.actor === 'auracare')
		}
	];
</script>

<section class="loop section-y" aria-labelledby="loop-heading">
	<div class="container-wide">
		<h2 id="loop-heading" use:reveal>One patient-centred care loop.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			Daily life goes in. A fuller history reaches your clinician. The plan comes back as habits you
			can keep.
		</p>

		<div class="halves">
			{#each halves as half (half.owner)}
				<div class="half">
					<div class="half-head" use:reveal>
						<span class="half-side">{half.side}</span>
						<span class="half-owner">{actorLabel[half.owner]}</span>
					</div>
					<ol class="steps">
						{#each half.steps as step (step.title)}
							<li class="step" use:reveal={{ delay: 40 }}>
								<span class="step-num">{String(step.n).padStart(2, '0')}</span>
								<div>
									<h3>{step.title}</h3>
									<p>{step.body}</p>
								</div>
							</li>
						{/each}
					</ol>
				</div>
			{/each}
		</div>

		<p class="loop-close" use:reveal>{CARE_LOOP_LINE}</p>
	</div>
</section>

<style>
	.loop {
		border-top: 1px solid var(--color-rule);
	}
	h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.06;
		letter-spacing: -0.03em;
		margin: 0 0 1.25rem;
	}
	.lede {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 52ch;
		margin: 0;
	}

	.halves {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 5vw, 4rem);
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	.half-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--color-ink);
	}
	.half-side {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink);
	}
	.half-owner {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}

	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.step {
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr);
		gap: 1rem;
		padding-block: 1.15rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.step-num {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-ink-faint);
		font-variant-numeric: tabular-nums;
		padding-top: 0.2rem;
	}
	.step h3 {
		font-size: 1rem;
		letter-spacing: -0.01em;
		margin: 0 0 0.25rem;
	}
	.step p {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
		margin: 0;
	}

	.loop-close {
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-ink);
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		font-weight: 500;
		color: var(--color-ink);
	}

	@media (min-width: 900px) {
		.halves {
			grid-template-columns: repeat(2, 1fr);
			gap: 3.5rem;
		}
	}
</style>
