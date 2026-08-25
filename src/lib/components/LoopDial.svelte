<script lang="ts">
	/**
	 * The loop, drawn.
	 *
	 * A square box whose edge midpoints are the circle's cardinal points. Each
	 * node is placed by angle rather than by a hand-written percentage, so the
	 * same component draws a four-stage loop and a six-stage one without any
	 * coordinate being retyped: node `i` of `n` sits at `i · 360/n` degrees
	 * clockwise from the top, and an arrowhead sits at each midpoint between
	 * two nodes, rotated to the tangent there.
	 *
	 * It carries no explanation, only the shape. The list beside it does the
	 * explaining, which is why this is `aria-hidden` — it would otherwise read
	 * the same labels out a second time.
	 */
	let {
		labels,
		centre = '',
		/**
		 * Diameter of a node. Six nodes need smaller ones than four, and every
		 * count needs smaller ones on a narrow screen: the ring shrinks with the
		 * column but a fixed node does not, so pass a clamp() rather than a
		 * fixed length or the nodes close up and touch on mobile.
		 */
		nodeSize = 'clamp(6rem, 22vw, 8.5rem)',
		/** Fills the first node, marking where the loop is entered. */
		markStart = true
	}: {
		labels: string[];
		centre?: string;
		nodeSize?: string;
		markStart?: boolean;
	} = $props();

	const RAD = Math.PI / 180;
	/** Half the box, as a percentage, is the circle's radius. */
	const at = (deg: number) => ({
		x: `${50 + 50 * Math.sin(deg * RAD)}%`,
		y: `${50 - 50 * Math.cos(deg * RAD)}%`
	});

	const nodes = $derived(
		labels.map((label, i) => ({ label, i, ...at((i * 360) / labels.length) }))
	);
	/* Between each pair, on the arc. The triangle points up at rest, so the
	   clockwise tangent at `deg` is `deg + 90`. */
	const arrows = $derived(
		labels.map((_, i) => {
			const deg = ((i + 0.5) * 360) / labels.length;
			return { i, ...at(deg), rot: deg + 90 };
		})
	);
</script>

<div class="dial-wrap" style="--node:{nodeSize}">
	<div class="dial" aria-hidden="true">
		<svg class="dial-ring" viewBox="0 0 100 100">
			<circle cx="50" cy="50" r="50" vector-effect="non-scaling-stroke" />
		</svg>

		{#each nodes as node (node.i)}
			<span
				class="dial-node"
				class:is-start={markStart && node.i === 0}
				style="--x:{node.x}; --y:{node.y}"
			>
				{node.label}
			</span>
		{/each}

		{#each arrows as arrow (arrow.i)}
			<span class="dial-arrow" style="--x:{arrow.x}; --y:{arrow.y}; --rot:{arrow.rot}deg"></span>
		{/each}

		{#if centre}<span class="dial-centre">{centre}</span>{/if}
	</div>
</div>

<style>
	/* Half of each node hangs outside the box, so the width subtracts a whole
	   node and the wrapper's padding does the same vertically. */
	.dial-wrap {
		display: grid;
		place-items: center;
		padding-block: calc(var(--node) / 2);
	}
	.dial {
		position: relative;
		width: min(22rem, calc(100% - var(--node)));
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
		stroke: var(--dial-line, var(--color-rule-strong));
		stroke-width: 1;
		stroke-dasharray: 4 5;
	}

	.dial-node {
		position: absolute;
		left: var(--x);
		top: var(--y);
		display: grid;
		place-items: center;
		width: var(--node);
		height: var(--node);
		padding: 0.5rem;
		border-radius: 999px;
		border: 1px solid var(--dial-line, var(--color-rule-strong));
		background: var(--dial-bg, var(--color-surface-page));
		transform: translate(-50%, -50%);
		text-align: center;
		/* Tracks the node, so the label stays in proportion as it scales. */
		font-size: clamp(0.68rem, calc(var(--node) * 0.125), 1rem);
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--dial-ink, var(--color-ink));
	}
	.dial-node.is-start {
		background: var(--dial-start-bg, var(--color-ink));
		border-color: var(--dial-start-bg, var(--color-ink));
		color: var(--dial-start-ink, var(--color-surface-page));
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
		border-bottom: 0.5rem solid var(--dial-line, var(--color-rule-strong));
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
		color: var(--dial-muted, var(--color-ink-faint));
	}
</style>
