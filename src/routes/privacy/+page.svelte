<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
</script>

<Seo
	title="Privacy"
	description="How Auracare handles your data across the UK, US, Canada and Australia: explicit consent, sensitive health data, and the regional privacy rights that apply to you."
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
		<p class="meta" use:reveal={{ delay: 200 }}>Last updated: 22 July 2026</p>
	</div>
</section>

<section class="policy section-y">
	<div class="container-wide">
		<article class="prose">
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
				clinically interpret your data. Aura is an AI companion, and will always tell you so: you
				are never talking to a person.
			</p>
			<p>
				Auratwin launches in the <strong
					>United Kingdom, the United States, Canada and Australia</strong
				>. The whole of this policy applies wherever you are; the
				<a href="#regional">regional terms</a> section adds the rights and commitments specific to
				your region, and Washington and Nevada residents also have a dedicated
				<a href="/privacy/consumer-health-data">Consumer Health Data Privacy Policy</a>.
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
			<h3>What you tell Aura in conversation</h3>
			<p>
				Talking to Aura is how the service works, so your conversations are part of the data we
				process: the things you tell it about how you feel, what you ate and your habits, and the
				wellness inferences your twin draws from them (for example, your sleep baseline). Voice
				notes are transcribed and the audio is then discarded; we do not create voiceprints and we
				do not use biometric identification.
			</p>
			<h3>Precise location, only if you opt in</h3>
			<p>
				If you separately opt in, Auratwin processes your <strong>precise location</strong> to give your
				guidance context, such as time zones, travel and where your routines happen. This is optional:
				Auratwin works fully without it, and you can turn it off at any time. We never use your location
				to infer visits to healthcare facilities, and we do not geofence health services.
			</p>
			<p>
				Health data, whether it comes from a source you connect or from something you tell Aura, is
				<strong>sensitive personal data</strong>: special-category data under UK and EU law, and
				sensitive information under US, Canadian and Australian law. We treat it with the heightened
				protection that classification requires, wherever you are.
			</p>

			<h2 id="lawful-basis">Our lawful basis</h2>
			<p>
				We rely on your <strong>explicit consent</strong> (Article 9(2)(a) UK GDPR, and its regional
				equivalents such as EU GDPR Article 9, US state opt-in rules, Australian Privacy Principle 3
				and Canadian express consent) to process your health signals. That consent is:
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
			<p>
				We do not use your health data for advertising, and we do not sell data that identifies you.
			</p>

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
				this section as that infrastructure matures. Where data is processed outside your country,
				we put appropriate safeguards in place as required by applicable data protection law.
			</p>

			<h2 id="sharing">Sharing your data</h2>
			<p>
				<strong>We do not sell personal data that identifies you.</strong> We do not share your health
				data with third parties without your consent. We use a small number of service providers (for
				example, cloud hosting and message delivery) strictly to operate Auratwin; they act on our instructions
				under contract and may not use your data for their own purposes. We may disclose data where we
				are legally required to do so.
			</p>

			<h2 id="aggregated">Aggregated &amp; de-identified data</h2>
			<p>
				We may combine and transform the information we hold into <strong
					>aggregated or de-identified</strong
				> form that no longer identifies you, or any individual, and cannot reasonably be linked back
				to a person. Once information has been de-identified in this way it is no longer personal data
				about you. We may use and share it, for example to understand health and wellness trends, to
				carry out research, to develop and improve our products, and for other business purposes. Whenever
				we do, we commit to keeping it de-identified and to requiring anyone who receives it not to attempt
				to re-identify anyone from it.
			</p>

			<h2 id="retention">Retention &amp; deletion</h2>
			<p>
				We keep your personal data only for as long as we need it to provide the service to you, or
				as required by law. When you delete your account, or ask us to erase your data, we delete or
				irreversibly anonymise it within a reasonable period, except where we must retain something
				to meet a legal obligation.
			</p>

			<h2 id="your-rights">Your rights</h2>
			<p>Wherever you live, you have the right to:</p>
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
					<strong>complain</strong> to your data protection regulator. The regulator for your
					region, and any additional local rights, are set out in
					<a href="#regional">Regional terms</a>
					below.
				</li>
			</ul>
			<p>
				To exercise any of these, email
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>. We would always welcome the chance
				to resolve a concern directly before you approach a regulator.
			</p>

			<h2 id="regional">Regional terms</h2>
			<p>
				Everything above applies wherever you are. This section adds the commitments and rights
				specific to each region we launch in. Whichever region you are in, the way to exercise a
				right is the same: email <a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>.
			</p>

			<h3 id="uk-privacy">United Kingdom</h3>
			<p>
				The UK is our home market, and the policy above is written to UK law: we are the data
				controller, established in {CONTACT.jurisdiction}, processing your health data as
				<strong>special-category data</strong> under the <strong>UK GDPR</strong> on the basis of your
				explicit consent, with the ICO as our supervisory authority. A few UK-specific points sit alongside
				that:
			</p>
			<ul>
				<li>
					Proactive check-ins are part of the service you sign up for. Any purely promotional
					messaging follows <strong>PECR</strong>: we ask for consent first and include an opt-out
					in every such message.
				</li>
				<li>
					Before launch we complete a <strong>Data Protection Impact Assessment</strong> covering the
					large-scale processing of health data and location that Auratwin involves.
				</li>
				<li>
					You can complain to the
					<a href="https://ico.org.uk/" rel="noopener noreferrer" target="_blank"
						>Information Commissioner's Office</a
					>, though we would always welcome the chance to resolve a concern with you first.
				</li>
			</ul>

			<h3 id="us-privacy">United States</h3>
			<p>
				Auratwin is a consumer wellness product and is <strong>not covered by HIPAA</strong>; your
				protections come from federal consumer law and state privacy law, and from the promises in
				this policy. Where your state treats health data or precise location as sensitive data, we
				ask for your <strong>opt-in consent before processing it</strong>, whatever state you are
				in. You have the right to access, correct, delete and port your data, to appeal a decision
				we make about a request, and to withdraw consent at any time.
			</p>
			<ul>
				<li>
					<strong
						>We do not sell your personal data, and we do not share it for targeted advertising.</strong
					>
					Because we never do this, there is no need to opt out, but we still honour the
					<strong>Global Privacy Control</strong> signal.
				</li>
				<li>
					As a vendor of personal health records, we follow the FTC
					<strong>Health Breach Notification Rule</strong>: if your unsecured health data is ever
					breached or disclosed without your authorisation, we will notify you within 60 days.
				</li>
				<li>
					We never use your location to infer visits to healthcare facilities, and we do not
					geofence health services.
				</li>
				<li>
					<strong>Washington and Nevada residents:</strong> your consumer health data rights are set
					out in our separate
					<a href="/privacy/consumer-health-data">Consumer Health Data Privacy Policy</a>.
				</li>
			</ul>

			<h3 id="canada-privacy">Canada</h3>
			<p>
				We handle your data under <strong>PIPEDA</strong>. At launch Auratwin is offered in English
				and is <strong>not available in Quebec</strong>; if we open Quebec, we will first meet the
				requirements of its private-sector privacy law (<strong>Law 25</strong>), including service
				in French, and update this section. Your health data is sensitive, so we collect it only
				with your <strong>express consent</strong>, purpose by purpose. You can access and correct
				your data, withdraw consent, and ask us what we hold about you; optional features such as
				precise location can be switched off at any time. Proactive and promotional messages follow
				<strong>CASL</strong>: we message you only with your consent, and every promotional message
				identifies us and includes an unsubscribe. If we ever have a breach creating a real risk of
				significant harm, we will notify you and report it to the Office of the Privacy Commissioner
				of Canada. You may complain to the
				<a href="https://www.priv.gc.ca/" rel="noopener noreferrer" target="_blank">OPC</a>.
			</p>

			<h3 id="australia-privacy">Australia</h3>
			<p>
				We handle your data under the <strong>Privacy Act 1988</strong> and the Australian Privacy
				Principles. Your health data is <strong>sensitive information</strong>, collected only with
				your consent. Your data is processed outside Australia, in the United Kingdom, the European
				Union and the United States by us and the service providers described above; we remain
				accountable for it under APP 8 wherever it is processed. Commercial electronic messages
				follow the <strong>Spam Act 2003</strong>: consent first, clear identification, and a
				working unsubscribe in every message. Eligible data breaches are notified to you and to the
				OAIC under the Notifiable Data Breaches scheme, and you may complain to the
				<a href="https://www.oaic.gov.au/" rel="noopener noreferrer" target="_blank">OAIC</a>.
			</p>

			<h3 id="ireland-privacy">Ireland &amp; the EEA</h3>
			<p>
				Auratwin is <strong>not currently available in Ireland or the wider EEA</strong>. This
				release does not launch there, and we do not offer the service to, or collect data from,
				people in the EEA. When we do open an EEA market, we will appoint and name our
				<strong>EU representative</strong> (Article 27 EU GDPR) here, set out the EU-specific rights
				and the relevant supervisory authority (such as the Irish
				<a href="https://www.dataprotection.ie/" rel="noopener noreferrer" target="_blank"
					>Data Protection Commission</a
				>), and update this section before any EEA launch.
			</p>

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
</style>
