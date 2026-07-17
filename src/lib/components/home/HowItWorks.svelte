<script lang="ts">
	import { onMount } from 'svelte';
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

	const connectorMeta: Record<string, { icon: string; color: string }> = {
		'Apple Health': { icon: '/icons/brands/apple.svg', color: '#000000' },
		'Google Health Connect': { icon: '/icons/brands/google.svg', color: '#4285F4' },
		'Samsung Health': { icon: '/icons/brands/samsung.svg', color: '#1428A0' },
		Oura: { icon: '/icons/brands/oura.svg', color: '#0066CC' },
		Whoop: { icon: '/icons/brands/whoop.svg', color: '#FF0050' },
		Garmin: { icon: '/icons/brands/garmin.svg', color: '#007CC3' },
		Fitbit: { icon: '/icons/brands/fitbit.svg', color: '#00B0B9' },
		Withings: { icon: '/icons/brands/withings.svg', color: '#00BCD4' },
		Dexcom: { icon: '/icons/brands/dexcom.svg', color: '#00A3E0' }
	};

	let activeIndex = $state<number | null>(null);
	let isMobile = $state(false);
	let userInteracted = $state(false);
	let interval: ReturnType<typeof setInterval> | undefined;

	function startCycle() {
		if (interval) clearInterval(interval);
		interval = setInterval(() => {
			if (!userInteracted) {
				activeIndex = ((activeIndex ?? -1) + 1) % CONNECTORS.length;
			}
		}, 2000);
	}

	function handleCardInteract(index: number) {
		userInteracted = true;
		activeIndex = index;
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
	}

	onMount(() => {
		const mq = window.matchMedia('(max-width: 719px)');
		isMobile = mq.matches;

		function onMediaChange(e: MediaQueryListEvent) {
			isMobile = e.matches;
			userInteracted = false;
			if (e.matches) {
				activeIndex = 0;
				startCycle();
			} else {
				activeIndex = null;
				if (interval) {
					clearInterval(interval);
					interval = undefined;
				}
			}
		}

		mq.addEventListener('change', onMediaChange);

		if (isMobile) {
			activeIndex = 0;
			startCycle();
		}

		return () => {
			mq.removeEventListener('change', onMediaChange);
			if (interval) clearInterval(interval);
		};
	});
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
			<ul class="connector-grid" aria-label="Supported data sources">
				{#each CONNECTORS as connector, i}
					{@const meta = connectorMeta[connector.name]}
					<li
						class="connector-card"
						class:active={activeIndex === i}
						style:--brand-color={meta?.color ?? 'currentColor'}
						use:reveal={{ delay: 60 + i * 40 }}
						onmouseenter={() => { if (!isMobile) activeIndex = i; }}
						onmouseleave={() => { if (!isMobile) activeIndex = null; }}
						ontouchstart={() => handleCardInteract(i)}
						role="listitem"
					>
						{#if meta}
							<img
								class="connector-icon"
								src={meta.icon}
								alt=""
								width="32"
								height="32"
								loading="lazy"
							/>
						{/if}
						<span class="connector-name">{connector.name}</span>
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
		color: var(--color-ink-soft);
		line-height: 1.6;
		max-width: 34ch;
	}

	/* Connector wall */
	.wall {
		margin-top: clamp(3rem, 6vw, 4.5rem);
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--radius-lg);
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
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
		color: var(--color-ink-soft);
		line-height: 1.6;
	}

	/* Connector grid */
	.connector-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.connector-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 1.25rem 0.75rem;
		border-radius: var(--radius-md);
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease,
			background-color 0.25s ease;
		cursor: default;
	}
	.connector-icon {
		width: 32px;
		height: 32px;
		object-fit: contain;
		filter: grayscale(1) opacity(0.55);
		transition: filter 0.25s ease;
	}
	.connector-name {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-ink-soft);
		text-align: center;
		line-height: 1.2;
		transition: color 0.25s ease;
	}
	.connector-card.active {
		border-color: var(--brand-color);
		box-shadow: 0 0 0 1px var(--brand-color), var(--shadow-xs);
		background: color-mix(in srgb, var(--brand-color) 4%, var(--color-neutral-0));
	}
	.connector-card.active .connector-icon {
		filter: grayscale(0) opacity(1);
	}
	.connector-card.active .connector-name {
		color: var(--color-ink);
	}

	.closing {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		font-family: var(--font-family-heading);
		font-size: clamp(1.1rem, 1.8vw, 1.35rem);
		font-weight: 600;
		color: var(--color-ink);
	}

	@media (max-width: 719px) {
		.connector-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.6rem;
		}
		.connector-card {
			padding: 1rem 0.5rem;
		}
		.connector-name {
			font-size: 0.72rem;
		}
	}

	@media (min-width: 720px) {
		.steps {
			grid-template-columns: repeat(3, 1fr);
			gap: clamp(1.75rem, 3vw, 2.75rem);
		}
		.connector-card:hover {
			border-color: var(--brand-color);
			box-shadow: 0 0 0 1px var(--brand-color), var(--shadow-xs);
			background: color-mix(in srgb, var(--brand-color) 4%, var(--color-neutral-0));
		}
		.connector-card:hover .connector-icon {
			filter: grayscale(0) opacity(1);
		}
		.connector-card:hover .connector-name {
			color: var(--color-ink);
		}
	}
</style>
