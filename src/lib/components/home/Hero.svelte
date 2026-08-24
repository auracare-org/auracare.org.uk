<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
</script>

<!--
  Type carries the hero. No photograph, no illustration, no device mock: the
  claim is the asset. A rule and a set of standing figures sit under it so the
  first screen states what the company is, what is live, and who to contact,
  without asking anyone to scroll for it.
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
				Encoding, reasoning and documentation that runs inside the appointment, grounded in the
				terminology medicine already uses.
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

	<dl class="standings">
		<div class="standing">
			<dt>Ontology, live today</dt>
			<dd>532k concepts</dd>
		</div>
		<div class="standing">
			<dt>Pharmacy partnerships</dt>
			<dd>28</dd>
		</div>
		<div class="standing">
			<dt>Examination devices</dt>
			<dd>3 built</dd>
		</div>
		<div class="standing">
			<dt>Operating from</dt>
			<dd>London &middot; Hong Kong &middot; SF</dd>
		</div>
	</dl>
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

	/* A standing rail of figures across the full width. Four facts, ruled,
	   tabular. It replaces the photograph with something a clinician or an
	   investor can actually use on the first screen. */
	.standings {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		margin: clamp(3rem, 6vw, 5rem) 0 0;
		border-top: 1px solid var(--color-ink);
	}
	.standing {
		padding: 1.5rem clamp(1.5rem, 4vw, 2.5rem);
		border-bottom: 1px solid var(--color-rule);
		border-right: 1px solid var(--color-rule);
	}
	.standing dt {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.standing dd {
		margin: 0.6rem 0 0;
		font-size: clamp(1.15rem, 2vw, 1.6rem);
		font-weight: var(--weight-display);
		letter-spacing: -0.02em;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}

	@media (min-width: 700px) {
		.standings {
			grid-template-columns: repeat(4, 1fr);
		}
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
