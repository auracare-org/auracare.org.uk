<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { cookieConsent } from '$lib/stores/cookieConsent';
	import { loadPostHog, capture } from '$lib/analytics/posthog';

	const pdf = '/auracare-deck.pdf';

	// Log a distinct `deck_viewed` event so investor opens are easy to spot in
	// PostHog. Consent-gated like the rest of our analytics: it fires the first
	// time the visitor has accepted, and loadPostHog() (idempotent, also called
	// from the layout) guarantees the SDK is ready before we capture.
	onMount(() => {
		let fired = false;
		return cookieConsent.subscribe((consent) => {
			if (consent !== 'accepted' || fired) return;
			fired = true;
			loadPostHog().then(() =>
				capture('deck_viewed', { referrer: document.referrer || null })
			);
		});
	});
</script>

<Seo
	title="Deck"
	description="The Auracare AI pitch deck."
	path="/deck"
	type="article"
	noindex
/>

<section class="deck" aria-label="Auracare AI deck">
	<object data={pdf} type="application/pdf" title="Auracare AI deck" class="deck__frame">
		<div class="deck__fallback">
			<p>Your browser can’t display the deck inline.</p>
			<a class="btn" href={pdf} download>Download the deck (PDF)</a>
		</div>
	</object>
</section>

<style>
	.deck {
		width: 100%;
		/* Fill the viewport below the fixed site header (set in +layout.svelte). */
		height: calc(100dvh - var(--header-h, 92px));
		background: #0b1220;
	}

	.deck__frame {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.deck__fallback {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		height: 100%;
		padding: 2rem;
		text-align: center;
		color: #e5e7eb;
	}
</style>
