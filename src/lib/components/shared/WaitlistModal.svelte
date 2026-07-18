<script lang="ts">
	import { CONTACT, PLATFORM_NOTE } from '$lib/data/company';

	let { open = $bindable(false) } = $props();

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

	function closeModal() {
		open = false;
		// Reset form after a delay if closed
		setTimeout(() => {
			if (!open) {
				email = '';
				consent = false;
				submitted = false;
				error = '';
			}
		}, 300);
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

{#if open}
	<div class="modal-backdrop" onclick={handleBackdropClick} onkeydown={handleKeydown} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
		<div class="modal-content glass-card">
			<button class="modal-close" onclick={closeModal} aria-label="Close modal">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<div class="modal-header">
				<h2 id="modal-title">Join the <span class="text-gradient">Twin</span> waitlist</h2>
				<p class="modal-subtitle">
					Twin turns the wearables you already wear into a living model of you. Be first to know when it launches.
				</p>
			</div>

			{#if submitted}
				<div class="success" role="status" aria-live="polite">
					<span class="success-mark" aria-hidden="true">✓</span>
					<p class="success-title">You're on the list — we'll be in touch.</p>
					<p class="success-sub">
						Your mail app should have opened with a pre-filled message. If it didn't, email us at
						<a href="mailto:{CONTACT.general}?subject=Twin%20waitlist">{CONTACT.general}</a>.
					</p>
				</div>
			{:else}
				<form class="waitlist-form" novalidate onsubmit={handleSubmit}>
					<div class="field">
						<label for="modal-email">Email address</label>
						<input
							id="modal-email"
							name="email"
							type="email"
							autocomplete="email"
							placeholder="you@example.com"
							required
							bind:value={email}
							aria-invalid={error ? 'true' : 'false'}
							aria-describedby={error ? 'modal-error' : undefined}
						/>
					</div>

					<div class="consent">
						<input
							id="modal-consent"
							type="checkbox"
							bind:checked={consent}
							aria-describedby={error ? 'modal-error' : undefined}
						/>
						<label for="modal-consent">
							I agree to be contacted about Twin's launch. See our
							<a href="/privacy" target="_blank">Privacy policy</a>.
						</label>
					</div>

					{#if error}
						<p id="modal-error" class="error" role="alert">{error}</p>
					{/if}

					<button type="submit" class="submit">Join the waitlist</button>
				</form>
			{/if}

			<p class="platform-note">{PLATFORM_NOTE}</p>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 1rem;
		animation: fadeIn 0.2s ease-out;
	}

	.modal-content {
		position: relative;
		width: 100%;
		max-width: 500px;
		max-height: 90vh;
		overflow-y: auto;
		padding: clamp(1.5rem, 4vw, 2.5rem);
		border-radius: var(--radius-4xl);
		animation: slideUp 0.3s ease-out;
	}

	.modal-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		color: rgba(255, 255, 255, 0.7);
		transition: all 0.2s ease;
	}

	.modal-close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	.modal-header {
		margin-bottom: 1.5rem;
	}

	.modal-header h2 {
		font-size: clamp(1.5rem, 4vw, 1.85rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-bottom: 0.6rem;
		color: #fff;
	}

	.text-gradient {
		background: linear-gradient(135deg, #6180ff 0%, #a8b8ff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.modal-subtitle {
		font-size: 0.95rem;
		line-height: 1.5;
		color: rgba(234, 240, 255, 0.85);
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
		border-radius: 6px;
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
		border-color: rgba(255, 77, 77, 0.6);
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
		border-radius: 6px;
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
		padding: 1rem 0;
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

	.platform-note {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 0.8rem;
		line-height: 1.5;
		color: rgba(226, 232, 255, 0.6) !important;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
