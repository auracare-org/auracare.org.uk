<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CARE_LOOP, CARE_LOOP_LINE, CARE_LOOP_HANDOFFS } from '$lib/data/company';

	/* Four stages on a real ellipse.
	 *
	 * The previous attempts all failed the same way: they drew the connective
	 * tissue by hand, either as SVG arcs with computed coordinates or as elbows
	 * built from borders on grid cells, and then had to fight the type for
	 * space. Here one ellipse is stroked across the whole block and the four
	 * nodes are placed on its cardinal points by a 3x3 grid. Because the nodes
	 * carry the page background, the ellipse passes behind them and the ring
	 * reads as continuous without a single coordinate being written down.
	 */
	const stages = CARE_LOOP.map((s, i) => ({
		...s,
		n: String(i + 1).padStart(2, '0'),
		pos: (['top', 'right', 'bottom', 'left'] as const)[i]
	}));

	/* The diagonals, where the ellipse is travelling fastest and where the two
	   handoffs between the products happen. */
	const corners = [
		{ key: 'tr', label: CARE_LOOP_HANDOFFS.toClinic, rot: 90 },
		{ key: 'br', label: '', rot: 180 },
		{ key: 'bl', label: CARE_LOOP_HANDOFFS.toLife, rot: 270 },
		{ key: 'tl', label: '', rot: 0 }
	];
</script>

<section class="loop section-y" aria-labelledby="loop-heading">
	<div class="container-wide">
		<h2 id="loop-heading" use:reveal>One patient-centred care loop.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			Daily life goes in. A fuller history reaches your clinician. The plan comes back as habits you
			can keep.
		</p>

		<div class="ring" use:reveal={{ delay: 100 }}>
			<!-- The ring itself. preserveAspectRatio="none" stretches the circle
			     to the block, so it passes exactly through the mid-point of each
			     edge, which is where the four nodes sit. -->
			<svg class="ring-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
				<circle cx="50" cy="50" r="50" vector-effect="non-scaling-stroke" />
			</svg>

			{#each stages as stage (stage.n)}
				<article class="node" data-pos={stage.pos} data-actor={stage.actor}>
					<span class="node-n">{stage.n}</span>
					<h3>{stage.name}</h3>
					<p>{stage.title}</p>
					<span class="node-actor">{stage.actor === 'auracle' ? 'Auracle' : 'Auracare CDSS'}</span>
				</article>
			{/each}

			{#each corners as corner (corner.key)}
				<div class="corner" data-corner={corner.key} aria-hidden="true">
					<span class="arrow" style="--rot:{corner.rot}deg"></span>
					{#if corner.label}<span class="handoff">{corner.label}</span>{/if}
				</div>
			{/each}

			<p class="hub">{CARE_LOOP_LINE}</p>
		</div>

		<!-- The detail the nodes deliberately no longer carry. Eight steps in
		     four boxes made the ring unreadable; they belong under it. -->
		<ol class="detail" use:reveal>
			{#each stages as stage (stage.n)}
				<li>
					<span class="detail-n">{stage.n}</span>
					<div>
						<h4>{stage.title}</h4>
						<p>{stage.body}</p>
					</div>
				</li>
			{/each}
		</ol>
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

	/* ---------------------------------------------------------------- */
	/* Stacked first: four numbered nodes in sequence. This is what the  */
	/* ring degrades to below 1000px and without any layout at all.      */
	/* ---------------------------------------------------------------- */
	.ring {
		position: relative;
		margin-top: clamp(2.5rem, 5vw, 4rem);
		border-top: 1px solid var(--color-ink);
	}
	.ring-path,
	.corner {
		display: none;
	}
	.node {
		padding-block: 1.25rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.node-n {
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-ink-faint);
	}
	.node h3 {
		font-size: 1.35rem;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		margin: 0.2rem 0 0.3rem;
	}
	.node p {
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
		margin: 0;
	}
	.node-actor {
		display: block;
		margin-top: 0.5rem;
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}
	.node[data-actor='auracare'] .node-actor {
		color: var(--color-ink-faint);
	}

	.hub {
		margin: 1.5rem 0 0;
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		font-weight: 500;
		line-height: 1.6;
		color: var(--color-ink);
	}

	/* The eight original steps, as a plain ruled list under the diagram. */
	.detail {
		list-style: none;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}
	.detail li {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 1rem;
		padding-block: 1.1rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.detail-n {
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-ink-faint);
		padding-top: 0.2rem;
	}
	.detail h4 {
		font-size: 0.98rem;
		letter-spacing: -0.01em;
		margin: 0 0 0.2rem;
	}
	.detail p {
		font-size: 0.9rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 68ch;
	}

	/* ---------------------------------------------------------------- */
	/* The ring.                                                         */
	/* ---------------------------------------------------------------- */
	@media (min-width: 1000px) {
		/* The ellipse box. Everything on the ring is placed against it as a
		   percentage, so nothing is a magic pixel: the four nodes sit on the
		   cardinal points (0/50/100%), the four arrows on the diagonals at
		   50% ± 35.36% (that is cos45 of the semi-axis), and the ellipse itself
		   spans the box exactly. The width leaves one node-width of room so a
		   node hanging half outside never leaves the container. */
		.ring {
			--node-w: 17rem;
			--diag: 35.36%;
			position: relative;
			width: min(56rem, calc(100% - var(--node-w)));
			aspect-ratio: 1.75;
			/* Half a node hangs above the top edge and below the bottom one, so
			   both margins clear it before the list underneath starts. */
			margin: calc(4.5rem + clamp(2rem, 4vw, 3rem)) auto calc(4.5rem + clamp(2rem, 4vw, 3rem));
			border-top: 0;
		}

		.ring-path {
			display: block;
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			overflow: visible;
		}
		.ring-path circle {
			fill: none;
			stroke: var(--color-rule-strong);
			stroke-width: 1;
		}

		.node {
			position: absolute;
			z-index: 1;
			width: var(--node-w);
			padding: 0.9rem 1.1rem 1rem;
			border-bottom: 0;
			border-top: 2px solid var(--color-primary-600);
			/* Opaque, so the ellipse passes behind it rather than through it. */
			background: var(--color-surface-page);
			text-align: center;
			transform: translate(-50%, -50%);
		}
		.node[data-actor='auracare'] {
			border-top-color: var(--color-ink);
		}
		.node[data-pos='top'] {
			left: 50%;
			top: 0;
		}
		.node[data-pos='right'] {
			left: 100%;
			top: 50%;
		}
		.node[data-pos='bottom'] {
			left: 50%;
			top: 100%;
		}
		.node[data-pos='left'] {
			left: 0;
			top: 50%;
		}
		.node h3 {
			font-size: 1.15rem;
		}
		.node p {
			font-size: 0.85rem;
			line-height: 1.55;
		}

		/* Direction of travel, sat on the ellipse at each diagonal. */
		.corner {
			display: block;
			position: absolute;
			z-index: 1;
		}
		.corner[data-corner='tl'] {
			left: calc(50% - var(--diag));
			top: calc(50% - var(--diag));
		}
		.corner[data-corner='tr'] {
			left: calc(50% + var(--diag));
			top: calc(50% - var(--diag));
		}
		.corner[data-corner='br'] {
			left: calc(50% + var(--diag));
			top: calc(50% + var(--diag));
		}
		.corner[data-corner='bl'] {
			left: calc(50% - var(--diag));
			top: calc(50% + var(--diag));
		}
		/* A chevron on the tangent, drawn from two borders so it needs no glyph
		   and no icon file. 0deg points up-right, and each quarter turn follows
		   the ring clockwise from there. */
		.arrow {
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 0.55rem;
			height: 0.55rem;
			border-top: 2px solid var(--color-primary-600);
			border-right: 2px solid var(--color-primary-600);
			transform: translate(-50%, -50%) rotate(var(--rot));
		}
		.handoff {
			display: block;
			position: absolute;
			width: max-content;
			max-width: 8rem;
			font-size: 0.62rem;
			font-weight: 600;
			letter-spacing: 0.14em;
			text-transform: uppercase;
			line-height: 1.5;
			color: var(--color-primary-600);
			background: var(--color-surface-page);
			padding: 0.2rem 0.4rem;
		}
		/* Pushed clear of the curve, outward along the diagonal it names. */
		.corner[data-corner='tr'] .handoff {
			left: 0.9rem;
			bottom: 0.9rem;
			text-align: left;
		}
		.corner[data-corner='bl'] .handoff {
			right: 0.9rem;
			top: 0.9rem;
			text-align: right;
		}

		.hub {
			position: absolute;
			left: 50%;
			top: 50%;
			z-index: 1;
			transform: translate(-50%, -50%);
			margin: 0;
			padding: 0 1.25rem;
			width: 20rem;
			text-align: center;
			font-size: clamp(1rem, 1.4vw, 1.15rem);
			background: var(--color-surface-page);
		}
	}
</style>
