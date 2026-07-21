<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, HARDWARE, HARDWARE_MORE, REGULATORY_NOTE } from '$lib/data/company';

	/* Why today's clinical AI doesn't fit the consultation. */
	const gap = [
		{
			stat: '~80%',
			label: 'of doctors already reach for AI',
			title: 'The demand is already there',
			body: 'Clinicians want the help. What breaks is the moment they turn to a screen mid-consultation: the patient watches their doctor google, and trust quietly erodes.'
		},
		{
			stat: '34%',
			label: 'specialty-benchmark score',
			title: 'Generic by architecture',
			body: 'The general-purpose models these tools run on score around a third on specialty-level clinical benchmarks, with no personalisation to the patient actually in the room.'
		},
		{
			stat: 'gaps',
			label: 'between every record',
			title: 'Disconnected from daily life',
			body: 'The record is a series of snapshots with long silences in between. Lifestyle and social history are slow to gather and easy to misremember, so the picture is always partial.'
		}
	];

	/* What actually happens during the appointment. */
	const room = [
		{
			k: '01',
			title: 'Nobody stops to type',
			body: 'The consultation is transcribed as it happens. No one breaks the conversation to write notes, and no one reads from a keyboard.'
		},
		{
			k: '02',
			title: 'The context is already in the room',
			body: 'The patient arrives with a complete lifestyle summary from their twin, and acute vitals stream live from our own devices, so nothing has to be dug up on the spot.'
		},
		{
			k: '03',
			title: 'The clinician stays with the patient',
			body: 'Auracare reasons quietly in the background and surfaces what’s useful. The clinician never appears to search anything, so eye contact, and the relationship, holds.'
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
			body: 'Guideline-aligned options that respect what’s available where the clinician works, including that practice’s own referral rules.'
		},
		{
			title: 'Documentation, automatic',
			body: 'Structured, formatted consultation notes written by the core, so admin shrinks and screen time turns back into patient time.'
		}
	];

	/* Illustrative differential, clearly an example, not a real patient.
	   `pct` is CLINICIAN AGREEMENT measured in live studies on the shipped core:
	   how often clinicians agreed when the core placed a condition here. It is NOT
	   the core's confidence or probability of being right. */
	const differentialExample = [
		{ name: 'Viral upper-respiratory infection', pct: 61, lead: true },
		{ name: 'Acute bacterial sinusitis', pct: 22 },
		{ name: 'Allergic rhinitis', pct: 11 }
	];

	/* The twin's personality is yours to shape: spectrums, not fixed settings. */
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

	/* Two routes to revenue on the clinical side. */
	const paths = [
		{
			key: 'A',
			title: 'Free to the clinician',
			body: 'Funded on the pharmaceutical side and left free for clinicians: the model that has already proven clinicians will adopt tools built for them.'
		},
		{
			key: 'B',
			title: 'Direct to providers',
			body: 'Sold to healthcare providers on the strength of the clinician time it saves, measured in shorter admin and fewer unnecessary referrals.'
		}
	];
</script>

<Seo
	title="Auracare: decision support inside the consultation"
	description="Auracare is clinician-facing clinical decision support that works quietly during the appointment. It reasons over the twin's lifestyle summary, live vitals from our own hardware, and the conversation itself, so the clinician keeps their eyes on the patient. In development."
	path="/product/auracare"
/>

<!-- ================= Hero ================= -->
<section class="hero aura-space">
	<div class="hero-grid-bg" aria-hidden="true"></div>
	<div class="hero-orb" aria-hidden="true"></div>
	<div class="container-wide hero-inner">
		<span class="pill pill-dev" use:reveal>Auracare · In development</span>
		<h1 use:reveal={{ delay: 60 }}>
			The decision support that <span class="hl">stays out of the way</span>.
		</h1>
		<p class="hero-sub" use:reveal={{ delay: 130 }}>
			Auracare is our clinical product: decision support that works during the appointment, not
			after it. The twin you may already know walks into the clinic with the patient, and the
			clinician keeps their attention exactly where it belongs.
		</p>
		<div class="hero-cta" use:reveal={{ delay: 200 }}>
			<a
				class="btn-solid"
				href="mailto:{CONTACT.clinical}?subject=Auracare%20%E2%80%94%20Clinical%20partnership"
				>Talk to us about clinical partnerships</a
			>
			<a class="btn-quiet" href="/technology">See the technology →</a>
		</div>
	</div>
</section>

<!-- ================= The clinical gap ================= -->
<section class="section-y gap-sec">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Why now</span>
		<h2 use:reveal={{ delay: 60 }}>
			Clinicians already want AI. Today’s tools don’t fit the room.
		</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			The appetite is settled; the fit isn’t. The tools on offer weren’t designed for the
			consultation, and it shows in three ways.
		</p>

		<div class="gap-grid">
			{#each gap as g, i}
				<div class="glass-card gap-card" use:reveal={{ delay: i * 90 }}>
					<span class="gap-stat">{g.stat}</span>
					<span class="gap-label">{g.label}</span>
					<h3>{g.title}</h3>
					<p>{g.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= In the room ================= -->
<section class="section-y room-sec">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Inside the consultation</span>
		<h2 use:reveal={{ delay: 60 }}>Everything arrives automatically, so nothing interrupts.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Auracare is built around a single rule: the moment a clinician has to break away to search,
			type or look something up is the moment the consultation suffers. So it removes those moments.
		</p>

		<ol class="room">
			{#each room as step, i}
				<li class="room-step" use:reveal={{ delay: i * 90 }}>
					<span class="room-k" aria-hidden="true">{step.k}</span>
					<div>
						<h3>{step.title}</h3>
						<p>{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ================= Hardware into the core ================= -->
<section class="section-y hw-sec aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Our hardware, straight into the core</span>
		<h2 use:reveal={{ delay: 60 }}>A closed link, with no middleman.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Acute readings don’t get typed in or pulled from someone else’s integration. Our own devices
			feed the reasoning core directly: one closed hardware-to-software link, so the data the core
			sees is exactly the data the device captured.
		</p>

		<div class="path" use:reveal={{ delay: 140 }} aria-hidden="true">
			<span class="path-node">Our devices</span>
			<span class="path-line"
				><span class="path-strike">no manual entry · no third party</span></span
			>
			<span class="path-node path-core">Reasoning core</span>
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

<!-- ================= What the clinician gets back ================= -->
<section class="section-y out-sec">
	<div class="container-wide out-grid">
		<div class="out-copy">
			<span class="eyebrow" use:reveal>What comes back</span>
			<h2 use:reveal={{ delay: 60 }}>Three outputs. One decision, and it’s the clinician’s.</h2>
			<p class="lede" use:reveal={{ delay: 120 }}>
				The core doesn’t hand down an answer. It lays out what it has reasoned toward, ranked and
				traceable, and leaves the judgement where it has to stay: with the person in the room.
			</p>

			<ul class="out-list">
				{#each outputs as o, i}
					<li use:reveal={{ delay: 140 + i * 70 }}>
						<h3>{o.title}</h3>
						<p>{o.body}</p>
					</li>
				{/each}
			</ul>
		</div>

		<div class="out-demo glass-card" use:reveal={{ delay: 160 }}>
			<span class="demo-tag">Illustrative, not a real patient</span>
			<span class="demo-head">Ranked differential</span>
			<p class="demo-sub">
				The figure beside each is <strong>clinician agreement</strong>, not model certainty: how
				often clinicians agreed with that placement in live studies on the shipped core.
			</p>
			<div class="demo-collabel" aria-hidden="true">
				<span>Differential</span>
				<span>Clinician agreement</span>
			</div>
			<ul class="demo-list">
				{#each differentialExample as d}
					<li class="demo-row" class:lead={d.lead}>
						<span class="demo-name">{d.name}</span>
						<span class="demo-bar" aria-hidden="true">
							<span class="demo-fill" style="width:{d.pct}%"></span>
						</span>
						<span class="demo-pct">{d.pct}%</span>
					</li>
				{/each}
			</ul>
			<p class="demo-foot">
				Read it as: when the core leads with viral URTI, clinicians agree 61% of the time, a rate
				we measure on the live product and keep measuring. The core never reports a probability of
				being right. The clinician selects, and that selection shapes the next steps and the notes.
			</p>
		</div>
	</div>
</section>

<!-- ================= Two paths ================= -->
<section class="section-y paths-sec">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>How it reaches the clinic</span>
		<h2 use:reveal={{ delay: 60 }}>Two clean paths, one product.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			We’re deliberately not tying Auracare to a single route to market. Both keep the clinician’s
			experience the same; they differ only in who pays.
		</p>

		<div class="paths-grid">
			{#each paths as p, i}
				<div class="path-card" use:reveal={{ delay: i * 100 }}>
					<span class="path-badge">Path {p.key}</span>
					<h3>{p.title}</h3>
					<p>{p.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= Regulatory + CTA ================= -->
<section class="cta-band aura-space">
	<div class="container-wide">
		<p class="reg-note" use:reveal>{REGULATORY_NOTE}</p>
		<div class="cta-inner">
			<h2 use:reveal>Building the clinical side? Let’s talk.</h2>
			<p use:reveal={{ delay: 80 }}>
				Clinical partners, health systems and investors: we’d like to hear from you as Auracare
				moves toward its first trials.
			</p>
			<div class="cta-actions" use:reveal={{ delay: 140 }}>
				<a
					class="btn-solid"
					href="mailto:{CONTACT.clinical}?subject=Auracare%20%E2%80%94%20Clinical%20partnership"
					>Clinical partnerships</a
				>
				<a
					class="btn-ghost"
					href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Investor%20enquiry"
					>For investors</a
				>
			</div>
		</div>
	</div>
</section>

<style>
	/* ---------------- Hero ---------------- */
	.hero {
		position: relative;
		overflow: clip;
		padding-block: clamp(4rem, 10vw, 8rem) clamp(3rem, 7vw, 6rem);
	}
	.hero-grid-bg {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(97, 128, 255, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(97, 128, 255, 0.06) 1px, transparent 1px);
		background-size: 46px 46px;
		mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 75%);
		-webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 75%);
	}
	.hero-orb {
		position: absolute;
		top: -18%;
		right: -8%;
		width: 38rem;
		height: 38rem;
		background: radial-gradient(circle, rgba(56, 127, 245, 0.28), transparent 62%);
		pointer-events: none;
	}
	.hero-inner {
		position: relative;
		z-index: 1;
		max-width: 50rem;
	}
	.hero h1 {
		font-size: clamp(2.3rem, 6vw, 4.2rem);
		line-height: 1.05;
		letter-spacing: -0.025em;
		margin-block: 1rem 1.2rem;
	}
	.hl {
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.hero-sub {
		font-size: clamp(1.02rem, 1.6vw, 1.2rem);
		line-height: 1.6;
		max-width: 44rem;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1.2rem;
		margin-top: 1.9rem;
	}

	/* ---------------- Buttons ---------------- */
	.btn-solid {
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 600;
		font-size: 0.95rem;
		padding: 0.8rem 1.5rem;
		border-radius: 999px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
		transition:
			transform 0.2s ease,
			color 0.2s ease;
	}
	.btn-solid:hover {
		transform: translateY(-2px);
		color: var(--color-primary-800);
	}
	.btn-quiet {
		font-weight: 600;
		font-size: 0.95rem;
		color: #cdd9ff;
	}
	.btn-quiet:hover {
		color: #fff;
	}
	.btn-ghost {
		font-weight: 600;
		font-size: 0.95rem;
		color: #eaf0ff;
		padding: 0.8rem 1.4rem;
		border-radius: 999px;
		border: 1px solid var(--color-border-dark-strong);
		transition: border-color 0.2s ease;
	}
	.btn-ghost:hover {
		border-color: #fff;
		color: #fff;
	}

	/* ---------------- Shared headings ---------------- */
	h2 {
		font-size: clamp(1.7rem, 3.6vw, 2.6rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-block: 0.6rem 0;
		max-width: 26ch;
	}
	.lede {
		margin-top: 1rem;
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.65;
		color: var(--color-ink-soft);
		max-width: 46rem;
	}

	/* ---------------- Clinical gap ---------------- */
	.gap-grid {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.1rem;
	}
	.gap-card {
		padding: 1.6rem 1.7rem;
		display: flex;
		flex-direction: column;
	}
	.gap-stat {
		font-family: var(--font-family-heading);
		font-size: clamp(2rem, 4vw, 2.7rem);
		font-weight: 700;
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
	.gap-card h3 {
		font-size: 1.12rem;
		letter-spacing: -0.01em;
		margin: 1.1rem 0 0.4rem;
	}
	.gap-card p {
		font-size: 0.93rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}

	/* ---------------- In the room ---------------- */
	.room-sec {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
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
	.room-k {
		flex: none;
		font-family: var(--font-family-mono);
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--color-primary-500);
		padding-top: 0.15rem;
	}
	.room-step h3 {
		font-size: 1.12rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.35rem;
	}
	.room-step p {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 52ch;
	}

	/* ---------------- Hardware ---------------- */
	.path {
		margin-top: clamp(2rem, 4vw, 3rem);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}
	.path-node {
		font-family: var(--font-family-heading);
		font-weight: 600;
		font-size: 0.95rem;
		color: #fff;
		padding: 0.7rem 1.1rem;
		border-radius: 999px;
		border: 1px solid var(--color-border-dark-strong);
		background: rgba(255, 255, 255, 0.05);
		white-space: nowrap;
	}
	.path-core {
		background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
		border-color: var(--color-primary-400);
	}
	.path-line {
		flex: 1;
		min-width: 8rem;
		height: 1px;
		background: repeating-linear-gradient(
			90deg,
			rgba(148, 171, 255, 0.6) 0 8px,
			transparent 8px 16px
		);
		position: relative;
		display: flex;
		justify-content: center;
	}
	.path-strike {
		position: absolute;
		top: -0.7rem;
		font-family: var(--font-family-mono);
		font-weight: 700;
		font-size: 0.6rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(226, 232, 255, 0.6);
		background: var(--color-surface-dark);
		padding: 0 0.6rem;
		white-space: nowrap;
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
		line-height: 1.55;
		color: rgba(226, 232, 255, 0.72);
	}
	.hw-more {
		margin-top: 1.5rem;
		font-size: 0.95rem;
		line-height: 1.6;
		font-weight: 500;
		color: var(--color-primary-300) !important;
		max-width: 52rem;
	}

	/* ---------------- Outputs ---------------- */
	.out-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
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
		line-height: 1.55;
		color: var(--color-ink-soft);
	}

	.out-demo {
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: var(--radius-lg);
	}
	.demo-tag {
		display: inline-block;
		font-family: var(--font-family-mono);
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		border: 1px solid var(--color-border-default);
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
	}
	.demo-head {
		display: block;
		margin-top: 1rem;
		font-family: var(--font-family-heading);
		font-weight: 600;
		font-size: 1.05rem;
		color: var(--color-ink);
	}
	.demo-sub {
		margin-top: 0.6rem;
		font-size: 0.85rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}
	.demo-sub strong {
		color: var(--color-ink);
		font-weight: 600;
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
	.demo-fill {
		display: block;
		height: 100%;
		border-radius: 999px;
		background: var(--color-primary-300);
	}
	.demo-row.lead .demo-fill {
		background: linear-gradient(90deg, var(--color-primary-600), var(--color-primary-500));
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
		line-height: 1.55;
		color: var(--color-ink-faint);
	}

	/* ---------------- Two paths ---------------- */
	.paths-sec {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
	}
	.paths-grid {
		margin-top: clamp(2rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.1rem;
	}
	.path-card {
		padding: 1.6rem 1.7rem;
		border-radius: var(--radius-lg);
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
	}
	.path-badge {
		display: inline-block;
		font-family: var(--font-family-mono);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-100);
		padding: 0.25rem 0.65rem;
		border-radius: 999px;
	}
	.path-card h3 {
		font-size: 1.2rem;
		letter-spacing: -0.01em;
		margin: 0.9rem 0 0.4rem;
	}
	.path-card p {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-ink-soft);
	}

	/* ---------------- Regulatory + CTA ---------------- */
	.cta-band {
		padding-block: clamp(3rem, 6vw, 5rem);
		border-top: 1px solid var(--color-border-dark);
	}
	.reg-note {
		font-size: 0.82rem;
		line-height: 1.6;
		color: rgba(226, 232, 255, 0.55) !important;
		max-width: 52rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	.cta-inner {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		text-align: center;
		max-width: 42rem;
		margin-inline: auto;
	}
	.cta-inner h2 {
		max-width: none;
		font-size: clamp(1.9rem, 4.5vw, 2.9rem);
		margin-inline: auto;
	}
	.cta-inner p {
		margin: 0.9rem auto 0;
		font-size: 1.05rem;
		max-width: 34rem;
	}
	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.8rem 1rem;
		margin-top: 1.9rem;
	}

	/* ---------------- Responsive ---------------- */
	@media (min-width: 720px) {
		.gap-grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.paths-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.hw-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 900px) {
		.out-grid {
			grid-template-columns: 1fr 0.9fr;
		}
	}
</style>
