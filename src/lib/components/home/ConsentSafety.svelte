<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import {
		TWIN_DOES,
		TWIN_NEVER,
		EMERGENCY_ROUTING,
		NON_DEVICE_DISCLAIMER
	} from '$lib/data/company';
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
			<span class="badge" use:reveal={{ delay: 120 }}>
				<span class="badge-dot" aria-hidden="true"></span>
				Safety, always on
			</span>
		</div>

		<div class="split">
			<div class="glass-card panel panel-does" use:reveal={{ delay: 80 }}>
				<h3>What Twin does</h3>
				<ul class="list">
					{#each TWIN_DOES as item}
						<li>
							<span class="ic ic-check" aria-hidden="true">
								<svg viewBox="0 0 20 20" fill="none">
									<path
										d="M5 10.5l3.2 3.2L15 6.5"
										stroke="currentColor"
										stroke-width="2.2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="glass-card panel panel-never" use:reveal={{ delay: 140 }}>
				<h3>What Twin never does</h3>
				<ul class="list">
					{#each TWIN_NEVER as item}
						<li>
							<span class="ic ic-cross" aria-hidden="true">
								<svg viewBox="0 0 20 20" fill="none">
									<path
										d="M6 6l8 8M14 6l-8 8"
										stroke="currentColor"
										stroke-width="2.2"
										stroke-linecap="round"
									/>
								</svg>
							</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="routing">
			<div class="routing-head" use:reveal>
				<h3>If something is urgent, Twin routes you to real help</h3>
				<p class="caption">Region-aware — always confirmed, never assumed.</p>
			</div>
			<div class="regions">
				{#each EMERGENCY_ROUTING as region, i}
					<div class="glass-card region" use:reveal={{ delay: 80 + i * 80 }}>
						<h4>{region.region}</h4>
						<dl class="lines">
							{#each region.lines as line}
								<div class="line">
									<dt>{line.label}</dt>
									<dd>{line.value}</dd>
								</div>
							{/each}
						</dl>
					</div>
				{/each}
			</div>
		</div>

		<p class="fineprint" use:reveal>{NON_DEVICE_DISCLAIMER}</p>
	</div>
</section>

<style>
	.safety {
		background:
			radial-gradient(120% 80% at 100% 0%, rgba(97, 128, 255, 0.06), transparent 60%),
			linear-gradient(180deg, var(--color-neutral-0), var(--color-primary-50));
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
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #0f7a55;
		background: rgba(52, 211, 153, 0.12);
		border: 1px solid rgba(52, 211, 153, 0.35);
		padding: 0.4rem 0.85rem;
		border-radius: 999px;
	}
	.badge-dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: #34d399;
		box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.2);
	}

	.split {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}
	.panel {
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: var(--radius-2xl);
	}
	.panel h3 {
		font-size: 1.15rem;
		margin-bottom: 1.25rem;
		color: var(--color-neutral-900);
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}
	.list li {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		line-height: 1.45;
		color: var(--color-neutral-800);
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
		background: rgba(52, 211, 153, 0.16);
	}
	.ic-cross {
		color: var(--color-neutral-500);
		background: var(--color-neutral-100);
	}

	.routing {
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	.routing-head h3 {
		font-size: clamp(1.25rem, 2.4vw, 1.6rem);
		letter-spacing: -0.01em;
		color: var(--color-neutral-900);
	}
	.caption {
		margin-top: 0.4rem;
		color: var(--color-neutral-600);
		font-size: 0.95rem;
	}
	.regions {
		margin-top: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}
	.region {
		padding: clamp(1.25rem, 2.5vw, 1.75rem);
		border-radius: var(--radius-2xl);
	}
	.region h4 {
		font-size: 1.05rem;
		color: var(--color-neutral-900);
		margin-bottom: 1rem;
	}
	.lines {
		display: flex;
		flex-direction: column;
	}
	.line {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.6rem 0;
		border-top: 1px solid var(--color-neutral-200);
	}
	.line:first-child {
		border-top: none;
		padding-top: 0;
	}
	.line dt {
		color: var(--color-neutral-600);
		font-size: 0.9rem;
	}
	.line dd {
		font-weight: 600;
		color: var(--color-neutral-900);
		text-align: right;
	}

	.fineprint {
		margin-top: clamp(2rem, 4vw, 3rem);
		font-size: 0.82rem;
		line-height: 1.6;
		color: var(--color-neutral-500);
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
