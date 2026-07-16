<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONNECTORS } from '$lib/data/company';

	const steps = [
		{
			title: 'Connect the devices you already own',
			body: 'Apple Health, Oura, Whoop, Garmin and more — link a source in a tap, revoke it just as easily.'
		},
		{
			title: 'Twin builds your health digital twin',
			body: 'Every source is translated into one shared vocabulary, so it all becomes a single, living model of you.'
		},
		{
			title: 'Twin checks in through the day',
			body: 'A morning brief, an evening wrap, and a nudge only when your data says something worth saying.'
		}
	];
</script>

<section class="how section-y">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>How Twin works</span>
		<h2 use:reveal={{ delay: 60 }}>
			From the devices on your wrist to a model that <span class="text-gradient">checks in</span>.
		</h2>

		<ol class="steps">
			{#each steps as step, i}
				<li class="step" use:reveal={{ delay: 120 + i * 90 }}>
					<span class="step-num" aria-hidden="true">{i + 1}</span>
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</li>
			{/each}
		</ol>

		<div class="wall" use:reveal={{ delay: 120 }}>
			<div class="wall-head">
				<h3 class="wall-title">Nine sources, one health vocabulary.</h3>
				<p class="wall-note">
					Connect what you already use. Twin speaks each one and translates them all into a single
					shared language.
				</p>
			</div>
			<ul class="chips connectors" aria-label="Supported data sources">
				{#each CONNECTORS as connector, i}
					<li class="chip connector" use:reveal={{ delay: 60 + i * 40 }}>
						<span class="chip-name">{connector.name}</span>
						<span class="chip-kind">{connector.kind}</span>
					</li>
				{/each}
			</ul>
		</div>

		<p class="closing" use:reveal={{ delay: 120 }}>Worth the notification, or it stays quiet.</p>
	</div>
</section>

<style>
	h2 {
		font-size: clamp(1.9rem, 4vw, 3rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 0;
		max-width: 22ch;
	}

	/* Steps */
	.steps {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.5rem, 3vw, 2.25rem);
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		list-style: none;
		padding: 0;
		counter-reset: step;
	}
	.step {
		position: relative;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-border-strong);
	}
	.step-num {
		font-family: var(--font-family-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--color-primary-600);
	}
	.step-num::before {
		content: '0';
	}
	.step h3 {
		font-size: clamp(1.1rem, 1.6vw, 1.3rem);
		line-height: 1.25;
		margin-block: 0.9rem 0.5rem;
		letter-spacing: -0.01em;
	}
	.step p {
		color: var(--color-neutral-600);
		line-height: 1.6;
		max-width: 34ch;
	}

	/* Connector wall */
	.wall {
		margin-top: clamp(3rem, 6vw, 4.5rem);
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--radius-4xl);
		background: var(--color-surface-alt);
		border: 1px solid var(--color-border-default);
	}
	.wall-head {
		max-width: 46ch;
		margin-bottom: 1.5rem;
	}
	.wall-title {
		font-size: clamp(1.15rem, 1.8vw, 1.4rem);
		letter-spacing: -0.01em;
	}
	.wall-note {
		margin-top: 0.5rem;
		color: var(--color-neutral-600);
		line-height: 1.6;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.85rem;
		border-radius: 999px;
		font-size: 0.9rem;
		background: var(--color-neutral-0);
		border: 1px solid var(--color-neutral-200);
		box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
	}
	.connector {
		font-weight: 500;
	}
	.chip-name {
		color: var(--color-neutral-800);
	}
	.chip-kind {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary-600);
		background: var(--color-primary-50);
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
	}

	.closing {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		font-family: var(--font-family-heading);
		font-size: clamp(1.1rem, 1.8vw, 1.35rem);
		font-weight: 600;
		color: var(--color-neutral-800);
	}

	@media (min-width: 720px) {
		.steps {
			grid-template-columns: repeat(3, 1fr);
			gap: clamp(1.75rem, 3vw, 2.75rem);
		}
	}
</style>
