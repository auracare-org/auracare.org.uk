<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
</script>

<Seo
	title="Consumer Health Data Privacy Policy"
	description="Our patient portal's Consumer Health Data Privacy Policy for Washington (My Health My Data Act) and Nevada residents: what we collect, why, your rights, and how to exercise them."
	path="/privacy/consumer-health-data"
	noindex={false}
/>

<PageHero
	title="Consumer Health Data"
	accent="Privacy Policy."
	accentOwnLine
	sub="This policy is for residents of Washington and Nevada, and anyone whose consumer health data is collected in those states. It supplements our main Privacy Policy and explains what consumer health data our patient portal (the “Portal”) collects, why, and the rights you have over it."
	meta="Consumer Health Data · Last updated 24 July 2026"
/>

<section class="policy section-y">
	<div class="container-wide">
		<article class="prose">
			<!-- The hero's supporting line used to carry this link. PageHero takes
			     plain text, so the cross-reference to the parent policy is stated
			     here instead rather than being lost. -->
			<p class="doc-note">
				This policy supplements our main <a href="/privacy">Privacy Policy</a>.
			</p>

			<h2 id="scope">Why this policy exists</h2>
			<p>
				The Washington My Health My Data Act and Nevada's consumer health data law (SB 370) give you
				specific rights over "consumer health data", which means personal information that
				identifies your past, present or future physical or mental health status, including data
				from wearables and inferences drawn from it.
				{CONTACT.legalName} ("Auracare", "we", "us") is the regulated entity for the purposes of these
				laws.
			</p>

			<h2 id="what-we-collect">The consumer health data we collect</h2>
			<p>With your consent, the Portal may collect:</p>
			<ul>
				<li>
					Health and wellness measurements from sources you connect: sleep, activity, heart rate,
					recovery, body composition and continuous glucose readings;
				</li>
				<li>
					Things you tell Aura in conversation about how you feel, what you ate, and your habits,
					and the wellness inferences the Portal draws from them (for example, your sleep baseline);
				</li>
				<li>
					Reproductive health data, only if you choose to tell Aura about your menstrual cycle (such
					as when a period starts), and the cycle context the Portal derives from it to interpret
					your other measurements. You are never asked for it, and the Portal works fully without
					it. Aura does not predict fertile windows or ovulation, does not give contraception or
					conception guidance, and does not tell you what a change in your cycle might mean
					medically;
				</li>
				<li>
					Precise location, only if you separately opt in, used to give your guidance context such
					as time zones and travel;
				</li>
				<li>
					Account and delivery information (name, email, the messaging identity you use) needed to
					run the service.
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
				We do not sell your consumer health data. Selling it would require your separate, signed
				authorisation under Washington law, and we do not seek one. We share it only with service
				providers (such as cloud hosting and message delivery) that process it on our instructions
				under contract, and with no one else unless you direct us to or the law requires it. We
				never use your location to infer visits to healthcare facilities, and we do not use
				geofencing around health services.
			</p>
			<p>
				Information that we have aggregated or de-identified so that it no longer identifies you,
				and cannot reasonably be linked back to you, is not consumer health data, and it never
				includes your precise location or your reproductive health data. We take reasonable measures
				to ensure it cannot be associated with you, we publicly commit to using and sharing it only
				in de-identified form and never attempting to re-identify it, and we contractually require
				anyone who receives it to commit to the same. Subject to those commitments, this policy does
				not restrict our use or sharing of that de-identified information.
			</p>

			<h2 id="rights">Your rights</h2>
			<ul>
				<li>
					Know and access the consumer health data we hold about you, including the third parties
					and affiliates it has been shared with;
				</li>
				<li>Withdraw consent to our collection or sharing of your consumer health data;</li>
				<li>
					Delete your consumer health data, including from our backups and from our processors;
				</li>
				<li>Appeal a decision we make about any of these requests.</li>
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
</style>
