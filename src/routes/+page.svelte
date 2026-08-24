<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import ProductsNow from '$lib/components/home/ProductsNow.svelte';
	import CareLoop from '$lib/components/home/CareLoop.svelte';
	import TechnologyTeaser from '$lib/components/home/TechnologyTeaser.svelte';
	import StoryTimeline from '$lib/components/home/StoryTimeline.svelte';
	import MarketTraction from '$lib/components/home/MarketTraction.svelte';
	import TeamRaise from '$lib/components/home/TeamRaise.svelte';
	import WaitlistCTA from '$lib/components/home/WaitlistCTA.svelte';
</script>

<Seo
	title="Auracare: the world's most personalized healthcare"
	description="Auracare builds one living model of a person and two products on it: Auracle, a companion in your messages that builds your bio-psycho-social history, and the Auracare CDSS, clinical decision support inside the consultation. Auracle launches in September 2026."
	path="/"
/>

<!-- The homepage is the umbrella page: it states the two-product structure once
     (ProductsNow), shows how the products join up (CareLoop), proves the one
     live thing (TechnologyTeaser), then tells the company story. Product detail
     lives on /product and /product/auracare; the raise lives on /investors. -->
<Hero />
<ProductsNow />
<CareLoop />
<TechnologyTeaser />
<StoryTimeline />
<MarketTraction />
<TeamRaise />
<WaitlistCTA />
