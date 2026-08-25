<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal, countUp } from '$lib/actions/motion';
	import LoopDial from '$lib/components/LoopDial.svelte';
	import { CONTACT, ONTOLOGY_STATS } from '$lib/data/company';

	/* --- Auracle: how the history gets built ------------------------ */
	const TWIN_STEPS = [
		{
			n: '01',
			label: 'Connect',
			body: 'Link the wearables and health apps you already use. Cloud services sync server-side: the vendor tells us the moment a record lands and we pull only that record. Phone-native sources push straight from the device. Either path runs in the background.'
		},
		{
			n: '02',
			label: 'Normalise',
			body: 'Every source records data its own way. Auracle translates each record into one shared format, removes duplicates across devices, and timestamps every reading in your local time. One consistent stream instead of a dozen feeds that do not line up.'
		},
		{
			n: '03',
			label: 'Converse',
			body: 'Auracle watches the normalised stream and messages you first when something shifts, then answers when you text back. Reply in plain language; that is the logging. No new app, no forms, no streaks.'
		}
	];

	/* Signals Auracle ingests. Categories, not a device list, so it
	   holds regardless of which watch or ring a person owns. */
	const TWIN_SIGNALS = [
		{ name: 'Sleep', note: 'Duration, efficiency, deep and REM' },
		{ name: 'Recovery & HRV', note: 'Readiness, recovery score, resting heart rate' },
		{ name: 'Activity', note: 'Steps, movement, daily exertion' },
		{ name: 'Nutrition', note: 'Meals and substances, from a normal text' },
		{ name: 'Mindfulness', note: 'Meditation and breathing sessions, minutes and streaks' },
		{ name: 'Context', note: 'Screen time, location and daily rhythm' }
	];

	/* --- Auracare: the reasoning loop ----------------------------- */
	const LOOP = [
		{
			key: 'input',
			label: 'Input',
			short: 'Input',
			body: 'One timeline: everyday-life signals from Auracle, clinical history, and vitals captured live in the room, all on a single timestamped record.'
		},
		{
			key: 'encoding',
			label: 'Encoding',
			short: 'Encoding',
			body: 'Each observation is matched to its concept in the clinical ontology and stamped with when it was true. This is the step that turns loose readings into a record the core can reason over.'
		},
		{
			key: 'thinking',
			label: 'Thinking',
			short: 'Thinking',
			body: 'The core weighs the evidence across the knowledge graph and returns a spread of what is likely, rather than committing to one answer.'
		},
		{
			key: 'thesis',
			label: 'Thesis',
			short: 'Thesis',
			body: 'That spread is checked against population data, expressed as risk, and set out as a ranked differential with its sources attached. It is provisional, and it changes when the evidence does.'
		},
		{
			key: 'voi',
			label: 'Value-of-information',
			short: 'Worth asking?',
			body: 'The loop weighs whether another question would change the answer enough to justify the delay. If it would, it picks the single most useful one and starts again. If not, it stops here.'
		},
		{
			key: 'outcome',
			label: 'Medical outcome',
			short: 'Outcome',
			body: 'A referral, a prescription, further testing or a lifestyle plan, each checked against safety and against what the clinician is permitted to do where they practise.'
		}
	];

	/* --- The neuro-symbolic core ---------------------------------- */
	const SYMBOLIC = [
		'The clinical ontology (SNOMED CT, ICD-11, LOINC, HPO): curated, deterministic, every edge inspectable',
		'Runs the red-flag and contraindication screens, and reads diagnoses straight off named graph edges',
		'Authoritative: it holds the veto over anything the learned side proposes'
	];
	const LEARNED = [
		'A Heterogeneous Graph Transformer: a neural network that learns patterns across a patient’s linked clinical data',
		'Bends the generic textbook weights toward this patient’s comorbidities and trajectory, then ranks the shortlist',
		'Advisory by construction: it proposes and personalises, but never makes an un-gated decision'
	];

	/* --- The patient state ---------------------------------------- */
	const STATE_SOURCES = [
		'Everyday-life signals from Auracle',
		'Acute vitals, streamed from our own devices',
		'Lab results & records',
		'Clinical notes & history',
		'What a person tells us, in their own words'
	];

	/* --- Clinical-grade grounding --------------------------------- */
	const STANDARDS = [
		{ name: 'SNOMED CT', note: 'The anchor' },
		{ name: 'ICD-11', note: 'Diagnoses' },
		{ name: 'HPO', note: 'Phenotypes' },
		{ name: 'LOINC', note: 'Lab codes' },
		{ name: 'NICE', note: 'UK guidance' }
	];

	/* --- Safety overlay: one gate on every stage ------------------ */
	const SAFEGUARDS = [
		{
			title: 'Encoding-confidence gate',
			stage: 'Input · Encoding',
			body: 'A signal that cannot be matched to the right concept with enough confidence is flagged rather than quietly accepted. One mis-linked observation would corrupt everything downstream of it.'
		},
		{
			title: 'Audit log of decisions',
			stage: 'Thinking',
			body: 'Every reasoning step is recorded with its inputs and provenance, so any conclusion can be reconstructed and replayed after the fact.'
		},
		{
			title: 'Red-flag screen',
			stage: 'Thesis',
			body: 'A hard, authoritative screen over the differential that can escalate or veto regardless of what the learned side proposed.'
		},
		{
			title: 'Jurisdiction guard',
			stage: 'Value-of-information',
			body: 'The loop only ever proposes actions permitted where the patient is: prescribing authority and what is possible in primary care versus referral.'
		},
		{
			title: 'Contraindication check',
			stage: 'Prescribing',
			body: 'The last gate before any terminal action: interactions, allergies and pharmacogenomic contraindications, checked against the medicine.'
		},
		{
			title: 'Clinical assurance sampling',
			stage: 'On live output',
			body: 'Clinicians grade samples of real output against a harm scale, with sign-off before each new deployment and random re-review after it.'
		}
	];

	/* Parse an ONTOLOGY_STATS value into a countable number + suffix,
	   or fall back to rendering it verbatim (e.g. "ICD-11"). */
	function parseStat(value: string): { num: number; suffix: string } | null {
		const m = value.match(/^([\d.]+)(.*)$/);
		if (!m) return null;
		const num = parseFloat(m[1]);
		if (Number.isNaN(num)) return null;
		return { num, suffix: m[2] };
	}
</script>

<Seo
	title="Technology"
	description="Two products on one patient model: how Auracle builds a high-context patient history, and how the Auracare CDSS turns it into grounded, traceable clinical decision support."
	path="/technology"
/>

<!-- ============================================================ -->
<!-- Hero                                                          -->
<!-- ============================================================ -->
<PageHero
	title="Two products."
	accent="One patient model."
	accentOwnLine
	sub="Everything both products know about a person lives in one timestamped record, written in the terminology medicine already agrees on."
/>

<!-- ============================================================ -->
<!-- PART ONE · AURACLE                                           -->
<!-- ============================================================ -->
<section id="auracle" class="section-y twin-product">
	<div class="container-wide">
		<span class="eyebrow" use:reveal={{ delay: 40 }}>Auracle · the consumer product</span>
		<h2 use:reveal={{ delay: 80 }}>The half of your health a clinic never sees.</h2>
		<p class="lede" use:reveal={{ delay: 140 }}>
			Most of a person's health happens between appointments, and almost none of it gets written
			down. Auracle collects it without asking anyone to keep a diary: the signals your devices
			already produce arrive on their own, and anything they cannot see takes one reply.
		</p>

		<!-- The churn curve behind that first sentence: the same figure as the
			 deck, redrawn. Left column carries the number, right column the shape. -->
		<figure class="churn" use:reveal={{ delay: 160 }}>
			<div class="churn-stat">
				<span class="churn-only">Only</span>
				<span
					class="churn-big"
					use:countUp={{ value: 4, format: (n: number) => `${Math.round(n)}%` }}>4%</span
				>
				<p class="churn-say">
					of people who install a health app are still active a month later. The other 96% have
					churned, and almost all of them go in the first two weeks: not because the advice was
					wrong, but because logging it was work.
				</p>
			</div>

			<div class="churn-chart">
				<span class="churn-axis-label">Share of installers still active</span>
				<svg
					class="churn-svg"
					viewBox="0 0 520 230"
					preserveAspectRatio="xMidYMid meet"
					role="img"
					aria-labelledby="churn-title churn-desc"
				>
					<title id="churn-title">Health-app retention decay over the first 30 days</title>
					<desc id="churn-desc">
						Of everyone who installs a health app, 20-30% are still active on day one and only 3-4%
						on day thirty, with the steepest fall in the first two weeks.
					</desc>
					<defs>
						<linearGradient
							id="churnLine"
							x1="0"
							y1="0"
							x2="520"
							y2="0"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0%" stop-color="#6180ff" />
							<stop offset="100%" stop-color="#387ff5" />
						</linearGradient>
						<linearGradient
							id="churnFill"
							x1="0"
							y1="20"
							x2="0"
							y2="190"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0%" stop-color="rgba(97,128,255,.22)" />
							<stop offset="100%" stop-color="rgba(97,128,255,0)" />
						</linearGradient>
					</defs>

					<!-- axes -->
					<line class="churn-ax" x1="40" y1="14" x2="40" y2="190" />
					<line class="churn-ax" x1="40" y1="190" x2="504" y2="190" />

					<!-- area under the curve, then the curve itself -->
					<path
						class="churn-area"
						d="M40 20 C 52 20 62 96 74 148 C 150 176 300 183 500 185 L 500 190 L 40 190 Z"
						fill="url(#churnFill)"
					/>
					<path
						class="churn-curve"
						d="M40 20 C 52 20 62 96 74 148 C 150 176 300 183 500 185"
						fill="none"
						stroke="url(#churnLine)"
						stroke-width="3"
						stroke-linecap="round"
					/>

					<!-- the three points the source actually reports -->
					<circle class="churn-dot" cx="40" cy="20" r="4.5" />
					<circle class="churn-dot" cx="74" cy="148" r="4.5" />
					<circle class="churn-dot" cx="500" cy="185" r="4.5" />

					<text class="churn-pt" x="52" y="17">100% · install</text>
					<text class="churn-pt" x="86" y="145">20-30% · day 1</text>
					<text class="churn-pt churn-pt-end" x="490" y="176">3-4% · day 30</text>
					<text class="churn-note" x="120" y="112">steepest drop: the first two weeks</text>

					<text class="churn-tick" x="40" y="206">day 0</text>
					<text class="churn-tick churn-pt-end" x="504" y="206">day 30</text>
				</svg>
			</div>

			<figcaption class="churn-src">
				Source: Sahha, health-app churn and retention. Day-1 retention averages 20-30% of
				installers; day-30 averages 3-4%.
			</figcaption>
		</figure>

		<ol class="twin-steps" use:reveal={{ delay: 200 }}>
			{#each TWIN_STEPS as step, i}
				<li class="glass-card twin-step" style="--i:{i}">
					<span class="step-n" aria-hidden="true">{step.n}</span>
					<div>
						<h3>{step.label}</h3>
						<p>{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>

		<div class="signals-block">
			<h3 class="signals-head" use:reveal>Every device, one format.</h3>
			<p class="signals-sub" use:reveal={{ delay: 60 }}>
				Sleep, movement, meals and mindfulness are recorded in one shared format, so a figure means
				the same thing whichever device reported it. Two people with different watches get
				comparable numbers.
			</p>
			<ul class="signals-grid" use:reveal={{ delay: 100 }} aria-label="Signals Auracle ingests">
				{#each TWIN_SIGNALS as sig, i}
					<li class="signal-chip" style="--i:{i}">
						<span class="sig-name">{sig.name}</span>
						<span class="sig-note">{sig.note}</span>
					</li>
				{/each}
			</ul>
			<p class="ehr-note" use:reveal>
				Health records can be read into Auracle but never acted on by it. Auracle is a
				general-wellness product under the FD&amp;C Act §520(o)(1)(B) exclusion, not a medical
				device: Auracle gives wellness guidance, not diagnosis.
			</p>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- Auracare · the patient state                                  -->
<!-- ============================================================ -->
<section class="section-y twin-section">
	<div class="container-wide twin-grid">
		<div class="twin-copy">
			<h2 use:reveal={{ delay: 60 }}>One timestamped model of a person.</h2>
			<p class="lede" use:reveal={{ delay: 120 }}>
				A person's health is scattered across devices, labs and memory. We hold it as one record:
				every observation written in the same clinical vocabulary and stamped with when it was true.
			</p>
			<p use:reveal={{ delay: 180 }}>
				Because every entry carries its date, the record answers questions a snapshot cannot: what a
				reading was, how it has moved, and whether the direction matters. Iron studies rising. A
				resting heart rate creeping up over months.
			</p>
			<p use:reveal={{ delay: 220 }}>
				Acute readings arrive the same way. Our own devices (a recording stethoscope, a
				blood-pressure monitor, an otoscope) stream straight into the core: a closed
				hardware-to-software link, with no manual entry and no third-party integration in between.
			</p>
		</div>
		<!-- The inputs as a ledger rather than as five tiles: an index, the
		     source, and a heavier rule under the last row where they all
		     resolve into one state. The tiles previously carried a glowing dot
		     and a gradient fill, neither of which the rest of the site uses. -->
		<div class="twin-sources" use:reveal={{ delay: 140 }}>
			<span class="sources-label">What goes in</span>
			<ol class="sources-list">
				{#each STATE_SOURCES as source, i}
					<li>
						<span class="source-n">{String(i + 1).padStart(2, '0')}</span>
						<span class="source-text">{source}</span>
					</li>
				{/each}
			</ol>
			<p class="twin-state">
				<span class="state-label">Resolves to</span>
				One timestamped patient state
			</p>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PART TWO · AURACARE CDSS · the reasoning loop                 -->
<!-- ============================================================ -->
<section id="auracare" class="section-y loop-section">
	<div class="container-wide">
		<span class="eyebrow" use:reveal={{ delay: 40 }}>Auracare CDSS · clinical reasoning</span>
		<h2 use:reveal={{ delay: 80 }}>A loop, not a pipeline.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Most health AI answers whatever it is asked, once. A clinician does something else: they form
			a view, work out what would change it, and go and find that out. Auracare runs the same way,
			and keeps going round until asking again would not be worth the delay.
		</p>

		<!-- The six stages explained on the left, the shape shown on the right,
		     the same way the care loop is drawn on the homepage. Two earlier
		     attempts put the explanation *on* the ring and produced labels that
		     collided with the arcs; the split is what makes the drawing
		     possible, because a dial carrying nothing but six words can be
		     small enough to read at a glance. -->
		<div class="loop-layout">
			<ol class="loop-list">
				{#each LOOP as stage, i}
					<li class="loop-item" use:reveal={{ delay: 60 + i * 50 }}>
						<span class="loop-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						<div class="loop-text">
							<h3>{stage.label}</h3>
							<p>{stage.body}</p>
						</div>
					</li>
				{/each}
			</ol>

			<div class="loop-dial" use:reveal={{ delay: 160 }}>
				<LoopDial
					labels={LOOP.map((stage) => stage.short)}
					centre="Round again, until another question would not change the answer"
					nodeSize="clamp(5rem, 16vw, 6.5rem)"
				/>
			</div>
		</div>

		<p class="safety-note" use:reveal>
			<strong>Stage five is the only way out of the loop.</strong> Nothing reaches a patient before it,
			and everything that follows it is checked by the safety layer on the way past.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- Auracare · the neuro-symbolic core                            -->
<!-- ============================================================ -->
<section class="section-y core-section">
	<div class="container-wide">
		<h2 use:reveal>Two kinds of intelligence, checking each other.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>
			Learned models are fluent and occasionally confident about things that are false. Rule-based
			systems are reliable and cannot handle anything they were not told about. We run both and keep
			a marked line between them, because the question a regulator asks is which side of that line a
			given decision came from, and whether you can reconstruct it.
		</p>

		<!-- Two columns facing each other across a rule. The role each side plays
		     is stated as a word; it was previously encoded in two arbitrary
		     chip colours, which carried no meaning on their own. -->
		<div class="core-split">
			<div class="core-col" use:reveal={{ delay: 60 }}>
				<p class="col-role">Proposes</p>
				<h3>Learned</h3>
				<p class="col-sub">Adaptive, advisory</p>
				<ul>
					{#each LEARNED as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
			<div class="core-col" use:reveal={{ delay: 100 }}>
				<p class="col-role">Disposes</p>
				<h3>Symbolic</h3>
				<p class="col-sub">Auditable, authoritative</p>
				<ul>
					{#each SYMBOLIC as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
		</div>

		<p class="core-tail" use:reveal>
			Every conclusion traces back to the specific rule or relationship that produced it, and every
			step is logged in an order you can replay.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- Auracare · safety overlay                                     -->
<!-- ============================================================ -->
<section class="section-y safety-section aura-space">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>One gate on every stage.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			One check at the end would mean everything before it is allowed to go wrong, provided the last
			step catches it. The checks run at every stage instead, and take a different form at each.
		</p>

		<div class="clinician-note" use:reveal={{ delay: 160 }}>
			<span class="clinician-stage" aria-hidden="true">Clinician-in-the-loop</span>
			<p>
				The outermost gate is a person. Auracare is built to be used
				<strong>alongside a clinician, never to replace one</strong>. The clinician stays
				accountable for every decision, and their judgement always overrides the model.
			</p>
		</div>

		<!-- The gates run down a single continuous rail. Six identical cards in a
		     grid stated the idea; a spine with a gate pinned at each stage shows
		     it, which is the whole argument of this section. -->
		<ol class="safety-rail">
			{#each SAFEGUARDS as item, i}
				<li class="safety-gate" use:reveal={{ delay: 60 + i * 60 }}>
					<span class="gate-marker" aria-hidden="true">
						<span class="gate-index">{String(i + 1).padStart(2, '0')}</span>
					</span>
					<div class="gate-body">
						<span class="safety-stage">{item.stage}</span>
						<h3>{item.title}</h3>
						<p>{item.body}</p>
					</div>
				</li>
			{/each}
		</ol>

		<p class="residency-note" use:reveal>
			<strong>Data residency is jurisdiction-based.</strong> The reasoning core is designed to run inside
			our own cloud tenant in each market's region, so consented health data stays within infrastructure
			we control. An architectural commitment for an engine still in development, whose regulatory pathway
			is under continuous review.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- Shared foundation · the knowledge graph                       -->
<!-- ============================================================ -->
<section class="section-y graph-section aura-space graph-foundation">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>Built on the terminology medicine already uses.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Both products read from the same graph of clinical concepts and the relationships between
			them. None of it is scraped from the open web: it is mapped to the standards clinicians,
			regulators and health systems already use. It is also the one part of the system that is
			finished, and you can go and look at it now.
		</p>

		<!-- Figures, not tiles. They carried `.glass-card`, which brought a
		     border-colour hover with it: a hover state on something that cannot
		     be clicked reads as a broken link. -->
		<div class="graph-tiles">
			{#each ONTOLOGY_STATS as stat, i}
				{@const parsed = parseStat(stat.value)}
				<div class="graph-tile" use:reveal={{ delay: 60 * i }}>
					{#if parsed}
						<span
							class="tile-value"
							use:countUp={{
								value: parsed.num,
								format: (n) =>
									(Number.isInteger(parsed.num) ? Math.round(n).toLocaleString() : n.toFixed(1)) +
									parsed.suffix
							}}>{stat.value}</span
						>
					{:else}
						<span class="tile-value">{stat.value}</span>
					{/if}
					<span class="tile-label">{stat.label}</span>
				</div>
			{/each}
		</div>

		<!-- The standards the figures are counted in. This was a <ul> with no
		     rule of its own, so it rendered as a bulleted list of chips sitting
		     directly under the figures with nothing between them. -->
		<div class="standards">
			<span class="standards-label">Traceable to</span>
			<ul class="standards-strip" aria-label="Standards our knowledge is traceable to">
				{#each STANDARDS as std, i}
					<li class="standard-chip" use:reveal={{ delay: 40 * i }}>
						<span class="chip-name">{std.name}</span>
						<span class="chip-note">{std.note}</span>
					</li>
				{/each}
			</ul>
			<p class="grounding-caption" use:reveal>Every answer traceable to a named source.</p>
		</div>

		<div class="graph-cta" use:reveal={{ delay: 120 }}>
			<a class="explore-btn" href={CONTACT.ontologyUrl} target="_blank" rel="noopener noreferrer">
				Explore the graph <span aria-hidden="true">↗</span>
			</a>
			<span class="pill pill-live">Live</span>
		</div>
	</div>
</section>

<style>
	.lede {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.65;
		max-width: 46rem;
	}
	/* The figure and its shape, side by side. The base rule declaring `display:
	   grid` had been lost, so `grid-template-columns` in the media query below
	   was inert and the chart stacked underneath the number instead. */
	/* Section separation. Every section sat on the same bone with the same
	   padding, so the page read as one continuous column. Alternating the
	   ground and ruling the joins gives each one an edge to start at. */
	.twin-product,
	.loop-section,
	.core-section {
		border-top: 1px solid var(--color-rule);
	}
	.twin-section,
	.core-section {
		background: var(--color-surface-alt);
	}

	.churn {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.75rem, 4vw, 3rem);
		align-items: center;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding-block: clamp(1.75rem, 3vw, 2.5rem);
		border-block: 1px solid var(--color-rule);
	}
	.churn-stat {
		max-width: 46ch;
	}
	.churn-only {
		display: block;
		font-family: var(--font-family-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}
	.churn-big {
		display: block;
		font-family: var(--font-family-heading);
		font-size: clamp(3.2rem, 8vw, 4.5rem);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--color-primary-600);
		margin: 0.15rem 0 0.7rem;
	}
	.churn-say {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 30rem;
	}
	.churn-axis-label {
		display: block;
		font-family: var(--font-family-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		margin-bottom: 0.6rem;
	}
	.churn-svg {
		width: 100%;
		height: auto;
		overflow: visible;
	}
	.churn-ax {
		stroke: var(--color-border-default);
		stroke-width: 1;
	}
	.churn-dot {
		fill: #fff;
		stroke: var(--color-primary-500);
		stroke-width: 2.5;
	}
	.churn-pt {
		font-family: var(--font-family-mono);
		font-size: 12px;
		fill: var(--color-ink);
	}
	.churn-pt-end {
		text-anchor: end;
	}
	.churn-note {
		font-size: 12px;
		font-style: italic;
		fill: var(--color-ink-faint);
	}
	.churn-tick {
		font-family: var(--font-family-mono);
		font-size: 11px;
		fill: var(--color-ink-faint);
	}
	.churn-src {
		grid-column: 1 / -1;
		border-top: 1px solid var(--color-border-default);
		padding-top: 0.9rem;
		font-size: 0.8rem;
		line-height: 1.65;
		color: var(--color-ink-faint);
	}
	@keyframes churn-draw {
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes churn-fade {
		to {
			opacity: 1;
		}
	}

	.twin-steps {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: clamp(2rem, 4vw, 3rem);
		padding: 0;
	}
	.twin-step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1.25rem 1.5rem;
	}
	/* primary-600, not 500: the mid blue only clears 3.58:1 on paper. */
	.step-n {
		flex: none;
		font-family: var(--font-family-mono);
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--color-primary-600);
		padding-top: 0.15rem;
	}
	.twin-step h3 {
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}
	.twin-step p {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}
	.signals-block {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}
	.signals-head {
		font-size: clamp(1.2rem, 2.2vw, 1.6rem);
		letter-spacing: -0.01em;
	}
	.signals-sub {
		margin-top: 0.5rem;
		font-size: 0.98rem;
		line-height: 1.7;
		max-width: 44rem;
		color: var(--color-ink-soft);
	}
	.signals-grid {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		margin-top: clamp(1.5rem, 3vw, 2rem);
		padding: 0;
	}
	.signal-chip {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.9rem 1.1rem;
		border-radius: var(--radius-lg);
		background: #fff;
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
	}
	.sig-name {
		font-family: var(--font-family-heading);
		font-weight: 700;
		font-size: 0.98rem;
		color: var(--color-ink);
	}
	.sig-note {
		font-size: 0.82rem;
		color: var(--color-neutral-600, #6b7280);
	}
	.ehr-note {
		margin-top: 1.5rem;
		font-size: 0.85rem;
		line-height: 1.7;
		max-width: 48rem;
		color: var(--color-neutral-600, #6b7280);
	}
	@media (min-width: 720px) {
		.churn {
			grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		}
		.twin-steps {
			grid-template-columns: repeat(3, 1fr);
		}
		.signals-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.loop-list {
		list-style: none;
		display: grid;
		gap: 0 2.5rem;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding: 0;
		grid-template-columns: 1fr;
		text-align: left;
		border-top: 1px solid var(--color-ink);
	}
	.loop-item {
		display: grid;
		grid-template-columns: 2.4rem 1fr;
		gap: 0.9rem;
		align-items: start;
		padding-block: 1.15rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.loop-num {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary-600);
		font-variant-numeric: tabular-nums;
		padding-top: 0.15rem;
	}
	.loop-item h3 {
		font-size: 1rem;
		margin-bottom: 0.2rem;
	}
	.loop-item p {
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
		margin: 0;
	}

	.safety-note {
		margin: 1.5rem auto 0;
		font-size: 0.95rem;
		max-width: 46rem;
		text-align: center;
	}
	.safety-note strong {
		color: var(--color-primary-700);
	}

	/* The list and the dial, side by side. The list used to run as two columns
	   across the full width; beside a dial it stays one column, which is also
	   the order the six stages actually happen in. */
	.loop-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}
	.loop-list {
		margin-top: 0;
	}
	@media (min-width: 940px) {
		.loop-layout {
			grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
			gap: clamp(2.5rem, 5vw, 4.5rem);
		}
	}
	.core-section {
		border-top: 1px solid var(--color-rule);
	}
	.core-split {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-top: clamp(2.5rem, 5vw, 4rem);
		border-top: 1px solid var(--color-ink);
	}
	.core-col {
		padding-top: 1.75rem;
	}
	.col-role {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin: 0 0 0.75rem;
	}
	.core-col h3 {
		font-size: clamp(1.5rem, 2.6vw, 2rem);
		letter-spacing: -0.025em;
		margin: 0;
	}
	.col-sub {
		margin: 0.3rem 0 1.25rem;
		font-size: 0.9rem;
		color: var(--color-ink-faint);
	}
	.core-col ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.core-col li {
		padding-block: 0.85rem;
		border-top: 1px solid var(--color-rule);
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}
	.core-tail {
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-ink);
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.65;
		color: var(--color-ink);
		max-width: 60ch;
	}
	@media (min-width: 880px) {
		.core-split {
			grid-template-columns: repeat(2, 1fr);
			gap: 0;
		}
		.core-col + .core-col {
			border-left: 1px solid var(--color-rule);
			padding-left: 3rem;
		}
		.core-col:first-child {
			padding-right: 3rem;
		}
	}
	/* The patient state. Two columns with real air between them: the copy on
	   the left, the ledger of inputs on the right. Both the gap between the
	   columns and the padding inside the rows were tight enough that the text
	   read as pressed against its own edges. */
	.twin-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: start;
	}
	.twin-copy p + p {
		margin-top: 1.15rem;
	}
	.twin-copy p {
		line-height: 1.7;
	}

	.twin-sources {
		border-top: 1px solid var(--color-ink);
		padding-top: 1.25rem;
	}
	.sources-label {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		margin-bottom: 0.75rem;
	}
	.sources-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.sources-list li {
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr);
		align-items: baseline;
		gap: 0.75rem;
		padding-block: 1.15rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.source-n {
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-ink-faint);
	}
	.source-text {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-ink);
	}
	/* Where they all land. Marked by a heavier rule and by the brand blue,
	   not by a gradient fill: the page has no gradients anywhere else. */
	.twin-state {
		margin: 0;
		padding: 1.5rem 0 0;
		border-top: 2px solid var(--color-primary-600);
		font-size: clamp(1.15rem, 2vw, 1.5rem);
		font-weight: var(--weight-display);
		font-family: var(--font-family-heading);
		letter-spacing: -0.025em;
		line-height: 1.35;
		color: var(--color-ink);
	}
	.state-label {
		display: block;
		font-family: var(--font-family-sans);
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin-bottom: 0.5rem;
	}
	@media (min-width: 860px) {
		.twin-grid {
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
			gap: clamp(3rem, 6vw, 5rem);
		}
	}

	/* Four figures, divided by hairline rules rather than boxed as cards, and
	   with no hover state: nothing here is clickable. */
	.graph-tiles {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0;
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		border-top: 1px solid rgba(255, 255, 255, 0.22);
	}
	.graph-tile {
		padding: clamp(1.4rem, 3vw, 1.9rem) 1.25rem;
		text-align: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
	}
	.graph-tile:nth-child(even) {
		border-left: 1px solid rgba(255, 255, 255, 0.12);
	}
	.tile-value {
		display: block;
		font-family: var(--font-family-heading);
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		font-weight: var(--weight-display);
		letter-spacing: -0.03em;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		color: #fff;
	}
	.tile-label {
		display: block;
		margin-top: 0.6rem;
		font-size: 0.8rem;
		line-height: 1.5;
		color: rgba(226, 232, 255, 0.72);
	}

	/* The standards, set well clear of the figures above them. They used to
	   butt straight up against the last row of numbers. */
	/* Centred under a centred heading, like the figures above it. The label,
	   the strip, the caption and the CTA each found their own left edge, which
	   left four different starting points stacked down one column. */
	.standards {
		margin-top: clamp(2.75rem, 6vw, 4.5rem);
		padding-top: clamp(1.75rem, 3vw, 2.25rem);
		border-top: 1px solid rgba(255, 255, 255, 0.22);
		text-align: center;
	}
	.standards-label {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(226, 232, 255, 0.55);
		margin-bottom: 1.25rem;
	}
	/* Five equal columns spanning the full width, matched to the four figures
	   above them. As a wrapping flex row the chips hugged the left edge at
	   their content width and left most of the band empty. */
	.standards-strip {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}
	.graph-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
	}
	.explore-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #fff;
		color: var(--color-ink);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 0.9rem 1.6rem;
		transition:
			background var(--duration-hover) ease,
			transform var(--duration-press) var(--ease-out);
	}
	.explore-btn:active {
		transform: scale(0.97);
	}
	@media (hover: hover) and (pointer: fine) {
		.explore-btn:hover {
			background: var(--color-primary-300);
		}
	}
	@media (min-width: 720px) {
		.graph-tiles {
			grid-template-columns: repeat(4, 1fr);
		}
		.graph-tile:not(:first-child) {
			border-left: 1px solid rgba(255, 255, 255, 0.12);
		}
		.standards-strip {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}
	.standard-chip {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.2rem;
		padding: 0.9rem 1.1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.14);
	}
	.chip-name {
		font-family: var(--font-family-heading);
		font-weight: var(--weight-display);
		letter-spacing: -0.01em;
		color: #fff;
		font-size: 0.95rem;
	}
	.chip-note {
		font-size: 0.72rem;
		line-height: 1.4;
		color: rgba(226, 232, 255, 0.6);
	}
	.grounding-caption {
		margin: 1.5rem auto 0;
		max-width: 34ch;
		font-family: var(--font-family-heading);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		font-weight: 500;
		line-height: 1.4;
		color: var(--color-primary-300);
	}
	.clinician-stage {
		display: inline-block;
		font-family: var(--font-family-mono);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-primary-300);
		margin-bottom: 0.5rem;
	}
	.clinician-note p {
		font-size: 1rem;
		line-height: 1.7;
	}
	.clinician-note strong {
		color: #fff;
	}
	.safety-gate {
		position: relative;
		display: grid;
		grid-template-columns: 2.1rem 1fr;
		gap: 1.1rem;
		padding-block: 1.15rem;
	}
	.safety-gate + .safety-gate {
		border-top: 1px solid rgba(255, 255, 255, 0.07);
	}
	.gate-marker {
		position: relative;
		z-index: 1;
		width: 2.1rem;
		height: 2.1rem;
		border-radius: 999px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface-blue);
		border: 1px solid rgba(148, 171, 255, 0.45);
		margin-top: 0.1rem;
	}
	.gate-index {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-primary-300);
		font-variant-numeric: tabular-nums;
	}
	.safety-stage {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-primary-300);
		margin-bottom: 0.3rem;
	}
	.safety-gate h3 {
		font-size: 1.05rem;
		margin-bottom: 0.35rem;
	}
	.safety-gate p {
		font-size: 0.95rem;
		line-height: 1.65;
		margin: 0;
	}
	.residency-note {
		margin: clamp(2rem, 4vw, 2.75rem) auto 0;
		font-size: 0.95rem;
		line-height: 1.7;
		max-width: 46rem;
		padding: 1.1rem 1.4rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
	}
	.residency-note strong {
		color: #fff;
	}
</style>
