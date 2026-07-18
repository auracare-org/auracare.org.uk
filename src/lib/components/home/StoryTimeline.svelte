<script lang="ts">
	import { reveal, scrollProgress } from '$lib/actions/motion';
	import { TIMELINE } from '$lib/data/company';

	let progress = $state(0);

	const eraDot: Record<string, string> = {
		nhs: '#94a3b8',
		pivot: '#6180ff',
		ai: '#387ff5'
	};
</script>

<section class="story section-y" id="timeline" aria-labelledby="story-heading">
	<div class="container-wide">
		<div class="story-head">
			<h2 id="story-heading" use:reveal={{ delay: 60 }}>
				We learned the NHS from the inside.<br />Then we built what it couldn’t.
			</h2>
			<p use:reveal={{ delay: 120 }}>
				Auracare didn’t start with a digital twin. It started with twenty pharmacies, a wall we
				couldn’t move, and everything we learned on the way.
			</p>
		</div>

		<div class="timeline" use:scrollProgress={{ onProgress: (p) => (progress = p) }}>
			<div class="tl-track" aria-hidden="true"></div>
			<div class="tl-fill" style="height:{Math.min(100, progress * 118)}%" aria-hidden="true"></div>

			<ol class="tl-list">
				{#each TIMELINE as m, i}
					<li
						class="tl-node"
						class:right={i % 2 === 1}
						class:is-fork={m.fork}
						use:reveal={{ threshold: 0.35 }}
					>
						<span class="tl-dot" style="--dot:{eraDot[m.era]}" aria-hidden="true">
							{#if m.fork}
								<svg viewBox="0 0 24 24" width="13" height="13" fill="none"
									><path
										d="M6 3v6a4 4 0 0 0 4 4h4M18 3v6a4 4 0 0 1-4 4"
										stroke="#fff"
										stroke-width="2.4"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
							{/if}
						</span>
						<div class="tl-card glass-card" class:fork-card={m.fork}>
							<span class="tl-date">{m.date}</span>
							<h3>{m.title}</h3>
							<p>{m.body}</p>
							{#if m.fork}<span class="tl-forklabel">The pivot</span>{/if}
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.story {
		overflow: clip;
		background: var(--color-neutral-0);
	}
	.story-head {
		text-align: center;
		max-width: 46rem;
		margin: 0 auto clamp(2.5rem, 5vw, 4rem);
	}
	.story-head h2 {
		font-size: clamp(1.7rem, 3.6vw, 2.9rem);
		line-height: 1.12;
		margin-block: 0.6rem 0.9rem;
	}
	.story-head p {
		margin-inline: auto;
	}

	.timeline {
		position: relative;
		max-width: 60rem;
		margin: 0 auto;
		padding-block: 0.5rem;
	}
	.tl-track,
	.tl-fill {
		position: absolute;
		top: 0;
		width: 3px;
		border-radius: var(--radius-xs);
	}
	.tl-track {
		height: 100%;
		background: var(--color-border-dark);
	}
	.tl-fill {
		background: var(--color-primary-400);
		transition: height 0.15s linear;
	}
	.tl-track,
	.tl-fill {
		left: 18px;
	}

	.tl-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 3vw, 2.5rem);
	}
	.tl-node {
		position: relative;
		padding-left: 48px;
	}
	.tl-dot {
		position: absolute;
		left: 8px;
		top: 6px;
		width: 22px;
		height: 22px;
		border-radius: 999px;
		background: var(--dot);
		border: 4px solid var(--color-neutral-0);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}
	.tl-node.is-fork .tl-dot {
		width: 28px;
		height: 28px;
		left: 5px;
		top: 3px;
		outline: 1px solid var(--color-primary-400);
		outline-offset: 0px;
	}
	.tl-card {
		padding: 1.25rem 1.4rem;
		position: relative;
	}
	.tl-date {
		font-family: var(--font-family-mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary-300);
	}
	.tl-card h3 {
		font-size: 1.15rem;
		margin-block: 0.3rem 0.4rem;
	}
	.tl-card p {
		font-size: 0.92rem;
	}
	.fork-card {
		border-color: var(--color-border-strong);
	}
	.tl-forklabel {
		position: absolute;
		top: -0.7rem;
		right: 1.2rem;
		background: var(--color-primary-600);
		color: #fff;
		font-family: var(--font-family-mono);
		font-size: 0.62rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.22rem 0.55rem;
		border-radius: var(--radius-sm);
	}

	/* Desktop: centre spine with alternating cards */
	@media (min-width: 820px) {
		.tl-track,
		.tl-fill {
			left: 50%;
			transform: translateX(-50%);
		}
		.tl-list {
			gap: 0.5rem;
		}
		.tl-node {
			width: 50%;
			padding-left: 0;
			padding-right: 2.75rem;
			margin-bottom: 1.5rem;
		}
		.tl-node.right {
			margin-left: 50%;
			padding-left: 2.75rem;
			padding-right: 0;
		}
		.tl-dot {
			left: auto;
			right: -11px;
			top: 14px;
		}
		.tl-node.right .tl-dot {
			left: -11px;
			right: auto;
		}
		.tl-node.is-fork .tl-dot {
			right: -14px;
		}
		.tl-node.is-fork.right .tl-dot {
			left: -14px;
		}
	}
</style>
