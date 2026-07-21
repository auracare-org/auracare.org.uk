<script lang="ts">
	import { CONTACT, NON_DEVICE_DISCLAIMER } from '$lib/data/company';
	const year = new Date().getFullYear();
</script>

<footer class="footer aura-space">
	<div class="container-wide">
		<div class="footer-grid">
			<div class="footer-brand">
				<img src="/SVG/auracare-white.svg" alt="Auracare" class="footer-logo" />
				<p class="footer-tag">The world's most personalised healthcare.</p>
				<a class="footer-ontology" href={CONTACT.ontologyUrl} target="_blank" rel="noopener">
					Explore the ontology
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"
						><path
							d="M7 17L17 7M17 7H9M17 7v8"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</a>
			</div>

			<nav class="footer-col" aria-label="Product">
				<h4>Product</h4>
				<a href="/product">Auratwin</a>
				<a href="/product/auracare">Auracare</a>
				<a href={CONTACT.ontologyUrl} target="_blank" rel="noopener">Ontology explorer</a>
				<a href="/#waitlist">Join the waitlist</a>
			</nav>

			<nav class="footer-col" aria-label="Company">
				<h4>Company</h4>
				<a href="/careers">Careers</a>
				<a href="mailto:{CONTACT.seed}">For investors</a>
			</nav>

			<nav class="footer-col" aria-label="Legal">
				<h4>Legal</h4>
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
				<a href="/cookies">Cookies</a>
				<a href="/accessibility">Accessibility</a>
			</nav>

			<div class="footer-col footer-contact">
				<h4>Contact</h4>
				<a href="mailto:{CONTACT.general}">{CONTACT.general}</a>
				<a href="mailto:{CONTACT.seed}">{CONTACT.seed}</a>
				<p class="footer-loc">{CONTACT.locations.join(' · ')}</p>
			</div>
		</div>

		<p class="footer-disclaimer">{NON_DEVICE_DISCLAIMER}</p>

		<div class="footer-bottom">
			<p>© {year} {CONTACT.legalName} · {CONTACT.jurisdiction}</p>
			<button class="footer-top" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>Back to top ↑</button
			>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding-block: clamp(3rem, 6vw, 5rem) 2rem;
		border-top: 1px solid var(--color-border-dark);
	}
	.footer-col h4 {
		font-family: var(--font-family-mono);
		font-weight: 700;
	}
	.footer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem 2rem;
	}
	.footer-brand {
		max-width: 20rem;
	}
	.footer-logo {
		height: 1.5rem;
		width: auto;
		margin-bottom: 1rem;
	}
	.footer-tag {
		color: rgba(226, 232, 255, 0.72) !important;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}
	.footer-ontology {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--color-primary-300);
		font-size: 0.85rem;
		font-weight: 600;
	}
	.footer-ontology:hover {
		color: #fff;
	}
	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.footer-col h4 {
		color: #fff;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin-bottom: 0.3rem;
	}
	.footer-col a {
		color: rgba(226, 232, 255, 0.7);
		font-size: 0.9rem;
	}
	.footer-col a:hover {
		color: #fff;
	}
	.footer-loc {
		color: rgba(226, 232, 255, 0.55) !important;
		font-size: 0.85rem;
	}
	.footer-disclaimer {
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		color: rgba(226, 232, 255, 0.5) !important;
		font-size: 0.78rem;
		line-height: 1.6;
		max-width: 52rem;
	}
	.footer-bottom {
		margin-top: 1.5rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
	}
	.footer-bottom p {
		color: rgba(226, 232, 255, 0.5) !important;
		font-size: 0.8rem;
	}
	.footer-top {
		color: rgba(226, 232, 255, 0.7);
		font-size: 0.8rem;
		font-weight: 600;
	}
	.footer-top:hover {
		color: #fff;
	}

	@media (min-width: 640px) {
		.footer-grid {
			grid-template-columns: 1.4fr 1fr 1fr;
		}
		.footer-brand {
			grid-column: 1 / -1;
		}
	}
	@media (min-width: 940px) {
		.footer-grid {
			grid-template-columns: 1.6fr 1fr 1fr 1fr 1.1fr;
		}
		.footer-brand {
			grid-column: auto;
		}
	}
</style>
