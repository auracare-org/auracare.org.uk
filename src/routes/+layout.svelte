<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import SeedBanner from '$lib/components/layout/SeedBanner.svelte';
	import Nav from '$lib/components/layout/Nav.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
	let headerEl = $state<HTMLElement | null>(null);

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
	<title>Auracare AI — Agentic healthcare, built on your digital twin</title>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Auracare Health LTD",
			"alternateName": "Auracare AI",
			"description": "Agentic healthcare built on a personal health digital twin. Our first product, Twin, turns your own health data into a living model of you.",
			"url": "https://auracare.org.uk",
			"logo": "https://auracare.org.uk/SVG/Asset 5.svg",
			"foundingDate": "2025",
			"founder": [
				{ "@type": "Person", "name": "Stephen Okita" },
				{ "@type": "Person", "name": "Hinlun Chen" },
				{ "@type": "Person", "name": "Tanush Pandey" }
			],
			"address": { "@type": "PostalAddress", "addressCountry": "GB" },
			"contactPoint": {
				"@type": "ContactPoint",
				"email": "hello@auracare.org.uk",
				"contactType": "Customer Service"
			}
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
