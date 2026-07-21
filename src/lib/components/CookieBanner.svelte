<script lang="ts">
	import { cookieConsent } from '$lib/stores/cookieConsent';
</script>

{#if $cookieConsent === null}
	<div
		class="fixed bottom-0 left-0 right-0 z-50 p-4"
		style="background: rgba(255,255,255,0.98); border-top: 1px solid var(--color-border-default); backdrop-filter: blur(12px);"
		role="dialog"
		aria-label="Cookie consent"
	>
		<div class="flex flex-col sm:flex-row sm:items-center gap-3 w-full max-w-5xl mx-auto">
			<p class="text-sm text-neutral-600 flex-1">
				We use analytics cookies to understand how visitors use our site. See our
				<a href="/cookies" class="underline hover:text-primary-600 transition-colors"
					>cookie policy</a
				> for details.
			</p>
			<div class="flex items-center gap-3 shrink-0">
				<button
					onclick={() => cookieConsent.reject()}
					class="text-sm text-neutral-600 hover:text-neutral-900 transition-colors underline whitespace-nowrap"
				>
					Essential only
				</button>
				<button
					onclick={() => cookieConsent.accept()}
					class="btn py-2 px-5 text-sm whitespace-nowrap"
					style="background: var(--color-bg-button-primary-default); color: white; border-radius: 8px; font-weight: 600;"
				>
					Accept analytics
				</button>
			</div>
		</div>
	</div>
{/if}
