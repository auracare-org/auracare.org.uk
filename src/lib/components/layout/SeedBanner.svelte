<script lang="ts">
	import { onMount } from 'svelte';
	import { CONTACT } from '$lib/data/company';

	let dismissed = $state(false);

	onMount(() => {
		try {
			dismissed = localStorage.getItem('auracare-seed-dismissed') === '1';
		} catch {
			/* storage unavailable — keep showing */
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
				We’re raising our <span class="seed-em">seed round</span>
				<span class="seed-sep">—</span>
				<a href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Seed%20round">
					get in touch: {CONTACT.seed}
				</a>
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
	.seed-banner {
		background: var(--color-surface-dark);
		border-bottom: 1px solid var(--color-border-dark);
		color: #fff;
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
		color: rgba(226, 230, 240, 0.85);
		font-family: var(--font-family-mono);
		font-size: 0.74rem;
		font-weight: 400;
		letter-spacing: 0.02em;
		text-align: center;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	.seed-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: var(--color-primary-400);
	}
	.seed-em {
		font-weight: 600;
		color: #fff;
	}
	.seed-sep {
		opacity: 0.4;
	}
	.seed-text a {
		color: #fff;
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: rgba(255, 255, 255, 0.3);
		font-weight: 500;
	}
	.seed-text a:hover {
		text-decoration-color: #fff;
	}
	.seed-close {
		position: absolute;
		right: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.6);
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}
	.seed-close:hover {
		background: rgba(255, 255, 255, 0.08);
		color: #fff;
	}
	@media (max-width: 640px) {
		.seed-close {
			right: -0.25rem;
		}
	}
</style>
