<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PLATFORM_NOTE } from '$lib/data/company';
	import { onMount } from 'svelte';
	import WaitlistModal from '$lib/components/shared/WaitlistModal.svelte';

	let showModal = $state(false);

	const devices = [
		{ name: 'Apple Health', icon: '/icons/brands/apple.svg', color: '#000000', x: 50, y: 5 },
		{ name: 'Oura', icon: '/icons/brands/oura.svg', color: '#0066CC', x: 90, y: 25 },
		{ name: 'Whoop', icon: '/icons/brands/whoop.svg', color: '#FF0050', x: 93, y: 62 },
		{ name: 'Dexcom', icon: '/icons/brands/dexcom.svg', color: '#00A3E0', x: 62, y: 92 },
		{ name: 'Garmin', icon: '/icons/brands/garmin.svg', color: '#007CC3', x: 14, y: 80 },
		{ name: 'Fitbit', icon: '/icons/brands/fitbit.svg', color: '#00B0B9', x: 7, y: 36 }
	];

	const avatarNames = [
		'sarah', 'marcus', 'priya', 'chen', 'amara', 'james',
		'fatima', 'oliver', 'yuki', 'elena', 'raj', 'sofia'
	];

	// Animation phases: 'chips' | 'dataflow' | 'avatar' | 'hold' | 'fadeout'
	type Phase = 'chips' | 'dataflow' | 'avatar' | 'hold' | 'fadeout';
	let phase: Phase = $state('chips');
	let currentAvatarName = $state(avatarNames[0]);
	let avatarIndex = $state(0);
	// Chip order offset — rotates which chip appears first each cycle
	let chipStartOffset = $state(0);

	// Compute the order indices for stagger: chip at position i gets delay based on its
	// distance from the current start offset (wrapping clockwise)
	let chipDelayOrder = $derived(
		devices.map((_, i) => (i - chipStartOffset + devices.length) % devices.length)
	);

	// Timing constants (ms)
	const CHIP_STAGGER = 180; // delay between each chip appearing
	const CHIP_PHASE_DURATION = CHIP_STAGGER * devices.length + 400; // all chips in + settle
	const DATAFLOW_DURATION = 1200;
	const AVATAR_DURATION = 600;
	const HOLD_DURATION = 1800;
	const FADEOUT_DURATION = 600;

	onMount(() => {
		let timeout: ReturnType<typeof setTimeout>;
		let cancelled = false;

		function runCycle() {
			if (cancelled) return;

			// Phase 1: Chips fade in
			phase = 'chips';

			timeout = setTimeout(() => {
				if (cancelled) return;
				// Phase 2: Data flows to center
				phase = 'dataflow';

				timeout = setTimeout(() => {
					if (cancelled) return;
					// Phase 3: Avatar morphs in
					phase = 'avatar';

					timeout = setTimeout(() => {
						if (cancelled) return;
						// Phase 4: Hold
						phase = 'hold';

						timeout = setTimeout(() => {
							if (cancelled) return;
							// Phase 5: Fade everything out
							phase = 'fadeout';

							timeout = setTimeout(() => {
								if (cancelled) return;
								// Advance to next avatar and randomize chip start
								avatarIndex = (avatarIndex + 1) % avatarNames.length;
								currentAvatarName = avatarNames[avatarIndex];
								chipStartOffset = Math.floor(Math.random() * devices.length);
								// Restart cycle
								runCycle();
							}, FADEOUT_DURATION);
						}, HOLD_DURATION);
					}, AVATAR_DURATION);
				}, DATAFLOW_DURATION);
			}, CHIP_PHASE_DURATION);
		}

		runCycle();

		return () => {
			cancelled = true;
			clearTimeout(timeout);
		};
	});
</script>

<section class="hero">
	<div class="container-wide hero-grid">
		<div class="hero-copy">
			<span class="eyebrow" use:reveal>Agentic healthcare</span>
			<h1 use:reveal={{ delay: 60 }}>
				Agentic healthcare, built on your <em>digital twin</em>.
			</h1>
			<p class="hero-sub" use:reveal={{ delay: 140 }}>
				Auracare turns your own health data into a living model of you. Our first product,
				<strong>Twin</strong>, is a wellness companion that acts on it — and the first step toward
				the agentic clinical decision support we're building. Shipping in the coming months.
			</p>
			<div class="hero-cta" use:reveal={{ delay: 220 }}>
				<button class="cta-primary" onclick={() => showModal = true}>Join the waitlist</button>
				<a
					class="cta-ghost"
					href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Seed%20round"
				>
					We're raising a seed round <span aria-hidden="true">→</span>
				</a>
			</div>
			<p class="hero-note" use:reveal={{ delay: 280 }}>{PLATFORM_NOTE}</p>
		</div>

		<div class="hero-visual" use:reveal={{ delay: 120 }} aria-hidden="true" data-phase={phase}>
			<svg class="hero-orbits" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
				{#each devices as device, i}
					<line
						x1={device.x}
						y1={device.y}
						x2="50"
						y2="50"
						stroke="#c6cbdc"
						stroke-width="0.35"
						stroke-dasharray="1.5 2.5"
						class="flow-line"
						style="--i: {chipDelayOrder[i]};"
					/>
				{/each}

				<circle cx="50" cy="50" r="34" fill="none" stroke="#dcdfe9" stroke-width="0.3" />
				<circle cx="50" cy="50" r="24" fill="none" stroke="#e4e7ef" stroke-width="0.3" />

				<g class="orbit">
					<circle
						cx="50"
						cy="50"
						r="34"
						fill="none"
						stroke="#2f4ec0"
						stroke-width="0.4"
						stroke-dasharray="4 208"
						stroke-linecap="round"
					/>
				</g>

				<circle cx="50" cy="50" r="14" fill="#ffffff" stroke="#dcdfe9" stroke-width="0.3" />
			</svg>

			{#each devices as device, i}
				<div
					class="chip"
					style="left:{device.x}%; top:{device.y}%; --i: {chipDelayOrder[i]};"
				>
					<div class="chip-icon" style="background-color: {device.color}">
						<img src={device.icon} alt={device.name} />
					</div>
					<span class="chip-name">{device.name}</span>
				</div>
			{/each}

			<div class="avatar-wrap">
				{#key currentAvatarName}
					<img
						src="https://www.tapback.co/api/avatar/{currentAvatarName}.webp"
						alt=""
						class="avatar"
					/>
				{/key}
				<span class="twin-label">your twin</span>
			</div>
		</div>
	</div>
</section>

<WaitlistModal bind:open={showModal} />

<style>
	.hero {
		min-height: calc(92svh - var(--header-h, 92px));
		display: flex;
		align-items: center;
		padding-block: clamp(3.5rem, 7vw, 6.5rem);
		background: var(--color-surface-page);
		border-bottom: 1px solid var(--color-border-default);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 5vw, 4.5rem);
		align-items: center;
	}
	.hero-copy h1 {
		font-size: clamp(2.6rem, 5.8vw, 4.4rem);
		line-height: 1.02;
		letter-spacing: -0.035em;
		font-weight: 600;
		margin-block: 1rem 1.4rem;
		max-width: 13ch;
	}
	.hero-copy h1 em {
		font-style: normal;
		color: var(--color-primary-600);
	}
	.hero-sub {
		font-size: clamp(1rem, 1.5vw, 1.14rem);
		line-height: 1.65;
		max-width: 33rem;
		color: var(--color-ink-soft);
	}
	.hero-sub strong {
		color: var(--color-ink);
		font-weight: 600;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.1rem;
		margin-top: 2rem;
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		background: var(--color-primary-600);
		color: #fff;
		font-weight: 500;
		font-size: 0.98rem;
		padding: 0.8rem 1.5rem;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			var(--shadow-xs);
		transition: background 0.15s ease;
	}
	.cta-primary:hover {
		background: var(--color-primary-700);
		color: #fff;
	}
	.cta-primary:focus-visible {
		outline: 2px solid var(--color-primary-400);
		outline-offset: 3px;
	}
	.cta-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--color-ink);
		font-weight: 500;
		font-size: 0.98rem;
		transition: color 0.15s ease;
	}
	.cta-ghost span {
		transition: transform 0.2s ease;
	}
	.cta-ghost:hover {
		color: var(--color-primary-600);
	}
	.cta-ghost:hover span {
		transform: translateX(3px);
	}
	.hero-note {
		margin-top: 1.5rem;
		font-size: 0.8rem;
		color: var(--color-ink-faint);
		max-width: 30rem;
	}

	/* Visual */
	.hero-visual {
		position: relative;
		width: 100%;
		max-width: 28rem;
		margin-inline: auto;
		aspect-ratio: 1;
	}
	.hero-orbits {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.orbit {
		transform-origin: 50% 50%;
		animation: spin 28s linear infinite;
	}

	/* Flow lines: hidden by default, animated during dataflow phase */
	.flow-line {
		stroke-dasharray: 1.5 2.5;
		stroke-dashoffset: 40;
		opacity: 0;
		transition:
			stroke-dashoffset 1s ease-out,
			opacity 0.3s ease;
		transition-delay: calc(var(--i) * 0.12s);
	}
	[data-phase='dataflow'] .flow-line,
	[data-phase='avatar'] .flow-line,
	[data-phase='hold'] .flow-line {
		stroke-dashoffset: 0;
		opacity: 1;
	}
	[data-phase='fadeout'] .flow-line {
		stroke-dashoffset: 0;
		opacity: 0;
		transition:
			opacity 0.5s ease;
	}

	/* Chips */
	.chip {
		position: absolute;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		gap: 0.45rem;
		background: #fff;
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
		padding: 0.35rem 0.7rem 0.35rem 0.35rem;
		border-radius: 999px;
		white-space: nowrap;
		opacity: 0;
		transition:
			opacity 0.45s ease-out,
			transform 0.45s ease-out;
		transition-delay: calc(var(--i) * 0.18s);
	}
	/* Chips phase: staggered clockwise fade-in */
	[data-phase='chips'] .chip,
	[data-phase='dataflow'] .chip,
	[data-phase='avatar'] .chip,
	[data-phase='hold'] .chip {
		opacity: 1;
		transform: translate(-50%, -50%) translateY(0);
	}
	/* Initial state for incoming chips (slightly offset up) */
	[data-phase='fadeout'] .chip {
		opacity: 0;
		transform: translate(-50%, -50%) translateY(4px);
		transition-delay: calc(var(--i) * 0.05s);
	}

	.chip-icon {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		flex-shrink: 0;
	}
	.chip-icon img {
		width: 100%;
		height: 100%;
		filter: brightness(0) invert(1);
	}
	.chip-name {
		color: var(--color-ink);
		font-size: 0.72rem;
		font-weight: 500;
	}

	/* Avatar */
	.avatar-wrap {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
		transition:
			opacity 0.5s ease-out,
			transform 0.5s ease-out;
		transform: translate(-50%, -50%) scale(0.88);
	}
	[data-phase='avatar'] .avatar-wrap,
	[data-phase='hold'] .avatar-wrap {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
	[data-phase='fadeout'] .avatar-wrap {
		opacity: 0;
		transform: translate(-50%, -50%) scale(0.92);
		transition:
			opacity 0.45s ease,
			transform 0.45s ease;
	}

	.avatar {
		width: 88px;
		height: 88px;
		border-radius: 50%;
		border: 3px solid #fff;
		box-shadow: 0 4px 24px rgba(47, 78, 192, 0.12);
		background: #f4f5f7;
	}
	.twin-label {
		margin-top: 0.6rem;
		color: var(--color-ink-faint);
		font-family: var(--font-family-mono);
		font-size: 0.6rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	/* Animations */
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* Responsive */
	@media (max-width: 640px) {
		.chip-name {
			display: none;
		}
		.chip {
			padding: 0.3rem;
		}
		.chip-icon {
			width: 24px;
			height: 24px;
			padding: 5px;
		}
		.avatar {
			width: 64px;
			height: 64px;
		}
	}

	@media (min-width: 900px) {
		.hero-grid {
			grid-template-columns: 1.05fr 0.95fr;
		}
	}
</style>
