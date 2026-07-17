<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import {
		TWIN_DOES,
		TWIN_NEVER,
		EMERGENCY_ROUTING,
		NON_DEVICE_DISCLAIMER
	} from '$lib/data/company';
	import { onMount } from 'svelte';

	// Flatten all helplines into a single list with region info
	const helplines = EMERGENCY_ROUTING.flatMap(r =>
		r.lines.map(l => ({ ...l, region: r.region }))
	);

	// Positions for helpline nodes scattered to the right (x%, y%)
	const nodePositions = [
		{ x: 62, y: 12 },
		{ x: 82, y: 8 },
		{ x: 88, y: 35 },
		{ x: 85, y: 62 },
		{ x: 68, y: 82 },
		{ x: 48, y: 88 }
	];

	let activeNode = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			activeNode = (activeNode + 1) % helplines.length;
		}, 2200);
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

			<div class="routing-canvas" aria-label="Twin routing to emergency helplines">
				<svg class="routing-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
					<defs>
						<linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#dc2626" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#ef4444" stop-opacity="0.3" />
						</linearGradient>
					</defs>

					{#each nodePositions as pos, i}
						<path
							class="route-path"
							class:route-active={activeNode === i}
							d="M 18 50 C {30 + i * 3} {50 - (i - 2.5) * 8}, {pos.x - 15} {pos.y + (pos.y < 50 ? 10 : -10)}, {pos.x} {pos.y}"
							fill="none"
							stroke={activeNode === i ? 'url(#flow-grad)' : '#e2e5ea'}
							stroke-width={activeNode === i ? '1.2' : '0.5'}
							stroke-linecap="round"
						/>
					{/each}
				</svg>

				<div class="twin-node">
					<img src="/favicon.svg" alt="Twin" class="twin-icon" />
				</div>

				{#each helplines as line, i}
					<button
						class="help-node"
						class:help-node-active={activeNode === i}
						style="left:{nodePositions[i].x}%; top:{nodePositions[i].y}%"
						onclick={() => activeNode = i}
					>
						<span class="help-node-value">{line.value}</span>
						<span class="help-node-label">{line.label}</span>
					</button>
				{/each}

				<div class="routing-info" aria-live="polite">
					<span class="routing-info-region">{helplines[activeNode].region}</span>
					<strong class="routing-info-num">{helplines[activeNode].value}</strong>
					<span class="routing-info-type">{helplines[activeNode].label}</span>
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

	.routing-canvas {
		position: relative;
		width: 100%;
		max-width: 36rem;
		aspect-ratio: 1;
		margin: 0 auto;
	}
	.routing-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.route-path {
		transition: stroke 0.4s ease, stroke-width 0.4s ease;
	}
	.route-active {
		stroke-dasharray: 200;
		stroke-dashoffset: 200;
		animation: flowIn 0.8s ease-out forwards;
	}
	@keyframes flowIn {
		to { stroke-dashoffset: 0; }
	}

	.twin-node {
		position: absolute;
		left: 8%;
		top: 50%;
		transform: translateY(-50%);
		width: 3.2rem;
		height: 3.2rem;
	}
	.twin-icon {
		width: 100%;
		height: 100%;
		border-radius: 12px;
	}

	.help-node {
		position: absolute;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		padding: 0.4rem 0.6rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-default);
		background: #fff;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-xs);
	}
	.help-node-active {
		border-color: #dc2626;
		background: #fef2f2;
		box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.08), var(--shadow-sm);
		transform: translate(-50%, -50%) scale(1.08);
	}
	.help-node-value {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--color-ink);
	}
	.help-node-active .help-node-value {
		color: #dc2626;
	}
	.help-node-label {
		font-size: 0.58rem;
		color: var(--color-ink-faint);
		white-space: nowrap;
	}

	.routing-info {
		position: absolute;
		bottom: 4%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		background: #fff;
		border: 1px solid var(--color-border-default);
		box-shadow: var(--shadow-xs);
		white-space: nowrap;
	}
	.routing-info-region {
		font-size: 0.72rem;
		font-weight: 500;
		color: var(--color-ink-faint);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.routing-info-num {
		font-size: 0.9rem;
		color: #dc2626;
	}
	.routing-info-type {
		font-size: 0.78rem;
		color: var(--color-ink-soft);
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
