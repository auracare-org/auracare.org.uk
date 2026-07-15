<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal, countUp } from '$lib/actions/motion';
	import { CONTACT, ONTOLOGY_STATS } from '$lib/data/company';

	/* --- The reasoning loop --------------------------------------- */
	const LOOP = [
		{
			key: 'input',
			label: 'Input',
			body: 'Signals arrive — wearables, labs, notes, a question asked in plain language.'
		},
		{
			key: 'encoding',
			label: 'Encoding',
			body: 'Each signal is mapped into one shared clinical vocabulary, with a confidence score attached.'
		},
		{
			key: 'reasoning',
			label: 'Reasoning',
			body: 'The neuro-symbolic core weighs the evidence over the knowledge graph to narrow what is likely.'
		},
		{
			key: 'output',
			label: 'Output',
			body: 'A grounded, traceable response — every claim linked back to a named source.'
		},
		{
			key: 'voi',
			label: 'Value-of-information',
			body: 'The loop decides the next-best question — the one that removes the most uncertainty — and asks it.'
		}
	];

	/* --- The neuro-symbolic core ---------------------------------- */
	const SYMBOLIC = [
		'Grounded in SNOMED CT, ICD-11 and the terminologies medicine already agrees on',
		'Deterministic and inspectable — you can follow every step',
		'Authoritative: it holds the veto'
	];
	const LEARNED = [
		'Reads across messy, multi-modal signals to spot patterns',
		'Adapts as more consented data flows in',
		'Advisory: it proposes, it never decides alone'
	];

	/* --- Digital twin sources ------------------------------------- */
	const TWIN_SOURCES = [
		'Wearables & continuous sensors',
		'Lab results & records',
		'Clinical notes & history',
		'What a person tells us, in their own words'
	];

	/* --- Clinical-grade grounding --------------------------------- */
	const STANDARDS = [
		{ name: 'SNOMED CT', note: 'Clinical terms' },
		{ name: 'ICD-11', note: 'Diagnoses' },
		{ name: 'HPO', note: 'Phenotypes' },
		{ name: 'LOINC', note: 'Lab codes' },
		{ name: 'NICE', note: 'UK guidance' },
		{ name: 'MHRA', note: 'UK regulation' },
		{ name: 'dm+d', note: 'Medicines' }
	];

	/* --- Safety & privacy ----------------------------------------- */
	const SAFEGUARDS = [
		{
			title: 'Encoding-confidence gates',
			body: 'A signal that cannot be mapped with enough confidence is held back, not guessed at.'
		},
		{
			title: 'A full audit log',
			body: 'Every input, inference and source is recorded, so any answer can be traced after the fact.'
		},
		{
			title: 'Red-flag routing',
			body: 'Anything that reads as urgent is routed to the right emergency or clinical service, immediately.'
		},
		{
			title: 'Jurisdiction awareness',
			body: 'Guidance and routing adapt to where a person actually is — the standards and services differ by country.'
		}
	];

	/* Parse an ONTOLOGY_STATS value into a countable number + suffix,
	   or fall back to rendering it verbatim (e.g. "ICD-11"). */
	function parseStat(value: string): { num: number; suffix: string } | null {
		const m = value.match(/^([\d.]+)(.*)$/);
		if (!m) return null;
		const num = parseFloat(m[1]);
		if (Number.isNaN(num)) return null;
		const decimals = m[1].includes('.') ? 1 : 0;
		return { num, suffix: m[2] };
	}
</script>

<Seo
	title="Technology"
	description="A loop, not a pipeline: the neuro-symbolic, ontology-grounded core behind Auracare's agentic clinical decision support."
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
			A loop, <span class="text-gradient-l">not a pipeline</span>.
		</h1>
		<p class="hero-sub" use:reveal={{ delay: 140 }}>
			Most health AI runs a fixed pipeline: data in, answer out. We are building something that
			behaves more like a clinician — a reasoning loop that reasons, then asks the next-best
			question, then reasons again, always grounded in the knowledge medicine already agrees on.
		</p>
		<div class="hero-status" use:reveal={{ delay: 220 }}>
			<span class="pill pill-live">Ontology graph — live today</span>
			<span class="pill pill-dev">Agentic reasoning engine — in development</span>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- 1. The reasoning loop                                         -->
<!-- ============================================================ -->
<section class="section-y loop-section">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>The reasoning loop</span>
		<h2 use:reveal={{ delay: 60 }}>Five stages that feed back into themselves.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			A pipeline ends when it produces an answer. Our loop treats every answer as the start of a
			better question — and a translucent safety layer wraps all five stages, end to end.
		</p>

		<!-- Visual diagram (decorative; the list below is the accessible equivalent) -->
		<div class="loop-diagram" use:reveal={{ delay: 160 }} aria-hidden="true">
			<div class="safety-band"><span>Safety — across every stage</span></div>
			<svg class="loop-svg" viewBox="0 0 1000 260" preserveAspectRatio="xMidYMid meet">
				<defs>
					<linearGradient id="loopLine" x1="0" y1="0" x2="1" y2="0">
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

				<!-- forward path through the five nodes -->
				<path
					class="loop-path"
					d="M110 90 H890"
					fill="none"
					stroke="url(#loopLine)"
					stroke-width="3"
					stroke-dasharray="8 8"
					marker-end="url(#loopArrow)"
				/>
				<!-- return path: value-of-information → input -->
				<path
					class="loop-path loop-return"
					d="M890 120 V190 H110 V120"
					fill="none"
					stroke="url(#loopLine)"
					stroke-width="3"
					stroke-dasharray="8 8"
					marker-end="url(#loopArrow)"
				/>

				{#each LOOP as _stage, i}
					<g class="loop-node" style="--i:{i}">
						<circle cx={110 + i * 195} cy="90" r="30" />
						<text x={110 + i * 195} y="95" text-anchor="middle">{i + 1}</text>
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
			<strong>Safety runs across all five.</strong> No stage is left to reason unsupervised — the same
			guardrails apply from the first signal to the next question asked.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- 2. The neuro-symbolic core                                    -->
<!-- ============================================================ -->
<section class="section-y core-section aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>The neuro-symbolic core</span>
		<h2 use:reveal={{ delay: 60 }}>Two kinds of intelligence, checking each other.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Learned models are powerful and fluent, but they can be confidently wrong. Symbolic systems
			are rigorous but rigid. We pair them — and give the auditable side the final say.
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
			A learned model <em>proposes</em>, an auditable symbolic layer <em>disposes</em>.
		</p>
	</div>
</section>

<!-- ============================================================ -->
<!-- 3. The digital twin / patient state                           -->
<!-- ============================================================ -->
<section class="section-y twin-section">
	<div class="container-wide twin-grid">
		<div class="twin-copy">
			<span class="eyebrow" use:reveal>The digital twin</span>
			<h2 use:reveal={{ delay: 60 }}>One timestamped model of a person.</h2>
			<p class="lede" use:reveal={{ delay: 120 }}>
				A person's health does not live in one app. It is scattered across devices, labs and memory.
				The digital twin pulls those sources into a single, timestamped state — so the reasoning
				loop always works from one coherent picture, not a dozen partial ones.
			</p>
			<p use:reveal={{ delay: 180 }}>
				Every source is encoded into the same vocabulary and stamped with when it was true, so the
				twin can answer not just <em>what a reading was</em> but
				<em>how it has changed, and whether that matters now</em>.
			</p>
		</div>
		<ul class="twin-sources" use:reveal={{ delay: 140 }}>
			{#each TWIN_SOURCES as source, i}
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
<!-- 4. The knowledge graph                                        -->
<!-- ============================================================ -->
<section class="section-y graph-section aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>The knowledge graph</span>
		<h2 use:reveal={{ delay: 60 }}>Grounded in what medicine already knows.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			The reasoning is anchored to a live graph of clinical concepts and the relationships between
			them — the part of the system you can explore for yourself today.
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

		<div class="graph-cta" use:reveal={{ delay: 120 }}>
			<a class="explore-btn" href={CONTACT.ontologyUrl} target="_blank" rel="noopener noreferrer">
				Explore the graph <span aria-hidden="true">↗</span>
			</a>
			<span class="pill pill-live">Live</span>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- 5. Clinical-grade grounding                                   -->
<!-- ============================================================ -->
<section class="section-y grounding-section">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Clinical-grade grounding</span>
		<h2 use:reveal={{ delay: 60 }}>Traceable to a named source.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Our knowledge is not scraped from the open web. It is mapped to the standards clinicians,
			regulators and health systems already trust.
		</p>

		<ul
			class="standards-strip"
			use:reveal={{ delay: 140 }}
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
	</div>
</section>

<!-- ============================================================ -->
<!-- 6. Safety & privacy by design                                 -->
<!-- ============================================================ -->
<section class="section-y safety-section aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Safety &amp; privacy by design</span>
		<h2 use:reveal={{ delay: 60 }}>Built to be checked.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Trust in a health system is earned in the details. These are not features bolted on at the end
			— they are how the loop is built.
		</p>

		<div class="safety-grid">
			{#each SAFEGUARDS as item, i}
				<div class="glass-card safety-card" use:reveal={{ delay: 70 * i }}>
					<h3>{item.title}</h3>
					<p>{item.body}</p>
				</div>
			{/each}
		</div>

		<p class="residency-note" use:reveal>
			On data residency: the reasoning core is <strong
				>designed to run inside our own cloud tenant</strong
			>, so consented health data stays within infrastructure we control. This is an architectural
			commitment for the agentic engine — which remains in development.
		</p>
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
	.hero-status {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1.75rem;
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

	/* ---------------- 1. Loop ---------------- */
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
		counter-reset: none;
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
		.loop-list li:last-child {
			grid-column: 1 / -1;
		}
	}

	/* ---------------- 2. Core ---------------- */
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
	@media (min-width: 760px) {
		.core-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* ---------------- 3. Twin ---------------- */
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

	/* ---------------- 4. Graph ---------------- */
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

	/* ---------------- 5. Grounding ---------------- */
	.standards-strip {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.standard-chip {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		padding: 0.7rem 1.1rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.85);
		border: 1px solid rgba(79, 111, 237, 0.16);
		box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
	}
	.chip-name {
		font-family: var(--font-family-heading);
		font-weight: 700;
		color: var(--color-primary-700);
		font-size: 0.95rem;
	}
	.chip-note {
		font-size: 0.72rem;
		color: var(--color-neutral-500, #6b7280);
	}
	.grounding-caption {
		margin-top: 1.5rem;
		font-family: var(--font-family-heading);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		font-weight: 500;
		color: var(--color-primary-700);
	}

	/* ---------------- 6. Safety ---------------- */
	.safety-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.safety-card {
		padding: clamp(1.25rem, 3vw, 1.75rem);
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
</style>
