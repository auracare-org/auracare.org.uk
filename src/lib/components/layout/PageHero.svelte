<script lang="ts">
	import { reveal } from '$lib/actions/motion';

	/**
	 * The one hero every inner page uses.
	 *
	 * Before this, five pages had five heroes: two dark, three light, with four
	 * different decorative backgrounds between them (blob pairs, a grid overlay,
	 * an orb, a set of orbs). Moving between pages felt like moving between
	 * sites. This is the single treatment: paper, centred, statement over one
	 * line of support, closed by a rule.
	 *
	 * There is deliberately no label above the statement. A wide-tracked
	 * "TECHNOLOGY" over a heading that already says technology is decoration
	 * standing in for hierarchy. Where a page genuinely has status to report,
	 * it goes below the statement as `meta`, not above it.
	 */
	let {
		title,
		sub = '',
		accent = '',
		accentOwnLine = false,
		meta = ''
	}: {
		/** The statement. Keep it to a line or two. */
		title: string;
		/** One supporting sentence. Optional. */
		sub?: string;
		/** Trailing words of the title rendered in the brand blue. Optional. */
		accent?: string;
		/** Break before the accent so it holds its own line. */
		accentOwnLine?: boolean;
		/** Small status line, rendered BELOW the statement. Optional. */
		meta?: string;
	} = $props();
</script>

<section class="page-hero">
	<div class="container-wide inner">
		<h1 use:reveal>
			<!-- The space before the accent lives outside the <em> on purpose: inside
			     it, the renderer collapsed it and the words ran together. -->
			{title}{#if accent}{#if accentOwnLine}<br />{:else}{' '}{/if}<em>{accent}</em>{/if}
		</h1>
		{#if sub}
			<p class="sub" use:reveal={{ delay: 80 }}>{sub}</p>
		{/if}
		{#if meta}
			<p class="meta" use:reveal={{ delay: 140 }}>{meta}</p>
		{/if}
	</div>
</section>

<style>
	.page-hero {
		padding-block: clamp(3.5rem, 8vw, 6rem) clamp(2.5rem, 5vw, 4rem);
		border-bottom: 1px solid var(--color-rule);
	}
	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.meta {
		margin: clamp(1.25rem, 2.5vw, 1.75rem) 0 0;
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	h1 {
		font-size: clamp(2.1rem, 5.2vw, 4rem);
		line-height: 1.02;
		letter-spacing: -0.035em;
		font-weight: 600;
		margin: 0;
		max-width: 20ch;
		text-wrap: balance;
	}
	h1 em {
		font-style: normal;
		color: var(--color-primary-600);
	}
	.sub {
		margin: clamp(1.25rem, 3vw, 1.75rem) auto 0;
		font-size: clamp(1rem, 1.35vw, 1.14rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 56ch;
	}
</style>
