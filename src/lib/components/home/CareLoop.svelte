<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CARE_LOOP, CARE_LOOP_LINE, CARE_LOOP_HANDOFFS } from '$lib/data/company';

	/* Four stages left to right, with a return path running back underneath.
	 *
	 * Four earlier versions tried to draw this as a shape — two SVG circles, a
	 * two-lane grid, a stroked ellipse with the stages on its cardinal points.
	 * All of them were geometrically correct and none of them read. The problem
	 * was never the maths, it was that a ring forces the eye to work out where
	 * to start. A row reads in the direction you already read, and one line
	 * turning back under it is enough to say "and then it goes round again".
	 */
	const stages = CARE_LOOP.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0') }));
</script>

<section class="loop section-y" aria-labelledby="loop-heading">
	<div class="container-wide">
		<h2 id="loop-heading" use:reveal>One patient-centred care loop.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			Daily life goes in. A fuller history reaches your clinician. The plan comes back as habits you
			can keep.
		</p>

		<div class="flow">
			<ol class="stages">
				{#each stages as stage, i (stage.n)}
					<li
						class="stage"
						data-actor={stage.actor}
						class:handoff-after={i === 0 || i === 2}
						use:reveal={{ delay: 120 + i * 90 }}
					>
						<span class="stage-n">{stage.n}</span>
						<h3>{stage.name}</h3>
						<p class="stage-title">{stage.title}</p>
						<p class="stage-body">{stage.body}</p>
						<span class="stage-actor"
							>{stage.actor === 'auracle' ? 'Auracle' : 'Auracare CDSS'}</span
						>
						{#if i === 0}
							<span class="handoff">{CARE_LOOP_HANDOFFS.toClinic}</span>
						{:else if i === 2}
							<span class="handoff">{CARE_LOOP_HANDOFFS.toLife}</span>
						{/if}
					</li>
				{/each}
			</ol>

			<!-- The line that makes it a loop: out of stage four, back under the
			     row, and up into stage one. -->
			<div class="return" use:reveal={{ delay: 420 }}>
				<span class="return-line" aria-hidden="true"></span>
				<span class="return-label">{CARE_LOOP_LINE}</span>
			</div>
		</div>
	</div>
</section>

<style>
	.loop {
		border-top: 1px solid var(--color-rule);
	}
	h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.1;
		letter-spacing: -0.03em;
		margin: 0 0 1.25rem;
	}
	.lede {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 52ch;
		margin: 0;
	}

	.flow {
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}

	/* Stacked first: a ruled sequence, which is what the row becomes on a
	   narrow screen and what it is without any layout at all. */
	.stages {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}
	.stage {
		position: relative;
		padding-block: 1.4rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.stage-n {
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-ink-faint);
	}
	.stage h3 {
		font-size: 1.3rem;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		margin: 0.2rem 0 0.35rem;
	}
	.stage-title {
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-ink);
		margin: 0 0 0.5rem;
		font-weight: 500;
	}
	.stage-body {
		font-size: 0.88rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		margin: 0;
	}
	.stage-actor {
		display: block;
		margin-top: 0.7rem;
		font-size: 0.64rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.stage[data-actor='auracare'] .stage-actor {
		color: var(--color-ink-faint);
	}
	/* The two places the loop changes hands. */
	.handoff {
		display: block;
		margin-top: 0.9rem;
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.handoff::before {
		content: '↓ ';
	}

	.return {
		margin-top: 1.5rem;
	}
	.return-line {
		display: none;
	}
	.return-label {
		display: block;
		font-size: 0.88rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
	}
	.return-label::before {
		content: '↻ ';
		color: var(--color-primary-600);
	}

	/* ---------------------------------------------------------------- */
	/* The row, and the line that turns it into a loop.                  */
	/* ---------------------------------------------------------------- */
	@media (min-width: 900px) {
		.stages {
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			border-top: 0;
			gap: 0;
		}
		.stage {
			padding: 1.4rem 1.5rem 1.6rem;
			border-bottom: 0;
			border-top: 2px solid var(--color-primary-600);
		}
		.stage[data-actor='auracare'] {
			border-top-color: var(--color-ink);
		}
		.stage + .stage {
			border-left: 1px solid var(--color-rule);
		}
		/* The step from one stage to the next, sat on the rule between them. */
		.stage + .stage::before {
			content: '';
			position: absolute;
			left: -0.3rem;
			top: 3.1rem;
			width: 0.5rem;
			height: 0.5rem;
			border-top: 2px solid var(--color-rule-strong);
			border-right: 2px solid var(--color-rule-strong);
			transform: rotate(45deg);
			background: var(--color-surface-page);
		}
		/* A handoff is a lane change, so its arrow is the brand blue and it
		   names itself underneath rather than inside the column. */
		.stage.handoff-after + .stage::before {
			border-color: var(--color-primary-600);
		}
		.handoff {
			position: absolute;
			right: 0;
			bottom: -2.4rem;
			transform: translateX(50%);
			margin: 0;
			width: max-content;
			max-width: 9rem;
			text-align: center;
			line-height: 1.4;
			background: var(--color-surface-page);
			padding: 0 0.5rem;
		}
		.handoff::before {
			content: none;
		}

		/* Out of stage four, back under the row, and up into stage one. Three
		   borders on one box: no arrows to place, no coordinates to keep in
		   sync with the columns above. */
		.return {
			position: relative;
			height: 5.5rem;
			/* An eighth of the row on each side puts the two uprights under the
			   centre of the first and last columns. */
			margin: 3.75rem 12.5% 0;
		}
		.return-line {
			display: block;
			position: absolute;
			inset: 0;
			border: 1px solid var(--color-rule-strong);
			border-top: 0;
		}
		/* The arrowhead, pointing back up into stage one. */
		.return-line::before {
			content: '';
			position: absolute;
			left: -0.3rem;
			top: -0.05rem;
			width: 0.5rem;
			height: 0.5rem;
			border-top: 2px solid var(--color-primary-600);
			border-left: 2px solid var(--color-primary-600);
			transform: rotate(45deg);
		}
		.return-label {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translate(-50%, 50%);
			width: max-content;
			max-width: 32ch;
			text-align: center;
			font-weight: 500;
			color: var(--color-ink);
			background: var(--color-surface-page);
			padding: 0 1rem;
		}
		.return-label::before {
			content: none;
		}
	}
</style>
