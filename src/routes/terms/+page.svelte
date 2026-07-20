<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, NON_DEVICE_DISCLAIMER } from '$lib/data/company';

	const lastUpdated = '14 July 2026';
</script>

<Seo
	title="Terms"
	description="The terms for using Auracare's website and the Auratwin waitlist."
	path="/terms"
/>

<section class="terms section-y">
	<div class="container-wide">
		<header class="terms-head">
			<span class="eyebrow" use:reveal>Legal</span>
			<h1 use:reveal={{ delay: 60 }}>Terms of Service</h1>
			<p class="lede" use:reveal={{ delay: 140 }}>
				These terms govern your use of the Auracare website and the Auratwin waitlist. Please read
				them carefully. This is a draft; full product terms will follow when Auratwin launches.
			</p>
			<p class="meta" use:reveal={{ delay: 200 }}>Last updated: {lastUpdated}</p>
		</header>

		<article class="prose" use:reveal={{ delay: 120 }}>
			<h2>1. Acceptance of these terms</h2>
			<p>
				By accessing or using this website (the &ldquo;Site&rdquo;) or by joining the Auratwin
				waitlist, you agree to be bound by these Terms of Service (the &ldquo;Terms&rdquo;). If you
				do not agree with any part of these Terms, please do not use the Site or join the waitlist.
			</p>

			<h2>2. Who we are</h2>
			<p>
				The Site is operated by {CONTACT.legalName}, a company registered in {CONTACT.jurisdiction}
				(&ldquo;Auracare&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). References
				to &ldquo;you&rdquo; mean the person accessing the Site or joining the waitlist.
			</p>

			<h2>3. The Site and the waitlist are informational</h2>
			<p>
				The Site is provided for general information about Auracare and the products we are
				building. Auratwin is not yet generally available. Joining the waitlist registers your
				interest and lets us contact you about early access; it does not create any contract to
				supply a product, grant you access to any product, or guarantee availability, timing,
				features or pricing. We may change, suspend or withdraw any part of the Site or the waitlist
				at any time.
			</p>

			<h2>4. Not a medical device and not medical advice</h2>
			<p>{NON_DEVICE_DISCLAIMER}</p>
			<p>
				Nothing on the Site, and nothing you receive through the waitlist, is medical advice,
				diagnosis or treatment, and none of it should be relied upon as a substitute for the advice
				of a qualified healthcare professional. Always seek the guidance of your doctor, pharmacist
				or another suitably qualified provider with any questions you have about a medical
				condition, and never disregard or delay seeking that advice because of something you have
				read here.
			</p>
			<p>
				<strong
					>If you think you may be experiencing a medical emergency, call your local emergency
					services immediately</strong
				>
				(for example 999 or NHS 111 in the United Kingdom).
			</p>

			<h2>5. Acceptable use</h2>
			<p>You agree not to:</p>
			<ul>
				<li>use the Site in any way that breaks any applicable law or regulation;</li>
				<li>
					attempt to gain unauthorised access to the Site, its servers, or any connected system or
					network;
				</li>
				<li>
					interfere with, disrupt, or place an unreasonable load on the Site, or introduce any
					malicious code;
				</li>
				<li>
					scrape, harvest, or collect information about other users, or submit false, misleading or
					someone else&rsquo;s details to the waitlist;
				</li>
				<li>
					copy, reproduce, or redistribute the Site&rsquo;s content except as permitted by these
					Terms or applicable law.
				</li>
			</ul>

			<h2>6. Intellectual property</h2>
			<p>
				The Site and all of its content, including text, design, graphics, logos, and the Auracare
				name and brand, are owned by Auracare or licensed to us, and are protected by intellectual
				property laws. We grant you a limited, personal, non-exclusive and revocable licence to view
				the Site for your own information. You may not otherwise use, copy or exploit any part of
				the Site without our prior written permission.
			</p>

			<h2>7. Third-party links and services</h2>
			<p>
				The Site may link to third-party sites and services that we do not control: for example our
				ontology explorer at
				<a href={CONTACT.ontologyUrl} target="_blank" rel="noreferrer noopener"
					>{CONTACT.ontologyUrl}</a
				>, and the wearable and health-platform providers whose devices you may one day connect.
				Those links are provided for convenience and on an &ldquo;as is&rdquo; basis. We are not
				responsible for the content, accuracy, availability or practices of any third party, and
				their inclusion does not imply our endorsement. Your use of any third-party service is
				governed by that party&rsquo;s own terms and privacy policy.
			</p>

			<h2>8. Disclaimers</h2>
			<p>
				The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the
				fullest extent permitted by law, we make no warranties or representations of any kind,
				whether express or implied, about the Site&rsquo;s completeness, accuracy, reliability or
				fitness for a particular purpose. We do not warrant that the Site will be uninterrupted,
				secure or free from errors.
			</p>

			<h2>9. Limitation of liability</h2>
			<p>
				Nothing in these Terms limits or excludes our liability where it would be unlawful to do so,
				including for death or personal injury caused by our negligence, or for fraud or fraudulent
				misrepresentation. Subject to that, and to the fullest extent permitted by law, we will not
				be liable for any indirect or consequential loss, or for any loss of profits, revenue, data
				or goodwill, arising out of or in connection with your use of, or inability to use, the Site
				or the waitlist. Your statutory rights as a consumer are not affected.
			</p>

			<h2>10. Changes to these terms</h2>
			<p>
				We may update these Terms from time to time. When we do, we will revise the &ldquo;Last
				updated&rdquo; date above. Any changes take effect once posted on this page, and your
				continued use of the Site after they are posted means you accept the revised Terms. We
				encourage you to review this page periodically.
			</p>

			<h2>11. Governing law</h2>
			<p>
				These Terms, and any dispute or claim arising out of or in connection with them, are
				governed by the laws of {CONTACT.jurisdiction} and are subject to the exclusive jurisdiction
				of the courts of {CONTACT.jurisdiction}.
			</p>

			<h2>12. Contact us</h2>
			<p>
				If you have any questions about these Terms, please contact us at
				<a href="mailto:{CONTACT.general}">{CONTACT.general}</a>.
			</p>

			<p class="footnote">
				<em
					>This is a draft covering the Site and the Auratwin waitlist only. Full product terms will
					accompany Auratwin&rsquo;s launch.</em
				>
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
	.footnote {
		margin-top: 2.4rem;
		padding-top: 1.4rem;
		border-top: 1px solid var(--color-neutral-200);
		font-size: 0.92rem;
		color: var(--color-neutral-600);
	}
</style>
