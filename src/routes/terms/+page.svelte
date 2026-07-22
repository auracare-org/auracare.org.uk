<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, NON_DEVICE_DISCLAIMER } from '$lib/data/company';

	const lastUpdated = '22 July 2026';
</script>

<Seo
	title="Terms"
	description="The Terms of Service for the Auracare website, the Auratwin waitlist, and the Auratwin service."
	path="/terms"
/>

<section class="terms section-y">
	<div class="container-wide">
		<header class="terms-head">
			<span class="eyebrow" use:reveal>Legal</span>
			<h1 use:reveal={{ delay: 60 }}>Terms of Service</h1>
			<p class="lede" use:reveal={{ delay: 140 }}>
				These terms govern the Auracare website, the Auratwin waitlist and, once you’re using it,
				the Auratwin service itself. Please read them carefully.
			</p>
			<p class="meta" use:reveal={{ delay: 200 }}>Last updated: {lastUpdated}</p>
		</header>

		<article class="prose">
			<h2 id="acceptance">1. These terms, and when they apply</h2>
			<p>
				By using this website (the “Site”) or joining the Auratwin waitlist, you agree to these
				Terms of Service (the “Terms”). Before you first use <strong>Auratwin</strong>, our consumer
				wellness service, you will be asked to read and accept these Terms during onboarding; by
				using Auratwin you agree to all of them. If you do not agree with any part of these Terms,
				please do not use the Site, the waitlist or Auratwin.
			</p>

			<h2 id="who-we-are">2. Who we are</h2>
			<p>
				The Site and Auratwin are operated by {CONTACT.legalName}, a company registered in
				{CONTACT.jurisdiction} (“Auracare”, “we”, “us” or “our”). “You” means the person using the Site,
				the waitlist or Auratwin. For general questions, write to
				<a href="mailto:{CONTACT.general}">{CONTACT.general}</a>; for anything about your data,
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a>.
			</p>

			<h2 id="site-waitlist">3. The Site and the waitlist</h2>
			<p>
				The Site is provided for general information about Auracare and the products we are
				building. Joining the waitlist registers your interest and lets us contact you about early
				access; it does not create any contract to supply a product, grant you access to any
				product, or guarantee availability, timing, features or pricing. We may change, suspend or
				withdraw any part of the Site or the waitlist at any time. The Site may link to third-party
				sites and services we do not control; those links are provided for convenience, their
				content is not ours, and their inclusion does not imply our endorsement.
			</p>

			<h2 id="eligibility">4. Who can use Auratwin, and where</h2>
			<p>
				<strong>Auratwin is for adults: you must be 18 or older to use it.</strong> You confirm your
				age during onboarding, and the service is not directed at children. Auratwin is available in
				the <strong>United Kingdom, the United States, Canada and Australia</strong>, in English. It
				is not offered in Quebec at launch, and it is not offered in Ireland or the wider EEA.
				Please be truthful about where you are: parts of the service, such as which emergency number
				you are pointed to, depend on your region being right.
			</p>

			<h2 id="what-auratwin-is">5. What Auratwin is, and what it never does</h2>
			<p>
				Auratwin is an AI wellness companion that builds a personal “digital twin” from the sources
				you choose to connect and checks in with you over your messages. Aura is an AI: you are
				never talking to a person, and it will always tell you so.
			</p>
			<p>{NON_DEVICE_DISCLAIMER}</p>
			<p>
				Auratwin never diagnoses, treats or prescribes; never interprets a reading as a clinical
				result; and never replaces your doctor, pharmacist or emergency services. Its guidance is
				informational only. It is built from the data you connect, that data can be incomplete or
				wrong, and the guidance can be too. You remain responsible for your own decisions about your
				health and daily life.
			</p>

			<h2 id="emergencies">6. Auratwin is not for emergencies</h2>
			<p>
				Auratwin is not designed for emergencies and must not be relied on in one.
				<strong
					>If you think you may be experiencing a medical emergency, call your emergency services
					now: 999 in the United Kingdom, 911 in the United States and Canada, 000 in Australia.</strong
				>
				If you are struggling or in crisis, you can also reach Samaritans on 116 123 (UK), the 988 Suicide
				&amp; Crisis Lifeline (US and Canada), or Lifeline on 13 11 14 (Australia).
			</p>

			<h2 id="messaging-apps">7. Your account, and the messaging apps Auratwin lives in</h2>
			<p>
				Auratwin talks with you over messaging services you already use, such as iMessage, WhatsApp
				or RCS. Those platforms belong to third parties: your use of them is governed by their own
				terms, we do not control them, and we cannot guarantee that any message is delivered or on
				time. Please do not rely on Auratwin as your only channel for anything time-critical. Your
				messaging account and phone number must be your own; keep the details you give us accurate,
				and tell us if your number changes or is compromised so we stop messaging it. Your carrier’s
				usual message and data rates are between you and your carrier.
			</p>

			<h2 id="your-data">8. Your data, and the consents you give</h2>
			<p>
				How we handle your data is set out in our <a href="/privacy">Privacy Policy</a> and, for
				Washington and Nevada residents, our
				<a href="/privacy/consumer-health-data">Consumer Health Data Privacy Policy</a>. Your
				consent to health data processing is explicit, per-source and revocable at any time. Every
				optional consent is genuinely optional: Auratwin works with all of them declined, and
				declining or withdrawing one is never a breach of these Terms.
			</p>

			<h2 id="connected-sources">9. Connected sources</h2>
			<p>
				You choose which sources to connect, and each connection is authorised through that
				provider’s own permission screen: we never ask for your passwords or account credentials to
				another service. Those providers’ services are governed by their own terms, and the readings
				they supply are only as accurate as the devices and apps that produce them; we do not verify
				them. Only connect accounts that are yours. You can disconnect any source at any time, and
				we then stop pulling new data from it.
			</p>

			<h2 id="messages-from-aura">10. Messages from Aura</h2>
			<p>
				Proactive check-ins are part of the service, and you control them: you choose how present
				Aura is and your quiet hours, and “leave me alone today” always works. Promotional messages
				are different: we send them only with your separate consent, and every one identifies us and
				includes a working opt-out.
			</p>

			<h2 id="price">11. What Auratwin costs</h2>
			<p>
				Auratwin is free at launch. If we introduce a paid plan, we will tell you the price clearly
				and in advance, and we will never charge you without your express agreement. If you choose
				not to pay, you can simply stop using the service; your rights over your data are
				unaffected.
			</p>

			<h2 id="your-content">12. Your content</h2>
			<p>
				What you send Aura, and the data you connect, remain yours. You give us permission to host,
				store and process them solely to provide, secure and improve Auratwin, consistent with the <a
					href="/privacy">Privacy Policy</a
				> and the consents you have given; that permission ends when the data is deleted. If you send
				us ideas or feedback about the service, we may use them without owing you anything.
			</p>

			<h2 id="acceptable-use">13. Acceptable use</h2>
			<p>You agree not to:</p>
			<ul>
				<li>use the Site or Auratwin in any way that breaks any applicable law or regulation;</li>
				<li>
					use Auratwin about another person, or connect an account or device that is not yours,
					without that person’s agreement;
				</li>
				<li>
					attempt to gain unauthorised access to our systems, interfere with or disrupt the service,
					or introduce any malicious code;
				</li>
				<li>
					scrape, harvest or collect data from the Site or the service, resell or commercially
					exploit either, or use either to build a competing product or dataset;
				</li>
				<li>
					attempt to circumvent Auratwin’s safety features, or submit false, misleading or someone
					else’s details to us;
				</li>
				<li>
					copy, reproduce or redistribute the Site’s or the service’s content except as these Terms
					or applicable law allow.
				</li>
			</ul>

			<h2 id="ip">14. Our intellectual property</h2>
			<p>
				The Site, Auratwin and all of their content, including text, design, graphics, software,
				models, logos, and the Auracare and Auratwin names and brands, are owned by Auracare or
				licensed to us, and are protected by intellectual property laws. We grant you a limited,
				personal, non-exclusive, non-transferable and revocable licence to use the Site and Auratwin
				for your own personal, non-commercial use. No other rights are granted.
			</p>

			<h2 id="availability">15. Availability, and how the service will change</h2>
			<p>
				Auratwin is a new product and it will change: we may add, alter or remove features, and we
				may suspend some or all of the service for maintenance, security or legal reasons. We do not
				promise that the Site or Auratwin will be uninterrupted, secure or error-free. If we ever
				discontinue Auratwin entirely, we will give you reasonable advance notice where we can, and
				your rights to obtain a copy of your data and to have it deleted (see the
				<a href="/privacy">Privacy Policy</a>) are unaffected.
			</p>

			<h2 id="ending">16. Ending things</h2>
			<p>
				You can stop using Auratwin at any time, and you can ask us to delete your account and your
				data whenever you like. We may suspend or end your access if you materially breach these
				Terms, use the service unlawfully, or put the service or other people at genuine risk; where
				it is lawful and practicable, we will tell you why, and give you a chance to put things
				right when the problem can be fixed. Whenever your access ends, your data is handled as the <a
					href="/privacy">Privacy Policy</a
				> describes, and your deletion rights survive.
			</p>

			<h2 id="disclaimers">17. Disclaimers</h2>
			<p>
				The Site and Auratwin are provided on an “as is” and “as available” basis. To the fullest
				extent permitted by law, we make no warranties or representations of any kind, whether
				express or implied, about their completeness, accuracy, reliability, availability or fitness
				for a particular purpose. Nothing in these Terms takes away any right the law gives you that
				cannot be excluded or limited, including your statutory rights as a consumer in the UK, your
				consumer guarantees under the Australian Consumer Law, and the mandatory consumer
				protections of your state or province in the United States and Canada.
			</p>

			<h2 id="liability">18. Our liability</h2>
			<p>
				Nothing in these Terms limits or excludes our liability where it would be unlawful to do so,
				including for death or personal injury caused by our negligence, or for fraud or fraudulent
				misrepresentation. For Australian consumers, nothing excludes the consumer guarantees of the
				Australian Consumer Law; where the law allows us to limit our liability for a failure to
				meet them, it is limited to resupplying the service. Subject to all of that, and to the
				fullest extent permitted by law: we are not liable for any indirect or consequential loss,
				or for any loss of profits, revenue, data or goodwill; and our total liability to you
				arising out of or in connection with the Site, the waitlist or Auratwin is capped at the
				greater of the amounts you have paid us in the twelve months before the event giving rise to
				the claim and £100.
			</p>

			<h2 id="changes">19. Changes to these terms</h2>
			<p>
				We may update these Terms from time to time. If a change is material, we will tell you in
				advance, in-app or by email, and update the “Last updated” date above; continuing to use
				Auratwin after the change takes effect means you accept it. If you do not agree with a
				change, stop using the service and, if you wish, ask us to delete your account. Minor
				changes take effect when posted on this page.
			</p>

			<h2 id="law">20. Governing law, and where disputes go</h2>
			<p>
				These Terms are governed by the laws of {CONTACT.jurisdiction}. If you are a consumer living
				in the United States, Canada or Australia, you keep the protection of the mandatory consumer
				laws of the place you live, and you may bring a claim in your local courts; otherwise, the
				courts of {CONTACT.jurisdiction} have jurisdiction. Whatever the question, we would always welcome
				the chance to resolve it with you directly first: write to
				<a href="mailto:{CONTACT.general}">{CONTACT.general}</a>.
			</p>

			<h2 id="general">21. General</h2>
			<p>
				If any part of these Terms turns out to be unenforceable, the rest still stands. If we do
				not enforce a right straight away, we have not given it up. You may not transfer your rights
				under these Terms; we may transfer ours to a successor of our business, with notice to you
				and without reducing your rights. These Terms, together with the policies they link to, are
				the whole agreement between us about the Site, the waitlist and Auratwin, and no one else
				has any rights under them.
			</p>

			<h2 id="contact">22. Contact us</h2>
			<p>
				If you have any questions about these Terms, please contact us at
				<a href="mailto:{CONTACT.general}">{CONTACT.general}</a>. For anything about your data or
				privacy, <a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a> is the fastest route.
			</p>
		</article>
	</div>
</section>

<style>
	.terms {
		--measure: 44rem;
	}
	.terms-head {
		max-width: var(--measure);
		margin-inline: auto;
	}
	.terms-head h1 {
		font-size: clamp(2.2rem, 5vw, 3.2rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-block: 0.6rem 1rem;
	}
	.lede {
		font-size: clamp(1.02rem, 1.4vw, 1.18rem);
		line-height: 1.6;
		color: var(--color-neutral-700);
	}
	.meta {
		margin-top: 1rem;
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: var(--color-neutral-500);
	}

	.prose {
		max-width: var(--measure);
		margin-inline: auto;
		margin-top: clamp(2rem, 4vw, 3rem);
		color: var(--color-neutral-800);
		line-height: 1.72;
	}
	.prose h2 {
		font-size: clamp(1.15rem, 2vw, 1.4rem);
		line-height: 1.25;
		letter-spacing: -0.01em;
		margin-top: 2.4rem;
		margin-bottom: 0.75rem;
		color: var(--color-neutral-1000);
	}
	.prose h2:first-child {
		margin-top: 0;
	}
	.prose p {
		margin-bottom: 1rem;
	}
	.prose ul {
		margin: 0 0 1rem;
		padding-left: 1.3rem;
		list-style: disc;
	}
	.prose li {
		margin-bottom: 0.5rem;
	}
	.prose a {
		color: var(--color-primary-600);
		text-decoration: underline;
		text-underline-offset: 2px;
		word-break: break-word;
	}
	.prose a:hover {
		color: var(--color-primary-700);
	}
	.prose strong {
		font-weight: 600;
		color: var(--color-neutral-1000);
	}
</style>
