<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
</script>

<!--
  Centred, and sized to be the loudest thing on the site.

  There is no product photograph or candid worth showing yet, so the claim has
  to carry the screen on its own. That argues for symmetry and scale rather
  than a left column with empty space beside it: centred, the headline reads as
  a statement of position; left-aligned with nothing to its right, it read as a
  column that lost its image.
-->
<section class="hero">
	<div class="container-wide hero-inner">
		<span class="kicker" use:reveal>Clinical decision support infrastructure</span>

		<h1 use:reveal={{ delay: 80 }}>
			The world's most<br />
			<em>personalized healthcare.</em>
		</h1>

		<p class="hero-sub" use:reveal={{ delay: 160 }}>
			Encoding, reasoning and documentation that runs inside the appointment, grounded in the
			terminology medicine already uses.
		</p>

		<div class="hero-cta" use:reveal={{ delay: 220 }}>
			<a class="cta-primary" href="/investors#contact">We are raising a seed round</a>
			<a
				class="cta-ghost"
				href="mailto:{CONTACT.clinical}?subject=Auracare%3A%20clinical%20enquiry"
			>
				Clinical enquiries <span aria-hidden="true">&rarr;</span>
			</a>
		</div>
	</div>

	<dl class="standings">
		<div class="standing" use:reveal={{ delay: 260 }}>
			<dt>Ontology, live today</dt>
			<dd>532k</dd>
			<span class="standing-note">SNOMED CT concepts</span>
		</div>
		<div class="standing" use:reveal={{ delay: 300 }}>
			<dt>Pharmacy partnerships</dt>
			<dd>28</dd>
			<span class="standing-note">From our prior venture</span>
		</div>
		<div class="standing" use:reveal={{ delay: 340 }}>
			<dt>Examination devices</dt>
			<dd>3</dd>
			<span class="standing-note">Built, awaiting certification</span>
		</div>
		<div class="standing" use:reveal={{ delay: 380 }}>
			<dt>Operating from</dt>
			<dd>3</dd>
			<span class="standing-note">London, Hong Kong, San Francisco</span>
		</div>
	</dl>
</section>

<style>
	.hero {
		position: relative;
		padding-top: clamp(4rem, 11vw, 9rem);
	}
	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.kicker {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		padding-bottom: clamp(1.75rem, 4vw, 2.75rem);
	}

	/* The largest type on the site by a clear margin. Bold, tight and set on
	   three authored lines so the shape is deliberate at every width. */
	.hero h1 {
		font-size: clamp(2.5rem, 7vw, 5.8rem);
		line-height: 0.98;
		letter-spacing: -0.038em;
		font-weight: 600;
		margin: 0;
		text-wrap: balance;
	}
	/* One line in the brand blue. Nothing else on this screen is coloured. */
	.hero h1 em {
		font-style: normal;
		color: var(--color-primary-600);
	}

	.hero-sub {
		margin: clamp(1.75rem, 3.5vw, 2.5rem) auto 0;
		font-size: clamp(1.02rem, 1.4vw, 1.2rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 52ch;
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1.5rem 2rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		background: var(--color-ink);
		color: var(--color-surface-page);
		font-size: 0.76rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 1.15rem 2.25rem;
		border-radius: 2px;
		transition:
			background var(--duration-hover) ease,
			transform var(--duration-press) var(--ease-out);
	}
	.cta-primary:active {
		transform: scale(0.98);
	}
	.cta-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.76rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink);
		padding-bottom: 0.3rem;
		border-bottom: 1px solid var(--color-ink);
		transition:
			color var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}
	.cta-ghost span {
		transition: transform var(--duration-hover) var(--ease-out);
	}

	@media (hover: hover) and (pointer: fine) {
		.cta-primary:hover {
			background: var(--color-primary-600);
		}
		.cta-ghost:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
		.cta-ghost:hover span {
			transform: translateX(4px);
		}
	}

	/* A ruled rail of standing figures. It closes the hero with something
	   checkable rather than with more claim. */
	.standings {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		margin: clamp(4rem, 9vw, 7rem) 0 0;
		border-top: 1px solid var(--color-ink);
		border-bottom: 1px solid var(--color-rule);
	}
	.standing {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.4rem;
		padding: clamp(1.5rem, 3vw, 2.25rem) 1rem;
		border-right: 1px solid var(--color-rule);
		border-bottom: 1px solid var(--color-rule);
	}
	.standing dt {
		font-size: 0.64rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.standing dd {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		letter-spacing: -0.035em;
		line-height: 1;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}
	.standing-note {
		font-size: 0.78rem;
		line-height: 1.4;
		color: var(--color-ink-soft);
		max-width: 22ch;
	}

	@media (min-width: 760px) {
		.standings {
			grid-template-columns: repeat(4, 1fr);
			border-bottom: 0;
		}
		.standing {
			border-bottom: 0;
		}
		.standing:last-child {
			border-right: 0;
		}
	}
</style>
