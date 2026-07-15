<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import MeetTwin from '$lib/components/home/MeetTwin.svelte';
	import HowItWorks from '$lib/components/home/HowItWorks.svelte';
	import ConsentSafety from '$lib/components/home/ConsentSafety.svelte';
	import WaitlistCTA from '$lib/components/home/WaitlistCTA.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PLATFORM_NOTE } from '$lib/data/company';

	const onboarding = [
		{ t: 'Say hello', d: 'Twin introduces itself and asks what you’re hoping to get out of it.' },
		{ t: 'Connect your devices', d: 'Link the wearables and apps you already use — one tap each.' },
		{ t: 'Confirm your region', d: 'So Twin knows the right emergency and support lines for you.' },
		{ t: 'Set the tone', d: 'Choose how blunt Twin is, and set a safe word to cool it down.' },
		{
			t: 'Pick your rhythm',
			d: 'Contact style and quiet hours — Twin stays silent 22:00–07:00 by default.'
		},
		{
			t: 'Plain-language consent',
			d: 'A clear recap of exactly what you’ve shared, revocable any time.'
		}
	];

	const proactive = [
		{ t: 'Morning brief', d: 'A short read on how you slept and what today has room for.' },
		{ t: 'Evening wrap', d: 'A gentle close on the day — what moved, what to protect tomorrow.' },
		{
			t: 'Only-when-it-matters',
			d: 'A nudge triggered by your data — never noise for its own sake.'
		}
	];
</script>

<Seo
	title="Twin — your health, as a living model"
	description="Twin connects the wearables you already use, builds your health digital twin, and checks in over iMessage. A general-wellness companion — and the first step toward agentic clinical decision support."
	path="/product"
/>

<section class="phero aura-space">
	<div class="phero-orb" aria-hidden="true"></div>
	<div class="container-wide phero-inner">
		<span class="eyebrow" use:reveal>The product</span>
		<h1 use:reveal={{ delay: 60 }}>Meet Twin — your health,<br />as a living model.</h1>
		<p use:reveal={{ delay: 130 }}>
			Twin turns the data you already generate into a personal health digital twin, then checks in
			like someone who’s actually paying attention. It’s our first product — and the way we learn
			the digital organism that will power agentic clinical decision support.
		</p>
		<div class="phero-cta" use:reveal={{ delay: 200 }}>
			<a class="cta-primary" href="/#waitlist">Join the waitlist</a>
			<span class="phero-note">{PLATFORM_NOTE}</span>
		</div>
	</div>
</section>

<MeetTwin />
<HowItWorks />

<section class="proactive-sec section-y">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Proactive by design</span>
		<h2 use:reveal={{ delay: 60 }}>It reaches out — you don’t have to remember to check.</h2>
		<div class="proactive-grid">
			{#each proactive as p, i}
				<div class="glass-card p-card" use:reveal={{ delay: i * 80 }}>
					<h3>{p.t}</h3>
					<p>{p.d}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="onboard-sec section-y">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Getting started</span>
		<h2 use:reveal={{ delay: 60 }}>Set up in a few messages.</h2>
		<ol class="onboard-list">
			{#each onboarding as step, i}
				<li class="onboard-step" use:reveal={{ delay: i * 60 }}>
					<span class="onboard-num">{i + 1}</span>
					<div>
						<h3>{step.t}</h3>
						<p>{step.d}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<ConsentSafety />
<WaitlistCTA />

<style>
	.phero {
		padding-block: clamp(4rem, 10vw, 8rem) clamp(3rem, 7vw, 6rem);
		position: relative;
		overflow: clip;
	}
	.phero-orb {
		position: absolute;
		top: -20%;
		right: -10%;
		width: 40rem;
		height: 40rem;
		background: radial-gradient(circle, rgba(97, 128, 255, 0.4), transparent 60%);
		pointer-events: none;
	}
	.phero-inner {
		position: relative;
		z-index: 1;
		max-width: 46rem;
	}
	.phero h1 {
		font-size: clamp(2.2rem, 5.5vw, 4rem);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-block: 0.7rem 1.1rem;
	}
	.phero p {
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		max-width: 38rem;
	}
	.phero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem 1.5rem;
		margin-top: 1.75rem;
	}
	.cta-primary {
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 600;
		padding: 0.85rem 1.6rem;
		border-radius: 999px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
		transition: transform 0.2s ease;
	}
	.cta-primary:hover {
		transform: translateY(-2px);
		color: var(--color-primary-800);
	}
	.phero-note {
		font-size: 0.8rem;
		color: rgba(226, 232, 255, 0.55);
		max-width: 22rem;
	}

	.proactive-sec h2,
	.onboard-sec h2 {
		font-size: clamp(1.6rem, 3.4vw, 2.5rem);
		margin-block: 0.5rem 2rem;
		max-width: 30rem;
	}
	.proactive-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}
	.p-card {
		padding: 1.5rem;
	}
	.p-card h3 {
		font-size: 1.1rem;
		margin-bottom: 0.4rem;
	}
	.onboard-sec {
		background: linear-gradient(180deg, #f5f8ff, #eaefff);
	}
	.onboard-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		max-width: 46rem;
	}
	.onboard-step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		background: #fff;
		border: 1px solid rgba(79, 111, 237, 0.1);
		border-radius: var(--radius-md);
		padding: 1.15rem 1.3rem;
	}
	.onboard-num {
		flex: none;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		display: grid;
		place-items: center;
		font-family: var(--font-family-heading);
		font-weight: 700;
		color: #fff;
		background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
	}
	.onboard-step h3 {
		font-size: 1.02rem;
		margin-bottom: 0.2rem;
	}

	@media (min-width: 760px) {
		.proactive-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
