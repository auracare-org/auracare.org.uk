<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import {
		TWIN_DOES,
		TWIN_NEVER,
		EMERGENCY_ROUTING,
		NON_DEVICE_DISCLAIMER
	} from '$lib/data/company';
	import { onMount } from 'svelte';

	let activeRegion = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			activeRegion = (activeRegion + 1) % EMERGENCY_ROUTING.length;
		}, 3000);
		return () => clearInterval(interval);
	});
</script>

<section class="safety section-y">
	<div class="container-wide">
		<div class="head">
			<span class="eyebrow" use:reveal>Consent &amp; safety</span>
			<h2 use:reveal={{ delay: 60 }}>
				A wellness sidekick, not a doctor — and it <span class="text-gradient"
					>knows the difference</span
				>.
			</h2>
			<p class="head-note" use:reveal={{ delay: 120 }}>Safety is structural, not a feature flag.</p>
		</div>

		<div class="safety-table glass-card" use:reveal={{ delay: 80 }}>
			<table>
				<thead>
					<tr>
						<th class="col-does">What Twin does</th>
						<th class="col-never">What Twin never does</th>
					</tr>
				</thead>
				<tbody>
					{#each Array(Math.max(TWIN_DOES.length, TWIN_NEVER.length)) as _, i}
						<tr>
							<td>
								{#if i < TWIN_DOES.length}
									<span class="ic ic-check" aria-hidden="true">
										<svg viewBox="0 0 20 20" fill="none">
											<path d="M5 10.5l3.2 3.2L15 6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</span>
									<span>{TWIN_DOES[i]}</span>
								{/if}
							</td>
							<td>
								{#if i < TWIN_NEVER.length}
									<span class="ic ic-cross" aria-hidden="true">
										<svg viewBox="0 0 20 20" fill="none">
											<path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
										</svg>
									</span>
									<span>{TWIN_NEVER[i]}</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="routing" use:reveal={{ delay: 100 }}>
			<div class="routing-center">
				<p class="routing-statement">
					Twin <span class="red">never</span> diagnoses, treats, or prescribes.
					<br />If something is urgent, it routes you to <span class="red">real help</span>.
				</p>
			</div>

			<div class="routing-visual">
				<div class="twin-bubble">
					<div class="twin-avatar">
						<img src="/favicon.svg" alt="Twin" />
					</div>
					<div class="twin-arrow" aria-hidden="true">
						<svg width="48" height="24" viewBox="0 0 48 24" fill="none">
							<path d="M0 12h40M40 12l-6-5M40 12l-6 5" stroke="var(--color-primary-600)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>

				<div class="help-card glass-card">
					<p class="help-label">Region-aware routing</p>
					{#key activeRegion}
						<div class="help-region help-region-anim">
							<span class="help-flag">{EMERGENCY_ROUTING[activeRegion].region}</span>
							<div class="help-numbers">
								{#each EMERGENCY_ROUTING[activeRegion].lines as line}
									<span class="help-num"><strong>{line.value}</strong> <small>{line.label}</small></span>
								{/each}
							</div>
						</div>
					{/key}
					<div class="region-dots" aria-hidden="true">
						{#each EMERGENCY_ROUTING as _, i}
							<button class="region-dot" class:active={activeRegion === i} onclick={() => activeRegion = i}></button>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<p class="fineprint" use:reveal>{NON_DEVICE_DISCLAIMER}</p>
	</div>
</section>

<style>
	.safety {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
	}
	.head {
		max-width: 46rem;
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}
	.head h2 {
		font-size: clamp(1.9rem, 3.6vw, 2.8rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0.75rem 0 1.25rem;
	}
	.head-note {
		font-size: 0.9rem;
		color: var(--color-ink-soft);
		margin-top: 0.5rem;
	}

	.safety-table {
		padding: 0;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	thead tr {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	thead th {
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--color-ink);
		text-align: left;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--color-border-default);
	}
	thead th:first-child {
		border-right: 1px solid var(--color-border-default);
	}
	tbody tr {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	tbody td {
		padding: 0.75rem 1.25rem;
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		line-height: 1.45;
		color: var(--color-ink-soft);
		font-size: 0.9rem;
	}
	tbody td:first-child {
		border-right: 1px solid var(--color-border-default);
	}
	tbody tr:not(:last-child) td {
		border-bottom: 1px solid var(--color-border-default);
	}
	.ic {
		flex: none;
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 999px;
		display: grid;
		place-items: center;
		margin-top: 0.05rem;
	}
	.ic svg {
		width: 100%;
		height: 100%;
	}
	.ic-check {
		color: #0f9d63;
		background: #dff8ef;
	}
	.ic-cross {
		color: var(--color-neutral-500);
		background: var(--color-neutral-100);
	}

	.routing {
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	.routing-center {
		text-align: center;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
	}
	.routing-statement {
		font-size: clamp(1.1rem, 2vw, 1.4rem);
		line-height: 1.5;
		color: var(--color-ink);
		font-weight: 500;
		max-width: 36rem;
		margin-inline: auto;
	}
	.red {
		color: #dc2626;
		font-weight: 700;
	}

	.routing-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(0.75rem, 2vw, 1.5rem);
		flex-wrap: wrap;
	}
	.twin-bubble {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.twin-avatar {
		width: 3rem;
		height: 3rem;
		background: var(--color-primary-600);
		border-radius: 50%;
		display: grid;
		place-items: center;
		padding: 0.6rem;
	}
	.twin-avatar img {
		width: 100%;
		height: auto;
		filter: brightness(0) invert(1);
	}
	.twin-arrow {
		display: flex;
		align-items: center;
	}

	.help-card {
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius-lg);
		max-width: 22rem;
	}
	.help-label {
		font-size: 0.72rem;
		font-family: var(--font-family-mono);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-ink-faint);
		margin-bottom: 0.75rem;
	}
	.help-region {
		padding: 0.5rem 0;
	}
	.help-region-anim {
		animation: fadeSlide 0.35s ease-out;
	}
	@keyframes fadeSlide {
		from { opacity: 0; transform: translateY(6px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.region-dots {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.6rem;
	}
	.region-dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: var(--color-border-strong);
		border: none;
		padding: 0;
		cursor: pointer;
		transition: background 0.2s ease;
	}
	.region-dot.active {
		background: var(--color-primary-600);
	}
	.help-flag {
		font-weight: 600;
		font-size: 0.85rem;
		color: var(--color-ink);
		display: block;
		margin-bottom: 0.35rem;
	}
	.help-numbers {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
	}
	.help-num {
		font-size: 0.82rem;
		color: var(--color-ink-soft);
	}
	.help-num strong {
		color: #dc2626;
		font-weight: 700;
	}
	.help-num small {
		color: var(--color-ink-faint);
	}

	.fineprint {
		margin-top: clamp(2rem, 4vw, 3rem);
		font-size: 0.82rem;
		line-height: 1.6;
		color: var(--color-ink-faint);
		max-width: 44rem;
	}

	@media (min-width: 720px) {
		.split {
			grid-template-columns: 1fr 1fr;
		}
		.regions {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
