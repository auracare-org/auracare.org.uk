<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import ProductsNow from '$lib/components/home/ProductsNow.svelte';
	import MeetAuracare from '$lib/components/home/MeetAuracare.svelte';
	import TechnologyTeaser from '$lib/components/home/TechnologyTeaser.svelte';
	import MeetTwin from '$lib/components/home/MeetTwin.svelte';
	import HowItWorks from '$lib/components/home/HowItWorks.svelte';
	import ConsentSafety from '$lib/components/home/ConsentSafety.svelte';
	import CareLoop from '$lib/components/home/CareLoop.svelte';
	import WhyWeWin from '$lib/components/home/WhyWeWin.svelte';
	import StoryTimeline from '$lib/components/home/StoryTimeline.svelte';
	import WorldMap from '$lib/components/home/WorldMap.svelte';
	import MarketTraction from '$lib/components/home/MarketTraction.svelte';
	import TeamRaise from '$lib/components/home/TeamRaise.svelte';
	import WaitlistCTA from '$lib/components/home/WaitlistCTA.svelte';
</script>

<Seo
	title="Auracare: the world's most personalised healthcare"
	description="Auracare builds clinical decision support that works inside the consultation, and Auratwin, its consumer spin-out: a wellness companion that lives in your messages. Two products, one patient model. Now raising our seed round."
	path="/"
/>

<!-- Section order mirrors the investor deck: part one is the clinical side
     (Auracare + the technology under it), part two is the consumer spin-out
     (Auratwin), then the loop that joins them, and the company story. -->
<Hero />
<ProductsNow />
<MeetAuracare />
<TechnologyTeaser />
<MeetTwin />
<HowItWorks />
<ConsentSafety />
<CareLoop />
<WhyWeWin />
<StoryTimeline />
<WorldMap />
<MarketTraction />
<TeamRaise />
<WaitlistCTA />
