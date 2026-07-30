<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal, prefersReducedMotion } from '$lib/actions/motion';
	import {
		CONTACT,
		DECK,
		INVESTOR_CONTACTS,
		INVESTOR_REGIONS,
		TRACTION,
		type InvestorContactKey
	} from '$lib/data/company';
	import { getMember } from '$lib/data/team';

	const founders = (['hinlun', 'stephen'] as InvestorContactKey[]).map((key) => {
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
			a: 'We share the target and terms directly rather than posting them here. Write to us through the form and we’ll walk you through the deck.'
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
		},
		{
			q: 'Why does clinical work start in China?',
			a: 'Our partnership with the Chinese Academy of Sciences gives us clinical trials and the resources to run them. One deployment can feed several regulatory dossiers at once, so we sequence markets by how far an approval travels.'
		},
		{
			q: 'Can I get a data room?',
			a: 'Yes. Ask through the form and the founder for your region will set you up.'
		}
	];

	let name = $state('');
	let email = $state('');
	let firm = $state('');
	let region = $state('');
	let message = $state('');
	let website = $state(''); // honeypot — humans never see this field
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
	let errorMsg = $state('');
	let startedAt = 0;

	$effect(() => {
		startedAt = Date.now();
	});

	const recipient = $derived.by(() => {
		const def = INVESTOR_REGIONS.find((r) => r.value === region);
		return def ? founders.find((f) => f.key === def.contact) : undefined;
	});

	function writeTo(key: InvestorContactKey) {
		const def = INVESTOR_REGIONS.find((r) => r.contact === key);
		if (def) region = def.value;
		document
			.getElementById('contact')
			?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		status = 'sending';
		errorMsg = '';
		try {
			const res = await fetch('/api/investor-contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, firm, region, message, website, startedAt })
			});
			const data = await res.json();
			if (data.ok) {
				status = 'sent';
			} else {
				status = 'error';
				errorMsg = data.error ?? 'Something went wrong on our side.';
			}
		} catch {
			status = 'error';
			errorMsg = 'Something went wrong on our side.';
		}
	}
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
			devices through certification. The form below reaches whichever founder covers your region.
		</p>
		<div class="hero-cta" use:reveal={{ delay: 220 }}>
			<a class="cta-primary" href="#contact">Write to us</a>
			{#if DECK.ready}
				<a class="cta-deck" href={DECK.url} download>Download the pitch deck</a>
			{:else}
				<span class="cta-deck cta-deck--pending">{DECK.pendingLabel}</span>
			{/if}
		</div>
	</div>
</section>

<!-- ================= Who to talk to ================= -->
<section class="section-y who">
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
							<button class="founder-write" onclick={() => writeTo(f.key)}>
								Write to {f.firstName}
							</button>
							<a class="founder-mail" href="mailto:{f.email}?subject=Auracare%20seed%20round">
								{f.email}
							</a>
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

<!-- ================= Contact form ================= -->
<section id="contact" class="section-y contact">
	<div class="container-wide contact-grid">
		<div class="contact-copy">
			<span class="eyebrow" use:reveal>Contact</span>
			<h2 use:reveal={{ delay: 60 }}>Write to us</h2>
			<p class="lede" use:reveal={{ delay: 120 }}>
				Say where you're based and it lands in
				{recipient ? `${recipient.firstName}'s` : "the right founder's"} inbox. Replies within two working
				days.
			</p>
			<p class="contact-alt" use:reveal={{ delay: 180 }}>
				Prefer email? Write to
				<a href="mailto:{INVESTOR_CONTACTS.hinlun.email}">{INVESTOR_CONTACTS.hinlun.email}</a>
				(Hong Kong & Asia-Pacific) or
				<a href="mailto:{INVESTOR_CONTACTS.stephen.email}">{INVESTOR_CONTACTS.stephen.email}</a>
				(Europe & North America).
			</p>
		</div>

		<form class="contact-form glass-card" onsubmit={submit} use:reveal={{ delay: 140 }}>
			{#if status === 'sent'}
				<div class="form-done" role="status">
					<h3>Sent.</h3>
					<p>
						Your message went to {recipient?.firstName ?? 'us'}. You'll hear back within two working
						days.
					</p>
				</div>
			{:else}
				<div class="field-row">
					<label class="field">
						<span>Name</span>
						<input type="text" name="name" bind:value={name} required maxlength="200" />
					</label>
					<label class="field">
						<span>Firm <em>(optional)</em></span>
						<input type="text" name="firm" bind:value={firm} maxlength="200" />
					</label>
				</div>
				<label class="field">
					<span>Email</span>
					<input type="email" name="email" bind:value={email} required maxlength="320" />
				</label>
				<label class="field">
					<span>Where are you based?</span>
					<select name="region" bind:value={region} required>
						<option value="" disabled hidden>Choose a region</option>
						{#each INVESTOR_REGIONS as r (r.value)}
							<option value={r.value}>{r.label}</option>
						{/each}
					</select>
				</label>
				{#if recipient}
					<p class="field-hint">Goes to {recipient.name}, {recipient.basedIn}.</p>
				{/if}
				<label class="field">
					<span>Message</span>
					<textarea name="message" bind:value={message} required rows="5" maxlength="5000"
					></textarea>
				</label>
				<div class="hp" aria-hidden="true">
					<label>
						Website
						<input
							type="text"
							name="website"
							tabindex="-1"
							autocomplete="off"
							bind:value={website}
						/>
					</label>
				</div>
				<button class="cta-primary form-submit" type="submit" disabled={status === 'sending'}>
					{status === 'sending' ? 'Sending…' : 'Send'}
				</button>
				{#if status === 'error'}
					<p class="form-error" role="alert">
						{errorMsg} You can also email us directly using the addresses on the left.
					</p>
				{/if}
				<p class="form-note">
					We use what you send here to reply, and nothing else. Delivery runs through Resend; see
					our <a href="/privacy">privacy policy</a>.
				</p>
			{/if}
		</form>
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
		border: none;
		cursor: pointer;
		transition: background 0.15s ease;
	}
	.founder-write:hover {
		background: var(--color-primary-700);
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

	/* ---------------- Contact ---------------- */
	.contact {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
		scroll-margin-top: var(--header-h, 92px);
	}
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: start;
	}
	.contact-alt {
		margin-top: 1.1rem;
		font-size: 0.9rem;
		color: var(--color-ink-soft);
		max-width: 34rem;
		line-height: 1.6;
	}
	.contact-alt a {
		color: var(--color-primary-600);
		font-weight: 600;
	}
	.contact-form {
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}
	.field-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.1rem;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.field > span {
		font-weight: 600;
		font-size: 0.85rem;
		color: var(--color-ink);
	}
	.field em {
		font-style: normal;
		font-weight: 500;
		color: var(--color-ink-faint);
	}
	.field input,
	.field select,
	.field textarea {
		font: inherit;
		font-size: 0.95rem;
		color: var(--color-ink);
		background: #fff;
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-md);
		padding: 0.65rem 0.8rem;
		transition: border-color 0.15s ease;
	}
	.field textarea {
		resize: vertical;
		min-height: 7rem;
	}
	.field input:hover,
	.field select:hover,
	.field textarea:hover {
		border-color: var(--color-border-hover);
	}
	.field input:focus-visible,
	.field select:focus-visible,
	.field textarea:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 1px;
		border-color: var(--color-border-focus);
	}
	.field-hint {
		font-size: 0.82rem;
		color: var(--color-ink-faint);
		margin-top: -0.55rem;
	}
	.hp {
		position: absolute;
		left: -9999px;
		top: auto;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	.form-submit {
		align-self: flex-start;
	}
	.form-submit:disabled {
		opacity: 0.6;
		cursor: wait;
	}
	.form-error {
		color: #b42318;
		font-size: 0.88rem;
		line-height: 1.5;
	}
	.form-note {
		font-size: 0.78rem;
		color: var(--color-ink-faint);
		line-height: 1.55;
	}
	.form-note a {
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.form-done h3 {
		font-size: 1.3rem;
		margin: 0 0 0.4rem;
	}
	.form-done p {
		color: var(--color-ink-soft);
		line-height: 1.6;
	}
	@media (min-width: 560px) {
		.field-row {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 940px) {
		.contact-grid {
			grid-template-columns: 5fr 6fr;
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
