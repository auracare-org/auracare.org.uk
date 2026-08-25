<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
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
			body: 'Own the surfaces Auracle lives on: a shared Kotlin Multiplatform core and Svelte web, from device connections to the daily check-in.',
			subject: 'Careers: Full Stack Engineer'
		},
		{
			title: 'Data / Connectors Engineer',
			body: 'Turn wearables, apps, health platforms and our own devices into clean, comparable signals for Auracle and the clinical core. Consent and privacy are built in from the start, which means automating data requests and sign-on.',
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
<PageHero
	title="Come build the health system that"
	accent="should exist."
	sub="A small team teaching machines to reason about health, for people at home and clinicians in the room. It is early and it is hard, and we will not pretend otherwise."
/>

<!-- 2) Why join -->
<section class="section-y why">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>Small team. Big problem. No org chart to hide in.</h2>
		<p class="why-lede" use:reveal={{ delay: 120 }}>
			You will own real work from day one and ship without collecting sign-offs. We build the hard
			parts ourselves rather than wrapping someone else's model, and we take safety seriously
			because there are real people on the other end.
		</p>
	</div>
</section>

<!-- 3) Open roles -->
<section class="section-y roles" id="roles">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>Where we’re hiring.</h2>
		<p class="roles-note" use:reveal={{ delay: 120 }}>
			Titles are a rough guide, not a checklist. Close enough? Interestingly different? Email us
			anyway. We hire people, not job descriptions.
		</p>
		<div class="role-grid">
			{#each roles as role, i}
				<article class="glass-card role-card" use:reveal={{ delay: 140 + i * 70 }}>
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
	@media (hover: hover) and (pointer: fine) {
		.cta-primary:hover {
			color: var(--color-primary-800);
			transform: translateY(-2px);
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.32);
		}
		.cta-primary:hover:active {
			transform: translateY(-2px) scale(0.97);
		}
	}
	@media (hover: hover) and (pointer: fine) {
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
		line-height: 1.7;
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
	.closing-inner {
		max-width: 42rem;
		margin-inline: auto;
	}
	.closing h2 {
		font-size: clamp(1.7rem, 3.4vw, 2.4rem);
		line-height: 1.15;
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
