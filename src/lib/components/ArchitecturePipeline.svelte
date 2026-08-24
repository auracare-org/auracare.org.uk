<script lang="ts">
	import { reveal } from '$lib/actions/motion';

	/* `dark` restyles the stages for aura-space sections. */
	let { dark = false }: { dark?: boolean } = $props();

	/* The CDSS pipeline at a glance, in the site's established vocabulary:
	   signals are encoded onto the clinical ontology, the neuro-symbolic core
	   reasons over the knowledge graph, and every output stays traceable.
	   Rendered on the home technology teaser and on /product/auracare. */
	const stages = [
		{
			label: 'Signals in',
			note: 'Auracle’s shared history, live vitals from our devices, and the conversation itself'
		},
		{
			label: 'Encoder',
			note: 'Each observation entity-linked to SNOMED CT and timestamped'
		},
		{
			label: 'Knowledge graph',
			note: 'The neuro-symbolic core reasons over 532,000 linked clinical concepts'
		},
		{
			label: 'Traceable output',
			note: 'Ranked differentials with sources attached; the clinician decides'
		}
	];
</script>

<ol class="pipeline" class:dark>
	{#each stages as s, i}
		<li class="stage" use:reveal={{ delay: 80 + i * 70 }}>
			<span class="stage-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
			<span class="stage-label">{s.label}</span>
			<span class="stage-note">{s.note}</span>
		</li>
	{/each}
</ol>

<p class="voi" class:dark use:reveal={{ delay: 460 }}>
	<span class="voi-glyph" aria-hidden="true">↺</span>
	Value-of-information loop: before it concludes, the core asks the single question, exam or test that
	resolves the most uncertainty for its cost, then reasons again.
</p>

<style>
	.pipeline {
		list-style: none;
		margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.9rem;
	}
	.stage {
		position: relative;
		padding: 1.15rem 1.3rem;
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xs);
	}
	.stage-num {
		display: block;
		font-family: var(--font-family-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-primary-600);
		margin-bottom: 0.45rem;
	}
	.stage-label {
		display: block;
		font-weight: 600;
		font-size: 1rem;
		letter-spacing: -0.01em;
		color: var(--color-ink);
		margin-bottom: 0.25rem;
	}
	.stage-note {
		display: block;
		font-size: 0.85rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}

	.voi {
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
		margin-top: 1.4rem;
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
		max-width: 52rem;
	}
	.voi-glyph {
		font-size: 1.05rem;
		line-height: 1;
		color: var(--color-primary-600);
	}
	.voi.dark {
		color: rgba(226, 230, 240, 0.68) !important;
	}
	.voi.dark .voi-glyph {
		color: var(--color-primary-300);
	}

	/* Dark variant, for aura-space sections. */
	.dark .stage {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.12);
		box-shadow: none;
	}
	.dark .stage-num {
		color: var(--color-primary-300);
	}
	.dark .stage-label {
		color: #fff;
	}
	.dark .stage-note {
		color: rgba(226, 230, 240, 0.68) !important;
	}
	.dark .stage:not(:last-child)::after {
		color: var(--color-primary-300);
	}

	/* Flow arrows: down between stacked stages, right between columns. */
	.stage:not(:last-child)::after {
		content: '↓';
		position: absolute;
		left: 50%;
		bottom: -1.55rem;
		transform: translateX(-50%);
		font-size: 1rem;
		line-height: 1;
		color: var(--color-primary-500);
	}

	@media (min-width: 900px) {
		.pipeline {
			grid-template-columns: repeat(4, 1fr);
			gap: 2.1rem;
		}
		.stage:not(:last-child)::after {
			content: '→';
			left: auto;
			right: -1.75rem;
			bottom: auto;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
