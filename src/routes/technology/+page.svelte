<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal, countUp } from '$lib/actions/motion';
	import { CONTACT, ONTOLOGY_STATS } from '$lib/data/company';

	/* --- Auratwin: how the twin gets built ------------------------ */
	const TWIN_STEPS = [
		{
			n: '01',
			label: 'Connect',
			body: 'Link the wearables and health apps you already use. Cloud services sync server-side: the vendor pings us the moment a new record lands and we pull just that record. Phone-native sources push straight from the device, since they expose no server to poll. Either path runs in the background. Nothing to open, nothing to remember.'
		},
		{
			n: '02',
			label: 'Normalise',
			body: 'Every source records data its own way. The twin translates each record into one shared format (resting heart rate is the same field whether it came from a ring or a watch), removes duplicates across devices, and timestamps each reading in your local time, so last night’s sleep is counted on the right day. The result is one clean, consistent stream instead of a dozen feeds that don’t line up.'
		},
		{
			n: '03',
			label: 'Converse',
			body: 'The twin keeps an eye on the normalised stream and messages you first when something shifts (a run of poor recovery, a sedentary streak) and answers when you text back. Just reply in plain language; that is the logging. It all happens in your messages: no new app, no forms, no streaks to keep alive.'
		}
	];

	/* Signals the twin ingests. Categories, not a device list, so it
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
			body: 'The prior and the acute, on one timeline: everyday-life signals from the twin, clinical history, and vitals captured live in the room, all as points on a single timestamped record.'
		},
		{
			key: 'encoding',
			label: 'Encoding',
			body: 'The bridge. Each observation is entity-linked onto the clinical ontology and stamped with when it was true, building the one patient state the core reasons over.'
		},
		{
			key: 'thinking',
			label: 'Thinking',
			body: 'The neuro-symbolic core weighs the evidence over the knowledge graph and returns a distribution over what is likely, never a single guess.'
		},
		{
			key: 'thesis',
			label: 'Thesis',
			body: 'Calibrate, score, diagnose. The distribution is grounded against population data, turned into quantified risk, and stated as a ranked differential with its sources attached: a working thesis, held only as long as the evidence supports it.'
		},
		{
			key: 'voi',
			label: 'Value-of-information',
			body: 'The loop asks whether more evidence is worth acquiring. If yes, it picks the single next-best question, exam or test and feeds it back to the top. If not, it converges and hands the thesis on.'
		},
		{
			key: 'outcome',
			label: 'Medical outcome',
			body: 'The thesis becomes an action: a referral, a prescription, further testing or a lifestyle plan, each one gated by safety and by what is permitted where the patient actually is.'
		}
	];

	/* --- The neuro-symbolic core ---------------------------------- */
	const SYMBOLIC = [
		'The clinical ontology (SNOMED CT, ICD-11, LOINC, HPO): curated, deterministic, every edge inspectable',
		'Runs the red-flag and contraindication screens, and reads diagnoses straight off named graph edges',
		'Authoritative: it holds the veto over anything the learned side proposes'
	];
	const LEARNED = [
		'A Heterogeneous Graph Transformer: a graph neural network that learns patterns across a patient’s linked clinical data',
		'Bends the generic textbook weights toward this patient’s comorbidities and trajectory, then ranks the shortlist',
		'Advisory by construction: it proposes and personalises, but never makes an un-gated decision'
	];

	/* --- The patient state ---------------------------------------- */
	const STATE_SOURCES = [
		'Everyday-life signals from the twin',
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
			body: 'A signal that cannot be mapped to the right concept with enough confidence is flagged, not silently trusted. A mis-linked observation would poison everything downstream.'
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
			body: 'The loop only ever proposes actions permitted where the patient actually is: prescribing authority and what is possible in primary care versus referral.'
		},
		{
			title: 'Contraindication check',
			stage: 'Prescribing',
			body: 'The last gate before any terminal action: interactions, allergies and pharmacogenomic contraindications, checked against the medicine.'
		},
		{
			title: 'Clinical assurance sampling',
			stage: 'On live output',
			body: 'The empirical face: human clinicians grade sampled live outputs against a harm ladder, with sign-off at every new deployment and ongoing random re-review.'
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
	description="Two products on one patient model: how Auratwin builds a high-context digital twin, and how Auracare's neuro-symbolic reasoning loop turns it into grounded, traceable clinical decision support."
	path="/technology"
/>

<!-- ============================================================ -->
<!-- Hero                                                          -->
<!-- ============================================================ -->
<section class="tech-hero aura-space">
	<div class="hero-orbs" aria-hidden="true">
		<span
			class="bubble"
			style="--bubble-size:380px;--bubble-color:rgba(97,128,255,.32);--bubble-blur:18px; top:-10%; right:-4%"
		></span>
		<span
			class="bubble"
			style="--bubble-size:280px;--bubble-color:rgba(56,127,245,.24);--bubble-blur:14px; bottom:-12%; left:-6%"
		></span>
	</div>
	<div class="container-wide hero-inner">
		<span class="eyebrow" use:reveal>Technology</span>
		<h1 use:reveal={{ delay: 60 }}>
			Two products. <span class="text-gradient-l">One patient model.</span>
		</h1>
		<p class="hero-sub" use:reveal={{ delay: 140 }}>
			Everything we build stands on a single idea: one timestamped picture of a person, grounded in
			the language medicine already agrees on. <strong>Auratwin</strong> is a consumer twin that
			learns your daily life. <strong>Auracare</strong> is clinical decision support that reasons over
			the whole picture: vitals, history, symptoms and everything the twin captures. This page is how
			both actually work.
		</p>
		<nav class="hero-jump" use:reveal={{ delay: 200 }} aria-label="Jump to a product">
			<a href="#auratwin">Auratwin <span aria-hidden="true">→</span></a>
			<a href="#auracare">Auracare <span aria-hidden="true">→</span></a>
		</nav>
		<div class="hero-status" use:reveal={{ delay: 260 }}>
			<span class="pill pill-live">Knowledge graph: live today</span>
			<span class="pill pill-dev">Reasoning engine: in development</span>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- PART ONE · AURATWIN                                           -->
<!-- ============================================================ -->
<section id="auratwin" class="section-y twin-product">
	<div class="container-wide">
		<span class="part-tag" use:reveal>Part one</span>
		<span class="eyebrow" use:reveal={{ delay: 40 }}>Auratwin · the digital twin</span>
		<h2 use:reveal={{ delay: 80 }}>The twin builds the picture no clinic ever sees.</h2>
		<p class="lede" use:reveal={{ delay: 140 }}>
			Wellness apps fail the moment they demand effort. Auratwin removes it: the signals you already
			generate flow in on their own, get normalised into one timestamped model of your body, and the
			twin reaches you where you already talk. The result is a high-context, continuously updated
			view of daily life: the part of your health that lives between appointments.
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
						Of everyone who installs a health app, 20–30% are still active on day one and only 3–4%
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
					<text class="churn-pt" x="86" y="145">20–30% · day 1</text>
					<text class="churn-pt churn-pt-end" x="490" y="176">3–4% · day 30</text>
					<text class="churn-note" x="120" y="112">steepest drop: the first two weeks</text>

					<text class="churn-tick" x="40" y="206">day 0</text>
					<text class="churn-tick churn-pt-end" x="504" y="206">day 30</text>
				</svg>
			</div>

			<figcaption class="churn-src">
				Source: Sahha, health-app churn and retention. Day-1 retention averages 20–30% of
				installers; day-30 averages 3–4%.
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
			<h3 class="signals-head" use:reveal>Raw signals in, scores out.</h3>
			<p class="signals-sub" use:reveal={{ delay: 60 }}>
				Sleep, movement, meals and mindfulness sessions map to one canonical, timestamped schema.
				From those inputs the twin computes the scores you read: a Sleep Score from sleep stages,
				duration and consistency; recovery from resting heart rate and heart-rate variability, so
				every number is derived the same way, whatever device it came from. Wearables sync
				automatically; anything else is a reply away.
			</p>
			<ul class="signals-grid" use:reveal={{ delay: 100 }} aria-label="Signals the twin ingests">
				{#each TWIN_SIGNALS as sig, i}
					<li class="signal-chip" style="--i:{i}">
						<span class="sig-name">{sig.name}</span>
						<span class="sig-note">{sig.note}</span>
					</li>
				{/each}
			</ul>
			<p class="ehr-note" use:reveal>
				Health records can be read into the twin but never acted on by it, per the FD&amp;C Act
				§520(o)(1)(B) exclusion. The twin gives wellness guidance, not diagnosis.
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
			<span class="eyebrow" use:reveal>The patient state</span>
			<h2 use:reveal={{ delay: 60 }}>One timestamped model of a person.</h2>
			<p class="lede" use:reveal={{ delay: 120 }}>
				A person’s health does not live in one app. It is scattered across devices, labs and memory.
				The patient state pulls those sources onto a single timeline, each observation encoded into
				the same clinical vocabulary and stamped with when it was true, so the loop always reasons
				from one coherent picture, not a dozen partial ones.
			</p>
			<p use:reveal={{ delay: 180 }}>
				Because everything is timestamped, the state is longitudinal, not a flat snapshot. It can
				answer not just <em>what a reading was</em> but
				<em>how it has changed, and whether that matters now</em>: iron studies rising, a resting
				heart rate creeping up.
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
<!-- PART TWO · AURACARE · the reasoning loop                      -->
<!-- ============================================================ -->
<section id="auracare" class="section-y loop-section">
	<div class="container-wide">
		<span class="part-tag" use:reveal>Part two</span>
		<span class="eyebrow" use:reveal={{ delay: 40 }}>Auracare · clinical reasoning</span>
		<h2 use:reveal={{ delay: 80 }}>A loop, not a pipeline.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Most health AI runs a fixed pipeline: data in, answer out. Auracare behaves more like a
			clinician: it reasons, decides the next-best question, then reasons again, always anchored in
			established medical evidence. A pipeline ends when it produces an answer; our loop treats
			every answer as the start of a better question, and only acts once no further question is
			worth its cost. A safety layer wraps all six stages, end to end.
		</p>

		<!-- Visual diagram (decorative; the list below is the accessible equivalent) -->
		<div class="loop-diagram" use:reveal={{ delay: 160 }} aria-hidden="true">
			<div class="safety-band"><span>Safety: an overlay on every stage</span></div>
			<svg class="loop-svg" viewBox="0 0 1000 260" preserveAspectRatio="xMidYMid meet">
				<defs>
					<linearGradient
						id="loopLine"
						gradientUnits="userSpaceOnUse"
						x1="80"
						y1="90"
						x2="920"
						y2="90"
					>
						<stop offset="0%" stop-color="#6180ff" />
						<stop offset="100%" stop-color="#387ff5" />
					</linearGradient>
					<marker
						id="loopArrow"
						viewBox="0 0 10 10"
						refX="8"
						refY="5"
						markerWidth="7"
						markerHeight="7"
						orient="auto-start-reverse"
					>
						<path d="M0 0 L10 5 L0 10 z" fill="#6180ff" />
					</marker>
				</defs>

				<!-- forward connectors: a short, solid arrow floating in the middle
					 of each pair (1 → 2, 2 → 3, …), so it reads as a chain of steps,
					 not a single straight pipe -->
				{#each LOOP.slice(0, -1) as _link, i}
					<path
						class="loop-path loop-forward"
						style="--i:{i}"
						d="M{90 + i * 164 + 62} 90 H{90 + i * 164 + 102}"
						fill="none"
						stroke="url(#loopLine)"
						stroke-width="3"
						marker-end="url(#loopArrow)"
					/>
				{/each}
				<!-- return path: value-of-information → input -->
				<path
					class="loop-path loop-return"
					style="--i:5"
					d="M746 120 V190 H90 V120"
					fill="none"
					stroke="url(#loopLine)"
					stroke-width="3"
					stroke-dasharray="8 8"
					marker-end="url(#loopArrow)"
				/>

				{#each LOOP as _stage, i}
					<g class="loop-node" style="--i:{i}">
						<circle cx={90 + i * 164} cy="90" r="30" />
						<text x={90 + i * 164} y="95" text-anchor="middle">{i + 1}</text>
					</g>
				{/each}
			</svg>
		</div>

		<ol class="loop-list">
			{#each LOOP as stage, i}
				<li class="glass-card loop-item" use:reveal={{ delay: 80 * i }}>
					<span class="loop-num" aria-hidden="true">{i + 1}</span>
					<div>
						<h3>{stage.label}</h3>
						<p>{stage.body}</p>
					</div>
				</li>
			{/each}
		</ol>
		<p class="safety-note" use:reveal>
			<strong>Stage five is the only exit.</strong> Nothing reaches a patient until value-of-information
			says the next question is not worth its cost, and every action that follows is checked against
			the safety overlay before it leaves the loop.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- Auracare · the neuro-symbolic core                            -->
<!-- ============================================================ -->
<section class="section-y core-section aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>The neuro-symbolic core</span>
		<h2 use:reveal={{ delay: 60 }}>Two kinds of intelligence, checking each other.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Learned models are fluent but can be confidently wrong. Symbolic systems are rigorous but
			rigid. We pair them and draw a sharp, named line between the two, because Auracare is a
			medical device: a regulator’s question is not “is it accurate” but “which decisions crossed
			onto the learned side, and can you reconstruct them.” We keep that line inspectable.
		</p>

		<div class="core-grid">
			<div class="glass-card core-panel" use:reveal={{ delay: 120 }}>
				<span class="panel-tag panel-tag--symbolic">Symbolic</span>
				<h3>Auditable, authoritative</h3>
				<ul>
					{#each SYMBOLIC as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
			<div class="glass-card core-panel" use:reveal={{ delay: 200 }}>
				<span class="panel-tag panel-tag--learned">Learned</span>
				<h3>Adaptive, advisory</h3>
				<ul>
					{#each LEARNED as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
		</div>

		<p class="core-line" use:reveal={{ delay: 160 }}>
			The learned model <em>proposes</em>. The auditable layer <em>disposes</em>.
		</p>
		<p class="core-tail" use:reveal={{ delay: 200 }}>
			A glass box, not a black box: every conclusion traces back to a named ontology edge or rule,
			and every step is logged and replayable.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- Auracare · safety overlay                                     -->
<!-- ============================================================ -->
<section class="section-y safety-section aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Safety by design</span>
		<h2 use:reveal={{ delay: 60 }}>One gate on every stage.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Safety is an overlay, not a box at the end. Drawing it as a single final filter would imply
			reasoning can be unsafe as long as the last gate catches it, which is exactly the failure mode
			a medical device must not have. So the overlay runs through the whole loop, with a different
			instantiation at each stage.
		</p>

		<div class="clinician-note" use:reveal={{ delay: 160 }}>
			<span class="clinician-stage" aria-hidden="true">Clinician-in-the-loop</span>
			<p>
				And the outermost gate is a person. Auracare is built to be used
				<strong>in conjunction with a clinician, never to replace one</strong>. It is a tool that
				informs and supports their judgement &mdash; the clinician stays accountable for every
				decision, and their opinion always overrides the model.
			</p>
		</div>

		<div class="safety-grid">
			{#each SAFEGUARDS as item, i}
				<div class="glass-card safety-card" use:reveal={{ delay: 60 * i }}>
					<span class="safety-stage">{item.stage}</span>
					<h3>{item.title}</h3>
					<p>{item.body}</p>
				</div>
			{/each}
		</div>

		<p class="residency-note" use:reveal>
			On data residency: our approach is <strong>jurisdiction-based</strong>. Auracare will comply
			with the data residency requirements and local health data laws of each market we operate in,
			with the reasoning core designed to run inside our own cloud tenant in the applicable region
			so consented health data stays within infrastructure we control. This is an architectural
			commitment for the agentic engine, which remains in development, and whose regulatory pathway
			is under active, continuous review.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- Shared foundation · the knowledge graph                       -->
<!-- ============================================================ -->
<section class="section-y graph-section aura-space graph-foundation">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>What both products stand on</span>
		<h2 use:reveal={{ delay: 60 }}>Grounded in what medicine already knows.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			The twin and the reasoning core both bind to the same live graph of clinical concepts and the
			relationships between them. It is not scraped from the open web; it is mapped to the standards
			clinicians, regulators and health systems already trust, and it is the one part of the system
			you can explore for yourself today.
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
							}}
						></span>
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
	/* ---------------- Hero ---------------- */
	.tech-hero {
		padding-block: clamp(4rem, 10vw, 8rem);
	}
	.hero-orbs {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.hero-inner {
		position: relative;
		z-index: 1;
		max-width: 52rem;
	}
	.tech-hero h1 {
		font-size: clamp(2.4rem, 6vw, 4.2rem);
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 1.25rem;
	}
	.text-gradient-l {
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.hero-sub {
		font-size: clamp(1rem, 1.6vw, 1.2rem);
		line-height: 1.6;
		max-width: 42rem;
	}
	.hero-jump {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.75rem;
	}
	.hero-jump a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-family-heading);
		font-weight: 600;
		font-size: 0.95rem;
		color: #eaf0ff;
		padding: 0.6rem 1.2rem;
		border-radius: 999px;
		border: 1px solid rgba(148, 171, 255, 0.35);
		background: rgba(97, 128, 255, 0.12);
		transition:
			transform 0.2s ease,
			border-color 0.2s ease,
			background 0.2s ease;
	}
	.hero-jump a:hover {
		transform: translateY(-2px);
		border-color: rgba(148, 171, 255, 0.7);
		background: rgba(97, 128, 255, 0.22);
	}
	.hero-status {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1.25rem;
	}

	/* ---------------- Shared ---------------- */
	h2 {
		font-size: clamp(1.7rem, 3.6vw, 2.6rem);
		line-height: 1.1;
		letter-spacing: -0.015em;
		margin-block: 0.6rem 0.9rem;
		max-width: 24ch;
	}
	.lede {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.65;
		max-width: 46rem;
	}
	/* Part label sitting above the eyebrow, so each half is unmistakable. */
	.part-tag {
		display: inline-block;
		font-family: var(--font-family-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-500);
		margin-bottom: 0.6rem;
	}
	/* Anchor targets clear the sticky nav. */
	#auratwin,
	#auracare {
		scroll-margin-top: 5rem;
	}

	/* ---------------- Auratwin ---------------- */
	.twin-product {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
	}
	/* Churn figure: stat and curve stack on mobile, sit side by side above 720. */
	.churn {
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding: clamp(1.4rem, 3vw, 2rem);
		border-radius: var(--radius-2xl);
		background: #fff;
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.4rem, 3vw, 2rem);
		align-items: center;
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
	/* SVG text scales with the viewBox, so a narrow card shrinks these to
	   nothing: bump the user units back up below the two-column breakpoint. */
	@media (max-width: 719px) {
		.churn-pt {
			font-size: 20px;
		}
		.churn-note,
		.churn-tick {
			font-size: 18px;
		}
	}
	.churn-src {
		grid-column: 1 / -1;
		border-top: 1px solid var(--color-border-default);
		padding-top: 0.9rem;
		font-size: 0.8rem;
		line-height: 1.55;
		color: var(--color-ink-faint);
	}
	/* The curve draws itself in on reveal; static for reduced motion. */
	@media (prefers-reduced-motion: no-preference) {
		.churn-curve {
			stroke-dasharray: 600;
			stroke-dashoffset: 600;
		}
		.churn:global(.reveal--in) .churn-curve {
			animation: churn-draw 1.4s ease-out forwards;
		}
		.churn-area,
		.churn-dot,
		.churn-pt,
		.churn-note {
			opacity: 0;
		}
		.churn:global(.reveal--in) .churn-area,
		.churn:global(.reveal--in) .churn-dot,
		.churn:global(.reveal--in) .churn-pt,
		.churn:global(.reveal--in) .churn-note {
			animation: churn-fade 0.6s ease-out 0.9s forwards;
		}
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

	/* ---------------- Loop ---------------- */
	.loop-diagram {
		position: relative;
		margin-top: clamp(2rem, 5vw, 3.5rem);
		border-radius: var(--radius-4xl);
		background: linear-gradient(135deg, #f5f8ff, #eef2ff);
		border: 1px solid rgba(79, 111, 237, 0.12);
		padding: clamp(1.5rem, 4vw, 2.5rem);
		overflow: hidden;
	}
	.safety-band {
		position: relative;
		border: 1px dashed rgba(47, 78, 192, 0.4);
		background: rgba(97, 128, 255, 0.08);
		border-radius: 999px;
		text-align: center;
		padding: 0.4rem 1rem;
		margin-bottom: 1.25rem;
	}
	.safety-band span {
		font-family: var(--font-family-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-primary-700);
	}
	.loop-svg {
		width: 100%;
		height: auto;
		overflow: visible;
	}
	.loop-node circle {
		fill: #fff;
		stroke: url(#loopLine);
		stroke-width: 3;
		filter: drop-shadow(0 6px 16px rgba(47, 78, 192, 0.2));
	}
	.loop-node text {
		font-family: var(--font-family-heading);
		font-weight: 700;
		font-size: 1.6rem;
		fill: var(--color-primary-700);
	}

	.loop-list {
		list-style: none;
		display: grid;
		gap: 1rem;
		margin-top: clamp(2rem, 4vw, 3rem);
		grid-template-columns: 1fr;
	}
	.loop-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1.25rem 1.5rem;
	}
	.loop-num {
		flex: none;
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 999px;
		background: var(--color-primary-alpha-10, rgba(56, 127, 245, 0.1));
		color: var(--color-primary-600);
		font-family: var(--font-family-heading);
		font-weight: 700;
	}
	.loop-item h3 {
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}
	.loop-item p {
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-neutral-600, #4b5563);
	}
	.safety-note {
		margin-top: 1.5rem;
		font-size: 0.95rem;
		max-width: 46rem;
	}
	.safety-note strong {
		color: var(--color-primary-700);
	}

	@media (min-width: 800px) {
		.loop-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* ---------------- Core ---------------- */
	.core-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.core-panel {
		padding: clamp(1.5rem, 3vw, 2.25rem);
	}
	.panel-tag {
		display: inline-block;
		font-family: var(--font-family-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		padding: 0.28rem 0.7rem;
		border-radius: 999px;
		margin-bottom: 0.9rem;
	}
	.panel-tag--symbolic {
		color: #eaf0ff;
		background: rgba(97, 128, 255, 0.22);
		border: 1px solid rgba(97, 128, 255, 0.4);
	}
	.panel-tag--learned {
		color: #d7ffe9;
		background: rgba(52, 211, 153, 0.16);
		border: 1px solid rgba(52, 211, 153, 0.4);
	}
	.core-panel h3 {
		font-size: 1.25rem;
		margin-bottom: 0.9rem;
	}
	.core-panel ul {
		list-style: none;
		display: grid;
		gap: 0.7rem;
	}
	.core-panel li {
		position: relative;
		padding-left: 1.5rem;
		line-height: 1.5;
		color: rgba(226, 232, 255, 0.82);
		font-size: 0.95rem;
	}
	.core-panel li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: var(--color-primary-400, #6180ff);
	}
	.core-line {
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
		text-align: center;
		font-family: var(--font-family-heading);
		font-size: clamp(1.15rem, 2.4vw, 1.7rem);
		font-weight: 500;
		color: #fff !important;
		line-height: 1.4;
	}
	.core-line em {
		font-style: normal;
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 700;
	}
	.core-tail {
		margin-top: 0.9rem;
		text-align: center;
		font-size: 0.98rem;
		line-height: 1.6;
		max-width: 44rem;
		margin-inline: auto;
	}
	@media (min-width: 760px) {
		.core-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* ---------------- Patient state ---------------- */
	.twin-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
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

	/* ---------------- Graph ---------------- */
	/* Two dark sections meet here (safety → graph); a hairline keeps them
	   from reading as one continuous block. */
	.graph-foundation {
		border-top: 1px solid var(--color-border-dark);
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

	/* ---------------- Grounding chips ---------------- */
	.standards-strip {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
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

	/* ---------------- Safety ---------------- */
	.clinician-note {
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
		max-width: 52rem;
		padding: clamp(1.25rem, 3vw, 1.75rem);
		border-radius: var(--radius-md);
		background: rgba(99, 102, 241, 0.1);
		border: 1px solid rgba(99, 102, 241, 0.35);
		border-left: 3px solid var(--color-primary-300);
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
	.safety-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.safety-card {
		padding: clamp(1.25rem, 3vw, 1.75rem);
	}
	.safety-stage {
		display: inline-block;
		font-family: var(--font-family-mono);
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-primary-300);
		margin-bottom: 0.5rem;
	}
	.safety-card h3 {
		font-size: 1.1rem;
		margin-bottom: 0.4rem;
	}
	.safety-card p {
		font-size: 0.95rem;
		line-height: 1.55;
	}
	.residency-note {
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
		font-size: 0.95rem;
		line-height: 1.6;
		max-width: 48rem;
		padding: 1.1rem 1.4rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
	}
	.residency-note strong {
		color: #fff;
	}
	@media (min-width: 720px) {
		.safety-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1000px) {
		.safety-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
