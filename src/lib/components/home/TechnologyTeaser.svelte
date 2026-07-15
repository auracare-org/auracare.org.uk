<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import { CONTACT, ONTOLOGY_STATS } from '$lib/data/company';

	// Interpret each stat: numeric tiles (532k, 1.3M) animate; textual tiles (ICD-11, LOINC) stay put.
	type Tile =
		| { kind: 'number'; target: number; suffix: 'k' | 'M'; label: string }
		| { kind: 'text'; value: string; label: string };

	const tiles: Tile[] = ONTOLOGY_STATS.map((s) => {
		const m = s.value.match(/^([\d.]+)([kM])$/);
		if (m) {
			const num = parseFloat(m[1]);
			const suffix = m[2] as 'k' | 'M';
			const target = suffix === 'k' ? num * 1_000 : num * 1_000_000;
			return { kind: 'number', target, suffix, label: s.label };
		}
		return { kind: 'text', value: s.value, label: s.label };
	});

	// Formatters that reproduce the original display string as the count lands.
	const formatK = (n: number) => `${Math.round(n / 1_000).toLocaleString()}k`;
	const formatM = (n: number) => `${(n / 1_000_000).toFixed(1)}M`;

	// Decorative node-graph motif — soft cluster of nodes joined by edges.
	const nodes = [
		{ x: 50, y: 46, r: 5.5 },
		{ x: 22, y: 24, r: 3.2 },
		{ x: 78, y: 22, r: 3.6 },
		{ x: 84, y: 62, r: 3 },
		{ x: 58, y: 82, r: 3.4 },
		{ x: 24, y: 70, r: 3 },
		{ x: 12, y: 48, r: 2.6 },
		{ x: 64, y: 14, r: 2.4 }
	];
	const edges = [
		[0, 1],
		[0, 2],
		[0, 3],
		[0, 4],
		[0, 5],
		[1, 6],
		[1, 7],
		[2, 7],
		[3, 4],
		[5, 6]
	];
</script>

<section class="tech aura-space section-y">
	<div class="tech-orbs" aria-hidden="true">
		<span
			class="bubble"
			style="--bubble-size:380px;--bubble-color:rgba(97,128,255,.30);--bubble-blur:20px; top:-12%; left:-6%"
		></span>
		<span
			class="bubble"
			style="--bubble-size:320px;--bubble-color:rgba(56,127,245,.24);--bubble-blur:16px; bottom:-14%; right:-4%"
		></span>
	</div>

	<div class="container-wide tech-grid">
		<div class="tech-copy">
			<span class="eyebrow" use:reveal>The technology</span>
			<h2 use:reveal={{ delay: 60 }}>
				From the ontology up: <span class="text-gradient-l">532,000 clinical concepts</span> you can
				see.
			</h2>
			<p class="tech-lead" use:reveal={{ delay: 140 }}>
				Our reasoning is grounded in the terminology medicine already agrees on — SNOMED CT, ICD-11,
				HPO, LOINC. A learned model proposes; an auditable symbolic layer disposes. That
				<strong>neuro-symbolic</strong> design means every answer can trace back to a named source.
			</p>
			<p class="tech-status" use:reveal={{ delay: 200 }}>
				<span class="pill pill-live">Live today</span>
				The graph is explorable right now. The reasoning engine that acts on it is in active development.
			</p>

			<div class="tech-cta" use:reveal={{ delay: 260 }}>
				<a class="cta-primary" href={CONTACT.ontologyUrl} target="_blank" rel="noopener">
					Explore the graph <span aria-hidden="true">↗</span>
				</a>
				<a class="cta-ghost" href="/technology">
					How the engine works <span aria-hidden="true">→</span>
				</a>
			</div>
		</div>

		<div class="tech-visual" use:reveal={{ delay: 160 }}>
			<svg
				class="node-graph"
				viewBox="0 0 100 100"
				aria-hidden="true"
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					<radialGradient id="techNode" cx="50%" cy="50%" r="55%">
						<stop offset="0%" stop-color="#eaf0ff" />
						<stop offset="60%" stop-color="#8aa0ff" />
						<stop offset="100%" stop-color="#2f4ec0" stop-opacity="0" />
					</radialGradient>
				</defs>
				{#each edges as [a, b]}
					<line
						x1={nodes[a].x}
						y1={nodes[a].y}
						x2={nodes[b].x}
						y2={nodes[b].y}
						stroke="#aebfff"
						stroke-opacity="0.28"
						stroke-width="0.4"
					/>
				{/each}
				{#each nodes as n, i}
					<circle cx={n.x} cy={n.y} r={n.r} fill="url(#techNode)" class="node" style="--i:{i}" />
				{/each}
			</svg>

			<dl class="stat-tiles">
				{#each tiles as t, i}
					<div class="stat-tile" use:reveal={{ delay: 120 + i * 90 }}>
						{#if t.kind === 'number'}
							<dd
								class="stat-value"
								use:countUp={{
									value: t.target,
									format: t.suffix === 'k' ? formatK : formatM
								}}
							></dd>
						{:else}
							<dd class="stat-value">{t.value}</dd>
						{/if}
						<dt class="stat-label">{t.label}</dt>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<style>
	.tech {
		position: relative;
		overflow: hidden;
	}
	.tech-orbs {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.tech-orbs .bubble {
		animation: auraFloat 10s ease-in-out infinite;
	}
	.tech-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: center;
	}
	.tech-copy h2 {
		font-size: clamp(1.9rem, 4.4vw, 3rem);
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 1.25rem;
	}
	.text-gradient-l {
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.tech-lead {
		font-size: clamp(1rem, 1.5vw, 1.14rem);
		line-height: 1.65;
		max-width: 36rem;
	}
	.tech-lead strong {
		color: #fff;
		font-weight: 600;
	}
	.tech-status {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1.25rem;
		font-size: 0.92rem;
		line-height: 1.5;
		color: rgba(226, 232, 255, 0.82) !important;
		max-width: 34rem;
	}

	.tech-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 1.9rem;
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 600;
		padding: 0.85rem 1.6rem;
		border-radius: 999px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			color 0.2s ease;
	}
	.cta-primary:hover {
		color: var(--color-primary-800);
		transform: translateY(-2px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.32);
	}
	.cta-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: #eaf0ff;
		font-weight: 600;
		padding: 0.85rem 1.2rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		transition:
			background 0.2s ease,
			transform 0.2s ease,
			color 0.2s ease;
	}
	.cta-ghost:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	/* Visual side */
	.tech-visual {
		position: relative;
		width: 100%;
		max-width: 32rem;
		margin-inline: auto;
	}
	.node-graph {
		position: absolute;
		inset: -6% -4%;
		width: 108%;
		height: 108%;
		overflow: visible;
		opacity: 0.55;
		pointer-events: none;
	}
	.node {
		opacity: 0.7;
	}

	.stat-tiles {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(0.75rem, 2vw, 1.1rem);
		margin: 0;
	}
	.stat-tile {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.14);
		backdrop-filter: blur(8px);
		border-radius: var(--radius-2xl);
		padding: clamp(1.1rem, 2.6vw, 1.6rem);
		box-shadow: var(--shadow-glass-glow);
	}
	.stat-value {
		font-family: var(--font-family-heading);
		font-weight: 700;
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		line-height: 1;
		letter-spacing: -0.02em;
		background: linear-gradient(100deg, #ffffff, #8aa0ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		min-height: 1em;
	}
	.stat-label {
		margin-top: 0.5rem;
		font-size: 0.86rem;
		line-height: 1.35;
		color: rgba(226, 232, 255, 0.72) !important;
	}

	@media (prefers-reduced-motion: reduce) {
		.tech-orbs .bubble {
			animation: none;
		}
	}

	@media (min-width: 900px) {
		.tech-grid {
			grid-template-columns: 1.05fr 0.95fr;
		}
	}
</style>
