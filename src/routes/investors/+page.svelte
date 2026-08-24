<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import WorldMap from '$lib/components/WorldMap.svelte';
	import { reveal } from '$lib/actions/motion';
	import {
		CONTACT,
		INVESTOR_CONTACTS,
		TRACTION,
		TWIN_ROLE,
		TWIN_ROLE_EYEBROW,
		TWIN_ROLE_HEADING,
		type InvestorContactKey
	} from '$lib/data/company';
	import { getMember } from '$lib/data/team';

	/* Two routes to clinical revenue, moved here from the Auracare CDSS page:
	   route-to-market reasoning is investor material, not product material. */
	const clinicalPaths = [
		{
			key: 'A',
			title: 'Direct to digital services',
			body: 'API access to our CDSS engine for clinical service providers: ambient scribes, telehealth platforms, EMRs, triage tools and more.'
		},
		{
			key: 'B',
			title: 'Direct to service providers',
			body: 'Sold to hospitals, GP practices, pharmacies and other providers, priced on the clinician time our service saves.'
		}
	];

	const founders = (['stephen', 'hinlun', 'tanush'] as InvestorContactKey[]).map((key) => {
		const contact = INVESTOR_CONTACTS[key];
		const member = getMember(contact.teamId);
		return {
			key,
			...contact,
			name: member?.name ?? key,
			firstName: (member?.name ?? key).split(' ')[0],
			img: member?.img,
			role: member?.role ?? ''
		};
	});

	const mailto = (email: string) =>
		`mailto:${email}?subject=${encodeURIComponent('Auracare AI Seed round')}`;

	const quickLinks = [
		{
			href: '/product/auracle',
			title: 'Auracle',
			desc: 'The consumer product: a wellness companion in your messages. Launches August 2026.'
		},
		{
			href: '/product/auracare',
			title: 'Auracare CDSS, the clinical product',
			desc: 'Decision support inside the consultation, fed by our own devices. In development.'
		},
		{
			href: '/technology',
			title: 'How the technology works',
			desc: 'The patient state, the reasoning loop and the safety gates, explained in full.'
		},
		{
			href: CONTACT.ontologyUrl,
			title: 'The live ontology',
			desc: '532,000 clinical concepts you can explore today.',
			external: true
		}
	];

	const faqs = [
		{
			q: 'How much are you raising?',
			a: 'We share the target and terms directly rather than posting them here. Write to the founder for your region and we’ll walk you through the deck.'
		},
		{
			q: 'What’s live today, and what isn’t?',
			a: 'The ontology is live and explorable: 532,000 clinical concepts. Auracle launches to the public in August 2026. The Auracare CDSS, the clinical product, is in development and targeted for May 2027.'
		},
		{
			q: 'Who’s already backing you?',
			a: 'A $400k angel investment from Hong Kong, around $400k in resources from the Founders Factory Healthcare accelerator, and $134k in UK government funding. Our prior venture also built 28 UK pharmacy partnerships.'
		},
		{
			q: 'How do you handle regulation?',
			a: 'Auracle ships as a general-wellness product under the FD&C Act §520(o)(1)(B) exclusion, so it never diagnoses or treats. The Auracare CDSS is clinical decision support; its regulatory pathway is under active review.'
		}
	];
</script>

<Seo
	title="Investors"
	description="Auracare is raising its seed round. Stephen Okita covers North America; Hinlun Chen covers Asia-Pacific; Tanush Pandey covers Europe. Write to the founder for your region."
	path="/investors"
/>

<!-- ================= Hero ================= -->
<PageHero
	title="We are raising our"
	accent="seed round."
	sub="Auracle launches to the public in August 2026, and our first clinical trials in Asia begin in February 2027. This round pays for the launch, the trials, and device certification."
/>

<!-- ================= Who to talk to ================= -->
<section id="contact" class="section-y who">
	<div class="container-wide">
		<h2 use:reveal>Who to talk to</h2>
		<p class="lede" use:reveal={{ delay: 80 }}>
			One founder replies directly, depending on where you invest from.
		</p>
		<div class="founder-grid">
			{#each founders as f, i (f.key)}
				<article class="founder-card glass-card" use:reveal={{ delay: 140 + i * 70 }}>
					{#if f.img}
						<img class="founder-photo" src={f.img} alt="Portrait of {f.name}" loading="lazy" />
					{/if}
					<div class="founder-body">
						<h3>{f.name}</h3>
						<p class="founder-role">{f.role}</p>
						<p class="founder-coverage">{f.coverage}</p>
						<p class="founder-base">Based in {f.basedIn}</p>
						<div class="founder-actions">
							<a class="founder-write" href={mailto(f.email)}>Write to {f.firstName}</a>
							<a class="founder-mail" href={mailto(f.email)}>{f.email}</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ================= Already behind us ================= -->
<section class="section-y proof">
	<div class="container-wide">
		<h2 use:reveal>What's already behind us</h2>
		<div class="proof-grid">
			{#each TRACTION as t, i (t.label)}
				<div class="proof-tile glass-card" use:reveal={{ delay: 80 + i * 60 }}>
					<span class="proof-stat">{t.stat}</span>
					<span class="proof-label">{t.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= Business model ================= -->
<section class="section-y model">
	<div class="container-wide">
		<span class="model-eyebrow" use:reveal>{TWIN_ROLE_EYEBROW}</span>
		<h2 use:reveal={{ delay: 60 }}>{TWIN_ROLE_HEADING}</h2>
		<div class="model-grid">
			{#each TWIN_ROLE as role, i (role.title)}
				<div class="model-card glass-card" use:reveal={{ delay: 100 + i * 70 }}>
					<span class="model-stat">{role.stat}</span>
					<h3>{role.title}</h3>
					<p>{role.body}</p>
				</div>
			{/each}
		</div>

		<h3 class="model-sub" use:reveal>Two routes to clinical revenue</h3>
		<div class="model-paths">
			{#each clinicalPaths as p, i (p.key)}
				<div class="model-path glass-card" use:reveal={{ delay: 80 + i * 70 }}>
					<span class="model-badge">Path {p.key}</span>
					<h4>{p.title}</h4>
					<p>{p.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= Rollout ================= -->
<WorldMap />

<!-- ================= Quick links ================= -->
<section class="section-y catchup">
	<div class="container-wide">
		<h2 use:reveal>If you're new to Auracare</h2>
		<p class="lede" use:reveal={{ delay: 80 }}>
			This page assumes you've seen the site. If you haven't, start with these.
		</p>
		<div class="catchup-grid">
			{#each quickLinks as link, i (link.href)}
				<a
					class="catchup-card glass-card"
					href={link.href}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener' : undefined}
					use:reveal={{ delay: 120 + i * 60 }}
				>
					<span class="catchup-title">
						{link.title}
						<span aria-hidden="true">{link.external ? '↗' : '→'}</span>
					</span>
					<span class="catchup-desc">{link.desc}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ================= FAQ ================= -->
<section class="section-y faq-sec">
	<div class="container-wide">
		<h2 use:reveal>Questions investors ask us</h2>
		<div class="faq-list">
			{#each faqs as f, i (f.q)}
				<details class="faq-item" use:reveal={{ delay: 60 + i * 50 }}>
					<summary>{f.q}</summary>
					<p>{f.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.founder-card {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		padding: 1.5rem;
		border-radius: var(--radius-lg);
	}
	.founder-photo {
		width: 5rem;
		height: 5rem;
		border-radius: var(--radius-md);
		object-fit: cover;
		flex-shrink: 0;
	}
	.founder-body h3 {
		font-size: 1.2rem;
		margin: 0;
	}
	.founder-role {
		color: var(--color-primary-600);
		font-weight: 600;
		font-size: 0.85rem;
		margin-top: 0.15rem;
	}
	.founder-coverage {
		font-weight: 600;
		color: var(--color-ink);
		margin-top: 0.7rem;
	}
	.founder-base {
		color: var(--color-ink-faint);
		font-size: 0.88rem;
		margin-top: 0.15rem;
	}
	.founder-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1.1rem;
		margin-top: 1rem;
	}
	.founder-write {
		display: inline-flex;
		align-items: center;
		background: var(--color-primary-600);
		color: #fff;
		font-weight: 500;
		font-size: 0.88rem;
		padding: 0.55rem 1.05rem;
		border-radius: 6px;
		transition:
			background var(--duration-hover) ease,
			transform var(--duration-press) var(--ease-out);
	}
	.founder-write:active {
		transform: scale(0.97);
	}
	@media (hover: hover) and (pointer: fine) {
		.founder-write:hover {
			background: var(--color-primary-700);
			color: #fff;
		}
	}
	.founder-write:focus-visible {
		outline: 2px solid var(--color-primary-400);
		outline-offset: 2px;
	}
	.founder-mail {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-primary-600);
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}
	.founder-mail:hover {
		border-bottom-color: currentColor;
	}
	@media (min-width: 640px) {
		.founder-card {
			flex-direction: row;
			align-items: flex-start;
		}
	}
	@media (min-width: 860px) {
		.founder-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.proof-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: clamp(1.5rem, 3.5vw, 2.25rem);
	}
	.proof-tile {
		padding: 1.4rem 1.5rem;
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.proof-stat {
		font-family: var(--font-family-heading);
		font-weight: 600;
		font-size: clamp(1.5rem, 3vw, 2rem);
		letter-spacing: -0.02em;
		color: var(--color-primary-700);
	}
	.proof-label {
		color: var(--color-ink-soft);
		font-size: 0.88rem;
		line-height: 1.5;
	}
	@media (min-width: 900px) {
		.proof-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.model-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: clamp(1.5rem, 3.5vw, 2.25rem);
	}
	.model-card {
		padding: 1.4rem 1.5rem;
		border-radius: var(--radius-lg);
		border-top: 3px solid var(--color-primary-500);
	}
	.model-stat {
		display: block;
		font-family: var(--font-family-heading);
		font-weight: 600;
		font-size: clamp(1.5rem, 3vw, 2rem);
		letter-spacing: -0.02em;
		color: var(--color-primary-700);
		margin-bottom: 0.6rem;
	}
	.model-card h3 {
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.35rem;
	}
	.model-card p,
	.model-path p {
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}
	.model-sub {
		margin-top: clamp(2rem, 4vw, 2.75rem);
		font-size: 1.15rem;
		letter-spacing: -0.01em;
	}
	.model-paths {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: 1.1rem;
	}
	.model-path {
		padding: 1.4rem 1.5rem;
		border-radius: var(--radius-lg);
	}
	.model-badge {
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
	.model-path h4 {
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		margin: 0.7rem 0 0.35rem;
	}
	@media (min-width: 860px) {
		.model-grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.model-paths {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.catchup-card {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding: 1.4rem 1.5rem;
		border-radius: var(--radius-lg);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}
	.catchup-card:hover {
		border-color: var(--color-border-hover);
		box-shadow: var(--shadow-sm);
	}
	.catchup-title {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.6rem;
		font-weight: 600;
		color: var(--color-ink);
	}
	.catchup-title span {
		color: var(--color-primary-600);
	}
	.catchup-desc {
		color: var(--color-ink-soft);
		font-size: 0.9rem;
		line-height: 1.55;
	}
	@media (min-width: 720px) {
		.catchup-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.faq-item {
		padding: 0;
	}
	.faq-item summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.15rem 1.5rem;
		font-weight: 600;
		color: var(--color-ink);
	}
	.faq-item summary::-webkit-details-marker {
		display: none;
	}
	.faq-item summary::after {
		content: '+';
		font-weight: 500;
		font-size: 1.2rem;
		line-height: 1;
		color: var(--color-primary-600);
		transition: transform 0.2s ease;
	}
	.faq-item[open] summary::after {
		transform: rotate(45deg);
	}
	.faq-item summary:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
		border-radius: var(--radius-lg);
	}
	.faq-item p {
		padding: 0 1.5rem 1.25rem;
		color: var(--color-ink-soft);
		line-height: 1.65;
		max-width: 46rem;
	}
</style>
