<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PLATFORM_NOTE, NON_DEVICE_DISCLAIMER, WAITLIST_URL } from '$lib/data/company';
</script>

<section id="waitlist" class="waitlist aura-space">
	<div class="container-wide waitlist-grid">
		<div class="waitlist-copy">
			<span class="eyebrow" use:reveal>Join us</span>
			<h2 use:reveal={{ delay: 60 }}>
				Be first to meet <span class="text-gradient-l">Auratwin</span>.
			</h2>
			<p class="lede" use:reveal={{ delay: 140 }}>
				Auratwin turns the wearables you already wear into a living model of you, and checks in over
				the messaging apps you already use. Join the waitlist and we&rsquo;ll tell you the moment
				it&rsquo;s ready.
			</p>

			<p class="platform-note" use:reveal={{ delay: 200 }}>{PLATFORM_NOTE}</p>
		</div>

		<div class="waitlist-panel glass-card" use:reveal={{ delay: 120 }}>
			<div class="panel-copy">
				<p class="panel-title">Reserve your spot</p>
				<p class="panel-sub">
					Signing up takes under a minute. Prefer email? Write to
					<a href="mailto:{CONTACT.general}?subject=Auratwin%20waitlist">{CONTACT.general}</a>.
				</p>
			</div>

			<a class="submit" href={WAITLIST_URL}>Join the waitlist</a>

			<div class="investors">
				<p class="investors-line">Investors: we&rsquo;re raising our seed round.</p>
				<a
					class="investors-link"
					href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Seed%20round"
				>
					Talk to Stephen <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</div>
	</div>

	<p class="fineprint container-wide" use:reveal>{NON_DEVICE_DISCLAIMER}</p>
</section>

<style>
	.waitlist {
		position: relative;
		padding-block: clamp(4rem, 9vw, 7rem);
		overflow: hidden;
		border-top: 1px solid var(--color-border-dark);
	}
	.waitlist-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
	}
	.waitlist-copy h2 {
		font-size: clamp(2rem, 5vw, 3.2rem);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-block: 0.6rem 1.1rem;
	}
	.text-gradient-l {
		color: var(--color-primary-300);
	}
	.lede {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.6;
		max-width: 34rem;
	}
	.platform-note {
		margin-top: 1.25rem;
		font-size: 0.82rem;
		color: rgba(226, 232, 255, 0.6) !important;
		max-width: 32rem;
	}

	/* Panel */
	.waitlist-panel {
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--radius-4xl);
	}
	.panel-copy {
		margin-bottom: 1.25rem;
	}
	.panel-title {
		font-family: var(--font-family-heading);
		font-size: 1.25rem;
		font-weight: 600;
		color: #fff;
		margin-bottom: 0.4rem;
	}
	.panel-sub {
		font-size: 0.9rem;
		line-height: 1.55;
		color: rgba(234, 240, 255, 0.8) !important;
	}
	.panel-sub a {
		color: #cdd9ff;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.panel-sub a:hover {
		color: #fff;
	}

	.submit {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background: #fff;
		color: var(--color-ink);
		font-weight: 500;
		font-size: 1rem;
		padding: 0.8rem 1.5rem;
		border-radius: var(--radius-sm);
		transition: background 0.15s ease;
	}
	.submit:hover {
		background: #e8eaf2;
		color: var(--color-ink);
	}
	.submit:focus-visible {
		outline: 2px solid var(--color-primary-400);
		outline-offset: 3px;
	}

	/* Investors */
	.investors {
		margin-top: 1.75rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border-dark);
	}
	.investors-line {
		font-size: 0.9rem;
		color: rgba(234, 240, 255, 0.8) !important;
		margin-bottom: 0.5rem;
	}
	.investors-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 600;
		color: #eaf0ff;
	}
	.investors-link:hover {
		color: #fff;
	}
	.investors-link:focus-visible {
		outline: 2px solid #6180ff;
		outline-offset: 3px;
		border-radius: 4px;
	}

	.fineprint {
		position: relative;
		z-index: 1;
		margin-top: clamp(2rem, 5vw, 3rem);
		font-size: 0.78rem;
		line-height: 1.6;
		color: rgba(226, 232, 255, 0.5) !important;
		max-width: 52rem;
	}

	@media (min-width: 900px) {
		.waitlist-grid {
			grid-template-columns: 1fr 0.95fr;
		}
	}
</style>
