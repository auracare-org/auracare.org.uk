<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	type RequestType = 'delete' | 'access' | 'rectify' | 'portability' | 'restrict' | 'object';

	interface Right {
		key: RequestType;
		label: string;
		description: string;
	}

	const rights: Right[] = [
		{
			key: 'delete',
			label: 'Delete my account & data',
			description:
				'Request permanent deletion of your patient portal account, your health data, and all associated records. We will complete your request within 30 days.'
		},
		{
			key: 'access',
			label: 'Access my data',
			description:
				'Request a copy of the personal data we hold about you in a machine-readable format.'
		},
		{
			key: 'rectify',
			label: 'Correct my data',
			description: 'Request correction of inaccurate or incomplete personal data we hold about you.'
		},
		{
			key: 'portability',
			label: 'Export my data',
			description:
				'Request a structured, portable export of your data so you can transfer it to another service.'
		},
		{
			key: 'restrict',
			label: 'Restrict processing',
			description: 'Ask us to pause processing of your data while a dispute is resolved.'
		},
		{
			key: 'object',
			label: 'Object to processing',
			description: 'Object to specific uses of your data, including direct marketing or profiling.'
		}
	];

	let selectedRight: RequestType = 'delete';
	let phoneNumber = '';
	let email = '';
	let additionalInfo = '';
	$: selected = rights.find((r) => r.key === selectedRight)!;

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const label = selected.label;
		const body = [
			`Request type: ${label}`,
			`Phone number: ${phoneNumber}`,
			`Email: ${email}`,
			...(additionalInfo ? [`\nAdditional info:\n${additionalInfo}`] : [])
		].join('\n');
		const mailto = `mailto:privacy@auracare.org.uk?subject=${encodeURIComponent('ADR: ' + label)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailto;
	}
</script>

<Seo
	title="Privacy Centre"
	description="Exercise your privacy rights with Auracare: delete your account, access your data, or make any other data request. We respond within 30 days."
	path="/privacy-centre"
	noindex={false}
/>

<PageHero
	title="Your rights,"
	accent="on your terms."
	accentOwnLine
	sub="You have the right to access, correct, export or permanently delete any data Auracare holds about you. Submit a request below and we will respond within 30 days."
	meta="Privacy Centre"
/>

<section class="centre section-y">
	<div class="container-narrow">
		<div class="rights-grid" use:reveal>
			{#each rights as right}
				<button
					class="right-card {selectedRight === right.key ? 'right-card--active' : ''}"
					onclick={() => (selectedRight = right.key)}
					type="button"
				>
					<span class="right-label">{right.label}</span>
				</button>
			{/each}
		</div>

		<div class="selected-desc" use:reveal={{ delay: 60 }}>
			<p>{selected.description}</p>
		</div>

		<form class="request-form" onsubmit={handleSubmit} use:reveal={{ delay: 120 }}>
			<input type="hidden" name="type" value={selectedRight} />

			<div class="field">
				<label for="phone">Phone number <span class="required">*</span></label>
				<p class="field-hint">
					The phone number linked to your patient portal account (the number you message the portal
					from).
				</p>
				<input
					id="phone"
					type="tel"
					name="phone"
					placeholder="+44 7700 900000"
					bind:value={phoneNumber}
					required
					autocomplete="tel"
				/>
			</div>

			<div class="field">
				<label for="email">Email address <span class="required">*</span></label>
				<p class="field-hint">Where we should send your confirmation and any follow-up.</p>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="you@example.com"
					bind:value={email}
					required
					autocomplete="email"
				/>
			</div>

			{#if selectedRight !== 'delete'}
				<div class="field">
					<label for="info">Additional details <span class="optional">(optional)</span></label>
					<textarea
						id="info"
						name="info"
						rows="4"
						placeholder="Any additional context that would help us process your request…"
						bind:value={additionalInfo}
					></textarea>
				</div>
			{/if}

			{#if selectedRight === 'delete'}
				<div class="delete-warning">
					<strong>This action is permanent.</strong> Deleting your account will erase your twin's memory,
					all connected health sources, and your conversation history. This cannot be undone.
				</div>
			{/if}

			<button type="submit" class="btn-solid submit-btn">Open email to submit</button>
		</form>

		<div class="info-panels" use:reveal={{ delay: 180 }}>
			<div class="info-panel">
				<h3>What happens next</h3>
				<ol>
					<li>We send a confirmation to your email within 24 hours.</li>
					<li>We may contact you to verify your identity before processing sensitive requests.</li>
					<li>We complete your request within 30 days (or tell you if we need more time).</li>
				</ol>
			</div>
			<div class="info-panel">
				<h3>Other ways to reach us</h3>
				<p>
					You can also email <a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a> directly with your
					request.
				</p>
				<p>
					For questions about our privacy practices, see our <a href="/privacy">Privacy Policy</a>
					and our
					<a href="/privacy/consumer-health-data">Consumer Health Data Policy</a>.
				</p>
				<p>
					If you are a Washington or Nevada resident, the Consumer Health Data Policy describes
					additional rights and how to exercise them.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.centre {
		padding-block: clamp(2rem, 4vw, 3.5rem) clamp(4rem, 8vw, 7rem);
	}

	.container-narrow {
		max-width: 42rem;
		margin-inline: auto;
		padding-inline: clamp(1rem, 4vw, 2rem);
	}

	/* Right selector grid */
	.rights-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem;
		margin-bottom: 1.5rem;
	}

	@media (max-width: 520px) {
		.rights-grid {
			grid-template-columns: 1fr;
		}
	}

	.right-card {
		background: var(--color-surface-raised);
		border: 1px solid var(--color-rule);
		padding: 0.85rem 1rem;
		text-align: left;
		cursor: pointer;
		transition:
			background var(--duration-hover) ease,
			border-color var(--duration-hover) ease,
			color var(--duration-hover) ease;
		color: var(--color-ink-soft);
		font-size: 0.88rem;
		font-weight: 500;
	}

	.right-card:hover {
		border-color: var(--color-rule-strong);
		color: var(--color-ink);
	}

	/* The chosen one is marked by ink, not by a blue fill: this is a selected
	   state in a form, not a brand moment. */
	.right-card--active {
		background: var(--color-ink);
		border-color: var(--color-ink);
		color: var(--color-surface-page);
	}
	.right-card--active:hover {
		color: var(--color-surface-page);
	}

	.right-label {
		display: block;
	}

	/* Selected description */
	.selected-desc {
		background: var(--color-surface-alt);
		border-left: 2px solid var(--color-primary-600);
		padding: 0.9rem 1.1rem;
		margin-bottom: 2rem;
		font-size: 0.92rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
	}

	.selected-desc p {
		margin: 0;
	}

	/* Form */
	.request-form {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
		margin-bottom: 2.5rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.field label {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--color-ink-soft);
	}

	.field-hint {
		font-size: 0.82rem;
		color: var(--color-ink-faint);
		margin: 0;
	}

	.required {
		color: #c81e1e;
	}

	.optional {
		color: var(--color-ink-faint);
		font-weight: 400;
	}

	.field input,
	.field textarea {
		background: var(--color-surface-raised);
		border: 1px solid var(--color-rule-strong);
		padding: 0.8rem 0.9rem;
		color: var(--color-ink);
		/* Exactly 16px, not 0.95rem. Below 16px, iOS Safari zooms the whole page
		   in when the field takes focus and leaves it zoomed — so the one form on
		   the site would throw a phone visitor out of the layout on their first
		   tap. This is the only place it can happen; these are the only inputs. */
		font-size: 1rem;
		font-family: inherit;
		transition: border-color var(--duration-hover) ease;
		width: 100%;
		box-sizing: border-box;
	}

	/* The focus ring is the brand blue on a border that is already there, so
	   the field does not change colour under the cursor mid-typing. */
	.field input:focus,
	.field textarea:focus {
		outline: 2px solid var(--color-primary-600);
		outline-offset: 1px;
		border-color: var(--color-primary-600);
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: var(--color-ink-faint);
	}

	.delete-warning {
		background: var(--color-surface-alt);
		border-left: 2px solid #c81e1e;
		padding: 0.9rem 1.1rem;
		font-size: 0.88rem;
		color: #c81e1e;
		line-height: 1.7;
	}

	.submit-btn {
		align-self: flex-start;
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Info panels */
	.info-panels {
		display: grid;
		gap: 1.2rem;
		margin-top: 2.5rem;
		padding-top: 2.5rem;
		border-top: 1px solid var(--color-neutral-200);
	}

	.info-panel h3 {
		font-size: 0.85rem;
		font-family: var(--font-family-mono);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-ink-faint);
		margin-bottom: 0.8rem;
	}

	.info-panel p,
	.info-panel li {
		font-size: 0.88rem;
		color: var(--color-ink-soft);
		line-height: 1.65;
	}

	.info-panel ol {
		padding-left: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
</style>
