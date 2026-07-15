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
				We’re raising our <span class="seed-em">Seed round</span>
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
		background: linear-gradient(90deg, #dc2626, #ef4444 45%, #dc2626);
		color: #fff;
		position: relative;
		overflow: hidden;
	}
	.seed-banner::after {
		content: '';
		position: absolute;
		inset: 0;
		width: 22%;
		background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.35), transparent);
		animation: sheen 5.5s ease-in-out infinite;
		pointer-events: none;
	}
	.seed-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding-block: 0.5rem;
		position: relative;
	}
	.seed-text {
		margin: 0;
		color: #fff;
		font-size: 0.82rem;
		font-weight: 600;
		text-align: center;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	.seed-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: #fff;
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
		animation: pulseGlow 2s ease-in-out infinite;
	}
	.seed-em {
		font-weight: 800;
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 2px;
	}
	.seed-sep {
		opacity: 0.7;
	}
	.seed-text a {
		color: #fff;
		text-decoration: underline;
		text-underline-offset: 2px;
		font-weight: 700;
	}
	.seed-text a:hover {
		color: #fff;
		opacity: 0.85;
	}
	.seed-close {
		position: absolute;
		right: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.9);
		transition: background 0.2s ease;
	}
	.seed-close:hover {
		background: rgba(255, 255, 255, 0.18);
	}
	@media (max-width: 640px) {
		.seed-close {
			right: -0.25rem;
		}
	}
</style>
