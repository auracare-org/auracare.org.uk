<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import LoopDial from '$lib/components/LoopDial.svelte';
	import { CARE_LOOP, CARE_LOOP_LINE } from '$lib/data/company';

	/* The loop, sixth time.
	 *
	 * Everything before this tried to make one element do both jobs: name the
	 * four stages *and* explain them, either strung round a ring or spread
	 * across a row. Both readings were fighting for the same space, which is
	 * why none of them worked at any geometry.
	 *
	 * They are split now. The left column explains, as an ordinary numbered
	 * list. The dial on the right does nothing but show the shape, so it can be
	 * small, quiet and instantly legible. The dial itself is shared with the
	 * reasoning loop on /technology.
	 */
	const stages = CARE_LOOP.map((s, i) => ({ ...s, n: i + 1 }));
</script>

<section class="loop section-y" aria-labelledby="loop-heading">
	<div class="container-wide loop-grid">
		<div class="loop-copy">
			<h2 id="loop-heading" use:reveal>One patient-centred care loop.</h2>
			<p class="lede" use:reveal={{ delay: 60 }}>
				Daily life goes in. A fuller history reaches your clinician. The plan comes back as habits
				you can keep, and the next appointment starts further ahead than the last.
			</p>

			<ol class="steps">
				{#each stages as stage (stage.n)}
					<li class="step" use:reveal={{ delay: 100 + stage.n * 60 }}>
						<span class="step-n">{stage.n}</span>
						<div class="step-text">
							<h3>
								{stage.name}
								<span class="step-actor"
									>{stage.actor === 'auracle' ? 'Auracle' : 'Auracare CDSS'}</span
								>
							</h3>
							<p>{stage.body}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>

		<!-- The shape, and nothing else. -->
		<div use:reveal={{ delay: 160 }}>
			<LoopDial labels={stages.map((s) => s.name)} centre={CARE_LOOP_LINE} />
		</div>
	</div>
</section>

<style>
	.loop {
		border-top: 1px solid var(--color-rule);
	}
	.loop-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(3rem, 6vw, 4.5rem);
		align-items: center;
	}

	/* Left-aligned on purpose: the heading lives inside a column wrapper, so
	   the site-wide centring rule for section intros never reaches it. */
	h2 {
		font-size: clamp(1.9rem, 3.4vw, 2.75rem);
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin: 0 0 1.25rem;
		max-width: 18ch;
	}
	.lede {
		font-size: clamp(1rem, 1.3vw, 1.1rem);
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 46ch;
		margin: 0;
	}

	.steps {
		list-style: none;
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding: 0;
	}
	.step {
		display: grid;
		grid-template-columns: 1.75rem minmax(0, 1fr);
		gap: 0.9rem;
		padding-block: 0.9rem;
	}
	.step + .step {
		border-top: 1px solid var(--color-rule);
	}
	.step-n {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 1px solid var(--color-rule-strong);
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-ink-faint);
	}
	.step h3 {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.6rem;
		font-size: 1rem;
		letter-spacing: -0.01em;
		margin: 0.15rem 0 0.3rem;
	}
	.step-actor {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.step p {
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 52ch;
	}

	@media (min-width: 900px) {
		.loop-grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
			gap: clamp(3rem, 6vw, 5rem);
		}
	}
</style>
