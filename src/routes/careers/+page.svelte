<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	const roles = [
		{
			title: 'ML / Neuro-symbolic Engineer',
			body: 'Build the reasoning core: a learned graph model paired with an auditable symbolic layer grounded in SNOMED CT and ICD-11.',
			subject: 'Careers: ML / Neuro-symbolic Engineer'
		},
		{
			title: 'Full Stack Engineer',
			body: 'Own the surfaces Auratwin lives on: a shared Kotlin Multiplatform core and Svelte web, from device connections to the daily check-in.',
			subject: 'Careers: Full Stack Engineer'
		},
		{
			title: 'Data / Connectors Engineer',
			body: 'Turn wearables, apps, health platforms and our own devices into clean, comparable signals for the twin and the clinical core. A big part of this is automating personal data requests and streamlining user sign-on, so consent and privacy are built in from the start.',
			subject: 'Careers: Data / Connectors Engineer'
		},
		{
			title: 'Hardware / Firmware Engineer',
			body: 'Build the closed hardware-to-software link behind Auracare: our own recording stethoscope, BP monitor and otoscope, streaming clinical-grade readings straight into the reasoning core.',
			subject: 'Careers: Hardware / Firmware Engineer'
		},
		{
			title: 'Clinical & Regulatory Advisor',
			body: 'Hold the line between wellness and clinical decision support: safety framing, evidence generation and the regulatory path ahead for Auracare.',
			subject: 'Careers: Clinical & Regulatory Advisor'
		}
	];

	const mailto = (subject: string, body?: string) =>
		`mailto:${CONTACT.general}?subject=${encodeURIComponent(subject)}` +
		(body ? `&body=${encodeURIComponent(body)}` : '');
</script>

<Seo
	title="Careers"
	description="We're a small team building agentic healthcare, and we're hiring across ML, mobile, data, hardware and clinical/regulatory."
	path="/careers"
/>

<!-- 1) Hero -->
<section class="hero aura-space">
	<div class="hero-orbs" aria-hidden="true">
		<span
			class="bubble"
			style="--bubble-size:420px;--bubble-color:rgba(97,128,255,.32);--bubble-blur:20px; top:-10%; right:-6%"
		></span>
		<span
			class="bubble"
			style="--bubble-size:300px;--bubble-color:rgba(56,127,245,.26);--bubble-blur:14px; bottom:-12%; left:-4%"
		></span>
	</div>

	<div class="container-wide hero-inner">
		<span class="eyebrow" use:reveal>Careers</span>
		<h1 use:reveal={{ delay: 60 }}>
			Come build the health system that <span class="text-gradient-l">should exist</span>.
		</h1>
		<p class="hero-sub" use:reveal={{ delay: 140 }}>
			We're <strong>Auracare</strong>: a small team teaching machines to reason about health, for
			people at home and clinicians in the room. It's early, it's hard, and we won't pretend
			otherwise. If that sounds like a good time rather than a red flag, keep reading.
		</p>
		<div class="hero-cta" use:reveal={{ delay: 220 }}>
			<a class="cta-primary" href="#roles">See open roles</a>
			<a class="cta-ghost" href={mailto('Careers: speculative application')}>
				Pitch us a role <span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
</section>

<!-- 2) The honest pitch -->
<section class="section-y why">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>The honest pitch</span>
		<h2 use:reveal={{ delay: 60 }}>Small team. Big problem. No org chart to hide in.</h2>
		<p class="why-lede" use:reveal={{ delay: 120 }}>
			You'll own real work from day one, talk to the founders because there's no one to route
			around, and ship without collecting a stack of sign-offs. We're building the hard parts
			ourselves — not wrapping someone else's model — and we take getting safety right seriously,
			because there are actual people on the other end. Everything else, we try not to.
		</p>
	</div>
</section>

<!-- 3) Open roles -->
<section class="section-y roles" id="roles">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Open roles</span>
		<h2 use:reveal={{ delay: 60 }}>Where we’re hiring.</h2>
		<p class="roles-note" use:reveal={{ delay: 120 }}>
			Titles are a rough guide, not a checklist. Close enough? Interestingly different? Email us
			anyway — we hire people, not job descriptions.
		</p>
		<div class="role-grid">
			{#each roles as role, i}
				<article class="glass-card role-card" use:reveal={{ delay: 140 + i * 80 }}>
					<div class="role-body">
						<h3>{role.title}</h3>
						<p>{role.body}</p>
					</div>
					<a class="role-apply" href={mailto(role.subject)}>
						Apply <span aria-hidden="true">→</span>
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- 5) Closing CTA -->
<section class="section-y closing aura-space">
	<div class="container-wide closing-inner" use:reveal>
		<h2>Don’t see your role? Invent it.</h2>
		<p>
			If you're great at something we forgot to list, tell us the problem you'd want to work on.
			Worst case, we say no and you've written one short email.
		</p>
		<a class="cta-primary" href={mailto('Careers: speculative application')}> Get in touch </a>
		<p class="closing-address">{CONTACT.general}</p>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		padding-block: clamp(7rem, 12vw, 10rem) clamp(3rem, 7vw, 5rem);
		display: flex;
		align-items: center;
	}
	.hero-orbs {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.hero-orbs .bubble {
		animation: auraFloat 9s ease-in-out infinite;
	}
	.hero-inner {
		position: relative;
		z-index: 1;
		max-width: 46rem;
	}
	.hero h1 {
		font-size: clamp(2.2rem, 5.5vw, 3.9rem);
		line-height: 1.06;
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
		font-size: clamp(1rem, 1.6vw, 1.18rem);
		line-height: 1.65;
		max-width: 40rem;
	}
	.hero-sub strong {
		color: #fff;
		font-weight: 600;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 1.9rem;
	}
	.cta-primary {
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 600;
		padding: 0.85rem 1.6rem;
		border-radius: 999px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			color 0.2s ease;
	}
	.cta-primary:hover {
		color: var(--color-primary-800);
		transform: translateY(-2px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.32);
	}
	.cta-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: #eaf0ff;
		font-weight: 600;
		padding: 0.85rem 1.2rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}
	.cta-ghost:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	/* Section headings */
	.section-y h2 {
		font-size: clamp(1.7rem, 3.4vw, 2.5rem);
		line-height: 1.12;
		letter-spacing: -0.015em;
		margin-block: 0.6rem 0;
		max-width: 26ch;
	}

	/* The honest pitch */
	.why-lede {
		font-size: 1.08rem;
		line-height: 1.7;
		color: var(--color-neutral-700);
		margin-top: 1.75rem;
		max-width: 52rem;
	}

	/* Roles */
	.roles-note {
		margin-top: 1rem;
		max-width: 48rem;
		line-height: 1.65;
		color: var(--color-neutral-700);
	}
	.role-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-top: 2rem;
	}
	.role-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 1.7rem 1.8rem;
		border-radius: var(--radius-2xl);
	}
	.role-card h3 {
		font-size: 1.22rem;
		margin-bottom: 0.5rem;
	}
	.role-card p {
		line-height: 1.6;
		color: var(--color-neutral-700);
	}
	.role-apply {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 600;
		color: var(--color-primary-600);
		padding: 0.6rem 1.25rem;
		border-radius: 999px;
		border: 1px solid var(--color-primary-600);
		transition:
			background 0.2s ease,
			color 0.2s ease,
			transform 0.2s ease;
	}
	.role-apply:hover {
		background: var(--color-primary-600);
		color: #fff;
		transform: translateY(-1px);
	}

	/* Closing */
	.closing {
		text-align: center;
	}
	.closing-inner {
		max-width: 42rem;
		margin-inline: auto;
	}
	.closing h2 {
		font-size: clamp(1.7rem, 3.4vw, 2.4rem);
		line-height: 1.12;
		letter-spacing: -0.015em;
		max-width: none;
	}
	.closing p {
		margin-top: 1rem;
		line-height: 1.65;
	}
	.closing .cta-primary {
		display: inline-block;
		margin-top: 1.75rem;
	}
	.closing-address {
		margin-top: 1.1rem;
		font-size: 0.9rem;
		opacity: 0.7;
	}

	@media (min-width: 900px) {
		.role-grid {
			grid-template-columns: 1fr 1fr;
		}
		.role-card {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
		.role-card .role-apply {
			flex-shrink: 0;
		}
	}
</style>
