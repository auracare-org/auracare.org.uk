<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/seo/Seo.svelte';

	// Falls back gracefully when SvelteKit hands us an error with no status/message
	// (e.g. an unexpected client-side failure).
	const status = $derived(page.status || 404);
	const isNotFound = $derived(status === 404);
	const heading = $derived(isNotFound ? 'Page not found' : 'Something went wrong');
	const message = $derived(
		isNotFound
			? 'The page you’re looking for doesn’t exist, or may have moved.'
			: page.error?.message || 'An unexpected error occurred. Please try again.'
	);
</script>

<Seo title={heading} description={message} path="/404" noindex />

<section class="error">
	<p class="error__code">{status}</p>
	<h1 class="error__heading">{heading}</h1>
	<p class="error__message">{message}</p>
	<a class="btn btn-primary btn-lg" href="/">Back to home</a>
</section>

<style>
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		min-height: calc(100dvh - var(--header-h, 92px));
		padding: 4rem 1.5rem 6rem;
		text-align: center;
	}

	.error__code {
		font-size: clamp(3rem, 12vw, 6rem);
		font-weight: 700;
		line-height: 1;
		color: var(--color-primary-600);
		margin: 0;
	}

	.error__heading {
		font-size: clamp(1.5rem, 5vw, 2.25rem);
		font-weight: 600;
		color: var(--color-ink);
		margin: 0;
	}

	.error__message {
		max-width: 34rem;
		color: var(--color-ink-soft);
		margin: 0 0 1rem;
	}
</style>
