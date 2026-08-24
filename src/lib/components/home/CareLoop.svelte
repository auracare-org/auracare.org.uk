<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CARE_LOOP, CARE_LOOP_LINE } from '$lib/data/company';

	/* Two lanes, one per product, with the step numbers running 1 to 8 across
	   them. Auracle holds the start and the end; the CDSS holds the middle. The
	   column each step occupies is its position in the loop, so the handoffs
	   are the two places the flow changes lane. */
	const steps = CARE_LOOP.map((s, i) => ({ ...s, n: i + 1 }));
	const lanes = [
		{ key: 'auracle' as const, label: 'Auracle', sub: 'Between appointments' },
		{ key: 'auracare' as const, label: 'Auracare CDSS', sub: 'Inside the consultation' }
	];
</script>

<section class="loop section-y" aria-labelledby="loop-heading">
	<div class="container-wide">
		<h2 id="loop-heading" use:reveal>One patient-centred care loop.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			Daily life goes in. A fuller history reaches your clinician. The plan comes back as habits you
			can keep.
		</p>

		<!-- CSS grid rather than SVG: the lane is the row, the position in the
		     loop is the column, so the shape falls out of the data instead of
		     being drawn with coordinates that have to be kept in sync. -->
		<div class="lanes" use:reveal={{ delay: 100 }}>
			{#each lanes as lane (lane.key)}
				<div class="lane-head" data-lane={lane.key}>
					<span class="lane-name">{lane.label}</span>
					<span class="lane-sub">{lane.sub}</span>
				</div>
				<ol class="lane-track" data-lane={lane.key}>
					{#each steps.filter((s) => s.actor === lane.key) as step (step.n)}
						<li class="step" style="--col:{step.n}">
							<span class="step-n">{String(step.n).padStart(2, '0')}</span>
							<h3>{step.title}</h3>
							<p>{step.body}</p>
						</li>
					{/each}
				</ol>
			{/each}
			<p class="lane-return" aria-hidden="true">
				<span class="return-glyph">&#8630;</span> Step 08 returns to step 01
			</p>
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

	.lanes {
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	.lane-head {
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-ink);
	}
	.lane-head[data-lane='auracare'] {
		margin-top: 2.5rem;
	}
	.lane-name {
		font-size: 0.74rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.lane-sub {
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}

	.lane-track {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.step {
		padding-block: 1.15rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.step-n {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--color-ink-faint);
		font-variant-numeric: tabular-nums;
		margin-bottom: 0.35rem;
	}
	.step h3 {
		font-size: 0.98rem;
		letter-spacing: -0.01em;
		margin: 0 0 0.25rem;
	}
	.step p {
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--color-ink-soft);
		margin: 0;
	}

	.lane-return {
		margin: 1.25rem 0 0;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.return-glyph {
		font-size: 1rem;
	}

	.loop-close {
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-ink);
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		font-weight: 500;
		color: var(--color-ink);
	}

	/* The flow proper. Eight columns, one per step: a step sits in the column
	   matching its position in the loop, so the two lane changes read as the
	   handoffs they are, and the empty cells are the other product waiting. */
	@media (min-width: 1000px) {
		.lanes {
			display: grid;
			grid-template-columns: 11rem repeat(8, minmax(0, 1fr));
			align-items: start;
			column-gap: 0.75rem;
		}
		.lane-head {
			grid-column: 1;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.2rem;
			border-bottom: 0;
			padding-right: 1.5rem;
			padding-bottom: 0;
			align-self: center;
		}
		.lane-head[data-lane='auracle'] {
			grid-row: 1;
		}
		.lane-head[data-lane='auracare'] {
			grid-row: 2;
			margin-top: 0;
		}
		.lane-track {
			display: contents;
		}
		.lane-track[data-lane='auracle'] .step {
			grid-row: 1;
		}
		.lane-track[data-lane='auracare'] .step {
			grid-row: 2;
		}
		.step {
			grid-column: calc(var(--col) + 1);
			padding: 1rem 0.9rem 1.25rem;
			border-bottom: 0;
			border-top: 2px solid var(--color-primary-600);
			background: var(--color-surface-raised);
		}
		/* The lane the CDSS occupies is tinted so the two rows read as two
		   different places rather than as one long list wrapped. */
		.lane-track[data-lane='auracare'] .step {
			border-top-color: var(--color-ink);
		}
		.lane-return {
			grid-column: 2 / -1;
			grid-row: 3;
			text-align: right;
			margin-top: 1rem;
		}
	}
</style>
