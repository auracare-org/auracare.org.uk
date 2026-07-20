<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import ProductsNow from '$lib/components/home/ProductsNow.svelte';
	import MeetTwin from '$lib/components/home/MeetTwin.svelte';
	import HowItWorks from '$lib/components/home/HowItWorks.svelte';
	import MeetAuracare from '$lib/components/home/MeetAuracare.svelte';
	import WhyWeWin from '$lib/components/home/WhyWeWin.svelte';
	import ConsentSafety from '$lib/components/home/ConsentSafety.svelte';
	import StoryTimeline from '$lib/components/home/StoryTimeline.svelte';
	import WorldMap from '$lib/components/home/WorldMap.svelte';
	import MarketTraction from '$lib/components/home/MarketTraction.svelte';
	import TechnologyTeaser from '$lib/components/home/TechnologyTeaser.svelte';
	import TeamRaise from '$lib/components/home/TeamRaise.svelte';
	import WaitlistCTA from '$lib/components/home/WaitlistCTA.svelte';
</script>

<Seo
	title="Auracare: the world's most personalised healthcare"
	description="Auracare builds two products on one patient model: Auratwin, a wellness companion that lives in your messages, and Auracare, clinical decision support that works inside the consultation. Now raising our seed round."
	path="/"
/>

<Hero />
<ProductsNow />
<MeetTwin />
<ConsentSafety />
<HowItWorks />
<MeetAuracare />
<WhyWeWin />
<StoryTimeline />
<WorldMap />
<MarketTraction />
<TechnologyTeaser />
<TeamRaise />
<WaitlistCTA />
