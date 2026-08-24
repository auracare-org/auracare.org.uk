<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { AURACLE_URL, CONTACT, NON_DEVICE_DISCLAIMER, WAITLIST_URL } from '$lib/data/company';
</script>

<!--
  The page's one conversion moment.

  This used to lead with the consumer waitlist, which is the wrong ask for an
  umbrella site whose audience is clinicians, providers and investors. The
  enquiry leads; the waitlist stays, in the position it deserves.
-->
<section id="contact" class="closing aura-space">
	<div class="container-wide closing-inner">
		<h2 use:reveal>Talk to us.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			We are raising our seed round, and we are looking for clinical partners as the CDSS moves
			toward its first trials.
		</p>

		<div class="paths">
			<div class="path" use:reveal={{ delay: 100 }}>
				<h3>Investors</h3>
				<p>One founder replies directly, depending on where you invest from.</p>
				<a class="btn-solid" href="/investors#contact">See the investor page</a>
			</div>
			<div class="path" use:reveal={{ delay: 140 }}>
				<h3>Clinical partners</h3>
				<p>Hospitals, practices and pharmacies working on decision support.</p>
				<a
					class="btn-ghost"
					href="mailto:{CONTACT.clinical}?subject=Auracare%3A%20clinical%20partnership"
				>
					Write to our clinical team
				</a>
			</div>
		</div>

		<p class="aside" use:reveal>
			Auracle, our consumer product, launches on iMessage, WhatsApp and RCS. The waitlist is open at
			<a href={WAITLIST_URL} rel="noopener">app.auracle.health</a>, and the consumer site is
			<a href={AURACLE_URL} rel="noopener">auracle.health</a>.
		</p>
	</div>

	<p class="fineprint container-wide" use:reveal>{NON_DEVICE_DISCLAIMER}</p>
</section>

<style>
	.closing {
		padding-block: clamp(4rem, 8vw, 7rem) clamp(2.5rem, 5vw, 4rem);
	}
	h2 {
		font-size: clamp(2.1rem, 4.6vw, 3.6rem);
		line-height: 1.02;
		letter-spacing: -0.035em;
		margin: 0 0 1.25rem;
		color: #fff;
	}
	.lede {
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		line-height: 1.7;
		max-width: 52ch;
		margin: 0;
	}

	.paths {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: clamp(2rem, 4vw, 3rem);
		border-top: 1px solid rgba(255, 255, 255, 0.16);
	}
	.path h3 {
		font-size: 0.74rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-300);
		margin: 0 0 0.75rem;
	}
	.path p {
		font-size: 0.95rem;
		line-height: 1.65;
		margin: 0 0 1.5rem;
		max-width: 40ch;
	}

	.aside {
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		font-size: 0.92rem;
		line-height: 1.7;
		max-width: 62ch;
	}
	.aside a {
		color: #fff;
		border-bottom: 1px solid rgba(255, 255, 255, 0.35);
		transition: border-color var(--duration-hover) ease;
	}

	.fineprint {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		font-size: 0.78rem;
		line-height: 1.65;
		color: rgba(226, 230, 240, 0.45);
		max-width: 72ch;
	}

	@media (hover: hover) and (pointer: fine) {
		.aside a:hover {
			border-color: #fff;
		}
	}
	@media (min-width: 800px) {
		.paths {
			grid-template-columns: repeat(2, 1fr);
			gap: 3.5rem;
		}
	}
</style>
