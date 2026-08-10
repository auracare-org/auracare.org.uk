<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CARE_LOOP, CARE_LOOP_LINE } from '$lib/data/company';

	const actorLabel = { auratwin: 'Auratwin', auracare: 'Auracare CDSS' } as const;
</script>

<section class="loop section-y" aria-labelledby="loop-heading">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>How they work together</span>
		<h2 id="loop-heading" use:reveal={{ delay: 60 }}>
			One patient-centred <span class="text-gradient">care loop</span>.
		</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Daily life in, sharper decisions out, habits back in.
		</p>

		<!-- A snake with arrows: steps 01 to 03 across the top, an arrow down
		     into 04, back across the bottom to 06, and a return arrow up the
		     left edge closing the loop. On narrow screens the snake unrolls into
		     a single column with down arrows between the steps. -->
		<div class="board">
			<ol class="steps">
				{#each CARE_LOOP as step, i (step.title)}
					<li
						class="step glass-card s{i + 1}"
						class:step-twin={step.actor === 'auratwin'}
						use:reveal={{ delay: 80 + i * 60 }}
					>
						<div class="step-top">
							<span class="step-num">{String(i + 1).padStart(2, '0')}</span>
							<span class="step-actor">{actorLabel[step.actor]}</span>
						</div>
						<h3>{step.title}</h3>
						<p>{step.body}</p>
					</li>
				{/each}
			</ol>

			<!-- Flow arrows, desktop only -->
			<span class="arrow h a-top1" aria-hidden="true">
				<svg viewBox="0 0 40 14" fill="none">
					<path
						d="M1 7h32m0 0-6-5.5M33 7l-6 5.5"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			<span class="arrow h a-top2" aria-hidden="true">
				<svg viewBox="0 0 40 14" fill="none">
					<path
						d="M1 7h32m0 0-6-5.5M33 7l-6 5.5"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			<span class="arrow v a-down" aria-hidden="true">
				<svg viewBox="0 0 14 48" fill="none">
					<path
						d="M7 1v40m0 0-5.5-6M7 41l5.5-6"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			<span class="arrow h a-bot1" aria-hidden="true">
				<svg viewBox="0 0 40 14" fill="none">
					<path
						d="M39 7H7m0 0 6-5.5M7 7l6 5.5"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			<span class="arrow h a-bot2" aria-hidden="true">
				<svg viewBox="0 0 40 14" fill="none">
					<path
						d="M39 7H7m0 0 6-5.5M7 7l6 5.5"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			<span class="arrow v a-up" aria-hidden="true">
				<svg viewBox="0 0 14 48" fill="none">
					<path
						d="M7 47V7m0 0L1.5 13M7 7l5.5 6"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>

			<p class="board-caption">{CARE_LOOP_LINE}</p>
		</div>

		<p class="loop-line" use:reveal={{ delay: 160 }}>
			<span class="loop-glyph" aria-hidden="true">↺</span>
			{CARE_LOOP_LINE}
		</p>
	</div>
</section>

<style>
	.loop {
		background: var(--color-neutral-0);
		border-block: 1px solid var(--color-border-default);
	}
	h2 {
		font-size: clamp(1.9rem, 4.5vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 0.9rem;
		max-width: 20ch;
	}
	.lede {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 42rem;
	}

	.board {
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}
	.step {
		position: relative;
		padding: 1.2rem 1.3rem;
		border-radius: var(--radius-lg);
	}
	.step-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.6rem;
	}
	.step-num {
		font-family: var(--font-family-mono);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-primary-600);
	}
	.step-actor {
		font-family: var(--font-family-mono);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-100);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
	}
	/* Auratwin's steps carry a soft tint so the handoff between the two
	   products reads at a glance. */
	.step-twin .step-actor {
		color: var(--color-ink-soft);
		background: var(--color-surface-alt);
		border-color: var(--color-border-default);
	}
	.step h3 {
		font-size: 1rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.3rem;
	}
	.step p {
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}

	/* Arrows and the desktop caption live on the board grid; hidden until the
	   snake layout kicks in. */
	.arrow,
	.board-caption {
		display: none;
	}

	.loop-line {
		margin-top: clamp(1.75rem, 3vw, 2.5rem);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		text-align: center;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-primary-600);
	}
	.loop-glyph {
		font-size: 1.15rem;
		line-height: 1;
	}

	/* Mobile: the snake unrolls into a column, with a down arrow between steps. */
	@media (max-width: 999px) {
		.step:not(:last-child)::after {
			content: '↓';
			position: absolute;
			left: 50%;
			bottom: -1.7rem;
			transform: translateX(-50%);
			font-size: 1.1rem;
			line-height: 1;
			color: var(--color-primary-500);
		}
	}

	/* Desktop: the snake. Odd columns hold the cards, even columns the
	   arrows; the middle row carries the down/return arrows and the caption. */
	@media (min-width: 1000px) {
		.board {
			display: grid;
			grid-template-columns: 1fr 2.75rem 1fr 2.75rem 1fr;
			grid-template-rows: auto 4.5rem auto;
			align-items: stretch;
		}
		.steps {
			display: contents;
		}
		.s1 {
			grid-area: 1 / 1;
		}
		.s2 {
			grid-area: 1 / 3;
		}
		.s3 {
			grid-area: 1 / 5;
		}
		.s4 {
			grid-area: 3 / 5;
		}
		.s5 {
			grid-area: 3 / 3;
		}
		.s6 {
			grid-area: 3 / 1;
		}

		.arrow {
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--color-ink-faint);
		}
		.arrow.h svg {
			width: 100%;
			max-width: 2.5rem;
			height: 0.9rem;
		}
		.arrow.v svg {
			width: 0.9rem;
			height: 3.1rem;
		}
		.a-top1 {
			grid-area: 1 / 2;
		}
		.a-top2 {
			grid-area: 1 / 4;
		}
		.a-down {
			grid-area: 2 / 5;
		}
		.a-bot1 {
			grid-area: 3 / 4;
		}
		.a-bot2 {
			grid-area: 3 / 2;
		}
		/* The return arrow closes the loop, so it carries the accent. */
		.a-up {
			grid-area: 2 / 1;
			color: var(--color-primary-600);
		}

		.board-caption {
			display: flex;
			align-items: center;
			justify-content: center;
			grid-row: 2;
			grid-column: 2 / 5;
			margin: 0;
			text-align: center;
			font-size: 0.95rem;
			font-style: italic;
			font-weight: 500;
			color: var(--color-primary-600);
		}

		/* The caption inside the board replaces the mobile loop line. */
		.loop-line {
			display: none;
		}
	}
</style>
