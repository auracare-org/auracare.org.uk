<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import {
		CONTACT,
		DECK,
		INVESTOR_CONTACTS,
		TRACTION,
		type InvestorContactKey
	} from '$lib/data/company';
	import { getMember } from '$lib/data/team';

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
		`mailto:${email}?subject=${encodeURIComponent('Auracare AI — Seed round')}`;

	const quickLinks = [
		{
			href: '/product',
			title: 'Auratwin',
			desc: 'The consumer product: a wellness companion in your messages. Launches August 2026.'
		},
		{
			href: '/product/auracare',
			title: 'Auracare, the clinical product',
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
			a: 'The ontology is live and explorable: 532,000 clinical concepts. Auratwin launches to the public in August 2026. Auracare, the clinical product, is in development and targeted for May 2027.'
		},
		{
			q: 'Who’s already backing you?',
			a: 'A $300k angel investment from Hong Kong, around $400k in resources from the Founders Factory Healthcare accelerator, and $134k in UK government funding. Our prior venture also built 28 UK pharmacy partnerships.'
		},
		{
			q: 'How do you handle regulation?',
			a: 'Auratwin ships as a general-wellness product under the FD&C Act §520(o)(1)(B) exclusion, so it never diagnoses or treats. Auracare is clinical decision support; its regulatory pathway is under active review, and its first trials run with the Chinese Academy of Sciences.'
		}
	];
</script>

<Seo
	title="Investors"
	description="Auracare is raising its seed round. Hinlun Chen covers Hong Kong & Asia-Pacific; Stephen Okita covers Europe & North America. Write to the founder for your region."
	path="/investors"
/>

<!-- ================= Hero ================= -->
<section class="hero">
	<div class="container-wide hero-inner">
		<span class="eyebrow" use:reveal>Seed round</span>
		<h1 use:reveal={{ delay: 60 }}>We're raising our seed round.</h1>
		<p class="hero-sub" use:reveal={{ delay: 140 }}>
			Auratwin launches to the public in August 2026, and our first clinical trials with the Chinese
			Academy of Sciences follow. This round pays for the launch, the trials, and taking our three
			devices through certification.
		</p>
		<div class="hero-cta" use:reveal={{ delay: 220 }}>
			<!-- Interim mailto; swap for the Typeform link when it exists. -->
			<a class="cta-primary" href={mailto(CONTACT.seed)}>Write to us</a>
			{#if DECK.ready}
				<a class="cta-deck" href={DECK.url} download>Download the pitch deck</a>
			{:else}
				<span class="cta-deck cta-deck--pending">{DECK.pendingLabel}</span>
			{/if}
		</div>
	</div>
</section>

<!-- ================= Who to talk to ================= -->
<section id="contact" class="section-y who">
	<div class="container-wide">
		<h2 use:reveal>Who to talk to</h2>
		<p class="lede" use:reveal={{ delay: 80 }}>
			One founder replies directly, depending on where you invest from.
		</p>
		<div class="founder-grid">
			{#each founders as f, i (f.key)}
				<article class="founder-card glass-card" use:reveal={{ delay: 140 + i * 80 }}>
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
	/* ---------------- Hero ---------------- */
	.hero {
		padding-block: clamp(4rem, 10vw, 7rem) clamp(2.5rem, 6vw, 4.5rem);
		background: linear-gradient(180deg, #eef2ff 0%, #f7f9ff 55%, var(--color-surface-page) 100%);
		border-bottom: 1px solid var(--color-border-default);
	}
	.hero-inner {
		max-width: 50rem;
	}
	.hero h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		line-height: 1.08;
		letter-spacing: -0.025em;
		margin-block: 1rem 1.1rem;
	}
	.hero-sub {
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		line-height: 1.65;
		color: var(--color-ink-soft);
		max-width: 44rem;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1rem;
		margin-top: 1.8rem;
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		background: var(--color-primary-600);
		color: #fff;
		font-weight: 500;
		font-size: 0.98rem;
		padding: 0.8rem 1.5rem;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			var(--shadow-xs);
		transition: background 0.15s ease;
	}
	.cta-primary:hover {
		background: var(--color-primary-700);
		color: #fff;
	}
	.cta-primary:focus-visible {
		outline: 2px solid var(--color-primary-400);
		outline-offset: 3px;
	}
	.cta-deck {
		display: inline-flex;
		align-items: center;
		font-weight: 500;
		font-size: 0.98rem;
		padding: 0.8rem 1.5rem;
		border-radius: 6px;
		border: 1px solid var(--color-border-strong);
		color: var(--color-primary-700);
		background: #fff;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}
	.cta-deck:hover {
		border-color: var(--color-primary-600);
		background: var(--color-primary-50);
	}
	.cta-deck--pending {
		background: var(--color-surface-alt);
		border: 1px dashed var(--color-border-default);
		color: var(--color-ink-faint);
		cursor: default;
	}
	.cta-deck--pending:hover {
		border-color: var(--color-border-default);
		background: var(--color-surface-alt);
	}

	/* ---------------- Shared ---------------- */
	.lede {
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		color: var(--color-ink-soft);
		max-width: 40rem;
		margin-top: 0.6rem;
	}

	/* ---------------- Founders ---------------- */
	.founder-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
	}
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
		transition: background 0.15s ease;
	}
	.founder-write:hover {
		background: var(--color-primary-700);
		color: #fff;
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

	/* ---------------- Proof ---------------- */
	.proof {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
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

	/* ---------------- Quick links ---------------- */
	.catchup-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: clamp(1.5rem, 3.5vw, 2.25rem);
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

	/* ---------------- FAQ ---------------- */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-top: clamp(1.5rem, 3.5vw, 2.25rem);
		max-width: 52rem;
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
