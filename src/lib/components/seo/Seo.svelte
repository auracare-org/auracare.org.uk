<script lang="ts">
	interface Props {
		title: string;
		description: string;
		/** Path beginning with "/", e.g. "/product". */
		path?: string;
		/** Absolute or root-relative OG image URL. */
		image?: string;
		/** Alt text describing the social/OG image. */
		imageAlt?: string;
		type?: 'website' | 'article';
		noindex?: boolean;
	}

	let {
		title,
		description,
		path = '/',
		image = '/og/auracare-og.png',
		imageAlt = 'Auracare AI — two products on one patient model',
		type = 'website',
		noindex = false
	}: Props = $props();

	const BASE = 'https://auracare.org.uk';
	const canonical = BASE + path;
	const absImage = image.startsWith('http') ? image : BASE + image;
	const fullTitle = title.includes('Auracare') ? title : `${title} · Auracare AI`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large" />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Auracare AI" />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={absImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absImage} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
