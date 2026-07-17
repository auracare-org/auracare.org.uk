<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal, prefersReducedMotion } from '$lib/actions/motion';

	type Tier = 'gentle' | 'spicy' | 'nuclear';

	const tiers: { key: Tier; label: string }[] = [
		{ key: 'gentle', label: 'Gentle' },
		{ key: 'spicy', label: 'Spicy' },
		{ key: 'nuclear', label: 'Nuclear' }
	];

	const roast: Record<Tier, string> = {
		gentle:
			'Your Oura readiness is 34 today. Maybe swap leg day for a walk and a big glass of water? 💧',
		spicy:
			"Readiness 34 and you're “about to crush leg day”? Bold. Your hamstrings have filed a formal complaint.",
		nuclear:
			'Readiness 34. Crushing leg day would be crushing something today — mostly you. Sit down. 🪑'
	};

	let tier = $state<Tier>('spicy');
	let roastTyping = $state(false);
	let tierTimer: ReturnType<typeof setTimeout> | undefined;

	function setTier(t: Tier) {
		if (t === tier) return;
		tier = t;
		roastTyping = true;
		clearTimeout(tierTimer);
		tierTimer = setTimeout(() => (roastTyping = false), 700);
	}

	// Sequenced reveal of the four messages, then a floating reply indicator on the user's side.
	const TOTAL = 4;
	const STEP = 950; // ms between messages — slow enough to read
	let shown = $state(0);
	let userReplying = $state(false);

	onMount(() => {
		if (prefersReducedMotion()) {
			shown = TOTAL;
			userReplying = true;
			return;
		}
		const timers: ReturnType<typeof setTimeout>[] = [];
		for (let i = 0; i < TOTAL; i++) {
			timers.push(setTimeout(() => (shown = i + 1), 400 + i * STEP));
		}
		timers.push(setTimeout(() => (userReplying = true), 400 + TOTAL * STEP + 350));
		return () => {
			timers.forEach(clearTimeout);
			clearTimeout(tierTimer);
		};
	});
</script>

<section class="twin" aria-labelledby="twin-heading">
	<div class="container-wide twin-grid">
		<div class="twin-copy">
			<span class="eyebrow" use:reveal>Meet Twin</span>
			<h2 id="twin-heading" use:reveal={{ delay: 60 }}>
				The version of you that actually went to bed on time.
			</h2>
			<p use:reveal={{ delay: 120 }}>
				Twin connects the devices you already wear, notices the patterns, and texts you like a
				sharp, well-rested sibling — funny, specific, and on your side. No new app to live in: it’s
				right there in your messages.
			</p>

			<div
				class="tier"
				role="radiogroup"
				aria-label="How blunt should Twin be?"
				use:reveal={{ delay: 180 }}
			>
				<span class="tier-label">How blunt should Twin be?</span>
				<div class="tier-track">
					{#each tiers as t}
						<button
							type="button"
							role="radio"
							aria-checked={tier === t.key}
							class="tier-btn"
							class:active={tier === t.key}
							onclick={() => setTier(t.key)}
						>
							{t.label}
						</button>
					{/each}
				</div>
			</div>

			<p class="safeword" use:reveal={{ delay: 220 }}>
				<span class="safeword-chip">“ease up”</span>
				Say it any time and Twin instantly cools its tone — and keeps it cool.
			</p>
		</div>

		<div class="phone-wrap" use:reveal={{ delay: 140 }}>
			<div class="phone" aria-hidden="false" aria-label="Example conversation with Twin">
				<div class="phone-notch"></div>
				<div class="phone-screen">
					<div class="chat-head">
						<div class="chat-head-left">
							<svg class="chat-back" width="10" height="17" viewBox="0 0 10 17" fill="none">
								<path d="M9 1L2 8.5L9 16" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="chat-head-center">
							<div class="chat-avatar">
								<img src="/favicon.svg" alt="" />
							</div>
							<strong>Twin</strong>
						</div>
						<div class="chat-head-right">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
								<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					</div>
					<div class="chat-body">
						<div class="msg in" class:show={shown >= 1}>
							Morning. You slept 6h12 — about 40 minutes short of your groove. Ease in today. ☕
						</div>
						<div class="msg in" class:show={shown >= 2} aria-live="polite">
							{#if roastTyping}
								<span class="typing"><i></i><i></i><i></i></span>
							{:else}
								{roast[tier]}
							{/if}
						</div>
						<div class="msg out" class:show={shown >= 3}>brutal</div>
						<div class="msg in" class:show={shown >= 4}>
							Love you. Hydrate. We ride tomorrow. 🚴
						</div>
						{#if userReplying}
							<div class="msg out typing-bubble show" aria-label="You are typing">
								<span class="typing"><i></i><i></i><i></i></span>
							</div>
						{/if}
					</div>
					<div class="chat-input">
						<span>iMessage</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.twin {
		padding-block: clamp(4rem, 9vw, 8rem);
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
	}
	.twin-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 6vw, 4rem);
		align-items: center;
	}
	.twin-copy h2 {
		font-size: clamp(1.7rem, 3.8vw, 2.9rem);
		line-height: 1.12;
		margin-block: 0.6rem 1rem;
	}
	.twin-copy p {
		max-width: 32rem;
		font-size: 1rem;
	}

	.tier {
		margin-top: 1.75rem;
	}
	.tier-label {
		display: block;
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-neutral-600);
		margin-bottom: 0.5rem;
	}
	.tier-track {
		display: inline-flex;
		background: #fff;
		border: 1px solid var(--color-border-default);
		border-radius: 6px;
		padding: 0.25rem;
		box-shadow: var(--shadow-xs);
	}
	.tier-btn {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-ink-faint);
		padding: 0.45rem 1.1rem;
		border-radius: 4px;
		transition:
			color 0.15s ease,
			background 0.15s ease;
	}
	.tier-btn:hover {
		color: var(--color-ink);
	}
	.tier-btn.active {
		color: #fff;
		background: var(--color-primary-600);
	}

	.safeword {
		margin-top: 1.4rem;
		font-size: 0.9rem;
		color: var(--color-neutral-600);
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
	}
	.safeword-chip {
		background: rgba(52, 211, 153, 0.16);
		color: #0f9d6b;
		font-weight: 700;
		padding: 0.25rem 0.65rem;
		border-radius: 999px;
		font-size: 0.82rem;
	}

	/* Phone */
	.phone-wrap {
		position: relative;
		justify-self: center;
		width: min(280px, 80vw);
		max-width: 280px;
	}
	.phone {
		position: relative;
		z-index: 1;
		background: #0b0d12;
		border-radius: 2.6rem;
		padding: 0.6rem;
		box-shadow:
			0 30px 60px rgba(15, 23, 42, 0.28),
			inset 0 0 0 2px rgba(255, 255, 255, 0.06);
		aspect-ratio: 9 / 19.5;
	}
	.phone-notch {
		position: absolute;
		top: 0.6rem;
		left: 50%;
		transform: translateX(-50%);
		width: 38%;
		height: 1.4rem;
		background: #0b0d12;
		border-radius: 0 0 1rem 1rem;
		z-index: 3;
	}
	.phone-screen {
		background: #f6f6f8;
		border-radius: 2.1rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.chat-head {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 2rem 0.75rem 0.6rem;
		background: rgba(247, 247, 247, 0.92);
		backdrop-filter: blur(12px);
		border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
		flex: none;
	}
	.chat-head-left {
		display: flex;
		align-items: center;
	}
	.chat-back {
		opacity: 0.9;
	}
	.chat-head-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}
	.chat-head-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.chat-avatar {
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 999px;
		display: grid;
		place-items: center;
		background: #f0f0f0;
		padding: 0.4rem;
		border: 1px solid rgba(0, 0, 0, 0.06);
	}
	.chat-avatar img {
		width: 100%;
		height: auto;
	}
	.chat-head strong {
		display: block;
		font-size: 0.72rem;
		font-weight: 600;
		color: #000;
	}
	.chat-body {
		flex: 1;
		min-height: 0;
		padding: 1rem 0.85rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.5rem;
		overflow: hidden;
	}
	.msg {
		flex: none;
		max-width: 82%;
		padding: 0.6rem 0.85rem;
		border-radius: 1.15rem;
		font-size: 0.86rem;
		line-height: 1.4;
		opacity: 0;
		transform: translateY(10px) scale(0.96);
		transition:
			opacity 0.45s ease,
			transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.msg.show {
		opacity: 1;
		transform: none;
	}
	.msg.in {
		align-self: flex-start;
		background: #e9e9eb;
		color: #111;
		border-bottom-left-radius: 0.35rem;
	}
	.msg.out {
		align-self: flex-end;
		background: #2f6bff;
		color: #fff;
		border-bottom-right-radius: 0.35rem;
	}
	.typing-bubble {
		padding: 0.7rem 0.95rem;
	}
	.typing {
		display: inline-flex;
		gap: 0.22rem;
		align-items: center;
		height: 1rem;
	}
	.typing i {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: #b0b0b6;
		animation: typingBounce 1.3s ease-in-out infinite;
	}
	.msg.out .typing i {
		background: rgba(255, 255, 255, 0.9);
	}
	.typing i:nth-child(2) {
		animation-delay: 0.18s;
	}
	.typing i:nth-child(3) {
		animation-delay: 0.36s;
	}
	.chat-input {
		padding: 0.7rem 1rem 1.1rem;
		background: rgba(255, 255, 255, 0.85);
		flex: none;
	}
	.chat-input span {
		display: block;
		border: 1px solid var(--color-border-default);
		border-radius: 999px;
		padding: 0.4rem 0.9rem;
		font-size: 0.8rem;
		color: #9a9a9e;
	}
	@keyframes typingBounce {
		0%,
		60%,
		100% {
			transform: translateY(0);
			opacity: 0.6;
		}
		30% {
			transform: translateY(-4px);
			opacity: 1;
		}
	}

	@media (min-width: 900px) {
		.twin-grid {
			grid-template-columns: 1.05fr 0.95fr;
		}
	}
</style>
