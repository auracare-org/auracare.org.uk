<script lang="ts">
	import { cookieConsent } from '$lib/stores/cookieConsent';
</script>

<!--
  The consent bar.

  This is the first interactive thing a new visitor meets, and it was the last
  surface still on the pre-revamp system: a white translucent panel with a
  backdrop blur and an 8px radius, on the legacy neutral ramp. Paper, a hairline
  rule and square buttons now, like everything else. The consent logic is
  untouched.
-->
{#if $cookieConsent === null}
	<div class="cookie-bar" role="dialog" aria-label="Cookie consent">
		<div class="cookie-inner">
			<p class="cookie-text">
				We'd like to use privacy-conscious analytics to understand how visitors use our site. If you
				accept, we set a couple of analytics cookies and record how the site is used, including a
				replay of your visit with anything you type hidden. Nothing loads until you choose. See our
				<a href="/cookies">cookie policy</a> for details.
			</p>
			<div class="cookie-actions">
				<button type="button" class="cookie-decline" onclick={() => cookieConsent.reject()}>
					Essential only
				</button>
				<button type="button" class="btn-solid" onclick={() => cookieConsent.accept()}>
					Accept analytics
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.cookie-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 50;
		padding: 1rem 1.5rem;
		background: var(--color-surface-page);
		border-top: 1px solid var(--color-ink);
	}
	.cookie-inner {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 75rem;
		margin-inline: auto;
	}
	.cookie-text {
		flex: 1;
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}
	.cookie-text a {
		color: var(--color-primary-600);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.cookie-actions {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-shrink: 0;
	}
	/* The decline is a text button beside a solid one, which is the pattern used
	   for secondary actions everywhere else on the site. */
	.cookie-decline {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
		border-bottom: 1px solid var(--color-rule-strong);
		padding-bottom: 0.25rem;
		white-space: nowrap;
		transition:
			color var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}
	.cookie-actions :global(.btn-solid) {
		white-space: nowrap;
	}

	/* The two buttons stop fitting side by side well before the layout's own
	   720px switch: both carry `white-space: nowrap`, so at 320px "Accept
	   analytics" ran 56px past the right edge of the screen. Stacked and full
	   width, which also makes them the easiest targets on the page — right for
	   the first thing a visitor is asked to answer. */
	@media (max-width: 430px) {
		.cookie-actions {
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
		}
		.cookie-decline {
			justify-content: center;
			text-align: center;
			border-bottom: none;
			border: 1px solid var(--color-rule-strong);
			padding: 0.85rem 1rem;
		}
		.cookie-actions :global(.btn-solid) {
			width: 100%;
			text-align: center;
		}
	}

	/* Both are primary controls on a consent dialog, and the decline in
	   particular must not be the harder one to hit. */
	@media (pointer: coarse) {
		.cookie-decline {
			display: inline-flex;
			align-items: center;
			min-height: 44px;
		}
	}
	@media (hover: hover) and (pointer: fine) {
		.cookie-decline:hover {
			color: var(--color-ink);
			border-color: var(--color-ink);
		}
	}
	@media (min-width: 720px) {
		.cookie-inner {
			flex-direction: row;
			align-items: center;
			gap: 2rem;
		}
	}
</style>
