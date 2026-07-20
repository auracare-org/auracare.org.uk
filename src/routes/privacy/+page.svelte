<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, EMERGENCY_ROUTING, NON_DEVICE_DISCLAIMER, TWIN_NEVER } from '$lib/data/company';
</script>

<Seo
	title="Privacy"
	description="How Auracare handles your data: UK GDPR, special-category health data, per-source revocable consent, and what Auratwin never does."
	path="/privacy"
	noindex={false}
/>

<section class="page-hero aura-space">
	<span
		class="bubble"
		style="--bubble-size:420px;--bubble-color:rgba(97,128,255,.30);--bubble-blur:20px; top:-14%; right:-6%"
		aria-hidden="true"
	></span>
	<div class="container-wide hero-inner">
		<span class="eyebrow" use:reveal>Privacy</span>
		<h1 use:reveal={{ delay: 60 }}>
			Your health data, <span class="text-gradient-l">on your terms</span>.
		</h1>
		<p class="lede" use:reveal={{ delay: 140 }}>
			This policy explains what we collect, why, and the control you keep over it. Auratwin connects
			only the sources you choose, and your consent is explicit, per-source and revocable at any
			time.
		</p>
		<p class="meta" use:reveal={{ delay: 200 }}>Last updated: 14 July 2026</p>
	</div>
</section>

<section class="policy section-y">
	<div class="container-wide">
		<article class="prose" use:reveal>
			<p class="evolving">
				<em
					>This policy is an early draft and will evolve (with clearer detail and, where relevant,
					supporting documentation) before Auratwin’s public launch. Material changes will be
					communicated in-app or by email.</em
				>
			</p>

			<h2 id="who-we-are">Who we are</h2>
			<p>
				{CONTACT.legalName} (“Auracare”, “we”, “us”) is the data controller for the personal data described
				in this policy. We are a company registered in {CONTACT.jurisdiction}. For any privacy
				question, or to exercise your rights, contact
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>.
			</p>

			<h2 id="scope">What this policy covers</h2>
			<p>
				This policy covers <strong>Auratwin</strong>, our consumer product that builds a personal
				health “digital twin” from the wearables and apps you connect, and checks in with you over
				iMessage.
			</p>
			<p>
				Auratwin is a <strong>general-wellness product, not a medical device</strong>. It is
				designed to help you understand your own patterns. It does not diagnose, treat, dose or
				clinically interpret your data.
			</p>

			<h2 id="data-we-process">The data we process</h2>
			<h3>Account data</h3>
			<p>
				When you join, we process the details needed to run your account (such as your name, email
				address and the mobile identity you use to message Auratwin), together with basic app and
				delivery logs that keep the service reliable and secure.
			</p>
			<h3>Health &amp; wellness data you connect</h3>
			<p>
				When you connect a source, Auratwin processes the general health and wellness information it
				provides, such as sleep, activity and recovery trends from the wearables and apps you choose
				to link. You decide which sources to connect, and you can disconnect any of them at any
				time.
			</p>
			<p>
				Health data is <strong>special-category personal data</strong> under the UK GDPR. We treat it
				with the heightened protection that classification requires.
			</p>

			<h2 id="lawful-basis">Our lawful basis</h2>
			<p>
				We rely on your <strong>explicit consent</strong> (Article 9(2)(a) UK GDPR) to process your health
				signals. That consent is:
			</p>
			<ul>
				<li>
					<strong>Explicit</strong>: you actively opt in before any health data is processed.
				</li>
				<li>
					<strong>Per-source</strong>: you consent to each connector separately, and can connect or
					disconnect them one at a time.
				</li>
				<li>
					<strong>Revocable at any time</strong>: withdrawing consent is as easy as giving it, and
					stops future processing of that source.
				</li>
			</ul>

			<h2 id="how-we-use-it">How we use your data</h2>
			<p>We use your data to:</p>
			<ul>
				<li>build and maintain your personal health digital twin;</li>
				<li>learn your baselines and notice meaningful changes;</li>
				<li>
					send you check-ins: a morning brief, an evening wrap, and nudges when your data warrants
					one;
				</li>
				<li>operate, secure and improve the service.</li>
			</ul>
			<p>We do not use your health data for advertising, and we do not sell it.</p>

			<h2 id="connectors">Wearable connectors</h2>
			<p>
				Auratwin only pulls data from the sources you explicitly connect. Nothing is collected from
				a source you have not authorised. Connections use each provider’s standard authorisation
				flow, and the access tokens we hold on your behalf are <strong>encrypted at rest</strong>.
				When you disconnect a source, we stop pulling new data from it.
			</p>

			<h2 id="residency">Where your data is processed</h2>
			<p>
				We are building Auratwin to process your data within our own UK/EU cloud tenant. This is a
				direction of travel, not a guarantee of every processing arrangement today; we will update
				this section as that infrastructure matures. Where data is processed outside the UK, we put
				appropriate safeguards in place as required by the UK GDPR.
			</p>

			<h2 id="sharing">Sharing your data</h2>
			<p>
				<strong>We do not sell your data.</strong> We do not share your health data with third parties
				without your consent. We use a small number of service providers (for example, cloud hosting
				and message delivery) strictly to operate Auratwin; they act on our instructions under contract
				and may not use your data for their own purposes. We may disclose data where we are legally required
				to do so.
			</p>

			<h2 id="retention">Retention &amp; deletion</h2>
			<p>
				We keep your personal data only for as long as we need it to provide the service to you, or
				as required by law. When you delete your account, or ask us to erase your data, we delete or
				irreversibly anonymise it within a reasonable period, except where we must retain something
				to meet a legal obligation.
			</p>

			<h2 id="your-rights">Your rights</h2>
			<p>Under the UK GDPR you have the right to:</p>
			<ul>
				<li><strong>access</strong> the personal data we hold about you;</li>
				<li><strong>rectify</strong> data that is inaccurate or incomplete;</li>
				<li><strong>erase</strong> your data (“the right to be forgotten”);</li>
				<li>
					<strong>port</strong> your data: receive it in a portable, machine-readable format;
				</li>
				<li>
					<strong>withdraw consent</strong> at any time, per source, without affecting past processing;
				</li>
				<li>
					<strong>complain</strong> to the Information Commissioner’s Office (ICO), the UK
					supervisory authority, at
					<a href="https://ico.org.uk/" rel="noopener noreferrer" target="_blank">ico.org.uk</a>.
				</li>
			</ul>
			<p>
				To exercise any of these, email
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>. We would always welcome the chance
				to resolve a concern directly before you approach the ICO.
			</p>

			<h2 id="emergencies">Emergencies &amp; safety routing</h2>
			<p>
				Auratwin is not an emergency service and cannot summon help. If Auratwin surfaces safety
				information, it routes you to the right lines for your region, for example:
			</p>
			<div class="routing" role="list">
				{#each EMERGENCY_ROUTING as region}
					<div class="routing-card" role="listitem">
						<h3>{region.region}</h3>
						<dl>
							{#each region.lines as line}
								<div class="routing-row">
									<dt>{line.label}</dt>
									<dd>{line.value}</dd>
								</div>
							{/each}
						</dl>
					</div>
				{/each}
			</div>
			<p class="routing-note">
				If you think you or someone else is in danger, contact your local emergency services
				immediately.
			</p>

			<h2 id="what-twin-never-does">What Auratwin never does</h2>
			<p>{NON_DEVICE_DISCLAIMER}</p>
			<ul class="never">
				{#each TWIN_NEVER as item}
					<li>{item}</li>
				{/each}
			</ul>

			<h2 id="contact">Contact</h2>
			<p>
				Questions about this policy, or about how we handle your data? Write to us at
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a> and we’ll be glad to help.
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
	.prose :global(h3) {
		font-size: 1.05rem;
		margin-top: 1.5rem;
		margin-bottom: 0.4rem;
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

	.evolving {
		background: var(--color-primary-50);
		border: 1px solid color-mix(in srgb, var(--color-primary-600) 18%, transparent);
		border-radius: var(--radius-md);
		padding: 1rem 1.25rem;
		color: var(--color-neutral-700);
	}

	.routing {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-block: 1.25rem;
	}
	.routing-card {
		border: 1px solid var(--color-neutral-200);
		border-radius: var(--radius-md);
		padding: 1.1rem 1.25rem;
		background: var(--color-neutral-0);
	}
	.routing-card h3 {
		margin-top: 0;
	}
	.routing-card dl {
		margin: 0;
	}
	.routing-row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.35rem;
		border-top: 1px solid var(--color-neutral-100);
	}
	.routing-row:first-child {
		border-top: 0;
	}
	.routing-row dt {
		color: var(--color-neutral-600);
	}
	.routing-row dd {
		margin: 0;
		font-weight: 600;
		color: var(--color-neutral-900);
	}
	.routing-note {
		font-size: 0.9rem;
		color: var(--color-neutral-600);
	}

	.never :global(li)::marker {
		color: var(--color-primary-500);
	}

	@media (min-width: 640px) {
		.routing {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
