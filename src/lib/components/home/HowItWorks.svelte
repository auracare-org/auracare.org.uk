<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/motion';
	import { DATA_CATEGORIES, DATA_MOAT_NOTE, EHR_NOTE } from '$lib/data/company';

	let activeIndex = $state<number | null>(null);
	let isMobile = $state(false);
	let userInteracted = $state(false);
	let interval: ReturnType<typeof setInterval> | undefined;

	function startCycle() {
		if (interval) clearInterval(interval);
		interval = setInterval(() => {
			if (!userInteracted) {
				activeIndex = ((activeIndex ?? -1) + 1) % DATA_CATEGORIES.length;
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
		<h2 use:reveal={{ delay: 60 }}>
			The pieces become <span class="text-gradient">one picture of you</span>.
		</h2>
		<p class="lede" use:reveal={{ delay: 100 }}>
			Every source is translated into one shared vocabulary, so it all becomes a single, living
			model of you.
		</p>

		<div class="wall" use:reveal={{ delay: 120 }}>
			<div class="wall-head">
				<h3 class="wall-title">Connect what you already track</h3>
				<p class="wall-note">
					Sleep, movement, nutrition and more, from the wearables and apps you already use. Link a
					source in a tap, revoke it just as easily.
				</p>
				<p class="wall-note">{DATA_MOAT_NOTE}</p>
			</div>
			<ul class="connector-grid" aria-label="Categories of everyday-life signal">
				{#each DATA_CATEGORIES as category, i (category.key)}
					<li
						class="connector-card"
						class:active={activeIndex === i}
						style="--accent: {category.color};"
						use:reveal={{ delay: 60 + i * 40 }}
						onmouseenter={() => {
							if (!isMobile) activeIndex = i;
						}}
						onmouseleave={() => {
							if (!isMobile) activeIndex = null;
						}}
						ontouchstart={() => handleCardInteract(i)}
						role="listitem"
					>
						<span class="connector-icon" aria-hidden="true">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								{#if category.key === 'sleep'}
									<path
										d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
										fill="currentColor"
										stroke="none"
										transform="translate(1.8 1.8) scale(0.85)"
									/>
								{:else if category.key === 'movement'}
									<path d="M3 12h4l2.5 6L14 6l2.5 6H21" />
								{:else if category.key === 'nutrition'}
									<path
										d="M12 8.5C10.8 6.3 8 5.6 6.2 7 4.4 8.4 4.2 11.6 5.4 14.6 6.3 17 7.8 21 10 21c1 0 1.2-.6 2-.6s1 .6 2 .6c2.2 0 3.7-4 4.6-6.4 1.2-3 1-6.2-.8-7.6C18 5.6 15.2 6.3 14 8.5"
									/><path d="M12 8.5C12.3 6 14 4.3 16.5 4.3 16.5 6.8 14.8 8.5 12 8.5z" />
								{:else if category.key === 'screen'}
									<rect x="6" y="3" width="12" height="18" rx="1.5" /><path d="M10 18h4" />
								{:else if category.key === 'location'}
									<path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11z" /><circle
										cx="12"
										cy="10"
										r="2"
									/>
								{:else if category.key === 'wearables'}
									<rect x="8" y="7" width="8" height="10" rx="1.5" /><path
										d="M9 7l.5-3h5l.5 3M9 17l.5 3h5l.5-3"
									/>
								{:else if category.key === 'platforms'}
									<rect x="4" y="4" width="7" height="7" rx="1" /><rect
										x="13"
										y="4"
										width="7"
										height="7"
										rx="1"
									/><rect x="4" y="13" width="7" height="7" rx="1" /><rect
										x="13"
										y="13"
										width="7"
										height="7"
										rx="1"
									/>
								{:else}
									<path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M10 13h5M10 16h5" />
								{/if}
							</svg>
						</span>
						<span class="connector-name">{category.label}</span>
					</li>
				{/each}
			</ul>
			<p class="wall-fine">{EHR_NOTE}</p>
		</div>
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

	.lede {
		margin-top: clamp(1rem, 2vw, 1.5rem);
		max-width: 46ch;
		font-size: clamp(1rem, 1.4vw, 1.15rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
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
		max-width: 78ch;
		margin-bottom: 1.5rem;
	}
	.wall-title {
		font-size: clamp(1.15rem, 1.8vw, 1.4rem);
		letter-spacing: -0.01em;
	}
	.wall-note {
		margin-top: 0.5rem;
		max-width: 78ch;
		color: var(--color-ink-soft);
		line-height: 1.6;
	}
	.wall-fine {
		margin-top: 1.5rem;
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--color-ink-faint);
	}

	/* Connector grid */
	.connector-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
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
		width: 30px;
		height: 30px;
		color: var(--color-ink-faint);
		transition: color 0.25s ease;
	}
	.connector-icon svg {
		width: 100%;
		height: 100%;
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
		border-color: var(--accent);
		box-shadow:
			0 0 0 1px var(--accent),
			var(--shadow-xs);
		background: var(--accent);
	}
	.connector-card.active .connector-icon {
		color: #fff;
	}
	.connector-card.active .connector-name {
		color: #fff;
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
		.connector-card:hover {
			border-color: var(--accent);
			box-shadow:
				0 0 0 1px var(--accent),
				var(--shadow-xs);
			background: var(--accent);
		}
		.connector-card:hover .connector-icon {
			color: #fff;
		}
		.connector-card:hover .connector-name {
			color: #fff;
		}
	}
</style>
