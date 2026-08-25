<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CARE_LOOP, CARE_LOOP_LINE } from '$lib/data/company';

	/* The loop, sixth time.
	 *
	 * Everything before this tried to make one element do both jobs: name the
	 * four stages *and* explain them, either strung round a ring or spread
	 * across a row. Both readings were fighting for the same space, which is
	 * why none of them worked at any geometry.
	 *
	 * They are split now. The left column explains, as an ordinary numbered
	 * list. The dial on the right does nothing but show the shape — four words
	 * on a circle — so it can be small, quiet and instantly legible. The dial
	 * is decorative and mirrors the list exactly, so it is hidden from
	 * assistive tech rather than read out twice.
	 */
	const stages = CARE_LOOP.map((s, i) => ({ ...s, n: i + 1 }));

	/* Placed against the dial box as percentages: the four nodes on the
	   cardinal points, the four arrowheads on the diagonals at 50% ± 35.36%,
	   which is cos45 of the radius. */
	const positions = ['top', 'right', 'bottom', 'left'] as const;
	const arrows = [
		{ key: 'tr', x: 'calc(50% + 35.36%)', y: 'calc(50% - 35.36%)', rot: 135 },
		{ key: 'br', x: 'calc(50% + 35.36%)', y: 'calc(50% + 35.36%)', rot: 225 },
		{ key: 'bl', x: 'calc(50% - 35.36%)', y: 'calc(50% + 35.36%)', rot: 315 },
		{ key: 'tl', x: 'calc(50% - 35.36%)', y: 'calc(50% - 35.36%)', rot: 45 }
	];
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
		<div class="dial-wrap" use:reveal={{ delay: 160 }}>
			<div class="dial" aria-hidden="true">
				<svg class="dial-ring" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50" vector-effect="non-scaling-stroke" />
				</svg>

				{#each stages as stage, i (stage.n)}
					<span class="dial-node" data-pos={positions[i]} class:is-start={i === 0}>
						{stage.name}
					</span>
				{/each}

				{#each arrows as arrow (arrow.key)}
					<span class="dial-arrow" style="--x:{arrow.x}; --y:{arrow.y}; --rot:{arrow.rot}deg"
					></span>
				{/each}

				<span class="dial-centre">{CARE_LOOP_LINE}</span>
			</div>
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
		line-height: 1.08;
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
		font-size: 0.6rem;
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

	/* ---------------------------------------------------------------- */
	/* The dial.                                                         */
	/*                                                                   */
	/* A square box whose edge midpoints are the circle's cardinal       */
	/* points. The nodes sit on those, so half of each node hangs        */
	/* outside the box: the width subtracts a whole node so the overhang */
	/* always has somewhere to go, and the wrapper's padding does the    */
	/* same vertically.                                                  */
	/* ---------------------------------------------------------------- */
	.dial-wrap {
		display: grid;
		place-items: center;
		padding-block: calc(var(--node) / 2);
		--node: 7.5rem;
	}
	.dial {
		position: relative;
		width: min(20rem, calc(100% - var(--node)));
		aspect-ratio: 1;
	}
	.dial-ring {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.dial-ring circle {
		fill: none;
		stroke: var(--color-rule-strong);
		stroke-width: 1;
		stroke-dasharray: 4 5;
	}

	.dial-node {
		position: absolute;
		display: grid;
		place-items: center;
		width: var(--node);
		height: var(--node);
		border-radius: 999px;
		border: 1px solid var(--color-rule-strong);
		background: var(--color-surface-page);
		transform: translate(-50%, -50%);
		font-size: 0.92rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--color-ink);
	}
	/* Where the loop starts, so the eye has somewhere to enter the circle. */
	.dial-node.is-start {
		background: var(--color-ink);
		border-color: var(--color-ink);
		color: var(--color-surface-page);
	}
	.dial-node[data-pos='top'] {
		left: 50%;
		top: 0;
	}
	.dial-node[data-pos='right'] {
		left: 100%;
		top: 50%;
	}
	.dial-node[data-pos='bottom'] {
		left: 50%;
		top: 100%;
	}
	.dial-node[data-pos='left'] {
		left: 0;
		top: 50%;
	}

	/* Solid triangles on the ring, pointing the way round. Drawn from borders
	   so they need no glyph and no icon file. */
	.dial-arrow {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: 0;
		height: 0;
		border-left: 0.3rem solid transparent;
		border-right: 0.3rem solid transparent;
		border-bottom: 0.5rem solid var(--color-rule-strong);
		transform: translate(-50%, -50%) rotate(var(--rot));
	}

	.dial-centre {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 11rem;
		text-align: center;
		font-size: 0.82rem;
		line-height: 1.6;
		color: var(--color-ink-faint);
	}

	@media (min-width: 900px) {
		.loop-grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
			gap: clamp(3rem, 6vw, 5rem);
		}
		.dial-wrap {
			--node: 8.5rem;
		}
		.dial {
			width: min(22rem, calc(100% - var(--node)));
		}
		.dial-node {
			font-size: 1rem;
		}
	}
</style>
