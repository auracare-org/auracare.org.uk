<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal, countUp } from '$lib/actions/motion';
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
			body: 'One timeline: everyday-life signals from Auracle, clinical history, and vitals captured live in the room, all on a single timestamped record.'
		},
		{
			key: 'encoding',
			label: 'Encoding',
			body: 'Each observation is matched to its concept in the clinical ontology and stamped with when it was true. This is the step that turns loose readings into a record the core can reason over.'
		},
		{
			key: 'thinking',
			label: 'Thinking',
			body: 'The core weighs the evidence across the knowledge graph and returns a spread of what is likely, rather than committing to one answer.'
		},
		{
			key: 'thesis',
			label: 'Thesis',
			body: 'That spread is checked against population data, expressed as risk, and set out as a ranked differential with its sources attached. It is provisional, and it changes when the evidence does.'
		},
		{
			key: 'voi',
			label: 'Value-of-information',
			body: 'The loop weighs whether another question would change the answer enough to justify the delay. If it would, it picks the single most useful one and starts again. If not, it stops here.'
		},
		{
			key: 'outcome',
			label: 'Medical outcome',
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
		<span class="part-tag" use:reveal>I</span>
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
		<ul class="twin-sources" use:reveal={{ delay: 140 }}>
			{#each STATE_SOURCES as source, i}
				<li class="glass-card" style="--i:{i}">
					<span class="source-line" aria-hidden="true"></span>
					{source}
				</li>
			{/each}
			<li class="twin-state glass-card">One timestamped patient state</li>
		</ul>
	</div>
</section>

<!-- ============================================================ -->
<!-- PART TWO · AURACARE CDSS · the reasoning loop                 -->
<!-- ============================================================ -->
<section id="auracare" class="section-y loop-section">
	<div class="container-wide">
		<span class="part-tag" use:reveal>II</span>
		<span class="eyebrow" use:reveal={{ delay: 40 }}>Auracare CDSS · clinical reasoning</span>
		<h2 use:reveal={{ delay: 80 }}>A loop, not a pipeline.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Most health AI answers whatever it is asked, once. A clinician does something else: they form
			a view, work out what would change it, and go and find that out. Auracare runs the same way,
			and keeps going round until asking again would not be worth the delay.
		</p>

		<!--
		  The loop, drawn as a loop.

		  A framed list said "cycle" and showed a column, and its overlay label was
		  absolutely positioned against the frame, which put it on top of the lede
		  above it. Five stages now sit on a real circle with the direction of
		  travel marked, stage five exits outward to the outcome, and the safety
		  overlay is the ring the whole thing sits inside. The ordered list below
		  carries the same content for screen readers and narrow screens.
		-->
		<figure class="loop-fig" use:reveal={{ delay: 120 }}>
			<svg viewBox="0 0 640 560" role="img" aria-labelledby="loop-fig-title">
				<title id="loop-fig-title">
					The reasoning loop: input, encoding, thinking, thesis and value-of-information run as a
					cycle inside a safety overlay; stage five either repeats the cycle or exits to a medical
					outcome.
				</title>
				<defs>
					<marker
						id="loopHead"
						viewBox="0 0 10 10"
						refX="7"
						refY="5"
						markerWidth="6"
						markerHeight="6"
						orient="auto-start-reverse"
					>
						<path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
					</marker>
				</defs>

				<!-- The safety overlay: the ring everything happens inside -->
				<circle class="ring" cx="290" cy="250" r="228" />
				<text class="ring-label" x="290" y="34" text-anchor="middle"
					>SAFETY OVERLAY · EVERY STAGE</text
				>

				<!-- Direction of travel -->
				<circle class="path" cx="290" cy="250" r="150" />
				{#each LOOP.slice(0, 5) as _s, i}
					{@const a0 = (i / 5) * 2 * Math.PI - Math.PI / 2 + 0.34}
					{@const a1 = ((i + 1) / 5) * 2 * Math.PI - Math.PI / 2 - 0.34}
					<path
						class="arc"
						marker-end="url(#loopHead)"
						d="M {290 + 150 * Math.cos(a0)} {250 + 150 * Math.sin(a0)} A 150 150 0 0 1 {290 +
							150 * Math.cos(a1)} {250 + 150 * Math.sin(a1)}"
					/>
				{/each}

				<!-- The five cycling stages -->
				{#each LOOP.slice(0, 5) as stage, i}
					{@const a = (i / 5) * 2 * Math.PI - Math.PI / 2}
					{@const x = 290 + 150 * Math.cos(a)}
					{@const y = 250 + 150 * Math.sin(a)}
					<g class="node" class:exit={i === 4}>
						<circle cx={x} cy={y} r="42" />
						<text class="node-num" {x} y={y - 4} text-anchor="middle">0{i + 1}</text>
						<text class="node-label" {x} y={y + 13} text-anchor="middle">
							{stage.label.length > 12 ? 'VOI' : stage.label}
						</text>
					</g>
				{/each}

				<!-- Stage five is the only exit, and it converges inward: the cycle
				     runs around the outside and drops into the outcome at the centre.
				     The exit therefore starts at stage five's edge, not at a fixed
				     point that happened to sit under a different node. -->
				<path class="exit-line" marker-end="url(#loopHead)" d="M 186 216 L 200 226" />
				<g class="node outcome">
					<rect x="205" y="222" width="170" height="56" />
					<text class="node-num" x="290" y="246" text-anchor="middle">06</text>
					<text class="node-label" x="290" y="264" text-anchor="middle">Medical outcome</text>
				</g>
			</svg>
			<figcaption>
				Stages one to five cycle. Stage five is the only exit, and everything leaving it passes the
				safety overlay.
			</figcaption>
		</figure>

		<ol class="loop-list">
			{#each LOOP as stage, i}
				<li class="loop-item" use:reveal={{ delay: 40 }}>
					<span class="loop-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<div class="loop-text">
						<h3>{stage.label}</h3>
						<p>{stage.body}</p>
					</div>
				</li>
			{/each}
		</ol>

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

		<div class="graph-tiles">
			{#each ONTOLOGY_STATS as stat, i}
				{@const parsed = parseStat(stat.value)}
				<div class="glass-card graph-tile" use:reveal={{ delay: 60 * i }}>
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

		<ul
			class="standards-strip"
			use:reveal={{ delay: 120 }}
			aria-label="Standards our knowledge is traceable to"
		>
			{#each STANDARDS as std, i}
				<li class="standard-chip" style="--i:{i}">
					<span class="chip-name">{std.name}</span>
					<span class="chip-note">{std.note}</span>
				</li>
			{/each}
		</ul>
		<p class="grounding-caption" use:reveal>Every answer traceable to a named source.</p>

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
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 30rem;
	}
	.churn-axis-label {
		display: block;
		font-family: var(--font-family-heading);
		font-size: 0.68rem;
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
		line-height: 1.55;
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
	.step-n {
		flex: none;
		font-family: var(--font-family-mono);
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--color-primary-500);
		padding-top: 0.15rem;
	}
	.twin-step h3 {
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}
	.twin-step p {
		font-size: 0.95rem;
		line-height: 1.55;
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
		line-height: 1.6;
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
		line-height: 1.6;
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
	/* Part numerals. Set large and bold so they read as chapter marks rather
	   than as another small grey label above a heading. */
	.part-tag {
		display: block;
		font-size: clamp(1.5rem, 2.8vw, 2.2rem);
		font-weight: 700;
		letter-spacing: 0.04em;
		line-height: 1;
		color: var(--color-ink);
		margin-bottom: 1.1rem;
	}
	.loop-fig {
		margin: clamp(2.5rem, 5vw, 4rem) 0 0;
	}
	.loop-fig svg {
		display: block;
		width: 100%;
		max-width: 46rem;
		height: auto;
		margin-inline: auto;
		color: var(--color-primary-600);
	}
	.ring {
		fill: none;
		stroke: var(--color-rule-strong);
		stroke-width: 1;
		stroke-dasharray: 5 7;
	}
	.ring-label {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.18em;
		fill: var(--color-ink-faint);
	}
	.path {
		fill: none;
		stroke: var(--color-rule);
		stroke-width: 1;
	}
	.arc {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		opacity: 0.55;
	}
	.node circle,
	.node rect {
		fill: var(--color-surface-page);
		stroke: var(--color-ink);
		stroke-width: 1.5;
	}
	.node.exit circle {
		stroke: var(--color-primary-600);
		stroke-width: 2.5;
	}
	.node.outcome rect {
		fill: var(--color-ink);
		stroke: var(--color-ink);
	}
	.node.outcome .node-num,
	.node.outcome .node-label {
		fill: var(--color-surface-page);
	}
	.node-num {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.1em;
		fill: var(--color-primary-600);
	}
	.node-label {
		font-size: 12px;
		font-weight: 600;
		fill: var(--color-ink);
	}
	.exit-line {
		fill: none;
		stroke: var(--color-primary-600);
		stroke-width: 2;
	}
	figcaption {
		margin: 1.25rem auto 0;
		text-align: center;
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--color-ink-faint);
		max-width: 46ch;
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
		line-height: 1.55;
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

	@media (min-width: 800px) {
		.loop-list {
			grid-template-columns: repeat(2, 1fr);
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
		font-size: 0.68rem;
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
		line-height: 1.55;
		color: var(--color-ink-soft);
	}
	.core-tail {
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-ink);
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.55;
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
	.twin-copy p + p {
		margin-top: 1rem;
	}
	.twin-sources {
		list-style: none;
		display: grid;
		gap: 0.75rem;
	}
	.twin-sources li {
		position: relative;
		padding: 1rem 1.25rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.source-line {
		flex: none;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: var(--color-primary-500);
		box-shadow: 0 0 0 4px rgba(56, 127, 245, 0.14);
	}
	.twin-state {
		justify-content: center;
		font-family: var(--font-family-heading);
		font-weight: 700;
		background: linear-gradient(
			135deg,
			var(--color-primary-600),
			var(--color-primary-500)
		) !important;
		color: #fff !important;
		border: none !important;
	}
	@media (min-width: 860px) {
		.twin-grid {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}
	.graph-tiles {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.graph-tile {
		padding: clamp(1.25rem, 3vw, 1.75rem);
		text-align: center;
	}
	.tile-value {
		display: block;
		font-family: var(--font-family-heading);
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		color: #fff;
		text-shadow: 0 0 24px rgba(97, 128, 255, 0.45);
	}
	.tile-label {
		display: block;
		margin-top: 0.5rem;
		font-size: 0.85rem;
		color: rgba(226, 232, 255, 0.72);
	}
	.graph-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.9rem;
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
	}
	.explore-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 600;
		padding: 0.8rem 1.5rem;
		border-radius: 999px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.explore-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.32);
	}
	@media (min-width: 720px) {
		.graph-tiles {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.standard-chip {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		padding: 0.7rem 1.1rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.14);
	}
	.chip-name {
		font-family: var(--font-family-heading);
		font-weight: 700;
		color: #fff;
		font-size: 0.95rem;
	}
	.chip-note {
		font-size: 0.72rem;
		color: rgba(226, 232, 255, 0.6);
	}
	.grounding-caption {
		margin-top: 1.25rem;
		font-family: var(--font-family-heading);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		font-weight: 500;
		color: var(--color-primary-300);
	}
	.clinician-stage {
		display: inline-block;
		font-family: var(--font-family-mono);
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-primary-300);
		margin-bottom: 0.5rem;
	}
	.clinician-note p {
		font-size: 1rem;
		line-height: 1.6;
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
		font-size: 0.66rem;
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
		line-height: 1.55;
		margin: 0;
	}
	.residency-note {
		margin: clamp(2rem, 4vw, 2.75rem) auto 0;
		font-size: 0.95rem;
		line-height: 1.6;
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
