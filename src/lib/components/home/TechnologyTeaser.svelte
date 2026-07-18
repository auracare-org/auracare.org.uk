<script lang="ts">
	import { reveal, countUp } from '$lib/actions/motion';
	import { CONTACT, ONTOLOGY_STATS } from '$lib/data/company';
	import { onMount } from 'svelte';

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

	const formatK = (n: number) => `${Math.round(n / 1_000).toLocaleString()}k`;
	const formatM = (n: number) => `${(n / 1_000_000).toFixed(1)}M`;

	// Medical concepts for the fluid grid
	const concepts = [
		'Hypertension', 'Diabetes mellitus', 'Asthma', 'Heart failure',
		'Atrial fibrillation', 'COPD', 'Pneumonia', 'Anaemia',
		'Hypothyroidism', 'Chronic kidney disease', 'Osteoarthritis',
		'Depression', 'Anxiety disorder', 'Migraine', 'Epilepsy',
		'Gout', 'Psoriasis', 'Crohn\'s disease', 'Coeliac disease',
		'Type 2 diabetes', 'Angina pectoris', 'DVT', 'Pulmonary embolism',
		'Sepsis', 'Meningitis', 'Sarcoidosis', 'Lupus', 'Vasculitis',
		'Hepatitis B', 'Cirrhosis', 'Pancreatitis', 'Cholecystitis',
		'Appendicitis', 'Diverticulitis', 'Endometriosis', 'PCOS',
		'Preeclampsia', 'Osteoporosis', 'Rheumatoid arthritis',
		'Multiple sclerosis', 'Parkinson\'s disease', 'Motor neurone disease',
		'Myocardial infarction', 'Stroke', 'Aortic stenosis',
		'Mitral regurgitation', 'Cardiomyopathy', 'Pericarditis',
		'Pleural effusion', 'Bronchiectasis', 'Interstitial lung disease',
		'Obstructive sleep apnoea', 'Pulmonary fibrosis', 'Tuberculosis',
		'HIV', 'Malaria', 'Dengue fever', 'Lyme disease', 'Cellulitis',
		'Osteomyelitis', 'Glomerulonephritis', 'Nephrotic syndrome',
		'Renal calculi', 'Benign prostatic hyperplasia', 'Bladder cancer',
		'Breast cancer', 'Lung cancer', 'Colorectal cancer', 'Melanoma',
		'Lymphoma', 'Leukaemia', 'Myeloma', 'Thyroid cancer',
		'Dementia', 'Bipolar disorder', 'Schizophrenia', 'ADHD',
		'Autism spectrum', 'Anorexia nervosa', 'OCD', 'PTSD',
		'Iron deficiency', 'B12 deficiency', 'Folate deficiency',
		'Hyperkalaemia', 'Hyponatraemia', 'Hypercalcaemia',
		'Addison\'s disease', 'Cushing\'s syndrome', 'Acromegaly',
		'Pheochromocytoma', 'Conn\'s syndrome', 'Grave\'s disease',
		'Hashimoto\'s', 'Diabetic ketoacidosis', 'Hypoglycaemia',
		'Metabolic syndrome', 'Dyslipidaemia', 'Familial hypercholesterolaemia',
		'Peripheral arterial disease', 'Raynaud\'s phenomenon',
		'Varicose veins', 'Lymphoedema', 'Anaphylaxis', 'Angioedema'
	];

	const GRID_COLS = 12;
	const GRID_ROWS = 8;
	const TOTAL = GRID_COLS * GRID_ROWS;

	let hoveredCell = $state<number | null>(null);
	let sectionEl = $state<HTMLElement | null>(null);

	// Assign a concept to each cell
	const cellConcepts = Array.from({ length: TOTAL }, (_, i) => concepts[i % concepts.length]);
</script>

<section class="tech aura-space section-y" bind:this={sectionEl}>
	<!-- Fluid grid background -->
	<div class="fluid-grid" aria-hidden="true">
		{#each cellConcepts as concept, i}
			<div
				class="fluid-cell"
				style="--col:{i % GRID_COLS}; --row:{Math.floor(i / GRID_COLS)};"
				onmouseenter={() => hoveredCell = i}
				onmouseleave={() => hoveredCell = null}
			>
				{#if hoveredCell === i}
					<span class="cell-label">{concept}</span>
				{/if}
			</div>
		{/each}
	</div>

	<div class="container-wide tech-grid">
		<div class="tech-copy">
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
		border-block: 1px solid var(--color-border-dark);
	}

	/* Fluid grid background — flowing square blobs */
	.fluid-grid {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(8, 1fr);
		gap: 0;
		pointer-events: auto;
	}
	.fluid-cell {
		position: relative;
		background: transparent;
		transition: background 0.5s ease;
		cursor: crosshair;
	}
	.fluid-cell::after {
		content: '';
		position: absolute;
		inset: 15%;
		border-radius: 3px;
		background: rgba(97, 128, 255, 0.03);
		border: 1px solid rgba(97, 128, 255, 0.06);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		animation: drift 8s ease-in-out infinite;
		animation-delay: calc((var(--col) * 0.3s) + (var(--row) * 0.4s));
	}
	.fluid-cell:hover::after {
		inset: 5%;
		background: rgba(97, 128, 255, 0.15);
		border-color: rgba(97, 128, 255, 0.4);
	}
	@keyframes drift {
		0%, 100% {
			inset: 15%;
			transform: translate(0, 0);
		}
		25% {
			inset: 12% 18% 18% 12%;
			transform: translate(2px, -1px);
		}
		50% {
			inset: 18% 12% 12% 18%;
			transform: translate(-1px, 2px);
		}
		75% {
			inset: 14% 16% 16% 14%;
			transform: translate(1px, 1px);
		}
	}

	.cell-label {
		position: absolute;
		bottom: calc(100% + 4px);
		left: 50%;
		transform: translateX(-50%);
		background: rgba(20, 24, 40, 0.95);
		border: 1px solid rgba(97, 128, 255, 0.3);
		color: var(--color-primary-300);
		font-family: var(--font-family-mono);
		font-size: 0.62rem;
		font-weight: 500;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		white-space: nowrap;
		pointer-events: none;
		z-index: 20;
		animation: tipIn 0.15s ease-out;
	}
	@keyframes tipIn {
		from { opacity: 0; transform: translateX(-50%) translateY(3px); }
		to { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	/* Content grid */
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
		color: var(--color-primary-300);
	}
	.tech-lead {
		font-size: clamp(1rem, 1.5vw, 1.14rem);
		line-height: 1.65;
		max-width: 36rem;
	}
	.tech-lead strong {
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
		color: var(--color-white-alpha-80);
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
		color: var(--color-ink);
		font-weight: 500;
		font-size: 0.98rem;
		padding: 0.8rem 1.5rem;
		border-radius: var(--radius-sm);
		transition: background 0.15s ease;
	}
	.cta-primary:hover {
		background: #e8eaf2;
		color: var(--color-ink);
	}
	.cta-ghost {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--color-white-alpha-80);
		font-weight: 500;
		font-size: 0.98rem;
		padding: 0.8rem 1.35rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border-dark-strong);
		transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
	}
	.cta-ghost:hover {
		color: #fff;
		border-color: var(--color-white-alpha-20);
		background: var(--color-white-alpha-10);
	}

	/* Visual side */
	.tech-visual {
		position: relative;
		width: 100%;
		max-width: 32rem;
		margin-inline: auto;
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
		background: rgba(15, 18, 30, 0.85);
		backdrop-filter: blur(8px);
		border: 1px solid var(--color-border-dark);
		border-radius: var(--radius-lg);
		padding: clamp(1.1rem, 2.6vw, 1.6rem);
	}
	.stat-value {
		font-family: var(--font-family-heading);
		font-weight: 600;
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		line-height: 1;
		letter-spacing: -0.03em;
		color: #ffffff;
		font-variant-numeric: tabular-nums;
		min-height: 1em;
	}
	.stat-label {
		margin-top: 0.5rem;
		font-family: var(--font-family-mono);
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		line-height: 1.4;
		color: var(--color-dark-overlay-60);
	}

	@media (min-width: 900px) {
		.tech-grid {
			grid-template-columns: 1.05fr 0.95fr;
		}
	}
</style>
