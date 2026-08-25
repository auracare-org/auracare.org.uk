<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import ArchitecturePipeline from '$lib/components/ArchitecturePipeline.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, HARDWARE, HARDWARE_MORE, REGULATORY_NOTE } from '$lib/data/company';

	/* Flipped once the differential figure is scrolled to, which starts the
	   bars growing. */
	let barsIn = $state(false);

	/* Why today's clinical AI doesn't fit the consultation. */
	const gap = [
		{
			stat: '~80%',
			label: 'of doctors already use AI',
			title: 'The demand is already there',
			body: 'Clinicians want the help. Trust breaks the moment they turn to a screen mid-consultation.'
		},
		{
			stat: '34%',
			label: 'specialty-benchmark score',
			title: 'Generic by architecture',
			body: 'The general-purpose models behind these tools score around a third on specialty benchmarks, and know nothing about the patient in the room.'
		},
		{
			stat: 'Gaps',
			label: 'between every record',
			title: 'Disconnected from daily life',
			body: 'The record is a series of snapshots with long silences between them. Lifestyle and social history are slow to gather and easy to misremember.'
		}
	];

	/* What actually happens during the appointment. */
	const room = [
		{
			k: '01',
			title: 'The context is already in the room',
			body: 'The patient arrives with a complete lifestyle summary from Auracle, and acute vitals stream live from our own devices, so nothing is dug up on the spot.'
		},
		{
			k: '02',
			title: 'Nobody stops to type',
			body: 'The consultation is transcribed as it happens. No one breaks the conversation to write notes.'
		},
		{
			k: '03',
			title: 'The clinician stays with the patient',
			body: 'The CDSS reasons in the background and surfaces what is useful, so the clinician never appears to search anything.'
		}
	];

	/* The three things the core hands back, judgement staying with the clinician. */
	const outputs = [
		{
			title: 'Ranked differentials',
			body: 'Possible diagnoses ordered by likelihood, laid out for the clinician to weigh. The call is always theirs to make.'
		},
		{
			title: 'Next steps, tailored',
			body: 'Guideline-aligned options that respect what is available where the clinician works, including the practice’s own referral rules.'
		},
		{
			title: 'Documentation, automatic',
			body: 'Structured consultation notes written by the core, so screen time turns back into patient time.'
		}
	];

	/* Illustrative differential: an example, not a real patient and not live
	   model output (the core is in development). `pct` illustrates CLINICIAN
	   AGREEMENT, the metric we will measure and publish once the core is in
	   clinicians' hands: how often clinicians agree when the core places a
	   condition here. It is NOT the core's confidence or probability of being
	   right. */
	const differentialExample = [
		{ name: 'Viral upper-respiratory infection', pct: 61, lead: true },
		{ name: 'Acute bacterial sinusitis', pct: 22 },
		{ name: 'Allergic rhinitis', pct: 11 }
	];

	/* Auracle's personality is yours to shape: spectrums, not fixed settings. */
	const personaTraits = [
		{ label: 'Warmth', left: 'Clinical', right: 'Warm', pos: 74 },
		{ label: 'Detail', left: 'Concise', right: 'Thorough', pos: 42 },
		{ label: 'Tone', left: 'Formal', right: 'Casual', pos: 63 },
		{ label: 'Humour', left: 'Straight', right: 'Playful', pos: 28 }
	];

	/* A few starting points, each just a place to begin, not a limit. */
	const personaPresets = [
		'The gentle coach',
		'The no-nonsense analyst',
		'The chatty companion',
		'The quiet observer'
	];
</script>

<Seo
	title="Auracare CDSS: decision support inside the consultation"
	description="Auracare CDSS is our clinical decision support system. It works in the background during the appointment, reasoning over the picture Auracle builds, live vitals from our own hardware, and the conversation itself, so the clinician keeps their eyes on the patient. In development."
	path="/product/auracare"
/>

<svelte:head>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "Home",
					"item": "https://auracare.org.uk"
				},
				{
					"@type": "ListItem",
					"position": 2,
					"name": "Auracare CDSS",
					"item": "https://auracare.org.uk/product/auracare"
				}
			]
		}
	</script>
</svelte:head>

<!-- ================= Hero ================= -->
<PageHero
	meta="Clinical · In development"
	title="Decision support that"
	accent="stays out of the way."
	sub="A clinical decision support system that works during the appointment, not after it. The clinician keeps their attention on the patient."
/>

<!-- ================= The gap, and how it closes ================= -->
<!-- These were two consecutive sections, each a heading over a list: the
     problem, then the answer, in the same shape. Pairing them puts each
     failure next to the thing that removes it, which is the argument. -->
<section class="section-y gap-sec">
	<div class="container-wide">
		<h2 use:reveal>Clinicians already want AI. Today's tools don't fit the room.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			The appetite is settled; the fit is not. Three things break in the consultation, and the CDSS
			is built to remove each one.
		</p>

		<div class="gap-figures">
			{#each gap as g (g.title)}
				<div class="gap-figure" use:reveal={{ delay: 40 }}>
					<span class="gap-stat">{g.stat}</span>
					<span class="gap-label">{g.label}</span>
					<p>{g.body}</p>
				</div>
			{/each}
		</div>

		<div class="answers">
			<h3 class="answers-head" use:reveal>What replaces each one</h3>
			<ol class="room">
				{#each room as step (step.title)}
					<li class="room-step" use:reveal={{ delay: 40 }}>
						<span class="room-k" aria-hidden="true">{step.k}</span>
						<div>
							<h4>{step.title}</h4>
							<p>{step.body}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<!-- ================= Hardware into the core ================= -->
<section class="section-y hw-sec aura-space">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>A closed link, with no middleman.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Nothing is typed in or pulled from someone else’s integration. Our own devices feed the core
			directly, so what it sees is exactly what the device captured.
		</p>

		<!-- What the link is, and what the usual path costs. A "From / dashed
		     line / Into" diagram said only that two things are connected, which
		     is true of every integration ever built and so argued nothing. The
		     claim is about what is *not* in the middle, so the two paths are
		     set against each other and the removed steps are struck through. -->
		<div class="link" use:reveal={{ delay: 100 }}>
			<div class="link-path link-path--them">
				<span class="link-label">The usual path</span>
				<ol class="link-steps">
					<li>Device</li>
					<li class="cut">Vendor cloud</li>
					<li class="cut">Third-party API</li>
					<li class="cut">Manual re-entry</li>
					<li>Record</li>
				</ol>
				<p class="link-cost">Four places for a reading to be reshaped, delayed or lost.</p>
			</div>
			<div class="link-path link-path--us">
				<span class="link-label">Ours</span>
				<ol class="link-steps">
					<li>Our device</li>
					<li>The reasoning core</li>
				</ol>
				<p class="link-cost">
					One hop. What the core sees is exactly what the device captured, with the timestamp it was
					captured at.
				</p>
			</div>
		</div>

		<ul class="hw-grid">
			{#each HARDWARE as device (device.name)}
				<li class="hw-card" use:reveal>
					<h3>{device.name}</h3>
					<p>{device.note}</p>
				</li>
			{/each}
		</ul>
		<p class="hw-more" use:reveal>{HARDWARE_MORE}</p>
	</div>
</section>

<!-- ================= How it reasons ================= -->
<section class="section-y arch-sec">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>How it reasons.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Most clinical AI sends a prompt to a general-purpose model and returns its answer. That is the
			34% above. Here, every signal is encoded onto the clinical ontology first and a
			<strong>neuro-symbolic</strong> core reasons over the knowledge graph, so what comes back is ranked,
			sourced and auditable.
		</p>

		<ArchitecturePipeline />

		<p class="arch-note" use:reveal>
			The knowledge graph is live and explorable today; the reasoning engine that acts on it is in
			active development.
		</p>
		<a class="arch-link" href="/technology" use:reveal>
			See the technology in full <span aria-hidden="true">→</span>
		</a>
	</div>
</section>

<!-- ================= What the clinician gets back ================= -->
<!-- The demo panel carried three separate explanatory paragraphs around one
     small chart, which buried the chart. One caption above, one line below,
     and the three outputs listed plainly beside it. -->
<section class="section-y out-sec">
	<div class="container-wide">
		<h2 use:reveal>Three outputs. The decision stays with the clinician.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			The core does not hand down an answer. It sets out what it reasoned toward, ranked and
			traceable, and leaves the judgement with the person in the room.
		</p>

		<div class="out-grid">
			<ol class="out-list">
				{#each outputs as o (o.title)}
					<li use:reveal={{ delay: 40 }}>
						<h3>{o.title}</h3>
						<p>{o.body}</p>
					</li>
				{/each}
			</ol>

			<figure class="out-demo" use:reveal={{ delay: 80, onEnter: () => (barsIn = true) }}>
				<figcaption>
					<span class="demo-head">Ranked differential</span>
					<span class="demo-tag">Illustrative, not a real patient</span>
				</figcaption>
				<div class="demo-collabel" aria-hidden="true">
					<span>Differential</span>
					<span>Clinician agreement</span>
				</div>
				<!-- The bars grow from nothing as the figure scrolls in, staggered
				     down the list, so the ranking arrives in rank order. The width
				     is the transitioned property rather than a transform, because
				     a scaled bar would drag its own border and its right edge with
				     it; the fill is a plain block, so animating width composites
				     no worse and lands on an exact percentage. -->
				<ul class="demo-list">
					{#each differentialExample as d, i (d.name)}
						<li class="demo-row" class:lead={d.lead}>
							<span class="demo-name">{d.name}</span>
							<span class="demo-bar" aria-hidden="true">
								<span
									class="demo-fill"
									class:is-grown={barsIn}
									style="--pct:{d.pct}%; --bar-delay:{i * 90}ms"
								></span>
							</span>
							<span class="demo-pct">{d.pct}%</span>
						</li>
					{/each}
				</ul>
				<p class="demo-foot">
					The figure is how often clinicians agree with that placement, not the model's confidence
					in itself. These numbers are illustrative until the first studies report.
				</p>
			</figure>
		</div>
	</div>
</section>

<!-- ================= Regulatory + CTA ================= -->
<!-- Matches the homepage closing band: left-aligned statement, the two real
     paths side by side, the regulatory note as fine print at the foot. -->
<section id="contact" class="closing aura-space">
	<div class="container-wide">
		<h2 use:reveal>Building the clinical side?</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			We would like to hear from clinical partners and health systems as the CDSS moves toward its
			first trials.
		</p>

		<div class="paths">
			<div class="path" use:reveal={{ delay: 100 }}>
				<h3>Clinical partners</h3>
				<p>Hospitals, practices and pharmacies working on decision support.</p>
				<a
					class="btn-solid"
					href="mailto:{CONTACT.clinical}?subject=Auracare%3A%20Clinical%20partnership"
				>
					Write to our clinical team
				</a>
			</div>
			<div class="path" use:reveal={{ delay: 140 }}>
				<h3>Investors</h3>
				<p>One founder replies directly, depending on where you invest from.</p>
				<a class="btn-ghost" href="/investors#contact">See the investor page</a>
			</div>
		</div>

		<p class="reg-note" use:reveal>{REGULATORY_NOTE}</p>
	</div>
</section>

<style>
	.closing {
		padding-block: clamp(4rem, 8vw, 7rem) clamp(2.5rem, 5vw, 4rem);
	}
	.closing h2 {
		font-size: clamp(2.1rem, 4.6vw, 3.4rem);
		line-height: 1.15;
		letter-spacing: -0.035em;
		margin: 0 0 1.25rem;
		color: #fff;
	}
	.closing .lede {
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
	.reg-note {
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		font-size: 0.8rem;
		line-height: 1.65;
		color: rgba(226, 230, 240, 0.5);
		max-width: 72ch;
	}
	@media (min-width: 800px) {
		.paths {
			grid-template-columns: repeat(2, 1fr);
			gap: 3.5rem;
		}
	}

	.btn-solid:active {
		transform: scale(0.97);
		transition-duration: var(--duration-press);
	}
	@media (hover: hover) and (pointer: fine) {
		.btn-solid:hover {
			transform: translateY(-2px);
			color: var(--color-primary-800);
		}
		.btn-solid:hover:active {
			transform: translateY(-2px) scale(0.97);
		}
	}
	.lede {
		margin-top: 1rem;
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.65;
		color: var(--color-ink-soft);
		max-width: 46rem;
	}
	.gap-figures {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: 1.75rem;
		border-top: 1px solid var(--color-ink);
	}
	.gap-figure p {
		margin: 0.75rem 0 0;
		font-size: 0.93rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}
	.answers {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: clamp(1.5rem, 3vw, 2rem);
		border-top: 1px solid var(--color-ink);
	}
	.answers-head {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		margin: 0 0 1.5rem;
	}
	.room-step h4 {
		font-size: 1.02rem;
		margin: 0 0 0.25rem;
	}
	@media (min-width: 860px) {
		.gap-figures {
			grid-template-columns: repeat(3, 1fr);
			gap: 2.5rem;
		}
		.gap-figure + .gap-figure {
			border-left: 1px solid var(--color-rule);
			padding-left: 2.5rem;
		}
	}

	.gap-stat {
		font-family: var(--font-family-heading);
		font-size: clamp(2rem, 4vw, 2.7rem);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		color: var(--color-primary-600);
	}
	.gap-label {
		font-size: 0.78rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-ink-faint);
		margin-top: 0.4rem;
	}
	.room {
		list-style: none;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding: 0;
		display: grid;
		gap: 1rem;
	}
	.room-step {
		display: flex;
		gap: 1.1rem;
		align-items: flex-start;
		padding: 1.4rem 1.6rem;
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xs);
	}
	/* primary-600, not 500. The 500 is a mid blue that only clears 3.8:1 on the
	   paper ground, under AA for text this size. */
	.room-k {
		flex: none;
		font-family: var(--font-family-mono);
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--color-primary-600);
		padding-top: 0.15rem;
	}
	.room-step p {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 52ch;
	}
	/* Two paths, side by side, so the length of each is the argument.
	   Capped and centred: at the full container width each column was 576px
	   holding a 140px box, so three quarters of the diagram was empty ground
	   and the two chains sat marooned at opposite ends of the section. */
	.link {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 46rem;
		margin: clamp(2rem, 4vw, 3rem) auto 0;
		padding-block: clamp(1.75rem, 3vw, 2.25rem);
		border-block: 1px solid rgba(255, 255, 255, 0.16);
	}
	.link-path {
		text-align: center;
	}
	.link-label {
		display: block;
		font-size: 0.64rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(226, 230, 240, 0.55);
		margin-bottom: 1rem;
	}
	.link-path--us .link-label {
		color: var(--color-primary-300);
	}
	/* The steps as a chain running downward, one per row, joined by a short
	   connector. Laid out as a wrapping horizontal row, five steps could not
	   fit the column and "Record" dropped onto a second line with its connector
	   left dangling into empty space — which broke the one thing the diagram
	   exists to show. Vertically the two paths cannot wrap at all, and the
	   difference in their length becomes the argument. */
	/* Centred under a centred heading. Both chains ran hard left inside their
	   own half, so the two paths sat against the dividing rule and the left
	   edge respectively rather than reading as a matched pair. */
	.link-steps {
		list-style: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.35rem;
		margin: 0;
		padding: 0;
	}
	/* The boxes take the column rather than shrinking to their own text, so the
	   chain reads as one flow with a consistent gauge instead of five labels of
	   five different widths stacked loosely on a line. */
	.link-steps li {
		position: relative;
		width: min(100%, 15rem);
		padding: 0.6rem 0.9rem;
		text-align: center;
		font-size: 0.88rem;
		font-weight: 500;
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.24);
	}
	.link-steps li + li::before {
		content: '';
		position: absolute;
		left: 50%;
		top: -1.35rem;
		width: 1px;
		height: 1.35rem;
		background: rgba(255, 255, 255, 0.28);
	}
	/* The steps our path removes, struck through rather than deleted: the point
	   is what is gone, and you cannot see the absence of something invisible. */
	.link-steps li.cut {
		color: rgba(226, 230, 240, 0.4);
		border-style: dashed;
		border-color: rgba(255, 255, 255, 0.16);
		text-decoration: line-through;
		text-decoration-color: rgba(255, 255, 255, 0.35);
	}
	.link-path--us .link-steps li {
		border-color: var(--color-primary-300);
	}
	.link-cost {
		margin: 1rem auto 0;
		font-size: 0.88rem;
		line-height: 1.7;
		color: rgba(226, 230, 240, 0.72);
		max-width: 30ch;
	}
	@media (min-width: 860px) {
		.link {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0;
		}
		/* Padding is symmetric on both halves. With 3rem on one side only, the
		   content box's centre sat 1.5rem off the column's, so centring the
		   chain inside it put the chain visibly off-centre in its half. */
		.link-path {
			padding-inline: 2rem;
		}
		.link-path--us {
			border-left: 1px solid rgba(255, 255, 255, 0.16);
		}
	}
	.hw-grid {
		list-style: none;
		margin: clamp(1.75rem, 4vw, 2.5rem) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	.hw-card {
		padding: 1.3rem 1.4rem;
		border-radius: var(--radius-lg);
		background: var(--color-surface-dark-raised);
		border: 1px solid var(--color-border-dark);
	}
	.hw-card h3 {
		font-size: 1.05rem;
		color: #fff;
		margin-bottom: 0.35rem;
	}
	.hw-card p {
		font-size: 0.9rem;
		line-height: 1.65;
		color: rgba(226, 232, 255, 0.72);
	}
	.hw-more {
		margin-top: 1.5rem;
		font-size: 0.95rem;
		line-height: 1.7;
		font-weight: 500;
		color: var(--color-primary-300) !important;
		max-width: 52rem;
	}
	.out-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 4vw, 3rem);
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		align-items: start;
	}
	.out-demo {
		margin: 0;
		padding: 1.5rem;
		border: 1px solid var(--color-rule);
		background: var(--color-surface-raised);
	}
	.out-demo figcaption {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}
	.demo-head {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-ink);
	}
	.demo-tag {
		font-size: 0.6rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	@media (min-width: 900px) {
		.out-grid {
			grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
			gap: 3.5rem;
		}
	}

	.out-list {
		list-style: none;
		margin: clamp(1.5rem, 3vw, 2rem) 0 0;
		padding: 0;
		display: grid;
		gap: 1.1rem;
	}
	.out-list li {
		padding-left: 1.25rem;
		border-left: 2px solid var(--color-primary-200);
	}
	.out-list h3 {
		font-size: 1.08rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.3rem;
	}
	.out-list p {
		font-size: 0.93rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}

	.demo-collabel {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		margin-top: 1.1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-border-default);
		font-family: var(--font-family-mono);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.demo-list {
		list-style: none;
		margin: 1rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.85rem;
	}
	.demo-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.35rem;
	}
	.demo-name {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-ink-soft);
	}
	.demo-row.lead .demo-name {
		color: var(--color-ink);
		font-weight: 600;
	}
	.demo-bar {
		grid-row: 2;
		height: 0.55rem;
		border-radius: 999px;
		background: var(--color-surface-alt);
		overflow: hidden;
	}
	/* Grows from nothing when the figure is scrolled to, staggered down the
	   list so the ranking arrives in rank order. */
	.demo-fill {
		display: block;
		width: 0;
		height: 100%;
		border-radius: 999px;
		background: var(--color-primary-300);
		transition: width 900ms var(--ease-out);
		transition-delay: var(--bar-delay, 0ms);
	}
	.demo-fill.is-grown {
		width: var(--pct);
	}
	/* The leading differential is the brand blue; the rest are the tint. It was
	   a two-stop gradient, which the rest of the site does not use anywhere. */
	.demo-row.lead .demo-fill {
		background: var(--color-primary-600);
	}
	@media (prefers-reduced-motion: reduce) {
		.demo-fill {
			transition: none;
			width: var(--pct);
		}
	}
	.demo-pct {
		grid-row: 2;
		align-self: center;
		justify-self: end;
		font-family: var(--font-family-mono);
		font-weight: 700;
		font-size: 0.78rem;
		color: var(--color-ink-faint);
		padding-left: 0.6rem;
	}
	.demo-row {
		grid-template-columns: 1fr auto;
	}
	.demo-name {
		grid-column: 1 / -1;
	}
	.demo-foot {
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border-default);
		font-size: 0.85rem;
		line-height: 1.65;
		color: var(--color-ink-faint);
	}
	.arch-note {
		margin-top: clamp(1.5rem, 3vw, 2rem);
		font-size: 0.85rem;
		line-height: 1.7;
		color: var(--color-ink-faint);
		max-width: 52rem;
	}
	/* Centred under the centred note above it. `inline-flex` cannot be centred
	   by auto margins, so it becomes a flex box sized to its own content. */
	.arch-link {
		display: flex;
		width: max-content;
		margin-inline: auto;
		align-items: center;
		gap: 0.45rem;
		margin-top: 0.9rem;
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--color-primary-600);
	}
	.arch-link:hover {
		color: var(--color-primary-700);
	}
	@media (min-width: 900px) {
	}
</style>
