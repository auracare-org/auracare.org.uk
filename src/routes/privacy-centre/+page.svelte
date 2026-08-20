<script lang="ts">
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
				'Request permanent deletion of your Auracle account, your health data, and all associated records. We will complete your request within 30 days.'
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

<section class="page-hero aura-space">
	<span
		class="bubble"
		style="--bubble-size:380px;--bubble-color:rgba(97,128,255,.25);--bubble-blur:20px; top:-10%; right:-4%"
		aria-hidden="true"
	></span>
	<div class="container-wide hero-inner">
		<span class="eyebrow" use:reveal>Privacy Centre</span>
		<h1 use:reveal={{ delay: 60 }}>
			Your rights, <span class="text-gradient-l">on your terms</span>.
		</h1>
		<p class="lede" use:reveal={{ delay: 140 }}>
			You have the right to access, correct, export or permanently delete any data Auracare holds
			about you. Submit a request below and we will respond within 30 days.
		</p>
	</div>
</section>

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
						The phone number linked to your Auracle account (the number you message Auracle from).
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
					<p class="field-hint">
						Where we should send your confirmation and any follow-up.
					</p>
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
						<strong>This action is permanent.</strong> Deleting your account will erase your twin's
						memory, all connected health sources, and your conversation history. This cannot be
						undone.
					</div>
				{/if}

				<button type="submit" class="btn-primary submit-btn">
					Open email to submit
				</button>
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
						You can also email <a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a> directly with
						your request.
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
	.page-hero {
		padding-block: clamp(5rem, 10vw, 8rem) clamp(3rem, 5vw, 4rem);
		position: relative;
		overflow: hidden;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
	}

	.lede {
		max-width: 52rem;
		font-size: clamp(1rem, 1.2vw, 1.15rem);
		color: rgba(226, 232, 255, 0.8);
		margin-top: 1.25rem;
	}

	.bubble {
		position: absolute;
		width: var(--bubble-size);
		height: var(--bubble-size);
		border-radius: 50%;
		background: var(--bubble-color);
		filter: blur(var(--bubble-blur));
		pointer-events: none;
	}

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
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.6rem;
		padding: 0.75rem 1rem;
		text-align: left;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s;
		color: rgba(226, 232, 255, 0.75);
		font-size: 0.88rem;
		font-weight: 500;
	}

	.right-card:hover {
		background: rgba(255, 255, 255, 0.07);
		border-color: rgba(97, 128, 255, 0.4);
		color: #fff;
	}

	.right-card--active {
		background: rgba(97, 128, 255, 0.15);
		border-color: rgba(97, 128, 255, 0.7);
		color: #fff;
	}

	.right-label {
		display: block;
	}

	/* Selected description */
	.selected-desc {
		background: rgba(255, 255, 255, 0.04);
		border-left: 3px solid rgba(97, 128, 255, 0.6);
		border-radius: 0 0.4rem 0.4rem 0;
		padding: 0.9rem 1.1rem;
		margin-bottom: 2rem;
		font-size: 0.92rem;
		color: rgba(226, 232, 255, 0.8);
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
		color: rgba(226, 232, 255, 0.9);
	}

	.field-hint {
		font-size: 0.82rem;
		color: rgba(226, 232, 255, 0.5);
		margin: 0;
	}

	.required {
		color: #f87171;
	}

	.optional {
		color: rgba(226, 232, 255, 0.45);
		font-weight: 400;
	}

	.field input,
	.field textarea {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.5rem;
		padding: 0.7rem 0.9rem;
		color: #e2e8ff;
		font-size: 0.95rem;
		font-family: inherit;
		transition: border-color 0.15s;
		width: 100%;
		box-sizing: border-box;
	}

	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: rgba(97, 128, 255, 0.7);
		background: rgba(97, 128, 255, 0.08);
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: rgba(226, 232, 255, 0.3);
	}

	.delete-warning {
		background: rgba(248, 113, 113, 0.1);
		border: 1px solid rgba(248, 113, 113, 0.3);
		border-radius: 0.5rem;
		padding: 0.9rem 1rem;
		font-size: 0.88rem;
		color: rgba(248, 200, 200, 0.9);
		line-height: 1.5;
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
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.info-panel h3 {
		font-size: 0.85rem;
		font-family: var(--font-family-mono);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(226, 232, 255, 0.55);
		margin-bottom: 0.8rem;
	}

	.info-panel p,
	.info-panel li {
		font-size: 0.88rem;
		color: rgba(226, 232, 255, 0.7);
		line-height: 1.65;
	}

	.info-panel ol {
		padding-left: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
</style>
