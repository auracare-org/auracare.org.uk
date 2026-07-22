<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
</script>

<Seo
	title="Consumer Health Data Privacy Policy"
	description="Auratwin's Consumer Health Data Privacy Policy for Washington (My Health My Data Act) and Nevada residents: what we collect, why, your rights, and how to exercise them."
	path="/privacy/consumer-health-data"
	noindex={false}
/>

<section class="page-hero aura-space">
	<span
		class="bubble"
		style="--bubble-size:420px;--bubble-color:rgba(97,128,255,.30);--bubble-blur:20px; top:-14%; right:-6%"
		aria-hidden="true"
	></span>
	<div class="container-wide hero-inner">
		<span class="eyebrow" use:reveal>Consumer Health Data</span>
		<h1 use:reveal={{ delay: 60 }}>
			Consumer Health Data <span class="text-gradient-l">Privacy Policy</span>
		</h1>
		<p class="lede" use:reveal={{ delay: 140 }}>
			This policy is for residents of Washington and Nevada, and anyone whose consumer health data
			is collected in those states. It supplements our main
			<a href="/privacy">Privacy Policy</a> and explains what consumer health data Auratwin collects,
			why, and the rights you have over it.
		</p>
		<p class="meta" use:reveal={{ delay: 200 }}>Last updated: 21 July 2026</p>
	</div>
</section>

<section class="policy section-y">
	<div class="container-wide">
		<article class="prose">
			<h2 id="scope">Why this policy exists</h2>
			<p>
				The Washington <strong>My Health My Data Act</strong> and Nevada's consumer health data law
				(<strong>SB 370</strong>) give you specific rights over "consumer health data", which means
				personal information that identifies your past, present or future physical or mental health
				status, including data from wearables and inferences drawn from it.
				{CONTACT.legalName} ("Auracare", "we", "us") is the regulated entity for the purposes of these
				laws.
			</p>

			<h2 id="what-we-collect">The consumer health data we collect</h2>
			<p>With your consent, Auratwin may collect:</p>
			<ul>
				<li>
					<strong>Health and wellness measurements</strong> from sources you connect: sleep, activity,
					heart rate, recovery, body composition and continuous glucose readings;
				</li>
				<li>
					<strong>Things you tell Aura in conversation</strong> about how you feel, what you ate, and
					your habits, and the wellness inferences the twin draws from them (for example, your sleep
					baseline);
				</li>
				<li>
					<strong>Precise location</strong>, only if you separately opt in, used to give your
					guidance context such as time zones and travel;
				</li>
				<li>
					<strong>Account and delivery information</strong> (name, email, the messaging identity you
					use) needed to run the service.
				</li>
			</ul>
			<p>
				Voice notes are transcribed and the audio is then discarded. We do not create voiceprints
				and we do not use biometric identification.
			</p>

			<h2 id="sources">Where it comes from</h2>
			<p>
				Only from you: the sources you explicitly connect through each provider's own authorisation
				screen (for example Apple Health, Oura, Garmin or Dexcom), and the messages you send Aura.
				We do not buy health data, and we do not collect it from data brokers, advertisers or public
				sources.
			</p>

			<h2 id="why">Why we collect it</h2>
			<p>
				To build and maintain your personal digital twin, learn your baselines, notice meaningful
				changes, and send you the check-ins you asked for. We also use it to keep the service secure
				and reliable. We do not use your consumer health data for advertising.
			</p>

			<h2 id="sharing">Who we share it with</h2>
			<p>
				<strong>We do not sell your consumer health data.</strong> Selling it would require your separate,
				signed authorisation under Washington law, and we do not seek one. We share it only with service
				providers (such as cloud hosting and message delivery) that process it on our instructions under
				contract, and with no one else unless you direct us to or the law requires it. We never use your
				location to infer visits to healthcare facilities, and we do not use geofencing around health
				services.
			</p>
			<p>
				Information that we have aggregated or de-identified so that it no longer identifies you,
				and cannot reasonably be linked back to you, is not consumer health data. This policy does
				not restrict our use or sharing of that de-identified information, which we commit to
				keeping de-identified.
			</p>

			<h2 id="rights">Your rights</h2>
			<ul>
				<li>
					<strong>Know and access</strong> the consumer health data we hold about you, including the
					third parties and affiliates it has been shared with;
				</li>
				<li>
					<strong>Withdraw consent</strong> to our collection or sharing of your consumer health data;
				</li>
				<li>
					<strong>Delete</strong> your consumer health data, including from our backups and from our
					processors;
				</li>
				<li><strong>Appeal</strong> a decision we make about any of these requests.</li>
			</ul>
			<p>
				To exercise any of these rights, email
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>. We will confirm receipt, respond
				within the time the law allows, and never discriminate against you for exercising a right.
				If we deny a request, our response explains why and how to appeal; if your appeal is
				unsuccessful, you may contact the
				<a href="https://www.atg.wa.gov/" rel="noopener noreferrer" target="_blank"
					>Washington State Attorney General</a
				>
				or the
				<a href="https://ag.nv.gov/" rel="noopener noreferrer" target="_blank"
					>Nevada Attorney General</a
				>.
			</p>

			<h2 id="changes">Changes</h2>
			<p>
				If we materially change how we handle consumer health data, we will update this policy,
				change the date above, and tell you in-app or by email before the change takes effect. New
				uses of your consumer health data will always ask for your consent first.
			</p>

			<h2 id="contact">Contact</h2>
			<p>
				Questions about this policy? Write to us at
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>.
			</p>
		</article>
	</div>
</section>

<style>
	.page-hero {
		position: relative;
		padding-block: clamp(6rem, 12vw, 9rem) clamp(2.5rem, 6vw, 4rem);
		overflow: hidden;
	}
	.hero-inner {
		position: relative;
		z-index: 1;
		max-width: 46rem;
	}
	.page-hero h1 {
		font-size: clamp(2.2rem, 5.5vw, 3.6rem);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 1.1rem;
	}
	.text-gradient-l {
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.lede {
		font-size: clamp(1rem, 1.6vw, 1.18rem);
		line-height: 1.6;
		max-width: 40rem;
	}
	.lede a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.meta {
		margin-top: 1.25rem;
		font-size: 0.85rem;
		color: rgba(226, 232, 255, 0.6) !important;
	}

	.prose {
		max-width: 44rem;
		margin-inline: auto;
		color: var(--color-neutral-700);
		line-height: 1.7;
	}
	.prose :global(h2) {
		font-size: clamp(1.35rem, 2.6vw, 1.7rem);
		letter-spacing: -0.01em;
		margin-top: 2.75rem;
		margin-bottom: 0.75rem;
		color: var(--color-neutral-900);
	}
	.prose :global(p) {
		margin-block: 0.75rem;
	}
	.prose :global(ul) {
		margin-block: 0.75rem;
		padding-left: 1.25rem;
		list-style: disc;
	}
	.prose :global(li) {
		margin-block: 0.4rem;
	}
	.prose :global(strong) {
		color: var(--color-neutral-900);
		font-weight: 600;
	}
	.prose :global(a) {
		color: var(--color-primary-600);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.prose :global(a:hover) {
		color: var(--color-primary-700);
	}
</style>
