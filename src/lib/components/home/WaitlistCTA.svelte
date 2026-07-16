<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PLATFORM_NOTE, NON_DEVICE_DISCLAIMER } from '$lib/data/company';

	let email = $state('');
	let consent = $state(false);
	let submitted = $state(false);
	let error = $state('');

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';

		const value = email.trim();

		if (!value || !emailPattern.test(value)) {
			error = 'Please enter a valid email address.';
			return;
		}
		if (!consent) {
			error = 'Please agree to be contacted so we can add you to the list.';
			return;
		}

		submitted = true;

		const subject = encodeURIComponent('Twin waitlist');
		const body = encodeURIComponent(`Please add me to the Twin waitlist.\n\nEmail: ${value}\n`);
		window.location.href = `mailto:${CONTACT.general}?subject=${subject}&body=${body}`;
	}
</script>

<section id="waitlist" class="waitlist aura-space">
	<div class="container-wide waitlist-grid">
		<div class="waitlist-copy">
			<span class="eyebrow" use:reveal>Join us</span>
			<h2 use:reveal={{ delay: 60 }}>
				Be first to meet <span class="text-gradient-l">Twin</span>.
			</h2>
			<p class="lede" use:reveal={{ delay: 140 }}>
				Twin turns the wearables you already wear into a living model of you, and checks in over
				iMessage. Join the waitlist and we&rsquo;ll tell you the moment it&rsquo;s ready.
			</p>

			<p class="platform-note" use:reveal={{ delay: 200 }}>{PLATFORM_NOTE}</p>
		</div>

		<div class="waitlist-panel glass-card" use:reveal={{ delay: 120 }}>
			{#if submitted}
				<div class="success" role="status" aria-live="polite">
					<span class="success-mark" aria-hidden="true">✓</span>
					<p class="success-title">You&rsquo;re on the list &mdash; we&rsquo;ll be in touch.</p>
					<p class="success-sub">
						Your mail app should have opened with a pre-filled message. If it didn&rsquo;t, email us
						at
						<a href="mailto:{CONTACT.general}?subject=Twin%20waitlist">{CONTACT.general}</a>.
					</p>
				</div>
			{:else}
				<form class="waitlist-form" novalidate onsubmit={handleSubmit}>
					<div class="field">
						<label for="waitlist-email">Email address</label>
						<input
							id="waitlist-email"
							name="email"
							type="email"
							autocomplete="email"
							placeholder="you@example.com"
							required
							bind:value={email}
							aria-invalid={error ? 'true' : 'false'}
							aria-describedby={error ? 'waitlist-error' : undefined}
						/>
					</div>

					<div class="consent">
						<input
							id="waitlist-consent"
							type="checkbox"
							bind:checked={consent}
							aria-describedby={error ? 'waitlist-error' : undefined}
						/>
						<label for="waitlist-consent">
							I agree to be contacted about Twin&rsquo;s launch. See our
							<a href="/privacy">Privacy policy</a>.
						</label>
					</div>

					{#if error}
						<p id="waitlist-error" class="error" role="alert">{error}</p>
					{/if}

					<button type="submit" class="submit">Join the waitlist</button>
				</form>
			{/if}

			<div class="investors">
				<p class="investors-line">Investors &mdash; we&rsquo;re raising our Seed round.</p>
				<a
					class="investors-link"
					href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Seed%20round"
				>
					Talk to Stephen <span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</div>
	</div>

	<p class="fineprint container-wide" use:reveal>{NON_DEVICE_DISCLAIMER}</p>
</section>

<style>
	.waitlist {
		position: relative;
		padding-block: clamp(4rem, 9vw, 7rem);
		overflow: hidden;
		border-top: 1px solid var(--color-border-dark);
	}
	.waitlist-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
	}
	.waitlist-copy h2 {
		font-size: clamp(2rem, 5vw, 3.2rem);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-block: 0.6rem 1.1rem;
	}
	.text-gradient-l {
		color: var(--color-primary-300);
	}
	.lede {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		line-height: 1.6;
		max-width: 34rem;
	}
	.platform-note {
		margin-top: 1.25rem;
		font-size: 0.82rem;
		color: rgba(226, 232, 255, 0.6) !important;
		max-width: 32rem;
	}

	/* Panel */
	.waitlist-panel {
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--radius-4xl);
	}
	.waitlist-form {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	.field label,
	.consent label {
		font-size: 0.9rem;
		font-weight: 500;
		color: #eaf0ff;
	}
	.field input {
		width: 100%;
		padding: 0.8rem 1rem;
		border-radius: 10px;
		border: 1px solid var(--color-border-dark-strong);
		background: rgba(255, 255, 255, 0.04);
		color: #fff;
		font-size: 1rem;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}
	.field input::placeholder {
		color: rgba(226, 230, 240, 0.4);
	}
	.field input:focus-visible {
		outline: none;
		border-color: var(--color-primary-400);
		box-shadow: 0 0 0 3px rgba(97, 128, 255, 0.25);
	}
	.field input[aria-invalid='true'] {
		border-color: rgba(255, 255, 255, 0.5);
	}

	.consent {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.65rem;
		align-items: start;
	}
	.consent input {
		margin-top: 0.2rem;
		width: 1.05rem;
		height: 1.05rem;
		accent-color: #6180ff;
		flex-shrink: 0;
	}
	.consent label {
		font-weight: 400;
		line-height: 1.5;
		color: rgba(234, 240, 255, 0.85);
	}
	.consent a,
	.success-sub a {
		color: #cdd9ff;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.consent a:hover,
	.success-sub a:hover {
		color: #fff;
	}

	.error {
		font-size: 0.85rem;
		color: #ffd9d9 !important;
		margin: -0.25rem 0 0;
	}

	.submit {
		margin-top: 0.25rem;
		background: #fff;
		color: var(--color-ink);
		font-weight: 500;
		font-size: 1rem;
		padding: 0.8rem 1.5rem;
		border-radius: 10px;
		transition: background 0.15s ease;
	}
	.submit:hover {
		background: #e8eaf2;
		color: var(--color-ink);
	}
	.submit:focus-visible {
		outline: 2px solid var(--color-primary-400);
		outline-offset: 3px;
	}

	/* Success */
	.success {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.success-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 999px;
		background: rgba(52, 211, 153, 0.18);
		border: 1px solid rgba(52, 211, 153, 0.5);
		color: #34d399;
		font-size: 1.2rem;
		font-weight: 700;
	}
	.success-title {
		font-family: var(--font-family-heading);
		font-size: 1.25rem;
		font-weight: 600;
		color: #fff;
		margin: 0.25rem 0 0;
	}
	.success-sub {
		font-size: 0.9rem;
		line-height: 1.55;
		color: rgba(234, 240, 255, 0.8) !important;
	}

	/* Investors */
	.investors {
		margin-top: 1.75rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.14);
	}
	.investors-line {
		font-size: 0.9rem;
		color: rgba(234, 240, 255, 0.8) !important;
		margin-bottom: 0.5rem;
	}
	.investors-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 600;
		color: #eaf0ff;
	}
	.investors-link:hover {
		color: #fff;
	}
	.investors-link:focus-visible {
		outline: 2px solid #6180ff;
		outline-offset: 3px;
		border-radius: 4px;
	}

	.fineprint {
		position: relative;
		z-index: 1;
		margin-top: clamp(2rem, 5vw, 3rem);
		font-size: 0.78rem;
		line-height: 1.6;
		color: rgba(226, 232, 255, 0.5) !important;
		max-width: 52rem;
	}

	@media (min-width: 900px) {
		.waitlist-grid {
			grid-template-columns: 1fr 0.95fr;
		}
	}
</style>
