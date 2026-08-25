<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import { prefersReducedMotion, revealNow } from '$lib/actions/motion';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { cookieConsent } from '$lib/stores/cookieConsent';
	import { loadPostHog, stopPostHog } from '$lib/analytics/posthog';
	import SeedBanner from '$lib/components/layout/SeedBanner.svelte';
	import Nav from '$lib/components/layout/Nav.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	let { children } = $props();
	let headerEl = $state<HTMLElement | null>(null);

	// Only load analytics once the visitor has actively accepted it. This mirrors
	// the promise on /cookies ("optional and off until you say yes") and keeps us
	// consent-first under UK PECR/GDPR. Guarded so it injects at most once.
	let analyticsLoaded = false;
	$effect(() => {
		if ($cookieConsent === 'accepted' && !analyticsLoaded) {
			analyticsLoaded = true;
			injectAnalytics({ mode: dev ? 'development' : 'production' });
			loadPostHog();
		} else if ($cookieConsent === 'rejected') {
			// Only does anything if they accepted earlier in the session and then
			// changed their mind; a straight decline never loads PostHog at all.
			stopPostHog();
		}
	});

	/* Cross-fade between pages.
	 *
	 * A client-side navigation used to swap the document instantly, which is
	 * the one moment on the site that reads as a hard cut. The View Transitions
	 * API hands the browser both frames and lets CSS dissolve between them; the
	 * `startViewTransition` guard means a browser without it simply navigates
	 * the way it always did. Resolving the promise is what tells the browser
	 * the new page is ready to be captured. */
	onNavigate((navigation) => {
		if (!document.startViewTransition || prefersReducedMotion()) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	/* Scroll position, which the view transition above otherwise swallows.
	 *
	 * SvelteKit resets the scroll itself on a normal navigation, but that reset
	 * happens inside the transition's DOM-update callback, where the captured
	 * old frame pins the viewport — so following a link from halfway down one
	 * page landed halfway down the next, and an anchor link landed at the top
	 * instead of at its target. Both are restored here, after the navigation
	 * has actually finished.
	 *
	 * Back and forward are left alone: the browser restores those positions and
	 * that is the behaviour people expect from them. */
	afterNavigate((navigation) => {
		if (navigation.type === 'popstate') return;
		const hash = navigation.to?.url.hash;
		if (hash) {
			const target = document.querySelector(hash);
			if (target) {
				// The header is fixed, so an element scrolled flush to the top of
				// the viewport sits behind it.
				const offset =
					parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) ||
					0;
				// `instant`, because `scroll-behavior: smooth` on the root would
				// otherwise animate the jump: arriving on a page should place you,
				// not scroll you there from wherever the last one ended.
				window.scrollTo({
					top: target.getBoundingClientRect().top + window.scrollY - offset - 16,
					behavior: 'instant'
				});
				revealNow();
				return;
			}
		}
		window.scrollTo({ top: 0, behavior: 'instant' });
		// After the scroll, so it measures against the viewport the reader
		// actually lands on.
		revealNow();
	});

	onMount(() => {
		if (!headerEl) return;
		const setH = () =>
			document.documentElement.style.setProperty('--header-h', `${headerEl!.offsetHeight}px`);
		setH();
		const ro = new ResizeObserver(setH);
		ro.observe(headerEl);
		return () => ro.disconnect();
	});
</script>

<svelte:head>
	<!-- Per-page <title>, description, canonical and social tags are set by
	     $lib/components/seo/Seo.svelte on each route. Only site-wide structured
	     data lives here. -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "Organization",
					"@id": "https://auracare.org.uk/#organization",
					"name": "Auracare Health Ltd",
					"alternateName": "Auracare AI",
					"description": "Auracare builds two products on one patient model: Auracle, a wellness companion that lives in your messages, and Auracare, clinical decision support that works inside the consultation.",
					"url": "https://auracare.org.uk",
					"logo": {
						"@type": "ImageObject",
						"url": "https://auracare.org.uk/icon-512.png",
						"width": 512,
						"height": 512
					},
					"foundingDate": "2025",
					"founder": [
						{ "@type": "Person", "name": "Tanush Pandey" },
						{ "@type": "Person", "name": "Stephen Okita" },
						{ "@type": "Person", "name": "Hinlun Chen" }
					],
					"address": { "@type": "PostalAddress", "addressCountry": "GB" },
					"contactPoint": {
						"@type": "ContactPoint",
						"email": "hello@auracare.org.uk",
						"contactType": "Customer Service"
					}
				},
				{
					"@type": "WebSite",
					"@id": "https://auracare.org.uk/#website",
					"name": "Auracare AI",
					"url": "https://auracare.org.uk",
					"description": "Two products on one patient model: Auracle, a wellness companion in your messages, and Auracare, clinical decision support inside the consultation.",
					"publisher": { "@id": "https://auracare.org.uk/#organization" },
					"inLanguage": "en-GB"
				}
			]
		}
	</script>
</svelte:head>

<div class="site-header" bind:this={headerEl}>
	<SeedBanner />
	<Nav />
</div>

<main style="padding-top: var(--header-h, 92px)">
	{@render children?.()}
</main>

<SiteFooter />
<CookieBanner />

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
	}
</style>
