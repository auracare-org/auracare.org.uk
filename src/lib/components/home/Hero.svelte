<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
</script>

<!--
  The hero is one statement and one photograph of the actual work.

  The orbit graphic that used to sit here was a consumer-app device — icons
  circling an avatar — and it made an infrastructure company read like a
  wearable. It is replaced by the real consultation kit, which is the most
  credible thing this company owns and the thing no competitor can copy from a
  screenshot.
-->
<section class="hero">
	<div class="container-wide">
		<div class="hero-index" use:reveal>
			<span class="hero-index-num">01</span>
			<span class="hero-index-label">Clinical decision support infrastructure</span>
		</div>

		<h1 use:reveal={{ delay: 60 }}>
			The consultation is<br />
			<em>where medicine happens.</em><br />
			We build for that room.
		</h1>

		<div class="hero-lower">
			<p class="hero-sub" use:reveal={{ delay: 140 }}>
				Auracare is clinical decision support infrastructure: encoding, reasoning and documentation
				that runs inside the appointment, grounded in the terminology medicine already uses.
			</p>
			<div class="hero-cta" use:reveal={{ delay: 200 }}>
				<a class="cta-primary" href="/investors">We are raising a seed round</a>
				<a
					class="cta-ghost"
					href="mailto:{CONTACT.clinical}?subject=Auracare%3A%20clinical%20enquiry"
				>
					Clinical enquiries <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</div>
	</div>

	<figure class="hero-figure" use:reveal={{ delay: 240 }}>
		<img
			src="/img/consultation-kit.jpg"
			alt="An Auracare tablet signed in beside a blood-pressure monitor, otoscope, recording stethoscope and specula, laid out on a clinic table"
			width="958"
			height="639"
			fetchpriority="high"
			decoding="async"
		/>
		<figcaption>
			<span class="figure-num">Fig. 01</span>
			<span>Auracare running beside our own examination hardware.</span>
		</figcaption>
	</figure>
</section>

<style>
	.hero {
		position: relative;
		padding-block: clamp(3.5rem, 8vw, 7rem) 0;
		border-bottom: 1px solid var(--color-rule);
	}

	/* A numbered index line, the way a report opens a chapter. Cheap to read,
	   and it sets the register for every section below. */
	.hero-index {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding-bottom: clamp(2rem, 5vw, 3.25rem);
	}
	.hero-index-num {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		color: var(--color-primary-600);
		font-variant-numeric: tabular-nums;
	}
	.hero-index-label {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}

	.hero h1 {
		/* The line breaks are authored, so the size is tuned to hold three
		   lines rather than to fill the width. */
		font-size: clamp(2.1rem, 5.4vw, 4.5rem);
		line-height: 1;
		letter-spacing: -0.035em;
		font-weight: var(--weight-display);
		margin: 0;
	}
	/* The middle line carries the idea, so it gets the brand's one accent.
	   Nothing else on this screen is blue. */
	.hero h1 em {
		font-style: normal;
		color: var(--color-primary-600);
	}

	/* Statement above, supporting detail below, separated by a rule that runs
	   the full measure. The asymmetry keeps it from reading as a centred
	   startup hero. */
	.hero-lower {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.75rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: clamp(1.5rem, 3vw, 2rem);
		border-top: 1px solid var(--color-rule);
	}
	.hero-sub {
		font-size: clamp(1rem, 1.35vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 44ch;
		margin: 0;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem;
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		background: var(--color-primary-600);
		color: #fff;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		padding: 1.05rem 2rem;
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
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink);
		padding-bottom: 0.25rem;
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
			background: var(--color-ink);
			color: #fff;
		}
		.cta-ghost:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
		.cta-ghost:hover span {
			transform: translateX(4px);
		}
	}

	/* The photograph runs wider than the text column and bleeds to the right
	   edge, so the page feels like it continues past the frame. */
	.hero-figure {
		margin: clamp(3rem, 6vw, 5rem) 0 0;
		position: relative;
	}
	.hero-figure img {
		display: block;
		width: 100%;
		height: clamp(18rem, 42vw, 34rem);
		object-fit: cover;
		object-position: 50% 42%;
		background: var(--color-surface-alt);
	}
	figcaption {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem 0;
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		color: var(--color-ink-faint);
	}
	.figure-num {
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}

	@media (min-width: 900px) {
		.hero-lower {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: start;
			gap: 3rem;
		}
		.hero-cta {
			justify-content: flex-end;
		}
	}
</style>
