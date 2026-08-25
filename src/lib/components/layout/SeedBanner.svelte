<script lang="ts">
	import { onMount } from 'svelte';

	let dismissed = $state(false);

	onMount(() => {
		try {
			dismissed = localStorage.getItem('auracare-seed-dismissed') === '1';
		} catch {
			/* storage unavailable, keep showing */
		}
	});

	function dismiss() {
		dismissed = true;
		try {
			localStorage.setItem('auracare-seed-dismissed', '1');
		} catch {
			/* ignore */
		}
	}
</script>

{#if !dismissed}
	<div class="seed-banner" role="region" aria-label="Fundraising announcement">
		<div class="container-wide seed-inner">
			<p class="seed-text">
				<span class="seed-dot" aria-hidden="true"></span>
				<span>We’re raising our <span class="seed-em">seed round</span>.</span>
				<a href="/investors">See the investor page →</a>
			</p>
			<button class="seed-close" onclick={dismiss} aria-label="Dismiss announcement">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M6 6l12 12M18 6L6 18"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	/* Paper, not a black slab. A dark bar pinned above a bone page read as a
	   system notification bar rather than as part of the site, and it was the
	   first thing on every page. It now sits on the alternate paper tone with
	   the brand blue doing the work of getting noticed. */
	.seed-banner {
		background: var(--color-surface-alt);
		border-bottom: 1px solid var(--color-rule);
		color: var(--color-ink);
		position: relative;
		overflow: hidden;
	}
	.seed-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding-block: 0.55rem;
		position: relative;
	}
	.seed-text {
		margin: 0;
		color: var(--color-ink-soft);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-align: center;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	.seed-dot {
		width: 0.35rem;
		height: 0.35rem;
		background: var(--color-primary-600);
	}
	.seed-em {
		font-weight: 600;
		color: var(--color-ink);
	}
	/* A standalone call to action, not a link inside a sentence, so the inline
	   exemption from the target-size rule does not cover it — and it sits on
	   every page of the site. */
	.seed-text a {
		display: inline-flex;
		align-items: center;
		@media (pointer: coarse) {
			min-height: 44px;
		}
		color: var(--color-primary-600);
		font-weight: 600;
		border-bottom: 1px solid var(--color-primary-600);
		padding-bottom: 0.05rem;
		transition: opacity var(--duration-hover) ease;
	}
	.seed-text a:hover {
		opacity: 0.7;
	}
	.seed-close {
		position: absolute;
		/* Flush with the container edge: a negative offset grew the hit area
		   past it, where the banner's own `overflow: hidden` clipped part of the
		   target away again. The box grows inward instead. */
		right: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		/* 28x28 was under every tap-target guideline; the icon inside is
		   unchanged, only the area around it grows. */
		width: 44px;
		height: 44px;
		color: var(--color-ink-faint);
		transition:
			background var(--duration-hover) ease,
			color var(--duration-hover) ease;
	}
	.seed-close:hover {
		background: var(--color-rule);
		color: var(--color-ink);
	}
	@media (max-width: 640px) {
		.seed-close {
			right: 0;
		}
	}
</style>
